package edu.inheritance.nesting.innerClass;

/*
 * Code examples for Oracle Certified Associate (OCA) Exam
 * Java 8 SE, 2017.
 * Created by © Matko Soric.
 */

public class InnerClass {

    private String greet = "Hi";
    private String words = "H & I";

    public class sevenCows {
//        public static String words = "Hello"; // does not compile
        public String words = "Hello";

        public void printInner () {
            System.out.println(words);
        }

        public void printOuter () {
            System.out.println(greet);
        }
    }

    public static void main(String[] args) {
        InnerClass outer = new InnerClass();
        sevenCows inner = outer.new sevenCows();

        inner.printInner();
        inner.printOuter();
    }
}
