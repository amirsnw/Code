package edu.inheritance.nesting.innerClass;

abstract class abClass{
    int a = 10;
    void abPrintMethod1() {System.out.println("Print output.");}
    abstract void abPrintMethod2();     //abstract method can not have a body, neither empty braces {}
}

public class AnonymousInnerClass {

    public void classicalMethod () {
        System.out.println("Method from outer class.");
    }

    public static void main(String[] args) {

        // it is impossible to instantiate an abstract class directly
        // this example creates inner anonymous class

        abClass instanceOfAbClass = new abClass() {
            @Override
            protected void abPrintMethod2() {}
        };

        // although instanceof operator returns true,
        // proper status of this object is clarified with getClass method()
        System.out.println(instanceOfAbClass instanceof abClass);
        System.out.println(instanceOfAbClass.getClass());

        // methods from outer class can be called from its instances
        // but not from inner anonymous class
        AnonymousInnerClass cc = new AnonymousInnerClass();
        cc.classicalMethod();
//        instanceOfAbClass.classicalMethod();        //does not compile

        // inner classes are a part of the OCP exam, not OCA
    }
}
