package kr.co.dbvision.api.stm.sys.stmsys007.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.stm.sys.stmsys007.entity.Stmsys007;
import kr.co.dbvision.api.stm.sys.stmsys007.service.Stmsys007Service;
import kr.co.dbvision.api.stm.sys.stmsys007.service.mapper.Stmsys007Mapper;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 전자결재환경관리관리에 관한 서비스 구현 클래스
 *
 * @author 디비비전
 * @since 2020.07.29
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.07.29)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.07.29          디비비전              최초 생성
 * </pre>
 */
@Service("Stmsys007Service")
@Transactional
public class Stmsys007ServiceImpl extends EgovAbstractServiceImpl implements Stmsys007Service {

    Logger logger = LogManager.getLogger(Stmsys007ServiceImpl.class);

    @Resource(name="Stmsys007Mapper")
    private Stmsys007Mapper stmsys007Mapper;

    private int listRowNumber = 0; // 넘버링 

    public Stmsys007ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchStmsys007(EgovMapForNull paramMap) {
        try {

            Stmsys007 entity = new Stmsys007(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = stmsys007Mapper.selectStmsys007List(paramMap).stream().map(mapper -> {
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
    public List<EgovMapForNull> searchStmsys007ForExcel(EgovMapForNull paramMap) {

        return stmsys007Mapper.selectStmsys007List(paramMap);
    }

    @Override
    public JSONObject findStmsys007(EgovMapForNull paramMap) {
        try {

            Stmsys007 entity = new Stmsys007(stmsys007Mapper.selectStmsys007(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject saveStmsys007(EgovMapForNull paramMap) throws Exceptions {

        try {

            stmsys007Mapper.saveStmsys007(paramMap);
            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            throw e;
        }
    }

}
