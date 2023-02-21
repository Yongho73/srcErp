package kr.co.dbvision.api.mps.bsc.mpsbsc009.service.impl;

import java.util.List;

import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.mps.bsc.mpsbsc007.entity.Mpsbsc007;
import kr.co.dbvision.api.mps.bsc.mpsbsc009.entity.Mpsbsc009;
import kr.co.dbvision.api.mps.bsc.mpsbsc009.service.Mpsbsc009Service;
import kr.co.dbvision.api.mps.bsc.mpsbsc009.service.mapper.Mpsbsc009Mapper;
import kr.co.dbvision.api.stm.bsc.stmbsc006.service.Stmbsc006Service;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import net.sf.json.JSONObject;

/**
 * 연봉계약관리관리에 관한 서비스 구현 클래스
 *
 * @author 디비비전
 * @since 2020.06.11
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.06.11          디비비전              최초 생성
 * </pre>
 */
@Service("Mpsbsc009Service")
@Transactional
public class Mpsbsc009ServiceImpl extends EgovAbstractServiceImpl implements Mpsbsc009Service {

    Logger logger = LogManager.getLogger(Mpsbsc009ServiceImpl.class);

    @Resource(name="Mpsbsc009Mapper")
    private Mpsbsc009Mapper mpsbsc009Mapper;
    
    @Resource(name = "Stmbsc006Service")
    public Stmbsc006Service stmbsc006Service;

    private int listRowNumber = 0; // 넘버링 

    public Mpsbsc009ServiceImpl() {
        //
    }
    @Override
    public JSONObject searchMpsbsc009Master(EgovMapForNull paramMap) {
        try {

            Mpsbsc009 entity = new Mpsbsc009(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = mpsbsc009Mapper.selectMpsbsc009MasterList(paramMap).stream().map(mapper -> {
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
    public JSONObject searchMpsbsc009(EgovMapForNull paramMap) {
        try {

            Mpsbsc009 entity = new Mpsbsc009(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = mpsbsc009Mapper.selectMpsbsc009List(paramMap).stream().map(mapper -> {
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
    public List<EgovMapForNull> searchMpsbsc009ForExcel(EgovMapForNull paramMap) {

        return mpsbsc009Mapper.selectMpsbsc009List(paramMap);
    }

    @Override
    public JSONObject findMpsbsc009(EgovMapForNull paramMap) {
        try {

            Mpsbsc009 entity = new Mpsbsc009(mpsbsc009Mapper.selectMpsbsc009(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject saveMpsbsc009(EgovMapForNull paramMap) {

        try {

            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            Mpsbsc009 entity = null;
            String cntrctNo = "";

            for(String ids : idsArr) {

                entity = new Mpsbsc009(paramMap, ids);

                switch(entity.getNativeeditorStatus()) {
                case "deleted":
                    mpsbsc009Mapper.deleteMpsbsc009(entity);
                    break;
                default:
                    if(entity.getCntrctNo().equals("")) {                      
                        EgovMapForNull paramMap2 = new EgovMapForNull();
                        paramMap2.put("relTblNm", "MPS_PAYMENT");
                        paramMap2.put("relItemNm", "CNTRCT_NO");
                        paramMap2.put("snLt", "9");
                       
                       JSONObject  jsonObj = stmbsc006Service.selectGetNumberStmbsc006(paramMap2); 
 
                      cntrctNo = jsonObj.get("data").toString();
                        
                        entity.setCntrctNo(cntrctNo);                        
                        System.out.println("cntrctNo" + entity.getCntrctNo());                        
                    }
                    mpsbsc009Mapper.saveMpsbsc009(entity);
                    break;
                }
            }

            EgovMapForNull returnMap = new EgovMapForNull();
            returnMap.put("code", "000");
            returnMap.put("message", "SUCCESS");

            return new JsonMsgMng().makeJsonObject(returnMap);

        } catch (Exception e) {
            throw e;
        }
    }


}
