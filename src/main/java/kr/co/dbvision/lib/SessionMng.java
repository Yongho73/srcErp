package kr.co.dbvision.lib;

import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;

public class SessionMng {

	public static final String SESSION = "SESSION";

	public static Object getCommonSession() {
		Object response = RequestContextHolder.getRequestAttributes().getAttribute(SESSION, RequestAttributes.SCOPE_SESSION);
		return response;
	}

	public static void setCommonSession(Object object) {
		RequestContextHolder.getRequestAttributes().setAttribute(SESSION, object, RequestAttributes.SCOPE_SESSION);
	}

	public static void removeCommonSession() {
		RequestContextHolder.getRequestAttributes().removeAttribute(SESSION, RequestAttributes.SCOPE_SESSION);
	}
}
