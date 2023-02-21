package kr.co.dbvision.api.stm.bsc.stmbsc006.service;

import java.io.IOException;
import java.util.List;

import kr.co.dbvision.api.stm.bsc.stmbsc006.entity.Stmbsc006;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 자동채번설정관리에 관한 서비스 인터페이스 클래스
 *
 * @author 디비비전
 * @since 2020.02.27
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.02.27          디비비전              최초 생성
 * </pre>
 */

public interface Stmbsc006Service {
     /**
      * 자동채번설정 목록을 조회한다.
      * @param paramMap
      * @return
      */
     public JSONObject searchStmbsc006(EgovMapForNull paramMap) throws Exception;
     /**
      * 자동채번설정 조회 목록을 엑셀용으로 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public List<EgovMapForNull> searchStmbsc006ForExcel(EgovMapForNull paramMap);
     /**
      * 자동채번설정 상세내용을 조회한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject findStmbsc006(EgovMapForNull paramMap);
     /**
      * 자동채번설정 정보를 저장한다.
      * @param paramMap
      * @return
      * @throws Exceptions
      */
     public JSONObject saveStmbsc006(EgovMapForNull paramMap) throws IOException;
     /**
      * 자동채번설정 정보를 삭제한다.
      * @param paramMap
      * @throws Exceptions
      */
     //public JSONObject removeStmbsc006(EgovMapForNull paramMap);
     
     public JSONObject selectStmbsc006TableList(EgovMapForNull paramMap) throws Exceptions;
     
     public JSONObject selectStmbsc006TableColList(EgovMapForNull paramMap) throws Exceptions;
     
     /**
      * MAX 번호 
     * @param paramMap
     * @return
     */
    public JSONObject selectGetNumberStmbsc006(EgovMapForNull paramMap);

     /**
      * 채번규칙에 의한 번호 채번 
     * @param paramMap
     * @return
     */
    public JSONObject selectCreateNumberStmbsc006(EgovMapForNull paramMap);
    public JSONObject getNextValue(Stmbsc006 entity);
	public String searchStmbsc006GetNumberingSn(EgovMapForNull paramSpMap); 

 }
