package kr.co.dbvision.api.mta.mat.mtamat002.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.mta.mat.mtamat002.entity.Mtamat002;
import kr.co.dbvision.api.mta.mat.mtamat002.service.Mtamat002Service;
import kr.co.dbvision.api.mta.mat.mtamat002.service.mapper.Mtamat002Mapper;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 유지보수요청요약에 관한 구현 클래스
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
@Service("Mtamat002Service")
@Transactional
public class Mtamat002ServiceImpl extends EgovAbstractServiceImpl implements Mtamat002Service {

    Logger logger = LogManager.getLogger(Mtamat002ServiceImpl.class);

    @Resource(name="Mtamat002Mapper")
    private Mtamat002Mapper mtamat002Mapper;

    public Mtamat002ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchMtaRequst(EgovMapForNull paramMap) {
        try {

            Mtamat002 entity = new Mtamat002(paramMap);
            List<EgovMapForNull> list = mtamat002Mapper.selectMtaRequstList(paramMap);
            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @Override
    public List<EgovMapForNull> searchMtaRequstForExcel(EgovMapForNull paramMap) {

        return mtamat002Mapper.selectMtaRequstList(paramMap);
    }

    @Override
    public JSONObject findMtaRequst(EgovMapForNull paramMap) {
        try {

            Mtamat002 entity = new Mtamat002(mtamat002Mapper.selectMtaRequst(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @Override
    public JSONObject saveMtaRequst(EgovMapForNull paramMap) {

        try {

            mtamat002Mapper.insertMtaRequst(paramMap);
            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @Override
    public JSONObject modifyMtaRequst(EgovMapForNull paramMap) {

        try {

            mtamat002Mapper.updateMtaRequst(paramMap);
            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @Override
    public JSONObject removeMtaRequst(EgovMapForNull paramMap) {

        try {

            String projectNos = StringExpression.nullConvert(paramMap.get("projectNos"));
            String[] projectNoArr = projectNos.split("\\,");
            String requstNos = StringExpression.nullConvert(paramMap.get("requstNos"));
            String[] requstNoArr = requstNos.split("\\,");

            int arrLength = (requstNoArr == null) ? 0 : requstNoArr.length;
            EgovMapForNull mapper = null;

            for (int keyColumnIdx = 0; keyColumnIdx < arrLength; keyColumnIdx++) {

                mapper = new EgovMapForNull();
                mapper.put("projectNo", projectNoArr[keyColumnIdx]);
                mapper.put("requstNo", requstNoArr[keyColumnIdx]);

                mtamat002Mapper.deleteMtaRequst(mapper);
            }

            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
}
