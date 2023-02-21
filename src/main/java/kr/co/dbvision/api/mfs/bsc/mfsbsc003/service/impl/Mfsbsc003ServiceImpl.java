package kr.co.dbvision.api.mfs.bsc.mfsbsc003.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.mfs.bsc.mfsbsc003.entity.Mfsbsc003;
import kr.co.dbvision.api.mfs.bsc.mfsbsc003.service.Mfsbsc003Service;
import kr.co.dbvision.api.mfs.bsc.mfsbsc003.service.mapper.Mfsbsc003Mapper;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import net.sf.json.JSONObject;

/**
 * 금융계좌관리관리에 관한 서비스 구현 클래스
 *
 * @author 디비비전
 * @since 2020.04.24
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.04.24          디비비전              최초 생성
 * </pre>
 */
@Service("Mfsbsc003Service")
@Transactional
public class Mfsbsc003ServiceImpl extends EgovAbstractServiceImpl implements Mfsbsc003Service {

    Logger logger = LogManager.getLogger(Mfsbsc003ServiceImpl.class);

    @Resource(name="Mfsbsc003Mapper")
    private Mfsbsc003Mapper mfsbsc003Mapper;
    
    private int listRowNumber = 0; // 넘버링 

    public Mfsbsc003ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchMfsbsc003(EgovMapForNull paramMap) {
        try {

            Mfsbsc003 entity = new Mfsbsc003(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = mfsbsc003Mapper.selectMfsbsc003List(paramMap).stream().map(mapper -> {
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
    public List<EgovMapForNull> searchMfsbsc003ForExcel(EgovMapForNull paramMap) {

        return mfsbsc003Mapper.selectMfsbsc003List(paramMap);
    }

    @Override
    public JSONObject findMfsbsc003(EgovMapForNull paramMap) {
        try {

            Mfsbsc003 entity = new Mfsbsc003(mfsbsc003Mapper.selectMfsbsc003(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject saveMfsbsc003(EgovMapForNull paramMap) {

        try {

            logger.debug("logger:::"+paramMap);
            //주거래여부가 체크되어 넘어올 경우  기존것을 모두 0으로 만든다 
            if (paramMap.get("bassBnkbAt").equals("1")) {
                mfsbsc003Mapper.updateBassBnkbAtMfsbsc003 (paramMap);
            }
            mfsbsc003Mapper.saveMfsbsc003(paramMap);
            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject removeMfsbsc003(EgovMapForNull paramMap) {

        try {

            String acnutNos = StringExpression.nullConvert(paramMap.get("acnutNos"));
            String[] acnutNoArr = acnutNos.split("\\,");

            int arrLength = (acnutNoArr == null) ? 0 : acnutNoArr.length;
            EgovMapForNull mapper = null;

            for (int keyColumnIdx = 0; keyColumnIdx < arrLength; keyColumnIdx++) {

                mapper = new EgovMapForNull();
                mapper.put("acnutNo", acnutNoArr[keyColumnIdx]);

                mfsbsc003Mapper.deleteMfsbsc003(mapper);
            }

            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            throw e;
        }
    }
}
