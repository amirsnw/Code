

public class RaseConditionDemo {

	public static void main(String[] args) throws Exception {

		customLock();
		System.out.println("\n********************************\n");
		synchronizedMethod();
		System.out.println("\n********************************\n");
		synchronizedBlock();

	}


	static void customLock() throws InterruptedException {
		SharedResource sharedObject = new SharedResource(1000);

		Thread t1 = new Thread(() -> {
			sharedObject.customLock();
		});

		Thread t2 = new Thread(() -> {
			sharedObject.customLock();
		});

		Thread t3 = new Thread(() -> {
			sharedObject.customLock();
		});
		
		t1.start();
		t2.start();
		t3.start();
		
		t1.join();
		t2.join();
		t3.join();
		
		System.out.println("\n Deterministic Result : " + sharedObject.getBalance());
	}
	
	static void synchronizedMethod() throws InterruptedException {
		SharedResource sharedObject = new SharedResource(1000);

		Thread t1 = new Thread(() -> {
			sharedObject.synchronizedMethod();
		});

		Thread t2 = new Thread(() -> {
			sharedObject.synchronizedMethod();
		});

		Thread t3 = new Thread(() -> {
			sharedObject.synchronizedMethod();
		});
		
		t1.start();
		t2.start();
		t3.start();
		
		t1.join();
		t2.join();
		t3.join();
		
		System.out.println("\n Deterministic Result : " + sharedObject.getBalance());
	}
	
	static void synchronizedBlock() throws InterruptedException {
		SharedResource sharedObject = new SharedResource(1000);

		Thread t1 = new Thread(() -> {
			sharedObject.synchronizedBlock();
		});

		Thread t2 = new Thread(() -> {
			sharedObject.synchronizedBlock();
		});

		Thread t3 = new Thread(() -> {
			sharedObject.synchronizedBlock();
		});
		
		t1.start();
		t2.start();
		t3.start();
		
		t1.join();
		t2.join();
		t3.join();
		
		System.out.println("\n Deterministic Result : " + sharedObject.getBalance());
	}


	static void delay(int d) {
		try {
			Thread.sleep(d);
		}
		catch (InterruptedException e) {
			e.printStackTrace();
		}
	}

	synchronized static void sharedMethod(String name) {
		System.out.print("[");
		delay(1000);
		System.out.print(name);
		System.out.println("]");
	}
}
