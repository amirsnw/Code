package edu.inheritance.nesting.innerClass;

/*
 * Code examples for Oracle Certified Associate (OCA) Exam
 * Java 8 SE, 2017.
 * Created by © Matko Soric.
 */

public class ComplexClass {

    public static void main(String[] args) {

        innerClass innerClassInstance = new innerClass();

//        sevenTowns sevenTowns = new sevenTowns();       // does not compile
        ComplexClass.innerClass.sevenTowns sevenTowns =
                innerClassInstance.new sevenTowns();        // valid statement
        ComplexClass.innerClass.sevenTowns sevenTowns2 =
                new innerClass().new sevenTowns();        // valid statement
//        StaticInnerClass.innerClass.sevenTowns sevenTownsInstance =
//                new StaticInnerClass.innerClass.sevenTowns();          // does not compile

        innerClass.sevenCows sevenCowsInstance = innerClassInstance.new sevenCows();      // valid statement

    }

    // numberSeven is an inner static class
    public static class innerClass {

        public String nameSeven = "Seven";
        public double valueSeven = 7.0;

        // second-layer inner classes
        public class sevenCows {}
        public class sevenTowns {}

    }
}
