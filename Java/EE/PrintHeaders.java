public void service(HttpServletRequest req,
					HttpServletResponse res) {
	Enumeration headers = req.getHeaderNames();
	while (headers.hasMoreElements()) {
		String header = (String) headers.nextElement();
		String value = req.getHeader(header);
		System.out.println(header+" = "+value);
	}
	}