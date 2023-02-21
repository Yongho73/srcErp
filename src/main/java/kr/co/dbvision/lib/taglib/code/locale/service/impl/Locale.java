package kr.co.dbvision.lib.taglib.code.locale.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.taglib.system.setting.service.impl.SystemSetting;

public class Locale {
	
	public static List<EgovMapForNull> CODE_LIST;

	public static void clearArray() throws Exception {
		CODE_LIST = new ArrayList<EgovMapForNull>();
	}
	
	public static String getLocaleCodeName(String progrmId, String key) throws Exception {
		
		//String locale = GlobalProperties.getProperty("Globals.locale");		
		String locale = SystemSetting.getItemValue("", "langSeCode").equals("") ? "kor" : SystemSetting.getItemValue("", "langSeCode");
		
		//System.out.println("[locale]="+locale);
		
		String returnStr = CODE_LIST
				.stream()
				.filter(predicate -> key.equals(predicate.get("ky")))
				.filter(predicate -> progrmId.equals(predicate.get("progrmId")))
				.map(mapper->(String) mapper.get(locale))
				.collect(Collectors.joining());
		
		return returnStr;
	}
}
