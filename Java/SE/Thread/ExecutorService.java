// Registering
ExecutorService service = Executors.newSingleThreadExecutor();
service.execute(() -> {
		System.out.println("<< New Airplane Thread >>");
		AirplaneServiceImpl asi = AirplaneServiceImpl.getService();
		asi.registerAirplane(airplaneType, capacity, price, terminalNumber);
		System.out.println("-- Thread Terminate --");
	});
	 service.shutdown();
try {
	service.awaitTermination(Long.MAX_VALUE, TimeUnit.NANOSECONDS);
} catch (InterruptedException e) {
	System.err.println("Can not terminate thread!");
}