package kr.co.dbvision.api.stm.not.stmnot001.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.stm.not.stmnot001.entity.Stmnot001;
import kr.co.dbvision.api.stm.not.stmnot001.service.Stmnot001Service;
import kr.co.dbvision.api.stm.not.stmnot001.service.mapper.Stmnot001Mapper;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * ERP게시판관리관리에 관한 서비스 구현 클래스
 *
 * @author 디비비전
 * @since 2020.08.21
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.08.21)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.08.21          디비비전              최초 생성
 * </pre>
 */
@Service("Stmnot001Service")
@Transactional
public class Stmnot001ServiceImpl extends EgovAbstractServiceImpl implements Stmnot001Service {

    Logger logger = LogManager.getLogger(Stmnot001ServiceImpl.class);

    @Resource(name="Stmnot001Mapper")
    private Stmnot001Mapper stmnot001Mapper;

    private int listRowNumber = 0; // 넘버링 

    public Stmnot001ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchStmnot001(EgovMapForNull paramMap) {
        try {

            Stmnot001 entity = new Stmnot001(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = stmnot001Mapper.selectStmnot001List(paramMap).stream().map(mapper -> {
                    mapper.put("num", listRowNumber++);
                    
                    
                    String atch = StringExpression.nullConvert(mapper.get("atchmnflNo"));
                    int atchSize = 0;
                    String atchSizeStr;
                    if(!atch.equals("")) {
                        atchSize = atch.split("\\|").length; 
                        atchSizeStr= "<span style=\"color:red; font-weight:bold\">"+atchSize+"</span>";
                    } else {
                        atchSizeStr= "<span>"+atchSize+"</span>";
                    }
                    
                    // 첨부파일
                    mapper.put("atchmnflNoYN", "<span class=\"glyphicon glyphicon glyphicon-floppy-disk\"></span>&nbsp;("+atchSizeStr+")</a>");                
                    
                    
                    
                    return mapper;
            }).collect(Collectors.toList());

            entity.setRecords(list);
            
            
            
            
            
            
            
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public List<EgovMapForNull> searchStmnot001ForExcel(EgovMapForNull paramMap) {

        return stmnot001Mapper.selectStmnot001List(paramMap);
    }

    @Override
    public JSONObject findStmnot001(EgovMapForNull paramMap) {
        try {

            Stmnot001 entity = new Stmnot001(stmnot001Mapper.findStmnot001(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }
    

    @Override
    public JSONObject gridStmnot001(EgovMapForNull paramMap) {
        try {

            Stmnot001 entity = new Stmnot001(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = stmnot001Mapper.gridStmnot001(paramMap).stream().map(mapper -> {
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
    public JSONObject saveStmnot001(EgovMapForNull paramMap) throws Exceptions {

        try {

            Stmnot001 entity = new Stmnot001(paramMap);
            
            stmnot001Mapper.saveStmnot001(entity);
            
            EgovMapForNull returnMap = new EgovMapForNull();
            returnMap.put("code", "000");
            returnMap.put("message", "SUCCESS");

            return new JsonMsgMng().makeJsonObject(returnMap);
        } catch (Exception e) {
            throw e;
        }
    }
    
    @Override
    public JSONObject saveStmnot001Popup(EgovMapForNull paramMap) throws Exceptions {

        try {

            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            Stmnot001 entity = null;

            for(String ids : idsArr) {

                entity = new Stmnot001(paramMap, ids);

                switch(entity.getNativeeditorStatus()) {
                case "deleted":

                    stmnot001Mapper.deleteStmnot001Popup(entity);
                    break;

                default:

                    stmnot001Mapper.saveStmnot001Popup(entity);
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
    public JSONObject deleteStmnot001(EgovMapForNull paramMap) throws Exceptions {

        try {

            Stmnot001 entity = new Stmnot001(paramMap);
            
            stmnot001Mapper.deleteStmnot001(entity);
            
            EgovMapForNull returnMap = new EgovMapForNull();
            returnMap.put("code", "000");
            returnMap.put("message", "SUCCESS");

            return new JsonMsgMng().makeJsonObject(returnMap);
        } catch (Exception e) {
            throw e;
        }
    }

}
