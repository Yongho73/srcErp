<%@page contentType="text/html; charset=UTF-8" trimDirectiveWhitespaces="true"%> 
<%@ include file="/WEB-INF/decorators/default/resource.jsp"%>
																
<body style="margin-left: 10px; padding-left: 10px;">															
	
<script>
 
var dhxGrid_total;   	//Footer Total(Sum) 용 : 계산때문에 전역 변수로 선언
var dhxGridMhsEmp;  //rowspan sample 용
var dhxGridColspan;  //colspan sample 용
var dhxGridDate;  //달력 sample

	$(function() {
		attacheGrid();        //Multirow Header
		attacheGrid_total();  //Footer Total(Sum)
		attacheGrid_subTotal();  //sub Total(Sum)
		attacheGrid_rowSpan();  //gridbox_rowSpan
		attacheGrid_colSpan();  //gridbox_colSpan
		attacheGrid_date();  //gridbox_date
		attacheGrid_jumin();
	});
	
	
	var attacheGrid = function(){
		
		/*
		myGrid = new dhtmlXGridObject('gridbox');		
		
		myGrid.setHeader(    "Sales,Book,#cspan,Price,In Store,Shipping,Other Info,#cspan");
		
		myGrid.attachHeader( ["#rspan","Title","Author","#rspan","#rspan","#rspan","Bestseller1","Published1"] );
		myGrid.attachHeader( ["#rspan","#rspan","#rspan","#rspan","#rspan","#rspan","Bestseller2","Published2"] );
		myGrid.attachHeader( ["#rspan","#rspan","#rspan","#rspan","#rspan","#rspan","Bestseller3","Published3"] );
		
		myGrid.setInitWidths("70,150,120,80,80,80,80,100");
		myGrid.setColAlign("right,left,left,right,center,left,center,center");
		myGrid.setColTypes("dyn,ed,ed,price,ch,co,ra,ro");
		var combobox = myGrid.getCombo(5);
		combobox.put("1","1 Hour");
		combobox.put("12","12 Hours");
		combobox.put("24","24 Hours");
		combobox.put("48","2 days");
		combobox.put("168","1 week");
		combobox.put("pick","pick up");
		combobox.put("na","na");
		myGrid.setColSorting("int,str,str,int,str,str,str,str");
		myGrid.setColumnColor("white,#d5f1ff,#d5f1ff");
		myGrid.setColumnMinWidth(50,0);
		myGrid.enableAutoWidth(true);
		myGrid.enableAutoHeight(true);
		myGrid.init();
		myGrid.enableMultiselect(true);
		myGrid.load("${pageContext.request.contextPath}/js/dhtmlx/grid.xml");
		*/
		
		//header, width, align, sort, type, hidden, id, attach		
		var dhxGridSampleInfo = [];
		dhxGridSampleInfo.push(gf_MakeDhxGridHeader("Sales",'70','right','int','dyn',false,'',''));
		dhxGridSampleInfo.push(gf_MakeDhxGridHeader("Book",'150','left','str','ed',false,'',''));
		dhxGridSampleInfo.push(gf_MakeDhxGridHeader("#cspan",'120','left','str','ed',false,'',''));
		dhxGridSampleInfo.push(gf_MakeDhxGridHeader("Price",'80','right','int','price',false,'',''));
		dhxGridSampleInfo.push(gf_MakeDhxGridHeader("In Store Info",'80','center','str','ch',false,'',''));
		dhxGridSampleInfo.push(gf_MakeDhxGridHeader("Shipping",'80','left','str','co',false,'',''));
		dhxGridSampleInfo.push(gf_MakeDhxGridHeader("Other Info",'80','center','str','ra',false,'',''));
		dhxGridSampleInfo.push(gf_MakeDhxGridHeader("#cspan",'100','center','str','ro',false,'',''));
		
		var attachHeaderArr = [];
		attachHeaderArr.push(["#rspan","Title","Author","#rspan","#rspan","#rspan","Bestseller1","Published1"]);
		attachHeaderArr.push(["#rspan","#rspan","#rspan","#rspan","#rspan","#rspan","Bestseller2","Published2"]);
		attachHeaderArr.push(["#rspan","#rspan","#rspan","#rspan","#rspan","#rspan","Bestseller3","Published3"]);
		
		var dhxGrid = gf_MakeDhxGrid('gridbox', dhxGridSampleInfo, false, true, false, attachHeaderArr);	// divId, gridInfo, muiltiselet, attachHeaderYn, footerYn, attachHeaderArr
		 
		dhxGrid.enableAutoWidth(true);	
		dhxGrid.setColumnColor("#fff,#e4f0fd,#e4f0fd");
		
		var combobox = dhxGrid.getCombo(5);
		combobox.put("1","1 Hour");
		combobox.put("12","12 Hours");
		combobox.put("24","24 Hours");
		combobox.put("48","2 days");
		combobox.put("168","1 week");
		combobox.put("pick","pick up");
		combobox.put("na","na");
		
		dhxGrid.load("${pageContext.request.contextPath}/js/dhtmlx/grid.xml");
 	
	}
	
	//Footer Total(Sum) : dhxGrid_total = 계산때문에 전역 변수로 선언
	var attacheGrid_total = function(){
		var dhxGridSampleInfo = [];
		dhxGridSampleInfo.push(gf_MakeDhxGridHeader("Sales",'80','left','int','edn',false,'',''));
		dhxGridSampleInfo.push(gf_MakeDhxGridHeader("Title",'120','right','int','ro',false,'',''));
		dhxGridSampleInfo.push(gf_MakeDhxGridHeader("Author",'120','left','str','ro',false,'',''));
		dhxGridSampleInfo.push(gf_MakeDhxGridHeader("Price",'80','right','int','price',false,'',''));
		dhxGridSampleInfo.push(gf_MakeDhxGridHeader("In Store Info",'80','center','str','ch',false,'',''));
		dhxGridSampleInfo.push(gf_MakeDhxGridHeader("Shipping",'80','left','str','co',false,'',''));
		dhxGridSampleInfo.push(gf_MakeDhxGridHeader("Bestseller",'80','center','str','ra',false,'',''));
		dhxGridSampleInfo.push(gf_MakeDhxGridHeader("Published",'100','center','str','ro',false,'',''));
		
		dhxGrid_total = gf_MakeDhxGrid('gridbox_total', dhxGridSampleInfo, false, false, false, null);	// divId, gridInfo, muiltiselet, attachHeaderYn, footerYn, attachHeaderArr
		 
		dhxGrid_total.enableAutoWidth(true);	
		
		dhxGrid_total.attachFooter("<div id='sales_tot' style=''>0</div>, , , <div id='price_tot' style=''>0</div>, , , ,<div style=''>합계</div> ",["text-align:left;"]);   // 컬럼 수량만큼 정의, 합계가 필요한 컬럼 부분에 <div>추가하고 ID 부여
		
		dhxGrid_total.attachEvent("onEditCell",calculateFooterValues);  //수정 시 자동 계산
		
		dhxGrid_total.load("${pageContext.request.contextPath}/js/dhtmlx/grid.xml");  // load = loads data from an external file : 본 프로젝트에서는 local data 사용하므로 실제로는 사용 안됨 : parse 사용
		// dhxGrid_total.parse(data.data.records, 'js');
		dhxGrid_total.attachEvent("onDataReady",function(){
			calculateFooterValues();
		});
	}
	function calculateFooterValues(stage){
		//alert(stage);
		if(stage && stage!=2)
			return true;
		var nrQ = document.getElementById("sales_tot");
			nrQ.innerHTML = gf_NumberWithCommas(sumColumn1());
			
		var srS = document.getElementById("price_tot");
			srS.innerHTML = "$"+gf_NumberWithCommas(sumColumn2().toFixed(2));
		return true;
	}
	function sumColumn1(){
		var out = 0;
		for(var i = 0; i < dhxGrid_total.getRowsNum(); i++){
			out+= parseFloat(dhxGrid_total.cells2(i,0).getValue())
		}
		return out;
	}
	function sumColumn2(){
		var out = 0;
		for(var i = 0; i < dhxGrid_total.getRowsNum(); i++){
			out+= parseFloat(dhxGrid_total.cells2(i,3).getValue())
		}
		return out;
	}
	
	//sub Total(Sum)
	var attacheGrid_subTotal = function(){
		var dhxGridSampleInfo = [];
		dhxGridSampleInfo.push(gf_MakeDhxGridHeader("Sales",'80','left','int','edn',false,'',''));
		dhxGridSampleInfo.push(gf_MakeDhxGridHeader("Title",'120','right','int','ro',false,'',''));
		dhxGridSampleInfo.push(gf_MakeDhxGridHeader("Author",'120','left','str','ro',false,'',''));
		dhxGridSampleInfo.push(gf_MakeDhxGridHeader("Price",'80','right','int','price',false,'',''));
		dhxGridSampleInfo.push(gf_MakeDhxGridHeader("In Store Info",'80','center','str','ch',false,'',''));
		dhxGridSampleInfo.push(gf_MakeDhxGridHeader("Shipping",'80','left','str','co',false,'',''));
		dhxGridSampleInfo.push(gf_MakeDhxGridHeader("Bestseller",'80','center','str','ra',false,'',''));
		dhxGridSampleInfo.push(gf_MakeDhxGridHeader("Published",'100','center','str','ro',false,'',''));
		
		var attacheGrid_subTotal = gf_MakeDhxGrid('gridbox_subTotal', dhxGridSampleInfo, false, false, false, null);	// divId, gridInfo, muiltiselet, attachHeaderYn, footerYn, attachHeaderArr
		
		attacheGrid_subTotal.enableAutoWidth(true);
		//attacheGrid_subTotal.setColSorting("na,na,na,na,na,na,na,na")
		
		/*
			dhtmlxgrid.css
			의
			div.gridbox {
				overflow: hidden;
				text-align: center;
			}
			부분때문에 중앙정렬이 되서 P 태그 사용 (아래에서)
		*/
		attacheGrid_subTotal.customGroupFormat=function(name,count){  // 그룹(소계) 부분에 나타날 문자
		    return "<span style='text-align:left;margin-top:0px; padding-top:0px;color:#1e5ca0;font-weight: bold;'>" + name + " ( 소계 = " + gf_NumberWithCommas(attacheGrid_subTotal.groupStat(name,0,"stat_total")) + " )</span>";
		    /*	title        - displayes the group key;
				stat_total   - calculates the total of values in a group;
				stat_max     - calculates the maximum value in a group;
				stat_min     - calculates the minimum value in a group;
				stat_average - calculates the average value in a group;
				stat_count   - calculates the count of records in a group; */
		}
		
		attacheGrid_subTotal.load("${pageContext.request.contextPath}/js/dhtmlx/grid.xml");  // load = loads data from an external file : 본 프로젝트에서는 local data 사용하므로 실제로는 사용 안됨 : parse 사용
		// attacheGrid_subTotal.parse(data.data.records, 'js');
		attacheGrid_subTotal.attachEvent("onDataReady",function(){
			attacheGrid_subTotal.groupBy(2);  // 그룹(소계) 적용 할 컬럼 인덱스
		});
	}
	
	// rowSpan
	var attacheGrid_rowSpan = function(){
		var dhxGridMhsEmpListInfo = [];
	    dhxGridMhsEmpListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titNum'),   '50', 'right', 'int', 'edn', false, 'num', '')); // 번호
	    dhxGridMhsEmpListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titEmpno'), '100', 'center', 'str', 'ro', false, 'empno', '')); // 사원번호
	    dhxGridMhsEmpListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titEmpNm'), '300', 'center', 'str', 'ro', false, 'korNm', '')); // 한글 
	    dhxGridMhsEmpListInfo.push(gf_MakeDhxGridHeader(gf_LocaleTrans('default', 'titDeptCode'), '*', 'center', 'str', 'ro', false, 'deptCodeNm', '')); // 부서 코드
	    dhxGridMhsEmp = gf_MakeDhxGrid('gridbox_rowSpan', dhxGridMhsEmpListInfo, true, false, false);
	    
	    dhxGridMhsEmp.enableRowspan(true); //PRO : rowSpan 구현하려면 선언해야 함
	    
	    dhxGridMhsEmp.enableAutoWidth(true);
	    dhxGridMhsEmp.setColSorting("na,na,na,na")
		
	    var jsonParameter = {
            bplcCode : '1000', //사업장
        	gridSearchAt : 'Y'  //그리드 조회인지 구분 , 그리드 조회 시만 사용
        };

        gf_Transaction('gridbox_rowSpan', 'sample/data/searchMhsEmp_rowspanSample', jsonParameter, 'fn_CallbackSearchGridList1', false, 'GET');
	}
	
	// colSpan
	var attacheGrid_colSpan = function(){
		var dhxGridSampleInfo = [];
		dhxGridSampleInfo.push(gf_MakeDhxGridHeader("NUM",'100','left','int','edn',false,'num',''));
		dhxGridSampleInfo.push(gf_MakeDhxGridHeader("Title1",'200','center','str','ro',false,'nm1',''));
		dhxGridSampleInfo.push(gf_MakeDhxGridHeader("Title2",'200','center','str','ro',false,'nm2',''));
		dhxGridSampleInfo.push(gf_MakeDhxGridHeader("AMT",'*','right','int','edn',false,'amt',''));
		
		dhxGridColspan = gf_MakeDhxGrid('gridbox_colSpan', dhxGridSampleInfo, false, false, false, null);	// divId, gridInfo, muiltiselet, attachHeaderYn, footerYn, attachHeaderArr
		
		dhxGridColspan.enableCollSpan(true);  //PRO : colSpan 구현하려면 선언해야 함
		
		dhxGridColspan.enableAutoWidth(true);
		dhxGridColspan.setColSorting("na,na,na,na")
		
		var jsonParameter = {};
		
		gf_Transaction('gridbox_colSpan', 'sample/data/search_colSpanSample', jsonParameter, 'fn_CallbackSearchGridList2', false, 'GET');
	}

	//rowspan 데이터 조회 Callback
	var fn_CallbackSearchGridList1 = function (strSvcID, targetID, data){
		dhxGridMhsEmp.clearAll();
	    if(!gf_IsNull(data.data.records)){
	    	dhxGridMhsEmp.parse(data.data.records, 'js');
	    }
	};
	
	//colspan 데이터 조회 Callback
	var fn_CallbackSearchGridList2 = function (strSvcID, targetID, data){
		dhxGridColspan.clearAll();
		var totCnt = data.data.records.length;
	    if(!gf_IsNull(data.data.records) && totCnt > 0){
	    	dhxGridColspan.parse(data.data.records, 'js');
	    	
	    	//그리드에서 특정 row의 특정 cell 타입 변경
	    	var menus = data.data.records;
	    	for (var i=0; i < totCnt; i++) {
	    		var menu = menus[i];
	    		if(typeof menu.nm1 == "object" && menu.nm1.value == "SUBSUM"){
	    			dhxGridColspan.setCellTextStyle(i+1,1,"color:#f15b22;font-weight: bold;");
	    			dhxGridColspan.setCellTextStyle(i+1,3,"color:#f15b22;font-weight: bold;");
	    		}
	    	}
	    }
	};
	
	//이미지 버튼이 호출한 함수
	var fn_CalGridImg = function(rid){
		alert(rid);
	}
	
	//달력
	var attacheGrid_date = function(){
		var dhxGridSampleInfo = [];
		dhxGridSampleInfo.push(gf_MakeDhxGridHeader("No",'80','center','int','edn',false,'num',''));
		dhxGridSampleInfo.push(gf_MakeDhxGridHeader("Title",'120','center','str','ed',false,'nm1',''));
		dhxGridSampleInfo.push(gf_MakeDhxGridHeader("Date",'100','center','date','dhxCalendarA',false,'nm2',''));
		dhxGridSampleInfo.push(gf_MakeDhxGridHeader("#cspan",'30','center','str','button',false,'num',''));
		dhxGridSampleInfo.push(gf_MakeDhxGridHeader("Img",'50','center','str','img',false,'nm3',''));  //java 참조 : 이미지 버튼
		
		dhxGridDate = gf_MakeDhxGrid('gridbox_date', dhxGridSampleInfo, false, false, false, null);	// divId, gridInfo, muiltiselet, attachHeaderYn, footerYn, attachHeaderArr
		
		dhxGridDate.setDateFormat("%Y-%m-%d");
		dhxGridDate.enableAutoWidth(true);	
		
		var jsonParameter = {};
		
		gf_Transaction('gridbox_date', 'sample/data/search_dateSample', jsonParameter, 'fn_CallbackDateGridList', false, 'GET');
		
		dhxGridDate.attachEvent("onEditCell",fn_gridDateonEditCell); 
	}
	var fn_gridDateonEditCell = function(stage,rId,cInd,nValue,oValue){
		if(cInd == 0) return false;
		else if(cInd == 2) {
			//var dt = dhxGridDate._grid_calendarA.getDate(true);
			//console.log(dt);
			return true;
		}
        else return true;
	}
	var fn_CallbackDateGridList = function (strSvcID, targetID, data){
		dhxGridDate.clearAll();
	    if(!gf_IsNull(data.data.records)){
	    	dhxGridDate.parse(data.data.records, 'js');
	    }
	    
	    dhxGridDate._grid_calendarA.loadUserLanguage("ko");
	    dhxGridDate._grid_calendarA.hideTime();
	    
	  	//달력 이벤트 추가
	    dhxGridDate._grid_calendarA.attachEvent("onClick", function(date){
	    	fn_gridGetDate(dateFormat(dhxGridDate._grid_calendarA.getDate()));
	    });
	}

	var strGetRowChk  = 0;  //이미지 버튼 클릭하여 날짜 받을때 날짜 컬럼에 안들어 가므로 강제 처리해야 함
	var fn_gridCalendar = function (rid) {
    	var strGridDate = gf_DhxGetValue(dhxGridDate, rid, 'nm2', 'grid');
    	
    	var target = $('#gridImgCal_' + rid);
    	//var nTop = Math.trunc(target.offset().top);  //IE 안됨
    	var nTop = (target.offset().top).toFixed(0);
    	//var nLeft = Math.trunc(target.offset().left);
    	var nLeft = (target.offset().left).toFixed(0);
    	var calLeft = dhxGridDate._grid_calendarA._px;
    	if(typeof calLeft == "undefined" || calLeft == null || calLeft == 0){
    		dhxGridDate._grid_calendarA._px = nLeft-10;
    	}
    	dhxGridDate._grid_calendarA._py = nTop-7;  //하나의 높이 28, x는 동일하므로 필요 없음
    	
    	dhxGridDate._grid_calendarA.setDate(strGridDate);
    	strGetRowChk = rid;
		dhxGridDate._grid_calendarA._show();
	}
	var fn_gridGetDate = function (strDate) {
		if(strGetRowChk > 0){
			if(typeof strDate != "undefined" || strDate != null || strDate != ""){
				gf_DhxSetValue(dhxGridDate, strGetRowChk, 'nm2', strDate, 'grid');
			}
			strGetRowChk = 0;
		}
	}

	//사용자정의 그리드 타입
	function eXcell_button(cell){ //the eXcell name is defined here
	    if (cell){                // the default pattern, just copy it
	        this.cell = cell;
	        this.grid = this.cell.parentNode.grid;
	    }
	    this.edit = function(){}  //read-only cell doesn't have edit method
	    // the cell is read-only, so it's always in the disabled state
	    this.isDisabled = function(){ return true; }
	    this.setValue=function(val){
	        this.setCValue("<div id=''></div><img alt='' src='/xerp/img/sub/icon_calen.png' style='cursor:pointer' id='gridImgCal_" + val + "' onClick='javascript:fn_gridCalendar("+val+");'>");                                      
	    }
	}
	eXcell_button.prototype = new eXcell;// nests all other methods from the base class
	
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
	
	//주민번호 마스킹 적용
    var attacheGrid_jumin = function(){
        var dhxGridSampleInfo = [];       
        dhxGridSampleInfo.push(gf_MakeDhxGridHeader("No",'80','center','int','cntr',false,'num',''));
        dhxGridSampleInfo.push(gf_MakeDhxGridHeader("주민번호",'*','left','str','juminMaskro',false,'jumin',''));        
        var dhxGridJumin = gf_MakeDhxGrid('gridbox_jumin', dhxGridSampleInfo, false, false, false, null); // divId, gridInfo, muiltiselet, attachHeaderYn, footerYn, attachHeaderArr
        
        dhxGridJumin.clearAll();        
        var records = [{jumin:'8474431234457'}, {jumin:'7474432234455'}];        
        dhxGridJumin.parse(records, 'js'); 
    }
	
