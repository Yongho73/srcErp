package kr.co.dbvision.api.pub.wks.pubwks021.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.pub.wks.pubwks021.entity.Pubwks021;
import kr.co.dbvision.api.pub.wks.pubwks021.service.Pubwks021Service;
import kr.co.dbvision.api.pub.wks.pubwks021.service.mapper.Pubwks021Mapper;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.SessionMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 개인별근무유형관리관리에 관한 서비스 구현 클래스
 *
 * @author 디비비전
 * @since 2020.07.31
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.07.31)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.07.31          디비비전              최초 생성
 * </pre>
 */
@Service("Pubwks021Service")
@Transactional
public class Pubwks021ServiceImpl extends EgovAbstractServiceImpl implements Pubwks021Service {

    Logger logger = LogManager.getLogger(Pubwks021ServiceImpl.class);

    @Resource(name="Pubwks021Mapper")
    private Pubwks021Mapper pubwks021Mapper;

    private int listRowNumber = 0; // 넘버링 

    public Pubwks021ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchPubwks021(EgovMapForNull paramMap) {
        try {

            Pubwks021 entity = new Pubwks021(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = pubwks021Mapper.selectPubwks021List(paramMap).stream().map(mapper -> {
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
    public List<EgovMapForNull> searchPubwks021ForExcel(EgovMapForNull paramMap) {

        return pubwks021Mapper.selectPubwks021List(paramMap);
    }

    @Override
    public JSONObject findPubwks021(EgovMapForNull paramMap) {
        try {

            Pubwks021 entity = new Pubwks021(pubwks021Mapper.selectPubwks021(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject findNoSttusPubwks021(EgovMapForNull paramMap) {
        try {

            Pubwks021 entity = new Pubwks021(pubwks021Mapper.selectNoSttusPubwks021(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }
    

    @Override
    public JSONObject updateSttusPubwks021(EgovMapForNull paramMap) {
        try {

            pubwks021Mapper.updateSttusPubwks021(paramMap);
            
            EgovMapForNull returnMap = new EgovMapForNull();
            returnMap.put("code", "000");
            returnMap.put("message", "SUCCESS");

            return new JsonMsgMng().makeJsonObject(returnMap);

        } catch (Exception e) {
            throw e;
        }
    }
    
    @Override
    public JSONObject deletePubwks021(EgovMapForNull paramMap) {
        try {

            pubwks021Mapper.deletePubwks021(paramMap);
            
            EgovMapForNull returnMap = new EgovMapForNull();
            returnMap.put("code", "000");
            returnMap.put("message", "SUCCESS");

            return new JsonMsgMng().makeJsonObject(returnMap);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject savePubwks021(EgovMapForNull paramMap) throws Exceptions {

        try {
            Map<String, Object> sessionMap = (Map<String, Object>) SessionMng.getCommonSession();
            String userId = "";
            if (sessionMap == null) {
                return null;
            } 
            else {
                userId = StringExpression.nullConvert(sessionMap.get("userId"));
                if (StringExpression.isEmpty(userId)) {
                    return null;
                } 
                else {
                    paramMap.put("regId", userId);
                    paramMap.put("uptId", userId);
                    
                }
            }
            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            Pubwks021 entity = null;
            List<Pubwks021> valCheck = new ArrayList<Pubwks021>();
            int index = 0;
            for(String ids : idsArr) {

                entity = new Pubwks021(paramMap, ids);
                entity.setRegId(userId);
                entity.setUptId(userId);
                int count = pubwks021Mapper.selectWorkDayValCheck(entity);
                if(count > 0) {
                    valCheck.add(index, entity);
                    index++;
                }
                else {
                    pubwks021Mapper.savePubwks021(entity);
                }
            }
            //if(false) { throw new Exceptions("Error."); } 
            EgovMapForNull returnMap = new EgovMapForNull();
            returnMap.put("valCheck" , valCheck);
            returnMap.put("code", "000");
            returnMap.put("message", "SUCCESS");

            return new JsonMsgMng().makeJsonObject(returnMap);

        } catch (Exception e) {
            throw e;
        }
    }

}
