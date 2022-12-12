public class Book {
    private String title;
    private String author;

    public Book(String title, String author) {
        this.title = title;
        this.author = author;
    }
    ...
	
// Single Tuple
Map.Entry<String, Book> tuple = new AbstractMap
	.SimpleEntry<>("9780134685991", new Book("Effective Java 3d Edition", "Joshua Bloch"));
	
// Ordered list of tuples
List<Map.Entry<String, Book>> orderedTuples = new ArrayList<>();

orderedTuples.add(new AbstractMap.SimpleEntry<>("1", 
  new Book("Effective Java 3d Edition", "Joshua Bloch")));
orderedTuples.add(new AbstractMap.SimpleEntry<>("2", 
  new Book("Clean Code","Robert C Martin")));
  
// Compare with map
orderedTuples.add(new AbstractMap.SimpleEntry<>("1", 
  new Book("Effective Java 3d Edition", "Joshua Bloch")));
orderedTuples.add(new AbstractMap.SimpleEntry<>("2", 
  new Book("Clean Code","Robert C Martin")));
orderedTuples.add(new AbstractMap.SimpleEntry<>("2", 
  new Book("Clean Code", "Robert C Martin")));
  
for (Map.Entry<String, Book> tuple : orderedTuples) {
    System.out.println("key: " + tuple.getKey() + " value: " + tuple.getValue());
}

/* output
key: 9780134685991 value: Book{title='Effective Java 3d Edition', author='Joshua Bloch'}
key: 9780132350884 value: Book{title='Clean Code', author='Robert C Martin'}
key: 9780132350884 value: Book{title='Clean Code', author='Robert C Martin'}
*/