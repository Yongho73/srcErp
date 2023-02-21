package kr.co.dbvision.lib.ui.cmm.comp.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.lib.EgovMapForNull;

@Mapper("CompMapper")
public interface CompMapper {

	public int selectMtaCompAllCnt(EgovMapForNull paramMap);
	public List<EgovMapForNull> selectMtaCompList(EgovMapForNull paramMap);

}
