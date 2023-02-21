package kr.co.dbvision.api.mhs.hrm.mhshrm001.service;

import java.util.List;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 사업장관리에 관한 서비스 인터페이스
 *
 * @author 디비비전
 * @since 2019.05.14
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2019.05.14          디비비전              최초 생성
 *
 * </pre>
 */

public interface Mhshrm001Service {
     /**
      * 사업장 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchMhshrm001(EgovMapForNull paramMap);
     /**
      * 사업장 조회 목록을 엑셀용으로 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public List<EgovMapForNull> searchMhshrm001ForExcel(EgovMapForNull paramMap);
     /**
      * 사업장 상세내용을 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject findMhshrm001(EgovMapForNull paramMap);
     /**
      * 사업장 목록을 조회한다.(콤보용)
      * @param paramMap
      * @return
      */
     public JSONObject searchStmBizplcCode(EgovMapForNull paramMap);
     //public List<EgovMapForNull> searchStmBizplcCode(EgovMapForNull paramMap);
     /**
      * 사업장 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject saveMhshrm001(EgovMapForNull paramMap);
 }
