package kr.co.dbvision.api.mhs.hrm.mhshrm009.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.mhs.hrm.mhshrm009.entity.Mhshrm009;
import kr.co.dbvision.api.mhs.hrm.mhshrm009.service.Mhshrm009Service;
import kr.co.dbvision.api.mhs.hrm.mhshrm009.service.mapper.Mhshrm009Mapper;
import kr.co.dbvision.api.stm.bsc.stmbsc006.service.Stmbsc006Service;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 자격증코드관리에 관한 서비스 구현 클래스
 *
 * @author 디비비전
 * @since 2020.08.03
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.08.03)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.08.03          디비비전              최초 생성
 * </pre>
 */
@Service("Mhshrm009Service")
@Transactional
public class Mhshrm009ServiceImpl extends EgovAbstractServiceImpl implements Mhshrm009Service {

    Logger logger = LogManager.getLogger(Mhshrm009ServiceImpl.class);

    @Resource(name="Mhshrm009Mapper")
    private Mhshrm009Mapper mhshrm009Mapper;
    
    @Resource(name="Stmbsc006Service")
    public Stmbsc006Service stmbsc006Service;   

    private int listRowNumber = 0; // 넘버링 

    public Mhshrm009ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchMhshrm009(EgovMapForNull paramMap) {
        try {

            Mhshrm009 entity = new Mhshrm009(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = mhshrm009Mapper.selectMhshrm009List(paramMap).stream().map(mapper -> {
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
    public List<EgovMapForNull> searchMhshrm009ForExcel(EgovMapForNull paramMap) {

        return mhshrm009Mapper.selectMhshrm009ListForExcel(paramMap);
    }

    @Override
    public JSONObject findMhshrm009(EgovMapForNull paramMap) {
        try {

            Mhshrm009 entity = new Mhshrm009(mhshrm009Mapper.selectMhshrm009(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject saveMhshrm009(EgovMapForNull paramMap) throws Exceptions {

        try {

            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            Mhshrm009 entity = null;
            
            System.out.println(paramMap);

            for(String ids : idsArr) {

                entity = new Mhshrm009(paramMap, ids);
                
                String newNumber ="";
                
                String regId = entity.getRegId();
                entity.setRegId(regId);
                String uptId = entity.getUptId();
                entity.setUptId(uptId);
                
                
                if(entity.getCrqfsCodeNo().equals("자동입력") || entity.getCrqfsCodeNo().equals("")) {
                    //paramMap.put("relTblNm",  "MHS_QUALFALLWNC");
                    //paramMap.put("relItemNm", "CRQFS_REGIST_NO");
                    paramMap.put("relTblNm",  "MHS_CRQFS_CODE");
                    paramMap.put("relItemNm", "CRQFS_CODE_NO");
                   
                    JSONObject  jsonObj = stmbsc006Service.selectCreateNumberStmbsc006(paramMap); 
                    newNumber = jsonObj.get("data").toString();
                    
                    entity.setCrqfsCodeNo(newNumber);
                    
                }

                switch(entity.getNativeeditorStatus()) {
                case "deleted":

                    mhshrm009Mapper.deleteMhshrm009(entity);
                    break;

                default:
                    System.out.println("왜 안되는데?");
                    mhshrm009Mapper.saveMhshrm009(entity);
                    System.out.println("?????");
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
    public JSONObject searchMhshrm009Crqfs(EgovMapForNull paramMap) {
        try {

            Mhshrm009 entity = new Mhshrm009(paramMap);
            List<EgovMapForNull> list = mhshrm009Mapper.selectMhshrm009Crqfs(paramMap);
            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @Override
    public JSONObject checkDeleteMhshrm009(EgovMapForNull paramMap) {
        try {

            Mhshrm009 entity = new Mhshrm009(mhshrm009Mapper.checkDeleteMhshrm009(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

}
