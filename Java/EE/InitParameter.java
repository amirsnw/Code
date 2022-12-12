import java.io.*;
import java.util.*;
import java.sql.*;
import javax.servlet.*;
import javax.servlet.http.*;
public class TestServlet extends HttpServlet
{
Connection dbConnection;

public void init() {
	System.out.println(getServletName()+" : Initializing...");
	ServletConfig config = getServletConfig();
	String driverClassName =
	config.getInitParameter("driverclassname");
	String dbURL = config.getInitParameter("dburl");
	String username = config.getInitParameter("username");
	String password = config.getInitParameter("password");
	//Load the driver class
	Class.forName(driverClassName);
	//get a database connection
	dbConnection =
	DriverManager.getConnection(dbURL,username,password);
	System.out.println("Initialized.");
	}
	public void service(HttpServletRequest req,
	HttpServletResponse res) throws ServletException, java.io.IOException {
		//get the requested data from the database and
		//generate an HTML page.
	}
	public void destroy()
	{
		try {
			dbConnection.close();
		}
		catch(Exception e) {
			e.printStackTrace();
		}
	}
}