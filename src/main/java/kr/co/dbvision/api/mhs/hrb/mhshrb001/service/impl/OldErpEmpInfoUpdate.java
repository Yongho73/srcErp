package kr.co.dbvision.api.mhs.hrb.mhshrb001.service.impl;

import kr.co.dbvision.api.mhs.hrb.mhshrb001.service.mapper.OldErpEmpInfoUpdateMapper;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.FileMng;
import kr.co.dbvision.lib.StringExpression;

/**
 * X-ERP 인사 정보 통합을 위해 구 erp 인사 정보 데이터 싱크
 * @author yhpark
 *
 */
public class OldErpEmpInfoUpdate {
	
	public static boolean save(OldErpEmpInfoUpdateMapper mapper, EgovMapForNull paramMap) throws Exception {

		// 인사 기본
		/*--------parameter info---------
		url:::[/xerp/mhshrb001/saveMhsEmp]          url:::[/xerp/mhshrb001/modifyMhsEmp]      
		empno:::[]				    	empno:::[2021020001] 사원번호                      
		korNm:::[아무개]				    korNm:::[아무개]   성명                         
		engNm:::[amuge]				    engNm:::[amuge]  영문                         
		chcrtNm:::[亞武開]			    	chcrtNm:::[亞武開]      한자명                  
		brthdy:::[19740114]			    brthdy:::[19740114] 생년월일                      
		ecnyDe:::[20210215]			    ecnyDe:::[20210215]  입사일                     
		retireDe:::[]				    retireDe:::[20210216] 퇴사일                    
		ihidnum:::[7401141411611]		ihidnum:::[]  주민번호                             
		deptCode:::[8300]			    deptCode:::[8100] 부서                        
		hdadptDeptCode:::[8300]			hdadptDeptCode:::[8200] 겸직부서                   
		dispDeptCode:::[8400]			dispDeptCode:::[8300]    파견부서                 
		sexdstnSe:::[M]				    sexdstnSe:::[M] 성별                          
		slrcldAt:::[S]				    slrcldAt:::[S]  입력양력                          
		hffsSe:::[J01]				    hffsSe:::[J01]    재직구분                        
		emplSe:::[004]				    emplSe:::[004]  사원구분                           
		dtyCode:::[003]				    dtyCode:::[003]    직무                       
		ofcpsCode:::[700]			    ofcpsCode:::[700]     직위                    
		clsfCode:::[008]			    clsfCode:::[008] 직급                         
		srclsCode:::[01]			    srclsCode:::[01]   호봉                       
		jssfcCode:::[]				    jssfcCode:::[001]  직종                        
		rspofcCode:::[400]			    rspofcCode:::[400]  직책                      
		photoAtchmnflNo:::[F0000000000000001970]    photoAtchmnflNo:::[F0000000000000001970] 사진  
		bplcCode:::[1000]			    bplcCode:::[1000]  사업장코드                        
		regId:::[hhg19]				    regId:::[hhg19]                           
		uptId:::[hhg19]				    uptId:::[hhg19]  
		curClsfEmplmnday:::[20210312]
		retireSe:::[T05]                         
		--------parameter info---------	 
		*/       
		
		EgovMapForNull oldErpParameter = new EgovMapForNull();
		
		oldErpParameter.put("empNo", 		paramMap.get("empno"));		// 사원번호
		oldErpParameter.put("korNm", 		paramMap.get("korNm"));		// 성명
		oldErpParameter.put("engNm", 		paramMap.get("engNm"));		// 영문
		oldErpParameter.put("chaNm", 		paramMap.get("chcrtNm"));	// 한자명
		oldErpParameter.put("birthDt", 		paramMap.get("brthdy"));	// 생년월일
		oldErpParameter.put("enterDt", 		paramMap.get("ecnyDe"));	// 입사일
		oldErpParameter.put("retireDt", 	paramMap.get("retireDe"));	// 퇴사일
		oldErpParameter.put("juminNo", 		paramMap.get("ihidnum"));	// 주민번호
		oldErpParameter.put("dutyCd",       paramMap.get("dtyCode"));	// 직무 -> 003:급여, 004:복리후생, 002:인사, 001:일반, 005:총무
		oldErpParameter.put("chikcCd",      paramMap.get("jssfcCode"));	// 직종 -> 001:관리직, 002:개발직, 003:영업직, 004:연구직, 005:웹디자인, 009:임시직	
		oldErpParameter.put("compCd",       "100"); // 사업장코드
		oldErpParameter.put("actionDt",     paramMap.get("curClsfEmplmnday"));	// 현직급입용일
		
		oldErpParameter.put("deptCd", 		getDepartCode( StringExpression.nullConvert(paramMap.get("deptCode")), 			"dept") );			// 부서코드
		oldErpParameter.put("addDeptcd", 	getDepartCode( StringExpression.nullConvert(paramMap.get("hdadptDeptCode")), 	"dept") );			// 겸직부서
		oldErpParameter.put("dispDeptcd", 	getDepartCode( StringExpression.nullConvert(paramMap.get("dispDeptCode")), 		"dept") );			// 파견부서
		oldErpParameter.put("sex", 		    getOldErpCode( StringExpression.nullConvert(paramMap.get("sexdstnSe")), 		"sex" ) );			// 성별 (0 남자,1 여자)
		oldErpParameter.put("calsunYn",     getOldErpCode( StringExpression.nullConvert(paramMap.get("slrcldAt")), 			"calsunYn") );		// 입력양력 ( 1 양력, 2 음력)
		oldErpParameter.put("curStatus",    getOldErpCode( StringExpression.nullConvert(paramMap.get("hffsSe")), 			"curStatus") );		// 재직구분 -> Y:재직, N:퇴직
		oldErpParameter.put("empStatus",    getOldErpCode( StringExpression.nullConvert(paramMap.get("hffsSe")), 			"empStatus") );		// 재직구분 -> Y:재직, N:퇴직
		oldErpParameter.put("empCls",       getOldErpCode( StringExpression.nullConvert(paramMap.get("emplSe")), 			"empCls") );		// 사원구분 -> 1 정규직, 2 일용직, 3 계약직, 4 위탁직, 5 무기계약직
		oldErpParameter.put("retireDesc",   getOldErpCode( StringExpression.nullConvert(paramMap.get("retireSe")), 		    "retireDesc") );	// 퇴직사유 ->  1 의원면직 2 권고사직 3 계약종료 4 징계해고 5 정년퇴직 6 명예퇴직 7 조기퇴직 8 기타
 
		
		/*
		직위, 직급 통일
		대표이사
		이사
		부장
		차장
		과장
		대리
		사원
		인턴
		
		직위
		C01	대표이사
		C02	이사
		C03	부장
		C04	차장
		C05	과장
		C06	대리
		C07	사원
		C08	인턴
		
	 	직급
		001	대표이사
		005	부장
		006	차장
		007	과장
		008	대리
		011	사원
		004	이사
		009 인턴
		
		srclsCode // 호봉 (제외 : NULL 처리), rspofcCode 직책 (제외 : 없음)
		*/		
		oldErpParameter.put("positionCd",   getOldErpCode( StringExpression.nullConvert(paramMap.get("ofcpsCode")),	"positionCd") );	// 직위
		oldErpParameter.put("gradeCd",      getOldErpCode( StringExpression.nullConvert(paramMap.get("clsfCode")),	"gradeCd") );		// 직급				
		oldErpParameter.put("regId",      	paramMap.get("regId"));    // 로그인ID
		
		/* 사진 - /home/was/webapps/erp/ROOT/photo/ 01||사번
		 * SELECT A.FILE_KEY PT_NO FROM A_PHOTO A WHERE A.EMP_NO = ?
		 *  MERGE INTO A_PHOTO 
			USING DUAL
			ON (EMP_NO = ?)
			WHEN MATCHED THEN 
			UPDATE SET UPT_DT = sysdate,
					   UPT_ID = ?
			WHEN NOT MATCHED THEN
			INSERT (EMP_NO, IMG_CLS, FILE_KEY, REG_DT, REG_ID)
			VALUES (?, '1', '01'||?, SYSDATE, ?)
		 */
		
		// 사진 등록
		if(!"".equals( StringExpression.nullConvert(paramMap.get("photoAtchmnflNo"))) ) {
		
			EgovMapForNull fileInfoMap = mapper.selectAtachFileInfo(paramMap);
			
			// 인트라넷 사진 등록 (동일한 키 : photoAtchmnflNo)
			fileInfoMap.put("regId", paramMap.get("regId"));
			System.out.println(fileInfoMap);
			mapper.insertPhotoIntra(fileInfoMap);
			
			String orgPath = StringExpression.nullConvert(fileInfoMap.get("fileCours"));
			String orgfile = StringExpression.nullConvert(fileInfoMap.get("filStoreFileNm"));
			String newPath = "/home/was/webapps/erp/ROOT/photo";
			//String newPath = "/works_dbvision/workspace/.metadata/.plugins/org.eclipse.wst.server.core/tmp0/wtpwebapps/erp_old/photo";
			String newfile = "01" + paramMap.get("empno") + ".gif";			
			FileMng.fileCopy(orgPath, orgfile, newPath, newfile);
			
			// erp 사진등록
			mapper.insertPhoto(oldErpParameter);
				
		}
		
		mapper.insertMhsEmpMain(oldErpParameter);
				
		return true;
	}
	
