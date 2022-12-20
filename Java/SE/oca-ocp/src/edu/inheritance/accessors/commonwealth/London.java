package edu.inheritance.accessors.commonwealth;

/*
 * Code examples for Oracle Certified Associate (OCA) Exam
 * Java 8 SE, 2017.
 * Created by © Matko Soric.
 */

import edu.inheritance.accessors.commonwealth.overseas.territories.Bermuda;

public class London extends UnitedKingdom {

    public static void main(String[] args) {

        Bermuda bermuda = new Bermuda();
        UnitedKingdom ukBer = new Bermuda();
        UnitedKingdom uk = new UnitedKingdom();

        System.out.println(bermuda.citizenship);     // public access in UK class
        System.out.println(bermuda.currency);        // protected access in the UK class
//        System.out.println(bermuda.queen);           // does not compile, default access in the UK class
//        System.out.println(bermuda.capitalCity);     // does not compile, private access in the UK class

        System.out.println(ukBer.citizenship);
        System.out.println(ukBer.currency);
        System.out.println(ukBer.queen);
//        System.out.println(ukBer.capitalCity); // does not compile

        System.out.println(uk.citizenship);
        System.out.println(uk.currency);
        System.out.println(uk.queen);
//        System.out.println(uk.capitalCity); // does not compile
    }
}
