package kr.co.dbvision.api.mtx.evd.mtxevd001.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.mtx.evd.mtxevd001.entity.Mtxevd001;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 세금계산서(매입/매출)관리에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2020.06.11
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.06.11          디비비전              최초 생성
 * </pre>
 */

@Mapper("Mtxevd001Mapper")
public interface Mtxevd001Mapper {
    /**
     * 총갯수를 구한다  
    * @param paramMap
    * @return
    */
    public int selectMtxevd001ListCnt(EgovMapForNull paramMap);
    
     /**
      * 세금계산서(매입/매출) 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectMtxevd001List(EgovMapForNull paramMap);
      /**
       * 세금계산서(매입/매출) 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectMtxevd001(EgovMapForNull paramMap);
      /**
       * 세금계산서(매입/매출) 정보를 등록한다.
       * @param paramMap
       */
      public void saveMtxevd001(Mtxevd001 entity);
      /**
       * 세금계산서(매입/매출) 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteMtxevd001(Mtxevd001 entity);
      
      /**
       * 세금계산서(매입/매출) 목록을 조회한다.
       * @param paramMap
       * @return
       */
       public List<EgovMapForNull> selectMtxevdDetail001List(EgovMapForNull paramMap);
 
      /**
       * 세금계산서합계표 작성 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectMtxevdDetail001(EgovMapForNull paramMap);
      /**
       * 세금계산서합계표 작성 정보를 등록한다.
       * @param paramMap
       */
      public void saveMtxevdDetail001(Mtxevd001 entity);
      /**
       * 세금계산서합계표 작성 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteMtxevdDetail001(Mtxevd001 entity);
}
