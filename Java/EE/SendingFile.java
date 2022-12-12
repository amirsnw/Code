public void doGet(HttpServletRequest req, HttpServletResponse res)
				  throws ServletException, IOException {
	res.setContentType(applicationjar);
	File f = new File(test.jar);
	byte[] bytearray = new byte[(int) f.length()];
	FileInputStream is = new FileInputStream(f);
	is.read(bytearray);
	OutputStream os = res.getOutputStream();
	os.write(bytearray);
	os.flush();
}