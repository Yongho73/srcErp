<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%> 
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>
																
<body>															
	
<script>

	$(function() {		
		fn_FileUploadBtnEvent();		
		$("#formSample").validate({ errorElement: 'div' });
	});
	
	var fn_FileUploadBtnEvent = function(){

		$('#btnSmt').unbind("click").bind("click",function(event){
			if($("#formSample").validate().form()){		
			    var jsonParameter = { crptStr:  $('#crptStr').val() };			
			    gf_Transaction($('#crptStr').val(), 'sample/data/getEncodeString', jsonParameter, 'fn_Callback', false );
			}			 
		});			
	}
	
	var fn_Callback = function(strSvcID, targetID, response){
	    if (response.data == false) {	        
	    	 return;	        
	    } else {

	    	 gf_Trace(response)
 
	    	 $('#encodeStrDesede').val('');
	    	 $('#decodeStrDesede').val('');
	    	 $('#encodeStrAria').val('');
	    	 $('#decodeStrAria').val('');
	    	 $('#encodeStrSHA256').val('');
	    	 $('#encodeStrSHA512').val('');
	    	 $('#salt').val('');
	    	 
	    	 $('#encodeStrDesede').val(response.data.encodeStrDesede);
	    	 $('#decodeStrDesede').val(response.data.decodeStrDesede);
	    	 $('#encodeStrAria').val(response.data.encodeStrAria);
	    	 $('#decodeStrAria').val(response.data.decodeStrAria);
	    	 $('#encodeStrSHA256').val(response.data.encodeStrSHA256);
	    	 $('#encodeStrSHA512').val(response.data.encodeStrSHA512);
	    	 $('#salt256').val(response.data.salt);
	    	 $('#salt512').val(response.data.salt);
	    }
	};

</script>

<div class="dhxwin_hdr">암복호화</div>
<div class="pop-content">
	<form name="formSample" id="formSample">
		<table class="li_type02">
			<colgroup>
				<col width="130" />
				<col width="" />
			</colgroup>
			<tr>
				<td  class="ar">입력</td>
				<td><input type="text" name="crptStr" id="crptStr" required/>&nbsp;<input type="button" id="btnSmt" value="암호화"/></td>
	        </tr>
	        <tr>
				<td  class="ar">DESede 암호화 <br/>(양방향)</td>
				<td><textarea cols="60" name="encodeStrDesede" id="encodeStrDesede"></textarea></td>
			</tr>
			<tr>
				<td  class="ar">DESede 복호화 <br/>(양방향)</td>
				<td><textarea cols="60" name="decodeStrDesede" id="decodeStrDesede"></textarea></td>
			</tr>
			<tr>
				<td  class="ar">ARIA 암호화 <br/>(양방향)</td>
				<td><textarea cols="60" name="encodeStrAria" id="encodeStrAria"></textarea></td>
			</tr>
			<tr>
				<td  class="ar">ARIA 복호화 <br/>(양방향)</td>
				<td><textarea cols="60" name="decodeStrAria" id="decodeStrAria"></textarea></td>
			</tr>		
	 		<tr>
				<td  class="ar">SHA256 암호화 <br/>(단방향)</td>
				<td><input type="text" name="salt" id="salt256"/> : salt<br/><textarea cols="60" rows="10" name="encodeStrSHA256" id="encodeStrSHA256"></textarea></td>
			</tr>
			<tr>
				<td  class="ar">SHA512 암호화 <br/>(단방향)</td>
				<td><input type="text" name="salt" id="salt512"/> : salt<br/><textarea cols="60" rows="10" name="encodeStrSHA512" id="encodeStrSHA512"></textarea></td>
			</tr>
		</table>
 	</form>	
</div>														

</body>																														   