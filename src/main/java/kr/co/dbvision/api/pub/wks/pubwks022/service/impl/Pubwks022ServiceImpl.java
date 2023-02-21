package kr.co.dbvision.api.pub.wks.pubwks022.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.pub.wks.pubwks022.entity.Pubwks022;
import kr.co.dbvision.api.pub.wks.pubwks022.service.Pubwks022Service;
import kr.co.dbvision.api.pub.wks.pubwks022.service.mapper.Pubwks022Mapper;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 개인휴무신청관리에 관한 서비스 구현 클래스
 *
 * @author 디비비전
 * @since 2020.09.02
 * @version 1.0
 * @sourceGen version 2020.09.02.01 (2020.09.02)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.09.02          디비비전              최초 생성
 * </pre>
 */
@Service("Pubwks022Service")
@Transactional
public class Pubwks022ServiceImpl extends EgovAbstractServiceImpl implements Pubwks022Service {

    Logger logger = LogManager.getLogger(Pubwks022ServiceImpl.class);

    @Resource(name="Pubwks022Mapper")
    private Pubwks022Mapper pubwks022Mapper;

    private int listRowNumber = 0; // 넘버링 
    private int idx = 0;
    
    public Pubwks022ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchPubwks022(EgovMapForNull paramMap) {
        try {

            Pubwks022 entity = new Pubwks022(paramMap);

            List<EgovMapForNull> list = pubwks022Mapper.selectPubwks022List(paramMap);

            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }
    
    @Override
    public JSONObject searchEmpPubwks022(EgovMapForNull paramMap) {
        try {
            List<String> empnoArr = new ArrayList<String>();
            List<EgovMapForNull> indvdHvofSttusList = new ArrayList<EgovMapForNull>();
            EgovMapForNull emp = new EgovMapForNull();
            Pubwks022 entity = new Pubwks022(paramMap);
            listRowNumber = 1;
            idx = 0;
            List<EgovMapForNull> indvdHvofList = pubwks022Mapper.selectEmpnoElctsctSeSnPubwks022(paramMap);// 개인휴무신청 테이블 검색조건에 해당하는 대상자들 조회 (사원번호 , 휴무년월)
            
            for(EgovMapForNull empno : indvdHvofList) {
                empno.put("elctsctSttusCode",paramMap.get("elctsctSttusCode"));
                emp = pubwks022Mapper.selectElctsctSttusCodePubwks022(empno); // 최대 구분순번 및 검색조건의 전자결재상테 에 맞는 대상을 구하기 위함
                if(emp != null) {
                    indvdHvofSttusList.add(emp);      
                }
            }
            
            for(EgovMapForNull empno : indvdHvofSttusList) {
                empnoArr.add((String) empno.get("empno")); // 개인휴무신청 테이블에서 페이지 검색조건에 해당하는 사원들 배열 처리 (EMP테이블 조회 시 EMP_NO IN 조건)
            }
            
            paramMap.put("empnoArr",empnoArr);
            List<EgovMapForNull> list = pubwks022Mapper.selectEmpListPubwks022(paramMap).stream().map(mapper->{
                mapper.put("num", listRowNumber++);
                mapper.put("elctsctSttusCode" , (String) indvdHvofSttusList.get(idx).get("elctsctSttusCode"));
                mapper.put("elctsctSttusCodeNm" , (String) indvdHvofSttusList.get(idx).get("elctsctSttusCodeNm"));
                mapper.put("elctsctSeSn" , (String) indvdHvofSttusList.get(idx++).get("elctsctSeSn"));
                return mapper;
            }).collect(Collectors.toList());

//            System.out.println("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" + indvdHvofSttusList);
//            System.out.println("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb" + list);
//            
            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }
    
    @Override
    public List<EgovMapForNull> searchPubwks022ForExcel(EgovMapForNull paramMap) {

        return pubwks022Mapper.selectPubwks022List(paramMap);
    }

    @Override
    public JSONObject findPubwks022(EgovMapForNull paramMap) {
        try {

            Pubwks022 entity = new Pubwks022(pubwks022Mapper.selectPubwks022(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject savePubwks022(EgovMapForNull paramMap) throws Exceptions {

        try {
            Pubwks022 entity = new Pubwks022(paramMap);

            pubwks022Mapper.savePubwks022(entity);

            EgovMapForNull returnMap = new EgovMapForNull();

            returnMap.put("code", "000");
            returnMap.put("message", "SUCCESS");

            return new JsonMsgMng().makeJsonObject(returnMap);

        } catch (Exception e) {
            throw e;
        }
    }
    
    @Override
    public JSONObject saveBundlePubwks022(EgovMapForNull paramMap) throws Exceptions {
        try {
            int count;
            Pubwks022 entity = new Pubwks022(paramMap);
            EgovMapForNull returnMap = new EgovMapForNull();
            
            List<EgovMapForNull> jobDeList = pubwks022Mapper.selectJobDeForBundleSave(paramMap);
            for(EgovMapForNull jobDe : jobDeList) {
                entity.setHvofDe((String)jobDe.get("jobDe"));
                entity.setWdayCode((String)jobDe.get("deSeCode"));
                count = pubwks022Mapper.bundleSaveBeforeCheckSttusCode(entity);
                if(count > 0) {
                    
                }
                else {
                    pubwks022Mapper.savePubwks022(entity);
                }
            }
            return new JsonMsgMng().makeJsonObject(returnMap);

        } catch (Exception e) {
            throw e;
        }
    }
    
    @Override
    public JSONObject bundleSttusUpdatePubwks022(EgovMapForNull paramMap) throws Exceptions {
        try {
            Pubwks022 entity = new Pubwks022(paramMap);
            List<Map<String, String>> objectArr = (List<Map<String, String>>) paramMap.get("objectArr");
            for(Map<String,String> map : objectArr) {
                entity.setEmpno((String) map.get("empno"));
                entity.setElctsctSeSn((String) map.get("elctsctSeSn"));
                pubwks022Mapper.updateBundleSttusPubwks022(entity);
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
    public JSONObject sttusUpdatePubwks022(EgovMapForNull paramMap) throws Exceptions {
        try {
            EgovMapForNull returnMap = new EgovMapForNull();

            int sesnCheck = pubwks022Mapper.copyBeforeElctsctSeSnCheck(paramMap);
            if(sesnCheck > 0) {
                returnMap.put("code", "999");
                returnMap.put("message", "요청 한 구분 순번 보다 높은 구분 순번이 존재합니다.");
            }
            else {
                Pubwks022 entity = new Pubwks022(paramMap);
                pubwks022Mapper.updateBundleSttusPubwks022(entity);
                returnMap.put("code", "000");
                returnMap.put("message", "SUCCESS");
            }
            
            return new JsonMsgMng().makeJsonObject(returnMap);
        } catch (Exception e) {
            throw e;
        }
    }
    
    @Override
    public JSONObject deletePubwks022(EgovMapForNull paramMap) throws Exceptions {
        try {
            Pubwks022 entity = new Pubwks022(paramMap);
            
            pubwks022Mapper.deletePubwks022(entity);
            
            EgovMapForNull returnMap = new EgovMapForNull();
            returnMap.put("code", "000");
            returnMap.put("message", "SUCCESS");
            
            return new JsonMsgMng().makeJsonObject(returnMap);
        }
        catch(Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject makeCalendar(EgovMapForNull paramMap) {
        try {
            List<EgovMapForNull> calendar = new ArrayList<EgovMapForNull>();
            
            calendar = pubwks022Mapper.selectCalendar(paramMap);
            
            Pubwks022 entity = new Pubwks022();
            entity.setRecords(calendar);
            return new JsonMsgMng().makeJsonObject(entity);
        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject copyPubwks022(EgovMapForNull paramMap) throws Exceptions {
        
        EgovMapForNull returnMap = new EgovMapForNull();
        
        int sesnCheck = pubwks022Mapper.copyBeforeElctsctSeSnCheck(paramMap);
        if(sesnCheck > 0) {
            returnMap.put("code", "999");
            returnMap.put("message", "복사 요청 한 구분 순번 보다 높은 구분 순번이 존재합니다.");
        }
        else {
            pubwks022Mapper.copyPubwks022(paramMap);
            returnMap.put("code", "000");
            returnMap.put("message", "SUCCESS");
        }
        
        return new JsonMsgMng().makeJsonObject(returnMap);
        
    }

}
