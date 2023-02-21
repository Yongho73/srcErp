package kr.co.dbvision.api.stm.cmm.stmcmm001.service.impl;

import java.util.Enumeration;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.stm.cmm.stmcmm001.entity.Stmcmm001;
import kr.co.dbvision.api.stm.cmm.stmcmm001.service.Stmcmm001Service;
import kr.co.dbvision.api.stm.cmm.stmcmm001.service.impl.merge.MenuMerge;
import kr.co.dbvision.api.stm.cmm.stmcmm001.service.mapper.Stmcmm001Mapper;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.GlobalProperties;
import kr.co.dbvision.lib.SessionListener;
import kr.co.dbvision.lib.SessionMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.StringSecurity;
import kr.co.dbvision.lib.exception.Exceptions;
import kr.co.dbvision.lib.taglib.system.setting.service.impl.SystemSetting;
 
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
@SuppressWarnings({"unchecked", "rawtypes"})
@Service("Stmcmm001Service")
@Transactional
public class Stmcmm001ServiceImpl extends EgovAbstractServiceImpl implements Stmcmm001Service {

	Logger logger = LogManager.getLogger(Stmcmm001ServiceImpl.class);

	@Resource(name="Stmcmm001Mapper")
	private Stmcmm001Mapper stmcmm001Mapper;
	
    public Stmcmm001ServiceImpl() {
    	//
    }

	@Override
	public Stmcmm001 findUser(Map<String, String> paramMap) throws Exceptions {
		try {

			Map<String, Object> sessionMap = (Map<String, Object>) SessionMng.getCommonSession();
			
			if (sessionMap == null) {
			    
			    return null;
			    
			} else {
			    
    			String userId = StringExpression.nullConvert(sessionMap.get("userId"));
    
    			if (StringExpression.isEmpty(userId)) {
    			    
    				return null;
    				
    			} else {
    			    
    			    EgovMapForNull resultMap = stmcmm001Mapper.selectUser(userId);
    			    
    				EgovMapForNull param = new EgovMapForNull();
    				param.put("userId", userId);
    				param.put("menuId", "CHF000000");				
    				List<EgovMapForNull> menuList = stmcmm001Mapper.selectMenuList(param);
    				List<EgovMapForNull> roleMenuList = stmcmm001Mapper.selectRoleMenuList(param);
    				
    				Stmcmm001 entity = new Stmcmm001();             
                    entity.setUserId((String) resultMap.get("userId"));
                    entity.setUserNm((String) resultMap.get("userNm"));
                    entity.setUserIp((String) resultMap.get("userIp"));
                    entity.setLastLogin((String) resultMap.get("lastLogin"));
                    entity.setEmpno((String) resultMap.get("empno"));           
    				
    				String authorSetting = StringExpression.nullConvert(resultMap.get("authorSetting"));
    				
    				// top menu
    				List<EgovMapForNull> topMenuList = findTopMenu(menuList, roleMenuList, authorSetting);
    				
    				if(topMenuList.size() > 0) {
    								
        				String upMenuId = StringExpression.nullConvert(paramMap.get("upMenuId"));
                        upMenuId = upMenuId.equals("") ? StringExpression.nullConvert(topMenuList.get(0).get("id")) : upMenuId;                
                        
                        // left menu
                        List<EgovMapForNull> leftMenuList = findLeftMenu(menuList, roleMenuList, upMenuId, authorSetting);
                        
                        // auth all menu
                        List<EgovMapForNull> authMenuListForLocalStorage = findAuthMenuAll(menuList, roleMenuList, authorSetting);
                        
                        entity.setUserMenu(authMenuListForLocalStorage);
                        entity.setUserTopMenu(topMenuList);
                        entity.setUserLeftMenu(leftMenuList);
                        
    				} else {
    				    
    				    entity.setUserTopMenu(null);
                        entity.setUserLeftMenu(null);
    				}    	 
    
    				return entity;
    			}
			}

		} catch (Exception e) {
			throw new Exceptions(new Throwable(), e);
		}
	}

	@Override
	public EgovMapForNull findPassword(Stmcmm001 stmcmm001, HttpSession session) throws Exceptions {
		try {
			
		    EgovMapForNull map = new EgovMapForNull();		    
			String otherSessionCloseAt = stmcmm001.getOtherSessionCloseAt();			
			map.put("passwordUpdt", checkSession(stmcmm001, session, otherSessionCloseAt));		 	
			return map;

		} catch (Exception e) {
			throw new Exceptions(new Throwable(), e);
		}
	}
	
