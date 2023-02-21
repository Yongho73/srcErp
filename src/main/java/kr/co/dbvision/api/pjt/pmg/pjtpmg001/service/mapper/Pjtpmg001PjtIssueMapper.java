package kr.co.dbvision.api.pjt.pmg.pjtpmg001.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.pjt.pmg.pjtpmg001.entity.PjtIssue001;
import kr.co.dbvision.api.pjt.pmg.pjtpmg001.entity.PjtIssueact001;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 프로젝트현황 이슈에 관한 매퍼 클래스
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

@Mapper("Pjtpmg001PjtIssueMapper")
public interface Pjtpmg001PjtIssueMapper {
    /**
     * 프로젝트 이슈 목록의 총 갯수를 조회한다.
     * 
     * @param paramMap
     * @return
     */
    public int selectPjtIssueListAllCnt(EgovMapForNull paramMap);

    /**
     * 프로젝트 이슈 목록을 조회한다.
     * 
     * @param paramMap
     * @return
     */
    public List<EgovMapForNull> selectPjtIssueList(EgovMapForNull paramMap);

    /**
     * 프로젝트 이슈를 조회한다.
     * 
     * @param paramMap
     * @return
     */
    public EgovMapForNull selectPjtIssue(EgovMapForNull paramMap);

    /**
     * 프로젝트 이슈 활동을 조회한다.
     * 
     * @param paramMap
     * @return
     */
    public List<EgovMapForNull> selectPjtIssueactList(EgovMapForNull paramMap);

    /**
     * 프로젝트 이슈 정보를 등록한다.
     * 
     * @param paramMap
     */
    public void savePjtIssue(EgovMapForNull paramMap);

    /**
     * 프로젝트 이슈 정보를 삭제한다.
     * 
     * @param paramMap
     */
    public void deletePjtIssue(EgovMapForNull paramMap);

    /**
     * 프로젝트 이슈 활동 정보를 등록한다.
     * 
     * @param paramMap
     */
    public void savePjtIssueAct(EgovMapForNull paramMap);

    /**
     * 프로젝트 이슈 활동 정보를 삭제한다.
     * 
     * @param paramMap
     */
    public void deletePjtIssueact(PjtIssueact001 paramMap);

    public void deletePjtIssueactEgovMap(EgovMapForNull paramMap);
    
    public EgovMapForNull selectPjtIssueAct(EgovMapForNull paramMap);
    
    public void deletePjtIssueAct(EgovMapForNull paramMap);

}
