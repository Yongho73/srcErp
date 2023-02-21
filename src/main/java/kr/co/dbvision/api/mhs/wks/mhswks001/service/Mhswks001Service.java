package kr.co.dbvision.api.mhs.wks.mhswks001.service;

import java.util.List;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 근태기준설정(근태관리)관리에 관한 서비스 인터페이스 클래스
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

public interface Mhswks001Service {
     /**
      * 근태기준설정(근태) 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchMhswks001(EgovMapForNull paramMap);
     /**
      * 근태기준설정(근태) 조회 목록을 엑셀용으로 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public List<EgovMapForNull> searchMhswks001ForExcel(EgovMapForNull paramMap);
     /**
      * 근태기준설정(근태) 상세내용을 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject findMhswks001(EgovMapForNull paramMap);
     /**
      * 근태기준설정(근태) 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject saveMhswks001(EgovMapForNull paramMap);
 }
