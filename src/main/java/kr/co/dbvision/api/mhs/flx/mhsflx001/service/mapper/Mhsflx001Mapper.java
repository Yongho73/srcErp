package kr.co.dbvision.api.mhs.flx.mhsflx001.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.mhs.flx.mhsflx001.entity.Mhsflx001;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 근무유형관리관리에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2020.05.19
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.05.19          디비비전              최초 생성
 * </pre>
 */

@Mapper("Mhsflx001Mapper")
public interface Mhsflx001Mapper {
     /**
      * 근무유형 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectMhsflx001List(EgovMapForNull paramMap);
      /**
       * 근무유형 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectMhsflx001(EgovMapForNull paramMap);
      /**
       * 근무유형 정보를 등록한다.
       * @param paramMap
       */
      public void saveMhsflx001(Mhsflx001 entity);
      /**
       * 근무유형 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteMhsflx001(Mhsflx001 entity);
}
