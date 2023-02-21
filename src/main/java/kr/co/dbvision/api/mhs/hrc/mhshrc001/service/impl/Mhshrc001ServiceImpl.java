package kr.co.dbvision.api.mhs.hrc.mhshrc001.service.impl;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.mhs.hrc.mhshrc001.entity.Mhshrc001;
import kr.co.dbvision.api.mhs.hrc.mhshrc001.service.Mhshrc001Service;
import kr.co.dbvision.api.mhs.hrc.mhshrc001.service.mapper.Mhshrc001Mapper;
import kr.co.dbvision.api.stm.bsc.stmbsc006.service.Stmbsc006Service;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.SessionMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 증명서신청/출력관리에 관한 서비스 구현 클래스
 *
 * @author 디비비전
 * @since 2020.08.27
 * @version 1.0
 * @sourceGen version 2020.08.06.01 (2020.08.27)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.08.27          디비비전              최초 생성
 * </pre>
 */
@Service("Mhshrc001Service")
@Transactional
public class Mhshrc001ServiceImpl extends EgovAbstractServiceImpl implements Mhshrc001Service {

    Logger logger = LogManager.getLogger(Mhshrc001ServiceImpl.class);

    @Resource(name="Mhshrc001Mapper")
    private Mhshrc001Mapper mhshrc001Mapper;

    @Resource(name="Stmbsc006Service")
    private Stmbsc006Service stmbsc006Service;
    
    private int listRowNumber = 0; // 넘버링 

    public Mhshrc001ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchMhshrc001(EgovMapForNull paramMap) {
        try {

            Mhshrc001 entity = new Mhshrc001(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = mhshrc001Mapper.selectMhshrc001List(paramMap).stream().map(mapper -> {
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
    public List<EgovMapForNull> searchMhshrc001ForExcel(EgovMapForNull paramMap) {

        return mhshrc001Mapper.selectMhshrc001List(paramMap);
    }

    @Override
    public JSONObject findMhshrc001(EgovMapForNull paramMap) {
        try {

            Mhshrc001 entity = new Mhshrc001(mhshrc001Mapper.selectMhshrc001(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject saveMhshrc001(EgovMapForNull paramMap) throws Exceptions {

        try {
            Map<String, Object> sessionMap = (Map<String, Object>) SessionMng.getCommonSession();
            String userId = "";
            if (sessionMap == null) {
                return null;
            } else {
                userId = StringExpression.nullConvert(sessionMap.get("userId"));
            }
            
            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            Mhshrc001 entity = null;
            String newNumber;
            for(String ids : idsArr) {

                entity = new Mhshrc001(paramMap, ids);

                switch(entity.getNativeeditorStatus()) {
                case "deleted":

                    mhshrc001Mapper.deleteMhshrc001(entity);
                    break;

                default:
                    if("".equals(entity.getIssuno())) {
                        EgovMapForNull paramMap2 = new EgovMapForNull();
                        paramMap2.put("relTblNm", "MHS_PROOF_ISSU");
                        paramMap2.put("relItemNm", "ISSUNO");
                        JSONObject jsonObj = stmbsc006Service.selectCreateNumberStmbsc006(paramMap2);
                        newNumber = jsonObj.get("data").toString();
                        entity.setIssuno(newNumber); 
                    }
                    entity.setRegId(userId);
                    entity.setUptId(userId);
                    mhshrc001Mapper.saveMhshrc001(entity);
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
