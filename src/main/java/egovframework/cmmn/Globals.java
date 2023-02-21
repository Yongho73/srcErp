package egovframework.cmmn;

/**
 *  Class Name : Globals.java
 *  Description : 시스템 구동 시 프로퍼티를 통해 사용될 전역변수를 정의한다.
 *
 */

public class Globals {
	//OS 유형
    public static final String OS_TYPE = EgovProperties.getProperty("Globals.OsType");
    //DB 유형
    public static final String DB_TYPE = EgovProperties.getProperty("Globals.DbType");
    //메인 페이지
    public static final String MAIN_PAGE = EgovProperties.getProperty("Globals.MainPage");
    //서버접근주소	
	public static final String SERVER_URL = EgovProperties.getProperty("Globals.serverUrl");	
	//전자결재 호출 주소 
	public static final String EKP_URL = EgovProperties.getProperty("Globals.ekpUrl");	
	//기관 사업자 번호 (전산매체 포맷) 
	public static final String COMP_REG_NO = EgovProperties.getProperty("Globals.compRegNo");
	//사업장코드 
	public static final String CORP_CD = "1000";  //디폴트사업장코드 
}
