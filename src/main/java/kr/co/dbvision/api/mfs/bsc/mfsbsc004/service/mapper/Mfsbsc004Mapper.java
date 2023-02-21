package kr.co.dbvision.api.mfs.bsc.mfsbsc004.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 법인카드관리관리에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2020.04.23
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.04.23          디비비전              최초 생성
 * </pre>
 */

@Mapper("Mfsbsc004Mapper")
public interface Mfsbsc004Mapper {
     /**
      * 법인카드 페이징 토탈 카운트를 조회한다.
      * @param paramMap
      * @return
      */
      public int selectMfsbsc004TotalRecordCount(EgovMapForNull paramMap);
     /**
      * 법인카드 해당가 데이터의 몇번째 페이지인지 구하기
      * @param paramMap
      * @return
      */
      public int selectMfsbsc004ListAllInPage(EgovMapForNull paramMap);
     /**
      * 법인카드 페이징 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectMfsbsc004ListPaging(EgovMapForNull paramMap);
     /**
      * 법인카드 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectMfsbsc004List(EgovMapForNull paramMap);
      /**
       * 법인카드 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectMfsbsc004(EgovMapForNull paramMap);
      /**
       * 법인카드 정보를 등록한다.
       * @param paramMap
       */
      public void saveMfsbsc004(EgovMapForNull paramMap);
      /**
       * 법인카드 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteMfsbsc004(EgovMapForNull paramMap);
}
