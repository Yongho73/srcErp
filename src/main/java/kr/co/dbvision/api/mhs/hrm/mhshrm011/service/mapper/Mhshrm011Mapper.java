package kr.co.dbvision.api.mhs.hrm.mhshrm011.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.mhs.hrm.mhshrm011.entity.Mhshrm011;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 인사발령코드관리에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2020.08.27
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.08.27)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.08.27          디비비전              최초 생성
 * </pre>
 */

@Mapper("Mhshrm011Mapper")
public interface Mhshrm011Mapper {
     /**
      * 인사발령코드 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectMhshrm011List(EgovMapForNull paramMap);
      /**
       * 인사발령코드 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectMhshrm011(EgovMapForNull paramMap);
      /**
       * 인사발령코드 정보를 등록한다.
       * @param paramMap
       */
      public void saveMhshrm011(Mhshrm011 entity);
      /**
       * 인사발령코드 사용여부를 확인한다.
       * @param paramMap
       */
      public EgovMapForNull deleteMhshrm011UseChk(EgovMapForNull paramMap);
      /**
       * 인사발령코드 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteMhshrm011(Mhshrm011 entity);
      /**
       * 인사발령코드 콤보 목록을 조회한다.
       * @param paramMap
       * @return
       */
       public List<EgovMapForNull> selectMhshrm011CodeCombo(EgovMapForNull paramMap);
       /**
        * 인사발령코드 사용여부를 조회한다.
        * @param paramMap
        * @return
        */
       public EgovMapForNull useCheckMhshrm011(EgovMapForNull paramMap);
}
