/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.service.accounting.GL;

import java.math.BigDecimal;
import javax.enterprise.inject.Instance;
import javax.inject.Inject;

/**
 *
 * @author s_maknooni
 */
public class CompositeGLService implements GLService {

    @Inject
    private Instance<AbstractGLService> services;

    @Override
    public void controlAccCode(BigDecimal payHeadId, Integer systemId, String username) {
        for (AbstractGLService service : services) {
            if (service.accept(systemId)) {
                service.preControlAccCode(payHeadId, systemId);
                service.controlAccCode(payHeadId, systemId, username);
                return;
            }
        }
        throw new IllegalArgumentException("invalidSystemId");

    }

    @Override
    public boolean hasAccNull(BigDecimal payHeadId, Integer systemId) {
        for (AbstractGLService service : services) {
            if (service.accept(systemId)) {
                return service.hasAccNull(payHeadId, systemId);
            }
        }
        throw new IllegalArgumentException("invalidSystemId");
    }

    @Override
    public void updateCheckInfo(BigDecimal payHeadId, Integer systemId, String chequeNo, String chequeDate) throws Exception {
        for (AbstractGLService service : services) {
            if (service.accept(systemId)) {
                service.updateCheckInfo(payHeadId, systemId, chequeNo, chequeDate);
                return;
            }
        }
        throw new IllegalArgumentException("invalidSystemId");
    }

    @Override
    public void issuDoc(BigDecimal payHeadId, Integer systemId, String username) {
        for (AbstractGLService service : services) {
            if (service.accept(systemId)) {
                service.issuDoc(payHeadId, systemId, username);
                return;
            }
        }
        throw new IllegalArgumentException("invalidSystemId");
    }

    @Override
    public void deleteFromInt(BigDecimal payHeadId, String payDocNo, Integer systemId) throws Exception {
        for (AbstractGLService service : services) {
            if (service.accept(systemId)) {
                service.deleteFromInt(payHeadId, payDocNo, systemId);
                return;
            }
        }
        throw new IllegalArgumentException("invalidSystemId");
    }

    @Override
    public void deleteAllFromInt(BigDecimal payHeadId, Integer systemId) {
        for (AbstractGLService service : services) {
            if (service.accept(systemId)) {
                service.deleteAllFromInt(payHeadId, systemId);
                return;
            }
        }
        throw new IllegalArgumentException("invalidSystemId");
    }

}
