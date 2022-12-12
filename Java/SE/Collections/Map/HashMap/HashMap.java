import java.util.HashMap;
import java.util.Map;
 
public class App {
 
    public static void main(String[] args) {
 
        HashMap<Integer, String> map = new HashMap<Integer, String>();
         
        map.put(5, "Five");
        map.put(8, "Eight");
        map.put(6, "Six");
        map.put(4, "Four");
        map.put(2, "Two");
         
        String text = map.get(6);
         
        System.out.println(text);
         
		 /*
		If we need just the keys in a map, keySet is a good option. 
		However, there's a faster way to get both the keys and values. 
		(Using Map.entrySet Instead of Map.keySet)
		*/
		// Map.Entry stores both the key and value together in one class
		// Note: Streaming over the entrySet and working with Entry 
		// objects is more efficient and can require less code.
        for(Map.Entry<Integer, String> entry: map.entrySet()) {
            int key = entry.getKey();
            String value = entry.getValue();
             
            System.out.println(key + ": " + value);
        }
         
    }
}