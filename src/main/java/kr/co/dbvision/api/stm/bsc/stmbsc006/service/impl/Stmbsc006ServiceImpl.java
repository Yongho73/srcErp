package kr.co.dbvision.api.stm.bsc.stmbsc006.service.impl;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.stm.bsc.stmbsc006.entity.Stmbsc006;
import kr.co.dbvision.api.stm.bsc.stmbsc006.service.Stmbsc006Service;
import kr.co.dbvision.api.stm.bsc.stmbsc006.service.mapper.Stmbsc006Mapper;
import kr.co.dbvision.lib.DateExpression;
import kr.co.dbvision.lib.Debug;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.GlobalProperties;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.SessionMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.StringUtil;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 자동채번설정관리에 관한 서비스 구현 클래스
 *
 * @author 디비비전
 * @since 2020.02.27
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.02.27          디비비전              최초 생성
 * </pre>
 */
@Service("Stmbsc006Service")
@Transactional
public class Stmbsc006ServiceImpl extends EgovAbstractServiceImpl implements Stmbsc006Service {

    Logger logger = LogManager.getLogger(Stmbsc006ServiceImpl.class);
    
    private final Object mSemaphore = new Object();

    @Resource(name="Stmbsc006Mapper")
    private Stmbsc006Mapper stmbsc006Mapper;

    private int listRowNumber = 0; // 넘버링 

    public Stmbsc006ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchStmbsc006(EgovMapForNull paramMap) throws Exception {
        try {
            Stmbsc006 entity = new Stmbsc006(paramMap);
            listRowNumber = 1;

            String gbDbType = GlobalProperties.getProperty("Globals.DbType");
            if(gbDbType.toLowerCase().equals("mssql")) {
                List<EgovMapForNull> list = stmbsc006Mapper.selectStmbsc006List(paramMap).stream().map(mapper -> {
                        mapper.put("num", listRowNumber++);
                        String maxNumber = stmbsc006Mapper.selectGetMaxNumberStmbsc006(mapper);
                        mapper.put("maxNumber", maxNumber);
                        return mapper;
                }).collect(Collectors.toList());

                entity.setRecords(list);
            } else {
                List<EgovMapForNull> list = stmbsc006Mapper.selectStmbsc006List(paramMap).stream().map(mapper -> {
                        mapper.put("num", listRowNumber++);
                        return mapper;
                }).collect(Collectors.toList());

                entity.setRecords(list);
            }
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exceptions e) {
            return new JsonMsgMng().makeJsonObject(e);
        }
    }

    @Override
    public List<EgovMapForNull> searchStmbsc006ForExcel(EgovMapForNull paramMap) {

        return stmbsc006Mapper.selectStmbsc006ListForExcel(paramMap);
    }

