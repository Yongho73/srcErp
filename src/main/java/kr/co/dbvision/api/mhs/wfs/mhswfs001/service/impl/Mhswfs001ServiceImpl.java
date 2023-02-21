package kr.co.dbvision.api.mhs.wfs.mhswfs001.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.mhs.wfs.mhswfs001.entity.Mhswfs001;
import kr.co.dbvision.api.mhs.wfs.mhswfs001.service.Mhswfs001Service;
import kr.co.dbvision.api.mhs.wfs.mhswfs001.service.mapper.Mhswfs001Mapper;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 학자금신청관리에 관한 서비스 구현 클래스
 *
 * @author 디비비전
 * @since 2020.07.30
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.07.30)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.07.30          디비비전              최초 생성
 * </pre>
 */
@Service("Mhswfs001Service")
@Transactional
public class Mhswfs001ServiceImpl extends EgovAbstractServiceImpl implements Mhswfs001Service {

    Logger logger = LogManager.getLogger(Mhswfs001ServiceImpl.class);

    @Resource(name="Mhswfs001Mapper")
    private Mhswfs001Mapper mhswfs001Mapper;

    private int listRowNumber = 0; // 넘버링 

    public Mhswfs001ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchMhswfs001(EgovMapForNull paramMap) {
        try {

            Mhswfs001 entity = new Mhswfs001(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = mhswfs001Mapper.selectMhswfs001List(paramMap).stream().map(mapper -> {
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
    public List<EgovMapForNull> searchMhswfs001ForExcel(EgovMapForNull paramMap) {

        return mhswfs001Mapper.selectMhswfs001List(paramMap);
    }

    @Override
    public JSONObject findMhswfs001(EgovMapForNull paramMap) {
        try {

            Mhswfs001 entity = new Mhswfs001(mhswfs001Mapper.selectMhswfs001(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject saveMhswfs001(EgovMapForNull paramMap) throws Exceptions {

        try {

            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            Mhswfs001 entity = null;

            for(String ids : idsArr) {

                entity = new Mhswfs001(paramMap, ids);

                switch(entity.getNativeeditorStatus()) {
                case "deleted":

                    mhswfs001Mapper.deleteMhswfs001(entity);
                    break;

                default:

                    mhswfs001Mapper.saveMhswfs001(entity);
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
