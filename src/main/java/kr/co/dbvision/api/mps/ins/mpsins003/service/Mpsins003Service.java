package kr.co.dbvision.api.mps.ins.mpsins003.service;

import java.util.List;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 사회보험 자격취득관리에 관한 서비스 인터페이스 클래스
 *
 * @author 디비비전
 * @since 2020.08.04
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.08.04)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.08.04          디비비전              최초 생성
 * </pre>
 */

public interface Mpsins003Service {
     /**
      * 사회보험 자격취득 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchMpsins003(EgovMapForNull paramMap);
     /**
      * 사회보험 자격취득 조회 목록을 엑셀용으로 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public List<EgovMapForNull> searchMpsins003ForExcel(EgovMapForNull paramMap);
     /**
      * 사회보험 자격취득 상세내용을 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject findMpsins003(EgovMapForNull paramMap);
     /**
      * 사회보험 자격취득 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject saveMpsins003(EgovMapForNull paramMap) throws Exceptions;
 }
