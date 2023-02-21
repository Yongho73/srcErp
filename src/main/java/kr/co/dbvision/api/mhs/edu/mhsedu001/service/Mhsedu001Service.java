package kr.co.dbvision.api.mhs.edu.mhsedu001.service;

import java.util.List;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 교육과정등록관리에 관한 서비스 인터페이스 클래스
 *
 * @author 디비비전
 * @since 2020.08.19
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.08.19)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.08.19          디비비전              최초 생성
 * </pre>
 */

public interface Mhsedu001Service {
     /**
      * 교육과정등록 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchMhsedu001(EgovMapForNull paramMap);
     
     public JSONObject searchMhseduTime(EgovMapForNull paramMap);
     
     public JSONObject searchMhseduEmp(EgovMapForNull paramMap);
     
     public JSONObject searchMhseduPopList(EgovMapForNull paramMap);
     /**
      * 교육과정등록 조회 목록을 엑셀용으로 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public List<EgovMapForNull> searchMhsedu001ForExcel(EgovMapForNull paramMap);
     /**
      * 교육과정등록 상세내용을 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject findMhsedu001(EgovMapForNull paramMap);
     /**
      * 교육과정등록 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject saveMhsedu001(EgovMapForNull paramMap) throws Exceptions;
     
     public JSONObject saveMhseduTime(EgovMapForNull paramMap);
     
     public JSONObject saveMhseduEmp(EgovMapForNull paramMap);
     
     public JSONObject saveCopyMhsedu(EgovMapForNull paramMap) throws Exceptions;
     
 }
