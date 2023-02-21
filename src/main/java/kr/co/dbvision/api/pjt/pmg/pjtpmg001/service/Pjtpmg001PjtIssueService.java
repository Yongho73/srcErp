package kr.co.dbvision.api.pjt.pmg.pjtpmg001.service;

import java.util.List;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 프로젝트현황 산출물에 관한 서비스 인터페이스
 *
 * @author 디비비전
 * @since 2020.01.14
 * @version 1.0
 * @see
 *
 *      <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.01.14          디비비전              최초 생성
 *
 *      </pre>
 */

public interface Pjtpmg001PjtIssueService {
    /**
     * 이슈 목록을 조회한다.
     * 
     * @param paramMap
     * @return
     */
    public JSONObject searchPjtIssue(EgovMapForNull paramMap);

    /**
     * 이슈 목록을 엑셀용으로 조회한다.
     * 
     * @param paramMap
     * @return
     * @throws Exceptions
     */
    public List<EgovMapForNull> searchPjtIssueForExcel(EgovMapForNull paramMap);

    /**
     * 이슈 상세내용을 조회한다.
     * 
     * @param paramMap
     * @return
     * @throws Exceptions
     */
    public JSONObject findPjtIssue(EgovMapForNull paramMap);

    /**
     * 이슈 정보를 저장한다.
     * 
     * @param paramMap
     * @return
     * @throws Exceptions
     */
    public JSONObject savePjtIssue(EgovMapForNull paramMap);

    /**
     * 이슈 정보를 삭제한다.
     * 
     * @param paramMap
     * @throws Exceptions
     */
    public JSONObject removePjtIssue(EgovMapForNull paramMap);

    /**
     * 이슈활동 목록을 조회한다.
     * 
     * @param paramMap
     * @return
     */
    public JSONObject searchPjtIssueact(EgovMapForNull paramMap);

    /**
     * 이슈활동 정보를 저장한다.
     * 
     * @param paramMap
     * @return
     * @throws Exceptions
     */
    public JSONObject savePjtIssueAct(EgovMapForNull paramMap);
    
    public JSONObject findPjtIssueAct(EgovMapForNull paramMap);
    
    public JSONObject removePjtIssueAct(EgovMapForNull paramMap);
}
