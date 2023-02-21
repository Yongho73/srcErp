package kr.co.dbvision.api.mfs.rpt.mfsrpt003.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.mfs.rpt.mfsrpt003.entity.Mfsrpt003;
import kr.co.dbvision.api.mfs.rpt.mfsrpt003.service.Mfsrpt003Service;
import kr.co.dbvision.api.mfs.rpt.mfsrpt003.service.mapper.Mfsrpt003Mapper;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 출장결의서에 관한 구현 클래스
 *
 * @author 표준프레임워크센터
 * @since 2019.05.31
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2019.05.31          디비비전              최초 생성
 *
 * </pre>
 */
@Service("Mfsrpt003Service")
@Transactional
public class Mfsrpt003ServiceImpl extends EgovAbstractServiceImpl implements Mfsrpt003Service {

    Logger logger = LogManager.getLogger(Mfsrpt003ServiceImpl.class);

    @Resource(name="Mfsrpt003Mapper")
    private Mfsrpt003Mapper Mfsrpt003Mapper;

    public Mfsrpt003ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchMfsSlipComm(EgovMapForNull paramMap) {
        try {

            Mfsrpt003 entity = new Mfsrpt003(paramMap);
            List<EgovMapForNull> list = Mfsrpt003Mapper.selectMfsSlipCommList(paramMap);
            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @Override
    public List<EgovMapForNull> searchMfsSlipCommForExcel(EgovMapForNull paramMap) {

        return Mfsrpt003Mapper.selectMfsSlipCommList(paramMap);
    }

    @Override
    public JSONObject findMfsSlipComm(EgovMapForNull paramMap) {
        try {

            Mfsrpt003 entity = new Mfsrpt003(Mfsrpt003Mapper.selectMfsSlipComm(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @Override
    public JSONObject saveMfsSlipComm(EgovMapForNull paramMap) {

        try {

            Mfsrpt003Mapper.insertMfsSlipComm(paramMap);
            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @Override
    public JSONObject modifyMfsSlipComm(EgovMapForNull paramMap) {

        try {

            Mfsrpt003Mapper.updateMfsSlipComm(paramMap);
            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @Override
    public JSONObject removeMfsSlipComm(EgovMapForNull paramMap) {

        try {

            String acctSlipNos = StringExpression.nullConvert(paramMap.get("acctSlipNos"));
            String[] acctSlipNoArr = acctSlipNos.split("\\,");

            int arrLength = (acctSlipNoArr == null) ? 0 : acctSlipNoArr.length;
            EgovMapForNull mapper = null;

            for (int keyColumnIdx = 0; keyColumnIdx < arrLength; keyColumnIdx++) {

                mapper = new EgovMapForNull();
                mapper.put("acctSlipNo", acctSlipNoArr[keyColumnIdx]);

                Mfsrpt003Mapper.deleteMfsSlipComm(mapper);
            }

            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    
    @Override
    public JSONObject searchMfsBiztripSlip(EgovMapForNull paramMap) {
        try {

            Mfsrpt003 entity = new Mfsrpt003(paramMap);
            List<EgovMapForNull> list = Mfsrpt003Mapper.selectMfsBiztripSlipList(paramMap);
            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
}
