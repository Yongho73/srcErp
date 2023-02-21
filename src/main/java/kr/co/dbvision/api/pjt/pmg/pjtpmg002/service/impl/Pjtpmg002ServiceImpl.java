package kr.co.dbvision.api.pjt.pmg.pjtpmg002.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.pjt.pmg.pjtpmg002.entity.Pjtpmg002;
import kr.co.dbvision.api.pjt.pmg.pjtpmg002.service.Pjtpmg002Service;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 프로젝트등록에 관한 구현 클래스
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
@Service("Pjtpmg002Service")
@Transactional
public class Pjtpmg002ServiceImpl extends EgovAbstractServiceImpl implements Pjtpmg002Service {

    Logger logger = LogManager.getLogger(Pjtpmg002ServiceImpl.class);

    @Resource(name="Pjtpmg002Mapper")
    private Pjtpmg002Mapper pjtpmg002Mapper;

    public Pjtpmg002ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchPjtProject(EgovMapForNull paramMap) {
        try {

            Pjtpmg002 entity = new Pjtpmg002(paramMap);
            List<EgovMapForNull> list = pjtpmg002Mapper.selectPjtProjectList(paramMap);
            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @Override
    public List<EgovMapForNull> searchPjtProjectForExcel(EgovMapForNull paramMap) {

        return pjtpmg002Mapper.selectPjtProjectList(paramMap);
    }

    @Override
    public JSONObject findPjtProject(EgovMapForNull paramMap) {
        try {

            Pjtpmg002 entity = new Pjtpmg002(pjtpmg002Mapper.selectPjtProject(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @Override
    public JSONObject savePjtProject(EgovMapForNull paramMap) {

        try {

            pjtpmg002Mapper.insertPjtProject(paramMap);
            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @Override
    public JSONObject modifyPjtProject(EgovMapForNull paramMap) {

        try {

            pjtpmg002Mapper.updatePjtProject(paramMap);
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

                pjtpmg002Mapper.deletePjtProject(mapper);
            }

            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    
    @Override
    public JSONObject searchPjtProjectBcncList(EgovMapForNull paramMap) {
        try {

            Pjtpmg002 entity = new Pjtpmg002(paramMap);
            List<EgovMapForNull> list = pjtpmg002Mapper.selectPjtProjectBcncList(paramMap);
            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    
    @Override
    public JSONObject modifyPjtProjectBcncList(EgovMapForNull paramMap) {

        try {

            pjtpmg002Mapper.updatePjtProjectBcncList(paramMap);
            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    
    @Override
    public JSONObject savePjtProjectBcncList(EgovMapForNull paramMap) {

        try {

            pjtpmg002Mapper.insertPjtProjectBcncList(paramMap);
            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    
    @Override
    public JSONObject removePjtProjectBcncList(EgovMapForNull paramMap) {

        try {

            pjtpmg002Mapper.deletePjtProjectBcncList(paramMap);
            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
}
