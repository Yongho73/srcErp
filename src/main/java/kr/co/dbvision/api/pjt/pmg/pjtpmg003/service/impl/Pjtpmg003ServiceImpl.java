package kr.co.dbvision.api.pjt.pmg.pjtpmg003.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.pjt.pmg.pjtpmg003.entity.Pjtpmg003;
import kr.co.dbvision.api.pjt.pmg.pjtpmg003.service.Pjtpmg003Service;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 프로젝트관리에 관한 구현 클래스
 *
 * @author 표준프레임워크센터
 * @since 2020.01.15
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.01.15          디비비전              최초 생성
 *
 * </pre>
 */
@Service("Pjtpmg003Service")
@Transactional
public class Pjtpmg003ServiceImpl extends EgovAbstractServiceImpl implements Pjtpmg003Service {

    Logger logger = LogManager.getLogger(Pjtpmg003ServiceImpl.class);

    @Resource(name="Pjtpmg003Mapper")
    private Pjtpmg003Mapper pjtpmg003Mapper;

    public Pjtpmg003ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchPjtProject(EgovMapForNull paramMap) {
        try {

            Pjtpmg003 entity = new Pjtpmg003(paramMap);
            List<EgovMapForNull> list = pjtpmg003Mapper.selectPjtProjectList(paramMap);
            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @Override
    public List<EgovMapForNull> searchPjtProjectForExcel(EgovMapForNull paramMap) {

        return pjtpmg003Mapper.selectPjtProjectList(paramMap);
    }

    @Override
    public JSONObject findPjtProject(EgovMapForNull paramMap) {
        try {

            Pjtpmg003 entity = new Pjtpmg003(pjtpmg003Mapper.selectPjtProject(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @Override
    public JSONObject savePjtProject(EgovMapForNull paramMap) {

        try {

            pjtpmg003Mapper.insertPjtProject(paramMap);
            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @Override
    public JSONObject modifyPjtProject(EgovMapForNull paramMap) {

        try {

            pjtpmg003Mapper.updatePjtProject(paramMap);
            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @Override
    public JSONObject removePjtProject(EgovMapForNull paramMap) {

        try {

            String projectSns = StringExpression.nullConvert(paramMap.get("projectSns"));
            String[] projectSnArr = projectSns.split("\\,");

            int arrLength = (projectSnArr == null) ? 0 : projectSnArr.length;
            EgovMapForNull mapper = null;

            for (int keyColumnIdx = 0; keyColumnIdx < arrLength; keyColumnIdx++) {

                mapper = new EgovMapForNull();
                mapper.put("projectSn", projectSnArr[keyColumnIdx]);

                pjtpmg003Mapper.deletePjtProject(mapper);
            }

            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
}
