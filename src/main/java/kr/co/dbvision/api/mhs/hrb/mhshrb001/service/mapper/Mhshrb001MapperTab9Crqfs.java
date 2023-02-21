package kr.co.dbvision.api.mhs.hrb.mhshrb001.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.mhs.hrb.mhshrb001.entity.Mhshrb001_TAB9;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 인사기본에 관한 매퍼 클래스 : 자격 Tab9
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
 *
 * </pre>
 */

@Mapper("Mhshrb001MapperTab9Crqfs")
public interface Mhshrb001MapperTab9Crqfs {
      
      /**
       * 자격 목록을 조회한다.
       * @param paramMap
       * @return
       */ 
      public List<EgovMapForNull> selectMhsEmpTab9Crqfs(EgovMapForNull paramMap);
      /**
       * 자격 저장 전에 중복 여부를 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull insertMhsEmpTab9CrqfsUseChk(Mhshrb001_TAB9 entity);
      /**
       * 자격 정보를 등록한다.
       * @param paramMap
       */
      public void saveMhsEmpTab9Crqfs(Mhshrb001_TAB9 entity);
      /**
       * 자격 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteMhsEmpTab9Crqfs(EgovMapForNull paramMap);

}