</script>

<div class="dhxwin_hdr">그리드 샘플</div>

<div style="float:left; width:2%"></div>
<div style="float:right; width:98%">
	<br/>
	<h1>* Multirow header</h1>
	<br/>
	<div id="gridbox" style="width:778px;height:364px;overflow:hidden"></div>
	
	<br/><br/>
	<h1>* Footer Total(Sum)</h1>
	<br/>
	<div id="gridbox_total" style="width:740px;height:380px;overflow:hidden"></div>
	
	<br/><br/>
	<h1>* Sub Total(Sum) : 소계 기능 없음, group 기능을 응용하여 유사 소계기능 구현</h1>
	<br/>
	<div id="gridbox_subTotal" style="width:740px;height:520px;overflow:hidden"></div>
	
	<br/><br/>
	<h1>* Grid RowSpan : java에서 데이터 가공 필요</h1>
	<br/>
	<div id="gridbox_rowSpan" style="width:740px;height:340px;overflow:hidden"></div>
	
	<br/><br/>
	<h1>* Grid ColSpan : java에서 데이터 가공 필요</h1>
	<br/>
	<div id="gridbox_colSpan" style="width:740px;height:255px;overflow:hidden"></div>
	
	<br/><br/>
	<h1>* Grid 달력 / 이미지</h1>
	<br/>
	<div id="gridbox_date" style="width:740px;height:255px;overflow:hidden"></div>
	
    <br/><br/>
    <h1>* 시스템공통 - 주민번호 마스킹</h1>
    <br/>
    <div id="gridbox_jumin" style="width:740px;height:255px;overflow:hidden"></div>
	<br/><br/>
</div>	
</body>