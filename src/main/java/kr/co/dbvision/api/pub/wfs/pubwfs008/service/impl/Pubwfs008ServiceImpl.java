package kr.co.dbvision.api.pub.wfs.pubwfs008.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.mps.cal.mpscal022.entity.MpscalStdr;
import kr.co.dbvision.api.pub.wfs.pubwfs008.entity.Pubwfs008;
import kr.co.dbvision.api.pub.wfs.pubwfs008.service.Pubwfs008Service;
import kr.co.dbvision.api.pub.wfs.pubwfs008.service.mapper.Pubwfs008Mapper;
import kr.co.dbvision.api.stm.bsc.stmbsc006.service.Stmbsc006Service;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 자녀학비보조금신청관리에 관한 서비스 구현 클래스
 *
 * @author 디비비전
 * @since 2020.08.03
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.08.03)
 * @see
 *
 *      <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.08.03          디비비전              최초 생성
 *      </pre>
 */
@Service("Pubwfs008Service")
@Transactional
public class Pubwfs008ServiceImpl extends EgovAbstractServiceImpl implements Pubwfs008Service {

    Logger logger = LogManager.getLogger(Pubwfs008ServiceImpl.class);

    @Resource(name = "Pubwfs008Mapper")
    private Pubwfs008Mapper pubwfs008Mapper;

    @Resource(name = "Stmbsc006Service")
    public Stmbsc006Service stmbsc006Service;

    private int listRowNumber = 0; // 넘버링

    public Pubwfs008ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchPubwfs008(EgovMapForNull paramMap) {
        try {

            Pubwfs008 entity = new Pubwfs008(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = pubwfs008Mapper.selectPubwfs008List(paramMap).stream().map(mapper -> {
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
    public List<EgovMapForNull> searchPubwfs008ForExcel(EgovMapForNull paramMap) {

        return pubwfs008Mapper.selectPubwfs008List(paramMap);
    }

    @Override
    public JSONObject findPubwfs008(EgovMapForNull paramMap) {
        try {

            Pubwfs008 entity = new Pubwfs008(pubwfs008Mapper.selectPubwfs008(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject savePubwfs008(EgovMapForNull paramMap) throws Exceptions {

        try {

            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            Pubwfs008 entity = null;

            for (String ids : idsArr) {

                entity = new Pubwfs008(paramMap, ids);

                switch (entity.getNativeeditorStatus()) {
                case "deleted":

                    pubwfs008Mapper.deletePubwfs008(entity);
                    break;

                case "updated":

                    pubwfs008Mapper.savePubwfs008(entity);
                    break;

                case "inserted":

                    String newNumber = "";

                    if (entity.getReqstNo().equals("")) {
                        EgovMapForNull paramMap2 = new EgovMapForNull();
                        paramMap2.put("relTblNm", "MHS_SCHXPN_REQST");
                        paramMap2.put("relItemNm", "REQST_NO");

                        JSONObject jsonObj = stmbsc006Service.selectCreateNumberStmbsc006(paramMap2);
                        newNumber = jsonObj.get("data").toString();
                        entity.setReqstNo(newNumber);
                    }

                    pubwfs008Mapper.savePubwfs008(entity);

                default:

                    break;
                }
            }
            // if(false) { throw new Exceptions("Error."); }

            EgovMapForNull returnMap = new EgovMapForNull();
            returnMap.put("code", "000");
            returnMap.put("message", "SUCCESS");

            return new JsonMsgMng().makeJsonObject(returnMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @Override
    public JSONObject searchPubwfsChldrn(EgovMapForNull paramMap) {
        try {

            MpscalStdr entity = new MpscalStdr(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = pubwfs008Mapper.selectPubwfsChldrnList(paramMap).stream().map(mapper -> {
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
    public JSONObject saveCopyPubwfs(EgovMapForNull paramMap) {
        try {

//                //String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            Pubwfs008 entity = null;
            entity = new Pubwfs008(paramMap);

            String newNumber = "";

            if (entity.getReqstNo().equals("")) {
                EgovMapForNull paramMap2 = new EgovMapForNull();
                paramMap2.put("relTblNm", "MHS_SCHXPN_REQST");
                paramMap2.put("relItemNm", "REQST_NO");

                JSONObject jsonObj = stmbsc006Service.selectCreateNumberStmbsc006(paramMap2);
                newNumber = jsonObj.get("data").toString();
                entity.setReqstNo(newNumber);
                
            }
            
            pubwfs008Mapper.deleteApplcYyYear(paramMap);
            //pubwfs008Mapper.insertCopyPubwfs008(paramMap);
            pubwfs008Mapper.savePubwfs008(entity);
            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

}
