package kr.co.dbvision.api.mhs.hrb.mhshrb001.service.mapper;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 인사기본에 관한 매퍼 클래스 : 신상정보 Tab2
 *
 * @author 디비비전
 * @since 2020.03.02
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.03.02          디비비전              최초 생성
 *
 * </pre>
 */

@Mapper("Mhshrb001MapperTab2IndvdlInfo")
public interface Mhshrb001MapperTab2IndvdlInfo {
      
      /**
       * 인사기본 목록을 조회한다.
       * @param paramMap
       * @return
       */ 
      public EgovMapForNull selectMhsEmpIndvdlInfo(EgovMapForNull paramMap);
      /**
       * 인사기본 : 개인정보를 저장한다.
       * @param paramMap
       */
      public void saveMhsEmpIndvdlInfo(EgovMapForNull paramMap);
      /**
       * 인사기본 : 병역정보를 저장한다.
       * @param paramMap
       */
      public void saveMhsEmpMltpwr(EgovMapForNull paramMap);
}
