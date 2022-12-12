public void service(HttpServletRequest req, HttpServletResponse res)
					throws javax.servlet.ServletException, java.io.IOException {
	res.setContentType("application/jar");
	OutputStream os = res.getOutputStream();
	//1K buffer
	byte[] bytearray = new byte[1024];
	ServletContext context = getServletContext();
	URL url = context.getResource("/files/test.jar");
	InputStream is = url.openStream();
	int bytesread = 0;
	while( (bytesread = is.read(bytearray) ) != -1 )
	{
		os.write(bytearray, 0, bytesread);
	}
	os.flush();
	is.close();
}