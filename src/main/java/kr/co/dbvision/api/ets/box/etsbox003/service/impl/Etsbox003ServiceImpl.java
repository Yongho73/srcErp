package kr.co.dbvision.api.ets.box.etsbox003.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.ets.box.etsbox003.entity.Etsbox003;
import kr.co.dbvision.api.ets.box.etsbox003.service.Etsbox003Service;
import kr.co.dbvision.api.ets.box.etsbox003.service.mapper.Etsbox003Mapper;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 공람문서관리에 관한 서비스 구현 클래스
 *
 * @author 디비비전
 * @since 2021.03.26
 * @version 1.0
 * @sourceGen version 2021.02.18.01 (2021.03.26)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2021.03.26          디비비전              최초 생성
 * </pre>
 */
@Service("Etsbox003Service")
@Transactional
public class Etsbox003ServiceImpl extends EgovAbstractServiceImpl implements Etsbox003Service {

    Logger logger = LogManager.getLogger(Etsbox003ServiceImpl.class);

    @Resource(name="Etsbox003Mapper")
    private Etsbox003Mapper etsbox003Mapper;

    private int listRowNumber = 0; // 넘버링 

    public Etsbox003ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchEtsbox003(EgovMapForNull paramMap) {
        try {

            Etsbox003 entity = new Etsbox003(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = etsbox003Mapper.selectEtsbox003List(paramMap).stream().map(mapper -> {
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
    public List<EgovMapForNull> searchEtsbox003ForExcel(EgovMapForNull paramMap) {

        return etsbox003Mapper.selectEtsbox003List(paramMap);
    }

    @Override
    public JSONObject findEtsbox003(EgovMapForNull paramMap) {
        try {

            Etsbox003 entity = new Etsbox003(etsbox003Mapper.selectEtsbox003(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject saveEtsbox003(EgovMapForNull paramMap) throws Exceptions {

        try {

            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            Etsbox003 entity = null;

            for(String ids : idsArr) {

                entity = new Etsbox003(paramMap, ids);

                switch(entity.getNativeeditorStatus()) {
                case "deleted":

                    etsbox003Mapper.deleteEtsbox003(entity);
                    break;

                default:

                    etsbox003Mapper.saveEtsbox003(entity);
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
