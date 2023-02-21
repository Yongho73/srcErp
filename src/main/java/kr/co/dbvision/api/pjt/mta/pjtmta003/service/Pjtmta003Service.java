package kr.co.dbvision.api.pjt.mta.pjtmta003.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.exception.Exceptions;
import kr.co.dbvision.lib.ui.cmm.file.entity.FileAtch;
import net.sf.json.JSONObject;

/**
 * 유지보수요청관리에 관한 서비스 인터페이스 클래스
 *
 * @author 디비비전
 * @since 2020.08.06
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.08.06)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.08.06          디비비전              최초 생성
 * </pre>
 */

public interface Pjtmta003Service {
    /**
     * 유지보수 프로젝트 목록 조회
     * @param paramMap
     * @return
     */
    public JSONObject searchPjtmta003Project(EgovMapForNull paramMap);
    /**
     * 유지보수 월간보고 목록을 조회한다.
     * @param paramMap
     * @return
     */
    public JSONObject searchPjtmta003(EgovMapForNull paramMap);
    /**
     * 유지보수 완료요청 목록을 조회한다.
     * @param paramMap
     * @return
     */
    public JSONObject searchPjtmta003Request(EgovMapForNull paramMap);
    /**
     * 출력여부를 저장한다.
     * @param paramMap
     * @return
     * @throws Exceptions
     */
    public JSONObject savePjtmta003(EgovMapForNull paramMap);
    /**
     * 신규 월간보고 프로젝트, 거래처 조회
     * @param paramMap
     * @return
     * @throws Exceptions
     */
    public JSONObject popupPjtmta003(EgovMapForNull paramMap);
    /**
     * 등록된 유지보수 월간보고 상세내용을 조회한다.
     * @param paramMap
     * @return
     * @throws Exceptions
     */
    public JSONObject findPjtmta003(EgovMapForNull paramMap);
    /**
     * 유지보수 월간보고 중복을 확인한다.
     * @param paramMap
     * @return
     */
    public JSONObject findPjtmta003Report(EgovMapForNull paramMap);
    /**
     * 유지보수 월간보고 내용을 저장한다.
     * @param paramMap
     * @return
     */
    public JSONObject savePjtMtaReport(EgovMapForNull paramMap);
    /**
     * 유지보수 미처리 요청건수를 조회한다.
     * @param paramMap
     * @return
     */
    public JSONObject searchPjtmta003Requst(EgovMapForNull paramMap);
    /**
     * 월간보고 PDF 파일을 생성, 서버에 업로드한다/PDF 파일 정보를 받아온다.
     * @param paramMap
     * @return 
     */
    public FileAtch pdfDownload(EgovMapForNull paramMap);
     
 }
