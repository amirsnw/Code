public class A {
	
	public int a = 22;
	{
		System.out.println("Suepr Object Block " + a);
	}
	
	public static int b = 44;
	static {
		System.out.println("Suepr Static Block " + b);
	}
	
	public A(){
		System.out.println("Superclass Constructor");
	}
	
	public A(int h){
		System.out.println("Superclass Constructor2 " + h);
	}
}