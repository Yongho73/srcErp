package kr.co.dbvision.api.mps.bsc.mpsbsc001.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.mps.bsc.mpsbsc001.entity.Mpsbsc001;
import kr.co.dbvision.api.mps.bsc.mpsbsc001.service.Mpsbsc001Service;
import kr.co.dbvision.api.mps.bsc.mpsbsc001.service.mapper.Mpsbsc001Mapper;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 급여항목관리관리에 관한 서비스 구현 클래스
 *
 * @author 디비비전
 * @since 2020.08.28
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.08.28)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.08.28          디비비전              최초 생성
 * </pre>
 */
@Service("Mpsbsc001Service")
@Transactional
public class Mpsbsc001ServiceImpl extends EgovAbstractServiceImpl implements Mpsbsc001Service {

    Logger logger = LogManager.getLogger(Mpsbsc001ServiceImpl.class);

    @Resource(name="Mpsbsc001Mapper")
    private Mpsbsc001Mapper mpsbsc001Mapper;

    private int listRowNumber = 0; // 넘버링 

    public Mpsbsc001ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchMpsbsc001(EgovMapForNull paramMap) {
        try {

            Mpsbsc001 entity = new Mpsbsc001(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = mpsbsc001Mapper.selectMpsbsc001List(paramMap).stream().map(mapper -> {
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
    public List<EgovMapForNull> searchMpsbsc001ForExcel(EgovMapForNull paramMap) {

        return mpsbsc001Mapper.selectMpsbsc001List(paramMap);
    }

    @Override
    public JSONObject findMpsbsc001(EgovMapForNull paramMap) {
        try {


	    Mpsbsc001 entity = new Mpsbsc001(paramMap);
		List<EgovMapForNull> list = mpsbsc001Mapper.selectMpsbsc001(paramMap);

        entity.setRecords(list);
        return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject saveMpsbsc001(EgovMapForNull paramMap) throws Exceptions {

        try {

            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            Mpsbsc001 entity = null;

            for(String ids : idsArr) {

                entity = new Mpsbsc001(paramMap, ids);

                switch(entity.getNativeeditorStatus()) {
                case "deleted":
                    mpsbsc001Mapper.deleteMpsbsc001(entity);
                    break;
                case "inserted":
                	mpsbsc001Mapper.updateUseEndDe(entity);
                	mpsbsc001Mapper.updateUseEndDeMpsbsc002(entity);
                	mpsbsc001Mapper.saveMpsbsc001(entity);
                	break;
                default:
                    mpsbsc001Mapper.updateMpsbsc001(entity);
                    mpsbsc001Mapper.updateMpsbsc002(entity);
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
