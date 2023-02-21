package kr.co.dbvision.api.mhs.hrm.mhshrm012.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.mhs.hrm.mhshrm012.entity.Mhshrm012;
import kr.co.dbvision.api.mhs.hrm.mhshrm012.service.Mhshrm012Service;
import kr.co.dbvision.api.mhs.hrm.mhshrm012.service.mapper.Mhshrm012Mapper;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 상벌코드관리에 관한 서비스 구현 클래스
 *
 * @author 디비비전
 * @since 2020.08.27
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.08.27)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.08.27          디비비전              최초 생성
 * </pre>
 */
@Service("Mhshrm012Service")
@Transactional
public class Mhshrm012ServiceImpl extends EgovAbstractServiceImpl implements Mhshrm012Service {

    Logger logger = LogManager.getLogger(Mhshrm012ServiceImpl.class);

    @Resource(name="Mhshrm012Mapper")
    private Mhshrm012Mapper mhshrm012Mapper;

    private int listRowNumber = 0; // 넘버링 

    public Mhshrm012ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchMhshrm012(EgovMapForNull paramMap) {
        try {

            Mhshrm012 entity = new Mhshrm012(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = mhshrm012Mapper.selectMhshrm012List(paramMap).stream().map(mapper -> {
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
    public List<EgovMapForNull> searchMhshrm012ForExcel(EgovMapForNull paramMap) {

        return mhshrm012Mapper.selectMhshrm012List(paramMap);
    }

    @Override
    public JSONObject findMhshrm012(EgovMapForNull paramMap) {
        try {

            Mhshrm012 entity = new Mhshrm012(mhshrm012Mapper.selectMhshrm012(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject saveMhshrm012(EgovMapForNull paramMap) throws Exceptions {

        try {

            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            Mhshrm012 entity = null;

            for(String ids : idsArr) {

                entity = new Mhshrm012(paramMap, ids);

                switch(entity.getNativeeditorStatus()) {
                case "deleted":

                    mhshrm012Mapper.deleteMhshrm012(entity);
                    break;

                default:

                    mhshrm012Mapper.saveMhshrm012(entity);
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

    /* 사용여부확인 */
    @Override
    public JSONObject useCheckMhshrm012(EgovMapForNull paramMap) {
        try {

            Mhshrm012 entity = new Mhshrm012(mhshrm012Mapper.useCheckMhshrm012(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

}
