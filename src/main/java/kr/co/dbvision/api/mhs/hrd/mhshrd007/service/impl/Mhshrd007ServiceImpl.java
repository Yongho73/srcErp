package kr.co.dbvision.api.mhs.hrd.mhshrd007.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.mhs.hrd.mhshrd007.entity.Mhshrd007;
import kr.co.dbvision.api.mhs.hrd.mhshrd007.service.Mhshrd007Service;
import kr.co.dbvision.api.mhs.hrd.mhshrd007.service.mapper.Mhshrd007Mapper;
import kr.co.dbvision.api.mhs.hrm.mhshrm004.entity.Mhshrm004;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 근태기준설정관리에 관한 서비스 구현 클래스
 *
 * @author 디비비전
 * @since 2020.05.22
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.05.22          디비비전              최초 생성
 * </pre>
 */
@Service("Mhshrd007Service")
@Transactional
public class Mhshrd007ServiceImpl extends EgovAbstractServiceImpl implements Mhshrd007Service {

    Logger logger = LogManager.getLogger(Mhshrd007ServiceImpl.class);

    @Resource(name="Mhshrd007Mapper")
    private Mhshrd007Mapper mhshrd007Mapper;

    private int listRowNumber = 0; // 넘버링 

    public Mhshrd007ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchMhshrd007(EgovMapForNull paramMap) {
        try {

            Mhshrd007 entity = new Mhshrd007(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = mhshrd007Mapper.selectMhshrd007List(paramMap).stream().map(mapper -> {
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
    public JSONObject searchStandardMhshrd007(EgovMapForNull paramMap) {
        try {

            Mhshrd007 entity = new Mhshrd007(paramMap);
            List<EgovMapForNull> list = mhshrd007Mapper.selectStandardMhshrd007List(paramMap);
            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public List<EgovMapForNull> searchMhshrd007ForExcel(EgovMapForNull paramMap) {

        return mhshrd007Mapper.selectMhshrd007List(paramMap);
    }

    @Override
    public JSONObject findMhshrd007(EgovMapForNull paramMap) {
        try {

            Mhshrd007 entity = new Mhshrd007(mhshrd007Mapper.selectMhshrd007(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject saveMhshrd007(EgovMapForNull paramMap) {

        try {
            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            Mhshrd007 entity = null;

            for(String ids : idsArr) {
                System.out.println(paramMap);
                entity = new Mhshrd007(paramMap, ids);

                switch(entity.getNativeeditorStatus()) {
                case "deleted":

                    mhshrd007Mapper.deleteMhshrd007(entity);
                    break;
                case "inserted" :
                    mhshrd007Mapper.deleteMhshrd007(entity);
                    mhshrd007Mapper.saveAddStandardMhshrd007(entity);
                default:
                    mhshrd007Mapper.saveMhshrd007(entity);
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
    
    @Override
    public JSONObject saveStandardMhshrd007(EgovMapForNull paramMap) {

        try {

            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            
            Mhshrd007 entity = null;

            for(String ids : idsArr) {

                entity = new Mhshrd007(paramMap, ids);
                mhshrd007Mapper.saveStandardMhshrd007(entity);
            }

            EgovMapForNull returnMap = new EgovMapForNull();
            returnMap.put("code", "000");
            returnMap.put("message", "SUCCESS");

            return new JsonMsgMng().makeJsonObject(returnMap);

        } catch (Exception e) {
            throw e;
        }
    }
    
  //근무유형 콤보 목록을 조회한다.
    @Override
    public JSONObject selectMhshrd007WorkTyCode(EgovMapForNull paramMap) {
        try {

            Mhshrm004 entity = new Mhshrm004(paramMap);
            List<EgovMapForNull> list = mhshrd007Mapper.selectMhshrd007WorkTyCode(paramMap);
            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

}
