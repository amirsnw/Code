package ir.tamin.insurance.technical.business.refund;

import ir.tamin.framework.domain.CollectionData;
import ir.tamin.framework.domain.proxy.ProxyProcessingException;
import ir.tamin.framework.ws.rest.json.FilterWrapper;
import ir.tamin.framework.ws.rest.json.SortWrapper;
import ir.tamin.framework.ws.rest.proxy.AbstractEntityProxy;
import ir.tamin.framework.ws.rest.proxy.EntityProxy;

import javax.ejb.Stateless;
import javax.inject.Named;

/**
 *
 * @author m_hoseini
 */
@Stateless
@Named("RefundReasonManager")
public class RefundReasonManager extends AbstractEntityProxy implements EntityProxy {
    @Override
    public CollectionData search(Class clazz, FilterWrapper fw, SortWrapper sw, Integer start, Integer limit, boolean includeCount) throws ProxyProcessingException {
        return super.search(clazz, fw, sw, start, limit, includeCount);
    }
}
