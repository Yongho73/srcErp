package kr.co.dbvision.api.mhs.hrb.mhshrb001.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 인사기본에 관한 매퍼 클래스 : 포상 Tab5
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

@Mapper("Mhshrb001MapperTab5Rward")
public interface Mhshrb001MapperTab5Rward {
      
      /**
       * 포상정보 목록을 조회한다.
       * @param paramMap
       * @return
       */ 
      public List<EgovMapForNull> selectMhsEmpTab5Rward(EgovMapForNull paramMap);

}
