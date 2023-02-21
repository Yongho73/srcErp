package kr.co.dbvision.lib.ui.cmm.file.service.impl;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import egovframework.rte.fdl.idgnr.EgovIdGnrService;
import kr.co.dbvision.lib.DateExpression;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.ExcelFileReadMng;
import kr.co.dbvision.lib.GlobalProperties;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.SessionMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.WebSecurity;
import kr.co.dbvision.lib.exception.Exceptions;
import kr.co.dbvision.lib.ui.cmm.file.entity.FileAtch;
import kr.co.dbvision.lib.ui.cmm.file.service.FileUpService;
import kr.co.dbvision.lib.ui.cmm.file.service.mapper.FileUpdownMapper;
import net.sf.json.JSONObject;
 
/**
 * 파일 업로드 기능에 관한 구현 클래스
 *
 * @author  표준프레임워크센터
 * @since 2014.01.24
 * @version 1.0
 * @see <pre>
 *  == 개정이력(Modification Information) ==
 *
 *          수정일          수정자           수정내용
 *  ----------------    ------------    ---------------------------
 *   2014.01.24        표준프레임워크센터          최초 생성
 *
 * </pre>
 */
@Service("FileUpService")
@Transactional
public class FileUpServiceImpl extends EgovAbstractServiceImpl implements FileUpService {

	Logger logger = LogManager.getLogger(FileUpServiceImpl.class);
	
	@Resource(name="FileUpdownMapper")
	private FileUpdownMapper fileUpdownMapper;
	
	@Resource(name="FileIdGnrService")
    private EgovIdGnrService fileId;
	
    public FileUpServiceImpl() {
    	//
    }

	@Override
	public List<FileAtch> registerFileInfs(Map<String, MultipartFile> fileMap) throws Exceptions {
		
		try {
			
			Map<String, Object> sessionMap = (Map<String, Object>) SessionMng.getCommonSession();
			String userId = StringExpression.nullConvert(sessionMap.get("userId"));			
			
			if (!fileMap.isEmpty()) {

				Iterator<Entry<String, MultipartFile>> itr = fileMap.entrySet().iterator();
				List<FileAtch> result = new ArrayList<FileAtch>();
				String storePathString = GlobalProperties.getProperty("Globals.fileStorePath");
				int fileKey = 0;

				MultipartFile file;
				String filePath;
				FileAtch files;
				String orginFileName;
				int index;
				String fileExt;
				String newName;
				File desti;

				while (itr.hasNext()) {

					Entry<String, MultipartFile> entry = itr.next();

					file = entry.getValue();
					orginFileName = file.getOriginalFilename();

					if ("".equals(orginFileName)) {
						continue;
					}

					index = orginFileName.lastIndexOf(".");
					fileExt = orginFileName.substring(index + 1);
					newName = "DBV_" + getTimeStamp() + fileKey;

					long size = file.getSize();

					if (!"".equals(orginFileName)) {
						filePath = storePathString + File.separator + newName;

						desti = new File(WebSecurity.filePathBlackList(filePath));

						if (!desti.exists()) {
							desti.mkdirs();
						}

						file.transferTo(desti);
					}

					files = new FileAtch();
					files.setFileExtsn(fileExt);
					files.setFileStreCours(storePathString);
					files.setFileMg(Long.toString(size));
					files.setOrignlFileNm(orginFileName);
					files.setStreFileNm(newName);
					files.setAtchFileId(fileId.getNextStringId());

					EgovMapForNull paramMap = new EgovMapForNull();

					paramMap.put("fileExtsn", files.getFileExtsn());
					paramMap.put("fileStreCours", files.getFileStreCours());
					paramMap.put("fileMg", files.getFileMg());
					paramMap.put("orignlFileNm", files.getOrignlFileNm());
					paramMap.put("streFileNm", files.getStreFileNm());
					paramMap.put("atchFileId", files.getAtchFileId());
					paramMap.put("regId", userId);
					paramMap.put("uptId", userId);
				
					fileUpdownMapper.insertFileInfo(paramMap);

					result.add(files);
					fileKey++;
				}

				return result;

			} else {

				return new ArrayList<FileAtch>();
			}

		} catch (Exception e) {
			throw new Exceptions(new Throwable(), e);
		}
		
	}

