package ir.tamin.insurance.technical.util;

import com.ghasemkiani.util.icu.PersianCalendar;
import com.ibm.icu.text.DateFormat;
import com.ibm.icu.text.SimpleDateFormat;
import com.ibm.icu.util.ULocale;
import ir.tamin.framework.core.util.TextUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.UnsupportedEncodingException;
import java.sql.Timestamp;
import java.text.ParseException;
import java.util.Calendar;
import java.util.Date;



public class DateUtils {

    public static final int[] j_days_in_month = {31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29};
    public static final int[] g_days_in_month = {31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};
    public static final String year_prefix = "13";
    public static final String YEAR_MONTH_DAY = "yyyyMMdd";
    public static final int YEAR = 0;
    public static final int MONTH = 1;
    public static final int DAY = 3;

    private static final Logger LOGGER = LoggerFactory.getLogger(DateUtils.class);

    public static Timestamp add(Timestamp date, int yearMonthDay, int amount) {
        Calendar c = Calendar.getInstance();

        c.setTime(date);
        if (YEAR == yearMonthDay) {
            c.add(Calendar.YEAR, amount);
        } else if (MONTH == yearMonthDay) {
            c.add(Calendar.MONTH, amount);
        } else if (DAY == yearMonthDay) {
            c.add(Calendar.DAY_OF_MONTH, amount);
        }
        return new Timestamp(c.getTimeInMillis());
    }

    public static int yearsBetween(Timestamp from, Timestamp to) {
        return yearsBetween(from, to);
    }

    public static int monthsBetween(Timestamp from, Timestamp to) {
        return monthsBetween(from, to);
    }

    public static String format(Date date) {
        return format(date, "yyyy/MM/dd");
    }

    public static String format(Date date, String pattern) {
        ULocale locale = new ULocale("en_US@calendar=persian");
        DateFormat df = new SimpleDateFormat(pattern, locale);
        return df.format(date);
    }

    public static String getSimpleStringDate(Timestamp date) {
        String d=null;
        if (date != null) {
            d = DateUtils.format(date).replaceAll("/", "");
            return d;
        }else{
            d = DateUtils.format(new Timestamp(new Date().getTime())).replaceAll("/", "");
            return d;
        }

    }


    public static Date convertDateStringToDate(String dateString) {
        int year = Integer.parseInt(dateString.substring(0, 4));
        //int month = Integer.parseInt(dateString.substring(5, 7));
        int month = Integer.parseInt(dateString.substring(4, 6));
        int day = Integer.parseInt(dateString.substring(6, 8));

        Date date = new Date(0);
        date.setYear(year - 1900);
        date.setMonth(month - 1);
        date.setDate(day);

        return date;
    }

    public static Date convertPersianDateStringToDate(String persianDate) {

        String newPersianDate = persianDate.replaceAll("/", "").trim();
        newPersianDate = newPersianDate.length() != 8 ? year_prefix + newPersianDate : newPersianDate;
        String year = newPersianDate.substring(0, 4);
        String month = newPersianDate.substring(4, 6);
        String day = newPersianDate.substring(6, 8);

        String gregorianDate = persianToGregorian(year, month, day);
        return convertDateStringToDate(gregorianDate);
    }

    public int daysBetween(long t1, long t2) {
        return (int) ((t2 - t1) / (1000 * 60 * 60 * 24));
    }

    public static boolean isKabise(Long year) {
        return ((((year - 474 % 2820) + 512) * 682) % 2816) < 682;
    }

    public int getMonthDays(String year, String mon) {
        if (year.equals("") || mon.equals("") || year.length() != 4) {
            return 0;
        }
        if (mon.length() != 2) {
            mon = String.format("%02d", Integer.parseInt(mon));
        }
        switch (mon) {
            case "01":
            case "02":
            case "03":
            case "04":
            case "05":
            case "06":
                return 31;
            case "07":
            case "08":
            case "09":
            case "10":
            case "11":
                return 30;
            case "12":
                if (isKabise(Long.getLong(year))) {
                    return 30;
                } else {
                    return 29;
                }
            default:
                return 0;

        }

    }

    public static String standardDate(String date) {
        String fieldValue = date;
        if (!TextUtils.isEmpty(fieldValue)) {
            fieldValue = fieldValue.replace("/", "");
            fieldValue = fieldValue.replace(".", "");
            if (fieldValue.length() == 6) {
                return "13" + fieldValue;
            } else if (fieldValue.length() == 8) {
                return fieldValue;
            }
        }
        return null;
    }

    public static String standardYear(String year) {

        if (year.length() == 2) {
            return "13" + year;
        } else {
            return year;
        }
    }

    public static String standardMonth(String month) {
        if (month.length() == 1) {
            return "0" + month;
        } else {
            return month;
        }
    }

