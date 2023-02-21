package kr.co.dbvision.api.stm.mng.stmmng011.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.stm.mng.stmmng011.entity.Stmmng011;
import kr.co.dbvision.api.stm.mng.stmmng011.service.Stmmng011Service;
import kr.co.dbvision.api.stm.mng.stmmng011.service.mapper.Stmmng011Mapper;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import kr.co.dbvision.lib.ui.cmm.emp.entity.Emp;
import net.sf.json.JSONObject;

/**
 * 프로그램개선요청관리에 관한 서비스 구현 클래스
 *
 * @author 디비비전
 * @since 2020.08.03
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.08.03)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.08.03          디비비전              최초 생성
 * </pre>
 */
@Service("Stmmng011Service")
@Transactional
public class Stmmng011ServiceImpl extends EgovAbstractServiceImpl implements Stmmng011Service {

    Logger logger = LogManager.getLogger(Stmmng011ServiceImpl.class);

    @Resource(name="Stmmng011Mapper")
    private Stmmng011Mapper stmmng011Mapper;

    private int listRowNumber = 0; // 넘버링 

    public Stmmng011ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchStmmng011(EgovMapForNull paramMap) {
        try {

            Stmmng011 entity = new Stmmng011(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = stmmng011Mapper.selectStmmng011List(paramMap).stream().map(mapper -> {
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
    public List<EgovMapForNull> searchStmmng011ForExcel(EgovMapForNull paramMap) {

        return stmmng011Mapper.selectStmmng011List(paramMap);
    }

    @Override
    public JSONObject findStmmng011(EgovMapForNull paramMap) {
        try {

            Stmmng011 entity = new Stmmng011(stmmng011Mapper.selectStmmng011(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject saveStmmng011(EgovMapForNull paramMap) throws Exceptions {

        try {

            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            Stmmng011 entity = null;

            for(String ids : idsArr) {

                entity = new Stmmng011(paramMap, ids);

                switch(entity.getNativeeditorStatus()) {
                case "deleted":

                    stmmng011Mapper.deleteStmmng011(entity);
                    break;

                default:

                    stmmng011Mapper.saveStmmng011(entity);
                    break;
                }
            }
            //if(false) { throw new Exceptions("Error."); } 

            EgovMapForNull returnMap = new EgovMapForNull();
            returnMap.put("code", "000");
            returnMap.put("message", "SUCCESS");

            return new JsonMsgMng().makeJsonObject(returnMap);

        } catch (Exception e) {
            throw e;
        }
    }
    
    @Override
    public JSONObject findStmPrgRequst(EgovMapForNull paramMap) {
        try {

            Stmmng011 entity = new Stmmng011(stmmng011Mapper.selectStmPrgRequst(paramMap));
                System.out.println(entity.getDsmsslResnCode() + " ASDASDASDASDA " + paramMap );
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @Override
    public JSONObject saveStmPrgRequst(EgovMapForNull paramMap) {

        try {


            System.out.println("paramMap ::::::: "  + paramMap);
            stmmng011Mapper.insertStmPrgRequst(paramMap);
            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @Override
    public JSONObject modifyStmPrgRequst(EgovMapForNull paramMap) {

        try {

            stmmng011Mapper.updateStmPrgRequst(paramMap);
            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @Override
    public JSONObject removeStmPrgRequst(EgovMapForNull paramMap) {

        try {

            String imprvmrequstSns = StringExpression.nullConvert(paramMap.get("imprvmrequstSns"));
            String[] imprvmrequstSnArr = imprvmrequstSns.split("\\,");

            int arrLength = (imprvmrequstSnArr == null) ? 0 : imprvmrequstSnArr.length;
            EgovMapForNull mapper = null;

            for (int keyColumnIdx = 0; keyColumnIdx < arrLength; keyColumnIdx++) {

                mapper = new EgovMapForNull();
                mapper.put("imprvmrequstSn", imprvmrequstSnArr[keyColumnIdx]);

                stmmng011Mapper.deleteStmPrgRequst(mapper);
            }

            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    
    @Override
    public JSONObject searchMenu(EgovMapForNull paramMap) {
        try {

            Emp entity = new Emp(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = stmmng011Mapper.selectMenuList(paramMap).stream().map(mapper -> {
                    mapper.put("num", listRowNumber++);
                    return mapper;
            }).collect(Collectors.toList());

            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

}
