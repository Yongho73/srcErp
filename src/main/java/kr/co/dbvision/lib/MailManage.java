package kr.co.dbvision.lib;

import java.io.UnsupportedEncodingException;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.activation.FileDataSource;
import javax.mail.Authenticator;
import javax.mail.BodyPart;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import javax.mail.internet.MimeUtility;

@SuppressWarnings("unchecked")
public class MailManage {

	/**
	 * 메일전송 (첨부파일 포함)
	 * 
	 * @param subject
	 * @param toEmail
	 * @param toName
	 * @param fromEmail
	 * @param fromName
	 * @param messageText
	 * @param attachList
	 * @param downFileNm
	 * @throws MessagingException
	 * @throws UnsupportedEncodingException
	 */
	private static void sendMailToUser(String subject, String toEmail, String toName, String fromEmail, String fromName,
			String messageText, List<?> attachList, String downFileNm)
			throws MessagingException, UnsupportedEncodingException {

		// String mailIp = "localhost";
		// String mailPort = "25";
		// String mailUser = "root";
		// String mailPswd = "1q2w3e!@#";
		String mailUser = "hyunggu84@gmail.com";
		String mailPswd = "aktlakfh84";

		// Setup mail server
		Authenticator auth = new MailSvrAuthenticator(mailUser, mailPswd);

		// Create session
		Properties mailProps = new Properties();
		// mailProps.put("mail.smtp.host", mailIp);
		// mailProps.put("mail.smtp.port", mailPort);
		mailProps.put("mail.smtp.auth", "true");
		mailProps.put("mail.smtp.starttls.enable", "true");
		mailProps.put("mail.smtp.host", "smtp.gmail.com");
		mailProps.put("mail.smtp.port", "587");

		Session mailSession = Session.getInstance(mailProps, auth);

		try {

			// Create and initialize message
			MimeMessage message = new MimeMessage(mailSession);
			message.setFrom(new InternetAddress(fromEmail, fromName));
			message.setRecipients(Message.RecipientType.TO, toEmail);
			message.setSubject(subject, "utf-8");
			message.setSentDate(new Date());

			// message.setHeader("Content-Type","text/html; charset=utf-8");
			Multipart multipart = new MimeMultipart();
			BodyPart bodyPart = new MimeBodyPart();

			// 첨부파일
			if (attachList != null && attachList.size() > 0) {
				for (int i = 0; i < attachList.size(); i++) {

					Map<String, Object> attachMap = (Map<String, Object>) attachList.get(i);

					String saveDir = attachMap.get("saveDir").toString();
					String saveFileName = attachMap.get("saveFileName").toString();
					String orgFileName = attachMap.get("orgFileName").toString();

					if (!"".equals(orgFileName)) {

						// 개발 local
						// saveDir = "D:" + saveDir;
						bodyPart = new MimeBodyPart();
						DataSource dataSource = new FileDataSource(saveDir + "\\" + saveFileName);
						bodyPart.setDataHandler(new DataHandler(dataSource));
						bodyPart.setFileName(MimeUtility.encodeText(orgFileName));
						multipart.addBodyPart(bodyPart);
					}
				}
			}

			bodyPart = new MimeBodyPart();

			bodyPart.setContent(messageText, "text/html; charset=utf-8");
			multipart.addBodyPart(bodyPart);

			// send the complete message parts
			message.setContent(multipart);

			// send message
			Transport.send(message);

			// System.out.println("Sent message successfully.....");
			// System.out.println("");

		} catch (Exception ex) {
			ex.printStackTrace();
			// System.out.println("send failed, exception:" + ex);
			throw new MessagingException(ex.getMessage());
		}
	}

	/**
	 * 메일서버 인증 처리
	 * 
	 * @author Yongho
	 *
	 */
	static class MailSvrAuthenticator extends Authenticator {
		private String mSvrUserId = "";
		private String mSvrPassWd = "";

		public MailSvrAuthenticator(String mSvrUserId, String mSvrPassWd) {
			this.mSvrPassWd = mSvrPassWd;
			this.mSvrUserId = mSvrUserId;
		}

		public PasswordAuthentication getPasswordAuthentication() {
			return new PasswordAuthentication(this.mSvrUserId, this.mSvrPassWd);// id,
																				// password
		}
	}

