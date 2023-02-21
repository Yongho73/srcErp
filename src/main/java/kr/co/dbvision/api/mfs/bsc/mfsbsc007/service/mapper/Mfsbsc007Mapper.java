package kr.co.dbvision.api.mfs.bsc.mfsbsc007.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.mfs.bsc.mfsbsc007.entity.Mfsbsc007;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 계정별 관리항목관리에 관한 매퍼 클래스
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

@Mapper("Mfsbsc007Mapper")
public interface Mfsbsc007Mapper {
     /**
      * 계정별 항목 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectMfsbsc007List(EgovMapForNull paramMap);
      /**
       * 계정별 항목 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectMfsbsc007(EgovMapForNull paramMap);
      /**
       * 계정별 항목 정보를 등록한다.
       * @param paramMap
       */
      public void saveMfsbsc007(Mfsbsc007 entity);
      /**
       * 계정별 항목 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteMfsbsc007(EgovMapForNull paramMap);
}
