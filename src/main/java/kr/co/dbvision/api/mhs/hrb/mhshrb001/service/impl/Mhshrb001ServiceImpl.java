package kr.co.dbvision.api.mhs.hrb.mhshrb001.service.impl;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;
import kr.co.dbvision.api.mhs.hrb.mhshrb001.entity.Mhshrb001;
import kr.co.dbvision.api.mhs.hrb.mhshrb001.entity.Mhshrb001_TAB10;
import kr.co.dbvision.api.mhs.hrb.mhshrb001.entity.Mhshrb001_TAB11;
import kr.co.dbvision.api.mhs.hrb.mhshrb001.entity.Mhshrb001_TAB12;
import kr.co.dbvision.api.mhs.hrb.mhshrb001.entity.Mhshrb001_TAB2;
import kr.co.dbvision.api.mhs.hrb.mhshrb001.entity.Mhshrb001_TAB3;
import kr.co.dbvision.api.mhs.hrb.mhshrb001.entity.Mhshrb001_TAB4;
import kr.co.dbvision.api.mhs.hrb.mhshrb001.entity.Mhshrb001_TAB5;
import kr.co.dbvision.api.mhs.hrb.mhshrb001.entity.Mhshrb001_TAB6;
import kr.co.dbvision.api.mhs.hrb.mhshrb001.entity.Mhshrb001_TAB7;
import kr.co.dbvision.api.mhs.hrb.mhshrb001.entity.Mhshrb001_TAB8;
import kr.co.dbvision.api.mhs.hrb.mhshrb001.entity.Mhshrb001_TAB9;
import kr.co.dbvision.api.mhs.hrb.mhshrb001.service.Mhshrb001Service;
import kr.co.dbvision.api.mhs.hrb.mhshrb001.service.mapper.Mhshrb001Mapper;
import kr.co.dbvision.api.mhs.hrb.mhshrb001.service.mapper.Mhshrb001MapperTab10Edu;
import kr.co.dbvision.api.mhs.hrb.mhshrb001.service.mapper.Mhshrb001MapperTab11Acnut;
import kr.co.dbvision.api.mhs.hrb.mhshrb001.service.mapper.Mhshrb001MapperTab12Fggg;
import kr.co.dbvision.api.mhs.hrb.mhshrb001.service.mapper.Mhshrb001MapperTab2IndvdlInfo;
import kr.co.dbvision.api.mhs.hrb.mhshrb001.service.mapper.Mhshrb001MapperTab3Family;
import kr.co.dbvision.api.mhs.hrb.mhshrb001.service.mapper.Mhshrb001MapperTab4Gnfd;
import kr.co.dbvision.api.mhs.hrb.mhshrb001.service.mapper.Mhshrb001MapperTab5Rward;
import kr.co.dbvision.api.mhs.hrb.mhshrb001.service.mapper.Mhshrb001MapperTab6Dscpl;
import kr.co.dbvision.api.mhs.hrb.mhshrb001.service.mapper.Mhshrb001MapperTab7Acdmcr;
import kr.co.dbvision.api.mhs.hrb.mhshrb001.service.mapper.Mhshrb001MapperTab8Career;
import kr.co.dbvision.api.mhs.hrb.mhshrb001.service.mapper.Mhshrb001MapperTab9Crqfs;
import kr.co.dbvision.api.mhs.hrb.mhshrb001.service.mapper.OldErpEmpInfoUpdateMapper;
import kr.co.dbvision.api.mhs.hrb.mhshrb001.service.mapper.OldIntranetEmpInfoUpdateMapper;
import kr.co.dbvision.api.mhs.hrm.mhshrm004.entity.Mhshrm004;
import kr.co.dbvision.api.mhs.hrm.mhshrm014.entity.Mhshrm014;
import kr.co.dbvision.api.mhs.hrm.mhshrm015.entity.Mhshrm015;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.EgovPage;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.SessionMng;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;
import net.sf.json.JSONObject;

/**
 * 인사기본에 관한 구현 클래스
 *
 * @author 표준프레임워크센터
 * @since 2019.05.22
 * @version 1.0
 * @see
 *
 *      <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2019.05.22          디비비전              최초 생성
 *
 *      </pre>
 */
@Service("Mhshrb001Service")
@Transactional
public class Mhshrb001ServiceImpl extends EgovAbstractServiceImpl implements Mhshrb001Service {

	Logger logger = LogManager.getLogger(Mhshrb001ServiceImpl.class);

	@Resource(name = "Mhshrb001Mapper")
	private Mhshrb001Mapper mhshrb001Mapper;
	
	@Resource(name = "Mhshrb001MapperTab2IndvdlInfo")
	private Mhshrb001MapperTab2IndvdlInfo mhshrb001MapperIndvdlInfo;
	
	@Resource(name = "Mhshrb001MapperTab3Family")
	private Mhshrb001MapperTab3Family mhshrb001MapperFamily;
	
