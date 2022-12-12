package ir.tamin.insurance.technical.business.guardian;

import ir.tamin.framework.domain.Resource;
import ir.tamin.framework.domain.proxy.ProxyProcessingException;
import ir.tamin.framework.ws.rest.proxy.AbstractEntityProxy;
import ir.tamin.framework.ws.rest.proxy.EntityProxy;

import javax.ejb.Stateless;
import javax.inject.Named;

@Stateless
@Named("GuardianTranslogProxy")
public class GuardianTranslogProxy  extends AbstractEntityProxy implements EntityProxy {

    @Override
    public Resource save(Resource clientObject) throws ProxyProcessingException {
        return super.save(clientObject);
    }
}
