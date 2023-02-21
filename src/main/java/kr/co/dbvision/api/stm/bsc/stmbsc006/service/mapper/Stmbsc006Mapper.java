package kr.co.dbvision.api.stm.bsc.stmbsc006.service.mapper;

import java.util.HashMap;
import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.stm.bsc.stmbsc006.entity.Stmbsc006;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 자동채번설정관리에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2020.02.27
 * @version 1.0
 * @see
 *
 *      <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.02.27          디비비전              최초 생성
 *      </pre>
 */

@Mapper("Stmbsc006Mapper")
public interface Stmbsc006Mapper {

	/**
	 * function 생성 : 재생성 ALTER function [dbo].[FNC_GET_COL_SN_INFO] : mssql 전용
	 * 
	 * @param paramMap
	 * @return
	 */
	// public void createFunctionStmbsc006(java.lang.String value);
	public void createFunctionStmbsc006(HashMap hm);

	/**
	 * 테이블 max 번호채번 : mssql 전용
	 * 
	 * @param paramMap
	 * @return
	 */
	public String selectGetMaxNumberStmbsc006(EgovMapForNull paramMap);

	/**
	 * 자동채번설정 목록을 조회한다. ( function 생성 용 : 테이블명, 컬럼명 조회) : mssql 전용
	 * 
	 * @param paramMap
	 * @return
	 */
	public List<EgovMapForNull> selectStmbsc006AllList();

	/**
	 * 자동채번설정 목록을 조회한다.
	 * 
	 * @param paramMap
	 * @return
	 */
	public List<EgovMapForNull> selectStmbsc006List(EgovMapForNull paramMap);

	/**
	 * 자동채번설정 상세내용을 조회한다.
	 * 
	 * @param paramMap
	 * @return
	 */
	public EgovMapForNull selectStmbsc006(EgovMapForNull paramMap);

	/**
	 * 자동채번설정 정보를 등록한다.
	 * 
	 * @param paramMap
	 */
	public void saveStmbsc006(Stmbsc006 entity);

	public void saveStmbsc006(EgovMapForNull paramMap);

	/**
	 * 자동채번설정 정보를 삭제한다.
	 * 
	 * @param paramMap
	 */
	public void deleteStmbsc006(Stmbsc006 entity);

	public void deleteStmbsc006(EgovMapForNull paramMap);

	/**
	 * 엑셀용 자동채번설정 목록을 조회한다.
	 * 
	 * @param paramMap
	 * @return
	 */
	public List<EgovMapForNull> selectStmbsc006ListForExcel(EgovMapForNull paramMap);

	/**
	 * 테이블정보
	 * 
	 * @param paramMap
	 * @return
	 */
	public List<EgovMapForNull> selectStmbsc006TableList(EgovMapForNull paramMap);

	/**
	 * 테이블에 대한 컬럼정보
	 * 
	 * @param paramMap
	 * @return
	 */
	public List<EgovMapForNull> selectStmbsc006TableColList(EgovMapForNull paramMap);

	/**
	 * 번호채번 및 다음번호 업데이트
	 * 
	 * @param paramMap
	 * @return
	 */
	public Integer selectGetNumberStmbsc006(EgovMapForNull paramMap);

	public void updateNextNumberStmbsc006(EgovMapForNull paramMap);

	public void selectStmbsc006GetNumberingSn(EgovMapForNull paramMap);
}
