package kr.co.dbvision.api.stm.qes.stmqes001.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.stm.qes.stmqes001.entity.StmqeustrnarCn;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 설문관리관리에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2020.09.04
 * @version 1.0
 * @sourceGen version 2020.08.06.01 (2020.09.04)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.09.04          디비비전              최초 생성
 * </pre>
 */

@Mapper("StmqeustrnarCnMapper")
public interface StmqeustrnarCnMapper {
     /**
      * 설문 대상을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectStmqeustrnarCnList(EgovMapForNull paramMap);
      
      /**
       * 설문 대상 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectStmqeustrnarCn(EgovMapForNull paramMap);
      /**
       * 설문 대상 정보를 등록한다.
       * @param paramMap
       */
      public void saveStmqeustrnarCn(StmqeustrnarCn entity);
      /**
       * 설문 대상 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteStmqeustrnarCn(StmqeustrnarCn entity);
      

       public List<EgovMapForNull> selectStmqesRList(EgovMapForNull paramMap);
       public EgovMapForNull selectStmqesR(EgovMapForNull paramMap);
       public void saveStmqesR(StmqeustrnarCn entity);
       public void deleteStmqesR(StmqeustrnarCn entity);
       
       public String selectQestnarCnSn(StmqeustrnarCn paramMap);
      
      
}
