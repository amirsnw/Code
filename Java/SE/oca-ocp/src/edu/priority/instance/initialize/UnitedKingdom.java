package edu.priority.instance.initialize;

public class UnitedKingdom extends Europe {

    public String words = "UnitedKingdom";

    {
        System.out.println(words);
    }

    public static String staticWords = "Static UnitedKingdom";

    static {
        System.out.println(staticWords);
    }

    public UnitedKingdom() {
        System.out.println("UnitedKingdom Instance Created.");
    }

    public UnitedKingdom(String custom) {
        System.out.println("Custom UnitedKingdom Instance Created.");
    }

    public static void main(String[] args) {
        new UnitedKingdom();
    }
}
