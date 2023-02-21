package kr.co.dbvision.lib;

import java.util.Map;

public class ConverMng {

	public static EgovMapForNull paramToEgov(EgovMapForNull paramMap, String id) {

		String tempKey = "";
		EgovMapForNull tempEgovMap = new EgovMapForNull();

		for (Object key : paramMap.keySet()) {
			if (String.valueOf(key).indexOf(id) != -1) {
				tempKey = String.valueOf(key).replace(id, "");
				tempEgovMap.put(tempKey, paramMap.get(key));
			}
		}

		return tempEgovMap;
	}

	public static EgovMapForNull mapToEgov(Map<String, String> paramMap, String id) {

		String tempKey = "";
		EgovMapForNull tempEgovMap = new EgovMapForNull();

		for (Object key : paramMap.keySet()) {
			if (String.valueOf(key).indexOf(id) != -1) {
				tempKey = String.valueOf(key).replace(id + "_", "");
				tempEgovMap.put(tempKey, paramMap.get(key));
			}
		}

		return tempEgovMap;
	}
}
