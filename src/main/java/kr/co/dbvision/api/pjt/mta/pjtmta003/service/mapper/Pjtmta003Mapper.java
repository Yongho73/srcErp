package kr.co.dbvision.api.pjt.mta.pjtmta003.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.mhs.hrm.mhshrm006.entity.Mhshrm006;
import kr.co.dbvision.api.pjt.mta.pjtmta003.entity.Pjtmta003;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 유지보수요청관리에 관한 매퍼 클래스
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

@Mapper("Pjtmta003Mapper")
public interface Pjtmta003Mapper {
    /**
     * 유지보수 프로젝트 목록 조회
     * @param paramMap
     * @return
     */
    public List<EgovMapForNull> selectPjtmta003ProjectList(EgovMapForNull paramMap);
    /**
     * 유지보수 월간보고 목록을 조회한다.
     * @param paramMap
     * @return
     */
     public List<EgovMapForNull> selectPjtmta003List(EgovMapForNull paramMap);
     /**
      * 유지보수 완료요청 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public List<EgovMapForNull> searchPjtmta003Request(EgovMapForNull paramMap);
     /**
      * 출력여부를 저장한다.
      * @param entity
      */
     public void savePjtmta003(Pjtmta003 entity);
     /**
      * 신규 월간보고 프로젝트, 거래처 조회
      * @param paramMap
      * @return
      */
     public EgovMapForNull popupPjtmta003(EgovMapForNull paramMap);
     /**
      * 등록된 유지보수 월간보고 상세내용을 조회한다.
      * @param paramMap
      * @return
      */
     public EgovMapForNull selectPjtmta003(EgovMapForNull paramMap);
     /**
      * 월간보고 중복을 확인한다.
      * @param paramMap
      * @return
      */
     public EgovMapForNull findPjtmta003Report(EgovMapForNull paramMap);
     /**
      * 유지보수 월간보고 정보를 저장한다.
      * @param paramMap
      */
     public void insertPjtMtaReport(EgovMapForNull paramMap);
     /**
      * 승인된 유지보수 완료내역을 출력 처리한다.
      * @param paramMap
      */
     public void updatePjtMtaPrint(EgovMapForNull paramMap);
     /**
      * 유지보수 보고년월기준 미처리 요청건 카운트
      * @param paramMap
      * @return
      */
     public EgovMapForNull searchPjtmta003Requst(EgovMapForNull paramMap);
}
