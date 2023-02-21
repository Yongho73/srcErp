package kr.co.dbvision.api.mps.cal.mpscal016.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.mps.bsc.mpsbsc006.entity.Mpsbsc006;
import kr.co.dbvision.api.mps.cal.mpscal016.entity.Mpscal016;
import kr.co.dbvision.api.mps.cal.mpscal016.service.Mpscal016Service;
import kr.co.dbvision.api.mps.cal.mpscal016.service.mapper.Mpscal016Mapper;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 급여일괄등록관리에 관한 서비스 구현 클래스
 *
 * @author 디비비전
 * @since 2020.08.07
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.08.07)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.08.07          디비비전              최초 생성
 * </pre>
 */
@Service("Mpscal016Service")
@Transactional
public class Mpscal016ServiceImpl extends EgovAbstractServiceImpl implements Mpscal016Service {

    Logger logger = LogManager.getLogger(Mpscal016ServiceImpl.class);

    @Resource(name="Mpscal016Mapper")
    private Mpscal016Mapper mpscal016Mapper;

    private int listRowNumber = 0; // 넘버링 

    public Mpscal016ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchMpscal016(EgovMapForNull paramMap) {
        try {

            Mpscal016 entity = new Mpscal016(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = mpscal016Mapper.selectMpscal016List(paramMap).stream().map(mapper -> {
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
    public List<EgovMapForNull> searchMpscal016ForExcel(EgovMapForNull paramMap) {

        return mpscal016Mapper.selectMpscal016List(paramMap);
    }

    @Override
    public JSONObject findMpscal016(EgovMapForNull paramMap) {
        try {

            Mpscal016 entity = new Mpscal016(mpscal016Mapper.selectMpscal016(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject saveMpscal016(EgovMapForNull paramMap) throws Exceptions {

        try {

            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            Mpscal016 entity = null;

            for(String ids : idsArr) {

                entity = new Mpscal016(paramMap, ids);

                switch(entity.getNativeeditorStatus()) {
                case "deleted":

                    mpscal016Mapper.deleteMpscal016(entity);
                    break;
                    
                case "updated":

                    mpscal016Mapper.saveMpscal016(entity);
                    break;
                    
                case "inserted":

                    mpscal016Mapper.saveMpscal016(entity);
                    break;
                    
                default :
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
    public JSONObject searchpopMpscal016(EgovMapForNull paramMap) {
        try {

            Mpsbsc006 entity = new Mpsbsc006(paramMap);
            List<EgovMapForNull> list = mpscal016Mapper.selectpopMpscal016(paramMap);
            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    
    @Override
    public JSONObject checkDataMpscal016(EgovMapForNull paramMap, StringBuffer strBfReq) {
        try {
            System.out.println("paramMap : " + paramMap.toString() );

            Mpscal016 entity = new Mpscal016();
            String setParamString1[] = strBfReq.toString().split("[|]");
            

            System.out.println("setParamString1.length : " + setParamString1.length);
            
            List<EgovMapForNull> list = new ArrayList<>();
            if(setParamString1.length > 0){
                for(int i = 0 ; i < setParamString1.length; i++){
                    String setParamString2[] = setParamString1[i].split(",");
                    
                    EgovMapForNull edit_entity = new EgovMapForNull();
                    
                    edit_entity.put("pymntSn", setParamString2[0]);
                    edit_entity.put("applcYm", setParamString2[1]);
                    edit_entity.put("salarytyCode", setParamString2[2]);
                    edit_entity.put("salaryitemCode", setParamString2[3]);
                    edit_entity.put("empno", setParamString2[4]);
                    edit_entity.put("korNm", setParamString2[5]);
                    edit_entity.put("pymntAmt", setParamString2[6]);
                    edit_entity.put("rm", setParamString2[7]);
                    //edit_entity.put("pymntDe", setParamString2[8]);
                    
                    List<EgovMapForNull> list_sub = mpscal016Mapper.checkDataMpscal016(edit_entity);
                    for (EgovMapForNull list_sub_Own : list_sub) {
                        if(list_sub_Own.getValue(0).toString().equals("1")) {
                            edit_entity.put("pymntSn", list_sub_Own.getValue(1).toString());
                        } else if(list_sub_Own.getValue(0).toString().equals("2")) {
                            edit_entity.put("applcYm", list_sub_Own.getValue(1).toString());
                        } else if(list_sub_Own.getValue(0).toString().equals("3")) {
                            edit_entity.put("salarytyCode", list_sub_Own.getValue(1).toString());
                        } else if(list_sub_Own.getValue(0).toString().equals("4")) {
                            edit_entity.put("salaryitemCode", list_sub_Own.getValue(1).toString());
                        } else if(list_sub_Own.getValue(0).toString().equals("5")) {
                            edit_entity.put("empno", list_sub_Own.getValue(1).toString());
                        } else if(list_sub_Own.getValue(0).toString().equals("6")) {
                            edit_entity.put("korNm", list_sub_Own.getValue(1).toString());
                        } else if(list_sub_Own.getValue(0).toString().equals("7")) {
                            edit_entity.put("pymntAmt", list_sub_Own.getValue(1).toString());
                        } else if(list_sub_Own.getValue(0).toString().equals("8")) {
                            edit_entity.put("rm", list_sub_Own.getValue(1).toString());
                        }
//                        else if(list_sub_Own.getValue(0).toString().equals("9")) {
//                            edit_entity.put("pymntDe", list_sub_Own.getValue(1).toString());
//                        } 
                    };
                    
                    list.add(edit_entity);
               }
            }
            
            entity.setRecords(list);
                
                
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

}
