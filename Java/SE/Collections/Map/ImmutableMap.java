Map<Integer,String> mymap = new HashMap<>();
mymap.put(1,"one");
mymap.put(2,"two");
mymap.put(3,"three");
Map<Integer,String> immutableMap = Collections.unmodifiableMap(mymap);