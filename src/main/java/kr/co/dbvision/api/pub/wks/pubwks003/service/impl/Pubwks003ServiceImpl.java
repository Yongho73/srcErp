package kr.co.dbvision.api.pub.wks.pubwks003.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.pub.wks.pubwks003.entity.Pubwks003;
import kr.co.dbvision.api.pub.wks.pubwks003.service.Pubwks003Service;
import kr.co.dbvision.api.pub.wks.pubwks003.service.mapper.Pubwks003Mapper;
import kr.co.dbvision.api.pub.wks.pubwks003.service.impl.Pubwks003ServiceImpl;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 휴가신청관리에 관한 서비스 구현 클래스
 *
 * @author 디비비전
 * @since 2020.06.04
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.06.04          디비비전              최초 생성
 * </pre>
 */
@Service("Pubwks003Service")
@Transactional
public class Pubwks003ServiceImpl extends EgovAbstractServiceImpl implements Pubwks003Service {

    Logger logger = LogManager.getLogger(Pubwks003ServiceImpl.class);

    @Resource(name="Pubwks003Mapper")
    private Pubwks003Mapper pubwks003Mapper;

    private int listRowNumber = 0; // 넘버링 

    public Pubwks003ServiceImpl() {
        //
    }
    
    @Override
    public JSONObject WrycTime(EgovMapForNull paramMap) {
        try {

            Pubwks003 entity = new Pubwks003(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = pubwks003Mapper.WrycTime(paramMap).stream().map(mapper -> {
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
    public JSONObject searchWrycDaycntPubwks003(EgovMapForNull paramMap) {
        try {

            Pubwks003 entity = new Pubwks003(pubwks003Mapper.searchWrycDaycntPubwks003(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject searchPubwks003(EgovMapForNull paramMap) {
        try {

            Pubwks003 entity = new Pubwks003(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = pubwks003Mapper.selectPubwks003List(paramMap).stream().map(mapper -> {
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
    public JSONObject searchAltRewardHvofDePubwks003(EgovMapForNull paramMap) {
        try {

            Pubwks003 entity = new Pubwks003(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = pubwks003Mapper.selectAltRewardHvofDePubwks003(paramMap).stream().map(mapper -> {
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
    public List<EgovMapForNull> searchPubwks003ForExcel(EgovMapForNull paramMap) {

        return pubwks003Mapper.selectPubwks003List(paramMap);
    }

    @Override
    public JSONObject findPubwks003(EgovMapForNull paramMap) {
        try {

            Pubwks003 entity = new Pubwks003(pubwks003Mapper.selectPubwks003(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject savePubwks003(EgovMapForNull paramMap) throws Exceptions {

        try {

            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            Pubwks003 entity = null;

            for(String ids : idsArr) {

                entity = new Pubwks003(paramMap, ids);

                switch(entity.getNativeeditorStatus()) {
                case "deleted":

                    pubwks003Mapper.deletePubwks003(entity);
                    break;

                default:

                    pubwks003Mapper.savePubwks003(entity);
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
