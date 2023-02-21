package kr.co.dbvision.api.mps.bas.mpsbas002.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.mps.bas.mpsbas002.entity.Mpsbas002;
import kr.co.dbvision.api.mps.bas.mpsbas002.service.Mpsbas002Service;
import kr.co.dbvision.api.mps.bas.mpsbas002.service.mapper.Mpsbas002Mapper;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 사회보험율관리에 관한 구현 클래스
 *
 * @author 표준프레임워크센터
 * @since 2019.12.16
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2019.12.16          디비비전              최초 생성
 *
 * </pre>
 */
@Service("Mpsbas002Service")
@Transactional
public class Mpsbas002ServiceImpl extends EgovAbstractServiceImpl implements Mpsbas002Service {

    Logger logger = LogManager.getLogger(Mpsbas002ServiceImpl.class);

    @Resource(name="Mpsbas002Mapper")
    private Mpsbas002Mapper mpsbas002Mapper;

    public Mpsbas002ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchMpsSnlrcTariff(EgovMapForNull paramMap) {
        try {

            Mpsbas002 entity = new Mpsbas002(paramMap);
            List<EgovMapForNull> list = mpsbas002Mapper.selectMpsSnlrcTariffList(paramMap);
            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @Override
    public List<EgovMapForNull> searchMpsSnlrcTariffForExcel(EgovMapForNull paramMap) {

        return mpsbas002Mapper.selectMpsSnlrcTariffList(paramMap);
    }

    @Override
    public JSONObject findMpsSnlrcTariff(EgovMapForNull paramMap) {
        try {

            Mpsbas002 entity = new Mpsbas002(mpsbas002Mapper.selectMpsSnlrcTariff(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @Override
    public JSONObject saveMpsSnlrcTariff(EgovMapForNull paramMap) {

        try {

            mpsbas002Mapper.insertMpsSnlrcTariff(paramMap);
            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @Override
    public JSONObject modifyMpsSnlrcTariff(EgovMapForNull paramMap) {

        try {

            mpsbas002Mapper.updateMpsSnlrcTariff(paramMap);
            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @Override
    public JSONObject removeMpsSnlrcTariff(EgovMapForNull paramMap) {

        try {

            String changeDes = StringExpression.nullConvert(paramMap.get("changeDes"));
            String[] changeDeArr = changeDes.split("\\,");

            int arrLength = (changeDeArr == null) ? 0 : changeDeArr.length;
            EgovMapForNull mapper = null;

            for (int keyColumnIdx = 0; keyColumnIdx < arrLength; keyColumnIdx++) {

                mapper = new EgovMapForNull();
                mapper.put("changeDe", changeDeArr[keyColumnIdx]);

                mpsbas002Mapper.deleteMpsSnlrcTariff(mapper);
            }

            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
}
