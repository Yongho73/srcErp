package kr.co.dbvision.api.mps.mng.mpsmng001.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.mps.mng.mpsmng001.entity.Mpsmng001;
import kr.co.dbvision.api.mps.mng.mpsmng001.service.Mpsmng001Service;
import kr.co.dbvision.api.mps.mng.mpsmng001.service.mapper.Mpsmng001Mapper;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;
 
/**
 * 사용자에 관한 구현 클래스
 *
 * @author  표준프레임워크센터
 * @since 2014.01.24
 * @version 1.0
 * @see <pre>
 *  == 개정이력(Modification Information) ==
 *
 *          수정일          수정자           수정내용
 *  ----------------    ------------    ---------------------------
 *   2014.01.24        표준프레임워크센터          최초 생성
 *
 * </pre>
 */
@Service("Mpsmng001Service")
@Transactional
public class Mpsmng001ServiceImpl extends EgovAbstractServiceImpl implements Mpsmng001Service {

	Logger logger = LogManager.getLogger(Mpsmng001ServiceImpl.class);
	
	@Resource(name="Mpsmng001Mapper")
	private Mpsmng001Mapper mpsmng001Mapper;
	
	private int totCount = 0;
	
    public Mpsmng001ServiceImpl() {
    	//
    }
    
	@Override
	public Mpsmng001 searchMpsSalaryCd(EgovMapForNull paramMap) throws Exceptions {
		try {

			Mpsmng001 entity = new Mpsmng001(paramMap);
 
			List<EgovMapForNull> list = mpsmng001Mapper.selectMpsSalaryCdList(paramMap);
			
			//Date today = new Date();
	        
		    //SimpleDateFormat date = new SimpleDateFormat("yyyy/MM/dd");
		    //SimpleDateFormat time = new SimpleDateFormat("hh:mm:ss a");
		        
		    //System.out.println("START Date: "+date.format(today)  + "::: Time: "+time.format(today));

			totCount = list.size();
			List<EgovMapForNull> records = list.stream().map(mapper ->{
				mapper.put("rnum", String.valueOf(totCount--));
				
				//퇴직금액대상 여부 
				if(mapper.get("retireamtobjYn").toString().toUpperCase().equals("Y"))
					mapper.put("retireamtobjYn", "1");
				else 
					mapper.put("retireamtobjYn", "0");
				//통상임금포함 여부
				if(mapper.get("basewageinclsYn").toString().toUpperCase().equals("Y"))
					mapper.put("basewageinclsYn", "1");
				else 
					mapper.put("basewageinclsYn", "0");
				//평균임금포함 여부  
				if(mapper.get("avewageinclsYn").toString().toUpperCase().equals("Y"))
					mapper.put("avewageinclsYn", "1");
				else 
					mapper.put("avewageinclsYn", "0");
				//수습적용 여부    
				if(mapper.get("ojtapplyYn").toString().toUpperCase().equals("Y"))
					mapper.put("ojtapplyYn", "1");
				else 
					mapper.put("ojtapplyYn", "0");
				//일할 계산 여부
				if(mapper.get("dhalfCalcYn").toString().toUpperCase().equals("Y"))
					mapper.put("dhalfCalcYn", "1");
				else 
					mapper.put("dhalfCalcYn", "0");
				 //사용 여부     
				if(mapper.get("useYn").toString().toUpperCase().equals("Y"))
					mapper.put("useYn", "1");
				else 
					mapper.put("useYn", "0");
				//예산편성대상여부   
				if(mapper.get("bugtMkYn").toString().toUpperCase().equals("Y"))
					mapper.put("bugtMkYn", "1");
				else 
					mapper.put("bugtMkYn", "0");
				return mapper;
			}).collect(Collectors.toList());

			entity.setRecords(records);
			
			return entity;

		} catch (Exception e) {
			throw new Exceptions(new Throwable(), e);
		}
	}
	
	

