package kr.co.dbvision.lib;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.Reader;
import java.io.StringWriter;
import java.io.UnsupportedEncodingException;
import java.sql.Clob;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.StringTokenizer;

import javax.servlet.http.HttpServletRequest;

@SuppressWarnings({ "rawtypes", "unchecked" })
public class StringUtil {

    public static String[] stringTokenizer(String str, String delim) {
        if (str == null) {
            return null;
        } else {
            StringTokenizer st = new StringTokenizer(str, delim);

            ArrayList resultList = new ArrayList();
            String[] result = null;

            while (st.hasMoreTokens()) {
                resultList.add(st.nextToken().trim());
            }

            result = new String[resultList.size()];
            resultList.toArray(result);

            return result;
        }
    }

    /**
     * HTML 에서 표현될 특수 문자(&amp;, \n, &nbsp;, &lt;, &gt;, &quot;) 처리
     *
     * @param source
     * @return String
     */
    public static String toHtml(String source) {
        if (source == null) {
            return null;
        } else {
            source = replace(source, "&", "&amp;");
            source = replace(source, " ", "&nbsp;");
            source = replace(source, "<", "&lt;");
            source = replace(source, ">", "&gt;");
            source = replace(source, "\n", "<br>");
            source = replace(source, "\"", "&quot;");
            return source;
        }
    }

    /**
     * HTML 에서 textbox 에 들어갈 특수 문자(&quot;) 처리
     *
     * @param source
     * @return String
     */
    public static String toText(String source) {
        if (source == null) {
            return null;
        } else {
            source = replace(source, "\"", "&quot;");
            return source;
        }
    }

    /**
     * HTML 에서 표현될 특수 문자(&lt;, &gt;) 처리
     *
     * @param source
     * @return String
     */
    public static String toEn(String source) {
        if (source == null) {
            return null;
        } else {
            // source = replace(source, "<", "&lt;");
            // source = replace(source, ">", "&gt;");
            // source = replace(source, "(", "&#40;");
            // source = replace(source, ")", "&#41;");
            // source = replace(source, "#", "&#35;");
            // source = replace(source, "$", "&#38;");
            source = StringUtil.replace(source, "script", " script ");
            source = StringUtil.replace(source, "SCRIPT", " SCRIPT ");
            source = StringUtil.replace(source, "Script", " Script ");
            source = StringUtil.replace(source, "SCript", " SCript ");
            source = StringUtil.replace(source, "iframe", " iframe ");
            source = StringUtil.replace(source, "Iframe", " Iframe ");
            source = StringUtil.replace(source, "IFrame", " IFrame ");
            source = StringUtil.replace(source, "IFRAME", " IFRAME ");
            source = StringUtil.replace(source, "embed", " embed ");
            source = StringUtil.replace(source, "Embed", " Embed ");
            source = StringUtil.replace(source, "EMBED", " EMBED ");
            source = StringUtil.replace(source, "EMbed", " EMbed ");
            return source;
        }
    }

    /**
     * HTML 에서 표현될 특수 문자(&lt;, &gt;, &#40, &#41, &#35, &#38) 처리
     *
     * @param source
     * @return String
     */
    public static String toDe(String source) {
        if (source == null) {
            return null;
        } else {
            source = replace(source, "&lt;", "<");
            source = replace(source, "&gt;", ">");
            // source = replace(source, "&amp;", "&");
            source = replace(source, "&amp;amp;", "&");
            // source = replace(source, "&#40", "(");
            // source = replace(source, "&#41", ")");
            // source = replace(source, "&#35", "#");
            // source = replace(source, "&#38", "$");
            return source;
        }
    }

    /**
     * HTML 에서 textbox 에 들어갈 특수 문자(
     * <p>
     * ,
     * <P>
     * , <br>
     * , <BR>
     * ) 처리
     *
     * @param source
     * @return String
     */
    public static String toHtmlActive(String source) {
        if (source == null) {
            return null;
        } else {
            source = replace(source, "&lt;p&gt;", "<p>");
            source = replace(source, "&lt;P&gt;", "<P>");
            source = replace(source, "&lt;/p&gt;", "</p>");
            source = replace(source, "&lt;/P&gt;", "</P>");
            source = replace(source, "&lt;br&gt;", "<br>");
            source = replace(source, "&lt;BR&gt;", "<BR>");
            source = replace(source, "&lt;/br&gt;", "</br>");
            source = replace(source, "&lt;/BR&gt;", "</BR>");
            source = replace(source, "&lt;string&gt;", "<string>");
            source = replace(source, "&lt;/string&gt;", "</string>");
            source = replace(source, "&lt;em&gt;", "<em>");
            source = replace(source, "&lt;/em&gt;", "</em>");
            source = replace(source, "&lt;u&gt;", "<u>");
            source = replace(source, "&lt;/u&gt;", "</u>");
            source = replace(source, "&lt;img", "<img");
            return source;
        }
    }

