package edu.polymorphism.virtual.method;

import edu.polymorphism.nonvirtual.method.Snake;

public abstract class Animal {

    public abstract void feed();

    public void feedAnimal() {
        this.feed();
    }

    public static void main(String[] args) {

        Animal bird = new Bird();
        Animal cow = new Cow();
        Animal lion = new Lion();

        bird.feedAnimal();
        cow.feedAnimal();
        lion.feedAnimal();
    }
}
