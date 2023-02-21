package kr.co.dbvision.api.mhs.hrm.mhshrm001.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.mhs.hrm.mhshrm001.entity.Mhshrm001;
import kr.co.dbvision.api.mhs.hrm.mhshrm001.service.Mhshrm001Service;
import kr.co.dbvision.api.mhs.hrm.mhshrm001.service.mapper.Mhshrm001Mapper;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 사업장관리에 관한 구현 클래스
 *
 * @author 표준프레임워크센터
 * @since 2019.05.14
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2019.05.14          디비비전              최초 생성
 *
 * </pre>
 */
@Service("Mhshrm001Service")
@Transactional
public class Mhshrm001ServiceImpl extends EgovAbstractServiceImpl implements Mhshrm001Service {

    Logger logger = LogManager.getLogger(Mhshrm001ServiceImpl.class);

    @Resource(name="Mhshrm001Mapper")
    private Mhshrm001Mapper Mhshrm001Mapper;
    
    private int listRowNumber = 0; // 넘버링 

    public Mhshrm001ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchMhshrm001(EgovMapForNull paramMap) {
        try {

            Mhshrm001 entity = new Mhshrm001(paramMap);
            listRowNumber = 1;
            List<EgovMapForNull> list = Mhshrm001Mapper.selectMhshrm001List(paramMap).stream().map(mapper -> {
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
    public List<EgovMapForNull> searchMhshrm001ForExcel(EgovMapForNull paramMap) {

        return Mhshrm001Mapper.selectMhshrm001List(paramMap);
    }

    @Override
    public JSONObject findMhshrm001(EgovMapForNull paramMap) {
        try {

            Mhshrm001 entity = new Mhshrm001(Mhshrm001Mapper.selectMhshrm001(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    /*@Override
    public JSONObject searchStmBizplcCode(EgovMapForNull paramMap) {
        try {
        	Mhshrm001 entity = new Mhshrm001(paramMap);
            List<EgovMapForNull> list = Mhshrm001Mapper.selectStmBizplcCodeList(paramMap);
            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);
        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }*/
    @Override
    public JSONObject searchStmBizplcCode(EgovMapForNull paramMap) {
    	try {
            return new JsonMsgMng().makeJsonObject(Mhshrm001Mapper.selectStmBizplcCodeList(paramMap));
        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    /*@Override
    public List<EgovMapForNull> searchStmBizplcCode(EgovMapForNull paramMap) {
    	List<EgovMapForNull> list = Mhshrm001Mapper.selectStmBizplcCodeList(paramMap);
    	return list;
    }*/

    @Override
    public JSONObject saveMhshrm001(EgovMapForNull paramMap) {

        try {

            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            Mhshrm001 entity = null;

            for(String ids : idsArr) {

                entity = new Mhshrm001(paramMap, ids);

                switch(entity.getNativeeditorStatus()) {
                case "deleted":

                    Mhshrm001Mapper.deleteMhshrm001(entity);
                    break;

                default:

                    Mhshrm001Mapper.saveMhshrm001(entity);
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
