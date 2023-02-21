package kr.co.dbvision.api.mta.mat.mtamat001.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.mta.mat.mtamat001.entity.Mtamat001;
import kr.co.dbvision.api.mta.mat.mtamat001.service.Mtamat001Service;
import kr.co.dbvision.api.mta.mat.mtamat001.service.mapper.Mtamat001Mapper;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import kr.co.dbvision.lib.ui.cmm.dept.entity.Dept;
import net.sf.json.JSONObject;

/**
 * 유지보수요청에 관한 구현 클래스
 *
 * @author 표준프레임워크센터
 * @since 2019.12.16
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2019.12.16          디비비전              최초 생성
 *
 * </pre>
 */
@Service("Mtamat001Service")
@Transactional
public class Mtamat001ServiceImpl extends EgovAbstractServiceImpl implements Mtamat001Service {

    Logger logger = LogManager.getLogger(Mtamat001ServiceImpl.class);

    @Resource(name="Mtamat001Mapper")
    private Mtamat001Mapper mtamat001Mapper;

    public Mtamat001ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchMtaRequst(EgovMapForNull paramMap) {
        try {

            Mtamat001 entity = new Mtamat001(paramMap);
            List<EgovMapForNull> list = mtamat001Mapper.selectMtaRequstList(paramMap);
            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @Override
    public List<EgovMapForNull> searchMtaRequstForExcel(EgovMapForNull paramMap) {

        return mtamat001Mapper.selectMtaRequstList(paramMap);
    }

    @Override
    public JSONObject findMtaRequst(EgovMapForNull paramMap) {
        try {

            Mtamat001 entity = new Mtamat001(mtamat001Mapper.selectMtaRequst(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @Override
    public JSONObject saveMtaRequst(EgovMapForNull paramMap) {

        try {

            mtamat001Mapper.insertMtaRequst(paramMap);
            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @Override
    public JSONObject modifyMtaRequst(EgovMapForNull paramMap) {

        try {

            mtamat001Mapper.updateMtaRequst(paramMap);
            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @Override
    public JSONObject removeMtaRequst(EgovMapForNull paramMap) {

        try {

            String projectNos = StringExpression.nullConvert(paramMap.get("projectNos"));
            String[] projectNoArr = projectNos.split("\\,");
            String requstNos = StringExpression.nullConvert(paramMap.get("requstNos"));
            String[] requstNoArr = requstNos.split("\\,");

            int arrLength = (requstNoArr == null) ? 0 : requstNoArr.length;
            EgovMapForNull mapper = null;

            for (int keyColumnIdx = 0; keyColumnIdx < arrLength; keyColumnIdx++) {

                mapper = new EgovMapForNull();
                mapper.put("projectNo", projectNoArr[keyColumnIdx]);
                mapper.put("requstNo", requstNoArr[keyColumnIdx]);

                mtamat001Mapper.deleteMtaRequst(mapper);
            }

            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    
    @Override
    public JSONObject searchMtaCompany(EgovMapForNull paramMap) {
        try {

        	Dept entity = new Dept(paramMap);
            List<EgovMapForNull> list = mtamat001Mapper.selectMtaCompanyList(paramMap);
            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    
    @Override
    public JSONObject searchMtaRequstOpert(EgovMapForNull paramMap) {
        try {

        	Dept entity = new Dept(paramMap);
            List<EgovMapForNull> list = mtamat001Mapper.searchMtaRequstOpertList(paramMap);
            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    
    @Override
    public JSONObject removeMtaRequstOpert(EgovMapForNull paramMap) {

        try {

            String requstNos = StringExpression.nullConvert(paramMap.get("requstNos"));
            String[] requstNoArr = requstNos.split("\\,");
            String opertSns = StringExpression.nullConvert(paramMap.get("opertSns"));
            String[] opertSnArr = opertSns.split("\\,");

            int arrLength = (opertSnArr == null) ? 0 : opertSnArr.length;
            EgovMapForNull mapper = null;

            for (int keyColumnIdx = 0; keyColumnIdx < arrLength; keyColumnIdx++) {

                mapper = new EgovMapForNull();
                mapper.put("requstNo", requstNoArr[keyColumnIdx]);
                mapper.put("opertSn", opertSnArr[keyColumnIdx]);

                mtamat001Mapper.deleteMtaRequstOpert(mapper);
            }

            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    
    @Override
    public JSONObject findMtaRequstOpert(EgovMapForNull paramMap) {
        try {

            Mtamat001 entity = new Mtamat001(mtamat001Mapper.searchMtaRequstOpertReg(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    
    @Override
    public JSONObject saveMtaRequstOpert(EgovMapForNull paramMap) {

        try {

            mtamat001Mapper.insertMtaRequstOpert(paramMap);
            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @Override
    public JSONObject modifyMtaRequstOpert(EgovMapForNull paramMap) {

        try {

            mtamat001Mapper.updateMtaRequstOpert(paramMap);
            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    
    @Override
    public JSONObject MtaRequstOpertDetail(EgovMapForNull paramMap) {
        try {

            Mtamat001 entity = new Mtamat001(mtamat001Mapper.searchMtaRequstOpertDetail(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
}
