package kr.co.dbvision.lib;

import java.io.UnsupportedEncodingException;
import java.security.Key;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.security.spec.KeySpec;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.DESedeKeySpec;

import org.apache.commons.codec.binary.Base64;

import egovframework.rte.fdl.cryptography.EgovCryptoService;
import egovframework.rte.fdl.cryptography.EgovPasswordEncoder;

public class StringSecurity {

	private final static String PLAIN_PASSWORD = "dbvisionXerp";
	private final static String PRIVATE_KEY = "8aa18470a7031d110d2081f23179c012480d04b07481c126";
	private final static String ALGORITHM = "DESede";
	private final static String TRANSFORMATION = "DESede/ECB/PKCS5Padding";

	/**
	 * 암호화를 한다
	 * 
	 * @param plainStr
	 * @return
	 * @throws Exception
	 */
	public static String encrypt(String plainStr) throws Exception {
		Cipher cipher = Cipher.getInstance(TRANSFORMATION);

		cipher.init(Cipher.ENCRYPT_MODE, generateKey(toBytes(PRIVATE_KEY, 16)));

		byte[] plainBytes = plainStr.getBytes();
		byte[] encryptBytes = cipher.doFinal(plainBytes);

		return toHexString(encryptBytes);
	}

	/**
	 * 암호화된 문장을 복호화 한다
	 * 
	 * @param hexStr
	 * @return
	 * @throws Exception
	 */
	public static String decrypt(String hexStr) throws Exception {
		Cipher cipher = Cipher.getInstance(TRANSFORMATION);

		byte[] encryptBytes = toBytes(hexStr, 16);

		cipher.init(Cipher.DECRYPT_MODE, generateKey(toBytes(PRIVATE_KEY, 16)));

		byte[] decrypt = cipher.doFinal(encryptBytes);

		return new String(decrypt);
	}

	/**
	 * 암호화/복호화에 사용될 키를 생성한다
	 * 
	 * @param keyData
	 * @return
	 * @throws Exception
	 */
	private static Key generateKey(byte[] keyData) throws Exception {
		return generateKey(ALGORITHM, keyData);
	}

	/**
	 * 암호화/복호화에 사용될 키를 생성한다
	 * 
	 * @param keyData
	 * @return
	 * @throws Exception
	 */
	private static Key generateKey(String algorithm, byte[] keyData) throws Exception {
		KeySpec keySpec = new DESedeKeySpec(keyData);

		SecretKeyFactory secretKeyFactory = SecretKeyFactory.getInstance(algorithm);
		SecretKey secretKey = secretKeyFactory.generateSecret(keySpec);

		return secretKey;
	}

	/**
	 * <p>
	 * 8, 10, 16진수 문자열을 바이트 배열로 변환한다.
	 * </p>
	 * <p>
	 * 8, 10진수인 경우는 문자열의 3자리가, 16진수인 경우는 2자리가, 하나의 byte로 바뀐다.
	 * </p>
	 *
	 * <pre>
	 * ByteUtils.toBytes(null)     = null
	 * ByteUtils.toBytes("0E1F4E", 16) = [0x0e, 0xf4, 0x4e]
	 * ByteUtils.toBytes("48414e", 16) = [0x48, 0x41, 0x4e]
	 * </pre>
	 *
	 * @param digits
	 *            문자열
	 * @param radix
	 *            진수(8, 10, 16만 가능)
	 * @return
	 * @throws NumberFormatException
	 */
	private static byte[] toBytes(String digits, int radix) throws IllegalArgumentException, NumberFormatException {
		if (digits == null) {
			return null;
		}

		if (radix != 16 && radix != 10 && radix != 8) {
			throw new IllegalArgumentException("For input radix: \"" + radix + "\"");
		}

		int divLen = (radix == 16) ? 2 : 3;
		int length = digits.length();

		if (length % divLen == 1) {
			throw new IllegalArgumentException("For input string: \"" + digits + "\"");
		}

		length = length / divLen;
		byte[] bytes = new byte[length];

		for (int i = 0; i < length; i++) {
			int index = i * divLen;
			bytes[i] = (byte) (Short.parseShort(digits.substring(index, index + divLen), radix));
		}

		return bytes;
	}

	/**
	 * <p>
	 * unsigned byte(바이트) 배열을 16진수 문자열로 바꾼다.
	 * </p>
	 *
	 * <pre>
	 * ByteUtils.toHexString(null)                   = null
	 * ByteUtils.toHexString([(byte)1, (byte)255])   = "01ff"
	 * </pre>
	 *
	 * @param bytes
	 *            unsigned byte's array
	 * @return
	 * @see HexUtils.toString(byte[])
	 */
	public static String toHexString(byte[] bytes) {

		if (bytes == null) {
			return null;
		}

		StringBuffer result = new StringBuffer();

		for (byte b : bytes) {
			result.append(Integer.toString((b & 0xF0) >> 4, 16));
			result.append(Integer.toString(b & 0x0F, 16));
		}

		return result.toString();
	}

