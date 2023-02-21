package kr.co.dbvision.api.mps.bsc.mpsbsc009.service;

import java.util.List;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 연봉계약관리관리에 관한 서비스 인터페이스 클래스
 *
 * @author 디비비전
 * @since 2020.06.11
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.06.11          디비비전              최초 생성
 * </pre>
 */

public interface Mpsbsc009Service {
     /**
      * 연봉계약 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchMpsbsc009(EgovMapForNull paramMap);
     /**
      * 연봉계약 조회 목록을 엑셀용으로 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public List<EgovMapForNull> searchMpsbsc009ForExcel(EgovMapForNull paramMap);
     /**
      * 연봉계약 상세내용을 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject findMpsbsc009(EgovMapForNull paramMap);
     /**
      * 연봉계약 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject saveMpsbsc009(EgovMapForNull paramMap);
     
          
     public JSONObject searchMpsbsc009Master(EgovMapForNull paramMap);
     
     
     
 }
