package edu.polymorphism.virtual.method;

class Vehicle {
    void make() {
        System.out.println("heavy duty");
    }
}

public class Trucks extends Vehicle {

    void make() {
        System.out.println("Transport vehicle for heavy duty");
    }

    public static void main(String args[]) {
        Vehicle ob1 = new Trucks();
        ob1.make();
    }
}
