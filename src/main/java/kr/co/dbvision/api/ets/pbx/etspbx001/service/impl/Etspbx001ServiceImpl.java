package kr.co.dbvision.api.ets.pbx.etspbx001.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.ets.pbx.etspbx001.entity.Etspbx001;
import kr.co.dbvision.api.ets.pbx.etspbx001.service.Etspbx001Service;
import kr.co.dbvision.api.ets.pbx.etspbx001.service.mapper.Etspbx001Mapper;
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
@Service("Etspbx001Service")
@Transactional
public class Etspbx001ServiceImpl extends EgovAbstractServiceImpl implements Etspbx001Service {

    Logger logger = LogManager.getLogger(Etspbx001ServiceImpl.class);

    @Resource(name="Etspbx001Mapper")
    private Etspbx001Mapper etspbx001Mapper;

    private int listRowNumber = 0; // 넘버링 

    public Etspbx001ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchEtspbx001(EgovMapForNull paramMap) {
        try {

            Etspbx001 entity = new Etspbx001(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = etspbx001Mapper.selectEtspbx001List(paramMap).stream().map(mapper -> {
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
    public List<EgovMapForNull> searchEtspbx001ForExcel(EgovMapForNull paramMap) {

        return etspbx001Mapper.selectEtspbx001List(paramMap);
    }

    @Override
    public JSONObject findEtspbx001(EgovMapForNull paramMap) {
        try {

            Etspbx001 entity = new Etspbx001(etspbx001Mapper.selectEtspbx001(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject saveEtspbx001(EgovMapForNull paramMap) throws Exceptions {

        try {

            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            Etspbx001 entity = null;

            for(String ids : idsArr) {

                entity = new Etspbx001(paramMap, ids);

                switch(entity.getNativeeditorStatus()) {
                case "deleted":

                    etspbx001Mapper.deleteEtspbx001(entity);
                    break;

                default:

                    etspbx001Mapper.saveEtspbx001(entity);
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
