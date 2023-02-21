package kr.co.dbvision.api.mhs.hrb.mhshrb001.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.mhs.hrb.mhshrb001.entity.Mhshrb001_TAB11;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 인사기본에 관한 매퍼 클래스 : 계좌 Tab11
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

@Mapper("Mhshrb001MapperTab11Acnut")
public interface Mhshrb001MapperTab11Acnut {
      
      /**
       * 계좌 목록을 조회한다.
       * @param paramMap
       * @return
       */ 
      public List<EgovMapForNull> selectMhsEmpTab11Acnut(EgovMapForNull paramMap);
      /**
       * 계좌 저장 전에 중복 여부를 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull insertMhsEmpTab11AcnutUseChk(Mhshrb001_TAB11 entity);
      /**
       * 계좌 정보를 등록한다.
       * @param paramMap
       */
      public void saveMhsEmpTab11Acnut(Mhshrb001_TAB11 entity);
      /**
       * 계좌 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteMhsEmpTab11Acnut(EgovMapForNull paramMap);

}
