package edu.polymorphism.nonvirtual.method;

public class Animal {
    public void feedAnimal(Animal animal) {
        if(animal instanceof Cow) {
            ((Cow)animal).addHay();
        } else if(animal instanceof Bird) {
            ((Bird)animal).addSeed();
        } else if(animal instanceof Lion) {
            ((Lion)animal).addMeat();
        } else {
            throw new RuntimeException("Unsupported animal");
        } }

    public static void main(String[] args) {

        Animal animal = new Animal();

        animal.feedAnimal(new Cow());
        animal.feedAnimal(new Bird());
        animal.feedAnimal(new Lion());
        animal.feedAnimal(new Snake());
    }
}
