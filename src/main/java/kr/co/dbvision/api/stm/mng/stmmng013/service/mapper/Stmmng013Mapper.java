package kr.co.dbvision.api.stm.mng.stmmng013.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.stm.mng.stmmng013.entity.Stmmng013;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 명함관리관리에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2020.07.31
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.07.31)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.07.31          디비비전              최초 생성
 * </pre>
 */

@Mapper("Stmmng013Mapper")
public interface Stmmng013Mapper {
     /**
      * 명함 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectStmmng013List(EgovMapForNull paramMap);
      /**
       * 명함 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectStmmng013(EgovMapForNull paramMap);
      /**
       * 명함 정보를 등록한다.
       * @param paramMap
       */
      public void saveStmmng013(Stmmng013 entity);
      /**
       * 명함 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteStmmng013(Stmmng013 entity);
      
      public void updateChargeClearStmmng013(Stmmng013 entity);
      
      public void updateChargeSetStmmng013(Stmmng013 entity);
      
      public void updateChargeMfsbsc002(Stmmng013 entity);
}