	@Override
	public List<FileAtch> FindFileInfs(FileAtch fvo) throws Exceptions {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void modifyFileInfs(List<?> fvoList) throws Exceptions {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void removeFileInfs(List<?> fvoList) throws Exceptions {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<FileAtch> findImageFileList(FileAtch vo) throws Exceptions {
		// TODO Auto-generated method stub
		return null;
	}
	
	//엑셀파일 업로드
    @Override
    public JSONObject excelUploadList(EgovMapForNull paramMap) {

        try {
            Map<String, Object> sessionMap = (Map<String, Object>) SessionMng.getCommonSession();
            String userId = StringExpression.nullConvert(sessionMap.get("userId")); 
            
            EgovMapForNull mapper =  fileUpdownMapper.selectFileInfo(paramMap);
            String fileCours      = mapper.get("fileCours").toString();      //파일 위치
            String filStoreFileNm = mapper.get("filStoreFileNm").toString(); //파일명
            String fileExt        = mapper.get("fileExt").toString();        //확장자        
            //System.out.println("mapper :0 : " + mapper.get("atchFileId"));
            //System.out.println("mapper :1 : " + mapper.get("fileCours"));
            //System.out.println("mapper :2 : " + mapper.get("filStoreFileNm"));
            //System.out.println("mapper :3 : " + mapper.get("fileExt"));
            
            String filePath = fileCours + "/" + filStoreFileNm;
            
            List resultList = null;

            EgovMapForNull data = null;
            
            //System.out.println("filePath    " + filePath);
            
            // 그리드 컬럼명
            String colRef[] = paramMap.get("colTitle").toString().split("\\|");
            int colRefSize = colRef.length;
            
            String strStartRow = paramMap.get("startRowNum").toString();
            String strMaxRowNum = paramMap.get("maxRowNum").toString();
            if(strStartRow == null || strStartRow.equals("") ) {
                strStartRow = "2";
            }
            if(strMaxRowNum == null || strMaxRowNum.equals("") ) {
                strMaxRowNum = "99999";
            }
            
            int startRow = Integer.parseInt(strStartRow);
            int maxRowNum = Integer.parseInt(strMaxRowNum);
            if(startRow <= 0 ) {
                startRow = 1;
            }
            if(startRow > 1 ) {
                startRow = startRow-1;
            }
            if(maxRowNum <= 0 ) {
                maxRowNum = 99999;
            }
            
            /*System.out.println("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
            System.out.println("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
            System.out.println("startRow : " + startRow);
            System.out.println("maxRowNum : " + maxRowNum);
            
            System.out.println("colRef[0] : " + colRef[0]);
            System.out.println("colRef[1] : " + colRef[1]);
            System.out.println("colRef[2] : " + colRef[2]);
            System.out.println("colRef.length : " + colRefSize);
            System.out.println("startRow : " + startRow);
            System.out.println("maxRowNum : " + maxRowNum);*/
            
            //엑셀파일읽기
            if(fileExt.equals("xls")) resultList = ExcelFileReadMng.excelXlsRead(filePath, colRef, startRow);
            else                      resultList = ExcelFileReadMng.excelXlsxRead(filePath, colRef, startRow);
            
            List<EgovMapForNull> returnMap = new ArrayList<EgovMapForNull>();
            
            for(int i = 0; i < resultList.size();i++) {
                
                HashMap map = (HashMap) resultList.get(i);
                
                data = new EgovMapForNull();
                
                //System.out.println("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
                //System.out.println("colRefSize : " + colRefSize);
                //System.out.println("map.size() : " + map.size());
                if(colRefSize == map.size()) {
                    for(int j = 0; j < colRefSize; j++) {
                        //System.out.println("colRef[j] : " + colRef[j]);
                        //System.out.println("map.get(colRef[j]).toString() : " + map.get(colRef[j]).toString());
                        
                        data.put(colRef[j], map.get(colRef[j]).toString());
                    }
    
                    returnMap.add(data);
                }
                
                if(i == maxRowNum) {
                    break;
                }
            }
            
            //System.out.println("returnMap.size() : " + returnMap.size());
            //System.out.println(returnMap);
            
            return new JsonMsgMng().makeJsonObject(returnMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
	
	private String getTimeStamp() {

		// 문자열로 변환하기 위한 패턴 설정(년도-월-일 시:분:초:초(자정이후 초))
		String pattern = "yyyyMMddhhmmssSSS";

		return DateExpression.getCurrentDate(pattern);
	}
}
