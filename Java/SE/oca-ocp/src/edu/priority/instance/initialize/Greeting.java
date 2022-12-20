package edu.priority.instance.initialize;

public class Greeting {

    {
        // System.out.print(words);       // does not compile
    }

    private String words = "Hello!";

    public void sayWords() {
        System.out.println(words);
    }

    public static void main(String[] args) {

        new Greeting().sayWords();
    }
}
