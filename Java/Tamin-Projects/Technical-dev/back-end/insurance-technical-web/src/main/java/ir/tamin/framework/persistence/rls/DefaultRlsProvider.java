package ir.tamin.framework.persistence.rls;

import ir.tamin.framework.core.persistence.rls.RlsProvider;
import ir.tamin.framework.domain.Entity;
import ir.tamin.framework.ws.rest.json.Filter;

import javax.enterprise.context.RequestScoped;

/**
 * Created by s_tayari on 10/1/2018.
 */
@RequestScoped
public class DefaultRlsProvider implements RlsProvider {

    @Override
    public Filter getRlsFilter(Class<? extends Entity> entityClass) {
        return null;
    }
}
