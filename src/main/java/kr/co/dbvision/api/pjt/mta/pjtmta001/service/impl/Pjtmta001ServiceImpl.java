package kr.co.dbvision.api.pjt.mta.pjtmta001.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.pjt.mta.pjtmta001.entity.Pjtmta001;
import kr.co.dbvision.api.pjt.mta.pjtmta001.service.Pjtmta001Service;
import kr.co.dbvision.api.pjt.mta.pjtmta001.service.mapper.Pjtmta001Mapper;
import kr.co.dbvision.lib.Debug;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 유지보수요청관리에 관한 서비스 구현 클래스
 *
 * @author 디비비전
 * @since 2020.08.06
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.08.06)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.08.06          디비비전              최초 생성
 * </pre>
 */
@Service("Pjtmta001Service")
@Transactional
public class Pjtmta001ServiceImpl extends EgovAbstractServiceImpl implements Pjtmta001Service {

    Logger logger = LogManager.getLogger(Pjtmta001ServiceImpl.class);

    @Resource(name="Pjtmta001Mapper")
    private Pjtmta001Mapper pjtmta001Mapper;

    private int listRowNumber = 0; // 넘버링 

    public Pjtmta001ServiceImpl() {
        //
    }
    
    @Override
    public JSONObject searchPjtmta001Project(EgovMapForNull paramMap) {
        try {

            Pjtmta001 entity = new Pjtmta001(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = pjtmta001Mapper.selectPjtmta001ProjectList(paramMap).stream().map(mapper -> {
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
    public JSONObject searchPjtmta001(EgovMapForNull paramMap) {
        try {

            Pjtmta001 entity = new Pjtmta001(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = pjtmta001Mapper.selectPjtmta001List(paramMap).stream().map(mapper -> {
//                    mapper.put("num", listRowNumber++);
                    return mapper;
            }).collect(Collectors.toList());

            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }
    
    @Override
    public JSONObject searchPjtHnf(EgovMapForNull paramMap) {
        try {

            Pjtmta001 entity = new Pjtmta001(pjtmta001Mapper.searchPjtHnf(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject findPjtmta001(EgovMapForNull paramMap) {
        try {

            Pjtmta001 entity = new Pjtmta001(pjtmta001Mapper.selectPjtmta001(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }
    
    
    
    


    @Override
    public List<EgovMapForNull> searchPjtmta001ForExcel(EgovMapForNull paramMap) {

        return pjtmta001Mapper.selectPjtmta001ProjectList(paramMap);
    }

    @Override
    public JSONObject savePjtmta001(EgovMapForNull paramMap) throws Exceptions {

        try {

            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            Pjtmta001 entity = null;

            for(String ids : idsArr) {

                entity = new Pjtmta001(paramMap, ids);

                switch(entity.getNativeeditorStatus()) {
                case "deleted":

                    pjtmta001Mapper.deletePjtmta001(entity);
                    break;

                default:

                    pjtmta001Mapper.savePjtmta001(entity);
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
    public JSONObject savePjtMtaRequst(EgovMapForNull paramMap) {

        try {


            System.out.println("paramMap ::::::: "  + paramMap);
            pjtmta001Mapper.insertPjtMtaRequst(paramMap);
            
            EgovMapForNull returnMap = new EgovMapForNull();
            returnMap.put("code", "000");
            returnMap.put("message", "SUCCESS");

            return new JsonMsgMng().makeJsonObject(returnMap);
            
//            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    
    @Override
    public JSONObject modifyMtaRequst(EgovMapForNull paramMap) {

        try {

            pjtmta001Mapper.updateMtaRequst(paramMap);
            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    
    @Override
    public JSONObject removePjtMtaRequst(EgovMapForNull paramMap) {

        try {
        	pjtmta001Mapper.deletePjtMtaOpert(paramMap);
            pjtmta001Mapper.deletePjtMtaRequst(paramMap);

            EgovMapForNull returnMap = new EgovMapForNull();
            returnMap.put("code", "000");
            returnMap.put("message", "SUCCESS");

            return new JsonMsgMng().makeJsonObject(returnMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    
    @Override
    public JSONObject searchPjtmta001Opert(EgovMapForNull paramMap) {
        try {

            Pjtmta001 entity = new Pjtmta001(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = pjtmta001Mapper.selectPjtmta001OpertList(paramMap).stream().map(mapper -> {
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
    public JSONObject savePjtMtaOpert(EgovMapForNull paramMap) {

        try {
            System.out.println("paramMap ::::::: "  + paramMap);
            pjtmta001Mapper.insertPjtMtaOpert(paramMap);
            pjtmta001Mapper.updatePjtMtaSttus(paramMap);
            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    
    @Override
    public JSONObject findPjtmta001Opert(EgovMapForNull paramMap) {
        try {

            Pjtmta001 entity = new Pjtmta001(pjtmta001Mapper.selectPjtmta001Opert(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }
    
    @Override
    public JSONObject modifyPjtMtaOpert(EgovMapForNull paramMap) {

        try {

            pjtmta001Mapper.updatePjtMtaOpert(paramMap);
            pjtmta001Mapper.updatePjtMtaSttus(paramMap);
            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @Override
    public JSONObject removePjtMtaOpert(EgovMapForNull paramMap) {

        try {

            pjtmta001Mapper.deletePjtMtaOpert(paramMap);

            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    
    @Override
    public List<EgovMapForNull> findFilesMta(EgovMapForNull paramMap) throws Exceptions {
        try {
            
            String atchFiles = StringExpression.nullConvert(paramMap.get("atchFiles"));
            if(!StringExpression.isEmpty(atchFiles)) {
                
                String[] atchFileIdArr = atchFiles.split("\\|");
                
                
                paramMap.put("atchFileIdArr", atchFileIdArr);
                
                Debug.showMe(paramMap);
                
                return pjtmta001Mapper.selectFileInfosMta(paramMap);
                
            } else {
                
                return new ArrayList<EgovMapForNull>();             
            }
            
            
        } catch (Exception e) {
            throw new Exceptions(new Throwable(), e);
        }
    }
    
    @Override
    public JSONObject findPjtmta001Hnf(EgovMapForNull paramMap) {
        try {

            Pjtmta001 entity = new Pjtmta001(pjtmta001Mapper.selectPjtmta001Hnf(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

}