    @Override
    public EgovMapForNull findPasswordSSO(Stmcmm001 stmcmm001, HttpSession session) throws Exceptions {
        try {
            
            EgovMapForNull map = new EgovMapForNull();            
            String otherSessionCloseAt = "1";            
            map.put("passwordUpdt", checkSession(stmcmm001, session, otherSessionCloseAt));            
            return map;

        } catch (Exception e) {
            throw new Exceptions(new Throwable(), e);
        }
    }
    
    private String checkSession(Stmcmm001 stmcmm001, HttpSession session, String otherSessionCloseAt) throws Exceptions {
        try {
            
            String userId = stmcmm001.getUserId();
            String userKey = StringSecurity.encrypt(stmcmm001.getUserKey());
            EgovMapForNull userInfo = stmcmm001Mapper.selectUserDetail(userId);
    
            if (userInfo != null) {
                
                String bplcCode = StringExpression.nullConvert(userInfo.get("bplcCode"));
                String multiLoginPermAt = SystemSetting.getItemValue(bplcCode, "multiLoginPermAt");
                String passwordUpdt = StringExpression.nullConvert(userInfo.get("passwordUpdt"));
                
                if(userKey.equals(StringExpression.nullConvert(userInfo.get("userPassword")))) { 
                    // 로그인 패스워드 처리시 사용 
                }
    
                // 다중로그인 미허용 설정 적용 되어 있으면 다른 세션을 끊을지 확인          
                if( multiLoginPermAt.equals("0") ) {                    
                    // 세션 끊을지 말지 적용
                    if(otherSessionCloseAt.equals("0")) {                   
                        if(SessionListener.getInstance().isUsing(userId)) {
                            //System.out.println("이미 아이디가 접속중 입니다.");
                            return "already";
                        }
                    // 끊어버려
                    } else {
                        logout(multiLoginPermAt, userId, session);
                    }
                } 
                
                Map<String, Object> sessionMap = new HashMap<String, Object>();
                sessionMap.put("userId", StringExpression.nullConvert(userInfo.get("userId")));
                sessionMap.put("userNm", StringExpression.nullConvert(userInfo.get("userNm")));
                sessionMap.put("userEmpNo", StringExpression.nullConvert(userInfo.get("empno")));
                sessionMap.put("userDeptCode", StringExpression.nullConvert(userInfo.get("deptCode")));
                sessionMap.put("userDeptNm", StringExpression.nullConvert(userInfo.get("deptNm")));
                sessionMap.put("userClsfCode", StringExpression.nullConvert(userInfo.get("clsfCode")));
                sessionMap.put("userClsfNm", StringExpression.nullConvert(userInfo.get("clsfNm")));
                sessionMap.put("bplcCode", bplcCode);
                
                session.setAttribute("userId", StringExpression.nullConvert(userInfo.get("userId")));
                session.setAttribute("userNm", StringExpression.nullConvert(userInfo.get("userNm")));
                session.setAttribute("userEmpNo", StringExpression.nullConvert(userInfo.get("empno")));
                session.setAttribute("userDeptCode", StringExpression.nullConvert(userInfo.get("deptCode")));
                session.setAttribute("userDeptNm", StringExpression.nullConvert(userInfo.get("deptNm")));
                session.setAttribute("userClsfCode", StringExpression.nullConvert(userInfo.get("clsfCode")));
                session.setAttribute("userClsfNm", StringExpression.nullConvert(userInfo.get("clsfNm")));
                session.setAttribute("bplcCode", bplcCode);
                session.setMaxInactiveInterval(Integer.parseInt(GlobalProperties.getProperty("Globals.session.timeout")));
    
                SessionListener.getInstance().setSession(session, userId);
                SessionListener.getInstance().printloginUsers(multiLoginPermAt);                                
                SessionMng.removeCommonSession();
                SessionMng.setCommonSession(sessionMap);
    
                return passwordUpdt.equals("") ? "00000000" : passwordUpdt;
                
            } else {
                return null;
            }
            
        } catch (Exception e) {
            throw new Exceptions(new Throwable(), e);
        }
    }

	@Override
	public List<EgovMapForNull> findTopMenu(List<EgovMapForNull> menuList, List<EgovMapForNull> roleMenuList, String authorSetting) throws Exceptions {		 
		try {
			
		    LinkedHashMap<String, List<EgovMapForNull>> linkedHashMap = new LinkedHashMap<String, List<EgovMapForNull>>();
			linkedHashMap.put("user", menuList);
			linkedHashMap.put("group", roleMenuList);			
			List<EgovMapForNull> menuMergeList = MenuMerge.doIt(linkedHashMap, authorSetting);
			return MenuMerge.getGrantedUserMenuList(menuMergeList, "topMenuList");
			
		} catch (Exception e) {
			throw new Exceptions(new Throwable(), e);
		}
	}

