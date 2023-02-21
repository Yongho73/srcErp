package kr.co.dbvision.api.mhs.hrb.mhshrb001.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 인사기본에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2019.05.22
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2019.05.22          디비비전              최초 생성
 *
 * </pre>
 */

@Mapper("Mhshrb001Mapper")
public interface Mhshrb001Mapper {
	/**
     * 인사기본 목록을 조회한다. : 전체 수량 조회
     * @param paramMap
     * @return
     */
     public int selectMhsEmpListAllCnt(EgovMapForNull paramMap);
     /**
      * 인사기본 목록을 조회한다.
      * @param paramMap
      * @return
      */
      public List<EgovMapForNull> selectMhsEmpList(EgovMapForNull paramMap);
      /**
       * 인사기본 상세내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectMhsEmp(EgovMapForNull paramMap);
      /**
       * 인사기본 정보를 삭제하기 전에 사용 내용을 조회한다.
       * @param paramMap
       * @return
       */
      public EgovMapForNull selectMhsEmpUseChk(EgovMapForNull paramMap);

      /**
       * 인사기본 정보를 등록한다.(전체 컬럼)
       * @param paramMap
       */
      public void insertMhsEmp(EgovMapForNull paramMap);
      /**
       * 인사기본 정보를 등록한다.(Main 컬럼)
       * @param paramMap
       */
      public void insertMhsEmpMain(EgovMapForNull paramMap);
      /**
       * 인사기본 정보를 수정한다.(전체 컬럼)
       * @param paramMap
       */
      public void updateMhsEmp(EgovMapForNull paramMap);
      /**
       * 인사기본 정보를 수정한다.(Main 컬럼)
       * @param paramMap
       */
      public void updateMhsEmpMain(EgovMapForNull paramMap);
      /**
       * 인사기본 정보를 수정한다.(기본 tab 정보)
       * @param paramMap
       */
      public void updateMhsEmpBase(EgovMapForNull paramMap);
      /**
       * 인사기본 정보를 삭제한다.
       * @param paramMap
       */
      public void deleteMhsEmp(EgovMapForNull paramMap);
      
      
      /*개인정보*/
      /**
       * 인사기본 정보를 삭제하기 전에 개인정보을 삭제한다
       * @param paramMap
       */
      public void deleteMhsEmp_Indvdlinfo(EgovMapForNull paramMap);
      /**
       * 인사기본 : 개인정보를 저장한다.
       * @param paramMap
       */
      public void saveMhsIndvdlInfo(EgovMapForNull paramMap);
      
      /*학력*/
      /**
       * 인사기본 목록을 조회한다.
       * @param paramMap
       * @return
       */ 
      public List<EgovMapForNull> selectMhsAcdmcrList(EgovMapForNull paramMap);
       /**
        * 인사기본 상세내용을 조회한다.
        * @param paramMap
        * @return
        */
       public  EgovMapForNull selectMhsAcdmcr(EgovMapForNull paramMap);
       /**
        * 인사기본 정보를 삭제하기 전에 학력을 삭제한다
        * @param paramMap
        */
       public void deleteMhsEmp_Acdmcr(EgovMapForNull paramMap);
       /**
        * 인사기본 정보를 등록한다.
        * @param paramMap
        */
       public void insertMhsAcdmcr(EgovMapForNull paramMap);
       /**
        * 인사기본 정보를 수정한다.
        * @param paramMap
        */
       public  void updateMhsAcdmcr(EgovMapForNull paramMap);
       /**
        * 인사기본 정보를 삭제한다.
        * @param paramMap
        */
       public  void deleteMhsAcdmcr(EgovMapForNull paramMap); 
       /**
        * 인사기본 TAB4(학력) 목록 삭제한다.
        * @param paramMap
        * @return
        */
       public List<EgovMapForNull> deleteMhsEmpAcdmcr(EgovMapForNull paramMap);
        
        
       /*가족*/
       /**
        * 인사기본 정보를 삭제하기 전에 가족정보을 삭제한다
        * @param paramMap
        */
       public void deleteMhsEmp_Family(EgovMapForNull paramMap);
       
       /*경력*/
       /**
        * 인사기본 정보를 삭제하기 전에 경력을 삭제한다
        * @param paramMap
        */
       public void deleteMhsEmp_Career(EgovMapForNull paramMap);
       
       /*교육*/
       /**
        * 인사기본 정보를 삭제하기 전에 교육을 삭제한다
        * @param paramMap
        */
       public void deleteMhsEmp_Eud(EgovMapForNull paramMap);
       
       /*병역*/
       /**
        * 인사기본 정보를 삭제하기 전에 병역을 삭제한다
        * @param paramMap
        */
       public void deleteMhsEmp_Mltpwr(EgovMapForNull paramMap);
       
       /*연봉 ?????*/
       /**
        * 인사기본 정보를 삭제하기 전에 연봉을 삭제한다
        * @param paramMap
        */
       public void deleteMhsEmp_Anslry(EgovMapForNull paramMap);
       
       /*자격사항*/
       /**
        * 인사기본 정보를 삭제하기 전에 자격사항을 삭제한다
        * @param paramMap
        */
       public void deleteMhsEmp_Crqfs(EgovMapForNull paramMap);

       /**
        * 직위 목록을 조회한다.
        * @param paramMap
        * @return
        */
        public List<EgovMapForNull> selectMhshrb001OfcpsCode(EgovMapForNull paramMap);

       /**
        * 직책 목록을 조회한다.
        * @param paramMap
        * @return
        */
        public List<EgovMapForNull> selectMhshrb001RspofcCode(EgovMapForNull paramMap);

        /**
         * 직급 목록을 조회한다.
         * @param paramMap
         * @return
         */
         public List<EgovMapForNull> selectMhshrb001ClsfCode(EgovMapForNull paramMap);
}
