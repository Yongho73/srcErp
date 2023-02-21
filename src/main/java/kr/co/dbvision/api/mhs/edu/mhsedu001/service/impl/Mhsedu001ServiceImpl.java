package kr.co.dbvision.api.mhs.edu.mhsedu001.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.mhs.edu.mhsedu001.entity.Mhsedu001;
import kr.co.dbvision.api.mhs.edu.mhsedu001.service.Mhsedu001Service;
import kr.co.dbvision.api.mhs.edu.mhsedu001.service.mapper.Mhsedu001Mapper;
import kr.co.dbvision.api.stm.bsc.stmbsc006.service.Stmbsc006Service;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 교육과정등록관리에 관한 서비스 구현 클래스
 *
 * @author 디비비전
 * @since 2020.08.19
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.08.19)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.08.19          디비비전              최초 생성
 * </pre>
 */
@Service("Mhsedu001Service")
@Transactional
public class Mhsedu001ServiceImpl extends EgovAbstractServiceImpl implements Mhsedu001Service {

    Logger logger = LogManager.getLogger(Mhsedu001ServiceImpl.class);

    @Resource(name="Mhsedu001Mapper")
    private Mhsedu001Mapper mhsedu001Mapper;

    @Resource(name = "Stmbsc006Service")
    public Stmbsc006Service stmbsc006Service;
    
    private int listRowNumber = 0; // 넘버링 

    public Mhsedu001ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchMhsedu001(EgovMapForNull paramMap) {
        try {

            Mhsedu001 entity = new Mhsedu001(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = mhsedu001Mapper.selectMhsedu001List(paramMap).stream().map(mapper -> {
                    mapper.put("num", listRowNumber++);
                    return mapper;
            }).collect(Collectors.toList());
            
            //mhsedu001Mapper.searchMhseduTime(entity);
            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public List<EgovMapForNull> searchMhsedu001ForExcel(EgovMapForNull paramMap) {

        return mhsedu001Mapper.selectMhsedu001List(paramMap);
    }

    @Override
    public JSONObject findMhsedu001(EgovMapForNull paramMap) {
        try {

            Mhsedu001 entity = new Mhsedu001(mhsedu001Mapper.selectMhsedu001(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject saveMhsedu001(EgovMapForNull paramMap) throws Exceptions {

        try {

            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            Mhsedu001 entity = null;
            //Mhsedu001 entity2 = null;
            for(String ids : idsArr) {

                entity = new Mhsedu001(paramMap, ids, "1");
                System.out.println("@@@@@@@"+entity.getEducourseCode());
              //  entity2 = new Mhsedu001(paramMap, ids, "2");
                
                switch(entity.getNativeeditorStatus()) {
                case "deleted":
//                    mhsedu001Mapper.deleteMhseduEmp(entity);
//                    mhsedu001Mapper.deleteMhseduTime(entity);
                    mhsedu001Mapper.deleteMhsedu001(entity);
                    
                    break;
                
                case "updated":
                    
                    mhsedu001Mapper.saveMhsedu001(entity);
                    
                    break;
                case "inserted":
                    String newNumber = "";
                    
                    if (entity.getEducourseCode().equals("")) {
                        EgovMapForNull paramMap2 = new EgovMapForNull();
                        paramMap2.put("relTblNm", "MHS_EDUCRSE");
                        paramMap2.put("relItemNm", "EDUCOURSE_CODE");

                        JSONObject jsonObj = stmbsc006Service.selectCreateNumberStmbsc006(paramMap2);
                        newNumber = jsonObj.get("data").toString();
                        
                        
                        entity.setEducourseCode(newNumber);
                        
                    }
                    mhsedu001Mapper.saveMhsedu001(entity);
                    break;
                default:
                    break;
                }
            }
            //if(false) { throw new Exceptions("Error."); } 

            EgovMapForNull returnMap = new EgovMapForNull();
            returnMap.put("code", "000");
            returnMap.put("message", "SUCCESS");

            return new JsonMsgMng().makeJsonObject(returnMap);

        } catch (Exception e) {
            throw e;
        }
    }
    
    @Override
    public JSONObject saveMhseduTime(EgovMapForNull paramMap){

        try {

            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            Mhsedu001 entity = null;

            for(String ids : idsArr) {
                
                entity = new Mhsedu001(paramMap, ids,"2");
                switch(entity.getNativeeditorStatus()) {
                case "deleted":
                    mhsedu001Mapper.deleteMhseduTime(entity);
                    break;
                
                case "updated":
                    mhsedu001Mapper.saveMhseduTime(entity);
                    
                    break;
                default:
                    break;
                }
            } 

            EgovMapForNull returnMap = new EgovMapForNull();
            returnMap.put("code", "000");
            returnMap.put("message", "SUCCESS");

            return new JsonMsgMng().makeJsonObject(returnMap);

        } catch (Exception e) {
            throw e;
        }
    }
    
    @Override
    public JSONObject saveMhseduEmp(EgovMapForNull paramMap){

        try {

            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            Mhsedu001 entity = null;
            for(String ids : idsArr) {

                entity = new Mhsedu001(paramMap, ids,"3");
                
                switch(entity.getNativeeditorStatus()) {
                case "deleted":

                    mhsedu001Mapper.deleteMhseduEmp(entity);
                    break;
                case "inserted":

                    mhsedu001Mapper.saveMhseduEmp(entity);
                    break;
                default:
                    break;
                }
            }

            EgovMapForNull returnMap = new EgovMapForNull();
            returnMap.put("code", "000");
            returnMap.put("message", "SUCCESS");

            return new JsonMsgMng().makeJsonObject(returnMap);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject searchMhseduTime(EgovMapForNull paramMap) {
        try {

            Mhsedu001 entity = new Mhsedu001(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = mhsedu001Mapper.selectMhseduTime(paramMap).stream().map(mapper -> {
                    mapper.put("num", listRowNumber++);
                    return mapper;
            }).collect(Collectors.toList());

            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject searchMhseduEmp(EgovMapForNull paramMap) {
        try {

            Mhsedu001 entity = new Mhsedu001(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = mhsedu001Mapper.selectMhseduEmp(paramMap).stream().map(mapper -> {
                    mapper.put("num", listRowNumber++);
                    return mapper;
            }).collect(Collectors.toList());

            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject saveCopyMhsedu(EgovMapForNull paramMap) throws Exceptions {
        try {
            EgovMapForNull returnMap = new EgovMapForNull();
            int cnt = mhsedu001Mapper.selectElctsctSeSnCnt(paramMap);
            if(cnt >= 1) {
                returnMap.put("code", "999");
                returnMap.put("message", "FAIL");
            }
            else {
                mhsedu001Mapper.saveCopyMhsedu001(paramMap);
                mhsedu001Mapper.saveCopyMhseduTime(paramMap);
                mhsedu001Mapper.saveCopyMhseduEmp(paramMap);
                returnMap.put("code", "000");
                returnMap.put("message", "SUCCESS");
            }
            
            return new JsonMsgMng().makeJsonObject(returnMap);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject searchMhseduPopList(EgovMapForNull paramMap) {
        try {

            Mhsedu001 entity = new Mhsedu001(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = mhsedu001Mapper.selectMhseduPopList(paramMap).stream().map(mapper -> {
                    mapper.put("num", listRowNumber++);
                    return mapper;
            }).collect(Collectors.toList());

            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
       
    }

}
