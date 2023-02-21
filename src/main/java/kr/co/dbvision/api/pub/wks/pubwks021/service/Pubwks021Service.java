package kr.co.dbvision.api.pub.wks.pubwks021.service;

import java.util.List;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 개인별근무유형관리관리에 관한 서비스 인터페이스 클래스
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

public interface Pubwks021Service {
     /**
      * 개인별근무유형 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchPubwks021(EgovMapForNull paramMap);
     /**
      * 개인별근무유형 조회 목록을 엑셀용으로 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public List<EgovMapForNull> searchPubwks021ForExcel(EgovMapForNull paramMap);
     /**
      * 개인별근무유형 상세내용을 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject findPubwks021(EgovMapForNull paramMap);
     /**
      * 개인별근무유형 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject savePubwks021(EgovMapForNull paramMap) throws Exceptions;
     /**
      * 개인별근무유형 정보를 삭제한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject deletePubwks021(EgovMapForNull paramMap) throws Exceptions;
     /**
      * 개인별근무유형 승인 여부가 없는 정보를 조회
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject findNoSttusPubwks021(EgovMapForNull paramMap) throws Exceptions;
     /**
      * 개인별근무유형 승인 여부 업데이트
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject updateSttusPubwks021(EgovMapForNull paramMap) throws Exceptions;
     
}
