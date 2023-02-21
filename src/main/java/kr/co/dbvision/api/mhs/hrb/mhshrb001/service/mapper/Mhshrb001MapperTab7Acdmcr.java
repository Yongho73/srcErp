package kr.co.dbvision.api.mhs.hrb.mhshrb001.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.mhs.hrb.mhshrb001.entity.Mhshrb001_TAB7;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 인사기본에 관한 매퍼 클래스 : 학력 Tab7
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

@Mapper("Mhshrb001MapperTab7Acdmcr")
public interface Mhshrb001MapperTab7Acdmcr {
      
      /**
       * 학력 목록을 조회한다.
       * @param paramMap
       * @return
       */ 
      public List<EgovMapForNull> selectMhsEmpTab7Acdmcr(EgovMapForNull paramMap);
      /**
       * 학력 저장 전에 중복 여부를 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull insertMhsEmpTab7AcdmcrUseChk(Mhshrb001_TAB7 entity);
      /**
       * 학력 정보를 등록한다.
       * @param paramMap
       */
      public void saveMhsEmpTab7Acdmcr(Mhshrb001_TAB7 entity);
      /**
       * 학력 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteMhsEmpTab7Acdmcr(EgovMapForNull paramMap);

}
