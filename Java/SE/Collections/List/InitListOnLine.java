	@Test
public void givenArraysAsList_thenInitialiseList() {
    List<String> list = Arrays.asList("foo", "bar");
 
    assertTrue(list.contains("foo"));
}

	@Test
public void givenArraysAsList_whenCreated_thenShareReference(){
    String[] array = {"foo", "bar"};
    List<String> list = Arrays.asList(array);
    array[0] = "baz";
 
    assertEquals("baz", list.get(0));
}

// Java 8
	@Test
public void givenStream_thenInitializeList(){
    List<String> list = Stream.of("foo", "bar")
      .collect(Collectors.toList());
		
    assertTrue(list.contains("foo"));
}


// Java 9

List<String> list = List.of("foo", "bar", "baz");
Set<String> set = Set.of("foo", "bar", "baz");
