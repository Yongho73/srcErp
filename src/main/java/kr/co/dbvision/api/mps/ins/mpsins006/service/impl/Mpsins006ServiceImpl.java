package kr.co.dbvision.api.mps.ins.mpsins006.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.mps.ins.mpsins006.entity.Mpsins006;
import kr.co.dbvision.api.mps.ins.mpsins006.service.Mpsins006Service;
import kr.co.dbvision.api.mps.ins.mpsins006.service.mapper.Mpsins006Mapper;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 사회보험보수월액관리에 관한 서비스 구현 클래스
 *
 * @author 디비비전
 * @since 2020.07.22
 * @version 1.0
 * @sourceGen version 2020.06.29.01 (2020.07.22)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.07.22          디비비전              최초 생성
 * </pre>
 */
@Service("Mpsins006Service")
@Transactional
public class Mpsins006ServiceImpl extends EgovAbstractServiceImpl implements Mpsins006Service {

    Logger logger = LogManager.getLogger(Mpsins006ServiceImpl.class);

    @Resource(name="Mpsins006Mapper")
    private Mpsins006Mapper mpsins006Mapper;

    private int listRowNumber = 0; // 넘버링 

    public Mpsins006ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchMpsins006(EgovMapForNull paramMap) {
        try {

            Mpsins006 entity = new Mpsins006(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = mpsins006Mapper.selectMpsins006List(paramMap).stream().map(mapper -> {
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
    public List<EgovMapForNull> searchMpsins006ForExcel(EgovMapForNull paramMap) {

        return mpsins006Mapper.selectMpsins006List(paramMap);
    }

    @Override
    public JSONObject findMpsins006(EgovMapForNull paramMap) {
        try {

            Mpsins006 entity = new Mpsins006(mpsins006Mapper.selectMpsins006(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject saveMpsins006(EgovMapForNull paramMap) throws Exceptions {

        try {

            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            Mpsins006 entity = null;

            for(String ids : idsArr) {

                entity = new Mpsins006(paramMap, ids);

                switch(entity.getNativeeditorStatus()) {
                case "deleted":

                    mpsins006Mapper.deleteMpsins006(entity);
                    break;

                default:

                    mpsins006Mapper.saveMpsins006(entity);
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
    public JSONObject findMpsinsSUM(EgovMapForNull paramMap) { 
        try {
            Mpsins006 entity = new Mpsins006(paramMap);
            List<EgovMapForNull> list = mpsins006Mapper.findMpsinsSUM(paramMap);
            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }
    
    @Override
    public JSONObject checkDataMpsins006(EgovMapForNull paramMap, StringBuffer strBfReq) {
        try {
            System.out.println("paramMap : " + paramMap.toString() );

            Mpsins006 entity = new Mpsins006();
            String setParamString1[] = strBfReq.toString().split("[|]");
            

            System.out.println("setParamString1.length : " + setParamString1.length);
            
            List<EgovMapForNull> list = new ArrayList<>();
            if(setParamString1.length > 0){
                for(int i = 0 ; i < setParamString1.length; i++){
                    String setParamString2[] = setParamString1[i].split(",");
                    
                    EgovMapForNull edit_entity = new EgovMapForNull();
                    
                    edit_entity.put("empno", setParamString2[0]);
                    edit_entity.put("npnAcqsDe", setParamString2[1]);
                    edit_entity.put("npnLabrrAmt", setParamString2[2]);
                    edit_entity.put("npnBprprrAmt", setParamString2[3]);
                    edit_entity.put("marmNpnAmt", setParamString2[4]);
                    edit_entity.put("hlthinsAcqsDe", setParamString2[5]);
                    edit_entity.put("healthLabrrAmt", setParamString2[6]);
                    edit_entity.put("healthBprprrAmt", setParamString2[7]);
                    edit_entity.put("ltciRdcxptAt", setParamString2[8]);
                    edit_entity.put("rcperLabrrAmt", setParamString2[9]);
                    edit_entity.put("rcperBprprrAmt", setParamString2[10]);
                    edit_entity.put("marmHisrAmt", setParamString2[11]);
                    edit_entity.put("episAcqsDe", setParamString2[12]);
                    edit_entity.put("laborLabrrAmt", setParamString2[13]);
                    edit_entity.put("laborBprprrAmt", setParamString2[14]);
                    edit_entity.put("iaciBprprrAmt", setParamString2[15]);
                    edit_entity.put("marmEpisAmt", setParamString2[16]);
                    
                    List<EgovMapForNull> list_sub = mpsins006Mapper.checkDataMpsins006(edit_entity);
                    for (EgovMapForNull list_sub_Own : list_sub) {
                        if(list_sub_Own.getValue(0).toString().equals("1")) {
                            edit_entity.put("empno", list_sub_Own.getValue(1).toString());
                        } else if(list_sub_Own.getValue(0).toString().equals("2")) {
                            edit_entity.put("npnAcqsDe", list_sub_Own.getValue(1).toString());
                        } else if(list_sub_Own.getValue(0).toString().equals("3")) {
                            edit_entity.put("npnLabrrAmt", list_sub_Own.getValue(1).toString());
                        } else if(list_sub_Own.getValue(0).toString().equals("4")) {
                            edit_entity.put("npnBprprrAmt", list_sub_Own.getValue(1).toString());
                        } else if(list_sub_Own.getValue(0).toString().equals("5")) {
                            edit_entity.put("marmNpnAmt", list_sub_Own.getValue(1).toString());
                        } else if(list_sub_Own.getValue(0).toString().equals("6")) {
                            edit_entity.put("hlthinsAcqsDe", list_sub_Own.getValue(1).toString());
                        } else if(list_sub_Own.getValue(0).toString().equals("7")) {
                            edit_entity.put("healthLabrrAmt", list_sub_Own.getValue(1).toString());
                        } else if(list_sub_Own.getValue(0).toString().equals("8")) {
                            edit_entity.put("healthBprprrAmt", list_sub_Own.getValue(1).toString());
                        } else if(list_sub_Own.getValue(0).toString().equals("9")) {
                            edit_entity.put("ltciRdcxptAt", list_sub_Own.getValue(1).toString());
                        } else if(list_sub_Own.getValue(0).toString().equals("10")) {
                            edit_entity.put("rcperLabrrAmt", list_sub_Own.getValue(1).toString());
                        } else if(list_sub_Own.getValue(0).toString().equals("11")) {
                            edit_entity.put("rcperBprprrAmt", list_sub_Own.getValue(1).toString());
                        } else if(list_sub_Own.getValue(0).toString().equals("12")) {
                            edit_entity.put("marmHisrAmt", list_sub_Own.getValue(1).toString());
                        } else if(list_sub_Own.getValue(0).toString().equals("13")) {
                            edit_entity.put("episAcqsDe", list_sub_Own.getValue(1).toString());
                        } else if(list_sub_Own.getValue(0).toString().equals("14")) {
                            edit_entity.put("laborLabrrAmt", list_sub_Own.getValue(1).toString());
                        } else if(list_sub_Own.getValue(0).toString().equals("15")) {
                            edit_entity.put("laborBprprrAmt", list_sub_Own.getValue(1).toString());
                        } else if(list_sub_Own.getValue(0).toString().equals("16")) {
                            edit_entity.put("iaciBprprrAmt", list_sub_Own.getValue(1).toString());
                        } else if(list_sub_Own.getValue(0).toString().equals("17")) {
                            edit_entity.put("marmEpisAmt", list_sub_Own.getValue(1).toString());
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
