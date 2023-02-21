package kr.co.dbvision.api.mhs.hrm.mhshrm002.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.mhs.hrm.mhshrm002.entity.Mhshrm002;
import kr.co.dbvision.api.mhs.hrm.mhshrm002.service.Mhshrm002Service;
import kr.co.dbvision.api.mhs.hrm.mhshrm002.service.mapper.Mhshrm002Mapper;
import kr.co.dbvision.api.mhs.hrm.mhshrm003.entity.Mhshrm003;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 부서코드등록관리에 관한 서비스 구현 클래스
 *
 * @author 디비비전
 * @since 2020.08.19
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.08.19)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.08.19          디비비전              최초 생성
 * </pre>
 */
@Service("Mhshrm002Service")
@Transactional
public class Mhshrm002ServiceImpl extends EgovAbstractServiceImpl implements Mhshrm002Service {

    Logger logger = LogManager.getLogger(Mhshrm002ServiceImpl.class);

    @Resource(name="Mhshrm002Mapper")
    private Mhshrm002Mapper mhshrm002Mapper;

    private int listRowNumber = 0; // 넘버링 

    public Mhshrm002ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchMhshrm002(EgovMapForNull paramMap) {
        try {

            Mhshrm002 entity = new Mhshrm002(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = mhshrm002Mapper.selectMhshrm002List(paramMap).stream().map(mapper -> {
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
    public List<EgovMapForNull> searchMhshrm002ForExcel(EgovMapForNull paramMap) {

        return mhshrm002Mapper.selectMhshrm002List(paramMap);
    }

    @Override
    public JSONObject findMhshrm002(EgovMapForNull paramMap) {
        try {

            Mhshrm002 entity = new Mhshrm002(mhshrm002Mapper.selectMhshrm002(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }
    
    @Override
    public JSONObject findMhshrm003(EgovMapForNull paramMap) {
        try {

            Mhshrm002 entity = new Mhshrm002(mhshrm002Mapper.findMhshrm003(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }
    
    @Override
    public JSONObject deleteMhshrm002(EgovMapForNull paramMap) throws Exceptions {

        try {
            Mhshrm002 entity = null;
            
            entity = new Mhshrm002(paramMap);

            mhshrm002Mapper.deleteMhshrm003(entity);
            mhshrm002Mapper.deleteMhshrm002(entity);

            EgovMapForNull returnMap = new EgovMapForNull();
            returnMap.put("code", "000");
            returnMap.put("message", "SUCCESS");

            return new JsonMsgMng().makeJsonObject(returnMap);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject saveMhshrm002(EgovMapForNull paramMap) throws Exceptions {

        try {
            
            System.out.println('1');

            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            Mhshrm002 entity = null;

            for(String ids : idsArr) {

                entity = new Mhshrm002(paramMap, ids);
                System.out.println('2');

                String deptUseAt = entity.getUseAt();

                switch(entity.getNativeeditorStatus()) {
                case "deleted":
//                    mhshrm002Mapper.deleteMhshrm003(entity);
//                    mhshrm002Mapper.deleteMhshrm002(entity);
                    break;

                default:
                    System.out.println('4');

                    mhshrm002Mapper.saveMhshrm002(entity);
                    mhshrm002Mapper.saveMhshrm003(entity);
                    
                    if(deptUseAt.equals("0")) { //부서에 해당하는 조직 모두 사용 해
                        mhshrm002Mapper.updateMhshrm002UseAtOff(entity);
                    }
                    
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
    
    //부서코드 콤보 목록을 조회한다.
    @Override
    public JSONObject selectMhshrm002DeptCodeCombo(EgovMapForNull paramMap) {
        try {

            Mhshrm002 entity = new Mhshrm002(paramMap);
            List<EgovMapForNull> list = mhshrm002Mapper.selectMhshrm002DeptCodeCombo(paramMap);
            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

}
