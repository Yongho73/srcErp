/*----------------------------------------------------------------------------------
 * 전체 라이브러리 중 어떤 다른 부분에도 의존하지 않는 가장 핵심적인 부분이다.
 * 기본적인 데이타 타입과 관련된 기능과
 * 기본 자료형의 prototype 확장을 담고 있다.
----------------------------------------------------------------------------------*/

/**
 * 문자열을 추적 로그를 남긴다.
 * @param sValue string 출력할 로그
 * @returns none
 * @author 변형구
 * @since 2013-03-01
 * @version 1.0
 */
var gf_Trace = function(sValue) {
    if(typeof(window.console) != "undefined"){
        console.log(sValue);
    } else {
        alert(sValue);
    }
};
 
/**
 * 문자열을 추적 로그를 남긴다.
 * @param f 실행할 함수
 * @author 김흥수
 * @since 2016-04-15
 * @version 1.0
 */
var gf_SafeRun = function(f) {
        try{f();}catch(e){gf_Trace(e.toString());}
};

/**
 * 자바스크립트 객체를 상속받는다.
 * P class를 상속받아 C 클래스를 만든다.
 * @param C class 상속을 받을 클래스
 * @param P class 상속을 해줄 클래스
 * @returns none
 * @author 변형구
 * @since 2013-03-01
 * @version 1.0
 */
var inherid = function(C,P) {
    var F = function(){};
    F.prototype = P.prototype;
    C.prototype = new F();
};

/**
 * 입력값이 null 또는 white space로만 이루어져 있는지 확인 하는 함수
 * @param sValue
 * @returns true / false ( null 여부)
 * @author Jun.
 * @since 2013-03-27
 * @version 1.0
 */
var gf_IsNull = function(sValue) {
    if (typeof (sValue) == "undefined" )
        return true;
    if (new String(sValue).valueOf() == "undefined")
        return true;
    if (sValue == null)
        return true;
    var v_ChkStr = new String(sValue);
    if (v_ChkStr == null)
        return true;
    if (v_ChkStr.toString().length == 0)
        return true;
    if ((typeof (sValue) == 'boolean') && sValue == false)
        return true;
    if (new String(sValue).valueOf() == 'false')
        return true;
    return false;
};

/**
 * 입력값이 객체 null 인가? gf_IsNull의 경우 빈문자열도 null로 판정하지만 이 함수는 진짜 null 또는 미 정의 객체만 null로 판정한다.
 * 그러므로 인자값이 null인지를 판정하는 경우등에 사용한다.
 * @param value Object 검사 대상 객체
 * @returns true / false ( null 여부)
 * @author 김흥수
 * @since 2015-08-26
 * @version 1.0
 */
var gf_IsObjNull = function(value) {
    return (typeof (value) == "undefined"  || value == null );
};

/**
 * 객체의 내용이 비어있는가?
 * 객체가 null이 아니지만 해당 객체의 자체 속성이 전혀 없다면 비어있는 객체이다.
 * 이러한 객체를 판정한다.
 * @param o
 * @returns true / false
 * @author 김흥수
 * @since 2015-12-01
 * @version 1.0
 */
var gf_IsEmptyObject = function(o) {
    for(var i in o ) {
        if(o.hasOwnProperty(i)) return false;
    }
    return true;
};

/**
 * 입력된 값이 null인 경우 주어진 값으로 셋팅하여 돌려줌(기본값등의 설정에 사용됨)
 *
 * @param sVal Object 검증 대상 객체
 * @param strSetVal Object 기본값
 * @returns Object sVal이 null이 아니면 sVal 아니면 strSetVal을 리턴한다.
 * @author Jun.
 * @since 2013-03-27
 * @version 1.0
 */
var gf_SetNullInit = function(sVal, strSetVal) {
    if(gf_IsNull(sVal)) {
        return gf_IsNull(strSetVal) ? "" : strSetVal;
    } else {
        return sVal;
    }
};

/**
 * 함수 별칭 정의
 * @param val
 * @returns
 */
gf_setNullInit = gf_SetNullInit;
gf_NullToEmpty = gf_SetNullInit;
gf_Default = gf_SetNullInit;
gf_GetValue = gf_SetNullInit;

/**
 * URI ENCODE 된 한글값을 리턴함
 * @param val 한글값
 * @returns URI ENCODE 된 한글값
 * @author Jun.
 * @since 2013-03-04
 * @version 1.0
 */
var gf_Hangle = function(val){
    return encodeURIComponent(val);
};

/**
 * 스트링의 자릿수를 Byte 단위로 환산하여 알려준다 영문, 숫자는 1Byte이고 한글은 3Byte이다.(자/모 중에 하나만 있는 글자도 3Byte이다.)
 * @function
 * @param value  스트링
 * @returns 문자열의 byte 길이
 * @author 홍두희
 * @since 2011-10-01
 * @version 1.0
 */
var gf_GetByteLength = function(value) {
    var byteLength = 0;
    if (gf_IsNull(value)) {
        return 0;
    }
    var c;
    for ( var i = 0; i < value.length; i++) {
        c = escape(value.charAt(i));
        if (c.length == 1) { // when English then 1byte
            byteLength++;
        } else if (c.indexOf("%u") != -1) { // when Korean then 3byte
            byteLength += 3;                // utf-8 : 3
        } else if (c.indexOf("%") != -1) {  // else 3byte
            byteLength += c.length / 3;
        }
    }
    return byteLength;
};

/**
 * 스트링의 자릿수를 Byte 단위로 환산하여 알려준다 영문, 숫자는 1Byte이고 한글은 2Byte이다.(자/모 중에 하나만 있는 글자도 2Byte이다.)
 * @function
 * @param value  스트링
 * @returns 문자열의 byte 길이
 * @author 홍두희
 * @since 2011-10-01
 * @version 1.0
 */
var gf_GetByteLength2 = function(value) {
    var byteLength = 0;
    if (gf_IsNull(value)) {
        return 0;
    }
    var c;
    for ( var i = 0; i < value.length; i++) {
        c = escape(value.charAt(i));
        if (c.length == 1) { // when English then 1byte
            byteLength++;
        } else if (c.indexOf("%u") != -1) { // when Korean then 3byte
            byteLength += 2;                // utf-8 : 3
        } else if (c.indexOf("%") != -1) {  // else 3byte
            byteLength += c.length / 3;
        }
    }
    return byteLength;
};

/**
 * input value의 byteLength 와 maxlength 비교
 * @function
 * @param value 
 * @returns boolean
 */
var gf_ValByteLengthCheck = function(tag){
	var valLength = gf_GetByteLength2(tag.val());
	var maxLength = tag.context.maxLength; 
	if(valLength > maxLength){
		return true;
	}
	else{
		return false;
	}
}

/**
 * 해당 값이 decimal인지 검증
 * @param val 검증할 객체
 * @returns boolean val이 decimal이면 true 아니면 false
 * @author 김흥수
 * @since 2015-09-04
 * @version 1.0
 */
var gf_IsDecimal = function(val) {
    return !gf_IsObjNull(val) && !gf_IsObjNull(val.isDecimal) && val.isDecimal();
};

/**
 * 문자열에서 숫자를 formatting한 formatting 문자열을 제거한 숫자 문자열만을 리턴한다.
 * @param str 변형할 문자열
 * @returns formatting이 제거된 숫자형 문자열
 * @author 김흥수
 * @since 2015-09-18
 * @version 1.0
 */
var gf_UnformatNumber = function(str) {
    if(gf_IsNull(str)) return str;
    if(typeof(str) != "string"){
        str = str + "";
    }
    return str.replace(/[^0-9-.eE+]/g, '');
};

/**
 * 특정 값을 decimal로 변환
 * @param objValue decimal로 변환할 객체
 * @param retValue null일 경우 리턴할 값 만약 retValue가 null이면 decimal 0을 리턴한다.
 * @param throwError 문자열을 decimal로 변형하다가 에러가 발생하는 경우 exception을 throw 할지를 결정한다. true 이면 exception을 throw 한다.
 *        기본값은 false이다.
 * @returns 특정 값을 decimal로 변환한 값
 * @author 김흥수
 * @since 2015-09-04
 * @version 1.0
 */
var gf_GetDecimal = function(objValue, retValue , throwError) {
	throwError = gf_Default(throwError,false);
    try {
        if(gf_IsDecimal(objValue)) return objValue;
        if(gf_IsObjNull(objValue) ) return new BigDecimal(gf_Default(retValue,"0")+"");
        return  new BigDecimal(gf_UnformatNumber(objValue+""));
    } catch(e) {
        if(throwError) throw "숫자형이 아닙니다.";
        if(gf_IsObjNull(retValue) ) return new BigDecimal("0");
        return new BigDecimal(retValue+"");
    }
};

/**
 * 숫자를 구합니다. 일반 숫자
 * @param objValue 숫자로 변환할 객체
 * @param retValue null일 경우 리턴할 값
 * @returns Number 특정 값을 숫자로 변환한 값
 * @author 김흥수
 * @since 2015-09-18
 * @version 1.0
 */
var gf_GetNumber = function(objValue, retValue) {
	var ret = 0;
    if(gf_IsObjNull(retValue)) {
    	if(objValue == undefined || gf_IsObjNull(objValue)) {
            return ret ;
        }
    } else {
        if(gf_IsDecimal(objValue)) {
            objValue = objValue.toString();
        }
        
        if( gf_IsObjNull(objValue)) {
            ret = Number(retValue);
            if(isNaN(ret)) ret = 0;
            return ret;
        }
    }
    ret = Number(gf_UnformatNumber(objValue+""));
    if(isNaN(ret)) ret = 0;
    return ret;
};

/**
 * 숫자를 형식화한다.
 * <pre>
 * 형식화에는 '#','0'',','.','-','+' 이 사용된다.
 *   # : 숫자를 나타내며 무효한 0은 생략한다.
 *   0 : 숫자를 나타내며 무효한 0을 0으로 표시한다.
 *   , : 숫자의 자릿수 표시자
 *   . : 소숫점 위치 지정
 *   - : 제일 앞에 이 표시가 있으면 음수인 경우만 부호를 표시한다.(없어도 음수인 경우는 부호를 표시한다.)
 *   + : 제일 앞에 이 표시가 있으면 양수인 경우도 부호를 표시한다.
 * </pre>
 * @param num 숫자,decimal 또는 숫자형 문자열
 * @param format format 지정자
 * @returns 형식이 적용된 숫자 문자열
 * @author 김흥수
 * @since 2015-09-18
 * @version 1.0
 */
var gf_FormatNumber = function(num,format) {

	if(gf_IsNull(num)) return "";

    var dec = gf_GetDecimal(num,"0",true).pack();
    var desStr = dec.toString("PLAIN");
    if(gf_IsNull(format)) return desStr;

    var formatBase = format.indexOf(".");
    if(formatBase < 0 ) formatBase = format.length;

    dec = dec.roundHalfUp(Math.max(0,format.length - formatBase - 1 )).pack();
    desStr = dec.toString("PLAIN");
    desStr = desStr.replace(/[-+]/g, '');

    var decBase = desStr.indexOf(".");
    if(decBase < 0 ) decBase = desStr.length;
    var commaLength = -1;
    var commaDistance = 0;
    var lastComma = -1;
    var decPosition = decBase - 1;
    var formatPosition = formatBase - 1;
    var ret = [];
    var signFormat = "-";
    var currFormat = "";
    var lastFormat = "";

    while(decPosition >= 0) {
        if( formatPosition < 0 ) {
            if(commaLength >= 0) {
                if(commaLength <= lastComma ) {
                    lastComma = 0;
                    ret.push(",");
                }
            }
            ret.push(desStr.substr(decPosition,1));
            decPosition --;
            if(commaLength >= 0) lastComma ++;
        } else {
            currFormat = format.substr(formatPosition,1);
            if(currFormat == "#" ) {
                lastFormat = currFormat;
                if( decPosition != 0 || desStr.substr(decPosition,1) != "0") {
                    ret.push(desStr.substr(decPosition,1));
                    if(commaLength >= 0) lastComma ++;
                }
                decPosition --;
                formatPosition --;
                commaDistance ++;

            } else if (currFormat == "0" ) {
                lastFormat = currFormat;
                ret.push(desStr.substr(decPosition,1));
                if(commaLength >= 0) lastComma ++;
                decPosition --;
                formatPosition --;
                commaDistance ++;
            } else if (currFormat == "," ) {
                if(formatPosition == 0 ) throw "숫자 형식에 컴마는 제일 앞에 올 수 없습니다.";
                commaLength = commaDistance;
                if(commaLength == 0) throw "숫자 형식에 컴마는 연속으로 올 수 없습니다.";
                commaDistance = 0;
                ret.push(",");
                formatPosition --;
                lastComma = 0;
            } else if (currFormat == "." ) {
                throw "숫자 형식에 소숫점이 두번 이상 나타났습니다.";
            } else if (currFormat == "+" ) {
                if(formatPosition != 0 ) throw "숫자 형식에 부호 지정자는 제일 앞에 나와야 합니다.";
                signFormat = currFormat;
                formatPosition --;
            } else if (currFormat == "-" ) {
                if(formatPosition != 0 ) throw "숫자 형식에 부호 지정자는 제일 앞에 나와야 합니다.";
                signFormat = currFormat;
                formatPosition --;
            }
        }
    }
    while( formatPosition >= 0) {
        currFormat = format.substr(formatPosition,1);
        if(currFormat == "#" ) {
            lastFormat = currFormat;
            formatPosition --;
            commaDistance ++;
        } else if (currFormat == "0" ) {
            lastFormat = currFormat;
            ret.push("0");
            if(commaLength >= 0) lastComma ++;
            formatPosition --;
            commaDistance ++;
        } else if (currFormat == "," ) {
            if(formatPosition == 0 ) throw "숫자 형식에 컴마는 제일 앞에 올 수 없습다.";
            commaLength = commaDistance;
            if(commaLength == 0) throw "숫자 형식에 컴마는 연속으로 올 수 없습니다.";
            commaDistance = 0;
            if(lastFormat == "0" || (formatPosition > 0 && format[formatPosition - 1] == "0" )) ret.push(",");
            formatPosition --;
            lastComma = 0;
        } else if (currFormat == "." ) {
            throw "숫자 형식에 소숫점이 두번 이상 나타났습니다.";
        } else if (currFormat == "+" ) {
            if(formatPosition != 0 ) throw "숫자 형식에 부호 지정자는 제일 앞에 나와야 합니다.";
            signFormat = currFormat;
            formatPosition --;
        } else if (currFormat == "-" ) {
            if(formatPosition != 0 ) throw "숫자 형식에 부호 지정자는 제일 앞에 나와야 합니다.";
            signFormat = currFormat;
            formatPosition --;
        }
    }
    if(dec.isNegative()) {
        ret.push("-");
    }
    if(dec.isPositive() && signFormat == "+") {
        ret.push("+");
    }
    ret = ret.reverse();
    var outDot = false;
    decPosition = decBase + 1;
    formatPosition = formatBase + 1;
    while(formatPosition < format.length) {
        currFormat = format.substr(formatPosition,1);
        if(currFormat == "#" ) {
            lastFormat = currFormat;
            formatPosition ++;
            if(decPosition < desStr.length) {
                if(! outDot) {
                    outDot = true;
                    ret.push(".");
                }
                ret.push(desStr.substr(decPosition,1));
                decPosition ++;
            }
        } else if (currFormat == "0" ) {
            lastFormat = currFormat;
            formatPosition ++;
            if(decPosition < desStr.length) {
                if(! outDot) {
                    outDot = true;
                    ret.push(".");
                }
                ret.push(desStr.substr(decPosition,1));
                decPosition ++;
            } else {
                if(! outDot) {
                    outDot = true;
                    ret.push(".");
                }
                ret.push("0");
            }
        } else if (currFormat == "," ) {
            throw "숫자 형식에 소숫점 아래로는 컴마가 올 수 없습다.";
        } else if (currFormat == "." ) {
            throw "숫자 형식에 소숫점이 두번 이상 나타났습니다.";
        } else if (currFormat == "+" ) {
            throw "숫자 형식에 부호 지정자는 제일 앞에 나와야 합니다.";
        } else if (currFormat == "-" ) {
            throw "숫자 형식에 부호 지정자는 제일 앞에 나와야 합니다.";
        }
    }
    return ret.join("");
};


