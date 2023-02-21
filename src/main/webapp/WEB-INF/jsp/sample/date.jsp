<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%> 
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>

<body>
<!-- 년월달력때문에 사용 --> 
<link rel="stylesheet" type="text/css" href="/xerp/css/common/jquery/ui/1.11.0/themes/smoothness/jquery-ui.css"/>
<link rel="stylesheet" type="text/css" href="/xerp/css/common/jquery/yearpicker.css" />
<script src="/xerp/js/xerp/jquery.min.js"></script>
<script src="/xerp/js/xerp/yearpicker.js"></script>
<script src="/xerp/js/xerp/jquery.mtz.monthpicker.js"></script>

<script>
var nowDate = "";
var RegNotNum = /[^0-9]/g;  //숫자 정규식
var dhxCCalendarDate2; // 기간 달력(From ~ To)

$(function() {
	if(init()){   // 초기화
		init1();  // 일반달력 초기화
		init2();  // 기간달력 초기화
		init3();  // 년월달력 초기화
		init4();  // 년  달력 초기화
	}
});

function init(){
	//달력 입력칸에 키보드 입력 시 이벤트 : 전체 달력에 영향 줌 : class="input_calen" 인 전체
    $('#sampleForm .input_calen').unbind('keyup').bind('keyup', function(event){
		//숫자
    	dateChk($(this));
    });
    
	//기간달력 이벤트 추가
    $('#sampleForm #date2').unbind('click').bind('click', function(event){
    	//dhxCCalendarDate2.setPosition("bottom"); // "bottom"
    	//$('#date2').children('.dhtmlxcalendar_material').css("style","top:100px;");
    	dhxCCalendarDate2.show();
    });
    
    //금일 조회
    var today = new Date();
    nowDate = dateFormat(today);
    return(nowDate);
}


/********************************************************************/

//일반달력
function init1(){
	//달력 생성
	var dhxCCalendarDate1 = new dhtmlXCalendarObject({input:"date1", button:"startDateIcon"});
	dhxCCalendarDate1.loadUserLanguage("ko");
	//dhxCCalendarDate1.hideTime();
	dhxCCalendarDate1.setDateFormat("%Y-%m-%d %H:%i");
	
	//금일 날짜표시
	$('#date1').val(nowDate + ' 00:00');
}
function value1(){
	alert(gf_FormGetValue('sampleForm', 'date1', 'text'));
}


/********************************************************************/

$(document).click(function(e){ //문서 body를 클릭했을때
    //if(e.target.className =="date2_cal") { return false; } //내가 클릭한 요소(target)를 기준으로 상위요소에 .date2_cal이 없으면 (갯수가 0이라면)
    if(e.target.id =="date2_cal" || e.target.id =="date21" || e.target.id =="date22") { return false; } //내가 클릭한 요소(target)가 달력 DIV 또는 달력 input 요소의 ID와 같지 않으면 무조건 닫음 
    dhxCCalendarDate2.hide();  //그리드 달력 컴포넌트 객체 숨기기.
});

//기간달력
function init2(){
	//달력 생성
	dhxCCalendarDate2 = new dhtmlXDoubleCalendar("date2_cal");
	
    dhxCCalendarDate2.attachEvent("onClick", function(side, date){
        //alert(side + " + " + date);
        if(side == "right"){
        	$('#date21').val(dateFormat(dhxCCalendarDate2.leftCalendar.getDate()));
        	$('#date22').val(dateFormat(dhxCCalendarDate2.rightCalendar.getDate()));
        	//dhxCCalendarDate2.hide();
        }
    });
	
	//금일 날짜표시
	gf_SetDateIntervalRadio('date21', 'date22', '1');  // 마지막 1=30일전 , 3=90일전 , 6=180일전
	
	//달력 컴포넌트에 바로 위에서 세팅한 날짜 넣어주기(최초만 실행)
	dhxCCalendarDate2.leftCalendar.setDate(gf_FormGetValue('sampleForm', 'date21', 'text'));
	dhxCCalendarDate2.rightCalendar.setDate(gf_FormGetValue('sampleForm', 'date22', 'text'));	
	dhxCCalendarDate2.leftCalendar.loadUserLanguage("ko");
	dhxCCalendarDate2.rightCalendar.loadUserLanguage("ko");
}
function value2(){
	alert(gf_FormGetValue('sampleForm', 'date21', 'text') + "~" + gf_FormGetValue('sampleForm', 'date22', 'text'));
}


/********************************************************************/

//년월달력 : 
function init3(){
	//달력 생성  : jquery의 datepicker 사용
	//금일 날짜표시
	$('#date_month').val(nowDate.substring(0,7));

    var currentYear = (new Date()).getFullYear();
    var startYear = currentYear-10;

    var options = {
            startYear: startYear,
            finalYear: currentYear,
            pattern: 'yyyy-mm',
            monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월']
    };

    $('#date_month').monthpicker(options);
}

