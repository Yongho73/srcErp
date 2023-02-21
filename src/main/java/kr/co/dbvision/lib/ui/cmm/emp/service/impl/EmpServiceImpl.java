package kr.co.dbvision.lib.ui.cmm.emp.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.JsonMsgMng;
import kr.co.dbvision.lib.exception.Exceptions;
import kr.co.dbvision.lib.ui.cmm.emp.entity.Emp;
import kr.co.dbvision.lib.ui.cmm.emp.service.EmpService;
import kr.co.dbvision.lib.ui.cmm.emp.service.mapper.EmpMapper;
import net.sf.json.JSONObject;

/**
 * 사원팝업에 관한 구현 클래스
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
@Service("EmpService")

@Transactional
public class EmpServiceImpl extends EgovAbstractServiceImpl implements EmpService {

    Logger logger = LogManager.getLogger(EmpServiceImpl.class);

    @Resource(name="EmpMapper")
    private EmpMapper EmpMapper;
    
    private int listRowNumber = 0; // 넘버링 

    public EmpServiceImpl() {
        //
    }
    
    @Override
    public JSONObject searchMhsEmp(EgovMapForNull paramMap) {
        try {

            Emp entity = new Emp(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = EmpMapper.selectMhsEmpList(paramMap).stream().map(mapper -> {
                    mapper.put("num", listRowNumber++);
                    return mapper;
            }).collect(Collectors.toList());

            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }

    //부서별사원
    @Override
    public JSONObject searchDeptMhsEmp(EgovMapForNull paramMap) {
        try {

            Emp entity = new Emp(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = EmpMapper.selectMhsEmpListDept(paramMap).stream().map(mapper -> {
                    mapper.put("num", listRowNumber++);
                    return mapper;
            }).collect(Collectors.toList());

            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }
    
  //부서별사원
    @Override
    public JSONObject searchOrgnztEmp(EgovMapForNull paramMap) {
        try {

            Emp entity = new Emp(paramMap);
            listRowNumber = 1;

            List<EgovMapForNull> list = EmpMapper.searchOrgnztEmp(paramMap).stream().map(mapper -> {
                    mapper.put("num", listRowNumber++);
                    return mapper;
            }).collect(Collectors.toList());

            entity.setRecords(list);
            return new JsonMsgMng().makeJsonObject(entity);

        } catch (Exception e) {
            throw e;
        }
    }
}
