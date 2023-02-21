package kr.co.dbvision.api.ynd.yta.yndyta009.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.ynd.yta.yndyta008.entity.Yndyta008;
import kr.co.dbvision.api.ynd.yta.yndyta009.entity.Yndyta009;
import kr.co.dbvision.api.ynd.yta.yndyta009.service.Yndyta009Service;
import kr.co.dbvision.api.ynd.yta.yndyta009.service.mapper.Yndyta009Mapper;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 과세기준관리에 관한 서비스 구현 클래스
 *
 * @author 디비비전
 * @since 2020.09.04
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.09.04)
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
@Service("Yndyta009Service")
@Transactional
public class Yndyta009ServiceImpl extends EgovAbstractServiceImpl implements Yndyta009Service {

    Logger logger = LogManager.getLogger(Yndyta009ServiceImpl.class);

    @Resource(name="Yndyta009Mapper")
    private Yndyta009Mapper yndyta009Mapper;

    private int listRowNumber = 0; // 넘버링 

    public Yndyta009ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchYndyta009(EgovMapForNull paramMap) {
        try {

            Yndyta009 entity = new Yndyta009(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = yndyta009Mapper.selectYndyta009List(paramMap).stream().map(mapper -> {
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
    public List<EgovMapForNull> searchYndyta009ForExcel(EgovMapForNull paramMap) {

        return yndyta009Mapper.selectYndyta009List(paramMap);
    }

    @Override
    public JSONObject findYndyta009(EgovMapForNull paramMap) {
        try {

            Yndyta009 entity = new Yndyta009(yndyta009Mapper.selectYndyta009(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject saveYndyta009(EgovMapForNull paramMap) throws Exceptions {

        try {

            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            Yndyta009 entity = null;

            for(String ids : idsArr) {

                entity = new Yndyta009(paramMap, ids);

                switch(entity.getNativeeditorStatus()) {
                case "deleted":

                    yndyta009Mapper.deleteYndyta009(entity);
                    break;

                default:

                    yndyta009Mapper.saveYndyta009(entity);
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
    public JSONObject findSaveYndyta009(EgovMapForNull paramMap) {
        try {

            Yndyta009 entity = new Yndyta009(yndyta009Mapper.findSaveYndyta009(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }
    

    @Override
    public JSONObject saveCopyYndTaxtStd(EgovMapForNull paramMap) {
        try {
            Yndyta009 entity = new Yndyta009(paramMap);
            //기존 데이터가 있으면 삭제후 저장 
            yndyta009Mapper.deleteYndyta009(entity);
            
            yndyta009Mapper.insertCopyYndyta009(entity);
            
            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

}
