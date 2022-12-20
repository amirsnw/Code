package edu.priority.overriding.state;

/*
 * Created by © Amir snw.
 */

import edu.priority.overriding.Europe;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class UnitedKingdom extends Europe {

    public static void staticMethod () {
        System.out.println("Child static method");
    }

    // Approve
    @Override
    public void rule1() {}

    // Approve
    /*@Override
    protected void rule1() {}*/

    // NOT Approve
    /*@Override
    private void rule1() {}*/

    // Approve
    /*@Override
    public void rule1() throws IllegalArgumentException {}*/

    // Approve
    @Override
    public List rule2() {
        return null;
    }

    // Approve
    /*@Override
    public ArrayList rule2() {
        return null;
    }*/

    // NOT Approve
    /*@Override
    public Collections rule2() {
        return null;
    }*/

    // Approve
    @Override
    public void rule3(List wordList) {}

    // NOT Approve
    /*@Override
    public void rule3(ArrayList wordList) {}*/

    // Approve
    /*@Override
    public void rule4() {}*/
}
