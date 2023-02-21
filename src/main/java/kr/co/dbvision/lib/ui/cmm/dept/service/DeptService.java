package kr.co.dbvision.lib.ui.cmm.dept.service;

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

public interface DeptService {
     /**
      * 부서팝업 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchMhsDept(EgovMapForNull paramMap);
     //부서조직 목록을 조회한다.
     public JSONObject searchTreeDept(EgovMapForNull paramMap);
     
     /**
      * 부서코드 내역을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchMhsDeptCode(EgovMapForNull paramMap);
     
     /**
      * 직급팝업 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchMhsClsf(EgovMapForNull paramMap);
   
 }
