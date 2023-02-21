package kr.co.dbvision.api.mtx.evd.mtxevd001.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;
import kr.co.dbvision.api.mtx.evd.mtxevd001.entity.Mtxevd001;
import kr.co.dbvision.api.mtx.evd.mtxevd001.service.Mtxevd001Service;
import kr.co.dbvision.api.mtx.evd.mtxevd001.service.mapper.Mtxevd001Mapper;
import kr.co.dbvision.api.stm.bsc.stmbsc006.service.Stmbsc006Service;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.EgovPage;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 세금계산서(매입/매출)관리에 관한 서비스 구현 클래스
 *
 * @author 디비비전
 * @since 2020.06.11
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.06.11          디비비전              최초 생성
 * </pre>
 */
@Service("Mtxevd001Service")
@Transactional
public class Mtxevd001ServiceImpl extends EgovAbstractServiceImpl implements Mtxevd001Service {

    Logger logger = LogManager.getLogger(Mtxevd001ServiceImpl.class);

    @Resource(name="Mtxevd001Mapper")
    private Mtxevd001Mapper mtxevd001Mapper;
    
    @Resource(name = "Stmbsc006Service")
    public Stmbsc006Service stmbsc006Service;

    private PaginationInfo paginationInfo;
    private int listRowNumber = 0;
    
    public Mtxevd001ServiceImpl() {
        paginationInfo = new PaginationInfo();
    }

    @Override
    public JSONObject searchMtxevd001(EgovMapForNull paramMap) {
        try {
            int pageNum     = Integer.parseInt(StringExpression.nullConvert(paramMap.get("pageNum")));
            int pageingCnt  = Integer.parseInt(StringExpression.nullConvert(paramMap.get("pageingCnt")));
            
            EgovPage.initPaging(paginationInfo, pageNum, pageingCnt, 5, paramMap);  
            int totalRowCount = mtxevd001Mapper.selectMtxevd001ListCnt(paramMap);
            EgovPage.pagingInfo(paginationInfo, totalRowCount, paramMap);
            
          //listRowNumber = totalRowCount - (pageingCnt*(pageNum-1)); // 역순넘버링
            listRowNumber = (pageingCnt*(pageNum-1)+1); // 넘버링
            
            List<EgovMapForNull> list = mtxevd001Mapper.selectMtxevd001List(paramMap).stream().map(mapper -> {                
                //mapper.replace("rnum", listRowNumber--);                        
                mapper.replace("rnum", listRowNumber++);
                return mapper;
            }).collect(Collectors.toList());
            
            Mtxevd001 entity = new Mtxevd001(paramMap);
            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @Override
    public List<EgovMapForNull> searchMtxevd001ForExcel(EgovMapForNull paramMap) {

        return mtxevd001Mapper.selectMtxevd001List(paramMap);
    }

    @Override
    public JSONObject findMtxevd001(EgovMapForNull paramMap) {
        try {

            Mtxevd001 entity = new Mtxevd001(mtxevd001Mapper.selectMtxevd001(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject saveMtxevd001(EgovMapForNull paramMap) {

        try {

            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            Mtxevd001 entity = null;

            for(String ids : idsArr) {

                entity = new Mtxevd001(paramMap, ids);

                switch(entity.getNativeeditorStatus()) {
                case "deleted":

                    mtxevd001Mapper.deleteMtxevd001(entity);
                    break;
                case "updated":
                    mtxevd001Mapper.saveMtxevd001(entity);
                    break;
                case "inserted":
                    String newNumber = "";
                    
                    if (entity.getTaxbillNo().equals("")) {
                        EgovMapForNull paramMap2 = new EgovMapForNull();
                        paramMap2.put("relTblNm", "MFS_TAX_COMM");
                        paramMap2.put("relItemNm", "TAXBILL_NO");

                        JSONObject jsonObj = stmbsc006Service.selectCreateNumberStmbsc006(paramMap2);
                        newNumber = jsonObj.get("data").toString();
                        entity.setTaxbillNo(newNumber); 
                    }
                    mtxevd001Mapper.saveMtxevd001(entity);
                    
                    //디테일 저장 
                    
                    
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
    public JSONObject findMtxevdDetail001(EgovMapForNull paramMap) {
        try {

            Mtxevd001 entity = new Mtxevd001(mtxevd001Mapper.selectMtxevdDetail001(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject searchMtxevdDetail001(EgovMapForNull paramMap) {
        try {

            Mtxevd001 entity = new Mtxevd001(paramMap);
            List<EgovMapForNull> list = mtxevd001Mapper.selectMtxevdDetail001List(paramMap);
            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject saveMtxevdDetail001(EgovMapForNull paramMap) {
        try {
            
            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            Mtxevd001 entity = null;

            for(String ids : idsArr) {

                entity = new Mtxevd001(paramMap, ids);

                switch(entity.getNativeeditorStatus()) {
                case "deleted":

                    mtxevd001Mapper.deleteMtxevdDetail001(entity);
                    break;
                    
                case "updated":
                    mtxevd001Mapper.saveMtxevdDetail001(entity);
                case "inserted":
                    mtxevd001Mapper.saveMtxevdDetail001(entity);
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
