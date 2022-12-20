package edu.priority.overdrive;

/*
 * Created by © Amir snw.
 */

import java.util.ArrayList;
import java.util.List;

public class Europe {

    public void rule () {
        System.out.println("rule ()");
    }

    public void rule (String words) {
        System.out.println("rule (String words)");
    }

    public void rule (int regionNum) {
        System.out.println("rule (int regionNum)");
    }

    public void rule (long population) {
        System.out.println("rule (long population)");
    }

    public void rule (Integer regionNum) {
        System.out.println("rule (Integer regionNum)");
    }

    public void rule (String... words) {
        System.out.println("rule (String... words)");
    }

    public void rule (String words, int regionNum) {
        System.out.println("rule (String words, int regionNum)");
    }

    public void rule (List words) {
        System.out.println("rule (List words)");
    }

    public static void main(String[] args) {
        Europe europe = new Europe();

        europe.rule();
        europe.rule("Hello!");
        europe.rule(28);
        europe.rule(28L);
        europe.rule(new Integer(28));
        europe.rule("Hello","World");
        europe.rule(new String[]{"Hello","World"});
        europe.rule("Hello", 28);
        europe.rule(new ArrayList());
    }
}
