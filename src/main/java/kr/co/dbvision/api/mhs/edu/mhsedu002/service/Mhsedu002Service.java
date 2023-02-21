package kr.co.dbvision.api.mhs.edu.mhsedu002.service;

import java.util.List;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 교육신청관리관리에 관한 서비스 인터페이스 클래스
 *
 * @author 디비비전
 * @since 2020.09.02
 * @version 1.0
 * @sourceGen version 2020.08.06.01 (2020.09.02)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.09.02          디비비전              최초 생성
 * </pre>
 */

public interface Mhsedu002Service {
     /**
      * 교육신청 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchMhsedu002(EgovMapForNull paramMap);
     
     public JSONObject searchMhseduTime(EgovMapForNull paramMap);

     public JSONObject searchMhseduEmp(EgovMapForNull paramMap);
     /**
      * 교육신청 조회 목록을 엑셀용으로 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public List<EgovMapForNull> searchMhsedu002ForExcel(EgovMapForNull paramMap);
     /**
      * 교육신청 상세내용을 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject findMhsedu002(EgovMapForNull paramMap);
     /**
      * 교육신청 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject saveMhsedu002(EgovMapForNull paramMap) throws Exceptions;
     /**
      * 교육신청 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject saveMhseduEmp(EgovMapForNull paramMap) throws Exceptions;
     public JSONObject saveMhseduTime(EgovMapForNull paramMap) throws Exceptions;
     public JSONObject saveMhseduResn(EgovMapForNull paramMap) throws Exceptions;

	public JSONObject saveMhseduReqst(EgovMapForNull paramMap) throws Exceptions;
 }
