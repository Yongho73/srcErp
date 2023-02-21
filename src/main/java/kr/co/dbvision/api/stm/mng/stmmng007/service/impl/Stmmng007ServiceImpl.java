package kr.co.dbvision.api.stm.mng.stmmng007.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;
import kr.co.dbvision.api.stm.mng.stmmng007.entity.Stmmng007;
import kr.co.dbvision.api.stm.mng.stmmng007.service.Stmmng007Service;
import kr.co.dbvision.api.stm.mng.stmmng007.service.mapper.Stmmng007Mapper;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.EgovPage;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 프로그램ID  관리에 관한 구현 클래스
 *
 * @author 표준프레임워크센터
 * @since 2020.02.22
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.02.22          디비비전              최초 생성
 *
 * </pre>
 */

@SuppressWarnings("unchecked")
@Service("Stmmng007Service")
@Transactional
public class Stmmng007ServiceImpl extends EgovAbstractServiceImpl implements Stmmng007Service {

    Logger logger = LogManager.getLogger(Stmmng007ServiceImpl.class);

    @Resource(name="Stmmng007Mapper")
    private Stmmng007Mapper stmmng007Mapper;
    
    private PaginationInfo paginationInfo;
    private int listRowNumber = 0;

    public Stmmng007ServiceImpl() {
        //
        paginationInfo = new PaginationInfo();
    }

    @Override
    public JSONObject searchStmProgrm(EgovMapForNull paramMap) {
        try {
            
            int pageNum = Integer.parseInt(StringExpression.nullConvert(paramMap.get("pageNum")));
            int pageingCnt = Integer.parseInt(StringExpression.nullConvert(paramMap.get("pageingCnt")));
            
            EgovPage.initPaging(paginationInfo, pageNum, pageingCnt, 20, paramMap);                       
            int totalRowCount = stmmng007Mapper.selectStmProgrmListAllCnt(paramMap);
            EgovPage.pagingInfo(paginationInfo, totalRowCount, paramMap);
            
            listRowNumber = totalRowCount - (pageingCnt*(pageNum-1)); // 역순넘버링
                        
            List<EgovMapForNull> list = stmmng007Mapper.selectStmProgrmListPaging(paramMap).stream().map(mapper -> {                
                mapper.replace("rnum", listRowNumber--);                        
                return mapper;
            }).collect(Collectors.toList());
            
            Stmmng007 entity = new Stmmng007(paramMap);
            entity.setRecords(list);            
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @Override
    public List<EgovMapForNull> searchStmProgrmForExcel(EgovMapForNull paramMap) {

        return stmmng007Mapper.selectStmProgrmList(paramMap);
    }

    @Override
    public JSONObject findStmProgrm(EgovMapForNull paramMap) {
        try {

            Stmmng007 entity = new Stmmng007(stmmng007Mapper.selectStmProgrm(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @Override
    public JSONObject saveStmProgrm(EgovMapForNull paramMap) {

        try {
 
            stmmng007Mapper.saveStmProgrm(paramMap);   
    
            int page = stmmng007Mapper.selectStmProgrmListAllInPage(paramMap);
            paramMap.put("page", page);

            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @Override
    public JSONObject removeStmProgrm(EgovMapForNull paramMap) {

        try {

            String progrmIds = StringExpression.nullConvert(paramMap.get("progrmIds"));
            String[] progrmIdArr = progrmIds.split("\\,");

            int arrLength = (progrmIdArr == null) ? 0 : progrmIdArr.length;
            EgovMapForNull mapper = null;

            for (int keyColumnIdx = 0; keyColumnIdx < arrLength; keyColumnIdx++) {

                mapper = new EgovMapForNull();
                mapper.put("progrmId", progrmIdArr[keyColumnIdx]);

                stmmng007Mapper.deleteStmProgrm(mapper);
            }

            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @Override
    public JSONObject saveStmProgrmNew(EgovMapForNull paramMap) throws Exceptions {

        try {

            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            Stmmng007 entity = null;

            for(String ids : idsArr) {

                entity = new Stmmng007(paramMap, ids);

                switch(entity.getNativeeditorStatus()) {
                case "deleted":

                    EgovMapForNull entityChk = stmmng007Mapper.selectProgrmIdUseChk(entity);
                    //System.out.println(entityChk);
                    //System.out.println((String)entityChk.get("cnt"));
                    //System.out.println((String)entityChk.get("tbl"));
                    if(Integer.parseInt((String)entityChk.get("cnt")) > 0) {

                        EgovMapForNull mapper = new EgovMapForNull();
                        mapper.put("code", "999");
                        mapper.put("message", entity.getProgrmId() + " 프로그램이 [" + entityChk.get("tbl") + "]에서 사용되어 삭제불가 합니다.");
                        
                        return new JsonMsgMng().makeJsonObject(mapper);
                    }
                    
                    stmmng007Mapper.deleteStmProgrmNew(entity);
                    break;

                default:

                    stmmng007Mapper.saveStmProgrmNew(entity);
                    break;
                }
            }
            //if(false) { throw new Exceptions("Error."); } 

            EgovMapForNull returnMap = new EgovMapForNull();
            returnMap.put("code", "000");
            returnMap.put("message", "SUCCESS");

            return new JsonMsgMng().makeJsonObject(returnMap);

        } catch (Exception e) {
            throw e;
        }
    }
}
