package kr.co.dbvision.api.mps.ins.mpsins001.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.mps.ins.mpsins001.entity.Mpsins001;
import kr.co.dbvision.api.mps.ins.mpsins001.service.Mpsins001Service;
import kr.co.dbvision.api.mps.ins.mpsins001.service.mapper.Mpsins001Mapper;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 사회보험월별납부관리에 관한 서비스 구현 클래스
 *
 * @author 디비비전
 * @since 2020.08.11
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.08.11)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.08.11          디비비전              최초 생성
 * </pre>
 */
@Service("Mpsins001Service")
@Transactional
public class Mpsins001ServiceImpl extends EgovAbstractServiceImpl implements Mpsins001Service {

    Logger logger = LogManager.getLogger(Mpsins001ServiceImpl.class);

    @Resource(name="Mpsins001Mapper")
    private Mpsins001Mapper mpsins001Mapper;

    private int listRowNumber = 0; // 넘버링 

    public Mpsins001ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchMpsins001(EgovMapForNull paramMap) {
        try {

            Mpsins001 entity = new Mpsins001(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = mpsins001Mapper.selectMpsins001List(paramMap).stream().map(mapper -> {
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
    public List<EgovMapForNull> searchMpsins001ForExcel(EgovMapForNull paramMap) {

        return mpsins001Mapper.selectMpsins001List(paramMap);
    }

    @Override
    public JSONObject findMpsins001(EgovMapForNull paramMap) {
        try {

            Mpsins001 entity = new Mpsins001(mpsins001Mapper.selectMpsins001(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject saveMpsins001(EgovMapForNull paramMap) throws Exceptions {

        try {

            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            Mpsins001 entity = null;

            for(String ids : idsArr) {

                entity = new Mpsins001(paramMap, ids);

                switch(entity.getNativeeditorStatus()) {
                case "deleted":

                    mpsins001Mapper.deleteMpsins001(entity);
                    break;

                default:

                    mpsins001Mapper.saveMpsins001(entity);
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
    public JSONObject checkDataMpsins001(EgovMapForNull paramMap, StringBuffer strBfReq) {
        try {
            System.out.println("paramMap : " + paramMap.toString() );

            Mpsins001 entity = new Mpsins001();
            String setParamString1[] = strBfReq.toString().split("[|]");
            

            System.out.println("setParamString1.length : " + setParamString1.length);
            
            List<EgovMapForNull> list = new ArrayList<>();
            if(setParamString1.length > 0){
                for(int i = 0 ; i < setParamString1.length; i++){
                    String setParamString2[] = setParamString1[i].split(",");
                    
                    EgovMapForNull edit_entity = new EgovMapForNull();
                    
                    edit_entity.put("applcYm", setParamString2[0]);
                    edit_entity.put("ddcDe", setParamString2[1]);
                    edit_entity.put("empno", setParamString2[2]);
                    edit_entity.put("npnAmt", setParamString2[3]);
                    edit_entity.put("hlthinsAmt", setParamString2[4]);
                    edit_entity.put("hlthinsExcclcAmt", setParamString2[5]);
                    edit_entity.put("beyearHlthinsExcclcAmt", setParamString2[6]);
                    edit_entity.put("episAmt", setParamString2[7]);
                    edit_entity.put("episExcclcAmt", setParamString2[8]);
                    edit_entity.put("beyearEpisExcclcAmt", setParamString2[9]);
                    edit_entity.put("ltciAmt", setParamString2[10]);
                    edit_entity.put("ltciExcclcAmt", setParamString2[11]);
                    edit_entity.put("beyearLtciExcclcAmt", setParamString2[12]);
                    edit_entity.put("iaciAmt", setParamString2[13]);
                    
                    List<EgovMapForNull> list_sub = mpsins001Mapper.checkDataMpsins001(edit_entity);
                    for (EgovMapForNull list_sub_Own : list_sub) {
                        if(list_sub_Own.getValue(0).toString().equals("1")) {
                            edit_entity.put("applcYm", list_sub_Own.getValue(1).toString());
                        } else if(list_sub_Own.getValue(0).toString().equals("2")) {
                            edit_entity.put("ddcDe", list_sub_Own.getValue(1).toString());
                        } else if(list_sub_Own.getValue(0).toString().equals("3")) {
                            edit_entity.put("empno", list_sub_Own.getValue(1).toString());
                        } else if(list_sub_Own.getValue(0).toString().equals("4")) {
                            edit_entity.put("npnAmt", list_sub_Own.getValue(1).toString());
                        } else if(list_sub_Own.getValue(0).toString().equals("5")) {
                            edit_entity.put("hlthinsAmt", list_sub_Own.getValue(1).toString());
                        } else if(list_sub_Own.getValue(0).toString().equals("6")) {
                            edit_entity.put("hlthinsExcclcAmt", list_sub_Own.getValue(1).toString());
                        } else if(list_sub_Own.getValue(0).toString().equals("7")) {
                            edit_entity.put("beyearHlthinsExcclcAmt", list_sub_Own.getValue(1).toString());
                        } else if(list_sub_Own.getValue(0).toString().equals("8")) {
                            edit_entity.put("episAmt", list_sub_Own.getValue(1).toString());
                        } else if(list_sub_Own.getValue(0).toString().equals("9")) {
                            edit_entity.put("episExcclcAmt", list_sub_Own.getValue(1).toString());
                        } else if(list_sub_Own.getValue(0).toString().equals("10")) {
                            edit_entity.put("beyearEpisExcclcAmt", list_sub_Own.getValue(1).toString());
                        } else if(list_sub_Own.getValue(0).toString().equals("11")) {
                            edit_entity.put("ltciAmt", list_sub_Own.getValue(1).toString());
                        } else if(list_sub_Own.getValue(0).toString().equals("12")) {
                            edit_entity.put("ltciExcclcAmt", list_sub_Own.getValue(1).toString());
                        } else if(list_sub_Own.getValue(0).toString().equals("13")) {
                            edit_entity.put("beyearLtciExcclcAmt", list_sub_Own.getValue(1).toString());
                        } else if(list_sub_Own.getValue(0).toString().equals("14")) {
                            edit_entity.put("iaciAmt", list_sub_Own.getValue(1).toString());
                        } 
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
