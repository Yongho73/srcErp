package kr.co.dbvision.lib.taglib.code.cmmn.service.impl;

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
import kr.co.dbvision.lib.taglib.code.cmmn.service.CmmnCodeService;
import kr.co.dbvision.lib.taglib.code.cmmn.service.mapper.CmmnCodeMapper;

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
@Service("CmmnCodeService")
public class CmmnCodeServiceImpl extends EgovAbstractServiceImpl implements CmmnCodeService {
	
	Logger logger = LogManager.getLogger(Stmmng001ServiceImpl.class);
	
	@Resource(name="CmmnCodeMapper")
	private CmmnCodeMapper cmmnCodeMapper;

	@PostConstruct
	public List<?> setCodeList() throws Exception {
				
		EgovMapForNull paramMap = new EgovMapForNull();
		
		CmmnCode.clearArray();
		
		CmmnCode.STM_COMMON_CODE_LIST = cmmnCodeMapper.selectStmCode(paramMap);
		
		System.out.println("common code size = ["+CmmnCode.STM_COMMON_CODE_LIST.size()+"]");
		
		return CmmnCode.STM_COMMON_CODE_LIST;
	}
	
	@Override
	public boolean refreshCmmnCode() throws Exception {				
		this.setCodeList();
		return true;
	}
	
	@Override
	public List<EgovMapForNull> getCmmnCode(Map<String, Object> params) throws Exception {
		
	    System.out.println(params);
	    
		String codekindCode = (String) params.get("codekindCode");
		String exceptCode = (String) params.get("exceptCode");
		String sortOrder = (String) params.get("sortOrder");		

		return CmmnCode.getCmmnCode(codekindCode, exceptCode, sortOrder);
	}	 
}
