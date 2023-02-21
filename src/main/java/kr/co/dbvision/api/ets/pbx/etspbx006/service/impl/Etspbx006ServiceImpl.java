package kr.co.dbvision.api.ets.pbx.etspbx006.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.ets.pbx.etspbx006.entity.Etspbx006;
import kr.co.dbvision.api.ets.pbx.etspbx006.service.Etspbx006Service;
import kr.co.dbvision.api.ets.pbx.etspbx006.service.mapper.Etspbx006Mapper;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 공람문서관리에 관한 서비스 구현 클래스
 *
 * @author 디비비전
 * @since 2021.03.24
 * @version 1.0
 * @sourceGen version 2021.02.18.01 (2021.03.24)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2021.03.24          디비비전              최초 생성
 * </pre>
 */
@Service("Etspbx006Service")
@Transactional
public class Etspbx006ServiceImpl extends EgovAbstractServiceImpl implements Etspbx006Service {

    Logger logger = LogManager.getLogger(Etspbx006ServiceImpl.class);

    @Resource(name="Etspbx006Mapper")
    private Etspbx006Mapper etspbx006Mapper;

    private int listRowNumber = 0; // 넘버링 

    public Etspbx006ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchEtspbx006(EgovMapForNull paramMap) {
        try {

            Etspbx006 entity = new Etspbx006(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = etspbx006Mapper.selectEtspbx006List(paramMap).stream().map(mapper -> {
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
    public List<EgovMapForNull> searchEtspbx006ForExcel(EgovMapForNull paramMap) {

        return etspbx006Mapper.selectEtspbx006List(paramMap);
    }

    @Override
    public JSONObject findEtspbx006(EgovMapForNull paramMap) {
        try {

            Etspbx006 entity = new Etspbx006(etspbx006Mapper.selectEtspbx006(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject saveEtspbx006(EgovMapForNull paramMap) throws Exceptions {

        try {

            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            Etspbx006 entity = null;

            for(String ids : idsArr) {

                entity = new Etspbx006(paramMap, ids);

                switch(entity.getNativeeditorStatus()) {
                case "deleted":

                    etspbx006Mapper.deleteEtspbx006(entity);
                    break;

                default:

                    etspbx006Mapper.saveEtspbx006(entity);
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
