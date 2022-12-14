package ir.tamin.insurance.technical.business.occur;

import ir.tamin.framework.domain.CollectionData;
import ir.tamin.framework.domain.Resource;
import ir.tamin.framework.domain.proxy.ProxyProcessingException;
import ir.tamin.framework.ws.rest.json.Filter;
import ir.tamin.framework.ws.rest.json.FilterWrapper;
import ir.tamin.framework.ws.rest.json.SortWrapper;
import ir.tamin.framework.ws.rest.proxy.AbstractEntityProxy;
import ir.tamin.framework.ws.rest.proxy.DBFunctionProxy;
import ir.tamin.framework.ws.rest.proxy.EntityProxy;
import ir.tamin.framework.ws.rest.security.TokenContext;
import ir.tamin.insurance.technical.business.general.RestServices;
import ir.tamin.insurance.technical.business.user.UserManager;
import ir.tamin.insurance.technical.model.occur.OccurDocument;
import ir.tamin.insurance.technical.model.occur.OccurRep;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.inject.Named;
import javax.persistence.EntityManager;
import javax.xml.bind.DatatypeConverter;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * Created by a-khalighi on 5/17/2022
*/
@Stateless
@Named("OccurDocumentManager")
public class OccurDocumentManager extends AbstractEntityProxy implements EntityProxy {

    @Inject
    @Named("DefaultDBFunctionProxy")
    private DBFunctionProxy dbFunctionProxy;

    @Inject
    private EntityManager entityManager;

    @Inject
    private UserManager userManager;

    @Inject
    private TokenContext tokenContext;

    @Inject
    RestServices restServices;

    @Override
    public CollectionData search(Class clazz, FilterWrapper fw, SortWrapper sw, Integer start, Integer limit, boolean includeCount) throws ProxyProcessingException {

        Optional<Filter> reqIdFilter = null;
        CollectionData collectionData = null;
        List<OccurRep> requestDetailData = null;

        if (fw != null) {
            reqIdFilter = fw.getFilters().stream()
                    .filter(item -> item.getProperty().equals("reqId"))
                    .findFirst();
            if (!reqIdFilter.isPresent()) {
                throw new ProxyProcessingException();
            }
        } else {
            throw new ProxyProcessingException();
        }

        try {
            collectionData = super.search(clazz, fw, sw, start, limit, includeCount);
        } catch (Exception e) {
            System.err.println("OCCUR-DEBUG: OccurDocumentManager.search." + e.getStackTrace()[0]);
            throw new ProxyProcessingException(e);
        }

        collectionData.getList().forEach(item -> {
            ((OccurDocument) item).setImageString(DatatypeConverter.printBase64Binary(((OccurDocument) item).getImage()));
        });

        return collectionData;
    }

    @Override
    public Resource save(Resource clientObject) throws ProxyProcessingException {

        OccurDocument occurDocument = (OccurDocument) clientObject;
        String guid = UUID.randomUUID().toString();
        occurDocument.setGuid(guid);
        byte[] decoded = DatatypeConverter.parseBase64Binary(occurDocument.getImageString());
        occurDocument.setImage(decoded);

        try {
            return super.save(occurDocument);
        } catch (Exception e) {
            System.err.println("OCCUR-DEBUG: OccurDocumentManager.save." + e.getStackTrace()[0]);
            throw new ProxyProcessingException(e);
        }
    }

    @Override
    public void remove(Resource clientObject) throws ProxyProcessingException {
        OccurDocument occurRep = (OccurDocument) clientObject;
        try {
            super.remove(occurRep);
        } catch (Exception e) {
            System.err.println("OCCUR-DEBUG: OccurManager.remove." + e.getStackTrace()[0]);
            throw new ProxyProcessingException(e);
        }
    }
}
