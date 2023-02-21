package kr.co.dbvision.lib.ui.cmm.file.service;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.exception.Exceptions;
import kr.co.dbvision.lib.ui.cmm.file.entity.FileAtch;


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
public interface FileDownService {
	
	public void fileDownload(FileAtch files, HttpServletRequest request, HttpServletResponse response) throws Exceptions, IOException;

	public EgovMapForNull findFile(FileAtch files) throws Exceptions;

	public List<EgovMapForNull> findFiles(EgovMapForNull paramMap) throws Exceptions;
}
