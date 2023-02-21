package kr.co.dbvision.api.stm.not.stmnot001.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.stm.not.stmnot001.entity.Stmnot001;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * ERP게시판관리관리에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2020.08.21
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.08.21)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.08.21          디비비전              최초 생성
 * </pre>
 */

@Mapper("Stmnot001Mapper")
public interface Stmnot001Mapper {
     /**
      * ERP게시판 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectStmnot001List(EgovMapForNull paramMap);
      /**
       * ERP게시판 중복 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectStmnot001(EgovMapForNull paramMap);
      /**
       * ERP게시판 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull findStmnot001(EgovMapForNull paramMap);
      /**
       * ERP게시판 공지대상 목록을 조회한다.
       * @param paramMap
       * @return
       */
       public List<EgovMapForNull> gridStmnot001(EgovMapForNull paramMap);
      /**
       * ERP게시판 정보를 등록한다.
       * @param paramMap
       */
      public void saveStmnot001(Stmnot001 entity);
      /**
       * ERP게시판 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteStmnot001(Stmnot001 entity);

      /**
       * ERP게시판 공지대상 목록를 등록한다.
       * @param paramMap
       */
      public void saveStmnot001Popup(Stmnot001 entity);
      /**
       * ERP게시판 공지대상 목록를 삭제한다.
       * @param paramMap
       */
      public void deleteStmnot001Popup(Stmnot001 entity);
}
