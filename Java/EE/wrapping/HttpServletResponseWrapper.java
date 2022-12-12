import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;

public class TextResponseWrapper
extends HttpServletResponseWrapper
{
	//This inner class creates a ServletOutputStream that
	//dumps everything that is written to it to a byte array
	//instead of sending it to the client.
	private static class ByteArrayServletOutputStream extends ServletOutputStream {
		ByteArrayOutputStream baos;
		ByteArrayServletOutputStream(ByteArrayOutputStream baos) {
			this.baos = baos;
		}
		public void write(int param) throws java.io.IOException {
			baos.write(param);
		}
	}
	
	//the actual ByteArrayOutputStream object that is used by
	//the PrintWriter as well as ServletOutputStream
	private ByteArrayOutputStream baos = new ByteArrayOutputStream();
	
	//This print writer is built over the ByteArrayOutputStream.
	private PrintWriter pw = new PrintWriter(baos);
	
	//This ServletOutputStream is built over the ByteArrayOutputStream.
	private ByteArrayServletOutputStream basos = new ByteArrayServletOutputStream(baos);
	
	/* methods */
	
	public TextResponseWrapper(HttpServletResponse response) {
		super(response);
	}
	
	public PrintWriter getWriter() {
		//Returns our own PrintWriter that writes to a byte array
		//instead of returning the actual PrintWriter associated
		//with the response.
		return pw;
	}
	
	public ServletOutputStream getOutputStream() {
		//Returns our own ServletOutputStream that writes to a
		//byte array instead of returning the actual
		//ServletOutputStream associated with the response.
		return basos;
	}
	
	byte[] toByteArray() {
		return baos.toByteArray();
	}
}