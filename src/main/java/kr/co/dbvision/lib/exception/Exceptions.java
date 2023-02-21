package kr.co.dbvision.lib.exception;

import net.sf.json.JSONObject;

public class Exceptions extends RuntimeException implements Messages {

	private static final long serialVersionUID = -9067772414982980374L;
	private String code;
	private String message;
	private String methodNm;
	private final int ERR_CODE; // 생성자를 통해 초기화 한다.

	public Exceptions(String msg, int errcode){ //생성자
        super(msg);
        ERR_CODE=errcode;
    }

	public Exceptions(String msg){// 생성자
        this(msg, 100);// ERR_CODE를 100(기본값)으로 초기화한다.
        this.message = msg;
	}
	
	public Exceptions(Throwable throwable, Exception e) {
	    this(e.getMessage());
        this.code = ERROR_CODE;
        this.message = String.format(ERROR_MGS, e.getLocalizedMessage());               
        this.methodNm = throwable.getStackTrace()[0].getMethodName();
        
        e.printStackTrace();
    }

	public Exceptions(Throwable throwable, String msg) {
        this(msg);
        this.code = ERROR_CODE;
        this.message = String.format(ERROR_MGS, msg);               
        this.methodNm = throwable.getStackTrace()[0].getMethodName();  
    }
    
    public Exceptions(Throwable throwable, String msg, String errcode) {
        this(msg);
        this.code = ERROR_CODE;
        if(errcode != null && !errcode.equals("")) {
            this.code = errcode;
        }
        this.message = String.format(ERROR_MGS, msg);               
        this.methodNm = throwable.getStackTrace()[0].getMethodName();  
    }

    public JSONObject getResultStatus() {
		JSONObject errorStatus = new JSONObject();
		errorStatus.put("action", "error");
		errorStatus.put("methodNm", methodNm);
		errorStatus.put("code", code);
		errorStatus.put("message", message);
		return errorStatus;
	}

	public String getErrCode() {
		return this.code;
	}

	public String getErrMsg() {
		return this.message;
	}

	public String getErrMtd() {
		return this.methodNm;
	}
}
