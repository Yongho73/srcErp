package kr.co.dbvision.api.mps.mng.mpsmng001.service;

import java.util.List;

import kr.co.dbvision.api.mps.mng.mpsmng001.entity.Mpsmng001;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;


/**
 * 사용자에 관한 서비스 인터페이스
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
public interface Mpsmng001Service {
	
	/**
	 * 급여항목을 조회한다.
	 * @param paramMap
	 * @return
	 * @throws Exceptions
	 */
    public Mpsmng001 searchMpsSalaryCd(EgovMapForNull paramMap) throws Exceptions;
    
    /**
     * 급여항목 조회 목록을 엑셀용으로 조회한다.
     * @param paramMap
     * @return
     * @throws Exceptions
     */
    public List<EgovMapForNull> searchMpsSalaryCdForExcel(EgovMapForNull paramMap) throws Exceptions;    
    /**
     * 급여항목 상세내용을 조회한다.
     * @param paramMap
     * @return
     * @throws Exceptions
     */
    public Mpsmng001 findMpsSalaryCd(EgovMapForNull paramMap) throws Exceptions;
    /**
     * 급여항목을 저장한다.
     * @param paramMap 
     * @return
     * @throws Exceptions
     */
    public JSONObject saveMpsSalaryCd(EgovMapForNull paramMap) throws Exceptions;
    /**
     * 급여항목을 수정한다.
     * @param paramMap
     * @throws Exceptions
     */
    public void modifyMpsSalaryCd(EgovMapForNull paramMap) throws Exceptions;
    /**
     * 급여항목을 삭제한다.
     * @param paramMap
     * @throws Exceptions
     */
    public void removeMpsSalaryCd(EgovMapForNull paramMap) throws Exceptions;


}
