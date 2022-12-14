/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.insurance.technical.service.general;

import com.fasterxml.jackson.databind.ObjectMapper;
import ir.tamin.framework.cdi.util.WebProperties;
import ir.tamin.framework.core.util.Bundle;
import ir.tamin.insurance.technical.model.user.OrgUser;

import javax.inject.Inject;
import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.WebTarget;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.IOException;

/**
 *
 * @author s_naghavi
 */
class RestService {
      @Inject
    @WebProperties
    Bundle serviceBundle;

    String sessionId;

    public String getResponse(String url, String json) {
        String output = null;

        Client client = ClientBuilder.newClient();

        WebTarget webResource = client.target(url);

        Response response = webResource
                .request(MediaType.APPLICATION_JSON)
                .header("Content-Type", MediaType.APPLICATION_JSON)
                .get();
        if (response.getStatus() != 200) {
            throw new RuntimeException("Failed : HTTP error code : "
                    + response.getStatus());
        }
        output = response.readEntity(String.class);
        return output;
    }

    public String getResource(String property) {
        String resource = "";
        resource = serviceBundle.getProperty(property);
        return resource;
    }

    public OrgUser getUserByName(String userName) {
        try {
            String url;
            //url = getResource("oim.service.url.useres.info");
            url = "http://soa-develop.tamin.org:7001/portal/api/users1/user/";
            url = url + userName + "/fullinfo";
            String output = getResponse(url, null);
            ObjectMapper mapper = new ObjectMapper();
            OrgUser user = mapper.readValue(output, OrgUser.class);
            return user;
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

}
