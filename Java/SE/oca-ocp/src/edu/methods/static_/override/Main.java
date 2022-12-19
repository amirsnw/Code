package edu.methods.static_.override;

public class Main {
    public static void main(String[] args) {
        Dictionary dictionary = new Dictionary();
        MedicalDictionary medicalDictionary = new MedicalDictionary();
        Dictionary mdictionary = new MedicalDictionary();

        dictionary.printTypeOfContent();
        medicalDictionary.printTypeOfContent();
        mdictionary.printTypeOfContent();
    }
}
