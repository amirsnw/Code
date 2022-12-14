package ir.tamin.incomeBank.service.centralPayment.bankfile.builder;

import ir.tamin.incomeBank.model.baseinfo.OperationalBankEnum;
import ir.tamin.incomeBank.model.centralPayment.BankFileInputModel;
import ir.tamin.incomeBank.service.centralPayment.TempBankControlFileService;
import ir.tamin.incomeBank.service.jdbc.StoredProcedure;
import java.math.BigDecimal;
import java.sql.SQLException;
import java.sql.Types;
import java.util.Arrays;
import java.util.List;
import javax.inject.Inject;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Response;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public abstract class AbstractBankFileBuilder implements BankFileBuilder {

    @Inject
    private StoredProcedure procedure;

    @Inject
    private TempBankControlFileService tempBankControlFileService;

    private static final Logger logger = LoggerFactory.getLogger(AbstractBankFileBuilder.class);

    @Override
    public boolean accept(BankFileInputModel bankFileInputModel) {
        if (getBank().getCode().equals(bankFileInputModel.getBankCode())) {
            return true;
        }
        return false;
    }

    @Override
    public BankFile buildBankFile(BankFileInputModel bankFileInputModel) {
        return buildFileContent(bankFileInputModel);
    }

    @Override
    public BankFile buildBankControllerFile(BankFileInputModel bankFileInputModel) {
        return buildControllerFile(bankFileInputModel);
    }

    public void beforeBuildControllerFileContent(List<String> headIdList, boolean isIranian) {
        // 1 : if  this payHeadId(s) does not have records in cp_temp_bank_control_file :
        // a : call PCK_CP_BNK_ACC_CONTROL_SERVICE.createControlList

        StringBuilder selectedHeadIds = new StringBuilder();

        BigDecimal payHeadId;
        for (String id : headIdList) {
            payHeadId = BigDecimal.valueOf(Long.parseLong(id));
            long count = tempBankControlFileService.getCountByHeadId(payHeadId);
            if (count == 0) {//2
                selectedHeadIds.append(id);
                selectedHeadIds.append(",");
            }

        }
        //1 : a
        if (!selectedHeadIds.toString().isEmpty()) { // one or some list , do not have records in temp file.so run package first.
            procedure.query("{ ? = call PCK_CP_BNK_ACC_CONTROL_SERVICE.createControlList(?,?)}");
            procedure.setOutParameter(1, Types.NUMERIC)
                    .setInParameter(2, selectedHeadIds.toString().substring(0, selectedHeadIds.toString().length() - 1))
                    .setInParameter(3, (isIranian == true ? 2 : 3));

            try {
                procedure.execute();

                String packeageResult = procedure.getOutParameter(1).toString();
                if (!packeageResult.equals("1")) {
                    String errorMessage = " خطا درافزودن رکورد به جدول موقت فایل کنترلی.لطفا به نمایش شرح وقایع رجوع کنید.شناسه لیست ها :  " + headIdList.toString();
                    logger.error(errorMessage);
                    Response response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(errorMessage).build();
                    throw new WebApplicationException(response);
                }

            } catch (SQLException ex) {
                String errorMessage = "خطای غیر منتظره در اجرای متد ایجاد فایل کنترلی برای لیست های با شناسه : " + headIdList.toString();
                logger.error(errorMessage, ex);
                Response response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(errorMessage).build();
                throw new WebApplicationException(response);
            }
        }
    }

    protected abstract BankFile buildFileContent(BankFileInputModel bankFileInputModel);

    protected abstract BankFile buildControllerFile(BankFileInputModel bankFileInputModel);

    protected abstract OperationalBankEnum getBank();

}
