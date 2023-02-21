package kr.co.dbvision.api.mps.mng.mpsmng001.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 급여항목에 관한 데이터처리 매퍼 클래스
 *
 * @author  표준프레임워크센터
 * @since 2014.01.24
 * @version 1.0
 * @see <pre>
 *  == 개정이력(Modification Information) ==
 *
 *          수정일                  수정자                          수정내용
 *  ----------------    ------------    ---------------------------
 *   2019.04.06       GHO                    최초 생성
 *
 * </pre>
 */
@Mapper("Mpsmng001Mapper")
public interface Mpsmng001Mapper {
	
	/**
	 * 급여항목를 조회한다.
	 * @param paramMap
	 * @return
	 */
	public List<EgovMapForNull> selectMpsSalaryCdList(EgovMapForNull paramMap);
	/**
	 * 급여항목 상세내용을 조회한다.
	 * @param paramMap
	 * @return
	 */
	public EgovMapForNull selectMpsSalaryCd(EgovMapForNull paramMap);
	/**
	 * 급여항목을 등록한다.
	 * @param paramMap
	 * @return 
	 */
	public void insertMpsSalaryCd(EgovMapForNull paramMap);
	/**
	 * 급여항목을 수정한다.
	 * @param paramMap
	 */
	public void updateMpsSalaryCd(EgovMapForNull paramMap);
	/**
	 * 급여항목을 삭제한다.
	 * @param paramMap
	 */
	public void deleteMpsSalaryCd(EgovMapForNull paramMap);
	
}
