 package kr.co.dbvision.api.mps.bas.mpsbas003.service.impl;
   
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.poi.xslf.usermodel.SlideLayout;
import org.apache.poi.xslf.usermodel.XMLSlideShow;
import org.apache.poi.xslf.usermodel.XSLFSlide;
import org.apache.poi.xslf.usermodel.XSLFSlideLayout;
import org.apache.poi.xslf.usermodel.XSLFSlideMaster;
import org.apache.poi.xslf.usermodel.XSLFTextShape;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.mps.bas.mpsbas003.entity.Mpsbas003;
import kr.co.dbvision.api.mps.bas.mpsbas003.service.Mpsbas003Service;
import kr.co.dbvision.api.mps.bas.mpsbas003.service.mapper.Mpsbas003Mapper;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.ExcelFileReadMng;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.SessionMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import kr.co.dbvision.lib.ui.cmm.file.service.mapper.FileUpdownMapper;
import net.sf.json.JSONObject;




/**
 * 근로소득 간이세액표에 관한 구현 클래스
 *
 * @author 표준프레임워크센터
 * @since 2019.05.11
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2019.05.11          디비비전              최초 생성
 *
 * </pre>
 */
@Service("Mpsbas003Service")
@Transactional
public class Mpsbas003ServiceImpl extends EgovAbstractServiceImpl implements Mpsbas003Service {

    Logger logger = LogManager.getLogger(Mpsbas003ServiceImpl.class);

    @Resource(name="Mpsbas003Mapper")
    private Mpsbas003Mapper Mpsbas003Mapper;
    
    @Resource(name="FileUpdownMapper")
	private FileUpdownMapper fileUpdownMapper;
    
 

