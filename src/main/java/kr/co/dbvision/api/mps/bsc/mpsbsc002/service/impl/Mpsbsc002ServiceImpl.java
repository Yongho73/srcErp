package kr.co.dbvision.api.mps.bsc.mpsbsc002.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.mps.bsc.mpsbsc002.entity.Mpsbsc002;
import kr.co.dbvision.api.mps.bsc.mpsbsc002.service.Mpsbsc002Service;
import kr.co.dbvision.api.mps.bsc.mpsbsc002.service.mapper.Mpsbsc002Mapper;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 급여항목기준관리관리에 관한 서비스 구현 클래스
 *
 * @author 디비비전
 * @since 2020.08.07
 * @version 1.0
 * @sourceGen version 2020.06.29.01 (2020.08.07)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.08.07          디비비전              최초 생성
 * </pre>
 */
@Service("Mpsbsc002Service")
@Transactional
public class Mpsbsc002ServiceImpl extends EgovAbstractServiceImpl implements Mpsbsc002Service {

    Logger logger = LogManager.getLogger(Mpsbsc002ServiceImpl.class);

    @Resource(name="Mpsbsc002Mapper")
    private Mpsbsc002Mapper mpsbsc002Mapper;

    private int listRowNumber = 0; // 넘버링 

    public Mpsbsc002ServiceImpl() {
        //
    }
    
    /**
     * 급여항목 콤보 리스트 
     */
    @Override
    public JSONObject searchComboMpsbsc002List(EgovMapForNull paramMap) {
        
        try {
            return new JsonMsgMng().makeJsonObject(mpsbsc002Mapper.selectComboMpsbsc002List(paramMap));
        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }       
        
    }

    @Override
    public JSONObject searchMpsbsc002(EgovMapForNull paramMap) {
        try {

            Mpsbsc002 entity = new Mpsbsc002(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = mpsbsc002Mapper.selectMpsbsc002List(paramMap).stream().map(mapper -> {
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
    public List<EgovMapForNull> searchMpsbsc002ForExcel(EgovMapForNull paramMap) {

        return mpsbsc002Mapper.selectMpsbsc002List(paramMap);
    }

    @Override
    public JSONObject findMpsbsc002(EgovMapForNull paramMap) {
        try {

            Mpsbsc002 entity = new Mpsbsc002(mpsbsc002Mapper.selectMpsbsc002(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject saveMpsbsc002(EgovMapForNull paramMap) throws Exceptions {

        try {

            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            Mpsbsc002 entity = null;

            for(String ids : idsArr) {

                entity = new Mpsbsc002(paramMap, ids);
                //기존에 등록된 금액기준등록 대상여부에 대해 먼저 삭제여부에 '1'을 설정한다.
                mpsbsc002Mapper.deleteMpsbsc002ByApplcsStdr(entity);
                switch(entity.getNativeeditorStatus()) {
                case "deleted":
                    
                    mpsbsc002Mapper.deleteMpsbsc002(entity);                    
                    break;

                default:
                    //System.out.println(">>>>>>>>" + entity.getUseAt());        
                    if(entity.getAmtStdrRegistTrgetAt().equals("1"))
                        mpsbsc002Mapper.saveMpsbsc002ByApplcsStdr(entity);                    
                    mpsbsc002Mapper.saveMpsbsc002(entity);
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
