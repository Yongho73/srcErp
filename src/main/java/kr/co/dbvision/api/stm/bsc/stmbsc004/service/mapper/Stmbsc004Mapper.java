package kr.co.dbvision.api.stm.bsc.stmbsc004.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.stm.bsc.stmbsc004.entity.Stmbsc004;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 영업일(공휴일관리)관리에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2020.03.16
 * @version 1.0
 * @sourceGen version 2020.06.29.01 (2020.07.15)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.03.16          디비비전              최초 생성
 * </pre>
 */

@Mapper("Stmbsc004Mapper")
public interface Stmbsc004Mapper {
     /**
      * 승급대상자조회 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectStmbsc004List(EgovMapForNull paramMap);
      /**
       * 승급대상자조회 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectStmbsc004(EgovMapForNull paramMap);
      /**
       * 영업일(공휴일) 정보를 등록한다.
       * @param entity
       */
      public void updateStmbsc004(Stmbsc004 entity);
      /**
       * 승급대상자조회 정보를 등록한다.
       * @param paramMap
       */
      public void saveStmbsc004(Stmbsc004 entity);
      /**
       * 승급대상자조회 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteStmbsc004(Stmbsc004 entity);
      

      public void deleteStmbsc004(EgovMapForNull paramMap);
      
      public void insertStmbsc004(EgovMapForNull paramMap);
}
