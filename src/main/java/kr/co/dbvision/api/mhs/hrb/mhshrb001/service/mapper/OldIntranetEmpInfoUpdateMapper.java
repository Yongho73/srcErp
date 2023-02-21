package kr.co.dbvision.api.mhs.hrb.mhshrb001.service.mapper;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.stm.mng.stmmng001.entity.Stmmng001;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * OLD INTRA
 *
 * @author 디비비전
 * @since 
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *    
 *
 * </pre>
 */

@Mapper("OldIntranetEmpInfoUpdateMapper")
public interface OldIntranetEmpInfoUpdateMapper {
	
      /**
       * 인사기본 OLD에 정보를 등록한다.
       * @param paramMap
       */
      public void insertOldIntraEmp(EgovMapForNull paramMap);
      /**
       * 인사기본 OLD에 정보를 수정한다.
       * @param paramMap
       */
      public void updateOldIntraEmp(EgovMapForNull paramMap);
      /**
       * 인사기본 OLD에 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteOldIntraEmp(EgovMapForNull paramMap);      
      /**
       * 사용자 ID OLD에 저장
       * @param entity
       */      
      public void saveOldIntraId(Stmmng001 entity);      
      /**
       * 신 인트라넷 이메일 전화번호 업데이트
       * @param paramMap
       */
      public void updateNewIntraEmp(EgovMapForNull paramMap);
}
