package kr.co.dbvision.api.ets.pbx.etspbx004.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.ets.pbx.etspbx004.entity.Etspbx004;
import kr.co.dbvision.api.ets.pbx.etspbx004.service.Etspbx004Service;
import kr.co.dbvision.api.ets.pbx.etspbx004.service.mapper.Etspbx004Mapper;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 수신문서관리에 관한 서비스 구현 클래스
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
@Service("Etspbx004Service")
@Transactional
public class Etspbx004ServiceImpl extends EgovAbstractServiceImpl implements Etspbx004Service {

    Logger logger = LogManager.getLogger(Etspbx004ServiceImpl.class);

    @Resource(name="Etspbx004Mapper")
    private Etspbx004Mapper etspbx004Mapper;

    private int listRowNumber = 0; // 넘버링 

    public Etspbx004ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchEtspbx004(EgovMapForNull paramMap) {
        try {

            Etspbx004 entity = new Etspbx004(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = etspbx004Mapper.selectEtspbx004List(paramMap).stream().map(mapper -> {
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
    public List<EgovMapForNull> searchEtspbx004ForExcel(EgovMapForNull paramMap) {

        return etspbx004Mapper.selectEtspbx004List(paramMap);
    }

    @Override
    public JSONObject findEtspbx004(EgovMapForNull paramMap) {
        try {

            Etspbx004 entity = new Etspbx004(etspbx004Mapper.selectEtspbx004(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject saveEtspbx004(EgovMapForNull paramMap) throws Exceptions {

        try {

            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            Etspbx004 entity = null;

            for(String ids : idsArr) {

                entity = new Etspbx004(paramMap, ids);

                switch(entity.getNativeeditorStatus()) {
                case "deleted":

                    etspbx004Mapper.deleteEtspbx004(entity);
                    break;

                default:

                    etspbx004Mapper.saveEtspbx004(entity);
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
