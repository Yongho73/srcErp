package kr.co.dbvision.api.mtx.evd.mtxevd003.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;
import kr.co.dbvision.api.mtx.evd.mtxevd003.entity.Mtxevd003;
import kr.co.dbvision.api.mtx.evd.mtxevd003.service.Mtxevd003Service;
import kr.co.dbvision.api.mtx.evd.mtxevd003.service.mapper.Mtxevd003Mapper;
import kr.co.dbvision.api.stm.bsc.stmbsc006.service.Stmbsc006Service;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.EgovPage;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 법인카드 증빙관리에 관한 서비스 구현 클래스
 *
 * @author 디비비전
 * @since 2020.07.06
 * @version 1.0
 * @sourceGen version 2020.06.29.01 (2020.07.06)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.07.06          디비비전              최초 생성
 * </pre>
 */
@Service("Mtxevd003Service")
@Transactional
public class Mtxevd003ServiceImpl extends EgovAbstractServiceImpl implements Mtxevd003Service {

    Logger logger = LogManager.getLogger(Mtxevd003ServiceImpl.class);

    @Resource(name="Mtxevd003Mapper")
    private Mtxevd003Mapper mtxevd003Mapper;
    
    @Resource(name = "Stmbsc006Service")
    public Stmbsc006Service stmbsc006Service;
    
    private PaginationInfo paginationInfo;
    private int listRowNumber = 0;
    
    public Mtxevd003ServiceImpl() {
        paginationInfo = new PaginationInfo();
    }
    
    @Override
    public JSONObject searchMtxevd003(EgovMapForNull paramMap) {
        try {
            int pageNum     = Integer.parseInt(StringExpression.nullConvert(paramMap.get("pageNum")));
            int pageingCnt  = Integer.parseInt(StringExpression.nullConvert(paramMap.get("pageingCnt")));
            
            EgovPage.initPaging(paginationInfo, pageNum, pageingCnt, 5, paramMap);  
            int totalRowCount = mtxevd003Mapper.selectMtxevd003ListCnt(paramMap);
            EgovPage.pagingInfo(paginationInfo, totalRowCount, paramMap);
            
          //listRowNumber = totalRowCount - (pageingCnt*(pageNum-1)); // 역순넘버링
            listRowNumber = (pageingCnt*(pageNum-1)+1); // 넘버링
            
            List<EgovMapForNull> list = mtxevd003Mapper.selectMtxevd003List(paramMap).stream().map(mapper -> {                
                //mapper.replace("rnum", listRowNumber--);                        
                mapper.replace("rnum", listRowNumber++);
                return mapper;
            }).collect(Collectors.toList());
            
            
            Mtxevd003 entity = new Mtxevd003(paramMap);
            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @Override
    public List<EgovMapForNull> searchMtxevd003ForExcel(EgovMapForNull paramMap) {

        return mtxevd003Mapper.selectMtxevd003List(paramMap);
    }

    @Override
    public JSONObject findMtxevd003(EgovMapForNull paramMap) {
        try {

            Mtxevd003 entity = new Mtxevd003(mtxevd003Mapper.selectMtxevd003(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject saveMtxevd003(EgovMapForNull paramMap) {
            
        try {

            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            Mtxevd003 entity = null;

            for(String ids : idsArr) {

                entity = new Mtxevd003(paramMap, ids);
                
                switch(entity.getNativeeditorStatus()) {
                case "deleted":

                    mtxevd003Mapper.deleteMtxevd003(entity);
                    break;
                    
                case "updated":
                    
                    mtxevd003Mapper.saveMtxevd003(entity);
                    break;
                    
                case "inserted":
                    
                    String newNumber = "";
                    
                    if (entity.getCardEvidNo().equals("")) {
                        EgovMapForNull paramMap2 = new EgovMapForNull();
                        paramMap2.put("relTblNm", "MFS_CARD_EVID");
                        paramMap2.put("relItemNm", "CARD_EVID_NO");

                        JSONObject jsonObj = stmbsc006Service.selectCreateNumberStmbsc006(paramMap2);
                        newNumber = jsonObj.get("data").toString();
                        entity.setCardEvidNo(newNumber); 
                    }
                    
                    mtxevd003Mapper.saveMtxevd003(entity);
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

}