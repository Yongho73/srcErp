package kr.co.dbvision.api.mhs.hrb.mhshrb001.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.mhs.hrb.mhshrb001.entity.Mhshrb001_TAB4;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 인사기본에 관한 매퍼 클래스 : 발령관리 Tab4
 *
 * @author 디비비전
 * @since 2020.03.09
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.03.09          디비비전              최초 생성
 *
 * </pre>
 */

@Mapper("Mhshrb001MapperTab4Gnfd")
public interface Mhshrb001MapperTab4Gnfd {
      
      /**
       * 가족정보 목록을 조회한다.
       * @param paramMap
       * @return
       */ 
      public List<EgovMapForNull> selectMhsEmpGnfd(EgovMapForNull paramMap);
      /**
       * 인사기본 : 가족정보를 저장한다.
       * @param paramMap
       */
      public void saveMhsEmpGnfd(Mhshrb001_TAB4 paramMap);
      /**
       * 인사기본 : 가족정보를 삭제한다.
       * @param paramMap
       */
      public void deleteMhsEmpGnfd(Mhshrb001_TAB4 paramMap);
}
