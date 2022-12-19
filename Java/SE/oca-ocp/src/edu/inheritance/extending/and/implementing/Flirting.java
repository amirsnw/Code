package edu.inheritance.extending.and.implementing;

/*
 * Code examples for Oracle Certified Associate (OCA) Exam
 * Java 8 SE, 2017.
 * Created by © Matko Soric.
 */

// after class name, stating extended class has priority over implementing interface
// if the order is reversed, the code will not compile, for example
// class Example2 implements greetingInterface extends abClass {
//    public void interfaceGreeting1(){}
//    public void interfaceGreeting2(){}
//}

public class Flirting extends cdClass {

    // here is an implementation of interfaceGreetings
    // third method does not have to be implemented, since it is defined in the interface itself
    @Override
    public void interfaceGreeting1() { System.out.println("How are you?");
    }
    @Override
    public void interfaceGreeting2() { System.out.println("Hi!");
    }

    @Override
    public void interfaceGreeting3() { System.out.println("Flirting Hello!");
    }

    @Override
    public void abstractGreeting4() { System.out.println("Good day!");
    }

    public static void main(String[] args) {

        Greeting a = new Greeting();
        a.interfaceGreeting1();
        a.interfaceGreeting2();
        a.interfaceGreeting3();
        a.abstractGreeting4();

    }
}

abstract class cdClass implements greetingInterface {

    abstract public void abstractGreeting4();
    // abstract class can not have a default method
//    default void abstractGreeting5() {System.out.println("What's up?");}; //does not compile

    public abstract void interfaceGreeting3();
}