	/**
	 * 메일전송(api 호출용)
	 */
	public void sendmessage() {
		try {// ip address, title, send address, recive address
				// MailUtil.sendMail("10.59.32.57",25," �׽�Ʈ���
				// ","higreenday@hotmail.com","�ƹ���","higreenday@hotmail.com",
				// "����", "�����̿��ٳ�","d:/�ڵ���������ȯ��.zip","÷������.zip");
				// MailUtil.sendMail("10.59.32.57",25," �׽�Ʈ���
				// ","higreenday@paran.com","�ƹ���","higreenday@paran.com",
				// "����", "�����̿��ٳ�","d:/�ڵ���������ȯ��.zip","÷������");
				// sendMail(String title, String toEmail, String toName, String
				// fromEmail, String fromName, String cont, String
				// attachFilePath, String downFileNm, String mailType) throws
				// Exception{
				// MailUtil.sendMail("메일제목이요~","knifeleaving@gmail.com",
				// "to김승일", "knifeleaving@gmail.com", "from김승일", "메일내용이요~", "",
				// "", "aaa");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 메일 전송 템플릿 전송 (html 양식)
	 * 
	 * @param imgUrl
	 * @param title
	 * @param toEmail
	 * @param toName
	 * @param fromEmail
	 * @param fromName
	 * @param cont
	 * @param attachList
	 * @param downFileNm
	 * @param mailType
	 * @throws Exception
	 */
	public static void sendMail(String imgUrl, String title, String toEmail, String toName, String fromEmail,
			String fromName, String cont, List<?> attachList, String downFileNm, String mailType) throws Exception {
		try {
			StringBuffer body = new StringBuffer();

			body.append("<html>");
			body.append("<head>");
			body.append("    <meta http-equiv='Content-Type' content='text/html; charset=utf-8' />");
			body.append("    <title>테스트메일전송</title>");
			body.append("</head>");
			body.append("<body style='background:#fff; font-size:12px; font-family:Dotum;'  text='#555' >");
			body.append("<table summary='유물열람,복제신청 안내 매일'  width='553px' align='center' cellspacing='0' >   ");
			body.append("	<colgroup>");
			body.append("        <col width='15px' />");
			body.append("        <col width='523px' />");
			body.append("        <col width='15px' />");
			body.append("	</colgroup>");
			body.append("    <thead>");
			body.append("        <tr>");
			body.append("            <th style='width:15px;'>&nbsp;</th>");
			body.append(
					"            <th scope='col' style='border-bottom:2px solid #a07631; padding:26px 0 12px 0; text-align:left; width:523px;'>");
			body.append(
					"            <img src='http://www.gogung.go.kr/images/common/mail_th1.gif' alt='국립고궁박물관 유물열람 및 복제신청 안내 매일' /></th>");
			body.append("            <th style='width:15px;'>&nbsp;</th>");
			body.append("        </tr>");
			body.append("    </thead>");
			body.append("	<tbody>	");
			body.append("		<tr>");
			body.append("            <td >&nbsp;</td>");
			body.append(
					"            <td style='background:url(http://www.gogung.go.kr/images/common/mail_bo2.gif) no-repeat 0 10px; height:400px; width:523px;'>");
			body.append("            " + cont.replaceAll("\n", "<br>"));
			body.append("            </td>");
			body.append("            <td >&nbsp;</td>");
			body.append("		</tr>   ");
			body.append("        <tr>");
			body.append("            <td colspan='3' style='width:553px; height:160px; vertical-align:bottom;'>");
			body.append(
					"            <img src='http://www.gogung.go.kr/images/common/mail_bg.gif' width='553px;' height='139px;' alt='' /></td>");
			body.append(
					"		</tr>                                                        		                                ");
			body.append("	</tbody>");
			body.append("</table>");
			body.append("</body>");
			body.append("</html>");

			try {// ip address, title, send address, recive address
				MailManage.sendMailToUser(title, toEmail, toName, fromEmail, fromName, body.toString(), attachList,
						downFileNm);
			} catch (AddressException e) {
				e.printStackTrace();
			} catch (MessagingException e) {
				e.printStackTrace();
			}
		} catch (UnsupportedEncodingException e) {
			new MessagingException(e.toString());
		}
	}

	/**
	 * 테스트용 메인
	 * 
	 * @param args
	 */
	public static void main(String[] args) {
		MailManage ma = new MailManage();
		ma.sendmessage();
	}
	
	@SuppressWarnings("unused")
	public static void sendMailTest(String subject, String toEmail, String toName, String fromName, String messageText)
			throws MessagingException, UnsupportedEncodingException {
		
		// String mailIp = "localhost";
		// String mailPort = "25";
		// String mailUser = "root";
		// String mailPswd = "1q2w3e!@#";
		String mailUser = "dbvisionofficial@gmail.com";
		String mailPswd = "ssphheazqloeyotx";

		// Setup mail server
		Authenticator auth = new MailSvrAuthenticator(mailUser, mailPswd);

		// Create session
		Properties mailProps = new Properties();
		// mailProps.put("mail.smtp.host", mailIp);
		// mailProps.put("mail.smtp.port", mailPort);
		mailProps.put("mail.smtp.auth", "true");
		mailProps.put("mail.smtp.starttls.enable", "true");
		mailProps.put("mail.smtp.host", "smtp.gmail.com");
		mailProps.put("mail.smtp.port", "587");

		Session mailSession = Session.getInstance(mailProps, auth);

		try {

			// Create and initialize message
			MimeMessage message = new MimeMessage(mailSession);
			message.setFrom(new InternetAddress(mailUser, fromName));
			message.setRecipients(Message.RecipientType.TO, toEmail);
			message.setSubject(subject, "utf-8");
			message.setSentDate(new Date());

			// message.setHeader("Content-Type","text/html; charset=utf-8");
			Multipart multipart = new MimeMultipart();
			BodyPart bodyPart = new MimeBodyPart();


			bodyPart = new MimeBodyPart();

			bodyPart.setContent(messageText, "text/html; charset=utf-8");
			multipart.addBodyPart(bodyPart);

			// send the complete message parts
			message.setContent(multipart);

			// send message
			Transport.send(message);

			// System.out.println("Sent message successfully.....");
			// System.out.println("");

		} catch (Exception ex) {
			ex.printStackTrace();
			// System.out.println("send failed, exception:" + ex);
			throw new MessagingException(ex.getMessage());
		}
	}
}