/**
 * 사업자등록번호 패턴을 리턴한단
 * @param num 사업자등록번호
 * @returns 사업자등록번호 포멧으로 변환한 값
 * @author 유창기
 * @since 2020-05-25
 * @version 1.0
 */
var gf_SetBizNoFormatter = function(num) {
	var formatNum = '';
    try{
         if (num.length == 10) {
                 formatNum = num.replace(/(\d{3})(\d{2})(\d{5})/, '$1-$2-$3');
         }
         else {
                formatNum = num;
         }
    } catch(e) {
         formatNum = num;
         console.log(e);
    }
    return formatNum;
};

/*----------------------------------------------------------------------------------
 * Array prototype 함수
 ----------------------------------------------------------------------------------*/
if (!Array.prototype.indexOf) {
    /**
     * 배열내에서 특정 객체를 검색하여 해당 객체의 인덱스를 리턴
     * @param elt 검색하고자하는 객체
     * @author 김흥수
     * @since 2015-08-26
     * @version 1.0
     */
    Array.prototype.indexOf = function(elt /*, from*/)
    {
        var len = this.length;

        var from = Number(arguments[1]) || 0;
        from = (from < 0) ? Math.ceil(from) : Math.floor(from);
        if (from < 0) from += len;

        for (; from < len; from++)
        {
            if (from in this && this[from] === elt) return from;
        }
        return -1;
    };
}

if(! Array.prototype.removeRows){
    /**
     * 배열의 특정 위치들의 데이터를 삭제 한다.
     * @param arr 배열의 행 인덱스의 배열
     * @author 김흥수
     * @since 2015-08-26
     * @version 1.0
     */
    Array.prototype.removeRows = function(arr){
        var removed = [];
        var _this = this;
        var _len = this.length;
        arr.sort(function(a,b) { var c = a-b; if(c > 0) return 1; else if (c == 0 ) return 0; else return -1; });
        if(this.length >= 65535 && arr.length >= 100 ) {
            var idx = 0;
            var newArr = this.filter(function(v,i) {
                if(idx >= arr.length) {
                    return true;
                } else if(i < arr[idx]) {
                    removed.push(_this[i]);
                    return true;
                } else {
                    while(idx < arr.length && i >= arr[idx]) {
                        idx ++;
                    }
                    return false;
                }
            });
            this.clear();
            this.pushArray(newArr);
            return removed;
        } else {
            arr.forEachReverse(function( row ) { if(row >= 0 && row < _len ) { removed.push(_this[row]); _this.removeRange(row); } } );
            return removed.reverse();
        }
    };
}

if(! Array.prototype.removeValues){
    /**
     * 배열의 특정 값들을 삭제한다.
     * @param arr 배열에서 값들의 배열
     * @author 김흥수
     * @since 2015-08-26
     * @version 1.0
     */
    Array.prototype.removeValues = function(arr){
        var _this = this;
        var rows = arr.hvcMap(function(v){ return _this.indexOf(v); });
        this.removeRows(rows);
    };
}

if(! Array.prototype.removeRange){
    /**
     * 배열의 특정 범위의 데이터를 삭제 한다.
     * @param from(int) 배열에서 삭제할 시작 index
     * @param to(int) 배열에서 삭제할 끝 index 만약 생략되면 from과 같다.(즉 하나만 지워짐)
     * @author 김흥수
     * @since 2015-08-26
     * @version 1.0
     */
    Array.prototype.removeRange = function(from,to){
        if(gf_IsNull(to)) to = from;
        this.splice(from,to-from+1);
        return this;
    };
}

if(! Array.prototype.remove){
    /**
     * 배열의 특정 범위의 데이터를 삭제 한다.
     * @param from(int) 배열에서 삭제할 시작 index
     * @param to(int) 배열에서 삭제할 끝 index 만약 생략되면 from과 같다.(즉 하나만 지워짐)
     * @author 김흥수
     * @since 2015-08-26
     * @version 1.0
     */
    Array.prototype.remove = function(from,to){
        return this.removeRange(from,to);
    };
}

if(! Array.prototype.clear){
    /**
     * 배열 완전 삭제
     * @author 김흥수
     * @since 2015-08-26
     * @version 1.0
     */
    Array.prototype.clear = function(){
        this.remove(0,this.length - 1);
    };
}

if(! Array.prototype.moveTo){
    /**
     * 배열의 특정 요소를 다른 곳으로 이동한다.
     * @param from(int) 배열에서 이동할 대상 행의 번호
     * @param to(int) 배열에서 이동할 목표 위치의 행번호(이 위치의 바로 앞으로 이동한다. to가 3이면 3번 행이 뒤로 하나 밀리고 그 자리에 들어간다.)
     * @author 김흥수
     * @since 2015-08-26
     * @version 1.0
     */
    Array.prototype.moveTo = function(src, dst) {   //이동
        if(this.length <= 0) throw "배열이 비어 있습니다.";
        if(src < 0 || src >= this.length) throw "src의 행번호 위치가 잘못되었습니다.";
        if(dst < 0 ) dst = 0;
        if(dst >= this.length) dst = this.length;
        if(src == dst) return;      //내 앞으로 이동하나 이동 안하나 같다
        if(src + 1 == dst) return;  //내 뒤의 바로 앞으로 이동하나 이동 안하나 같다.
        var moveWhat = this[src];
        this.remove(src,src);
        if(dst > src) dst --;
        this.splice(dst,0,moveWhat);
    };
}

if(! Array.prototype.insert){
    /**
     * 배열에 값을 특정 위치에 끼워 넣는다.
     * @param index(int) 배열을 끼워넣을 위치
     * @param obj(Object) 끼워넣을 객체
     * @author 김흥수
     * @since 2015-08-26
     * @version 1.0
     */
    Array.prototype.insert = function(index,obj) {
        if(index >= this.length) {
            this.push(obj);
        } else {
            this.splice(index,0,obj);
        }
    };
}

if(! Array.prototype.insertArray){
    /**
     * 배열에 배열을 특정 위치에 끼워 넣는다.
     * @param index(int) 배열을 끼워넣을 위치
     * @param arr(Array) 끼워넣을 배열
     * @author 김흥수
     * @since 2015-08-26
     * @version 1.0
     */
    Array.prototype.insertArray = function(index,arr) {
        if(index >= this.length) index = this.length;
        for(var i = arr.length - 1 ; i >= 0   ; i -- ) {
            this.insert(index,arr[i]);
        }
    };
}

if(! Array.prototype.pushArray){
    /**
     * 배열에 배열을 덧붙인다.
     * @param arr(Array) 덧붙일 배열
     * @author 김흥수
     * @since 2015-08-26
     * @version 1.0
     */
    Array.prototype.pushArray = function(arr) {
        for(var i = 0 ; i < arr.length ; i ++ ) {
            this.push(arr[i]);
        }
    };
}

if (!Array.prototype.every) {
    /**
     * 배열의 모든요소에 대하여 callbackfn을 호출한 결과가 모두 참이면 참을 리턴한다.(ECMA-262, 5th edition)
     * @param callbackfn 콜백 함수이다. 콜백함수의 스펙은 function(배열요소값,배열요소인덱스,배열) 이며 생략가능하다. 리턴은 boolean 이어야 한다.
     * @param thisArg callbackfn 함수 안에서 사용할 this 변수이다. 생략하면 void 0 이된다.
     * @returns boolean 모두 참이면 true 아니면 false
     * @author 김흥수
     * @since 2015-08-26
     * @version 1.0
     */
    Array.prototype.every = function(callbackfn, thisArg) {
        'use strict';
        var T, k;

        if (this == null) {
            throw new TypeError('this is null or not defined');
        }

        var O = Object(this);

        var len = O.length >>> 0;

        if (typeof callbackfn !== 'function') {
            throw new TypeError(callback + ' is not a function');
        }

        if (arguments.length > 1) {
            T = thisArg;
        } else {
            T = void 0;
        }

        k = 0;

        // 7. Repeat, while k < len
        while (k < len) {

            var kValue;

            if (k in O) {

                kValue = O[k];

                var testResult = callbackfn.call(T, kValue, k, O);

                // iii. If ToBoolean(testResult) is false, return false.
                if (!testResult) {
                    return false;
                }
            }
            k++;
        }
        return true;
    };
}

if (!Array.prototype.all) {
    Array.prototype.all = Array.prototype.every;
}

//Production steps of ECMA-262, Edition 5, 15.4.4.17
//Reference: http://es5.github.io/#x15.4.4.17
if (!Array.prototype.some) {
    /**
     * 배열의 모든요소에 대하여 fun을 호출한 결과가 모두 거짓이면 거짓을 리턴한다.(ECMA-262, Edition 5)
     * @param fun 콜백 함수이다. 콜백함수의 스펙은 function(배열요소값,배열요소인덱스,배열) 이며 생략가능하다. 리턴은 boolean 이어야 한다.
     * @param thisArg fun 함수 안에서 사용할 this 변수이다. 생략하면 void 0 이된다.
     * @returns 하나라도 참이면 true 아니면 false
     * @author 김흥수
     * @since 2015-08-26
     * @version 1.0
     */
    Array.prototype.some = function(fun/*, thisArg*/) {
        'use strict';

        if (this == null) {
            throw new TypeError('method called on null or undefined');
        }

        if (typeof fun !== 'function') {
            throw new TypeError(callback + ' is not a function');
        }

        var t = Object(this);
        var len = t.length >>> 0;

        var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
        for (var i = 0; i < len; i++) {
            if (i in t && fun.call(thisArg, t[i], i, t)) {
                return true;
            }
        }

        return false;
    };
}

if (!Array.prototype.any) {
    Array.prototype.any = Array.prototype.some;
}

//Production steps of ECMA-262, Edition 5, 15.4.4.18
//Reference: http://es5.github.io/#x15.4.4.18
if (!Array.prototype.forEach) {
    /**
     * 배열의 모든요소에 대하여 callbackfn을 호출한다.(ECMA-262, Edition 5)
     * @param callback 콜백 함수이다. 콜백함수의 스펙은 function(배열요소값,배열요소인덱스,배열) 이며 생략가능하다. 리턴은 없다.
     * @param thisArg callback 함수 안에서 사용할 this 변수이다. 생략하면 void 0 이된다.
     * @author 김흥수
     * @since 2015-08-26
     * @version 1.0
     */
    Array.prototype.forEach = function(callback, thisArg) {

        var T, k;

        if (this == null) {
            throw new TypeError(' this is null or not defined');
        }

        var O = Object(this);

        var len = O.length >>> 0;

        if (typeof callback !== "function") {
            throw new TypeError(callback + ' is not a function');
        }

        if (arguments.length > 1) {
            T = thisArg;
        } else {
            T = void 0;
        }

        k = 0;

        while (k < len) {

            var kValue;

            if (k in O) {

                kValue = O[k];

                callback.call(T, kValue, k, O);
            }
            k++;
        }
    };
}

if (!Array.prototype.forEachL) {
    /**
     * 배열의 모든요소에 대하여 callbackfn을 호출한다.(ECMA-262, Edition 5)(좌우선)
     * @param callback 콜백 함수이다. 콜백함수의 스펙은 function(배열요소값,배열요소인덱스,배열) 이며 생략가능하다. 리턴은 없다.
     * @param thisArg callback 함수 안에서 사용할 this 변수이다. 생략하면 void 0 이된다.
     * @author 김흥수
     * @since 2015-08-26
     * @version 1.0
     */
    Array.prototype.forEachL = function(callback, thisArg) {

        var T, k;

        if (this == null) {
            throw new TypeError(' this is null or not defined');
        }

        var O = Object(this);

        var len = O.length >>> 0;

        if (typeof callback !== "function") {
            throw new TypeError(callback + ' is not a function');
        }

        if (arguments.length > 1) {
            T = thisArg;
        } else {
            T = void 0;
        }

        k = 0;

        while (k < len) {

            var kValue;

            if (k in O) {

                kValue = O[k];

                callback.call(T, kValue, k, O);
            }
            k++;
        }
    };
}

//Production steps of ECMA-262, Edition 5, 15.4.4.18
//Reference: http://es5.github.io/#x15.4.4.18
if (!Array.prototype.forEachReverse) {
    /**
     * 배열의 모든요소에 대하여 뒤에서부터 callbackfn을 호출한다.(우 우선)
     * @param callback 콜백 함수이다. 콜백함수의 스펙은 function(배열요소값,배열요소인덱스,배열) 이며 생략가능하다. 리턴은 없다.
     * @param thisArg callback 함수 안에서 사용할 this 변수이다. 생략하면 void 0 이된다.
     * @author 김흥수
     * @since 2015-08-26
     * @version 1.0
     */
    Array.prototype.forEachReverse = function(callback, thisArg) {

        var T, k;

        if (this == null) {
            throw new TypeError(' this is null or not defined');
        }

        var O = Object(this);

        var len = O.length >>> 0;

        if (typeof callback !== "function") {
            throw new TypeError(callback + ' is not a function');
        }

        if (arguments.length > 1) {
            T = thisArg;
        } else {
            T = void 0;
        }

        k = len - 1;

        while (k >= 0) {

            var kValue;

            if (k in O) {

                kValue = O[k];

                callback.call(T, kValue, k, O);
            }
            k--;
        }
    };
}

/**
 * 배열의 모든요소에 대하여 뒤에서부터 callbackfn을 호출한다.(우 우선)
 * @param callback 콜백 함수이다. 콜백함수의 스펙은 function(배열요소값,배열요소인덱스,배열) 이며 생략가능하다. 리턴은 없다.
 * @param thisArg callback 함수 안에서 사용할 this 변수이다. 생략하면 void 0 이된다.
 * @author 김흥수
 * @since 2015-08-26
 * @version 1.0
 */
Array.prototype.forEachR = Array.prototype.forEachReverse;

//Production steps of ECMA-262, Edition 5, 15.4.4.18
//Reference: http://es5.github.io/#x15.4.4.18
if (!Array.prototype.forEachStoppable) {
    /**
     * 중단 가능한 forEach함수
     * 배열의 모든요소에 대하여 callbackfn을 호출한다.(ECMA-262, Edition 5) 단 callback이 true를 리턴하면 loop를 중단한다.
     * @param callback 콜백 함수이다. 콜백함수의 스펙은 function(배열요소값,배열요소인덱스,배열) 이며 생략가능하다. 리턴은 boolean 또는 없다.
     * @param thisArg callback 함수 안에서 사용할 this 변수이다. 생략하면 void 0 이된다.
     * @author 김흥수
     * @since 2015-08-26
     * @version 1.0
     */
    Array.prototype.forEachStoppable = function(callback, thisArg) {

        var T, k;

        if (this == null) {
            throw new TypeError(' this is null or not defined');
        }

        var O = Object(this);

        var len = O.length >>> 0;

        if (typeof callback !== "function") {
            throw new TypeError(callback + ' is not a function');
        }

        if (arguments.length > 1) {
            T = thisArg;
        } else {
            T = void 0;
        }

        k = 0;

        while (k < len) {

            var kValue;

            if (k in O) {

                kValue = O[k];

                var stop = callback.call(T, kValue, k, O);
                if(stop) break;
            }
            k++;
        }
    };
}

/**
 * 중단 가능한 forEach함수
 * 배열의 모든요소에 대하여 callbackfn을 호출한다.(ECMA-262, Edition 5) 단 callback이 true를 리턴하면 loop를 중단한다.
 * @param callback 콜백 함수이다. 콜백함수의 스펙은 function(배열요소값,배열요소인덱스,배열) 이며 생략가능하다. 리턴은 boolean 또는 없다.
 * @param thisArg callback 함수 안에서 사용할 this 변수이다. 생략하면 void 0 이된다.
 * @author 김흥수
 * @since 2015-08-26
 * @version 1.0
 */
