package kr.co.dbvision.api.ets.pbx.etspbx002.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.ets.pbx.etspbx002.entity.Etspbx002;
import kr.co.dbvision.api.ets.pbx.etspbx002.service.Etspbx002Service;
import kr.co.dbvision.api.ets.pbx.etspbx002.service.mapper.Etspbx002Mapper;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 결재문서관리에 관한 서비스 구현 클래스
 *
 * @author 디비비전
 * @since 2021.03.23
 * @version 1.0
 * @sourceGen version 2021.02.18.01 (2021.03.23)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2021.03.23          디비비전              최초 생성
 * </pre>
 */
@Service("Etspbx002Service")
@Transactional
public class Etspbx002ServiceImpl extends EgovAbstractServiceImpl implements Etspbx002Service {

    Logger logger = LogManager.getLogger(Etspbx002ServiceImpl.class);

    @Resource(name="Etspbx002Mapper")
    private Etspbx002Mapper etspbx002Mapper;

    private int listRowNumber = 0; // 넘버링 

    public Etspbx002ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchEtspbx002(EgovMapForNull paramMap) {
        try {

            Etspbx002 entity = new Etspbx002(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = etspbx002Mapper.selectEtspbx002List(paramMap).stream().map(mapper -> {
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
    public List<EgovMapForNull> searchEtspbx002ForExcel(EgovMapForNull paramMap) {

        return etspbx002Mapper.selectEtspbx002List(paramMap);
    }

    @Override
    public JSONObject findEtspbx002(EgovMapForNull paramMap) {
        try {

            Etspbx002 entity = new Etspbx002(etspbx002Mapper.selectEtspbx002(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject saveEtspbx002(EgovMapForNull paramMap) throws Exceptions {

        try {

            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            Etspbx002 entity = null;

            for(String ids : idsArr) {

                entity = new Etspbx002(paramMap, ids);

                switch(entity.getNativeeditorStatus()) {
                case "deleted":

                    etspbx002Mapper.deleteEtspbx002(entity);
                    break;

                default:

                    etspbx002Mapper.saveEtspbx002(entity);
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
