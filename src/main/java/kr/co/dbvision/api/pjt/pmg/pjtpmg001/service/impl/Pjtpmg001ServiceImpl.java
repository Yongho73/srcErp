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
import kr.co.dbvision.api.pjt.pmg.pjtpmg001.entity.PjtIssue001;
import kr.co.dbvision.api.pjt.pmg.pjtpmg001.entity.Pjtpmg001;
import kr.co.dbvision.api.pjt.pmg.pjtpmg001.service.Pjtpmg001Service;
import kr.co.dbvision.api.pjt.pmg.pjtpmg001.service.mapper.Pjtpmg001Mapper;
import kr.co.dbvision.api.pjt.pmg.pjtpmg002.entity.Pjtpmg002;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.EgovPage;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.MailManage;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.StringSecurity;
import kr.co.dbvision.lib.exception.Exceptions;
import kr.co.dbvision.lib.ui.cmm.comp.entity.Comp;
import kr.co.dbvision.lib.ui.cmm.comp.service.mapper.CompMapper;
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
@Service("Pjtpmg001Service")
@Transactional
public class Pjtpmg001ServiceImpl extends EgovAbstractServiceImpl implements Pjtpmg001Service {

    Logger logger = LogManager.getLogger(Pjtpmg001ServiceImpl.class);
    private String basisDt;
    private PaginationInfo paginationInfo;
    private int listRowNumber = 0;

    @Resource(name="Pjtpmg001Mapper")
    private Pjtpmg001Mapper pjtpmg001Mapper;
    
    @Resource(name = "CompMapper")
	private CompMapper CompMapper;
	

    public Pjtpmg001ServiceImpl() {
    	paginationInfo = new PaginationInfo();
    }

