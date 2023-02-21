package kr.co.dbvision.lib.ui.cmm.file.entity;

import java.util.ArrayList;
import java.util.List;

import kr.co.dbvision.lib.CommonVO;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 파일 업다운로드에 관한 엔티티 클래스
 *
 * @author 디비비전
 * @since 2014.01.24
 * @version 1.0
 * @see
 * 
 *      <pre>
 *  == 개정이력(Modification Information) ==
 *
 *          수정일          수정자           수정내용
 *  ----------------    ------------    ---------------------------
 *   2014.01.24        디비비전          최초 생성
 *
 *      </pre>
 */
public class FileAtch extends CommonVO {

	private String atchFileId;
	private String creatDt;
	private String fileCn;
	private String fileExtsn;
	private String fileMg;
	private String fileStreCours;
	private String orignlFileNm;
	private String streFileNm;

    private List<EgovMapForNull> records = new ArrayList<EgovMapForNull>();

	public void setFileInfo(EgovMapForNull egovMap) {

		this.atchFileId = (String) egovMap.get("atchFileId");
		this.fileStreCours = (String) egovMap.get("fileCours");
		this.streFileNm = (String) egovMap.get("filStoreFileNm");
		this.orignlFileNm = (String) egovMap.get("fileOrgFileNm");
		this.fileMg = (String) egovMap.get("fileSize");
		this.fileExtsn = (String) egovMap.get("fileExt");
	}

	public String getAtchFileId() {
		return atchFileId;
	}

	public void setAtchFileId(String atchFileId) {
		this.atchFileId = atchFileId;
	}

	public String getCreatDt() {
		return creatDt;
	}

	public void setCreatDt(String creatDt) {
		this.creatDt = creatDt;
	}

	public String getFileCn() {
		return fileCn;
	}

	public void setFileCn(String fileCn) {
		this.fileCn = fileCn;
	}

	public String getFileExtsn() {
		return fileExtsn;
	}

	public void setFileExtsn(String fileExtsn) {
		this.fileExtsn = fileExtsn;
	}

	public String getFileMg() {
		return fileMg;
	}

	public void setFileMg(String fileMg) {
		this.fileMg = fileMg;
	}

	public String getFileStreCours() {
		return fileStreCours;
	}

	public void setFileStreCours(String fileStreCours) {
		this.fileStreCours = fileStreCours;
	}

	public String getOrignlFileNm() {
		return orignlFileNm;
	}

	public void setOrignlFileNm(String orignlFileNm) {
		this.orignlFileNm = orignlFileNm;
	}

	public String getStreFileNm() {
		return streFileNm;
	}

	public void setStreFileNm(String streFileNm) {
		this.streFileNm = streFileNm;
	}

    public List<EgovMapForNull> getRecords() {
        return records;
    }

    public void setRecords(List<EgovMapForNull> records) {
        this.records = records;
    }
}
