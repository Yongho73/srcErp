package kr.co.dbvision.lib;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
//import org.json.simple.JSONArray;
//import org.json.simple.JSONObject;
//import org.json.simple.parser.JSONParser;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import com.fasterxml.jackson.databind.ObjectMapper;

import kr.co.dbvision.lib.exception.Exceptions;

public class Utils {
	// 출력용 로거 - static 함수에서 직접 로그를 출력하려고 static으로 선언
	static Logger logger = LogManager.getLogger(Utils.class);

	// 코드맵 캐시
	public static HashMap<String, List<EgovMapForNull>> CODE_MAP;

	public Utils() {
		
	}
	
	/**
	 * 디버그 유무 상태값
	 * StringUtil requestToMap에서 사용됨.
	 * @return
	 * @throws IOException
	 */
	public static boolean debugs() throws Exception {
		String debugProp =  GlobalProperties.getProperty("Globals.debugs");
		if(debugProp.equals("true")) {
			return true;
		}else {
			return false;
		}
	}

	/**
	 * 그룹코드, 코드값으로 코드명 변환
	 * 
	 * @param grpCd
	 * @param code
	 * @return 코드명
	 */
	public static String getNameByCode(Object grpCd, Object code) {

		if (CODE_MAP != null) {
			for (EgovMapForNull map : CODE_MAP.get(grpCd)) {
				if (map.get("code").equals(code))
					return (String) map.get("codeKorNm");
			}
		}
		return "";
	}

	/**
	 * 사용자아이디->사용자이름 반환
	 * 
	 * @param id
	 * @return
	 */
	public static String getNameByUser(Object id) {

		if (CODE_MAP != null) {
			for (EgovMapForNull map : CODE_MAP.get("user")) {
				if (map.get("userId").equals(id))
					return (String) map.get("userNm");
			}
		}
		return "";
	}

	/**
	 * 그룹, 마스터 플래그 -> 플래그명 반환
	 * 
	 * @param group
	 * @param masFlag
	 * @return
	 */
	public static String getNameByFlag(Object group, Object masFlag) {

		if (CODE_MAP != null) {
			for (EgovMapForNull map : CODE_MAP.get("flag")) {
				if (map.get("reqSeq").equals(group) && map.get("masFlag").equals(masFlag))
					return (String) map.get("flagNm");
			}
		}
		return "";
	}

	/**
	 * 그룹, 마스터플래그, 디테일플래그 -> 플래그명 반환
	 * 
	 * @param group
	 * @param masFlag
	 * @param detFlag
	 * @return
	 */
	public static String getNameByFlag(Object group, Object masFlag, Object detFlag) {

		if (CODE_MAP != null) {
			for (EgovMapForNull map : CODE_MAP.get("flag")) {
				if (map.get("reqSeq").equals(group) && map.get("masFlag").equals(masFlag)
						&& map.get("detFlag").equals(detFlag))
					return (String) map.get("flagNm");
			}
		}
		return "";
	}

	/**
	 * 부서코드 => 부서명 변환
	 * 
	 * @param 부서코드
	 * @return 부서명
	 */
	public static String getNameByDept(Object deptCd) {

		if (CODE_MAP != null) {
			for (EgovMapForNull map : CODE_MAP.get("dept")) {
				if (map.get("deptCd").equals(deptCd))
					return (String) map.get("deptNm");
			}
		}

		return "";
	}

	/**
	 * 코드 매퍼 : List+파라미터3 <br/>
	 * 맵 리스트 안의 변수를 찾아서 코드명을 가진 새로운 변수를 추가한다
	 * 
	 * @param sourceList EgovMapForNull 리스트
	 * @param mapName    코드맵 이름
	 * @param codeColumn 코드 가지고 있는 컬럼 명
	 * @param nameColumn 값을 반환할 컬럼명
	 */
	public static void codeMapper(List<EgovMapForNull> sourceList, String mapName, String codeColumn,
			String nameColumn) {
		codeMapper(sourceList, mapName, codeColumn, nameColumn, null, null);
	}

	/**
	 * 코드 매퍼 : List+파라미터4 <br/>
	 * 맵 리스트 안의 변수를 찾아서 코드명을 가진 새로운 변수를 추가한다
	 * 
	 * @param sourceList EgovMapForNull 리스트
	 * @param mapName    코드맵 이름
	 * @param codeColumn 코드 가지고 있는 컬럼 명
	 * @param nameColumn 값을 반환할 컬럼명
	 * @param group      코드와 플래그에 사용될 그룹명, 플래그는 masFlag를 넣음
	 */
	public static void codeMapper(List<EgovMapForNull> sourceList, String mapName, String codeColumn, String nameColumn,
			String group) {
		codeMapper(sourceList, mapName, codeColumn, nameColumn, group, null);
	}

