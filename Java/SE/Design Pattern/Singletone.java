public class HayStorage {
	private int quantity = 0;
	
	private HayStorage() {}
	
	private static final HayStorage instance = new HayStorage();
	
	public static HayStorage getInstance() {
		return instance;
	}
	public synchronized void addHay(int amount) {
		quantity += amount;
	}
	public synchronized boolean removeHay (int amount) {
		if(quantity < amount) return false;
		quantity -= amount;
		return true;
	}
	public synchronized int getHayQuantity() {
		return quantity;
	}
}


// Using
public class LlamaTrainer {
	public boolean feedLlamas(int numberOfLlamas) {
		int amountNeeded = 5 * numberOfLlamas;
		HayStorage hayStorage = HayStorage.getInstance();
		
		if(hayStorage.getHayQuantity() < amountNeeded) {
		hayStorage.addHay(amountNeeded + 10);
		}
		boolean fed = hayStorage.removeHay(amountNeeded);
		if(fed) System.out.println("Llamas have been fed");
		return fed;
	}
}