	@Override
	public List<EgovMapForNull> findLeftMenu(List<EgovMapForNull> menuList, List<EgovMapForNull> roleMenuList, String upMenuId, String authorSetting) throws Exceptions {
		try {
			
			LinkedHashMap<String, List<EgovMapForNull>> linkedHashMap = new LinkedHashMap<String, List<EgovMapForNull>>();
            linkedHashMap.put("user", MenuMerge.abstractLeftMenu(menuList, upMenuId));
            linkedHashMap.put("group", MenuMerge.abstractLeftMenu(roleMenuList, upMenuId));           
            List<EgovMapForNull> menuMergeList = MenuMerge.doIt(linkedHashMap, authorSetting);
			return MenuMerge.getGrantedUserMenuList(menuMergeList, "leftMenuList");
			
		} catch (Exception e) {
			throw new Exceptions(new Throwable(), e);
		}
	}
	
	@Override
	public List<EgovMapForNull> findAuthMenuAll(List<EgovMapForNull> menuList, List<EgovMapForNull> roleMenuList, String authorSetting) throws Exceptions {
	    try {
            
            LinkedHashMap<String, List<EgovMapForNull>> linkedHashMap = new LinkedHashMap<String, List<EgovMapForNull>>();
            linkedHashMap.put("user", menuList);
            linkedHashMap.put("group", roleMenuList);           
            List<EgovMapForNull> menuMergeList = MenuMerge.doIt(linkedHashMap, authorSetting);
            return MenuMerge.getGrantedUserMenuList(menuMergeList, "leftMenuList");
            
        } catch (Exception e) {
            throw new Exceptions(new Throwable(), e);
        }
	}

	@Override
	public void logout(String multiLoginPermAt, String userId, HttpSession session) throws Exceptions {
	    try {    	    
    	    // 다중로그인 미허용 설정 적용 되어 있으면 다른 세션을 끊을지 확인          
            if( multiLoginPermAt.equals("0") ) {
                SessionListener.getInstance().removeSession(userId);
            } else {
                SessionListener.getInstance().removeSession(session);
            }
    	    
            SessionListener.getInstance().printloginUsers(multiLoginPermAt);	   
    	    SessionMng.removeCommonSession();	 
	    } catch (Exception e) {
            throw new Exceptions(new Throwable(), e);
        }
	}

	@Override
	public void insertStmUseHis(HttpServletRequest request, String userId) throws Exceptions {
		try {

			EgovMapForNull paramMap = new EgovMapForNull();
 
			Enumeration params = request.getParameterNames();
			
			StringBuffer sb = new StringBuffer();
			String name = null;
			String conectIp = request.getRemoteAddr();
			String uri = request.getRequestURI();
			String menuId = null;
			String parameters = null;

			// 파라미터 필터링
			while (params.hasMoreElements()) {
				name = (String) params.nextElement();
				// 값이 없는 변수는 로깅하지 않음
				if (request.getParameter(name) == null || request.getParameter(name).equals(""))
					continue;
				sb.append(name + "=" + request.getParameter(name) + "&");
			}
			// 마지막 & 값은 삭제
			parameters = sb.toString();
			if (parameters != null && parameters.length() > 0) {
				parameters = parameters.substring(0, parameters.length() - 1);
			}

			// menuId 구성
			if (uri != null && uri.substring(1).indexOf("/") > 0) {
				menuId = uri.substring(1).split("/")[1];
			}

			// TODO 값 출력 - 향후삭제예정
			// logger.debug("### IP : " + conectIp);
			// logger.debug("### userId : " + userId);
			// logger.debug("### menuId : " + menuId);
			// logger.debug("### URI : " + uri);
			// logger.debug("### parameters : " + parameters);

			// 사용자 로그 입력
			paramMap.put("histDc", parameters);
			paramMap.put("histSe", uri.replaceAll("/xerp/", ""));
			paramMap.put("conectIp", conectIp);
			paramMap.put("menuId", menuId);
			paramMap.put("regId", userId);
			
			stmcmm001Mapper.insertStmUseHis(paramMap);

		} catch (Exception e) {
			throw new Exceptions(new Throwable(), e);
		}
	}

	@Override
	public String getMenuPath(Map<String, String> paramMap) throws Exceptions {
		try {
			 
			String menuId = StringExpression.nullConvert(paramMap.get("menuId"));

			if (StringExpression.isEmpty(menuId)) {
				return "";
			} else {				
				EgovMapForNull mapper = stmcmm001Mapper.selectMenuPath(menuId);
				return StringExpression.nullConvert(mapper.get("pathNm"));
			}

		} catch (Exception e) {
			throw new Exceptions(new Throwable(), e);
		}
	}
}