    public static String replace(String source, String fromStr, String toStr) {
        if (source == null)
            return null;
        int start = 0;
        int end = 0;
        StringBuffer result = new StringBuffer();
        while ((end = source.indexOf(fromStr, start)) >= 0) {
            result.append(source.substring(start, end));
            result.append(toStr);
            start = end + fromStr.length();
        }
        result.append(source.substring(start));
        return result.toString();
    }

    public static String ltrim(String source, String trimStr) {
        if (source != null && source.startsWith(trimStr)) {
            return source.substring(trimStr.length());
        }
        return source;
    }

    public static String rtrim(String source, String trimStr) {
        if (source != null && source.endsWith(trimStr)) {
            return source.substring(0, source.length() - trimStr.length());
        }
        return source;
    }

    public static String decryptString(String s) {
        if (s == null || s.equals(""))
            return "";

        char ac[] = new char[s.length()];
        for (int i = 0; i < s.length(); i++) {
            ac[i] = s.charAt(i);
        }

        char ac1[] = new char[s.length()];
        for (int j = 0; j < s.length(); j++) {
            ac1[j] = (char) ((ac[j] + s.length()) - (j + 1) - 32);
        }

        return new String(ac1);
    }

    public static String encryptString(String s) {
        if (s == null || s.equals(""))
            return "";

        char ac[] = new char[s.length()];
        for (int i = 0; i < s.length(); i++) {
            ac[i] = s.charAt(i);
        }

        char ac1[] = new char[s.length()];
        for (int j = 0; j < s.length(); j++) {
            ac1[j] = (char) ((ac[j] - s.length()) + (j + 1) + 32);
        }

        return new String(ac1);
    }

    public static String pwdDecode(String s) {
        if (s == null || s.equals(""))
            return "";

        char ac[] = new char[s.length()];
        String as[] = { "aF", "bC", "c9", "dN", "eU", "fo", "gv", "hw", "iD", "jE", "kO", "lc", "mS", "nj", "oV", "pn",
                "qQ", "rZ", "sa", "td", "uY", "ve", "wq", "x4", "yP", "zi", "AG", "BK", "C8", "DB", "Eg", "F7", "GI",
                "H5", "Ip", "Js", "Kt", "LW", "MX", "N6", "OR", "Pk", "QT", "R2", "Sy", "Tl", "Um", "Vx", "WA", "X1",
                "Yr", "ZM", "0f", "1J", "2h", "3z", "40", "5u", "63", "7L", "8H", "9b", null };
        for (int i = 0; i < s.length(); i++) {
            int j;
            for (j = 0; as[j] != null; j++) {
                if (s.charAt(i) != as[j].charAt(1)) {
                    continue;
                } else {
                    ac[i] = as[j].charAt(0);
                    break;
                }
            }

            if (as[j] == null)
                ac[i] = ' ';
        }

        return new String(ac);
    }

    public static String pwdEncode(String s) {
        char ac[] = new char[s.length()];

        String as[] = { "aF", "bC", "c9", "dN", "eU", "fo", "gv", "hw", "iD", "jE", "kO", "lc", "mS", "nj", "oV", "pn",
                "qQ", "rZ", "sa", "td", "uY", "ve", "wq", "x4", "yP", "zi", "AG", "BK", "C8", "DB", "Eg", "F7", "GI",
                "H5", "Ip", "Js", "Kt", "LW", "MX", "N6", "OR", "Pk", "QT", "R2", "Sy", "Tl", "Um", "Vx", "WA", "X1",
                "Yr", "ZM", "0f", "1J", "2h", "3z", "40", "5u", "63", "7L", "8H", "9b", null };
        for (int i = 0; i < s.length(); i++) {
            int j;
            for (j = 0; as[j] != null; j++) {
                if (s.charAt(i) != as[j].charAt(0)) {
                    continue;
                } else {
                    ac[i] = as[j].charAt(1);
                    break;
                }
            }

            if (as[j] == null)
                ac[i] = ' ';
        }

        return new String(ac);
    }

