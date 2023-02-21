package kr.co.dbvision.lib.ui.cmm.file.service;

import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.exception.Exceptions;
import kr.co.dbvision.lib.ui.cmm.file.entity.FileAtch;
import net.sf.json.JSONObject;


/**
 * 파일 업로드 다운로드 기능에 관한 서비스 인터페이스
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
public interface FileUpService {
	
	public List<FileAtch> registerFileInfs(Map<String, MultipartFile> fileMap) throws Exceptions;

	public List<FileAtch> FindFileInfs(FileAtch fvo) throws Exceptions;

	public void modifyFileInfs(List<?> fvoList) throws Exceptions;

	public void removeFileInfs(List<?> fvoList) throws Exceptions;

	public List<FileAtch> findImageFileList(FileAtch vo) throws Exceptions;
	
	/**
     * 엑셀파일을 업로드한다.
     * @param paramMap
     * @throws Exceptions
     */
    public JSONObject excelUploadList(EgovMapForNull paramMap);

}
