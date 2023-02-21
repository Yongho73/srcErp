package kr.co.dbvision.api.mbs.exc.mbsexc008.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.mbs.exc.mbsexc008.entity.Mbsexc008;
import kr.co.dbvision.api.mbs.exc.mbsexc008.service.Mbsexc008Service;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 예실대비표에 관한 구현 클래스
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
@Service("Mbsexc008Service")
@Transactional
public class Mbsexc008ServiceImpl extends EgovAbstractServiceImpl implements Mbsexc008Service {

    Logger logger = LogManager.getLogger(Mbsexc008ServiceImpl.class);

    @Resource(name="Mbsexc008Mapper")
    private Mbsexc008Mapper mbsexc008Mapper;

    public Mbsexc008ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchMbsBugtcd(EgovMapForNull paramMap) {
        try {

            Mbsexc008 entity = new Mbsexc008(paramMap);
            List<EgovMapForNull> list = mbsexc008Mapper.selectMbsBugtcdList(paramMap);
            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @Override
    public List<EgovMapForNull> searchMbsBugtcdForExcel(EgovMapForNull paramMap) {

        return mbsexc008Mapper.selectMbsBugtcdList(paramMap);
    }

    @Override
    public JSONObject findMbsBugtcd(EgovMapForNull paramMap) {
        try {

            Mbsexc008 entity = new Mbsexc008(mbsexc008Mapper.selectMbsBugtcd(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @Override
    public JSONObject saveMbsBugtcd(EgovMapForNull paramMap) {

        try {

            mbsexc008Mapper.insertMbsBugtcd(paramMap);
            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @Override
    public JSONObject modifyMbsBugtcd(EgovMapForNull paramMap) {

        try {

            mbsexc008Mapper.updateMbsBugtcd(paramMap);
            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @Override
    public JSONObject removeMbsBugtcd(EgovMapForNull paramMap) {

        try {

            String bugtYys = StringExpression.nullConvert(paramMap.get("bugtYys"));
            String[] bugtYyArr = bugtYys.split("\\,");
            String bugtCds = StringExpression.nullConvert(paramMap.get("bugtCds"));
            String[] bugtCdArr = bugtCds.split("\\,");
            String corpCds = StringExpression.nullConvert(paramMap.get("corpCds"));
            String[] corpCdArr = corpCds.split("\\,");

            int arrLength = (corpCdArr == null) ? 0 : corpCdArr.length;
            EgovMapForNull mapper = null;

            for (int keyColumnIdx = 0; keyColumnIdx < arrLength; keyColumnIdx++) {

                mapper = new EgovMapForNull();
                mapper.put("bugtYy", bugtYyArr[keyColumnIdx]);
                mapper.put("bugtCd", bugtCdArr[keyColumnIdx]);
                mapper.put("corpCd", corpCdArr[keyColumnIdx]);

                mbsexc008Mapper.deleteMbsBugtcd(mapper);
            }

            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
}
