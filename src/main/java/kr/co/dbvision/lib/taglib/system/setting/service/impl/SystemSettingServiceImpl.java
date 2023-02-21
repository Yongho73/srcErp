package kr.co.dbvision.lib.taglib.system.setting.service.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;
import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.taglib.system.setting.service.SystemSettingService;
import kr.co.dbvision.lib.taglib.system.setting.service.mapper.SystemSettingMapper;

/**
 * 다국어 지원 서비스 구현 클래스
 *
 * @author  표준프레임워크센터
 * @since 2014.01.24
 * @version 1.0
 * @see <pre>
 *  == 개정이력(Modification Information) ==
 *
 *          수정일          수정자           수정내용
 *  ----------------    ------------    ---------------------------
 *   2014.01.24        표준프레임워크센터          최초 생성
 *
 * </pre>
 */
@Service("SystemSettingService")
public class SystemSettingServiceImpl extends EgovAbstractServiceImpl implements SystemSettingService {
	
	Logger logger = LogManager.getLogger(SystemSettingServiceImpl.class);
	
	@Resource(name="SystemSettingMapper")
	private SystemSettingMapper systemSettingMapper;

	@PostConstruct
	public List<?> setCodeList() throws Exception {
				
		EgovMapForNull paramMap = new EgovMapForNull();
		
		SystemSetting.clearArray();
		
		SystemSetting.SYST_SETT = systemSettingMapper.selectSetting(paramMap);
		
		System.out.println("SYST_SETT size = ["+SystemSetting.SYST_SETT.size()+"]");
		
		return SystemSetting.SYST_SETT;
	}

	@Override
	public String getSettingValue(Map<String, Object> params) throws Exception {

	    String item = StringExpression.nullConvert(params.get("item"));	   
		return SystemSetting.getItemValue("", item);
	}

	@Override
	public boolean refreshSettingItem() throws Exception {
		this.setCodeList();
		return true;
	}
}
