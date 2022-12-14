package com.control;

import javax.ejb.ApplicationException;

@ApplicationException(rollback = true)
public class CarStorageException extends Exception {

    public CarStorageException(String message) {
        super(message);
    }

}
