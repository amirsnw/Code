package ir.tamin.insurance.technical.business.guardian;

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
import ir.tamin.insurance.technical.model.guardian.GuardianDocument;

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
@Named("GuardianDocumentManager")
public class GuardianDocumentManager extends AbstractEntityProxy implements EntityProxy {

    @Inject
    @Named("DefaultDBFunctionProxy")
    private DBFunctionProxy dbFunctionProxy;

    @Override
    public CollectionData search(Class clazz, FilterWrapper fw, SortWrapper sw, Integer start, Integer limit, boolean includeCount) throws ProxyProcessingException {

        Optional<Filter> reqSerialFilter = null;
        CollectionData collectionData = null;

        if (fw != null) {
            reqSerialFilter = fw.getFilters().stream()
                    .filter(item -> item.getProperty().equals("reqSerial"))
                    .findFirst();
            if (!reqSerialFilter.isPresent()) {
                throw new ProxyProcessingException();
            }
        } else {
            throw new ProxyProcessingException();
        }

        try {
            collectionData = super.search(clazz, fw, sw, start, limit, includeCount);
        } catch (Exception e) {
            System.err.println("GUARDIAN-DEBUG: GuardianDocumentManager.search." + e.getStackTrace()[0]);
            throw new ProxyProcessingException(e);
        }

        collectionData.getList().forEach(item -> {
            ((GuardianDocument) item).setBlobString(DatatypeConverter.printBase64Binary(((GuardianDocument) item).getBlob()));
        });

        return collectionData;
    }

    @Override
    public Resource save(Resource clientObject) throws ProxyProcessingException {

        GuardianDocument guardianDocument = (GuardianDocument) clientObject;
        String guid = UUID.randomUUID().toString();
        guardianDocument.setGuid(guid);
        byte[] decoded = DatatypeConverter.parseBase64Binary(guardianDocument.getBlobString());
        guardianDocument.setBlob(decoded);

        try {
            return super.save(guardianDocument);
        } catch (Exception e) {
            System.err.println("GUARDIAN-DEBUG: GuardianDocumentManager.save." + e.getStackTrace()[0]);
            throw new ProxyProcessingException(e);
        }
    }

    @Override
    public void remove(Resource domainObject) throws ProxyProcessingException {
        GuardianDocument guardianDocument = (GuardianDocument) domainObject;
        try {
            super.remove(guardianDocument);
        } catch (Exception e) {
            System.err.println("GUARDIAN-DEBUG: GuardianDocumentManager.remove." + e.getStackTrace()[0]);
            throw new ProxyProcessingException(e);
        }
    }
}
