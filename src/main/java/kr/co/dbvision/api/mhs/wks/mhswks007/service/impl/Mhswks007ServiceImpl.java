package kr.co.dbvision.api.mhs.wks.mhswks007.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.mhs.wks.mhswks007.entity.Mhswks007;
import kr.co.dbvision.api.mhs.wks.mhswks007.service.Mhswks007Service;
import kr.co.dbvision.api.mhs.wks.mhswks007.service.mapper.Mhswks007Mapper;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import net.sf.json.JSONObject;

/**
 * 휴직신청관리관리에 관한 서비스 구현 클래스
 *
 * @author 디비비전
 * @since 2020.05.15
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.05.15          디비비전              최초 생성
 * </pre>
 */
@Service("Mhswks007Service")
@Transactional
public class Mhswks007ServiceImpl extends EgovAbstractServiceImpl implements Mhswks007Service {

    Logger logger = LogManager.getLogger(Mhswks007ServiceImpl.class);

    @Resource(name="Mhswks007Mapper")
    private Mhswks007Mapper mhswks007Mapper;

    public Mhswks007ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchMhswks007(EgovMapForNull paramMap) {
        try {

            Mhswks007 entity = new Mhswks007(paramMap);
            List<EgovMapForNull> list = mhswks007Mapper.selectMhswks007List(paramMap);
            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public List<EgovMapForNull> searchMhswks007ForExcel(EgovMapForNull paramMap) {

        return mhswks007Mapper.selectMhswks007List(paramMap);
    }

    @Override
    public JSONObject findMhswks007(EgovMapForNull paramMap) {
        try {

            Mhswks007 entity = new Mhswks007(mhswks007Mapper.selectMhswks007(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject saveMhswks007(EgovMapForNull paramMap) {

        try {

            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            Mhswks007 entity = null;

            for(String ids : idsArr) {

                entity = new Mhswks007(paramMap, ids);

                switch(entity.getNativeeditorStatus()) {
                case "deleted":

                    mhswks007Mapper.deleteMhswks007(entity);
                    break;

                default:

                    mhswks007Mapper.saveMhswks007(entity);
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
