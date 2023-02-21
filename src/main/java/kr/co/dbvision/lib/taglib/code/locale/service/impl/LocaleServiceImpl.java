package kr.co.dbvision.lib.taglib.code.locale.service.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;
import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.stm.mng.stmmng001.service.impl.Stmmng001ServiceImpl;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.taglib.code.locale.service.LocaleService;
import kr.co.dbvision.lib.taglib.code.locale.service.mapper.LocaleMapper;

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
@Service("LocaleService")
public class LocaleServiceImpl extends EgovAbstractServiceImpl implements LocaleService {
	
	Logger logger = LogManager.getLogger(Stmmng001ServiceImpl.class);
	
	@Resource(name="LocaleMapper")
	private LocaleMapper localeMapper;

	@PostConstruct
	public List<?> setCodeList() throws Exception {
				
		EgovMapForNull paramMap = new EgovMapForNull();
		
		Locale.clearArray();
		
		Locale.CODE_LIST = localeMapper.selectLocale(paramMap);
		
		System.out.println("Locale size = ["+Locale.CODE_LIST.size()+"]");
		
		return Locale.CODE_LIST;
	}
	
	@Override
	public boolean refreshLocaleCode() throws Exception {				
		this.setCodeList();
		return true;
	}
	
	@Override
	public String getLocaleCodeName(Map<String, Object> params) throws Exception {
		
		String progrmId = (String) params.get("progrmId");
		String key = (String) params.get("key");

		return Locale.getLocaleCodeName(progrmId, key);
	}
}
