package kr.co.dbvision.api.mta.mat.mtamat001.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 유지보수요청에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2019.12.16
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2019.12.16          디비비전              최초 생성
 *
 * </pre>
 */

@Mapper("Mtamat001Mapper")
public interface Mtamat001Mapper {
     /**
      * 유지보수요청 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectMtaRequstList(EgovMapForNull paramMap);
      /**
       * 유지보수요청 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectMtaRequst(EgovMapForNull paramMap);
      /**
       * 유지보수요청 정보를 등록한다.
       * @param paramMap
       */
      public void insertMtaRequst(EgovMapForNull paramMap);
      /**
       * 유지보수요청 정보를 수정한다.
       * @param paramMap
       */
      public void updateMtaRequst(EgovMapForNull paramMap);
      /**
       * 유지보수요청 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteMtaRequst(EgovMapForNull paramMap);
      
      public List<EgovMapForNull> selectMtaCompanyList(EgovMapForNull paramMap);
      
      public List<EgovMapForNull> searchMtaRequstOpertList(EgovMapForNull paramMap);
      
      public void deleteMtaRequstOpert(EgovMapForNull paramMap);
      
      public void insertMtaRequstOpert(EgovMapForNull paramMap);
      
      public void updateMtaRequstOpert(EgovMapForNull paramMap);
      
      public EgovMapForNull searchMtaRequstOpertReg(EgovMapForNull paramMap);
      
      public EgovMapForNull searchMtaRequstOpertDetail(EgovMapForNull paramMap);
}
