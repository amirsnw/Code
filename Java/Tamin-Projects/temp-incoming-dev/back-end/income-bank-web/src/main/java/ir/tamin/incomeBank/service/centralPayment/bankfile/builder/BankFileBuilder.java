package ir.tamin.incomeBank.service.centralPayment.bankfile.builder;

import ir.tamin.incomeBank.model.centralPayment.BankFileInputModel;

public interface BankFileBuilder {

    boolean accept(BankFileInputModel bankFileInputModel);

    BankFile buildBankFile(BankFileInputModel bankFileInputModel);

    BankFile buildBankControllerFile(BankFileInputModel bankFileInputModel);
}
