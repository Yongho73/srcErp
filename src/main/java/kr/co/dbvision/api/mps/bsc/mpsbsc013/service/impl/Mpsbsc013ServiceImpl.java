package kr.co.dbvision.api.mps.bsc.mpsbsc013.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.mps.bsc.mpsbsc013.entity.Mpsbsc013;
import kr.co.dbvision.api.mps.bsc.mpsbsc013.service.Mpsbsc013Service;
import kr.co.dbvision.api.mps.bsc.mpsbsc013.service.mapper.Mpsbsc013Mapper;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 사회보험요율관리관리에 관한 서비스 구현 클래스
 *
 * @author 디비비전
 * @since 2020.06.12
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.06.12          디비비전              최초 생성
 * </pre>
 */
@Service("Mpsbsc013Service")
@Transactional
public class Mpsbsc013ServiceImpl extends EgovAbstractServiceImpl implements Mpsbsc013Service {

    Logger logger = LogManager.getLogger(Mpsbsc013ServiceImpl.class);

    @Resource(name="Mpsbsc013Mapper")
    private Mpsbsc013Mapper mpsbsc013Mapper;
    
    private int listRowNumber = 0; // 넘버링 

    public Mpsbsc013ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchMpsbsc013(EgovMapForNull paramMap) {
        try {

            Mpsbsc013 entity = new Mpsbsc013(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = mpsbsc013Mapper.selectMpsbsc013List(paramMap).stream().map(mapper -> {
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
    public List<EgovMapForNull> searchMpsbsc013ForExcel(EgovMapForNull paramMap) {

        return mpsbsc013Mapper.selectMpsbsc013List(paramMap);
    }

    @Override
    public JSONObject findMpsbsc013(EgovMapForNull paramMap) {
        try {

            Mpsbsc013 entity = new Mpsbsc013(mpsbsc013Mapper.selectMpsbsc013(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject saveMpsbsc013(EgovMapForNull paramMap) {

        try {

            mpsbsc013Mapper.saveMpsbsc013(paramMap);

            EgovMapForNull returnMap = new EgovMapForNull();
            returnMap.put("code", "000");
            returnMap.put("message", "SUCCESS");

            return new JsonMsgMng().makeJsonObject(returnMap);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject deleteMpsbsc013(EgovMapForNull paramMap) {

        try {

            mpsbsc013Mapper.deleteMpsbsc013(paramMap);
            mpsbsc013Mapper.deleteMpsbsc013Tap2Tariff(paramMap);
            mpsbsc013Mapper.deleteMpsbsc013Tap3Rtrpay(paramMap);

            EgovMapForNull returnMap = new EgovMapForNull();
            returnMap.put("code", "000");
            returnMap.put("message", "SUCCESS");

            return new JsonMsgMng().makeJsonObject(returnMap);

        } catch (Exception e) {
            throw e;
        }
    }
    
    @Override
    public JSONObject selectMpsbscTap2Tariff(EgovMapForNull paramMap) {
        
        try {
            
            Mpsbsc013 entity = new Mpsbsc013(mpsbsc013Mapper.selectMpsbscTap2Tariff(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    
    @Override
    public JSONObject saveMpsbscTap2Tariff(EgovMapForNull paramMap) {

        try {
            
            mpsbsc013Mapper.saveMpsbscTap2Tariff(paramMap);

            EgovMapForNull returnMap = new EgovMapForNull();
            returnMap.put("code", "000");
            returnMap.put("message", "SUCCESS");

            return new JsonMsgMng().makeJsonObject(returnMap);

        } catch (Exception e) {
            throw e;
        }
    }
    
    
    @Override
    public JSONObject selectMpsbscTap3Rtrpay(EgovMapForNull paramMap) {
        
        try {
            
            Mpsbsc013 entity3 = new Mpsbsc013(mpsbsc013Mapper.selectMpsbscTap3Rtrpay(paramMap));
            return new JsonMsgMng().makeJsonObject(entity3);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    
    @Override
    public JSONObject saveMpsbscTap3Rtrpay(EgovMapForNull paramMap) {

        try {
            
            mpsbsc013Mapper.saveMpsbscTap3Rtrpay(paramMap);

            EgovMapForNull returnMap = new EgovMapForNull();
            returnMap.put("code", "000");
            returnMap.put("message", "SUCCESS");

            return new JsonMsgMng().makeJsonObject(returnMap);

        } catch (Exception e) {
            throw e;
        }
    }

}
