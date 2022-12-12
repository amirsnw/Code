class GenerateRandom {
    public static void main( String args[] ) {
      int min = 50;
      int max = 100;
      //Generate random double value from 50 to 100 
      System.out.println("Random value in double from "+min+" to "+max+ ":");
      double random_double = Math.random() * (max - min + 1) + min; 
      System.out.println(random_double);
        
      //Generate random int value from 50 to 100 
      System.out.println("Random value in int from "+min+" to "+max+ ":");
      int random_int = (int)(Math.random() * (max - min + 1) + min);
      System.out.println(random_int);
    }
}

/////////////////////////////////////
package com.mkyong.example.test;

import java.util.Random;

public class TestRandom {

	public static void main(String[] args) {

		for (int i = 0; i < 10; i++) {
			System.out.println(getRandomNumberInRange(5, 10));
		}

	}

	private static int getRandomNumberInRange(int min, int max) {

		if (min >= max) {
			throw new IllegalArgumentException("max must be greater than min");
		}

		Random r = new Random();
		return r.nextInt((max - min) + 1) + min;
	}

}

////////////////////////////////////
package com.mkyong.example.test;

public class TestRandom {

	public static void main(String[] args) {

		for (int i = 0; i < 10; i++) {
			System.out.println(getRandomNumberInRange(16, 20));
		}

	}

	private static int getRandomNumberInRange(int min, int max) {

		if (min >= max) {
			throw new IllegalArgumentException("max must be greater than min");
		}

		return (int)(Math.random() * ((max - min) + 1)) + min;
	}

}