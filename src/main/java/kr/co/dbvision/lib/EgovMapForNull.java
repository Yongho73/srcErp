package kr.co.dbvision.lib;

import java.io.BufferedReader;
import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Clob;
import java.sql.SQLException;

import org.apache.commons.collections.map.ListOrderedMap;

import egovframework.rte.psl.dataaccess.util.CamelUtil;

public class EgovMapForNull extends ListOrderedMap {

	private static final long serialVersionUID = -5980656053522219209L;

	@Override
	public Object put(Object key, Object value) {

		if (value instanceof Clob) {
			Clob tmpStr = (Clob) value;
			try {
				BufferedReader contentReader = new BufferedReader(tmpStr.getCharacterStream());
				StringBuffer out = new StringBuffer();
				String dummy = "";
				while((dummy=contentReader.readLine()) != null) out.append(dummy);
				value = out.toString();
			} catch (SQLException | IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} 
		}

		if (value instanceof BigDecimal) {
			value = value.toString();
		}

		return super.put(CamelUtil.convert2CamelCase((String) key), ((value == null) ? "" : value));
	}
}