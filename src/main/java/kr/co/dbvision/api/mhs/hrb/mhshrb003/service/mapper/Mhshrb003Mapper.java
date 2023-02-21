package kr.co.dbvision.api.mhs.hrb.mhshrb003.service.mapper;

import java.util.List;


import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.mhs.hrb.mhshrb003.entity.Mhshrb003;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 개인정보변경승인관리에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2021.06.09
 * @version 1.0
 * @sourceGen version 2021.02.18.01 (2021.06.09)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2021.06.09          디비비전              최초 생성
 * </pre>
 */

@Mapper("Mhshrb003Mapper")
public interface Mhshrb003Mapper {
	/**
     * 개인정보변경승인 목록을 조회한다.
     * @param paramMap
     * @return
     */
     public List<EgovMapForNull> selectMhshrb003List(EgovMapForNull paramMap);
     /**
      * 개인정보변경승인 상세내용을 조회한다.
      * @param paramMap
      * @return
      */
     public EgovMapForNull selectMhshrb003(EgovMapForNull paramMap);
     public EgovMapForNull searchMhshrb003Tab1(EgovMapForNull paramMap);
     public EgovMapForNull searchMhshrb003Tab2(EgovMapForNull paramMap);
     public List<EgovMapForNull> searchMhshrb003Tab3(EgovMapForNull paramMap);
     public List<EgovMapForNull> searchMhshrb003Tab4(EgovMapForNull paramMap);
     public List<EgovMapForNull> searchMhshrb003Tab5(EgovMapForNull paramMap);
     public List<EgovMapForNull> searchMhshrb003Tab6(EgovMapForNull paramMap);
     public List<EgovMapForNull> searchMhshrb003Tab7(EgovMapForNull paramMap);
     /**
      * 개인정보변경승인 정보를 삭제한다.
      * @param paramMap
      */
     public void deleteMhshrb003(Mhshrb003 entity);
     /**
      * 개인정보변경승인 정보를 등록한다.
      * @param paramMap
      */
     public void saveUserInfo(Mhshrb003 entity);
     public void saveChangeData(Mhshrb003 entity);
     
     /* Tab2 */
     
     //Tab1 데이터 저장
     public int changeDataTab1(Mhshrb003 entity);
     public int changeDataTab01(Mhshrb003 entity);
     public int saveEmpHist(Mhshrb003 entity);
     //Tab2 데이터 저장
     public int changeDataTab2(Mhshrb003 entity);
     public int saveIndvdlInfoHist(Mhshrb003 entity);
     //Tab3 데이터 저장
     public int deleteFamily(Mhshrb003 entity);
     public int changeDataTab3(Mhshrb003 entity);
     public int saveFamilyHist(Mhshrb003 entity);
     //Tab4 데이터 저장
     public int deleteAcdmcr(Mhshrb003 entity);
     public int changeDataTab4(Mhshrb003 entity);
     //Tab5 데이터 저장
     public int deleteCrqfs(Mhshrb003 entity);
     public int changeDataTab5(Mhshrb003 entity);
     public int saveCrqfsHist(Mhshrb003 entity);
     //Tab6 데이터 저장
     public int deleteAcnut(Mhshrb003 entity);
     public int changeDataTab6(Mhshrb003 entity);
     //Tab7 데이터 저장
     public int deleteFggg(Mhshrb003 entity);
     public int changeDataTab7(Mhshrb003 entity);
     
     //Tab8
     public int saveCareerHist(Mhshrb003 entity);
     public int deleteCareer(Mhshrb003 entity);
     public int changeDataTab8(Mhshrb003 entity);
	public int applyMhshrb003(Mhshrb003 entity);
	
}