    // public static String getHashedPassword(String pwd) {
    // String hashedPassword = "";
    //
    // try {
    // MessageDigest md = MessageDigest.getInstance("SHA1");
    // md.update(pwd.getBytes());
    //
    // byte[] digest = md.digest();
    //
    // for(int i=0; i < digest.length; i++) {
    // hashedPassword += String.format("%02X", digest[i]);
    // }
    // } catch (NoSuchAlgorithmException e) {
    // e.printStackTrace();
    // }
    //
    // return hashedPassword;
    // }

    /**
     * ISO8859_1로 인코딩된 문자열을 KSC5601로 변환한다.
     *
     * @param str8859 8859_1로 encoding된 String
     * @return KSC5601로 변환된 String
     */
    public static String toKor(String str8859) {

        if (str8859 == null)
            return null;

        String str5601 = null;

        try {
            str5601 = new String(str8859.getBytes("8859_1"), "KSC5601");
        } catch (UnsupportedEncodingException e) {
            str5601 = str8859;
        }

        return str5601;
        // return str8859;
    }

    /**
     * ISO8859_1로 인코딩된 문자열을 KSC5601로 변환한다.
     *
     * @param str8859 8859_1로 encoding된 String
     * @return KSC5601로 변환된 String
     */
    public static String toMultiKor(String str8859) {

        if (str8859 == null)
            return null;

        String str5601 = null;

        try {
            str5601 = new String(str8859.getBytes("8859_1"), "KSC5601");
        } catch (UnsupportedEncodingException e) {
            str5601 = str8859;
        }

        return str5601;
        // return str8859;
    }

    /**
     * KSC5601로 인코딩된 문자열을 ISO8859_1로 변환한다.
     *
     * @param str5601 KSC5601로 encoding된 String
     * @return ISO8859_1로 변환된 String
     */
    public static String toEng(String str5601) {

        if (str5601 == null)
            return null;

        String str8859 = null;

        try {
            str8859 = new String(str5601.getBytes("KSC5601"), "8859_1");
        } catch (UnsupportedEncodingException e) {
            str8859 = str5601;
        }

        return str8859;
    }

    /**
     * <code>Reader</code> 로 부터 String 을 얻는다.
     *
     * @param is
     * @return String
     * @throws IOException
     */
    public static String getStringFromReader(Reader is) throws IOException {
        StringWriter sw = new StringWriter();
        char[] buffer = new char[1024];
        int length = -1;

        try {
            while ((length = is.read(buffer)) != -1) {
                sw.write(buffer, 0, length);
            }
            is.close();
        } catch (IOException ioe) {
            throw ioe;
        } finally {
            if (is != null)
                is.close();
        }

        return sw.toString();
    }

    /**
     * 필터리스트를 가지고 필터링처리
     *
     * @param source  필터링할 문자열
     * @param filters 필터리스트
     * @param delim   필터구분자
     * @param toWord  변경할 문자열
     * @return String 필터링된 문자열
     */
    public static String filterString(String source, String filters, String delim, String toWord) {

        String[] filterList = stringTokenizer(filters, delim);

        if (source == null) {
            return null;
        } else {
            for (int i = 0; i < filterList.length; i++) {
                source = replace(source, filterList[i], toWord);
            }

            return source;
        }
    }

    /**
     * 바이트 단위로 문자열을 자른다.
     *
     * @param s 자를 문자열
     * @param i 자를 수
     */
    public static String cutStringByBytes(String s, int i) {
        byte abyte0[] = s.getBytes();
        int j = abyte0.length;
        int k = 0;
        if (i >= j)
            return s;
        for (int l = i - 1; l >= 0; l--)
            if ((abyte0[l] & 0x80) != 0)
                k++;
        return new String(abyte0, 0, i + k % 2);
    }

