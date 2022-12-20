package edu.polymorphism.virtual.method;

public class Bird extends Animal {

    public void addSeed () {
        System.out.println("Add Seed ...");
    }

    public void feed() { addSeed(); }
}
