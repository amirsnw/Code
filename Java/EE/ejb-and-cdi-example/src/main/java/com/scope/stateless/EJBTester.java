package com.scope.stateless;

import com.scope.stateless.Book;
import com.scope.stateless.LibrarySessionBeanRemote;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.List;
import java.util.Properties;
import javax.naming.InitialContext;
import javax.naming.NamingException;

public class EJBTester {

    BufferedReader brConsoleReader = null;
    Properties props;
    InitialContext ctx;

    {
        props = new Properties();
        try {
            props.load(new FileInputStream("jndi.properties"));
        } catch (IOException ex) {
            ex.printStackTrace();
        }
        try {
            ctx = new InitialContext(props);
        } catch (NamingException ex) {
            ex.printStackTrace();
        }
        brConsoleReader =
                new BufferedReader(new InputStreamReader(System.in));
    }

    public static void main(String[] args) {

        EJBTester ejbTester = new EJBTester();

        ejbTester.testStatelessEjb();
    }

    private void showGUI() {
        System.out.println("**********************");
        System.out.println("Welcome to Book Store");
        System.out.println("**********************");
        System.out.print("Options \n1. Add Book\n2. Exit \nEnter Choice: ");
    }

    private void testStatelessEjb() {

        try {
            int choice = 1;

            LibrarySessionBeanRemote libraryBean =
                    (LibrarySessionBeanRemote) ctx.lookup("LibrarySessionBean/remote");

            while (choice != 2) {
                String bookName;
                showGUI();
                String strChoice = brConsoleReader.readLine();
                choice = Integer.parseInt(strChoice);
                if (choice == 1) {
                    System.out.print("Enter book name: ");
                    bookName = brConsoleReader.readLine();
                    Book book = new Book();
                    book.setName(bookName);
                    libraryBean.addBook(book.getName());
                } else if (choice == 2) {
                    break;
                }
            }

            List<Book> booksList = libraryBean.getBooks();

            System.out.println("Book(s) entered so far: " + booksList.size());

            int i = 0;
            for (Book book : booksList) {
                System.out.println((i + 1) + ". " + book.getName());
                i++;
            }

            LibrarySessionBeanRemote libraryBean1 =
                    (LibrarySessionBeanRemote) ctx.lookup("LibrarySessionBean/remote");

            List<String> booksList1 = libraryBean1.getBooks();
            System.out.println(
                    "***Using second lookup to get library stateless object***");
            System.out.println(
                    "Book(s) entered so far: " + booksList1.size());
            for (int j = 0; j < booksList1.size(); ++j) {
                System.out.println((j + 1) + ". " + booksList1.get(j));
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
            e.printStackTrace();
        } finally {
            try {
                if (brConsoleReader != null) {
                    brConsoleReader.close();
                }
            } catch (IOException ex) {
                System.out.println(ex.getMessage());
            }
        }
    }
}

        /*first client run:
        **********************
        Welcome to Book Store
        **********************
        Options
        1. Add Book
        2. Exit
        Enter Choice: 1
        Enter book name: Learn Java
        **********************
        Welcome to Book Store
        **********************
        Options
        1. Add Book
        2. Exit
        Enter Choice: 2
        Book(s) entered so far: 1
        1. Learn Java
        ***Using second lookup to get library stateless object***
        Book(s) entered so far: 0
        BUILD SUCCESSFUL (total time: 13 seconds)*/





        /*second client run:
        **********************
        Welcome to Book Store
        **********************
        Options
        1. Add Book
        2. Exit
        Enter Choice: 2
        Book(s) entered so far: 0
        ***Using second lookup to get library stateless object***
        Book(s) entered so far: 1
        1. Learn Java
        BUILD SUCCESSFUL (total time: 12 seconds)*/
