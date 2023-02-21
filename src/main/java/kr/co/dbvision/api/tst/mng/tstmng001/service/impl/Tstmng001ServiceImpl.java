package kr.co.dbvision.api.tst.mng.tstmng001.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.tst.mng.tstmng001.entity.Tstmng001;
import kr.co.dbvision.api.tst.mng.tstmng001.service.Tstmng001Service;
import kr.co.dbvision.api.tst.mng.tstmng001.service.mapper.Tstmng001Mapper;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import net.sf.json.JSONObject;

/**
 * 테스트관리에 관한 서비스 구현 클래스
 *
 * @author 디비비전
 * @since 2020.04.16
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.04.16          디비비전              최초 생성
 * </pre>
 */
@Service("Tstmng001Service")
@Transactional
public class Tstmng001ServiceImpl extends EgovAbstractServiceImpl implements Tstmng001Service {

    Logger logger = LogManager.getLogger(Tstmng001ServiceImpl.class);

    @Resource(name="Tstmng001Mapper")
    private Tstmng001Mapper tstmng001Mapper;

    public Tstmng001ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchTstmng001(EgovMapForNull paramMap) {
        try {

            Tstmng001 entity = new Tstmng001(paramMap);
            List<EgovMapForNull> list = tstmng001Mapper.selectTstmng001List(paramMap);
            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public List<EgovMapForNull> searchTstmng001ForExcel(EgovMapForNull paramMap) {

        return tstmng001Mapper.selectTstmng001List(paramMap);
    }

    @Override
    public JSONObject findTstmng001(EgovMapForNull paramMap) {
        try {

            Tstmng001 entity = new Tstmng001(tstmng001Mapper.selectTstmng001(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject saveTstmng001(EgovMapForNull paramMap) {

        try {

            tstmng001Mapper.saveTstmng001(paramMap);
            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject removeTstmng001(EgovMapForNull paramMap) {

        try {

            String korAbrvNms = StringExpression.nullConvert(paramMap.get("korAbrvNms"));
            String[] korAbrvNmArr = korAbrvNms.split("\\,");

            int arrLength = (korAbrvNmArr == null) ? 0 : korAbrvNmArr.length;
            EgovMapForNull mapper = null;

            for (int keyColumnIdx = 0; keyColumnIdx < arrLength; keyColumnIdx++) {

                mapper = new EgovMapForNull();
                mapper.put("korAbrvNm", korAbrvNmArr[keyColumnIdx]);

                tstmng001Mapper.deleteTstmng001(mapper);
            }

            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            throw e;
        }
    }
}