function date_month(){
	alert(gf_FormGetValue('sampleForm', 'date_month', 'text'));
}


/********************************************************************/

//년달력 : 
function init4(){
	//달력 생성  : yearpicker 사용
	//금일 날짜표시
	$('#date_year').val(nowDate.substring(0,4));

    var currentYear = (new Date()).getFullYear();
    var startYear = currentYear-20;
    var endYear = currentYear+20;

    $('#date_year').yearpicker({
        year: currentYear,
        startYear: startYear,
        endYear: endYear
      });
}

function date_year(){
	alert(gf_FormGetValue('sampleForm', 'date_year', 'text'));
}

/********************************************************************/

//날짜 포멧 처리
function dateFormat(date){
  var dd = date.getDate();
  var mm = date.getMonth()+1; //January is 0!
  var yyyy = date.getFullYear();

  if(dd<10) {
      dd='0'+dd
  } 

  if(mm<10) {
      mm='0'+mm
  } 

  var nDate = yyyy+'-'+mm+'-'+dd;
  return(nDate);
}
//입력 내용을 날짜 포멧으로
function dateChk(objDate){
	var date = objDate.val();
	date = date.replace(RegNotNum, '');

	if (date == "" || date == null || date.length < 5) {
	  objDate.val(date);
	  return;
	}

	var DataFormat;
	var RegPhonNum;

	// 날짜 포맷(yyyy-mm-dd) 만들기 
	if (date.length <= 6) {
	  DataFormat = "$1-$2"; // 포맷을 바꾸려면 이곳을 변경
	  RegPhonNum = /([0-9]{4})([0-9]+)/;
	} else if (date.length <= 8) {
	  DataFormat = "$1-$2-$3"; // 포맷을 바꾸려면 이곳을 변경
	  RegPhonNum = /([0-9]{4})([0-9]{2})([0-9]+)/;
	}

	while (RegPhonNum.test(date)) {
	  date = date.replace(RegPhonNum, DataFormat);
	}

	objDate.val(date);

	// 모두 입력됐을 경우 날짜 유효성 확인
	if (date.length == 10) {
		var isVaild = true;
	
		if (isNaN(Date.parse(date))) {
			// 유효 날짜 확인 여부
			isVaild = false;
		} else {
			// 년, 월, 일 0 이상 여부 확인
			var date_sp = date.split("-");
			date_sp.forEach(function(sp) {
			  if (parseInt(sp) == 0) {
			    isVaild = false;
			  }
			});
		
			// 마지막 일 확인
			var last = new Date(new Date(date).getFullYear(), new Date(date).getMonth(), 0);
			if (last.getDate() < parseInt(date_sp[2])) {
			 	isVaild = false;
			}
		}
		
		if (!isVaild) {
		  alert("잘못된 날짜입니다. \n다시 입력하세요.");
		  objDate.val("");
		  objDate.focus();
		  return;
		}
	}
}
</script>

<div class="dhxwin_hdr">날짜선택기 샘플</div>
<div class="list_type01">
	<form id="sampleForm">
		<br/>
		<table style="vertical-align: middle; width:580px;">
			<colgroup>
				<col width="200">
				<col width="10">
				<col width="320">
				<col width="50">
			</colgroup>
			<tr>
				<th>일반 달력</th>
				<td></td>
				<td><input type="text" name="date1" id="date1" class="input_calen" "maxlength=16;">
				</td>
				<td><a href="javascript:value1();">[확인]</a></td>
			</tr>
			<tr style="height:20px;">
				<th>기간 달력</th>
				<td></td>
				<td>
					<div id="date2" style="width:220px; position:absolute; top:100px;">  <!-- absolute는 position: static 속성을 가지고 있지 않은 부모를 기준으로 움직입니다. 만약 부모 중에 포지션이 relative, absolute, fixed인 태그가 없다면 가장 위의 태그(body)가 기준이 됩니다. -->
						<input type="text" name="date21" id="date21" class="input_calen"> ~ <input type="text" name="date22" id="date22" class="input_calen">
						<div id="date2_cal" style="position:absolute; top:25px;"></div> <!-- 상위 div의 25px 만큼 아래에 생성 - 달력 뜨는 위치 때문 -->
					</div>
				</td>
				<td><a href="javascript:value2();">[확인]</a></td>
			</tr>
			<tr>
				<th>년월 선택 달력</th>
				<td></td>
				<td><input type="text" name="date_month" id="date_month" class="input_calen" size="7" maxlength="7">
				</td>
				<td><a href="javascript:date_month();">[확인]</a></td>
			</tr>
			<tr>
				<th>년 선택 달력</th>
				<td></td>
				<td><input type="text" name="date_year" id="date_year" class="input_calen" size="4" maxlength="4">
				</td>
				<td><a href="javascript:date_year();">[확인]</a></td>
			</tr>
		</table>
	</form>
</div>														
</body>																														   