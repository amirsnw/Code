package ir.tamin.incomeBank.util;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import org.apache.commons.lang3.StringUtils;

/**
 *
 * @author s_maknooni
 */
public class TextUtils {

    private static final char ZERO_CHARACTER = '0';

    public static boolean isEmpty(String value) {
        return StringUtils.isEmpty(value);
    }

    public static Long parseLong(String value) {
        if (isEmpty(value)) {
            return null;
        }
        return Long.parseLong(value);
    }

    public static Integer parseInt(String value) {
        if (isEmpty(value)) {
            return null;
        }
        return Integer.parseInt(value);
    }

    public static boolean hasText(String string) {
        return string != null && string.trim().length() != 0;
    }

    public static String prefixWithZero(Object obj, int limitLength) {
        return prefixedString(obj != null ? String.valueOf(obj) : "", ZERO_CHARACTER, limitLength);
    }

    public static String prefixedString(String str, char character, int limitLength) {
        if (str.length() >= limitLength) {
            return str;
        }
        StringBuilder builder = new StringBuilder(limitLength);
        for (int i = 0; i < limitLength - str.length(); i++) {
            builder.append(ZERO_CHARACTER);
        }
        builder.append(str);
        return builder.toString();
    }

    public static boolean isNumericString(String str) {
        if (str == null) {
            return false;
        }
        return str.matches("[0-9]+");
    }

    public static String getMD5(String input) {
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            byte[] messageDigest = md.digest(input.getBytes());
            BigInteger number = new BigInteger(1, messageDigest);
            String hashtext = number.toString(16);
            // Now we need to zero pad it if you actually want the full 32 chars.
            while (hashtext.length() < 32) {
                hashtext = "0" + hashtext;
            }
            return hashtext;
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
    }

    public static String getSHA1(String input) {
        try {
            MessageDigest mDigest = MessageDigest.getInstance("SHA1");
            byte[] result = mDigest.digest(input.getBytes());
            StringBuffer sb = new StringBuffer();
            for (int i = 0; i < result.length; i++) {
                sb.append(Integer.toString((result[i] & 0xff) + 0x100, 16).substring(1));
            }
            return sb.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
    }

    public static String convertStringToHex(String base) {
//        try {

        StringBuffer buffer = new StringBuffer();
        int intValue;
        for (int x = 0; x < base.length(); x++) {
            int cursor = 0;
            intValue = base.charAt(x);
            String binaryChar = new String(Integer.toBinaryString(base.charAt(x)));
            for (int i = 0; i < binaryChar.length(); i++) {
                if (binaryChar.charAt(i) == '1') {
                    cursor += 1;
                }
            }
            if ((cursor % 2) > 0) {
                intValue += 128;
            }
            buffer.append(Integer.toHexString(intValue) + " ");
        }
        return buffer.toString();

//        } catch (Exception e) {
//            throw new RuntimeException(e);
//        }
    }

    public static String convertToEnglishDigits(String value) {
        String newValue = value.replace("١", "1").replace("٢", "2").replace("٣", "3").replace("٤", "4").replace("٥", "5")
                .replace("٦", "6").replace("7", "٧").replace("٨", "8").replace("٩", "9").replace("٠", "0")
                .replace("۱", "1").replace("۲", "2").replace("۳", "3").replace("۴", "4").replace("۵", "5")
                .replace("۶", "6").replace("۷", "7").replace("۸", "8").replace("۹", "9").replace("۰", "0");

        return newValue;
    }
}