	/**
	 * 코드 매퍼 : List+파라미터5 <br/>
	 * 맵 리스트 안의 변수를 찾아서 코드명을 가진 새로운 변수를 추가한다
	 * 
	 * @param sourceList EgovMapForNull 리스트
	 * @param mapName    코드맵 이름
	 * @param codeColumn 코드 가지고 있는 컬럼 명
	 * @param nameColumn 값을 반환할 컬럼명
	 * @param group      코드와 플래그에 사용될 그룹명, 플래그는 masFlag를 넣음
	 * @param detFlagColumn    플래그가 masFlag, detFlagColumn 두개 있을 경우, masFlag는 group에 넣고, 이곳에
	 *                   detFlagColumn 넣음
	 */
	public static void codeMapper(List<EgovMapForNull> sourceList, String mapName, String codeColumn, String nameColumn,
			String group, String detFlagColumn) {
		String value = "";
		for (EgovMapForNull map : sourceList) {
			Iterator<?> it = map.entrySet().iterator();

			while (it.hasNext()) {
				@SuppressWarnings("rawtypes")
				EgovMapForNull.Entry e = (Map.Entry) it.next();

				// 코드컬럼이면
				if (codeColumn.equals(e.getKey())) {
					logger.debug("codeMapper() " + (String) e.getKey() + " - " + e.getValue());
					switch (mapName) {
					case "dept":
						value = Utils.getNameByDept(e.getValue().toString());
						break;
					case "code": // 코드와 플래그일 때에는 그룹 안의 코드를 찾는다
						value = Utils.getNameByCode(group, e.getValue().toString());
						break;
					case "flag":
						if (detFlagColumn == null) {
							value = Utils.getNameByFlag(group, e.getValue().toString());
						} else {
							value = Utils.getNameByFlag(group, e.getValue().toString(), map.get(detFlagColumn));
						}
						break;
					case "user":
						value = Utils.getNameByUser(e.getValue().toString());
						break;
					default:
						value = "";
					}

					map.put(nameColumn, value);
					break;
				}
			}
		}
	}

	/**
	 * 코드 매퍼 : paramMap+파라미터3 <br/>
	 * 맵 안의 변수를 찾아서 코드명을 가진 새로운 변수를 추가한다
	 * 
	 * @param paramMap   DB입출력용 맵
	 * @param mapName    코드맵 이름
	 * @param codeColumn 코드 가지고 있는 컬럼 명
	 * @param nameColumn 값을 반환할 컬럼명
	 */
	public static void codeMapper(EgovMapForNull paramMap, String mapName, String codeColumn, String nameColumn) {
		codeMapper(paramMap, mapName, codeColumn, nameColumn, null, null);
	}

	/**
	 * 코드 매퍼 : paramMap+파라미터4 <br/>
	 * 맵 안의 변수를 찾아서 코드명을 가진 새로운 변수를 추가한다
	 * 
	 * @param paramMap   DB입출력용 맵
	 * @param mapName    코드맵 이름
	 * @param codeColumn 코드 가지고 있는 컬럼 명
	 * @param nameColumn 값을 반환할 컬럼명
	 * @param group      코드와 플래그에 사용될 그룹명, 플래그는 masFlag를 넣음
	 */
	public static void codeMapper(EgovMapForNull paramMap, String mapName, String codeColumn, String nameColumn,
			String group) {
		codeMapper(paramMap, mapName, codeColumn, nameColumn, group, null);
	}

	/**
	 * 코드 매퍼 : paramMap+파라미터5 <br/>
	 * 맵 안의 변수를 찾아서 코드명을 가진 새로운 변수를 추가한다
	 * 
	 * @param paramMap   DB입출력용 맵
	 * @param mapName    코드맵 이름
	 * @param codeColumn 코드 가지고 있는 컬럼 명
	 * @param nameColumn 값을 반환할 컬럼명
	 * @param group      코드와 플래그에 사용될 그룹명, 플래그는 masFlag를 넣음
	 * @param detFlagColumn    플래그가 masFlag, detFlagColumn 두개 있을 경우, masFlag는 group에 넣고, 이곳에
	 *                   detFlagColumn 컬럼명 넣음
	 */
	public static void codeMapper(EgovMapForNull paramMap, String mapName, String codeColumn, String nameColumn,
			String group, String detFlagColumn) {

		switch (mapName) {
		case "dept":
			paramMap.put(nameColumn, Utils.getNameByDept(paramMap.get(codeColumn)));
			break;
		case "code":
			paramMap.put(nameColumn, Utils.getNameByCode(group, paramMap.get(codeColumn)));
			break;
		case "flag":
			if (detFlagColumn == null) {
				paramMap.put(nameColumn, Utils.getNameByFlag(group, paramMap.get(codeColumn)));
			} else {
				paramMap.put(nameColumn, Utils.getNameByFlag(group, paramMap.get(codeColumn), paramMap.get(detFlagColumn)));
			}
			break;
		case "user":
			paramMap.put(nameColumn, Utils.getNameByUser(paramMap.get(codeColumn)));
			break;
		default:
			break;
		}
	}

// TODO 삭제예정
// 폐기됨. 그룹코드, 코드명으로 코드값 변환
//		public static String getCodeByName(String grpCd, String codeName) {
//			String codeResult = "";
//
//			if (CODE_MAP != null) {
//				ArrayList<StmCodeVO> codeList = CODE_MAP.get(grpCd);
//
//				if (codeList != null && codeList.size() > 0) {
//					for (StmCodeVO bean : codeList) {
//						if (bean.getCodeKorNm() != null && bean.getCodeKorNm().equals(codeName)) {
//							codeResult = bean.getCode();
//						}
//					}
//				}
//			}
	//
//			return codeResult;
//		}
	// 폐기. 부서명 => 부서코드 변환
//	public static String getDeptByName(String deptNm) {
//		String codeResult = "";
//
//		if (CODE_MAP != null) {
//			ArrayList<StmDeptVO> codeList = DEPT_MAP.get("dept");
//
//			if (codeList != null && codeList.size() > 0) {
//				for (StmDeptVO bean : codeList) {
//					if (bean.getDeptNm() != null && bean.getDeptNm().equals(deptNm)) {
//						return bean.getDeptCd();
//					}
//				}
//			}
//		}
//
//		return codeResult;
//	}

