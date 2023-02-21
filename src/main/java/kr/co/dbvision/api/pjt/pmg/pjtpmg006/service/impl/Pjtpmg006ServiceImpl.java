package kr.co.dbvision.api.pjt.pmg.pjtpmg006.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.pjt.pmg.pjtpmg006.entity.Pjtpmg006;
import kr.co.dbvision.api.pjt.pmg.pjtpmg006.service.Pjtpmg006Service;
import kr.co.dbvision.api.pjt.pmg.pjtpmg006.service.mapper.Pjtpmg006Mapper;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 프로젝트예산집행현황관리에 관한 서비스 구현 클래스
 *
 * @author 디비비전
 * @since 2021.04.21
 * @version 1.0
 * @sourceGen version 2021.02.18.01 (2021.04.21)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2021.04.21          디비비전              최초 생성
 * </pre>
 */
@Service("Pjtpmg006Service")
@Transactional
public class Pjtpmg006ServiceImpl extends EgovAbstractServiceImpl implements Pjtpmg006Service {

    Logger logger = LogManager.getLogger(Pjtpmg006ServiceImpl.class);

    @Resource(name="Pjtpmg006Mapper")
    private Pjtpmg006Mapper pjtpmg006Mapper;

    private int listRowNumber = 0; // 넘버링 

    public Pjtpmg006ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchPjtpmg006(EgovMapForNull paramMap) {
        try {

            Pjtpmg006 entity = new Pjtpmg006(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = pjtpmg006Mapper.selectPjtpmg006List(paramMap).stream().map(mapper -> {
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
    public List<EgovMapForNull> searchPjtpmg006ForExcel(EgovMapForNull paramMap) {

        return pjtpmg006Mapper.selectPjtpmg006List(paramMap);
    }

    @Override
    public JSONObject findPjtpmg006(EgovMapForNull paramMap) {
        try {

            Pjtpmg006 entity = new Pjtpmg006(pjtpmg006Mapper.selectPjtpmg006(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject savePjtpmg006(EgovMapForNull paramMap) throws Exceptions {

        try {

            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            Pjtpmg006 entity = null;

            for(String ids : idsArr) {

                entity = new Pjtpmg006(paramMap, ids);

                switch(entity.getNativeeditorStatus()) {
                case "deleted":

                    pjtpmg006Mapper.deletePjtpmg006(entity);
                    break;

                default:

                    pjtpmg006Mapper.savePjtpmg006(entity);
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
