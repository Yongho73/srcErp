package kr.co.dbvision.api.mhs.hrd.mhshrd010.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.mhs.hrd.mhshrd010.entity.Mhshrd010;
import kr.co.dbvision.api.mhs.hrd.mhshrd010.service.Mhshrd010Service;
import kr.co.dbvision.api.mhs.hrd.mhshrd010.service.mapper.Mhshrd010Mapper;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 초과근무조회관리에 관한 서비스 구현 클래스
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
@Service("Mhshrd010Service")
@Transactional
public class Mhshrd010ServiceImpl extends EgovAbstractServiceImpl implements Mhshrd010Service {

    Logger logger = LogManager.getLogger(Mhshrd010ServiceImpl.class);

    @Resource(name="Mhshrd010Mapper")
    private Mhshrd010Mapper mhshrd010Mapper;

    private int listRowNumber = 0; // 넘버링 

    public Mhshrd010ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchMhshrd010(EgovMapForNull paramMap) {
        try {

            Mhshrd010 entity = new Mhshrd010(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = mhshrd010Mapper.selectMhshrd010List(paramMap).stream().map(mapper -> {
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
    public List<EgovMapForNull> searchMhshrd010ForExcel(EgovMapForNull paramMap) {

        return mhshrd010Mapper.selectMhshrd010List(paramMap);
    }

    @Override
    public JSONObject findMhshrd010(EgovMapForNull paramMap) {
        try {

            Mhshrd010 entity = new Mhshrd010(mhshrd010Mapper.selectMhshrd010(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject saveMhshrd010(EgovMapForNull paramMap) throws Exceptions {

        try {

            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            Mhshrd010 entity = null;

            for(String ids : idsArr) {

                entity = new Mhshrd010(paramMap, ids);

                switch(entity.getNativeeditorStatus()) {
                case "deleted":

                    mhshrd010Mapper.deleteMhshrd010(entity);
                    break;

                default:

                    mhshrd010Mapper.saveMhshrd010(entity);
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
