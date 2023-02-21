package kr.co.dbvision.api.mhs.hrd.mhshrd002.service.impl;

import java.util.List;

import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.mhs.hrd.mhshrd002.service.mapper.Mhshrd002Mapper;
import kr.co.dbvision.api.mhs.hrd.mhshrd002.entity.Mhshrd002;
import kr.co.dbvision.api.mhs.hrd.mhshrd002.service.Mhshrd002Service;
import kr.co.dbvision.api.mhs.hrd.mhshrd002.service.impl.Mhshrd002ServiceImpl;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;



/**
 * 휴가신청관리에 관한 서비스 구현 클래스
 *
 * @author 디비비전
 * @since 2020.06.04
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.06.04          디비비전              최초 생성
 * </pre>
 */
@Service("Mhshrd002Service")
@Transactional
public class Mhshrd002ServiceImpl extends EgovAbstractServiceImpl implements Mhshrd002Service {

    Logger logger = LogManager.getLogger(Mhshrd002ServiceImpl.class);

    @Resource(name="Mhshrd002Mapper")
    private Mhshrd002Mapper mhshrd002Mapper;

    private int listRowNumber = 0; // 넘버링 

    public Mhshrd002ServiceImpl() {
        //
    }
    
    @Override
    public JSONObject WrycTime(EgovMapForNull paramMap) {
        try {

            Mhshrd002 entity = new Mhshrd002(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = mhshrd002Mapper.WrycTime(paramMap).stream().map(mapper -> {
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
    public JSONObject searchWrycDaycntMhshrd002(EgovMapForNull paramMap) {
        try {

            Mhshrd002 entity = new Mhshrd002(mhshrd002Mapper.searchWrycDaycntMhshrd002(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject searchMhshrd002(EgovMapForNull paramMap) {
        try {

            Mhshrd002 entity = new Mhshrd002(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = mhshrd002Mapper.selectMhshrd002List(paramMap).stream().map(mapper -> {
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
    public JSONObject searchAltRewardHvofDeMhshrd002(EgovMapForNull paramMap) {
        try {

            Mhshrd002 entity = new Mhshrd002(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = mhshrd002Mapper.selectAltRewardHvofDeMhshrd002(paramMap).stream().map(mapper -> {
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
    public List<EgovMapForNull> searchMhshrd002ForExcel(EgovMapForNull paramMap) {

        return mhshrd002Mapper.selectMhshrd002List(paramMap);
    }

    @Override
    public JSONObject findMhshrd002(EgovMapForNull paramMap) {
        try {

            Mhshrd002 entity = new Mhshrd002(mhshrd002Mapper.selectMhshrd002(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject saveMhshrd002(EgovMapForNull paramMap) throws Exceptions {

        try {

            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            Mhshrd002 entity = null;

            for(String ids : idsArr) {

                entity = new Mhshrd002(paramMap, ids);

                switch(entity.getNativeeditorStatus()) {
                case "deleted":

                    mhshrd002Mapper.deleteMhshrd002(entity);
                    break;

                default:

                    mhshrd002Mapper.saveMhshrd002(entity);
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

}
