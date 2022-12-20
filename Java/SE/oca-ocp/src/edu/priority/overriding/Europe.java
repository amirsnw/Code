package edu.priority.overriding;

/*
 * Created by © Amir snw.
 */

import java.util.List;

public abstract class Europe {

    public static void staticMethod () {
        System.out.println("Parent static method");
    }

    protected abstract void rule1 ();

    public abstract List rule2 ();

    public abstract void rule3 (List wordList);

    /*public final abstract List rule4 ();*/ // Does Not Compile
}
