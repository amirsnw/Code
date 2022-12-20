package edu.inheritance.nesting.innerClass;

/*
 * Code examples for Oracle Certified Associate (OCA) Exam
 * Java 8 SE, 2017.
 * Created by © Matko Soric.
 */

public class LocalInnerClass {

    public static void main(String[] args) {

        LocalInnerClass topClassInstance = new LocalInnerClass();
        numberSeven numberSevenInstance = new numberSeven();

//        sevenBeers sevenBeers = new sevenBeers();       // does not compile
        LocalInnerClass.numberSeven.sevenTowns sevenTowns =
                numberSevenInstance.new sevenTowns();        // valid statement
//        TopClass.numberSeven.sevenHospitals sevenHospitalsInstance =
//                new TopClass.numberSeven.sevenHospitals();          // does not compile

        numberSeven.sevenCows sevenCowsInstance = numberSevenInstance.new sevenCows();      // valid statement

    }

    // numberSeven is an inner static class
    public static class numberSeven {

        public String nameSeven = "Seven";
        public double valueSeven = 7.0;

        // second-layer inner classes
        public class sevenCows {}
        public class sevenTowns {}
        public class sevenHospitals {}
        public class sevenBeers {}
        public class sevenBooks {}

    }
}
