package kr.co.dbvision.lib.taglib.code.locale.web;

import java.io.IOException;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.SimpleTagSupport;

import kr.co.dbvision.lib.taglib.code.locale.service.impl.Locale;

public class GetLocaleWord extends SimpleTagSupport {
    
    private String progrmId;
    private String ky;
    
    public GetLocaleWord() {
        //
    }
    
    public void setKey(String ky) {
        this.ky = ky;
    }
    public void setProgrmId(String progrmId) {
        this.progrmId = progrmId;
    }

    @Override
    public void doTag() throws JspException, IOException {
        try {

            String transeText = Locale.getLocaleCodeName(progrmId, ky);
            getJspContext().getOut().write(transeText);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