    @Override
    public JSONObject findStmbsc006(EgovMapForNull paramMap) {
        try {

            Stmbsc006 entity = new Stmbsc006(stmbsc006Mapper.selectStmbsc006(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject saveStmbsc006(EgovMapForNull paramMap) throws IOException{

        try {

            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            Stmbsc006 entity = null;
            boolean Check = false;
            boolean fnCheck = false; //함수 재생성 여부

            for(String ids : idsArr) {

                entity = new Stmbsc006(paramMap, ids);
                
                switch(entity.getNativeeditorStatus()) {
                case "deleted":
                    fnCheck = true;
                    stmbsc006Mapper.deleteStmbsc006(entity);
                    Check = true;
                    break;
                case "inserted":
                    fnCheck = true;
                    stmbsc006Mapper.saveStmbsc006(entity);
                    break;
                default:
                    stmbsc006Mapper.saveStmbsc006(entity);
                    break;
                }
            }
            
            if(fnCheck) {
                //MSSQL인 경우 일련번호 생성, 삭제 시 함수 다시 만들도록 수정 : 오라클에서는 함수 내에서 동적 쿼리 실행 되는데 MSSQL에서는 실행 안됨
                String gbDbType = GlobalProperties.getProperty("Globals.DbType");
                if(gbDbType.toLowerCase().equals("mssql")) {
                    StringBuffer createSql = new StringBuffer();
        
                    createSql.append("\r\n");
                    createSql.append("ALTER function [dbo].[FNC_GET_COL_SN_INFO] ( @IN_TABLE_ID varchar(100), @IN_COL_ID varchar(100)) ");
                    createSql.append("\r\n");
                    createSql.append("/*===========================================================================*/");
                    createSql.append("\r\n");
                    createSql.append("/* FUNCTION ID :  FNC_GET_COL_SN_INFO                                        */");
                    createSql.append("\r\n");
                    createSql.append("/* FUNCTION 명 :  채번 번호찾기                                              */");
                    createSql.append("\r\n");
                    createSql.append("/* 작성일      :  2020-02-28                                                 */");
                    createSql.append("\r\n");
                    createSql.append("/* 작성자      :  디비비전                                                   */");
                    createSql.append("\r\n");
                    createSql.append("/* 입력파라미터 :  테이블명, 컬럼명 받아서 채번 번호찾기                     */");
                    createSql.append("\r\n");
                    createSql.append("/*===========================================================================*/");
                    createSql.append("\r\n");
                    createSql.append("returns varchar(100)");
                    createSql.append("\r\n");
                    createSql.append("AS");
                    createSql.append("\r\n");
                    createSql.append("BEGIN");
                    createSql.append("\r\n");
                    createSql.append("DECLARE @returnVal varchar(100);");
                    createSql.append("\r\n");
                    createSql.append("SET @returnVal = '';");
                    createSql.append("\r\n");
                    
                    List<EgovMapForNull> list = stmbsc006Mapper.selectStmbsc006AllList();
                    
                    String strRelTblNm = "";
                    String strRelItemNm = "";
                    for(int i = 0; i < list.size();i++) {
                        
                        EgovMapForNull map = (EgovMapForNull) list.get(i);
                        
                        strRelTblNm = map.get("relTblNm").toString();
                        strRelItemNm = map.get("relItemNm").toString();
                        if(i == 0) {
                            createSql.append("  IF @IN_TABLE_ID = '");
                        }
                        else {
                            createSql.append("  ELSE IF @IN_TABLE_ID = '");
                        }
                        createSql.append(strRelTblNm);
                        createSql.append("' AND @IN_COL_ID = '");
                        createSql.append(strRelItemNm);
                        createSql.append("'");
                        createSql.append("\r\n");
                        createSql.append("      SELECT @returnVal = MAX(");
                        createSql.append(strRelItemNm);
                        createSql.append(") ");
                        createSql.append("\r\n");
                        createSql.append("      FROM ");
                        createSql.append(strRelTblNm);
                        createSql.append(";");
                        createSql.append("\r\n");
                    }
                    createSql.append("\r\n");
                    createSql.append("  IF (@returnVal IS NULL)");
                    createSql.append("\r\n");
                    createSql.append("        SET @returnVal = '';");
                    createSql.append("\r\n");
                    createSql.append("\r\n");
                    createSql.append("  return @returnVal;");
                    createSql.append("\r\n");
                    createSql.append("END");
                    createSql.append("\r\n");
                    
                    //System.out.println(createSql.toString());
                    HashMap hmap = new HashMap();
                    hmap.put("sql", createSql.toString());
                    
                    stmbsc006Mapper.createFunctionStmbsc006(hmap);
                }
            }
            
            //if(false) { throw new Exceptions("Error."); } 
            EgovMapForNull returnMap = new EgovMapForNull();
            returnMap.put("code", "000");
            returnMap.put("message", "SUCCESS");

            return new JsonMsgMng().makeJsonObject(returnMap);

        } catch (Exception e) {
            throw e;
        }
    }

    /*
    @Override
    public JSONObject removeStmbsc006(EgovMapForNull paramMap) {

        try {

            String relTblNms = StringExpression.nullConvert(paramMap.get("relTblNms"));
            String[] relTblNmArr = relTblNms.split("\\,");
            String relItemNms = StringExpression.nullConvert(paramMap.get("relItemNms"));
            String[] relItemNmArr = relItemNms.split("\\,");

            int arrLength = (relItemNmArr == null) ? 0 : relItemNmArr.length;
            EgovMapForNull mapper = null;

            for (int keyColumnIdx = 0; keyColumnIdx < arrLength; keyColumnIdx++) {

                mapper = new EgovMapForNull();
                mapper.put("relTblNm", relTblNmArr[keyColumnIdx]);
                mapper.put("relItemNm", relItemNmArr[keyColumnIdx]);

                stmbsc006Mapper.deleteStmbsc006(mapper);
            }

            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }*/

    @Override
    public JSONObject selectStmbsc006TableList(EgovMapForNull paramMap) {
    	
		try {
            return new JsonMsgMng().makeJsonObject(stmbsc006Mapper.selectStmbsc006TableList(paramMap));
        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }    	
    	
    }    
    
    @Override
    public JSONObject selectStmbsc006TableColList(EgovMapForNull paramMap) {       
		try {
            return new JsonMsgMng().makeJsonObject(stmbsc006Mapper.selectStmbsc006TableColList(paramMap));
        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }    	
    	
    }      
    
    @Override
    public JSONObject selectGetNumberStmbsc006(EgovMapForNull paramMap) {       
		try {
            return new JsonMsgMng().makeJsonObject(stmbsc006Mapper.selectGetNumberStmbsc006(paramMap));
        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }    	
    	
    }      

    
    /**
     * 마지막 번호를 채번후 업데이트 해야함..
     * 번호채번 
     */
    @Override
    public JSONObject selectCreateNumberStmbsc006(EgovMapForNull paramMap) {       
		try {
						
			StringBuffer bf = new StringBuffer();
			String lastSn = "";

			EgovMapForNull entity = stmbsc006Mapper.selectStmbsc006(paramMap);
			
			if(entity != null) {			
				// 머리글
				if (entity.get("prefixUseAt").equals("1")) {
	        		bf.append(entity.get("prefixSeCode"));
	        	}       	
	        	// 년도
				if (entity.get("yyUseAt").equals("1")) {
	        		if (entity.get("yyLtCode").equals("4")) {
	        			bf.append(DateExpression.getToday().substring(0, 4));
	        		}else {
	        			bf.append(DateExpression.getToday().substring(2, 4));
	        		}
	        	}
				// 월사용 
				if (entity.get("mtUseAt").equals("1")) { 
	        		bf.append(DateExpression.getToday().substring(4, 6));
	        	}        	
				// 일사용
				if (entity.get("deUseAt").equals("1")) { 
	        		bf.append(DateExpression.getToday().substring(6));
	        	}      
				// 접미사여부 
				if (entity.get("seUseAt").equals("1")) { 
	        		bf.append("-"); 
	        	} 
				// 길이 
	        	int snLt = Integer.parseInt( (String) entity.get("snLt") );	        	
	        	//번호 채번	        	
	        	synchronized (mSemaphore) {
	        		// 마지막번호 조회 없으면 무조건 1	        		 
	        		lastSn = StringExpression.nullConvert( stmbsc006Mapper.selectGetNumberStmbsc006(paramMap), "1");
	        		// 마지막번호 업데이트
	        		paramMap.put("lastPrefix", bf.toString());
	        		StringUtil.setSessionUserIdMap(paramMap);
	        		stmbsc006Mapper.updateNextNumberStmbsc006(paramMap);
	        	}	        	
	        	bf.append( StringExpression.lpad(lastSn, snLt, "0") );	        	
	        	lastSn = bf.toString();
			}
        	
        	logger.debug("채번번호:::"+ bf.toString());
			
        	return new JsonMsgMng().makeJsonObject(lastSn);
        } catch (Exception e) {
        	return new Exceptions(new Throwable(), e).getResultStatus();
        }    	    	
    }       
    
    @Override
	public JSONObject getNextValue(Stmbsc006 entity) {
    	//테이블 명 , 컬럼명 
    	EgovMapForNull paramMap = new EgovMapForNull();
    	paramMap.put("relTblNm",  entity.getRelTblNm());
    	paramMap.put("relItemNm", entity.getRelItemNm());    	
    	return selectCreateNumberStmbsc006(paramMap);
	}

    @Override
    public synchronized String searchStmbsc006GetNumberingSn(EgovMapForNull paramMap) {
        try { 
        	 System.out.println("------11-------------");
        	
            Map<String, Object> sessionMap = (Map<String, Object>) SessionMng.getCommonSession();
            String userId = "";
            if (sessionMap == null) {
            	System.out.println("------12-------------");
                return null;
            } else {
            	System.out.println("------13-------------");
                userId = StringExpression.nullConvert(sessionMap.get("userId"));
    
                if (StringExpression.isEmpty(userId)) {
                	System.out.println("------14-------------");
                    return null;
                }
            }
            paramMap.put("regId", userId);
            
            System.out.println("------15-------------paramMap"+paramMap);
            
            stmbsc006Mapper.selectStmbsc006GetNumberingSn(paramMap);

            System.out.println("------16-------------");
            String strMaxNumberingSn = (String) paramMap.get("maxNumberingSn");
            System.out.println("------17-------------"+strMaxNumberingSn);
            
            return strMaxNumberingSn;

        } catch (Exception e) {
            throw e;
        }
    }
}
