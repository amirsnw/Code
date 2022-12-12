import java.io.*;
import java.util.*;
import javax.servlet.*;
import javax.servlet.http.*;
public class ShowHeadersServlet extends HttpServlet
{
	public void doGet(HttpServletRequest req, HttpServletResponse res)
	throws ServletException, IOException {
		PrintWriter pw = res.getWriter();
		pw.println("<html>");
		pw.println("<head>");
		pw.println("</head>");
		pw.println("<body>");
		pw.println("<h3>Following are the headers that the
		server received.</h3><p>");
		Enumeration headers = req.getHeaderNames();
		while(headers.hasMoreElements())
		{
			String header = (String) headers.nextElement();
			String value = req.getHeader(header);
			pw.println(header+" = "+value+"<br>");
		}
		pw.println("</body>");
		pw.println("</html>");
	}
}