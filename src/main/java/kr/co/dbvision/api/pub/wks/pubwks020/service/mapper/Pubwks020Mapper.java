package kr.co.dbvision.api.pub.wks.pubwks020.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.pub.wks.pubwks020.entity.Pubwks020;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 시차근무관리관리에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2020.07.14
 * @version 1.0
 * @sourceGen version 2020.06.29.01 (2020.07.14)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.07.14          디비비전              최초 생성
 * </pre>
 */

@Mapper("Pubwks020Mapper")
public interface Pubwks020Mapper {
     /**
      * 달력 생성
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> makeCalendar(EgovMapForNull paramMap);
      /**
       * 시차근무 조회 - 관리자
       * @param paramMap
       * @return
       */
       public List<EgovMapForNull> selectTmdiffForAdmin(EgovMapForNull paramMap);
       /** 
        * 시차근무 조회
        * @param paramMap
        * @return
        * */
       public List<EgovMapForNull> selectTmdiff(EgovMapForNull paramMap);
      /** 
       * 개인별 근무유형 일자
       * @param paramMap
       * @return
       * */
      public List<EgovMapForNull> selectIndvd(EgovMapForNull paramMap);
     /**
      * 시차근무 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectPubwks020List(EgovMapForNull paramMap);
      /**
       * 시차근무 이력을 조회한다.
       * @param paramMap
       * @return
       */
       public List<EgovMapForNull> selectHistoryPubwks020(EgovMapForNull paramMap);
      /**
       * 시차근무 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectPubwks020(EgovMapForNull paramMap);
      /**
       * 시차근무 승인 상태를 수정한다.
       * @param paramMap
       * @return
       */
      public int updateConfmSttusPubwks020(Pubwks020 entity);
      /**
       * 시차근무 정보를 등록한다.
       * @param paramMap
       */
      public void savePubwks020(EgovMapForNull paramMap);
      /**
       * 시차근무 정보를 복사한다.
       * @param paramMap
       */
      public void copyPubwks020(EgovMapForNull paramMap);
      /**
       * 시차근무 정보를 일괄 등록한다.
       * @param paramMap
       */
      public void saveBundlePubwks020(Pubwks020 entity);
      /**
       * 시차근무 정보를 삭제한다.
       * @param paramMap
       */
      public void deletePubwks020(EgovMapForNull paramMap);
      /**
       * 시차근무 일괄 등록시 해당 되는 대상자의 일자를 미리 삭제한다
       * @param entity
       */
      public void deleteBundlePubwks020(Pubwks020 entity);
      /**
       * 시차근무 일괄 등록 시 휴일체크 용도
       * @param entity
       */
      public List<EgovMapForNull> selectCalendarPubwks020(Pubwks020 entity);
      /**
       * 승인 상태 일괄 수정 전 해당하는 데이터들 SELECT
       * @param entity
       */
      public List<EgovMapForNull> selectForConfmSttusUpdate(Pubwks020 entity);
      /**
       * 일괄 등록 전 상태코드 확인 
       * @param entity
       */
      public EgovMapForNull selectForSaveBundle(Pubwks020 entity);      
      
}
