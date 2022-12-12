package ir.tamin.insurance.technical.business.occur;

import ir.tamin.framework.cdi.util.MessageBundle;
import ir.tamin.framework.core.util.Bundle;
import ir.tamin.framework.data.validation.ValidatorBean;
import ir.tamin.framework.domain.CollectionData;
import ir.tamin.framework.domain.Resource;
import ir.tamin.framework.domain.proxy.ProxyProcessingException;
import ir.tamin.framework.ws.rest.json.FilterWrapper;
import ir.tamin.framework.ws.rest.json.SortWrapper;
import ir.tamin.framework.ws.rest.proxy.AbstractEntityProxy;
import ir.tamin.framework.ws.rest.proxy.EntityProxy;
import ir.tamin.framework.ws.rest.security.TokenContext;
import ir.tamin.insurance.technical.business.user.UserManager;
import ir.tamin.insurance.technical.model.occur.TbOccurCause;
import ir.tamin.insurance.technical.model.occur.TbOccurType;
import ir.tamin.insurance.technical.model.occur.SsupOccurPartlist;
import ir.tamin.insurance.technical.model.occur.SsupOccurReview;
import ir.tamin.insurance.technical.model.user.OrgUser;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.inject.Named;
import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by a-khalighi.
*/
@Stateless
public class OccurReviewManager extends AbstractEntityProxy implements EntityProxy {

    @Inject
    private EntityManager entityManager;

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

        SsupOccurReview client = (SsupOccurReview) clientObject;
        SsupOccurReview domain = (SsupOccurReview) domainObject;
        OrgUser currentUser = userManager.getUserByName(tokenContext.getCurrentUser().getUsername());

        validateBranch(domain);
        if (client.getActionType() != null && client.getActionType().equalsIgnoreCase("1")) {
            domain.setInspworksended(client.getInspworksended());
            domain.setWorkinspletno(client.getWorkinspletno());
            domain.setWorkinspletdate(client.getWorkinspletdate());
            domain.setWshblameperc(client.getWshblameperc());
            domain.setIsublameperc(client.getIsublameperc());
            domain.setOtherblameperc(client.getOtherblameperc());
            domain.setOtherblamepercdesc(client.getOtherblamepercdesc());
            domain.setWshblameperclaw(client.getWshblameperclaw());
            domain.setIsublameperclaw(client.getIsublameperclaw());
            domain.setOtherblameperclaw(client.getOtherblameperclaw());
            domain.setOtherblamepercdesclaw(client.getOtherblamepercdesclaw());

            domain.setLegalReportUID(currentUser.getUserName());
            domain.setLegalReportDT(new Date());
        } else {
            validateStatus(domain);
            TbOccurType occurType = entityManager.find(TbOccurType.class, client.getOccurType().getTypeCode());
            if (occurType != null) {
                domain.setOccurType(occurType);
            } else {
                throw new ProxyProcessingException("OCCUR-DEBUG: OccurReviewManager.edit");
            }

            TbOccurCause occurCause = entityManager.find(TbOccurCause.class, client.getOccurCause().getCauseCode());
            if (occurCause != null) {
                domain.setOccurCause(occurCause);
            } else {
                throw new ProxyProcessingException("OCCUR-DEBUG: OccurReviewManager.edit");
            }

            List<SsupOccurPartlist> partlist = new ArrayList<>();
            entityManager.createNamedQuery("SsupOccurPartlist.deleteRelatedPartLists", SsupOccurPartlist.class)
                    .setParameter("reqId", client.getReqId())
                    .executeUpdate();
            for (SsupOccurPartlist part : client.getSsupOccurPartlist()) {
                part.setReqId(client.getReqId());
                partlist.add(part);
            }
            domain.setIsmarried(client.getIsmarried());
            domain.setEmployeedate(client.getEmployeedate());
            domain.setEmployeestat(client.getEmployeestat());
            domain.setVehicle(client.getVehicle());
            domain.setJobdesc(client.getJobdesc());
            domain.setIsujoblocation(client.getIsujoblocation());
            domain.setDailyWage(client.getDailyWage());
            domain.setJobFromDate(client.getJobFromDate());
            domain.setJobUntilDate(client.getJobUntilDate());
            domain.setMornStarttime(client.getMornStarttime());
            domain.setMornFinishtime(client.getMornFinishtime());
            domain.setEvenStarttime(client.getEvenStarttime());
            domain.setEvenFinishtime(client.getEvenFinishtime());
            domain.setNighStarttime(client.getNighStarttime());
            domain.setNighFinishtime(client.getNighFinishtime());
            domain.setOccurDate(client.getOccurDate());
            domain.setOccurTime(client.getOccurTime());
            domain.setOccurAddr(client.getOccurAddr());
            domain.setOccurJobdesc(client.getOccurJobdesc());
            domain.setOccurTools(client.getOccurTools());
            domain.setOccurEquip(client.getOccurEquip());
            domain.setOccurReason(client.getOccurReason());
            domain.setOccurRel(client.getOccurRel());
            domain.setIsrwDo95(client.getIsrwDo95());
            domain.setIsrwDo90(client.getIsrwDo90());
            domain.setIstrain(client.getIstrain());
            domain.setBrchCode(client.getBrchCode());
            domain.setOccurResult(client.getOccurResult());
            domain.setSsupOccurPartlist(client.getSsupOccurPartlist());
            domain.setFirstworkdate(client.getFirstworkdate());

            domain.setEdituid(currentUser.getUserName());

            domain.setEDITDT(new Date());
        }

