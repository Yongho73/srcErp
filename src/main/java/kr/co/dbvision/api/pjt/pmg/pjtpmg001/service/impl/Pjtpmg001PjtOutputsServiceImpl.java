package kr.co.dbvision.api.pjt.pmg.pjtpmg001.service.impl;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import egovframework.rte.fdl.idgnr.EgovIdGnrService;
import kr.co.dbvision.api.pjt.pmg.pjtpmg001.entity.Pjtpmg001;
import kr.co.dbvision.api.pjt.pmg.pjtpmg001.service.Pjtpmg001PjtOutputsService;
import kr.co.dbvision.api.pjt.pmg.pjtpmg001.service.mapper.Pjtpmg001PjtOutputsMapper;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 프로젝트현황에 관한 구현 클래스
 *
 * @author 표준프레임워크센터
 * @since 2020.01.14
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.01.14          디비비전              최초 생성
 *
 * </pre>
 */
@Service("Pjtpmg001PjtOutputsService")
@Transactional
public class Pjtpmg001PjtOutputsServiceImpl extends EgovAbstractServiceImpl implements Pjtpmg001PjtOutputsService {

    Logger logger = LogManager.getLogger(Pjtpmg001PjtOutputsServiceImpl.class);

    @Resource(name="Pjtpmg001PjtOutputsMapper")
    private Pjtpmg001PjtOutputsMapper pjtpmg001PjtOutputsMapper;
    
    @Resource(name="OutputSnGnrService")
    private EgovIdGnrService outputSn;
    
    private int index = 0;
    private int dhtmlxgridRowCount = 0;
    private int totalRowCount = 0;

    public Pjtpmg001PjtOutputsServiceImpl() {
        //
    }

