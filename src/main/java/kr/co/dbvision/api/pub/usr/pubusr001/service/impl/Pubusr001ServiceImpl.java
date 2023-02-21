package kr.co.dbvision.api.pub.usr.pubusr001.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.pub.usr.pubusr001.entity.Pubusr001;
import kr.co.dbvision.api.pub.usr.pubusr001.service.Pubusr001Service;
import kr.co.dbvision.api.pub.usr.pubusr001.service.mapper.Pubusr001Mapper;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 개인정보조회관리에 관한 서비스 구현 클래스
 *
 * @author 디비비전
 * @since 2021.05.28
 * @version 1.0
 * @sourceGen version 2021.02.18.01 (2021.05.28)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2021.05.28          디비비전              최초 생성
 * </pre>
 */
@Service("Pubusr001Service")
@Transactional
public class Pubusr001ServiceImpl extends EgovAbstractServiceImpl implements Pubusr001Service {

    Logger logger = LogManager.getLogger(Pubusr001ServiceImpl.class);

    @Resource(name="Pubusr001Mapper")
    private Pubusr001Mapper pubusr001Mapper;

    private int listRowNumber = 0; // 넘버링 

    public Pubusr001ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchPubusr001(EgovMapForNull paramMap) {
        try {

            Pubusr001 entity = new Pubusr001(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = pubusr001Mapper.selectPubusr001List(paramMap).stream().map(mapper -> {
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
    public List<EgovMapForNull> searchPubusr001ForExcel(EgovMapForNull paramMap) {

        return pubusr001Mapper.selectPubusr001List(paramMap);
    }

    @Override
    public JSONObject findPubusr001(EgovMapForNull paramMap) {
        try {

            Pubusr001 entity = new Pubusr001(pubusr001Mapper.selectPubusr001(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject savePubusr001(EgovMapForNull paramMap) throws Exceptions {

        try {

            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            Pubusr001 entity = null;

            for(String ids : idsArr) {

                entity = new Pubusr001(paramMap, ids);

                switch(entity.getNativeeditorStatus()) {
                case "deleted":

                    pubusr001Mapper.deletePubusr001(entity);
                    break;

                default:

                    pubusr001Mapper.savePubusr001(entity);
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
