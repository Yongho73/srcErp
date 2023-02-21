package kr.co.dbvision.api.mhs.hrm.mhshrm010.service.impl;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.mhs.hrm.mhshrm005.entity.Mhshrm005;
import kr.co.dbvision.api.mhs.hrm.mhshrm010.entity.Mhshrm010;
import kr.co.dbvision.api.mhs.hrm.mhshrm010.service.Mhshrm010Service;
import kr.co.dbvision.api.mhs.hrm.mhshrm010.service.mapper.Mhshrm010Mapper;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.SessionMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 출장비기준코드관리에 관한 서비스 구현 클래스
 *
 * @author 디비비전
 * @since 2020.04.22
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.04.22          디비비전              최초 생성
 * </pre>
 */
@Service("Mhshrm010Service")
@Transactional
public class Mhshrm010ServiceImpl extends EgovAbstractServiceImpl implements Mhshrm010Service {

    Logger logger = LogManager.getLogger(Mhshrm010ServiceImpl.class);

    @Resource(name="Mhshrm010Mapper")
    private Mhshrm010Mapper mhshrm010Mapper;

    private int listRowNumber = 0; // 넘버링 

    public Mhshrm010ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchMhshrm010(EgovMapForNull paramMap) {
        try {

            Mhshrm010 entity = new Mhshrm010(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = mhshrm010Mapper.selectMhshrm010List(paramMap).stream().map(mapper -> {
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
    public List<EgovMapForNull> searchMhshrm010ForExcel(EgovMapForNull paramMap) {

        return mhshrm010Mapper.selectMhshrm010ListForExcel(paramMap);
    }

    @Override
    public JSONObject findMhshrm010(EgovMapForNull paramMap) {
        try {

            Mhshrm010 entity = new Mhshrm010(mhshrm010Mapper.selectMhshrm010(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject saveMhshrm010(EgovMapForNull paramMap) {

        try {

            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            Mhshrm010 entity = null;

            for(String ids : idsArr) {

                entity = new Mhshrm010(paramMap, ids);

                switch(entity.getNativeeditorStatus()) {
                case "deleted":

                    mhshrm010Mapper.deleteMhshrm010(entity);
                    break;

                default:

                    mhshrm010Mapper.saveMhshrm010(entity);
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

//    @Override
//    public JSONObject removeMhshrm010(EgovMapForNull paramMap) {
//
//        try {
//
//            String bsrpSeCodes = StringExpression.nullConvert(paramMap.get("bsrpSeCodes"));
//            String[] bsrpSeCodeArr = bsrpSeCodes.split("\\,");
//            String clsfCodes = StringExpression.nullConvert(paramMap.get("clsfCodes"));
//            String[] clsfCodeArr = clsfCodes.split("\\,");
//
//            int arrLength = (clsfCodeArr == null) ? 0 : clsfCodeArr.length;
//            
//            //사용된 이력이 있으면 삭제 불가 : 현재 사용 테이블  없음
//            EgovMapForNull mapperChk = null;
//			for (int keyColumnIdx = 0; keyColumnIdx < arrLength; keyColumnIdx++) {
//				mapperChk = new EgovMapForNull();
//				mapperChk.put("bsrpSeCode", bsrpSeCodeArr[keyColumnIdx]);
//				mapperChk.put("clsfCode", clsfCodeArr[keyColumnIdx]);
//				EgovMapForNull entity = mhshrm010Mapper.deleteMhshrm010UseChk(mapperChk);
//				if(Integer.parseInt((String)entity.get("cnt")) > 0) {
//
//					EgovMapForNull mapper = new EgovMapForNull();
//					mapper.put("code", "999");
//					mapper.put("msg", entity.get("tbl"));
//					
//					return new JsonMsgMng().makeJsonObject(mapper);
//				}
//			}
//			
//            EgovMapForNull mapper = null;
//
//            for (int keyColumnIdx = 0; keyColumnIdx < arrLength; keyColumnIdx++) {
//
//                mapper = new EgovMapForNull();
//                mapper.put("bsrpSeCode", bsrpSeCodeArr[keyColumnIdx]);
//                mapper.put("clsfCode", clsfCodeArr[keyColumnIdx]);
//
//                mhshrm010Mapper.deleteMhshrm010(mapper);
//            }
//
//            return new JsonMsgMng().makeJsonObject(paramMap);
//
//        } catch (Exception e) {
//            throw e;
//        }
//    }
}
