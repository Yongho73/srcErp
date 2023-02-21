package kr.co.dbvision.api.pjt.pmg.pjtpmg001.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.pjt.pmg.pjtpmg001.entity.Pjtpmg001;
import kr.co.dbvision.api.pjt.pmg.pjtpmg001.service.Pjtpmg001CcpyService;
import kr.co.dbvision.api.pjt.pmg.pjtpmg001.service.mapper.Pjtpmg001Mapper;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 프로젝트현황에 관한 구현 클래스
 *
 * @author 표준프레임워크센터
 * @since 2020.01.14
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.01.14          디비비전              최초 생성
 *
 * </pre>
 */
@Service("Pjtpmg001CcpyService")
@Transactional
public class Pjtpmg001CcpyServiceImpl extends EgovAbstractServiceImpl implements Pjtpmg001CcpyService {

    Logger logger = LogManager.getLogger(Pjtpmg001CcpyServiceImpl.class);

    @Resource(name="Pjtpmg001Mapper")
    private Pjtpmg001Mapper pjtpmg001Mapper;

    public Pjtpmg001CcpyServiceImpl() {
        //
    }

    @Override
    public JSONObject searchPjtProjectCcpyList(EgovMapForNull paramMap) {
        try {
                Pjtpmg001 entity = new Pjtpmg001(paramMap);
                List<EgovMapForNull> list = pjtpmg001Mapper.selectPjtProjectCcpyList(paramMap);
                entity.setRecords(list);
                return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    
    @Override
    public JSONObject findPjtCcpy(EgovMapForNull paramMap) {
        try {

            Pjtpmg001 entity = new Pjtpmg001(pjtpmg001Mapper.selectPjtCcpy(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    
    @Override
    public JSONObject removePjtCcpy(EgovMapForNull paramMap) {

        try {

            pjtpmg001Mapper.deletePjtCcpy(paramMap);
            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    
    @Override
    public JSONObject savePjtCcpy(EgovMapForNull paramMap) {

        try {

        	pjtpmg001Mapper.savePjtCcpy(paramMap);
            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
  
}
