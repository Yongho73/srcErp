package kr.co.dbvision.api.mhs.wks.mhswks001.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.mhs.wks.mhswks001.entity.Mhswks001;
import kr.co.dbvision.api.mhs.wks.mhswks001.service.Mhswks001Service;
import kr.co.dbvision.api.mhs.wks.mhswks001.service.mapper.Mhswks001Mapper;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import net.sf.json.JSONObject;

/**
 * 근태기준설정(근태관리)관리에 관한 서비스 구현 클래스
 *
 * @author 디비비전
 * @since 2020.05.19
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.05.19          디비비전              최초 생성
 * </pre>
 */
@Service("Mhswks001Service")
@Transactional
public class Mhswks001ServiceImpl extends EgovAbstractServiceImpl implements Mhswks001Service {

    Logger logger = LogManager.getLogger(Mhswks001ServiceImpl.class);

    @Resource(name="Mhswks001Mapper")
    private Mhswks001Mapper mhswks001Mapper;

    public Mhswks001ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchMhswks001(EgovMapForNull paramMap) {
        try {

            Mhswks001 entity = new Mhswks001(paramMap);
            List<EgovMapForNull> list = mhswks001Mapper.selectMhswks001List(paramMap);
            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public List<EgovMapForNull> searchMhswks001ForExcel(EgovMapForNull paramMap) {

        return mhswks001Mapper.selectMhswks001List(paramMap);
    }

    @Override
    public JSONObject findMhswks001(EgovMapForNull paramMap) {
        try {

            Mhswks001 entity = new Mhswks001(mhswks001Mapper.selectMhswks001(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject saveMhswks001(EgovMapForNull paramMap) {

        try {

            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            Mhswks001 entity = null;

            for(String ids : idsArr) {

                entity = new Mhswks001(paramMap, ids);

                switch(entity.getNativeeditorStatus()) {
                case "deleted":

                    mhswks001Mapper.deleteMhswks001(entity);
                    break;

                default:

                    mhswks001Mapper.saveMhswks001(entity);
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
