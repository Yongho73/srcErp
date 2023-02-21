package kr.co.dbvision.api.pjt.pmg.pjtpmg006.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.pjt.pmg.pjtpmg006.entity.Pjtpmg006;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 프로젝트예산집행현황관리에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2021.04.21
 * @version 1.0
 * @sourceGen version 2021.02.18.01 (2021.04.21)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2021.04.21          디비비전              최초 생성
 * </pre>
 */

@Mapper("Pjtpmg006Mapper")
public interface Pjtpmg006Mapper {
     /**
      * 프로젝트예산집행현황 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectPjtpmg006List(EgovMapForNull paramMap);
      /**
       * 프로젝트예산집행현황 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectPjtpmg006(EgovMapForNull paramMap);
      /**
       * 프로젝트예산집행현황 정보를 등록한다.
       * @param paramMap
       */
      public void savePjtpmg006(Pjtpmg006 entity);
      /**
       * 프로젝트예산집행현황 정보를 삭제한다.
       * @param paramMap
       */
      public void deletePjtpmg006(Pjtpmg006 entity);
}
