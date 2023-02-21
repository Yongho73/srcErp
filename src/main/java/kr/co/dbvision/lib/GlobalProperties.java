package kr.co.dbvision.lib;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Properties;

public class GlobalProperties {

	// 프로퍼티값 로드시 에러발생하면 반환되는 에러문자열
	public static final String ERR_CODE = " EXCEPTION OCCURRED";
	public static final String ERR_CODE_FNFE = " EXCEPTION(FNFE) OCCURRED";
	public static final String ERR_CODE_IOE = " EXCEPTION(IOE) OCCURRED";

	// 파일구분자
	static final char FILE_SEPARATOR = File.separatorChar;
	// 절대경로
	public static final String RELATIVE_PATH_PREFIX = GlobalProperties.class.getResource("").getPath().substring(0,
			GlobalProperties.class.getResource("").getPath().lastIndexOf("kr"));
	// 프로퍼티 파일 경로
	public static final String GLOBALS_PROPERTIES_FILE = RELATIVE_PATH_PREFIX + "egovframework"
			+ System.getProperty("file.separator") + "properties" + System.getProperty("file.separator")
			+ "globals.properties";

	/**
	 * 인자로 주어진 문자열을 Key값으로 하는 프로퍼티 값을 반환한다(Globals.java 전용)
	 * 
	 * @param keyName
	 * @return
	 * @throws IOException
	 */
	public static String getProperty(String keyName) throws IOException {

		String value = ERR_CODE;
		value = "99";

		//debug(GLOBALS_PROPERTIES_FILE + " : " + keyName);

		FileInputStream fis = null;
		BufferedInputStream bis = null;

		try {

			Properties props = new Properties();
			fis = new FileInputStream(WebSecurity.filePathBlackList(GLOBALS_PROPERTIES_FILE));
			bis = new java.io.BufferedInputStream(fis);
			props.load(bis);
			value = props.getProperty(keyName).trim();

		} catch (FileNotFoundException fne) {
			//fis.close();
			//debug(fne);
		} catch (IOException ioe) {
			//fis.close();
			//debug(ioe);
		} catch (Exception e) {
			//fis.close();
			//debug(e);
		} finally {

			if (fis != null) {
				try {
					fis.close();
				} catch (IOException ex) {
					//Logger.getLogger(GlobalProperties.class).debug("(getProperty1)IGNORED: " + ex);
				}
			}

			if (bis != null) {
				try {
					bis.close();
				} catch (IOException ex) {
					//Logger.getLogger(GlobalProperties.class).debug("(getProperty1)IGNORED: " + ex);
				}
			}
		}
		return value;
	}

	/**
	 * 인자로 주어진 문자열을 Key값으로 하는 상대경로 프로퍼티 값을 절대경로로 반환한다(Globals.java 전용)
	 * 
	 * @param keyName
	 * @return
	 * @throws IOException
	 */
	public static String getPathProperty(String keyName) throws IOException {

		String value = ERR_CODE;
		value = "99";
		//debug(GLOBALS_PROPERTIES_FILE + " : " + keyName);

		FileInputStream fis = null;
		BufferedInputStream bis = null;

		try {

			Properties props = new Properties();
			fis = new FileInputStream(WebSecurity.filePathBlackList(GLOBALS_PROPERTIES_FILE));
			bis = new java.io.BufferedInputStream(fis);
			props.load(bis);
			value = props.getProperty(keyName).trim();
			value = RELATIVE_PATH_PREFIX + "properties" + System.getProperty("file.separator") + value;

		} catch (FileNotFoundException fne) {
			//debug(fne);
		} catch (IOException ioe) {
			//debug(ioe);
		} catch (Exception e) {
			//debug(e);
		} finally {

			if (fis != null) {
				try {
					fis.close();
				} catch (IOException ex) {
					//Logger.getLogger(GlobalProperties.class).debug("(getProperty1)IGNORED: " + ex);
				}
			}

			if (bis != null) {
				try {
					bis.close();
				} catch (IOException ex) {
					//Logger.getLogger(GlobalProperties.class).debug("(getProperty1)IGNORED: " + ex);
				}
			}
		}

		return value;
	}
}
