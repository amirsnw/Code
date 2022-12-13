package com.scope.singletone;

import javax.ejb.Local;
import java.util.List;

@Local
public interface CountryState {
    List<String> getStates(String country);
    void setStates(String country, List<String> states);
}
