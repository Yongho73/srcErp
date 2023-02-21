package kr.co.dbvision.lib.ui.sample.page.service.impl;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import egovframework.rte.fdl.cryptography.EgovCryptoService;
import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;
import kr.co.dbvision.api.mhs.hrb.mhshrb001.entity.Mhshrb001;
import kr.co.dbvision.api.mhs.hrb.mhshrb001.service.mapper.Mhshrb001Mapper;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.EgovPage;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.StringSecurity;
import kr.co.dbvision.lib.exception.Exceptions;
import kr.co.dbvision.lib.ui.sample.page.entity.Page;
import kr.co.dbvision.lib.ui.sample.page.service.PageService;
import kr.co.dbvision.lib.ui.sample.page.service.mapper.PageMapper;
import net.sf.json.JSONObject;
 
/**
 * 사용자에 관한 구현 클래스
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
@Service("PageService")
@Transactional
public class PageServiceImpl extends EgovAbstractServiceImpl implements PageService {

	Logger logger = LogManager.getLogger(PageServiceImpl.class);
	
	@Resource(name = "PageMapper")
	private PageMapper pageMapper;
	
	@Resource(name = "Mhshrb001Mapper")
	private Mhshrb001Mapper mhshrb001Mapper;
	
	private PaginationInfo paginationInfo;
    private int listRowNumber = 0;
		
    public PageServiceImpl() {
    	paginationInfo = new PaginationInfo();
    }

	@Override
	public EgovMapForNull getEncodeString(EgovCryptoService cryptoService, Map<String, String> paramMap) throws Exceptions {

		// desc
		EgovMapForNull res = new EgovMapForNull();
		
		try {
			
			String crptStr = StringExpression.nullConvert(paramMap.get("crptStr"));
			String salt = StringSecurity.getSalt();
			String encodeStrDesede = StringSecurity.encrypt(crptStr);
			String encodeStrAria = StringSecurity.encryptDataAria(cryptoService, crptStr);
			String encodeStrSHA256 =  StringSecurity.get_SHA_256_SecurePassword(crptStr, salt); 
			String encodeStrSHA512 =  StringSecurity.get_SHA_512_SecurePassword(crptStr, salt); 
			
			res.put("encodeStrDesede", encodeStrDesede);
			res.put("encodeStrAria", encodeStrAria);	
			res.put("salt", salt);
			res.put("encodeStrSHA256", encodeStrSHA256);
			res.put("encodeStrSHA512", encodeStrSHA512);
			res.put("decodeStrDesede", StringSecurity.decrypt(encodeStrDesede));
			res.put("decodeStrAria", StringSecurity.decryptDataAria(cryptoService, encodeStrAria));				 
			
			return res;
			
		} catch (Exception e) {
			throw new Exceptions(new Throwable(), e);
		}
	}
	
	//rowspan sample 용
	@Override
	public JSONObject searchMhsEmp_rowspanSample(EgovMapForNull paramMap) {
		try {
			
			int pageNum = 1;
            int pageingCnt = 999999;
            
            EgovPage.initPaging(paginationInfo, pageNum, pageingCnt, 5, paramMap); // 5 = 한 화면에 나오는 페이징 번호의 최대수량
            int totalRowCount = mhshrb001Mapper.selectMhsEmpListAllCnt(paramMap);
            EgovPage.pagingInfo(paginationInfo, totalRowCount, paramMap);
            
			Mhshrb001 entity = new Mhshrb001(paramMap);
			List<EgovMapForNull> list = mhshrb001Mapper.selectMhsEmpList(paramMap);
			List<EgovMapForNull> returnList =  new ArrayList<EgovMapForNull>();
			EgovMapForNull mapper_save  = new EgovMapForNull();
			
			//rowspan 계산을 위해 List를 뒤집어서 점검한다 
			Collections.reverse(list);
			//rowspan 계산을 위해 List를 뒤집어서 점검한다
			String deptNmChk_Bf = "";
			String deptNmChk_Af = "";
			int nNum = 0;
			int rowSpan = 1;
			int nCnt = list.size();

			for(EgovMapForNull mapper : list) {
				//System.out.println(StringExpression.nullConvert(mapper.get("deptCodeNm")));
				if(nNum == 0) {
					deptNmChk_Bf = StringExpression.nullConvert(mapper.get("deptCodeNm"));
					mapper_save = mapper;
				}
				else {
					deptNmChk_Af = StringExpression.nullConvert(mapper.get("deptCodeNm"));
					if(deptNmChk_Bf.equals(deptNmChk_Af)) {
						rowSpan++;
						returnList.add(mapper_save);  //이전  EgovMapForNull 투입
						mapper_save = mapper;
					}
					else if(rowSpan > 1) {
						deptNmChk_Bf = deptNmChk_Af;
						EgovMapForNull map = new EgovMapForNull();
						map.put("value", mapper_save.get("deptCodeNm"));
						map.put("rowspan", rowSpan);
						mapper_save.replace("deptCodeNm", map);
						
						rowSpan = 1;
						returnList.add(mapper_save);  //이전  EgovMapForNull 투입
						mapper_save = mapper;
					}
					else {
						deptNmChk_Bf = deptNmChk_Af;
						returnList.add(mapper_save);  //이전  EgovMapForNull 투입
						mapper_save = mapper;
					}
				}
				nNum++;
				
				if(nCnt == nNum) {
					//마지막 mapper_save 를 List에 넣는다.
					if(rowSpan > 1) {
						EgovMapForNull map = new EgovMapForNull();
						map.put("value", mapper.get("deptCodeNm"));
						map.put("rowspan", rowSpan);
						mapper.replace("deptCodeNm", map);
					}
					returnList.add(mapper);
				}
            }
			
			/*뒤집어진 List를 원복한다*/
			Collections.reverse(returnList);

			entity.setRecords(returnList);
			return new JsonMsgMng().makeJsonObject(entity);
		} catch (Exception e) {
			return new Exceptions(new Throwable(), e).getResultStatus();
		}
	}
	
	//colspan sample 용
	@Override
	public JSONObject searc_colSpanSample(EgovMapForNull paramMap) {
		try {
			Page entity = new Page(paramMap);
			List<EgovMapForNull> list = pageMapper.selectColSpanList(paramMap);
			
			List<EgovMapForNull> returnList = list.stream().map(mapper->{
					String nm1 = StringExpression.nullConvert(mapper.get("nm1"));
					if(nm1.equals("SUBSUM")) {
						EgovMapForNull map = new EgovMapForNull();
						map.put("value", mapper.get("nm1"));
						map.put("colspan", 2);
						mapper.replace("nm1", map);
					}
					return mapper;
				}).collect(Collectors.toList());
			
			entity.setRecords(returnList);
			return new JsonMsgMng().makeJsonObject(entity);
		} catch (Exception e) {
			return new Exceptions(new Throwable(), e).getResultStatus();
		}
	}
	
	//달력 sample 용
	@Override
	public JSONObject search_dateSample(EgovMapForNull paramMap) {
		try {
			Page entity = new Page(paramMap);
			List<EgovMapForNull> list = pageMapper.selectDateList(paramMap);
			
			entity.setRecords(list);
			return new JsonMsgMng().makeJsonObject(entity);
		} catch (Exception e) {
			return new Exceptions(new Throwable(), e).getResultStatus();
		}
	}
}
