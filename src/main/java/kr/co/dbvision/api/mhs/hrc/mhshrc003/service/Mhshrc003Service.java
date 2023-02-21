package kr.co.dbvision.api.mhs.hrc.mhshrc003.service;

import java.util.List;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 증명서발급대장관리에 관한 서비스 인터페이스 클래스
 *
 * @author 디비비전
 * @since 2020.08.27
 * @version 1.0
 * @sourceGen version 2020.08.06.01 (2020.08.27)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.08.27          디비비전              최초 생성
 * </pre>
 */

public interface Mhshrc003Service {
     /**
      * 증명서발급대장 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchMhshrc003(EgovMapForNull paramMap);
     /**
      * 증명서발급대장 조회 목록을 엑셀용으로 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public List<EgovMapForNull> searchMhshrc003ForExcel(EgovMapForNull paramMap);
     /**
      * 증명서발급대장 상세내용을 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject findMhshrc003(EgovMapForNull paramMap);
     /**
      * 증명서발급대장 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject saveMhshrc003(EgovMapForNull paramMap) throws Exceptions;
 }
