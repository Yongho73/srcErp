package kr.co.dbvision.api.mps.ins.mpsins003.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.mps.ins.mpsins003.entity.Mpsins003;
import kr.co.dbvision.api.mps.ins.mpsins003.service.Mpsins003Service;
import kr.co.dbvision.api.mps.ins.mpsins003.service.mapper.Mpsins003Mapper;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 사회보험 자격취득관리에 관한 서비스 구현 클래스
 *
 * @author 디비비전
 * @since 2020.08.04
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.08.04)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.08.04          디비비전              최초 생성
 * </pre>
 */
@Service("Mpsins003Service")
@Transactional
public class Mpsins003ServiceImpl extends EgovAbstractServiceImpl implements Mpsins003Service {

    Logger logger = LogManager.getLogger(Mpsins003ServiceImpl.class);

    @Resource(name="Mpsins003Mapper")
    private Mpsins003Mapper mpsins003Mapper;

    private int listRowNumber = 0; // 넘버링 

    public Mpsins003ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchMpsins003(EgovMapForNull paramMap) {
        try {

            Mpsins003 entity = new Mpsins003(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = mpsins003Mapper.selectMpsins003List(paramMap).stream().map(mapper -> {
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
    public List<EgovMapForNull> searchMpsins003ForExcel(EgovMapForNull paramMap) {

        return mpsins003Mapper.selectMpsins003List(paramMap);
    }

    @Override
    public JSONObject findMpsins003(EgovMapForNull paramMap) {
        try {

            Mpsins003 entity = new Mpsins003(mpsins003Mapper.selectMpsins003(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject saveMpsins003(EgovMapForNull paramMap) throws Exceptions {

        try {

            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            Mpsins003 entity = null;

            for(String ids : idsArr) {

                entity = new Mpsins003(paramMap, ids);

                switch(entity.getNativeeditorStatus()) {
                case "deleted":

                    mpsins003Mapper.deleteMpsins003(entity);
                    break;

                default:

                    mpsins003Mapper.saveMpsins003(entity);
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
