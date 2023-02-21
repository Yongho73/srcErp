package kr.co.dbvision.api.mhs.hrm.mhshrm006.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.mhs.hrm.mhshrm006.entity.Mhshrm006;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 가족코드관리관리에 관한 매퍼 클래스
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

@Mapper("Mhshrm006Mapper")
public interface Mhshrm006Mapper {
     /**
      * 가족코드 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectMhshrm006List(EgovMapForNull paramMap);
      /**
       * 가족코드 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectMhshrm006(EgovMapForNull paramMap);
      /**
       * 가족코드 콤보 목록을 조회한다.
       * @param paramMap
       * @return
       */
       public List<EgovMapForNull> selectMhshrb006CodeCombo(EgovMapForNull paramMap);
      /**
       * 가족코드 정보를 신규 투입하기 전에 중복 여부를 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull insertMhshrm006UseChk(Mhshrm006 entity);
      /**
       * 가족코드 정보를 등록한다.
       * @param paramMap
       */
      public void saveMhshrm006(Mhshrm006 entity);
      /**
       * 가족코드 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteMhshrm006(Mhshrm006 entity);
      /**
       * 가족코드 정보를 삭제하기 전에 사용 내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull useCheckMhshrm006(EgovMapForNull paramMap);
}
