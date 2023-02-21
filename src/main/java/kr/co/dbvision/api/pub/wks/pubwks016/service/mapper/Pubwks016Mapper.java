package kr.co.dbvision.api.pub.wks.pubwks016.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.pub.wks.pubwks016.entity.Pubwks016;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 국내출장신청관리에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2020.06.29
 * @version 1.0
 * @sourceGen version 2020.06.29.01 (2020.06.29)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.06.29          디비비전              최초 생성
 * </pre>
 */

@Mapper("Pubwks016Mapper")
public interface Pubwks016Mapper {
        /**
         * 사용자 데이터를 조회한다.
         * @param paramMap
         * @return
         */
        public EgovMapForNull userDataPubwks016(EgovMapForNull paramMap);
        /**
         * 국내출장신청 목록을 조회한다.
         * @param paramMap
         * @return
         */
        public List<EgovMapForNull> selectPubwks016List(EgovMapForNull paramMap);
        /**
         * 국내출장신청 상세내용을 조회한다.
         * @param paramMap
         * @return
         */
        public EgovMapForNull selectPubwks016(EgovMapForNull paramMap);
        /**
         * 국내출장신청 상세내용을 조회한다.
         * @param paramMap
         * @return
         */
        public List<EgovMapForNull> findPubwks016DtlList(EgovMapForNull paramMap);
        /**
         * 국내출장신청 정보를 등록한다.
         * @param paramMap
         */
        public void savePubwks016(Pubwks016 entity);
        /**
         * 국내출장신청 상세 정보를 등록한다.
         * @param paramMap
         */
        public void saveDtlPubwks016(Pubwks016 entity);
        /**
         * 국내출장신청 정보를 삭제한다.
         * @param paramMap
         */
        public void deletePubwks016(EgovMapForNull paramMap);
        /**
         * 국내출장신청 상세 정보를 삭제한다.
         * @param paramMap
         */
        public void deleteDtlPubwks016(EgovMapForNull paramMap);
         /**
         * 국내출장신청 상세 정보의 대상자를 삭제한다.
         * @param paramMap
         */
        public void deleteDtlEmpPubwks016(Pubwks016 entity);
        /**
         * 복사 체크
         * @param paramMap
         */
        public Integer selectElctsctSeSnCnt(EgovMapForNull paramMap);
        /**
         * 복사 체크
         * @param paramMap
         */
        public void saveBsrpCopyPubwks016(EgovMapForNull paramMap);
        /**
         * 복사 체크
         * @param paramMap
         */
        public void saveBsrpDetailCopyPubwks016(EgovMapForNull paramMap);

        
        
        
}
