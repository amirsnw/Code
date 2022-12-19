package edu.inheritance.hiding.method;

/*
 * Code examples for Oracle Certified Associate (OCA) Exam
 * Java 8 SE, 2017.
 * Created by © Matko Soric.
 */

public class InvisibleMan extends InvisibilityPerSe {

    public static void invisible() {
        System.out.println("Invisible from InvisibleMan");
    }


    public static void main(String[] args) {

        InvisibleMan invisibleMan = new InvisibleMan();
        InvisibleMan invisibilityPerSe = new InvisibleMan();
        InvisibilityPerSe invisibleManPerSe = new InvisibleMan();

        invisibleMan.invisible();
        invisibilityPerSe.invisible();
        invisibleManPerSe.invisible();
        InvisibleMan.invisible();
    }
}