    public Mpsbas003ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchMpsSimplctyTaxtbl(EgovMapForNull paramMap) {
        try {

            Mpsbas003 entity = new Mpsbas003(paramMap);
            List<EgovMapForNull> list = Mpsbas003Mapper.selectMpsSimplctyTaxtblList(paramMap);
            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @Override
    public List<EgovMapForNull> searchMpsSimplctyTaxtblForExcel(EgovMapForNull paramMap) {

        return Mpsbas003Mapper.selectMpsSimplctyTaxtblList(paramMap);
    }

    @Override
    public JSONObject findMpsSimplctyTaxtbl(EgovMapForNull paramMap) {
        try {

            Mpsbas003 entity = new Mpsbas003(Mpsbas003Mapper.selectMpsSimplctyTaxtbl(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @Override
    public JSONObject saveMpsSimplctyTaxtbl(EgovMapForNull paramMap) {

        try {

            Mpsbas003Mapper.insertMpsSimplctyTaxtbl(paramMap);
            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @Override
    public JSONObject modifyMpsSimplctyTaxtbl(EgovMapForNull paramMap) {

        try {
            Mpsbas003Mapper.updateMpsSimplctyTaxtbl(paramMap);
            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    
    @Override
    public JSONObject removeMpsSimplctyTaxtbl(EgovMapForNull paramMap) {

        try {

            String applcBeginYms = StringExpression.nullConvert(paramMap.get("applcBeginYms"));
            String[] applcBeginYmArr = applcBeginYms.split("\\,");
            String lwltAmts = StringExpression.nullConvert(paramMap.get("lwltAmts"));
            String[] lwltAmtArr = lwltAmts.split("\\,");
            String uplmtAmts = StringExpression.nullConvert(paramMap.get("uplmtAmts"));
            String[] uplmtAmtArr = uplmtAmts.split("\\,");

            int arrLength = (uplmtAmtArr == null) ? 0 : uplmtAmtArr.length;
            EgovMapForNull mapper = null;

            for (int keyColumnIdx = 0; keyColumnIdx < arrLength; keyColumnIdx++) {

                mapper = new EgovMapForNull();
                mapper.put("applcBeginYm", applcBeginYmArr[keyColumnIdx]);
                mapper.put("lwltAmt", lwltAmtArr[keyColumnIdx]);
                mapper.put("uplmtAmt", uplmtAmtArr[keyColumnIdx]);

                Mpsbas003Mapper.deleteMpsSimplctyTaxtbl(mapper);
            }

            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    //엑셀파일 업로드
    @Override
    public JSONObject excelUploadMpsSimplctyTaxtbl(EgovMapForNull paramMap) {

        try {
        	Map<String, Object> sessionMap = (Map<String, Object>) SessionMng.getCommonSession();
        	String userId = StringExpression.nullConvert(sessionMap.get("userId"));	
			
        	EgovMapForNull mapper =  fileUpdownMapper.selectFileInfo(paramMap);
        	String fileCours      = mapper.get("fileCours").toString();      //파일 위치
        	String filStoreFileNm = mapper.get("filStoreFileNm").toString(); //파일명
        	String fileExt        = mapper.get("fileExt").toString();        //확장자        
        	System.out.println("mapper :0 : " + mapper.get("atchFileId"));
        	System.out.println("mapper :1 : " + mapper.get("fileCours"));
        	System.out.println("mapper :2 : " + mapper.get("filStoreFileNm"));
        	System.out.println("mapper :3:ffff bbbb  aaa " + mapper.get("fileExt"));
        	
        	String filePath = fileCours + "/" + filStoreFileNm;
			
			List resultList = null;

			EgovMapForNull data = null;
			
			System.out.println("filePath    " + filePath);
			// 그리드 컬럼명, 적용 시작 년월, 하한 금액, 상한 금액, 적용 종료 년월, 가족1세액 ~ 가족11세액
			String colRef[] = {"applcBeginYm", "lwltAmt", "uplmtAmt", "applcEndYm", 
					           "family1Tax", "family2Tax", "family3Tax", "family4Tax",
					           "family5Tax", "family6Tax", "family7Tax", "family8Tax",
					           "family9Tax", "family10Tax", "family11Tax"}; 
			
			int startRow = 2;
			
			//엑셀파일읽기
			if(fileExt.equals("xls")) resultList = ExcelFileReadMng.excelXlsRead(filePath, colRef, startRow);
			else                      resultList = ExcelFileReadMng.excelXlsxRead(filePath, colRef, startRow);
			
			for(int i = 0; i < resultList.size();i++) {
				
				HashMap map = (HashMap) resultList.get(i);
				
				data = new EgovMapForNull();
				
				data.put("applcBeginYm", map.get("applcBeginYm").toString().replaceAll(",","").replaceAll("-", ""));
				data.put("lwltAmt",      map.get("lwltAmt").toString().replaceAll(",",""));
				data.put("uplmtAmt",     map.get("uplmtAmt").toString().replaceAll(",",""));
				data.put("applcEndYm",   map.get("applcEndYm").toString().replaceAll(",",""));
				data.put("family1Tax",   map.get("family1Tax").toString().replaceAll(",","").replaceAll("-", ""));
				data.put("family2Tax",   map.get("family2Tax").toString().replaceAll(",",""));
				data.put("family3Tax",   map.get("family3Tax").toString().replaceAll(",",""));
				data.put("family4Tax",   map.get("family4Tax").toString().replaceAll(",",""));
				data.put("family5Tax",   map.get("family5Tax").toString().replaceAll(",",""));
				data.put("family6Tax",   map.get("family6Tax").toString().replaceAll(",",""));
				data.put("family7Tax",   map.get("family7Tax").toString().replaceAll(",",""));
				data.put("family8Tax",   map.get("family8Tax").toString().replaceAll(",",""));
				data.put("family9Tax",   map.get("family9Tax").toString().replaceAll(",",""));
				data.put("family10Tax",  map.get("family10Tax").toString().replaceAll(",",""));
				data.put("family11Tax",  map.get("family11Tax").toString().replaceAll(",",""));
				data.put("uptId",        userId);
				Mpsbas003Mapper.updateMpsSimplctyTaxtbl(data);
			}
			 return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
  //엑셀파일 업로드
    @Override
    public JSONObject excelUploadMpsSimplctyTaxtbl2(EgovMapForNull paramMap) {

        try {
        	Map<String, Object> sessionMap = (Map<String, Object>) SessionMng.getCommonSession();
        	String userId = StringExpression.nullConvert(sessionMap.get("userId"));	
			
        	EgovMapForNull mapper =  fileUpdownMapper.selectFileInfo(paramMap);
        	String fileCours      = mapper.get("fileCours").toString();      //파일 위치
        	String filStoreFileNm = mapper.get("filStoreFileNm").toString(); //파일명
        	String fileExt        = mapper.get("fileExt").toString();        //확장자        
        	System.out.println("mapper :0 : " + mapper.get("atchFileId"));
        	System.out.println("mapper :1 : " + mapper.get("fileCours"));
        	System.out.println("mapper :2 : " + mapper.get("filStoreFileNm"));
        	System.out.println("mapper :3:ffff bbbb  aaa " + mapper.get("fileExt"));
        	
        	String filePath = fileCours + "/" + filStoreFileNm;
			
			List resultList = null;

			EgovMapForNull data = null;
			
			System.out.println("filePath    " + filePath);
			// 그리드 컬럼명, 적용 시작 년월, 하한 금액, 상한 금액, 적용 종료 년월, 가족1세액 ~ 가족11세액
			String colRef[] = {"title"}; 
			
			int startRow = 1;
			System.out.println("filePath    " + filePath);
			System.out.println("filePath    " + fileCours + "/example1.pptx");
			//엑셀파일읽기
			if(fileExt.equals("xls")) resultList = ExcelFileReadMng.excelXlsRead(filePath, colRef, startRow);
			else                      resultList = ExcelFileReadMng.excelXlsxRead(filePath, colRef, startRow);
			System.out.println("filePath    " + filePath);
			String fileName="";
			System.out.println("filePath    " + fileCours + "/example1.pptx");
			File file = new File(fileCours + "/example1.pptx");
			System.out.println("fileCours    " + fileCours);
			FileInputStream inputstream = new FileInputStream(file);

			XMLSlideShow ppt = new XMLSlideShow(inputstream);
			      
			System.out.println("filePath    " + filePath);
			  
			  //adding slides to the slodeshow
			//XSLFSlide slide1 = ppt.createSlide(); 
			XSLFSlide slide2 = ppt.createSlide();
			
			XSLFSlideMaster defaultMaster = ppt.getSlideMasters().get(0);
			
		    // title slide
		    XSLFSlideLayout titleLayout = defaultMaster.getLayout(SlideLayout.TITLE_AND_CONTENT);
		    // fill the placeholders
		    for(int i = 0; i < resultList.size();i++) {
		    	XSLFSlide slide1 = ppt.createSlide(titleLayout);
		    	XSLFTextShape title = slide1.getPlaceholder(0);
		    	HashMap map = (HashMap) resultList.get(i);
				
				title.setText( map.get("title").toString());
		    }
			FileOutputStream out = new FileOutputStream(file);
			ppt.write(out);
			  
			System.out.println("Presentation edited successfully");
			out.close();

			
			/*
			for(int i = 0; i < resultList.size();i++) {
				
				HashMap map = (HashMap) resultList.get(i);
				
				data = new EgovMapForNull();
				
				data.put("applcBeginYm", map.get("applcBeginYm").toString().replaceAll(",","").replaceAll("-", ""));
				data.put("lwltAmt",      map.get("lwltAmt").toString().replaceAll(",",""));
				data.put("uplmtAmt",     map.get("uplmtAmt").toString().replaceAll(",",""));
				data.put("applcEndYm",   map.get("applcEndYm").toString().replaceAll(",",""));
				data.put("family1Tax",   map.get("family1Tax").toString().replaceAll(",","").replaceAll("-", ""));
				data.put("family2Tax",   map.get("family2Tax").toString().replaceAll(",",""));
				data.put("family3Tax",   map.get("family3Tax").toString().replaceAll(",",""));
				data.put("family4Tax",   map.get("family4Tax").toString().replaceAll(",",""));
				data.put("family5Tax",   map.get("family5Tax").toString().replaceAll(",",""));
				data.put("family6Tax",   map.get("family6Tax").toString().replaceAll(",",""));
				data.put("family7Tax",   map.get("family7Tax").toString().replaceAll(",",""));
				data.put("family8Tax",   map.get("family8Tax").toString().replaceAll(",",""));
				data.put("family9Tax",   map.get("family9Tax").toString().replaceAll(",",""));
				data.put("family10Tax",  map.get("family10Tax").toString().replaceAll(",",""));
				data.put("family11Tax",  map.get("family11Tax").toString().replaceAll(",",""));
				data.put("uptId",        userId);
				Mpsbas003Mapper.updateMpsSimplctyTaxtbl(data);
			}*/
			 return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
}
