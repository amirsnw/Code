/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.service.common;

import ir.tamin.framework.cdi.util.WebProperties;
import ir.tamin.framework.core.util.Bundle;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import javax.ejb.Stateless;
import javax.inject.Inject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.apache.commons.codec.binary.Base64;

/**
 *
 * @author s_maknooni
 */
@Stateless
public class FTPService {

    @Inject
    @WebProperties
    private Bundle webBundle;

    private final Logger logger = LoggerFactory.getLogger(FTPService.class);

    public InputStream returnFileStream(String fileName) throws IOException {

        URL url = null;
        InputStream inputStream = null;
        try {

            String server = webBundle.getProperty("treasury.sadad.ftp.server");
            String user = webBundle.getProperty("treasury.sadad.userName");
            String pass = webBundle.getProperty("treasury.sadad.ftp.password");

            String authString = user + ":" + pass;
            byte[] authEncBytes = Base64.encodeBase64(authString.getBytes("utf-8"));
            String authStringEnc = new String(authEncBytes);
            logger.error(authStringEnc);
//            byte[] message = (user + ":" + pass).getBytes("UTF-8");
//            String authStringEnc = javax.xml.bind.DatatypeConverter.printBase64Binary(message);           

//            url = new URL("https://dts.sadad.co.ir/tamin_ejtemaei/akhza/taminEj_980903%20-%20AllData.xlsx");
            url = new URL(server + fileName);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestProperty("Authorization", "Basic " + authStringEnc);
            inputStream = conn.getInputStream();

//            inputStream = url.openStream();
//            InputStream myInputStream = new FileInputStream("C:\\Users\\s_maknooni\\Downloads\\taminEj_971205.xlsx");
            return inputStream;
        } catch (MalformedURLException ex) {
            logger.error("*********************** no protocol is specified, or an unknown protocol is found.url is : " + url, ex);
            return null;
        } catch (IOException ex) {
            logger.error("*********************** I/O exception occurs when openConnection to address : " + url, ex);
            return null;
        } catch (Exception ex) {
            logger.error("*********************** Unknown exception occurs when openConnection to address : " + url, ex);
            return null;
        } 

    }

}
