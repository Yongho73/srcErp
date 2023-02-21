package kr.co.dbvision.api.ets.box.etsbox001.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.ets.box.etsbox001.entity.Etsbox001;
import kr.co.dbvision.api.ets.box.etsbox001.service.Etsbox001Service;
import kr.co.dbvision.api.ets.box.etsbox001.service.mapper.Etsbox001Mapper;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 기안문서관리에 관한 서비스 구현 클래스
 *
 * @author 디비비전
 * @since 2021.03.25
 * @version 1.0
 * @sourceGen version 2021.02.18.01 (2021.03.25)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2021.03.25          디비비전              최초 생성
 * </pre>
 */
@Service("Etsbox001Service")
@Transactional
public class Etsbox001ServiceImpl extends EgovAbstractServiceImpl implements Etsbox001Service {

    Logger logger = LogManager.getLogger(Etsbox001ServiceImpl.class);

    @Resource(name="Etsbox001Mapper")
    private Etsbox001Mapper etsbox001Mapper;

    private int listRowNumber = 0; // 넘버링 

    public Etsbox001ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchEtsbox001(EgovMapForNull paramMap) {
        try {

            Etsbox001 entity = new Etsbox001(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = etsbox001Mapper.selectEtsbox001List(paramMap).stream().map(mapper -> {
                    mapper.put("num", listRowNumber++);

                    if("1".equals(mapper.get("emrgncySanctnAt"))){
                    	mapper.put("docTit", "<긴급> "+mapper.get("docTit"));
                    };
                    return mapper;
            }).collect(Collectors.toList());

            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public List<EgovMapForNull> searchEtsbox001ForExcel(EgovMapForNull paramMap) {

        return etsbox001Mapper.selectEtsbox001List(paramMap);
    }

    @Override
    public JSONObject findEtsbox001(EgovMapForNull paramMap) {
        try {

            Etsbox001 entity = new Etsbox001(etsbox001Mapper.selectEtsbox001(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject saveEtsbox001(EgovMapForNull paramMap) throws Exceptions {

        try {

            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            Etsbox001 entity = null;

            for(String ids : idsArr) {

                entity = new Etsbox001(paramMap, ids);

                switch(entity.getNativeeditorStatus()) {
                case "deleted":

                    etsbox001Mapper.deleteEtsbox001(entity);
                    break;

                default:

                    etsbox001Mapper.saveEtsbox001(entity);
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
