package kr.co.dbvision.api.mhs.hrc.mhshrc001.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.mhs.hrc.mhshrc001.entity.Mhshrc001;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 증명서신청/출력관리에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2020.08.27
 * @version 1.0
 * @sourceGen version 2020.08.06.01 (2020.08.27)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.08.27          디비비전              최초 생성
 * </pre>
 */

@Mapper("Mhshrc001Mapper")
public interface Mhshrc001Mapper {
     /**
      * 증명서신청/출력 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectMhshrc001List(EgovMapForNull paramMap);
      /**
       * 증명서신청/출력 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectMhshrc001(EgovMapForNull paramMap);
      /**
       * 증명서신청/출력 정보를 등록한다.
       * @param paramMap
       */
      public void saveMhshrc001(Mhshrc001 entity);
      /**
       * 증명서신청/출력 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteMhshrc001(Mhshrc001 entity);
}
