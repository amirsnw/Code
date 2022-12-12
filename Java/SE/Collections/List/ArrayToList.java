String s = "lorem,ipsum,dolor,sit,amet";

List<String> myList = new ArrayList<String>(Arrays.asList(s.split(",")));

System.out.println(myList);  // prints [lorem, ipsum, dolor, sit, amet]