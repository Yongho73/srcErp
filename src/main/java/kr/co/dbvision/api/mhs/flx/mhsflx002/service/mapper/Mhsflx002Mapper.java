package kr.co.dbvision.api.mhs.flx.mhsflx002.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.mhs.flx.mhsflx002.entity.Mhsflx002;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 개인별근무유형선택관리에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2020.07.13
 * @version 1.0
 * @sourceGen version 2020.06.29.01 (2020.07.13)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.07.13          디비비전              최초 생성
 * </pre>
 */

@Mapper("Mhsflx002Mapper")
public interface Mhsflx002Mapper {
    /**
     * 근무유형코드를 조회한다
     * @param paramMap
     * @return
     */
     public List<EgovMapForNull> selectWorkTyCode(EgovMapForNull paramMap);
     /**
      * 개인별근무유형선택 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectMhsflx002List(EgovMapForNull paramMap);
      /**
       * 개인별근무유형선택 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectMhsflx002(EgovMapForNull paramMap);
      /**
       * 개인별근무유형선택 정보를 등록한다.
       * @param paramMap
       */
      public void saveMhsflx002(Mhsflx002 entity);
      /**
       * 개인별근무유형 승인 상태를 수정한다.
       * @param paramMap
       */
      public void updateSttusMhsflx002(Mhsflx002 entity);
      /**
       * 개인별근무유형선택 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteMhsflx002(EgovMapForNull paramMap);
      /**
       * 삽입 및 수정 시 근무 일자 유효성 체크
       * @param paramMap
       */
      public int selectWorkDayValCheck(Mhsflx002 entity);
      
}
