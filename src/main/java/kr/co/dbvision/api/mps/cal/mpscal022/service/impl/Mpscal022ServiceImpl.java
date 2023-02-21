package kr.co.dbvision.api.mps.cal.mpscal022.service.impl;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.mhs.hrb.mhshrb001.entity.Mhshrb001_TAB11;
import kr.co.dbvision.api.mps.cal.mpscal022.entity.Mpscal022;
import kr.co.dbvision.api.mps.cal.mpscal022.entity.MpscalAcnut;
import kr.co.dbvision.api.mps.cal.mpscal022.entity.MpscalCrqfs;
import kr.co.dbvision.api.mps.cal.mpscal022.entity.MpscalFamily;
import kr.co.dbvision.api.mps.cal.mpscal022.entity.MpscalStdr;
import kr.co.dbvision.api.mps.cal.mpscal022.service.Mpscal022Service;
import kr.co.dbvision.api.mps.cal.mpscal022.service.mapper.Mpscal022Mapper;
import kr.co.dbvision.api.mps.cal.mpscal022.service.mapper.MpscalAcnutMapper;
import kr.co.dbvision.api.mps.cal.mpscal022.service.mapper.MpscalCrqfsMapper;
import kr.co.dbvision.api.mps.cal.mpscal022.service.mapper.MpscalFamilyMapper;
import kr.co.dbvision.api.mps.cal.mpscal022.service.mapper.MpscalStdrMapper;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.SessionMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 개인별급여기준등록관리에 관한 서비스 구현 클래스
 *
 * @author 디비비전
 * @since 2020.07.07
 * @version 1.0
 * @sourceGen version 2020.06.29.01 (2020.07.07)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.07.07          디비비전              최초 생성
 * </pre>
 */
@Service("Mpscal022Service")
@Transactional
public class Mpscal022ServiceImpl extends EgovAbstractServiceImpl implements Mpscal022Service {

    Logger logger = LogManager.getLogger(Mpscal022ServiceImpl.class);

    @Resource(name="Mpscal022Mapper")
    private Mpscal022Mapper mpscal022Mapper;
    
    @Resource(name="MpscalFamilyMapper")
    private MpscalFamilyMapper mpscalFamilyMapper;
    
    @Resource(name="MpscalAcnutMapper")
    private MpscalAcnutMapper mpscalAcnutMapper;
    
    @Resource(name="MpscalCrqfsMapper")
    private MpscalCrqfsMapper mpscalCrqfsMapper;
    
    @Resource(name="MpscalStdrMapper")
    private MpscalStdrMapper mpscalStdrMapper;

    private int listRowNumber = 0; // 넘버링 

