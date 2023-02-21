package kr.co.dbvision.api.ets.fmg.etsfmg000.service;

import java.util.List;

import kr.co.dbvision.api.ets.fmg.etsfmg000.entity.Etsfmg000;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 양식관리관리에 관한 서비스 인터페이스 클래스
 *
 * @author 디비비전
 * @since 2021.03.18
 * @version 1.0
 * @sourceGen version 2021.02.18.01 (2021.03.18)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2021.03.18          디비비전              최초 생성
 * </pre>
 */

public interface Etsfmg000Service {
     /**
      * 양식 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchEtsfmg000(Etsfmg000 entity) throws Exceptions;     
     /**
      * 양식 상세내용을 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject findEtsfmg000(Etsfmg000 entity) throws Exceptions;
     /**
      * 양식 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject saveEtsfmg000(List<Etsfmg000> entitys) throws Exceptions;
     /**
      * 양식 조회 목록을 엑셀용으로 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public List<EgovMapForNull> searchEtsfmg000ForExcel(EgovMapForNull paramMap) throws Exceptions;
 }
