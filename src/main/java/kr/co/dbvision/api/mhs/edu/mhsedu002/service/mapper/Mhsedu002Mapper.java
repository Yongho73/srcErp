package kr.co.dbvision.api.mhs.edu.mhsedu002.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.mhs.edu.mhsedu002.entity.Mhsedu002;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 교육신청관리관리에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2020.09.02
 * @version 1.0
 * @sourceGen version 2020.08.06.01 (2020.09.02)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.09.02          디비비전              최초 생성
 * </pre>
 */

@Mapper("Mhsedu002Mapper")
public interface Mhsedu002Mapper {
     /**
      * 교육신청 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectMhsedu002List(EgovMapForNull paramMap);
      public List<EgovMapForNull> selectMhseduTime(EgovMapForNull paramMap);
      public List<EgovMapForNull> selectMhseduEmp(EgovMapForNull paramMap);
      /**
       * 교육신청 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectMhsedu002(EgovMapForNull paramMap);
      /**
       * 교육신청 정보를 등록한다.
       * @param paramMap
       */
      public void saveMhsedu002(Mhsedu002 entity);
      /**
       * 교육신청 정보를 등록한다.
       * @param paramMap
       */
      public void saveMhseduEmp(Mhsedu002 entity);
      public int saveMhseduReqst(Mhsedu002 entity);
      public void saveMhseduSelfAt(Mhsedu002 entity);
      public void saveMhseduTime(Mhsedu002 entity);
      public int updateSttusMhsedu002(EgovMapForNull paramMap);
      
      /**
       * 교육신청 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteMhsedu002(Mhsedu002 entity);
}

