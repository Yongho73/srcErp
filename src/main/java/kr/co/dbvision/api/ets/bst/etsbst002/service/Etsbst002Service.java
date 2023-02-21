package kr.co.dbvision.api.ets.bst.etsbst002.service;

import java.util.List;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 문서번호관리관리에 관한 서비스 인터페이스 클래스
 *
 * @author 디비비전
 * @since 2020.03.27
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.03.27          디비비전              최초 생성
 * </pre>
 */

public interface Etsbst002Service {
     /**
      * 문서번호관리 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchEtsbst002(EgovMapForNull paramMap);
     /**
      * 문서번호관리 조회 목록을 엑셀용으로 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public List<EgovMapForNull> searchEtsbst002ForExcel(EgovMapForNull paramMap);
     /**
      * 문서번호관리 상세내용을 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject findEtsbst002(EgovMapForNull paramMap);
     /**
      * 문서번호관리 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject saveEtsbst002(EgovMapForNull paramMap);
     /**
      * 문서번호관리 정보를 삭제한다.
      * @param paramMap
      * @throws Exceptions
      */
     public JSONObject removeEtsbst002(EgovMapForNull paramMap);
     /**
      * 문서번호관리번호 가져오기
      * @return
      */
     public JSONObject getNoSettingNoEtsfmg000();
 }
