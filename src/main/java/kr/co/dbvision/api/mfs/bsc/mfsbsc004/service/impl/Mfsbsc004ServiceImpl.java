package kr.co.dbvision.api.mfs.bsc.mfsbsc004.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;
import kr.co.dbvision.api.mfs.bsc.mfsbsc004.entity.Mfsbsc004;
import kr.co.dbvision.api.mfs.bsc.mfsbsc004.service.Mfsbsc004Service;
import kr.co.dbvision.api.mfs.bsc.mfsbsc004.service.mapper.Mfsbsc004Mapper;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import net.sf.json.JSONObject;

/**
 * 법인카드관리관리에 관한 서비스 구현 클래스
 *
 * @author 디비비전
 * @since 2020.04.23
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.04.23          디비비전              최초 생성
 * </pre>
 */

@SuppressWarnings("unchecked")
@Service("Mfsbsc004Service")
@Transactional
public class Mfsbsc004ServiceImpl extends EgovAbstractServiceImpl implements Mfsbsc004Service {

    Logger logger = LogManager.getLogger(Mfsbsc004ServiceImpl.class);

    @Resource(name="Mfsbsc004Mapper")
    private Mfsbsc004Mapper mfsbsc004Mapper;

    private PaginationInfo paginationInfo;
    private int listRowNumber = 0;

    public Mfsbsc004ServiceImpl() {
        //
        paginationInfo = new PaginationInfo();
    }
    
    @Override
    public JSONObject searchMfsbsc004(EgovMapForNull paramMap) {
        try {

            Mfsbsc004 entity = new Mfsbsc004(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = mfsbsc004Mapper.selectMfsbsc004List(paramMap).stream().map(mapper -> {
                    mapper.put("num", listRowNumber++);
                    return mapper;
            }).collect(Collectors.toList());

            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public List<EgovMapForNull> searchMfsbsc004ForExcel(EgovMapForNull paramMap) {

        return mfsbsc004Mapper.selectMfsbsc004List(paramMap);
    }

    @Override
    public JSONObject findMfsbsc004(EgovMapForNull paramMap) {
        try {

            Mfsbsc004 entity = new Mfsbsc004(mfsbsc004Mapper.selectMfsbsc004(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject saveMfsbsc004(EgovMapForNull paramMap) {

        try {

            mfsbsc004Mapper.saveMfsbsc004(paramMap);
            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject removeMfsbsc004(EgovMapForNull paramMap) {

        try {

            String cardNos = StringExpression.nullConvert(paramMap.get("cardNos"));
            String[] cardNoArr = cardNos.split("\\,");

            int arrLength = (cardNoArr == null) ? 0 : cardNoArr.length;
            EgovMapForNull mapper = null;

            for (int keyColumnIdx = 0; keyColumnIdx < arrLength; keyColumnIdx++) {

                mapper = new EgovMapForNull();
                mapper.put("cardNo", cardNoArr[keyColumnIdx]);

                mfsbsc004Mapper.deleteMfsbsc004(mapper);
            }

            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            throw e;
        }
    }
}