    @SuppressWarnings("unchecked")
    @Override
    public JSONObject searchPjtOutputs(EgovMapForNull paramMap) {
        try {
            
            totalRowCount = 0;
            dhtmlxgridRowCount = 1;
            
            List<EgovMapForNull> outputsList = new ArrayList<EgovMapForNull>();

            Pjtpmg001 entity = new Pjtpmg001(paramMap);
            List<EgovMapForNull> stepList = pjtpmg001PjtOutputsMapper.selectStepList(paramMap);
 
            stepList.stream().forEach(mapperStep->{                
                
                totalRowCount = 0;
                mapperStep.put("projectSn", paramMap.get("projectSn"));
                
                List<EgovMapForNull> detail = getStepDetailOutputsList(mapperStep);
                
                // 작업단계 dhtmlx grid 상의 rowspan 정의
                if(detail.size() > 0)  {                    
                    EgovMapForNull rowspn = new EgovMapForNull();
                    rowspn.put("value", detail.get(0).get("codeNm") + "&nbsp; <a href=\"#none\" id=\"btnGridOutputs"+detail.get(0).get("code")+"\" ><span class=\"glyphicon glyphicon-plus-sign\" id=\"\"> </span></a>");
                    rowspn.put("rowspan", totalRowCount);
                    detail.get(0).replace("codeNm", rowspn);
                    outputsList.addAll(detail);
                }
            });
            
            entity.setRecords(outputsList);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @Override
    public JSONObject searchPjtOutputsTree(EgovMapForNull paramMap) {
        try {

            Pjtpmg001 entity = new Pjtpmg001(paramMap);
            List<EgovMapForNull> list = pjtpmg001PjtOutputsMapper.selectPjtOutputsTreeList(paramMap);
            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @Override
    public JSONObject savePjtOutputs(EgovMapForNull paramMap) {
        try {
            
            String outputStr = StringExpression.nullConvert(paramMap.get("outputs"));
            
            if(!outputStr.equals("")) {
                
                String[] outputsArr = outputStr.split("\\|");
                String[] output;
                EgovMapForNull param;
                
                for(String outputs : outputsArr) {
                    param = new EgovMapForNull();
                    output = outputs.split("\\#");
                    param.put("outputSn", outputSn.getNextStringId());
                    param.put("projectSn", paramMap.get("projectSn"));
                    param.put("outputCode", output[0]);
                    param.put("outputDetailCode", output[1]);
                    param.put("regId", paramMap.get("regId")); 
                    param.put("uptId", paramMap.get("uptId")); 
                    pjtpmg001PjtOutputsMapper.savePjtProjectOutut(param);
                }
            }
            
            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @Override
    public JSONObject modifyPjtOutputs(EgovMapForNull paramMap) {
        try {
            
            
            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            Pjtpmg001 entity = null;
            
            for(String ids : idsArr) {
                
                entity = new Pjtpmg001(paramMap, ids);
 
                switch(entity.getNativeeditorStatus()) {
                case "deleted": 
                    pjtpmg001PjtOutputsMapper.deletePjtProjectOutut(entity);
                    break;
                default: 
                    pjtpmg001PjtOutputsMapper.updatePjtProjectOutut(entity);
                
                }                
            }

            EgovMapForNull returnMap = new EgovMapForNull();
            returnMap.put("code", "000");
            returnMap.put("message", "SUCCESS");            
            
            return new JsonMsgMng().makeJsonObject(returnMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    /**
     * 프로젝트별 등록된 산출물 목록 생성
     * @param paramMap
     * @return
     */
    private List<EgovMapForNull> getStepDetailOutputsList(EgovMapForNull paramMap){
        
        List<EgovMapForNull> resultList = new ArrayList<EgovMapForNull>();
        // 단계활동 산출물 기준 데이터
        List<EgovMapForNull> stepDetailList = pjtpmg001PjtOutputsMapper.selectStepDetailList(paramMap);
        // 프로젝트별 등록된 산출물 목록 생성
        stepDetailList.forEach(mapperStepDetail->{
 
            mapperStepDetail.put("outputCode", mapperStepDetail.get("outputDetailCode"));
            mapperStepDetail.put("code", paramMap.get("outputCode"));
            mapperStepDetail.put("codeNm", paramMap.get("outputCodenm"));
            mapperStepDetail.put("projectSn", paramMap.get("projectSn"));

            // 프로젝트별 등록된 산출물 목록
            List<EgovMapForNull> outputList = pjtpmg001PjtOutputsMapper.selectPjtProjectOututList(mapperStepDetail);
            mergeListTMap(outputList, resultList, mapperStepDetail);         
        });
        
        return resultList;
    }
    
    /**
     * 프로젝트별 등록된 산출물 목록 개별 편집
     * @param orgin
     * @param targetList
     * @param target
     */
    private void mergeListTMap(List<EgovMapForNull> orgin, List<EgovMapForNull> targetList, EgovMapForNull target) {        
        index = 0;
        int size = orgin.size();
        if(size > 0) {                        
            orgin.stream().forEach(map->{
                
                EgovMapForNull mapper = new EgovMapForNull();
                
                // 단계활동 dhtmlx grid 상의 rowspan 정의        
                if(index == 0) {
                    EgovMapForNull rowspn = new EgovMapForNull();
                    rowspn.put("value", target.get("outputDetailCodeNm"));
                    rowspn.put("rowspan", size);
                    mapper.put("outputNm", rowspn);                                       
                    totalRowCount+=size;
                } else {
                    mapper.put("outputNm", target.get("outputDetailCodeNm"));
                }
                mapper.put("outputCd", target.get("outputDetailCode"));                
                mapper.put("code", target.get("code"));
                mapper.put("codeNm", target.get("codeNm"));
                
                mapper.put("projectSn", map.get("projectSn"));
                mapper.put("outputSn", map.get("outputSn"));  
                mapper.put("outputDetailCode", map.get("outputDetailCode"));
                mapper.put("outputDetailCodeNm", map.get("outputDetailCodeNm"));
                mapper.put("outputCn", map.get("outputCn"));
                mapper.put("progrsRt", map.get("progrsRt"));
                mapper.put("planDaycnt", map.get("planDaycnt"));
                mapper.put("comptAt", map.get("comptAt"));
                
                String atch = StringExpression.nullConvert(map.get("atchmnfl"));
                int atchSize = 0;
                String atchSizeStr;
                if(!atch.equals("")) {
                    atchSize = atch.split("\\|").length; 
                    atchSizeStr= "<span style=\"color:red; font-weight:bold\">"+atchSize+"</span>";
                } else {
                    atchSizeStr= "<span>"+atchSize+"</span>";
                }
                
                // 첨부파일
                mapper.put("atchmnflOrg", atch);
                mapper.put("atchmnfl", "<a href=\"#none\" onclick=\"fn_FileUploadPopUpPjtOutputs("+dhtmlxgridRowCount+")\"><span class=\"glyphicon glyphicon glyphicon-floppy-disk\"></span>&nbsp;("+atchSizeStr+")</a>");                
                // 최종 row data 생성
                targetList.add(mapper);
                index++;
                dhtmlxgridRowCount++;
  
            });   
        }
    }
}
