	@Override
	public List<EgovMapForNull> searchMpsSalaryCdForExcel(EgovMapForNull paramMap) throws Exceptions {
		try {

			List<EgovMapForNull> list = mpsmng001Mapper.selectMpsSalaryCdList(paramMap);
			

			List<EgovMapForNull> resList = list.stream().map(mapper ->{	
				mapper.put("rnum", String.valueOf(totCount--));
				
				return mapper;
			}).collect(Collectors.toList());
			
			return resList;

		} catch (Exception e) {
			throw new Exceptions(new Throwable(), e);
		}
	}

	@Override
	public Mpsmng001 findMpsSalaryCd(EgovMapForNull paramMap) throws Exceptions {
		try {

			Mpsmng001 entity = new Mpsmng001(mpsmng001Mapper.selectMpsSalaryCd(paramMap));
			return entity;

		} catch (Exception e) {
			throw new Exceptions(new Throwable(), e);
		}
	}

	@Override
	public JSONObject saveMpsSalaryCd(EgovMapForNull paramMap) throws Exceptions {
		
		JSONObject result = new JSONObject();
		try {

			//Mpsmng001 entity = new Mpsmng001(paramMap);
			
			mpsmng001Mapper.insertMpsSalaryCd(paramMap);
			result.put("code", "000");
			result.put("message", "저장이 완료되었습니다.");
			return result;
			/*		
			List<EgovMapForNull> records = mpsmng001Mapper.selectStmRolemenuList(paramMap);
			
			records.stream().forEach(roleMenus -> {
				
				List<EgovMapForNull> insertedUserMenus = mpsmng001Mapper.selectStmUserMenuList(paramMap);
				
				Long menuCount = insertedUserMenus
						.stream()
						.filter(map -> StringExpression.nullConvert(map.get("menuId")).equals(roleMenus.get("menuId")))
						.count();
				
				if(menuCount == 0) {
					roleMenus.put("userId", paramMap.get("userId"));
					mpsmng001Mapper.insertStmUsermenu(roleMenus);
				}				
			});*/
			
			//return entity;
	
		} catch (Exception e) {
			throw new Exceptions(new Throwable(), e);
			
		}
	}

	@Override
	public void modifyMpsSalaryCd(EgovMapForNull paramMap) throws Exceptions {

		try {

			mpsmng001Mapper.updateMpsSalaryCd(paramMap);
			//Mpsmng001.updateStmRoleuser(paramMap);
			//Mpsmng001.deleteStmUsermenu(paramMap); // 권한 변경시 사용자의 기존 메뉴권한 삭제 (사용자권한관리에서 삭제 처리한 메뉴 제외)
			/*
			List<EgovMapForNull> records = mpsmng001Mapper.selectStmRolemenuList(paramMap);
			
			records.stream().forEach(roleMenus -> {

				List<EgovMapForNull> insertedUserMenus = stmmng001Mapper.selectStmUserMenuList(paramMap);
				
				Long menuCount = insertedUserMenus
						.stream()
						.filter(map -> StringExpression.nullConvert(map.get("menuId")).equals(roleMenus.get("menuId")))
						.count();
				
				if(menuCount == 0) {
					roleMenus.put("userId", paramMap.get("userId"));
					stmmng001Mapper.insertStmUsermenu(roleMenus);
				}				
			});*/
			
		} catch (Exception e) {
			throw new Exceptions(new Throwable(), e);
		}
	}

	@Override
	public void removeMpsSalaryCd(EgovMapForNull paramMap) throws Exceptions {

		try {
			
			String salaryCds = StringExpression.nullConvert(paramMap.get("salaryCds"));
			String[] salaryCd = salaryCds.split("\\,");
			EgovMapForNull mapper = null;
			
			for (String t_salaryCd : salaryCd) {
				mapper = new EgovMapForNull();				
				mapper.put("salaryCd", t_salaryCd);
				//mpsmng001Mapper.deleteStmRoleUser(mapper);
				mpsmng001Mapper.deleteMpsSalaryCd(mapper);
			}

		} catch (Exception e) {
			throw new Exceptions(new Throwable(), e);
		}
	}
}
