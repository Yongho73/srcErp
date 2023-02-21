package kr.co.dbvision.api.stm.qes.stmqes001.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.stm.bsc.stmbsc006.service.Stmbsc006Service;
import kr.co.dbvision.api.stm.qes.stmqes001.entity.Stmqes001;
import kr.co.dbvision.api.stm.qes.stmqes001.entity.StmqesTrget;
import kr.co.dbvision.api.stm.qes.stmqes001.entity.StmqeustrnarCn;
import kr.co.dbvision.api.stm.qes.stmqes001.service.Stmqes001Service;
import kr.co.dbvision.api.stm.qes.stmqes001.service.mapper.Stmqes001Mapper;
import kr.co.dbvision.api.stm.qes.stmqes001.service.mapper.StmqesTrgetMapper;
import kr.co.dbvision.api.stm.qes.stmqes001.service.mapper.StmqeustrnarCnMapper;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 설문관리관리에 관한 서비스 구현 클래스
 *
 * @author 디비비전
 * @since 2020.09.04
 * @version 1.0
 * @sourceGen version 2020.08.06.01 (2020.09.04)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.09.04          디비비전              최초 생성
 * </pre>
 */
@Service("Stmqes001Service")
@Transactional
public class Stmqes001ServiceImpl extends EgovAbstractServiceImpl implements Stmqes001Service {

    Logger logger = LogManager.getLogger(Stmqes001ServiceImpl.class);

    @Resource(name="Stmqes001Mapper")
    private Stmqes001Mapper stmqes001Mapper;
    
    @Resource(name="StmqesTrgetMapper")
    private StmqesTrgetMapper stmqesTrgetMapper;
    
    @Resource(name="StmqeustrnarCnMapper")
    private StmqeustrnarCnMapper stmqeustrnarCnMapper;
    
    @Resource(name = "Stmbsc006Service")
    public Stmbsc006Service stmbsc006Service;

    private int listRowNumber = 0; // 넘버링 

    public Stmqes001ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchStmqes001(EgovMapForNull paramMap) {
        try {

            Stmqes001 entity = new Stmqes001(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = stmqes001Mapper.selectStmqes001List(paramMap).stream().map(mapper -> {
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
    public List<EgovMapForNull> searchStmqes001ForExcel(EgovMapForNull paramMap) {

        return stmqes001Mapper.selectStmqes001List(paramMap);
    }

    @Override
    public JSONObject findStmqes001(EgovMapForNull paramMap) {
        try {

            Stmqes001 entity = new Stmqes001(stmqes001Mapper.selectStmqes001(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject saveStmqes001(EgovMapForNull paramMap) throws Exceptions {

        try {

            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            Stmqes001 entity = null;

            for(String ids : idsArr) {

                entity = new Stmqes001(paramMap, ids);

                switch(entity.getNativeeditorStatus()) {
                case "deleted":

                    stmqes001Mapper.deleteStmqes001(entity);
                    break;
                case "inserted":
                    String newNumber = "";
                    
                    if (entity.getQestnarCode().equals("")) {
                        EgovMapForNull paramMap2 = new EgovMapForNull();
                        paramMap2.put("relTblNm", "STM_QESTNAR");
                        paramMap2.put("relItemNm", "QESTNAR_CODE");

                        JSONObject jsonObj = stmbsc006Service.selectCreateNumberStmbsc006(paramMap2);
                        newNumber = jsonObj.get("data").toString();
                        
                        entity.setQestnarCode(newNumber);
                    }
                    stmqes001Mapper.saveStmqes001(entity);
                    break;
                    
                case "updated":
                    stmqes001Mapper.saveStmqes001(entity);
                default:
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
    public JSONObject searchStmqesTrget(EgovMapForNull paramMap) throws Exceptions {
        try {

            StmqesTrget entity = new StmqesTrget(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = stmqesTrgetMapper.selectStmqesTrgetList(paramMap).stream().map(mapper -> {
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
    public JSONObject saveStmqesTrget(EgovMapForNull paramMap) throws Exceptions {
        try {

            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            StmqesTrget entity = null;

            for(String ids : idsArr) {

                entity = new StmqesTrget(paramMap, ids);

                switch(entity.getNativeeditorStatus()) {
                case "deleted":
                    stmqesTrgetMapper.deleteStmqesTrget(entity);
                    break;
                case "inserted":

                    stmqesTrgetMapper.saveStmqesTrget(entity);
                    break;
                    
                case "updated":
                    //stmqesTrgetMapper.saveStmqesTrget(entity);
                default:
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
    public JSONObject searchStmqestrnarCn(EgovMapForNull paramMap) throws Exceptions {
        try {

            StmqeustrnarCn entity = new StmqeustrnarCn(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = stmqeustrnarCnMapper.selectStmqeustrnarCnList(paramMap).stream().map(mapper -> {
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
    public JSONObject saveStmqestrnarCn(EgovMapForNull paramMap) throws Exceptions {
        try {

            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            StmqeustrnarCn entity = null;

            for(String ids : idsArr) {

                entity = new StmqeustrnarCn(paramMap, ids, "1");

                switch(entity.getNativeeditorStatus()) {
                case "deleted":
                    stmqeustrnarCnMapper.deleteStmqeustrnarCn(entity);
                    break;
                case "inserted":
                    
                    if(entity.getQestnarCnSn().equals("")) {
                        String qestnarCnSn = stmqeustrnarCnMapper.selectQestnarCnSn(entity);
                        entity.setQestnarCnSn(qestnarCnSn);
                        //paramMap.put("qestnarCnSn", qestnarCnSn);
                    }
                    stmqeustrnarCnMapper.saveStmqeustrnarCn(entity);
                    break;
                    
                case "updated":
                    stmqeustrnarCnMapper.saveStmqeustrnarCn(entity);
                default:
                    break;
                }
            }
            //if(false) { throw new Exceptions("Error."); } 

            EgovMapForNull returnMap = new EgovMapForNull();
            returnMap.put("code", "000");
            returnMap.put("message", "SUCCESS");
            returnMap.put("qestnarCnSn", entity.getQestnarCnSn());
            
            return new JsonMsgMng().makeJsonObject(returnMap);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject searchStmqesR(EgovMapForNull paramMap) throws Exceptions {
        try {

            StmqeustrnarCn entity = new StmqeustrnarCn(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = stmqeustrnarCnMapper.selectStmqesRList(paramMap).stream().map(mapper -> {
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
    public JSONObject saveStmqesR(EgovMapForNull paramMap) throws Exceptions {
        try {

            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            StmqeustrnarCn entity = null;

            for(String ids : idsArr) {

                entity = new StmqeustrnarCn(paramMap, ids, "2");

                switch(entity.getNativeeditorStatus()) {
                case "deleted":
                    stmqeustrnarCnMapper.deleteStmqesR(entity);
                    break;
                case "inserted":

                    stmqeustrnarCnMapper.saveStmqesR(entity);
                    break;
                    
                case "updated":
                    stmqeustrnarCnMapper.saveStmqesR(entity);
                default:
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
