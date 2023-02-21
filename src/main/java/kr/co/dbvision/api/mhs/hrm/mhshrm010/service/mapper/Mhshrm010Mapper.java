package kr.co.dbvision.api.mhs.hrm.mhshrm010.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.mhs.hrm.mhshrm010.entity.Mhshrm010;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 출장비기준코드관리에 관한 매퍼 클래스
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

@Mapper("Mhshrm010Mapper")
public interface Mhshrm010Mapper {
     /**
      * 출장비기준코드 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectMhshrm010List(EgovMapForNull paramMap);
      /**
       * 출장비기준코드 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectMhshrm010(EgovMapForNull paramMap);
      /**
       * 부서조직 정보를 신규 투입하기 전에 중복 여부를 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull insertMhshrm010UseChk(Mhshrm010 entity);
      /**
       * 부서조직 정보를 삭제하기 전에 사용 내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull deleteMhshrm010UseChk(EgovMapForNull paramMap);
      /**
       * 출장비기준코드 정보를 등록한다.
       * @param paramMap
       */
      public void saveMhshrm010(Mhshrm010 entity);
      /**
       * 출장비기준코드 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteMhshrm010(Mhshrm010 entity);
      /**
       * 엑셀용 출장비기준코드 목록을 조회한다.
       * @param paramMap
       * @return
       */
       public List<EgovMapForNull> selectMhshrm010ListForExcel(EgovMapForNull paramMap);
}
