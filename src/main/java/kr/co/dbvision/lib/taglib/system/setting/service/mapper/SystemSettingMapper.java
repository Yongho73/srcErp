package kr.co.dbvision.lib.taglib.system.setting.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 시스템 설정 맵퍼 인터페이스
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
@Mapper("SystemSettingMapper")
public interface SystemSettingMapper {

	/**
	 * 설정 조회
	 * @param paramMap
	 * @return
	 */
	public List<EgovMapForNull> selectSetting(EgovMapForNull paramMap);	
}
