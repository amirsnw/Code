public class Replace{  
	public static void main(String args[]){  
		String s1="javatpoint is a very good website";  
		String replaceString=s1.replace('a','e');//replaces all occurrences of 'a' to 'e'  
		System.out.println(replaceString);  
		
		s1="my name is khan my name is java";  
		String replaceString=s1.replace("is","was");//replaces all occurrences of "is" to "was"  
		System.out.println(replaceString);  
	}
}  