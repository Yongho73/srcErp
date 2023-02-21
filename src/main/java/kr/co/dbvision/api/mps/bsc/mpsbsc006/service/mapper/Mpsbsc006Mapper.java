package kr.co.dbvision.api.mps.bsc.mpsbsc006.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.mps.bsc.mpsbsc006.entity.Mpsbsc006;
import kr.co.dbvision.api.mps.cal.mpscal013.entity.Mpscal013;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 급여지급일자등록관리에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2020.07.13
 * @version 1.0
 * @sourceGen version 2020.06.29.01 (2020.07.13)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.07.13          디비비전              최초 생성
 * </pre>
 */

@Mapper("Mpsbsc006Mapper")
public interface Mpsbsc006Mapper {
    
    public List<EgovMapForNull> selectComboYearMpsbsc006List(EgovMapForNull paramMap);

    /**
     * 
     * @param paramMap
     * @return
     */
    public List<EgovMapForNull> selectMpsbsc006MonthList(EgovMapForNull paramMap);

    /**
     * 급여지급일자등록 목록을 조회한다.
     * 
     * @param paramMap
     * @return
     */
    public List<EgovMapForNull> selectMpsbsc006List(EgovMapForNull paramMap);
    public List<EgovMapForNull> selectItemListMpsbsc006(EgovMapForNull paramMap);
    public List<EgovMapForNull> selectNewItemListMpsbsc006(EgovMapForNull paramMap);
    
    public List<EgovMapForNull> selectMpsbscItemList(EgovMapForNull paramMap);
    public List<EgovMapForNull> selectMpsbscItemList2(EgovMapForNull paramMap);
    public List<EgovMapForNull> selectMpsbsc006closAtList(EgovMapForNull paramMap);

    /**
     * 급여지급일자등록 상세내용을 조회한다.
     * 
     * @param paramMap
     * @return
     */
    public EgovMapForNull selectMpsbsc006(EgovMapForNull paramMap);
    
    public String getPymntSnMpsbsc006(Mpsbsc006 paramMap);
    
    public String getMaxMpsbsc006(Mpsbsc006 paramMap);
 // 전년도 데이터 삭제
    public void deleteApplcYyYear(Mpsbsc006 entity);
    // 전년도 데이터 복사
    public void insertCopyApplcYy(Mpsbsc006 entity);
    // 전년도 데이터 삭제
    public void insertCopyTrgter(Mpscal013 entity);
    // 전년도 데이터 복사
    public void deleteApplcTrgter(Mpscal013 entity);

    /**
     * 급여지급일자등록 정보를 등록한다.
     * 
     * @param paramMap
     */
    public void saveMpsbsc006(Mpsbsc006 paramMap);

    /**
     * 급여항목저장
     * @param paramMap
     */
    public void saveSalaryItemMpsbsc006(Mpsbsc006 entity);
    
    public void saveSalaryItem2Mpsbsc006(Mpsbsc006 entity);
    
    /**
     * 급여지급일자등록 정보를 삭제한다.
     * 
     * @param paramMap
     */
    public void deleteMpsbsc006(EgovMapForNull paramMap);

    public void deleteSalaryItemMpsbsc006(Mpsbsc006 entity);
    
    public void deleteSalaryItem2Mpsbsc006(Mpsbsc006 entity);
}
