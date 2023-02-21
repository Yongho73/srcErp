package kr.co.dbvision.api.ynd.yta.yndyta008.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.ynd.yta.yndyta008.entity.Yndyta008;
import kr.co.dbvision.api.ynd.yta.yndyta008.service.Yndyta008Service;
import kr.co.dbvision.api.ynd.yta.yndyta008.service.mapper.Yndyta008Mapper;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 근로소득세액기준관리관리에 관한 서비스 구현 클래스
 *
 * @author 디비비전
 * @since 2020.09.03
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.09.03)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.09.03          디비비전              최초 생성
 * </pre>
 */
@Service("Yndyta008Service")
@Transactional
public class Yndyta008ServiceImpl extends EgovAbstractServiceImpl implements Yndyta008Service {

    Logger logger = LogManager.getLogger(Yndyta008ServiceImpl.class);

    @Resource(name="Yndyta008Mapper")
    private Yndyta008Mapper yndyta008Mapper;

    private int listRowNumber = 0; // 넘버링 

    public Yndyta008ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchYndyta008(EgovMapForNull paramMap) {
        try {

            Yndyta008 entity = new Yndyta008(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = yndyta008Mapper.selectYndyta008List(paramMap).stream().map(mapper -> {
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
    public List<EgovMapForNull> searchYndyta008ForExcel(EgovMapForNull paramMap) {

        return yndyta008Mapper.selectYndyta008List(paramMap);
    }

    @Override
    public JSONObject findYndyta008(EgovMapForNull paramMap) {
        try {

            Yndyta008 entity = new Yndyta008(yndyta008Mapper.selectYndyta008(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject saveYndyta008(EgovMapForNull paramMap) throws Exceptions {

        try {

            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            Yndyta008 entity = null;

            for(String ids : idsArr) {

                entity = new Yndyta008(paramMap, ids);

                switch(entity.getNativeeditorStatus()) {
                case "deleted":

                    yndyta008Mapper.deleteYndyta008(entity);
                    break;

                default:
                    
                    yndyta008Mapper.saveYndyta008(entity);
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
    public JSONObject findSaveYndyta008(EgovMapForNull paramMap) {
        try {

            Yndyta008 entity = new Yndyta008(yndyta008Mapper.findSaveYndyta008(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }
    
    @Override
    public JSONObject saveCopyYndLaborTaxddcStd(EgovMapForNull paramMap) {
        try {
            Yndyta008 entity = new Yndyta008(paramMap);
            //기존 데이터가 있으면 삭제후 저장 
            yndyta008Mapper.deleteYndyta008(entity);

            yndyta008Mapper.insertCopyYndyta008(entity);
            
            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

}
