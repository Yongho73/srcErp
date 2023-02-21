package kr.co.dbvision.api.mfs.bsc.mfsbsc006.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.mfs.bsc.mfsbsc006.entity.Mfsbsc006;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 관리항목관리에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2020.04.22
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.04.22          디비비전              최초 생성
 * </pre>
 */

@Mapper("Mfsbsc006Mapper")
public interface Mfsbsc006Mapper {
     /**
      * 항목 페이징 토탈 카운트를 조회한다.
      * @param paramMap
      * @return
      */
      public int selectMfsbsc006TotalRecordCount(EgovMapForNull paramMap);
     /**
      * 항목 해당가 데이터의 몇번째 페이지인지 구하기
      * @param paramMap
      * @return
      */
      public int selectMfsbsc006ListAllInPage(EgovMapForNull paramMap);
     /**
      * 항목 페이징 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectMfsbsc006ListPaging(EgovMapForNull paramMap);
     /**
      * 항목 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectMfsbsc006List(EgovMapForNull paramMap);
      /**
       * 항목 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectMfsbsc006(EgovMapForNull paramMap);
      /**
       * 항목 정보를 등록한다.
       * @param paramMap
       */
      public void saveMfsbsc006(Mfsbsc006 entity);
      /**
       * 항목 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteMfsbsc006(EgovMapForNull paramMap);
}
