package ir.tamin.incomeBank.util;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author s_maknooni
 */
public class JalaliDateContent {

    private int date = 0;
    private int month = 0;
    private int year = 0;
    private int hours = 0;
    private int minutes = 0;
    private int seconds = 0;

    public JalaliDateContent() {
    }

    public JalaliDateContent(int year, int month, int date) {
        setYear(year);
        setMonth(month);
        setDate(date);
    }

    public JalaliDateContent(int year, int month, int date, int hour, int minute, int secend) {
        this(year, month, date);
        setHours(hour);
        setMinutes(minute);
        setSeconds(secend);
    }

    public int getDate() {
        return date;
    }

    public void setDate(int date) {
        this.date = date;
    }

    public int getMonth() {
        return month;
    }

    public void setMonth(int month) {
        this.month = month;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public int getHours() {
        return hours;
    }

    public void setHours(int hours) {
        this.hours = hours;
    }

    public int getMinutes() {
        return minutes;
    }

    public void setMinutes(int minutes) {
        this.minutes = minutes;
    }

    public int getSeconds() {
        return seconds;
    }

    public void setSeconds(int seconds) {
        this.seconds = seconds;
    }
}
