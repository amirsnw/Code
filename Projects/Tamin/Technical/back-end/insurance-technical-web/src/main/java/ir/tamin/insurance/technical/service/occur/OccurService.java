package ir.tamin.insurance.technical.service.occur;

import ir.tamin.framework.cdi.util.MessageBundle;
import ir.tamin.framework.core.persistence.ProcedureManager;
import ir.tamin.framework.core.util.Bundle;
import ir.tamin.framework.domain.proxy.ProxyProcessingException;
import ir.tamin.framework.ws.rest.json.Filter;
import ir.tamin.framework.ws.rest.json.FilterWrapper;
import ir.tamin.framework.ws.rest.proxy.DBFunctionProxy;
import ir.tamin.framework.ws.rest.proxy.EntityProxy;
import ir.tamin.insurance.technical.business.general.RestServices;
import ir.tamin.insurance.technical.function.baseinfo.GeneralFunctionResult;
import ir.tamin.insurance.technical.function.occur.GetOccurideaSeq;
import ir.tamin.insurance.technical.function.occur.GetOccurideaSeqInput;
import ir.tamin.insurance.technical.function.occur.GetWorkshopAddres;
import ir.tamin.insurance.technical.function.occur.GetWorkshopAddresInput;
import ir.tamin.insurance.technical.model.occur.OccurDocument;
import ir.tamin.insurance.technical.model.occur.OccurRep;
import ir.tamin.insurance.technical.util.DateUtils;

import javax.annotation.Resource;
import javax.ejb.EJBContext;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.inject.Named;
import javax.persistence.EntityManager;
import javax.xml.bind.DatatypeConverter;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;


/**
 * Created by a-khalighi on 5/17/2022
 */
@Stateless
public class OccurService {

    @Resource
    private EJBContext context;

    @MessageBundle
    @Named("WebMessages")
    private Bundle bundle;

    @Inject
    @Named("DefaultDBFunctionProxy")
    private DBFunctionProxy dbFunctionProxy;

    @Inject
    private EntityManager entityManager;

    @Inject
    @Named("ProcedureManager")
    private ProcedureManager procedureManager;

    @Inject
    private RestServices restServices;

    @Inject
    @Named("OccurManager")
    private EntityProxy occurManager;

    /*public FnReturn getWorkShopAddres(String branchCode, String prwshid) throws Exception {

        FnReturn fnReturn = new FnReturn();
        this.dbFunctionProxy.setProcedureManager(procedureManager);
        GeneralFunctionResult addresslst = (GeneralFunctionResult) dbFunctionProxy.execute(new GetWorkshopAddres(), new GetWorkshopAddresInput(branchCode, prwshid, DateUtils.format(new Date(), "yyyyMMdd")));
        fnReturn.setAddress(addresslst.getResult().toString());

        GeneralFunctionResult employerName = (GeneralFunctionResult) dbFunctionProxy.execute(new GetWshMasterFrst(), new GetWshMasterFrstInput(branchCode, prwshid, DateUtils.format(new Date(), "yyyyMMdd")));
        fnReturn.setEmployerName(employerName.getResult().toString());

        String activitydesc = (String) entityManager.createNativeQuery(" select a.activitydesc from  regworkshopspec r , tb_activity a where  r.brch_code=? and  r.rwshid=? and  a.activitycode=r.activitycode ")
                .setParameter(1, branchCode)
                .setParameter(2, prwshid)
                .getSingleResult();

        fnReturn.setActivitydesc(activitydesc);

        return fnReturn;
    }*/