        try {
            return super.edit(domain, domain);
        } catch (Exception e) {
            System.err.println("OCCUR-DEBUG: OccurReviewManager.edit." + e.getStackTrace()[0]);
            throw new ProxyProcessingException(e);
        }
    }

    @Override
    public Resource save(Resource clientObject) throws ProxyProcessingException {

        SsupOccurReview client = (SsupOccurReview) clientObject;
        OrgUser currentUser = userManager.getUserByName(tokenContext.getCurrentUser().getUsername());
        validateBranch(client);
        TbOccurType occurType = entityManager.find(TbOccurType.class, client.getOccurType().getTypeCode());
        if (occurType != null) {
            client.setOccurType(occurType);
        } else {
            throw new ProxyProcessingException("OCCUR-DEBUG: OccurReviewManager.save");
        }

        TbOccurCause occurCause = entityManager.find(TbOccurCause.class, client.getOccurCause().getCauseCode());
        if (occurCause != null) {
            client.setOccurCause(occurCause);
        } else {
            throw new ProxyProcessingException("OCCUR-DEBUG: OccurReviewManager.save");
        }

        client.setRepNo(client.getOccurRep().getRepNo());
        client.setCreateuid(currentUser.getUserName());
        client.setCreatedt(new Date());

        try {
            return super.save(client);
        } catch (Exception e) {
            System.err.println("OCCUR-DEBUG: OccurReviewManager.save." + e.getStackTrace()[0]);
            throw new ProxyProcessingException(e);
        }
    }

    @Override
    public CollectionData search(Class clazz, FilterWrapper fw, SortWrapper sw, Integer start, Integer limit, boolean includeCount) throws ProxyProcessingException {
        return super.search(clazz, fw, sw, start, limit, includeCount);
    }

    private void validateStatus(SsupOccurReview occurReview) throws ProxyProcessingException {

        if (!occurReview.getOccurRep().getStatus().equals("0")) {
            throw new ProxyProcessingException(bundle.getProperty("insurance.technical.occur.notAllowed"), new String[0]);
        }
    }

    private void validateBranch(SsupOccurReview occurReview) throws ProxyProcessingException {

        OrgUser user = userManager.getUserByName(tokenContext.getCurrentUser().getName());
        String org = user.getOrganization().getCode();

        if (!org.equals(occurReview.getOccurRep().getBrchReviewer().getBranchCode())) {
            throw new ProxyProcessingException(bundle.getProperty("insurance.technical.occur.notAllowed"), new String[0]);
        }
    }
}
