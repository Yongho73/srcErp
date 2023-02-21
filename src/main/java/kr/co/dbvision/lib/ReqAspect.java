package kr.co.dbvision.lib;

import java.io.IOException;
//import java.util.Enumeration;
//import java.util.HashMap;
//import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.Signature;
//import org.springframework.web.context.request.RequestContextHolder;
//import org.springframework.web.context.request.ServletRequestAttributes;

public class ReqAspect {

	protected Log logger = LogFactory.getLog(this.getClass());

	/**
	 * 메소드 요청 전처리
	 * 
	 * @param joinPoint
	 * @throws Exception
	 */
	public void reqBefore(JoinPoint joinPoint) throws Exception {

		StringBuffer stringBuffer = new StringBuffer();

		// HttpServletRequest request = null;
		// HttpSession session = null;

		// String requestUrl = "";
		Signature signature = joinPoint.getSignature(); // 메소드명
		String targetClassName = joinPoint.getTarget().getClass().getName(); // Class
																				// Name

		String methodNm = joinPoint.getSignature().getName();

		stringBuffer.append("\n >>>>>>>>>> reqBefore start <<<<<<<<<<");
		stringBuffer.append("\n ReqBefore() is running");
		stringBuffer.append("\n Hijacked [" + methodNm + "]");
		stringBuffer.append("\n signature [" + signature + "]");
		stringBuffer.append("\n targetClassName [" + targetClassName + "]");

		// stringBuffer.append("\n --------- request param start ---------");
		// request = ((ServletRequestAttributes)
		// RequestContextHolder.currentRequestAttributes()).getRequest();
		// Enumeration enumer = request.getParameterNames();
		// String reqName = "";
		// String reqValue = "";
		//
		// while(enumer.hasMoreElements()){
		// reqName = (String)enumer.nextElement();
		// reqValue = request.getParameter(reqName);
		// stringBuffer.append("\n "+reqName+"=["+reqValue+"]");
		// }
		// stringBuffer.append("\n --------- request param end ---------");

		// request = ((ServletRequestAttributes)
		// RequestContextHolder.currentRequestAttributes()).getRequest();
		// requestUrl = request.getRequestURL().toString();
		//
		// session = request.getSession();
		// LoginVO loginVO = UserDetailsHelper.getUserInfo(session);
		//
		// String menuId =
		// StringUtil.nullConvert(request.getParameter("menuId"));
		// String userId = StringUtil.nullConvert(loginVO.getId());
		// String userIp = StringUtil.nullConvert(request.getRemoteAddr());
		//
		// stringBuffer.append(String.format("\n requestUrl=[%s]",requestUrl));
		// stringBuffer.append(String.format("\n menuId=[%s]",menuId));
		// stringBuffer.append(String.format("\n
		// getId=[%s]",StringUtil.nullConvert(loginVO.getId())));
		// stringBuffer.append(String.format("\n
		// getUserSe=[%s]",StringUtil.nullConvert(loginVO.getUserSe())));
		//
		// Map<String, String> paramMap = new HashMap<String, String>();
		//
		// paramMap.put("Hijacked", methodNm);
		// paramMap.put("signature", signature.toString());
		// paramMap.put("targetClassName", targetClassName);
		// paramMap.put("requestUrl", requestUrl);
		// paramMap.put("menuId", menuId);
		// paramMap.put("userId", StringUtil.nullConvert(loginVO.getId()));
		// paramMap.put("userSe", StringUtil.nullConvert(loginVO.getUserSe()));
		// paramMap.put("userIp", userIp);
		//
		// if(!userId.equals("")) {
		// cmmUseDAO.insertHijackInfo(paramMap);
		// }

		stringBuffer.append("\n >>>>>>>>>> reqBefore end <<<<<<<<<< \n");
		logger.info(stringBuffer.toString());
	}

	/**
	 * 메소드 요청후 처리
	 * 
	 * @param joinPoint
	 * @throws Exception
	 */
	public void reqAfter(JoinPoint joinPoint) throws IOException {

		StringBuffer stringBuffer = new StringBuffer();

		stringBuffer.append("\n <<<<<<<<<<");
		stringBuffer.append("\n ReqAfter() is running!");
		stringBuffer.append("\n <<<<<<<<<< \n");

		logger.info(stringBuffer.toString());
	}

	/**
	 * 리턴후 처리
	 * 
	 * @param joinPoint
	 * @param result
	 */
	public void afterReturning(JoinPoint joinPoint, Object result) {

		StringBuffer stringBuffer = new StringBuffer();

		stringBuffer.append("\n <<<<<<<<<<");
		stringBuffer.append("\n afterReturning() is running!");
		stringBuffer.append("\n hijacked : " + joinPoint.getSignature().getName());
		stringBuffer.append("\n Method returned value is : " + result);
		stringBuffer.append("\n <<<<<<<<<< \n");

		logger.info(stringBuffer.toString());

	}

	/**
	 * 에러처리후
	 * 
	 * @param joinPoint
	 * @param error
	 */
	public void afterThrowing(JoinPoint joinPoint, Throwable error) {

		StringBuffer stringBuffer = new StringBuffer();

		stringBuffer.append("\n <<<<<<<<<<");
		stringBuffer.append("\n afterThrowing() is running!");
		stringBuffer.append("\n hijacked : " + joinPoint.getSignature().getName());
		stringBuffer.append("\n Exception : " + error);
		stringBuffer.append("\n <<<<<<<<<< \n");

		logger.info(stringBuffer.toString());

	}

	/**
	 * 특정 IP 통제
	 * 
	 * @param joinPoint
	 * @throws IOException
	 */
	public void ipBlock(JoinPoint joinPoint) throws IOException {

		String[] aIpTable = GlobalProperties.getProperty("Globals.accessIp.ips").split(",");
		int aIpTableLen = aIpTable.length;

		StringBuffer stringBuffer = new StringBuffer();
		stringBuffer.append("\n >>>>>>>>>>");
		stringBuffer.append("\n ipBlock() is running");

		for (int i = 0; i < aIpTableLen; i++) {
			stringBuffer.append("\n " + aIpTable[i]);
		}

		stringBuffer.append("\n >>>>>>>>>> \n");
		logger.info(stringBuffer.toString());
	}
}
