package com.scope.singletone;

import javax.ejb.Singleton;
import javax.ejb.Startup;
import java.util.List;

@Singleton
@Startup
public class CountryStateContainerManagedBean implements CountryState {
    @Override
    public List<String> getStates(String country) {
        return null;
    }

    @Override
    public void setStates(String country, List<String> states) {

    }
}
