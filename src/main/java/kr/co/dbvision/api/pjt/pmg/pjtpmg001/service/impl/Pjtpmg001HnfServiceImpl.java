package kr.co.dbvision.api.pjt.pmg.pjtpmg001.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import egovframework.rte.fdl.idgnr.EgovIdGnrService;
import kr.co.dbvision.api.pjt.pmg.pjtpmg001.entity.Pjtpmg001;
import kr.co.dbvision.api.pjt.pmg.pjtpmg001.service.Pjtpmg001HnfService;
import kr.co.dbvision.api.pjt.pmg.pjtpmg001.service.mapper.Pjtpmg001Mapper;
import kr.co.dbvision.api.pjt.pmg.pjtpmg002.entity.Pjtpmg002;
import kr.co.dbvision.lib.EgovMapForNull;
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
 *      <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.01.14          디비비전              최초 생성
 *
 *      </pre>
 */
@Service("Pjtpmg001HnfService")
@Transactional
public class Pjtpmg001HnfServiceImpl extends EgovAbstractServiceImpl implements Pjtpmg001HnfService {

	Logger logger = LogManager.getLogger(Pjtpmg001HnfServiceImpl.class);

	@Resource(name = "Pjtpmg001Mapper")
	private Pjtpmg001Mapper pjtpmg001Mapper;
	private int listRowNumber = 0;

	@Resource(name = "HnfAcmsltSnGnrService")
	private EgovIdGnrService hnfAcmsltSn;

	public Pjtpmg001HnfServiceImpl() {
		//
	}

	@Override
	public JSONObject searchPjtProjectHnfPlanList(EgovMapForNull paramMap) {
		try {

			Pjtpmg002 entity = new Pjtpmg002(paramMap);
			List<EgovMapForNull> list = pjtpmg001Mapper.selectPjtProjectHnfPlanList(paramMap);
			EgovMapForNull spanMap = new EgovMapForNull();
			EgovMapForNull sumMap = new EgovMapForNull();

			 listRowNumber = 1;
			 sumMap.put("rnum", "합 계"); double totalSum = 0.0;
			  
			 totalSum = list.stream().mapToDouble(mapper ->
			 Double.parseDouble(mapper.get("partcptnManMonth").toString())).sum();
			 sumMap.put("partcptnManMonth",totalSum);
			  
			 list.add(sumMap);
			  
			 List<EgovMapForNull> spanList = list.stream().map(mapper -> {
			  
			 String rnum = StringExpression.nullConvert(mapper.get("rnum")); 
			 String partcptnManMonth =StringExpression.nullConvert(mapper.get("partcptnManMonth").toString());
			  
			 if(rnum.equals("합 계")) { 
				 EgovMapForNull map = new EgovMapForNull();
				 map.put("value", mapper.get("rnum")); 
				 map.put("colspan", 4);
				 mapper.replace("rnum", map); 
			 } 
			 
			 int size = list.size(); 
			 
			 String partcptnManMonths = list.get(size-1).get("partcptnManMonth").toString(); 
			 int leg = mapper.size(); 
			 
			 if(partcptnManMonth.equals(partcptnManMonths) && leg == 2) { 
				 EgovMapForNull map = new EgovMapForNull(); 
				 map.put("value", mapper.get("partcptnManMonth")); 
				 mapper.replace("partcptnManMonth", map); 
				 
			} 
			 mapper.put("num", listRowNumber++);
			 
			 return mapper;
			 
			}).collect(Collectors.toList());
			 

			entity.setRecords(spanList);
			return new JsonMsgMng().makeJsonObject(entity);

		} catch (Exception e) {
			return new Exceptions(new Throwable(), e).getResultStatus();
		}
	}

	@Override
	public JSONObject modifyPjtProjectHnfPlanList(EgovMapForNull paramMap) {

		try {
			pjtpmg001Mapper.updatePjtProjectHnfPlanList(paramMap);
			
			

			return new JsonMsgMng().makeJsonObject(paramMap);

		} catch (Exception e) {
			return new Exceptions(new Throwable(), e).getResultStatus();
		}
	}

	@Override
	public JSONObject savePjtProjectHnfPlanList(EgovMapForNull paramMap) {

		try {
			pjtpmg001Mapper.insertPjtProjectHnfPlanList(paramMap);

			return new JsonMsgMng().makeJsonObject(paramMap);

		} catch (Exception e) {
			return new Exceptions(new Throwable(), e).getResultStatus();
		}
	}

	@Override
	public JSONObject removePjtProjectHnfPlanList(EgovMapForNull paramMap) {

		try {

			pjtpmg001Mapper.deletePjtProjectHnfPlanList(paramMap);
			return new JsonMsgMng().makeJsonObject(paramMap);

		} catch (Exception e) {
			return new Exceptions(new Throwable(), e).getResultStatus();
		}
	}

	@Override
	public JSONObject modifyPjtProjectBugtHnfPlan(EgovMapForNull paramMap) {

		try {
			pjtpmg001Mapper.deletePjtProjectBugtHnfPlan(paramMap);
			pjtpmg001Mapper.insertPjtProjectBugtHnfPlan(paramMap);

			return new JsonMsgMng().makeJsonObject(paramMap);

		} catch (Exception e) {
			return new Exceptions(new Throwable(), e).getResultStatus();
		}
	}

