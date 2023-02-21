package kr.co.dbvision.api.pub.edu.pubedu003.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.pub.edu.pubedu003.entity.Pubedu003;
import kr.co.dbvision.api.pub.edu.pubedu003.service.Pubedu003Service;
import kr.co.dbvision.api.pub.edu.pubedu003.service.mapper.Pubedu003Mapper;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 테스트관리에 관한 서비스 구현 클래스
 *
 * @author 디비비전
 * @since 2021.06.22
 * @version 1.0
 * @sourceGen version 2021.02.18.01 (2021.06.22)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2021.06.22          디비비전              최초 생성
 * </pre>
 */
@Service("Pubedu003Service")
@Transactional
public class Pubedu003ServiceImpl extends EgovAbstractServiceImpl implements Pubedu003Service {

    Logger logger = LogManager.getLogger(Pubedu003ServiceImpl.class);

    @Resource(name="Pubedu003Mapper")
    private Pubedu003Mapper pubedu003Mapper;

    private int listRowNumber = 0; // 넘버링 

    public Pubedu003ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchPubedu003(EgovMapForNull paramMap) {
        try {

            Pubedu003 entity = new Pubedu003(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = pubedu003Mapper.selectPubedu003List(paramMap).stream().map(mapper -> {
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
    public List<EgovMapForNull> searchPubedu003ForExcel(EgovMapForNull paramMap) {

        return pubedu003Mapper.selectPubedu003List(paramMap);
    }

    @Override
    public JSONObject findPubedu003(EgovMapForNull paramMap) {
        try {

            Pubedu003 entity = new Pubedu003(pubedu003Mapper.selectPubedu003(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject savePubedu003(EgovMapForNull paramMap) throws Exceptions {

        try {

            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            Pubedu003 entity = null;

            for(String ids : idsArr) {

                entity = new Pubedu003(paramMap, ids);

                switch(entity.getNativeeditorStatus()) {
                case "deleted":

                    pubedu003Mapper.deletePubedu003(entity);
                    break;

                default:

                    pubedu003Mapper.savePubedu003(entity);
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
