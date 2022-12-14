package ir.tamin.incomeBank.util;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import java.util.Calendar;
import java.util.Date;

/**
 *
 * @author s_maknooni
 */
public class DateTimeUtility {

    private final static int[] g_days_in_month = new int[12];
    private final static int[] j_days_in_month = new int[12];

    static {
        // initializing date of gregorian months.
        g_days_in_month[0] = 31;
        g_days_in_month[1] = 28;
        g_days_in_month[2] = 31;
        g_days_in_month[3] = 30;
        g_days_in_month[4] = 31;
        g_days_in_month[5] = 30;
        g_days_in_month[6] = 31;
        g_days_in_month[7] = 31;
        g_days_in_month[8] = 30;
        g_days_in_month[9] = 31;
        g_days_in_month[10] = 30;
        g_days_in_month[11] = 31;

        // initializing date of jalali months.
        j_days_in_month[0] = 31;
        j_days_in_month[1] = 31;
        j_days_in_month[2] = 31;
        j_days_in_month[3] = 31;
        j_days_in_month[4] = 31;
        j_days_in_month[5] = 31;
        j_days_in_month[6] = 30;
        j_days_in_month[7] = 30;
        j_days_in_month[8] = 30;
        j_days_in_month[9] = 30;
        j_days_in_month[10] = 30;
        j_days_in_month[11] = 29;
    }

    @SuppressWarnings("deprecation")
    public static JalaliDateContent convertToJalaliDate(Date gregorianDate) {
        JalaliDateContent jalaliDate = new JalaliDateContent();
        if (gregorianDate == null) {
            return null;
        }
        int year = gregorianDate.getYear() + 1900;
        int month = gregorianDate.getMonth() + 1;
        int day = gregorianDate.getDate();

        int g_y = year;
        int g_m = month;
        int g_d = day;

        int gy, gm, gd;
        int jy, jm, jd;
        long g_day_no, j_day_no;
        int j_np;

        int i;

        gy = g_y - 1600;
        gm = g_m - 1;
        gd = g_d - 1;

        g_day_no = 365 * gy + (gy + 3) / 4 - (gy + 99) / 100 + (gy + 399) / 400;
        for (i = 0; i < gm; ++i) {
            g_day_no += g_days_in_month[i];
        }
        if (gm > 1 && ((gy % 4 == 0 && gy % 100 != 0) || (gy % 400 == 0))) /* leap and after Feb */ {
            ++g_day_no;
        }

        g_day_no += gd;

        j_day_no = g_day_no - 79;

        j_np = (int) (j_day_no / 12053);
        j_day_no %= 12053;

        jy = (int) (979 + 33 * j_np + 4 * (j_day_no / 1461));
        j_day_no %= 1461;

        if (j_day_no >= 366) {
            jy += (j_day_no - 1) / 365;
            j_day_no = (j_day_no - 1) % 365;
        }

        for (i = 0; i < 11 && j_day_no >= j_days_in_month[i]; ++i) {
            j_day_no -= j_days_in_month[i];
        }

        jm = i + 1;
        jd = (int) (j_day_no + 1);

        jalaliDate.setDate(jd);
        jalaliDate.setMonth(jm);
        jalaliDate.setYear(jy);
        jalaliDate.setHours(gregorianDate.getHours());
        jalaliDate.setMinutes(gregorianDate.getMinutes());
        jalaliDate.setSeconds(gregorianDate.getSeconds());
        return jalaliDate;
    }
    
    public static Date setTimeToZero(Date date) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        cal.set(Calendar.HOUR_OF_DAY, 0);
        cal.set(Calendar.MINUTE, 0);
        cal.set(Calendar.SECOND, 0);
        cal.set(Calendar.MILLISECOND, 0);
        return cal.getTime();
    }

}
