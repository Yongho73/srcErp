package kr.co.dbvision.api.mps.ern.mpsern008.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.mps.ern.mpsern008.entity.Mpsern008;
import kr.co.dbvision.api.mps.ern.mpsern008.service.Mpsern008Service;
import kr.co.dbvision.api.mps.ern.mpsern008.service.mapper.Mpsern008Mapper;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 소득자별소득현황관리에 관한 서비스 구현 클래스
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
@Service("Mpsern008Service")
@Transactional
public class Mpsern008ServiceImpl extends EgovAbstractServiceImpl implements Mpsern008Service {

    Logger logger = LogManager.getLogger(Mpsern008ServiceImpl.class);

    @Resource(name="Mpsern008Mapper")
    private Mpsern008Mapper mpsern008Mapper;

    private int listRowNumber = 0; // 넘버링 

    public Mpsern008ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchMpsern008(EgovMapForNull paramMap) {
        try {

            Mpsern008 entity = new Mpsern008(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = mpsern008Mapper.selectMpsern008List(paramMap).stream().map(mapper -> {
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
    public List<EgovMapForNull> searchMpsern008ForExcel(EgovMapForNull paramMap) {

        return mpsern008Mapper.selectMpsern008List(paramMap);
    }

    @Override
    public JSONObject findMpsern008(EgovMapForNull paramMap) {
        try {

            Mpsern008 entity = new Mpsern008(mpsern008Mapper.selectMpsern008(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject saveMpsern008(EgovMapForNull paramMap) throws Exceptions {

        try {

            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            Mpsern008 entity = null;

            for(String ids : idsArr) {

                entity = new Mpsern008(paramMap, ids);

                switch(entity.getNativeeditorStatus()) {
                case "deleted":

                    mpsern008Mapper.deleteMpsern008(entity);
                    break;

                default:

                    mpsern008Mapper.saveMpsern008(entity);
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
