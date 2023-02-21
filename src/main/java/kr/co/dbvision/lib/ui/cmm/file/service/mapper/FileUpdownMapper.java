package kr.co.dbvision.lib.ui.cmm.file.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 파일 업도드, 다운로드 기능에 관한 데이터처리 매퍼 클래스
 *
 * @author  표준프레임워크센터
 * @since 2014.01.24
 * @version 1.0
 * @see <pre>
 *  == 개정이력(Modification Information) ==
 *
 *          수정일          수정자           수정내용
 *  ----------------    ------------    ---------------------------
 *   2014.01.24        표준프레임워크센터          최초 생성
 *
 * </pre>
 */
@Mapper("FileUpdownMapper")
public interface FileUpdownMapper {
	/**
	 * 첨부파일 등록
	 * @param paramMap
	 */
	public int insertFileInfo(EgovMapForNull paramMap);
	/**
	 * 첨부파일 상세 조회
	 * @param paramMap
	 */
	public EgovMapForNull selectFileInfo(EgovMapForNull paramMap);
	/**
	 * 첨부파일 상세 조회
	 * @param paramMap
	 */
	public List<EgovMapForNull> selectFileInfos(EgovMapForNull paramMap);
}
