package kr.co.dbvision.api.pjt.pmg.pjtpmg001.service;

import kr.co.dbvision.lib.EgovMapForNull;
import net.sf.json.JSONObject;

/**
 * 프로젝트현황에 관한 서비스 인터페이스
 *
 * @author 디비비전
 * @since 2020.01.14
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.01.14          디비비전              최초 생성
 *
 * </pre>
 */

public interface Pjtpmg001CcpyService {
     
     public JSONObject searchPjtProjectCcpyList(EgovMapForNull paramMap);
     
     public JSONObject findPjtCcpy(EgovMapForNull paramMap);
     
     public JSONObject removePjtCcpy(EgovMapForNull paramMap);
     
     public JSONObject savePjtCcpy(EgovMapForNull paramMap);
     

 }
