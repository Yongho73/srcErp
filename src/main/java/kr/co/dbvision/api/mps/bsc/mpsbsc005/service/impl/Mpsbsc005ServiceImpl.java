package kr.co.dbvision.api.mps.bsc.mpsbsc005.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.mps.bsc.mpsbsc005.entity.Mpsbsc005;
import kr.co.dbvision.api.mps.bsc.mpsbsc005.service.Mpsbsc005Service;
import kr.co.dbvision.api.mps.bsc.mpsbsc005.service.mapper.Mpsbsc005Mapper;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import net.sf.json.JSONObject;

/**
 * 개인별급여기준일괄등록관리에 관한 서비스 구현 클래스
 *
 * @author 디비비전
 * @since 2020.05.12
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.05.12          디비비전              최초 생성
 * </pre>
 */
@Service("Mpsbsc005Service")
@Transactional
public class Mpsbsc005ServiceImpl extends EgovAbstractServiceImpl implements Mpsbsc005Service {

    Logger logger = LogManager.getLogger(Mpsbsc005ServiceImpl.class);

    @Resource(name="Mpsbsc005Mapper")
    private Mpsbsc005Mapper mpsbsc005Mapper;

    public Mpsbsc005ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchMpsbsc005(EgovMapForNull paramMap) {
        try {

            Mpsbsc005 entity = new Mpsbsc005(paramMap);
            List<EgovMapForNull> list = mpsbsc005Mapper.selectMpsbsc005List(paramMap);
            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public List<EgovMapForNull> searchMpsbsc005ForExcel(EgovMapForNull paramMap) {

        return mpsbsc005Mapper.selectMpsbsc005List(paramMap);
    }

    @Override
    public JSONObject findMpsbsc005(EgovMapForNull paramMap) {
        try {

            Mpsbsc005 entity = new Mpsbsc005(mpsbsc005Mapper.selectMpsbsc005(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject saveMpsbsc005(EgovMapForNull paramMap) {

        try {

            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            Mpsbsc005 entity = null;

            for(String ids : idsArr) {

                entity = new Mpsbsc005(paramMap, ids);

                switch(entity.getNativeeditorStatus()) {
                case "deleted":

                    mpsbsc005Mapper.deleteMpsbsc005Calc(entity);
                    mpsbsc005Mapper.deleteMpsbsc005Applcs(entity);
                    
                    break;

                default:
                    
                    mpsbsc005Mapper.saveMpsbsc005Applcs(entity);
                    mpsbsc005Mapper.saveMpsbsc005Calc(entity);
                    
                    break;
                }
            }

            EgovMapForNull returnMap = new EgovMapForNull();
            returnMap.put("code", "000");
            returnMap.put("message", "SUCCESS");

            return new JsonMsgMng().makeJsonObject(returnMap);

        } catch (Exception e) {
            throw e;
        }
    }

}
