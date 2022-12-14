/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.util;

import com.ibm.icu.text.DateFormat;
import com.ibm.icu.text.SimpleDateFormat;
import com.ibm.icu.util.ULocale;
import java.io.UnsupportedEncodingException;
import java.text.ParseException;
import java.util.Calendar;
import java.util.Date;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 *
 * @author e_shoghi
 */
public class DateUtilsFramework {
    private static final Logger LOGGER = LoggerFactory.getLogger(DateUtils.class);

    public static String format(Date date, String pattern) {
        return format(date, pattern, false);
    }

    public static String format(Date date, String pattern, boolean encode) {
        ULocale locale = new ULocale("en_US@calendar=persian");
        DateFormat df = new SimpleDateFormat(pattern, locale);
        String dateString = df.format(date);
        if(encode)
            dateString = encodeDateString(dateString);
        return dateString;
    }

    public static Date parse(String dateString, String pattern) {
        return parse(dateString, pattern, false);
    }

    public static Date parse(String dateString, String pattern, boolean decode) {
        ULocale locale = new ULocale("en_US@calendar=persian");
        DateFormat df = new SimpleDateFormat(pattern, locale);
        if(decode) {
            dateString = decodeDateString(dateString);
        }
        try {
            return df.parse(dateString);
        } catch (ParseException e) {
            return null;
        }
    }

    public static String encodeDateString(String dateString) {
        dateString = dateString.replaceAll("[/-]", "");

        StringBuilder builder = new StringBuilder();
        for(int i = 0; i < 7; i++) {
            String format = String.format("%-14s", dateString).replaceAll(" ", "0").substring((i * 2), (i * 2) + 2);
            try {
                builder.append(new String(new byte[] {(byte) (33 + Integer.valueOf(format))}, "windows-1256"));
            } catch (UnsupportedEncodingException e) {
                LOGGER.error("Unsupported character set windows-1256.", e);
            }
        }

        return builder.toString();
    }

    public static String decodeDateString(String encodedDate) {
        StringBuilder builder = new StringBuilder();
        byte[] bytes = new byte[0];
        try {
            bytes = encodedDate.getBytes("windows-1256");
        } catch (UnsupportedEncodingException e) {
            LOGGER.error("Unsupported character set windows-1256.", e);
        }

        for(int i = 0; i < bytes.length; i++) {
            builder.append(String.format("%2s", (bytes[i] & 0xFF) - 33).replaceAll(" ", "0"));
        }

        return builder.toString();
    }

    public static Date extractDate(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.set(Calendar.HOUR_OF_DAY, 0);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);
        return calendar.getTime();
    }

}
