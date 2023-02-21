package kr.co.dbvision.api.mhs.hrm.mhshrm005.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.mhs.hrm.mhshrm005.entity.Mhshrm005;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 부서조직관리관리에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2020.04.21
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.04.21          디비비전              최초 생성
 * </pre>
 */

@Mapper("Mhshrm005Mapper")
public interface Mhshrm005Mapper {
     /**
      * 부서조직 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectMhshrm005List(EgovMapForNull paramMap);
      /**
       * 부서조직 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectMhshrm005(EgovMapForNull paramMap);
      /**
       * 부서조직 정보를 신규 투입하기 전에 중복 여부를 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull insertMhshrm005UseChk(Mhshrm005 entity);
      /**
       * 부서조직 정보를 신규 투입하기 전에 코드 존재 여부를 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull insertMhshrm005DeptUseOrgnztChk(Mhshrm005 entity);
      /**
       * 부서조직 정보를 삭제하기 전에 사용 내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull deleteMhshrm005UseChk(EgovMapForNull paramMap);
      /**
       * 부서조직 정보를 등록한다.
       * @param paramMap
       */
      public void saveMhshrm005(Mhshrm005 entity);
      /** 
       * 부서조직 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteMhshrm005(EgovMapForNull paramMap);
      /**
       * 부서콤보 목록을 조회한다.
       * @param paramMap
       * @return
       */
      public List<EgovMapForNull> selectMhshrm005RspofcCodeCombo(EgovMapForNull paramMap);
}
