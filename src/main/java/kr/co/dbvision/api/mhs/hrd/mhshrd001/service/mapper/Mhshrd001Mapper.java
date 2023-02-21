package kr.co.dbvision.api.mhs.hrd.mhshrd001.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.mhs.hrd.mhshrd001.entity.Mhshrd001;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 연차일수관리관리에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2020.08.10
 * @version 1.0
 * @sourceGen version 2020.08.06.01 (2020.08.10)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.08.10          디비비전              최초 생성
 * </pre>
 */

@Mapper("Mhshrd001Mapper")
public interface Mhshrd001Mapper {
     /**
      * 연차일수 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectMhshrd001List(EgovMapForNull paramMap);
      /**
       * 연차일수 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectMhshrd001(EgovMapForNull paramMap);
      /**
       * 연차일수 정보를 등록한다.
       * @param paramMap
       */
      public void saveMhshrd001(Mhshrd001 entity);
      /**
       * 연차일수 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteMhshrd001(Mhshrd001 entity);
      /**
       * 차기년도 연차 생성 
       * @param paramMap
       * @return
       */
      public EgovMapForNull MHS_YEARCNT(EgovMapForNull paramMap);
      
}
