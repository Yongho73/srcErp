package kr.co.dbvision.api.mfs.bsc.mfsbsc001.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.mfs.bsc.mfsbsc001.entity.Mfsbsc001;
import kr.co.dbvision.api.mfs.bsc.mfsbsc001.service.Mfsbsc001Service;
import kr.co.dbvision.api.mfs.bsc.mfsbsc001.service.mapper.Mfsbsc001Mapper;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import net.sf.json.JSONObject;

/**
 * 계정과목관리관리에 관한 서비스 구현 클래스
 *
 * @author 디비비전
 * @since 2020.04.21
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.04.21          디비비전              최초 생성
 * </pre>
 */
@Service("Mfsbsc001Service")
@Transactional
public class Mfsbsc001ServiceImpl extends EgovAbstractServiceImpl implements Mfsbsc001Service {

    Logger logger = LogManager.getLogger(Mfsbsc001ServiceImpl.class);

    @Resource(name="Mfsbsc001Mapper")
    private Mfsbsc001Mapper mfsbsc001Mapper;
    
    private int listRowNumber = 0; // 넘버링 

    public Mfsbsc001ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchMfsbsc001(EgovMapForNull paramMap) {
        try {

            Mfsbsc001 entity = new Mfsbsc001(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = mfsbsc001Mapper.selectMfsbsc001List(paramMap).stream().map(mapper -> {
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
    public List<EgovMapForNull> searchMfsbsc001ForExcel(EgovMapForNull paramMap) {

        return mfsbsc001Mapper.selectMfsbsc001List(paramMap);
    }

    @Override
    public JSONObject findMfsbsc001(EgovMapForNull paramMap) {
        try {

            Mfsbsc001 entity = new Mfsbsc001(mfsbsc001Mapper.selectMfsbsc001(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject saveMfsbsc001(EgovMapForNull paramMap) {

        try {

            mfsbsc001Mapper.saveMfsbsc001(paramMap);
            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject removeMfsbsc001(EgovMapForNull paramMap) {

        try {
            
            mfsbsc001Mapper.deleteMfsbsc001(paramMap);
            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            throw e;
        }
    }
}
