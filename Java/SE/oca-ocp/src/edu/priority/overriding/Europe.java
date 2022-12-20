package edu.priority.overriding;

/*
 * Created by © Amir snw.
 */

public abstract class Europe {

    public abstract void rule1 ();

    public abstract void rule2 (String words);

    public abstract void rule3 (Integer regionNum);

    public abstract void rule4 (int regionNum);

    public abstract void rule5 (long population);

    public abstract void rule6 (String... words);

    public abstract void rule7 (String words, int regionNum);

    public abstract void rule8 (String words, int regionNum) throws IllegalArgumentException;
}
