package kr.co.dbvision.api.mps.ern.mpsern009.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.mps.ern.mpsern009.entity.Mpsern009;
import kr.co.dbvision.api.mps.ern.mpsern009.service.Mpsern009Service;
import kr.co.dbvision.api.mps.ern.mpsern009.service.mapper.Mpsern009Mapper;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 소득자별원천징수영수증관리에 관한 서비스 구현 클래스
 *
 * @author 디비비전
 * @since 2020.08.18
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.08.18)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.08.18          디비비전              최초 생성
 * </pre>
 */
@Service("Mpsern009Service")
@Transactional
public class Mpsern009ServiceImpl extends EgovAbstractServiceImpl implements Mpsern009Service {

    Logger logger = LogManager.getLogger(Mpsern009ServiceImpl.class);

    @Resource(name="Mpsern009Mapper")
    private Mpsern009Mapper mpsern009Mapper;

    private int listRowNumber = 0; // 넘버링 

    public Mpsern009ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchMpsern009(EgovMapForNull paramMap) {
        try {

            Mpsern009 entity = new Mpsern009(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = mpsern009Mapper.selectMpsern009List(paramMap).stream().map(mapper -> {
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
    public List<EgovMapForNull> searchMpsern009ForExcel(EgovMapForNull paramMap) {

        return mpsern009Mapper.selectMpsern009List(paramMap);
    }

    @Override
    public JSONObject findMpsern009(EgovMapForNull paramMap) {
        try {

            Mpsern009 entity = new Mpsern009(mpsern009Mapper.selectMpsern009(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject saveMpsern009(EgovMapForNull paramMap) throws Exceptions {

        try {

            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            Mpsern009 entity = null;

            for(String ids : idsArr) {

                entity = new Mpsern009(paramMap, ids);

                switch(entity.getNativeeditorStatus()) {
                case "deleted":

                    mpsern009Mapper.deleteMpsern009(entity);
                    break;

                default:

                    mpsern009Mapper.saveMpsern009(entity);
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
