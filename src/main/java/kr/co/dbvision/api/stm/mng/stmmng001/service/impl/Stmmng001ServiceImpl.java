package kr.co.dbvision.api.stm.mng.stmmng001.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.mhs.hrb.mhshrb001.service.impl.OldIntranetEmpInfoUpdate;
import kr.co.dbvision.api.mhs.hrb.mhshrb001.service.mapper.OldIntranetEmpInfoUpdateMapper;
import kr.co.dbvision.api.stm.mng.stmmng001.entity.Stmmng001;
import kr.co.dbvision.api.stm.mng.stmmng001.service.Stmmng001Service;
import kr.co.dbvision.api.stm.mng.stmmng001.service.mapper.Stmmng001Mapper;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 사용자관리에 관한 구현 클래스
 *
 * @author 표준프레임워크센터
 * @since 2019.05.10
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2019.05.10          디비비전              최초 생성
 *
 * </pre>
 */
@Service("Stmmng001Service")
@Transactional
public class Stmmng001ServiceImpl extends EgovAbstractServiceImpl implements Stmmng001Service {

    Logger logger = LogManager.getLogger(Stmmng001ServiceImpl.class);

    @Resource(name="Stmmng001Mapper")
    private Stmmng001Mapper stmmng001Mapper;

    @Resource(name = "OldIntranetEmpInfoUpdateMapper")
    private OldIntranetEmpInfoUpdateMapper oldIntranetEmpInfoUpdateMapper;
    
    
    private int listRowNumber = 0; // 넘버링 

    public Stmmng001ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchStmUsers(EgovMapForNull paramMap) {
        try {

            Stmmng001 entity = new Stmmng001(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = stmmng001Mapper.selectStmUsersList(paramMap).stream().map(mapper -> {
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
    public List<EgovMapForNull> searchStmUsersForExcel(EgovMapForNull paramMap) {
        return stmmng001Mapper.selectStmUsersList(paramMap);
    }

    @Override
    public JSONObject findStmUsers(EgovMapForNull paramMap) {
        try {

            Stmmng001 entity = new Stmmng001(stmmng001Mapper.selectStmUsers(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

	@Override
    public JSONObject saveStmUsers(EgovMapForNull paramMap) {

        try {

            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            Stmmng001 entity = null;

            for(String ids : idsArr) {
                
                entity = new Stmmng001(paramMap, ids);
                
                switch(entity.getNativeeditorStatus()) {
                case "deleted": 
                    
                    stmmng001Mapper.deleteFavMenu(entity);
                    stmmng001Mapper.deleteRoleUser(entity);
                    stmmng001Mapper.deleteStmUsers(entity);                    
                    break;
                    
                default: 
                    
                    String userPassword = StringExpression.nullConvert(paramMap.get("userPassword"));
                    String origPassword = StringExpression.nullConvert(paramMap.get("origPassword"));                    
                    if(!userPassword.equals(origPassword)) {
                        entity.setUpdatedPassword("true");
                    }                    
                    stmmng001Mapper.saveStmUsers(entity);            
                    stmmng001Mapper.deleteRoleUser(entity);
                    
                    //OLD 인트라 서명 및 ID 및 비밀번호 등록
                    OldIntranetEmpInfoUpdate.saveId(oldIntranetEmpInfoUpdateMapper,entity);
                    
                    
                    String roleCodes = StringExpression.nullConvert(entity.getRoleCode());
                    if(!roleCodes.isEmpty()) {
                        
                        String roleCodeArr[] = roleCodes.split("\\,");
                        
                        for(String roleCode: roleCodeArr) {                          
                            entity.setRoleCode(roleCode);                            
                            stmmng001Mapper.saveRoleUser(entity);                                
                        }
                    }
                    
                    break;
                }                
            }

            EgovMapForNull returnMap = new EgovMapForNull();
            returnMap.put("code", "000");
            returnMap.put("message", "SUCCESS");            
            
            return new JsonMsgMng().makeJsonObject(returnMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    
    @Override
    public JSONObject searchCheckRole(EgovMapForNull paramMap) {
        try {
            return new JsonMsgMng().makeJsonObject(stmmng001Mapper.selectCheckRole(paramMap));
        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

	@Override
	public JSONObject searchComboDeptNm(EgovMapForNull paramMap) {
		try {
            return new JsonMsgMng().makeJsonObject(stmmng001Mapper.selectComboDept());
        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
	}
}
