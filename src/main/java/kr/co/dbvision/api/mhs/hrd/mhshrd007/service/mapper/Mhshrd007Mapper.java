package kr.co.dbvision.api.mhs.hrd.mhshrd007.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.mhs.hrd.mhshrd007.entity.Mhshrd007;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 근태기준설정관리에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2020.05.22
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.05.22          디비비전              최초 생성
 * </pre>
 */

@Mapper("Mhshrd007Mapper")
public interface Mhshrd007Mapper {
     /**
      * 근태기준설정 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectMhshrd007List(EgovMapForNull paramMap);
      /**
       * 근태기준설정 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectMhshrd007(EgovMapForNull paramMap);
      /**
       * 근무 유형 코드 목록을 조회한다.
       * @param paramMap
       * @return
       */
       public List<EgovMapForNull> selectMhshrd007WorkTyCode(EgovMapForNull paramMap);
      /**
       * 근태기준설정 정보를 등록한다.
       * @param paramMap
       */
      public void saveMhshrd007(Mhshrd007 entity);
      /**
       * 근태기준설정 근태발생기준을 등록한다.
       * @param paramMap
       */
      public void saveAddStandardMhshrd007(Mhshrd007 entity);
      /**
       * 근태발생기준 정보를 등록한다.
       * @param paramMap
       */
      public void saveStandardMhshrd007(Mhshrd007 entity);
      /**
       * 근태기준설정 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteMhshrd007(Mhshrd007 entity);
      /**
       * 근태발생기준 목록을 조회한다.
       * @param paramMap
       * @return
       */
      public List<EgovMapForNull> selectStandardMhshrd007List(EgovMapForNull paramMap);
}
