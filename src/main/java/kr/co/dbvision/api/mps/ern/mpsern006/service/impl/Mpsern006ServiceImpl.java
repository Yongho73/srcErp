
package kr.co.dbvision.api.mps.ern.mpsern006.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.mps.ern.mpsern006.entity.Mpsern006;
import kr.co.dbvision.api.mps.ern.mpsern006.service.Mpsern006Service;
import kr.co.dbvision.api.mps.ern.mpsern006.service.mapper.Mpsern006Mapper;
import kr.co.dbvision.api.stm.bsc.stmbsc006.service.Stmbsc006Service;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 소득지급등록관리에 관한 서비스 구현 클래스
 *
 * @author 디비비전
 * @since 2020.08.12
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.08.12)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.08.12          디비비전              최초 생성
 * </pre>
 */
@Service("Mpsern006Service")
@Transactional
public class Mpsern006ServiceImpl extends EgovAbstractServiceImpl implements Mpsern006Service {

    Logger logger = LogManager.getLogger(Mpsern006ServiceImpl.class);

    @Resource(name="Mpsern006Mapper")
    private Mpsern006Mapper mpsern006Mapper;

    @Resource(name = "Stmbsc006Service")
    public Stmbsc006Service stmbsc006Service;
    
    private int listRowNumber = 0; // 넘버링 

    public Mpsern006ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchMpsern006(EgovMapForNull paramMap) {
        try {

            Mpsern006 entity = new Mpsern006(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = mpsern006Mapper.selectMpsern006List(paramMap).stream().map(mapper -> {
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
    public List<EgovMapForNull> searchMpsern006ForExcel(EgovMapForNull paramMap) {

        return mpsern006Mapper.selectMpsern006List(paramMap);
    }

    @Override
    public JSONObject findMpsern006(EgovMapForNull paramMap) {
        try {

            Mpsern006 entity = new Mpsern006(mpsern006Mapper.selectMpsern006(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject saveMpsern006(EgovMapForNull paramMap) throws Exceptions {

        try {

            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            Mpsern006 entity = null;

            for(String ids : idsArr) {

                entity = new Mpsern006(paramMap, ids);

                switch(entity.getNativeeditorStatus()) {
                case "deleted":

                    mpsern006Mapper.deleteMpsern006(entity);
                    break;

                case "updated":
                    mpsern006Mapper.saveMpsern006(entity);
                    break;
                case "inserted":
                    String newNumber = "";
                    
                    if (entity.getEvidSn().equals("")) {
                        EgovMapForNull paramMap2 = new EgovMapForNull();
                        paramMap2.put("relTblNm", "MFS_WHTAX_PYMNT");
                        paramMap2.put("relItemNm", "EVID_SN");

                        JSONObject jsonObj = stmbsc006Service.selectCreateNumberStmbsc006(paramMap2);
                        newNumber = jsonObj.get("data").toString();
                        entity.setEvidSn(newNumber); 
                    }
                    mpsern006Mapper.saveMpsern006(entity);
                    break;
                    
                default:
                    break;
                }
            }
            //if(false) { throw new Exceptions("Error."); } 

//            EgovMapForNull returnMap = new EgovMapForNull();
//            returnMap.put("code", "000");
//            returnMap.put("message", "SUCCESS");

            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

}
