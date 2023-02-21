package kr.co.dbvision.api.mtx.evd.mtxevd003.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.mtx.evd.mtxevd003.entity.Mtxevd003;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 법인카드 증빙관리에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2020.07.06
 * @version 1.0
 * @sourceGen version 2020.06.29.01 (2020.07.06)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.07.06          디비비전              최초 생성
 * </pre>
 */

@Mapper("Mtxevd003Mapper")
public interface Mtxevd003Mapper {
    /**
     * 총갯수를 구한다  
    * @param paramMap
    * @return
    */
    public int selectMtxevd003ListCnt(EgovMapForNull paramMap);
     /**
      * 법인카드 증빙 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectMtxevd003List(EgovMapForNull paramMap);
      /**
       * 법인카드 증빙 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectMtxevd003(EgovMapForNull paramMap);
      /**
       * 법인카드 증빙 정보를 등록한다.
       * @param paramMap
       */
      public void saveMtxevd003(Mtxevd003 entity);
      /**
       * 법인카드 증빙 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteMtxevd003(Mtxevd003 entity);
}
