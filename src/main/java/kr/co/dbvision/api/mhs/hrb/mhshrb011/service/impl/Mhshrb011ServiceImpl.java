package kr.co.dbvision.api.mhs.hrb.mhshrb011.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.mhs.hrb.mhshrb011.entity.Mhshrb011;
import kr.co.dbvision.api.mhs.hrb.mhshrb011.service.Mhshrb011Service;
import kr.co.dbvision.api.mhs.hrb.mhshrb011.service.mapper.Mhshrb011Mapper;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 생일자현황조회관리에 관한 서비스 구현 클래스
 *
 * @author 디비비전
 * @since 2021.05.21
 * @version 1.0
 * @sourceGen version 2021.02.18.01 (2021.05.21)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2021.05.21          디비비전              최초 생성
 * </pre>
 */
@Service("Mhshrb011Service")
@Transactional
public class Mhshrb011ServiceImpl extends EgovAbstractServiceImpl implements Mhshrb011Service {

    Logger logger = LogManager.getLogger(Mhshrb011ServiceImpl.class);

    @Resource(name="Mhshrb011Mapper")
    private Mhshrb011Mapper mhshrb011Mapper;

    private int listRowNumber = 0; // 넘버링 

    public Mhshrb011ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchMhshrb011(EgovMapForNull paramMap) {
        try {

            Mhshrb011 entity = new Mhshrb011(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = mhshrb011Mapper.selectMhshrb011List(paramMap).stream().map(mapper -> {
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
    public List<EgovMapForNull> searchMhshrb011ForExcel(EgovMapForNull paramMap) {

        return mhshrb011Mapper.selectMhshrb011List(paramMap);
    }

    @Override
    public JSONObject findMhshrb011(EgovMapForNull paramMap) {
        try {

            Mhshrb011 entity = new Mhshrb011(mhshrb011Mapper.selectMhshrb011(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject saveMhshrb011(EgovMapForNull paramMap) throws Exceptions {

        try {

            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            Mhshrb011 entity = null;

            for(String ids : idsArr) {

                entity = new Mhshrb011(paramMap, ids);

                switch(entity.getNativeeditorStatus()) {
                case "deleted":

                    mhshrb011Mapper.deleteMhshrb011(entity);
                    break;

                default:

                    mhshrb011Mapper.saveMhshrb011(entity);
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
