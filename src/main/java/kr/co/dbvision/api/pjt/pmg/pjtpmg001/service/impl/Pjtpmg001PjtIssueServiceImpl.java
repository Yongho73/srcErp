package kr.co.dbvision.api.pjt.pmg.pjtpmg001.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;
import kr.co.dbvision.api.mfs.bsc.mfsbsc002.entity.Mfsbsc002;
import kr.co.dbvision.api.mhs.hrd.mhshrd008.entity.Mhshrd008;
import kr.co.dbvision.api.pjt.pmg.pjtpmg001.entity.PjtIssue001;
import kr.co.dbvision.api.pjt.pmg.pjtpmg001.entity.PjtIssueact001;
import kr.co.dbvision.api.pjt.pmg.pjtpmg001.service.Pjtpmg001PjtIssueService;
import kr.co.dbvision.api.pjt.pmg.pjtpmg001.service.mapper.Pjtpmg001PjtIssueMapper;
import kr.co.dbvision.api.stm.mng.stmmng003.entity.Stmmng003;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.EgovPage;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
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
@Service("Pjtpmg001PjtIssueService")
@Transactional
public class Pjtpmg001PjtIssueServiceImpl extends EgovAbstractServiceImpl implements Pjtpmg001PjtIssueService {

    Logger logger = LogManager.getLogger(Pjtpmg001PjtIssueService.class);

    @Resource(name="Pjtpmg001PjtIssueMapper")
    private Pjtpmg001PjtIssueMapper pjtpmg001PjtIssueMapper;
    
    private PaginationInfo paginationInfo;
    private int listRowNumber = 0;

    public Pjtpmg001PjtIssueServiceImpl() {
        //
        paginationInfo = new PaginationInfo();
    }

    @SuppressWarnings("unchecked")
    @Override
    public JSONObject searchPjtIssue(EgovMapForNull paramMap) {
        try {
  
          
            List<EgovMapForNull> list = pjtpmg001PjtIssueMapper.selectPjtIssueList(paramMap).stream().map(mapper -> {                                     
                return mapper;
            }).collect(Collectors.toList());
            
            PjtIssue001 entity = new PjtIssue001(paramMap);
            entity.setRecords(list);            
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
 
    @Override
    public List<EgovMapForNull> searchPjtIssueForExcel(EgovMapForNull paramMap) {
        return pjtpmg001PjtIssueMapper.selectPjtIssueList(paramMap);
    }

    @Override
    public JSONObject findPjtIssue(EgovMapForNull paramMap) {
        try {
            
            return new JsonMsgMng().makeJsonObject(pjtpmg001PjtIssueMapper.selectPjtIssue(paramMap));

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @Override
    public JSONObject savePjtIssue(EgovMapForNull paramMap) {

        try {

            pjtpmg001PjtIssueMapper.savePjtIssue(paramMap);
            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @Override
    public JSONObject removePjtIssue(EgovMapForNull paramMap) {

        try {
            
            pjtpmg001PjtIssueMapper.deletePjtIssue(paramMap);
            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
       
    }



    
    @Override
    public JSONObject searchPjtIssueact(EgovMapForNull paramMap) {
        try {

            PjtIssue001 entity = new PjtIssue001(paramMap);
            List<EgovMapForNull> list = pjtpmg001PjtIssueMapper.selectPjtIssueactList(paramMap);
            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    
    @Override
    public JSONObject savePjtIssueAct(EgovMapForNull paramMap) {

        try {

            pjtpmg001PjtIssueMapper.savePjtIssueAct(paramMap);
            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    
    @Override
    public JSONObject findPjtIssueAct(EgovMapForNull paramMap) {
        try {
            
            return new JsonMsgMng().makeJsonObject(pjtpmg001PjtIssueMapper.selectPjtIssueAct(paramMap));

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    
    @Override
    public JSONObject removePjtIssueAct(EgovMapForNull paramMap) {
        
        try {
            
            pjtpmg001PjtIssueMapper.deletePjtIssueAct(paramMap);
            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

}