	private static String getOldErpCode(String xerpCode, String erpItem) {
		
		String returnStr = "";
		
		// F:여성, M:남성
		if("sex".equals(erpItem)) {
			returnStr = "F".equals(xerpCode) ? "1" : "0";
		// S:양력, R:음력
		} else 
		if("calsunYn".equals(erpItem)) {
			returnStr = "S".equals(xerpCode) ? "1" : "2";
		// J01:재직, J05:퇴직, J03:휴직
		} else
		if("curStatus".equals(erpItem)) {
			returnStr = "J01".equals(xerpCode) ? "Y" : ("J05".equals(xerpCode) ? "N": ("J03".equals(xerpCode) ? "1":"N"));		
		// J01:재직, J05:퇴직, J03:휴직
		} else
		if("empStatus".equals(erpItem)) {
			returnStr = "J01".equals(xerpCode) ? "Y" : ("J05".equals(xerpCode) ? "N": ("J03".equals(xerpCode) ? "1":"Y"));		
		// 004:계약직, 002:무기계약직, 005:임시직, 001:정규직
		} else
		if("empCls".equals(erpItem)) {
			returnStr = "004".equals(xerpCode) ? "3" : ("002".equals(xerpCode) ? "5": ("005".equals(xerpCode) ? "2": ("001".equals(xerpCode) ? "1":"4")));	
		// 직위 100:대표이사, 200:이사, 300:부장, 400:차장, 500:과장, 600:대리, 700:사원, 800:인턴
		} else
		if("positionCd".equals(erpItem)) {
			returnStr = "100".equals(xerpCode) ? "C01" : ("200".equals(xerpCode) ? "C02": ("300".equals(xerpCode) ? "C03": ("400".equals(xerpCode) ? "C04": ("500".equals(xerpCode) ? "C05": ("600".equals(xerpCode) ? "C06": ("700".equals(xerpCode) ? "C07":"C08"))))));	
		// 직급 001:대표이사, 002:이사, 003:부장, 004:차장, 005:과장, 006:대리, 007:사원, 008:인턴
		} else
		if("gradeCd".equals(erpItem)) {
			returnStr = "001".equals(xerpCode) ? "001" : ("002".equals(xerpCode) ? "004": ("003".equals(xerpCode) ? "005": ("004".equals(xerpCode) ? "006": ("005".equals(xerpCode) ? "007": ("006".equals(xerpCode) ? "008": ("007".equals(xerpCode) ? "011":"013"))))));
		} else
		if("retireDesc".equals(erpItem)) {
			returnStr = "T01".equals(xerpCode) ? "1" : ("T02".equals(xerpCode) ? "2": ("T03".equals(xerpCode) ? "3": ("T04".equals(xerpCode) ? "4": ("T05".equals(xerpCode) ? "5": ("T06".equals(xerpCode) ? "6": ("T07".equals(xerpCode) ? "7":"8"))))));
		}  
			 
		return returnStr;
	}

