package ir.tamin.insurance.technical.business.occur;

import ir.tamin.framework.cdi.util.MessageBundle;
import ir.tamin.framework.core.util.Bundle;
import ir.tamin.framework.domain.Resource;
import ir.tamin.framework.domain.proxy.ProxyProcessingException;
import ir.tamin.framework.ws.rest.proxy.AbstractEntityProxy;
import ir.tamin.framework.ws.rest.proxy.EntityProxy;
import ir.tamin.framework.ws.rest.security.TokenContext;
import ir.tamin.insurance.technical.business.user.UserManager;
import ir.tamin.insurance.technical.model.occur.OccurRep;
import ir.tamin.insurance.technical.model.occur.SsupOccurIdea;
import ir.tamin.insurance.technical.model.user.OrgUser;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.inject.Named;
import javax.persistence.EntityManager;
import java.util.Arrays;
import java.util.Date;

/**
 * Created by a-khalighi on 5/17/2022
*/
@Stateless
public class OccurIdeaManager extends AbstractEntityProxy implements EntityProxy {

    @Inject
    private UserManager userManager;

    @Inject
    private TokenContext tokenContext;

    @Inject
    @MessageBundle
    @Named("WebMessages")
    private Bundle bundle;

    @Override
    public Resource edit(Resource clientObject, Resource domainObject) throws ProxyProcessingException {

        SsupOccurIdea client = (SsupOccurIdea) clientObject;
        SsupOccurIdea domain = (SsupOccurIdea) domainObject;
        OrgUser currentUser = userManager.getUserByName(tokenContext.getCurrentUser().getUsername());
        OccurRep occurRep = getOccurRep(domain.getReqId());

        validateEdit(occurRep, client);
        switch (client.getReqType()) {
            case 1:
                domain.setEdituid(currentUser.getUserName());
                domain.setEditdt(new Date());
                domain.setTechinspdate(client.getTechinspdate());
                domain.setFulltechinspreport(client.getFulltechinspreport());
                domain.setTechinspinwork(client.getTechinspinwork());
                break;
            case 2:
                domain.setTechConfUid(currentUser.getUserName());
                domain.setTechConfDt(new Date());
                domain.setBossRemark(client.getBossRemark());
                domain.setBossStatus(client.getBossStatus());
                break;
        }

        try {
            switch (client.getReqType()) {
                case 1:
                    if (client.getTechinspinwork().equals("3")) {
                        occurRep.setStatus("3");
                        occurRep.setActionType("3");
                        occurRep.setEdituid(currentUser.getUserName());
                        occurRep.setEditdt(new Date());
                        super.edit(occurRep, occurRep);
                    }
                    return super.edit(domain, domain);
                case 2:
                    occurRep.setStatus(client.getBossStatus());
                    occurRep.setActionType("3");
                    occurRep.setEdituid(currentUser.getUserName());
                    occurRep.setEditdt(new Date());
                    super.edit(occurRep, occurRep);
                    return super.edit(domain, domain);
                default:
                    return super.edit(domain, domain);
            }
        } catch (Exception e) {
            System.err.println("OCCUR-DEBUG: OccurIdeaManager.edit." + e.getStackTrace()[0]);
            throw new ProxyProcessingException(e);
        }
    }

    @Override
    public Resource save(Resource clientObject) throws ProxyProcessingException {

        OrgUser currentUser = userManager.getUserByName(tokenContext.getCurrentUser().getUsername());
        SsupOccurIdea occurIdea = (SsupOccurIdea) clientObject;

        validateBranch(getOccurRep(occurIdea.getReqId()));
        occurIdea.setCreateuid(currentUser.getUserName());
        occurIdea.setCreatedt(new Date());

        try {
            return super.save(occurIdea);
        } catch (Exception e) {
            System.err.println("OCCUR-DEBUG: OccurIdeaManager.save." + e.getStackTrace()[0]);
            throw new ProxyProcessingException(e);
        }
    }

    @Override
    public void remove(Resource clientObject) throws ProxyProcessingException {

        SsupOccurIdea occurIdea = (SsupOccurIdea) clientObject;
        validateBranch(getOccurRep(occurIdea.getReqId()));
        try {
            super.remove(occurIdea);
        } catch (Exception e) {
            System.err.println("OCCUR-DEBUG: OccurIdeaManager.remove." + e.getStackTrace()[0]);
            throw new ProxyProcessingException(e);
        }
    }

    private void validateEdit(OccurRep occurRep, SsupOccurIdea occurIdea) throws ProxyProcessingException {

        validateBranch(occurRep);
        switch (occurIdea.getReqType()) {
            case 1:
                if (occurIdea.getBossStatus() != null) {
                    throw new ProxyProcessingException(bundle.getProperty("insurance.technical.occur.notAllowed"), new String[0]);
                }
                break;
            case 2:
                break;
        }
    }

    private void validateBranch(OccurRep occurRep) throws ProxyProcessingException {

        OrgUser currentUser = userManager.getUserByName(tokenContext.getCurrentUser().getUsername());
        String org = currentUser.getOrganization().getCode();
        if (!org.equals(occurRep.getBrchReviewer().getBranchCode())) {
            throw new ProxyProcessingException(bundle.getProperty("insurance.technical.occur.notAllowed"), new String[0]);
        }
    }

    private OccurRep getOccurRep(long reqId) throws ProxyProcessingException {

        OccurRep occurRep = null;
        try {
            occurRep = new OccurRep();
            occurRep.setReqId(reqId);
            return (OccurRep) super.get(occurRep);
        } catch (Exception e) {
            System.err.println("OCCUR-DEBUG: OccurIdeaManager.getOccurRep." + e.getStackTrace()[0]);
            throw new ProxyProcessingException(e);
        }
    }
}
