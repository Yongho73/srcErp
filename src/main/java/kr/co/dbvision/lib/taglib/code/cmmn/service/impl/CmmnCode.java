package kr.co.dbvision.lib.taglib.code.cmmn.service.impl;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.taglib.system.setting.service.impl.SystemSetting;

public class CmmnCode {
	
	public static List<EgovMapForNull> STM_COMMON_CODE_LIST;

	public static void clearArray() throws Exception {
	    STM_COMMON_CODE_LIST = new ArrayList<EgovMapForNull>();
	}
	
	public static List<EgovMapForNull> getCmmnCode(String codekindCode, String exceptCode, String sortOrder) throws Exception {	    
	    
	    String locale = SystemSetting.getItemValue("", "langSeCode");
	   //System.out.println("locale : " + locale);
	    List<EgovMapForNull> returnList = STM_COMMON_CODE_LIST
				.stream()
				.filter(predicate -> codekindCode.equals(predicate.get("codekindCode")))
				.filter(predicate -> (StringExpression.nullConvert(exceptCode).indexOf((String) predicate.get("code")) == -1))								
				.collect(Collectors.toList());

	    if(locale.contentEquals("eng")) {
           if(sortOrder.equals("desc")) {
                returnList.sort(Comparator.comparing(mapper -> (String) mapper.get("codeEngNm"), (s1, s2) -> {
                   return s2.compareTo(s1); 
                }));
            } else {
                returnList.sort(Comparator.comparing(mapper -> (String) mapper.get("codeEngNm"), (s1, s2) -> {
                    return s1.compareTo(s2); 
                 }));  
            }
	    } else
	    if(locale.contentEquals("third")) {
           if(sortOrder.equals("desc")) {
                returnList.sort(Comparator.comparing(mapper -> (String) mapper.get("codeThirdNm"), (s1, s2) -> {
                   return s2.compareTo(s1); 
                }));
            } else {
                returnList.sort(Comparator.comparing(mapper -> (String) mapper.get("codeThirdNm"), (s1, s2) -> {
                    return s1.compareTo(s2); 
                 }));  
            }
	    } else {
	        if(sortOrder.equals("desc")) {
    	        returnList.sort(Comparator.comparing(mapper -> (String) mapper.get("codeNm"), (s1, s2) -> {
    	           return s2.compareTo(s1); 
    	        }));
	        } else if(sortOrder.equals("ordr")) {
	            returnList.sort(Comparator.comparing(mapper -> Integer.parseInt((String) mapper.get("ordr")), (s1, s3) -> {
	                return s1.compareTo(s3); 
	             }));    
	        } else {
	            returnList.sort(Comparator.comparing(mapper -> (String) mapper.get("codeNm"), (s1, s2) -> {
	                return s1.compareTo(s2); 
	             }));  
	        }
	    }

		return returnList;
	}
}

// 내림차순
class Descending implements Comparator<String> {    
    @Override
    public int compare(String o1, String o2) {
        return o2.compareTo(o1);
    } 
}
 
// 오름차순
class Ascending implements Comparator<String> { 
    @Override
    public int compare(String o1, String o2) {
        return o1.compareTo(o2);
    }
}

