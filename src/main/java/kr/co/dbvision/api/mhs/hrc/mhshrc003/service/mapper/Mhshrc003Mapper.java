package kr.co.dbvision.api.mhs.hrc.mhshrc003.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.mhs.hrc.mhshrc003.entity.Mhshrc003;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 증명서발급대장관리에 관한 매퍼 클래스
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

@Mapper("Mhshrc003Mapper")
public interface Mhshrc003Mapper {
     /**
      * 증명서발급대장 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectMhshrc003List(EgovMapForNull paramMap);
      /**
       * 증명서발급대장 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectMhshrc003(EgovMapForNull paramMap);
      /**
       * 증명서발급대장 정보를 등록한다.
       * @param paramMap
       */
      public void saveMhshrc003(Mhshrc003 entity);
      /**
       * 증명서발급대장 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteMhshrc003(Mhshrc003 entity);
}
