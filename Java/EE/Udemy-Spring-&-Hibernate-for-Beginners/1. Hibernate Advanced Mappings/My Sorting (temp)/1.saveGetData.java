// create Java object
Student theStudent = new Student("john", "Doe", "john", "joen@luv2code.com");

// save it to database
int theId = (Integer) session.save(theStudent);

// now retrueve from database using the primary key
Strudent mystudent = session.get(Student.class, theId);

// get all objects
Query query = session.createQuery("from Student");
List<Student> students = query.list();