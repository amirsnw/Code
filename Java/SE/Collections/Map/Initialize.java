Map<String,String> mymap = new HashMap<String, String>();
test.put("A","one");
test.put("B","two");


// Use Anonymous Subclass to Initialize a HashMap
Map<Integer, String> mymap = new HashMap<Integer, String>() {
	{
		put(1, "one");
		put(2, "two");
	}
};

// Java 9
Map<Integer,String> map = Map.of(1, "A", 2, "B", 3, "C");