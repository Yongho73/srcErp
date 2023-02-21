package kr.co.dbvision.api.mhs.hrm.mhshrmpop.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.mhs.hrm.mhshrmpop.entity.Mhshrmpop;
import kr.co.dbvision.api.mhs.hrm.mhshrmpop.service.MhshrmpopService;
import kr.co.dbvision.api.mhs.hrm.mhshrmpop.service.mapper.MhshrmpopMapper;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 부서팝업에 관한 구현 클래스
 *
 * @author 표준프레임워크센터
 * @since 2019.05.23
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2019.05.23          디비비전              최초 생성
 *
 * </pre>
 */
@Service("MhshrmpopService")
@Transactional
public class MhshrmpopServiceImpl extends EgovAbstractServiceImpl implements MhshrmpopService {

    Logger logger = LogManager.getLogger(MhshrmpopServiceImpl.class);

    @Resource(name="MhshrmpopMapper")
    private MhshrmpopMapper mhshrmpopMapper;

    public MhshrmpopServiceImpl() {
        //
    }

    @Override
    public JSONObject searchMhsDept(EgovMapForNull paramMap) {
        try {

            Mhshrmpop entity = new Mhshrmpop(paramMap);
            List<EgovMapForNull> list = mhshrmpopMapper.selectMhsDeptList(paramMap);
            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @Override
    public JSONObject findMhsDept(EgovMapForNull paramMap) {
        try {

            Mhshrmpop entity = new Mhshrmpop(mhshrmpopMapper.selectMhsDept(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
}
