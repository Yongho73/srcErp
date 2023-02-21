package kr.co.dbvision.api.mps.bsc.mpsbsc017.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.mps.bsc.mpsbsc017.entity.Mpsbsc017;
import kr.co.dbvision.api.mps.bsc.mpsbsc017.service.Mpsbsc017Service;
import kr.co.dbvision.api.mps.bsc.mpsbsc017.service.mapper.Mpsbsc017Mapper;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.StringSecurity;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 직원계좌조회관리에 관한 서비스 구현 클래스
 *
 * @author 디비비전
 * @since 2020.08.06
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.08.06)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.08.06          디비비전              최초 생성
 * </pre>
 */ 
@Service("Mpsbsc017Service")
@Transactional
public class Mpsbsc017ServiceImpl extends EgovAbstractServiceImpl implements Mpsbsc017Service {

    Logger logger = LogManager.getLogger(Mpsbsc017ServiceImpl.class);

    @Resource(name="Mpsbsc017Mapper")
    private Mpsbsc017Mapper mpsbsc017Mapper;

    private int listRowNumber = 0; // 넘버링 

    public Mpsbsc017ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchMpsbsc017(EgovMapForNull paramMap) {
        try {

            Mpsbsc017 entity = new Mpsbsc017(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = mpsbsc017Mapper.selectMpsbsc017List(paramMap).stream().map(mapper -> {
                    mapper.put("num", listRowNumber++);
                    String ac = (String) mapper.get("acnutno");
                    String secAcntno = null;
					try {
						secAcntno = StringSecurity.decrypt(ac);
					} catch (Exception e) {
						e.printStackTrace();
					}
                    mapper.put("acnutno", secAcntno);
                    return mapper;
            }).collect(Collectors.toList());

            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public List<EgovMapForNull> searchMpsbsc017ForExcel(EgovMapForNull paramMap) {

        return mpsbsc017Mapper.selectMpsbsc017List(paramMap);
    }

    @Override
    public JSONObject findMpsbsc017(EgovMapForNull paramMap) {
        try {

            Mpsbsc017 entity = new Mpsbsc017(mpsbsc017Mapper.selectMpsbsc017(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject saveMpsbsc017(EgovMapForNull paramMap) throws Exceptions {

        try {

            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            Mpsbsc017 entity = null;

            for(String ids : idsArr) {

                entity = new Mpsbsc017(paramMap, ids);

                switch(entity.getNativeeditorStatus()) {
                case "deleted":

                    mpsbsc017Mapper.deleteMpsbsc017(entity);
                    break;

                default:
                	
                	String encodeStrProjectSn = StringSecurity.encrypt(entity.getAcnutno());
                	entity.setAcnutno(encodeStrProjectSn);
                    mpsbsc017Mapper.saveMpsbsc017(entity);
                    break;
                }
            }
            //if(false) { throw new Exceptions("Error."); } 

            EgovMapForNull returnMap = new EgovMapForNull();
            returnMap.put("code", "000");
            returnMap.put("message", "SUCCESS");

            return new JsonMsgMng().makeJsonObject(returnMap);

        } catch (Exception e) {
        	return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

}
