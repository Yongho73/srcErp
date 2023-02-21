package kr.co.dbvision.api.mhs.hra.mhshra001.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.mhs.hra.mhshra001.entity.Mhshra001;
import kr.co.dbvision.lib.EgovMapForNull;
import net.sf.json.JSONObject;

/**
 * 인사발령관리에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2020.06.16
 * @version 1.0
 * @sourceGen version 2020.06.11.02 (2020.06.16)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.06.16          디비비전              최초 생성
 * </pre>
 */

@Mapper("Mhshra001Mapper")
public interface Mhshra001Mapper {
    /**
     * 발령구분 목록을 조회한다.
     * @param paramMap
     * @return
     */
    public List<EgovMapForNull> gnfdCodeData(EgovMapForNull paramMap);
     /**
      * 인사발령 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectMhshra001List(EgovMapForNull paramMap);
      /**
       * 인사발령 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectMhshra001(EgovMapForNull paramMap);
      /**
       * 인사발령 정보를 등록한다.
       * @param paramMap
       */
      public void saveMhshra001(Mhshra001 entity);
      /**
       * 인사발령 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteMhshra001(Mhshra001 entity);
      /**
       * 엑셀 데이터를 검사한다.
       * @param paramMap
       */
      public List<EgovMapForNull> checkTargetDataMhshra001(EgovMapForNull paramMap);
      public List<EgovMapForNull> checkDataMhshra001(EgovMapForNull paramMap);
      /**
       * 승급대상자를 조회한다.
       * @param paramMap
       */
      public List<EgovMapForNull> searchAdvanEmpMhshra001(EgovMapForNull paramMap);
}
