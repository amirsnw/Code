package ir.tamin.insurance.technical.service;

import ir.tamin.framework.cdi.util.MessageBundle;
import ir.tamin.framework.core.util.Bundle;
import ir.tamin.framework.domain.proxy.ProxyProcessingException;
import ir.tamin.framework.ws.rest.json.Filter;
import ir.tamin.framework.ws.rest.json.FilterWrapper;
import ir.tamin.framework.ws.rest.proxy.EntityProxy;
import ir.tamin.framework.ws.rest.security.TokenContext;
import ir.tamin.insurance.technical.business.general.RestServices;
import ir.tamin.insurance.technical.business.user.UserManager;
import ir.tamin.insurance.technical.model.guardian.Guardian;
import ir.tamin.insurance.technical.model.guardian.GuardianDocument;
import ir.tamin.insurance.technical.model.insurance.InsuranceRegisteration;
import ir.tamin.insurance.technical.model.occur.OccurDocument;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.inject.Named;
import javax.persistence.EntityManager;
import javax.ws.rs.core.Response;
import javax.xml.bind.DatatypeConverter;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.logging.Level;
import java.util.logging.Logger;

@Stateless
public class GuardianService {

    @Inject
    private EntityManager entityManager;
    @Inject
    private UserManager userManager;

    @Inject
    @Named("GuardianSpecProxy")
    private EntityProxy GuardianSpecProxy;

    @Inject
    RestServices restServices;

    @Inject
    private TokenContext tokenContext;

    @Inject
    @MessageBundle
    @Named("WebMessages")
    Bundle bundle;

    @Inject
    @Named("GuardianDocumentManager")
    private EntityProxy guardianDocumentManager;

    public Guardian getGuardianOverBranch(String reqSerial) {
        try {
            List<Guardian> list = entityManager.createQuery("select g from Guardian g where g.reqSerial=:no")
                    .setParameter("no", reqSerial)
                    .getResultList();
            return list.get(0);
        } catch (Exception e) {
            System.out.println(e.toString());
        }
        return null;
    }

    public Boolean taminSave(Guardian clientObject, String username) {
        try {
            Logger.getLogger(Guardian.class.getName()).log(Level.INFO, "enter tamin saveeee ");
            Guardian guardian = (Guardian) clientObject;
            if (!isDuplicateItems(guardian.getReqNo())) {
                entityManager.persist(guardian);
            }
            return true;
        } catch (Exception e) {
            Logger.getLogger(Guardian.class.getName()).log(Level.INFO, "enter tamin saveeee Exception");
            return false;
        }
    }

    private boolean isDuplicateItems(String reqNo) {
        try {
            long count = (long) entityManager.createNamedQuery("Guardian.countByReqNo")
                    .setParameter("reqNo", reqNo)
                    .getSingleResult();
            return count > 0L;
        } catch (Exception e) {
            return false;
        }
    }

    public Boolean taminUpdate(Guardian clientObject, String username) {
        try {
            Guardian guardian = (Guardian) clientObject;
            Guardian guardianNew = entityManager.find(Guardian.class, guardian.getReqSerial());
            guardianNew.setStatus(guardian.getStatus());
            entityManager.merge(guardianNew);
            return true;
        } catch (Exception e) {
            return false;

        }
    }

