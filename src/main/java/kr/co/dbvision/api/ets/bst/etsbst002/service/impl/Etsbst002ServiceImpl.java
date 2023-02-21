package kr.co.dbvision.api.ets.bst.etsbst002.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import egovframework.rte.fdl.idgnr.EgovIdGnrService;
import kr.co.dbvision.api.ets.bst.etsbst002.entity.Etsbst002;
import kr.co.dbvision.api.ets.bst.etsbst002.service.Etsbst002Service;
import kr.co.dbvision.api.ets.bst.etsbst002.service.mapper.Etsbst002Mapper;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 문서번호관리관리에 관한 서비스 구현 클래스
 *
 * @author 디비비전
 * @since 2020.03.27
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.03.27          디비비전              최초 생성
 * </pre>
 */
@Service("Etsbst002Service")
@Transactional
public class Etsbst002ServiceImpl extends EgovAbstractServiceImpl implements Etsbst002Service {

    Logger logger = LogManager.getLogger(Etsbst002ServiceImpl.class);

    @Resource(name="Etsbst002Mapper")
    private Etsbst002Mapper etsbst002Mapper;
    
    @Resource(name="NoSettingNoGnrService")
    private EgovIdGnrService noSettingNo;

    public Etsbst002ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchEtsbst002(EgovMapForNull paramMap) {
        try {

            Etsbst002 entity = new Etsbst002(paramMap);
            List<EgovMapForNull> list = etsbst002Mapper.selectEtsbst002List(paramMap);
            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @Override
    public List<EgovMapForNull> searchEtsbst002ForExcel(EgovMapForNull paramMap) {

        return etsbst002Mapper.selectEtsbst002List(paramMap);
    }

    @Override
    public JSONObject findEtsbst002(EgovMapForNull paramMap) {
        try {

            Etsbst002 entity = new Etsbst002(etsbst002Mapper.selectEtsbst002(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @Override
    public JSONObject saveEtsbst002(EgovMapForNull paramMap) {

        try {

            etsbst002Mapper.saveEtsbst002(paramMap);
            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @Override
    public JSONObject removeEtsbst002(EgovMapForNull paramMap) {

        try {

            String noSettingNos = StringExpression.nullConvert(paramMap.get("noSettingNos"));
            String[] noSettingNoArr = noSettingNos.split("\\,");

            int arrLength = (noSettingNoArr == null) ? 0 : noSettingNoArr.length;
            EgovMapForNull mapper = null;

            for (int keyColumnIdx = 0; keyColumnIdx < arrLength; keyColumnIdx++) {

                mapper = new EgovMapForNull();
                mapper.put("noSettingNo", noSettingNoArr[keyColumnIdx]);

                etsbst002Mapper.deleteEtsbst002(mapper);
            }

            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    
    @Override
    public JSONObject getNoSettingNoEtsfmg000() {
        try {
            return new JsonMsgMng().makeJsonObject(noSettingNo.getNextStringId());
        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
}
