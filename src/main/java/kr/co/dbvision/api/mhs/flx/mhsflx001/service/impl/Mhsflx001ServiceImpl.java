package kr.co.dbvision.api.mhs.flx.mhsflx001.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.mhs.flx.mhsflx001.entity.Mhsflx001;
import kr.co.dbvision.api.mhs.flx.mhsflx001.service.Mhsflx001Service;
import kr.co.dbvision.api.mhs.flx.mhsflx001.service.mapper.Mhsflx001Mapper;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import net.sf.json.JSONObject;

/**
 * 근무유형관리관리에 관한 서비스 구현 클래스
 *
 * @author 디비비전
 * @since 2020.05.19
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.05.19          디비비전              최초 생성
 * </pre>
 */
@Service("Mhsflx001Service")
@Transactional
public class Mhsflx001ServiceImpl extends EgovAbstractServiceImpl implements Mhsflx001Service {

    Logger logger = LogManager.getLogger(Mhsflx001ServiceImpl.class);

    @Resource(name="Mhsflx001Mapper")
    private Mhsflx001Mapper mhsflx001Mapper;
    
    private int listRowNumber = 0; // 넘버링 

    public Mhsflx001ServiceImpl() {
        //
    }
    
    @Override
    public JSONObject searchMhsflx001(EgovMapForNull paramMap) {
        try {

            Mhsflx001 entity = new Mhsflx001(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = mhsflx001Mapper.selectMhsflx001List(paramMap).stream().map(mapper -> {
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
    public List<EgovMapForNull> searchMhsflx001ForExcel(EgovMapForNull paramMap) {

        return mhsflx001Mapper.selectMhsflx001List(paramMap);
    }

    @Override
    public JSONObject findMhsflx001(EgovMapForNull paramMap) {
        try {

            Mhsflx001 entity = new Mhsflx001(mhsflx001Mapper.selectMhsflx001(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject saveMhsflx001(EgovMapForNull paramMap) {

        try {

            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            Mhsflx001 entity = null;

            for(String ids : idsArr) {

                entity = new Mhsflx001(paramMap, ids);

                switch(entity.getNativeeditorStatus()) {
                case "deleted":

                    mhsflx001Mapper.deleteMhsflx001(entity);
                    break;

                default:

                    mhsflx001Mapper.saveMhsflx001(entity);
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