    /**
     * 바이트 단위로 문자열을 자른다.
     *
     * @param s       자를 문자열
     * @param i       자를 수
     * @param plusStr 플러스될 문자열
     */
    public static String cutStringPlusByBytes(String s, int i, String plusStr) {
        byte abyte0[] = s.getBytes();
        int j = abyte0.length;
        int k = 0;
        if (i >= j)
            return s;
        for (int l = i - 1; l >= 0; l--)
            if ((abyte0[l] & 0x80) != 0)
                k++;
        String str = new String(abyte0, 0, i + k % 2);
        return str + plusStr;
    }

    /**
     * 바이트 단위로 문자열을 자른다.
     *
     * @param s       자를 문자열
     * @param i       자를 수
     * @param plusStr 플러스될 문자열
     */
    public static String cutStringPlus(String s, int i, String plusStr) {
        String str = "";
        if (s.length() <= i)
            return s;
        str = s.substring(0, i);
        return str + plusStr;
    }

    public static String stringValue(String s) {
        return stringValue(s, "");
    }

    public static String stringValue(Object obj, String s) {
        String s1 = s;
        if (obj != null && obj.toString().trim().length() > 0)
            s1 = obj.toString().trim();

        return s1;
    }

    public static String stringValue2(Object obj, String s) {
        String s1 = s;
        if (obj != null && obj.toString().trim().length() > 0)
            s1 = obj.toString();

        return s1;
    }

    public static String stringValue(Object obj) {
        return stringValue(obj, "");
    }

    public static boolean booleanValue(String s, boolean flag) {
        boolean flag1 = flag;
        if (s != null && s.trim().length() > 0
                && (s.trim().equalsIgnoreCase("false") || s.trim().equalsIgnoreCase("true")))
            flag1 = (new Boolean(s.trim())).booleanValue();
        return flag1;
    }

    public static boolean booleanValue(String s) {
        return booleanValue(s, false);
    }

    public static int intValue(String s, int i) {
        int j = i;
        try {
            if (s != null && s.trim().length() > 0)
                j = Integer.parseInt(s.trim());
        } catch (NumberFormatException numberformatexception) {
        }
        return j;
    }

    public static int intValue(String s) {
        return intValue(s, 0);
    }

    public static int intValue(Object obj, int i) {
        int j = i;
        try {
            if (obj != null && obj.toString().trim().length() > 0)
                j = Integer.parseInt(obj.toString().trim());
        } catch (NumberFormatException numberformatexception) {
        }
        return j;
    }

    public static int intValue(Object obj) {
        return intValue(obj, 0);
    }

    public static long longValue(String s, long l) {
        long l1 = l;
        try {
            if (s != null && s.trim().length() > 0)
                l1 = Long.parseLong(s.trim());
        } catch (NumberFormatException numberformatexception) {
        }
        return l1;
    }

    public static long longValue(String s) {
        return longValue(s, 0L);
    }

    public static float floatValue(String s, float f) {
        float f1 = f;
        try {
            if (s != null && s.trim().length() > 0)
                f1 = Float.parseFloat(s.trim());
        } catch (NumberFormatException numberformatexception) {
        }
        return f1;
    }

    public static float floatValue(String s) {
        return floatValue(s, 0.0F);
    }

    public static double doubleValue(String s, double d) {
        double d1 = d;
        try {
            if (s != null && s.trim().length() > 0)
                d1 = Double.parseDouble(s.trim());
        } catch (NumberFormatException numberformatexception) {
        }
        return d1;
    }

    public static double doubleValue(String s) {
        return doubleValue(s, 0.0D);
    }

    /**
     * 스크립트 실행후 history.back를 한다.
     *
     * @param msg 메시지
     * @return String 문자열
     */
    public static String setZeroValue(int value, int num) {
        if (value == 0)
            return "0";

        String str = "";

        for (int i = Integer.toString(value).length(); i < num; i++) {
            str += "0";
        }
        str += Integer.toString(value);

        return str;
    }

    /**
     * 조건식을 반환한다.
     *
     * @param str
     * @return String 문자열
     */
    public static String reCode(String str) {
        if (str.equals("1"))
            return ">";
        else if (str.equals("2"))
            return ">=";
        else if (str.equals("3"))
            return "=";
        else if (str.equals("4"))
            return "<";
        else if (str.equals("5"))
            return "<=";
        else
            return "";
    }

