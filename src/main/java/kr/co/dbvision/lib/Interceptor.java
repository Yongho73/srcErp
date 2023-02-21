package kr.co.dbvision.lib;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

@SuppressWarnings("unchecked")
public class Interceptor extends HandlerInterceptorAdapter {
 
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
 		
		Map<String, Object> sessionMap = (Map<String, Object>) SessionMng.getCommonSession();
				
		if (sessionMap == null) {			
			response.sendRedirect(request.getContextPath());
			return false;
		} else {	
			return super.preHandle(request, response, handler);
		}		
	}
	
	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
		// TODO Auto-generated method stub
		super.postHandle(request, response, handler, modelAndView);
	}
}