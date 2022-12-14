package ir.tamin.incomeBank.service.centralPayment.bankfile.builder;

import ir.tamin.incomeBank.model.centralPayment.BankFileInputModel;
import javax.enterprise.inject.Instance;
import javax.inject.Inject;

public class CompositeBankFileBuilder implements BankFileBuilder {

    @Inject
    private Instance<AbstractBankFileBuilder> builders;

    @Override
    public boolean accept(BankFileInputModel bankFileInputModel) {
        return true;
    }

    @Override
    public BankFile buildBankFile(BankFileInputModel bankFileInputModel) {
        for (AbstractBankFileBuilder builder : builders) {
            if (builder.accept(bankFileInputModel)) {
                return builder.buildBankFile(bankFileInputModel);
            }
        }
        throw new IllegalArgumentException("bankFile_notInOperativeBanks");
    }

    @Override
    public BankFile buildBankControllerFile(BankFileInputModel bankFileInputModel) {
        for (AbstractBankFileBuilder builder : builders) {
            if (builder.accept(bankFileInputModel)) {
                return builder.buildBankControllerFile(bankFileInputModel);
            }
        }
        throw new IllegalArgumentException("bankFile_notInOperativeBanks");
    }

}
