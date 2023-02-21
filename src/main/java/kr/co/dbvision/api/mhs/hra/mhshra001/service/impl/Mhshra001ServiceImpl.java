package kr.co.dbvision.api.mhs.hra.mhshra001.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;
import kr.co.dbvision.api.mhs.hra.mhshra001.entity.Mhshra001;
import kr.co.dbvision.api.mhs.hra.mhshra001.service.Mhshra001Service;
import kr.co.dbvision.api.mhs.hra.mhshra001.service.mapper.Mhshra001Mapper;
import kr.co.dbvision.api.stm.bsc.stmbsc006.service.Stmbsc006Service;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.EgovPage;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import net.sf.json.JSONObject;

/**
 * 인사발령관리에 관한 서비스 구현 클래스
 *
 * @author 디비비전
 * @since 2020.06.16
 * @version 1.0
 * @sourceGen version 2020.06.11.02 (2020.06.16)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.06.16          디비비전              최초 생성
 * </pre>
 */
@Service("Mhshra001Service")
@Transactional
public class Mhshra001ServiceImpl extends EgovAbstractServiceImpl implements Mhshra001Service {

    Logger logger = LogManager.getLogger(Mhshra001ServiceImpl.class);

    @Resource(name="Mhshra001Mapper")
    private Mhshra001Mapper mhshra001Mapper;

    private int listRowNumber = 0; // 넘버링 
    
    private PaginationInfo paginationInfo;
    
    @Resource(name = "Stmbsc006Service")
    public Stmbsc006Service stmbsc006Service;

    public Mhshra001ServiceImpl() {
        //
    }
    
