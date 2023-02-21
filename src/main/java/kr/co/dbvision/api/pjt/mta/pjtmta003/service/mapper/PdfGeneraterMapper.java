package kr.co.dbvision.api.pjt.mta.pjtmta003.service.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.co.dbvision.api.pjt.mta.pjtmta003.entity.Pjtmta003;
import kr.co.dbvision.lib.EgovMapForNull;

/**
 * 유지보수요청관리에 관한 매퍼 클래스
 *
 * @author 디비비전
 * @since 2020.08.06
 * @version 1.0
 * @sourceGen version 2020.07.16.01 (2020.08.06)
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2020.08.06          디비비전              최초 생성
 * </pre>
 */

@Mapper("PdfGeneraterMapper")
public interface PdfGeneraterMapper {
    /**
     * 유지보수 거래처 목록을 조회한다.
     * @param paramMap
     * @return
     */
    public EgovMapForNull selectProjectInfo(EgovMapForNull paramMap);
    /**
     * 유지보수 거래처 목록을 조회한다.
     * @param paramMap
     * @return
     */
    public List<EgovMapForNull> selectRequstList(EgovMapForNull paramMap);
   
}
