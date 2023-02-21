package kr.co.dbvision.api.stm.sys.stmsys001.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.stm.sys.stmsys001.entity.Stmsys001;
import kr.co.dbvision.api.stm.sys.stmsys001.service.Stmsys001Service;
import kr.co.dbvision.api.stm.sys.stmsys001.service.mapper.Stmsys001Mapper;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 시스템환경관리관리에 관한 서비스 구현 클래스
 *
 * @author 디비비전
 * @since 2020.03.16
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.03.16          디비비전              최초 생성
 * </pre>
 */
@Service("Stmsys001Service")
@Transactional
public class Stmsys001ServiceImpl extends EgovAbstractServiceImpl implements Stmsys001Service {

    Logger logger = LogManager.getLogger(Stmsys001ServiceImpl.class);

    @Resource(name="Stmsys001Mapper")
    private Stmsys001Mapper stmsys001Mapper;

    private int listRowNumber = 0; // 넘버링 

    public Stmsys001ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchStmsys001(EgovMapForNull paramMap) {
        try {

            Stmsys001 entity = new Stmsys001(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = stmsys001Mapper.selectStmsys001List(paramMap).stream().map(mapper -> {
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
    public JSONObject findStmsys001(EgovMapForNull paramMap) {
        try {

            Stmsys001 entity = new Stmsys001(stmsys001Mapper.selectStmsys001(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject saveStmsys001(EgovMapForNull paramMap) {
        try {
            stmsys001Mapper.saveStmsys001(paramMap);
            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject removeStmsys001(EgovMapForNull paramMap) {

        try {

            String bplcCodes = StringExpression.nullConvert(paramMap.get("bplcCodes"));
            String[] bplcCodeArr = bplcCodes.split("\\,");

            int arrLength = (bplcCodeArr == null) ? 0 : bplcCodeArr.length;
            EgovMapForNull mapper = null;

            for (int keyColumnIdx = 0; keyColumnIdx < arrLength; keyColumnIdx++) {

                mapper = new EgovMapForNull();
                mapper.put("bplcCode", bplcCodeArr[keyColumnIdx]);

                stmsys001Mapper.deleteStmsys001(mapper);
            }

            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @Override
    public JSONObject findEtsStmsys001(EgovMapForNull paramMap) {
        try {
             
            return new JsonMsgMng().makeJsonObject(stmsys001Mapper.selectEtsStmsys001(paramMap));

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @Override
    public JSONObject saveEtsStmsys001(EgovMapForNull paramMap) {
        try {

            stmsys001Mapper.saveEtsStmsys001(paramMap);
            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    
    @Override
    public JSONObject searchCheck(EgovMapForNull paramMap) {
        try {
            return new JsonMsgMng().makeJsonObject(stmsys001Mapper.searchCheck(paramMap));
        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
}