    public static String persianToGregorian(String jy, String jm, String jd) {

        int jYear = Integer.parseInt(jy) - 979;
        int jMonth = Integer.parseInt(jm) - 1;
        int jDay = Integer.parseInt(jd) - 1;
        int j_day_no = 365 * jYear + (jYear / 33) * 8 + ((jYear % 33 + 3) / 4);
        int g_day_no;
        Integer gm = 0, gy = 0;
        boolean leap;

        for (int i = 0; i < jMonth; ++i) {
            j_day_no += j_days_in_month[i];
        }

        j_day_no += jDay;

        g_day_no = j_day_no + 79;
        gy = 1600 + 400 * (g_day_no / 146097);
        g_day_no = g_day_no % 146097;

        leap = true;
        if (g_day_no >= 36525) /* 36525 = 365*100 + 100/4 */ {
            g_day_no--;
            gy += 100 * (g_day_no / 36524);
            /* 36524 = 365*100 + 100/4 - 100/100 */
            g_day_no = g_day_no % 36524;

            if (g_day_no >= 365) {
                g_day_no++;
            } else {
                leap = false;
            }
        }

        gy += 4 * (g_day_no / 1461);
        /* 1461 = 365*4 + 4/4 */
        g_day_no %= 1461;

        if (g_day_no >= 366) {
            leap = false;

            g_day_no--;
            gy += (g_day_no / 365);
            g_day_no = g_day_no % 365;
        }
        int temp = 0;
        for (int i = 0; g_day_no >= g_days_in_month[i] + parsBooleanToInt(i == 1 && leap); i++) {
            g_day_no -= g_days_in_month[i] + parsBooleanToInt(i == 1 && leap);
            temp = i + 1;  //gm = i + 1;
        }
        gm = temp + 1;
        Integer gd = g_day_no + 1;
        return gy.toString() + String.format("%02d", gm) + String.format("%02d", gd);
    }

    private static int parsBooleanToInt(Boolean sample) {
        if (sample) {
            return 1;
        } else {
            return 0;
        }
    }
    public static Date convertTimestampStringToDate(String time){
        DateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
        long milliSeconds = Long.parseLong(time);
        Calendar calendar = Calendar.getInstance();
        calendar.setTimeInMillis(milliSeconds);
        Date d = calendar.getTime();
        return d;
    }
    //add

    public static String format(Date date, String pattern, boolean encode) {
        ULocale locale = new ULocale("en_US@calendar=persian");
        DateFormat df = new SimpleDateFormat(pattern, locale);
        String dateString = df.format(date);
        if (encode) {
            dateString = encodeDateString(dateString);
        }
        return dateString;
    }

    public static Date parse(String dateString, String pattern) {
        return parse(dateString, pattern, false);
    }

    public static Date parse(String dateString, String pattern, boolean decode) {
        ULocale locale = new ULocale("en_US@calendar=persian");
        DateFormat df = new SimpleDateFormat(pattern, locale);
        if (decode) {
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
        for (int i = 0; i < 7; i++) {
            String format = String.format("%-14s", dateString).replaceAll(" ", "0").substring((i * 2), (i * 2) + 2);
            try {
                builder.append(new String(new byte[]{(byte) (33 + Integer.valueOf(format))}, "windows-1256"));
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

        for (int i = 0; i < bytes.length; i++) {
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

    public static long get30DayDuration(Date from, Date to) {
        PersianCalendar persianCalendar = new PersianCalendar(from);
        int currentMonth;
        int currentDay;

        long total = Math.round((to.getTime() - from.getTime()) / (24d * 60d * 60d * 1000d)) + 1;

        int normalizedTotal = 0;
        for (int i = 1; i <= total; i++) {
            currentMonth = persianCalendar.get(Calendar.MONTH);
            currentDay = persianCalendar.get(Calendar.DAY_OF_MONTH);
            if (currentDay == 31 && currentMonth < PersianCalendar.MEHR) {
                persianCalendar.add(Calendar.DAY_OF_MONTH, 1);
                continue;
            } else if (currentDay == 30 && currentMonth == PersianCalendar.ESFAND) {
                persianCalendar.add(Calendar.DAY_OF_MONTH, 1);
                continue;
            }

            persianCalendar.add(Calendar.DAY_OF_MONTH, 1);
            normalizedTotal++;
        }

        return normalizedTotal;
    }

    public static String getPersian8Char(Date date) {
        String convertedDate = ir.tamin.framework.core.util.DateUtils.format(date, "yyyyMMdd");
        return convertedDate.substring(0, 4) + "/" + convertedDate.substring(4, 6) + "/" + convertedDate.substring(6, 8);
    }

    public static String getPersian8Char(String date) {
        return date.substring(0, 4) + "/" + date.substring(4, 6) + "/" + date.substring(6, 8);
    }
}
