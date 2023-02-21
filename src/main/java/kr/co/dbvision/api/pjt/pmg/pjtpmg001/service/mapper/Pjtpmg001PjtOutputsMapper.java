package kr.co.dbvision.api.pjt.pmg.pjtpmg001.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.pjt.pmg.pjtpmg001.entity.Pjtpmg001;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 프로젝트현황 산출물에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2020.01.14
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.01.14          디비비전              최초 생성
 *
 * </pre>
 */

@Mapper("Pjtpmg001PjtOutputsMapper")
public interface Pjtpmg001PjtOutputsMapper {
      
      public List<EgovMapForNull> selectPjtOutputsList(EgovMapForNull paramMap);
      public List<EgovMapForNull> selectPjtOutputsTreeList(EgovMapForNull paramMap);
      public List<EgovMapForNull> selectStepList(EgovMapForNull paramMap);
      public List<EgovMapForNull> selectStepDetailList(EgovMapForNull paramMap);
      public List<EgovMapForNull> selectPjtProjectOututList(EgovMapForNull paramMap);
      
      public void savePjtProjectOutut(EgovMapForNull paramMap);
      public void updatePjtProjectOutut(Pjtpmg001 paramMap);
      public void deletePjtProjectOutut(Pjtpmg001 paramMap);
}
