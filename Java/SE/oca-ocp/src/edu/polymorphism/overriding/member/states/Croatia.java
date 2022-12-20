package edu.polymorphism.overriding.member.states;

/*
 * Code examples for Oracle Certified Associate (OCA) Exam
 * Java 8 SE, 2017.
 * Created by © Matko Soric.
 */

import edu.polymorphism.overriding.EuropeanUnion;

public class Croatia extends EuropeanUnion {

    @Override
    public void outputOfficialLanguage(String[] offLangStrArray) {
        super.outputOfficialLanguage(offLangStrArray);
    }

    @Override
    public void outputOfficialLanguage() {
        super.outputOfficialLanguage();
    }

    @Override
    public void outputOfficialLanguage(String offLanguageParam) {
        super.outputOfficialLanguage(offLanguageParam);
    }

    @Override
    public void outputGDP() {
        super.outputGDP();
    }

    @Override
    public void outputCapitalCity() {
        super.outputCapitalCity();
    }
}