Array.prototype.forEachS = Array.prototype.forEachStoppable;

//Production steps of ECMA-262, Edition 5, 15.4.4.18
//Reference: http://es5.github.io/#x15.4.4.18
if (!Array.prototype.forEachReverseStoppable) {
    /**
     * 배열의 모든요소에 대하여 뒤에서부터 callbackfn을 호출한다.(ECMA-262, Edition 5) 단 callback이 true를 리턴하면 loop를 중단한다.(우 우선)
     * @param callback 콜백 함수이다. 콜백함수의 스펙은 function(배열요소값,배열요소인덱스,배열) 이며 생략가능하다. 리턴은 boolean 또는 없다.
     * @param thisArg callback 함수 안에서 사용할 this 변수이다. 생략하면 void 0 이된다.
     * @author 김흥수
     * @since 2015-08-26
     * @version 1.0
     */
    Array.prototype.forEachReverseStoppable = function(callback, thisArg) {

        var T, k;

        if (this == null) {
            throw new TypeError(' this is null or not defined');
        }

        var O = Object(this);

        var len = O.length >>> 0;

        if (typeof callback !== "function") {
            throw new TypeError(callback + ' is not a function');
        }

        if (arguments.length > 1) {
            T = thisArg;
        } else {
            T = void 0;
        }

        k = len - 1;

        while (k >= 0) {

            var kValue;

            if (k in O) {

                kValue = O[k];

                var stop = callback.call(T, kValue, k, O);
                if(stop) break;
            }
            k--;
        }
    };
}
Array.prototype.forEachRS = Array.prototype.forEachReverseStoppable;

//Production steps of ECMA-262, Edition 5, 15.4.4.19
//Reference: http://es5.github.io/#x15.4.4.19
if (!Array.prototype.mapIf) {
    /**
     * 배열의 모든요소에 대하여 callback을 호출하고 그 결과를 배열에 담아 리턴한다. 콜백으로 주어진 condf의 호출 결과가 참이거나 condf 자체가 null인 경우에 한하여 배열에 추가된다.
     * @param callback 콜백 함수이다. 콜백함수의 스펙은 function(배열요소값,배열요소인덱스,배열) 이며 생략가능하다. 리턴은 아무것이나 상관없으며 이 값이 배열로 생성된다.
     * @param condf 콜백 함수이다. 콜백함수의 스펙은 function(배열요소값,배열요소인덱스,배열) 이며 생략가능하다. 리턴은 boolean 이며 true를 리턴하는 요소만 최종 리턴 배열에 포함된다.
     *         이 요소가 생략되거나 null이면 모든 요소에 대하여 callback이 호출된다.
     * @param thisArg callback 함수 안에서 사용할 this 변수이다. 생략하면 void 0 이된다.
     * @returns callback이 리턴한 값들의 배열
     * @author 김흥수
     * @since 2015-08-26
     * @version 1.0
     */
    Array.prototype.mapIf = function(callback,condf, thisArg) {

        var T, A, k, C;

        if (this == null) {
            throw new TypeError(' this is null or not defined');
        }

        var O = Object(this);

        var len = O.length >>> 0;

        if (typeof callback !== 'function') {
            throw new TypeError(callback + ' is not a function');
        }

        if (arguments.length > 2) {
            T = thisArg;
            C = condf;
        } else if (arguments.length > 1) {
            T = void 0;
            C = condf;
        } else {
            T = void 0;
            C = null;
        }
        A = [];
        k = 0;
        while (k < len) {

            var kValue, mappedValue;

            if (k in O) {

                kValue = O[k];
                if(C == null || C.call(T, kValue, k, O)) {
                    mappedValue = callback.call(T, kValue, k, O);
                    A.push(mappedValue);
                }
            }
            k++;
        }
        return A;
    };
}

if (!Array.prototype.hvcMap) {
    /**
     * 배열의 모든요소에 대하여 callback을 호출하고 그 결과를 배열에 담아 리턴한다.
     * @param callback 콜백 함수이다. 콜백함수의 스펙은 function(배열요소값,배열요소인덱스,배열) 이며 생략가능하다. 리턴은 아무것이나 상관없으며 이 값이 배열로 생성된다.
     * @param thisArg callback 함수 안에서 사용할 this 변수이다. 생략하면 void 0 이된다.
     * @returns callback이 리턴한 값들의 배열
     * @author 김흥수
     * @since 2015-08-26
     * @version 1.0
     */
    Array.prototype.hvcMap = function(callback,thisArg) {
        return this.mapIf(callback,null,thisArg);
    };
}

//Production steps of ECMA-262, Edition 5, 15.4.4.19
//Reference: http://es5.github.io/#x15.4.4.19
if (!Array.prototype.mapIfRight) {
    /**
     * 배열의 모든요소에 대하여 callback을 호출하고 그 결과를 배열에 담아 리턴한다. 콜백으로 주어진 condf의 호출 결과가 참이거나 condf 자체가 null인 경우에 한하여 배열에 추가된다.
     *         단 배열을 뒤에서부터 순회한다.
     * @param callback 콜백 함수이다. 콜백함수의 스펙은 function(배열요소값,배열요소인덱스,배열) 이며 생략가능하다. 리턴은 아무것이나 상관없으며 이 값이 배열로 생성된다.
     * @param condf 콜백 함수이다. 콜백함수의 스펙은 function(배열요소값,배열요소인덱스,배열) 이며 생략가능하다. 리턴은 boolean 이며 true를 리턴하는 요소만 최종 리턴 배열에 포함된다.
     *         이 요소가 생략되거나 null이면 모든 요소에 대하여 callback이 호출된다.
     * @param thisArg callback 함수 안에서 사용할 this 변수이다. 생략하면 void 0 이된다.
     * @returns callback이 리턴한 값들의 배열
     * @author 김흥수
     * @since 2015-08-26
     * @version 1.0
     */
    Array.prototype.mapIfRight = function(callback,condf, thisArg) {

        var T, A, k, C;

        if (this == null) {
            throw new TypeError(' this is null or not defined');
        }

        var O = Object(this);

        var len = O.length >>> 0;

        if (typeof callback !== 'function') {
            throw new TypeError(callback + ' is not a function');
        }

        if (arguments.length > 2) {
            T = thisArg;
            C = condf;
        } else if (arguments.length > 1) {
            T = void 0;
            C = condf;
        } else {
            T = void 0;
            C = null;
        }
        A = [];
        k = len - 1;
        while (k >= 0 ) {

            var kValue, mappedValue;

            if (k in O) {

                kValue = O[k];
                if(C == null || C.call(T, kValue, k, O)) {
                    mappedValue = callback.call(T, kValue, k, O);
                    A.push(mappedValue);
                }
            }
            k--;
        }
        return A;
    };
}

if (!Array.prototype.mapRight) {
    /**
     * 배열의 모든요소에 대하여 callback을 호출하고 그 결과를 배열에 담아 리턴한다.  단 배열을 뒤에서부터 순회한다.
     * @param callback 콜백 함수이다. 콜백함수의 스펙은 function(배열요소값,배열요소인덱스,배열) 이며 생략가능하다. 리턴은 아무것이나 상관없으며 이 값이 배열로 생성된다.
     * @param condf 콜백 함수이다. 콜백함수의 스펙은 function(배열요소값,배열요소인덱스,배열) 이며 생략가능하다. 리턴은 boolean 이며 true를 리턴하는 요소만 최종 리턴 배열에 포함된다.
     *         이 요소가 생략되거나 null이면 모든 요소에 대하여 callback이 호출된다.
     * @param thisArg callback 함수 안에서 사용할 this 변수이다. 생략하면 void 0 이된다.
     * @returns callback이 리턴한 값들의 배열
     * @author 김흥수
     * @since 2015-08-26
     * @version 1.0
     */
    Array.prototype.mapRight = function(callback,thisArg) {
        return this.mapIfRight(callback,null,thisArg);
    };
}

//Production steps of ECMA-262, Edition 5, 15.4.4.21
//Reference: http://es5.github.io/#x15.4.4.21
if (!Array.prototype.reduce) {
    /**
     * 배열의 모든 값을 순회하며 하나의 값을 계산해낸다.initialValue를 배열을 사용하면 map함수를 흉내내는 것이 가능하다.
     * @param callback 콜백 함수이다. 콜백함수의 스펙은 function(이전값,현재값,배열요소인덱스,배열) 이며 생략가능하다. 리턴은 아무것이나 상관없으며 이 값이 배열로 생성된다.
     * @param initialValue 초기값
     * @returns 마지막으로 callback이 리턴한 값
     * @author 김흥수
     * @since 2015-08-26
     * @version 1.0
     */
    Array.prototype.reduce = function(callback /*, initialValue*/) {
        'use strict';
        if (this == null) {
            throw new TypeError('method called on null or undefined');
        }
        if (typeof callback !== 'function') {
            throw new TypeError(callback + ' is not a function');
        }
        var t = Object(this), len = t.length >>> 0, k = 0, value;
        if (arguments.length == 2) {
            value = arguments[1];
        } else {
            while (k < len && !(k in t)) {
                k++;
            }
            if (k >= len) {
                throw new TypeError('Reduce of empty array with no initial value');
            }
            value = t[k++];
        }
        for (; k < len; k++) {
            if (k in t) {
                value = callback(value, t[k], k, t);
            }
        }
        return value;
    };
}

//Production steps of ECMA-262, Edition 5, 15.4.4.22
//Reference: http://es5.github.io/#x15.4.4.22
if ('function' !== typeof Array.prototype.reduceRight) {
    /**
     * 배열의 모든 값을 순회하며 하나의 값을 계산해낸다. 단 뒤에서부터 계산한다.
     * @param callback 콜백 함수이다. 콜백함수의 스펙은 function(이전값,현재값,배열요소인덱스,배열) 이며 생략가능하다. 리턴은 아무것이나 상관없으며 이 값이 배열로 생성된다.
     * @param initialValue 초기값
     * @returns 마지막으로 callback이 리턴한 값
     * @author 김흥수
     * @since 2015-08-26
     * @version 1.0
     */
    Array.prototype.reduceRight = function(callback /*, initialValue*/) {
        'use strict';
        if (null === this || 'undefined' === typeof this) {
            throw new TypeError('method called on null or undefined' );
        }
        if ('function' !== typeof callback) {
            throw new TypeError(callback + ' is not a function');
        }
        var t = Object(this), len = t.length >>> 0, k = len - 1, value;
        if (arguments.length >= 2) {
            value = arguments[1];
        } else {
            while (k >= 0 && !(k in t)) {
                k--;
            }
            if (k < 0) {
                throw new TypeError('Reduce of empty array with no initial value');
            }
            value = t[k--];
        }
        for (; k >= 0; k--) {
            if (k in t) {
                value = callback(value, t[k], k, t);
            }
        }
        return value;
    };
}

if (!Array.prototype.filter) {
    /**
     * fun이 true를 리턴하는 값만으로 이루어진 배열을 리턴한다.
     * @param fun 콜백 함수이다. 콜백함수의 스펙은 function(,현재값,배열요소인덱스,배열) 이며 생략가능하다. 리턴은 boolean 이다.
     * @param thisArg 콜백 안에서 사용될 this
     * @returns 원본 배열에서 조건에 부합하는 원소들의 배열
     * @author 김흥수
     * @since 2015-08-26
     * @version 1.0
     */
    Array.prototype.filter = function(fun/*, thisArg*/) {
        'use strict';

        if (this === void 0 || this === null) {
            throw new TypeError('method called on null or undefined' );
        }

        var t = Object(this);
        var len = t.length >>> 0;
        if (typeof fun !== 'function') {
            throw new TypeError(callback + ' is not a function');
        }

        var res = [];
        var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
        for (var i = 0; i < len; i++) {
            if (i in t) {
                var val = t[i];
                if (fun.call(thisArg, val, i, t)) {
                    res.push(val);
                }
            }
        }

        return res;
    };
}

if (!Array.prototype.findNextIndex) {
    /**
     * predicate 이 참인 배열요소를 찾아서 그 인덱스를 리턴한다.
     * @param predicate 콜백 함수이다. 콜백함수의 스펙은 function(현재값,배열요소인덱스,배열) 이며 생략가능하다. 리턴은 boolean 이다.
     * @param startIndex 검색을 시작할 시작인덱스이다.
     * @param thisArg 콜백 안에서 사용될 this
     * @returns 발견한 행의 인덱스 만약 발견 못하면 -1
     * @author 김흥수
     * @since 2015-08-26
     * @version 1.0
     */
    Array.prototype.findNextIndex = function(predicate,startIndex,thisArg) {

        if (this === null) {
            throw new TypeError('method called on null or undefined');
        }
        if(gf_IsObjNull(startIndex)) startIndex = 0;
        if(startIndex < 0 ) startIndex = 0;
        if (typeof predicate !== 'function') {
            throw new TypeError('predicate must be a function');
        }
        var list = Object(this);
        var length = list.length >>> 0;
        var thisArg = arguments[1];
        var value;

        for (var i = startIndex; i < length; i++) {
            value = list[i];
            if (predicate.call(thisArg, value, i, list)) {
                return i;
            }
        }
        return -1;
    };
}

if (!Array.prototype.findNext) {
    /**
     * predicate 이 참인 배열요소를 찾아서 그 값을 리턴한다.
     * @param predicate 콜백 함수이다. 콜백함수의 스펙은 function(현재값,배열요소인덱스,배열) 이며 생략가능하다. 리턴은 boolean 이다.
     * @param startIndex 검색을 시작할 시작인덱스이다.
     * @param thisArg 콜백 안에서 사용될 this
     * @returns 발견된 값, 만약 못 찾으면 undefined
     * @author 김흥수
     * @since 2015-08-26
     * @version 1.0
     */
    Array.prototype.findNext = function(predicate,startIndex,thisArg) {
        var idx = this.findNextIndex(predicate,startIndex, thisArg);
        if(idx == -1) return undefined;
        return this[idx];
    };
}

if (!Array.prototype.findIndex) {
    /**
     * predicate 이 참인 배열요소를 찾아서 그 인덱스를 리턴한다.
     * @param predicate 콜백 함수이다. 콜백함수의 스펙은 function(현재값,배열요소인덱스,배열) 이며 생략가능하다. 리턴은 boolean 이다.
     * @param thisArg 콜백 안에서 사용될 this
     * @returns 발견한 행의 인덱스 만약 발견 못하면 -1
     * @author 김흥수
     * @since 2015-08-26
     * @version 1.0
     */
    Array.prototype.findIndex = function(predicate, thisArg) {
        return this.findNextIndex(predicate,0, thisArg);
    };
}

if (!Array.prototype.find) {
    /**
     * predicate 이 참인 배열요소를 찾아서 리턴한다.
     * @param predicate 콜백 함수이다. 콜백함수의 스펙은 function(현재값,배열요소인덱스,배열) 이며 생략가능하다. 리턴은 boolean 이다.
     * @param thisArg 콜백 안에서 사용될 this
     * @returns 발견된 값, 만약 못 찾으면 undefined
     * @author 김흥수
     * @since 2015-08-26
     * @version 1.0
     */
    Array.prototype.find = function(predicate, thisArg) {
        return this.findNext(predicate,0,thisArg);
    };
}

/**
 * length 속성과 정수 인덱스 접근이 가능한 객체를 순수 배열로 변환한다.
 * @param obj
 * @returns 변환된 배열
 * @author 김흥수
 * @since 2015-09-21
 * @version 1.0
 */
var gf_ToArray = function(obj) {
    var length = obj.length;
    var ret = [];
    for(var i = 0 ; i < length ; i ++ ) {
        ret.push(obj[i]);
    }
    return ret;
};

