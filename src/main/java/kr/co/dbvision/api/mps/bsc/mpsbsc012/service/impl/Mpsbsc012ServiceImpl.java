package kr.co.dbvision.api.mps.bsc.mpsbsc012.service.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.mps.bsc.mpsbsc005.entity.Mpsbsc005;
import kr.co.dbvision.api.mps.bsc.mpsbsc012.entity.Mpsbsc012;
import kr.co.dbvision.api.mps.bsc.mpsbsc012.service.Mpsbsc012Service;
import kr.co.dbvision.api.mps.bsc.mpsbsc012.service.mapper.Mpsbsc012Mapper;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.ExcelFileReadMng;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.SessionMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import kr.co.dbvision.lib.ui.cmm.file.service.FileUpService;
import kr.co.dbvision.lib.ui.cmm.file.service.mapper.FileUpdownMapper;
import net.sf.json.JSONObject;

/**
 * 근로소득 간이세액표관리에 관한 서비스 구현 클래스
 *
 * @author 디비비전
 * @since 2020.04.03
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.04.03          디비비전              최초 생성
 * </pre>
 */
@Service("Mpsbsc012Service")
@Transactional
public class Mpsbsc012ServiceImpl extends EgovAbstractServiceImpl implements Mpsbsc012Service {

    Logger logger = LogManager.getLogger(Mpsbsc012ServiceImpl.class);
    
    @Resource(name = "FileUpService")
    private FileUpService fileUpService;
    
    @Resource(name="FileUpdownMapper")
    private FileUpdownMapper fileUpdownMapper;

    @Resource(name="Mpsbsc012Mapper")
    private Mpsbsc012Mapper mpsbsc012Mapper;

    public Mpsbsc012ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchMpsbsc012(EgovMapForNull paramMap) {
        try {

            Mpsbsc012 entity = new Mpsbsc012(paramMap);
            List<EgovMapForNull> list = mpsbsc012Mapper.selectMpsbsc012List(paramMap);
            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public List<EgovMapForNull> searchMpsbsc012ForExcel(EgovMapForNull paramMap) {

        return mpsbsc012Mapper.selectMpsbsc012List(paramMap);
    }

    @Override
    public JSONObject findMpsbsc012(EgovMapForNull paramMap) {
        try {

            Mpsbsc012 entity = new Mpsbsc012(mpsbsc012Mapper.selectMpsbsc012(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }
    
    @Override
    public JSONObject readExcelSample(EgovMapForNull paramMap) {
        try {
            Mpsbsc012 entity = new Mpsbsc012(paramMap);
//            Map<String, Object> sessionMap = (Map<String, Object>) SessionMng.getCommonSession();
//            String userId = StringExpression.nullConvert(sessionMap.get("userId"));
            
            EgovMapForNull mapper =  fileUpdownMapper.selectFileInfo(paramMap);
            
            String fileCours      = mapper.get("fileCours").toString();      //파일 위치
            String filStoreFileNm = mapper.get("filStoreFileNm").toString(); //파일명
            String fileExt        = mapper.get("fileExt").toString();        //확장자
                
            String filePath = fileCours + "/" + filStoreFileNm;
                
                
            List resultList = null;
                
            String colRef[] = {"applcYy","lwltAmt", "uplmtAmt", "fam1Tax", "fam2Tax"
                    , "fam3Tax", "fam4Tax", "fam5Tax", "fam6Tax", "fam7Tax", "fam8Tax", "fam9Tax"
                    , "fam10Tax", "fam11Tax"};
                
            int startRow = 1;
                
            if(fileExt.equals("xls")) resultList = ExcelFileReadMng.excelXlsRead(filePath, colRef, startRow);
            else resultList = ExcelFileReadMng.excelXlsxRead(filePath, colRef, startRow);
            
            entity.setRecords(resultList);
            return new JsonMsgMng().makeJsonObject(entity);
                
        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
        
    }

    @Override
    public JSONObject saveMpsbsc012(EgovMapForNull paramMap) {
        
        try {
            
            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            Mpsbsc012 entity = null;
            
            for(String ids : idsArr) {
                
                entity = new Mpsbsc012(paramMap, ids);

                switch(entity.getNativeeditorStatus()) {
                case "deleted":

//                    mpsbsc005Mapper.deleteMpsbsc005Calc(entity);
//                    mpsbsc005Mapper.deleteMpsbsc005Applcs(entity);
                    break;

                default:
                    
                    mpsbsc012Mapper.saveMpsbsc012(entity);
                    break;
                }
                
            }

            EgovMapForNull returnMap = new EgovMapForNull();
            returnMap.put("code", "000");
            returnMap.put("message", "SUCCESS");
            
            return new JsonMsgMng().makeJsonObject(returnMap);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject removeMpsbsc012(EgovMapForNull paramMap) {

        try {

            Mpsbsc012 entity = null;
            entity = new Mpsbsc012(paramMap);
            
            System.out.println("\n\n\n\n\n"+paramMap+"\n\n\n\n\n");

            mpsbsc012Mapper.deleteMpsbsc012(entity);
            
            EgovMapForNull returnMap = new EgovMapForNull();
            returnMap.put("code", "000");
            returnMap.put("message", "SUCCESS");
            
            return new JsonMsgMng().makeJsonObject(returnMap);

        } catch (Exception e) {
            throw e;
        }
    }
    
    @Override
    public JSONObject saveCopyApplcYy(EgovMapForNull paramMap) {
        try {
            
            //기존 데이터가 있으면 삭제후 저장 
            mpsbsc012Mapper.deleteMpsbsc012(paramMap);
            System.out.println("paramMap : " + paramMap);
            mpsbsc012Mapper.insertCopyApplcYyMpsbsc012(paramMap);

            EgovMapForNull returnMap = new EgovMapForNull();
            returnMap.put("code", "000");
            returnMap.put("message", "SUCCESS");
            
            return new JsonMsgMng().makeJsonObject(returnMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
}
