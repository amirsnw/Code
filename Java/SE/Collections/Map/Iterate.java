import java.util.HashMap;
import java.util.Iterator;  
public class SortHashMapByKeys  
	{  
	public static void main(String args[]) {
		//implementation of HashMap  
		HashMap<Integer, String> hm=new HashMap<Integer, String>();  
		//addding keys and values to HashMap  
		hm.put(23, "Yash");  
		hm.put(17, "Arun");  
		hm.put(15, "Swarit");  
		hm.put(9, "Neelesh");  
		Iterator <Integer> it = hm.keySet().iterator();  
		while(it.hasNext()) {  
			int key=(int)it.next();  
			System.out.println("Roll no:  "+key+"     name:   "+hm.get(key));  
		}
		
		
		/*************************/
		 for (Map.Entry<String, String> entry : params.entrySet()) {
          result.append(URLEncoder.encode(entry.getKey(), "UTF-8"));
          result.append("=");
          result.append(URLEncoder.encode(entry.getValue(), "UTF-8"));
          result.append("&");
        }
	}
}  