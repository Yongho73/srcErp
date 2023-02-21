package kr.co.dbvision.api.stm.bsc.stmbsc004.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.stm.bsc.stmbsc004.entity.Stmbsc004;
import kr.co.dbvision.api.stm.bsc.stmbsc004.service.Stmbsc004Service;
import kr.co.dbvision.api.stm.bsc.stmbsc004.service.mapper.Stmbsc004Mapper;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
* 영업일(공휴일관리)관리에 관한 서비스 구현 클래스
*
* @author 디비비전
* @since 2020.03.16
* @version 1.0
 * @sourceGen version 2020.06.29.01 (2020.07.15)
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
@Service("Stmbsc004Service")
@Transactional
public class Stmbsc004ServiceImpl extends EgovAbstractServiceImpl implements Stmbsc004Service {

    Logger logger = LogManager.getLogger(Stmbsc004ServiceImpl.class);

    @Resource(name="Stmbsc004Mapper")
    private Stmbsc004Mapper stmbsc004Mapper;

    private int listRowNumber = 0; // 넘버링 

    public Stmbsc004ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchStmbsc004(EgovMapForNull paramMap) {
        try {

            Stmbsc004 entity = new Stmbsc004(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = stmbsc004Mapper.selectStmbsc004List(paramMap).stream().map(mapper -> {
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
    public List<EgovMapForNull> searchStmbsc004ForExcel(EgovMapForNull paramMap) {

        return stmbsc004Mapper.selectStmbsc004List(paramMap);
    }

    @Override
    public JSONObject findStmbsc004(EgovMapForNull paramMap) {
        try {

            Stmbsc004 entity = new Stmbsc004(stmbsc004Mapper.selectStmbsc004(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject saveStmbsc004(EgovMapForNull paramMap) throws Exceptions {

        try {

            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            Stmbsc004 entity = null;

            for(String ids : idsArr) {

                entity = new Stmbsc004(paramMap, ids);

                switch(entity.getNativeeditorStatus()) {
                case "deleted":
                    
                    break;
                    
                default:

                    stmbsc004Mapper.updateStmbsc004(entity);
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
    public JSONObject resetDeStmbsc004(EgovMapForNull paramMap) {

        try {

            stmbsc004Mapper.deleteStmbsc004(paramMap);
            stmbsc004Mapper.insertStmbsc004(paramMap);
            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    } 

}
