package kr.co.dbvision.api.mhs.flx.mhsflx002.service.impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.mhs.flx.mhsflx002.entity.Mhsflx002;
import kr.co.dbvision.api.mhs.flx.mhsflx002.service.Mhsflx002Service;
import kr.co.dbvision.api.mhs.flx.mhsflx002.service.mapper.Mhsflx002Mapper;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.api.stm.bsc.stmbsc006.service.Stmbsc006Service;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.SessionMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 개인별근무유형선택관리에 관한 서비스 구현 클래스
 *
 * @author 디비비전
 * @since 2020.07.13
 * @version 1.0
 * @sourceGen version 2020.06.29.01 (2020.07.13)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.07.13          디비비전              최초 생성
 * </pre>
 */
@Service("Mhsflx002Service")
@Transactional
public class Mhsflx002ServiceImpl extends EgovAbstractServiceImpl implements Mhsflx002Service {

    Logger logger = LogManager.getLogger(Mhsflx002ServiceImpl.class);

    @Resource(name="Mhsflx002Mapper")
    private Mhsflx002Mapper mhsflx002Mapper;

    @Resource(name = "Stmbsc006Service")
    public Stmbsc006Service stmbsc006Service;
    
    private int listRowNumber = 0; // 넘버링 

    public Mhsflx002ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchWorkTyCode(EgovMapForNull paramMap) {
        try {

            Mhsflx002 entity = new Mhsflx002(paramMap);

            List<EgovMapForNull> list = mhsflx002Mapper.selectWorkTyCode(paramMap);

            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }
    
    @Override
    public JSONObject searchMhsflx002(EgovMapForNull paramMap) {
        try {

            Mhsflx002 entity = new Mhsflx002(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = mhsflx002Mapper.selectMhsflx002List(paramMap).stream().map(mapper -> {
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
    public List<EgovMapForNull> searchMhsflx002ForExcel(EgovMapForNull paramMap) {

        return mhsflx002Mapper.selectMhsflx002List(paramMap);
    }

    @Override
    public JSONObject findMhsflx002(EgovMapForNull paramMap) {
        try {

            Mhsflx002 entity = new Mhsflx002(mhsflx002Mapper.selectMhsflx002(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }
    
    @Override
    public JSONObject deleteMhsflx002(EgovMapForNull paramMap) {
        try {

            mhsflx002Mapper.deleteMhsflx002(paramMap);

            EgovMapForNull returnMap = new EgovMapForNull();
            returnMap.put("code", "000");
            returnMap.put("message", "SUCCESS");
            return new JsonMsgMng().makeJsonObject(returnMap);
        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject saveMhsflx002(EgovMapForNull paramMap) throws Exceptions {

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
            Mhsflx002 entity = null;
            EgovMapForNull returnMap = new EgovMapForNull();
            List<Mhsflx002> valCheck = new ArrayList<Mhsflx002>();
            int index = 0;
            for(String ids : idsArr) {

                entity = new Mhsflx002(paramMap, ids);
                entity.setRegId(userId);
                entity.setUptId(userId);
                switch(entity.getNativeeditorStatus()) {
                case "updated":
                    int count1 = mhsflx002Mapper.selectWorkDayValCheck(entity);
                    if(count1 > 0) {
                        valCheck.add(index, entity);
                        index++;
                    }
                    else {
//                        if("002".equals(entity.getConfmSttusCode())) {
//                            Date date = new Date();
//                            SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
//                            entity.setConfmDe(format.format(date));
//                            entity.setConfmerEmpno(userId);
//                        }
//                        else {
//                            entity.setConfmDe("");
//                            entity.setConfmerEmpno("");
//                        }
                        mhsflx002Mapper.saveMhsflx002(entity);
                    }
                    break;
               
                case "inserted":
                    int count = mhsflx002Mapper.selectWorkDayValCheck(entity);
                    if(count > 0) {
                        valCheck.add(index, entity);
                        index++;
                    }
                    else {
                        mhsflx002Mapper.saveMhsflx002(entity);
                    }
                    break;
                }
            }
            //if(false) { throw new Exceptions("Error."); } 
            returnMap.put("valCheck" , valCheck);
            returnMap.put("code", "000");
            returnMap.put("message", "SUCCESS");

            return new JsonMsgMng().makeJsonObject(returnMap);

        } catch (Exception e) {
            throw e;
        }
    }
    
    @Override
    public JSONObject updateSttusMhsflx002(EgovMapForNull paramMap) {
        try {
            Map<String, Object> sessionMap = (Map<String, Object>) SessionMng.getCommonSession();
            String userId = "";
            if (sessionMap == null) {
                return null;
            } 
            else {
                userId = StringExpression.nullConvert(sessionMap.get("userId"));
            }
            Mhsflx002 entity = new Mhsflx002(paramMap);
            
            if("002".equals(entity.getConfmSttusCode())){
                Date date = new Date();
                SimpleDateFormat format = new SimpleDateFormat("yyyyMMdd");
                entity.setConfmDe(format.format(date));  
                entity.setConfmerEmpno(userId);
            }
            else {
                entity.setConfmDe("");  
                entity.setConfmerEmpno("");
            }

            mhsflx002Mapper.updateSttusMhsflx002(entity);
            
            EgovMapForNull returnMap = new EgovMapForNull();
            returnMap.put("code", "000");
            returnMap.put("message", "SUCCESS");
            return new JsonMsgMng().makeJsonObject(returnMap);

        } catch (Exception e) {
            throw e;
        }
    }

}
