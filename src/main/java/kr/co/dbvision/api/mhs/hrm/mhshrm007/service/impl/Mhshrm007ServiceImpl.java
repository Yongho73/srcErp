package kr.co.dbvision.api.mhs.hrm.mhshrm007.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.mhs.hrm.mhshrm007.entity.Mhshrm007;
import kr.co.dbvision.api.mhs.hrm.mhshrm007.service.Mhshrm007Service;
import kr.co.dbvision.api.mhs.hrm.mhshrm007.service.mapper.Mhshrm007Mapper;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 학교코드관리에 관한 구현 클래스
 *
 * @author 표준프레임워크센터
 * @since 2019.05.13
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2019.05.13          디비비전              최초 생성
 *
 * </pre>
 */
@Service("Mhshrm007Service")
@Transactional
public class Mhshrm007ServiceImpl extends EgovAbstractServiceImpl implements Mhshrm007Service {

    Logger logger = LogManager.getLogger(Mhshrm007ServiceImpl.class);

    @Resource(name="Mhshrm007Mapper")
    private Mhshrm007Mapper Mhshrm007Mapper;

    public Mhshrm007ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchMhsSchulCode(EgovMapForNull paramMap) {
        try {

            Mhshrm007 entity = new Mhshrm007(paramMap);
            List<EgovMapForNull> list = Mhshrm007Mapper.selectMhsSchulCodeList(paramMap);
            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @Override
    public List<EgovMapForNull> searchMhsSchulCodeForExcel(EgovMapForNull paramMap) {

        return Mhshrm007Mapper.selectMhsSchulCodeList(paramMap);
    }

    @Override
    public JSONObject findMhsSchulCode(EgovMapForNull paramMap) {
        try {

            Mhshrm007 entity = new Mhshrm007(Mhshrm007Mapper.selectMhsSchulCode(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @Override
    public JSONObject saveMhsSchulCode(EgovMapForNull paramMap) {

        try {

            Mhshrm007Mapper.insertMhsSchulCode(paramMap);
            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @Override
    public JSONObject modifyMhsSchulCode(EgovMapForNull paramMap) {

        try {

            Mhshrm007Mapper.updateMhsSchulCode(paramMap);
            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @Override
    public JSONObject removeMhsSchulCode(EgovMapForNull paramMap) {

        try {

            String schulCodes = StringExpression.nullConvert(paramMap.get("schulCodes"));
            String[] schulCodeArr = schulCodes.split("\\,");

            int arrLength = (schulCodeArr == null) ? 0 : schulCodeArr.length;
            EgovMapForNull mapper = null;

            for (int keyColumnIdx = 0; keyColumnIdx < arrLength; keyColumnIdx++) {

                mapper = new EgovMapForNull();
                mapper.put("schulCode", schulCodeArr[keyColumnIdx]);

                Mhshrm007Mapper.deleteMhsSchulCode(mapper);
            }

            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
}
