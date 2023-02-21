package kr.co.dbvision.api.pjt.mta.pjtmta003.web;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springmodules.validation.commons.DefaultBeanValidator;

import kr.co.dbvision.api.mhs.hrm.mhshrm006.entity.Mhshrm006;
import kr.co.dbvision.api.pjt.mta.pjtmta003.entity.Pjtmta003;
import kr.co.dbvision.api.pjt.mta.pjtmta003.service.Pjtmta003Service;
import kr.co.dbvision.api.stm.mng.stmmng011.entity.Stmmng011;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.ExcelFileMng;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringUtil;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 유지보수요청관리에 관한 웹화면 이벤트 클래스
 *
 * @author 디비비전
 * @since 2019.05.09
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
 *
 * </pre>
 */

@SuppressWarnings("unchecked")
@Controller
@RequestMapping(value="pjtmta003")
public class Pjtmta003Controller {

    @Resource(name="Pjtmta003Service")
    public Pjtmta003Service service;
    
    @Resource(name="beanValidator")
    protected DefaultBeanValidator beanValidator;
    
    private JsonMsgMng jsonMsgMng;

    public Pjtmta003Controller() {
        jsonMsgMng = new JsonMsgMng();
    }
    /**
     * 유지보수 프로젝트 목록 조회
     * @param request
     * @param response
     * @return
     */
    @RequestMapping(value="searchPjtmta003Project", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject searchPjtmta003Project(HttpServletRequest request, HttpServletResponse response) {
        try {
            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            return service.searchPjtmta003Project(paramMap);
        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    
    /**
     * 유지보수 월간보고 조회
     * @param request
     * @param response
     * @return
     */
    @RequestMapping(value="searchPjtmta003", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject searchPjtmta003(HttpServletRequest request, HttpServletResponse response) {
        try {
            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            return service.searchPjtmta003(paramMap);
        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    /**
     * 유지보수 완료요청 목록 조회
     * @param request
     * @param response
     * @return
     */
    @RequestMapping(value="searchPjtmta003Request", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject searchPjtmta003Request(HttpServletRequest request, HttpServletResponse response) {
        try {
            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            return service.searchPjtmta003Request(paramMap);
        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
   
    /**
     * 출력여부 저장
     * @param entity
     * @param bindingResult
     * @param request
     * @param response
     * @return
     */
    @RequestMapping(value="savePjtmta003", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject savePjtmta003(@ModelAttribute Mhshrm006 entity, BindingResult bindingResult, HttpServletRequest request, HttpServletResponse response) {
        try {
            beanValidator.validate(entity, bindingResult);
            if (bindingResult.hasErrors()) {
                return new JsonMsgMng().makeValidationFailJsonObject(bindingResult.getAllErrors());
            } else {
                EgovMapForNull paramMap = StringUtil.requestToMap(request);
                return service.savePjtmta003(paramMap);
            }
        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    
    /**
     * 신규 월간보고 프로젝트, 거래처 조회
     * @param request
     * @param response
     * @return
     * @throws Exceptions
     */
    @RequestMapping(value="popupPjtmta003", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject popupPjtmta003(HttpServletRequest request, HttpServletResponse response) throws Exceptions {
        try {
            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            return service.popupPjtmta003(paramMap);
        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    
    /**
     * 등록 월간보고 조회
     * @param request
     * @param response
     * @return
     * @throws Exceptions
     */
    @RequestMapping(value="findPjtmta003", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject findPjtmta003(HttpServletRequest request, HttpServletResponse response) throws Exceptions {
        try {
            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            return service.findPjtmta003(paramMap);
        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    /**
     * 월간보고 중복확인
     * @param request
     * @param response
     * @return
     * @throws Exceptions
     */
    @RequestMapping(value="findPjtmta003Report", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject findPjtmta003Report(HttpServletRequest request, HttpServletResponse response) throws Exceptions {
        try {
            EgovMapForNull paramMap = StringUtil.requestToMap(request);
                    return service.findPjtmta003Report(paramMap);
        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    /**
     * 유지보수 월간보고 저장
     * @param entity
     * @param bindingResult
     * @param request
     * @param response
     * @return
     */
    @RequestMapping(value="savePjtMtaReport", method=RequestMethod.POST)
    @ResponseBody
    public JSONObject savePjtMtaReport(@ModelAttribute Pjtmta003 entity, BindingResult bindingResult, HttpServletRequest request, HttpServletResponse response) {

        beanValidator.validate(entity, bindingResult);
        if (bindingResult.hasErrors()) {
            return new JsonMsgMng().makeValidationFailJsonObject(bindingResult.getAllErrors());
        } else {
            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            return service.savePjtMtaReport(paramMap);
        }
    }

    /**
     * 유지보수 보고년월기준 미처리 요청건 카운트
     * @param request
     * @param response
     * @return
     */
    @RequestMapping(value="searchPjtmta003Requst", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject searchPjtmta003Requst(HttpServletRequest request, HttpServletResponse response) {
        try {
            EgovMapForNull paramMap = StringUtil.requestToMap(request);
            return service.searchPjtmta003Requst(paramMap);
        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    
    /**
     * 월간보고 PDF 파일을 생성, 서버에 업로드한다/PDF 파일 정보를 받아온다.
     * @param request
     * @param response
     * @return
     * @throws Exceptions
     */
    @RequestMapping(value="pdfPjtMtaOpert", method=RequestMethod.GET)
    @ResponseBody
    public JSONObject pdfPjtMtaOpert(HttpServletRequest request, HttpServletResponse response) throws Exceptions {
        try {
            EgovMapForNull paramMap = StringUtil.requestToMap(request);                        
            return jsonMsgMng.makeJsonObject(service.pdfDownload(paramMap));            
        } catch (Exception e) {
        	return jsonMsgMng.makeJsonObject(e);
        }
    }   
    
}
