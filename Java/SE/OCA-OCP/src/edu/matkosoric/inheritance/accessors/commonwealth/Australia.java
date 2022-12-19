package edu.matkosoric.inheritance.accessors.commonwealth;

/*
 * Code examples for Oracle Certified Associate (OCA) Exam
 * Java 8 SE, 2017.
 * Created by © Matko Soric.
 */

import edu.matkosoric.inheritance.accessors.commonwealth.overseas.territories.Bermuda;

public class Australia extends UnitedKingdom {

    // Australia class is a subclass of the UnitedKingdom class,
    // located in the identical package.
    // it does not have access only to the private members of UnitedKingdom class.

    public static void main(String[] args) {

        Australia au = new Australia();
        UnitedKingdom ukAus = new Australia();
        UnitedKingdom uk = new UnitedKingdom();

        System.out.println(au.citizenship);
        System.out.println(au.currency);
        System.out.println(au.queen);
//        System.out.println(au.capitalCity);     // does not compile, private access

        System.out.println(ukAus.citizenship);
        System.out.println(ukAus.currency);
        System.out.println(ukAus.queen);
//        System.out.println(ukAus.capitalCity);

        System.out.println(uk.citizenship);
        System.out.println(uk.currency);
        System.out.println(uk.queen);
//        System.out.println(uk.capitalCity);
    }

}
