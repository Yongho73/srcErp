package kr.co.dbvision.api.stm.mng.stmmng008.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.stm.mng.stmmng008.entity.Stmmng008;
import kr.co.dbvision.api.stm.mng.stmmng008.service.Stmmng008Service;
import kr.co.dbvision.api.stm.mng.stmmng008.service.mapper.Stmmng008Mapper;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 버튼관리에 관한 구현 클래스
 *
 * @author 표준프레임워크센터
 * @since 2019.05.17
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2019.05.17          디비비전              최초 생성
 *
 * </pre>
 */
@Service("Stmmng008Service")
@Transactional
public class Stmmng008ServiceImpl extends EgovAbstractServiceImpl implements Stmmng008Service {

    Logger logger = LogManager.getLogger(Stmmng008ServiceImpl.class);

    @Resource(name="Stmmng008Mapper")
    private Stmmng008Mapper stmmng008Mapper;

    public Stmmng008ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchStmBtn(EgovMapForNull paramMap) {
        try {

            Stmmng008 entity = new Stmmng008(paramMap);
            List<EgovMapForNull> list = stmmng008Mapper.selectStmBtnList(paramMap);
            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @Override
    public List<EgovMapForNull> searchStmBtnForExcel(EgovMapForNull paramMap) {

        return stmmng008Mapper.selectStmBtnList(paramMap);
    }

    @Override
    public JSONObject findStmBtn(EgovMapForNull paramMap) {
        try {

            Stmmng008 entity = new Stmmng008(stmmng008Mapper.selectStmBtn(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @Override
    public JSONObject saveStmBtn(EgovMapForNull paramMap) {

        try {

            stmmng008Mapper.insertStmBtn(paramMap);
            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @Override
    public JSONObject modifyStmBtn(EgovMapForNull paramMap) {

        try {

            stmmng008Mapper.updateStmBtn(paramMap);
            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @Override
    public JSONObject removeStmBtn(EgovMapForNull paramMap) {

        try {

            String btnIds = StringExpression.nullConvert(paramMap.get("btnIds"));
            String[] btnIdArr = btnIds.split("\\,");

            int arrLength = (btnIdArr == null) ? 0 : btnIdArr.length;
            EgovMapForNull mapper = null;

            for (int keyColumnIdx = 0; keyColumnIdx < arrLength; keyColumnIdx++) {

                mapper = new EgovMapForNull();
                mapper.put("btnId", btnIdArr[keyColumnIdx]);

                stmmng008Mapper.deleteStmBtn(mapper);
            }

            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
}
