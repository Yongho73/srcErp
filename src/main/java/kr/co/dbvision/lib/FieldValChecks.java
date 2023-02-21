package kr.co.dbvision.lib;

import org.apache.commons.validator.Field;
import org.apache.commons.validator.ValidatorAction;
import org.springframework.validation.Errors;
import org.springmodules.validation.commons.FieldChecks;

public class FieldValChecks extends FieldChecks {

	private static final long serialVersionUID = 1L;

	/**
	 * 알파벳, 숫자 유효성 검사
	 * 
	 * @param bean
	 * @param va
	 * @param field
	 * @param errors
	 * @return
	 */
	public static boolean validateAlphabatNumber(Object bean, ValidatorAction va, Field field, Errors errors) {

		// bean에서 해당 field 값을 추출
		String value = FieldChecks.extractValue(bean, field);

		// 유효성 검사 알고리즘은 LfGenericValidator가 가지고 있다.
		if (!isValidateAlphabatNumber(value)) { // 영문숫자가 아니면
			FieldChecks.rejectValue(errors, field, va); // 에러 처리
			return false;
		} else {
			return true;
		}
	}

	/**
	 * 숫자 유효성 검사
	 * 
	 * @param bean
	 * @param va
	 * @param field
	 * @param errors
	 * @return
	 */
	public static boolean validateNumber(Object bean, ValidatorAction va, Field field, Errors errors) {

		// bean에서 해당 field 값을 추출
		String value = FieldChecks.extractValue(bean, field);

		// 유효성 검사 알고리즘은 LfGenericValidator가 가지고 있다.
		if (!isValidateNumber(value)) { // 숫자가 아니면
			FieldChecks.rejectValue(errors, field, va); // 에러 처리
			return false;
		} else {
			return true;
		}
	}

	/**
	 * 알파벳, 숫자 유효성 검사
	 * 
	 * @param value
	 * @return
	 */
	public static boolean isValidateAlphabatNumber(String value) {
		// 영문과 숫자만 검사 합니다.
		String regex = "^[a-zA-Z0-9]*$";
		if (value.matches(regex)) {
			return true;
		}

		return false;
	}

	/**
	 * 숫자 유효성 검사
	 * 
	 * @param value
	 * @return
	 */
	public static boolean isValidateNumber(String value) {
		// 숫자만 검사 합니다.
		String regex = "^[0-9]*$";
		if (value.matches(regex)) {
			return true;
		}

		return false;
	}
}
