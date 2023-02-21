package kr.co.dbvision.api.mfs.bsc.mfsbsc002.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.mfs.bsc.mfsbsc002.entity.Mfsbsc002;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 거래처관리관리에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2020.03.10
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.03.10          디비비전              최초 생성
 * </pre>
 */

@Mapper("Mfsbsc002Mapper")
public interface Mfsbsc002Mapper {
	
	
	 /**
	  * 총갯수를 구한다  
	 * @param paramMap
	 * @return
	 */
	 public int selectMfsbsc002ListCnt(EgovMapForNull paramMap);
     /**
      * 거래처 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectMfsbsc002List(EgovMapForNull paramMap);
      /**
       * 거래처 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectMfsbsc002(EgovMapForNull paramMap);
      /**
       * 거래처 정보를 등록한다.
       * @param paramMap
       */
      public void saveMfsbsc002(Mfsbsc002 paramMap);
      /**
       * 거래처 정보를 삭제한다.
       * @param paramMap
       */
      //public void deleteMfsbsc002(EgovMapForNull paramMap);
      /**
       * 인사탭 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteMfsbsc002(Mfsbsc002 entity);
      
      
      public List<EgovMapForNull> selectExcelMfsbsc002(EgovMapForNull paramMap);
}
