/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.service.asnad;

import javax.ejb.Stateless;
import ir.tamin.incomeBank.model.asnad.AsnadCalcReturnModel;
import ir.tamin.incomeBank.model.asnad.AsnadCalcInputModel;
import ir.tamin.incomeBank.model.asnad.CalcCustTypeReturnModel;
import ir.tamin.incomeBank.model.asnad.OrganizationModel;
import ir.tamin.incomeBank.model.centralPayment.CalcBankReturnModel;
import ir.tamin.incomeBank.util.DateUtils;
import ir.tamin.framework.cdi.util.MessageBundle;
import ir.tamin.framework.core.util.Bundle;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import javax.inject.Inject;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Response;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 *
 * @author h_riazat
 */
@Stateless
public class AsnadPayCalcService {

    private final static Logger logger = LoggerFactory.getLogger(AsnadPayCalcService.class);

    @Inject
    @MessageBundle
    Bundle messageBundle;

    @Inject
    VwAsnadPaymentListService vwAsnadPaymentListService;

    public AsnadCalcReturnModel totalAmount(AsnadCalcInputModel asnadCalcInputModel) {
        AsnadCalcReturnModel asnadCalcReturnModel = new AsnadCalcReturnModel();
        try {
            //-------custTypes-------
            StringBuilder custTypesBuilder = new StringBuilder();
            for (CalcCustTypeReturnModel calcCustTypeReturnModel : asnadCalcInputModel.getCalcCustTypeReturnModelList()) {
                custTypesBuilder.append(calcCustTypeReturnModel.getCustType());
                custTypesBuilder.append(",");
            }
            String custTypes = custTypesBuilder.toString();
            custTypes = custTypes.substring(0, custTypes.length() - 1);
            String[] custTypesArray = custTypes.split(",");
            List<String> custTypesList = Arrays.asList(custTypesArray);
            //-------banks-------
            StringBuilder banksBuilder = new StringBuilder();
            for (CalcBankReturnModel calcBankReturnModel : asnadCalcInputModel.getCalcBankList()) {
                banksBuilder.append(calcBankReturnModel.getBank().getBankCode());
                banksBuilder.append(",");
            }
            String banks = banksBuilder.toString();
            banks = banks.substring(0, banks.length() - 1);
            String[] banksArray = banks.split(",");
            List<String> banksList = Arrays.asList(banksArray);
            //-------custsNo-------
            StringBuilder custsNoBuilder = new StringBuilder();
            for (OrganizationModel organizationModel : asnadCalcInputModel.getOrgList()) {
                custsNoBuilder.append(organizationModel.getCustNo());
                custsNoBuilder.append(",");
            }
            String custsNo = custsNoBuilder.toString();
            custsNo = custsNo.substring(0, custsNo.length() - 1);
            String[] custsNoArray = custsNo.split(",");
            List<String> custsNoArrayList = Arrays.asList(custsNoArray);
            //   asnadCalcReturnModel = vwAsnadPaymentListService.getTotalAmount(custTypesList, banksList, custsNoArrayList, asnadCalcInputModel.getFromYearMonth(), asnadCalcInputModel.getToYearMonth(), asnadCalcInputModel.getPayType(), asnadCalcInputModel.getWwwStatus(), asnadCalcInputModel.getOwnershipList(), asnadCalcInputModel.getPercent(), asnadCalcInputModel.getParTypeList(), asnadCalcInputModel.getCustName());
        } catch (Exception e) {
            logger.error("**** error in pension calculateTotalAmount", e);
            Response response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(messageBundle.getProperty("coreaccount.calculate.EXC_ERROR_IN_CALCULATION")).build();
            throw new WebApplicationException(response);
        }
        asnadCalcReturnModel.setCreateDate(new Date());
        asnadCalcReturnModel.setCreateDateString(DateUtils.getJalaliStandard(new Date(), "/"));
        return asnadCalcReturnModel;
    }

