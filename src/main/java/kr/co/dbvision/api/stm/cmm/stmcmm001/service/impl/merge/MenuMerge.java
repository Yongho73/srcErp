package kr.co.dbvision.api.stm.cmm.stmcmm001.service.impl.merge;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.StringExpression;
import kr.co.dbvision.lib.exception.Exceptions;

@SuppressWarnings("unchecked")
public class MenuMerge {
	
    private static String upperMenu = null;
    private static String deleteAtUpperMenuId = null;
    private static List<EgovMapForNull> menuMergeList = null;
    
	public static List<EgovMapForNull> doIt(LinkedHashMap<String, List<EgovMapForNull>> map, String option) {
	    
	    menuMergeList = new ArrayList<EgovMapForNull>();
	    
		map.values().forEach(mapper -> {
			
		    mapper.stream().forEach(roleMenus -> {

                int index = -1;
                
                if(menuMergeList != null) {                    
                    index = IntStream
                            .range(0, menuMergeList.size())
                            .filter(i -> menuMergeList.get(i).get("id").equals(roleMenus.get("id")))
                            .findFirst().orElse(-1);
                }
                
                if(index == -1) {
                    //System.out.println( "[add]["+roleMenus.get("deleteAt")+"]["+roleMenus.get("id")+"]" );
                    menuMergeList.add(roleMenus);
                } else { 
                  
                    EgovMapForNull matchedRole = menuMergeList.get(index);
                    
                    if(option.equals("UG") || option.isEmpty()) { // 사용자권한+그룹권한                    
                        if(matchedRole.get("inqireAuthorAt").equals("1")) roleMenus.replace("inqireAuthorAt","1");
                        if(matchedRole.get("registAuthorAt").equals("1")) roleMenus.replace("registAuthorAt","1");
                        if(matchedRole.get("updtAuthorAt").equals("1"))   roleMenus.replace("updtAuthorAt","1");
                        if(matchedRole.get("deleteAuthorAt").equals("1")) roleMenus.replace("deleteAuthorAt","1");
                        if(matchedRole.get("prntngAuthorAt").equals("1")) roleMenus.replace("prntngAuthorAt","1");
                        if(matchedRole.get("excelAuthorAt").equals("1"))  roleMenus.replace("excelAuthorAt","1");
                        if(matchedRole.get("deleteAt").equals("0"))       roleMenus.replace("deleteAt","0");
                        
                        if(Integer.valueOf((String) matchedRole.get("dataAuthorSe")) > Integer.valueOf((String) roleMenus.get("dataAuthorSe"))) {
                            roleMenus.replace("dataAuthorSe", roleMenus.get("dataAuthorSe"));
                        } else {
                            roleMenus.replace("dataAuthorSe", matchedRole.get("dataAuthorSe"));
                        }

                        //System.out.println( "[update]["+matchedRole.get("deleteAt")+"]["+matchedRole.get("id")+"]:["+roleMenus.get("deleteAt")+"]["+roleMenus.get("id")+"]" );
                        
                        menuMergeList.set(index, roleMenus); 
                    } else
                    if(option.equals("G")) { // 그룹권한
                        menuMergeList.set(index, roleMenus); 
                    } else { // 사용자권한
                        menuMergeList.set(index, matchedRole); 
                    }                    
                }
            });  		    
		});
		//printList(menuMergeList);
		return menuMergeList;
	}
	
	public static List<EgovMapForNull> abstractLeftMenu(List<EgovMapForNull> menuList, String upMenuId) {
	    
	    upperMenu = "";
	    
	    List<EgovMapForNull> leftMenuList = menuList.stream().map(mapper -> {
            if(mapper.get("level").equals("1")) {
                upperMenu = StringExpression.nullConvert(mapper.get("id"));             
            }
            mapper.put("topMenuId", upperMenu);
            return mapper;              
        })
        .filter(menus->menus.get("topMenuId").equals(upMenuId))
        .filter(menus->!StringExpression.nullConvert(menus.get("parentId")).equals("CHF000000"))
        .collect(Collectors.toList());

        return leftMenuList;
    }
	
	public static List<EgovMapForNull> getGrantedUserMenuList(List<EgovMapForNull> menuList, String option) throws Exceptions {
        try {
            
            List<EgovMapForNull> grantedMenuList = menuList
                    .stream()
                    .filter(mapper->mapper.get("deleteAt").equals("0"))
                    .collect(Collectors.toList());
                
            for(EgovMapForNull mapper : grantedMenuList) {                                      
                getMenuItem(menuList, StringExpression.nullConvert(mapper.get("parentId")));
            }
            
            List<EgovMapForNull> grantedUserMenuList = null;
            
            if(option.equals("topMenuList")) {
                grantedUserMenuList = menuList
                        .stream()
                        .filter(mapper->mapper.get("parentId").equals("CHF000000"))
                        .filter(mapper->mapper.get("deleteAt").equals("0"))
                        .collect(Collectors.toList());
            } else {
                grantedUserMenuList = menuList
                        .stream()
                        .filter(mapper->mapper.get("deleteAt").equals("0"))
                        .collect(Collectors.toList());
            }
            
            return grantedUserMenuList;  
            
        } catch (Exception e) {
            throw new Exceptions(new Throwable(), e);
        }
    }
	    
    private static void getMenuItem(List<EgovMapForNull> menuList, String upperMenuId) {
        
        deleteAtUpperMenuId = "";
        
        List<EgovMapForNull> grantedMenuList = menuList.stream().map(mapper->{

            if( StringExpression.nullConvert(mapper.get("id")).equals(upperMenuId) ) {              
                mapper.replace("deleteAt", "0");                 
                deleteAtUpperMenuId = StringExpression.nullConvert(mapper.get("parentId"));
            }

            return mapper;
            
        }).collect(Collectors.toList());
        
        if(deleteAtUpperMenuId.isEmpty()) {
            menuList = grantedMenuList;
        } else {    
            getMenuItem(menuList, deleteAtUpperMenuId);
        }
    }
    
    public static void printList(List<EgovMapForNull> menuList) {
        menuList.stream().forEach(mapper->{                               
            System.out.println(                                   
                    mapper.get("deleteAt") + "-" +      
                    mapper.get("id") + "-" +
                    mapper.get("parentId") + "-" +
                    mapper.get("inqireAuthorAt") + "-" + 
                    mapper.get("registAuthorAt") + "-" + 
                    mapper.get("updtAuthorAt") +"-" + 
                    mapper.get("deleteAuthorAt")+"-" +
                    mapper.get("prntngAuthorAt")+"-" +
                    mapper.get("excelAuthorAt")+"-" +
                    mapper.get("dataAuthorSe"));                                   
        });
    }
}
