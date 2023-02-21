package kr.co.dbvision.lib.taglib.system.setting.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.SessionMng;
import kr.co.dbvision.lib.StringExpression;

@SuppressWarnings("unchecked")
public class SystemSetting {

	public static List<EgovMapForNull> SYST_SETT;

	public static void clearArray() throws Exception {	
		SYST_SETT = new ArrayList<EgovMapForNull>();
	}

    public static String getItemValue(String bplcCode, String item) throws Exception {
        
        String bplcOde;
        
        if(StringExpression.nullConvert(bplcCode).equals("")) {
            Map<String, Object> sessionMap = (Map<String, Object>) SessionMng.getCommonSession();
            if(sessionMap != null) {
                bplcOde = StringExpression.nullConvert(sessionMap.get("bplcCode")); // 로그인후 시스템 설정값
            } else {
                bplcOde = "deft";
            }
        } else {
            bplcOde = bplcCode;
        }
        
        //      item 종류
        //      bplcOde,                      /* 사업장코드 */
        //      prductUseItem,                /* 제품 사용 항목 */
        //      moduleUseItem,                /* 모듈 사용 항목 */
        //      pgngUnit,                     /* 페이징단위 (c133) */
        //      maskMthCode,                  /* 마스킹방법코드 */
        //      empnoEntMth,                  /* 사원번호생성방법 (c129) */
        //      langSeCode,                   /* 언어구분코드 c131 */
        //      searchPdSettingCode,          /* 검색기간설정코드 c132 */
        //      multiLoginPermAt,             /* 다중로그인허용여부 (0|1) */
        //      salaryDcmlpointProcessMth,    /* 급여소수점처리방법 c032 */
        //      dcmlpointProcessMth,          /* 소수점 처리 방법 c032 */
        //      passwordSettingMth,           /* 비밀번호설정방법 (c136) */
        //      passwordChangeCycle,          /* 비밀번호변경주기 (c135) */
        //      nextChangeAt,                 /* 비밀번호 다음변경 허용 여부 (0|1) */
        //      selfAuthMth,                  /* 개인정보인증 방법 (예를 들어 급여명세서 확인시 주민번호앞자리|뒷자리) */
        //      sknSeCode,                    /* 화면 스킨 구분 코드 */
        //      regDt,                        /* 등록일자 */
        //      regId,                        /* 등록자id */
        //      uptDt,                        /* 수정일자 */
        //      uptId                         /* 수정자id */

		String settingValue = SYST_SETT
				.stream()
				.filter(predicate -> bplcOde.equals(predicate.get("bplcCode")))				
				.map(mapper->(String) mapper.get(item))
				.collect(Collectors.joining());

		//System.out.println("["+bplcOde+"]["+item+"][settingValue]="+settingValue);

		return settingValue;
	}
}
