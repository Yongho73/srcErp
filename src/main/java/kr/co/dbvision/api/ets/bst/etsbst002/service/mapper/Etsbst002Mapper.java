package kr.co.dbvision.api.ets.bst.etsbst002.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 문서번호관리관리에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2020.03.27
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.03.27          디비비전              최초 생성
 * </pre>
 */

@Mapper("Etsbst002Mapper")
public interface Etsbst002Mapper {
     /**
      * 문서번호 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectEtsbst002List(EgovMapForNull paramMap);
      /**
       * 문서번호 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectEtsbst002(EgovMapForNull paramMap);
      /**
       * 문서번호 정보를 등록한다.
       * @param paramMap
       */
      public void saveEtsbst002(EgovMapForNull paramMap);
      /**
       * 문서번호 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteEtsbst002(EgovMapForNull paramMap);
}
