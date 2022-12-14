package ir.tamin.incomeBank.model.identityManager;

import java.io.Serializable;
import java.util.ArrayList;

/**
 *
 * @author s_maknooni
 */
public class MessageBody implements Serializable {

      private String messageText;
    private ArrayList<String> cellPhones;
    private String type;

    public String getMessageText() {
        return messageText;
    }

    public void setMessageText(String messageText) {
        this.messageText = messageText;
    }

    public ArrayList<String> getCellPhones() {
        return cellPhones;
    }

    public void setCellPhones(ArrayList<String> cellPhones) {
        this.cellPhones = cellPhones;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
