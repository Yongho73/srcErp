package kr.co.dbvision.api.pjt.mta.pjtmta002.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.pjt.mta.pjtmta002.entity.Pjtmta002;
import kr.co.dbvision.api.pjt.mta.pjtmta002.service.Pjtmta002Service;
import kr.co.dbvision.api.pjt.mta.pjtmta002.service.mapper.Pjtmta002Mapper;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 유지보수요청요약관리에 관한 서비스 구현 클래스
 *
 * @author 디비비전
 * @since 2020.08.14
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.08.14)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.08.14          디비비전              최초 생성
 * </pre>
 */
@Service("Pjtmta002Service")
@Transactional
public class Pjtmta002ServiceImpl extends EgovAbstractServiceImpl implements Pjtmta002Service {

    Logger logger = LogManager.getLogger(Pjtmta002ServiceImpl.class);

    @Resource(name="Pjtmta002Mapper")
    private Pjtmta002Mapper pjtmta002Mapper;

    private int listRowNumber = 0; // 넘버링 

    public Pjtmta002ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchPjtmta002(EgovMapForNull paramMap) {
        try {

            Pjtmta002 entity = new Pjtmta002(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = pjtmta002Mapper.selectPjtmta002List(paramMap).stream().map(mapper -> {
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
    public List<EgovMapForNull> searchPjtmta002ForExcel(EgovMapForNull paramMap) {

        return pjtmta002Mapper.selectPjtmta002List(paramMap);
    }

    @Override
    public JSONObject findPjtmta002(EgovMapForNull paramMap) {
        try {

            Pjtmta002 entity = new Pjtmta002(pjtmta002Mapper.selectPjtmta002(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject savePjtmta002(EgovMapForNull paramMap) throws Exceptions {

        try {

            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            Pjtmta002 entity = null;

            for(String ids : idsArr) {

                entity = new Pjtmta002(paramMap, ids);

                switch(entity.getNativeeditorStatus()) {
                case "deleted":

                    pjtmta002Mapper.deletePjtmta002(entity);
                    break;

                default:

                    pjtmta002Mapper.savePjtmta002(entity);
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
