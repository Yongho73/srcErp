package kr.co.dbvision.api.stm.mng.stmmng002.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.stm.mng.stmmng002.entity.Stmmng002;
import kr.co.dbvision.api.stm.mng.stmmng002.service.Stmmng002Service;
import kr.co.dbvision.api.stm.mng.stmmng002.service.mapper.Stmmng002Mapper;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 메뉴관리에 관한 구현 클래스
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
@Service("Stmmng002Service")
@Transactional
public class Stmmng002ServiceImpl extends EgovAbstractServiceImpl implements Stmmng002Service {

    Logger logger = LogManager.getLogger(Stmmng002ServiceImpl.class);

    @Resource(name="Stmmng002Mapper")
    private Stmmng002Mapper stmmng002Mapper;

    public Stmmng002ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchStmMenu(EgovMapForNull paramMap) {
        try {

            Stmmng002 entity = new Stmmng002(paramMap);
            List<EgovMapForNull> list = stmmng002Mapper.selectStmMenuList(paramMap);
            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @Override
    public List<EgovMapForNull> searchStmMenuForExcel(EgovMapForNull paramMap) {

        return stmmng002Mapper.selectStmMenuList(paramMap);
    }

    @Override
    public JSONObject findStmMenu(EgovMapForNull paramMap) {
        try {

            Stmmng002 entity = new Stmmng002(stmmng002Mapper.selectStmMenu(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @Override
    public JSONObject saveStmMenu(EgovMapForNull paramMap) {

        try {
            //상위메뉴ID의 메뉴 구분이 프로그램인 경우에는 저장 안되도록 : 메뉴인 경우에만 저장
            int nCount = stmmng002Mapper.selectUpperMenuIdMenuSeCount(paramMap);
            
            if(nCount > 0) {
                EgovMapForNull mapper = new EgovMapForNull();
                mapper.put("code", "888");
                
                return new JsonMsgMng().makeJsonObject(mapper);
            }
            
            stmmng002Mapper.insertStmMenu(paramMap);
            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @Override
    public JSONObject modifyStmMenu(EgovMapForNull paramMap) {

        try {
            String menuUseAt = paramMap.get("menuUseAt").toString();
            //System.out.println("=================>" + paramMap.get("menuUseAt").toString());
            stmmng002Mapper.updateStmMenu(paramMap);
            if(menuUseAt.equals("0")) { //하위 3단계 모두 미사용 처리
                stmmng002Mapper.updateStmMenuMenuUseAtOff(paramMap);
            }
            else if(menuUseAt.equals("1")) { //상위 3단계 모두 사용 처리
                stmmng002Mapper.updateStmMenuMenuUseAtOn(paramMap);
            }
            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @Override
    public JSONObject removeStmMenu(EgovMapForNull paramMap) {

        try {

            String menuIds = StringExpression.nullConvert(paramMap.get("menuIds"));
            String[] menuIdArr = menuIds.split("\\,");

            int arrLength = (menuIdArr == null) ? 0 : menuIdArr.length;
            EgovMapForNull mapper = null;

            for (int keyColumnIdx = 0; keyColumnIdx < arrLength; keyColumnIdx++) {

                mapper = new EgovMapForNull();
                mapper.put("menuId", menuIdArr[keyColumnIdx]);

                stmmng002Mapper.deleteStmMenu(mapper);
            }

            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    
    @Override
	public JSONObject modifyOrder(EgovMapForNull paramMap) {

		try {
			
			stmmng002Mapper.updateMenuTarget(paramMap);		
			
			String menuIds = StringExpression.nullConvert(paramMap.get("menuIds"));
			String[] menuIdsArr = menuIds.split("\\|\\#\\|");
			EgovMapForNull mapper = null;
			
			for(String menus : menuIdsArr) {
				
				mapper = new EgovMapForNull();
				
				String[] menuArr = menus.split("\\|");

				mapper.put("menuId", menuArr[0]);
				mapper.put("ordr", menuArr[1]);				 
				mapper.put("uptId", paramMap.get("uptId"));
				
				stmmng002Mapper.updateOrder(mapper);		
			}
			
			return new JsonMsgMng().makeJsonObject(paramMap);
			
		} catch (Exception e) {
			return new Exceptions(new Throwable(), e).getResultStatus();
		}
	}
    
    @Override
	public JSONObject findDupMenuId(EgovMapForNull paramMap) {
		try {
			
			EgovMapForNull result = new EgovMapForNull();
			int totCount = stmmng002Mapper.selectCount(paramMap);
			
			if(totCount > 0) {
				result.put("dupYn", "Y");
			} else {
				result.put("dupYn", "N");
			}
			
			return new JsonMsgMng().makeJsonObject(result);

		} catch (Exception e) {
			return new Exceptions(new Throwable(), e).getResultStatus();
		}
	}

	@Override
	public JSONObject searchProgm() {
		try {            
            return new JsonMsgMng().makeJsonObject(stmmng002Mapper.selectProgmList());
        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
	}
}
