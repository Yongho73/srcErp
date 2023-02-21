package kr.co.dbvision.api.mps.cal.mpscal022.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.mhs.hrb.mhshrb001.entity.Mhshrb001;
import kr.co.dbvision.api.mps.cal.mpscal022.entity.Mpscal022;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 개인별급여기준등록관리에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2020.07.07
 * @version 1.0
 * @sourceGen version 2020.06.29.01 (2020.07.07)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.07.07          디비비전              최초 생성
 * </pre>
 */

@Mapper("Mpscal022Mapper")
public interface Mpscal022Mapper {
     /**
      * 개인별급여기준등록 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectMpscal022List(EgovMapForNull paramMap);
      /**
       * 개인별급여기준등록 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectMpscal022(EgovMapForNull paramMap);
      /**
       * 개인별급여기준등록 정보를 등록한다.
       * @param paramMap
       */
      public void saveMpscal022(Mpscal022 entity);
      /**
       * 개인별급여기준등록 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteMpscal022(Mpscal022 entity);
      /**
       * 개인별급여기준등록 목록을 조회한다.
       * @param paramMap
       * @return
       */
       public List<EgovMapForNull> selectMpscalEmpList(EgovMapForNull paramMap);
       /**
        * 인사기본 정보를 수정한다.(기본 tab 정보)
        * @param paramMap
        */
       public void updateMhsEmp(EgovMapForNull paramMap);
       
}
