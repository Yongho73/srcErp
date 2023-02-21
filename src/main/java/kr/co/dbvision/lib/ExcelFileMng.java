package kr.co.dbvision.lib;


import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFDataFormat;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
//import org.apache.poi.hssf.util.CellRangeAddress;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.DataFormat;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.CellRangeAddress;
import org.springframework.stereotype.Component;
//import org.springframework.web.servlet.view.document.AbstractExcelView;
import org.springframework.web.servlet.view.document.AbstractXlsView;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@SuppressWarnings({ "unchecked", "deprecation" })
@Component("excelView")
public class ExcelFileMng extends AbstractXlsView {

	@Override	
	/*protected void buildExcelDocument(
			Map<String, Object> paramMap, HSSFWorkbook workbook, HttpServletRequest request,
			HttpServletResponse response

	)*/
	protected void buildExcelDocument(
			Map<String, Object> paramMap, Workbook workbook, HttpServletRequest request,
            HttpServletResponse response
	) throws Exception {

		// get data model which is passed by the Spring container
		Map<String, Object> excelMap = (Map<String, Object>) paramMap.get("excelMap");

		// file name
		String fileNm = (String) excelMap.get("fileNm") + "_" + DateExpression.getToday() + ".xls";

		Map<String, Object> headers = (Map<String, Object>) excelMap.get("headers");
		Map<String, Object> lengths = (Map<String, Object>) excelMap.get("lengths");
		Map<String, Object> dataIds = (Map<String, Object>) excelMap.get("dataIds");
		Map<String, Object> dataAligns = (Map<String, Object>) excelMap.get("dataAligns");
		Map<String, Object> dataFormats = (Map<String, Object>) excelMap.get("dataFormats");
		Map<String, String> sheetNms = (Map<String, String>) excelMap.get("sheetNms");
		List<Object> rowLists = (List<Object>) excelMap.get("rowLists");
		int rowListsLength = rowLists.size();
		// sheet loop
		for (int k = 0; k < rowListsLength; k++) {

			// create a new Excel sheet
			//HSSFSheet sheet = workbook.createSheet((String) sheetNms.get(Integer.toString(k)));
			Sheet sheet = workbook.createSheet((String) sheetNms.get(Integer.toString(k)));
			sheet.setDefaultColumnWidth(20);

			// create font and style for header cells
			Font hFont = workbook.createFont();
			hFont.setFontName("Arial"); //Arial
			//hFont.setColor(HSSFColor.WHITE.index);
			hFont.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);

			//HSSFCellStyle hStyle = workbook.createCellStyle();
			CellStyle hStyle = workbook.createCellStyle();
		
			HSSFWorkbook hwb = new HSSFWorkbook();
			//org.apache.poi.hssf.usermodel.HSSFPalette palette = workbook.getCustomPalette();
			org.apache.poi.hssf.usermodel.HSSFPalette palette = hwb.getCustomPalette();
			
			HSSFColor myColor = palette.findSimilarColor(157, 207, 255);
			//HSSFColor lineColor = palette.findSimilarColor(139, 189, 255);

			hStyle.setFillForegroundColor(myColor.getIndex());

			hStyle.setFillPattern(HSSFCellStyle.SOLID_FOREGROUND);
			hStyle.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER); //
			hStyle.setAlignment(HSSFCellStyle.ALIGN_CENTER);            // 
			hStyle.setBorderLeft(CellStyle.BORDER_THIN);
			hStyle.setBorderRight(CellStyle.BORDER_THIN);
			hStyle.setBorderTop(CellStyle.BORDER_THIN);
			hStyle.setBorderBottom(CellStyle.BORDER_THIN);
			hStyle.setTopBorderColor(IndexedColors.BLACK.index);
			hStyle.setLeftBorderColor(IndexedColors.BLACK.index);
			hStyle.setRightBorderColor(IndexedColors.BLACK.index);
			hStyle.setBottomBorderColor(IndexedColors.BLACK.index);
			
			String[] hDepth = { "THIN", "THIN", "THIN", "THIN" };
			setBorder(hStyle, hDepth);
			hStyle.setFont(hFont);

			// create font and style for row cells
			Font rFont = workbook.createFont();
			rFont.setFontName("Arial");
			rFont.setColor(HSSFColor.BLACK.index);

