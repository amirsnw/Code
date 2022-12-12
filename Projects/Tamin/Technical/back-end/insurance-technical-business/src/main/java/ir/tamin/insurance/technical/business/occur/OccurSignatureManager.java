package ir.tamin.insurance.technical.business.occur;

import ir.tamin.framework.domain.CollectionData;
import ir.tamin.framework.domain.Resource;
import ir.tamin.framework.domain.proxy.ProxyProcessingException;
import ir.tamin.framework.ws.rest.json.FilterWrapper;
import ir.tamin.framework.ws.rest.json.SortWrapper;
import ir.tamin.framework.ws.rest.proxy.AbstractEntityProxy;
import ir.tamin.framework.ws.rest.proxy.DBFunctionProxy;
import ir.tamin.framework.ws.rest.proxy.EntityProxy;
import ir.tamin.framework.ws.rest.security.TokenContext;
import ir.tamin.insurance.technical.business.general.RestServices;
import ir.tamin.insurance.technical.business.user.UserManager;
import ir.tamin.insurance.technical.model.Roles;
import ir.tamin.insurance.technical.model.occur.OccurSignature;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.inject.Named;
import javax.persistence.EntityManager;
import javax.xml.bind.DatatypeConverter;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

/**
 * Created by a-khalighi on 5/17/2022
*/
@Stateless
@Named("OccurSignatureManager")
public class OccurSignatureManager extends AbstractEntityProxy implements EntityProxy {

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

        try {
            return super.search(clazz, fw, sw, start, limit, includeCount);
        } catch (Exception e) {
            System.err.println("OCCUR-DEBUG: OccurSignatureManager.search." + e.getStackTrace()[0]);
            throw new ProxyProcessingException(e);
        }
    }

    @Override
    public Resource save(Resource clientObject) throws ProxyProcessingException {

        OccurSignature occurSignature = (OccurSignature) clientObject;
        String guid = UUID.randomUUID().toString();
        occurSignature.setGuid(guid);
        byte[] decoded = DatatypeConverter.parseBase64Binary(occurSignature.getImageString());
        occurSignature.setImage(decoded);

        List<String> roles = Arrays.asList(tokenContext.getCurrentUser().getRoles());
        if (roles.contains(Roles.HEAD_USER_TECH)) {
            occurSignature.setRoleType("2");
        } else if (roles.contains(Roles.INSPECTOR_USER_TECH)) {
            occurSignature.setRoleType("1");
        } else {
            throw new ProxyProcessingException();
        }
        occurSignature.setStatus("1");
        try {
            return super.save(occurSignature);
        } catch (Exception e) {
            System.err.println("OCCUR-DEBUG: OccurSignatureManager.save." + e.getStackTrace()[0]);
            throw new ProxyProcessingException(e);
        }
    }
}
