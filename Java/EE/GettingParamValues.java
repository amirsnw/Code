public void doPost(HttpServletRequest req,
				   HttpServletResponse res)
	{
		String searchString = req.getParameter("searchstring");
		String[] stateList = req.getParameterValues("state");
		//use the values and generate appropriate response
	}