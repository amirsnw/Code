package edu.polymorphism.virtual.method;

public class Cow extends Animal {

    public void addHay () {
        System.out.println("Add Hay ...");
    }

    public void feed() { addHay(); }
}
