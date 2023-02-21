package kr.co.dbvision.lib.taglib.code.cmmn.web;

import java.io.IOException;
import java.util.List;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.SimpleTagSupport;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.taglib.code.cmmn.service.impl.CmmnCode;
import kr.co.dbvision.lib.taglib.system.setting.service.impl.SystemSetting;

public class GetComboCode extends SimpleTagSupport {
	
	private String codekindCode;
	private String exceptCode;
	private String selectName;
	private String selectId;
	private String selectClass;
	private String selectStyle;
	private String sortOrder;
	
	public GetComboCode() {
	}
 
	public void setCodekindCode(String codekindCode) {
		this.codekindCode = codekindCode;
	}	
	public void setExceptCode(String exceptCode) {
		this.exceptCode = exceptCode;
	}	
	public void setSelectName(String selectName) {
        this.selectName = selectName;
    }

    public void setSelectId(String selectId) {
        this.selectId = selectId;
    }

    public void setSelectClass(String selectClass) {
        this.selectClass = selectClass;
    }

    public void setSelectStyle(String selectStyle) {
        this.selectStyle = selectStyle;
    }    

    public String getSortOrder() {
        return sortOrder;
    }

    public void setSortOrder(String sortOrder) {
        this.sortOrder = sortOrder;
    }

    @Override
	public void doTag() throws JspException, IOException {
		try {
 		    
		    String locale = SystemSetting.getItemValue("", "langSeCode");		    
		    List<EgovMapForNull> codeList = CmmnCode.getCmmnCode(codekindCode, exceptCode, sortOrder);
			StringBuffer sb = new StringBuffer();
			
			sb.append("<select ");
			if(!StringExpression.nullConvert(selectName).isEmpty()) sb.append(" name=\""+selectName+"\" ");
			if(!StringExpression.nullConvert(selectStyle).isEmpty()) sb.append(" style=\""+selectStyle+"\" ");
			if(!StringExpression.nullConvert(selectClass).isEmpty()) sb.append(" class=\""+selectClass+"\" ");
			if(!StringExpression.nullConvert(selectId).isEmpty()) sb.append(" id=\""+selectId+"\" ");
			sb.append(" >");
			
			codeList.stream().forEach(action->{
			    
			    if(locale.equals("eng")) {
			        sb.append("<option value=\""+action.get("code")+"\">"+action.get("codeEngNm")+"</option>");
			    } else
			    if(locale.equals("third")) {
			        sb.append("<option value=\""+action.get("code")+"\">"+action.get("codeThirdNm")+"</option>");
			    } else {
			        sb.append("<option value=\""+action.get("code")+"\">"+action.get("codeNm")+"</option>");
			    }
			    
			});
			sb.append("</select>");	 		
			getJspContext().getOut().write(sb.toString());

		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