    public String getWorkshopDetail(String branchCode, String prwshid) throws ProxyProcessingException {

        GeneralFunctionResult address = null;
        // Map<String, Object> workshopSpec = null;
        this.dbFunctionProxy.setProcedureManager(procedureManager);

        /* Calling package to get workshop address */
        try {
            address = (GeneralFunctionResult) dbFunctionProxy.execute(new GetWorkshopAddres(),
                    new GetWorkshopAddresInput(branchCode, prwshid, DateUtils.format(new Date(), "yyyyMMdd")));
        } catch (Exception e) {
            System.err.println("OCCUR-DEBUG: OccurService.getWorkshopDetail." + e.getStackTrace()[0]);
            throw new ProxyProcessingException(e);
        }

        /* Calling workshop rest service to get workshop employer */
        /*try {
            workshopSpec = restServices.getWorkshopSpec(prwshid, branchCode);
            Optional<HashMap<String, Object>> stackHolder =
                    ((List<HashMap<String, Object>>) workshopSpec.get("stackHolders")).stream()
                    .filter(sh -> "3".equals(sh.get("stackType")))
                    .findAny();
            employerUser = restServices.getUserByName(stackHolder.get().get("nationalId").toString());
            fnReturn.setEmployerName(employerUser.getFirstName() + " " + employerUser.getLastName());
        } catch (Exception e) {
            System.err.println("OCCUR-DEBUG: OccurService.getWorkShopAddres." + e.getStackTrace()[0]);
            throw new ProxyProcessingException(bundle.getProperty("insurance.technical.occur.NOT_FOUND"), new String[0]);
        }*/


        /* Validating workshop data */
        /*if (address.getResult() == null) {
            throw new ProxyProcessingException(bundle.getProperty("insurance.technical.occur.workshop.address.INVALID"), new String[0]);
        }*/

        return address.getResult();
    }

    public String getOccurideaSeq(String reqId) throws ProxyProcessingException {

        this.dbFunctionProxy.setProcedureManager(procedureManager);
        try {
            GeneralFunctionResult addresslst = (GeneralFunctionResult) dbFunctionProxy.execute(new GetOccurideaSeq(), new GetOccurideaSeqInput(reqId));
            return addresslst.getResult().toString();
        } catch (Exception e) {
            System.err.println("OCCUR-DEBUG: OccurService.getOccurideaSeq." + e.getStackTrace()[0]);
            throw new ProxyProcessingException(e);
        }
    }

    public Boolean eServiceSave(OccurRep occurRep) {

        try {
            occurManager.save(occurRep);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public String saveOccurDocument(OccurDocument document) {
        String guid = UUID.randomUUID().toString();
        byte[] decoded = DatatypeConverter.parseBase64Binary(document.getImageString());
        OccurDocument entity = new OccurDocument();
        entity.setGuid(guid);
        entity.setImage(decoded);
        entity.setReqId(document.getReqId());
        entityManager.persist(entity);
        return entity.getGuid();

    }

    public String getSingleOccurDocument(String guid) {
        OccurDocument entity = new OccurDocument();
        entity.setGuid(guid);
        entity = entityManager.find(OccurDocument.class, entity);
        String stringDocument = DatatypeConverter.printBase64Binary(entity.getImage());
        return stringDocument;
        // String stringDocument = Base64.encodeAsString(file.getImage());
        // return ResponseHelper.ok(file);
    }

    public List<OccurDocument> getAllOccurDocument(FilterWrapper filters) throws Exception {

        Optional<Filter> reqIdFilter = null;
        if (filters != null) {
            reqIdFilter = filters.getFilters().stream()
                    .filter(item -> item.getProperty().equalsIgnoreCase("reqId"))
                    .findFirst();
        } else {
            throw new Exception("Getting Image Failed.");
        }
        if (!reqIdFilter.isPresent()) {
            throw new Exception("Getting Image Failed.");
        }
        List<OccurDocument> documentList = entityManager.createNamedQuery("OccurDocument.findByReqId")
                .setParameter("reqId", reqIdFilter.get().getValue())
                .getResultList();

//        documentList = documentList.stream().map(item -> {
//            item.setImageString(DatatypeConverter.printBase64Binary(item.getImage()));
//            return item;
//        }).collect(Collectors.toList());
        return documentList;
    }

    public boolean sendReportToUCM(byte[] reportFile, String userName, String branchCode, String identityCode, String type) {
        restServices.sendReportToUCM(reportFile, userName, branchCode, identityCode, type);
        return false;
    }
}
