package kr.co.dbvision.api.mfs.bsc.mfsbsc006.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;
import kr.co.dbvision.api.mfs.bsc.mfsbsc006.entity.Mfsbsc006;
import kr.co.dbvision.api.mfs.bsc.mfsbsc006.service.Mfsbsc006Service;
import kr.co.dbvision.api.mfs.bsc.mfsbsc006.service.mapper.Mfsbsc006Mapper;
import kr.co.dbvision.api.mhs.hrm.mhshrm001.entity.Mhshrm001;
import kr.co.dbvision.api.mps.bsc.mpsbsc004.entity.Mpsbsc004;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.EgovPage;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 관리항목관리에 관한 서비스 구현 클래스
 *
 * @author 디비비전
 * @since 2020.04.22
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.04.22          디비비전              최초 생성
 * </pre>
 */

@SuppressWarnings("unchecked")
@Service("Mfsbsc006Service")
@Transactional
public class Mfsbsc006ServiceImpl extends EgovAbstractServiceImpl implements Mfsbsc006Service {

    Logger logger = LogManager.getLogger(Mfsbsc006ServiceImpl.class);

    @Resource(name="Mfsbsc006Mapper")
    private Mfsbsc006Mapper mfsbsc006Mapper;

    private PaginationInfo paginationInfo;
    private int listRowNumber = 0;

    public Mfsbsc006ServiceImpl() {
        //
        paginationInfo = new PaginationInfo();
    }


    @Override
    public JSONObject searchAllMfsbsc006(EgovMapForNull paramMap) {

        try {

            Mfsbsc006 entity = new Mfsbsc006(paramMap);
            List<EgovMapForNull> list = mfsbsc006Mapper.selectMfsbsc006List(paramMap);
            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    
    @Override
    public JSONObject searchMfsbsc006(EgovMapForNull paramMap) {
        try {

            int pageNum = Integer.parseInt(StringExpression.nullConvert(paramMap.get("pageNum")));
            int pageingCnt = Integer.parseInt(StringExpression.nullConvert(paramMap.get("pageingCnt")));

            EgovPage.initPaging(paginationInfo, pageNum, pageingCnt, 20, paramMap);
            int totalRowCount = mfsbsc006Mapper.selectMfsbsc006TotalRecordCount(paramMap);
            EgovPage.pagingInfo(paginationInfo, totalRowCount, paramMap);

            listRowNumber = totalRowCount - (pageingCnt*(pageNum-1)); // 역순넘버링

            List<EgovMapForNull> list = mfsbsc006Mapper.selectMfsbsc006ListPaging(paramMap).stream().map(mapper -> {
                mapper.replace("rnum", listRowNumber--);
                return mapper;
            }).collect(Collectors.toList());

            Mfsbsc006 entity = new Mfsbsc006(paramMap);
            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public List<EgovMapForNull> searchMfsbsc006ForExcel(EgovMapForNull paramMap) {

        return mfsbsc006Mapper.selectMfsbsc006List(paramMap);
    }

    @Override
    public JSONObject findMfsbsc006(EgovMapForNull paramMap) {
        try {

            Mfsbsc006 entity = new Mfsbsc006(mfsbsc006Mapper.selectMfsbsc006(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject saveMfsbsc006(EgovMapForNull paramMap) {
        
        try {
            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            Mfsbsc006 entity = null;
            
            for(String ids : idsArr) {
                entity = new Mfsbsc006(paramMap, ids);
               
                switch(entity.getNativeeditorStatus()) {
                case "deleted": 
                    break;
                default:                    
                    mfsbsc006Mapper.saveMfsbsc006(entity);
                    break;
                }               
            }
            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }        
        
    }

    @Override
    public JSONObject removeMfsbsc006(EgovMapForNull paramMap) {

        try {

            String mgrtItemSns = StringExpression.nullConvert(paramMap.get("mgrtItemSns"));
            String[] mgrtItemSnArr = mgrtItemSns.split("\\,");

            int arrLength = (mgrtItemSnArr == null) ? 0 : mgrtItemSnArr.length;
            EgovMapForNull mapper = null;

            for (int keyColumnIdx = 0; keyColumnIdx < arrLength; keyColumnIdx++) {

                mapper = new EgovMapForNull();
                mapper.put("mgrtItemSn", mgrtItemSnArr[keyColumnIdx]);

                mfsbsc006Mapper.deleteMfsbsc006(mapper);
            }

            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            throw e;
        }
    }
}
