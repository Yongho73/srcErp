package kr.co.dbvision.api.mps.bsc.mpsbsc003.service;

import java.util.List;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 월급여항목적용등록관리에 관한 서비스 인터페이스 클래스
 *
 * @author 디비비전
 * @since 2020.03.03
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.03.03          디비비전              최초 생성
 * </pre>
 */

public interface Mpsbsc003Service {
	
	 public JSONObject searchComboYeayMpsbsc003(EgovMapForNull paramMap) ;
     /**
      * 월급여항목적용등록 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchMpsbsc003(EgovMapForNull paramMap);
     /**
      * 월급여항목적용등록 조회 목록을 엑셀용으로 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public List<EgovMapForNull> searchMpsbsc003ForExcel(EgovMapForNull paramMap);
     

     public JSONObject saveCopyApplyMonth(EgovMapForNull paramMap);     
     
     /**
      * 월급여항목적용등록 상세내용을 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject findMpsbsc003(EgovMapForNull paramMap);
     /**
      * 월급여항목적용등록 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject saveMpsbsc003(EgovMapForNull paramMap);
     /**
      * 월급여항목적용등록 정보를 삭제한다.
      * @param paramMap
      * @throws Exceptions
      */
     public JSONObject removeMpsbsc003(EgovMapForNull paramMap);
 }
