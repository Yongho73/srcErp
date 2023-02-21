package kr.co.dbvision.api.mhs.hrc.mhshrc003.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.mhs.hrc.mhshrc003.entity.Mhshrc003;
import kr.co.dbvision.api.mhs.hrc.mhshrc003.service.Mhshrc003Service;
import kr.co.dbvision.api.mhs.hrc.mhshrc003.service.mapper.Mhshrc003Mapper;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 증명서발급대장관리에 관한 서비스 구현 클래스
 *
 * @author 디비비전
 * @since 2020.08.27
 * @version 1.0
 * @sourceGen version 2020.08.06.01 (2020.08.27)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.08.27          디비비전              최초 생성
 * </pre>
 */
@Service("Mhshrc003Service")
@Transactional
public class Mhshrc003ServiceImpl extends EgovAbstractServiceImpl implements Mhshrc003Service {

    Logger logger = LogManager.getLogger(Mhshrc003ServiceImpl.class);

    @Resource(name="Mhshrc003Mapper")
    private Mhshrc003Mapper mhshrc003Mapper;

    private int listRowNumber = 0; // 넘버링 

    public Mhshrc003ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchMhshrc003(EgovMapForNull paramMap) {
        try {

            Mhshrc003 entity = new Mhshrc003(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = mhshrc003Mapper.selectMhshrc003List(paramMap).stream().map(mapper -> {
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
    public List<EgovMapForNull> searchMhshrc003ForExcel(EgovMapForNull paramMap) {

        return mhshrc003Mapper.selectMhshrc003List(paramMap);
    }

    @Override
    public JSONObject findMhshrc003(EgovMapForNull paramMap) {
        try {

            Mhshrc003 entity = new Mhshrc003(mhshrc003Mapper.selectMhshrc003(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject saveMhshrc003(EgovMapForNull paramMap) throws Exceptions {

        try {

            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            Mhshrc003 entity = null;

            for(String ids : idsArr) {

                entity = new Mhshrc003(paramMap, ids);

                switch(entity.getNativeeditorStatus()) {
                case "deleted":

                    mhshrc003Mapper.deleteMhshrc003(entity);
                    break;

                default:

                    mhshrc003Mapper.saveMhshrc003(entity);
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
