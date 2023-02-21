package kr.co.dbvision.api.mps.bsc.mpsbsc012.service;

import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartHttpServletRequest;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 근로소득 간이세액표관리에 관한 서비스 인터페이스 클래스
 *
 * @author 디비비전
 * @since 2020.04.03
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.04.03          디비비전              최초 생성
 * </pre>
 */

public interface Mpsbsc012Service {
     /**
      * 근로소득 간이세액표 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchMpsbsc012(EgovMapForNull paramMap);
     /**
      * 근로소득 간이세액표 조회 목록을 엑셀용으로 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public List<EgovMapForNull> searchMpsbsc012ForExcel(EgovMapForNull paramMap);
     /**
      * 근로소득 간이세액표 상세내용을 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject findMpsbsc012(EgovMapForNull paramMap);
     /**
      * 근로소득 간이세액표 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject saveMpsbsc012(EgovMapForNull paramMap);
     /**
      * 근로소득 간이세액표 정보를 삭제한다.
      * @param paramMap
      * @throws Exceptions
      */
     public JSONObject removeMpsbsc012(EgovMapForNull paramMap);
     
     public JSONObject readExcelSample(EgovMapForNull paramMap);
     
     public JSONObject saveCopyApplcYy(EgovMapForNull paramMap);
 }
