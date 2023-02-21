package kr.co.dbvision.api.mhs.hrm.mhshrm014.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.mhs.hrm.mhshrm014.entity.Mhshrm014;
import kr.co.dbvision.api.mhs.hrm.mhshrm014.service.Mhshrm014Service;
import kr.co.dbvision.api.mhs.hrm.mhshrm014.service.mapper.Mhshrm014Mapper;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 직책관리관리에 관한 서비스 구현 클래스
 *
 * @author 디비비전
 * @since 2020.03.17
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.03.17          디비비전              최초 생성
 * </pre>
 */
@Service("Mhshrm014Service")
@Transactional
public class Mhshrm014ServiceImpl extends EgovAbstractServiceImpl implements Mhshrm014Service {

    Logger logger = LogManager.getLogger(Mhshrm014ServiceImpl.class);

    @Resource(name="Mhshrm014Mapper")
    private Mhshrm014Mapper mhshrm014Mapper;

    private int listRowNumber = 0; // 넘버링 

    public Mhshrm014ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchMhshrm014(EgovMapForNull paramMap) {
        try {

            Mhshrm014 entity = new Mhshrm014(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = mhshrm014Mapper.selectMhshrm014List(paramMap).stream().map(mapper -> {
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
    public List<EgovMapForNull> searchMhshrm014ForExcel(EgovMapForNull paramMap) {

        return mhshrm014Mapper.selectMhshrm014List(paramMap);
    }

    @Override
    public JSONObject findMhshrm014(EgovMapForNull paramMap) {
        try {

            Mhshrm014 entity = new Mhshrm014(mhshrm014Mapper.selectMhshrm014(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject saveMhshrm014(EgovMapForNull paramMap) {

        try {

            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            Mhshrm014 entity = null;

            for(String ids : idsArr) {

                entity = new Mhshrm014(paramMap, ids);

                switch(entity.getNativeeditorStatus()) {
                case "deleted":

                    mhshrm014Mapper.deleteMhshrm014(entity);
                    break;

                default:

                    mhshrm014Mapper.saveMhshrm014(entity);
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

    /* 코드 사용 여부를 조회 */
    @Override
    public JSONObject useCheckMhshrm014(EgovMapForNull paramMap) {
        try {

            Mhshrm014 entity = new Mhshrm014(mhshrm014Mapper.useCheckMhshrm014(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    //직급코드 콤보 목록을 조회한다.
      @Override
      public JSONObject selectMhshrm014RspofcCodeCombo(EgovMapForNull paramMap) {
          try {

              Mhshrm014 entity = new Mhshrm014(paramMap);
              List<EgovMapForNull> list = mhshrm014Mapper.selectMhshrm014RspofcCodeCombo(paramMap);
              entity.setRecords(list);
              return new JsonMsgMng().makeJsonObject(entity);

          } catch (Exception e) {
              return new Exceptions(new Throwable(), e).getResultStatus();
          }
      }
}
