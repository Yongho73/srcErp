package kr.co.dbvision.api.pjt.mta.pjtmta003.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import egovframework.rte.fdl.idgnr.EgovIdGnrService;
import egovframework.rte.psl.dataaccess.util.EgovMap;
import kr.co.dbvision.api.mhs.hrm.mhshrm009.entity.Mhshrm009;
import kr.co.dbvision.api.pjt.mta.pjtmta003.entity.Pjtmta003;
import kr.co.dbvision.api.pjt.mta.pjtmta003.service.Pjtmta003Service;
import kr.co.dbvision.api.pjt.mta.pjtmta003.service.impl.PdfGemerate.builder.PdfDirector;
import kr.co.dbvision.api.pjt.mta.pjtmta003.service.impl.PdfGemerate.builder.PdfTemplate;
import kr.co.dbvision.api.pjt.mta.pjtmta003.service.mapper.PdfGeneraterMapper;
import kr.co.dbvision.api.pjt.mta.pjtmta003.service.mapper.Pjtmta003Mapper;
import kr.co.dbvision.lib.Debug;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import kr.co.dbvision.lib.ui.cmm.file.entity.FileAtch;
import kr.co.dbvision.lib.ui.cmm.file.service.mapper.FileUpdownMapper;
import net.sf.json.JSONObject;



