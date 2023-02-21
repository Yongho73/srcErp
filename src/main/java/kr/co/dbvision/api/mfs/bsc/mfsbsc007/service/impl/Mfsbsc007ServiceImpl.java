package kr.co.dbvision.api.mfs.bsc.mfsbsc007.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.mfs.bsc.mfsbsc007.entity.Mfsbsc007;
import kr.co.dbvision.api.mfs.bsc.mfsbsc007.service.Mfsbsc007Service;
import kr.co.dbvision.api.mfs.bsc.mfsbsc007.service.mapper.Mfsbsc007Mapper;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 계정별 관리항목관리에 관한 서비스 구현 클래스
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
@Service("Mfsbsc007Service")
@Transactional
public class Mfsbsc007ServiceImpl extends EgovAbstractServiceImpl implements Mfsbsc007Service {

    Logger logger = LogManager.getLogger(Mfsbsc007ServiceImpl.class);

    @Resource(name="Mfsbsc007Mapper")
    private Mfsbsc007Mapper mfsbsc007Mapper;

    public Mfsbsc007ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchMfsbsc007(EgovMapForNull paramMap) {
        try {

            Mfsbsc007 entity = new Mfsbsc007(paramMap);
            List<EgovMapForNull> list = mfsbsc007Mapper.selectMfsbsc007List(paramMap);
            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public List<EgovMapForNull> searchMfsbsc007ForExcel(EgovMapForNull paramMap) {

        return mfsbsc007Mapper.selectMfsbsc007List(paramMap);
    }

    @Override
    public JSONObject findMfsbsc007(EgovMapForNull paramMap) {
        try {

            Mfsbsc007 entity = new Mfsbsc007(mfsbsc007Mapper.selectMfsbsc007(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject saveMfsbsc007(EgovMapForNull paramMap) {

        try {
            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            Mfsbsc007 entity = null;
            
            for(String ids : idsArr) {
                entity = new Mfsbsc007(paramMap, ids);
               
                switch(entity.getNativeeditorStatus()) {
                case "deleted": 
                    break;
                default:                    
                    mfsbsc007Mapper.saveMfsbsc007(entity);
                    break;
                }               
            }
            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
        
    }

    @Override
    public JSONObject removeMfsbsc007(EgovMapForNull paramMap) {

        try {

            String mgrtItemSns = StringExpression.nullConvert(paramMap.get("mgrtItemSns"));
            String[] mgrtItemSnArr = mgrtItemSns.split("\\,");
            String acntCodes = StringExpression.nullConvert(paramMap.get("acntCodes"));
            String[] acntCodeArr = acntCodes.split("\\,");
            String drcrSeCodes = StringExpression.nullConvert(paramMap.get("drcrSeCodes"));
            String[] drcrSeCodeArr = drcrSeCodes.split("\\,");

            int arrLength = (drcrSeCodeArr == null) ? 0 : drcrSeCodeArr.length;
            EgovMapForNull mapper = null;

            for (int keyColumnIdx = 0; keyColumnIdx < arrLength; keyColumnIdx++) {

                mapper = new EgovMapForNull();
                mapper.put("mgrtItemSn", mgrtItemSnArr[keyColumnIdx]);
                mapper.put("acntCode", acntCodeArr[keyColumnIdx]);
                mapper.put("drcrSeCode", drcrSeCodeArr[keyColumnIdx]);

                mfsbsc007Mapper.deleteMfsbsc007(mapper);
            }

            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            throw e;
        }
    }
}
