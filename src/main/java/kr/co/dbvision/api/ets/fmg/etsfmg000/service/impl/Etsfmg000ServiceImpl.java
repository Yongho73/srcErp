package kr.co.dbvision.api.ets.fmg.etsfmg000.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import egovframework.rte.fdl.idgnr.EgovIdGnrService;
import kr.co.dbvision.api.ets.fmg.etsfmg000.entity.Etsfmg000;
import kr.co.dbvision.api.ets.fmg.etsfmg000.entity.Etsfmg000Item;
import kr.co.dbvision.api.ets.fmg.etsfmg000.service.Etsfmg000Service;
import kr.co.dbvision.api.ets.fmg.etsfmg000.service.mapper.Etsfmg000Mapper;
import kr.co.dbvision.api.stm.bsc.stmbsc006.entity.Stmbsc006;
import kr.co.dbvision.api.stm.bsc.stmbsc006.service.Stmbsc006Service;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 양식관리관리에 관한 서비스 구현 클래스
 *
 * @author 디비비전
 * @since 2021.03.18
 * @version 1.0
 * @sourceGen version 2021.02.18.01 (2021.03.18)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2021.03.18          디비비전              최초 생성
 * </pre>
 */
@Service("Etsfmg000Service")
@Transactional
public class Etsfmg000ServiceImpl extends EgovAbstractServiceImpl implements Etsfmg000Service {

    Logger logger = LogManager.getLogger(Etsfmg000ServiceImpl.class);
    
    @Resource(name="Stmbsc006Service")
    public Stmbsc006Service stmbsc006Service;
    
    @Resource(name="Etsfmg000Mapper")
    private Etsfmg000Mapper etsfmg000Mapper;
    
    @Resource(name="RaisSnGnrService")
    private EgovIdGnrService raisSn;

    private int listRowNumber = 0; // 넘버링 

    public Etsfmg000ServiceImpl() {
        //
    }

    @Override
    public JSONObject searchEtsfmg000(Etsfmg000 entity) throws Exceptions {
        try {
            
            listRowNumber = 1;

            List<EgovMapForNull> list = etsfmg000Mapper.selectEtsfmg000List(entity).stream().map(mapper -> {
                    mapper.put("num", listRowNumber++);
                    return mapper;
            }).collect(Collectors.toList());

            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        }  catch (Exception e) {
			throw new Exceptions(new Throwable(), e);
		}
    }

    @Override
    public List<EgovMapForNull> searchEtsfmg000ForExcel(EgovMapForNull paramMap) throws Exceptions {
    	try {    	     
	    	Etsfmg000 entity = new Etsfmg000();
	    	if(paramMap != null) {
	    		entity.setRaisnm(StringExpression.nullConvert(paramMap.get("raisnm")));
	    		entity.setRaisNo(StringExpression.nullConvert(paramMap.get("raisNo")));
	    	}
	    	return etsfmg000Mapper.selectEtsfmg000List(entity);
    	}  catch (Exception e) {
 			throw new Exceptions(new Throwable(), e);
 		}
    }

    @Override
    public JSONObject findEtsfmg000(Etsfmg000 entity) throws Exceptions {
        try {

            Etsfmg000 etsfmg000 = new Etsfmg000(etsfmg000Mapper.selectEtsfmg000(entity));
            List<EgovMapForNull> list = etsfmg000Mapper.selectEtsfmg000Item(entity);
            etsfmg000.setRecords(list);
            return new JsonMsgMng().makeJsonObject(etsfmg000);

        }  catch (Exception e) {
			throw new Exceptions(new Throwable(), e);
		}
    }

    @Override
    public JSONObject saveEtsfmg000(List<Etsfmg000> entitys) throws Exceptions {

        try {
            String raisNo = "";
            for(Etsfmg000 etsfmg000 : entitys) { 
            	
                switch(etsfmg000.getNativeeditorStatus()) {

                case "deleted":                	
                	
                	etsfmg000Mapper.deleteEtsfmg000(etsfmg000);
                	Etsfmg000Item paramEtsfmg000Item = new Etsfmg000Item();
                	paramEtsfmg000Item.setRaisNo(etsfmg000.getRaisNo());                	
                	etsfmg000Mapper.deleteEtsfmg000Item(paramEtsfmg000Item);
                	
                    break;

                default:
                	
                	// 신규번호채번 (clob 타입은 머지문이 되지 않음..)
                	if("".equals( StringExpression.nullConvert( etsfmg000.getRaisNo() ))) {
                		Stmbsc006 stmbsc006 = new Stmbsc006();
                		stmbsc006.setRelTblNm("SGN_DOC_RAIS");
                		stmbsc006.setRelItemNm("RAIS_NO");
                		etsfmg000.setRaisNo( stmbsc006Service.getNextValue(stmbsc006).getString("data") );
                		etsfmg000Mapper.insertEtsfmg000(etsfmg000);
                	} else {
                		etsfmg000Mapper.updateEtsfmg000(etsfmg000);
                	}
    
                	// 양식항목 입력
                	List<Etsfmg000Item> itemList = etsfmg000.getItems();
                	int itemSize = itemList.size();
                	
                	for(Etsfmg000Item etsfmg000Item : itemList) {                 		                		
                		
                		System.out.println(etsfmg000Item.getRaisSn());
                		
                		etsfmg000Item.setRaisNo(etsfmg000.getRaisNo());                		
                		etsfmg000Item.setRaisSn( ("".equals(StringExpression.nullConvert(etsfmg000Item.getRaisSn()))) ? raisSn.getNextStringId() : etsfmg000Item.getRaisSn() );
                		etsfmg000Item.setRaisItemco(String.valueOf(itemSize));
                		
                		System.out.println(etsfmg000Item.getRaisSn());
                		
                		switch(etsfmg000Item.getNativeeditorStatus()) {
                			case "deleted":
                				etsfmg000Mapper.deleteEtsfmg000Item(etsfmg000Item);
                				break;
                			default:
                				etsfmg000Mapper.saveEtsfmg000Item(etsfmg000Item);
                				break;
                		}
                	}
                    break;
                }
                
                raisNo = etsfmg000.getRaisNo();
            }

            EgovMapForNull returnMap = new EgovMapForNull();
            returnMap.put("key", raisNo);
            returnMap.put("code", "000");
            returnMap.put("message", "SUCCESS");

            return new JsonMsgMng().makeJsonObject(returnMap);

        } catch (Exception e) {
			throw new Exceptions(new Throwable(), e);
		}
    }
}
