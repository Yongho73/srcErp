package kr.co.dbvision.api.mps.bsc.mpsbsc004.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.mps.bsc.mpsbsc004.entity.Mpsbsc004;
import kr.co.dbvision.api.mps.bsc.mpsbsc004.service.Mpsbsc004Service;
import kr.co.dbvision.api.mps.bsc.mpsbsc004.service.mapper.Mpsbsc004Mapper;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 금액기준등록관리에 관한 서비스 구현 클래스
 *
 * @author 디비비전
 * @since 2020.07.13
 * @version 1.0
 * @sourceGen version 2020.06.29.01 (2020.07.13)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.07.13          디비비전              최초 생성
 * </pre>
 */
@Service("Mpsbsc004Service")
@Transactional
public class Mpsbsc004ServiceImpl extends EgovAbstractServiceImpl implements Mpsbsc004Service {

    Logger logger = LogManager.getLogger(Mpsbsc004ServiceImpl.class);

    @Resource(name="Mpsbsc004Mapper")
    private Mpsbsc004Mapper mpsbsc004Mapper;

    private int listRowNumber = 0; // 넘버링 

    public Mpsbsc004ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchMpsbsc004(EgovMapForNull paramMap) {
        try {

            Mpsbsc004 entity = new Mpsbsc004(paramMap);
            listRowNumber = 1;
            
          

            List<EgovMapForNull> list = mpsbsc004Mapper.selectMpsbsc004List(paramMap).stream().map(mapper -> {
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
    public List<EgovMapForNull> searchMpsbsc004ForExcel(EgovMapForNull paramMap) {

        return mpsbsc004Mapper.selectMpsbsc004List(paramMap);
    }

    @Override
    public JSONObject findMpsbsc004(EgovMapForNull paramMap) {
        try {

            Mpsbsc004 entity = new Mpsbsc004(mpsbsc004Mapper.selectMpsbsc004(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject saveMpsbsc004(EgovMapForNull paramMap) throws Exceptions {

        try {

            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            Mpsbsc004 entity = null;

            for(String ids : idsArr) {

                entity = new Mpsbsc004(paramMap, ids);

                switch(entity.getNativeeditorStatus()) {
                case "deleted":

                    mpsbsc004Mapper.deleteMpsbsc004(entity);
                    break;

                default:
                    System.out.println("saveMpsbsc004>>>>>>>" + entity.getCalcNomfrmDtls());
                    System.out.println("getCalcStdrSn>>>>>>>" + entity.getCalcStdrSn());
                   //신규데이터
                    if(entity.getCalcStdrSn().contentEquals("9999") )
                        entity.setCalcStdrSn("");
                    mpsbsc004Mapper.saveMpsbsc004calcStdr(entity);
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
    @Override
    public JSONObject searchMpsbsc004Master(EgovMapForNull paramMap) {
        try {

            Mpsbsc004 entity = new Mpsbsc004(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = mpsbsc004Mapper.selectMpsbsc004MasterList(paramMap).stream().map(mapper -> {
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
    public JSONObject searchGradeCalcMpsbsc004(EgovMapForNull paramMap) {
        try {

            Mpsbsc004 entity = new Mpsbsc004(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = mpsbsc004Mapper.selectGradeCalcMpsbsc004List(paramMap).stream().map(mapper -> {
                    mapper.put("num", listRowNumber++);
                    return mapper;
            }).collect(Collectors.toList());

            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }
    /**
     *급여계산식 항목 조회 
     */
    @Override
    public JSONObject searchCalcMpsbsc004PopList(EgovMapForNull paramMap) {
        try {

            Mpsbsc004 entity = new Mpsbsc004(paramMap);
            List<EgovMapForNull> list = mpsbsc004Mapper.selectCalcMpsbsc004PopList(paramMap);
            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

}
