package kr.co.dbvision.api.mhs.hrd.mhshrd001.service.impl;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.mhs.hrd.mhshrd001.entity.Mhshrd001;
import kr.co.dbvision.api.mhs.hrd.mhshrd001.service.Mhshrd001Service;
import kr.co.dbvision.api.mhs.hrd.mhshrd001.service.mapper.Mhshrd001Mapper;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.SessionMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 연차일수관리관리에 관한 서비스 구현 클래스
 *
 * @author 디비비전
 * @since 2020.08.10
 * @version 1.0
 * @sourceGen version 2020.08.06.01 (2020.08.10)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.08.10          디비비전              최초 생성
 * </pre>
 */
@Service("Mhshrd001Service")
@Transactional
public class Mhshrd001ServiceImpl extends EgovAbstractServiceImpl implements Mhshrd001Service {

    Logger logger = LogManager.getLogger(Mhshrd001ServiceImpl.class);

    @Resource(name="Mhshrd001Mapper")
    private Mhshrd001Mapper mhshrd001Mapper;

    private int listRowNumber = 0; // 넘버링 

    public Mhshrd001ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchMhshrd001(EgovMapForNull paramMap) {
        try {

            Mhshrd001 entity = new Mhshrd001(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = mhshrd001Mapper.selectMhshrd001List(paramMap).stream().map(mapper -> {
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
    public List<EgovMapForNull> searchMhshrd001ForExcel(EgovMapForNull paramMap) {

        return mhshrd001Mapper.selectMhshrd001List(paramMap);
    }

    @Override
    public JSONObject findMhshrd001(EgovMapForNull paramMap) {
        try {

            Mhshrd001 entity = new Mhshrd001(mhshrd001Mapper.selectMhshrd001(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject saveMhshrd001(EgovMapForNull paramMap) throws Exceptions {

        try {
            Map<String, Object> sessionMap = (Map<String, Object>) SessionMng.getCommonSession();
            String userId = "";
            if (sessionMap == null) {
                return null;
            } else {
                userId = StringExpression.nullConvert(sessionMap.get("userId"));
            }
            
            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            Mhshrd001 entity = null;

            for(String ids : idsArr) {

                entity = new Mhshrd001(paramMap, ids);
                entity.setUptDt(userId);
                
                switch(entity.getNativeeditorStatus()) {
                case "deleted":

                    mhshrd001Mapper.deleteMhshrd001(entity);
                    break;

                default:

                    mhshrd001Mapper.saveMhshrd001(entity);
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
    public JSONObject MHS_YEARCNT(EgovMapForNull paramMap) {
        try {

            EgovMapForNull result = mhshrd001Mapper.MHS_YEARCNT(paramMap);
            
            System.out.println("++++++++++++++++++++++++++++++++++++++" + result);
            
            EgovMapForNull returnMap = new EgovMapForNull();
            returnMap.put("code", "000");
            returnMap.put("message", "SUCCESS");

            return new JsonMsgMng().makeJsonObject(returnMap);

        } catch (Exception e) {
            throw e;
        }
    }
}