if (!String.prototype.forEachL) {
    /**
     * 문자열의 모든요소에 대하여 callbackfn을 호출한다.(ECMA-262, Edition 5)
     * @param callback 콜백 함수이다. 콜백함수의 스펙은 function(문자열요소값,문자열요소인덱스,문자열) 이며 생략가능하다. 리턴은 없다.
     * @param thisArg callback 함수 안에서 사용할 this 변수이다. 생략하면 void 0 이된다.
     * @author 김흥수
     * @since 2015-08-26
     * @version 1.0
     */
    String.prototype.forEachL = function(callback, thisArg) {
        var T, k;
        if (this == null) {
            throw new TypeError(' this is null or not defined');
        }
        var O = this;
        var len = O.length >>> 0;
        if (typeof callback !== "function") {
            throw new TypeError(callback + ' is not a function');
        }

        if (arguments.length > 1) {
            T = thisArg;
        } else {
            T = void 0;
        }

        k = 0;

        while (k < len) {

            var kValue;

            if (k in O) {

                kValue = OcharAt(k);

                callback.call(T, kValue, k, O);
            }
            k++;
        }
    };
}

if (!String.prototype.forEach) {
    /**
     * 문자열의 모든요소에 대하여 callbackfn을 호출한다.(ECMA-262, Edition 5)
     * @param callback 콜백 함수이다. 콜백함수의 스펙은 function(문자열요소값,문자열요소인덱스,문자열) 이며 생략가능하다. 리턴은 없다.
     * @param thisArg callback 함수 안에서 사용할 this 변수이다. 생략하면 void 0 이된다.
     * @author 김흥수
     * @since 2015-08-26
     * @version 1.0
     */
    String.prototype.forEach = function(callback, thisArg) {
        var T, k;
        if (this == null) {
            throw new TypeError(' this is null or not defined');
        }
        var O = this;
        var len = O.length >>> 0;
        if (typeof callback !== "function") {
            throw new TypeError(callback + ' is not a function');
        }

        if (arguments.length > 1) {
            T = thisArg;
        } else {
            T = void 0;
        }

        k = 0;

        while (k < len) {

            var kValue;

            if (k in O) {

                kValue = OcharAt(k);

                callback.call(T, kValue, k, O);
            }
            k++;
        }
    };
}

if (!String.prototype.forEachReverse) {
    /**
     * 문자열의 모든요소에 대하여 뒤에서부터 callbackfn을 호출한다.(ECMA-262, Edition 5)
     * @param callback 콜백 함수이다. 콜백함수의 스펙은 function(문자열요소값,문자열요소인덱스,문자열) 이며 생략가능하다. 리턴은 없다.
     * @param thisArg callback 함수 안에서 사용할 this 변수이다. 생략하면 void 0 이된다.
     * @author 김흥수
     * @since 2015-08-26
     * @version 1.0
     */
    String.prototype.forEachReverse = function(callback, thisArg) {
        var T, k;
        if (this == null) {
            throw new TypeError(' this is null or not defined');
        }
        var O = this;
        var len = O.length >>> 0;
        if (typeof callback !== "function") {
            throw new TypeError(callback + ' is not a function');
        }
        if (arguments.length > 1) {
            T = thisArg;
        } else {
            T = void 0;
        }
        k = len - 1;
        while (k >= 0) {
            var kValue;
            if (k in O) {
                kValue = O.charAt(k);
                callback.call(T, kValue, k, O);
            }
            k--;
        }
    };
}

String.prototype.forEachR = String.prototype.forEachReverse;

if (!String.prototype.forEachStoppable) {
    /**
     * 문자열의 모든요소에 대하여 callbackfn을 호출한다.(ECMA-262, Edition 5) 단 callback이 true를 리턴하면 loop를 중단한다.
     * @param callback 콜백 함수이다. 콜백함수의 스펙은 function(문자열요소값,문자열요소인덱스,문자열) 이며 생략가능하다. 리턴은 boolean 또는 없다.
     * @param thisArg callback 함수 안에서 사용할 this 변수이다. 생략하면 void 0 이된다.
     * @author 김흥수
     * @since 2015-08-26
     * @version 1.0
     */
    String.prototype.forEachStoppable = function(callback, thisArg) {
        var T, k;
        if (this == null) {
            throw new TypeError(' this is null or not defined');
        }
        var O = this;
        var len = O.length >>> 0;
        if (typeof callback !== "function") {
            throw new TypeError(callback + ' is not a function');
        }
        if (arguments.length > 1) {
            T = thisArg;
        } else {
            T = void 0;
        }

        k = 0;

        while (k < len) {

            var kValue;

            if (k in O) {

                kValue = O.charAt(k);

                var stop = callback.call(T, kValue, k, O);
                if(stop) break;
            }
            k++;
        }
    };
}
String.prototype.forEachS = String.prototype.forEachStoppable;

if (!String.prototype.forEachReverseStoppable) {
    /**
     * 문자열의 모든요소에 대하여 뒤에서부터 callbackfn을 호출한다.(ECMA-262, Edition 5) 단 callback이 true를 리턴하면 loop를 중단한다.
     * @param callback 콜백 함수이다. 콜백함수의 스펙은 function(문자열요소값,문자열요소인덱스,문자열) 이며 생략가능하다. 리턴은 boolean 또는 없다.
     * @param thisArg callback 함수 안에서 사용할 this 변수이다. 생략하면 void 0 이된다.
     * @author 김흥수
     * @since 2015-08-26
     * @version 1.0
     */
    String.prototype.forEachReverseStoppable = function(callback, thisArg) {

        var T, k;

        if (this == null) {
            throw new TypeError(' this is null or not defined');
        }

        var O = this;

        var len = O.length >>> 0;

        if (typeof callback !== "function") {
            throw new TypeError(callback + ' is not a function');
        }

        if (arguments.length > 1) {
            T = thisArg;
        } else {
            T = void 0;
        }

        k = len - 1;

        while (k >= 0) {

            var kValue;

            if (k in O) {

                kValue = O.charAt(k);

                var stop = callback.call(T, kValue, k, O);
                if(stop) break;
            }
            k--;
        }
    };
}
String.prototype.forEachRS = String.prototype.forEachReverseStoppable;

if (!String.prototype.mapIf) {
    /**
     * 문자열의 모든요소에 대하여 callback을 호출하고 그 결과를 문자열에 담아 리턴한다. 콜백으로 주어진 condf의 호출 결과가 참이거나 condf 자체가 null인 경우에 한하여 문자열에 추가된다.
     * @param callback 콜백 함수이다. 콜백함수의 스펙은 function(문자열요소값,문자열요소인덱스,문자열) 이며 생략가능하다. 리턴은 아무것이나 상관없으며 이 값이 문자열로 생성된다.
     * @param condf 콜백 함수이다. 콜백함수의 스펙은 function(문자열요소값,문자열요소인덱스,문자열) 이며 생략가능하다. 리턴은 boolean 이며 true를 리턴하는 요소만 최종 리턴 문자열에 포함된다.
     *         이 요소가 생략되거나 null이면 모든 요소에 대하여 callback이 호출된다.
     * @param thisArg callback 함수 안에서 사용할 this 변수이다. 생략하면 void 0 이된다.
     * @returns callback이 리턴한 값들의 배열
     * @author 김흥수
     * @since 2015-08-26
     * @version 1.0
     */
    String.prototype.mapIf = function(callback,condf, thisArg) {

        var T, A, k, C;

        if (this == null) {
            throw new TypeError(' this is null or not defined');
        }

        var O = this;

        var len = O.length >>> 0;

        if (typeof callback !== 'function') {
            throw new TypeError(callback + ' is not a function');
        }

        if (arguments.length > 2) {
            T = thisArg;
            C = condf;
        } else if (arguments.length > 1) {
            T = void 0;
            C = condf;
        } else {
            T = void 0;
            C = null;
        }
        A = [];
        k = 0;
        while (k < len) {

            var kValue, mappedValue;

            if (k in O) {

                kValue = O.charAt(k);
                if(C == null || C.call(T, kValue, k, O)) {
                    mappedValue = callback.call(T, kValue, k, O);
                    A.push(mappedValue);
                }
            }
            k++;
        }
        return A;
    };
}

if (!String.prototype.hvcMap) {
    /**
     * 문자열의 모든요소에 대하여 callback을 호출하고 그 결과를 문자열에 담아 리턴한다.
     * @param callback 콜백 함수이다. 콜백함수의 스펙은 function(문자열요소값,문자열요소인덱스,문자열) 이며 생략가능하다. 리턴은 아무것이나 상관없으며 이 값이 문자열로 생성된다.
     * @param thisArg callback 함수 안에서 사용할 this 변수이다. 생략하면 void 0 이된다.
     * @returns callback이 리턴한 값들의 배열
     * @author 김흥수
     * @since 2015-08-26
     * @version 1.0
     */
    String.prototype.hvcMap = function(callback,thisArg) {
        return this.mapIf(callback,null,thisArg);
    };
}

if (!String.prototype.mapIfRight) {
    /**
     * 문자열의 모든요소에 대하여 callback을 호출하고 그 결과를 문자열에 담아 리턴한다. 콜백으로 주어진 condf의 호출 결과가 참이거나 condf 자체가 null인 경우에 한하여 문자열에 추가된다.
     * 단 문자열을 뒤에서부터 순회한다.
     * @param callback 콜백 함수이다. 콜백함수의 스펙은 function(문자열요소값,문자열요소인덱스,문자열) 이며 생략가능하다. 리턴은 아무것이나 상관없으며 이 값이 문자열로 생성된다.
     * @param condf 콜백 함수이다. 콜백함수의 스펙은 function(문자열요소값,문자열요소인덱스,문자열) 이며 생략가능하다. 리턴은 boolean 이며 true를 리턴하는 요소만 최종 리턴 문자열에 포함된다.
     *        이 요소가 생략되거나 null이면 모든 요소에 대하여 callback이 호출된다.
     * @param thisArg callback 함수 안에서 사용할 this 변수이다. 생략하면 void 0 이된다.
     * @returns callback이 리턴한 값들의 배열
     * @author 김흥수
     * @since 2015-08-26
     * @version 1.0
     */
    String.prototype.mapIfRight = function(callback,condf, thisArg) {

        var T, A, k, C;

        if (this == null) {
            throw new TypeError(' this is null or not defined');
        }

        var O = this;

        var len = O.length >>> 0;

        if (typeof callback !== 'function') {
            throw new TypeError(callback + ' is not a function');
        }

        if (arguments.length > 2) {
            T = thisArg;
            C = condf;
        } else if (arguments.length > 1) {
            T = void 0;
            C = condf;
        } else {
            T = void 0;
            C = null;
        }
        A = [];
        k = len - 1;
        while (k >= 0 ) {

            var kValue, mappedValue;

            if (k in O) {

                kValue = O.charAt(k);
                if(C == null || C.call(T, kValue, k, O)) {
                    mappedValue = callback.call(T, kValue, k, O);
                    A.push(mappedValue);
                }
            }
            k--;
        }
        return A;
    };
}

if (!String.prototype.mapRight) {
    /**
     * 문자열의 모든요소에 대하여 callback을 호출하고 그 결과를 문자열에 담아 리턴한다. 단 문자열을 뒤에서부터 순회한다.
     * @param callback 콜백 함수이다. 콜백함수의 스펙은 function(문자열요소값,문자열요소인덱스,문자열) 이며 생략가능하다. 리턴은 아무것이나 상관없으며 이 값이 문자열로 생성된다.
     * @param thisArg callback 함수 안에서 사용할 this 변수이다. 생략하면 void 0 이된다.
     * @returns callback이 리턴한 값들의 배열
     * @author 김흥수
     * @since 2015-08-26
     * @version 1.0
     */
    String.prototype.mapRight = function(callback,thisArg) {
        return this.mapIfRight(callback,null,thisArg);
    };
}

if (!String.prototype.reduce) {
    /**
     * 문자열의 모든 값을 순회하며 하나의 값을 계산해낸다.initialValue를 문자열을 사용하면 map함수를 흉내내는 것이 가능하다.
     * @param callback 콜백 함수이다. 콜백함수의 스펙은 function(이전값,현재값,문자열요소인덱스,문자열) 이며 생략가능하다. 리턴은 아무것이나 상관없으며 이 값이 문자열로 생성된다.
     * @param initialValue 초기값
     * @returns 마지막으로 callback이 리턴한 값
     * @author 김흥수
     * @since 2015-08-26
     * @version 1.0
     */
    String.prototype.reduce = function(callback /*, initialValue*/) {
        'use strict';
        if (this == null) {
            throw new TypeError('method called on null or undefined');
        }
        if (typeof callback !== 'function') {
            throw new TypeError(callback + ' is not a function');
        }
        var t = this, len = t.length >>> 0, k = 0, value;
        if (arguments.length == 2) {
            value = arguments[1];
        } else {
            while (k < len && !(k in t)) {
                k++;
            }
            if (k >= len) {
                throw new TypeError('Reduce of empty String with no initial value');
            }
            value = t.charAt(k++);
        }
        for (; k < len; k++) {
            if (k in t) {
                value = callback(value, t.charAt(k), k, t);
            }
        }
        return value;
    };
}

if ('function' !== typeof String.prototype.reduceRight) {
    /**
     * 문자열의 모든 값을 순회하며 하나의 값을 계산해낸다. 단 뒤에서부터 계산한다.
     * @param callback 콜백 함수이다. 콜백함수의 스펙은 function(이전값,현재값,문자열요소인덱스,문자열) 이며 생략가능하다. 리턴은 아무것이나 상관없으며 이 값이 문자열로 생성된다.
     * @param initialValue 초기값
     * @returns 마지막으로 callback이 리턴한 값
     * @author 김흥수
     * @since 2015-08-26
     * @version 1.0
     */
    String.prototype.reduceRight = function(callback /*, initialValue*/) {
        'use strict';
        if (null === this || 'undefined' === typeof this) {
            throw new TypeError('method called on null or undefined' );
        }
        if ('function' !== typeof callback) {
            throw new TypeError(callback + ' is not a function');
        }
        var t = this, len = t.length >>> 0, k = len - 1, value;
        if (arguments.length >= 2) {
            value = arguments[1];
        } else {
            while (k >= 0 && !(k in t)) {
                k--;
            }
            if (k < 0) {
                throw new TypeError('Reduce of empty String with no initial value');
            }
            value = t.charAt(k--);
        }
        for (; k >= 0; k--) {
            if (k in t) {
                value = callback(value, t.charAt(k), k, t);
            }
        }
        return value;
    };
}

if(! String.prototype.replaceAll) {
    /**
     * replaceAll 기능
     * <pre>
     * ex ) var str = 'abcdeabccba';
     *      var target = 'a';
     *      var replaceStr = '*';
     *      str = str.replaceAll('cd', replaceStr);
     * 위의 예에서 str는 "*bcde*bccb*"가 된다.
     * </pre>
     * @param target required 바뀌어야 할 대상 문자
     * @param replaceStr required 바뀌어야 할 새로운문자
     * @returns replaced String.
     * @author Jun.
     * @since 2013-04-01
     * @version 1.0
     */
        String.prototype.replaceAll = function(target, replacement) {
                  return this.split(target).join(replacement);
        };
        /*  아래 구문이 특수문자에서 오류나서, 폐기함
    String.prototype.replaceAll = function(target, replaceStr) {
        var v_ret = null;
        var v_regExp = new RegExp(target, "g");
        v_ret = this.replace(v_regExp, replaceStr);
        return v_ret;
    };*/
}

