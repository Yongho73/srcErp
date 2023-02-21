package kr.co.dbvision.api.pub.wks.pubwks016.service.impl;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.mps.bsc.mpsbsc005.entity.Mpsbsc005;
import kr.co.dbvision.api.pub.wks.pubwks016.entity.Pubwks016;
import kr.co.dbvision.api.pub.wks.pubwks016.service.Pubwks016Service;
import kr.co.dbvision.api.pub.wks.pubwks016.service.mapper.Pubwks016Mapper;
import kr.co.dbvision.api.stm.bsc.stmbsc006.service.Stmbsc006Service;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.SessionMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 국내출장신청관리에 관한 서비스 구현 클래스
 *
 * @author 디비비전
 * @since 2020.06.29
 * @version 1.0
 * @sourceGen version 2020.06.29.01 (2020.06.29)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.06.29          디비비전              최초 생성
 * </pre>
 */
@Service("Pubwks016Service")
@Transactional
public class Pubwks016ServiceImpl extends EgovAbstractServiceImpl implements Pubwks016Service {

    Logger logger = LogManager.getLogger(Pubwks016ServiceImpl.class);

    @Resource(name="Pubwks016Mapper")
    private Pubwks016Mapper pubwks016Mapper;

    @Resource(name = "Stmbsc006Service")
    public Stmbsc006Service stmbsc006Service;

    private int listRowNumber = 0; // 넘버링 

    public Pubwks016ServiceImpl() {
        //
    }

    @Override
    public JSONObject userDataPubwks016(EgovMapForNull paramMap) {
        try {

            Pubwks016 entity = new Pubwks016(pubwks016Mapper.userDataPubwks016(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject searchPubwks016(EgovMapForNull paramMap) {
        try {

            Pubwks016 entity = new Pubwks016(paramMap);
            listRowNumber = 1;
            
            List<EgovMapForNull> list = pubwks016Mapper.selectPubwks016List(paramMap).stream().map(mapper ->{
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
    public List<EgovMapForNull> searchPubwks016ForExcel(EgovMapForNull paramMap) {

        return pubwks016Mapper.selectPubwks016List(paramMap);
    }

    @Override
    public JSONObject findPubwks016(EgovMapForNull paramMap) {
        try {

            Pubwks016 entity = new Pubwks016(pubwks016Mapper.selectPubwks016(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }
    
    @Override
    public JSONObject findDtlPubwks016(EgovMapForNull paramMap) {
        try {

            Pubwks016 entity = new Pubwks016(paramMap);
            listRowNumber = 1;
            
            List<EgovMapForNull> list = pubwks016Mapper.findPubwks016DtlList(paramMap).stream().map(mapper ->{
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
    public JSONObject removePubwks016(EgovMapForNull paramMap) throws Exceptions {
        try {
            pubwks016Mapper.deleteDtlPubwks016(paramMap);
            pubwks016Mapper.deletePubwks016(paramMap);
            
            EgovMapForNull returnMap = new EgovMapForNull();
            returnMap.put("code", "000");
            returnMap.put("message", "SUCCESS");

            return new JsonMsgMng().makeJsonObject(returnMap);

        } catch (Exception e) {
            throw e;
        }
    }
    
    @Override
    public JSONObject savePubwks016(EgovMapForNull paramMap) throws Exceptions {
        try {
            Pubwks016 entity = new Pubwks016(paramMap);
            String newNumber = "";
            if ("".equals(entity.getBsrpNo())) {
                EgovMapForNull paramMap2 = new EgovMapForNull();
                paramMap2.put("relTblNm", "MHS_BSRP");
                paramMap2.put("relItemNm", "BSRP_NO");
                JSONObject jsonObj = stmbsc006Service.selectCreateNumberStmbsc006(paramMap2);
                newNumber = jsonObj.get("data").toString();
                entity.setBsrpNo(newNumber); 
            }
            pubwks016Mapper.savePubwks016(entity);

            EgovMapForNull returnMap = new EgovMapForNull();
            returnMap.put("newBsrpNo" , newNumber);
            returnMap.put("code", "000");
            returnMap.put("message", "SUCCESS");

            return new JsonMsgMng().makeJsonObject(returnMap);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject saveDtlPubwks016(EgovMapForNull paramMap) throws Exceptions {
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
            
            Pubwks016 entity = null;
            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            for(String ids : idsArr) {
                entity = new Pubwks016(paramMap , ids);
                entity.setRegId(userId);
                entity.setUptId(userId);
                switch(entity.getNativeeditorStatus()) {
                case "deleted" :
                    pubwks016Mapper.deleteDtlEmpPubwks016(entity);
                    
                    break;
                default : 
                    pubwks016Mapper.saveDtlPubwks016(entity);
                    
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
    public JSONObject saveCopyPubwks016(EgovMapForNull paramMap) throws Exceptions {
        try {
            EgovMapForNull returnMap = new EgovMapForNull();
            int cnt = pubwks016Mapper.selectElctsctSeSnCnt(paramMap);
            if(cnt >= 1) {
                returnMap.put("code", "999");
                returnMap.put("message", "FAIL");
            }
            else {
                pubwks016Mapper.saveBsrpCopyPubwks016(paramMap);
                pubwks016Mapper.saveBsrpDetailCopyPubwks016(paramMap);
                returnMap.put("code", "000");
                returnMap.put("message", "SUCCESS");
            }
            
            
            return new JsonMsgMng().makeJsonObject(returnMap);

        } catch (Exception e) {
            throw e;
        }
    }

}
