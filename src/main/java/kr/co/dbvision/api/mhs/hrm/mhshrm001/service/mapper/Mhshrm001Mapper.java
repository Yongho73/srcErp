package kr.co.dbvision.api.mhs.hrm.mhshrm001.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.mhs.hrm.mhshrm001.entity.Mhshrm001;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 사업장관리에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2019.05.14
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2019.05.14          디비비전              최초 생성
 *
 * </pre>
 */

@Mapper("Mhshrm001Mapper")
public interface Mhshrm001Mapper {
     /**
      * 사업장 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectMhshrm001List(EgovMapForNull paramMap);
      /**
       * 사업장 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectMhshrm001(EgovMapForNull paramMap);
      /**
       * 사업장 목록을 조회한다.(콤보용)
       * @param paramMap
       * @return
       */
       public List<EgovMapForNull> selectStmBizplcCodeList(EgovMapForNull paramMap);
      /**
       * 사업장 정보를 등록한다.
       * @param paramMap
       */
       public void saveMhshrm001(Mhshrm001 entity);
      /**
       * 사업장 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteMhshrm001(Mhshrm001 entity);
}
