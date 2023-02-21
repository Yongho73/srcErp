<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%> 
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>
																
<body>															
	
<script>
	
	var uploadedFileKeys1 = []; // db 저장용 (키만 파이프라인으로 구분)
	var uploadedFileInfo1 = []; // 화면에 저장된 정보 표시용 (삭제 기능) 
	
	var uploadedFileKeys2 = []; // db 저장용 (키만 파이프라인으로 구분)
	var uploadedFileInfo2 = []; // 화면에 저장된 정보 표시용 (삭제 기능) 
	
	var uploadedFileKeys3 = []; // db 저장용 (키만 파이프라인으로 구분)
	var uploadedFileInfo3 = []; // 화면에 저장된 정보 표시용 (삭제 기능) 
	
	var uploadedFileKeys4 = []; // db 저장용 (키만 파이프라인으로 구분)
	var uploadedFileInfo4 = []; // 화면에 저장된 정보 표시용 (삭제 기능) 
	
	$(function() {
		fn_FileUploadBtnEvent();		
	});
	
	var fn_FileUploadBtnEvent = function(){
		
		/*
		첫번째 첨부파일 (갯수제한없음)
		- 파일업로드 버튼 이벤트 파라메터 ->
		
			이벤트 함수명, 
			삭제버튼클래스명, 
			업로드한 파일목록 화면, 
			업로드한 파일 db 입력용, 
			db저장 배열, 
			화면표시 배열, 
			파일업로드 갯수 (0 이면 무제한),
			허용가능한 파일 (all:모두, image:이미지만, excel:엑셀파일만, pdf:pdf파일만),
			콜백함수 (없을경우 디퐆트 콜백(gf_CallbackFileUpload))
			
		- 삭제버튼 이벤트 파라메터 ->  이벤트 함수명, 삭제할 배열의 인덱스, 삭제버튼클래스명, 업로드한 파일목록 화면, 업로드한 파일 db 입력용, db저장 배열, 화면표시 배열
		*/
		$('#fileUpload1').unbind("click").bind("click",function(event){
			gf_FileUploadPopup(
					'fn_FileUploadBtnEvent', 
					'btnUploadedFiledelete1', 
					'fileList1', 
					'atchFileIds1', 
					 uploadedFileKeys1, 
					 uploadedFileInfo1, 
					 0,
					'all',
					'');
		});
		
		$('.btnUploadedFiledelete1').unbind("click").bind("click",function(event){			
			gf_DeleteAtachFile(
					'fn_FileUploadBtnEvent', 
					 $(this).attr('idx'), 
					'btnUploadedFiledelete1', 
					'fileList1', 
					'atchFileIds1', 
					 uploadedFileKeys1, 
					 uploadedFileInfo1);
		});

		
		
		
		
		/*
		두번째 첨부파일 (갯수제한 : 1개만)		
		*/
		$('#fileUpload2').unbind("click").bind("click",function(event){
			gf_FileUploadPopup(
					'fn_FileUploadBtnEvent', 
					'btnUploadedFiledelete2', 
					'fileList2', 
					'atchFileIds2', 
					 uploadedFileKeys2, 
					 uploadedFileInfo2, 
					 1,
				    'excel',
			        '');
		});
		
		$('.btnUploadedFiledelete2').unbind("click").bind("click",function(event){			
			gf_DeleteAtachFile(
					'fn_FileUploadBtnEvent', 
					 $(this).attr('idx'), 
					'btnUploadedFiledelete2', 
					'fileList2', 
					'atchFileIds2', 
					 uploadedFileKeys2, 
					 uploadedFileInfo2);
		});

		
		
		
		
		/*
		세번째 첨부파일 (파이프라인 파일키 조회)		
		*/
		$('#fileUpload3').unbind("click").bind("click",function(event){
			gf_FileUploadPopup(
					'fn_FileUploadBtnEvent', 
					'btnUploadedFiledelete3', 
					'fileList3', 
					'atchFileIds3', 
					 uploadedFileKeys3, 
					 uploadedFileInfo3,
					 0,
					'image',
			        '');
		});
		
		$('.btnUploadedFiledelete3').unbind("click").bind("click",function(event){			
			 
			uploadedFileKeys3.splice($(this).attr('idx'), 1);
			uploadedFileInfo3.splice($(this).attr('idx'), 1);
			
			$('#fileList3 .file_box table tr').remove();
			
			var idx = 0;
			var fileInfos = [];
			var atchFileList = [];
			
			$.each( uploadedFileInfo3, function( key, value ) {
				
				fileInfos = uploadedFileInfo3[key].split('|^|');
				
				atchFileList.push('<tr>');
				atchFileList.push('<td><a href="'+gv_ServerApiUrl+'/file/down?atchFileId='+fileInfos[0]+'">'+fileInfos[2]+'</a></td>');
				atchFileList.push('<td class="ac">'+gf_FileSizeExpression(fileInfos[3])+'</td>');
				atchFileList.push('<td class="ac"><button type="button" idx="'+idx+'" class="btn_del btnUploadedFiledelete3"><span class="glyphicon glyphicon-remove"></span> 삭제</button></td>');
				atchFileList.push('</tr>');

				idx++;
			});								
			
			$('#fileList3 .file_box table').append(atchFileList.join(""));
			$('#atchFileIds3').val(uploadedFileKeys3.join("|"));
			
			fn_FileUploadBtnEvent();
			
		});
		
		$('#fileSearch').unbind("click").bind("click",function(event){
			var jsonParameter = { atchFiles : $('#searchFileInfo').val() };
			var dataSource = gf_NoAsyncTransaction('file/searchFiles', jsonParameter, 'POST');
			
			$('#fileList3 .file_box table tr').remove();
			uploadedFileKeys3 = [];
			uploadedFileInfo3 = [];
			
			var atchFileList = [];
			var idx = 0;
			$.each( dataSource.data, function( key, value ) {
				
				uploadedFileKeys3.push(value.atchFileId);				
				uploadedFileInfo3.push(value.atchFileId+'|^|'+value.fileSn+'|^|'+value.fileOrgFileNm+'|^|'+value.fileSize);	
				
				atchFileList.push('<tr>');
				atchFileList.push('<td><a href="'+gv_ServerApiUrl+'/file/down?atchFileId='+value.atchFileId+'">'+value.fileOrgFileNm+'</a></td>');
				atchFileList.push('<td class="ac">'+gf_FileSizeExpression(value.fileSize)+'</td>');
				atchFileList.push('<td class="ac"><button type="button" idx="'+idx+'" class="btn_del btnUploadedFiledelete3"><span class="glyphicon glyphicon-remove"></span> 삭제</button></td>');
				atchFileList.push('</tr>');
				
				idx++;
			});
 	
			if(gf_IsNull(atchFileList)) {				
				atchFileList.push('<tr>');
				atchFileList.push('<td colspan="3" style="text-align:center">첨부파일이 없습니다.</td>');				
				atchFileList.push('</tr>');								
			}
			
			$('#fileList3 .file_box table').append(atchFileList.join(""));
			$('#atchFileIds3').val(uploadedFileKeys3.join("|"));
			
			fn_FileUploadBtnEvent();
		});	
		
		
		
		
		
		/*
		네번째 첨부파일 (콜백함수 활용)		
		*/
		$('#fileUpload4').unbind("click").bind("click",function(event){
			gf_FileUploadPopup(
					'fn_FileUploadBtnEvent', 
					'btnUploadedFiledelete4', 
					'fileList4', 
					'atchFileIds4', 
					 uploadedFileKeys4, 
					 uploadedFileInfo4, 
					 0,
					'image',
			        'fn_MyfileHandler');
		});
		
		$('.btnUploadedFiledelete4').unbind("click").bind("click",function(event){			
			 
			uploadedFileKeys4.splice($(this).attr('idx'), 1);
			uploadedFileInfo4.splice($(this).attr('idx'), 1);
			
			$('#fileList4 .file_box table tr').remove();
			
			var idx = 0;
			var fileInfos = [];
			var atchFileList = [];
			
			$.each( uploadedFileInfo4, function( key, value ) {
				
				fileInfos = uploadedFileInfo4[key].split('|^|');
				
				atchFileList.push('<tr>');
				atchFileList.push('<td><a href="'+gv_ServerApiUrl+'/file/down?atchFileId='+fileInfos[0]+'">'+fileInfos[2]+'</a></td>');
				atchFileList.push('<td class="ac">'+gf_FileSizeExpression(fileInfos[3])+'</td>');
				atchFileList.push('<td class="ac"><button type="button" idx="'+idx+'" class="btn_del btnUploadedFiledelete4"><span class="glyphicon glyphicon-remove"></span> 삭제</button></td>');
				atchFileList.push('</tr>');

				idx++;
			});								
			
			$('#fileList4 .file_box table').append(atchFileList.join(""));
			$('#atchFileIds4').val(uploadedFileKeys4.join("|"));
			
			fn_FileUploadBtnEvent();
			
		});
	}
	
	var fn_MyfileHandler = function(data, eventFunction, deleteBtnClassNm, viewDivId, dataDivId, keyArr, infoArr){
		if(!gf_IsNull(data)){		
			
			var idx = 0;
			var fileInfos = [];
			var atchFileList = [];
			
			$.each( data, function( key, value ) {						
				fileInfos = value.split('|^|');			
				keyArr.push(fileInfos[0]);
				infoArr.push(fileInfos[0]+'|^|'+fileInfos[1]+'|^|'+fileInfos[2]+'|^|'+fileInfos[3]);									
			});
	 		
			$('#'+viewDivId+' .file_box table tr').remove();
			$('#'+dataDivId).val("");
			
			$.each( infoArr, function( key, value ) {
				
				fileInfos = infoArr[key].split('|^|');

				atchFileList.push('<tr>');
				atchFileList.push('<td><a href="'+gv_ServerApiUrl+'/file/down?atchFileId='+fileInfos[0]+'">'+fileInfos[2]+'</a></td>');
				atchFileList.push('<td class="ac">'+gf_FileSizeExpression(fileInfos[3])+'</td>');
				atchFileList.push('<td class="ac"><button type="button" idx="'+idx+'" class="btn_del '+deleteBtnClassNm+'"><span class="glyphicon glyphicon-remove"></span> 삭제</button></td>');
				atchFileList.push('</tr>');
					 
				idx++;
			});								
			
			//console.log(atchFileList);
			
			$('#'+viewDivId+' .file_box table').append(atchFileList.join(""));
			$('#'+dataDivId).val(keyArr.join("|"));
			
			var callbacks = $.Callbacks();
			var callFunction = eval(eventFunction);
			callbacks.empty();
			callbacks.add(callFunction);
	        callbacks.fire();
		}
	};

