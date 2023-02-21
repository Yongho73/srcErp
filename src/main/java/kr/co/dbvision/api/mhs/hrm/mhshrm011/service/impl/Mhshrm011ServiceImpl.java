package kr.co.dbvision.api.mhs.hrm.mhshrm011.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.mhs.hrm.mhshrm011.entity.Mhshrm011;
import kr.co.dbvision.api.mhs.hrm.mhshrm011.service.Mhshrm011Service;
import kr.co.dbvision.api.mhs.hrm.mhshrm011.service.mapper.Mhshrm011Mapper;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 인사발령코드관리에 관한 서비스 구현 클래스
 *
 * @author 디비비전
 * @since 2020.08.27
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.08.27)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.08.27          디비비전              최초 생성
 * </pre>
 */
@Service("Mhshrm011Service")
@Transactional
public class Mhshrm011ServiceImpl extends EgovAbstractServiceImpl implements Mhshrm011Service {

    Logger logger = LogManager.getLogger(Mhshrm011ServiceImpl.class);

    @Resource(name="Mhshrm011Mapper")
    private Mhshrm011Mapper mhshrm011Mapper;

    private int listRowNumber = 0; // 넘버링 

    public Mhshrm011ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchMhshrm011(EgovMapForNull paramMap) {
        try {

            Mhshrm011 entity = new Mhshrm011(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = mhshrm011Mapper.selectMhshrm011List(paramMap).stream().map(mapper -> {
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
    public List<EgovMapForNull> searchMhshrm011ForExcel(EgovMapForNull paramMap) {

        return mhshrm011Mapper.selectMhshrm011List(paramMap);
    }

    @Override
    public JSONObject findMhshrm011(EgovMapForNull paramMap) {
        try {

            Mhshrm011 entity = new Mhshrm011(mhshrm011Mapper.selectMhshrm011(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }


    @Override
    public JSONObject deleteCheckMhshrm011(EgovMapForNull paramMap) {
        try {

            Mhshrm011 entity = new Mhshrm011(mhshrm011Mapper.deleteMhshrm011UseChk(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject saveMhshrm011(EgovMapForNull paramMap) throws Exceptions {

        try {

            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            Mhshrm011 entity = null;

            for(String ids : idsArr) {

                entity = new Mhshrm011(paramMap, ids);

                switch(entity.getNativeeditorStatus()) {
                case "deleted":
                    
                    mhshrm011Mapper.deleteMhshrm011(entity);
                    break;

                default:

                    mhshrm011Mapper.saveMhshrm011(entity);
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
    
  //인사발령코드 콤보 목록을 조회한다.
    @Override
    public JSONObject searchMhshrm011CodeCombo(EgovMapForNull paramMap) {
        try {

            Mhshrm011 entity = new Mhshrm011(paramMap);
            List<EgovMapForNull> list = mhshrm011Mapper.selectMhshrm011CodeCombo(paramMap);
            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    
    /* 사용여부 확인 */
    @Override
    public JSONObject useCheckMhshrm011(EgovMapForNull paramMap) {
        try {

            Mhshrm011 entity = new Mhshrm011(mhshrm011Mapper.useCheckMhshrm011(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

}
