package kr.co.dbvision.api.mtx.bsc.mtxbsc002.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;
import kr.co.dbvision.api.mtx.bsc.mtxbsc002.entity.Mtxbsc002;
import kr.co.dbvision.api.mtx.bsc.mtxbsc002.service.Mtxbsc002Service;
import kr.co.dbvision.api.mtx.bsc.mtxbsc002.service.mapper.Mtxbsc002Mapper;
import kr.co.dbvision.api.stm.bsc.stmbsc006.service.Stmbsc006Service;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.EgovPage;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 소득자관리관리에 관한 서비스 구현 클래스
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
@Service("Mtxbsc002Service")
@Transactional
public class Mtxbsc002ServiceImpl extends EgovAbstractServiceImpl implements Mtxbsc002Service {

    Logger logger = LogManager.getLogger(Mtxbsc002ServiceImpl.class);

    @Resource(name = "Mtxbsc002Mapper")
    private Mtxbsc002Mapper mtxbsc002Mapper;

    @Resource(name = "Stmbsc006Service")
    public Stmbsc006Service stmbsc006Service;

    private PaginationInfo paginationInfo;
    private int listRowNumber = 0;

    public Mtxbsc002ServiceImpl() {
        //
        paginationInfo = new PaginationInfo();
    }

    @Override
    public JSONObject searchMtxbsc002(EgovMapForNull paramMap) {
        try {
            int pageNum = Integer.parseInt(StringExpression.nullConvert(paramMap.get("pageNum")));
            int pageingCnt = Integer.parseInt(StringExpression.nullConvert(paramMap.get("pageingCnt")));

            EgovPage.initPaging(paginationInfo, pageNum, pageingCnt, 20, paramMap);
            int totalRowCount = mtxbsc002Mapper.selectMtxbsc002TotalRecordCount(paramMap);
            EgovPage.pagingInfo(paginationInfo, totalRowCount, paramMap);

            listRowNumber = totalRowCount - (pageingCnt * (pageNum - 1)); // 역순넘버링

            List<EgovMapForNull> list = mtxbsc002Mapper.selectMtxbsc002ListPaging(paramMap).stream().map(mapper -> {
                mapper.replace("rnum", listRowNumber--);
                return mapper;
            }).collect(Collectors.toList());

            Mtxbsc002 entity = new Mtxbsc002(paramMap);
            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public List<EgovMapForNull> searchMtxbsc002ForExcel(EgovMapForNull paramMap) {

        return mtxbsc002Mapper.selectMtxbsc002List(paramMap);
    }

    @Override
    public JSONObject findMtxbsc002(EgovMapForNull paramMap) {
        try {

            Mtxbsc002 entity = new Mtxbsc002(mtxbsc002Mapper.selectMtxbsc002(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject saveMtxbsc002(EgovMapForNull paramMap) {

        try {

            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            Mtxbsc002 entity = null;

            for(String ids : idsArr) {

                entity = new Mtxbsc002(paramMap, ids);

                switch(entity.getNativeeditorStatus()) {
                case "deleted":

                    mtxbsc002Mapper.deleteMtxbsc002(entity);
                    break;
                
                case "updated":
                    mtxbsc002Mapper.saveMtxbsc002(entity);
                    break;
                    
                case "inserted":
                    
                    String newNumber = "";
                    
                    if (entity.getEarnerNo().equals("")) {
                        EgovMapForNull paramMap2 = new EgovMapForNull();
                        paramMap2.put("relTblNm", "MFS_INCOME_EARNER");
                        paramMap2.put("relItemNm", "EARNER_NO");

                        JSONObject jsonObj = stmbsc006Service.selectCreateNumberStmbsc006(paramMap2);
                        newNumber = jsonObj.get("data").toString();
                        entity.setEarnerNo(newNumber); 
                    }
                    
                    System.out.println("impl :: " + entity);
                    
                    mtxbsc002Mapper.saveMtxbsc002(entity);
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
