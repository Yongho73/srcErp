package kr.co.dbvision.api.pub.wks.pubwks013.service.impl;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.pub.wks.pubwks013.entity.Pubwks013;
import kr.co.dbvision.api.pub.wks.pubwks013.service.Pubwks013Service;
import kr.co.dbvision.api.pub.wks.pubwks013.service.mapper.Pubwks013Mapper;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.SessionMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 출장복명관리에 관한 서비스 구현 클래스
 *
 * @author 디비비전
 * @since 2020.07.07
 * @version 1.0
 * @sourceGen version 2020.06.29.01 (2020.07.07)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.07.07          디비비전              최초 생성
 * </pre>
 */
@Service("Pubwks013Service")
@Transactional
public class Pubwks013ServiceImpl extends EgovAbstractServiceImpl implements Pubwks013Service {

    Logger logger = LogManager.getLogger(Pubwks013ServiceImpl.class);

    @Resource(name="Pubwks013Mapper")
    private Pubwks013Mapper pubwks013Mapper;

    private int listRowNumber = 0; // 넘버링 

    public Pubwks013ServiceImpl() {
        //
    }

    @Override
    public JSONObject userDataPubwks013(EgovMapForNull paramMap) {
        try {

            Pubwks013 entity = new Pubwks013(pubwks013Mapper.userDataPubwks013(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }
    
    @Override
    public JSONObject searchPubwks013(EgovMapForNull paramMap) {
        try {

            Pubwks013 entity = new Pubwks013(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = pubwks013Mapper.selectPubwks013List(paramMap).stream().map(mapper -> {
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
    public List<EgovMapForNull> searchPubwks013ForExcel(EgovMapForNull paramMap) {

        return pubwks013Mapper.selectPubwks013List(paramMap);
    }

    @Override
    public JSONObject findPubwks013(EgovMapForNull paramMap) {
        try {

            Pubwks013 entity = new Pubwks013(pubwks013Mapper.selectPubwks013(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject findDtlPubwks013(EgovMapForNull paramMap) {
        try {

            Pubwks013 entity = new Pubwks013(paramMap);
            listRowNumber = 1;
            
            List<EgovMapForNull> list = pubwks013Mapper.selectPubwks013DtlList(paramMap).stream().map(mapper ->{
                mapper.put("num" , listRowNumber++);
                return mapper;
            }).collect(Collectors.toList());
            
            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject findDtl2Pubwks013(EgovMapForNull paramMap) {
        try {

            Pubwks013 entity = new Pubwks013(paramMap);
            listRowNumber = 1;
            
            List<EgovMapForNull> list = pubwks013Mapper.selectPubwks013Dtl2List(paramMap).stream().map(mapper ->{
                mapper.put("num" , listRowNumber++);
                return mapper;
            }).collect(Collectors.toList());
            
            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }
    
    @Override
    public JSONObject updateBsrpAtchflNo(EgovMapForNull paramMap) {
        try {
            Pubwks013 entity = new Pubwks013(paramMap);
            
            pubwks013Mapper.updateBsrpAtchflNoPubwks013(entity);
            
            EgovMapForNull returnMap = new EgovMapForNull();
            returnMap.put("code", "000");
            returnMap.put("message", "SUCCESS");
            
            return new JsonMsgMng().makeJsonObject(returnMap);
        }
        catch (Exception e) {
            throw e;
        }
    }
    
    @Override
    public JSONObject saveExcclcPubwks013(EgovMapForNull paramMap) throws Exceptions {
        try {
            Map<String, Object> sessionMap = (Map<String, Object>) SessionMng.getCommonSession();
            String userId = "";
            if (sessionMap == null) {
                return null;
            } else {
                userId = StringExpression.nullConvert(sessionMap.get("userId"));
    
                if (StringExpression.isEmpty(userId)) {
                    return null;
                } else {
                    paramMap.put("regId", userId);
                }
            }
            
            Pubwks013 entity = null;
            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            for(String ids : idsArr) {
                entity = new Pubwks013(paramMap , ids);
                entity.setRegId(userId);
                entity.setUptId(userId);
                
                pubwks013Mapper.saveExcclcPubwks013(entity);
                
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
    public JSONObject saveCopyPubwks013(EgovMapForNull paramMap) {
        try {
            EgovMapForNull returnMap = new EgovMapForNull();

            int cnt = pubwks013Mapper.selectExcclcSnCnt(paramMap);
            if(cnt >= 1) {
                returnMap.put("code", "999");
                returnMap.put("message", "FAIL");
            }
            else {
                pubwks013Mapper.saveExcclcCopyPubwks013(paramMap);
                pubwks013Mapper.saveExcclcDetailCopyPubwks013(paramMap);
                pubwks013Mapper.updateBsrpExcclcSn(paramMap);
                returnMap.put("code", "000");
                returnMap.put("message", "SUCCESS");
            }
                    
            return new JsonMsgMng().makeJsonObject(returnMap);

        } catch (Exception e) {
            throw e;
        }
    }

}
