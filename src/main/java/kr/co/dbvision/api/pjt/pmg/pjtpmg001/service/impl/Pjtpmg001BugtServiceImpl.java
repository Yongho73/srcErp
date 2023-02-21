 package kr.co.dbvision.api.pjt.pmg.pjtpmg001.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.pjt.pmg.pjtpmg001.entity.Pjtpmg001;
import kr.co.dbvision.api.pjt.pmg.pjtpmg001.service.Pjtpmg001BugtService;
import kr.co.dbvision.api.pjt.pmg.pjtpmg001.service.mapper.Pjtpmg001Mapper;
import kr.co.dbvision.api.pjt.pmg.pjtpmg002.entity.Pjtpmg002;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 프로젝트현황에 관한 구현 클래스
 *
 * @author 표준프레임워크센터
 * @since 2020.01.14
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.01.14          디비비전              최초 생성
 *
 * </pre>
 */
@Service("Pjtpmg001BugtService")
@Transactional
public class Pjtpmg001BugtServiceImpl extends EgovAbstractServiceImpl implements Pjtpmg001BugtService {

    Logger logger = LogManager.getLogger(Pjtpmg001BugtServiceImpl.class);
    
    private String basisDt;

    @Resource(name="Pjtpmg001Mapper")
    private Pjtpmg001Mapper pjtpmg001Mapper;
    private int listRowNumber = 0;

    public Pjtpmg001BugtServiceImpl() {
        //    	
    }
    
