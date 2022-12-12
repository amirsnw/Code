public class B extends A{
	
	public int c = 66;
	{
		System.out.println("Child Object Block " + c);
	}
	
	public static int d = 88;
	static {
		System.out.println("Child Static Block " + d);
	}
	
	public B(){
		super(c);
		System.out.println("Child Class Constructor");
	}
	
	public static void main(String args[]) {
		B object = new B();
	}
}

/*

Suepr Static Block 44
Child Static Block 88
Suepr Object Block 22
Superclass Constructor
Child Object Block 66
Child Class Constructor 


*/