package kr.co.dbvision.api.mhs.hrm.mhshrm005.service.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.mhs.hrm.mhshrm005.entity.Mhshrm005;
import kr.co.dbvision.api.mhs.hrm.mhshrm005.service.Mhshrm005Service;
import kr.co.dbvision.api.mhs.hrm.mhshrm005.service.mapper.Mhshrm005Mapper;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.SessionMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 부서조직관리관리에 관한 서비스 구현 클래스
 *
 * @author 디비비전
 * @since 2020.04.21
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.04.21          디비비전              최초 생성
 * </pre>
 */
@Service("Mhshrm005Service")
@Transactional
public class Mhshrm005ServiceImpl extends EgovAbstractServiceImpl implements Mhshrm005Service {

    Logger logger = LogManager.getLogger(Mhshrm005ServiceImpl.class);

    @Resource(name="Mhshrm005Mapper")
    private Mhshrm005Mapper mhshrm005Mapper;

    public Mhshrm005ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchMhshrm005(EgovMapForNull paramMap) {
        try {

            Mhshrm005 entity = new Mhshrm005(paramMap);
            List<EgovMapForNull> list = mhshrm005Mapper.selectMhshrm005List(paramMap);
            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }
    
    
    //부서코드 콤보 목록을 조회한다.
    @Override
    public JSONObject selectMhshrm005RspofcCodeCombo(EgovMapForNull paramMap) {
        try {

            Mhshrm005 entity = new Mhshrm005(paramMap);
            List<EgovMapForNull> list = mhshrm005Mapper.selectMhshrm005RspofcCodeCombo(paramMap);
            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    
    
    

    @Override
    public List<EgovMapForNull> searchMhshrm005ForExcel(EgovMapForNull paramMap) {

        return mhshrm005Mapper.selectMhshrm005List(paramMap);
    }

    @Override
    public JSONObject findMhshrm005(EgovMapForNull paramMap) {
        try {

            Mhshrm005 entity = new Mhshrm005(mhshrm005Mapper.selectMhshrm005(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject saveMhshrm005(EgovMapForNull paramMap) {

    	try {
        	Map<String, Object> sessionMap = (Map<String, Object>) SessionMng.getCommonSession();
        	String userId = "";
        	if (sessionMap == null) {
			    return null;
			} else {
			    userId = StringExpression.nullConvert(sessionMap.get("userId"));
    
    			if (StringExpression.isEmpty(userId)) {
    				return null;
    			} else {
    				paramMap.put("regId", userId);
    			}
			}
        	
            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            Mhshrm005 entity = null;
            
            for(String ids : idsArr) {
                
                entity = new Mhshrm005(paramMap, ids);
                entity.setRegId(userId);
                entity.setUptId(userId);
                
                switch(entity.getNativeeditorStatus()) {
                case "updated": 
                	mhshrm005Mapper.saveMhshrm005(entity);
                    break;
                case "inserted":
                	//중복 아닌지 확인 필요
                	EgovMapForNull entity2 = mhshrm005Mapper.insertMhshrm005UseChk(entity);
    				if(Integer.parseInt((String)entity2.get("cnt")) > 0) {
    					EgovMapForNull mapper = new EgovMapForNull();
    					mapper.put("code", "999");
    					return new JsonMsgMng().makeJsonObject(mapper);
    				}
    				//부서코드,조직코드 존재 확인
    				EgovMapForNull entity3 = mhshrm005Mapper.insertMhshrm005DeptUseOrgnztChk(entity);
    				if(Integer.parseInt((String)entity3.get("cnt")) == 3) {
    				} else if(Integer.parseInt((String)entity3.get("cnt")) == 2) {
    					EgovMapForNull mapper = new EgovMapForNull();
    					mapper.put("code", "777");
    					return new JsonMsgMng().makeJsonObject(mapper);
    				} else if(Integer.parseInt((String)entity3.get("cnt")) <= 1) {
    					EgovMapForNull mapper = new EgovMapForNull();
    					mapper.put("code", "888");
    					return new JsonMsgMng().makeJsonObject(mapper);
    				}
    				mhshrm005Mapper.saveMhshrm005(entity);
                    break;
                default: 
                    break;
                }
            }
            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @Override
    public JSONObject removeMhshrm005(EgovMapForNull paramMap) {

    	try {

        	String orgnztCodes = StringExpression.nullConvert(paramMap.get("orgnztCodes"));
            String[] orgnztCodeArr = orgnztCodes.split("\\,");
            String deptCodes = StringExpression.nullConvert(paramMap.get("deptCodes"));
            String[] deptCodeArr = deptCodes.split("\\,");

            int arrLength = (orgnztCodeArr == null) ? 0 : orgnztCodeArr.length;
            
            //사용된 이력이 있으면 삭제 불가 : 현재 사용 테이블  없음
            EgovMapForNull mapperChk = null;
			for (int keyColumnIdx = 0; keyColumnIdx < arrLength; keyColumnIdx++) {
				mapperChk = new EgovMapForNull();
				mapperChk.put("orgnztCode", orgnztCodeArr[keyColumnIdx]);
				mapperChk.put("deptCode", deptCodeArr[keyColumnIdx]);
				EgovMapForNull entity = mhshrm005Mapper.deleteMhshrm005UseChk(mapperChk);
				if(Integer.parseInt((String)entity.get("cnt")) > 0) {

					EgovMapForNull mapper = new EgovMapForNull();
					mapper.put("code", "999");
					mapper.put("msg", entity.get("tbl"));
					
					return new JsonMsgMng().makeJsonObject(mapper);
				}
			}
			
			EgovMapForNull mapper = null;
            for (int keyColumnIdx = 0; keyColumnIdx < arrLength; keyColumnIdx++) {

                mapper = new EgovMapForNull();
                mapper.put("orgnztCode", orgnztCodeArr[keyColumnIdx]);
                mapper.put("deptCode", deptCodeArr[keyColumnIdx]);

                mhshrm005Mapper.deleteMhshrm005(mapper);
            }

            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            throw e;
        }
    }
}
