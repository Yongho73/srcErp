package kr.co.dbvision.api.pub.wks.pubwks004.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.pub.wks.pubwks004.entity.Pubwks004;
import kr.co.dbvision.api.pub.wks.pubwks004.service.Pubwks004Service;
import kr.co.dbvision.api.pub.wks.pubwks004.service.mapper.Pubwks004Mapper;
import kr.co.dbvision.api.stm.bsc.stmbsc006.service.Stmbsc006Service;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 휴직신청관리에 관한 서비스 구현 클래스
 *
 * @author 디비비전
 * @since 2020.06.03
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.06.03          디비비전              최초 생성
 * </pre>
 */
@Service("Pubwks004Service")
@Transactional
public class Pubwks004ServiceImpl extends EgovAbstractServiceImpl implements Pubwks004Service {

    Logger logger = LogManager.getLogger(Pubwks004ServiceImpl.class);

    @Resource(name="Pubwks004Mapper")
    private Pubwks004Mapper pubwks004Mapper;

    @Resource(name = "Stmbsc006Service")
    public Stmbsc006Service stmbsc006Service;
    
    private int listRowNumber = 0; // 넘버링 

    public Pubwks004ServiceImpl() {
        //
    }
    
    @Override
    public JSONObject userInformationPubwks004(EgovMapForNull paramMap) {
        try {

            Pubwks004 entity = new Pubwks004(pubwks004Mapper.userInformationPubwks004(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject searchPubwks004(EgovMapForNull paramMap) {
        try {

            Pubwks004 entity = new Pubwks004(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = pubwks004Mapper.selectPubwks004List(paramMap).stream().map(mapper -> {
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
    public List<EgovMapForNull> searchPubwks004ForExcel(EgovMapForNull paramMap) {

        return pubwks004Mapper.searchPubwks004ForExcel(paramMap);
    }

    @Override
    public JSONObject findPubwks004(EgovMapForNull paramMap) {
        try {

            Pubwks004 entity = new Pubwks004(pubwks004Mapper.selectPubwks004(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject savePubwks004(EgovMapForNull paramMap) throws Exceptions {

        try {

            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            Pubwks004 entity = null;

            for(String ids : idsArr) {
                entity = new Pubwks004(paramMap, ids);
                
                String newNumber = "";
                if("".equals(entity.getLayoffNo())) {
                    EgovMapForNull paramMap2 = new EgovMapForNull();
                    paramMap2.put("relTblNm", "MHS_LAYOFF");
                    paramMap2.put("relItemNm", "LAYOFF_NO");
                    JSONObject jsonObj = stmbsc006Service.selectCreateNumberStmbsc006(paramMap2);
                    newNumber = jsonObj.get("data").toString();
                    entity.setLayoffNo(newNumber);                     
                }

                switch(entity.getNativeeditorStatus()) {
                case "deleted":

                    pubwks004Mapper.deletePubwks004(entity);
                    break;

                default:

                    pubwks004Mapper.savePubwks004(entity);
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
    public JSONObject saveCopyPubwks004(EgovMapForNull paramMap) {
        try {
            EgovMapForNull returnMap = new EgovMapForNull();
            
            int cnt = pubwks004Mapper.selectElctsctSeSnCnt(paramMap);
            if(cnt >= 1) {
                returnMap.put("code", "999");
                returnMap.put("message", "FAIL");
            }
            else {
                pubwks004Mapper.saveCopyPubwks004(paramMap);
                returnMap.put("code", "000");
                returnMap.put("message", "SUCCESS");
            }
            
            
            return new JsonMsgMng().makeJsonObject(returnMap);

        } catch (Exception e) {
            throw e;
        }
    }

}
