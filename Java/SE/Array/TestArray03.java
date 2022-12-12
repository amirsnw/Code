public class TestArray03 {
	
	public static void main(String[] args) {
		
		//int[] arr1; // No Value
		
		int[] arr2 = null;
		//System.out.println(arr2.length); // NullPointerException
		
		int[] arr3 = new int[0];
		System.out.println(arr3.length); // 0
		//arr3[0] = 100; // ArrayIndexOutOfBoundException
		
		int[] arr4 = new int[1];
		System.out.println(arr4.length); // 1
		arr4[0] = 100; // Ok
	}
}