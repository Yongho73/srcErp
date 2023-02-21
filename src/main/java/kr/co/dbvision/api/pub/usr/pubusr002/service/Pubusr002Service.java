package kr.co.dbvision.api.pub.usr.pubusr002.service;

import java.util.List;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 개인정보변경신청관리에 관한 서비스 인터페이스 클래스
 *
 * @author 디비비전
 * @since 2021.06.01
 * @version 1.0
 * @sourceGen version 2021.02.18.01 (2021.06.01)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2021.06.01          디비비전              최초 생성
 * </pre>
 */

public interface Pubusr002Service {
	/**
     * 개인정보변경신청 목록을 조회한다.
     * @param paramMap
     * @return
     */
    public JSONObject searchPubusr002(EgovMapForNull paramMap);
    /**
     * 개인정보변경신청 조회 목록을 엑셀용으로 조회한다.
     * @param paramMap
     * @return
     * @throws Exceptions
     */
    public List<EgovMapForNull> searchPubusr002ForExcel(EgovMapForNull paramMap);
    /**
     * 개인정보변경신청 상세내용을 조회한다.
     * @param paramMap
     * @return
     * @throws Exceptions
     */
    public JSONObject findPubusr002(EgovMapForNull paramMap);
    /**
     * tab1의 개인정보변경신청 상세내용을 조회한다.
     * @param paramMap
     * @return
     * @throws Exceptions
     */
    public JSONObject searchPubusr002Tab1(EgovMapForNull paramMap);
    /**
     * 개인정보변경신청 정보를 저장한다.
     * @param paramMap
     * @return
     * @throws Exceptions
     */
    public JSONObject savePubusr002(EgovMapForNull paramMap) throws Exceptions;
    /**
     * 변경전 사용자 정보룰 조회한다.
     * @param paramMap
     * @return
     * @throws Exceptions
     */
    public JSONObject nowUserInfo(EgovMapForNull paramMap);
    /**
     * 개인정보변경신청(기본) 정보를 저장한다.
     * @param paramMap
     * @return
     * @throws Exceptions
     */
    public JSONObject savePubusr002Tab1(EgovMapForNull paramMap);

    /**
     * 패스워드 변경
     * @param paramMap
     * @return
     * @throws Exceptions
     */
    public JSONObject searchUserPassword(EgovMapForNull paramMap);
    //저장
    public JSONObject saveUserPassword(EgovMapForNull paramMap, String menuId, String changeRequstIp);
	JSONObject applyPubusr002(EgovMapForNull paramMap);
    
    
    //개인정보 승인요청
    
 }
