import java.util.concurrent.ThreadLocalRandom;
class GenerateRandom {
    public static void main( String args[] ) {
      // Generate random integers  
      int int_random = ThreadLocalRandom.current().nextInt();  
  
      // Print random integers 
      System.out.println("Random Integers: " + int_random); 

      // Generate Random doubles 
      double double_rand = ThreadLocalRandom.current().nextDouble(); 
  
      // Print random doubles 
      System.out.println("Random Doubles: " + double_rand); 
       
      // Generate random booleans 
      boolean boolean_rand = ThreadLocalRandom.current().nextBoolean(); 
       
      // Print random booleans 
      System.out.println("Random Booleans: " + boolean_rand); 
    }
}