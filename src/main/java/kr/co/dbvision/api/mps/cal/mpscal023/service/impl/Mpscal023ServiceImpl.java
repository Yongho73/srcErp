package kr.co.dbvision.api.mps.cal.mpscal023.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.mps.cal.mpscal023.entity.Mpscal023;
import kr.co.dbvision.api.mps.cal.mpscal023.service.Mpscal023Service;
import kr.co.dbvision.api.mps.cal.mpscal023.service.mapper.Mpscal023Mapper;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 연차수당관리관리에 관한 서비스 구현 클래스
 *
 * @author 디비비전
 * @since 2020.08.19
 * @version 1.0
 * @sourceGen version 2020.06.29.01 (2020.08.19)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.08.19          디비비전              최초 생성
 * </pre>
 */
@Service("Mpscal023Service")
@Transactional
public class Mpscal023ServiceImpl extends EgovAbstractServiceImpl implements Mpscal023Service {

    Logger logger = LogManager.getLogger(Mpscal023ServiceImpl.class);

    @Resource(name="Mpscal023Mapper")
    private Mpscal023Mapper mpscal023Mapper;

    private int listRowNumber = 0; // 넘버링 

    public Mpscal023ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchMpscal023(EgovMapForNull paramMap) {
        try {

            Mpscal023 entity = new Mpscal023(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = mpscal023Mapper.selectMpscal023List(paramMap).stream().map(mapper -> {
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
    public List<EgovMapForNull> searchMpscal023ForExcel(EgovMapForNull paramMap) {

        return mpscal023Mapper.selectMpscal023List(paramMap);
    }

    @Override
    public JSONObject findMpscal023(EgovMapForNull paramMap) {
        try {

            Mpscal023 entity = new Mpscal023(mpscal023Mapper.selectMpscal023(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject saveMpscal023(EgovMapForNull paramMap) throws Exceptions {

        try {

            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            Mpscal023 entity = null;

            for(String ids : idsArr) {

                entity = new Mpscal023(paramMap, ids);

                switch(entity.getNativeeditorStatus()) {
                case "deleted":

                    mpscal023Mapper.deleteMpscal023(entity);
                    break;

                default:

                    mpscal023Mapper.saveMpscal023(entity);
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
    public JSONObject searchMpscal023ReCalc(EgovMapForNull paramMap) {
        try {

            Mpscal023 entity = new Mpscal023(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = mpscal023Mapper.selectMpscal023ReCalcList(paramMap).stream().map(mapper -> {
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