	/**
	 * JSONArray 형태의 Object를 넘겨 받아 JSONArray로 반환
	 * @param jsonobject
	 * @return
	 * @throws Exception
	 */
	public static JSONArray objectToJsonarray(Object param) throws Exception{
		JSONArray jsonarray = new JSONArray();
		try {
			jsonarray = (JSONArray) (new JSONParser()).parse(param.toString());
		} catch (Exception e) {
			e.printStackTrace();
			// TODO: handle exception
		}
		return jsonarray;
	}
	
	/**
	 * JSONObject를 넘겨 받아 EgovMapForNull로 반환
	 * @param jsonobject
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public static EgovMapForNull jsonobjectToEgovMapForNull(JSONObject jsonobject) throws Exception{
		EgovMapForNull rtnData = new EgovMapForNull();
		try {
			Map<Object, Object> temp = new HashMap<Object, Object>();
			temp = new ObjectMapper().readValue(jsonobject.toJSONString(), Map.class);
			
			final Enumeration<Object> enums = Collections.enumeration(temp.keySet());
			while (enums.hasMoreElements()) {
				String paramName = (String) enums.nextElement();
				Object paramValue = temp.get(paramName);
				rtnData.put(paramName, paramValue);
			}
			Map<String, Object> sessionMap = (Map<String, Object>) SessionMng.getCommonSession();
			String userId = StringExpression.nullConvert(sessionMap.get("userId"));
			rtnData.put("regId", userId);
			rtnData.put("uptId", userId);
		} catch (Exception e) {
			e.printStackTrace();
			// TODO: handle exception
		}
		return rtnData;
	}
	
	/**
	 * Mybatis where절 in에 foreach 사용을 위한 함수
	 * String배열을 List로 반환 한다.
	 * @param 	paramMap	EgovMapForNull 데이터가 있는 맵
	 * @param 	values		String 추출할 속성 명
	 * @return	rtnData		List<String> 형태로 반환
	 * @throws	Exceptions
	 */
	public static List<String> arrToList(EgovMapForNull paramMap, String values) throws Exceptions{
		List<String> rtnData = new ArrayList<String>();
		try {
			if(paramMap.get(values) == null) {
				return rtnData;
			}else{
				String[] valuesArr = ((String) paramMap.get(values)).split(",");
				for(int i=0; i<valuesArr.length; i++){
					rtnData.add(valuesArr[i]);
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
			// TODO: handle exception
		}
		return rtnData;
	}
//	public static List<String> arrToList(String[] values) throws Exceptions{
//		List<String> rtnData = new ArrayList<String>();
//		try {
//			for(int i=0; i<values.length; i++){
//				rtnData.add(values[i]);
//			}
//		} catch (Exception e) {
//			e.printStackTrace();
//			// TODO: handle exception
//		}
//		return rtnData;
//	}
	
	/**
	 * 숫자로 변환, 실패시 0을 리턴
	 * @param object
	 * @return
	 */
	public static int parseInt(Object object) {
		return Integer.parseInt(StringExpression.nullConvert(object.toString(), "0"));
	}
	
	/**
	 * 숫자로 변환, 실패시 defaultValue 리턴
	 * @param object
	 * @param defaultValue
	 * @return
	 */
	public static int parseInt(Object object, int defaultValue) {
		return Integer.parseInt(StringExpression.nullConvert(object.toString(), defaultValue+""));	
	}
	
	public static void main(String args[]) {
		System.out.println(parseInt("55"));
		System.out.println(parseInt("55", 1));
		System.out.println(parseInt("", 1));
	}
}