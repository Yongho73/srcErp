package kr.co.dbvision.api.mhs.hrm.mhshrm008.service;

import java.util.List;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 부서팝업에 관한 서비스 인터페이스
 *
 * @author 디비비전
 * @since 2019.06.03
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2019.06.03          디비비전              최초 생성
 *
 * </pre>
 */

public interface Mhshrm008Service {
     /**
      * 부서팝업 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchMhsDept(EgovMapForNull paramMap);
     /**
      * 부서팝업 조회 목록을 엑셀용으로 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public List<EgovMapForNull> searchMhsDeptForExcel(EgovMapForNull paramMap);
     /**
      * 부서팝업 상세내용을 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject findMhsDept(EgovMapForNull paramMap);
     /**
      * 부서팝업 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject saveMhsDept(EgovMapForNull paramMap);
     /**
      * 부서팝업 정보를 수정한다.
      * @param paramMap
      * @throws Exceptions
      */
     public JSONObject modifyMhsDept(EgovMapForNull paramMap);
     /**
      * 부서팝업 정보를 삭제한다.
      * @param paramMap
      * @throws Exceptions
      */
     public JSONObject removeMhsDept(EgovMapForNull paramMap);
 }
