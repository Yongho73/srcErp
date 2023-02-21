package kr.co.dbvision.lib.ui.cmm.dept.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.api.mhs.hrm.mhshrm003.entity.Mhshrm003;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.exception.Exceptions;
import kr.co.dbvision.lib.ui.cmm.dept.entity.Dept;
import kr.co.dbvision.lib.ui.cmm.dept.service.DeptService;
import kr.co.dbvision.lib.ui.cmm.dept.service.mapper.DeptMapper;
import net.sf.json.JSONObject;

/**
 * 부서팝업에 관한 구현 클래스
 *
 * @author 표준프레임워크센터
 * @since 2019.05.21
 * @version 1.0
 * @see
 *
 * <pre>
 *  == 개정이력(Modification Information) ==
 *
 *        수정일                       수정자                수정내용
 *  ----------------    ------------    ---------------------------
 *     2019.05.21          디비비전              최초 생성
 *
 * </pre>
 */
@Service("DeptService")

@Transactional
public class DeptServiceImpl extends EgovAbstractServiceImpl implements DeptService {

    Logger logger = LogManager.getLogger(DeptServiceImpl.class);

    @Resource(name="DeptMapper")
    private DeptMapper DeptMapper;

    private int listRowNumber = 0; // 넘버링 

    public DeptServiceImpl() {
        //
    }
    //부서
    @Override
    public JSONObject searchMhsDept(EgovMapForNull paramMap) {
        try {

            Dept entity = new Dept(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = DeptMapper.selectMhsDeptList(paramMap).stream().map(mapper -> {
                    mapper.put("num", listRowNumber++);
                    return mapper;
            }).collect(Collectors.toList());

            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }
    //부서조직 트리구조
    @Override
    public JSONObject searchTreeDept(EgovMapForNull paramMap) {
        try {

            Dept entity = new Dept(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = DeptMapper.searchTreeDept(paramMap).stream().map(mapper -> {
                    mapper.put("num", listRowNumber++);
                    return mapper;
            }).collect(Collectors.toList());

            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }
    //부서
    @Override
    public JSONObject searchMhsDeptCode(EgovMapForNull paramMap) {
        try {

        	Dept entity = new Dept(paramMap);
            List<EgovMapForNull> list = DeptMapper.selectMhsDeptList(paramMap);
            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            return new Exceptions(new Throwable(), e).getResultStatus();
        }
    }
	@Override
	public JSONObject searchMhsClsf(EgovMapForNull paramMap) {
		// TODO Auto-generated method stub
		return null;
	}
}
