package kr.co.dbvision.api.mps.cal.mpscal017.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.mps.cal.mpscal017.entity.Mpscal017;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 급여마감관리에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2020.07.03
 * @version 1.0
 * @sourceGen version 2020.06.29.01 (2020.07.03)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.07.03          디비비전              최초 생성
 * </pre>
 */

@Mapper("Mpscal017Mapper")
public interface Mpscal017Mapper {
    
    /**
     * 급여지급일자등록 목록을 조회한다.
     * 
     * @param paramMap
     * @return
     */
    public List<EgovMapForNull> selectMpscal017List(EgovMapForNull paramMap);
    
    public List<EgovMapForNull> selectItemListMpscal017(EgovMapForNull paramMap);
    
    public List<EgovMapForNull> selectNewItemListMpscal017(EgovMapForNull paramMap);
    
    public String getPymntSnMpscal017(Mpscal017 paramMap);
    
    /**
     * 
     * @param paramMap
     * @return
     */
    public List<EgovMapForNull> selectMpscal017MonthList(EgovMapForNull paramMap);
    
      /**
       * 급여마감 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectMpscal017(EgovMapForNull paramMap);
      /**
       * 급여마감 정보를 등록한다.
       * @param paramMap
       */
      public void saveMpscal017(Mpscal017 entity);
      /**
       * 급여마감 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteMpscal017(Mpscal017 entity);
      
      public List<EgovMapForNull> selectComboYearMpscal017List(EgovMapForNull paramMap);
      
}