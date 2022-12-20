package edu.inheritance.nesting.innerClass;

/*
 * Code examples for Oracle Certified Associate (OCA) Exam
 * Java 8 SE, 2017.
 * Created by © Matko Soric.
 */

public class StaticInnerClass {

    public String greet = "Hello!";

    public static void main(String[] args) {

        innerClass innerClassInstance = new innerClass();
        StaticInnerClass.innerClass innerClassInstance2 = new innerClass();

        innerClassInstance.access();
    }

    // numberSeven is an inner static class
    public static class innerClass {

        public String nameSeven = "Seven";
        public double valueSeven = 7.0;

        public void access () {
            System.out.println(new StaticInnerClass().greet);
        }

    }
}