    @Override
    public JSONObject searchPjtProject(EgovMapForNull paramMap) {
        try {

            Pjtpmg001 entity = new Pjtpmg001(paramMap);
            
            listRowNumber = 1;

            List<EgovMapForNull> list = pjtpmg001Mapper.selectPjtProjectList(paramMap).stream().map(mapper -> {
                    mapper.put("num", listRowNumber++);
                    return mapper;
            }).collect(Collectors.toList());

            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    
    @Override
    public JSONObject searchPjtProjectApprv(EgovMapForNull paramMap) {
        try {

            Pjtpmg001 entity = new Pjtpmg001(paramMap);
            
            listRowNumber = 1;

            List<EgovMapForNull> list = pjtpmg001Mapper.selectPjtProjectApprvList(paramMap).stream().map(mapper -> {
                    mapper.put("num", listRowNumber++);
                    return mapper;
            }).collect(Collectors.toList());

            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @Override
    public List<EgovMapForNull> searchPjtProjectForExcel(EgovMapForNull paramMap) {

        return pjtpmg001Mapper.selectPjtProjectList(paramMap);
    }

    @Override
    public JSONObject findPjtProject(EgovMapForNull paramMap) {
        try {

            Pjtpmg001 entity = new Pjtpmg001(pjtpmg001Mapper.selectPjtProject(paramMap));
            
			String encodeStrProjectSn = StringSecurity.encrypt(entity.getProjectSn());
			String encodeStrBcncCode = StringSecurity.encrypt(entity.getBcncCode());
			String encodeStrProjectId = StringSecurity.encrypt(entity.getEntrpsId());
			
			String popupUrl = "www.dbvision.co.kr/homepage/pjtmta/supportDirect/list?projectSn="+encodeStrProjectSn+"&bcncCode="+encodeStrBcncCode+"&projectId="+encodeStrProjectId;
			entity.setPopupUrl(popupUrl);
            
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @Override
    public JSONObject savePjtProject(EgovMapForNull paramMap) {

        try {

            pjtpmg001Mapper.insertPjtProject(paramMap);
            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @Override
    public JSONObject modifyPjtProject(EgovMapForNull paramMap) {

        try {

            pjtpmg001Mapper.updatePjtProject(paramMap);
            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @Override
    public JSONObject removePjtProject(EgovMapForNull paramMap) {

        try {

            pjtpmg001Mapper.deletePjtProject(paramMap);
            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    
    @Override
    public JSONObject searchPjtProjectBcncList(EgovMapForNull paramMap) {
        try {

            Pjtpmg002 entity = new Pjtpmg002(paramMap);
            List<EgovMapForNull> list = pjtpmg001Mapper.selectPjtProjectBcncList(paramMap);
            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    
    @Override
    public JSONObject modifyPjtProjectBcncList(EgovMapForNull paramMap) {

        try {

            pjtpmg001Mapper.updatePjtProjectBcncList(paramMap);
            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    
    @Override
    public JSONObject savePjtProjectBcncList(EgovMapForNull paramMap) {

        try {

            pjtpmg001Mapper.insertPjtProjectBcncList(paramMap);
            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    
    @Override
    public JSONObject removePjtProjectBcncList(EgovMapForNull paramMap) {

        try {

            pjtpmg001Mapper.deletePjtProjectBcncList(paramMap);
            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    
    @Override
    public JSONObject searchPjtProjectCustomerList(EgovMapForNull paramMap) {
    	try {
			int pageNum = Integer.parseInt(StringExpression.nullConvert(paramMap.get("pageNum")));
            int pageingCnt = Integer.parseInt(StringExpression.nullConvert(paramMap.get("pageingCnt")));
            
            EgovPage.initPaging(paginationInfo, pageNum, pageingCnt, 5, paramMap); // 5 = 한 화면에 나오는 페이징 번호의 최대수량
            int totalRowCount = pjtpmg001Mapper.selectPjtCompAllCnt(paramMap);
            EgovPage.pagingInfo(paginationInfo, totalRowCount, paramMap);
            
			Comp entity = new Comp(paramMap);

			listRowNumber = (pageingCnt*(pageNum-1)) + 1; // 넘버링
            //listRowNumber = totalRowCount - (pageingCnt*(pageNum-1)); // 역순넘버링
            
            List<EgovMapForNull> list = pjtpmg001Mapper.selectPjtProjectCustomerList(paramMap).stream().map(mapper -> {                
                mapper.replace("num", listRowNumber++);  //    넘버링                   
                //mapper.replace("num", listRowNumber--);  //    역순넘버링
                return mapper;
            }).collect(Collectors.toList());
            
			entity.setRecords(list);
			return new JsonMsgMng().makeJsonObject(entity);

		} catch (Exception e) {
			return new Exceptions(new Throwable(), e).getResultStatus();
		}
	}
    
    @Override
    public JSONObject searchPjtProjectBaseCustomerList(EgovMapForNull paramMap) {
    	try {

			Comp entity = new Comp(paramMap);
            
            List<EgovMapForNull> list = pjtpmg001Mapper.selectPjtProjectBaseCustomerList(paramMap);
            
			entity.setRecords(list);
			return new JsonMsgMng().makeJsonObject(entity);

		} catch (Exception e) {
			return new Exceptions(new Throwable(), e).getResultStatus();
		}
	}
    
    @Override
    public JSONObject findJobDay(EgovMapForNull paramMap) {
        try {

            Pjtpmg001 entity = new Pjtpmg001(pjtpmg001Mapper.selectJobDay(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    
    @Override
    public JSONObject savePjtProjectNewApprov(EgovMapForNull paramMap) {

        try {
        	
        	String projectNm = (String) paramMap.get("projectNm");
        	String fromMail = (String) paramMap.get("fromMail");
        	String apprvNm1 = (String) paramMap.get("apprvNm1");
        	
        	MailManage.sendMailTest(
                    "("+projectNm+")계획승인 요청",  //제목
                    fromMail,//받는사람
                    apprvNm1,  // 받는사람 이름
                    "디비비전",	//보낸사람 이름
                    "("+projectNm+")에 대한 계획승인을 요청드립니다." // 내용
                );

            pjtpmg001Mapper.insertPjtProjectNewApprov(paramMap);
            pjtpmg001Mapper.updatePjtProjectNewApprovAt(paramMap);
            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    
    @Override
    public JSONObject findNewApprov(EgovMapForNull paramMap) {
        try {

            Pjtpmg001 entity = new Pjtpmg001(pjtpmg001Mapper.selectNewApprov(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    
    @Override
    public JSONObject savePjtProjectNewApprovDe(EgovMapForNull paramMap) {

        try {
        	
        	String projectNm = (String) paramMap.get("projectNm");
        	String fromMail = (String) paramMap.get("fromMail");
        	String apprvNm2 = (String) paramMap.get("apprvNm2");
        	
        	if(fromMail != null) {
        		MailManage.sendMailTest(
                        "("+projectNm+")계획승인 요청",  //제목
                        fromMail,//받는사람
                        apprvNm2,  // 받는사람 이름
                        "디비비전",	//보낸사람 이름
                        "("+projectNm+")에 대한 계획승인을 요청드립니다." // 내용
                    );
        	}

            pjtpmg001Mapper.insertPjtProjectNewApprovDe(paramMap);
            pjtpmg001Mapper.updatePjtProjectNewApprovAt(paramMap);
            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    
    @Override
    public JSONObject modifyPjtProjectEnd(EgovMapForNull paramMap) {

        try {

            pjtpmg001Mapper.updatePjtProjectEnd(paramMap);
            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    
    @Override
    public JSONObject savePjtProjectEnd(EgovMapForNull paramMap) {

        try {

            pjtpmg001Mapper.insertPjtProjectEnd(paramMap);
            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    
    @Override
    public JSONObject findPjtProjectEnd(EgovMapForNull paramMap) {
        try {

            Pjtpmg001 entity = new Pjtpmg001(pjtpmg001Mapper.selectPjtProjectEnd(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    
    @Override
    public JSONObject savePjtProjectEndApprov(EgovMapForNull paramMap) {

        try {
        	
        	String projectNm = (String) paramMap.get("projectNm");
        	String fromMail = (String) paramMap.get("fromMail");
        	String apprvNm1 = (String) paramMap.get("apprvNm1");
        	
        	MailManage.sendMailTest(
                    "("+projectNm+")완료승인 요청",  //제목
                    fromMail,//받는사람
                    apprvNm1,  // 받는사람 이름
                    "디비비전",	//보낸사람 이름
                    "("+projectNm+")에 대한 완료승인을 요청드립니다." // 내용
                );

            pjtpmg001Mapper.insertPjtProjectEndApprov(paramMap);
            pjtpmg001Mapper.updatePjtProjectNewApprovAt(paramMap);
            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    
    @Override
    public JSONObject savePjtProjectEndApprovDe(EgovMapForNull paramMap) {

        try {

        	String projectNm = (String) paramMap.get("projectNm");
        	String fromMail = (String) paramMap.get("fromMail");
        	String apprvNm2 = (String) paramMap.get("apprvNm2");
        	
        	if(fromMail != null) {
        		MailManage.sendMailTest(
                        "("+projectNm+")완료승인 요청",  //제목
                        fromMail,//받는사람
                        apprvNm2,  // 받는사람 이름
                        "디비비전",	//보낸사람 이름
                        "("+projectNm+")에 대한 완료승인을 요청드립니다." // 내용
                    );
        	}
        	
            pjtpmg001Mapper.insertPjtProjectEndApprovDe(paramMap);
            pjtpmg001Mapper.updatePjtProjectNewApprovAt(paramMap);
            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    
    @Override
    public JSONObject findPjtProjectPlanAcmsltCnt(EgovMapForNull paramMap) {
        try {

            Pjtpmg001 entity = new Pjtpmg001(pjtpmg001Mapper.selectPjtProjectPlanAcmsltCnt(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    
    @Override
    public JSONObject savePjtRepair(EgovMapForNull paramMap) {

        try {

            pjtpmg001Mapper.savePjtRepair(paramMap);
            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    
    @Override
    public JSONObject findPjtRepair(EgovMapForNull paramMap) {
        try {

            Pjtpmg001 entity = new Pjtpmg001(pjtpmg001Mapper.selectPjtRepair(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    
    @Override
    public JSONObject searchPjtRepairList(EgovMapForNull paramMap) {
        try {

            Pjtpmg001 entity = new Pjtpmg001(paramMap);
            List<EgovMapForNull> list = pjtpmg001Mapper.selectPjtProjectRepairList(paramMap);
            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    
    @Override
    public JSONObject removePjtRepair(EgovMapForNull paramMap) {

        try {

            pjtpmg001Mapper.deletePjtRepair(paramMap);
            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    
}
