package edu.priority.instance.initialize;

public class Europe {

    public String words = "Europe";

    {
        System.out.println(words);
    }

    public static String staticWords = "Static Europe";

    static {
        System.out.println(staticWords);
    }

    public Europe() {
        System.out.println("Europe Instance Created.");
    }

    public Europe(String custom) {
        System.out.println("Custom Europe Instance Created.");
    }
}
