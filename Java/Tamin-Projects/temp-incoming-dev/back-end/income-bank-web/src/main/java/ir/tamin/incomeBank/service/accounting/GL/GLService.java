/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.service.accounting.GL;

import java.math.BigDecimal;

/**
 *
 * @author s_maknooni a service for doing all Acc Operation by/from GL.
 */
public interface GLService {

    void controlAccCode(BigDecimal payHeadId, Integer systemId, String username);

    boolean hasAccNull(BigDecimal payHeadId, Integer systemId);

    void updateCheckInfo(BigDecimal payHeadId, Integer systemId, String chequeNo, String ChequeDate) throws Exception;

    void issuDoc(BigDecimal payHeadId, Integer systemId, String username);

    void deleteFromInt(BigDecimal payHeadId, String payDocNo, Integer systemId) throws Exception;

    void deleteAllFromInt(BigDecimal payHeadId, Integer systemId);

}
