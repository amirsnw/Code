import javax.servlet.*;
import javax.servlet.http.*;
public class NonCachingRequestWrapper extends HttpServletRequestWrapper {

	public NonCachingRequestWrapper(HttpServletRequest req) {
		super(req);
	}
	
	public String getHeader(String name) {
		// hide only the If-Modified-Since header
		// and return the actual value for other headers
		if(name.equals("If-Modified-Since")) {
			return null;
		}
		else {
			return super.getHeader(name);
		}
	}
}