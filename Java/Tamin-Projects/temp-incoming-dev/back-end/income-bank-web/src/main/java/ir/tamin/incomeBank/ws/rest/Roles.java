/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.ws.rest;

public class Roles {

    public static final String ALL_USERS = "ALL USERS";
    //************************************************************************************************************//     
    //public
    //************************************************************************************************************//     
    // نقش عمومی 
    public static final String PUBLIC_USER = "INCOME BANK PUBLIC USER";

    // برای ایجاد در یک سری جداول پایه
    // ایجاد کد خطاهای تعریف شده بانک
    public static final String BASEINFO_USER = "INCOME BANK BASEINFO USER";

    // پشتیبان سیستم
    // امکان حذف چک را دارد البته بدون امضا
    // امکان ویرایش و حذف کد خطاهای بانک - چون یکی از کدهای بانک که عدم موجودی هست نباید حذف بشه
    public static final String SUPPORTER = "INCOME BANK SUPPORTER";
    //************************************************************************************************************//     

    //************************************************************************************************************//     
    // کوتاه مدت
    //************************************************************************************************************//     
    // دسترسی کاربر مالی ستاد
    // که روی کوتاه مدت کار میکنه
    // ایجاد لیست های پرداخت ، صدورچک ، مشاهده گزارشات و .... 
    public static final String MALI_SETAD_SHORTTERM_USER = "INCOME BANK MALI SETAD SHORTTERM USER";
    //************************************************************************************************************//     
    // اسنادپزشکی
    //************************************************************************************************************//     
    // دسترسی کاربر مالی ستاد
    // که رو اسناد کار میکنه
    // ایجاد لیست های پرداخت ، صدورچک ، مشاهده گزارشات و .... 
    public static final String MALI_SETAD_ASNAD_USER = "INCOME BANK MALI SETAD ASNAD USER";

    //************************************************************************************************************//     
    // مستمری
    //************************************************************************************************************//     
    // دسترسی کاربر مالی ستاد
    // که رو مستمری کار میکنه
    // ایجاد لیست های پرداخت ، صدورچک ، مشاهده گزارشات و .... 
    public static final String MALI_SETAD_PENSION_USER = "INCOME BANK MALI SETAD PENSION USER";
    //************************************************************************************************************//     
    // بانک درامد
    //************************************************************************************************************//     
    // کاربر ستادی بانک درامد 
    public static final String MALI_SETAD_DRMD_USER = "INCOME BANK SETAD USER";

    // کاربر شعبه بانک درامد 
    public static final String MALI_BRANCH_DRMD_USER = "INCOME BANK BRANCH USER";
    // مسئول حسابدار ی شعبه
    public static final String MALI_BRANCH_ACCOUNTANT = "INCOME BANK BRANCH ACCOUNTANT";
    //رئیس شعبه
    public static final String MALI_BRANCH_BOSS = "INCOME BANK BRANCH BOSS";

    // کاربر کارگزاری بانک درامد 
    public static final String MALI_KARGZARI_DRMD_USER = "INCOME BANK KARGZARI USER";

    // اسناد حسابداری 
    //************************************************************************************************************//   
    // کوتاه مدت 
     public static final String MALI_SETAD_SHORTTERM_DOCUMENT = "INCOME BANK MALI SETAD SHORTTERM DOCUMENT";
}