    public AsnadCalcReturnModel totalWithGroupByBank(AsnadCalcInputModel asnadCalcInputModel) {
        AsnadCalcReturnModel asnadCalcReturnModel = new AsnadCalcReturnModel();
        try {
            //-------custTypes-------
            StringBuilder custTypesBuilder = new StringBuilder();
            for (CalcCustTypeReturnModel calcCustTypeReturnModel : asnadCalcInputModel.getCalcCustTypeReturnModelList()) {
                custTypesBuilder.append(calcCustTypeReturnModel.getCustType());
                custTypesBuilder.append(",");
            }
            String custTypes = custTypesBuilder.toString();
            custTypes = custTypes.substring(0, custTypes.length() - 1);
            String[] custTypesArray = custTypes.split(",");
            List<String> custTypesList = Arrays.asList(custTypesArray);
            //-------banks-------
            StringBuilder banksBuilder = new StringBuilder();
            for (CalcBankReturnModel calcBankReturnModel : asnadCalcInputModel.getCalcBankList()) {
                banksBuilder.append(calcBankReturnModel.getBank().getBankCode());
                banksBuilder.append(",");
            }
            String banks = banksBuilder.toString();
            banks = banks.substring(0, banks.length() - 1);
            String[] banksArray = banks.split(",");
            List<String> banksList = Arrays.asList(banksArray);
            //-------custsNo-------
            StringBuilder custsNoBuilder = new StringBuilder();
            for (OrganizationModel organizationModel : asnadCalcInputModel.getOrgList()) {
                custsNoBuilder.append(organizationModel.getCustNo());
                custsNoBuilder.append(",");
            }
            String custsNo = custsNoBuilder.toString();
            custsNo = custsNo.substring(0, custsNo.length() - 1);
            String[] custsNoArray = custsNo.split(",");
            List<String> custsNoArrayList = Arrays.asList(custsNoArray);
            //   asnadCalcReturnModel = vwAsnadPaymentListService.getTotalWithGroupByBank(custTypesList, banksList, custsNoArrayList, asnadCalcInputModel.getFromYearMonth(), asnadCalcInputModel.getToYearMonth(), asnadCalcInputModel.getPayType(), asnadCalcInputModel.getWwwStatus(), asnadCalcInputModel.getOwnershipList(), asnadCalcInputModel.getPercent(), asnadCalcInputModel.getParTypeList(), asnadCalcInputModel.getCustName());
        } catch (Exception e) {
            logger.error("**** error in pension calculateTotalWithGroupByBank", e);
            Response response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(messageBundle.getProperty("coreaccount.calculate.EXC_ERROR_IN_CALCULATION")).build();
            throw new WebApplicationException(response);
        }
        asnadCalcReturnModel.setCreateDate(new Date());
        asnadCalcReturnModel.setCreateDateString(DateUtils.getJalaliStandard(new Date(), "/"));
        return asnadCalcReturnModel;
    }

    public AsnadCalcReturnModel totalWithGroupByCustType(AsnadCalcInputModel asnadCalcInputModel) {
        AsnadCalcReturnModel asnadCalcReturnModel = new AsnadCalcReturnModel();
        try {
            //-------custTypes-------
            StringBuilder custTypesBuilder = new StringBuilder();
            for (CalcCustTypeReturnModel calcCustTypeReturnModel : asnadCalcInputModel.getCalcCustTypeReturnModelList()) {
                custTypesBuilder.append(calcCustTypeReturnModel.getCustType());
                custTypesBuilder.append(",");
            }
            String custTypes = custTypesBuilder.toString();
            custTypes = custTypes.substring(0, custTypes.length() - 1);
            String[] custTypesArray = custTypes.split(",");
            List<String> custTypesList = Arrays.asList(custTypesArray);
            //-------banks-------
            StringBuilder banksBuilder = new StringBuilder();
            for (CalcBankReturnModel calcBankReturnModel : asnadCalcInputModel.getCalcBankList()) {
                banksBuilder.append(calcBankReturnModel.getBank().getBankCode());
                banksBuilder.append(",");
            }
            String banks = banksBuilder.toString();
            banks = banks.substring(0, banks.length() - 1);
            String[] banksArray = banks.split(",");
            List<String> banksList = Arrays.asList(banksArray);
            //-------custsNo-------
            StringBuilder custsNoBuilder = new StringBuilder();
            for (OrganizationModel organizationModel : asnadCalcInputModel.getOrgList()) {
                custsNoBuilder.append(organizationModel.getCustNo());
                custsNoBuilder.append(",");
            }
            String custsNo = custsNoBuilder.toString();
            custsNo = custsNo.substring(0, custsNo.length() - 1);
            String[] custsNoArray = custsNo.split(",");
            List<String> custsNoArrayList = Arrays.asList(custsNoArray);
            //    asnadCalcReturnModel = vwAsnadPaymentListService.getTotalWithGroupByCustType(custTypesList, banksList, custsNoArrayList, asnadCalcInputModel.getFromYearMonth(), asnadCalcInputModel.getToYearMonth(), asnadCalcInputModel.getPayType(), asnadCalcInputModel.getWwwStatus(), asnadCalcInputModel.getOwnershipList(), asnadCalcInputModel.getPercent(), asnadCalcInputModel.getParTypeList(), asnadCalcInputModel.getCustName());
        } catch (Exception e) {
            logger.error("**** error in pension calculateTotalWithGroupByCustType", e);
            Response response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(messageBundle.getProperty("coreaccount.calculate.EXC_ERROR_IN_CALCULATION")).build();
            throw new WebApplicationException(response);
        }
        asnadCalcReturnModel.setCreateDate(new Date());
        asnadCalcReturnModel.setCreateDateString(DateUtils.getJalaliStandard(new Date(), "/"));
        return asnadCalcReturnModel;
    }

}
