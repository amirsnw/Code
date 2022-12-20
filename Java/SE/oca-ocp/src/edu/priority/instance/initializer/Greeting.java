package edu.priority.instance.initializer;

public class Greeting {

    {
        words = "Hello!";       // does not compile
    }

    private String words;

    public void sayWords() {
        System.out.println(words);
    }

    public static void main(String[] args) {

        new Greeting().sayWords();
    }
}
