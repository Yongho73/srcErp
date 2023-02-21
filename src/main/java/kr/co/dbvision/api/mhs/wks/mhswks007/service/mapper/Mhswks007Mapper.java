package kr.co.dbvision.api.mhs.wks.mhswks007.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.mhs.wks.mhswks007.entity.Mhswks007;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 휴직신청관리관리에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2020.05.15
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.05.15          디비비전              최초 생성
 * </pre>
 */

@Mapper("Mhswks007Mapper")
public interface Mhswks007Mapper {
     /**
      * 휴직신청 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectMhswks007List(EgovMapForNull paramMap);
      /**
       * 휴직신청 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectMhswks007(EgovMapForNull paramMap);
      /**
       * 휴직신청 정보를 등록한다.
       * @param paramMap
       */
      public void saveMhswks007(Mhswks007 entity);
      /**
       * 휴직신청 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteMhswks007(Mhswks007 entity);
}
