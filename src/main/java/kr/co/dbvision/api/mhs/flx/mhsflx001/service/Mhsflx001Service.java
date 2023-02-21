package kr.co.dbvision.api.mhs.flx.mhsflx001.service;

import java.util.List;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 근무유형관리관리에 관한 서비스 인터페이스 클래스
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

public interface Mhsflx001Service {
     /**
      * 근무유형 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchMhsflx001(EgovMapForNull paramMap);
     /**
      * 근무유형 조회 목록을 엑셀용으로 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public List<EgovMapForNull> searchMhsflx001ForExcel(EgovMapForNull paramMap);
     /**
      * 근무유형 상세내용을 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject findMhsflx001(EgovMapForNull paramMap);
     /**
      * 근무유형 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject saveMhsflx001(EgovMapForNull paramMap);
 }
