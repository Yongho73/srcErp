package kr.co.dbvision.api.stm.mng.stmmng009.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.stm.mng.stmmng009.entity.Stmmng009;
import kr.co.dbvision.api.stm.mng.stmmng009.service.Stmmng009Service;
import kr.co.dbvision.api.stm.mng.stmmng009.service.mapper.Stmmng009Mapper;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 다국어관리관리에 관한 서비스 구현 클래스
 *
 * @author 디비비전
 * @since 2020.07.28
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.07.28)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.07.28          디비비전              최초 생성
 * </pre>
 */
@Service("Stmmng009Service")
@Transactional
public class Stmmng009ServiceImpl extends EgovAbstractServiceImpl implements Stmmng009Service {

    Logger logger = LogManager.getLogger(Stmmng009ServiceImpl.class);

    @Resource(name="Stmmng009Mapper")
    private Stmmng009Mapper stmmng009Mapper;

    private int listRowNumber = 0; // 넘버링 

    public Stmmng009ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchStmmng009(EgovMapForNull paramMap) {
        try {

            Stmmng009 entity = new Stmmng009(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = stmmng009Mapper.selectStmmng009List(paramMap).stream().map(mapper -> {
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
    public List<EgovMapForNull> searchStmmng009ForExcel(EgovMapForNull paramMap) {

        return stmmng009Mapper.selectStmmng009List(paramMap);
    }

    @Override
    public JSONObject findStmmng009(EgovMapForNull paramMap) {
        try {

            Stmmng009 entity = new Stmmng009(stmmng009Mapper.selectStmmng009(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject saveStmmng009(EgovMapForNull paramMap) throws Exceptions {

        try {

            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            Stmmng009 entity = null;

            for(String ids : idsArr) {

                entity = new Stmmng009(paramMap, ids);

                switch(entity.getNativeeditorStatus()) {
                case "deleted":

                    stmmng009Mapper.deleteStmmng009(entity);
                    break;

                default:

                    stmmng009Mapper.saveStmmng009(entity);
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

}
