package kr.co.dbvision.lib;

import java.util.List;

import kr.co.dbvision.lib.exception.Exceptions;
import kr.co.dbvision.lib.exception.Messages;
import net.sf.json.JSONObject;

public class JsonMsgMng implements Messages {

	private NullSerializer nullSerializer = new NullSerializer();
	private String code = SUCCESS_CODE;
	private String message = SUCCESS_MSG;

	public JSONObject makeJsonObject() {

		JSONObject result = new JSONObject();
		result.put("action", "update");
		result.put("code", code);
		result.put("message", message);
		return result;
	}

	public JSONObject makeJsonObject(Exceptions e) {

		JSONObject result = new JSONObject();
		result.put("action", "error");
		result.put("code", e.getResultStatus().get("code"));
		result.put("message", e.getResultStatus().get("message"));

		return result;
	}

	public JSONObject makeJsonObject(String word) {

		JSONObject result = new JSONObject();
		result.put("action", "update");
		result.put("data", word);
		result.put("code", code);
		result.put("message", message);

		return result;
	}

	public JSONObject makeJsonObject(Object object) {

		JSONObject result = new JSONObject();
		result.put("action", "update");
		result.put("data", object);
		result.put("code", code);
		result.put("message", message);
		return result;
	}

	public JSONObject makeJsonObject(List<?> list, int totCnt) {

		JSONObject result = new JSONObject();
		result.put("action", "update");
		result.put("data", list);
		result.put("totCnt", totCnt);
		result.put("message", totCnt + "건 조회되었습니다");
		result.put("code", code);
		result.put("message", message);

		return result;
	}

	public JSONObject makeJsonObject(List<?> list) {

		JSONObject result = new JSONObject();
		result.put("action", "update");
		result.put("data", nullSerializer.nullSerializer(list));
		result.put("countMessage", list.size() + "건 조회되었습니다");
		result.put("code", code);
		result.put("message", message);

		return result;
	}
	
	public JSONObject makeValidationFailJsonObject(Object object) {
		
		JSONObject result = new JSONObject();
		result.put("action", "error");
		result.put("data", object);
		result.put("code", VALIDATION_ERROR_CODE);
		result.put("message", VALIDATION_ERROR_MSG);	
		return result;
	}

	public JSONObject makeJsonDhtmlx(String tids) {

		JSONObject result = new JSONObject();
		result.put("tid", tids); // EX) "[\"1001\",\"1002\"]"
		return result;
	}
}
