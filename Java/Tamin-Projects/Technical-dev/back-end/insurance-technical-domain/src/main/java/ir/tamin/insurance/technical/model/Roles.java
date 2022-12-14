/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.insurance.technical.model;

/**
 * @author e_shoghi
 */
public class Roles {

    public static final String TECHNICAL_HEADS = "INSURANCE SPECIAL TECHNICAL HEADS";
    public static final String BRANCH_HEADS = "INSURANCE SPECIAL BRANCH HEADS";
    public static final String BRANCH_USERS = "INSURANCE SPECIAL BRANCH USERS";
    public static final String DEPUTIES = "INSURANCE SPECIAL DEPUTIES";
    public static final String ALL_USERS = "ALL USERS";

    public static final String HEAD_USER_TECH = "HEAD USER TECHNICAL"; // مسئول فنی --> نظریه مسول فنی
    public static final String INSPECTOR_USER_TECH = "INSPECTOR USER TECHNICAL"; //گزارش بازرسی فنی
    public static final String GENERAL_USER_TECH = "GENERAL USER TECHNICAL"; // کارشناس فنی شعبه-->ثبت /اصلاح/گزارش عملکرد /چاپ گزارش بازرسی/ارجاع به شعبه بررسی کننده
    public static final String PROV_HEAD_USER_TECH = "PROV HEAD USER TECHNICAL"; // اداره کل فنی (کارشناس استان )-->نظریه کمیته استان
    public static final String EDAREKOL_FANI_USER = "EDAREKOL FANI USER";
    public static final String MANAGER_USER_TECH = "MANAGER_USER_TECH"; // رئیس شعبه (استرداد)

    //کاربر ستاد امور فنی
    // public static final String SETAD_FANI_USER = "SETAD FANI USER";
    //اداره کل کارگزاریها
    public static final String EDAREKOL_BROKER_USER_TECH = "EDAREKOL BROKER USER TECH";
    //رابط شعبه کارگزاریها
    public static final String GENERAL_BROKER_USER_TECH = "GENERAL BROKER USER TECH";
    //کاربر ستاد کارگزاریها
    public static final String SETAD_BROKER_USER_TECH = "SETAD BROKER USER TECH";
}
