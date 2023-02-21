package kr.co.dbvision.api.pjt.pmg.pjtpmg004.service.impl;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 프로젝트별투입현황에 관한 매퍼 클래스
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

@Mapper("Pjtpmg004Mapper")
public interface Pjtpmg004Mapper {
     /**
      * 프로젝트별투입현황 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectPjtHnfAcmsltList(EgovMapForNull paramMap);
      /**
       * 프로젝트별투입현황 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectPjtHnfAcmslt(EgovMapForNull paramMap);
      /**
       * 프로젝트별투입현황 정보를 등록한다.
       * @param paramMap
       */
      public void insertPjtHnfAcmslt(EgovMapForNull paramMap);
      /**
       * 프로젝트별투입현황 정보를 수정한다.
       * @param paramMap
       */
      public void updatePjtHnfAcmslt(EgovMapForNull paramMap);
      /**
       * 프로젝트별투입현황 정보를 삭제한다.
       * @param paramMap
       */
      public void deletePjtHnfAcmslt(EgovMapForNull paramMap);
}