    @Override
    public JSONObject searchPjtBugtPlanList(EgovMapForNull paramMap) {
        try {

            Pjtpmg002 entity = new Pjtpmg002(paramMap);
            List<EgovMapForNull> pjtBugtPlanList = pjtpmg001Mapper.selectPjtBugtPlanList(paramMap);

            List<EgovMapForNull> pjtBugtPlanListToRowspan = pjtBugtPlanList.stream().map(mapper -> {
            	
            	String gubun = StringExpression.nullConvert(mapper.get("codeKorNm"));
            	String gubunAccount = StringExpression.nullConvert(mapper.get("gubun1"));
 
				if(gubun.equals("직접인건비(내부직원)")) {
					EgovMapForNull map = new EgovMapForNull();
					map.put("value", mapper.get("gubun1"));
					map.put("rowspan", 12);
					mapper.replace("gubun1", map);
				} 
				
				if(gubunAccount.equals("계약금액") || gubunAccount.equals("소 계") || gubunAccount.equals("손익") ) {
					EgovMapForNull map = new EgovMapForNull();
					map.put("value", mapper.get("gubun1"));
					map.put("colspan", 2);
					mapper.replace("gubun1", map);
				}

            	return mapper;

            }).collect(Collectors.toList());
            
            entity.setRecords(pjtBugtPlanListToRowspan);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    
    @Override
    public JSONObject searchPjtBugtPlanDtlList(EgovMapForNull paramMap) {
        try {

            Pjtpmg002 entity = new Pjtpmg002(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = pjtpmg001Mapper.selectPjtBugtPlanDtlList(paramMap).stream().map(mapper -> {
                    mapper.put("num", listRowNumber++);
                    return mapper;
            }).collect(Collectors.toList());
            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    
    @Override
    public JSONObject modifyPjtBugtPlanDtlList(EgovMapForNull paramMap) {

        try {

            pjtpmg001Mapper.updatePjtBugtPlanDtlList(paramMap);
            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    
    @Override
    public JSONObject savePjtBugtPlanDtlList(EgovMapForNull paramMap) {

        try {

            pjtpmg001Mapper.insertPjtBugtPlanDtlList(paramMap);
            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    
    @Override
    public JSONObject removePjtBugtPlanDtlList(EgovMapForNull paramMap) {

        try {

            pjtpmg001Mapper.deletePjtBugtPlanDtlList(paramMap);
            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    
    @Override
    public JSONObject findPjtProjectDe(EgovMapForNull paramMap) {
        try {

            Pjtpmg001 entity = new Pjtpmg001(pjtpmg001Mapper.selectPjtProjectDe(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

    @Override
    public JSONObject searchPjtBugtAcmsltList(EgovMapForNull paramMap) {
        try {

            EgovMapForNull projectParam = paramMap;
        	Pjtpmg002 entity = new Pjtpmg002(paramMap);
            
            basisDt = StringExpression.nullConvert(pjtpmg001Mapper.selectPjtBugtBasisDt(paramMap));
            
            if(basisDt.length()== 0) return new JsonMsgMng().makeJsonObject(entity);
                   
            // 계약금액
            String projectAmt = StringExpression.nullConvert(pjtpmg001Mapper.selectPjtProjectAmt(paramMap));
            String projectMonth = StringExpression.nullConvert(pjtpmg001Mapper.selectPjtProjectMonth(paramMap));
            
            List<EgovMapForNull> ProjectAmtList = new ArrayList<EgovMapForNull>();
            EgovMapForNull projectAmtMap = new EgovMapForNull(); 
            
            projectAmtMap.put("gubun1","계약금액");
            projectAmtMap.put("gubun","");
            projectAmtMap.put("accCd",""); 
            projectAmtMap.put("codeKorNm",""); 
            projectAmtMap.put("totalSum",projectAmt); 
            
            String[] basisDtArrs = basisDt.split("\\,");
            
            System.out.println(projectAmt + "   " + projectMonth );
            
            int monthAmt = Integer.parseInt(projectAmt) / Integer.parseInt(projectMonth);
            
            for(String bugtUseDt : basisDtArrs) {  	
            	projectAmtMap.put(bugtUseDt.trim().replace("A", ""),monthAmt); 
			}
            
            ProjectAmtList.add(projectAmtMap);
            
			// 직접비
            projectParam.put("codekindCode","C071");
            List<EgovMapForNull> directCostStmCodeList = pjtpmg001Mapper.selectPjtBugtStmCode(projectParam);

            List<EgovMapForNull> directCostList = directCostStmCodeList.stream().map(mapper->{
			  
				 EgovMapForNull param = null;			  
			     int directBugtUseDtSum = 0;
			     int directTotalSum = 0;
			     String[] basisDtArr = basisDt.split("\\,");
			     
			     for(String bugtUseDt : basisDtArr) { 
					 
			    	 param = new EgovMapForNull(); 
					 param.put("prmpcTy", mapper.get("accCd")); 
				     param.put("projectSn", paramMap.get("projectSn"));				     
			    	 param.put("bugtUseDt", bugtUseDt.trim().replace("A", ""));
					 
					 EgovMapForNull useAmtMap = pjtpmg001Mapper.selectPjtBugtAcmsltSum(param);
					 String useAmt = StringExpression.nullConvert(useAmtMap.get("useAmt"));
					 useAmt = useAmt.equals("") ? "0" : useAmt;
					 
					 directBugtUseDtSum = Integer.parseInt(useAmt);
					 
					 mapper.put(bugtUseDt.trim().replace("A", ""), directBugtUseDtSum);
					 
					 directTotalSum +=  directBugtUseDtSum;  
				     mapper.put("totalSum", directTotalSum);
			     }
				 
			     return mapper;
			}).collect(Collectors.toList());
            
            // 소계
			EgovMapForNull subSumMap = new EgovMapForNull(); 
			int bugtUseDtSum = 0;
			int totalSum = 0;
			subSumMap.put("gubun1","소 계");
			subSumMap.put("gubun","C071");
			subSumMap.put("accCd",""); 
			subSumMap.put("codeKorNm",""); 
			for(String bugtUseDt : basisDt.split("\\,")) {
				bugtUseDtSum = directCostList.stream().mapToInt(mapper -> Integer.parseInt(mapper.get(bugtUseDt.trim().replace("A", "")).toString())).sum();
				subSumMap.put(bugtUseDt.trim().replace("A", ""),bugtUseDtSum); 
			}
			
			totalSum = directCostList.stream().mapToInt(mapper -> Integer.parseInt(mapper.get("totalSum").toString())).sum();
			subSumMap.put("totalSum",totalSum); 
			  
			directCostList.add(subSumMap);
			 
			
			// 간접비 
            projectParam = new EgovMapForNull();
            projectParam = paramMap;
            
            projectParam.replace("codekindCode","C072"); 
			List<EgovMapForNull> indirectCostStmCodeList = pjtpmg001Mapper.selectPjtBugtStmCode(paramMap);
			
			List<EgovMapForNull> indirectCostList = indirectCostStmCodeList.stream().map(mapper->{
				
				EgovMapForNull totalAmtMap = new EgovMapForNull();				
				totalAmtMap = ProjectAmtList.get(0);
				
				String totalAmt = StringExpression.nullConvert(totalAmtMap.get("totalSum"));
				String totalSubSum = StringExpression.nullConvert(subSumMap.get("totalSum"));
				
				double indirectAmt =  Integer.parseInt(totalSubSum)*0.35;
				int indirectAmt1 = (int)indirectAmt;		
				
				mapper.put("totalSum", indirectAmt1);
				
				for(String bugtUseDt : basisDtArrs) {
					
					String totalAmts = StringExpression.nullConvert(totalAmtMap.get(bugtUseDt.trim().replace("A", "")));
					String totalSubSums = StringExpression.nullConvert(subSumMap.get(bugtUseDt.trim().replace("A", "")));
					
					double indirectAmts = Integer.parseInt(totalSubSums)*0.35;
					int indirectAmts1 = (int)indirectAmts;
					
					mapper.put(bugtUseDt.trim().replace("A", ""),indirectAmts1); 
				}
				return mapper;
		    }).collect(Collectors.toList());
			
			//영업손익
			EgovMapForNull profitLossMap = new EgovMapForNull(); 
			
			profitLossMap.put("gubun1","손익");
			profitLossMap.put("gubun","");
			profitLossMap.put("accCd",""); 
			profitLossMap.put("codeKorNm","영업손익"); 
			
			EgovMapForNull totalAmtMap = new EgovMapForNull();	
			EgovMapForNull indirectAmtMap = new EgovMapForNull();		
			totalAmtMap = ProjectAmtList.get(0);
			indirectAmtMap = indirectCostList.get(0);
			
			String totalAmt = StringExpression.nullConvert(totalAmtMap.get("totalSum"));
			String totalSubSum = StringExpression.nullConvert(subSumMap.get("totalSum"));
			String indirectAmt = StringExpression.nullConvert(indirectAmtMap.get("totalSum").toString());
			
			int profitLossAmt = Integer.parseInt(totalAmt) - Integer.parseInt(totalSubSum) - Integer.parseInt(indirectAmt);
			
			profitLossMap.put("totalSum", profitLossAmt);
			
			for(String bugtUseDt : basisDtArrs) {
				
				String totalAmts = StringExpression.nullConvert(totalAmtMap.get(bugtUseDt.trim().replace("A", "")));
				String totalSubSums = StringExpression.nullConvert(subSumMap.get(bugtUseDt.trim().replace("A", "")));
				String indirectAmts = StringExpression.nullConvert(indirectAmtMap.get(bugtUseDt.trim().replace("A", "")));

				int profitLossAmts = Integer.parseInt(totalAmts) - Integer.parseInt(totalSubSums) - Integer.parseInt(indirectAmts);
				
				profitLossMap.put(bugtUseDt.trim().replace("A", ""),profitLossAmts); 
			}
			
			indirectCostList.add(profitLossMap);
			
			
			        
            List<EgovMapForNull> costList = new ArrayList<EgovMapForNull>();
            
            
            costList.addAll(ProjectAmtList);
            costList.addAll(directCostList);
            costList.addAll(indirectCostList);
            
            List<EgovMapForNull> pjtBugtListToSpan = costList.stream().map(mapper -> {
            	
            	String gubun = StringExpression.nullConvert(mapper.get("codeKorNm"));
            	String gubunAccount = StringExpression.nullConvert(mapper.get("gubun1"));
 
				if(gubun.equals("직접인건비(내부직원)")) {
					EgovMapForNull map = new EgovMapForNull();
					map.put("value", mapper.get("gubun1"));
					map.put("rowspan", 12);
					mapper.replace("gubun1", map);
				} 
				
				if(gubunAccount.equals("계약금액") || gubunAccount.equals("소 계") ) {
					EgovMapForNull map = new EgovMapForNull();
					map.put("value", mapper.get("gubun1"));
					map.put("colspan", 2);
					mapper.replace("gubun1", map);
				}
            	return mapper;

            }).collect(Collectors.toList());

            
            entity.setRecords(pjtBugtListToSpan);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    
    @Override
    public JSONObject searchPjtBugtAcmsltDtlList(EgovMapForNull paramMap) {
        try {
            
            Pjtpmg002 entity = new Pjtpmg002(paramMap);
            
            listRowNumber = 1;

            List<EgovMapForNull> list = pjtpmg001Mapper.selectPjtBugtAcmsltDtlList(paramMap).stream().map(mapper -> {
                    mapper.put("num", listRowNumber++);
                    return mapper;
            }).collect(Collectors.toList());
            
            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    
    @Override
    public JSONObject modifyPjtBugtAcmsltDtlList(EgovMapForNull paramMap) {

        try {

            pjtpmg001Mapper.updatePjtBugtAcmsltDtlList(paramMap);
            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    
    @Override
    public JSONObject savePjtBugtAcmsltDtlList(EgovMapForNull paramMap) {

        try {

            pjtpmg001Mapper.insertPjtBugtAcmsltDtlList(paramMap);
            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    
    @Override
    public JSONObject removePjtBugtAcmsltDtlList(EgovMapForNull paramMap) {

        try {

            pjtpmg001Mapper.deletePjtBugtAcmsltDtlList(paramMap);
            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    
    @Override
    public JSONObject searchPjtBugtPlanAcmsltList(EgovMapForNull paramMap) {
        try {
            EgovMapForNull projectParam = paramMap;
            Pjtpmg002 entity = new Pjtpmg002(paramMap);
            
            basisDt = StringExpression.nullConvert(pjtpmg001Mapper.selectPjtBugtBasisDt(paramMap));
            if(basisDt.length()== 0) return new JsonMsgMng().makeJsonObject(entity);
            
            // 계약금액
            String projectAmt = StringExpression.nullConvert(pjtpmg001Mapper.selectPjtProjectAmt(paramMap));
           
            String projectMonth = StringExpression.nullConvert(pjtpmg001Mapper.selectPjtProjectMonth(paramMap));
            
            List<EgovMapForNull> ProjectAmtList = new ArrayList<EgovMapForNull>();
            EgovMapForNull projectAmtMap = new EgovMapForNull(); 
            
            projectAmtMap.put("gubun1","계약금액");
            projectAmtMap.put("gubun","");
            projectAmtMap.put("prmpcTy",""); 
            projectAmtMap.put("codeKorNm","계약금액"); 
            projectAmtMap.put("bugtAmt",projectAmt);  
            
            String[] basisDtArrs = basisDt.split("\\,");
            
            int monthAmt = Integer.parseInt(projectAmt) / Integer.parseInt(projectMonth);
            
            for(String bugtUseDt : basisDtArrs) {   
                projectAmtMap.put(bugtUseDt.trim().replace("A", ""),monthAmt); 
            }
            
            int projectSumAmt = 0;
            
            for(String bugtUseDt : basisDtArrs) {  
                projectSumAmt = projectSumAmt + monthAmt;
                
            }
            projectAmtMap.put("totalSum",projectSumAmt); 
            
            ProjectAmtList.add(projectAmtMap);
            
            // 직접비
            List<EgovMapForNull> list = pjtpmg001Mapper.selectPjtBugtPlanAcmsltList(paramMap);
  
            List<EgovMapForNull> rowspanList = list.stream().map(mapper->{
               
               EgovMapForNull param = null;           
               int directBugtUseDtSum = 0;
               int directTotalSum = 0;
               
               String[] basisDtArr = basisDt.split("\\,");
               
               for(String bugtUseDt : basisDtArr) { 
                   
                   param = new EgovMapForNull(); 
                   
                   param.put("prmpcTy", mapper.get("prmpcTy")); 
                   param.put("projectSn", paramMap.get("projectSn"));                  
                   param.put("bugtUseDt", bugtUseDt.trim().replace("A", ""));
                   
                   
                   
                   EgovMapForNull useAmtMap = pjtpmg001Mapper.selectPjtBugtAcmsltSum(param);
                   String useAmt = StringExpression.nullConvert(useAmtMap.get("useAmt"));
                   useAmt = useAmt.equals("") ? "0" : useAmt;
                   
                   directBugtUseDtSum = Integer.parseInt(useAmt);
                   
                   mapper.put(bugtUseDt.trim().replace("A", ""), directBugtUseDtSum);
                   
                   directTotalSum +=  directBugtUseDtSum;  
                   mapper.put("totalSum", directTotalSum);
      
                 
               }
				 
            	return mapper;

            }).collect(Collectors.toList());
            
        
            // 소계
            EgovMapForNull subSumMap = new EgovMapForNull(); 
            int bugtUseDtSum = 0;
            int totalSum = 0;
            int bugtAmt = 0;
            subSumMap.put("gubun1","소 계");
            subSumMap.put("gubun","C071");
            subSumMap.put("accCd",""); 
            subSumMap.put("codeKorNm",""); 
            for(String bugtUseDt : basisDt.split("\\,")) {
                bugtUseDtSum = rowspanList.stream().mapToInt(mapper -> Integer.parseInt(mapper.get(bugtUseDt.trim().replace("A", "")).toString())).sum();
                subSumMap.put(bugtUseDt.trim().replace("A", ""),bugtUseDtSum); 
            }
            
            bugtAmt = rowspanList.stream().mapToInt(mapper -> Integer.parseInt(mapper.get("bugtAmt").toString())).sum();
            subSumMap.put("bugtAmt",bugtAmt);
            
            totalSum = rowspanList.stream().mapToInt(mapper -> Integer.parseInt(mapper.get("totalSum").toString())).sum();
            subSumMap.put("totalSum",totalSum); 
              
            rowspanList.add(subSumMap);
            
            //간접비
            
            projectParam = new EgovMapForNull();
            projectParam = paramMap;
            
            List<EgovMapForNull> IndirectList = pjtpmg001Mapper.selectPjtBugtPlanAcmsltIndirectList(paramMap);
            
            List<EgovMapForNull> indirectCostList = IndirectList.stream().map(mapper->{
                
                EgovMapForNull totalAmtMap = new EgovMapForNull();              
                totalAmtMap = ProjectAmtList.get(0);
                
                String totalAmt = StringExpression.nullConvert(totalAmtMap.get("totalSum"));
                String totalSubSum = StringExpression.nullConvert(subSumMap.get("totalSum"));
                
                double indirectAmt =  Integer.parseInt(totalSubSum)*0.35;
                int indirectAmt1 = (int)indirectAmt;        
                
                mapper.put("totalSum", indirectAmt1);
                
                for(String bugtUseDt : basisDtArrs) {
                    
                    String totalAmts = StringExpression.nullConvert(totalAmtMap.get(bugtUseDt.trim().replace("A", "")));
                    String totalSubSums = StringExpression.nullConvert(subSumMap.get(bugtUseDt.trim().replace("A", "")));
                    
                    double indirectAmts = Integer.parseInt(totalSubSums)*0.35;
                    int indirectAmts1 = (int)indirectAmts;
                    
                    mapper.put(bugtUseDt.trim().replace("A", ""),indirectAmts1); 
                }
                return mapper;
            }).collect(Collectors.toList());
            
            //영업손익
            EgovMapForNull profitLossMap = new EgovMapForNull(); 
            
            profitLossMap.put("gubun1","손익");
            profitLossMap.put("gubun","");
            profitLossMap.put("accCd",""); 
            profitLossMap.put("codeKorNm","영업손익"); 
            
            EgovMapForNull totalAmtMap = new EgovMapForNull();  
            EgovMapForNull indirectAmtMap = new EgovMapForNull();       
            totalAmtMap = ProjectAmtList.get(0);
            indirectAmtMap = indirectCostList.get(0);
            
            String totalAmt = StringExpression.nullConvert(totalAmtMap.get("totalSum"));
            String totalSubSum = StringExpression.nullConvert(subSumMap.get("totalSum"));
            String indirectAmt = StringExpression.nullConvert(indirectAmtMap.get("totalSum").toString());
            
            String bustAmt = StringExpression.nullConvert(totalAmtMap.get("bugtAmt"));
            String bustSubSum = StringExpression.nullConvert(subSumMap.get("bugtAmt"));
            String directAmt = StringExpression.nullConvert(indirectAmtMap.get("bugtAmt").toString());
            
            int profitLossAmt = Integer.parseInt(totalAmt) - Integer.parseInt(totalSubSum) - Integer.parseInt(indirectAmt);
            int profitLossAmtt = Integer.parseInt(bustAmt) - Integer.parseInt(bustSubSum) - Integer.parseInt(directAmt);
            
            profitLossMap.put("totalSum", profitLossAmt);
            profitLossMap.put("bugtAmt", profitLossAmtt);
            
            for(String bugtUseDt : basisDtArrs) {
                
                String totalAmts = StringExpression.nullConvert(totalAmtMap.get(bugtUseDt.trim().replace("A", "")));
                String totalSubSums = StringExpression.nullConvert(subSumMap.get(bugtUseDt.trim().replace("A", "")));
                String indirectAmts = StringExpression.nullConvert(indirectAmtMap.get(bugtUseDt.trim().replace("A", "")));

                int profitLossAmts = Integer.parseInt(totalAmts) - Integer.parseInt(totalSubSums) - Integer.parseInt(indirectAmts);
                
                profitLossMap.put(bugtUseDt.trim().replace("A", ""),profitLossAmts); 
            }

            indirectCostList.add(profitLossMap);
            
            List<EgovMapForNull> costList = new ArrayList<EgovMapForNull>();
            
            
            costList.addAll(ProjectAmtList);
            costList.addAll(rowspanList);
            costList.addAll(indirectCostList);
            
            List<EgovMapForNull> pjtBugtListToSpan = costList.stream().map(mapper -> {
                String gubun = StringExpression.nullConvert(mapper.get("codeKorNm"));
                String gubun1 = StringExpression.nullConvert(mapper.get("gubun1"));
                
                EgovMapForNull map = new EgovMapForNull();
                
            
                        
                map.put("value", mapper.get("gubun1"));
                if(gubun.equals("직접인건비(내부직원)")) {
                  map.put("rowspan", 12); 
                } 
                
                if(gubun1.equals("계약금액") || gubun1.equals("소 계") || gubun1.equals("손익") ) {
                    map.put("value", mapper.get("gubun1"));
                    map.put("colspan", 2);
                }
                mapper.replace("gubun1", map);
                
                return mapper;
            }).collect(Collectors.toList());

   
            
            entity.setRecords(pjtBugtListToSpan);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    
    @Override
    public JSONObject findPjtBugtBaseDt(EgovMapForNull paramMap) {
        try {

            Pjtpmg001 entity = new Pjtpmg001(pjtpmg001Mapper.selectPjtBugtBaseDt(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    
}
