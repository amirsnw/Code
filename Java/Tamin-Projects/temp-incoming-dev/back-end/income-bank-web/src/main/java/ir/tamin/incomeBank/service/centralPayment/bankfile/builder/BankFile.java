package ir.tamin.incomeBank.service.centralPayment.bankfile.builder;

import java.io.UnsupportedEncodingException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class BankFile {

    private Logger logger = LoggerFactory.getLogger(getClass());

    public static final String TXT_EXTENSION = ".txt";
    public static final String DAT_EXTENSION = ".dat";
    public static final String PAY_EXTENSION = ".pay";
    public static final String FD_EXTENSION = ".fd";
//    public static final String NEW_LINE = "\r\n";
//    public static final String NEW_LINE = System.getProperty("line.separator");;
    public static final String NEW_LINE = System.lineSeparator();

    private String name;
    private byte[] content;
    private String extension;

    public BankFile(String name, String content, String extension) {
        this.name = name;
        try {
            this.content = content.getBytes("UTF-8");
        } catch (UnsupportedEncodingException e) {
            logger.error(e.getMessage(), e);
        }
        this.extension = extension;
    }

    public String getFullName() {
        return name + extension;
    }

    public byte[] getContent() {
        return content;
    }

    public void setContent(byte[] content) {
        this.content = content;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getExtension() {
        return extension;
    }

    public void setExtension(String extension) {
        this.extension = extension;
    }
}