        @Override
        public JSONObject gnfdCodeData(EgovMapForNull paramMap) {
            try {

                Mhshra001 entity = new Mhshra001(paramMap);
                listRowNumber = 1;

                List<EgovMapForNull> list = mhshra001Mapper.gnfdCodeData(paramMap).stream().map(mapper -> {
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
    public JSONObject searchMhshra001(EgovMapForNull paramMap) {
        try {

            Mhshra001 entity = new Mhshra001(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = mhshra001Mapper.selectMhshra001List(paramMap).stream().map(mapper -> {
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
    public List<EgovMapForNull> searchMhshra001ForExcel(EgovMapForNull paramMap) {

        return mhshra001Mapper.selectMhshra001List(paramMap);
    }

    @Override
    public JSONObject findMhshra001(EgovMapForNull paramMap) {
        try {

            Mhshra001 entity = new Mhshra001(mhshra001Mapper.selectMhshra001(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject saveMhshra001(EgovMapForNull paramMap) {
        
        try {

            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            Mhshra001 entity = null;
            for(String ids : idsArr) {
                entity = new Mhshra001(paramMap, ids);

                switch(entity.getNativeeditorStatus()) {
                case "deleted":

                    mhshra001Mapper.deleteMhshra001(entity);
                    break;

                case "updated":
                    String UpnewNumber = "";
                    System.out.println("wow");
                    if (entity.getGnfdNo().equals("")) {
                        EgovMapForNull paramMap2 = new EgovMapForNull();
                        paramMap2.put("relTblNm", "MHS_GNFD");
                        paramMap2.put("relItemNm", "GNFD_NO");

                        JSONObject jsonObj = stmbsc006Service.selectCreateNumberStmbsc006(paramMap2);
                        UpnewNumber = jsonObj.get("data").toString();
                        
                        
                        entity.setGnfdNo(UpnewNumber); 
                    }
                    mhshra001Mapper.saveMhshra001(entity);
                    
                    break;
                case "inserted":
                    String newNumber = "";
                    
                    if (entity.getGnfdNo().equals("")) {
                        EgovMapForNull paramMap2 = new EgovMapForNull();
                        paramMap2.put("relTblNm", "MHS_GNFD");
                        paramMap2.put("relItemNm", "GNFD_NO");

                        JSONObject jsonObj = stmbsc006Service.selectCreateNumberStmbsc006(paramMap2);
                        newNumber = jsonObj.get("data").toString();
                        
                        
                        entity.setGnfdNo(newNumber); 
                    }
                    mhshra001Mapper.saveMhshra001(entity);
                    break;
                    
                default:
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
    
    
    @Override
    public JSONObject checkDataMhshra001(EgovMapForNull paramMap, StringBuffer strBfReq) {
        try {
            //System.out.println("paramMap : " + paramMap.toString() );

            Mhshra001 entity = new Mhshra001();
            String setParamString1[] = strBfReq.toString().split("[|]");
            
            //System.out.println("request : " + request);
            //System.out.println("setParamString1.length : " + setParamString1.length);
            
            List<EgovMapForNull> list = new ArrayList<>();
            //Mhshra001 edit_entity = null;
            if(setParamString1.length > 0){
                for(int i = 0 ; i < setParamString1.length; i++){
                    String setParamString2[] = setParamString1[i].split(",");
                    
                    EgovMapForNull edit_entity = new EgovMapForNull();
                    
                    edit_entity.put("empno", setParamString2[0]);
                    edit_entity.put("gnfdCode", setParamString2[1]);
                    edit_entity.put("gnfdDe", setParamString2[2]);
                    edit_entity.put("gnfdBeginDe", setParamString2[3]);
                    edit_entity.put("gnfdEndDe", setParamString2[4]);
                    edit_entity.put("afchgDeptCode", setParamString2[5]);
                    edit_entity.put("afchgClsfCode", setParamString2[6]);
                    edit_entity.put("afchgOfcpsCode", setParamString2[7]);
                    edit_entity.put("afchgJssfcCode", setParamString2[8]);
//                    edit_entity.put("afchgJblnCode", setParamString2[9]);
                    edit_entity.put("afchgSrclsCode", setParamString2[9]);
                    edit_entity.put("afchgRspofcCode", setParamString2[10]);
                    edit_entity.put("hdadptDeptCode", setParamString2[11]);
                    edit_entity.put("hdadptAt", setParamString2[12]);
                    edit_entity.put("gnfdDtls", setParamString2[13]);
                    edit_entity.put("sanctnDocNo", setParamString2[14]);
                    edit_entity.put("sanctnSttusCode", setParamString2[15]);
                    
                    
                    List<EgovMapForNull> list_sub = mhshra001Mapper.checkDataMhshra001(edit_entity);
                    for (EgovMapForNull list_sub_Own : list_sub) {
                        if(list_sub_Own.getValue(0).toString().equals("1")) {
                            edit_entity.put("empNm", list_sub_Own.getValue(1).toString());
                        } else if(list_sub_Own.getValue(0).toString().equals("2")) {
                            edit_entity.put("gnfdCodeNm", list_sub_Own.getValue(1).toString());
                        } else if(list_sub_Own.getValue(0).toString().equals("3")) {
                            edit_entity.put("clsfNm", list_sub_Own.getValue(1).toString());
                        } else if(list_sub_Own.getValue(0).toString().equals("4")) {
                            edit_entity.put("ofcpsNm", list_sub_Own.getValue(1).toString());
                        } else if(list_sub_Own.getValue(0).toString().equals("5")) {
                            edit_entity.put("rspofcNm", list_sub_Own.getValue(1).toString());
                        } else if(list_sub_Own.getValue(0).toString().equals("6")) {
                            edit_entity.put("deptKorNm", list_sub_Own.getValue(1).toString());
                        } else if(list_sub_Own.getValue(0).toString().equals("7")) {
                            edit_entity.put("srclsCodeNm", list_sub_Own.getValue(1).toString());
                        } else if(list_sub_Own.getValue(0).toString().equals("8")) {
                            edit_entity.put("jssfcCodeNm", list_sub_Own.getValue(1).toString());
                        } 
                        else if(list_sub_Own.getValue(0).toString().equals("10")) {
                            edit_entity.put("bfchgClsfCode", list_sub_Own.getValue(1).toString());
                        } else if(list_sub_Own.getValue(0).toString().equals("11")) {
                            edit_entity.put("bfchgSrclsCode", list_sub_Own.getValue(1).toString());
                        } else if(list_sub_Own.getValue(0).toString().equals("12")) {
                            edit_entity.put("bfchgOfcpsCode", list_sub_Own.getValue(1).toString());
                        } else if(list_sub_Own.getValue(0).toString().equals("13")) {
                            if(list_sub_Own.getValue(1).toString() != null || list_sub_Own.getValue(1).toString() !="") {
                                edit_entity.put("bfchgJssfcCode", list_sub_Own.getValue(1).toString());
                            }
                        } else if(list_sub_Own.getValue(0).toString().equals("14")) {
                            edit_entity.put("bfchgRspofcCode", list_sub_Own.getValue(1).toString());
                        } else if(list_sub_Own.getValue(0).toString().equals("15")) {
                            edit_entity.put("bfchgDeptCode", list_sub_Own.getValue(1).toString());
                        } else if(list_sub_Own.getValue(0).toString().equals("16")) {
                            edit_entity.put("bfchgDeptCodeNm", list_sub_Own.getValue(1).toString());
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
 
    //승급대상자 조회
    @Override
    public JSONObject searchAdvanEmpMhshra001(EgovMapForNull paramMap) {
        try {

            Mhshra001 entity = new Mhshra001(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = mhshra001Mapper.searchAdvanEmpMhshra001(paramMap).stream().map(mapper -> {
                    mapper.put("num", listRowNumber++);
                    return mapper;
            }).collect(Collectors.toList());

            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }
}