			CellStyle rStyle = workbook.createCellStyle(); 
			rStyle.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER); // 
			String[] rDepth = { "THIN", "THIN", "THIN", "THIN" };
			setBorder(rStyle, rDepth);
			rStyle.setFont(rFont);

			// create font and style for footer cells
			Font fFont = workbook.createFont();
			fFont.setFontName("Arial");
			fFont.setColor(HSSFColor.BLACK.index);
			fFont.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);

			CellStyle fStyle = workbook.createCellStyle();
			fStyle.setFillForegroundColor(HSSFColor.PALE_BLUE.index);
			fStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
			fStyle.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER); // 以묒븰 �젙�젹
			fStyle.setAlignment(HSSFCellStyle.ALIGN_RIGHT); // �슦痢� �젙�젹
		
			
			CellStyle numFormat_Style = workbook.createCellStyle();
			//HSSFDataFormat format = workbook.createDataFormat();			
			HSSFDataFormat format = hwb.createDataFormat();
			numFormat_Style.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER); //
			numFormat_Style.setAlignment(HSSFCellStyle.ALIGN_RIGHT); //
			numFormat_Style.setDataFormat(format.getFormat("#,##0"));
			setBorder(numFormat_Style, rDepth);
			numFormat_Style.setFont(rFont);
			
			//날짜타입
			CellStyle dateFormat_Style = workbook.createCellStyle();
			//HSSFDataFormat date_format = workbook.createDataFormat();			
			DataFormat date_format = workbook.createDataFormat();
			dateFormat_Style.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER); //
			dateFormat_Style.setAlignment(HSSFCellStyle.ALIGN_CENTER); //
			dateFormat_Style.setDataFormat(date_format.getFormat("yyyy-MM-dd"));
			setBorder(dateFormat_Style, rDepth);
			dateFormat_Style.setFont(rFont);
			
			
			//numFormat_Style.set
			
			
			//LEFT정렬
			CellStyle cell_lStyle = workbook.createCellStyle();
			cell_lStyle.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER); //
			cell_lStyle.setAlignment(HSSFCellStyle.ALIGN_LEFT); //
			setBorder(cell_lStyle, rDepth);
			cell_lStyle.setFont(rFont);
			
			//CENTER정렬
			CellStyle cell_cStyle = workbook.createCellStyle();
			cell_cStyle.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER); //
			cell_cStyle.setAlignment(HSSFCellStyle.ALIGN_CENTER); //
			setBorder(cell_cStyle, rDepth);
			cell_cStyle.setFont(rFont);
			
			//RIGHT정렬
			CellStyle cell_rStyle = workbook.createCellStyle();
			cell_rStyle.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER); //
			cell_rStyle.setAlignment(HSSFCellStyle.ALIGN_RIGHT); //
			setBorder(cell_rStyle, rDepth);
			cell_rStyle.setFont(rFont);
			
			String[] fDepth = { "THIN", "THIN", "THIN", "THIN" };
			setBorder(fStyle, fDepth);
			fStyle.setFont(fFont);
					
			Map<String, String> headerMap = (Map<String, String>) headers.get(Integer.toString(k));
			Map<String, String> dataIdMap = (Map<String, String>) dataIds.get(Integer.toString(k));
			Map<String, String> dataAlignMap = (Map<String, String>) dataAligns.get(Integer.toString(k));
			Map<String, String> dataFormatMap = (Map<String, String>) dataFormats.get(Integer.toString(k));
		
			int headerMapLength = headerMap.size();

			int header_num      = Integer.parseInt(lengths.get("0").toString());
			int header_col_cnt  = headerMapLength / header_num;
			
			// header 출력
			for (int i = 0; i < header_num; i++) {
				//HSSFRow header = sheet.createRow(i);
				Row header = sheet.createRow(i);
				header.setHeight((short)500);
				for (int s = 0; s < header_col_cnt; s++) {
					int n_idx = i *header_col_cnt + s;		
					header.createCell(s).setCellValue((String) headerMap.get(Integer.toString(n_idx)));
					header.getCell(s).setCellStyle(hStyle);
				}
			}
			sheet.createFreezePane(1, header_num);
			String cellVal = "";

			List<EgovMapForNull> rowList = (List<EgovMapForNull>) rowLists.get(k);
			int rowLength = rowList.size();
			int dataIdMapLength = 0;

			// create data rows
			for (int i = 0; i < rowLength; i++) {

				@SuppressWarnings("rawtypes")
				Map rowMap = rowList.get(i);
				//HSSFRow aRow = sheet.createRow(i + header_num);
				Row aRow = sheet.createRow(i + header_num);
				aRow.setHeight((short)400);
				dataIdMapLength = dataIdMap.size();
				
				// row, footer 
				for (int j = 0; j < dataIdMapLength; j++) {					
					cellVal = StringExpression.nullConvert(rowMap.get(dataIdMap.get(Integer.toString(j))));
					//
					cellVal = cellVal.replace("\n", "");
					cellVal = cellVal.replace("\r", "");
					cellVal = cellVal.replace("\r\n", "");
					cellVal = cellVal.replace(System.getProperty("line.separator"), "");

					aRow.createCell(j).setCellValue(cellVal);

					String sDataAlign = StringExpression.nullConvert( (String) dataAlignMap.get(Integer.toString(j))).toLowerCase();
					
					String sDataFormat = "";
					if(dataFormatMap != null)
						sDataFormat = StringExpression.nullConvert( (String) dataFormatMap.get(Integer.toString(j))).toLowerCase();
					
					//LEFT정렬
					if(sDataAlign.length() == 0 || sDataAlign.contentEquals("left")) {
						aRow.getCell(j).setCellStyle(cell_lStyle);
					} else if(sDataAlign.contentEquals("center")) {  //CENTER정렬
						aRow.getCell(j).setCellStyle(cell_cStyle);
					} else if(sDataAlign.contentEquals("right")) {   //RIGHT정렬
						aRow.getCell(j).setCellStyle(cell_rStyle);
					} else {
						aRow.getCell(j).setCellStyle(cell_lStyle);   //LEFT정렬
					}
					if(sDataFormat != null){
						if(sDataFormat.equals("#,##0")&& aRow.getCell(j).toString().length() > 0) {
							double d = Double.parseDouble(aRow.getCell(j).toString());
							aRow.getCell(j).setCellValue(d);
							aRow.getCell(j).setCellType(Cell.CELL_TYPE_NUMERIC);							
							aRow.getCell(j).setCellStyle(numFormat_Style);
						}
						else if(sDataFormat.toLowerCase().equals("yyyy-mm-dd")) {
                            if(cellVal.length() == 8)      	cellVal = cellVal.substring(0,4) + "-" + cellVal.substring(4,6) + "-" + cellVal.substring(6, 8); 						    
						    aRow.getCell(j).setCellValue(cellVal);
						}
						else if(sDataFormat.toLowerCase().equals("yyyy-mm")) {
                            if(cellVal.length() == 6)       cellVal = cellVal.substring(0,4) + "-" + cellVal.substring(4,6) ;                            
                            aRow.getCell(j).setCellValue(cellVal);
                        }
					}
				}
			}

			//header Col별 Merge처리 
			int idx = 0;
			for (int s = 0; s < header_col_cnt; s++) {	

				for (int i = 0; i < header_num; i++) {
					String hdata1 =  headerMap.get(Integer.toString((i) * header_col_cnt +s));
					
					idx  = 0;
					for (int j = i+1; j < header_num; j++) {
						String hdata2 =  headerMap.get(Integer.toString((j) * header_col_cnt +s));
					
						if(hdata1.contentEquals(hdata2)) 
							idx = j;
					}	
				
					
					if(i != idx && idx != 0) {
					    //                                        s_row, e_row, s_col, e_col 
						sheet.addMergedRegion(new CellRangeAddress(i, idx, s, s));
						if(idx == (header_num-1)) break;
					}
				}
			}
			idx = 0;
			System.out.println("header_num" + header_num);
			int s = 0;
			//header row별 Merge처리
			for (int i = 0; i < header_num; i++) {
			
			    idx = 0;
				for (s = 0; s < header_col_cnt; s++) {	
					String hdata1 =  headerMap.get(Integer.toString((i) * header_col_cnt +s));
				
				//	if(s < idx) break;
					idx = 0;
					for (int j = s+1; j < header_col_cnt; j++) {
						String hdata2 =  headerMap.get(Integer.toString((i) * header_col_cnt +j));
					
						if(hdata1.contentEquals(hdata2))
							idx = j;
						else j=header_col_cnt;
					}
					if(s!= idx && idx != 0) {
					   
                        // s_row, e_row, s_col, e_col 
						sheet.addMergedRegion(new CellRangeAddress(i, i, s, idx));
						//if(idx == (header_col_cnt-1)) break;
						s = idx;
					}
				}
			//	s = 0;
			}
			
			// column width설정
			for (int i = 0; i < headerMapLength; i++) {
				sheet.autoSizeColumn(i);  //AUTO
				sheet.setColumnWidth(i, (sheet.getColumnWidth(i)) + 1000);
			}
		}

		// sheet loop end
		String requestHeader = request.getHeader("User-Agent");

		if (requestHeader.contains("MSIE") || requestHeader.contains("Trident")) {
			fileNm = URLEncoder.encode(fileNm, "UTF-8").replaceAll("\\+", "%20");
		} else {
			fileNm = new String(fileNm.getBytes("UTF-8"), "ISO-8859-1");
		}

		response.setContentType("application/vnd.ms-excel");
		response.setHeader("Content-Disposition", "attachment; fileName=\"" + fileNm + "\";");
		response.flushBuffer();
	}
	
	@SuppressWarnings("unused")
	private boolean isMerged(org.apache.poi.ss.usermodel.Sheet sheet, int rowIdx, int colIdx) {
		for(int i = 0; i < sheet.getNumMergedRegions(); ++i) {
			org.apache.poi.ss.util.CellRangeAddress range = 
					sheet.getMergedRegion(i); 
			String message = String.format("%d - %d - %d - %d", range.getFirstRow(), range.getLastRow(), range.getFirstColumn(), range.getLastColumn());
			System.out.println(message);
			if( rowIdx >= range.getFirstRow() && rowIdx <= range.getLastRow() && colIdx >= range.getFirstColumn() && colIdx <= range.getLastColumn() ) 
			{ 
				return true;
			} 
		} 
		return false; 
	}

	// border
	private void setBorder(CellStyle style, String[] depthArr) {
		short depth = 0;

		for (int i = 0; i < depthArr.length; i++) {
			if ("THIN".equals(depthArr[i])) {
				depth = HSSFCellStyle.BORDER_THIN;
			} else if ("MEDIUM".equals(depthArr[i])) {
				depth = HSSFCellStyle.BORDER_MEDIUM;
			} else if ("DOUBLE".equals(depthArr[i])) {
				depth = HSSFCellStyle.BORDER_DOUBLE;
			}

			switch (i) {
			case 0:
				style.setBorderTop(depth); // top border
				break;
			case 1:
				style.setBorderRight(depth); // right border
				break;
			case 2:
				style.setBorderBottom(depth); // bottom border
				break;
			case 3:
				style.setBorderLeft(depth); // left border
				break;
			}
		}
	}

	public Map<String, Object> getExcelMap(String arg) throws UnsupportedEncodingException {

		JSONObject jsonArg = JSONObject.fromObject(URLDecoder.decode(arg, "UTF-8"));

		// header setting
		Map<String, Object> headers = new HashMap<String, Object>();
		Map<String, Object> lengths = new HashMap<String, Object>();
		JSONArray headersArr = (JSONArray) jsonArg.get("headers");
		int headersLength = headersArr.size();

		Map<String, String> header = null;
		
		JSONArray headerArr = null;
		int headerLength = 0;
		lengths.put("0", headersLength + "");
		header = new HashMap<String, String>();
		for (int i = 0; i < headersLength; i++) {

			
			headerArr = (JSONArray) headersArr.get(i);
			headerLength = headerArr.size();

			for (int j = 0; j < headerLength; j++) {
				
				int t_num = (i) * headerLength + j;
				
				header.put(Integer.toString(t_num), (String) headerArr.get(j));
			}
			
			
		}
		headers.put("0", header);
		
		// dateId setting
		Map<String, Object> dataIds = new HashMap<String, Object>();
		JSONArray dataIdsArr = (JSONArray) jsonArg.get("dataIds");
		int dataIdsLength = dataIdsArr.size();

		Map<String, String> dataId = null;
		JSONArray dataIdArr = null;
		int dataIdLength = 0;

		for (int i = 0; i < dataIdsLength; i++) {

			dataId = new HashMap<String, String>();
			dataIdArr = (JSONArray) dataIdsArr.get(i);
			dataIdLength = dataIdArr.size();

			for (int j = 0; j < dataIdLength; j++) {
				dataId.put(Integer.toString(j), (String) dataIdArr.get(j));
			}

			dataIds.put(Integer.toString(i), dataId);
		}
		
		// dataAlign setting
		Map<String, Object> dataAligns = new HashMap<String, Object>();
		JSONArray dataAlignsArr = (JSONArray) jsonArg.get("dataAligns");
		int dataAlignsLength = dataAlignsArr.size();

		Map<String, String> dataAlign = null;
		JSONArray dataAlignArr = null;
		int dataAlignLength = 0;

		for (int i = 0; i < dataAlignsLength; i++) {

			dataAlign = new HashMap<String, String>();
			dataAlignArr = (JSONArray) dataAlignsArr.get(i);
			dataAlignLength = dataAlignArr.size();

			for (int j = 0; j < dataAlignLength; j++) {
				dataAlign.put(Integer.toString(j), (String) dataAlignArr.get(j));
			}

			dataAligns.put(Integer.toString(i), dataAlign);
		}		

		// dataFormat setting
		Map<String, Object> dataFormats = new HashMap<String, Object>();
		JSONArray dataFormatsArr = (JSONArray) jsonArg.get("dataFormats");
		if(dataFormatsArr != null)	{
			int dataFormatsLength = dataFormatsArr.size();
	
			Map<String, String> dataFormat = null;
			JSONArray dataFormatArr = null;
			int dataFormatLength = 0;
	
			for (int i = 0; i < dataFormatsLength; i++) {
	
				dataFormat = new HashMap<String, String>();
				dataFormatArr = (JSONArray) dataFormatsArr.get(i);
				dataFormatLength = dataFormatArr.size();
	
				for (int j = 0; j < dataFormatLength; j++) {
					if(dataFormatArr.get(j).toString().length()  != 0)
						dataFormat.put(Integer.toString(j), (String) dataFormatArr.get(j));
					else
						dataFormat.put(Integer.toString(j), "");
				}
	
				dataFormats.put(Integer.toString(i), dataFormat);
			}		
		}
		
		// param setting
		Map<String, Object> params = new HashMap<String, Object>();
		JSONArray paramsArr = (JSONArray) jsonArg.get("params");
		int paramsLength = paramsArr.size();

		EgovMapForNull param = null;
		String paramStr[] = null;
		String items[] = null;
		int paramLength = 0;

		for (int i = 0; i < paramsLength; i++) {

			param = new EgovMapForNull();
			paramStr = ((String) ((JSONArray) paramsArr.get(i)).get(0)).split("&");
			paramLength = paramStr.length;

			for (int j = 0; j < paramLength; j++) {
				items = (paramStr[j]).split("=");
				if (items.length == 1) {
					param.put(items[0], null);
				} else {
					param.put(items[0], URLDecoder.decode(items[1], "UTF-8"));
				}
			}

			params.put(Integer.toString(i), param);
		}

		// param setting
		Map<String, String> sheetNms = new HashMap<String, String>();
		JSONArray sheetNmsArr = (JSONArray) jsonArg.get("sheetNms");
		int sheetNmsLength = sheetNmsArr.size();

		for (int i = 0; i < sheetNmsLength; i++) {
			sheetNms.put(Integer.toString(i),
					URLDecoder.decode(((String) ((JSONArray) sheetNmsArr.get(i)).get(0)), "UTF-8"));
		}

		Map<String, Object> excelMap = new HashMap<String, Object>();
		excelMap.put("headers", headers);
		excelMap.put("lengths", lengths);
		excelMap.put("dataIds", dataIds);
		excelMap.put("dataAligns", dataAligns);
		excelMap.put("dataFormats", dataFormats);
		excelMap.put("params", params);
		excelMap.put("sheetNms", sheetNms);
		excelMap.put("fileNm", URLDecoder.decode((String) jsonArg.get("fileNm"), "UTF-8"));

		return excelMap;
	}
}
