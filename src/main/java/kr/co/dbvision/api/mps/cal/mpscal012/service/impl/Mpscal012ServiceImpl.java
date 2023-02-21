package kr.co.dbvision.api.mps.cal.mpscal012.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.mps.cal.mpscal012.entity.Mpscal012;
import kr.co.dbvision.api.mps.cal.mpscal012.service.Mpscal012Service;
import kr.co.dbvision.api.mps.cal.mpscal012.service.mapper.Mpscal012Mapper;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 자녀학비보조금관리에 관한 서비스 구현 클래스
 *
 * @author 디비비전
 * @since 2020.07.29
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.07.29)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.07.29          디비비전              최초 생성
 * </pre>
 */
@Service("Mpscal012Service")
@Transactional
public class Mpscal012ServiceImpl extends EgovAbstractServiceImpl implements Mpscal012Service {

    Logger logger = LogManager.getLogger(Mpscal012ServiceImpl.class);

    @Resource(name="Mpscal012Mapper")
    private Mpscal012Mapper mpscal012Mapper;

    private int listRowNumber = 0; // 넘버링 

    public Mpscal012ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchMpscal012(EgovMapForNull paramMap) {
        try {

            Mpscal012 entity = new Mpscal012(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = mpscal012Mapper.selectMpscal012List(paramMap).stream().map(mapper -> {
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
    public List<EgovMapForNull> searchMpscal012ForExcel(EgovMapForNull paramMap) {

        return mpscal012Mapper.selectMpscal012List(paramMap);
    }

    @Override
    public JSONObject findMpscal012(EgovMapForNull paramMap) {
        try {

            Mpscal012 entity = new Mpscal012(mpscal012Mapper.selectMpscal012(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject saveMpscal012(EgovMapForNull paramMap) throws Exceptions {

        try {

            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            Mpscal012 entity = null;

            for(String ids : idsArr) {

                entity = new Mpscal012(paramMap, ids);

                switch(entity.getNativeeditorStatus()) {
                case "deleted":

                    mpscal012Mapper.deleteMpscal012(entity);
                    break;

                default:

                    mpscal012Mapper.saveMpscal012(entity);
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
