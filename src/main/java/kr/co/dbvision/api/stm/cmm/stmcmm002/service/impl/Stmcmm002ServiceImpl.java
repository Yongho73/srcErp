package kr.co.dbvision.api.stm.cmm.stmcmm002.service.impl;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.stm.cmm.stmcmm002.service.Stmcmm002Service;
import kr.co.dbvision.api.stm.cmm.stmcmm002.service.mapper.Stmcmm002Mapper;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
 
/**
 * 메인 기능에 관한 구현 클래스
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
@Service("Stmcmm002Service")
@Transactional
public class Stmcmm002ServiceImpl extends EgovAbstractServiceImpl implements Stmcmm002Service {

	Logger logger = LogManager.getLogger(Stmcmm002ServiceImpl.class);
	
	@Resource(name="Stmcmm002Mapper")
	private Stmcmm002Mapper stmcmm002Mapper;
	
    public Stmcmm002ServiceImpl() {
    	//
    }

	@Override
	public List<EgovMapForNull> searchMenuNm(EgovMapForNull paramMap) throws Exceptions {
		
		try {
			
			if( !StringExpression.nullConvert(paramMap.get("menuNm")).contentEquals("") ) {			
				
				paramMap.put("userId", paramMap.get("regId"));			
				return stmcmm002Mapper.selectMenuSearchList(paramMap);
				
			} else {
				return new ArrayList<EgovMapForNull>();
			}

		} catch (Exception e) {
			throw new Exceptions(new Throwable(), e);
		}
	}

	@Override
	public List<EgovMapForNull> searchFavMenu(EgovMapForNull paramMap) throws Exceptions {
		try {

			paramMap.put("userId", paramMap.get("regId"));
			return stmcmm002Mapper.selectFavMenuList(paramMap);

		} catch (Exception e) {
			throw new Exceptions(new Throwable(), e);
		}
	}
	
	@Override
	public String findFirstProgramMenuId(EgovMapForNull paramMap) throws Exceptions {
		try {

			paramMap.put("userId", paramMap.get("regId"));
			return stmcmm002Mapper.selectFirstProgramMenuId(paramMap);

		} catch (Exception e) {
			throw new Exceptions(new Throwable(), e);
		}
	}
	@Override
	public EgovMapForNull searchMenuInfo(EgovMapForNull paramMap) throws Exceptions {
		try {

			//paramMap.put("userId", paramMap.get("regId"));
			return stmcmm002Mapper.selectMenuPath(paramMap);

		} catch (Exception e) {
			throw new Exceptions(new Throwable(), e);
		}
	}
	
	@Override
	public boolean addFavMenu(EgovMapForNull paramMap) throws Exceptions {
		try {
			
			paramMap.put("userId", paramMap.get("regId"));
			
			List<EgovMapForNull> list = stmcmm002Mapper.selectFavMenuList(paramMap);
			
			if(list.size() > 0) {
				return false;
			} else {			
				stmcmm002Mapper.insertFavMenu(paramMap);
				return true;
			}

		} catch (Exception e) {
			throw new Exceptions(new Throwable(), e);
		}
	}

	@Override
	public boolean removeFavMenu(EgovMapForNull paramMap) throws Exceptions {
		try {
			
			paramMap.put("userId", paramMap.get("regId"));
			
			List<EgovMapForNull> list = stmcmm002Mapper.selectFavMenuList(paramMap);
			
			if(list.size() < 1) {
				return false;
			} else {			
				stmcmm002Mapper.deleteFavMenu(paramMap);
				return true;
			}

		} catch (Exception e) {
			throw new Exceptions(new Throwable(), e);
		}
	}

	@Override
	public String findProgrmId(EgovMapForNull paramMap) throws Exceptions {
		try {

			paramMap.put("userId", paramMap.get("regId"));
			return stmcmm002Mapper.selectProgrmId(paramMap);

		} catch (Exception e) {
			throw new Exceptions(new Throwable(), e);
		}
	}
	
	@Override
	public String getTopMenuId(EgovMapForNull paramMap) throws Exceptions {
		try {

			paramMap.put("userId", paramMap.get("regId"));
			String[] connectByPath = stmcmm002Mapper.selectConnectByPath(paramMap).split("\\|");			
			return connectByPath[2];

		} catch (Exception e) {
			throw new Exceptions(new Throwable(), e);
		}
	}

    @Override
    public EgovMapForNull getMenuAuth(EgovMapForNull paramMap) throws Exceptions {
        try {

            paramMap.put("menuId", paramMap.get("menuId"));                        
            return paramMap;

        } catch (Exception e) {
            throw new Exceptions(new Throwable(), e);
        }
    }
}
