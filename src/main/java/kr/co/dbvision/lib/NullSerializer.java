package kr.co.dbvision.lib;

import java.io.IOException;
import java.util.List;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.JsonSerializer;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.map.SerializerProvider;
import org.codehaus.jackson.map.ser.StdSerializerProvider;
import org.codehaus.jackson.type.TypeReference;

public class NullSerializer {

	/**
	 * SB그리드 관련 SB그리드 데이터셋에서 데이터가 없으면 NULL로 일괄 설정함
	 * 
	 * @param list
	 * @return
	 */
	public List<?> nullSerializer(List<?> list) {

		// First: need a custom serializer provider
		StdSerializerProvider sp = new StdSerializerProvider();
		sp.setNullValueSerializer(new jsonSerialize());
		// And then configure mapper to use it
		ObjectMapper mapper = new ObjectMapper();
		mapper.setSerializerProvider(sp);

		// return type list setting
		TypeReference<List<?>> typeRef = new TypeReference<List<?>>() {
		};
		List<?> returnList = null;

		try {
			returnList = mapper.readValue(mapper.writeValueAsString(list), typeRef);
		} catch (JsonParseException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (JsonGenerationException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}

		return returnList;
	}
}

/**
 * json 시리얼라이즈
 * 
 * @author YONGHO PARK
 */
class jsonSerialize extends JsonSerializer<Object> {

	@Override
	public void serialize(Object value, JsonGenerator jgen, SerializerProvider provider)
			throws IOException, JsonProcessingException {
		// any JSON value you want...
		jgen.writeString("");
	}
}
