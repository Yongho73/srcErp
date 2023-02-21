package kr.co.dbvision.api.mhs.hrm.mhshrm013.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.mhs.hrm.mhshrm013.entity.Mhshrm013;
import kr.co.dbvision.api.mhs.hrm.mhshrm013.service.Mhshrm013Service;
import kr.co.dbvision.api.mhs.hrm.mhshrm013.service.mapper.Mhshrm013Mapper;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 근태코드관리에 관한 서비스 구현 클래스
 *
 * @author 디비비전
 * @since 2020.08.04
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.08.04)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.08.04          디비비전              최초 생성
 * </pre>
 */
@Service("Mhshrm013Service")
@Transactional
public class Mhshrm013ServiceImpl extends EgovAbstractServiceImpl implements Mhshrm013Service {

    Logger logger = LogManager.getLogger(Mhshrm013ServiceImpl.class);

    @Resource(name="Mhshrm013Mapper")
    private Mhshrm013Mapper mhshrm013Mapper;

    private int listRowNumber = 0; // 넘버링 

    public Mhshrm013ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchMhshrm013(EgovMapForNull paramMap) {
        try {

            Mhshrm013 entity = new Mhshrm013(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = mhshrm013Mapper.selectMhshrm013List(paramMap).stream().map(mapper -> {
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
    public List<EgovMapForNull> searchMhshrm013ForExcel(EgovMapForNull paramMap) {

        return mhshrm013Mapper.searchMhshrm013ForExcel(paramMap);
    }

    @Override
    public JSONObject findMhshrm013(EgovMapForNull paramMap) {
        try {

            Mhshrm013 entity = new Mhshrm013(mhshrm013Mapper.selectMhshrm013(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject saveMhshrm013(EgovMapForNull paramMap) throws Exceptions {

        try {

            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            Mhshrm013 entity = null;

            for(String ids : idsArr) {

                entity = new Mhshrm013(paramMap, ids);

                switch(entity.getNativeeditorStatus()) {
                case "deleted":

                    mhshrm013Mapper.deleteMhshrm013(entity);
                    break;

                default:

                    mhshrm013Mapper.saveMhshrm013(entity);
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

