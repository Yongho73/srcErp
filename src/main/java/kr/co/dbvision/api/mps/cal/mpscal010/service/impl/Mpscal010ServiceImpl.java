package kr.co.dbvision.api.mps.cal.mpscal010.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.mps.cal.mpscal010.entity.Mpscal010;
import kr.co.dbvision.api.mps.cal.mpscal010.service.Mpscal010Service;
import kr.co.dbvision.api.mps.cal.mpscal010.service.mapper.Mpscal010Mapper;
import kr.co.dbvision.api.mps.cal.mpscal023.entity.Mpscal023;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 초과근무수당관리에 관한 서비스 구현 클래스
 *
 * @author 디비비전
 * @since 2020.08.18
 * @version 1.0
 * @sourceGen version 2020.06.29.01 (2020.08.18)
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
@Service("Mpscal010Service")
@Transactional
public class Mpscal010ServiceImpl extends EgovAbstractServiceImpl implements Mpscal010Service {

    Logger logger = LogManager.getLogger(Mpscal010ServiceImpl.class);

    @Resource(name="Mpscal010Mapper")
    private Mpscal010Mapper mpscal010Mapper;

    private int listRowNumber = 0; // 넘버링 

    public Mpscal010ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchMpscal010(EgovMapForNull paramMap) {
        try {

            Mpscal010 entity = new Mpscal010(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = mpscal010Mapper.selectMpscal010List(paramMap).stream().map(mapper -> {
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
    public List<EgovMapForNull> searchMpscal010ForExcel(EgovMapForNull paramMap) {

        return mpscal010Mapper.selectMpscal010List(paramMap);
    }

    @Override
    public JSONObject findMpscal010(EgovMapForNull paramMap) {
        try {

            Mpscal010 entity = new Mpscal010(mpscal010Mapper.selectMpscal010(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject saveMpscal010(EgovMapForNull paramMap) throws Exceptions {

        try {

            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            Mpscal010 entity = null;

            for(String ids : idsArr) {

                entity = new Mpscal010(paramMap, ids);

                switch(entity.getNativeeditorStatus()) {
                case "deleted":

                    mpscal010Mapper.deleteMpscal010(entity);
                    break;

                default:

                    mpscal010Mapper.saveMpscal010(entity);
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
    public JSONObject searchMpscal010ReCalc(EgovMapForNull paramMap) {
        try {

            Mpscal023 entity = new Mpscal023(paramMap);
            listRowNumber = 1;
            
            //초과근무수당 재계산 프로시져 호출                       
            List<EgovMapForNull> list = mpscal010Mapper.selectMpscal010OvtimeAllwncCalc(paramMap).stream().map(mapper -> {
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