    /**
     * 첨부물 이미지명을 반환한다.
     *
     * @param ext 확장자
     * @return String 문자열
     */
    public static String reExt(String fname) {
        if (fname == null)
            return "";
        String str = fname.substring(fname.lastIndexOf(".") + 1, fname.length());
        str = str.toLowerCase();
        if (str.equals("gif"))
            return "gif.gif";
        else if (str.equals("jpg"))
            return "jpg.gif";
        else if (str.equals("xls") || str.equals("xlsx"))
            return "xls.gif";
        else if (str.equals("hwp"))
            return "hwp.gif";
        else if (str.equals("doc") || str.equals("docx"))
            return "doc.gif";
        else if (str.equals("ppt") || str.equals("pptx"))
            return "ppt.gif";
        else if (str.equals("zip") || str.equals("rar"))
            return "zip.gif";
        else if (str.equals("txt"))
            return "txt.gif";
        else if (str.equals("htm") || str.equals("html"))
            return "htm.gif";
        else if (str.equals("pdf"))
            return "file.gif";
        else if (str.equals("ora"))
            return "file.gif";
        else if (str.equals("ini"))
            return "file.gif";
        else
            return "file.gif";
    }

    /**
     * 스크립트 실행한다.
     *
     * @param msg 메시지
     * @return String 문자열
     */
    public static String goAlert(String msg) {
        StringBuffer sb = new StringBuffer();
        sb.append("<script>\n");
        sb.append("alert('").append(msg).append("');\n");
        sb.append("</script>");
        return sb.toString();
    }

    /**
     * 스크립트 실행후 상위 프레임으로 이동한다.
     *
     * @param msg 메시지, url
     * @return String 문자열
     */
    public static String goParentAlert(String msg, String url) {
        StringBuffer sb = new StringBuffer();
        sb.append("<script>\n");
        sb.append("alert('").append(msg).append("');\n");
        sb.append("parent.location.href = \"").append(url).append("\";\n");
        sb.append("</script>");
        return sb.toString();
    }

    /**
     * 스크립트 실행후 화면을 닫는다.
     *
     * @param msg 메시지
     * @return String 문자열
     */
    public static String goAlertClose(String msg) {
        StringBuffer sb = new StringBuffer();
        sb.append("<script>\n");
        sb.append("top.alert('").append(msg).append("');\n");
        sb.append("top.self.close();\n");
        sb.append("</script>");
        return sb.toString();
    }

    /**
     * 스크립트 실행후 화면을 닫는다.
     *
     * @param msg 메시지
     * @return String 문자열
     */
    public static String goAlertOpenerClose(String msg) {
        StringBuffer sb = new StringBuffer();
        sb.append("<script>\n");
        sb.append("top.opener.alert('").append(msg).append("');\n");
        sb.append("top.self.close();\n");
        sb.append("</script>");
        return sb.toString();
    }

    /**
     * 스크립트 실행후 화면을 닫고 부모창을 reload
     *
     * @param msg 메시지
     * @return String 문자열
     */
    public static String goAlertCloseReload(String msg) {
        StringBuffer sb = new StringBuffer();
        sb.append("<script>\n");
        sb.append("opener.alert('").append(msg).append("');\n");
        sb.append("opener.location.reload();\n");
        sb.append("self.close();\n");
        sb.append("</script>");
        return sb.toString();
    }

    /**
     * 마지막 자리가 . 일경우 없앤다.
     *
     * @param msg 메시지
     * @return String 문자열
     */
    public static String cutLast(String str) {
        if (str.equals(""))
            return str;

        String returnValue = str;

        String strlast = str.substring(str.length() - 1, str.length());
        if (strlast.equals(".")) {
            returnValue = str.substring(0, str.length() - 1);
        }

        return returnValue;
    }

    /**
     * 스크립트에서 넘어온 비밀번호를 복호화한다.
     *
     * @param 암호화된 문자열 s
     * @return String 복호화된 문자열
     */
    public static String dePwd(String s) {
        if (s == null)
            return "";

        StringBuffer sb = new StringBuffer();
        for (int i = 0; i < s.length() / 9; i++) {
            int sn = i * 9;
            int en = sn + 1;
            sb.append(s.substring(sn, en));
        }
        return pwdDecode(sb.toString());
    }

