package kr.co.dbvision.api.pjt.mta.pjtmta001.service;

import java.util.List;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 유지보수요청관리에 관한 서비스 인터페이스 클래스
 *
 * @author 디비비전
 * @since 2020.08.06
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.08.06)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.08.06          디비비전              최초 생성
 * </pre>
 */

public interface Pjtmta001Service {
    /**
     * 유지보수 프로젝트 목록 조회
     * @param paramMap
     * @return
     */
    public JSONObject searchPjtmta001Project(EgovMapForNull paramMap);
    /**
     * 유지보수요청 목록을 조회한다.
     * @param paramMap
     * @return
     */
    public JSONObject searchPjtmta001(EgovMapForNull paramMap);
    /**
     * 유지보수 지시자, 작업자 검색
     * @param paramMap
     * @return
     */
    public JSONObject searchPjtHnf(EgovMapForNull paramMap);
    /**
     * 유지보수요청 상세내용을 조회한다.
     * @param paramMap
     * @return
     * @throws Exceptions
     */
    public JSONObject findPjtmta001(EgovMapForNull paramMap);
     /**
      * 유지보수요청 조회 목록을 엑셀용으로 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public List<EgovMapForNull> searchPjtmta001ForExcel(EgovMapForNull paramMap);
     /**
      * 유지보수요청 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject savePjtmta001(EgovMapForNull paramMap) throws Exceptions;
     
     
     public JSONObject savePjtMtaRequst(EgovMapForNull paramMap);
     
     public JSONObject modifyMtaRequst(EgovMapForNull paramMap);
     
     public JSONObject removePjtMtaRequst(EgovMapForNull paramMap);
     
     public JSONObject searchPjtmta001Opert(EgovMapForNull paramMap);
     
     public JSONObject savePjtMtaOpert(EgovMapForNull paramMap);
     
     public JSONObject findPjtmta001Opert(EgovMapForNull paramMap);
     
     public JSONObject modifyPjtMtaOpert(EgovMapForNull paramMap);
     
     public JSONObject removePjtMtaOpert(EgovMapForNull paramMap);
     
     public List<EgovMapForNull> findFilesMta(EgovMapForNull paramMap) throws Exceptions;
     
     public JSONObject findPjtmta001Hnf(EgovMapForNull paramMap);
     
 }
