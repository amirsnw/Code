package com.scope.stateful;

import java.util.ArrayList;
import java.util.List;
import javax.ejb.Stateful;

@Stateful
public class LibraryStatefulSessionBean implements LibraryStatefulSessionBeanRemote {

    List<String> bookShelf;

    public LibraryStatefulSessionBean() {
        bookShelf = new ArrayList<String>();
    }

    public void addBook(String bookName) {
        bookShelf.add(bookName);
    }

    public List<String> getBooks() {
        return bookShelf;
    }
}
