<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>

    <style>
        .filebox_sendbtn{
        padding: 7px 15px;
        color: #999;
        vertical-align: middle;
        background-color: #fdfdfd;
        cursor: pointer;
        border: 1px solid #ebebeb;
        border-radius: 5px;
        float:left;
        margin-right:5px;   
        }
        .progress { position: relative; display:inline-block; width: 351px; padding: 1px; background: #f5f5f5; vertical-align:middle; height:1.3rem; border-radius:5px;}
        /*.bar { background-color: #B4F5B4; width: 0%; height: 20px; border-radius: 3px }*/
        .percent { display: inline-block; top: 3px; left: 48%; font-family: Malgun Gothi }
        .uploadfileIdLayer { font-size:12px; color:#128EE0 }

        .progress-bar-animated {
        -webkit-animation: progress-bar-stripes 1s linear infinite;
        animation: progress-bar-stripes 1s linear infinite;
        }

        .progress-bar-striped {
        /*background-image: linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);
        background-size: 1rem 1rem;*/
        }

        .progress-bar {
        display: -ms-flexbox;
        display: flex;
        -ms-flex-direction: column;
        flex-direction: column;
        -ms-flex-pack: center;
        justify-content: center;
        color: #fff;
        text-align: center;
        white-space: nowrap;
        background-color: #007bff;
        
        background: rgb(0,130,225); /* Old browsers */
        background: -moz-linear-gradient(left,  rgba(5,238,201,1) 0%, rgba(0,130,225,1) 100%); /* FF3.6-15 */
        background: -webkit-linear-gradient(left,  rgba(5,238,201,1) 0%, rgba(0,130,225,1) 100%); /* Chrome10-25,Safari5.1-6 */
        background: linear-gradient(to right,  rgba(5,238,201,1) 0%, rgba(0,130,225,1) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#4967ce', endColorstr='#b272cc',GradientType=1 ); /* IE6-9 */          
        
        transition: width .6s ease;
        }

    .pop-content input[type="file"] {
        position: absolute;
        width: 0;
        height: 0;
        padding: 0;
        overflow: hidden;
        border: 0;
    }
    
    .pop-content input[type="file"]:focus {
        border: 0;
        border-color:transparent;
        box-shadow:none;
    }
    .filebox{
        width:100%;
    }
            
    .filebox label {
        display: inline-block;
        padding: 6px 30px;
        color: #999;
        vertical-align: middle;
        background-color: #fdfdfd;
        cursor: pointer;
        border-radius: 5px;
        float:left;
        margin-right:5px;
    }
        .filebox_sendbtn{
        padding: 7px 15px;
        color: #999;
        vertical-align: middle;
        background-color: #fdfdfd;
        cursor: pointer;
        border: 1px solid #ebebeb;
        border-radius: 5px;
        float:left;
        margin-right:5px;   
        }
        
    </style>

    <div class="pop-content">
    
        <div class="filebox"> <!--파일선택-->
              <label for="upFile" title="파일선택" style="background:#fff; color:#777; padding:0 8px; border-radius:5px; text-indent:0px; cursor:pointer; margin-right:5px;border:1px solid #ddd;font-size:19px;font-weight:bold;line-height:1.2;height:31px;">+</label>
              <input type="file" id="upFile" name="files[]" multiple title="파일선택">
              
              
        <input type="button" id="sendUpFiles" style="background:#1e5ca0; width:72px; height:31px; border:1px solid #ebebeb; color:#fff; padding:6px 10px; border-radius:5px; text-indent:0px; cursor:pointer; margin-right:5px;" value="파일 전송"/>
        <div class="progress">
             <div class="progress-bar progress-bar-striped progress-bar-animated bar percent" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
            </div>
            
     <!--    <input type="file" name="fileData" id="upFile" name="files[]" style="width:250px" multiple/> -->
        

        <br/>

        <div id="upfileLst" class="file_box_bg">
            <table class="file_box_h">
                <colgroup>
                    <col width="310" />
                    <col width="80" />
                    <col width="80" />
                </colgroup>
                <tr>
                    <th>파일이름</th>
                    <th>전송용량</th>
                    <th>전송상태</th>
                </tr>
            </table>
            <div class="file_box h300" id="dropzone">
                <table>
                    <colgroup>
                        <col width="310" />
                        <col width="80" />
                        <col width="63" />
                    </colgroup>
                </table>
            </div><!-- //file_box -->
        </div>
    </div>

    <script>

        const fileLimitCnt = ${fileLimitCnt};
        const acceptType = gf_IsNull('${acceptType}')? 'all' : '${acceptType}';
        const viewType = gf_IsNull('${viewType}')? 'all' : '${viewType}';
        var keyArr = '${keyArr}';
        var savedFileArr = [];
        var savedFileInfoArr = [];
 
        let jqXHRDatas = [];
        var returnUploadedFiles = [];
        let fileUpCnt = 0;
        let sendBefore = true;
        let acceptFileRxp;
        let acceptFileArr;
        let accept;

        var cf_pop_fileUpload_InitParam = function(){
            jqXHRDatas = [];
            fileUpCnt = 0;
            if(acceptType === 'image') {
                acceptFileRxp = /(\.gif|\.png|\.jpg|\.jp?g)$/i;
                acceptFileArr = ['gif','jpg','jpeg','png'];
                accept = '.gif,.jpg,.jpeg,.png';
                $('#upFile').attr('accept',accept);
            } else
            if (acceptType === 'pdf') {
                acceptFileRxp = /(\.pdf)$/i;
                acceptFileArr = ['pdf'];
                accept = '.pdf';
                $('#upFile').attr('accept',accept);
            } else
            if (acceptType === 'hwp') {
                acceptFileRxp = /(\.hwp)$/i;
                acceptFileArr = ['hwp'];
                accept = '.hwp';
                $('#upFile').attr('accept',accept);
            } else 
            if (acceptType === 'excel') {
                acceptFileRxp = /(\.xls|\.xlsx)$/i;
                acceptFileArr = ['xls','xlsx'];
                accept = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel';
                $('#upFile').attr('accept',accept);
            } else {
                acceptFileRxp = /(\.*)$/i;
                acceptFileArr = [];
            }
            if(viewType === "view"){
            	//  $('#sendUpFiles')
            	var btn1 = document.getElementById('upFile');
            	btn1.disabled = 'disabled';
            	var btn2 = document.getElementById('sendUpFiles');
            	btn2.disabled = 'disabled';
            }
        };

        var cf_pop_fileUpload_SetComponents = function(){
            var fileId = 0;
            $('#upFile').fileupload({
                url : gv_ServerApiUrl+'/file/upload',
                dataType: 'json',
                singleFileUploads: true, // 한번에 하나씩 전송
                sequentialUploads: true, // 순서대로
                fileuploadchange: function (e, data) {
                },
                dropZone: $('#dropzone'),
                add: function (e, data) {
                    if(fileUpCnt < fileLimitCnt || fileLimitCnt === 0) {
                        $.each( data.files, function( key, file ) {
                            if (acceptFileRxp.test(file.name) == true) {

                                $('.file_box_bg').css('background-image', 'url("")');

                                jqXHRDatas.push(data);

                                var atchFileList = [];
                                var identifyId = 0;

                                identifyId = fileId++;
                                $(this).attr('identifyId', identifyId);

                                atchFileList.push('<tr>');
                                atchFileList.push('<td style="background-color:#fff"><a href="#">'+file.name+'</a></td>');
                                atchFileList.push('<td style="background-color:#fff" class="ac uploadfileIdenfity_'+identifyId+'">'+gf_FileSizeExpression(file.size)+'</td>');
                                if(viewType === "view"){
                                	//
                                } else {
                                	atchFileList.push('<td style="background-color:#fff" class="ac uploadfileIdenfityMsg_'+identifyId+' fileUploadFileRemoveButton"><button onclick="fn_DeleteFileObj('+(jqXHRDatas.length-1)+');" type="button" class="btn_del"><span class="glyphicon glyphicon-remove"></span> 삭제</button></td>');
                                }
                                atchFileList.push('</tr>');

                                $('#upfileLst .file_box table').append(atchFileList.join(''));

                                fileUpCnt++;

                            } else {

                                if(acceptType === 'image') {
                                    gf_DivMsgAutoAlert('이미지 파일만 가능합니다.<br/>가능한 확장자 : '+acceptFileArr.join(', '));
                                } else
                                if (acceptType === 'pdf') {
                                    gf_DivMsgAutoAlert('PDF 파일만 가능합니다.<br/>가능한 확장자 : '+acceptFileArr.join(', '));
                                } else
                                if (acceptType === 'excel') {
                                    gf_DivMsgAutoAlert('엑셀 파일만 가능합니다.<br/>가능한 확장자 : '+acceptFileArr.join(', '));
                                } else {
                                }
                            }
                        });
                    }
                },
                progress: function (e, data) {

                    if(sendBefore) {
                        $('.fileUploadFileRemoveButton').html('전송대기');
                        sendBefore = false;
                    }

                    var file = data.files[0];
                    var progress = parseInt(data.loaded / data.total * 100, 10);

                    $('.uploadfileIdenfityMsg_'+file.identifyId).html('<font color="#9da5a5" style="font-size:11px;">'+ progress +'% 전송</font>');
                    $('.uploadfileIdenfity_'+file.identifyId).html('<font color="#1e5ca0">'+gf_FileSizeExpression(data.loaded)+"</font>");

                },
                progressall: function (e, data) {

                    var progress = parseInt(data.loaded / data.total * 100, 10);
                    $('.percent').html(progress + '%');
                    $('.progress .bar').css('width',progress + '%');

                },
                done: function (e, data) {

                    var file = data.files[0];
                    
                    // 완료 메시지
                    $('.uploadfileIdenfityMsg_'+file.identifyId).html('<font color="#9da5a5">전송완료</font>');

                    var res = JSON.parse(data.jqXHR.responseText);

                    $.each( res.data, function( key, value ) {
                        returnUploadedFiles.push(value.atchFileId+'|^|'+value.fileExtsn+'|^|'+value.orignlFileNm+'|^|'+value.fileMg);
                    });

                    // 파일업로드 초기화
                    cf_pop_fileUpload_InitParam();
                },
                stop: function (e) {

                    $('#fileUploadBpopup .b-close').click();
                }
            });
        };

        function cf_pop_fileUpload_SetEventListener(){
            $("#sendUpFiles").unbind("click").bind("click",function(){
                fn_SendUpFile();
            });
        };

        function cf_pop_fileUpload_SetBinding(){
        	if(!gf_IsNull(keyArr)) {      		
        		var jsonParameter = { atchFiles : keyArr };
                var dataSource = gf_NoAsyncTransaction('file/searchFiles', jsonParameter, 'POST');       
                var idx = 0;
                returnUploadedFiles = [];
                $.each( dataSource.data, function( key, value ) {                     
                	savedFileArr.push(value.atchFileId);              
                	savedFileInfoArr.push(value.atchFileId+'|^|'+value.fileExt+'|^|'+value.fileOrgFileNm+'|^|'+value.fileSize); 
                	returnUploadedFiles.push(value.atchFileId+'|^|'+value.fileExt+'|^|'+value.fileOrgFileNm+'|^|'+value.fileSize);
                });
                fn_SavedFilesAppend();
        	}
        };
        function cf_pop_fileUpload_InitForm(){};
        
        var fn_SendUpFile = function(){
            $.each( jqXHRDatas, function( key, value ) {
                jqXHRDatas[key].submit();
            });
        }

        var fn_DeleteFileObj = function(delIdx){
            jqXHRDatas.splice(delIdx, 1);
            fn_SavedFilesAppend();
            fileUpCnt--;
        };
        
        var fn_DeleteSavedFile = function(fidx){
        	savedFileArr.splice(fidx, 1);
        	savedFileInfoArr.splice(fidx, 1);
        	returnUploadedFiles = [];
        	returnUploadedFiles = savedFileInfoArr;
        	fn_SavedFilesAppend();
        };
        
        var fn_SavedFilesAppend = function(){        	
        	$('#upfileLst .file_box table tr').remove();        	
        	var atchFileList = [];
        	var idx = 0;
             
            if(!gf_IsNull(savedFileInfoArr)) {
            	idx = 0;
            	$('.file_box_bg').css('background-image', 'url("")');
                $.each( savedFileInfoArr, function( key, value ) {                 
                    fileInfos = savedFileInfoArr[key].split('|^|');                    
                    atchFileList.push('<tr>');
                    atchFileList.push('<td><a href="'+gv_ServerApiUrl+'/file/down?atchFileId='+fileInfos[0]+'">'+fileInfos[2]+'</a></td>');
                    atchFileList.push('<td class="ac">'+gf_FileSizeExpression(fileInfos[3])+'</td>');
                    if(viewType === "view"){
                    	//
                    } else {
                    	atchFileList.push('<td class="ac"><button type="button" onclick="fn_DeleteSavedFile('+idx+')" class="btn_del btnUploadedFiledelete4"><span class="glyphicon glyphicon-remove"></span> 삭제</button></td>');
                    }
                    atchFileList.push('</tr>');
                    idx++;
                });                 
            }            
            idx = 0;            
            if(gf_IsNull(savedFileInfoArr) && jqXHRDatas.length  < 1) {
                $('.file_box_bg').css({ 'background-image' : ''});
            }
            $.each( jqXHRDatas, function( key, value ) {
                $.each( value.files, function( key, value ) {
                    $('.file_box_bg').css('background-image', 'url("")');
                    $(this).attr('identifyId', idx);
                    atchFileList.push('<tr>');
                    atchFileList.push('<td style="background-color:#fff"><a href="#">'+value.name+'</a></td>');
                    atchFileList.push('<td style="background-color:#fff" class="ac uploadfileIdenfity_'+idx+'">'+gf_FileSizeExpression(value.size)+'</td>');
                    if(viewType === "view"){
                    	//
                    } else {
                    	atchFileList.push('<td style="background-color:#E8F2FE" class="ac uploadfileIdenfityMsg_'+idx+' fileUploadFileRemoveButton"><button onclick="fn_DeleteFileObj('+idx+');" type="button" class="btn_del"><span class="glyphicon glyphicon-remove"></span> 삭제</button></td>');
                    }
                    atchFileList.push('</tr>');
                });
                idx++;
            });
            $('#upfileLst .file_box table').append(atchFileList.join(''));
        };

        cf_pop_fileUpload_InitParam();
        cf_pop_fileUpload_SetComponents();
        cf_pop_fileUpload_SetEventListener();
        cf_pop_fileUpload_SetBinding();
        cf_pop_fileUpload_InitForm();

    </script>

</body>
