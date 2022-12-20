package edu.polymorphism.virtual.method;

public class Lion extends Animal {

    public void addMeat () {
        System.out.println("Add Meat ...");
    }

    public void feed() { addMeat(); }
}
