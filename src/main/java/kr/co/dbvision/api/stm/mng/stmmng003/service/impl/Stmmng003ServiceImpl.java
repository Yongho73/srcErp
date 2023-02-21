package kr.co.dbvision.api.stm.mng.stmmng003.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.stm.mng.stmmng003.entity.Stmmng003;
import kr.co.dbvision.api.stm.mng.stmmng003.service.Stmmng003Service;
import kr.co.dbvision.api.stm.mng.stmmng003.service.mapper.Stmmng003Mapper;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 공통코드관리관리에 관한 서비스 구현 클래스
 *
 * @author 디비비전
 * @since 2020.07.22
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.07.22)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.07.22          디비비전              최초 생성
 * </pre>
 */
@Service("Stmmng003Service")
@Transactional
public class Stmmng003ServiceImpl extends EgovAbstractServiceImpl implements Stmmng003Service {

    Logger logger = LogManager.getLogger(Stmmng003ServiceImpl.class);

    @Resource(name="Stmmng003Mapper")
    private Stmmng003Mapper stmmng003Mapper;

    private int listRowNumber = 0; // 넘버링 

    public Stmmng003ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchStmmng003(EgovMapForNull paramMap) {
        try {

            Stmmng003 entity = new Stmmng003(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = stmmng003Mapper.selectStmmng003List(paramMap).stream().map(mapper -> {
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
    public List<EgovMapForNull> searchStmmng003ForExcel(EgovMapForNull paramMap) {

        return stmmng003Mapper.selectStmmng003List(paramMap);
    }

    @Override
    public JSONObject findStmmng003(EgovMapForNull paramMap) {
        try {

            Stmmng003 entity = new Stmmng003(stmmng003Mapper.selectStmmng003(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject saveStmmng003(EgovMapForNull paramMap) throws Exceptions {

        try {

            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            Stmmng003 entity = null;

            for(String ids : idsArr) {

                entity = new Stmmng003(paramMap, ids);

                switch(entity.getNativeeditorStatus()) {
                case "deleted":

                    stmmng003Mapper.deleteCodeKindStmmng003(entity);
                    stmmng003Mapper.deleteStmmng003(entity);
                    break;

                default:

                    stmmng003Mapper.saveStmmng003(entity);
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
    public JSONObject searchCodeStmmng003(EgovMapForNull paramMap) {
        try {

            Stmmng003 entity = new Stmmng003(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = stmmng003Mapper.selectCodeStmmng003List(paramMap).stream().map(mapper -> {
                    mapper.put("codeNum", listRowNumber++);
                    return mapper;
            }).collect(Collectors.toList());

            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject findCodeStmmng003(EgovMapForNull paramMap) {
        try {

            Stmmng003 entity = new Stmmng003(stmmng003Mapper.selectCodeStmmng003(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }
    
    @Override
    public JSONObject saveCodeStmmng003(EgovMapForNull paramMap) throws Exceptions {

        try {

            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            Stmmng003 entity = null;

            for(String ids : idsArr) {

                entity = new Stmmng003(paramMap, ids);

                switch(entity.getNativeeditorStatus()) {
                case "deleted":

                    stmmng003Mapper.deleteCodeStmmng003(entity);
                    break;

                default:

                    stmmng003Mapper.saveCodeStmmng003(entity);
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
    public JSONObject searchStmCodeListAll(EgovMapForNull paramMap) {
        try {

            Stmmng003 entity = new Stmmng003(paramMap);
            List<EgovMapForNull> list = stmmng003Mapper.selectStmCodeListAll(paramMap);
            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

}
