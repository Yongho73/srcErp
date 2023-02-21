package kr.co.dbvision.lib;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.StandardCopyOption;

public class FileMng {
	/**
	 * 폴더생성
	 * 
	 * @param source
	 * @throws Exception
	 */
	public static void folderAdd(String source) throws Exception {
		try {
			String[] locationArr = source.split("/");
			String makeLocation = "";
			for (int i = 0; i < locationArr.length; i++) {
				makeLocation = makeLocation + locationArr[i] + "/";
				File filez = new File(makeLocation);
				filez.mkdir(); // 새로운 폴더 생성
			}
		} catch (Exception ex) {
		}
	}

	public static void mkdirs(String path) {
		File file = new File(path);
		file.mkdirs();
	}

	/**
	 * 파일이름변경
	 * 
	 * @param originalFilePath
	 * @param originalFileName
	 * @param newFilePath
	 * @param newFileName
	 */
	public static void fileRename(String originalFilePath, String originalFileName, String newFilePath,
			String newFileName) throws Exception {
		try {
			File orgName = new File(originalFilePath + "/" + originalFileName);
			File newName = new File(newFilePath + "/" + newFileName);
			orgName.renameTo(newName);
		} catch (Exception ex) {
		}
	}

	/**
	 * 파일이름변경 (폴더변경)
	 * 
	 * @param originalDr
	 * @param newDr
	 */
	public static void fileRenameTo(String originalDr, String newDr) throws Exception {
		try {
			File orgName = new File(originalDr);
			File newName = new File(newDr);
			orgName.renameTo(newName);
		} catch (Exception ex) {
		}
	}	 

	/**
	 * 파일생성
	 * 
	 * @param str1
	 * @param str2
	 * @param str3
	 */
	public static void fileWrite(String str1, String str2, String str3) throws Exception {
		try {
			File file = new File(str1);
			OutputStream out = new FileOutputStream(file);
			out.write(str2.getBytes(str3));
			out.close();
		} catch (Exception ex) {
		}
	}

	public static boolean isFileExist(String path) {
		File file = new File(path);
		return file.exists();
	}

	public static void fileCopy(String originalFilePath, String originalFileName, String newFilePath, String newFileName) {

		long startTime = System.currentTimeMillis();

		File source = new File(originalFilePath + "/" + originalFileName);
		File dest = new File(newFilePath + "/" + newFileName);
		
		int count = 0;
		long totalSize = 0;
		byte[] b = new byte[128];

		FileInputStream in = null;
		FileOutputStream out = null;
		// 성능향상을 위한 버퍼 스트림 사용
		BufferedInputStream bin = null;
		BufferedOutputStream bout = null;
		try {
			in = new FileInputStream(source);
			bin = new BufferedInputStream(in);

			out = new FileOutputStream(dest);
			bout = new BufferedOutputStream(out);
			while ((count = bin.read(b)) != -1) {
				bout.write(b, 0, count);
				totalSize += count;
			}
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		} finally {// 스트림 close 필수
			try {
				if (bout != null) {
					bout.close();
				}
				if (out != null) {
					out.close();
				}
				if (bin != null) {
					bin.close();
				}
				if (in != null) {
					in.close();
				}

			} catch (IOException r) {
				// TODO: handle exception
				System.out.println("close 도중 에러 발생.");
			}
		}
		// 복사 시간 체크
		StringBuffer time = new StringBuffer("소요시간 : ");
		time.append(System.currentTimeMillis() - startTime);
		time.append(",FileSize : " + totalSize);		
	}
}