package kr.co.dbvision.api.mhs.hrb.mhshrb000.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.mhs.hrb.mhshrb000.entity.Mhshrb000;
import kr.co.dbvision.api.mhs.hrb.mhshrb000.service.Mhshrb000Service;
import kr.co.dbvision.api.mhs.hrb.mhshrb000.service.mapper.Mhshrb000Mapper;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import net.sf.json.JSONObject;

/**
 * 인사탭관리에 관한 서비스 구현 클래스
 *
 * @author 디비비전
 * @since 2020.06.09
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.06.09          디비비전              최초 생성
 * </pre>
 */
@Service("Mhshrb000Service")
@Transactional
public class Mhshrb000ServiceImpl extends EgovAbstractServiceImpl implements Mhshrb000Service {

    Logger logger = LogManager.getLogger(Mhshrb000ServiceImpl.class);

    @Resource(name="Mhshrb000Mapper")
    private Mhshrb000Mapper mhshrb000Mapper;

    private int listRowNumber = 0; // 넘버링 

    public Mhshrb000ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchMhshrb000(EgovMapForNull paramMap) {
        try {

            Mhshrb000 entity = new Mhshrb000(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = mhshrb000Mapper.selectMhshrb000List(paramMap).stream().map(mapper -> {
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
    public List<EgovMapForNull> searchMhshrb000ForExcel(EgovMapForNull paramMap) {

        return mhshrb000Mapper.selectMhshrb000List(paramMap);
    }

    @Override
    public JSONObject findMhshrb000(EgovMapForNull paramMap) {
        try {

            Mhshrb000 entity = new Mhshrb000(mhshrb000Mapper.selectMhshrb000(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject saveMhshrb000(EgovMapForNull paramMap) {

        try {

            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            Mhshrb000 entity = null;

            for(String ids : idsArr) {

                entity = new Mhshrb000(paramMap, ids);

                switch(entity.getNativeeditorStatus()) {
                case "deleted":

                    mhshrb000Mapper.deleteMhshrb000(entity);
                    break;

                default:

                    mhshrb000Mapper.saveMhshrb000(entity);
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