if(!String.prototype.simpleReplace) {
    /**
     * 자바스크립트의 내장 객체인 String 객체에 simpleReplace 메소드를 추가한다. simpleReplace 메소드는 스트링 내에 있는 특정 스트링을 다른 스트링으로 모두 변환한다.
     * String 객체의 replace 메소드와 동일한 기능을 하지만 간단한 스트링의 치환시에 보다 유용하게 사용할 수 있다.
     * <pre>
     * ex ) var str = 'abcde';
     *      str = str.simpleReplace('cd', 'xx');
     * 위의 예에서 str는 "abxxe"가 된다.
     * </pre>
     * @param oldStr required 바뀌어야 될 기존의 스트링
     * @param newStr required 바뀌어질 새로운 스트링
     * @returns replaced String.
     * @author Jun.
     * @since 2013-04-01
     * @version 1.0
     */
    String.prototype.simpleReplace = function(oldStr, newStr) {
        var rStr = oldStr;
        rStr = rStr.replace(/\\/g, "\\\\");
        rStr = rStr.replace(/\^/g, "\\^");
        rStr = rStr.replace(/\$/g, "\\$");
        rStr = rStr.replace(/\*/g, "\\*");
        rStr = rStr.replace(/\+/g, "\\+");
        rStr = rStr.replace(/\?/g, "\\?");
        rStr = rStr.replace(/\./g, "\\.");
        rStr = rStr.replace(/\(/g, "\\(");
        rStr = rStr.replace(/\)/g, "\\)");
        rStr = rStr.replace(/\|/g, "\\|");
        rStr = rStr.replace(/\,/g, "\\,");
        rStr = rStr.replace(/\{/g, "\\{");
        rStr = rStr.replace(/\}/g, "\\}");
        rStr = rStr.replace(/\[/g, "\\[");
        rStr = rStr.replace(/\]/g, "\\]");
        rStr = rStr.replace(/\-/g, "\\-");
        var re = new RegExp(rStr, "g");
        return this.replace(re, newStr);
    };
}

if (!String.prototype.trim) {
    /**
     * 자바스크립트의 내장 객체인 String 객체에 trim 메소드를 추가한다. trim 메소드는 스트링의 앞과 뒤에 있는 white space 를 제거한다.
     * <pre>
     * ex ) var str = '  abede    '
     *      str = str.trim();
     * 위의 예에서 str는 "abcde"가 된다.
     * </pre>
     * @returns trimed String.
     * @author Jun.
     * @since 2013-04-01
     * @version 1.0
     */
    String.prototype.trim = function () {
        return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
    };
}

if (!String.prototype.trimLeft) {
    /**
     * 자바스크립트의 내장 객체인 String 객체에 trimLeft 메소드를 추가한다.
     * 좌측의 공백을 제거한다.
     * @returns trimed String.
     * @author Jun.
     * @since 2013-04-01
     * @version 1.0
     */
    String.prototype.trimLeft = function () {
        var flag = false;
        return this.hvcMap(function(v){
            if(flag) return v;
            if(v == " " || v == "\r" || v == "\n" || v == "\t" ) return null;
            flag = true;
            return v;
        }).join("");
    };
}

if (!String.prototype.trimRight) {
    /**
     * 자바스크립트의 내장 객체인 String 객체에 trimRight 메소드를 추가한다.
     * 우측의 공백을 제거한다.
     * @returns trimed String.
     * @author Jun.
     * @since 2013-04-01
     * @version 1.0
     */
    String.prototype.trimRight = function () {
        var flag = false;
        return this.mapRight(function(v){
            if(flag) return v;
            if(v == " " || v == "\r" || v == "\n" || v == "\t" ) return null;
            flag = true;
            return v;
        }).reverse().join("");
    };
}

if ( !String.prototype.padLeft) {
    /**
     * 설명 : Left 빈자리 만큼 strPadChar 을 붙인다.
     * @param intLength 채워서 만들어질 전체 길이
     * @param strPadChar 채울 문자열
     * @param bBaseByte 길이의 기준이 byte인지를 결정한다. 기본값은 false
     * @returns 좌측이 strPadChar 로 채워진 문자열
     * @author Jun.
     * @since 2013-04-01
     * @version 1.0
     */
    String.prototype.padLeft = function (intLength, strPadChar,bBaseByte) {
        var strTemp = "";
        strPadChar = gf_Default(strPadChar,' ');
        bBaseByte = gf_Default(bBaseByte,false);

        var padLength = ( bBaseByte ? gf_GetByteLength(strPadChar) : strPadChar.length );
        var intPadCnt = Math.floor((intLength - ( bBaseByte ? gf_GetByteLength(this) : this.length )) / padLength) ;

        for (var i = 0; i < intPadCnt; i++) strTemp += strPadChar;

        return strTemp + this;
    };
}

if (! String.prototype.padRight) {
    /**
     * 설명 : Right 빈자리 만큼 strPadChar 을 붙인다.
     * @param intLength 채워서 만들어질 전체 길이
     * @param strPadChar 채울 문자열
     * @param bBaseByte 길이의 기준이 byte인지를 결정한다. 기본값은 false
     * @returns 우측이 strPadChar 로 채워진 문자열
     * @author Jun.
     * @since 2013-04-01
     * @version 1.0
     */
    String.prototype.padRight = function (intLength, strPadChar,bBaseByte) {
        var strTemp = "";
        strPadChar = gf_Default(strPadChar,' ');
        bBaseByte = gf_Default(bBaseByte,false);

        var padLength = ( bBaseByte ? gf_GetByteLength(strPadChar) : strPadChar.length );
        var intPadCnt = Math.floor((intLength - ( bBaseByte ? gf_GetByteLength(this) : this.length )) / padLength) ;

        for (var i = 0; i < intPadCnt; i++) strTemp += strPadChar;

        return this + strTemp;
    };
}

if(!String.prototype.removeNewLine) {
    /**
     * 자바스크립트의 내장 객체인 String 객체에 removeNewLine 메소드를 추가한다.
     * 문자열에서 newline 을 제거한다.
     * @returns 개행문자가 제거된 문자열
     * @author Jun.
     * @since 2013-03-04
     * @version 1.0
     */
    String.prototype.removeNewLine = function() {
        return this.replace(/(\r\n|\n|\r)/gm,"");
    };
}

if(!String.prototype.startsWith) {
    /**
     * 자바스크립트의 내장 객체인 String 객체에 startsWith 메소드를 추가한다.
     * 문자열이 인자로 전달된 str 문자열로 시작하는지 판단.
     * @param str : 검사할 문자열
     * @returns 문자열이 str로 시작하면 true 아니면 false
     * @author Jun.
     * @since 2013-05-27
     * @version 1.0
     */
    String.prototype.startsWith = function(str) {
        return this.slice(0, str.length) == str;
    };
}

if(!String.prototype.endsWith) {
    /**
     * 자바스크립트의 내장 객체인 String 객체에 endsWith 메소드를 추가한다.
     * 문자열이 인자로 전달된 str 문자열로 종료되는지 판단.
     * @param str : 검사할 문자열
     * @returns 문자열이 str로 끝나면 true 아니면 false
     * @author Jun.
     * @since 2013-05-27
     * @version 1.0
     */
    String.prototype.endsWith = function(str) {
        return this.slice(-str.length) == str;
    };
}

var GLB_MONTH_IN_YEAR = ["January","February","March","April","May","June","July","August","September","October","November","December"]; // Names of months for drop-down and formatting
var GLB_SHORT_MONTH_IN_YEAR = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]; // For formatting
var GLB_DAY_IN_WEEK = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]; // For formatting
var GLB_SHORT_DAY_IN_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]; // For formatting

if(!String.prototype.toDate) {
    /**
     * 자바스크립트의 내장 객체인 String 객체에 toDate 메소드를 추가한다. toDate 메소드는 날짜를 표현하는 스트링 값을 자바스크립트의 내장 객체인 Date 객체로 변환한다.
     * <pre>
     * var date = '2002-03-05'.toDate('YYYY-MM-DD')
     * 위의 예에서 date 변수는 실제로 2002년 3월 5일을 표현하는 Date 오브젝트를 가르킨다.
     * </pre>
     * @param pattern  date pattern 문자열
     * <pre>
     *                # syntex
     *                  YYYY : year(4자리)
     *                  YY   : year(2자리)
     *                  MM   : month in year(number)
     *                  MON  : month in year(text)  예) 'January'
     *                  mon  : short month in year(text)  예) 'Jan'
     *                  DD   : day in month
     *                  HH   : hour in day (0~23)
     *                  mm   : minute in hour
     *                  ss   : second in minute
     *                  SS   : millisecond in second
     *                  주의)YYYY(YY)는 반드시 있어야 한다. YYYY(YY) 만 사용할 경우는 1월 1일을 기준으로
     *                  하고 YYYY와 MM 만사용할 경우는 1일을 기준으로 한다.
     * </pre>
     * @returns 변환된 Date Object.
     * @author 백진현
     * @since 2011-10-01
     * @version 1.0
     */
    String.prototype.toDate = function(pattern) {
        var INVALID = -999999999;
        var year = INVALID;
        var month = INVALID;
        var day = INVALID;
        var hour = INVALID;
        var min = INVALID;
        var sec = INVALID;
        var ms = INVALID;
        var newDate;
        pattern = gf_Default(pattern,Date.__SAVE_FORMAT__);

        var s = this+"";

        while(pattern.length > 0 ) {
            if(s.length <= 0 ) throw "날짜의 길이가 형식지정자에 비하여 모자랍니다.";
            if(pattern.indexOf("YYYY") == 0 ) {
                if(year != INVALID) throw "년도를 두번 지정하였습니다.";
                year = Number(s.substr(0,4));
                s = s.substr(4);
                pattern = pattern.substr(4);
            } else if(pattern.indexOf("YY") == 0 ) {
                if(year != INVALID) throw "년도를 두번 지정하였습니다.";
                year = Number(s.substr(0,2)) + 2000;
                s = s.substr(2);
                pattern = pattern.substr(2);
            } else if(pattern.indexOf("MM") == 0 ) {
                if(month != INVALID) throw "월을 두번 지정하였습니다.";
                month = Number(s.substr(0,2));
                s = s.substr(2);
                pattern = pattern.substr(2);
            } else if(pattern.indexOf("DD") == 0 ) {
                if(day != INVALID) throw "일을 두번 지정하였습니다.";
                day = Number(s.substr(0,2));
                s = s.substr(2);
                pattern = pattern.substr(2);
            } else if(pattern.indexOf("HH") == 0 ) {
                if(hour != INVALID) throw "시간을 두번 지정하였습니다.";
                hour = Number(s.substr(0,2));
                s = s.substr(2);
                pattern = pattern.substr(2);
            } else if(pattern.indexOf("mm") == 0 ) {
                if(min != INVALID) throw "분을 두번 지정하였습니다.";
                min = Number(s.substr(0,2));
                s = s.substr(2);
                pattern = pattern.substr(2);
            } else if(pattern.indexOf("ss") == 0 ) {
                if(sec != INVALID) throw "초를 두번 지정하였습니다.";
                sec = Number(s.substr(0,2));
                s = s.substr(2);
                pattern = pattern.substr(2);
            } else if(pattern.indexOf("SS") == 0 ) {
                if(ms != INVALID) throw "1/100초를 두번 지정하였습니다.";
                ms = Number(s.substr(0,2));
                s = s.substr(2);
                pattern = pattern.substr(2);
            } else if(pattern.indexOf("MON") == 0 ) {
                if(month != INVALID) throw "월을 두번 지정하였습니다.";
                //var idx = GLB_MONTH_IN_YEAR.findIndex(function(val){ return s.toUpperCase().indexOf(val.toUpperCase()) == 0 ; });
                var idx = Array.prototype.findIndex.call(GLB_MONTH_IN_YEAR,function(val){ return s.toUpperCase().indexOf(val.toUpperCase()) == 0 ; });
                if(idx < 0) throw "월 지정자가 잘못 되었습니다. (월은 다음 중 하나이어야 합니다. : "+GLB_MONTH_IN_YEAR.join(",")+")";
                month = idx + 1;
                s = s.substr(GLB_MONTH_IN_YEAR[idx].length);
                pattern = pattern.substr(3);
            } else if(pattern.indexOf("mon") == 0 ) {
                if(month != INVALID) throw "월을 두번 지정하였습니다.";
                //var idx = GLB_SHORT_MONTH_IN_YEAR.findIndex(function(val){ return s.toUpperCase().indexOf(val.toUpperCase()) == 0 ; });
                var idx = Array.prototype.findIndex.call(GLB_SHORT_MONTH_IN_YEAR,function(val){ return s.toUpperCase().indexOf(val.toUpperCase()) == 0 ; });
                if(idx < 0) throw "월 지정자가 잘못 되었습니다. (월은 다음 중 하나이어야 합니다. : "+GLB_SHORT_MONTH_IN_YEAR.join(",")+")";
                month = idx + 1;
                s = s.substr(GLB_SHORT_MONTH_IN_YEAR[idx].length);
                pattern = pattern.substr(3);
            } else {
                if(s.substr(0,1) != pattern.substr(0,1)) throw "날짜의 형식 지정자가 잘못 되었습니다.";
                s = s.substr(1);
                pattern = pattern.substr(1);
            }
        }
        if(s.length > 0 ) throw "날짜의 길이가 형식지정자에 비하여 많습니다.";
        if( year == INVALID ) throw "년도는 최소한 지정되어야 합니다.";
        if( month == INVALID ) month = 1;
        if( day == INVALID ) day = 1;
        if( hour == INVALID ) hour = 0;
        if( min == INVALID ) min = 0;
        if( sec == INVALID ) sec = 0;
        if( ms == INVALID ) ms = 0;

        newDate = new Date(year, month - 1, day, hour, min, sec, ms);
        /*
        if (month > 12) {
            newDate.setFullYear(year + 1);
        } else {
            newDate.setFullYear(year);
        }
        */
        return newDate;
    };
}

/*----------------------------------------------------------------------------------
 * Date Prototype 함수
----------------------------------------------------------------------------------*/
Date.__SAVE_FORMAT__ = "YYYYMMDD";
Date.__DISPLAY_FORMAT__ = "YYYY-MM-DD"; /*행안부 표준*/

if(!Date.prototype.lastDay) {
    /**
     * 말일 일자를 숫자로 구한다.
     * @returns 말일의 숫자
     * @author 김흥수
     * @since 2015-09-08
     * @version 1.0
     */
    Date.prototype.lastDay = function () {
        return (new Date(this.getFullYear(), this.getMonth() + 1, 0)).getDate();
    };
}

if(!Date.prototype.isLastDay) {
    /**
     * 오늘이 말일인가?
     * @returns 날짜가 말일이면 true 아니면 false
     * @author 김흥수
     * @since 2015-09-08
     * @version 1.0
     */
    Date.prototype.isLastDay = function () {
        return this.lastDay() == this.getDate();
    };
}

if(!Date.prototype.trunc) {
    /**
     * 날짜를 주어진 형식으로 잘라낸다.
     * @param tag 잘라낼 날짜 구분
     * <pre>
     *            YYYY Or YY : 그해 1월 1일 0시 0분 0초
     *            MM : 그달 1일 0시 0분 0초
     *            D  : 그 주 일요일  0시 0분 0초
     *            DD : 그날  0시 0분 0초
     *            HH : 그시각 0분 0초
     *            MI : 그시각 그분 0초
     *            null이면 DD
     * </pre>
     * @returns 잘라낸 날짜 자신
     * @author 김흥수
     * @since 2015-09-08
     * @version 1.0
     */
    Date.prototype.trunc = function (tag) {
        tag = gf_Default(tag,"DD");
        tag = tag.toUpperCase();
        if(tag == "YYYY" || tag == "YY") {
            this.setMonth(0);
            this.setDate(1);
            this.setHours(0);
            this.setMinutes(0);
            this.setSeconds(0);
        } else if (tag == "MM") {
            this.setDate(1);
            this.setHours(0);
            this.setMinutes(0);
            this.setSeconds(0);
        } else if (tag == "D") {
            this.setDate(this.getDate() - this.getDay());
            this.setHours(0);
            this.setMinutes(0);
            this.setSeconds(0);
        } else if (tag == "DD") {
            this.setHours(0);
            this.setMinutes(0);
            this.setSeconds(0);
        } else if (tag == "HH") {
            this.setMinutes(0);
            this.setSeconds(0);
        } else if (tag == "MI") {
            this.setSeconds(0);
        }
        return this;
    };
}

