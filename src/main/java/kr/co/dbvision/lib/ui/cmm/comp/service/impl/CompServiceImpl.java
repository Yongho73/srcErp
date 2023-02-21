package kr.co.dbvision.lib.ui.cmm.comp.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.EgovPage;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import kr.co.dbvision.lib.ui.cmm.comp.entity.Comp;
import kr.co.dbvision.lib.ui.cmm.comp.service.CompService;
import kr.co.dbvision.lib.ui.cmm.comp.service.mapper.CompMapper;
import net.sf.json.JSONObject;

@Service("CompService")

@Transactional
public class CompServiceImpl extends EgovAbstractServiceImpl implements CompService {

	Logger logger = LogManager.getLogger(CompServiceImpl.class);

	@Resource(name = "CompMapper")
	private CompMapper CompMapper;
	
	private PaginationInfo paginationInfo;
    private int listRowNumber = 0;

	public CompServiceImpl() {
		paginationInfo = new PaginationInfo();
	}

	@Override
	public JSONObject searchMtaComp(EgovMapForNull paramMap) {
		try {
			int pageNum = Integer.parseInt(StringExpression.nullConvert(paramMap.get("pageNum")));
            int pageingCnt = Integer.parseInt(StringExpression.nullConvert(paramMap.get("pageingCnt")));
            
            EgovPage.initPaging(paginationInfo, pageNum, pageingCnt, 5, paramMap); // 5 = 한 화면에 나오는 페이징 번호의 최대수량
            int totalRowCount = CompMapper.selectMtaCompAllCnt(paramMap);
            EgovPage.pagingInfo(paginationInfo, totalRowCount, paramMap);
            
			Comp entity = new Comp(paramMap);

			listRowNumber = (pageingCnt*(pageNum-1)) + 1; // 넘버링
            //listRowNumber = totalRowCount - (pageingCnt*(pageNum-1)); // 역순넘버링
            
            List<EgovMapForNull> list = CompMapper.selectMtaCompList(paramMap).stream().map(mapper -> {                
                mapper.replace("num", listRowNumber++);  //    넘버링                   
                //mapper.replace("num", listRowNumber--);  //    역순넘버링
                return mapper;
            }).collect(Collectors.toList());
            
			entity.setRecords(list);
			return new JsonMsgMng().makeJsonObject(entity);

		} catch (Exception e) {
			return new Exceptions(new Throwable(), e).getResultStatus();
		}
	}

}
