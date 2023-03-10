package kr.co.dbvision.lib;

import java.io.FileInputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFDateUtil;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.DateUtil;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

public class ExcelFileReadMng {

	/**
	 * EXCEL파일 읽기(xls type)
	 * 
	 * filePath : 파일명
	 * colRef   : 컬럼명
	 */

	public List excelXlsRead(String filePath,String colRef[]) throws IOException {
		// 파일을 읽기위해 엑셀파일을 가져온다
		List ret = new ArrayList();
		Map map = null;
		
		FileInputStream fis = new FileInputStream(filePath);
		HSSFWorkbook workbook = new HSSFWorkbook(fis);
		int rowindex = 0;
		int columnindex = 0;
		// 시트 수 (첫번째에만 존재하므로 0을 준다)
		// 만약 각 시트를 읽기위해서는 FOR문을 한번더 돌려준다
		HSSFSheet sheet = workbook.getSheetAt(0);
		// 행의 수
		int rows = sheet.getPhysicalNumberOfRows();
		for (rowindex = 1; rowindex < rows; rowindex++) {
			// 행을 읽는다
			HSSFRow row = sheet.getRow(rowindex);
			if (row != null) {
				// 초기화
				map = new HashMap<String, Object>();
				
				for (columnindex = 0; columnindex < colRef.length; columnindex++) {

					// 셀값을 읽는다
					HSSFCell cell = row.getCell(columnindex);
					String value = "";
					// 셀이 빈값일경우를 위한 널체크
					if (cell == null) {
						continue;
					} else {
						// 타입별로 내용 읽기
						switch (cell.getCellType()) {
						case HSSFCell.CELL_TYPE_FORMULA:
							value = cell.getCellFormula();
							break;
						case HSSFCell.CELL_TYPE_NUMERIC:
							value = (long)cell.getNumericCellValue() + "";
							break;
						case HSSFCell.CELL_TYPE_STRING:
							value = cell.getStringCellValue() + "";
							break;
						case HSSFCell.CELL_TYPE_BLANK:
							value = cell.getBooleanCellValue() + "";
							break;
						case HSSFCell.CELL_TYPE_ERROR:
							value = cell.getErrorCellValue() + "";
							break;
						}
					}
					map.put(colRef[columnindex], value);
				}
				ret.add(map);			
			}
			
		}
		
		return ret;
	}
	/*
	 * xls파일 읽기
	 * filePath : 파일명
	 * colRef   : 컬럼명
	 */
	public List excelXlsxRead(String filePath, String colRef[]) throws IOException {

		// 파일을 읽기위해 엑셀파일을 가져온다
		List ret = new ArrayList();
		Map map = null;
		
		FileInputStream fis = new FileInputStream(filePath);
		XSSFWorkbook workbook = new XSSFWorkbook(fis);
		int rowindex = 0;
		int columnindex = 0;
		// 시트 수 (첫번째에만 존재하므로 0을 준다)
		// 만약 각 시트를 읽기위해서는 FOR문을 한번더 돌려준다
		XSSFSheet sheet = workbook.getSheetAt(0);
		// 행의 수
		int rows = sheet.getPhysicalNumberOfRows();
		
		for (rowindex = 1; rowindex < rows; rowindex++) {
			// 행을읽는다
			XSSFRow row = sheet.getRow(rowindex);
			
			if (row != null) {
				// 셀의 수
				int cells = row.getPhysicalNumberOfCells();
				
				// 초기화
				map = new HashMap<String, Object>();
				
							
				for (columnindex = 0; columnindex < colRef.length; columnindex++) {
										
					// 셀값을 읽는다
					XSSFCell cell = row.getCell(columnindex);
					String value = "";
					// 셀이 빈값일경우를 위한 널체크
					if (cell == null) {
						continue;
					} else {
						// 타입별로 내용 읽기
						switch (cell.getCellType()) {
						case XSSFCell.CELL_TYPE_FORMULA:
							value = cell.getCellFormula();
							break;
						case XSSFCell.CELL_TYPE_NUMERIC:
							value = (long)cell.getNumericCellValue() + "";
							break;
						case XSSFCell.CELL_TYPE_STRING:
							value = cell.getStringCellValue() + "";
							break;
						case XSSFCell.CELL_TYPE_BLANK:
							value = cell.getBooleanCellValue() + "";
							break;
						case XSSFCell.CELL_TYPE_ERROR:
							value = cell.getErrorCellValue() + "";
							break;
						}
					}
					
					map.put(colRef[columnindex], value);
				}
				
				ret.add(map);		
			}			
		}
		
		return ret;
	}
	/*
	 * xls파일 읽기
	 * filePath : 파일명
	 * colRef   : 컬럼명
	 * rowNum   : 첫번째 읽은 row num
	 */
	public static List excelXlsRead(String filePath,String colRef[], int rowNum) throws IOException {

		// 파일을 읽기위해 엑셀파일을 가져온다
		List ret = new ArrayList();
		Map map = null;
		
		FileInputStream fis = new FileInputStream(filePath);
		HSSFWorkbook workbook = new HSSFWorkbook(fis);
		int rowindex = 0;
		int columnindex = 0;
		// 시트 수 (첫번째에만 존재하므로 0을 준다)
		// 만약 각 시트를 읽기위해서는 FOR문을 한번더 돌려준다
		HSSFSheet sheet = workbook.getSheetAt(0);
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
		// 행의 수
		int rows = sheet.getPhysicalNumberOfRows();
		for (rowindex = rowNum; rowindex < rows; rowindex++) {
			// 행을 읽는다
			HSSFRow row = sheet.getRow(rowindex);
			if (row != null) {
				// 셀의 수
				int cells = row.getPhysicalNumberOfCells();
				// 초기화
				map = new HashMap<String, Object>();
				
				for (columnindex = 0; columnindex < colRef.length; columnindex++) {

					// 셀값을 읽는다
					HSSFCell cell = row.getCell(columnindex);
					String value = "";
					// 셀이 빈값일경우를 위한 널체크
					if (cell == null) {
						continue;
					} else {
						// 타입별로 내용 읽기
						switch (cell.getCellType()) {
						case HSSFCell.CELL_TYPE_FORMULA:
							value = cell.getCellFormula();
							break;
						case HSSFCell.CELL_TYPE_NUMERIC:
							value = (long)cell.getNumericCellValue() + "";
							break;
						case HSSFCell.CELL_TYPE_STRING:
							value = cell.getStringCellValue() + "";
							break;
						case HSSFCell.CELL_TYPE_BLANK:
							value = "";
							break;
						case HSSFCell.CELL_TYPE_ERROR:
							value = cell.getErrorCellValue() + "";
							break;
						}
					}
					if(HSSFDateUtil.isInternalDateFormat(cell.getCellStyle().getDataFormat())){
						value = sdf.format(cell.getDateCellValue());
					}
					map.put(colRef[columnindex], value);
				}
				ret.add(map);			
			}
			
		}
		
		return ret;
	}
	/*
	 * xls파일 읽기
	 * filePath : 파일명
	 * colRef   : 컬럼명
	 * rowNum   : 첫번째 읽은 row num
	 */
	public static List excelXlsxRead(String filePath, String colRef[], int rowNum) throws IOException {

		// 파일을 읽기위해 엑셀파일을 가져온다
		List ret = new ArrayList();
		Map map = null;
		
		FileInputStream fis = new FileInputStream(filePath);
		XSSFWorkbook workbook = new XSSFWorkbook(fis);
		int rowindex = 0;
		int columnindex = 0;
		// 시트 수 (첫번째에만 존재하므로 0을 준다)
		// 만약 각 시트를 읽기위해서는 FOR문을 한번더 돌려준다
		XSSFSheet sheet = workbook.getSheetAt(0);
		// 행의 수
		int rows = sheet.getPhysicalNumberOfRows();
		for (rowindex = rowNum; rowindex < rows; rowindex++) {
			// 행을읽는다
			XSSFRow row = sheet.getRow(rowindex);
			if (row != null) {
				
				// 초기화
				map = new HashMap<String, Object>();
				
						
				for (columnindex = 0; columnindex < colRef.length; columnindex++) {
										
					// 셀값을 읽는다
					XSSFCell cell = row.getCell(columnindex);
					String value = "";
					// 셀이 빈값일경우를 위한 널체크
					if (cell == null) {
						continue;
					} else {
						// 타입별로 내용 읽기
						switch (cell.getCellType()) {
						case XSSFCell.CELL_TYPE_FORMULA:
							value = cell.getCellFormula();
							break;
						case XSSFCell.CELL_TYPE_NUMERIC:
							value = (double)cell.getNumericCellValue() + "";
							if(DateUtil.isCellDateFormatted(cell)){ //날짜데이터 포멧설정
								Date date = cell.getDateCellValue();
								value = new SimpleDateFormat("yyyy-MM-dd kk:mm").format(date);
							}else{
								value = String.valueOf(cell.getNumericCellValue());
								if(value.equals("0.0")) value = "0";
							}
							break;
						case XSSFCell.CELL_TYPE_STRING:
							value = cell.getStringCellValue() + "";
							break;
						case XSSFCell.CELL_TYPE_BLANK:
													
							value = "";
							break;
						case XSSFCell.CELL_TYPE_ERROR:
							value = cell.getErrorCellValue() + "";
							break;
						}
						
					}
					map.put(colRef[columnindex], value);
				}
				ret.add(map);		
			}			
		}		
		return ret;
	}
}