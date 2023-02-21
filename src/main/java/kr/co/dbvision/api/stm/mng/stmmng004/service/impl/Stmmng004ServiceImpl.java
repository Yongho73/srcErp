package kr.co.dbvision.api.stm.mng.stmmng004.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.stm.mng.stmmng004.entity.Stmmng004;
import kr.co.dbvision.api.stm.mng.stmmng004.service.Stmmng004Service;
import kr.co.dbvision.api.stm.mng.stmmng004.service.mapper.Stmmng004Mapper;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 그룹권한관리에 관한 구현 클래스
 *
 * @author 표준프레임워크센터
 * @since 2019.05.16
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2019.05.16          디비비전              최초 생성
 *
 * </pre>
 */
@SuppressWarnings("unchecked")
@Service("Stmmng004Service")
@Transactional
public class Stmmng004ServiceImpl extends EgovAbstractServiceImpl implements Stmmng004Service {

    Logger logger = LogManager.getLogger(Stmmng004ServiceImpl.class);

    @Resource(name="Stmmng004Mapper")
    private Stmmng004Mapper Stmmng004Mapper;

    public Stmmng004ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchRole(EgovMapForNull paramMap) {
        try {

            Stmmng004 entity = new Stmmng004(paramMap);
            List<EgovMapForNull> list = Stmmng004Mapper.selectRole(paramMap);
            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @Override
    public List<EgovMapForNull> searchRoleForExcel(EgovMapForNull paramMap) {

        return Stmmng004Mapper.selectRole(paramMap);
    }
 
    @Override
    public JSONObject searchMenu(EgovMapForNull paramMap) {
        try {

            Stmmng004 entity = new Stmmng004(paramMap);
            List<EgovMapForNull> list = Stmmng004Mapper.selectMenu(paramMap);
            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @Override
    public JSONObject searchRoleMenu(EgovMapForNull paramMap) {

    	try {

            Stmmng004 entity = new Stmmng004(paramMap);
			String roleCode =  StringExpression.nullConvert(paramMap.get("roleCode"));			
			paramMap.put("roleCode", roleCode);					
			List<EgovMapForNull> roleMenuList = Stmmng004Mapper.selectRoleMenu(paramMap);           
            entity.setRecords(roleMenuList);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    
	@Override
    public List<EgovMapForNull> searchRoleMenuForExcel(EgovMapForNull paramMap) {

    	List<EgovMapForNull> roleMenuList = new ArrayList<EgovMapForNull>();
		
		String roleMenuIn = StringExpression.nullConvert(paramMap.get("roleMenuIn"));
		String roleCode =  StringExpression.nullConvert(paramMap.get("roleCode"));
		
		paramMap.put("roleCode", roleCode);
				
		if(roleMenuIn.equals("Y")) {
			
			roleMenuList = Stmmng004Mapper.selectRoleMenu(paramMap).stream().map(mapper ->{
				
				mapper.put("roleCode", roleCode);					
				EgovMapForNull user = Stmmng004Mapper.selectRoleMenuDetail(mapper);					
				user.forEach(mapper::putIfAbsent);					
				return mapper;
				
			}).collect(Collectors.toList());
			
		} else {
			roleMenuList = Stmmng004Mapper.selectRoleMenu(paramMap);
		}
		
		return roleMenuList;
    }
    
    @Override
    public JSONObject addRoleMenu(EgovMapForNull paramMap) {

        try {

        	List<EgovMapForNull> roleUsers = Stmmng004Mapper.selectRoleUser(paramMap);
        	
    		String menuIds = StringExpression.nullConvert(paramMap.get("menuIds"));
    		String roleCode = StringExpression.nullConvert(paramMap.get("roleCode"));
    		
    		String[] menuIdArr = menuIds.split("\\|");		
    		EgovMapForNull mapper = null;
    	 	
    		for(String menuId: menuIdArr) {
    			
    			mapper = new EgovMapForNull();			
    			mapper.put("roleCode", roleCode);
    			mapper.put("menuId", menuId);			
    			mapper.put("inqireAuthorAt", "1");
    			mapper.put("registAuthorAt", "1");
    			mapper.put("updtAuthorAt", "1");
    			mapper.put("deleteAuthorAt", "1");
    			mapper.put("prntngAuthorAt", "1");
    			mapper.put("excelAuthorAt", "1");
    			mapper.put("dataAuthorSe", "1");			 
    			mapper.put("regId", paramMap.get("regId"));
    			
    			roleUsers.stream().forEach(userMapper ->{				

    				List<EgovMapForNull> insertedUserMenus = Stmmng004Mapper.selectUserMenuOnly(userMapper);				
    				Long menuCount = insertedUserMenus
    						.stream()
    						.filter(map->StringExpression.nullConvert(map.get("menuId")).equals(menuId))
    						.count();
    				
    				if(menuCount == 0) {
      
    					userMapper.put("menuId", menuId);			
    					userMapper.put("inqireAuthorAt", "1");
    					userMapper.put("registAuthorAt", "1");
    					userMapper.put("updtAuthorAt", "1");
    					userMapper.put("deleteAuthorAt", "1");
    					userMapper.put("prntngAuthorAt", "1");
    					userMapper.put("excelAuthorAt", "1");
    					userMapper.put("dataAuthorSe", "1");			 
    					userMapper.put("regId", paramMap.get("regId"));

    					Stmmng004Mapper.insertUserMenu(userMapper);	
    				}												
    			});
    			
    			Stmmng004Mapper.insertRoleMenu(mapper);			
    		}
        	
            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @Override
    public JSONObject modifyRoleMenu(EgovMapForNull paramMap) {

        try {

            String menuIds = StringExpression.nullConvert(paramMap.get("menuIds"));
            String[] menuIdsArr = menuIds.split("\\|\\#\\|");
            EgovMapForNull mapper = null;
            

            System.out.println("\n\n\n\n\n--\n" + menuIds + "\n--\n\n\n\n\n");
            
            
            Stmmng004Mapper.deleteRoleMenuAll(paramMap);
            
            String[] roleMenuArr = null;                
            String inqireAuthorAt = null;
            String registAuthorAt = null;
            String updtAuthorAt = null;
            String deleteAuthorAt = null;
            String prntngAuthorAt = null;
            String excelAuthorAt = null;
            String dataAuthorSe = null;
            String roleCode = null;
            String menuId = null;
    		
    		for(String roleMenus : menuIdsArr) {
    			
    			mapper = new EgovMapForNull();
    			
    			roleMenuArr = roleMenus.split("\\|");
    			inqireAuthorAt = roleMenuArr[0];
    			registAuthorAt = roleMenuArr[1];
    			updtAuthorAt = roleMenuArr[2];
    			deleteAuthorAt = roleMenuArr[3];
    			prntngAuthorAt = roleMenuArr[4];
    			excelAuthorAt = roleMenuArr[5];
    			dataAuthorSe = roleMenuArr[6];
    			roleCode = roleMenuArr[7];
    			menuId = roleMenuArr[8];
    			 
    			mapper.put("inqireAuthorAt", inqireAuthorAt);
    			mapper.put("registAuthorAt", registAuthorAt);
    			mapper.put("updtAuthorAt", updtAuthorAt);
    			mapper.put("deleteAuthorAt", deleteAuthorAt);
    			mapper.put("prntngAuthorAt", prntngAuthorAt);
    			mapper.put("excelAuthorAt", excelAuthorAt);
    			mapper.put("dataAuthorSe", dataAuthorSe);			 			
    			mapper.put("roleCode", roleCode);
    			mapper.put("menuId", menuId);    			
    			
    			if( inqireAuthorAt.equals("1") || 
    				registAuthorAt.equals("1") ||
    				updtAuthorAt.equals("1") ||
    				deleteAuthorAt.equals("1") ||
    				prntngAuthorAt.equals("1") ||
    			    excelAuthorAt.equals("1")) {
    				
    				mapper.put("deleteAt", "0");
    			} else {
    				mapper.put("deleteAt", "1");
    			}
    			
    			mapper.put("regId", paramMap.get("regId"));
    			mapper.put("uptId", paramMap.get("uptId"));
    			
    			Stmmng004Mapper.insertRoleMenu(mapper);						
    		}
    		
            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @Override
    public JSONObject removeRoleMenu(EgovMapForNull paramMap) {

        try {

        	String menuIds = StringExpression.nullConvert(paramMap.get("menuIds"));
    		String[] menuIdsArr = menuIds.split("\\|\\#\\|");
    		EgovMapForNull mapper = null;
    		
    		for(String roleMenus : menuIdsArr) {
    			
    			mapper = new EgovMapForNull();
    			
    			String[] roleMenuArr = roleMenus.split("\\|");
    			 
    			mapper.put("inqireAuthorAt", roleMenuArr[0]);
    			mapper.put("registAuthorAt", roleMenuArr[1]);
    			mapper.put("updtAuthorAt", roleMenuArr[2]);
    			mapper.put("deleteAuthorAt", roleMenuArr[3]);
    			mapper.put("prntngAuthorAt", roleMenuArr[4]);
    			mapper.put("excelAuthorAt", roleMenuArr[5]);
    			mapper.put("dataAuthorSe", roleMenuArr[6]);			 			
    			mapper.put("roleCode", roleMenuArr[7]);
    			mapper.put("menuId", roleMenuArr[8]);
    			mapper.put("uptId", paramMap.get("uptId"));
    			
    			Stmmng004Mapper.deleteRoleMenu(mapper);						
    		}

            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
}
