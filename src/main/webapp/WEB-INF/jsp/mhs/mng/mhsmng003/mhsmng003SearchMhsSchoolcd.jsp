<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%> 
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>
																
<body>															
																
<script src="${pageContext.request.contextPath}/js/xerp/mhs/mng/mhsmng003/mhsmng003SearchMhsSchoolcd.js"></script>
																										   
																										   
<!-- 학교코드관리-->                                                                                  
<div id="sub_container">																				   
	<div class="sub_content" id="sub_content">														   
		<div class="search_wrap">																		   
			<div class="search_box w93p" id="searchForm" name="searchForm">						   
				<ul>																					   
					<li>																				   
						<label for="sch_userId" class="label">기간</label>							   
						<input type="text" name="searchSregDt" id="searchSregDt" title="시작일"  class="txtDate">
						<a href="#"><img id="startDateIcon" class="imgCalendar" title="달력" /></a>~				 
						<input type="text" name="searchEregDt" id="searchEregDt" title="종료일"  class="txtDate">
						<a href="#"><img id="endDateIcon" class="imgCalendar" title="달력" /></a>		
					</li>																					
					<li> 																					
						<label for="sch_salaryCd" class="label">코드</label>						
		              	<input type="text" name="salaryCd" id="salaryCd"   class="w6r mr10">		
		              																						
		              	<label for="sch_salaryNm" class="label">항목명</label>							
		              	<input type="text" name="salaryNm" id="salaryNm" class="w6r mr10">			
		            </li>																					
		            <li>																					
		              	<label for="sch_userNm" class="mr3">사용여부</label>								
	              	</li>																					
	              	<li>																					
		              	<div class="switch-field mt-8 mb-8">												
			                <input type="radio"  id="switch_3_left" name="useYn" value="" checked/>	
			                <label  for="switch_3_left">전체</label>										
			                <input type="radio" id="switch_3_center" name="useYn" value="Y">		
			                <label for="switch_3_center">사용</label>										
			                <input type="radio"  id="switch_3_right" name="useYn" value="N">		
			                <label for="switch_3_right">미사용</label>										
				        </div>																				
		            </li>																					
		            <li>																					
		            	<label for="sch_salaryNm" class="label">구분</label>								
		            </li>																					
		            <li> 																					
		            	<div class="mt-8 mb-8" id="divPaymentddtClsComboBox"></div>						
		            </li>																					
		           																							
		         </ul>																						
			</div>  																						
			<!-- search_box -->																				
	        <div class="btn-oneline mb-8">																
				<button type="button" id="btnSearch"><span class="glyphicon glyphicon-search f15 mr5"></span>조회</button>
	        </div>																											   
		</div>																												   
																															   
		<!--//search_wrap-->																								   
		<h4 class="title02 mt10"><span class="glyphicon glyphicon-chevron-right mr5"></span>학교코드관리 목록</h4>	   
		<span class="fr pt10">																							   
			<button type="button" class="btn_in_grid" id="btnAdd" name="btnAdd"><span class="glyphicon glyphicon-new-window mr5"><!-- 팝업일때 --></span>등록</button>
	    	<button type="button" class="btn_in_grid dell" id="btnRemove" name="btnRemove"><span class="glyphicon glyphicon-trash mr5"></span>삭제</button>			
	    	<button type="button" class="btn_in_grid" id="btnExcel" name="btnExcel"><span class="excel mr5"></span>[F2]엑셀</button>								
		</span>																													 
																																 
    	<div class="w100p h530 pst-r-dp-blk"><br>																				 
    		<div style="float:left" class="w5p h100p">&nbsp;</div>															 
			<div id="dataList" style="float:left" class="w60p h100p"></div>												 
			<div style="float:left" class="w5p h100p">&nbsp;</div>															 
			<div id="divForm" style="float:left" class="w30p h100p">														 
			 	<div class="detail_type02">																					 
					<form id="saveForm">																						 
						<table>																									 
				          <caption>학교코드 등록/수정</caption>															 
				          <colgroup>																							 
					          <col width="30%">																				 
					          <col width="70%">																				 
				          </colgroup>																							 
				          <tr>																							 
				            <th><span class="glyphicon glyphicon-asterisk mr5"></span>학교 코드</th>   		 
				            <td><input  type="text"  class="w98p"  name="schoolCd" id="schoolCd" maxlength="20"></td>
				          </tr>																							 
				          <tr>																							 
				            <th><span class="glyphicon glyphicon-asterisk mr5"></span>학교 명</th>   		 
				            <td><input  type="text"  class="w98p"  name="schoolNm" id="schoolNm" maxlength="50"></td>
				          </tr>																							 
				          <tr>																							 
				            <th><span class="glyphicon glyphicon-asterisk mr5"></span>지역 코드</th>   		 
				            <td><input  type="text"  class="w98p"  name="areaCd" id="areaCd" maxlength="3"></td>
				          </tr>																							 
				          <tr>																							 
				            <th><span class="glyphicon glyphicon-asterisk mr5"></span>학교 구분</th>   		 
				            <td><input  type="text"  class="w98p"  name="schoolCls" id="schoolCls" maxlength="3"></td>
				          </tr>																							 
				          <tr>																							 
				            <th><span class="glyphicon glyphicon-asterisk mr5"></span>우편 코드</th>   		 
				            <td><input  type="text"  class="w98p"  name="postCd" id="postCd" maxlength="7"></td>
				          </tr>																							 
				          <tr>																							 
				            <th><span class="glyphicon glyphicon-asterisk mr5"></span>주소</th>   		 
				            <td><input  type="text"  class="w98p"  name="addr" id="addr" maxlength="100"></td>
				          </tr>																							 
				          <tr>																							 
				            <th><span class="glyphicon glyphicon-asterisk mr5"></span>전화번호</th>   		 
				            <td><input  type="text"  class="w98p"  name="tel" id="tel" maxlength="14"></td>
				          </tr>																							 
				          <tr>																							 
				            <th><span class="glyphicon glyphicon-asterisk mr5"></span>팩스 전화번호</th>   		 
				            <td><input  type="text"  class="w98p"  name="faxTel" id="faxTel" maxlength="14"></td>
				          </tr>																							 
				         																											
				        </table>																									
					</form>																											
					<div class="ac vb block mt15 w100p fl">																																 
			   			<button id="btnFormSave" name="btnFormSave" class="btn_common01_new"><!-- <span class="glyphicon glyphicon-save mr5"></span>-->저장</button>				 
			   			<span id="spanReset">																																				 
			   				<button id="btnFormReset" name="btnFormReset" class="btn_common01_new"><!--  --><span class="glyphicon glyphicon-refresh mr5"></span>-->Reset</button>	 
			   			</span>																																								 
			   			<span id="spanDel" style="display:none"><button id="btnFormDel" name="btnFormDel" class="btn_in_grid dell"><!-- <span class="glyphicon glyphicon-trash mr5"></span>-->삭제</button>
			   			</span>																									   
			    	</div>																										   
				</div><!-- detail_type01 -->																					   
			</div><!-- divForm -->																								   
		</div>																													   
	</div>																														   
</div>																															   
</body>																														   