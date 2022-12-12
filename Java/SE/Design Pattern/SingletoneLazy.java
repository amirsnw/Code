// Lazy instantiation
public class VisitorTicketTracker {
	private static VisitorTicketTracker instance;
	
	private VisitorTicketTracker() {}
	public static synchronized VisitorTicketTracker getInstance() {
		if(instance == null) {
			instance = new VisitorTicketTracker(); // NOT THREAD-SAFE!
		}
		return instance;
	}
	// Data access methods
	...
}

//fixes

private static volatile VisitorTicketTracker instance;
	public static VisitorTicketTracker getInstance() {
	if(instance == null) {
		synchronized(VisitorTicketTracker.class) {
			if(instance == null) {
				instance = new VisitorTicketTracker();
			}
		}
	}
	return instance;
}