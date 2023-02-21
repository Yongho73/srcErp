package kr.co.dbvision.api.mhs.hrd.mhshrd006.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.mhs.hrd.mhshrd006.entity.Mhshrd006;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 휴직신청관리관리에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2020.05.31
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.05.31          디비비전              최초 생성
 * </pre>
 */

@Mapper("Mhshrd006Mapper")
public interface Mhshrd006Mapper {
    /**
     * 사용자 정보를 조회한다.
     * @param paramMap
     * @return
     */
     public EgovMapForNull userInformationMhshrd006(EgovMapForNull paramMap);
     /**
      * 휴직신청 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectMhshrd006List(EgovMapForNull paramMap);
      /**
       * 휴직신청 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectMhshrd006(EgovMapForNull paramMap);
      /**
       * 휴직신청 정보를 등록한다.
       * @param paramMap
       */
      public void saveMhshrd006(Mhshrd006 entity);
      /**
       * 휴직신청 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteMhshrd006(Mhshrd006 entity);
      /**
       * 휴직신청 목록 엘셀용 조회한다.
       * @param paramMap
       * @return
       */
       public List<EgovMapForNull> searchMhshrd006ForExcel(EgovMapForNull paramMap);
       /**
        * 복사 전 결재구분순번 카운트
        * @param paramMap
        * @return
        */
       public Integer selectElctsctSeSnCnt(EgovMapForNull paramMap);
       /**
        * 휴직정보를 복사한다
        * @param paramMap
        * @return
        */
       public Integer saveCopyMhshrd006(EgovMapForNull paramMap);
}