if(!Date.prototype.format) {
    /**
     * 자바스크립트의 내장 객체인 Date 객체에 format 메소드를 추가한다.
     * <pre>
     * format 메소드는 Date 객체가 가진 날짜를 지정된 포멧의 스트링으로 변환한다.
     *              var date = new Date();
     *              var dateStr = date.format('YYYYMMDD');
     *              참고 : Date 오브젝트 생성자들
     *                  - dateObj = new Date()
     *                  - dateObj = new Date(dateVal)
     *                  - dateObj = new Date(year, month, date[, hours[, minutes[, seconds[,ms]]]])
     *              위의 예에서 오늘날짜가 2002년 3월 5일이라면 dateStr의 값은 "20020305"가 된다.
     *              default pattern은 "YYYYMMDD"이다.
     * </pre>
     * @param pattern  optional 변환하고자 하는 패턴 스트링. (default : YYYYMMDD)
     * <pre>
     *     # syntex
     *       YYYY : hour in am/pm (1&tilde;12)
     *       MM   : month in year(number)
     *       MON  : month in year(text)  예) 'January'
     *       mon  : short month in year(text)  예) 'Jan'
     *       DD   : day in month
     *       DAY  : day in week  예) 'Sunday'
     *       day  : short day in week  예) 'Sun'
     *       hh   : hour in am/pm (1&tilde;12)
     *       HH   : hour in day (0&tilde;23)
     *       mm   : minute in hour
     *       ss   : second in minute
     *       SS   : millisecond in second
     *       a    : am/pm  예) 'AM'
     * </pre>
     * @returns Date를 표현하는 변환된 String.
     * @author Jun.
     * @since 2013-03-04
     * @version 1.0
     */
    Date.prototype.format = function(pattern) {
        if(isNaN(this.getTime())) return "";
        var year = this.getFullYear();
        var month = this.getMonth() + 1;
        var day = this.getDate();
        var dayInWeek = this.getDay();
        var hour24 = this.getHours();
        var ampm = (hour24 < 12) ? "AM" : "PM";
        var hour12 = (hour24 > 12) ? (hour24 - 12) : hour24;
        var min = this.getMinutes();
        var sec = this.getSeconds();
        var YYYY = "" + year;
        var YY = YYYY.substr(2);
        var MM = (("" + month).length == 1) ? "0" + month : "" + month;
        var MON = GLB_MONTH_IN_YEAR[month - 1];
        var mon = GLB_SHORT_MONTH_IN_YEAR[month - 1];
        var DD = (("" + day).length == 1) ? "0" + day : "" + day;
        var DAY = GLB_DAY_IN_WEEK[dayInWeek];
        var day = GLB_SHORT_DAY_IN_WEEK[dayInWeek];
        var HH = (("" + hour24).length == 1) ? "0" + hour24 : "" + hour24;
        var hh = (("" + hour12).length == 1) ? "0" + hour12 : "" + hour12;
        var mm = (("" + min).length == 1) ? "0" + min : "" + min;
        var ss = (("" + sec).length == 1) ? "0" + sec : "" + sec;
        var SS = "" + this.getMilliseconds();
        var dateStr;
        //var index = -1;
        if (typeof (pattern) == "undefined") {
            dateStr = Date.__SAVE_FORMAT__;
        } else {
            dateStr = pattern;
        }
        dateStr = dateStr.replace(/YYYY/g, YYYY);
        dateStr = dateStr.replace(/YY/g, YY);
        dateStr = dateStr.replace(/MM/g, MM);
        dateStr = dateStr.replace(/MON/g, MON);
        dateStr = dateStr.replace(/mon/g, mon);
        dateStr = dateStr.replace(/DD/g, DD);
        dateStr = dateStr.replace(/DAY/g, DAY);
        dateStr = dateStr.replace(/day/g, day);
        dateStr = dateStr.replace(/hh/g, hh);
        dateStr = dateStr.replace(/HH/g, HH);
        dateStr = dateStr.replace(/mm/g, mm);
        dateStr = dateStr.replace(/ss/g, ss);
        dateStr = dateStr.replace(/SS/g, SS);
        dateStr = dateStr.replace(/(\s+)a/g, "$1" + ampm);
        return dateStr;
    };
}

if(!Date.prototype.after) {
    /**
     * 현재 Date 객체의 날짜보다 이후날짜를 가진 Date 객체를 리턴한다.
     * <pre>
     *    예를 들어 내일 날짜를 얻으려면 다음과 같이 하면 된다.
     *    var date = new Date();
     *    var oneDayAfter = date.after(0, 0, 1);
     * </pre>
     * @param years optional 이후 년수
     * @param months optional 이후 월수
     * @param dates optional 이후 일수
     * @param hours optional 이후 시간수
     * @param minutes optional 이후 분수
     * @param seconds optional 이후 초수
     * @param mss optional 이후 밀리초수
     * @returns 이후날짜를 표현하는 Date 객체
     * @author Jun.
     * @since 2013-03-04
     * @version 1.0
     */
    Date.prototype.after = function(years, months, dates, hours, miniutes, seconds, mss) {
        if (years == null)
            years = 0;
        if (months == null)
            months = 0;
        if (dates == null)
            dates = 0;
        if (hours == null)
            hours = 0;
        if (miniutes == null)
            miniutes = 0;
        if (seconds == null)
            seconds = 0;
        if (mss == null)
            mss = 0;
        if (years != 0)
            this.addYear(years);
        if (months != 0)
            this.addMonth(months);
        if (dates != 0)
            this.addDate(dates);
        if (hours != 0)
            this.addHours(hours);
        if (miniutes != 0)
            this.addMinutes(miniutes);
        if (seconds != 0)
            this.addSeconds(seconds);
        if (mss != 0)
            this.addMilliseconds(mss);
        return this;
    };
}

if(!Date.prototype.before) {
    /**
     * 현재 Date 객체의 날짜보다 이전날짜를 가진 Date 객체를 리턴한다.
     * <pre>
     *   예를 들어 어제 날짜를 얻으려면 다음과 같이 하면 된다.
     *   var date = new Date();
     *   var oneDayBefore = date.before(0, 0, 1);
     * </pre>
     * @param years optional 이전 년수
     * @param months optional 이전 월수
     * @param dates optional 이전 일수
     * @param hours optional 이전 시간수
     * @param minutes optional 이전 분수
     * @param seconds optional 이전 초수
     * @param mss optional 이전 밀리초수
     * @returns 이전날짜를 표현하는 Date 객체
     * @author Jun.
     * @since 2013-03-04
     * @version 1.0
     */
    Date.prototype.before = function(years, months, dates, hours, miniutes, seconds, mss) {
        if (years == null)
            years = 0;
        if (months == null)
            months = 0;
        if (dates == null)
            dates = 0;
        if (hours == null)
            hours = 0;
        if (miniutes == null)
            miniutes = 0;
        if (seconds == null)
            seconds = 0;
        if (mss == null)
            mss = 0;
        if (years != 0)
            this.addYear(years * -1);
        if (months != 0)
            this.addMonth(months * -1);
        if (dates != 0)
            this.addDate(dates * -1);
        if (hours != 0)
            this.addHours(hours * -1);
        if (miniutes != 0)
            this.addMinutes(miniutes * -1);
        if (seconds != 0)
            this.addSeconds(seconds * -1);
        if (mss != 0)
            this.addMilliseconds(mss * -1);
        return this;
    };
}

if(!Date.prototype.addYear) {
    /**
     * 년도 더하기
     * @param val 더할 년도
     * @returns val 년도 더해진 날짜
     * @author Jun.
     * @since 2013-03-04
     * @version 1.0
     */
    Date.prototype.addYear = function(val) {
        return  this.addMonth(val * 12);
    };
}

if(!Date.prototype.addMonth) {
    /**
     * 개월 더하기
     * @param val 더할 개월
     * @returns val 개월 더해진 날짜
     * @author Jun.
     * @since 2013-03-04
     * @version 1.0
     */
    Date.prototype.addMonth = function(val) {
        if( this.isLastDay()) {
            this.setMonth(this.getMonth() + val + 1);
            this.setDate(0);
            return this;
        }
        var l = (new Date(this.getFullYear(), this.getMonth() + val + 1 , 0)).getDate();
        if(l < this.getDate() ) {
            this.setMonth(this.getMonth() + val + 1);
            this.setDate(0);
            return this;
        }
        this.setMonth(this.getMonth() + val);
        return this;
    };
}

if(!Date.prototype.addDate) {
    /**
     * 날수 더하기
     * @param val 더할 날수
     * @returns val 날수 더해진 날짜
     * @author Jun.
     * @since 2013-03-04
     * @version 1.0
     */
    Date.prototype.addDate = function(val) {
        this.setDate(this.getDate() + val);
        return this;
    };
}

if(!Date.prototype.addHours) {
    /**
     * 시간 더하기
     * @param val 더할 시간
     * @returns val 시간 더해진 날짜
     * @author Jun.
     * @since 2013-03-04
     * @version 1.0
     */
    Date.prototype.addHours = function(val) {
        this.setHours(this.getHours() + val);
        return this;
    };
}

if(!Date.prototype.addMinutes) {
    /**
     * 분 더하기
     * @param val 더할 분
     * @returns val 분 더해진 날짜
     * @author Jun.
     * @since 2013-03-04
     * @version 1.0
     */
    Date.prototype.addMinutes = function(val) {
        this.setMinutes(this.getMinutes() + val);
        return this;
    };
}

if(!Date.prototype.addSeconds) {
    /**
     * 초 더하기
     * @param val 더할 초
     * @returns val 초 더해진 날짜
     * @author Jun.
     * @since 2013-03-04
     * @version 1.0
     */
    Date.prototype.addSeconds = function(val) {
        this.setSeconds(this.getSeconds() + val);
        return this;
    };
}

if(!Date.prototype.addMilliseconds) {
    /**
     * 밀리초 더하기
     * @param val 더할 밀리초
     * @returns val 밀리초 더해진 날짜
     * @author Jun.
     * @since 2013-03-04
     * @version 1.0
     */
    Date.prototype.addMilliseconds = function(val) {
        this.setMilliseconds(this.getMilliseconds() + val);
        return this;
    };
}

if(!Date.prototype.isDate) {
    /**
     * 날짜에게 날짜인지물어보기
     * @returns true
     * @author 김흥수
     * @since 2015-09-10
     * @version 1.0
     */
    Date.prototype.isDate = function() {
        return true;
    };
}

/**
 * 날짜인가?
 * @param a 날짜인지 검사할 대상
 * @returns 날짜이면 true
 * @author 김흥수
 * @since 2015-11-26
 * @version 1.0
 */
var gf_IsDate = function(a) {
    if(gf_IsObjNull(a)) {
        return  false;
    }
    return ! gf_IsObjNull(a.isDate) && a.isDate();
};

if(!Date.prototype.period) {
    /**
     * 두날짜의 차이를 구한다.
     * @param type year,month,date,hour,minute,second를 지정할 수 있다.
     * @param toDate 차이를 구할 날짜
     * @returns 두 날자의 차이
     * @author Jun.
     * @since 2013-04-16
     * @version 1.0
     */
    Date.prototype.period = function(type, toDate){
        if(typeof(type) != "string" ){
            toDate = type;
            type = "year";
        }

        var fromYear = this.getYear();
        var toYear = toDate.getYear();
        var fromMonth = this.getMonth() + 1;
        var toMonth = toDate.getMonth() + 1;
        var fromTime = this.getTime();
        var toTime = toDate.getTime();

        if(type == "year"){
            return toYear - fromYear;
        }else if(type == "month"){
            return ((toYear - fromYear)*12) + (toMonth - fromMonth);
        }else if(type == "date"){
            return Math.floor((toTime - fromTime)/1000/60/60/24);
        }else if(type == "hour"){
            return Math.floor((toTime - fromTime)/1000/60/60);
        }else if(type == "minute"){
            return Math.floor((toTime - fromTime)/1000/60);
        }else if(type == "second"){
            return Math.floor((toTime - fromTime)/1000);
        }
    };
}

/**
 * 설명 : 문자열 좌측에 정해진 길이 만큼 특정 문자를 붙인다.
 * @param sValue - 문자열
 * @param nLength - 길이
 * @param char - 채울 문자열
 * @returns 채워진 문자열
 * @author Jun.
 * @since 2013-04-01
 * @version 1.0
 */
var gf_Lpad = function(sValue, nLength, Char) {
    if (gf_IsNull(sValue)) sValue = "";
    sValue = sValue + '';
    return sValue.padLeft(nLength,Char,true);
};

/**
 * 설명 : 문자열 우측에 정해진 길이 만큼 특정 문자를 붙인다.
 * @param sValue - 문자열
 * @param nLength - 길이
 * @param char - 채울 문자열
 * @returns 채워진 문자열
 * @author Jun.
 * @since 2013-04-01
 * @version 1.0
 */
var gf_Rpad = function(sValue, nLength, Char) {
    if (gf_IsNull(sValue)) sValue = "";
    return sValue.padRight(nLength,Char,true);
};

/**
 * 내일 날짜를 반환한다
 * @returns 채워진 문자열
 * @author Alex Ko
 * @since 2013-04-04
 * @version 1.0
 */
var gf_GetNextDate = function() {
    var v_CurDate = new Date();
    v_CurDate.setDate(v_CurDate.getDate()+1);
    return v_CurDate;
};

/**
 * 오늘 날짜를 반환한다
 * @returns 채워진 문자열
 * @author Alex Ko
 * @since 2013-04-04
 * @version 1.0
 */
var gf_GetNowDate = function() {
    var v_CurDate = new Date();
    v_CurDate.setDate(v_CurDate.getDate());
    return v_CurDate;
};

/**
 * Argument 전송된 각 Data 값에 Quote(') 를 붙여준다.
 * @param argString 대상 문자열
 * @returns 채워진 문자열
 * @author Alex Ko
 * @since 2013-04-04
 * @version 1.0
 */
var gf_SetQuote = function(argString) {
    if (gf_IsNull(argString)) {
        argString = "";
    }
    return "\"" + argString + "\"";
}

/**
 * 설명 : 날짜를 문자로 변환.
 * @param inDate 대상 날짜
 * @returns 기본날짜형식으로 변환된 문자열
 * @author Jun.
 * @since 2013-04-04
 * @version 1.0
 */
var gf_Date2Str = function(inDate) {
    if(gf_IsNull(inDate)) return "";
    return inDate.format(Date.__SAVE_FORMAT__);
}

gf_date2Str = gf_Date2Str;

var gf_Date2StrDisplayFormat = function(inDate) {
    if(gf_IsNull(inDate)) return "";
    return inDate.format(Date.__DISPLAY_FORMAT__);
}

/**
 * 가감된 일자 반환
 * @param strDate:일자("20120412")
 * @param diff:가감수(3,-3)
 * @returns 날짜에 가감된 날짜의 문자열 형식
 * @author Jun.
 * @since 2013-04-04
 * @version 1.0
 */
var gf_GetDate = function(strDate, diff) {
    return gf_Default(strDate, ( new Date() ).format(Date.__SAVE_FORMAT__) ).toDate(Date.__SAVE_FORMAT__).addDate(diff).format(Date.__SAVE_FORMAT__);
};

gf_getDate = gf_GetDate;

/**
 * 설명 : 문자를 날짜로 변환.
 * @param inDate 날짜로 변환할 날짜형 문자열
 * @returns 기본 날짜형식의 문자열을 날짜로 치환하여 리턴
 * @author Jun.
 * @since 2013-04-04
 * @version 1.0
 */
var gf_Str2Date = function(inDate) {
    return inDate.toDate(Date.__SAVE_FORMAT__);
};

gf_str2Date = gf_Str2Date;

/**
 * 색상을 16진수로 전환
 * @param color
 * @returns 색상의 16진 표현
 * @author Jun.
 * @since 2013-04-04
 * @version 1.0
 */
