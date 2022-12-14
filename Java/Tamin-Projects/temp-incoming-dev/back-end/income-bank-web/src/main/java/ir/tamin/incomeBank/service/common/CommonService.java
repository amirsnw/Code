/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.service.common;

import ir.tamin.incomeBank.model.identityManager.MessageBody;

import java.io.*;
import java.util.ArrayList;
import java.util.Date;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.persistence.EntityManager;

import ir.tamin.incomeBank.util.DateUtils;
import ir.tamin.framework.cdi.util.WebProperties;
import ir.tamin.framework.core.util.Bundle;
import org.apache.commons.net.ftp.FTP;
import org.apache.commons.net.ftp.FTPClient;
import org.apache.poi.hssf.usermodel.HSSFPalette;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.HSSFColor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import ir.tamin.incomeBank.model.identityManager.User;

/**
 * @author s_maknooni
 */
@Stateless
public class CommonService {

    @Inject
    EntityManager entityManager;
    @Inject
    @WebProperties
    Bundle webBundle;

    private final static Logger logger = LoggerFactory.getLogger(CommonService.class);

    public MessageBody getMessageBody(ArrayList<String> cellPhones, String msgStr) {
        MessageBody messageBody = new MessageBody();
        messageBody.setCellPhones(cellPhones);
        messageBody.setMessageText(msgStr);
        messageBody.setType("CoreAccount");
        return messageBody;
    }

//    public void deleteFromSelectedTempByKey(String key) {
//        try {
//            String stringQuery = "delete from  TB_SELECTED_TEMP t where t.KEY = ?key";
//            Query query = entityManager.createNativeQuery(stringQuery);
//            query.setParameter("key", key);
//            query.executeUpdate();
//        } catch (Exception ex) {
//            logger.debug("Exception in deleting temp by key :  " + key);
//            ex.printStackTrace();
//        }
//    }
//
//    public void insertIntoTempByKey(TbSelectedTemp temp) {
//        try {
//            entityManager.persist(temp);
//        } catch (Exception ex) {
//            logger.debug("Exception in inserting temp by key :  " + temp.getKey() + " and code : " + temp.getSelectedCode());
//            ex.printStackTrace();
//        }
//    }
    public boolean checkUserAccessibility(String brchCode, User user) {
        String userBranchCode = "";
        if (user != null && user.getOrganization() != null) {
            userBranchCode = user.getOrganization().getCode();
        }
        if (brchCode != null && !brchCode.isEmpty() && brchCode.equals(userBranchCode)) {
            return true;
        } else {
            return false;
        }
    }

    public String FTPUploadFileDemo(InputStream stream, String name, String formatFile) {
        Date today = new Date();
        String message = "";
        String todayString = DateUtils.getJalaliStandard(today, "");

        String server = webBundle.getProperty("refah.ftp.ip");
        int port = Integer.parseInt(webBundle.getProperty("refah.ftp.port"));
        String user = webBundle.getProperty("refah.ftp.userName");
        String pass = webBundle.getProperty("refah.ftp.password");

        boolean done = false;

        String fileName = name + "(" + todayString + ")" + formatFile;
        FTPClient ftpClient = new FTPClient();
        try {
            ftpClient.connect(server, port);
            ftpClient.login(user, pass);
            ftpClient.enterLocalPassiveMode();
            ftpClient.setFileType(FTP.BINARY_FILE_TYPE);
            String firstRemoteFile = "/tamin/" + fileName;
            done = ftpClient.storeFile(firstRemoteFile, stream);

            if (!done) {
                String replyMessage = ftpClient.getReplyString();

                message = "متاسفانه به دلیل خطا با کد  " + replyMessage + " پیش آمده فایل مورد نظر به سرور بانک انتقال پیدا نکرد.لطفا مجددا سعی نمایید و یا به مدیر سیستم اطلاع دهید.";
            }

        } catch (IOException ex) {
            System.out.println("Error in Sending file to FTP Server: " + ex.getMessage());
            ex.printStackTrace();
        } finally {
            try {
                if (ftpClient.isConnected()) {
                    ftpClient.logout();
                    ftpClient.disconnect();
                }
            } catch (IOException ex) {
                ex.printStackTrace();
            }
        }
        return message;
    }
    public boolean isEdareKol(User user) {
        return user.isEdareKol();
    }

    public HSSFColor setColor(HSSFWorkbook workbook, byte r, byte g, byte b, short index) {
        HSSFPalette palette = workbook.getCustomPalette();
        HSSFColor hssfColor = null;
        try {
            hssfColor = palette.findColor(r, g, b);
            if (hssfColor == null) {
                palette.setColorAtIndex(index, r, g, b);
                hssfColor = palette.getColor(index);
            }
        } catch (Exception e) {
        }
        return hssfColor;
    }

}