	private static String getDepartCode(String xerpCode, String rType) {
		
		/*		
		A00000	경영지원본부	디비비전(주)	I00000	1	8400
		B00000	전략기획본부	디비비전(주)	I00000	1	8100
		C00000	인터넷사업부	디비비전(주)	I00000	1	8200
		D00000	개발본부	    디비비전(주)	I00000	1	8300
		I01000	경영기획부	    디비비전(주)	I00000	1	
		A01000	임원	        경영지원본부	A00000	2	8500
		
		0000			ORGNZT			    0	    20200101		1	20/08/18	000000	20/08/18	000000
		8500	8500	0000	임원		    10	1	20200526		1	20/05/26	202020	20/09/05	
		8100	8100	0000	컨설팅팀		10	1	20190101		1	20/01/01	SYSTEM	20/08/11	000000
		8200	8200	0000	고객관리팀		10	1	20190101		1	20/01/01	SYSTEM	20/08/25	
		8300	8300	0000	기술혁신팀		10	1	20190101		1	20/01/01	SYSTEM	20/08/25	
		8400	8400	0000	경영지원팀		10	1	20190101	    1	20/01/01	SYSTEM	20/06/05	000000
		*/
		
		String returnStr = "";
		
		if("8100".equals(xerpCode)) {
			if("upper".equals(rType)) {
				returnStr = "I00000"; 
			} else {
				returnStr = "B00000"; 
			}
		} else 
		if("8200".equals(xerpCode)) {
			if("upper".equals(rType)) {
				returnStr = "I00000"; 
			} else {
				returnStr = "C00000"; 
			}
		} else 
		if("8300".equals(xerpCode)) {
			if("upper".equals(rType)) {
				returnStr = "I00000"; 
			} else {
				returnStr = "D00000"; 
			}
		} else 
		if("8400".equals(xerpCode)) {
			if("upper".equals(rType)) {
				returnStr = "I00000"; 
			} else {
				returnStr = "A00000"; 
			}
		} else 
		if("8500".equals(xerpCode)) {
			if("upper".equals(rType)) {
				returnStr = "A00000"; 
			} else {
				returnStr = "A01000"; 
			}
		} else {
			if("upper".equals(rType)) {
				returnStr = "I00000"; 
			} else {
				returnStr = "C00000"; 
			}
		}

		return returnStr;
	}

	public static boolean remove(OldErpEmpInfoUpdateMapper mapper, EgovMapForNull paramMap) {
		
		String empnos = StringExpression.nullConvert(paramMap.get("empnos"));
		
		if(!"".equals(empnos)) {
			mapper.deleteMhsPhoto(paramMap);
			mapper.deleteMhsEmpMain(paramMap);
		}
		
		return true;		
	}
}