var gf_ColorToHex = function(color) {
    if (color.substr(0, 1) === '#') {
        return color;
    }
    var digits = /(.*?)rgb\((\d+), (\d+), (\d+)\)/.exec(color);

    var red = parseInt(digits[2]);
    var green = parseInt(digits[3]);
    var blue = parseInt(digits[4]);

    var rgb = blue | (green << 8) | (red << 16);
    return digits[1] + '#' + rgb.toString(16);
};

/**
 * a가 b보다 작으면 참
 * @param a 비교대상 1
 * @param b 배교대상 2
 * @returns a < b 이면 true
 * @author 김흥수
 * @since 2015-11-26
 * @version 1.0
 */
var gf_LessThan = function(a,b) {
    if(gf_IsDecimal(a)) {
        return a.compareTo(b) < 0;
    } else if (gf_IsDecimal(b)) {
        return b.compareTo(a) > 0;
    } else if (gf_IsDate(a)) {
        if(gf_IsDate(b)) {
            return a.getTime() < b.getTime();
        } else {
            return a.toString() < b.toString();
        }
    } else {
        return a < b;
    }
};

/**
 * a와 b가 같으면 참
 * @param a 비교대상 1
 * @param b 배교대상 2
 * @returns boolean a == b 이면 true
 * @author 김흥수
 * @since 2015-11-26
 * @version 1.0
 */
var gf_IsSame = function(a,b) {
    if(gf_IsNull(a) && gf_IsNull(b)) {
        return true;
    }
    if(gf_IsNull(a) || gf_IsNull(b)) {
        return false;
    }
    return ! gf_LessThan(a,b) && ! gf_LessThan(b,a);
};

/**
 * 정규식의 escape 문자열이 치환된 문자열을 리턴한다.
 * @param o  입력값
 * @returns escape 치환된 문자열
 * @author 김흥수
 * @since 2015-11-22
 * @version 1.0
 */
var gf_EscapedString = function(o) {
    if(gf_IsNull(o)) return o;
    return o.replace(/\\/g, "\\\\")
            .replace(/\^/g, "\\^")
            .replace(/\$/g, "\\$")
            .replace(/\*/g, "\\*")
            .replace(/\+/g, "\\+")
            .replace(/\?/g, "\\?")
            .replace(/\./g, "\\.")
            .replace(/\(/g, "\\(")
            .replace(/\)/g, "\\)")
            .replace(/\|/g, "\\|")
            .replace(/\,/g, "\\,")
            .replace(/\{/g, "\\{")
            .replace(/\}/g, "\\}")
            .replace(/\[/g, "\\[")
            .replace(/\]/g, "\\]")
            .replace(/\-/g, "\\-");
};

/**
 * a like b 이면 참
 * @param a 비교대상 1
 * @param b 배교대상 2
 * @returns a like b 이면 true
 * @author 김흥수
 * @since 2015-12-24
 * @version 1.0
 */
var gf_IsLike = function(a,b) {
    if(gf_IsNull(b)) {
        return false;
    }
    if(gf_IsNull(a)) {
        return false;
    }
    b = gf_EscapedString(b).replaceAll("\\?",".").replaceAll("%",".*");
    var result = (new RegExp(b)).exec(a);
    return gf_IsSame(a,result);
};

/**
 * in 연산
 * @param ... 2개 이상의 인자를 취한다.
 * <pre>
 *  몇개의 인자를 취하든 첫번째 인자가 두번째 이후의 인자 또는 인자 배열에 포함되어 있으면 참이다.
 *  단 첫번째 인자가 객체이면 안된다.
 *  ex)
 *    gf_IsIn('a','a','b','c') == true
 *    gf_IsIn('a',['a','b','c']) == true
 *    gf_IsIn('a','b','c',['a','b','c']) == true
 *    gf_IsIn('a', { "property1":"a","property2":"b" } ) == true
 * </pre>
 * @returns boolean a in b 이면 true
 * @author 김흥수
 * @since 2015-11-20
 * @version 1.0
 */
var gf_IsIn = function() {
    if(gf_IsNull(arguments)) return false;
    if(arguments.length < 2) return false;
    var compareWhat = arguments[0];
    for(var i = 1; i < arguments.length; i++)
    {
        if(typeof( arguments[i] ) == 'object')
        {
            for(var idx in arguments[i])
            {
                if(gf_IsSame(arguments[i][idx] , compareWhat) ) return true;
            }
        }
        else
        {
            if(gf_IsSame(compareWhat, arguments[i])){
                return true;
            }
        }
    }
    return false;
};

/**
 * 설명 : Camel 표기법으로 변환
 * @param  str
 * @returns 카멜 표기법으로 변환된 str
 * @author 김흥수
 * @since 2015-11-20
 * @version 1.0
 */
var gf_ToCamel = function(str) {
    if(gf_IsNull(str)) {
        return str;
    }
    return str.hvcMap(function(s,i,arr) {
        if(s == "_") return null;
        if(i == 0) {
            return s.toLowerCase();
        } else {
            if( arr[i-1]  == "_") {
                return s.toUpperCase();
            } else {
                return s.toLowerCase();
            }
        }
    }).join("");
};

/**
 * 설명 : 날짜 형식 지정자를 JQuery datePicker에서 사용하는 형식 지정자로 변환한다.
 * @param  pattern 날짜 형식 지정자
 * @returns string JQuery datePicker에서 사용하는 형식 지정자
 * @author 김흥수
 * @since 2015-11-20
 * @version 1.0
 */
var gf_ToDatePickerFormat = function(pattern) {

    var s = "";

    while(pattern.length > 0 ) {
        if(pattern.indexOf("YYYY") == 0 ) {
            s += "yy";
            pattern = pattern.substr(4);
        } else if(pattern.indexOf("YY") == 0 ) {
            s += "y";
            pattern = pattern.substr(2);
        } else if(pattern.indexOf("MM") == 0 ) {
            s += "mm";
            pattern = pattern.substr(2);
        } else if(pattern.indexOf("DD") == 0 ) {
            s += "dd";
            pattern = pattern.substr(2);
        } else if(pattern.indexOf("HH") == 0 ) {
            throw "DatePicker형에는 시간을 지정할 수 없습니다.";
        } else if(pattern.indexOf("mm") == 0 ) {
            throw "DatePicker형에는 분을 지정할 수 없습니다.";
        } else if(pattern.indexOf("ss") == 0 ) {
            throw "DatePicker형에는 초를 지정할 수 없습니다.";
        } else if(pattern.indexOf("SS") == 0 ) {
            throw "DatePicker형에는 1/100초를 지정할 수 없습니다.";
        } else if(pattern.indexOf("MON") == 0 ) {
            s += "MM";
            pattern = pattern.substr(3);
        } else if(pattern.indexOf("mon") == 0 ) {
            s += "M";
            pattern = pattern.substr(3);
        } else {
            s += pattern.substr(0,1);
            pattern = pattern.substr(1);
        }
        }
    return s;
};

/**
 * 설명 : 날짜형태의 문자열의 형식을 변경한다.
 * @param  dateStr : 날짜 형식 문자열
 * @param  srcFormat : 원본 형식
 * @param  toFormat : 목적 형식
 * @returns toFormat 으로 변환된 날짜 형식 문자열
 * @author 김흥수
 * @since 2015-11-20
 * @version 1.0
 */
var gf_ChangeDateFormat = function(dateStr,srcFormat,toFormat) {
    if(gf_IsNull(dateStr)) return "";
    return dateStr.toDate(srcFormat).format(toFormat);
};

/**
 * 설명 : 날짜 형식 지정자를 JQuery mask 에서 사용하는 형식 지정자로 변환한다.
 * @param  pattern : 날짜 형식 지정자
 * @returns JQuery mask용 형식 지정자 형태 문자열
 * @author 김흥수
 * @since 2015-11-20
 * @version 1.0
 */
var gf_ToDateMask = function(pattern) {

    var s = "";

    while(pattern.length > 0 ) {
        if(pattern.indexOf("YYYY") == 0 ) {
            s += "9999";
            pattern = pattern.substr(4);
        } else if(pattern.indexOf("YY") == 0 ) {
            s += "99";
            pattern = pattern.substr(2);
        } else if(pattern.indexOf("MM") == 0 ) {
            s += "99";
            pattern = pattern.substr(2);
        } else if(pattern.indexOf("DD") == 0 ) {
            s += "99";
            pattern = pattern.substr(2);
        } else if(pattern.indexOf("HH") == 0 ) {
            throw "mask에는 시간을 지정할 수 없습니다.";
        } else if(pattern.indexOf("mm") == 0 ) {
            throw "mask에는 분을 지정할 수 없습니다.";
        } else if(pattern.indexOf("ss") == 0 ) {
            throw "mask에는 초를 지정할 수 없습니다.";
        } else if(pattern.indexOf("SS") == 0 ) {
            throw "mask에는 1/100초를 지정할 수 없습니다.";
        } else if(pattern.indexOf("MON") == 0 ) {
            throw "mask에는 약어가 아닌 월 이름을 지정할 수 없습니다.";
        } else if(pattern.indexOf("mon") == 0 ) {
            s += "AAA";
            pattern = pattern.substr(3);
        } else {
            s += pattern.substr(0,1);
            pattern = pattern.substr(1);
        }
    }
    return s;
};

/**
 * 파일사이즈표시, bytes는 제거함, 최소 표시단위는 KB
 * @param size
 * @returns
 */
var gf_FileSizeExpression = function(size) {

      var s = ['KB', 'MB', 'GB', 'TB', 'PB'];
      var e = Math.floor(Math.log(size) / Math.log(1024*1024));
      res = (size / 1024 / Math.pow(1024, e)).toFixed(2).replace(/\B(?=(?:\d{3})+(?!\d))/g, ",") + " " + s[e];
      if(res == "NaN undefined")
              return "0 bytes";
      else return res;

      /** bytes 사용한 것, 백업
      var s = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
      var e = Math.floor(Math.log(size) / Math.log(1024));
      res = (size / Math.pow(1024, e)).toFixed(2).replace(/\B(?=(?:\d{3})+(?!\d))/g, ",") + " " + s[e];*/
};

/**
 * JS 스트링 포매터
 * 사용법 : String.format("{0}=='{1}'",'값1','값2')
 " 결과 : 값1=='값2'"
 */
String.format = function() {
        var theString = arguments[0];
        for (var i = 1; i < arguments.length; i++) {
                var regEx = new RegExp("\\{" + (i - 1) + "\\}", "gm");
                theString = theString.replace(regEx, arguments[i]);
        }
        return theString;
};

// locale
var gf_LocaleTrans = function(progrmId, key) {	
	var returnData;
	var jsonParameter = {
			progrmId:progrmId,
			key:key
	};	
	var ajaxUrl = gv_ServerApiUrl + '/locale/getLocaleCodeName';    
    ajaxUrl = ajaxUrl.substr(0, 2) == "//"? ajaxUrl.substr(1): ajaxUrl; 
	$.ajax({
		url: ajaxUrl,    
        type: 'GET',
        cache: false,
        xhrFields: {
            withCredentials: true
        },
        data: jsonParameter,
        dataType: 'json',
        async: false,
        success: function(data) {
        	returnData = data;            	 
        }
	});    
	if(gf_IsNull(returnData)) return '';
	else return returnData.data;
};

// refresh memory locale values
var gf_RefreshLocale = function() {	
	var returnData;
	var jsonParameter = {};	
	var ajaxUrl = gv_ServerApiUrl + '/locale/refreshLocaleCode';    
    ajaxUrl = ajaxUrl.substr(0, 2) == "//"? ajaxUrl.substr(1): ajaxUrl;
	$.ajax({
		url: ajaxUrl,    
        type: 'GET',
        cache: false,
        xhrFields: {
            withCredentials: true
        },
        data: jsonParameter,
        dataType: 'json',
        async: false,
        success: function(data) {
        	returnData = data;            	 
        }
	});    
	if(gf_IsNull(returnData)) return '';
	else return returnData.data; 
};

// system setting
var gf_GetSysConfig = function(item) {
	var returnData;
	var jsonParameter = { item:item };	
	var ajaxUrl = gv_ServerApiUrl + '/system/setting/getSettingValue';    
    ajaxUrl = ajaxUrl.substr(0, 2) == "//"? ajaxUrl.substr(1): ajaxUrl; 
	$.ajax({
		url: ajaxUrl,    
        type: 'GET',
        cache: false,
        xhrFields: {
            withCredentials: true
        },
        data: jsonParameter,
        dataType: 'json',
        async: false,
        success: function(data) {
        	returnData = data;            	 
        }
	});    
	if(gf_IsNull(returnData)) return '';
	else return returnData.data;
};

// refresh memory setting values
var gf_RefreshSysConfig = function() {	
	var returnData;
	var jsonParameter = {};	
	var ajaxUrl = gv_ServerApiUrl + '/system/setting/refreshSettingItem';    
    ajaxUrl = ajaxUrl.substr(0, 2) == "//"? ajaxUrl.substr(1): ajaxUrl;    
	$.ajax({
		url: ajaxUrl,    
        type: 'GET',
        cache: false,
        xhrFields: {
            withCredentials: true
        },
        data: jsonParameter,
        dataType: 'json',
        async: false,
        success: function(data) {
        	returnData = data;            	 
        }
	});    
	if(gf_IsNull(returnData)) return '';
	else return returnData.data; 
};

//locale
var gf_ComboCode = function(divId, selectId, selectName, placeHolder, codekindCode, exceptCode, selectStyle, selectClass, sortOrder, validation,refer) {	
	var returnData;
	var jsonParameter = {
			codekindCode:codekindCode,
			exceptCode:exceptCode,
			sortOrder:sortOrder
	};	
	var ajaxUrl = gv_ServerApiUrl + '/cmmnCode/getCmmnCode';    
    ajaxUrl = ajaxUrl.substr(0, 2) == "//"? ajaxUrl.substr(1): ajaxUrl; 
	$.ajax({
		url: ajaxUrl,    
        type: 'GET',
        cache: false,
        xhrFields: {
            withCredentials: true
        },
        data: jsonParameter,
        dataType: 'json',
        async: false,
        success: function(data) {
        	returnData = data;            	 
        }
	});    
	if(gf_IsNull(returnData)) {
		return '';
	} else {		
		var shape = [];
		var locale = gf_GetSysConfig("langSeCode");
		//alert(locale);
		shape.push("<select ");
		if(!gf_IsNull(selectName)) shape.push(" name=\""+selectName+"\" ");
		if(!gf_IsNull(selectStyle)) shape.push(" style=\""+selectStyle+"\" ");
		if(!gf_IsNull(selectClass)) shape.push(" class=\""+selectClass+"\" ");
		if(!gf_IsNull(selectId)) shape.push(" id=\""+selectId+"\" ");
		if(!gf_IsNull(validation)) shape.push(" "+validation+" ");
		shape.push(" >");
		if(!gf_IsNull(placeHolder)) {
			if(placeHolder === 'search') shape.push('<option value="">전체</option>');
			else shape.push('<option value="">선택</option>');
		}
		
		
		returnData.data.forEach(function(item){	
			if(locale == "eng") {
				shape.push("<option value=\""+item.code+"\">"+item.codeEngNm+"</option>");
		    } else
		    if(locale == "third") {
		    	shape.push("<option value=\""+item.code+"\">"+item.codeEngNm+"</option>");
		    } else {
		    	//팩터 사용할 경우 
		    		if (refer =="factor") {
		    			shape.push("<option value=\""+item.factor+"\">"+item.codeNm+"</option>");
		    		}else if (refer =="rf1") {
		    			shape.push("<option value=\""+item.refer1Dc+"\">"+item.codeNm+"</option>");
		    		}else if (refer =="rf2") {
		    			shape.push("<option value=\""+item.refer2Dc+"\">"+item.codeNm+"</option>");
		    		}else if (refer =="rf3") {
		    			shape.push("<option value=\""+item.refer3Dc+"\">"+item.codeNm+"</option>");
		    		}else if (refer =="rf4") {
		    			shape.push("<option value=\""+item.refer4Dc+"\">"+item.codeNm+"</option>");
		    		}else if (refer =="rf5") {
		    			shape.push("<option value=\""+item.refer5Dc+"\">"+item.codeNm+"</option>");		
		    		}else{
		    			shape.push("<option value=\""+item.code+"\">"+item.codeNm+"</option>");
		    		}
		    } 
		});		
		shape.push("</select>");
		
		if(gf_IsNull(divId)) {
			return shape.join("");	
		} else {
			$('#'+divId).html(shape.join(""));
		}		
	}
};

