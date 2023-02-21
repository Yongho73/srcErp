package kr.co.dbvision.api.mhs.hrb.mhshrb001.service.impl;

import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics2D;
import java.awt.GraphicsEnvironment;
import java.awt.RenderingHints;
import java.awt.font.FontRenderContext;
import java.awt.geom.Rectangle2D;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

import javax.imageio.ImageIO;

import kr.co.dbvision.api.mhs.hrb.mhshrb001.service.mapper.OldIntranetEmpInfoUpdateMapper;
import kr.co.dbvision.api.stm.mng.stmmng001.entity.Stmmng001;
import kr.co.dbvision.lib.EgovMapForNull;
import kr.co.dbvision.lib.GlobalProperties;

/**
 * X-ERP 인사 정보 통합을 위해 신, 구 인트라넷 인사 정보 데이터 싱크
 * @author dhkim
 *
 */

public class OldIntranetEmpInfoUpdate {
    
	public static boolean save(OldIntranetEmpInfoUpdateMapper oldIntranetEmpInfoUpdateMapper, EgovMapForNull paramMap) {
        
        //System.out.println(" :::::: " + paramMap + " save paramMap::::: ");
        oldIntranetEmpInfoUpdateMapper.insertOldIntraEmp(paramMap);
            //makeSignImg(paramMap.get("korNm").toString());

		return true;
	}
	
	public static boolean modify(OldIntranetEmpInfoUpdateMapper oldIntranetEmpInfoUpdateMapper,EgovMapForNull paramMap) {
	      
	    //System.out.println(paramMap + " modify paramMap::::: ");
	    oldIntranetEmpInfoUpdateMapper.updateOldIntraEmp(paramMap);
	    
		return true;
	}
	
	public static boolean remove(OldIntranetEmpInfoUpdateMapper oldIntranetEmpInfoUpdateMapper, EgovMapForNull paramMap) {
	    
	    //System.out.println(paramMap + " delete paramMap::::: ");
        oldIntranetEmpInfoUpdateMapper.deleteOldIntraEmp(paramMap);
            
		return true;
	}
	
	
	public static boolean saveId(OldIntranetEmpInfoUpdateMapper oldIntranetEmpInfoUpdateMapper, Stmmng001 entity) {
	    
	    //System.out.println(entity + " saveId paramMap::::: ");

	    try {
	        
	        String signImgPath = GlobalProperties.getProperty("Globals.signImgPath");
	        String korNm = entity.getUserNm();
	        String userId = entity.getUserId();
	   
	        //File file = new File("D:/dbv_xerp_xgen/webUpload/" + userId+".png"); //로컬 절대경로
	        File file = new File(signImgPath+"/" + userId + ".png"); //운영 절대경로
	        Font font = new Font("궁서체", Font.PLAIN, 40);
	        FontRenderContext context = new FontRenderContext(null, true, true);
	        
	        Rectangle2D r2D = font.getStringBounds(korNm.toString(), context);
	        int width = (int) r2D.getWidth();
	        int height = (int) r2D.getHeight();
	        BufferedImage image = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
	        
	        Graphics2D g2D = image.createGraphics();
	        g2D.setColor(Color.WHITE);
	        g2D.fillRect(0,0,width,height);
	        g2D.setColor(Color.BLACK);
	        g2D.setFont(font);
	        g2D.setRenderingHint(RenderingHints.KEY_TEXT_ANTIALIASING,RenderingHints.VALUE_TEXT_ANTIALIAS_ON);
	        g2D.setRenderingHint(RenderingHints.KEY_FRACTIONALMETRICS,RenderingHints.VALUE_FRACTIONALMETRICS_ON);
	        g2D.drawString(korNm, (float) r2D.getX(), (float) - r2D.getY());
	        g2D.dispose();

	        boolean isSuccess = ImageIO.write(image,"PNG",file);
	        
            if(isSuccess) {
                oldIntranetEmpInfoUpdateMapper.saveOldIntraId(entity);
                return true;
            }else{
                
                return false;
            }
        } catch (IOException e) {
            return false;
        }

	}
	
	public static boolean makeSignImg (EgovMapForNull paramMap) throws IOException {
	    
    	String signImgPath = GlobalProperties.getProperty("Globals.signImgPath");
    	String korNm = paramMap.get("userNm").toString();
    	
    	//System.out.println(korNm +" ::::: " +signImgPath + " ::::::::: ");
    	
    	File file = new File("D:/dbv_xerp_xgen/webUpload/" + paramMap.get("userId").toString()+".png"); //로컬 절대경로
    	//File file = new File(signImgPath+"/" + signNm + ".png"); //운영 절대경로
        Font font = new Font("궁서체", Font.PLAIN, 40);
        FontRenderContext context = new FontRenderContext(null, true, true);
        
        Rectangle2D r2D = font.getStringBounds(korNm.toString(), context);
        int width = (int) r2D.getWidth();
        int height = (int) r2D.getHeight();
        BufferedImage image = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
        
        Graphics2D g2D = image.createGraphics();
        g2D.setColor(Color.WHITE);
        g2D.fillRect(0,0,width,height);
        g2D.setColor(Color.BLACK);
        g2D.setFont(font);
        g2D.setRenderingHint(RenderingHints.KEY_TEXT_ANTIALIASING,RenderingHints.VALUE_TEXT_ANTIALIAS_ON);
        g2D.setRenderingHint(RenderingHints.KEY_FRACTIONALMETRICS,RenderingHints.VALUE_FRACTIONALMETRICS_ON);
        g2D.drawString(korNm, (float) r2D.getX(), (float) - r2D.getY());
        g2D.dispose();

	    return ImageIO.write(image,"PNG",file);
        
	}
	
	public static boolean modifyBaseInfo(OldIntranetEmpInfoUpdateMapper oldIntranetEmpInfoUpdateMapper,EgovMapForNull paramMap) {
	      
	    //System.out.println(paramMap + " modify paramMap::::: ");
	    oldIntranetEmpInfoUpdateMapper.updateNewIntraEmp(paramMap);	    
		return true;
	}
	
	public static void main(String[] args) throws IOException { 
	    // 폰트 확인
	     GraphicsEnvironment e = GraphicsEnvironment.getLocalGraphicsEnvironment(); 
	     Font[] fonts = e.getAllFonts(); 
	     for (Font font : fonts) { 
	         System.out.println(font.getFontName()); 
	     } 
	}

}
