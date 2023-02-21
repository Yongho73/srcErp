<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%>
<%@taglib prefix="c" uri="http://java.sun.com/jstl/core_rt" %>
<%
 /**
  * @Class Name 	: /jsp/pop/zipPopup.jsp
  * @Description 	: 우편번호찾기 
  * @Modification Information
  * @since 2016.10.4
  * @version 1.0
  * @author 디비비전(주)
  */
%>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta property="og:title" content="가축위생방역지원본부">
<title>가축위생방역지원본부</title>
<!--  
<input type="text" id="sample6_postcode" placeholder="우편번호">
<input type="button" onclick="sample6_execDaumPostcode()" value="우편번호 찾기"><br>
<input type="text" id="sample6_address" placeholder="주소">
<input type="text" id="sample6_address2" placeholder="상세주소">
-->
<script src="https://ssl.daumcdn.net/dmaps/map_js_init/postcode.v2.js"></script>

<script>
    function execDaumPostcode(postCd, homeAddr, homeAddr2) {
    	var width = 500; //팝업의 너비
    	var height = 400; //팝업의 높이    	
        new daum.Postcode({
        	//팝업 위치를 지정(화면의 가운데 정렬)
       	    width: width, //생성자에 크기 값을 명시적으로 지정해야 합니다.
       	    height: height,        	
            oncomplete: function(data) {
                // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

                // 각 주소의 노출 규칙에 따라 주소를 조합한다.
                // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
                var fullAddr = ''; // 최종 주소 변수
                var extraAddr = ''; // 조합형 주소 변수

                // 사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
                if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                    fullAddr = data.roadAddress;

                } else { // 사용자가 지번 주소를 선택했을 경우(J)
                    fullAddr = data.jibunAddress;
                }

                // 사용자가 선택한 주소가 도로명 타입일때 조합한다.
                if(data.userSelectedType === 'R'){
                    //법정동명이 있을 경우 추가한다.
                    if(data.bname !== ''){
                        extraAddr += data.bname;
                    }
                    // 건물명이 있을 경우 추가한다.
                    if(data.buildingName !== ''){
                        extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                    }
                    // 조합형주소의 유무에 따라 양쪽에 괄호를 추가하여 최종 주소를 만든다.
                    fullAddr += (extraAddr !== '' ? ' ('+ extraAddr +')' : '');
                }

                // 우편번호와 주소 정보를 해당 필드에 넣는다.
                document.getElementById(postCd).focus();
                document.getElementById(postCd).value = data.zonecode; //5자리 새우편번호 사용
                document.getElementById(homeAddr).focus();
                document.getElementById(homeAddr).value = fullAddr;

                // 커서를 상세주소 필드로 이동한다.
                document.getElementById(homeAddr2).focus();
            }
        }).open({
    	    left: (window.screen.width / 2) - (width / 2),
    	    top: (window.screen.height / 2) - (height / 2)
    	});
    }
    function execDaumPostcode2(postCd, homeAddr, homeAddr2, datagrid_list1) {
    	var width = 500; //팝업의 너비
    	var height = 400; //팝업의 높이    	
        new daum.Postcode({
        	//팝업 위치를 지정(화면의 가운데 정렬)
       	    width: width, //생성자에 크기 값을 명시적으로 지정해야 합니다.
       	    height: height,        	
            oncomplete: function(data) {
                // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

                // 각 주소의 노출 규칙에 따라 주소를 조합한다.
                // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
                var fullAddr = ''; // 최종 주소 변수
                var extraAddr = ''; // 조합형 주소 변수

                // 사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
                if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                    fullAddr = data.roadAddress;

                } else { // 사용자가 지번 주소를 선택했을 경우(J)
                    fullAddr = data.jibunAddress;
                }

                // 사용자가 선택한 주소가 도로명 타입일때 조합한다.
                if(data.userSelectedType === 'R'){
                    //법정동명이 있을 경우 추가한다.
                    if(data.bname !== ''){
                        extraAddr += data.bname;
                    }
                    // 건물명이 있을 경우 추가한다.
                    if(data.buildingName !== ''){
                        extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                    }
                    // 조합형주소의 유무에 따라 양쪽에 괄호를 추가하여 최종 주소를 만든다.
                    fullAddr += (extraAddr !== '' ? ' ('+ extraAddr +')' : '');
                }
                // 커서를 상세주소 필드로 이동한다.
                var zipRow = datagrid_list1.getRow();
                datagrid_list1.setTextMatrix(zipRow, datagrid_list1.getColRef("afPostCd"), data.zonecode );
                datagrid_list1.setTextMatrix(zipRow, datagrid_list1.getColRef("afHomeAddr"), fullAddr );
                
                // 우편번호와 주소 정보를 해당 필드에 넣는다.
                document.getElementById(postCd).focus();
                document.getElementById(postCd).value = data.zonecode; //5자리 새우편번호 사용
                document.getElementById(homeAddr).focus();
                document.getElementById(homeAddr).value = fullAddr;
                
                document.getElementById(homeAddr2).focus();
            	
            	
              
            }
        }).open({
    	    left: (window.screen.width / 2) - (width / 2),
    	    top: (window.screen.height / 2) - (height / 2)
    	});
    }
</script>
</head>

</body>
</html>