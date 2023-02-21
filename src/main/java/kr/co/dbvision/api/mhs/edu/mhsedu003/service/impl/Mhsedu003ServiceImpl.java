package kr.co.dbvision.api.mhs.edu.mhsedu003.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.mhs.edu.mhsedu003.entity.Mhsedu003;
import kr.co.dbvision.api.mhs.edu.mhsedu003.service.Mhsedu003Service;
import kr.co.dbvision.api.mhs.edu.mhsedu003.service.mapper.Mhsedu003Mapper;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 교육결과보고관리에 관한 서비스 구현 클래스
 *
 * @author 디비비전
 * @since 2020.09.09
 * @version 1.0
 * @sourceGen version 2020.08.06.01 (2020.09.09)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.09.09          디비비전              최초 생성
 * </pre>
 */
@Service("Mhsedu003Service")
@Transactional
public class Mhsedu003ServiceImpl extends EgovAbstractServiceImpl implements Mhsedu003Service {

    Logger logger = LogManager.getLogger(Mhsedu003ServiceImpl.class);

    @Resource(name="Mhsedu003Mapper")
    private Mhsedu003Mapper mhsedu003Mapper;

    private int listRowNumber = 0; // 넘버링 

    public Mhsedu003ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchMhsedu003(EgovMapForNull paramMap) {
        try {

            Mhsedu003 entity = new Mhsedu003(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = mhsedu003Mapper.selectMhsedu003List(paramMap).stream().map(mapper -> {
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
    public List<EgovMapForNull> searchMhsedu003ForExcel(EgovMapForNull paramMap) {

        return mhsedu003Mapper.selectMhsedu003List(paramMap);
    }

    @Override
    public JSONObject findMhsedu003(EgovMapForNull paramMap) {
        try {

            Mhsedu003 entity = new Mhsedu003(mhsedu003Mapper.selectMhsedu003(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject saveMhsedu003(EgovMapForNull paramMap) throws Exceptions {

        try {

            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            Mhsedu003 entity = null;

            for(String ids : idsArr) {

                entity = new Mhsedu003(paramMap, ids);

                switch(entity.getNativeeditorStatus()) {
                case "deleted":

                    mhsedu003Mapper.deleteMhsedu003(entity);
                    break;

                default:

                    mhsedu003Mapper.saveMhsedu003(entity);
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