    public static int checkNull(String pStr, int pInt) {
        if (pStr == null || pStr.length() == 0)
            return pInt;
        else
            return Integer.parseInt(pStr);
    }

    public static String checkNull(String pStr, String retStr) {
        if (pStr == null || pStr.length() == 0)
            return retStr;
        else
            return pStr;
    }

    public static String checkNull(Object pStr, String retStr) {

        if (pStr == null)
            return retStr;
        else
            return pStr.toString();
    }

    public static List makeListStatus(String status) {

        List<Map> lst = new ArrayList<Map>();
        Map<String, Object> map = null;

        String rows[] = status.substring(0, (status.length() - 1)).split("▩");
        String key[] = rows[0].split("▦");

        if (rows != null) {

            int rowLen = rows.length;
            int keyLen = key.length;

            // System.out.println("rowLen="+rowLen+",keyLen="+keyLen);

            for (int i = 1; i < rowLen; i++) {

                String row[] = rows[i].split("▦", keyLen);
                map = new HashMap<String, Object>();

                // System.out.println("row[]="+rows[i]);
                // System.out.println("row[]="+row.length);

                for (int j = 0; j < keyLen; j++) {

                    map.put(key[j], stringValue(row[j], ""));
                }

                lst.add(map);
            }
        }
        return lst;
    }

    public static List makeListStatus2(String status) {

        List<Map> lst = new ArrayList<Map>();
        Map<String, Object> map = null;

        String rows[] = status.substring(0, (status.length() - 1)).split("\\|");
        String key[] = rows[0].split("\\^");

        if (rows != null) {

            int rowLen = rows.length;
            int keyLen = key.length;

            // System.out.println("rowLen="+rowLen+",keyLen="+keyLen);

            for (int i = 1; i < rowLen; i++) {

                String row[] = rows[i].split("\\^", keyLen);
                map = new HashMap<String, Object>();

                // System.out.println("row[]="+rows[i]);
                // System.out.println("row[]="+row.length);

                for (int j = 0; j < keyLen; j++) {

                    map.put(key[j], stringValue(row[j], ""));
                }

                lst.add(map);
            }
        }
        return lst;
    }

    public static List makeListStatus3(String status) {

        List<Map> lst = new ArrayList<Map>();
        Map<String, Object> map = null;

        String rows[] = status.split("&");
        String key[] = rows[0].split("=");
        // System.out.println("rows[0]="+rows[0]);
        if (rows != null) {

            int rowLen = rows.length;
            int keyLen = key.length;

            System.out.println("rowLen=" + rowLen + ",keyLen=" + keyLen);

            for (int i = 1; i < rowLen; i++) {

                String row[] = rows[i].split("=", keyLen);
                map = new HashMap<String, Object>();

                // System.out.println("row[]="+rows[i]);
                // System.out.println("row[]="+row.length);

                for (int j = 0; j < keyLen; j++) {

                    map.put(key[j], stringValue(row[j], ""));
                }

                lst.add(map);
            }
        }
        return lst;
    }

    public static int checkListsize(List list) {

        return list == null ? 0 : list.size();

    }

    /**
     * request를 egovMap으로 담기
     * 
     * @param request
     * @return
     */
    public static EgovMapForNull requestToMap(HttpServletRequest request) {

        EgovMapForNull params = new EgovMapForNull();

        Enumeration enums = request.getParameterNames();

        System.out.println("\n\n--------parameter info---------");
        System.out.println(String.format("%s:::[%s]", "url", request.getContextPath()+""+request.getServletPath()));
        
        
        System.out.println(request.getParameter("menuIds"));
        System.out.println(request.getParameter("userId"));
        System.out.println(enums);
        
        while (enums.hasMoreElements()) {

            String paramName = (String) enums.nextElement();
            String[] parameters = request.getParameterValues(paramName);
            
            if (!paramName.equals("regId") && !paramName.equals("uptId")) {
                if (parameters.length > 1) {
                    params.put(paramName, parameters);
                    System.out.println(String.format("%s:::[%s]", paramName, parameters));
                } else {
                    params.put(paramName, parameters[0]);
                    System.out.println(String.format("%s:::[%s]", paramName, parameters[0]));
                }
            }
        }

        Map<String, Object> sessionMap = (Map<String, Object>) SessionMng.getCommonSession();
        String userId = StringExpression.nullConvert(sessionMap.get("userId"));

        params.put("regId", userId);
        params.put("uptId", userId);

        System.out.println(String.format("%s:::[%s]", "regId", params.get("regId")));
        System.out.println(String.format("%s:::[%s]", "uptId", params.get("uptId")));
        System.out.println("--------parameter info---------\n\n");

        return params;
    }
    