/**
 * 유지보수요청관리에 관한 서비스 구현 클래스
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
@Service("Pjtmta003Service")
@Transactional
public class Pjtmta003ServiceImpl extends EgovAbstractServiceImpl implements Pjtmta003Service {

    Logger logger = LogManager.getLogger(Pjtmta003ServiceImpl.class);

    @Resource(name="Pjtmta003Mapper")
    private Pjtmta003Mapper pjtmta003Mapper;
    
    @Resource(name="PdfGeneraterMapper")
    private PdfGeneraterMapper pdfGeneraterMapper;
	
	@Resource(name="FileUpdownMapper")
	private FileUpdownMapper fileUpdownMapper;
	
	@Resource(name="FileIdGnrService")
    private EgovIdGnrService egovIdGnrService;

	

    private int listRowNumber = 0; // 넘버링 

    public Pjtmta003ServiceImpl() {
        //
    }
    
    /**
     * 유지보수 프로젝트 조회
     */
    @Override
    public JSONObject searchPjtmta003Project(EgovMapForNull paramMap) {
        try {

            Pjtmta003 entity = new Pjtmta003(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = pjtmta003Mapper.selectPjtmta003ProjectList(paramMap).stream().map(mapper -> {
                    mapper.put("num", listRowNumber++);
                    return mapper;
            }).collect(Collectors.toList());

            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }
    
    /**
     * 월간보고 조회
     */
    @Override
    public JSONObject searchPjtmta003(EgovMapForNull paramMap) {
        try {

            Pjtmta003 entity = new Pjtmta003(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = pjtmta003Mapper.selectPjtmta003List(paramMap).stream().map(mapper -> {
            		mapper.put("num", listRowNumber++);
                    mapper.put("makeBtn1", "<div class='div_title mt0'><button type='button' class='div_title_btn' type='button' style='margin:1.5px; height:21px; font-size:0.73rem'>수정</button></div>");
                    mapper.put("makeBtn2", "<div class='div_title mt0'><button type='button' class='div_title_btn' type='button' style='margin:1.5px; height:21px; font-size:0.73rem'>출력</button></div>");
                    return mapper;
            }).collect(Collectors.toList());

            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }
    
    /**
     * 유지보수 완료요청 조회
     */
    @Override
    public JSONObject searchPjtmta003Request(EgovMapForNull paramMap) {
        try {
    
            Pjtmta003 entity = new Pjtmta003(paramMap);
            listRowNumber = 1;
    
            List<EgovMapForNull> list = pjtmta003Mapper.searchPjtmta003Request(paramMap).stream().map(mapper -> {
                    mapper.put("num", listRowNumber++);
                    return mapper;
            }).collect(Collectors.toList());
    
            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);
    
        } catch (Exception e) {
            throw e;
        }
    }
    
    /**
     * 출력여부 저장
     */
    @Override
    public JSONObject savePjtmta003(EgovMapForNull paramMap) {
    
        try {
    
            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            Pjtmta003 entity = null;
    
            for(String ids : idsArr) {
    
                entity = new Pjtmta003(paramMap, ids);
                pjtmta003Mapper.savePjtmta003(entity);
            }
            //if(false) { throw new Exceptions("Error."); } 
    
            EgovMapForNull returnMap = new EgovMapForNull();
            returnMap.put("code", "000");
            returnMap.put("message", "SUCCESS");
    
            return new JsonMsgMng().makeJsonObject(returnMap);
    
        } catch (Exception e) {
            throw e;
        }
    }

    /**
     * 신규 월간보고 프로젝트, 거래처 조회
     */
    @Override
    public JSONObject popupPjtmta003(EgovMapForNull paramMap) {
        try {

            Pjtmta003 entity = new Pjtmta003(pjtmta003Mapper.popupPjtmta003(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }
    
    /**
     * 등록된 월간보고 조회
     */
    @Override
    public JSONObject findPjtmta003(EgovMapForNull paramMap) {
        try {

            Pjtmta003 entity = new Pjtmta003(pjtmta003Mapper.selectPjtmta003(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }
    
    /**
     * 유지보수 월간보고 중복확인
     */
    @Override
    public JSONObject findPjtmta003Report(EgovMapForNull paramMap) {
        try {

        	Pjtmta003 entity = new Pjtmta003(pjtmta003Mapper.findPjtmta003Report(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }
    
    /**
     * 유지보수 월간보고 저장
     */
    @Override
    public JSONObject savePjtMtaReport(EgovMapForNull paramMap) throws Exceptions {

        try {
            pjtmta003Mapper.insertPjtMtaReport(paramMap);
            if(paramMap.get("newCheck").equals("newReport")) {
                if(paramMap.get("reportStrDt").equals(null)||paramMap.get("reportStrDt").equals("")) {
                	paramMap.put("reportStrDt", ((String) paramMap.get("reportYm")).replaceAll("-","")+"01");
                }
                if(paramMap.get("reportEndDt").equals(null)||paramMap.get("reportEndDt").equals("")) {
                	paramMap.put("reportEndDt", ((String) paramMap.get("reportYm")).replaceAll("-","")+"31");
                }
                pjtmta003Mapper.updatePjtMtaPrint(paramMap);
            }
            
            EgovMapForNull returnMap = new EgovMapForNull();
            returnMap.put("code", "000");
            returnMap.put("message", "SUCCESS");

            return new JsonMsgMng().makeJsonObject(returnMap);

        } catch (Exception e) {
        	throw e;
        }
    }
    
    /**
     * 유지보수 미처리 요청건수를 조회
     */
    @Override
    public JSONObject searchPjtmta003Requst(EgovMapForNull paramMap) {
        try {

        	Pjtmta003 entity = new Pjtmta003(pjtmta003Mapper.searchPjtmta003Requst(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }
    
    /**
     * 월간보고 PDF 파일 생성
     */
    @Override
    public FileAtch pdfDownload(EgovMapForNull paramMap) {
        try {
          
        	EgovMap mapper = new EgovMap();
        	mapper.put("fsvMapper", fileUpdownMapper);
        	mapper.put("pdfMapper", pdfGeneraterMapper);
        	 
        	PdfTemplate pdfTemplate = new PdfTemplate(mapper, egovIdGnrService, paramMap);        	
			PdfDirector director = new PdfDirector( pdfTemplate );
			director.construct();
			return pdfTemplate.getReport();
			
        } catch (Exception e) {
        	throw new Exceptions(new Throwable(), e);
        }
    }
}