    public Mpscal022ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchMpscal022(EgovMapForNull paramMap) {
        try {

            Mpscal022 entity = new Mpscal022(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = mpscal022Mapper.selectMpscal022List(paramMap).stream().map(mapper -> {
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
    public List<EgovMapForNull> searchMpscal022ForExcel(EgovMapForNull paramMap) {

        return mpscal022Mapper.selectMpscal022List(paramMap);
    }

    @Override
    public JSONObject findMpscal022(EgovMapForNull paramMap) {
        try {

            Mpscal022 entity = new Mpscal022(mpscal022Mapper.selectMpscal022(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject saveMpscal022(EgovMapForNull paramMap) throws Exceptions {

        try {

            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            Mpscal022 entity = null;

            for(String ids : idsArr) {

                entity = new Mpscal022(paramMap, ids);

                switch(entity.getNativeeditorStatus()) {
                case "deleted":

                    mpscal022Mapper.deleteMpscal022(entity);
                    break;

                    
                case "inserted":
                    
                    mpscal022Mapper.saveMpscal022(entity);
                    break;
                    
                case "updated":
                    
                    mpscal022Mapper.saveMpscal022(entity);
                    break;    
                default:
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
    public JSONObject searchMpscalEmp(EgovMapForNull paramMap) {
        try {

            Mpscal022 entity = new Mpscal022(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = mpscal022Mapper.selectMpscalEmpList(paramMap).stream().map(mapper -> {
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
    public JSONObject modifyMhsEmp(EgovMapForNull paramMap) {
        
        try {

            mpscal022Mapper.updateMhsEmp(paramMap);
            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    
    @Override
    public JSONObject searchMpscalFamily(EgovMapForNull paramMap) {
        try {

            MpscalFamily entity = new MpscalFamily(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = mpscalFamilyMapper.selectMpscalFamilyList(paramMap).stream().map(mapper -> {
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
    public JSONObject findMpscalFamily(EgovMapForNull paramMap) {
        try {

            MpscalFamily entity = new MpscalFamily(mpscalFamilyMapper.selectMpscalFamily(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject saveMpscalFamily(EgovMapForNull paramMap) throws Exceptions {

        try {

            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            MpscalFamily entity = null;

            for(String ids : idsArr) {
                
                System.out.println("ids : " + ids);

                entity = new MpscalFamily(paramMap, ids);
                
                System.out.println(entity.toString());

                switch(entity.getNativeeditorStatus()) {
                case "deleted":

                    mpscalFamilyMapper.deleteMpscalFamily(entity);
                    break;
                case "updated":
                    mpscalFamilyMapper.saveMpscalFamily(entity);
                    break;
                default:

                    break;
                }
            }
            //if(false) { throw new Exceptions("Error."); } 

            EgovMapForNull returnMap = new EgovMapForNull();
            returnMap.put("code", "000");
            returnMap.put("message", "SUCCESS");

            return new JsonMsgMng().makeJsonObject(returnMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    
    @Override
    public JSONObject searchMpscalAcnut(EgovMapForNull paramMap) {
        try {

            MpscalAcnut entity = new MpscalAcnut(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = mpscalAcnutMapper.selectMpscalAcnutList(paramMap).stream().map(mapper -> {
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
    public JSONObject findMpscalAcnut(EgovMapForNull paramMap) {
        try {

            MpscalAcnut entity = new MpscalAcnut(mpscalAcnutMapper.selectMpscalAcnut(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject saveMpscalAcnut(EgovMapForNull paramMap) throws Exceptions {

        try {
            Map<String, Object> sessionMap = (Map<String, Object>) SessionMng.getCommonSession();
            String userId = "";
            if (sessionMap == null) {
                return null;
            } else {
                userId = StringExpression.nullConvert(sessionMap.get("userId"));
    
                if (StringExpression.isEmpty(userId)) {
                    return null;
                } else {
                    paramMap.put("regId", userId);
                }
            }

            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            MpscalAcnut entity = null;

            for(String ids : idsArr) {

                entity = new MpscalAcnut(paramMap, ids);
                entity.setRegId(userId);
                entity.setUptId(userId);

                switch(entity.getNativeeditorStatus()) {
                case "updated":
                    mpscalAcnutMapper.saveMpscalAcnut(entity);
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
    public JSONObject searchMpscalCrqfs(EgovMapForNull paramMap) {
        try {

            MpscalCrqfs entity = new MpscalCrqfs(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = mpscalCrqfsMapper.selectMpscalCrqfsList(paramMap).stream().map(mapper -> {
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
    public JSONObject findMpscalCrqfs(EgovMapForNull paramMap) {
        try {

            MpscalCrqfs entity = new MpscalCrqfs(mpscalCrqfsMapper.selectMpscalCrqfs(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject saveMpscalCrqfs(EgovMapForNull paramMap) throws Exceptions {

        try {

            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            MpscalCrqfs entity = null;

            for(String ids : idsArr) {

                entity = new MpscalCrqfs(paramMap, ids);

                switch(entity.getNativeeditorStatus()) {
                case "deleted":

                    mpscalCrqfsMapper.deleteMpscalCrqfs(entity);
                    break;

                default:

                    mpscalCrqfsMapper.saveMpscalCrqfs(entity);
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
    public JSONObject searchMpscalStdr(EgovMapForNull paramMap) {
        try {

            MpscalStdr entity = new MpscalStdr(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = mpscalStdrMapper.selectMpscalStdrList(paramMap).stream().map(mapper -> {
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
    public JSONObject findMpscalStdr(EgovMapForNull paramMap) {
        try {

            MpscalStdr entity = new MpscalStdr(mpscalStdrMapper.selectMpscalStdr(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public JSONObject saveMpscalStdr(EgovMapForNull paramMap) throws Exceptions {

        try {

            String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
            MpscalStdr entity = null;

            for(String ids : idsArr) {

                entity = new MpscalStdr(paramMap, ids);

                switch(entity.getNativeeditorStatus()) {
                case "deleted":

                    mpscalStdrMapper.deleteMpscalStdr(entity);
                    break;

                default:

                    mpscalStdrMapper.saveMpscalStdrApplcs(entity);
                    mpscalStdrMapper.saveMpscalStdrCalc(entity);
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