</script>

<div class="dhxwin_hdr">파일업로드</div>
<div class="pop-content">
	<table class="li_type02">
		<colgroup>
			<col width="130" />
			<col width="" />
		</colgroup>
		<tr>
			<td class="ar"><button type="button" class="btn_common02" id="fileUpload1"><span class="glyphicon glyphicon-paperclip"></span> 첨부파일1</button></td>
        	<!-- <td><div id="fileList1" class="file_box"></div></td> -->
        	<td id="fileList1">
	        	
        		<table class="file_box_h">
        			<colgroup>
        				<col width="310" />
        				<col width="80" />
        				<col width="80" />
        			</colgroup>
        			<tr>
        				<th>파일이름</th>
        				<th>용량</th>
        				<th>삭제</th>
        			</tr>
        		</table>
        		
	        	<div class="file_box h120">
	        		<table>
		        		<colgroup>
	        				<col width="310" />
	        				<col width="80" />
	        				<col width="63" />
	        			</colgroup>	
	        			<tr>
	        			<td colspan="3" style="text-align:center">첨부파일이 없습니다.</td>
	        			</tr>        			
	        		</table>
	        	</div><!-- //file_box -->
        	</td>
        </tr>
        <tr>
			<td  class="ar">업로드 된 파일</td>
			<td><textarea cols="60" name="atchFileIds1" id="atchFileIds1"></textarea></td>
		</tr>	
	
		<tr class="bdT">
		   	<td class="ar"><button type="button" class="btn_common02" id="fileUpload2"><span class="glyphicon glyphicon-paperclip"></span> 첨부파일2</button></td>
      	 	<!-- <td><div id="fileList2"></div></td> -->
      	 	<td id="fileList2">
	      	 	<table class="file_box_h">
        			<colgroup>
        				<col width="310" />
        				<col width="80" />
        				<col width="80" />
        			</colgroup>
        			<tr>
        				<th>파일이름</th>
        				<th>용량</th>
        				<th>삭제</th>
        			</tr>
        		</table>
        		
	        	<div class="file_box h120">
	        		<table>
		        		<colgroup>
	        				<col width="310" />
	        				<col width="80" />
	        				<col width="63" />
	        			</colgroup>
	        			<tr>
	        			<td colspan="3" style="text-align:center">첨부파일이 없습니다.</td>
	        			</tr>	        			 
	        		</table>
	        	</div><!-- //file_box -->
	 		</td>
		</tr>
		<tr>
			<td class="ar">업로드 된 파일</td>
			<td><textarea cols="60" name="atchFileIds2" id="atchFileIds2"></textarea></td>
		</tr>	
	</table>
	
	<table class="li_type02 mt20">
		<colgroup>
			<col width="130" />
			<col width="" />
		</colgroup>
		<tr>
			<td class="ar">파일정보</td>
			<td>
		    	<input type="text" style="width:500px" id="searchFileInfo"/> <button type="button" class="btn_common02" id="fileSearch"><span class="glyphicon glyphicon-search"></span> 조회</button>			
			</td>
		</tr>		 
		<tr class="bdT">
		   	<td class="ar"><button type="button" class="btn_common02" id="fileUpload3"><span class="glyphicon glyphicon-paperclip"></span> 첨부파일3</button></td>
      	 	<!-- <td><div id="fileList2"></div></td> -->
      	 	<td id="fileList3">
	      	 	<table class="file_box_h">
        			<colgroup>
        				<col width="310" />
        				<col width="80" />
        				<col width="80" />
        			</colgroup>
        			<tr>
        				<th>파일이름</th>
        				<th>용량</th>
        				<th>삭제</th>
        			</tr>
        		</table>
        		
	        	<div class="file_box h120">
	        		<table>
		        		<colgroup>
	        				<col width="310" />
	        				<col width="80" />
	        				<col width="63" />
	        			</colgroup>
	        			<tr>
	        			<td colspan="3" style="text-align:center">첨부파일이 없습니다.</td>
	        			</tr>	        			 
	        		</table>
	        	</div><!-- //file_box -->
	 		</td>
		</tr>
		<tr>
			<td  class="ar">업로드 된 파일</td>
			<td><textarea cols="60" name="atchFileIds3" id="atchFileIds3"></textarea></td>
		</tr>
		<tr class="bdT">
		   	<td class="ar"><button type="button" class="btn_common02" id="fileUpload4"><span class="glyphicon glyphicon-paperclip"></span> 첨부파일4</button></td>
      	 	<!-- <td><div id="fileList2"></div></td> -->
      	 	<td id="fileList4">
	      	 	<table class="file_box_h">
        			<colgroup>
        				<col width="310" />
        				<col width="80" />
        				<col width="80" />
        			</colgroup>
        			<tr>
        				<th>파일이름</th>
        				<th>용량</th>
        				<th>삭제</th>
        			</tr>
        		</table>
        		
	        	<div class="file_box h120">
	        		<table>
		        		<colgroup>
	        				<col width="310" />
	        				<col width="80" />
	        				<col width="63" />
	        			</colgroup>
	        			<tr>
	        			<td colspan="3" style="text-align:center">첨부파일이 없습니다.</td>
	        			</tr>	        			 
	        		</table>
	        	</div><!-- //file_box -->
	 		</td>
		</tr>
		<tr>
			<td class="ar">업로드 된 파일</td>
			<td><textarea cols="60" name="atchFileIds4" id="atchFileIds4"></textarea></td>
		</tr>	
	</table>
	
	
</div>														
 																			   
</body>																														   