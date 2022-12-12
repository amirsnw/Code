


import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;


/* Shared Object */
public class SharedResource {
	
	private int balance;
	Lock lock = new ReentrantLock();
	
	public SharedResource(int balance) {
		this.balance = balance;
	}
	
	void delay(int d) {
		try {
			Thread.sleep(d);
		}
		catch (InterruptedException e) {
			e.printStackTrace();
		}
	}
	
	public int getBalance() {
		return balance;
	}
	
	void customLock() {
		
		for (int i = 0 ; i < 5 ; i++) {
			System.out.println(Thread.currentThread().getName());
			delay(100);
		}
		
		// Critical Section
		lock.lock();
		
		System.out.println(" First of Critical Section : " + Thread.currentThread().getName());
		for (int i = 0 ; i < 5 ; i++) {
			System.out.println("    " + Thread.currentThread().getName());
			balance = balance + 1;
			delay(100);
			balance = balance - 1;
		}
		System.out.println(" End of Critical Section : " + Thread.currentThread().getName() + "    balance = " + balance);
		
		// Critical Section
		lock.unlock();
		
	}
	
	
	// Critical Section
	synchronized void synchronizedMethod() {
		
		for (int i = 0 ; i < 5 ; i++) {
			System.out.println(Thread.currentThread().getName());
			delay(100);
		}
		
		System.out.println(" First of Critical Section : " + Thread.currentThread().getName());
		
		for (int i = 0 ; i < 5 ; i++)
		{
			System.out.println("    " + Thread.currentThread().getName());
			balance = balance + 1;
			delay(100);
			balance = balance - 1;
		}
		System.out.println(" End of Critical Section : " + Thread.currentThread().getName() + "    balance = " + balance);
	}
	
	
//	synchronized(obj) { } ---> obj.synchronizedMethods() & Blocks are locked!
	void synchronizedBlock() {
		
		for (int i = 0 ; i < 5 ; i++) {
			System.out.println(Thread.currentThread().getName());
			delay(100);
		}
		
		// Critical Section
		synchronized (this) {
			System.out.println(" First of Critical Section : " + Thread.currentThread().getName());
			for (int i = 0 ; i < 5 ; i++) {
				System.out.println("    " + Thread.currentThread().getName());
				balance = balance + 1;
				delay(100);
				balance = balance - 1;
			}
			System.out.println(" End of Critical Section : " + Thread.currentThread().getName() + "    balance = " + balance);
		}
	}
	
	
	void synchronizedBlock(SharedResource source, SharedResource destination, long amount)
	{
		
		// ????
		
		synchronized (source)
		{
			
			synchronized (destination)
			{
				
//				 source.withdraw(amount);
//				 destination.deposit(amount);
			
			}
			
		}
		
		// ???
		
		
	}
	
}


/*
 
 
 
 package com.acm.training.jse.thread.states.waitnotify;

import java.util.ArrayList;


public class Child extends Thread
{
	
	private String name;
	private ArrayList dish;
	
	
	public Child(String n, ArrayList d)
	{
		name = n;
		dish = d;
	}
	
	
	public void run()
	{
		
		synchronized (dish)
		{
			
			System.out.println(name + " sees " + dish.size() + " cookies");
			if (dish.size() >= 1)
			{
				System.out.println(name + " starts eating...");
				dish.remove(dish.size() - 1);
				return; // End of this thread
			}
			
			while (dish.size() < 1)
			{
				try
				{
					System.out.println(name + " is waiting for cookie...");
					dish.wait(); // continue after notify()
				}
				catch (InterruptedException e)
				{
				 }
			}
			
			System.out.println(name + " sees " + dish.size() + " cookies and starts eating...");
			dish.remove(dish.size() - 1);
			// end of this thread
			
		}
		
	}
	
	
}*/

