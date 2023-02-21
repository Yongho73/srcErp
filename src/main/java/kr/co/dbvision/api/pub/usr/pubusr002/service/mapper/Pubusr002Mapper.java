package kr.co.dbvision.api.pub.usr.pubusr002.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.pub.usr.pubusr002.entity.Pubusr002;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 개인정보변경신청관리에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2021.06.01
 * @version 1.0
 * @sourceGen version 2021.02.18.01 (2021.06.01)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2021.06.01          디비비전              최초 생성
 * </pre>
 */

@Mapper("Pubusr002Mapper")
public interface Pubusr002Mapper {
	 /**
     * 개인정보변경신청 목록을 조회한다.
     * @param paramMap
     * @return
     */
     public List<EgovMapForNull> selectPubusr002List(EgovMapForNull paramMap);
     /**
      * 개인정보변경신청 상세내용을 조회한다.
      * @param paramMap
      * @return
      */
     public EgovMapForNull selectPubusr002(EgovMapForNull paramMap);
     public EgovMapForNull searchPubusr002Tab1(EgovMapForNull paramMap);   //tab1
     /**
      * 개인정보변경신청 정보를 등록한다.
      * @param paramMap
      */
     public void savePubusr002(Pubusr002 entity);
     public void savePubusr002Tap1Before(Pubusr002 entity);
     public void savePubusr002Tap1After(Pubusr002 entity);
     /**
      * 개인정보변경신청 정보를 삭제한다.
      * @param paramMap
      */
     public void deletePubusr002(Pubusr002 entity);
     public void deletePubusr002Tab1(Pubusr002 entity);
     public void deletePubusr002Tab2(Pubusr002 entity);
     public void deletePubusr002Tab3(Pubusr002 entity);
     public void deletePubusr002Tab4(Pubusr002 entity);
     public void deletePubusr002Tab5(Pubusr002 entity);
     public void deletePubusr002Tab6(Pubusr002 entity);
     public void deletePubusr002Tab7(Pubusr002 entity);
     public void deletePubusr002Tab8(Pubusr002 entity);
     /**
      * 변경전 사용자 정보를 조회한다.
      * @param paramMap
      * @return
      */
     public EgovMapForNull nowUserInfo(EgovMapForNull paramMap);

     /**
      * 패스워드 변경
      * @param paramMap
      * @return
      */
     public EgovMapForNull searchUserPassword(EgovMapForNull paramMap);
     public void saveChangePw(Pubusr002 entity);
     public void saveChangePwHist(Pubusr002 entity);
	public int applyPubusr002(Pubusr002 entity);
     


}
