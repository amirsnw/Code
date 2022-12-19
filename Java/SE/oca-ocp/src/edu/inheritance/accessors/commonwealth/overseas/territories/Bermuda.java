package edu.inheritance.accessors.commonwealth.overseas.territories;

/*
 * Code examples for Oracle Certified Associate (OCA) Exam
 * Java 8 SE, 2017.
 * Created by © Matko Soric.
 */

import edu.inheritance.accessors.commonwealth.UnitedKingdom;

public class Bermuda extends UnitedKingdom {

    // Bermuda class is a subclass of UK class in a different package.
    // hierarchical folder structure does not affect the rules of inheritance.
    // two classes in the same package share the identical folder path.
    // Bermuda class can access only public and protected members of UK class.

    public static void main(String[] args) {

        Bermuda bermuda = new Bermuda();
        UnitedKingdom ukBer = new Bermuda();
        UnitedKingdom uk = new UnitedKingdom();

        System.out.println(bermuda.citizenship);     // public access in UK class
        System.out.println(bermuda.currency);        // protected access in the UK class
//        System.out.println(bermuda.queen);           // does not compile, default access in the UK class
//        System.out.println(bermuda.capitalCity);     // does not compile, private access in the UK class

        System.out.println(ukBer.citizenship);
//        System.out.println(ukBer.currency);
//        System.out.println(ukBer.queen);
//        System.out.println(ukBer.capitalCity);

        System.out.println(uk.citizenship);
//        System.out.println(uk.currency);
//        System.out.println(uk.queen);
//        System.out.println(uk.capitalCity);
    }

}
