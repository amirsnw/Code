/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.util;

import com.ibm.icu.text.DateFormat;
import com.ibm.icu.text.SimpleDateFormat;
import com.ibm.icu.util.ULocale;

import java.sql.Timestamp;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.concurrent.TimeUnit;

public class DateUtils {

    public static final int[] j_days_in_month = {31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29};
    public static final int[] g_days_in_month = {31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};
    public static final String year_prefix = "13";
    public static final String YEAR_MONTH_DAY = "yyyyMMdd";
    public static final int YEAR = 0;
    public static final int MONTH = 1;
    public static final int DAY = 3;

    public static String add(String date, int amount) {
        Date currentDate = convertDateStringToDate(date);
        Calendar cal = Calendar.getInstance();
        cal.setTime(currentDate);
        cal.add(Calendar.DAY_OF_YEAR, amount);
        String newDate = DateUtils.format(new Date(), "yyyyMMdd");
        return newDate;
    }

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

    public static String defaultFormat(Date date, String pattern) {
        DateFormat df = new SimpleDateFormat(pattern);
        return df.format(date);
    }

    public static String getSimpleStringDate(Timestamp date) {
        String d = null;
        if (date != null) {
            d = DateUtils.format(date).replaceAll("/", "");
            return d;
        } else {
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

    public static Date convertPersianDateTimeStringToDate(String persianDate, String persianTime) {

        String newPersianDate = persianDate.replaceAll("/", "").trim();
        newPersianDate = newPersianDate.length() != 8 ? year_prefix + newPersianDate : newPersianDate;
        String year = newPersianDate.substring(0, 4);
        String month = newPersianDate.substring(4, 6);
        String day = newPersianDate.substring(6, 8);

        String newPersianTime = persianTime.replaceAll(":", "");
        String hour = "0";
        String min = "0";
        String sec = "0";
        if (newPersianTime.length() == 6) {
            hour = newPersianDate.substring(0, 2);
            min = newPersianDate.substring(4, 4);
            sec = newPersianDate.substring(4, 6);
        }

        String gregorianDate = persianToGregorian(year, month, day);
        Date result = convertDateStringToDate(gregorianDate);
        result.setHours(Integer.parseInt(hour));
        result.setMinutes(Integer.parseInt(min));
        result.setSeconds(Integer.parseInt(sec));
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

    public static long diffDays(String startDate, String endDate) {

        Date date1 = convertDateStringToDate(startDate);
        Date date2 = convertDateStringToDate(endDate);
        return diffDays(date1, date2);
    }

    public static long diffDays(Date startDate, Date endDate) {

        long diff = endDate.getTime() - startDate.getTime();
        return TimeUnit.DAYS.convert(diff, TimeUnit.MILLISECONDS) + 1;

    }

    public static Date convertTimestampStringToDate(String time) {
        long milliSeconds = Long.parseLong(time) + 3600000;
        Calendar calendar = Calendar.getInstance();
        calendar.setTimeInMillis(milliSeconds);
        Date d = calendar.getTime();
        return d;
    }

    public static Long convertDateToTimestampString(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        return date.getTime();
    }

    public static String getJalaliStandard(Date normalDate, String separator) {
        if (normalDate == null) {
            return null;
        }

        JalaliDateContent jDate = DateTimeUtility.convertToJalaliDate(normalDate);
        return DateUtils.getDateString(jDate, DateUtils.YEAR_MONTH_DAY, separator);

    }

    public static String getDateString(JalaliDateContent jalaliDate, String format, String separator) {
        if (jalaliDate == null) {
            return null;
        }

        if (format.equals(YEAR_MONTH_DAY)) {

            Integer year, month, day;
            year = jalaliDate.getYear();
            month = jalaliDate.getMonth();
            day = jalaliDate.getDate();

            String stringDay;
            String stringMonth;
            stringDay = day.toString();
            stringMonth = month.toString();
            if (stringDay.length() == 1) {
                stringDay = "0" + stringDay;
            }

            if (stringMonth.length() == 1) {
                stringMonth = "0" + stringMonth;
            }

            return year + separator
                    + stringMonth + separator
                    + stringDay;
        }
        return null;
    }

    public static String stringDateToStringSlashedDate(String stringDate) {
        if (stringDate.length() == 8) {
            return stringDate.substring(0, 4) + "/" + stringDate.substring(4, 6) + "/" + stringDate.substring(6, 8);
        } else {
            return "";
        }
    }
}