// refresh memory locale values
var gf_RefreshComboCode = function() {	
	var returnData;
	var jsonParameter = {};	
	var ajaxUrl = gv_ServerApiUrl + '/cmmnCode/refreshCmmnCode';    
    ajaxUrl = ajaxUrl.substr(0, 2) == "//"? ajaxUrl.substr(1): ajaxUrl;
	$.ajax({
		url: ajaxUrl,    
        type: 'GET',
        cache: false,
        xhrFields: {
            withCredentials: true
        },
        data: jsonParameter,
        dataType: 'json',
        async: false,
        success: function(data) {
        	returnData = data;            	 
        }
	});    
	if(gf_IsNull(returnData)) return '';
	else return returnData.data; 
};


var getDocHeight = function() {
	var db = document.body;
	var dde = document.documentElement;
    return Math.max(
    	db.scrollHeight, 
    	dde.scrollHeight, 
    	db.offsetHeight, 
    	dde.offsetHeight, 
    	db.clientHeight, 
    	dde.clientHeight,
    	window.innerHeight,
    	window.outerHeight,
    	$(window).height()
    );
};

var gf_IframeHeightResize = function(isInit) {	
	if(!gf_IsNull(window.frameElement)) {		
		//if(isInit){
		//	$("#" + window.frameElement.id, parent.document).height( '0px');
		//	$(parent.document).find('html').scrollTop(0);
		//}		
		//var screenHeight = (typeof window.outerHeight != 'undefined') ? Math.max(window.outerHeight, $(window).height()) : $(window).height();
		//$("#" + window.frameElement.id, parent.document).height( getDocHeight()  + 'px');
		//$("#" + window.frameElement.id, parent.document).height( '800px');
		//$("#" + window.frameElement.id, parent.document).attr('style','min-height:auto');
		//★ DHTML 아이프레임 높이
	}
};

var gf_CallbackFileUpload = function(data, eventFunction, deleteBtnClassNm, viewDivId, dataDivId, keyArr, infoArr){
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
		$('#'+viewDivId+' .file_box table').append(atchFileList.join(""));
		$('#'+dataDivId).val(keyArr.join("|"));		
		var callbacks = $.Callbacks();
		var callFunction = eval(eventFunction);
		callbacks.empty();
		callbacks.add(callFunction);
        callbacks.fire();
	}
};

var gf_DeleteAtachFile = function(eventFunction, delIdx, deleteBtnClassNm, viewDivId, dataDivId, keyArr, infoArr){
	keyArr.splice(delIdx, 1);
	infoArr.splice(delIdx, 1);	
	$('#'+viewDivId+' .file_box table tr').remove();	
	var idx = 0;
	var fileInfos = [];
	var atchFileList = [];	
	$.each( infoArr, function( key, value ) {		
		fileInfos = infoArr[key].split('|^|');		
		atchFileList.push('<tr>');
		atchFileList.push('<td><a href="'+gv_ServerApiUrl+'/file/down?atchFileId='+fileInfos[0]+'">'+fileInfos[2]+'</a></td>');
		atchFileList.push('<td class="ac">'+gf_FileSizeExpression(fileInfos[3])+'</td>');
		atchFileList.push('<td class="ac"><button type="button" idx="'+idx+'" class="btn_del '+deleteBtnClassNm+'"><span class="glyphicon glyphicon-remove"></span> 삭제</button></td>');
		atchFileList.push('</tr>');
		idx++;
	});									
	$('#'+viewDivId+' .file_box table').append(atchFileList.join(""));
	$('#'+dataDivId).val(keyArr.join("|"));
	var callbacks = $.Callbacks();
	var callFunction = eval(eventFunction);
	callbacks.empty();
	callbacks.add(callFunction);
    callbacks.fire();
};

var gf_FileUploadPopup = function(
		eventFunction, 		/* 이벤트함수 : 파일목록을 다시 생성하며, 버튼 이벤트를 주기 위함.*/
		deleteBtnClassNm, 	/* 삭제버튼의 클래스 명 (삭제버튼 이벤트 클래스명과 동일해야함) */
		viewDivId, 			/* 테이블형식의 파일 목록 */
		dataDivId, 			/* 디비에 입력할 파일 목록 (파이프라인으로 구분) */
		keyArr, 			/* 파일키 배열 */
		infoArr, 			/* 파일정보 배열 */
		fileLimitCnt,		/* 파일갯수 제한 */
		acceptType,			/* 허용가능한 파일 (all:모두, image:이미지만, excel:엑셀파일만, pdf:pdf파일만, hwp:한글파일만) */
		callbackFuncNm,      /* 콜백함수 (없을경우 디퐆트 콜백(gf_CallbackFileUpload)) */
		viewType            /* 저장기능 비활성화 하려면 값을 'view' 로 보내야 함 */ ) {	
	var dhxWindows;
	var dhxWindowObj;	
	if($('body').find("div[id='fileUploadBpopup']").size() <= 0) { $('body').append('<div id="fileUploadBpopup"><div class="b-close" style="display:none"></div></div>'); }	
	var callbacks = $.Callbacks();
	var callFunction;	
	if ( !gf_IsNull(callbackFuncNm) ) { callFunction = eval(callbackFuncNm); } else {
		callFunction = eval('gf_CallbackFileUpload');
	}	
	if(gf_IsNull(fileLimitCnt)) fileLimitCnt = 0; 
	
	if ( gf_IsNull(viewType) ) {
		viewType = "all";
	}
	
	$('#fileUploadBpopup').bPopup({
		onOpen:function(){	
			dhxWindows = new dhtmlXWindows();			
			var id 		= 'fileUploadPopup';
			var title 	= '파일업로드'; 
			var ajaxUrl = gv_ContextPath+'/pop/fileUpload/view?acceptType='+acceptType+'&fileLimitCnt='+fileLimitCnt+'&viewType='+viewType;			
			var left	= 0;
			var top		= 0; 
			var width	= 500;
			var height	= 480;	
			dhxWindowObj = dhxWindows.createWindow(id, left, top, width, height);
			dhxWindows.window(id).centerOnScreen();					
			dhxWindowObj.setText(title);					
			dhxWindowObj.attachURL(ajaxUrl, true, true);					
			dhxWindowObj.attachEvent("onClose", function(win){
				$('#fileUploadBpopup .b-close').click();
			});					
		},
		onClose:function(){	
			var data = [];
			data = returnUploadedFiles;			
			if ( !gf_IsNull(callFunction) ) {
				callbacks.empty();
				callbacks.add(callFunction);
	            callbacks.fire(data, eventFunction, deleteBtnClassNm, viewDivId, dataDivId, keyArr, infoArr);
			}			
			dhxWindows.unload();
			$('body').find("div[id='fileUploadBpopup']").remove();
		}
	},
	function(){});	
	return dhxWindowObj;
};

// correct str length hangle 2byte else 1byte
var gf_GetTextLength = function(str) {
    var len = 0;
    for (var i = 0; i < str.length; i++) {
        if (escape(str.charAt(i)).length > 4) { len++; }
        len++;
    }
    return len;
}

//폼방식에서 우편번호 호출 
function execDaumPostcode(formId,postCd, homeAddr, homeAddr2) {
	var width = 500; //팝업의 너비
	var height = 400; //팝업의 높이    	
	var obj = "";
	
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
            //obj = '#' + formId + " #" + postCd;
    	 	//$(obj).val(data.zonecode);   //
    	 	//$(obj).val(data.fullAddr);   //
    	 	//$(obj).val(data.zonecode);   //
    	 
            document.getElementById(postCd).focus();
            document.getElementById(postCd).value = data.zonecode; //5자리 새우편번호 사용
            document.getElementById(homeAddr).focus();
            document.getElementById(homeAddr).value = fullAddr;
            document.getElementById(homeAddr2).focus(); // 커서를 상세주소 필드로 이동한다.
        }
    }).open({
	    left: (window.screen.width / 2) - (width / 2),
	    top: (window.screen.height / 2) - (height / 2)
	});
}

//그리드방식에서 우편번호 호충 
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


var gf_RadioCode = function(divId, id,  codekindCode, exceptCode, sortOrder, defaultCheck) {	
	var returnData;
	var jsonParameter = {
			codekindCode:codekindCode,
			exceptCode:exceptCode,
			sortOrder:sortOrder
	};	
	var ajaxUrl = gv_ServerApiUrl + '/cmmnCode/getCmmnCode';    
    ajaxUrl = ajaxUrl.substr(0, 2) == "//"? ajaxUrl.substr(1): ajaxUrl; 
	$.ajax({
		url: ajaxUrl,    
        type: 'GET',
        cache: false,
        xhrFields: {
            withCredentials: true
        },
        data: jsonParameter,
        dataType: 'json',
        async: false,
        success: function(data) {
        	returnData = data;            	 
        }
	});    
	if(gf_IsNull(returnData)) {
		return '';
	} else {		
		var shape = [];
		var locale = gf_GetSysConfig("langSeCode");
		
		shape.push('<ul>');
		returnData.data.forEach(function(item){	

			shape.push('<li style="display:inline;">');
			if(gf_IsNull(defaultCheck)) {
				shape.push('<input type="radio" required="true" id="radio_'+id+''+item.codeNm+'"  name="'+id+'" value="'+item.code+'"/><label for="radio_'+id+''+item.codeNm+'"><span></span>'+item.codeNm+'</label> <span></span>');
			} else {
				if(defaultCheck === item.code) {
					shape.push('<label><input type="radio" required="true" selected="true" id="radio_'+id+''+item.codeNm+'"  name="'+id+'" value="'+item.code+'"/><label for="radio_'+id+''+item.codeNm+'"><span></span>'+item.codeNm+'</label> <span></span><span></span>');
				} else {
					shape.push('<label><input type="radio" required="true" id="radio_'+id+''+item.codeNm+'"  name="'+id+'" value="'+item.code+'"/><label for="radio_'+id+''+item.codeNm+'"><span></span>'+item.codeNm+'</label> <span></span><span></span>');
				}
			}
			shape.push('</li>')
		});
		shape.push('</ul>')
	}
	$('#'+divId).html(shape.join(''));
};

var gf_CheckCode =  function(divId, id,  codekindCode, exceptCode, sortOrder, defaultCheck) {	
	var returnData;
	var jsonParameter = {
			codekindCode:codekindCode,
			exceptCode:exceptCode,
			sortOrder:sortOrder
	};	
	var ajaxUrl = gv_ServerApiUrl + '/cmmnCode/getCmmnCode';    
    ajaxUrl = ajaxUrl.substr(0, 2) == "//"? ajaxUrl.substr(1): ajaxUrl; 
	$.ajax({
		url: ajaxUrl,    
        type: 'GET',
        cache: false,
        xhrFields: {
            withCredentials: true
        },
        data: jsonParameter,
        dataType: 'json',
        async: false,
        success: function(data) {
        	returnData = data;            	 
        }
	});    
	if(gf_IsNull(returnData)) {
		return '';
	} else {		
		var shape = [];
		var locale = gf_GetSysConfig("langSeCode");
		//alert(locale);
		
		shape.push('<ul>');
		returnData.data.forEach(function(item){	

			shape.push('<li style="display:inline;">');
			if(gf_IsNull(defaultCheck)) {
				shape.push('<input type="checkbox" id="checkbox_'+id+'" required name="'+id+'" value="'+item.code+'"/><label for="'+id+'"><span> '+item.codeNm+'</span></label>');
			} else {
				if(defaultCheck === item.code) {
					shape.push('<input type="checkbox" checked="true" id="checkbox_'+id+'"  name="'+id+'" value="'+item.code+'"/><label for="'+id+'"><span> '+item.codeNm+'</span></label>');
				} else {
					shape.push('<input type="checkbox" id="checkbox_'+id+'"  name="'+id+'" value="'+item.code+'"/><label for="'+id+'"><span> '+item.codeNm+'</span></label>');
				}
			}
			shape.push('</li>')
		});
		shape.push('</ul>')
	}
	$('#'+divId).html(shape.join(''));
};
//날짜 포멧 처리
var dateFormat =  function(date) {
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
//날짜 포멧 처리
var dateFormat2 =  function(date) {
	var dd = date.getDate();
	var mm = date.getMonth()+1; //January is 0!
	var yyyy = date.getFullYear();
	
	if(dd<10) {
	    dd='0'+dd
	} 
	
	if(mm<10) {
	    mm='0'+mm
	} 
	var nDate = yyyy+""+mm+""+dd;
	return(nDate);
}

// 입력 내용을 시간:분 포맷으로
function gf_TimeChk(objTime){
    var time = objTime.val();
    var TimeFormat;
    var RegPhonNum;
    var isValid = true;
    if (time.length >= 1) {
    	TimeFormat = "$1:$2"; // 포맷을 바꾸려면 이곳을 변경
        RegTimeNum = /([0-9]{2})([0-9]+)/;
        time = time.replace(/[^0-9]/g, "");
        while (RegTimeNum.test(time)) {
        	time = time.replace(RegTimeNum , TimeFormat);
        }
        objTime.val(time);
    }
    
    var time_chk = time.split(":");
    if((time_chk[0] > 24 || time_chk[1] > 59) && time_chk.length >= 1 ){
        isValid = false;
    }
    
    if(!isValid){
    	objTime.val("");        	
    	objTime.focus();
        gf_DivMsgAlert("잘못된 시간입니다. \n다시 입력하세요.");
        return;
    }
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
};

//달력 생성  : jquery의 datepicker 사용
//당해년도 yyyy
var gf_DateYy =  function (id) {
	var nowDate = "";
  var today = new Date();
  nowDate = dateFormat(today);
  var obj = "#"  + id;
	//달력 생성  : yearpicker 사용
	//금일 날짜표시
	$(obj).val(nowDate.substring(0,4));

  var currentYear = (new Date()).getFullYear();
  var startYear = currentYear-20;
  var endYear = currentYear+20;

  $(obj).yearpicker({
      year: currentYear,
      startYear: startYear,
      endYear: endYear
    });    
}
//달력 생성  : jquery의 datepicker 사용
//해당년월 yyyy-mm
var gf_DateYm =  function (id, initYmd) {
	var nowDate = "";
	var today = new Date();
    var nowDate = dateFormat(today);
    
	var obj = "#"  + id;
	//달력 생성  : jquery의 datepicker 사용
	//금일 날짜표시
	//console.log('obj' + obj + "#########" + nowDate.substring(0,7)); 	
	
	if(initYmd==undefined) 
		$(obj).val(nowDate.substring(0,7));
	else
		$(obj).val(initYmd);

    var currentYear = (new Date()).getFullYear();
    var startYear = currentYear-20;

    var options = {
            startYear: startYear,
            finalYear: currentYear + 1,
            pattern: 'yyyy-mm',
            monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월']
    };

    $(obj).monthpicker(options);
};
//달력 생성  : jquery의 datepicker 사용
//해당년월일 yyyy-mm-dd
var gf_DateYmd =  function (id, initYmd) {
	var nowDate = "";
	var today = new Date();
    var nowDate = dateFormat(today);
    
	var obj = "#"  + id;
	//달력 생성
	var dhxCCalendarDate1 = new dhtmlXCalendarObject({input: id, button:"startDateIcon"});
	dhxCCalendarDate1.loadUserLanguage("ko");
	//dhxCCalendarDate1.hideTime();
	dhxCCalendarDate1.setDateFormat("%Y-%m-%d");
	
	//금일 날짜표시
	if(initYmd==undefined) 
		$(obj).val(nowDate);
	else
		$(obj).val(initYmd);
};

