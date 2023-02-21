package kr.co.dbvision.api.mhs.hrm.mhshrm007.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 학교코드관리에 관한 매퍼 클래스
 *
 * @author 디비비전
<<<<<<< HEAD
 * @since 2019.05.13
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2019.05.13          디비비전              최초 생성
=======
 * @since 2019.05.10
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2019.05.10          디비비전              최초 생성
>>>>>>> branch 'master' of ssh://git@112.171.126.71/second/git/repos/dbvision_xerp01
 *
 * </pre>
 */

@Mapper("Mhshrm007Mapper")
public interface Mhshrm007Mapper {
     /**
      * 학교코드 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectMhsSchulCodeList(EgovMapForNull paramMap);
      /**
       * 학교코드 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectMhsSchulCode(EgovMapForNull paramMap);
      /**
       * 학교코드 정보를 등록한다.
       * @param paramMap
       */
      public void insertMhsSchulCode(EgovMapForNull paramMap);
      /**
       * 학교코드 정보를 수정한다.
       * @param paramMap
       */
      public void updateMhsSchulCode(EgovMapForNull paramMap);
      /**
       * 학교코드 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteMhsSchulCode(EgovMapForNull paramMap);
}
