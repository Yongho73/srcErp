package kr.co.dbvision.api.mhs.hrd.mhshrd008.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.mhs.hrd.mhshrd008.entity.Mhshrd008;
import kr.co.dbvision.api.mhs.hrd.mhshrd008.service.Mhshrd008Service;
import kr.co.dbvision.api.mhs.hrd.mhshrd008.service.mapper.Mhshrd008Mapper;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;


/**
 * 근태시간코드관리에 관한 서비스 구현 클래스
 *
 * @author 디비비전
 * @since 2020.06.08
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.06.08          디비비전              최초 생성
 * </pre>
 */
@Service("Mhshrd008Service")
@Transactional
public class Mhshrd008ServiceImpl extends EgovAbstractServiceImpl implements Mhshrd008Service {

    Logger logger = LogManager.getLogger(Mhshrd008ServiceImpl.class);

    @Resource(name="Mhshrd008Mapper")
    private Mhshrd008Mapper mhshrd008Mapper;
    
    private int totalCount = 0;

    public Mhshrd008ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchMhshrd008(EgovMapForNull paramMap) {
        try {

            Mhshrd008 entity = new Mhshrd008(paramMap);
            List<EgovMapForNull> list = mhshrd008Mapper.selectMhshrd008List(paramMap);
            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public List<EgovMapForNull> searchMhshrd008ForExcel(EgovMapForNull paramMap) {

        return mhshrd008Mapper.selectMhshrd008List(paramMap);
    }

    @Override
    public JSONObject findMhshrd008(EgovMapForNull paramMap) {
        try {

            Mhshrd008 entity = new Mhshrd008(mhshrd008Mapper.selectMhshrd008(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    //public JSONObject saveMhshrd008(EgovMapForNull paramMap) throws Exceptions {
    @Override
    public JSONObject saveMhshrd008(EgovMapForNull paramMap) throws Exceptions {

        try {

            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            Mhshrd008 entity = null;

            for(String ids : idsArr) {

                entity = new Mhshrd008(paramMap, ids);

                switch(entity.getNativeeditorStatus()) {
                case "deleted":

                    mhshrd008Mapper.deleteMhshrd008(entity);
                    break;

                default:

                    mhshrd008Mapper.saveMhshrd008(entity);
                    break;
                }
            }
            
            totalCount = 0;
            
            List<EgovMapForNull> list = mhshrd008Mapper.searchMhshrd008List().stream().map(mapper -> {                
                //mapper.replace("rnum", listRowNumber--);     
                
                int Count = mhshrd008Mapper.selectMhshrd008Count(mapper);
                
                if(Count > 0) {
                    totalCount = Count;
                }

                
                return mapper;
            }).collect(Collectors.toList());
            
            if(totalCount > 0) {
                throw new Exceptions("시간 중복이 있습니다. \n 확인 후 저장하시기 바랍니다",222);
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
