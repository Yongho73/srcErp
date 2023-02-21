package kr.co.dbvision.api.pub.wfs.pubwfs008.service;

import java.util.List;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 자녀학비보조금신청관리에 관한 서비스 인터페이스 클래스
 *
 * @author 디비비전
 * @since 2020.07.27
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.07.27)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.07.27          디비비전              최초 생성
 * </pre>
 */

public interface Pubwfs008Service {
     /**
      * 자녀학비보조금신청 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchPubwfs008(EgovMapForNull paramMap);
     /**
      * 자녀 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchPubwfsChldrn(EgovMapForNull paramMap);
     /**
      * 자녀학비보조금신청 조회 목록을 엑셀용으로 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public List<EgovMapForNull> searchPubwfs008ForExcel(EgovMapForNull paramMap);
     /**
      * 자녀학비보조금신청 상세내용을 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject findPubwfs008(EgovMapForNull paramMap);
     /**
      * 자녀학비보조금신청 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject savePubwfs008(EgovMapForNull paramMap) throws Exceptions;
     
     // 전년도 데이터 복사
     public JSONObject saveCopyPubwfs(EgovMapForNull paramMap);
     
 }
