public class JavaExample {
    public static void main(String[] args)
    {
	String str = "21111";
	String str2 = "-11111";
		
	//Conversion using parseLong(String) method
	long num = Long.parseLong(str);
	long num2 = Long.parseLong(str2);
	System.out.println(num+num2);		
    }
}

public class Example {
   public static void main(String[] args)
   {
       String str = "11111";
       String str2 = "88888";
       //Conversion using valueOf(String) method
       long num = Long.valueOf(str);
       long num2 = Long.valueOf(str2);
       System.out.println(num+num2);		
   }
}

public class Example {
   public static void main(String[] args)
   {
       String str = "10000";
       String str2 = "22222";
       //Conversion using Long(String s) constructor
       long num = new Long(str);
       long num2 = new Long(str2);
       System.out.println(num*num2);		
   }
}