package kr.co.dbvision.api.ets.bst.etsbst001.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.ets.bst.etsbst001.entity.Etsbst001;
import kr.co.dbvision.api.ets.bst.etsbst001.service.Etsbst001Service;
import kr.co.dbvision.api.ets.bst.etsbst001.service.mapper.Etsbst001Mapper;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 전결규정관리에 관한 서비스 구현 클래스
 *
 * @author 디비비전
 * @since 2021.03.22
 * @version 1.0
 * @sourceGen version 2021.02.18.01 (2021.03.22)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2021.03.22          디비비전              최초 생성
 * </pre>
 */
@Service("Etsbst001Service")
@Transactional
public class Etsbst001ServiceImpl extends EgovAbstractServiceImpl implements Etsbst001Service {

    Logger logger = LogManager.getLogger(Etsbst001ServiceImpl.class);

    @Resource(name="Etsbst001Mapper")
    private Etsbst001Mapper etsbst001Mapper;

    private int listRowNumber = 0; // 넘버링 

    public Etsbst001ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchEtsbst001(EgovMapForNull paramMap) {
        try {

            Etsbst001 entity = new Etsbst001(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = etsbst001Mapper.selectEtsbst001List(paramMap).stream().map(mapper -> {
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
    public List<EgovMapForNull> searchEtsbst001ForExcel(EgovMapForNull paramMap) {

        return etsbst001Mapper.selectEtsbst001List(paramMap);
    }

    @Override
    public JSONObject findEtsbst001(EgovMapForNull paramMap) {
        try {

            Etsbst001 entity = new Etsbst001(etsbst001Mapper.selectEtsbst001(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject saveEtsbst001(EgovMapForNull paramMap) throws Exceptions {

        try {

            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            Etsbst001 entity = null;

            for(String ids : idsArr) {

                entity = new Etsbst001(paramMap, ids);

                switch(entity.getNativeeditorStatus()) {
                case "deleted":

                    etsbst001Mapper.deleteEtsbst001(entity);
                    break;

                default:

                    etsbst001Mapper.saveEtsbst001(entity);
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
    


	@Override
	public JSONObject searchSanctnLvl(EgovMapForNull paramMap) {
		try {
            return new JsonMsgMng().makeJsonObject(etsbst001Mapper.searchSanctnLvl());
        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
	}

}
