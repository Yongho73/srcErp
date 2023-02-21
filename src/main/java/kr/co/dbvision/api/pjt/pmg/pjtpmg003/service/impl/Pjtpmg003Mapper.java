package kr.co.dbvision.api.pjt.pmg.pjtpmg003.service.impl;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 프로젝트관리에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2020.01.15
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.01.15          디비비전              최초 생성
 *
 * </pre>
 */

@Mapper("Pjtpmg003Mapper")
public interface Pjtpmg003Mapper {
     /**
      * 프로젝트 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectPjtProjectList(EgovMapForNull paramMap);
      /**
       * 프로젝트 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectPjtProject(EgovMapForNull paramMap);
      /**
       * 프로젝트 정보를 등록한다.
       * @param paramMap
       */
      public void insertPjtProject(EgovMapForNull paramMap);
      /**
       * 프로젝트 정보를 수정한다.
       * @param paramMap
       */
      public void updatePjtProject(EgovMapForNull paramMap);
      /**
       * 프로젝트 정보를 삭제한다.
       * @param paramMap
       */
      public void deletePjtProject(EgovMapForNull paramMap);
}
