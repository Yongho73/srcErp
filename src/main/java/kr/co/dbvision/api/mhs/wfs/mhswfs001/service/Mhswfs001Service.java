package kr.co.dbvision.api.mhs.wfs.mhswfs001.service;

import java.util.List;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 학자금신청관리에 관한 서비스 인터페이스 클래스
 *
 * @author 디비비전
 * @since 2020.07.30
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.07.30)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.07.30          디비비전              최초 생성
 * </pre>
 */

public interface Mhswfs001Service {
     /**
      * 학자금신청 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchMhswfs001(EgovMapForNull paramMap);
     /**
      * 학자금신청 조회 목록을 엑셀용으로 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public List<EgovMapForNull> searchMhswfs001ForExcel(EgovMapForNull paramMap);
     /**
      * 학자금신청 상세내용을 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject findMhswfs001(EgovMapForNull paramMap);
     /**
      * 학자금신청 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject saveMhswfs001(EgovMapForNull paramMap) throws Exceptions;
 }