	@Override
	public JSONObject removePjtProjectBugtHnfPlan(EgovMapForNull paramMap) {

		try {
			pjtpmg001Mapper.deletePjtProjectBugtHnfPlan(paramMap);

			return new JsonMsgMng().makeJsonObject(paramMap);

		} catch (Exception e) {
			return new Exceptions(new Throwable(), e).getResultStatus();
		}
	}

	@Override
	public JSONObject searchPjtProjectHnfPlanAcmsltList(EgovMapForNull paramMap) {
		try {

			Pjtpmg002 entity = new Pjtpmg002(paramMap);
			List<EgovMapForNull> list = pjtpmg001Mapper.selectPjtProjectHnfPlanAcmsltList(paramMap);
			entity.setRecords(list);
			return new JsonMsgMng().makeJsonObject(entity);

		} catch (Exception e) {
			return new Exceptions(new Throwable(), e).getResultStatus();
		}
	}
	
	@Override
    public JSONObject searchPjtProjectHnfPlanAcmsltAddList(EgovMapForNull paramMap) {
        try {

            Pjtpmg002 entity = new Pjtpmg002(paramMap);
            List<EgovMapForNull> list = pjtpmg001Mapper.selectPjtProjectHnfPlanAcmsltAddList(paramMap);
            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

	@Override
	public JSONObject searchPjtProjectHnfAcmsltList(EgovMapForNull paramMap) {
		try {

			Pjtpmg002 entity = new Pjtpmg002(paramMap);
			
			listRowNumber = 1;

            List<EgovMapForNull> list = pjtpmg001Mapper.selectPjtProjectHnfAcmsltList(paramMap).stream().map(mapper -> {
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
	public JSONObject modifyPjtProjectHnfAcmsltList(EgovMapForNull paramMap) {

		try {
			pjtpmg001Mapper.updatePjtProjectHnfAcmsltList(paramMap);

			return new JsonMsgMng().makeJsonObject(paramMap);

		} catch (Exception e) {
			return new Exceptions(new Throwable(), e).getResultStatus();
		}
	}

	@Override
	public JSONObject savePjtProjectHnfAcmsltList(EgovMapForNull paramMap) {

		try {
			String hnfAcmslt = hnfAcmsltSn.getNextStringId();

			paramMap.put("hnfAcmsltSn", hnfAcmslt);
			pjtpmg001Mapper.insertPjtProjectHnfAcmsltList(paramMap);
			return new JsonMsgMng().makeJsonObject(paramMap);

		} catch (Exception e) {
			return new Exceptions(new Throwable(), e).getResultStatus();
		}
	}

	@Override
	public JSONObject removePjtProjectHnfAcmsltList(EgovMapForNull paramMap) {

		try {

			pjtpmg001Mapper.deletePjtProjectHnfAcmsltList(paramMap);

			return new JsonMsgMng().makeJsonObject(paramMap);

		} catch (Exception e) {
			return new Exceptions(new Throwable(), e).getResultStatus();
		}
	}

	@Override
	public JSONObject modifyPjtProjectBugtHnfAcmslt(EgovMapForNull paramMap) {

		try {
			pjtpmg001Mapper.deletePjtProjectBugtHnfAcmslt(paramMap);
			pjtpmg001Mapper.insertPjtProjectBugtHnfAcmslt(paramMap);

			return new JsonMsgMng().makeJsonObject(paramMap);

		} catch (Exception e) {
			return new Exceptions(new Throwable(), e).getResultStatus();
		}
	}

	@Override
	public JSONObject removePjtProjectBugtHnfAcmslt(EgovMapForNull paramMap) {

		try {
			pjtpmg001Mapper.deletePjtProjectBugtHnfAcmslt(paramMap);

			return new JsonMsgMng().makeJsonObject(paramMap);

		} catch (Exception e) {
			return new Exceptions(new Throwable(), e).getResultStatus();
		}
	}

	@Override
	public JSONObject savePjtProjectHnfAcmsltCopy(EgovMapForNull paramMap) {

		try {

			String hnfAcmslt = hnfAcmsltSn.getNextStringId();

			paramMap.put("hnfAcmsltSns", hnfAcmslt);

			pjtpmg001Mapper.insertPjtProjectHnfAcmsltCopy(paramMap);
			pjtpmg001Mapper.updateIdsHnfAcmsltSnCnt(paramMap);
			pjtpmg001Mapper.insertPjtProjectBugtHnfAcmsltCopy(paramMap);
			return new JsonMsgMng().makeJsonObject(paramMap);

		} catch (Exception e) {
			return new Exceptions(new Throwable(), e).getResultStatus();
		}
	}

	@Override
	public JSONObject savePjtProjectHnfPlanCopy(EgovMapForNull paramMap) {

		try {
			String hnfAcmslt = hnfAcmsltSn.getNextStringId();

			paramMap.put("hnfAcmsltSn", hnfAcmslt);
			pjtpmg001Mapper.insertPjtProjectHnfPlanCopy(paramMap);
			return new JsonMsgMng().makeJsonObject(paramMap);

		} catch (Exception e) {
			return new Exceptions(new Throwable(), e).getResultStatus();
		}
	}

	@Override
	public JSONObject findPjtProjectDe(EgovMapForNull paramMap) {
		try {

			Pjtpmg001 entity = new Pjtpmg001(pjtpmg001Mapper.selectPjtProjectDe(paramMap));
			return new JsonMsgMng().makeJsonObject(entity);

		} catch (Exception e) {
			return new Exceptions(new Throwable(), e).getResultStatus();
		}
	}

}
