package kr.co.dbvision.api.mtx.bsc.mtxbsc001.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.mtx.bsc.mtxbsc001.entity.Mtxbsc001;
import kr.co.dbvision.api.mtx.bsc.mtxbsc001.service.Mtxbsc001Service;
import kr.co.dbvision.api.mtx.bsc.mtxbsc001.service.mapper.Mtxbsc001Mapper;
import kr.co.dbvision.api.ynd.yta.yndyta008.entity.Combo;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 소득세율관리관리에 관한 서비스 구현 클래스
 *
 * @author 디비비전
 * @since 2020.07.03
 * @version 1.0
 * @sourceGen version 2020.06.29.01 (2020.07.03)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.07.03          디비비전              최초 생성
 * </pre>
 */
@Service("Mtxbsc001Service")
@Transactional
public class Mtxbsc001ServiceImpl extends EgovAbstractServiceImpl implements Mtxbsc001Service {

    Logger logger = LogManager.getLogger(Mtxbsc001ServiceImpl.class);

    @Resource(name="Mtxbsc001Mapper")
    private Mtxbsc001Mapper mtxbsc001Mapper;

    public Mtxbsc001ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchMtxbsc001(EgovMapForNull paramMap) {
        try {

            Mtxbsc001 entity = new Mtxbsc001(paramMap);
            List<EgovMapForNull> list = mtxbsc001Mapper.selectMtxbsc001List(paramMap);
            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public List<EgovMapForNull> searchMtxbsc001ForExcel(EgovMapForNull paramMap) {

        return mtxbsc001Mapper.selectMtxbsc001List(paramMap);
    }

    @Override
    public JSONObject findMtxbsc001(EgovMapForNull paramMap) {
        try {

            Mtxbsc001 entity = new Mtxbsc001(mtxbsc001Mapper.selectMtxbsc001(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject saveMtxbsc001(EgovMapForNull paramMap) {

        try {

            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            Mtxbsc001 entity = null;

            for(String ids : idsArr) {

                entity = new Mtxbsc001(paramMap, ids);

                switch(entity.getNativeeditorStatus()) {
               
                case "deleted":

                    mtxbsc001Mapper.deleteMtxbsc001(entity);
                    break;
                
                case "updated":
                    mtxbsc001Mapper.saveMtxbsc001(entity);
                    break;
                    
                case "inserted":
                    mtxbsc001Mapper.saveMtxbsc001(entity);
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
    public JSONObject saveCopyApplcYy(EgovMapForNull paramMap) {
        try {
            
            //기존 데이터가 있으면 삭제후 저장 
            mtxbsc001Mapper.deleteApplcYyYear(paramMap);
            mtxbsc001Mapper.insertCopyApplcYy(paramMap);
            
            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @Override
    public JSONObject searchComboapplcYearList(EgovMapForNull paramMap) throws Exceptions {
        try {
            return new JsonMsgMng().makeJsonObject(mtxbsc001Mapper.searchapplcYearList(paramMap));
        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @Override
    public Combo searchapplcYearList(EgovMapForNull paramMap) throws Exceptions {
        try {

            Combo entity = new Combo(paramMap);

            List<EgovMapForNull> records = mtxbsc001Mapper.searchapplcYearList(paramMap);
            
            entity.setRecords(records);
            
            return entity;

        } catch (Exception e) {
            throw new Exceptions(new Throwable(), e);
        }
    }

}