	@Resource(name = "Mhshrb001MapperTab4Gnfd")
	private Mhshrb001MapperTab4Gnfd mhshrb001MapperGnfd;
	
	@Resource(name = "Mhshrb001MapperTab5Rward")
	private Mhshrb001MapperTab5Rward mhshrb001MapperTab5Rward;
	
	@Resource(name = "Mhshrb001MapperTab6Dscpl")
	private Mhshrb001MapperTab6Dscpl mhshrb001MapperTab6Dscpl;
	
	@Resource(name = "Mhshrb001MapperTab7Acdmcr")
	private Mhshrb001MapperTab7Acdmcr mhshrb001MapperTab7Acdmcr;
	
	@Resource(name = "Mhshrb001MapperTab8Career")
	private Mhshrb001MapperTab8Career mhshrb001MapperTab8Career;
	
	@Resource(name = "Mhshrb001MapperTab9Crqfs")
	private Mhshrb001MapperTab9Crqfs mhshrb001MapperTab9Crqfs;
	
	@Resource(name = "Mhshrb001MapperTab10Edu")
	private Mhshrb001MapperTab10Edu mhshrb001MapperTab10Edu;
	
	@Resource(name = "Mhshrb001MapperTab11Acnut")
	private Mhshrb001MapperTab11Acnut mhshrb001MapperTab11Acnut;
	
	@Resource(name = "Mhshrb001MapperTab12Fggg")
	private Mhshrb001MapperTab12Fggg mhshrb001MapperTab12Fggg;
	
	// 인사기본 통합 관련 구 ERP 시스템 인사정보 업데이트용
	@Resource(name = "OldErpEmpInfoUpdateMapper")
	private OldErpEmpInfoUpdateMapper oldErpEmpInfoUpdateMapper;

    @Resource(name = "OldIntranetEmpInfoUpdateMapper")
    private OldIntranetEmpInfoUpdateMapper oldIntranetEmpInfoUpdateMapper;
	
	private PaginationInfo paginationInfo;
    private int listRowNumber = 0;

	public Mhshrb001ServiceImpl() {
		paginationInfo = new PaginationInfo();
	}

	@Override
	public JSONObject searchMhsEmp(EgovMapForNull paramMap) {
		try {
			int pageNum = Integer.parseInt(StringExpression.nullConvert(paramMap.get("pageNum")));
            int pageingCnt = Integer.parseInt(StringExpression.nullConvert(paramMap.get("pageingCnt")));
            
            EgovPage.initPaging(paginationInfo, pageNum, pageingCnt, 5, paramMap); // 5 = 한 화면에 나오는 페이징 번호의 최대수량
            int totalRowCount = mhshrb001Mapper.selectMhsEmpListAllCnt(paramMap);
            EgovPage.pagingInfo(paginationInfo, totalRowCount, paramMap);
            
            Mhshrb001 entity = new Mhshrb001(paramMap);
            
            listRowNumber = (pageingCnt*(pageNum-1)) + 1; // 넘버링
            //listRowNumber = totalRowCount - (pageingCnt*(pageNum-1)); // 역순넘버링
            
            List<EgovMapForNull> list = mhshrb001Mapper.selectMhsEmpList(paramMap).stream().map(mapper -> {                
                mapper.replace("num", listRowNumber++);  //    넘버링                   
                //mapper.replace("num", listRowNumber--);  //    역순넘버링
                return mapper;
            }).collect(Collectors.toList());
            
            /*  rowspan 제외 : 2020.04.16
            //rowspan 구현
			List<EgovMapForNull> returnList =  new ArrayList<EgovMapForNull>();
			EgovMapForNull mapper_save  = new EgovMapForNull();
			
			//rowspan 계산을 위해 List를 뒤집어서 점검한다 
			Collections.reverse(list);
			//rowspan 계산을 위해 List를 뒤집어서 점검한다
			String chk_Bf = "";
			String chk_Af = "";
			int nNum = 0;
			int rowSpan = 1;
			int nCnt = list.size();

			for(EgovMapForNull mapper : list) {
				//System.out.println(StringExpression.nullConvert(mapper.get("deptCodeNm")));
				if(nNum == 0) {
					chk_Bf = StringExpression.nullConvert(mapper.get("deptCodeNm"));
					mapper_save = mapper;
				}
				else {
					chk_Af = StringExpression.nullConvert(mapper.get("deptCodeNm"));
					if(chk_Bf.equals(chk_Af)) {
						rowSpan++;
						returnList.add(mapper_save);  //이전  EgovMapForNull 투입
						mapper_save = mapper;
					}
					else if(rowSpan > 1) {
						chk_Bf = chk_Af;
						EgovMapForNull map = new EgovMapForNull();
						map.put("value", mapper_save.get("deptCodeNm"));
						map.put("rowspan", rowSpan);
						mapper_save.replace("deptCodeNm", map);
						
						rowSpan = 1;
						returnList.add(mapper_save);  //이전  EgovMapForNull 투입
						mapper_save = mapper;
					}
					else {
						chk_Bf = chk_Af;
						returnList.add(mapper_save);  //이전  EgovMapForNull 투입
						mapper_save = mapper;
					}
				}
				nNum++;
				
				if(nCnt == nNum) {
					//마지막 mapper_save 를 List에 넣는다.
					if(rowSpan > 1) {
						EgovMapForNull map = new EgovMapForNull();
						map.put("value", mapper.get("deptCodeNm"));
						map.put("rowspan", rowSpan);
						mapper.replace("deptCodeNm", map);
					}
					returnList.add(mapper);
				}
            }
			
			//뒤집어진 List를 원복한다
			Collections.reverse(returnList);
			
			entity.setRecords(returnList);
			rowspan 제외 : 2020.04.16 */
            entity.setRecords(list);
			
			return new JsonMsgMng().makeJsonObject(entity);
		} catch (Exception e) {
			return new Exceptions(new Throwable(), e).getResultStatus();
		}
	}

