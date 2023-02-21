package kr.co.dbvision.lib.taglib.system.setting.web;

import java.io.IOException;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.SimpleTagSupport;

import kr.co.dbvision.lib.taglib.system.setting.service.impl.SystemSetting;

public class GetSystemSetting extends SimpleTagSupport {
	
	private String item;

	public GetSystemSetting() {
	}
 	
	public void setItem(String item) {
		this.item = item;
	}

	@Override
	public void doTag() throws JspException, IOException {
		try {

			String settingValue = SystemSetting.getItemValue("", item);
			getJspContext().getOut().write(settingValue);

		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
