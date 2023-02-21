package kr.co.dbvision.api.pjt.mta.pjtmta001.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.pjt.mta.pjtmta001.entity.Pjtmta001;
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

@Mapper("Pjtmta001Mapper")
public interface Pjtmta001Mapper {
    /**
     * 유지보수 프로젝트 목록 조회
     * @param paramMap
     * @return
     */
    public List<EgovMapForNull> selectPjtmta001ProjectList(EgovMapForNull paramMap);
    /**
     * 유지보수요청 목록을 조회한다.
     * @param paramMap
     * @return
     */
     public List<EgovMapForNull> selectPjtmta001List(EgovMapForNull paramMap);
     /**
      * 유지보수 지시자, 작업자 검색
      * @param paramMap
      * @return
      */
     public EgovMapForNull searchPjtHnf(EgovMapForNull paramMap);
     /**
      * 유지보수요청 상세내용을 조회한다.
      * @param paramMap
      * @return
      */
     public EgovMapForNull selectPjtmta001(EgovMapForNull paramMap);
      /**
       * 유지보수요청 정보를 등록한다.
       * @param paramMap
       */
      public void savePjtmta001(Pjtmta001 entity);
      /**
       * 유지보수요청 정보를 삭제한다.
       * @param paramMap
       */
      public void deletePjtmta001(Pjtmta001 entity);
      
      public void insertPjtMtaRequst(EgovMapForNull paramMap);
      
      public void updateMtaRequst(EgovMapForNull paramMap);
      
      public void deletePjtMtaRequst(EgovMapForNull paramMap);
      
      public List<EgovMapForNull> selectPjtmta001OpertList(EgovMapForNull paramMap);
      
      public void insertPjtMtaOpert(EgovMapForNull paramMap);
      
      public EgovMapForNull selectPjtmta001Opert(EgovMapForNull paramMap);
      
      public void updatePjtMtaOpert(EgovMapForNull paramMap);
      
      public void deletePjtMtaOpert(EgovMapForNull paramMap);
      
      public void updatePjtMtaSttus(EgovMapForNull paramMap);
      
      public void updatePjtMtaOpertEndDt(EgovMapForNull paramMap);
      
      public List<EgovMapForNull> selectFileInfosMta(EgovMapForNull paramMap);
      
      public EgovMapForNull selectPjtmta001Hnf(EgovMapForNull paramMap);
}