	@Override
	public List<EgovMapForNull> searchMhsEmpForExcel(EgovMapForNull paramMap) {
		int pageNum = Integer.parseInt(StringExpression.nullConvert(paramMap.get("pageNum")));
        int pageingCnt = Integer.parseInt(StringExpression.nullConvert(paramMap.get("pageingCnt")));
        
        EgovPage.initPaging(paginationInfo, pageNum, pageingCnt, 5, paramMap);
        
		return mhshrb001Mapper.selectMhsEmpList(paramMap);
	}

	@Override
	public JSONObject findMhsEmp(EgovMapForNull paramMap) {
		try {

			Mhshrb001 entity = new Mhshrb001(mhshrb001Mapper.selectMhsEmp(paramMap));
			/*
			 * String ihidnum = entity.getIhidnum() ; ihidnum =
			 * "8JZqngBFrouNvKd8D%2BAYeQ%3D%3D"; System.out.println("juminNo >> :: " +
			 * ihidnum); String aa = StringSecurity.decrypt(ihidnum);
			 * System.out.println("aa >> :: " + aa);
			 * 
			 * if(!"".equals(aa)){ int i = Integer.parseInt(aa);
			 * System.out.println("aaaaaa"+i); }
			 * 
			 * System.out.println("decrypt >> :: " + aa);
			 */
			return new JsonMsgMng().makeJsonObject(entity);

		} catch (Exception e) {
			return new Exceptions(new Throwable(), e).getResultStatus();
		}
	}

	@Override
	public JSONObject saveMhsEmp(EgovMapForNull paramMap) {

		try {
			mhshrb001Mapper.insertMhsEmpMain(paramMap);
			
			System.out.println("####################empno=["+paramMap.get("empNo")+"]");
			
			// 사내 erp 인사정보 입력 부분 구현 - 박용호
			OldErpEmpInfoUpdate.save(oldErpEmpInfoUpdateMapper, paramMap);
			// 인트라넷 (구, 신) 인사정보 입력 (dbvision_intra) 부분 구현 - 김동호
			OldIntranetEmpInfoUpdate.save(oldIntranetEmpInfoUpdateMapper,paramMap);
			
			return new JsonMsgMng().makeJsonObject(paramMap);

		} catch (Exception e) {
			return new Exceptions(new Throwable(), e).getResultStatus();
		}
	}

	@Override
	public JSONObject modifyMhsEmp(EgovMapForNull paramMap) {

		try {
			mhshrb001Mapper.updateMhsEmpMain(paramMap);
			
			// 사내 erp 인사정보 입력 부분 구현 - 박용호B
			OldErpEmpInfoUpdate.save(oldErpEmpInfoUpdateMapper, paramMap);
			// 인트라넷 (구, 신) 인사정보 입력 (dbvision_intra) 부분 구현 - 김동호S
			OldIntranetEmpInfoUpdate.modify(oldIntranetEmpInfoUpdateMapper,paramMap);
			
			return new JsonMsgMng().makeJsonObject(paramMap);

		} catch (Exception e) {
			return new Exceptions(new Throwable(), e).getResultStatus();
		}
	}

