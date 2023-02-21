package kr.co.dbvision.api.pjt.osc.pjtosc001.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.pjt.osc.pjtosc001.entity.Pjtosc001;
import kr.co.dbvision.api.pjt.osc.pjtosc001.service.Pjtosc001Service;
import kr.co.dbvision.api.pjt.osc.pjtosc001.service.mapper.Pjtosc001Mapper;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 아웃소싱 인력현황관리에 관한 서비스 구현 클래스
 *
 * @author 디비비전
 * @since 2021.06.24
 * @version 1.0
 * @sourceGen version 2021.02.18.01 (2021.06.24)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2021.06.24          디비비전              최초 생성
 * </pre>
 */
@Service("Pjtosc001Service")
@Transactional
public class Pjtosc001ServiceImpl extends EgovAbstractServiceImpl implements Pjtosc001Service {

    Logger logger = LogManager.getLogger(Pjtosc001ServiceImpl.class);

    @Resource(name="Pjtosc001Mapper")
    private Pjtosc001Mapper pjtosc001Mapper;

    private int listRowNumber = 0; // 넘버링 

    public Pjtosc001ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchPjtosc001(EgovMapForNull paramMap) {
        try {

            Pjtosc001 entity = new Pjtosc001(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = pjtosc001Mapper.selectPjtosc001List(paramMap).stream().map(mapper -> {
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
    public List<EgovMapForNull> searchPjtosc001ForExcel(EgovMapForNull paramMap) {

        return pjtosc001Mapper.selectPjtosc001List(paramMap);
    }

    @Override
    public JSONObject findPjtosc001(EgovMapForNull paramMap) {
        try {

            Pjtosc001 entity = new Pjtosc001(pjtosc001Mapper.selectPjtosc001(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject savePjtosc001(EgovMapForNull paramMap) throws Exceptions {

        try {

            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            Pjtosc001 entity = null;

            for(String ids : idsArr) {

                entity = new Pjtosc001(paramMap, ids);

                switch(entity.getNativeeditorStatus()) {
                case "deleted":

                    pjtosc001Mapper.deletePjtosc001(entity);
                    break;

                default:

                    pjtosc001Mapper.savePjtosc001(entity);
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