	/**
	 * MD5 암호화
	 * 
	 * @param value
	 * @return
	 * @throws Exception
	 */
	public static String getMd5Value(String value) throws Exception {

		MessageDigest md5 = MessageDigest.getInstance("MD5");

		byte[] md = md5.digest(value.getBytes());
		StringBuffer sb = new StringBuffer();

		for (int i = 0; i < md.length; i++) {
			sb.append(Integer.toString((md[i] & 0xf0) >> 4, 16));
			sb.append(Integer.toString(md[i] & 0x0f, 16));
		}

		return sb.toString();
	}

	public static String get_SHA_1_SecurePassword(String passwordToHash, String salt) {
		String generatedPassword = null;
		try {
			MessageDigest md = MessageDigest.getInstance("SHA-1");
			md.update(salt.getBytes());
			byte[] bytes = md.digest(passwordToHash.getBytes());
			StringBuilder sb = new StringBuilder();
			for(int i=0; i< bytes.length ;i++)
			{
				sb.append(Integer.toString((bytes[i] & 0xff) + 0x100, 16).substring(1));
			}
			generatedPassword = sb.toString();
		} 
		catch (NoSuchAlgorithmException e) 
		{
			e.printStackTrace();
		}
		return generatedPassword;
	}
	
	public static String get_SHA_256_SecurePassword(String passwordToHash, String salt) {
		String generatedPassword = null;
		try {
			MessageDigest md = MessageDigest.getInstance("SHA-256");
			md.update(salt.getBytes());
			byte[] bytes = md.digest(passwordToHash.getBytes());
			StringBuilder sb = new StringBuilder();
			for(int i=0; i< bytes.length ;i++)
			{
				sb.append(Integer.toString((bytes[i] & 0xff) + 0x100, 16).substring(1));
			}
			generatedPassword = sb.toString();
		} 
		catch (NoSuchAlgorithmException e) 
		{
			e.printStackTrace();
		}
		return generatedPassword;
	}
	
	public static String get_SHA_384_SecurePassword(String passwordToHash, String salt) {
		String generatedPassword = null;
		try {
			MessageDigest md = MessageDigest.getInstance("SHA-384");
			md.update(salt.getBytes());
			byte[] bytes = md.digest(passwordToHash.getBytes());
			StringBuilder sb = new StringBuilder();
			for(int i=0; i< bytes.length ;i++)
			{
				sb.append(Integer.toString((bytes[i] & 0xff) + 0x100, 16).substring(1));
			}
			generatedPassword = sb.toString();
		} 
		catch (NoSuchAlgorithmException e) 
		{
			e.printStackTrace();
		}
		return generatedPassword;
	}
	
	public static String get_SHA_512_SecurePassword(String passwordToHash, String salt) {
		String generatedPassword = null;
		try {
			MessageDigest md = MessageDigest.getInstance("SHA-512");
			md.update(salt.getBytes());
			byte[] bytes = md.digest(passwordToHash.getBytes());
			StringBuilder sb = new StringBuilder();
			for(int i=0; i< bytes.length ;i++)
			{
				sb.append(Integer.toString((bytes[i] & 0xff) + 0x100, 16).substring(1));
			}
			generatedPassword = sb.toString();
		} 
		catch (NoSuchAlgorithmException e) 
		{
			e.printStackTrace();
		}
		return generatedPassword;
	}
	
	//Add salt
	public static String getSalt() throws NoSuchAlgorithmException {
		SecureRandom sr = SecureRandom.getInstance("SHA1PRNG");
		byte[] salt = new byte[16];
		sr.nextBytes(salt);
		return salt.toString();
	}
	
	public static String encryptDataAria(EgovCryptoService cryptoService, String plainText) {

		String encodeText = null;
		try {

			byte[] encrypted = cryptoService.encrypt(plainText.getBytes("UTF-8"), PLAIN_PASSWORD);
			encodeText = Base64.encodeBase64String(encrypted);
			
		} catch (UnsupportedEncodingException uee) {
			uee.printStackTrace();
		}
		return encodeText;
	}

	public static String decryptDataAria(EgovCryptoService cryptoService, String encodeText) {

		String plainText = null;
		try {

			byte[] base64dec = Base64.decodeBase64(encodeText);
			byte[] decrypted = cryptoService.decrypt(base64dec, PLAIN_PASSWORD);
			plainText = new String(decrypted, "UTF-8");

		} catch (UnsupportedEncodingException uee) {
			uee.printStackTrace();
		}

		return plainText;
	}
	
	public static void main(String[] args) {
		try {
			
			String salt = getSalt();			
			System.out.println("salt="+salt);
			System.out.println("pass="+get_SHA_512_SecurePassword("aaa", salt));
			
			EgovPasswordEncoder encoder = new EgovPasswordEncoder();
			encoder.setAlgorithm("SHA-256");
			System.out.println("Digested Password : " + encoder.encryptPassword("dbvisionXerp"));	

		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
