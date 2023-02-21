package kr.co.dbvision.api.pjt.pmg.pjtpmg005.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.pjt.mta.pjtmta001.entity.Pjtmta001;
import kr.co.dbvision.api.pjt.pmg.pjtpmg005.entity.Pjtpmg005;
import kr.co.dbvision.api.pjt.pmg.pjtpmg005.service.Pjtpmg005Service;
import kr.co.dbvision.api.pjt.pmg.pjtpmg005.service.mapper.Pjtpmg005Mapper;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 개인별투입현황관리에 관한 서비스 구현 클래스
 *
 * @author 디비비전
 * @since 2021.02.22
 * @version 1.0
 * @sourceGen version 2021.02.18.01 (2021.02.22)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2021.02.22          디비비전              최초 생성
 * </pre>
 */
@Service("Pjtpmg005Service")
@Transactional
public class Pjtpmg005ServiceImpl extends EgovAbstractServiceImpl implements Pjtpmg005Service {

    Logger logger = LogManager.getLogger(Pjtpmg005ServiceImpl.class);

    @Resource(name="Pjtpmg005Mapper")
    private Pjtpmg005Mapper pjtpmg005Mapper;

    private int listRowNumber = 0; // 넘버링 

    public Pjtpmg005ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchPjtpmg005(EgovMapForNull paramMap) {
        try {

            Pjtpmg005 entity = new Pjtpmg005(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = pjtpmg005Mapper.selectPjtpmg005List(paramMap).stream().map(mapper -> {
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
    public List<EgovMapForNull> searchPjtpmg005ForExcel(EgovMapForNull paramMap) {

        return pjtpmg005Mapper.selectPjtpmg005List(paramMap);
    }

    @Override
    public JSONObject findPjtpmg005(EgovMapForNull paramMap) {
        try {

            Pjtpmg005 entity = new Pjtpmg005(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = pjtpmg005Mapper.selectPjtpmg005(paramMap).stream().map(mapper -> {
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
    public JSONObject savePjtpmg005(EgovMapForNull paramMap) throws Exceptions {

        try {

            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            Pjtpmg005 entity = null;

            for(String ids : idsArr) {

                entity = new Pjtpmg005(paramMap, ids);

                switch(entity.getNativeeditorStatus()) {
                case "deleted":

                    pjtpmg005Mapper.deletePjtpmg005(entity);
                    break;

                default:

                    pjtpmg005Mapper.savePjtpmg005(entity);
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
    public JSONObject searchPjtpmg005Project(EgovMapForNull paramMap) {
        try {

            Pjtmta001 entity = new Pjtmta001(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = pjtpmg005Mapper.selectPjtpmg005ProjectList(paramMap).stream().map(mapper -> {
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
