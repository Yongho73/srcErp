package kr.co.dbvision.api.pjt.pmg.pjtpmg004.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.pjt.pmg.pjtpmg004.entity.Pjtpmg004;
import kr.co.dbvision.api.pjt.pmg.pjtpmg004.service.Pjtpmg004Service;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 프로젝트별투입현황에 관한 구현 클래스
 *
 * @author 표준프레임워크센터
 * @since 2020.01.15
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.01.15          디비비전              최초 생성
 *
 * </pre>
 */
@Service("Pjtpmg004Service")
@Transactional
public class Pjtpmg004ServiceImpl extends EgovAbstractServiceImpl implements Pjtpmg004Service {

    Logger logger = LogManager.getLogger(Pjtpmg004ServiceImpl.class);

    @Resource(name="Pjtpmg004Mapper")
    private Pjtpmg004Mapper pjtpmg004Mapper;
    
    private int listRowNumber = 0; // 넘버링 

    public Pjtpmg004ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchPjtHnfAcmslt(EgovMapForNull paramMap) {
        try {

            Pjtpmg004 entity = new Pjtpmg004(paramMap);
            listRowNumber = 1;
            
            List<EgovMapForNull> list = pjtpmg004Mapper.selectPjtHnfAcmsltList(paramMap).stream().map(mapper -> {
                mapper.put("num", listRowNumber++);
                return mapper;
            }).collect(Collectors.toList());
            
            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @Override
    public List<EgovMapForNull> searchPjtpmg004ForExcel(EgovMapForNull paramMap) {

        return pjtpmg004Mapper.selectPjtHnfAcmsltList(paramMap);
    }

    @Override
    public JSONObject findPjtHnfAcmslt(EgovMapForNull paramMap) {
        try {

            Pjtpmg004 entity = new Pjtpmg004(pjtpmg004Mapper.selectPjtHnfAcmslt(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @Override
    public JSONObject savePjtHnfAcmslt(EgovMapForNull paramMap) {

        try {

            pjtpmg004Mapper.insertPjtHnfAcmslt(paramMap);
            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @Override
    public JSONObject modifyPjtHnfAcmslt(EgovMapForNull paramMap) {

        try {

            pjtpmg004Mapper.updatePjtHnfAcmslt(paramMap);
            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @Override
    public JSONObject removePjtHnfAcmslt(EgovMapForNull paramMap) {

        try {

            String hnfAcmsltSns = StringExpression.nullConvert(paramMap.get("hnfAcmsltSns"));
            String[] hnfAcmsltSnArr = hnfAcmsltSns.split("\\,");

            int arrLength = (hnfAcmsltSnArr == null) ? 0 : hnfAcmsltSnArr.length;
            EgovMapForNull mapper = null;

            for (int keyColumnIdx = 0; keyColumnIdx < arrLength; keyColumnIdx++) {

                mapper = new EgovMapForNull();
                mapper.put("hnfAcmsltSn", hnfAcmsltSnArr[keyColumnIdx]);

                pjtpmg004Mapper.deletePjtHnfAcmslt(mapper);
            }

            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
}
