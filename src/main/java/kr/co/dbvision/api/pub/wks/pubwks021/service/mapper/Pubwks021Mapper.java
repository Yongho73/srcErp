package kr.co.dbvision.api.pub.wks.pubwks021.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.pub.wks.pubwks021.entity.Pubwks021;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 개인별근무유형관리관리에 관한 매퍼 클래스
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

@Mapper("Pubwks021Mapper")
public interface Pubwks021Mapper {
     /**
      * 개인별근무유형 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectPubwks021List(EgovMapForNull paramMap);
      /**
       * 개인별근무유형 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectPubwks021(EgovMapForNull paramMap);
      /**
       * 개인별근무유형 정보를 등록한다.
       * @param paramMap
       */
      public void savePubwks021(Pubwks021 entity);
      /**
       * 개인별근무유형 정보를 삭제한다.
       * @param paramMap
       */
      public void deletePubwks021(EgovMapForNull paramMap);
      /**
       * 삽입 , 수정 시 근무일자 중복 체크 
       * @param paramMap
       */
      public int selectWorkDayValCheck(Pubwks021 entity);
      /**
       * 개인별근무유형 승인 여부가 없는 정보를 조회
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectNoSttusPubwks021(EgovMapForNull paramMap);
      /**
       * 개인별근무유형 승인 상태 업데이트
       * @param paramMap
       * @return
       */
      public void updateSttusPubwks021(EgovMapForNull paramMap);

}
