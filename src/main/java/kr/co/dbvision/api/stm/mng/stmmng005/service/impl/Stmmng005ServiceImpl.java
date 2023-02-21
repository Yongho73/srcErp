package kr.co.dbvision.api.stm.mng.stmmng005.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.stm.mng.stmmng005.entity.Stmmng005;
import kr.co.dbvision.api.stm.mng.stmmng005.service.Stmmng005Service;
import kr.co.dbvision.api.stm.mng.stmmng005.service.mapper.Stmmng005Mapper;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 그룹권한등록에 관한 구현 클래스
 *
 * @author 표준프레임워크센터
 * @since 2019.05.16
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2019.05.16          디비비전              최초 생성
 *
 * </pre>
 */
@Service("Stmmng005Service")
@Transactional
public class Stmmng005ServiceImpl extends EgovAbstractServiceImpl implements Stmmng005Service {

    Logger logger = LogManager.getLogger(Stmmng005ServiceImpl.class);

    @Resource(name="Stmmng005Mapper")
    private Stmmng005Mapper Stmmng005Mapper;

    public Stmmng005ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchStmRole(EgovMapForNull paramMap) {
        try {

            Stmmng005 entity = new Stmmng005(paramMap);
            List<EgovMapForNull> list = Stmmng005Mapper.selectStmRoleList(paramMap);
            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @Override
    public List<EgovMapForNull> searchStmRoleForExcel(EgovMapForNull paramMap) {

        return Stmmng005Mapper.selectStmRoleList(paramMap);
    }

    @Override
    public JSONObject findStmRole(EgovMapForNull paramMap) {
        try {

            Stmmng005 entity = new Stmmng005(Stmmng005Mapper.selectStmRole(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @Override
    public JSONObject saveStmRole(EgovMapForNull paramMap) {

        try {

            Stmmng005Mapper.insertStmRole(paramMap);
            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @Override
    public JSONObject modifyStmRole(EgovMapForNull paramMap) {

        try {

            Stmmng005Mapper.updateStmRole(paramMap);
            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @Override
    public JSONObject removeStmRole(EgovMapForNull paramMap) {

        try {

            String roleCodes = StringExpression.nullConvert(paramMap.get("roleCodes"));
            String[] roleCodeArr = roleCodes.split("\\,");

            int arrLength = (roleCodeArr == null) ? 0 : roleCodeArr.length;
            EgovMapForNull mapper = null;

            for (int keyColumnIdx = 0; keyColumnIdx < arrLength; keyColumnIdx++) {

                mapper = new EgovMapForNull();
                mapper.put("roleCode", roleCodeArr[keyColumnIdx]);

                Stmmng005Mapper.deleteStmRole(mapper);
            }

            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
}
