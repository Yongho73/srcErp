package kr.co.dbvision.api.ynd.yta.yndyta001.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.ynd.yta.yndyta001.entity.Yndyta001;
import kr.co.dbvision.api.ynd.yta.yndyta001.service.Yndyta001Service;
import kr.co.dbvision.api.ynd.yta.yndyta001.service.mapper.Yndyta001Mapper;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 연말정산자료초기화관리에 관한 서비스 구현 클래스
 *
 * @author 디비비전
 * @since 2020.02.29
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.02.29          디비비전              최초 생성
 * </pre>
 */
@Service("Yndyta001Service")
@Transactional
public class Yndyta001ServiceImpl extends EgovAbstractServiceImpl implements Yndyta001Service {

    Logger logger = LogManager.getLogger(Yndyta001ServiceImpl.class);

    @Resource(name="Yndyta001Mapper")
    private Yndyta001Mapper yndyta001Mapper;

    public Yndyta001ServiceImpl() {
        //
    }

	@Override
	public JSONObject selectBelongYearList(EgovMapForNull paramMap) {
		try {
            return new JsonMsgMng().makeJsonObject(yndyta001Mapper.selectBelongYearList(paramMap));
        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
	}    
    
    @Override
    public JSONObject selectCntYndyta001(EgovMapForNull paramMap) {
        try {

            Yndyta001 entity = new Yndyta001(paramMap);
            int cnt = yndyta001Mapper.selectCntYndyta001(paramMap);
            entity.setCnt(cnt);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
	
    @Override
    public JSONObject deleteAllYndyta001(EgovMapForNull paramMap) {

        try {
            yndyta001Mapper.deleteAllYndyta001(paramMap);
            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
	
	
    
    @Override
    public JSONObject searchYndyta001(EgovMapForNull paramMap) {
        try {

            Yndyta001 entity = new Yndyta001(paramMap);
            List<EgovMapForNull> list = yndyta001Mapper.selectYndyta001List(paramMap);
            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @Override
    public List<EgovMapForNull> searchYndyta001ForExcel(EgovMapForNull paramMap) {

        return yndyta001Mapper.selectYndyta001List(paramMap);
    }

    @Override
    public JSONObject findYndyta001(EgovMapForNull paramMap) {
        try {

            Yndyta001 entity = new Yndyta001(yndyta001Mapper.selectYndyta001(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @Override
    public JSONObject saveYndyta001(EgovMapForNull paramMap) {

        try {

            yndyta001Mapper.saveYndyta001(paramMap);
            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @Override
    public JSONObject removeYndyta001(EgovMapForNull paramMap) {

        try {

            String empnos = StringExpression.nullConvert(paramMap.get("empnos"));
            String[] empnoArr = empnos.split("\\,");
            String belongYys = StringExpression.nullConvert(paramMap.get("belongYys"));
            String[] belongYyArr = belongYys.split("\\,");
            String calcYms = StringExpression.nullConvert(paramMap.get("calcYms"));
            String[] calcYmArr = calcYms.split("\\,");

            int arrLength = (calcYmArr == null) ? 0 : calcYmArr.length;
            EgovMapForNull mapper = null;

            for (int keyColumnIdx = 0; keyColumnIdx < arrLength; keyColumnIdx++) {

                mapper = new EgovMapForNull();
                mapper.put("empno", empnoArr[keyColumnIdx]);
                mapper.put("belongYy", belongYyArr[keyColumnIdx]);
                mapper.put("calcYm", calcYmArr[keyColumnIdx]);

                yndyta001Mapper.deleteYndyta001(mapper);
            }

            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
}
