package kr.co.dbvision.api.mtx.evd.mtxevd001.service;

import java.util.List;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 세금계산서(매입/매출)관리에 관한 서비스 인터페이스 클래스
 *
 * @author 디비비전
 * @since 2020.06.11
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.06.11          디비비전              최초 생성
 * </pre>
 */

public interface Mtxevd001Service {
     /**
      * 세금계산서(매입/매출) 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchMtxevd001(EgovMapForNull paramMap);
     /**
      * 세금계산서(매입/매출) 조회 목록을 엑셀용으로 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public List<EgovMapForNull> searchMtxevd001ForExcel(EgovMapForNull paramMap);
     /**
      * 세금계산서(매입/매출) 상세내용을 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject findMtxevd001(EgovMapForNull paramMap);
     /**
      * 세금계산서(매입/매출) 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject saveMtxevd001(EgovMapForNull paramMap);
     
     /**
      * 세금계산서(매입/매출) 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchMtxevdDetail001(EgovMapForNull paramMap);
     
     /**
      * 세금계산서(매입/매출) 상세내용을 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject findMtxevdDetail001(EgovMapForNull paramMap);
     
     /**
      * 세금계산서합계표 작성 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject saveMtxevdDetail001(EgovMapForNull paramMap);
 }