    public Boolean getRequests(String nationalId, String guardianType, String requestType) {
        try {
            List<Guardian> ls = entityManager.createNamedQuery("Guardian.findByReqStatus")
                    //                    .setParameter("status", '1')
                    //                     .setParameter("guardianType", "x")
                    .setParameter("nationalCode", nationalId)
                    .setParameter("requestType", requestType.charAt(0))
                    .getResultList();
            if (!ls.isEmpty()) {
                for (Guardian item : ls) {
                    if (item.getStatus().equals('0') || item.getStatus().equals('2')) {

                        if ((item.getGuardianType().equals('1') || item.getGuardianType().equals('4')) && guardianType.equals("1")) {
                            //throw new ProxyProcessingException("شما مجاز به ثبت درخواست نمی باشید.", new String[0]);
                            return false;
                        } else if ((item.getGuardianType().equals('2') || item.getGuardianType().equals('4')) && guardianType.equals("2")) {
                            return false;
                        } else if (item.getGuardianType().equals('3') && guardianType.equals("3")) {
                            return false;
                        } else if ((item.getGuardianType().equals('4') || item.getGuardianType().equals('1') || item.getGuardianType().equals('2')) && guardianType.equals("4")) {
                            return false;
                        }
                    } else if (item.getStatus().equals('1')) {

                        if ((item.getGuardianType().equals('1') || item.getGuardianType().equals('4')) && guardianType.equals("1")) {
                            return true;
                        } else if ((item.getGuardianType().equals('2') || item.getGuardianType().equals('4')) && guardianType.equals("2")) {
                            return true;
                        } else if (item.getGuardianType().equals('3') && guardianType.equals("3")) {
                            return true;
                        } else if ((item.getGuardianType().equals('4') || item.getGuardianType().equals('1') || item.getGuardianType().equals('2')) && guardianType.equals("4")) {
                            return true;
                        }
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return true;
    }

    public String getEguardianReq(String eRequestId) {
        try {
            String protestDesc = (String) entityManager.createNativeQuery("select g.PROTEST_DESC from techins.eguardian_req g where g.reqid=?")
                    .setParameter(1, eRequestId)
                    .getSingleResult();
            return protestDesc;
        } catch (Exception e) {
            System.out.println(e.toString());
        }
        return null;
    }

    public String getInsuranceRegisteration(String nationalCode, String branchCode) {
        try {
            InsuranceRegisteration insuranceRegisteration = (InsuranceRegisteration) entityManager.createQuery("select g from InsuranceRegisteration g where  g.nationalId = :nationalCode and g.brchCode = :branchCode ")
                    .setParameter("nationalCode", nationalCode)
                    .setParameter("branchCode", branchCode)
                    .getSingleResult();
            return insuranceRegisteration.getLastName() + " " + insuranceRegisteration.getFirstName();
        } catch (Exception e) {
            System.out.println(e.toString());
        }
        return null;
    }

    public String getGuardianSpecService(String gnationalCode, String gnationalCode2, String guardianType, String reqSerial, String eRequestId) throws ProxyProcessingException, Exception {
        String firstResult = null;
        String secondResult = null;
        String result = null;
        try {
            if (gnationalCode != null) {
                firstResult = restServices.GetInsuranceInquiry(gnationalCode, guardianType);
                if (firstResult == "NO" && guardianType.equalsIgnoreCase("4")) {
                    if (gnationalCode2 != null) {
                        secondResult = restServices.GetInsuranceInquiry(gnationalCode2, guardianType);
                    }
                }
            } else if (gnationalCode2 != null) {
                firstResult = "NO";
                secondResult = restServices.GetInsuranceInquiry(gnationalCode2, guardianType);
            } else {
				firstResult = "NO";
				secondResult = "NO";
			}
            Guardian guardian = new Guardian();
            guardian = entityManager.find(Guardian.class, String.valueOf(reqSerial));

            if (firstResult != null || secondResult != null) {
                if ((!"NO".equalsIgnoreCase(firstResult) && firstResult != null)
                        || (!"NO".equalsIgnoreCase(secondResult) && secondResult != null)) {
                    //  if (eRequestId != null && !eRequestId.equalsIgnoreCase("null")) {
                    //      restServices.updateEguardianRequest(guardian.geteRequestId(), "استعلام از سایر صندوق ها", "4", "0037");
                    //  }
                    //  guardian.setStatus('4');
                }
                guardian.setPensionFundsCode(firstResult != null && secondResult == null ? firstResult : secondResult);
                entityManager.merge(guardian);
            }

        } catch (Exception e) {
            throw new ProxyProcessingException(bundle.getProperty("insurance.technical.guardian.InquiryCashDesk"), new String[0]);
        }
        result = (firstResult != null && !firstResult.equalsIgnoreCase("NO")) ? firstResult : secondResult;
        return result;
    }

    public void deleteGuardianDocument(String guid) throws ProxyProcessingException {

        GuardianDocument guardianDocument = entityManager.find(GuardianDocument.class, guid);
        guardianDocumentManager.remove(guardianDocument);
    }
}
