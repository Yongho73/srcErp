package kr.co.dbvision.api.mfs.bsc.mfsbsc002.service.impl;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;
import kr.co.dbvision.api.mfs.bsc.mfsbsc002.entity.Mfsbsc002;
import kr.co.dbvision.api.mfs.bsc.mfsbsc002.service.Mfsbsc002Service;
import kr.co.dbvision.api.mfs.bsc.mfsbsc002.service.mapper.Mfsbsc002Mapper;
import kr.co.dbvision.api.mhs.hrm.mhshrm006.entity.Mhshrm006;
import kr.co.dbvision.api.stm.bsc.stmbsc006.service.Stmbsc006Service;
import kr.co.dbvision.api.stm.bsc.stmbsc006.service.mapper.Stmbsc006Mapper;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.EgovPage;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.SessionMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 거래처관리관리에 관한 서비스 구현 클래스
 *
 * @author 디비비전
 * @since 2020.03.10
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.03.10          디비비전              최초 생성
 * </pre>
 */
@Service("Mfsbsc002Service")
@Transactional
public class Mfsbsc002ServiceImpl extends EgovAbstractServiceImpl implements Mfsbsc002Service {

    Logger logger = LogManager.getLogger(Mfsbsc002ServiceImpl.class);

    @Resource(name="Stmbsc006Service")
    public Stmbsc006Service stmbsc006Service;    
    
    @Resource(name="Mfsbsc002Mapper")
    private Mfsbsc002Mapper mfsbsc002Mapper;

    @Resource(name="Stmbsc006Mapper")
    private Stmbsc006Mapper stmbsc006Mapper;
    
    private PaginationInfo paginationInfo;
    private int listRowNumber = 0;
    
    public Mfsbsc002ServiceImpl() {
    	 paginationInfo = new PaginationInfo();
    }

    @Override
    public JSONObject searchMfsbsc002(EgovMapForNull paramMap) {
        try {
            int pageNum 	= Integer.parseInt(StringExpression.nullConvert(paramMap.get("pageNum")));
            int pageingCnt 	= Integer.parseInt(StringExpression.nullConvert(paramMap.get("pageingCnt")));
            
            EgovPage.initPaging(paginationInfo, pageNum, pageingCnt, 5, paramMap);  
            int totalRowCount = mfsbsc002Mapper.selectMfsbsc002ListCnt(paramMap);
            EgovPage.pagingInfo(paginationInfo, totalRowCount, paramMap);
            
            //listRowNumber = totalRowCount - (pageingCnt*(pageNum-1)); // 역순넘버링
            listRowNumber = (pageingCnt*(pageNum-1)+1); // 넘버링
            
            List<EgovMapForNull> list = mfsbsc002Mapper.selectMfsbsc002List(paramMap).stream().map(mapper -> {                
                //mapper.replace("rnum", listRowNumber--);                        
                mapper.replace("rnum", listRowNumber++);
                return mapper;
            }).collect(Collectors.toList());
            
            Mfsbsc002 entity = new Mfsbsc002(paramMap);
            entity.setRecords(list);            
            return new JsonMsgMng().makeJsonObject(entity);
            
        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @Override
    public List<EgovMapForNull> searchMfsbsc002ForExcel(EgovMapForNull paramMap) {

        return mfsbsc002Mapper.selectExcelMfsbsc002(paramMap);
    }

    @Override
    public JSONObject findMfsbsc002(EgovMapForNull paramMap) {
        try {

            Mfsbsc002 entity = new Mfsbsc002(mfsbsc002Mapper.selectMfsbsc002(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @Override
    public JSONObject saveMfsbsc002(EgovMapForNull paramMap) {

        try {
            Map<String, Object> sessionMap = (Map<String, Object>) SessionMng.getCommonSession();
            String userId = "";
            if (sessionMap == null) {
                return null;
            } else {
                userId = StringExpression.nullConvert(sessionMap.get("userId"));
    
                if (StringExpression.isEmpty(userId)) {
                    return null;
                } else {
                    paramMap.put("regId", userId);
                }
            }
            
            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            Mfsbsc002 entity = null;
            
            for(String ids : idsArr) {
            
                //System.out.println("** ids : " + ids);
                
                entity = new Mfsbsc002(paramMap, ids);
                entity.setRegId(userId);
                entity.setUptId(userId);
                
                switch(entity.getNativeeditorStatus()) {
                case "deleted":
                    mfsbsc002Mapper.deleteMfsbsc002(entity);
                    break;
                case "updated":
                    //System.out.println("** getBcncNm : " + entity.getBcncNm());
                    mfsbsc002Mapper.saveMfsbsc002(entity);
                    break;
                case "inserted":
                    //신규번호 채번 
                    String newBcncCode ="";
                    
                    //StringExpression.nullConvert(paramMap.get("bcncCode"))
                    //System.out.println(entity.toString());
                    if (entity.getBcncCode().equals("")) {
                        //테이블 명 , 컬럼명 
                        EgovMapForNull paramMap2 = new EgovMapForNull();
                        paramMap2.put("relTblNm",  "STM_CUSTOMER");
                        paramMap2.put("relItemNm", "BCNC_CODE");

                        JSONObject  jsonObj = stmbsc006Service.selectCreateNumberStmbsc006(paramMap2); 
                        newBcncCode = jsonObj.get("data").toString();
                        entity.setBcncCode(newBcncCode);
                    }
                    
                    mfsbsc002Mapper.saveMfsbsc002(entity);
                    break;
                default: 
                    break;
                }
            }
            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @Override
    public JSONObject removeMfsbsc002(EgovMapForNull paramMap) {

        try {
            //mfsbsc002Mapper.deleteMfsbsc002(paramMap);
            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
}
