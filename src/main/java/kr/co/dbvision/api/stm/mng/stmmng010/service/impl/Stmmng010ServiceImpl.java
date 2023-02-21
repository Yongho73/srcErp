package kr.co.dbvision.api.stm.mng.stmmng010.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.stm.mng.stmmng010.entity.Stmmng010;
import kr.co.dbvision.api.stm.mng.stmmng010.service.Stmmng010Service;
import kr.co.dbvision.api.stm.mng.stmmng010.service.mapper.Stmmng010Mapper;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 프로그램 개발현황관리에 관한 서비스 구현 클래스
 *
 * @author 디비비전
 * @since 2020.07.10
 * @version 1.0
 * @sourceGen version 2020.06.29.01 (2020.07.10)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.07.10          디비비전              최초 생성
 * </pre>
 */
@Service("Stmmng010Service")
@Transactional
public class Stmmng010ServiceImpl extends EgovAbstractServiceImpl implements Stmmng010Service {

    Logger logger = LogManager.getLogger(Stmmng010ServiceImpl.class);

    @Resource(name="Stmmng010Mapper")
    private Stmmng010Mapper stmmng010Mapper;

    private int listRowNumber = 0; // 넘버링 

    public Stmmng010ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchStmmng010(EgovMapForNull paramMap) {
        try {

            Stmmng010 entity = new Stmmng010(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = stmmng010Mapper.selectStmmng010List(paramMap).stream().map(mapper -> {
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
    public List<EgovMapForNull> searchStmmng010ForExcel(EgovMapForNull paramMap) {

        return stmmng010Mapper.selectStmmng010List(paramMap);
    }

    @Override
    public JSONObject findStmmng010(EgovMapForNull paramMap) {
        try {

            Stmmng010 entity = new Stmmng010(stmmng010Mapper.selectStmmng010(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject saveStmmng010(EgovMapForNull paramMap) throws Exceptions {

        try {

            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            Stmmng010 entity = null;

            for(String ids : idsArr) {

                entity = new Stmmng010(paramMap, ids);

                switch(entity.getNativeeditorStatus()) {
                case "deleted":

                    stmmng010Mapper.deleteStmmng010(entity);
                    break;

                default:

                    stmmng010Mapper.saveStmmng010(entity);
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
    public JSONObject searchStmmng010Day(EgovMapForNull paramMap) {
        try {

            Stmmng010 entity = new Stmmng010(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = stmmng010Mapper.selectStmmng010DayList(paramMap).stream().map(mapper -> {
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
    public JSONObject searchStmmng010Week(EgovMapForNull paramMap) {
        try {

            Stmmng010 entity = new Stmmng010(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = stmmng010Mapper.selectStmmng010WeekList(paramMap).stream().map(mapper -> {
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
