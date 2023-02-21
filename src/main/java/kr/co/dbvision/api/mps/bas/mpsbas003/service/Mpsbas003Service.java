package kr.co.dbvision.api.mps.bas.mpsbas003.service;

import java.util.List;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 근로소득 간이세액표에 관한 서비스 인터페이스
 *
 * @author 디비비전
 * @since 2019.05.11
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2019.05.11          디비비전              최초 생성
 *
 * </pre>
 */

public interface Mpsbas003Service {
     /**
      * 근로소득 간이세액표 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchMpsSimplctyTaxtbl(EgovMapForNull paramMap);
     /**
      * 근로소득 간이세액표 조회 목록을 엑셀용으로 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public List<EgovMapForNull> searchMpsSimplctyTaxtblForExcel(EgovMapForNull paramMap);
     /**
      * 근로소득 간이세액표 상세내용을 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject findMpsSimplctyTaxtbl(EgovMapForNull paramMap);
     /**
      * 근로소득 간이세액표 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject saveMpsSimplctyTaxtbl(EgovMapForNull paramMap);
     /**
      * 근로소득 간이세액표 정보를 수정한다.
      * @param paramMap
      * @throws Exceptions
      */
     public JSONObject modifyMpsSimplctyTaxtbl(EgovMapForNull paramMap);
     /**
      * 근로소득 간이세액표 정보를 삭제한다.
      * @param paramMap
      * @throws Exceptions
      */
     public JSONObject removeMpsSimplctyTaxtbl(EgovMapForNull paramMap);
     /**
      * 근로소득 간이세액표 엑셀파일을 업로드한다.
      * @param paramMap
      * @throws Exceptions
      */
     public JSONObject excelUploadMpsSimplctyTaxtbl(EgovMapForNull paramMap);
     /**
      * 근로소득 간이세액표 엑셀파일을 업로드한다.
      * @param paramMap
      * @throws Exceptions
      */
     public JSONObject excelUploadMpsSimplctyTaxtbl2(EgovMapForNull paramMap);
 }
