package kr.co.dbvision.api.mps.cal.mpscal026.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.mps.cal.mpscal026.entity.Mpscal026;
import kr.co.dbvision.api.mps.cal.mpscal026.service.Mpscal026Service;
import kr.co.dbvision.api.mps.cal.mpscal026.service.mapper.Mpscal026Mapper;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 통상임금관리관리에 관한 서비스 구현 클래스
 *
 * @author 디비비전
 * @since 2020.08.19
 * @version 1.0
 * @sourceGen version 2020.06.29.01 (2020.08.19)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.08.19          디비비전              최초 생성
 * </pre>
 */
@Service("Mpscal026Service")
@Transactional
public class Mpscal026ServiceImpl extends EgovAbstractServiceImpl implements Mpscal026Service {

    Logger logger = LogManager.getLogger(Mpscal026ServiceImpl.class);

    @Resource(name="Mpscal026Mapper")
    private Mpscal026Mapper mpscal026Mapper;

    private int listRowNumber = 0; // 넘버링 

    public Mpscal026ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchMpscal026(EgovMapForNull paramMap) {
        try {

            Mpscal026 entity = new Mpscal026(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = mpscal026Mapper.selectMpscal026List(paramMap).stream().map(mapper -> {
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
    public JSONObject searchMpscal026Title(EgovMapForNull paramMap) {
        try {

            Mpscal026 entity = new Mpscal026(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = mpscal026Mapper.selectMpscal026TitleList(paramMap).stream().map(mapper -> {
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
    public List<EgovMapForNull> searchMpscal026ForExcel(EgovMapForNull paramMap) {       
        return mpscal026Mapper.selectMpscal026List(paramMap);
    }

    @Override
    public JSONObject findMpscal026(EgovMapForNull paramMap) {
        try {

            Mpscal026 entity = new Mpscal026(mpscal026Mapper.selectMpscal026(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject saveMpscal026(EgovMapForNull paramMap) throws Exceptions {

        try {

            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            System.out.println("saveMpscal026>>>>>>>>>>>>>" +  idsArr);
            String paramName = "";
            String sApplyYm = "";
            String sEmpno = "";
            String salaryitemCode  = "";
            
            Mpscal026 entity = new Mpscal026();
            String sRegId = "000000";
            
            System.out.println("paramMap.size()" + paramMap.size());
            for(int i = 0; i < paramMap.size();i++) {
                //System.out.println("paramMap" + paramMap.get(i).toString());
                //System.out.println("paramMap val" + paramMap.getValue(i).toString());
                paramName = paramMap.get(i).toString();
                if(paramName.toLowerCase().toString().indexOf("applcym") >0) {
                    sApplyYm = paramMap.getValue(i).toString();
                }
                if(paramName.toLowerCase().toString().indexOf("empno") >0) {
                    sEmpno = paramMap.getValue(i).toString();
                }
                //저장
                if(paramName.toLowerCase().toString().indexOf("'") >0) {                    
                    salaryitemCode =  paramName.substring(paramName.toLowerCase().toString().indexOf("'")+1, paramName.length()-1);                    
                    salaryitemCode  = salaryitemCode.toUpperCase();
                    entity.setApplcYm(sApplyYm);                
                    entity.setSalaryitemCode(salaryitemCode);
                    entity.setEmpno(sEmpno);
                    entity.setAmt(paramMap.getValue(i).toString());
                    entity.setRegId(sRegId);
                    entity.setUptId(sRegId);
                    mpscal026Mapper.saveMpscal026(entity);                                        
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
    public JSONObject searchMpscal026OdysgCalc(EgovMapForNull paramMap) {
        try {

            Mpscal026 entity = new Mpscal026(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = mpscal026Mapper.selectMpscal026OdysgCalc(paramMap).stream().map(mapper -> {
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
