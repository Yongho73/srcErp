package kr.co.dbvision.lib.ui.cmm.emp.service;

import kr.co.dbvision.lib.EgovMapForNull;
import net.sf.json.JSONObject;

/**
 * 부서팝업에 관한 서비스 인터페이스
 *
 * @author 디비비전
 * @since 2019.05.21
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2019.05.21          디비비전              최초 생성
 *
 * </pre>
 */

public interface EmpService {
     /**
      * 사원팝업 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchMhsEmp(EgovMapForNull paramMap);
     
     /**
      * 사원팝업 목록을 조회한다.(부서별)
      * @param paramMap
      * @return
      */
     public JSONObject searchDeptMhsEmp(EgovMapForNull paramMap);
     public JSONObject searchOrgnztEmp(EgovMapForNull paramMap);
   
 }
