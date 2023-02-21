package kr.co.dbvision.api.mhs.hrb.mhshrb003.service;

import java.util.List;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 개인정보변경승인관리에 관한 서비스 인터페이스 클래스
 *
 * @author 디비비전
 * @since 2021.06.09
 * @version 1.0
 * @sourceGen version 2021.02.18.01 (2021.06.09)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2021.06.09          디비비전              최초 생성
 * </pre>
 */

public interface Mhshrb003Service {
     /**
      * 개인정보변경승인 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchMhshrb003(EgovMapForNull paramMap);
     /**
      * 개인정보변경승인 조회 목록을 엑셀용으로 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public List<EgovMapForNull> searchMhshrb003ForExcel(EgovMapForNull paramMap);
     /**
      * 개인정보변경승인 상세내용을 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject findMhshrb003(EgovMapForNull paramMap);
     /**
      * 개인정보변경승인 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     //public JSONObject saveMhshrb003(EgovMapForNull paramMap) throws Exceptions;
	
     public JSONObject searchMhshrb003Tab1(EgovMapForNull paramMap);
     
     public JSONObject saveMhshrb003(EgovMapForNull paramMap, String changeRequstIp) throws Exceptions;
	public JSONObject receiptMhshrb003(EgovMapForNull paramMap);
 }
