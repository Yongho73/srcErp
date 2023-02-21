package kr.co.dbvision.api.stm.mng.stmmng006.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.stm.mng.stmmng006.entity.Stmmng006;
import kr.co.dbvision.api.stm.mng.stmmng006.service.Stmmng006Service;
import kr.co.dbvision.api.stm.mng.stmmng006.service.mapper.Stmmng006Mapper;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 사용자권한관리에 관한 구현 클래스
 *
 * @author 표준프레임워크센터
 * @since 2019.05.14
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2019.05.14          디비비전              최초 생성
 *
 * </pre>
 */
@Service("Stmmng006Service")
@Transactional
public class Stmmng006ServiceImpl extends EgovAbstractServiceImpl implements Stmmng006Service {

    Logger logger = LogManager.getLogger(Stmmng006ServiceImpl.class);

    @Resource(name="Stmmng006Mapper")
    private Stmmng006Mapper stmmng006Mapper;

    public Stmmng006ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchUser(EgovMapForNull paramMap) {
        try {

            Stmmng006 entity = new Stmmng006(paramMap);
            List<EgovMapForNull> list = stmmng006Mapper.selectUser(paramMap);
            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @Override
    public List<EgovMapForNull> searchUserForExcel(EgovMapForNull paramMap) {

        return stmmng006Mapper.selectUser(paramMap);
    }

    @Override
    public JSONObject searchMenu(EgovMapForNull paramMap) {
        try {

        	Stmmng006 entity = new Stmmng006(paramMap);
        	List<EgovMapForNull> list = stmmng006Mapper.selectMenu(paramMap);
            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    
    @Override
    public JSONObject searchUserMenu(EgovMapForNull paramMap) {
        try {

        	Stmmng006 entity = new Stmmng006(paramMap);
        	List<EgovMapForNull> list = stmmng006Mapper.selectUserMenu(paramMap);
            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    
    @Override
	public List<EgovMapForNull> searchUserMenuForExcel(EgovMapForNull paramMap) throws Exceptions {

		try {

			return stmmng006Mapper.selectUserMenu(paramMap);

		} catch (Exception e) {
			throw new Exceptions(new Throwable(), e);
		}
	}

    @Override
    public JSONObject addUserMenu(EgovMapForNull paramMap) {

        try {

        	List<EgovMapForNull> insertedUserMenus = stmmng006Mapper.selectUserMenuOnly(paramMap);
    		
    		String menuIds = StringExpression.nullConvert(paramMap.get("menuIds"));
    		String userId = StringExpression.nullConvert(paramMap.get("userId"));
    		
    		String[] menuIdArr = menuIds.split("\\|");
    		EgovMapForNull mapper = null;
    		long userMenuExistCount = 0;
    		
    		for(String menuId: menuIdArr) {
    			
    			mapper = new EgovMapForNull();
    			
    			mapper.put("userId", userId);
    			mapper.put("menuId", menuId);			
    			mapper.put("inqireAuthorAt", "1");
    			mapper.put("registAuthorAt", "1");
    			mapper.put("updtAuthorAt", "1");
    			mapper.put("deleteAuthorAt", "1");
    			mapper.put("prntngAuthorAt", "1");
    			mapper.put("excelAuthorAt", "1");
    			mapper.put("dataAuthorSe", "1");			 
    			mapper.put("regId", paramMap.get("regId"));
    			mapper.put("uptId", paramMap.get("uptId"));

    			userMenuExistCount = insertedUserMenus.stream().filter(map->StringExpression.nullConvert(map.get("menuId")).equals(menuId)).count();

    			if(userMenuExistCount > 0) {
    				stmmng006Mapper.updateUserMenu(mapper);
    			} else {
    				stmmng006Mapper.insertUserMenu(mapper);
    			}
    		}
        	
            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @Override
    public JSONObject modifyUserMenu(EgovMapForNull paramMap) {

        try {

        	String menuIds = StringExpression.nullConvert(paramMap.get("menuIds"));
    		String[] menuIdsArr = menuIds.split("\\|\\#\\|");
    		EgovMapForNull mapper = null;
    		
    		stmmng006Mapper.deleteUserMenuAll(paramMap);
    		
    		String[] userMenuArr = null;    			
			String inqireAuthorAt = null;
			String registAuthorAt = null;
			String updtAuthorAt = null;
			String deleteAuthorAt = null;
			String prntngAuthorAt = null;
			String excelAuthorAt = null;
			String dataAuthorSe = null;
			String userId = null;
			String menuId = null;
    		
    		for(String userMenus : menuIdsArr) {
    			
    			mapper = new EgovMapForNull();
    			
    			userMenuArr = userMenus.split("\\|");    			
    			inqireAuthorAt = userMenuArr[0];
    			registAuthorAt = userMenuArr[1];
    			updtAuthorAt = userMenuArr[2];
    			deleteAuthorAt = userMenuArr[3];
    			prntngAuthorAt = userMenuArr[4];
    			excelAuthorAt = userMenuArr[5];
    			dataAuthorSe = userMenuArr[6];
    			userId = userMenuArr[7];
    			menuId = userMenuArr[8];
    			
    			mapper.put("inqireAuthorAt", inqireAuthorAt);
    			mapper.put("registAuthorAt", registAuthorAt);
    			mapper.put("updtAuthorAt", updtAuthorAt);
    			mapper.put("deleteAuthorAt", deleteAuthorAt);
    			mapper.put("prntngAuthorAt", prntngAuthorAt);
    			mapper.put("excelAuthorAt", excelAuthorAt);
    			mapper.put("dataAuthorSe", dataAuthorSe);			 			
    			mapper.put("userId", userId);
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

    			stmmng006Mapper.insertUserMenu(mapper);
    		}
    		
            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @Override
    public JSONObject removeUserMenu(EgovMapForNull paramMap) {

        try {

        	String menuIds = StringExpression.nullConvert(paramMap.get("menuIds"));
    		String[] menuIdsArr = menuIds.split("\\|\\#\\|");
    		EgovMapForNull mapper = null;
    		
    		for(String userMenus : menuIdsArr) {
    			
    			mapper = new EgovMapForNull();
    			
    			String[] userMenuArr = userMenus.split("\\|");
    			 
    			mapper.put("inqireAuthorAt", userMenuArr[0]);
    			mapper.put("registAuthorAt", userMenuArr[1]);
    			mapper.put("updtAuthorAt", userMenuArr[2]);
    			mapper.put("deleteAuthorAt", userMenuArr[3]);
    			mapper.put("prntngAuthorAt", userMenuArr[4]);
    			mapper.put("excelAuthorAt", userMenuArr[5]);
    			mapper.put("dataAuthorSe", userMenuArr[6]);			 			
    			mapper.put("userId", userMenuArr[7]);
    			mapper.put("menuId", userMenuArr[8]);
    			mapper.put("uptId", paramMap.get("uptId"));
    			
    			stmmng006Mapper.deleteUserMenu(mapper);						
    		}

            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
}
