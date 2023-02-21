package kr.co.dbvision.api.pub.edu.pubedu001.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.pub.edu.pubedu001.entity.Pubedu001;
import kr.co.dbvision.api.pub.edu.pubedu001.service.Pubedu001Service;
import kr.co.dbvision.api.pub.edu.pubedu001.service.mapper.Pubedu001Mapper;
import kr.co.dbvision.api.stm.bsc.stmbsc006.service.Stmbsc006Service;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 교육조회및신청관리에 관한 서비스 구현 클래스
 *
 * @author 디비비전
 * @since 2020.09.01
 * @version 1.0
 * @sourceGen version 2020.08.06.01 (2020.09.01)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.09.01          디비비전              최초 생성
 * </pre>
 */
@Service("Pubedu001Service")
@Transactional
public class Pubedu001ServiceImpl extends EgovAbstractServiceImpl implements Pubedu001Service {

    Logger logger = LogManager.getLogger(Pubedu001ServiceImpl.class);

    @Resource(name="Pubedu001Mapper")
    private Pubedu001Mapper pubedu001Mapper;

    @Resource(name = "Stmbsc006Service")
    public Stmbsc006Service stmbsc006Service;
    private int listRowNumber = 0; // 넘버링 

    public Pubedu001ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchPubedu001(EgovMapForNull paramMap) {
        try {

            Pubedu001 entity = new Pubedu001(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = pubedu001Mapper.selectPubedu001List(paramMap).stream().map(mapper -> {
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
    public List<EgovMapForNull> searchPubedu001ForExcel(EgovMapForNull paramMap) {

        return pubedu001Mapper.selectPubedu001List(paramMap);
    }

    @Override
    public JSONObject findPubedu001(EgovMapForNull paramMap) {
        try {

            Pubedu001 entity = new Pubedu001(pubedu001Mapper.selectPubedu001(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject savePubedu001(EgovMapForNull paramMap) throws Exceptions {

        try {

            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            Pubedu001 entity = null;

            for(String ids : idsArr) {

                entity = new Pubedu001(paramMap, ids, "1");

                switch(entity.getNativeeditorStatus()) {
                case "deleted":
                	pubedu001Mapper.deletePubeduEmp(entity);
                    pubedu001Mapper.deletePubedu001(entity);
                    break;

                case "updated":
                    
                    pubedu001Mapper.savePubedu001(entity);
                    
                    break;
                case "inserted":
                    
                    if(entity.getEdureqstSn().equals("")) { 
                        String  edureqstSn = pubedu001Mapper.selectEdureqstSnCnt(entity);
                        entity.setEdureqstSn(edureqstSn);
                        paramMap.put("edureqstSn", edureqstSn);
                    }
                    pubedu001Mapper.savePubedu001(entity);
                    pubedu001Mapper.savePubeduEmp(entity);
                    break;
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
    public JSONObject savePubeduEmp(EgovMapForNull paramMap) throws Exceptions {
        try {

            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            Pubedu001 entity = null;

            for(String ids : idsArr) {

                entity = new Pubedu001(paramMap, ids, "2");

                switch(entity.getNativeeditorStatus()) {
                case "deleted":

                    pubedu001Mapper.deletePubeduEmp(entity);
                    break;

                default:

                    pubedu001Mapper.savePubeduEmp(entity);
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
    public JSONObject searchPubeduEmp(EgovMapForNull paramMap) {
        try {

            Pubedu001 entity = new Pubedu001(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = pubedu001Mapper.selectPubeduEmp(paramMap).stream().map(mapper -> {
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
    public JSONObject saveCopyPubedu(EgovMapForNull paramMap) throws Exceptions {
        try {
            EgovMapForNull returnMap = new EgovMapForNull();
            int cnt = pubedu001Mapper.selectElctsctSeSnCnt(paramMap);
            if(cnt >= 1) {
                returnMap.put("code", "999");
                returnMap.put("message", "FAIL");
            }
            else {
                pubedu001Mapper.saveCopyPubedu001(paramMap);
                pubedu001Mapper.saveCopyPubeduEmp(paramMap);
                returnMap.put("code", "000");
                returnMap.put("message", "SUCCESS");
            }
            
            return new JsonMsgMng().makeJsonObject(returnMap);

        } catch (Exception e) {
            throw e;
        }
    }

}

