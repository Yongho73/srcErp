package kr.co.dbvision.api.mhs.hrb.mhshrb001.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.mhs.hrb.mhshrb001.entity.Mhshrb001_TAB3;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 인사기본에 관한 매퍼 클래스 : 가족 Tab3
 *
 * @author 디비비전
 * @since 2020.03.03
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.03.03          디비비전              최초 생성
 *
 * </pre>
 */

@Mapper("Mhshrb001MapperTab3Family")
public interface Mhshrb001MapperTab3Family {
      
      /**
       * 가족정보 목록을 조회한다.
       * @param paramMap
       * @return
       */ 
      public List<EgovMapForNull> selectMhsEmpFamily(EgovMapForNull paramMap);
      /**
       * 인사기본 : 가족정보를 저장한다.
       * @param paramMap
       */
      public void saveMhsEmpFamily(Mhshrb001_TAB3 paramMap);
      /**
       * 인사기본 : 가족정보를 삭제한다.
       * @param paramMap
       */
      public void deleteMhsEmpFamily(Mhshrb001_TAB3 paramMap);
}
