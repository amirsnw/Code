package edu.inheritance.enum_.constructor.access;

/*
 * Code examples for Oracle Certified Associate (OCA) Exam
 * Java 8 SE, 2017.
 * Created by © Matko Soric.
 */

public enum ITcompanies {

    // enum constructor can have private or default scope,
    // but it can not be protected or public.

    FACEBOOK(1) {
        public void greeting() { System. out .println("Hello From FACEBOOK"); }
    },
    GOOGLE(2) {
        public void greeting() { System. out .println("Hello From GOOGLE"); }
    },
    APPLE(3) {
        public void greeting() { System. out .println("Hello From APPLE"); }
    },
    IBM(4) {
        public void greeting() { System. out .println("Hello From IBM"); }
    };

    private final int companyCode;

//    public ITcompanies (int code) {           // does not compile, enum constructor can not be public
//        this.companyCode = code;
//    }
    ITcompanies (int code) {
        this.companyCode = code;
    }

    public abstract void greeting();

    public static void main(String[] args) {

        for (ITcompanies comp : ITcompanies.values()) {
            System.out.println(comp.APPLE.ordinal());
        }

        System.out.println("Apple Company Code is : " + ITcompanies.APPLE.companyCode);
        System.out.println();
        System.out.println(ITcompanies.APPLE.companyCode == ITcompanies.APPLE.ordinal());
        System.out.println();
        switch (ITcompanies.APPLE) {
            case FACEBOOK:
                System.out.println("Found Facebook.");
                break;
            case GOOGLE:
                System.out.println("Found Google.");
                break;
            case APPLE:
                ITcompanies.APPLE.greeting();
                break;
        }
    }
}
