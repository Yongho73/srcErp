package kr.co.dbvision.api.mhs.edu.mhsedu001.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.mhs.edu.mhsedu001.entity.Mhsedu001;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 교육과정등록관리에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2020.08.19
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.08.19)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.08.19          디비비전              최초 생성
 * </pre>
 */

@Mapper("Mhsedu001Mapper")
public interface Mhsedu001Mapper {
     /**
      * 교육과정등록 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectMhsedu001List(EgovMapForNull paramMap);
      public List<EgovMapForNull> selectMhseduTime(EgovMapForNull paramMap);
      public List<EgovMapForNull> selectMhseduEmp(EgovMapForNull paramMap);
      public List<EgovMapForNull> selectMhseduPopList(EgovMapForNull paramMap);
      /**
       * 교육과정등록 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectMhsedu001(EgovMapForNull paramMap);
      /**
       * 교육과정등록 정보를 등록한다.
       * @param paramMap
       */
      public void saveMhsedu001(Mhsedu001 entity);
      
      public void saveMhseduTime(Mhsedu001 entity);
      
      public void saveMhseduEmp(Mhsedu001 entity);
      /**
       * 교육과정등록 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteMhsedu001(Mhsedu001 entity);
      
      public void deleteMhseduEmp(Mhsedu001 entity);
      
      public void deleteMhseduTime(Mhsedu001 entity);
      
      
      public Integer selectElctsctSeSnCnt(EgovMapForNull paramMap);
      
      public void saveCopyMhsedu001(EgovMapForNull paramMap);
      
      public void saveCopyMhseduTime(EgovMapForNull paramMap);
      
      public void saveCopyMhseduEmp(EgovMapForNull paramMap);
	  //public void searchMhseduTime(Mhsedu001 entity);
}
