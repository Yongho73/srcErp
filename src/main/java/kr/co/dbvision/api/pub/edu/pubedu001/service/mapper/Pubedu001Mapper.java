package kr.co.dbvision.api.pub.edu.pubedu001.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.pub.edu.pubedu001.entity.Pubedu001;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 교육조회및신청관리에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2020.09.01
 * @version 1.0
 * @sourceGen version 2020.08.06.01 (2020.09.01)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.09.01          디비비전              최초 생성
 * </pre>
 */

@Mapper("Pubedu001Mapper")
public interface Pubedu001Mapper {
     /**
      * 교육신청 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectPubedu001List(EgovMapForNull paramMap);
      public List<EgovMapForNull> selectPubeduEmp(EgovMapForNull paramMap);
      /**
       * 교육신청 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectPubedu001(EgovMapForNull paramMap);
      /**
       * 교육신청 정보를 등록한다.
       * @param paramMap
       */
      public String selectEdureqstSnCnt(Pubedu001 paramMap);
      public String selectConfmSeSnCnt(Pubedu001 paramMap);
      public void savePubedu001(Pubedu001 entity);
      /**
       * 교육신청 정보를 삭제한다.
       * @param paramMap
       */
      public void deletePubedu001(Pubedu001 entity);
      
      public void savePubeduEmp(Pubedu001 entity);
      public void deletePubeduEmp(Pubedu001 entity);
      
      public Integer selectElctsctSeSnCnt(EgovMapForNull paramMap);
      
      public void saveCopyPubedu001(EgovMapForNull paramMap);
      
      public void saveCopyPubeduEmp(EgovMapForNull paramMap);
}
