package kr.co.dbvision.api.mhs.hrb.mhshrb001.service.mapper;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 인사기본에 관한 매퍼 클래스 (구 ERP 업데이트 용)
 *
 * @author 디비비전
 * @since 2019.05.22
 * @version 1.0
 * @see
 *
 *      <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일            	수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2019.05.22        	박용호             	최초 생성
 *
 *      </pre>
 */

@Mapper("OldErpEmpInfoUpdateMapper")
public interface OldErpEmpInfoUpdateMapper {

	/**
	 * XERP 첨부파일 조회
	 * 
	 * @param paramMap
	 * @return
	 */
	public EgovMapForNull selectAtachFileInfo(EgovMapForNull paramMap);

	/**
	 * 증명사진 업데이트
	 * 
	 * @param paramMap
	 */
	public void insertPhoto(EgovMapForNull paramMap);
	public void insertPhotoIntra(EgovMapForNull paramMap);

	/**
	 * 인사기본 정보를 등록한다.(Main 컬럼)
	 * 
	 * @param paramMap
	 */
	public void insertMhsEmpMain(EgovMapForNull paramMap);
	
	/**
	 * 증명사진 삭제
	 * 
	 * @param paramMap
	 * @return
	 */
	public void deleteMhsPhoto(EgovMapForNull paramMap);
	
	/**
	 * 인사기본 삭제
	 * @param paramMap
	 */
	public void deleteMhsEmpMain(EgovMapForNull paramMap);
}
