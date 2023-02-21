package kr.co.dbvision.lib;

import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;

public class WebSecurity {

	/**
	 * XXS 방지
	 * 
	 * @param value
	 * @return
	 */
	public static String clearXSSMinimum(String value) {
		if (value == null || value.trim().equals("")) {
			return "";
		}

		String returnValue = value;

		returnValue = returnValue.replaceAll("&", "&amp;");
		returnValue = returnValue.replaceAll("<", "&lt;");
		returnValue = returnValue.replaceAll(">", "&gt;");
		returnValue = returnValue.replaceAll("\"", "&#34;");
		returnValue = returnValue.replaceAll("\'", "&#39;");
		return returnValue;
	}

	/**
	 * XXS 방지
	 * 
	 * @param value
	 * @return
	 */
	public static String clearXSSMaximum(String value) {

		String returnValue = value;
		returnValue = clearXSSMinimum(returnValue);
		returnValue = returnValue.replaceAll("%00", null);
		returnValue = returnValue.replaceAll("%", "&#37;");

		// \\. => .

		returnValue = returnValue.replaceAll("\\.\\./", ""); // ../
		returnValue = returnValue.replaceAll("\\.\\.\\\\", ""); // ..\
		returnValue = returnValue.replaceAll("\\./", ""); // ./
		returnValue = returnValue.replaceAll("%2F", "");

		return returnValue;
	}

	/**
	 * 파일PATH
	 * 
	 * @param value
	 * @return
	 */
	public static String filePathBlackList(String value) {

		String returnValue = value;

		if (returnValue == null || returnValue.trim().equals("")) {
			return "";
		}

		returnValue = returnValue.replaceAll("\\.\\./", ""); // ../
		returnValue = returnValue.replaceAll("\\.\\.\\\\", ""); // ..\

		return returnValue;
	}

	/**
	 * 행안부 보안취약점 점검 조치 방안.
	 * 
	 * @param value
	 * @return
	 */
	public static String filePathReplaceAll(String value) {

		String returnValue = value;
		if (returnValue == null || returnValue.trim().equals("")) {
			return "";
		}

		returnValue = returnValue.replaceAll("/", "");
		returnValue = returnValue.replaceAll("\\", "");
		returnValue = returnValue.replaceAll("\\.\\.", ""); // ..
		returnValue = returnValue.replaceAll("&", "");

		return returnValue;
	}

	/**
	 * IP 주소 유효성 체크
	 * 
	 * @param str
	 * @return
	 */
	public static boolean isIPAddress(String str) {
		Pattern ipPattern = Pattern.compile("\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}");
		return ipPattern.matcher(str).matches();
	}

	/**
	 * 개행처리
	 * 
	 * @param parameter
	 * @return
	 */
	public static String removeCRLF(String parameter) {
		return parameter.replaceAll("\r", "").replaceAll("\n", "");
	}

	/**
	 * SQLInjection 방지
	 * 
	 * @param parameter
	 * @return
	 */
	public static String removeSQLInjectionRisk(String parameter) {
		return parameter.replaceAll("\\p{Space}", "").replaceAll("\\*", "").replaceAll("%", "").replaceAll(";", "")
				.replaceAll("-", "").replaceAll("\\+", "").replaceAll(",", "");
	}

	/**
	 * OS 명령어 방지
	 * 
	 * @param parameter
	 * @return
	 */
	public static String removeOSCmdRisk(String parameter) {
		return parameter.replaceAll("\\p{Space}", "").replaceAll("\\*", "").replaceAll("|", "").replaceAll(";", "");
	}

	/**
	 * 클라이언트 IP 추출
	 * 
	 * @param request
	 * @return
	 */
	public static String getClientIP(HttpServletRequest request) {

		String ip = request.getHeader("X-FORWARDED-FOR");

		if (ip == null || ip.length() == 0) {
			ip = request.getHeader("HTTP_X_FORWARDED_FOR");
		}

		if (ip == null || ip.length() == 0) {
			ip = request.getRemoteAddr();
		}

		return ip;
	}

	/*
	 * public static void main(String[] args) { String test = null;
	 * 
	 * test = "<script language='javascript' encoding=\"utf-8\">q&a</script>";
	 * //System.out.println("clearXSSMinimum() Test");
	 * //System.out.println(test); //System.out.println("=>");
	 * //System.out.println(clearXSSMinimum(test)); //System.out.println();
	 * 
	 * test = "/a/b/c../..\\"; //System.out.println("clearXSSMaximum() Test");
	 * //System.out.println(test); //System.out.println(" =>");
	 * //System.out.println(clearXSSMaximum(test)); //System.out.println();
	 * 
	 * test = "/a/b/c/../../../..\\..\\";
	 * //System.out.println("filePathBlackList() Test");
	 * //System.out.println(test); //System.out.println("=>");
	 * //System.out.println(filePathBlackList(test)); //System.out.println();
	 * 
	 * test = "192.168.0.1"; //System.out.println("isIPAddress() test");
	 * //System.out.println("IP : " + test + " => " + isIPAddress(test));
	 * 
	 * test = "abc def*%;-+,ghi";
	 * //System.out.println("removeSQLInjectionRisk() test");
	 * //System.out.println(test + " => " + removeSQLInjectionRisk(test)); } //
	 */

}