    public static void setSessionUserIdMap( EgovMapForNull params ) {
    	Map<String, Object> sessionMap = (Map<String, Object>) SessionMng.getCommonSession();
        String userId = StringExpression.nullConvert(sessionMap.get("userId"));

        params.put("regId", userId);
        params.put("uptId", userId);

        System.out.println(String.format("%s:::[%s]", "regId", params.get("regId")));
        System.out.println(String.format("%s:::[%s]", "uptId", params.get("uptId")));
    }

    /**
     * Map null처리 json에서 변환할때 NULL일때 에러발생
     * 
     * @param map
     * @return
     */
    public static EgovMapForNull nullToBlankInHash(EgovMapForNull map) {
        Set set = map.entrySet();
        Iterator it = set.iterator();

        while (it.hasNext()) {
            Map.Entry e = (Map.Entry) it.next();
            map.put((String) e.getKey(), e.getValue() == null ? "" : String.valueOf(e.getValue()));
        }
        // System.out.println(map);
        return map;
    }

    /**
     * <pre>
     * 인자로 받은 String이 null일 경우 &quot;0&quot;로 리턴한다.
     * &#064;param src null값일 가능성이 있는 String 값.
     * &#064;return 만약 String이 null 값일 경우 &quot;0&quot;로 바꾼 String 값.
     * </pre>
     */
    public static int zeroConvert(Object src) {

        if (src == null || src.equals("null")) {
            return 0;
        } else {
            return Integer.parseInt(((String) src).trim());
        }
    }

    /**
     * <pre>
     * 인자로 받은 String이 null일 경우 &quot;&quot;로 리턴한다.
     * &#064;param src null값일 가능성이 있는 String 값.
     * &#064;return 만약 String이 null 값일 경우 &quot;&quot;로 바꾼 String 값.
     * </pre>
     */
    public static int zeroConvert(String src) {

        if (src == null || src.equals("null") || "".equals(src) || " ".equals(src)) {
            return 0;
        } else {
            return Integer.parseInt(src.trim());
        }
    }

    public static long zeroConvertLong(String src) {

        if (src == null || src.equals("null") || "".equals(src) || " ".equals(src)) {
            return 0;
        } else {
            return Long.parseLong(src.trim());
        }
    }

    public static long zeroConvertLong(Object src) {

        if (src == null || src.equals("null")) {
            return 0;
        } else {
            return Long.parseLong(((String) src).trim());
        }
    }

    /**
     * character set 변경
     * 
     * @param inData
     * @return
     * @throws Exception
     */
    public static String changeCharset(Object inData) throws Exception {
        String rtnData = "";
        try {
            // String chararr[] = {"euc-kr", "ksc5601", "iso-8859-1", "8859_1",
            // "ascii", "UTF-8"};
            // for(int i=0; i<chararr.length; i++){
            // for(int j=0; j<chararr.length; j++){
            // if(i==j){
            // continue;
            // }else{
            // System.out.println("\n get>>>" + chararr[i] + "\n set:>>>" +
            // chararr[j] + "\n:>>>" + new String(StringUtil.stringValue(inData,
            // "").getBytes(chararr[i]), chararr[j])+"\n ");
            // }
            // }
            // }
            rtnData = new String(StringUtil.stringValue(inData, "").getBytes("euc-kr"), "ksc5601");
        } catch (Exception e) {
            e.printStackTrace();
            rtnData = "";
        }
        return rtnData;
    }

    /**
     * clob type 처리
     * 
     * @param clob
     * @return
     * @throws SQLException
     * @throws IOException
     */
    public static String clobToString(Clob clob) {

        if (clob == null) {
            return "";
        }

        StringBuffer strOut = new StringBuffer();

        String str = "";

        BufferedReader br;

        try {

            br = new BufferedReader(clob.getCharacterStream());

            while ((str = br.readLine()) != null) {
                strOut.append(str);
            }

            return strOut.toString();

        } catch (SQLException | IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        return "";
    }
}