	@Override
	public JSONObject removeMhsEmp(EgovMapForNull paramMap) {

		try {

			String empnos = StringExpression.nullConvert(paramMap.get("empnos"));
			String[] empnoArr = empnos.split("\\,");

			int arrLength = (empnoArr == null) ? 0 : empnoArr.length;
			
			//삭제 전 삭제 가능한지 체크
			//사용된 이력이 있으면 삭제 불가
			EgovMapForNull mapperChk = null;
			for (int keyColumnIdx = 0; keyColumnIdx < arrLength; keyColumnIdx++) {
				mapperChk = new EgovMapForNull();
				mapperChk.put("empno", empnoArr[keyColumnIdx]);
				EgovMapForNull entity = mhshrb001Mapper.selectMhsEmpUseChk(mapperChk);
				System.out.println(entity);
				System.out.println((String)entity.get("cnt"));
				System.out.println((String)entity.get("tbl"));
				if(Integer.parseInt((String)entity.get("cnt")) > 0) {

					EgovMapForNull mapper = new EgovMapForNull();
					mapper.put("code", "999");
					mapper.put("msg", entity.get("tbl"));
					
					return new JsonMsgMng().makeJsonObject(mapper);
				}
			}
			
			EgovMapForNull mapper = null;
			for (int keyColumnIdx = 0; keyColumnIdx < arrLength; keyColumnIdx++) {

				mapper = new EgovMapForNull();
				mapper.put("empno", empnoArr[keyColumnIdx]);

				//부속정보 삭제
				/*
					MHS_가족   MHS_FAMILY   EMPNO
					MHS_개인정보   MHS_INDVDLINFO  EMPNO
					MHS_경력    MHS_CAREER  EMPNO
					MHS_교육   MHS_EDU   EMPNO
					MHS_병역   MHS_MLTPWR   EMPNO
					MHS_연봉   MPS_ANSLRY   EMPNO
					MHS_자격사항   MHS_CRQFS  EMPNO
					MHS_학력   MHS_ACDMCR  EMPNO
				 * */
				mhshrb001Mapper.deleteMhsEmp_Family(mapper);
				mhshrb001Mapper.deleteMhsEmp_Indvdlinfo(mapper);
				mhshrb001Mapper.deleteMhsEmp_Career(mapper);
				//mhshrb001Mapper.deleteMhsEmp_Eud(mapper); 
				mhshrb001Mapper.deleteMhsEmp_Mltpwr(mapper);
				mhshrb001Mapper.deleteMhsEmp_Anslry(mapper);
				mhshrb001Mapper.deleteMhsEmp_Crqfs(mapper);
				mhshrb001Mapper.deleteMhsEmp_Acdmcr(mapper);
				
				//직원정보 삭제
				mhshrb001Mapper.deleteMhsEmp(mapper); 
								
				// 사내 erp 인사정보 입력 부분 구현 - 박용호B
				OldErpEmpInfoUpdate.remove(oldErpEmpInfoUpdateMapper, mapper);
				// 인트라넷 (구, 신) 인사정보 입력 (dbvision_intra) 부분 구현 - 김동호S
				OldIntranetEmpInfoUpdate.remove(oldIntranetEmpInfoUpdateMapper, mapper);
			}

			return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

	@Override
	public JSONObject modifyMhsEmpBase(EgovMapForNull paramMap) {

		try {
	        String indvdlInfoChk = String.valueOf(paramMap.get("indvdlInfoChk"));
	        
	        if(indvdlInfoChk.equals("Y")) {
	        	mhshrb001Mapper.saveMhsIndvdlInfo(paramMap);
	        }
			
			mhshrb001Mapper.updateMhsEmpBase(paramMap);
			
			// 인트라넷 (구, 신) 이메일 주소 업데이트 - 박용호B
			OldIntranetEmpInfoUpdate.modifyBaseInfo(oldIntranetEmpInfoUpdateMapper, paramMap);
			 			
			return new JsonMsgMng().makeJsonObject(paramMap);

		} catch (Exception e) {
			return new Exceptions(new Throwable(), e).getResultStatus();
		}
	}
	
	/*신상정보 Tab2*/
    @Override
    public JSONObject searchMhsEmpIndvdlInfo(EgovMapForNull paramMap) {
        try {

            //Mhshrb001_TAB2 entity = new Mhshrb001_TAB2(paramMap);
            //List<EgovMapForNull> list = mhshrb001MapperIndvdlInfo.selectMhsEmpIndvdlInfo(paramMap);
            //entity.setRecords(list);
            
            Mhshrb001_TAB2 entity = new Mhshrb001_TAB2(mhshrb001MapperIndvdlInfo.selectMhsEmpIndvdlInfo(paramMap));
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

	@Override
	public JSONObject saveMhsEmpIndvdlInfo(EgovMapForNull paramMap) {

		try {
	        String mltpwrChk = String.valueOf(paramMap.get("mltpwrChk"));

	        if(mltpwrChk.equals("Y")) {
	        	mhshrb001MapperIndvdlInfo.saveMhsEmpMltpwr(paramMap);
	        }
			
	        mhshrb001MapperIndvdlInfo.saveMhsEmpIndvdlInfo(paramMap);
			return new JsonMsgMng().makeJsonObject(paramMap);

		} catch (Exception e) {
			return new Exceptions(new Throwable(), e).getResultStatus();
		}
	}
    
	/*가족정보 Tab3*/
    @Override
    public JSONObject searchMhsEmpFamily(EgovMapForNull paramMap) {
        try {

            Mhshrb001_TAB3 entity = new Mhshrb001_TAB3(paramMap);
            List<EgovMapForNull> list = mhshrb001MapperFamily.selectMhsEmpFamily(paramMap);
            entity.setRecords(list);
            
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

	@Override
	public JSONObject saveMhsEmpFamily(EgovMapForNull paramMap) {

		try {
			
			String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
			Mhshrb001_TAB3 mhshrb001_tab3 = null;
            
			//System.out.println("idsArr.length : " + idsArr.length);
			
            for(String ids : idsArr) {
            	System.out.println("ids : " + ids);
            	
            	mhshrb001_tab3 = new Mhshrb001_TAB3(paramMap, ids);
 
            	System.out.println(mhshrb001_tab3.toString());
            	
                switch(mhshrb001_tab3.getNativeeditorStatus()) {
                case "deleted": 
                	mhshrb001MapperFamily.deleteMhsEmpFamily(mhshrb001_tab3);
                    break;
                default:
                	mhshrb001MapperFamily.saveMhsEmpFamily(mhshrb001_tab3);
                    break;
                }
            }

            EgovMapForNull returnMap = new EgovMapForNull();
            returnMap.put("code", "000");
            returnMap.put("message", "SUCCESS");            
            
            return new JsonMsgMng().makeJsonObject(returnMap);

		} catch (Exception e) {
			return new Exceptions(new Throwable(), e).getResultStatus();
		}
	}
	@Override
    public JSONObject removeMhsEmpFamily(EgovMapForNull paramMap) {

        try {

            String empnos = StringExpression.nullConvert(paramMap.get("empnos"));
            String[] empnoArr = empnos.split("\\,");
            String familySns = StringExpression.nullConvert(paramMap.get("familySns"));
            String[] familySnArr = familySns.split("\\,");

            int arrLength = (familySnArr == null) ? 0 : familySnArr.length;
            EgovMapForNull mapper = null;

            for (int keyColumnIdx = 0; keyColumnIdx < arrLength; keyColumnIdx++) {

                mapper = new EgovMapForNull();
                mapper.put("empno", empnoArr[keyColumnIdx]);
                mapper.put("familySn", familySnArr[keyColumnIdx]);

                //mhshrb001MapperFamily.deleteMhsEmpFamily(mapper);
            }

            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    
	/*발령정보 Tab4*/
    @Override
    public JSONObject searchMhsEmpGnfd(EgovMapForNull paramMap) {
        try {

            Mhshrb001_TAB4 entity = new Mhshrb001_TAB4(paramMap);
            List<EgovMapForNull> list = mhshrb001MapperGnfd.selectMhsEmpGnfd(paramMap);
            entity.setRecords(list);
            
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

	@Override
	public JSONObject saveMhsEmpGnfd(EgovMapForNull paramMap) {

		try {
			
			String[] idsArr = StringExpression.nullConvert(paramMap.get("ids")).split("\\,");
			Mhshrb001_TAB4 mhshrb001_tab4 = null;
            
			//System.out.println("idsArr.length : " + idsArr.length);
			
            for(String ids : idsArr) {
            	System.out.println("ids : " + ids);
            	
            	mhshrb001_tab4 = new Mhshrb001_TAB4(paramMap, ids);
 
            	System.out.println(mhshrb001_tab4.toString());
            	
                switch(mhshrb001_tab4.getNativeeditorStatus()) {
                case "deleted": 
                	mhshrb001MapperGnfd.deleteMhsEmpGnfd(mhshrb001_tab4);
                    break;
                default:
                	mhshrb001MapperGnfd.saveMhsEmpGnfd(mhshrb001_tab4);
                    break;
                }
            }

            EgovMapForNull returnMap = new EgovMapForNull();
            returnMap.put("code", "000");
            returnMap.put("message", "SUCCESS");            
            
            return new JsonMsgMng().makeJsonObject(returnMap);

		} catch (Exception e) {
			return new Exceptions(new Throwable(), e).getResultStatus();
		}
	}
    
	/*포상정보 Tab5*/
    @Override
    public JSONObject searchMhsEmpTab5Rward(EgovMapForNull paramMap) {
        try {

            Mhshrb001_TAB5 entity = new Mhshrb001_TAB5(paramMap);
            List<EgovMapForNull> list = mhshrb001MapperTab5Rward.selectMhsEmpTab5Rward(paramMap);
            entity.setRecords(list);
            
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    
    /*징계정보 Tab6*/
    @Override
    public JSONObject searchMhsEmpTab6Dscpl(EgovMapForNull paramMap) {
        try {

            Mhshrb001_TAB6 entity = new Mhshrb001_TAB6(paramMap);
            List<EgovMapForNull> list = mhshrb001MapperTab6Dscpl.selectMhsEmpTab6Dscpl(paramMap);
            entity.setRecords(list);
            
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }	

	/*학력정보 Tab7*/
    @Override
    public JSONObject searchMhsEmpTab7Acdmcr(EgovMapForNull paramMap) {
        try {

            Mhshrb001_TAB7 entity = new Mhshrb001_TAB7(paramMap);
            List<EgovMapForNull> list = mhshrb001MapperTab7Acdmcr.selectMhsEmpTab7Acdmcr(paramMap);
            entity.setRecords(list);
            
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    @Override
    public JSONObject saveMhsEmpTab7Acdmcr(EgovMapForNull paramMap) {

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
            Mhshrb001_TAB7 entity = null;
            
            for(String ids : idsArr) {
                
                entity = new Mhshrb001_TAB7(paramMap, ids);
                entity.setRegId(userId);
                entity.setUptId(userId);
                
                switch(entity.getNativeeditorStatus()) {
                case "updated": 
                	mhshrb001MapperTab7Acdmcr.saveMhsEmpTab7Acdmcr(entity);
                    break;
                case "inserted":
                	//중복 아닌지 확인 필요
                	EgovMapForNull entity2 = mhshrb001MapperTab7Acdmcr.insertMhsEmpTab7AcdmcrUseChk(entity);
    				if(Integer.parseInt((String)entity2.get("cnt")) > 0) {
    					EgovMapForNull mapper = new EgovMapForNull();
    					mapper.put("code", "999");
    					return new JsonMsgMng().makeJsonObject(mapper);
    				}
                	
    				mhshrb001MapperTab7Acdmcr.saveMhsEmpTab7Acdmcr(entity);
                    break;
                default: 
                    break;
                }
            }
            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    @Override
    public JSONObject removeMhsEmpTab7Acdmcr(EgovMapForNull paramMap) {

        try {
        	String empnos = StringExpression.nullConvert(paramMap.get("empnos"));
            String acdmcrSns = StringExpression.nullConvert(paramMap.get("acdmcrSns"));
            String[] empnosArr = empnos.split("\\,");
            String[] acdmcrSnArr = acdmcrSns.split("\\,");

            int arrLength = (acdmcrSnArr == null) ? 0 : acdmcrSnArr.length;
            EgovMapForNull mapper = null;

            for (int keyColumnIdx = 0; keyColumnIdx < arrLength; keyColumnIdx++) {

                mapper = new EgovMapForNull();
                mapper.put("empno", empnosArr[keyColumnIdx]);
                mapper.put("acdmcrSn", acdmcrSnArr[keyColumnIdx]);

                mhshrb001MapperTab7Acdmcr.deleteMhsEmpTab7Acdmcr(mapper);
            }

            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            throw e;
        }
    }

	/*경력정보 Tab8*/
    @Override
    public JSONObject searchMhsEmpTab8Career(EgovMapForNull paramMap) {
        try {

            Mhshrb001_TAB8 entity = new Mhshrb001_TAB8(paramMap);
            List<EgovMapForNull> list = mhshrb001MapperTab8Career.selectMhsEmpTab8Career(paramMap);
            entity.setRecords(list);
            
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    @Override
    public JSONObject saveMhsEmpTab8Career(EgovMapForNull paramMap) {

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
            Mhshrb001_TAB8 entity = null;
            
            for(String ids : idsArr) {
                
                entity = new Mhshrb001_TAB8(paramMap, ids);
                entity.setRegId(userId);
                entity.setUptId(userId);
                
                switch(entity.getNativeeditorStatus()) {
                case "updated": 
                	mhshrb001MapperTab8Career.saveMhsEmpTab8Career(entity);
                    break;
                case "inserted":
                	//중복 아닌지 확인 필요
                	EgovMapForNull entity2 = mhshrb001MapperTab8Career.insertMhsEmpTab8CareerUseChk(entity);
    				if(Integer.parseInt((String)entity2.get("cnt")) > 0) {
    					EgovMapForNull mapper = new EgovMapForNull();
    					mapper.put("code", "999");
    					return new JsonMsgMng().makeJsonObject(mapper);
    				}
                	
    				mhshrb001MapperTab8Career.saveMhsEmpTab8Career(entity);
                    break;
                default: 
                    break;
                }
            }
            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    @Override
    public JSONObject removeMhsEmpTab8Career(EgovMapForNull paramMap) {

        try {
        	String empnos = StringExpression.nullConvert(paramMap.get("empnos"));
            String careerSns = StringExpression.nullConvert(paramMap.get("careerSns"));
            String[] empnosArr = empnos.split("\\,");
            String[] careerSnArr = careerSns.split("\\,");

            int arrLength = (careerSnArr == null) ? 0 : careerSnArr.length;
            EgovMapForNull mapper = null;

            for (int keyColumnIdx = 0; keyColumnIdx < arrLength; keyColumnIdx++) {

                mapper = new EgovMapForNull();
                mapper.put("empno", empnosArr[keyColumnIdx]);
                mapper.put("careerSn", careerSnArr[keyColumnIdx]);

                mhshrb001MapperTab8Career.deleteMhsEmpTab8Career(mapper);
            }

            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            throw e;
        }
    }

	/*자격정보 Tab9*/
    @Override
    public JSONObject searchMhsEmpTab9Crqfs(EgovMapForNull paramMap) {
        try {

            Mhshrb001_TAB9 entity = new Mhshrb001_TAB9(paramMap);
            List<EgovMapForNull> list = mhshrb001MapperTab9Crqfs.selectMhsEmpTab9Crqfs(paramMap);
            entity.setRecords(list);
            
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    @Override
    public JSONObject saveMhsEmpTab9Crqfs(EgovMapForNull paramMap) {

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
            Mhshrb001_TAB9 entity = null;
            
            for(String ids : idsArr) {
                
                entity = new Mhshrb001_TAB9(paramMap, ids);
                entity.setRegId(userId);
                entity.setUptId(userId);
                
                switch(entity.getNativeeditorStatus()) {
                case "updated": 
                	mhshrb001MapperTab9Crqfs.saveMhsEmpTab9Crqfs(entity);
                    break;
                case "inserted":
                	//중복 아닌지 확인 필요
                	EgovMapForNull entity2 = mhshrb001MapperTab9Crqfs.insertMhsEmpTab9CrqfsUseChk(entity);
    				if(Integer.parseInt((String)entity2.get("cnt")) > 0) {
    					EgovMapForNull mapper = new EgovMapForNull();
    					mapper.put("code", "999");
    					return new JsonMsgMng().makeJsonObject(mapper);
    				}
                	
    				mhshrb001MapperTab9Crqfs.saveMhsEmpTab9Crqfs(entity);
                    break;
                default: 
                    break;
                }
            }
            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    @Override
    public JSONObject removeMhsEmpTab9Crqfs(EgovMapForNull paramMap) {

        try {
        	String empnos = StringExpression.nullConvert(paramMap.get("empnos"));
            String crqfsSns = StringExpression.nullConvert(paramMap.get("crqfsSns"));
            String[] empnosArr = empnos.split("\\,");
            String[] crqfsSnArr = crqfsSns.split("\\,");

            int arrLength = (crqfsSnArr == null) ? 0 : crqfsSnArr.length;
            EgovMapForNull mapper = null;

            for (int keyColumnIdx = 0; keyColumnIdx < arrLength; keyColumnIdx++) {

                mapper = new EgovMapForNull();
                mapper.put("empno", empnosArr[keyColumnIdx]);
                mapper.put("crqfsSn", crqfsSnArr[keyColumnIdx]);

                mhshrb001MapperTab9Crqfs.deleteMhsEmpTab9Crqfs(mapper);
            }

            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            throw e;
        }
    }
    
    /*교육정보 Tab10*/
    @Override
    public JSONObject searchMhsEmpTab10Edu(EgovMapForNull paramMap) {
        try {

            Mhshrb001_TAB10 entity = new Mhshrb001_TAB10(paramMap);
            List<EgovMapForNull> list = mhshrb001MapperTab10Edu.selectMhsEmpTab10Edu(paramMap);
            entity.setRecords(list);
            
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }

	/*계좌정보 Tab11*/
    @Override
    public JSONObject searchMhsEmpTab11Acnut(EgovMapForNull paramMap) {
        try {

            Mhshrb001_TAB11 entity = new Mhshrb001_TAB11(paramMap);
            List<EgovMapForNull> list = mhshrb001MapperTab11Acnut.selectMhsEmpTab11Acnut(paramMap);
            entity.setRecords(list);
            
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    @Override
    public JSONObject saveMhsEmpTab11Acnut(EgovMapForNull paramMap) {

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
            Mhshrb001_TAB11 entity = null;
            
            for(String ids : idsArr) {
                
                entity = new Mhshrb001_TAB11(paramMap, ids);
                entity.setRegId(userId);
                entity.setUptId(userId);
                
                switch(entity.getNativeeditorStatus()) {
                case "updated": 
                	mhshrb001MapperTab11Acnut.saveMhsEmpTab11Acnut(entity);
                    break;
                case "inserted":
                	//중복 아닌지 확인 필요
                	EgovMapForNull entity2 = mhshrb001MapperTab11Acnut.insertMhsEmpTab11AcnutUseChk(entity);
    				if(Integer.parseInt((String)entity2.get("cnt")) > 0) {
    					EgovMapForNull mapper = new EgovMapForNull();
    					mapper.put("code", "999");
    					return new JsonMsgMng().makeJsonObject(mapper);
    				}
                	
    				mhshrb001MapperTab11Acnut.saveMhsEmpTab11Acnut(entity);
                    break;
                default: 
                    break;
                }
            }
            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    @Override
    public JSONObject removeMhsEmpTab11Acnut(EgovMapForNull paramMap) {

        try {
        	String empnos = StringExpression.nullConvert(paramMap.get("empnos"));
            String acnutSns = StringExpression.nullConvert(paramMap.get("acnutSns"));
            String[] empnosArr = empnos.split("\\,");
            String[] acnutSnArr = acnutSns.split("\\,");

            int arrLength = (acnutSnArr == null) ? 0 : acnutSnArr.length;
            EgovMapForNull mapper = null;

            for (int keyColumnIdx = 0; keyColumnIdx < arrLength; keyColumnIdx++) {

                mapper = new EgovMapForNull();
                mapper.put("empno", empnosArr[keyColumnIdx]);
                mapper.put("acnutSn", acnutSnArr[keyColumnIdx]);

                mhshrb001MapperTab11Acnut.deleteMhsEmpTab11Acnut(mapper);
            }

            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            throw e;
        }
    }

	/*어학정보 Tab12*/
    @Override
    public JSONObject searchMhsEmpTab12Fggg(EgovMapForNull paramMap) {
        try {

            Mhshrb001_TAB12 entity = new Mhshrb001_TAB12(paramMap);
            List<EgovMapForNull> list = mhshrb001MapperTab12Fggg.selectMhsEmpTab12Fggg(paramMap);
            entity.setRecords(list);
            
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    @Override
    public JSONObject saveMhsEmpTab12Fggg(EgovMapForNull paramMap) {

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
            Mhshrb001_TAB12 entity = null;
            
            for(String ids : idsArr) {
                
                entity = new Mhshrb001_TAB12(paramMap, ids);
                entity.setRegId(userId);
                entity.setUptId(userId);
                
                switch(entity.getNativeeditorStatus()) {
                case "updated": 
                	mhshrb001MapperTab12Fggg.saveMhsEmpTab12Fggg(entity);
                    break;
                case "inserted":
                	//중복 아닌지 확인 필요
                	EgovMapForNull entity2 = mhshrb001MapperTab12Fggg.insertMhsEmpTab12FgggUseChk(entity);
    				if(Integer.parseInt((String)entity2.get("cnt")) > 0) {
    					EgovMapForNull mapper = new EgovMapForNull();
    					mapper.put("code", "999");
    					return new JsonMsgMng().makeJsonObject(mapper);
    				}
                	
    				mhshrb001MapperTab12Fggg.saveMhsEmpTab12Fggg(entity);
                    break;
                default: 
                    break;
                }
            }
            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
    @Override
    public JSONObject removeMhsEmpTab12Fggg(EgovMapForNull paramMap) {

        try {
        	String empnos = StringExpression.nullConvert(paramMap.get("empnos"));
            String fgggSns = StringExpression.nullConvert(paramMap.get("fgggSns"));
            String[] empnosArr = empnos.split("\\,");
            String[] fgggSnArr = fgggSns.split("\\,");

            int arrLength = (fgggSnArr == null) ? 0 : fgggSnArr.length;
            EgovMapForNull mapper = null;

            for (int keyColumnIdx = 0; keyColumnIdx < arrLength; keyColumnIdx++) {

                mapper = new EgovMapForNull();
                mapper.put("empno", empnosArr[keyColumnIdx]);
                mapper.put("fgggSn", fgggSnArr[keyColumnIdx]);

                mhshrb001MapperTab12Fggg.deleteMhsEmpTab12Fggg(mapper);
            }

            return new JsonMsgMng().makeJsonObject(paramMap);

        } catch (Exception e) {
            throw e;
        }
    }
	
	
	
	
	
	
	
	
	//직위 콤보
    @Override
    public JSONObject searchMhshrb001OfcpsCode(EgovMapForNull paramMap) {
        try {

            Mhshrm015 entity = new Mhshrm015(paramMap);
            List<EgovMapForNull> list = mhshrb001Mapper.selectMhshrb001OfcpsCode(paramMap);
            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
	
	//직책 콤보
    @Override
    public JSONObject searchMhshrb001RspofcCode(EgovMapForNull paramMap) {
        try {

            Mhshrm014 entity = new Mhshrm014(paramMap);
            List<EgovMapForNull> list = mhshrb001Mapper.selectMhshrb001RspofcCode(paramMap);
            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
	
	//직급 콤보
    @Override
    public JSONObject searchMhshrb001ClsfCode(EgovMapForNull paramMap) {
        try {

            Mhshrm004 entity = new Mhshrm004(paramMap);
            List<EgovMapForNull> list = mhshrb001Mapper.selectMhshrb001ClsfCode(paramMap);
            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
}