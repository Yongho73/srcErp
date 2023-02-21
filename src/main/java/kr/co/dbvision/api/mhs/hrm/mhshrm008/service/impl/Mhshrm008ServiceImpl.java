package kr.co.dbvision.api.mhs.hrm.mhshrm008.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.mhs.hrm.mhshrm008.entity.Mhshrm008;
import kr.co.dbvision.api.mhs.hrm.mhshrm008.service.Mhshrm008Service;
import kr.co.dbvision.api.mhs.hrm.mhshrm008.service.mapper.Mhshrm008Mapper;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 부서팝업에 관한 구현 클래스
 *
 * @author 표준프레임워크센터
 * @since 2019.06.03
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2019.06.03          디비비전              최초 생성
 *
 * </pre>
 */
@Service("Mhshrm008Service")
@Transactional
public class Mhshrm008ServiceImpl extends EgovAbstractServiceImpl implements Mhshrm008Service {

    Logger logger = LogManager.getLogger(Mhshrm008ServiceImpl.class);

    @Resource(name="Mhshrm008Mapper")
    private Mhshrm008Mapper Mhshrm008Mapper;

    private int listRowNumber = 0; // 넘버링 

    public Mhshrm008ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchMhsDept(EgovMapForNull paramMap) {
        try {

            Mhshrm008 entity = new Mhshrm008(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = Mhshrm008Mapper.selectMhsDeptList(paramMap).stream().map(mapper -> {
                    mapper.put("num", listRowNumber++);
                    return mapper;
            }).collect(Collectors.toList());

            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public List<EgovMapForNull> searchMhsDeptForExcel(EgovMapForNull paramMap) {

        return Mhshrm008Mapper.selectMhsDeptList(paramMap);
    }

    @Override
    public JSONObject findMhsDept(EgovMapForNull paramMap) {
        try {

            Mhshrm008 entity = new Mhshrm008(Mhshrm008Mapper.selectMhsDept(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @Override
    public JSONObject saveMhsDept(EgovMapForNull paramMap) {

        try {

            Mhshrm008Mapper.insertMhsDept(paramMap);
            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @Override
    public JSONObject modifyMhsDept(EgovMapForNull paramMap) {

        try {

            Mhshrm008Mapper.updateMhsDept(paramMap);
            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @Override
    public JSONObject removeMhsDept(EgovMapForNull paramMap) {

        try {

            String deptCodes = StringExpression.nullConvert(paramMap.get("deptCodes"));
            String[] deptCodeArr = deptCodes.split("\\,");

            int arrLength = (deptCodeArr == null) ? 0 : deptCodeArr.length;
            EgovMapForNull mapper = null;

            for (int keyColumnIdx = 0; keyColumnIdx < arrLength; keyColumnIdx++) {

                mapper = new EgovMapForNull();
                mapper.put("deptCode", deptCodeArr[keyColumnIdx]);

                Mhshrm008Mapper.deleteMhsDept(mapper);
            }

            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
}
