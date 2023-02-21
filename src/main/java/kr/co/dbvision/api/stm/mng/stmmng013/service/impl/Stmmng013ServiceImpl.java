package kr.co.dbvision.api.stm.mng.stmmng013.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.stm.bsc.stmbsc006.service.Stmbsc006Service;
import kr.co.dbvision.api.stm.mng.stmmng013.entity.Stmmng013;
import kr.co.dbvision.api.stm.mng.stmmng013.service.Stmmng013Service;
import kr.co.dbvision.api.stm.mng.stmmng013.service.mapper.Stmmng013Mapper;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 명함관리관리에 관한 서비스 구현 클래스
 *
 * @author 디비비전
 * @since 2020.07.31
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.07.31)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.07.31          디비비전              최초 생성
 * </pre>
 */
@Service("Stmmng013Service")
@Transactional
public class Stmmng013ServiceImpl extends EgovAbstractServiceImpl implements Stmmng013Service {

    Logger logger = LogManager.getLogger(Stmmng013ServiceImpl.class);

    @Resource(name="Stmmng013Mapper")
    private Stmmng013Mapper stmmng013Mapper;
    
    @Resource(name="Stmbsc006Service")
    public Stmbsc006Service stmbsc006Service;   

    private int listRowNumber = 0; // 넘버링 

    public Stmmng013ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchStmmng013(EgovMapForNull paramMap) {
        try {

            Stmmng013 entity = new Stmmng013(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = stmmng013Mapper.selectStmmng013List(paramMap).stream().map(mapper -> {
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
    public List<EgovMapForNull> searchStmmng013ForExcel(EgovMapForNull paramMap) {

        return stmmng013Mapper.selectStmmng013List(paramMap);
    }

    @Override
    public JSONObject findStmmng013(EgovMapForNull paramMap) {
        try {

            Stmmng013 entity = new Stmmng013(stmmng013Mapper.selectStmmng013(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject saveStmmng013(EgovMapForNull paramMap) throws Exceptions {

        try {

            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            Stmmng013 entity = null;

            for(String ids : idsArr) {

                entity = new Stmmng013(paramMap, ids);
                
                
                
                String newNumber ="";
                
//                System.out.println(entity.getCustNo());
                
                if(entity.getCustNo().equals("자동채번")) {
                    
                    paramMap.put("relTblNm",  "STM_CUST");
                    paramMap.put("relItemNm", "CUST_NO");
                   
                    JSONObject  jsonObj = stmbsc006Service.selectCreateNumberStmbsc006(paramMap); 
                    newNumber = jsonObj.get("data").toString();
                    
                    entity.setCustNo(newNumber);
                    
                }
                

              //주담당자로 체크할 경우 거래처 테이블에 정보 업데이트 
                if (entity.getBcncChargerAt().toString().equals("1") && !entity.getBcncCode().toString().equals("")) {
                    
                    stmmng013Mapper.updateChargeClearStmmng013(entity);
                    stmmng013Mapper.updateChargeSetStmmng013(entity);
                    
                    //거래처 담당자 업데이트 
                    stmmng013Mapper.updateChargeMfsbsc002(entity);
                } else if(entity.getBcncCode().toString().equals("")) {
                    entity.setBcncChargerAt("0");
                }
                
                
                
                

                switch(entity.getNativeeditorStatus()) {
                case "deleted":

                    stmmng013Mapper.deleteStmmng013(entity);
                    break;

                default:
                    
                    stmmng013Mapper.saveStmmng013(entity);
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
