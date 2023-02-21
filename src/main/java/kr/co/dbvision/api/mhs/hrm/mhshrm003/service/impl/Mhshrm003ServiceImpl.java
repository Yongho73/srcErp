package kr.co.dbvision.api.mhs.hrm.mhshrm003.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.mhs.hrm.mhshrm003.entity.Mhshrm003;
import kr.co.dbvision.api.mhs.hrm.mhshrm003.service.Mhshrm003Service;
import kr.co.dbvision.api.mhs.hrm.mhshrm003.service.mapper.Mhshrm003Mapper;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 조직코드관리관리에 관한 서비스 구현 클래스
 *
 * @author 디비비전
 * @since 2020.08.20
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.08.20)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.08.20          디비비전              최초 생성
 * </pre>
 */
@Service("Mhshrm003Service")
@Transactional
public class Mhshrm003ServiceImpl extends EgovAbstractServiceImpl implements Mhshrm003Service {

    Logger logger = LogManager.getLogger(Mhshrm003ServiceImpl.class);

    @Resource(name="Mhshrm003Mapper")
    private Mhshrm003Mapper mhshrm003Mapper;

    private int listRowNumber = 0; // 넘버링 

    public Mhshrm003ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchMhshrm003(EgovMapForNull paramMap) {
        try {

            Mhshrm003 entity = new Mhshrm003(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = mhshrm003Mapper.selectMhshrm003List(paramMap).stream().map(mapper -> {
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
    public List<EgovMapForNull> searchMhshrm003ForExcel(EgovMapForNull paramMap) {

        return mhshrm003Mapper.selectMhshrm003List(paramMap);
    }

    @Override
    public JSONObject findMhshrm003(EgovMapForNull paramMap) {
        try {

            Mhshrm003 entity = new Mhshrm003(mhshrm003Mapper.selectMhshrm003(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject saveMhshrm003(EgovMapForNull paramMap) throws Exceptions {

        try {
            Mhshrm003 entity = null;
            
            entity = new Mhshrm003(paramMap);
            
            String orgnztUseAt = paramMap.get("useAt").toString();
            
            mhshrm003Mapper.saveMhshrm003(entity);
            mhshrm003Mapper.saveMhshrm002(entity);
            
            if(orgnztUseAt.equals("0")) { //하위 3단계 모두 미사용 처리
                mhshrm003Mapper.updateMhshrm003UseAtOff(paramMap);
            }
            else if(orgnztUseAt.equals("1")) { //상위 3단계 모두 사용 처리
                mhshrm003Mapper.updateMhshrm003UseAtOn(paramMap);
                mhshrm003Mapper.updateMhshrm002UseAtOn(paramMap);
            }

            EgovMapForNull returnMap = new EgovMapForNull();
            returnMap.put("code", "000");
            returnMap.put("message", "SUCCESS");

            return new JsonMsgMng().makeJsonObject(returnMap);

        } catch (Exception e) {
            throw e;
        }
    }
    
    //삭제 전 데이터 조회
    @Override
    public JSONObject deleteCheckMhshrm003(EgovMapForNull paramMap) {
        try {

            Mhshrm003 entity = new Mhshrm003(mhshrm003Mapper.deleteCheckMhshrm003(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }
    
    @Override
    public JSONObject deleteMhshrm003(EgovMapForNull paramMap) throws Exceptions {

        try {
            Mhshrm003 entity = null;
            
            entity = new Mhshrm003(paramMap);
            
            mhshrm003Mapper.deleteMhshrm003(entity);

            EgovMapForNull returnMap = new EgovMapForNull();
            returnMap.put("code", "000");
            returnMap.put("message", "SUCCESS");

            return new JsonMsgMng().makeJsonObject(returnMap);

        } catch (Exception e) {
            throw e;
        }
    }

}
