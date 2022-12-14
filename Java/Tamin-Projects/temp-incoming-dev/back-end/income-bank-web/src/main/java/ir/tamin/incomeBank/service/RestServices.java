/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import ir.tamin.incomeBank.model.baseinfo.RegistrationReturnModel;
import ir.tamin.incomeBank.model.centralPayment.sign.ReturnResultModel;
import ir.tamin.incomeBank.model.centralPayment.sign.RightelSignModel;
import ir.tamin.incomeBank.model.identityManager.*;
import ir.tamin.incomeBank.service.jdbc.StoredProcedure;
import ir.tamin.incomeBank.util.TextUtils;
import ir.tamin.framework.cdi.util.MessageBundle;
import ir.tamin.framework.cdi.util.WebProperties;
import ir.tamin.framework.core.util.Bundle;
import ir.tamin.framework.weblogic.oauth.oltu.client.AccessTokenManager;
import ir.tamin.framework.ws.rest.json.FilterWrapper;
import org.apache.http.NameValuePair;
import org.apache.http.client.utils.URLEncodedUtils;
import org.apache.http.message.BasicNameValuePair;
import org.glassfish.jersey.client.ClientProperties;
import org.json.JSONObject;

import javax.inject.Inject;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.Entity;
import javax.ws.rs.client.WebTarget;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.MultivaluedHashMap;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.Response;
import java.io.IOException;
import java.io.Serializable;
import java.math.BigDecimal;
import java.sql.SQLException;
import java.sql.Types;
import java.util.*;
import org.slf4j.LoggerFactory;

/**
 * @author s_maknooni
 */
public class RestServices implements Serializable {

    @Inject
    @WebProperties
    private Bundle serviceBundle;

    @Inject
    StoredProcedure procedure;

    @Inject
    @MessageBundle
    Bundle messageBundle;

    @Inject
    @WebProperties
    private Bundle webBundle;

    private static final org.slf4j.Logger logger = LoggerFactory.getLogger(RestServices.class);

    public Response getResponseRep(String url, String json) {
//        String output = null;

        Client client = ClientBuilder.newClient();

        WebTarget webResource = client.target(url);

        return webResource
                .request(MediaType.APPLICATION_JSON)
                //                .header("Content-Type", MediaType.APPLICATION_JSON)
                .header("Accept", "application/pdf")
                .get();

//        Response response = webResource
//                .request(MediaType.APPLICATION_JSON)
////                .header("Content-Type", MediaType.APPLICATION_JSON)
//                                .header("Accept", "application/pdf")
//                .get();
//        if (response.getStatus() != 200) {
////            logger.error();
//            throw new RuntimeException("Failed : HTTP error code : "
//                    + response.getStatus());
//        }
//        output = response.readEntity(String.class);
//        return output;
    }

    public String getResponse(String url, String json) {
        String output;

        Client client = ClientBuilder.newClient();

        WebTarget webResource = client.target(url);

        Response response = webResource
                .request(MediaType.APPLICATION_JSON)
                .header("Content-Type", MediaType.APPLICATION_JSON)
                //                .header("Accept", "application/pdf")
                .get();
        if (response.getStatus() != 200) {
//            logger.error();
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

    public Map<String, Object> getOrganizationsMap(FilterWrapper filter, Integer start, Integer limit) {
        try {
            String url;
            url = getResource("oim.service.url.organization");
            List<NameValuePair> nameValuePairs = new ArrayList<>();
            ObjectMapper mapper = new ObjectMapper();
            if (start != null) {
                nameValuePairs.add(new BasicNameValuePair("start", start.toString()));
            }
            if (limit != null) {
                nameValuePairs.add(new BasicNameValuePair("limit", limit.toString()));
            }
            if (filter != null) {
                nameValuePairs.add(new BasicNameValuePair("filter", mapper.writeValueAsString(filter.getFilters())));
            }
            String paramsString = URLEncodedUtils.format(nameValuePairs, "UTF-8");
            url = url + "?" + paramsString;
            String output = getResponse(url, null);
            JSONObject jsonObject = new JSONObject(output);
            String data = (((JSONObject) jsonObject.get("data")).get("list")).toString();
            String total = (((JSONObject) jsonObject.get("data")).get("total")).toString();
            List<Organization> organizations = mapper.readValue(data, mapper.getTypeFactory().constructCollectionType(List.class, Organization.class));
            Map<String, Object> dataPage = new HashMap<>();
            dataPage.put("list", organizations);
            dataPage.put("total", total);
            return dataPage;
        } catch (Exception e) {
//            logger.error();
            return null;
        }
    }

    public Map<String, Object> getRolesMap(FilterWrapper filter, Integer start, Integer limit) {
        try {
            String url;
            url = getResource("oim.service.url.roles");
            List<NameValuePair> nameValuePairs = new ArrayList<>();
            ObjectMapper mapper = new ObjectMapper();
            if (start != null) {
                nameValuePairs.add(new BasicNameValuePair("start", start.toString()));
            }
            if (limit != null) {
                nameValuePairs.add(new BasicNameValuePair("limit", limit.toString()));
            }
            if (filter != null) {
                nameValuePairs.add(new BasicNameValuePair("filter", mapper.writeValueAsString(filter.getFilters())));
            }
            String paramsString = URLEncodedUtils.format(nameValuePairs, "UTF-8");
            url = url + "?" + paramsString;
            String output = getResponse(url, null);
            JSONObject jsonObject = new JSONObject(output);
            String data = (((JSONObject) jsonObject.get("data")).get("list")).toString();
            String total = (((JSONObject) jsonObject.get("data")).get("total")).toString();
            List<Organization> organizations = mapper.readValue(data, mapper.getTypeFactory().constructCollectionType(List.class, Organization.class));
            Map<String, Object> dataPage = new HashMap<>();
            dataPage.put("list", organizations);
            dataPage.put("total", total);
            return dataPage;
        } catch (IOException e) {
//            logger.error();
            return null;
        }
    }

    public Map<String, Object> getCountriesMap(FilterWrapper filter, Integer start, Integer limit) {
        try {
            String url;
            url = getResource("oim.service.url.country");
            List<NameValuePair> nameValuePairs = new ArrayList<>();
            ObjectMapper mapper = new ObjectMapper();
            if (start != null) {
                nameValuePairs.add(new BasicNameValuePair("start", start.toString()));
            }
            if (limit != null) {
                nameValuePairs.add(new BasicNameValuePair("limit", limit.toString()));
            }
            if (filter != null) {
                nameValuePairs.add(new BasicNameValuePair("filter", mapper.writeValueAsString(filter.getFilters())));
            }
            String paramsString = URLEncodedUtils.format(nameValuePairs, "UTF-8");
            url = url + "?" + paramsString;
            String output = getResponse(url, null);
            JSONObject jsonObject = new JSONObject(output);
            String data = (((JSONObject) jsonObject.get("data")).get("list")).toString();
            String total = (((JSONObject) jsonObject.get("data")).get("total")).toString();
            List<GeoUnit> list = mapper.readValue(data, mapper.getTypeFactory().constructCollectionType(List.class, GeoUnit.class));
            Map<String, Object> dataPage = new HashMap<>();
            dataPage.put("list", list);
            dataPage.put("total", total);
            return dataPage;
        } catch (IOException e) {
//            logger.error();
            return null;
        }
    }

    public Map<String, Object> getCitiesMap(FilterWrapper filter, Integer start, Integer limit) {
        try {
            String url;
            url = getResource("oim.service.url.city");
            List<NameValuePair> nameValuePairs = new ArrayList<>();
            ObjectMapper mapper = new ObjectMapper();
            if (start != null) {
                nameValuePairs.add(new BasicNameValuePair("start", start.toString()));
            }
            if (limit != null) {
                nameValuePairs.add(new BasicNameValuePair("limit", limit.toString()));
            }
            if (filter != null) {
                nameValuePairs.add(new BasicNameValuePair("filter", mapper.writeValueAsString(filter.getFilters())));
            }
            String paramsString = URLEncodedUtils.format(nameValuePairs, "UTF-8");
            url = url + "?" + paramsString;
            String output = getResponse(url, null);
            JSONObject jsonObject = new JSONObject(output);
            String data = (((JSONObject) jsonObject.get("data")).get("list")).toString();
            String total = (((JSONObject) jsonObject.get("data")).get("total")).toString();
            List<GeoUnit> list = mapper.readValue(data, mapper.getTypeFactory().constructCollectionType(List.class, GeoUnit.class));
            Map<String, Object> dataPage = new HashMap<>();
            dataPage.put("list", list);
            dataPage.put("total", total);
            return dataPage;
        } catch (IOException e) {
//            logger.error();
            return null;
        }
    }

    public List<Organization> getOrganizations(FilterWrapper filter, Integer start, Integer limit) {
        try {
            Map<String, Object> map = getOrganizationsMap(filter, start, limit);
            if (map != null) {
                Object obj = map.get("list");
                if (obj != null) {
                    return (List<Organization>) obj;
                }
            }
            return new ArrayList<>();
        } catch (Exception e) {
            //            logger.error();
            return null;
        }
    }

    public User getUserByName(String userName) {
        try {
            String url;
            url = getResource("oim.service.url.user");
            url = url + "user/" + userName + "/fullinfo2";
            String output = getResponse(url, null);
            ObjectMapper mapper = new ObjectMapper();
            User user = mapper.readValue(output, User.class);

            return user;
        } catch (Exception ex) {
            Response response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(ex.getClass().getName()).build();
            throw new WebApplicationException(response);
        }

    }

    public User getUsersById(String id) {
        try {
            String url;
            url = getResource("oim.service.url.user");
            url = url + "byId/" + id;
            String output = getResponse(url, null);
            ObjectMapper mapper = new ObjectMapper();
            User user = mapper.readValue(output, User.class);

            return user;
        } catch (IOException e) {
            //            logger.error();
            return null;
        } catch (Exception ex) {
            return null;
        }

    }

    public Organization getOrganizationByUser(String userId) {
        try {
            String url;
            ObjectMapper mapper = new ObjectMapper();

            if (userId != null) {
                url = getResource("oim.service.url.user");
                url = url + "user/" + userId + "/organizations";
                String output = getResponse(url, null);
                Organization organization = new Organization();
                organization = mapper.readValue(output, Organization.class);
                return organization;
            }

            return null;
        } catch (IOException e) {
            //            logger.error();
            return null;
        }
    }

    public Map<String, Object> getUsersMap(FilterWrapper filter, Integer start, Integer limit) {
        try {
            String url;
            url = getResource("oim.service.url.usermap");
            List<NameValuePair> nameValuePairs = new ArrayList<>();
            ObjectMapper mapper = new ObjectMapper();
            if (start != null) {
                nameValuePairs.add(new BasicNameValuePair("start", start.toString()));
            }
            if (limit != null) {
                nameValuePairs.add(new BasicNameValuePair("limit", limit.toString()));
            }
            if (filter != null) {
                nameValuePairs.add(new BasicNameValuePair("filter", mapper.writeValueAsString(filter.getFilters())));
//                nameValuePairs.add(new BasicNameValuePair("filter", filter.getFilters().toString()));
            }
            String paramsString = URLEncodedUtils.format(nameValuePairs, "UTF-8");
            url = url + "paged?" + paramsString;
            String output = getResponse(url, null);
            JSONObject jsonObject = new JSONObject(output);
            String data = (((JSONObject) jsonObject.get("data")).get("list")).toString();
            String total = (((JSONObject) jsonObject.get("data")).get("total")).toString();
            List<User> useres = mapper.readValue(data, mapper.getTypeFactory().constructCollectionType(List.class, User.class));
            Map<String, Object> dataPage = new HashMap<>();
            dataPage.put("list", useres);
            dataPage.put("total", total);
            return dataPage;
        } catch (IOException e) {
            //            logger.error();
            return Collections.EMPTY_MAP;
        }
    }

    public List<User> getUsers(FilterWrapper filter, Integer start, Integer limit) {
        try {
            Map<String, Object> map = getUsersMap(filter, start, limit);
            if (map != null) {
                Object obj = map.get("list");
                if (obj != null) {
                    return (List<User>) obj;
                }
            }
            return new ArrayList<>();
        } catch (Exception e) {
            //            logger.error();
            return Collections.EMPTY_LIST;
        }
    }

    public List<Role> getRoles(FilterWrapper filter, Integer start, Integer limit) {
        try {
            Map<String, Object> map = getRolesMap(filter, start, limit);
            if (map != null) {
                Object obj = map.get("list");
                if (obj != null) {
                    return (List<Role>) obj;
                }
            }
            return new ArrayList<>();
        } catch (Exception e) {
            //            logger.error();
            return null;
        }
    }

    public Role getRoleByName(String name) {
        try {
            String url;
            url = getResource("oim.service.url.role");
            url = url + "/name/" + name;
            String output = getResponse(url, null);
            ObjectMapper mapper = new ObjectMapper();
            JSONObject jsonObject = new JSONObject(output);
            String data = jsonObject.get("data").toString();
            Role role = mapper.readValue(data, Role.class);
            return role;
        } catch (Exception e) {
            return null;
        }
    }

    public Map<String, GeoUnit> getCountries(FilterWrapper filter, Integer start, Integer limit) {
        Map<String, GeoUnit> result = new HashMap<>();
        try {

            Map<String, Object> map = getCountriesMap(filter, start, limit);
            if (map != null) {
                List<GeoUnit> list = (List<GeoUnit>) map.get("list");
                if (list != null) {
                    for (GeoUnit item : list) {
                        result.put(item.getId().toString(), item);
                    }
                }
            }
            return result;
        } catch (Exception e) {
            //            logger.error();
            return null;
        }
    }

    public List<GeoUnit> getCities(FilterWrapper filter, Integer start, Integer limit) {
        try {
            Map<String, Object> map = getCitiesMap(filter, start, limit);
            if (map != null) {
                Object obj = map.get("list");
                if (obj != null) {
                    return (List<GeoUnit>) obj;
                }
            }
            return new ArrayList<>();
        } catch (Exception e) {
            //            logger.error();
            return null;
        }
    }

    public void sendSms(MessageBody messageBody) {
        try {
            String url;
            url = serviceBundle.getProperty("sms.service.url.send");
            ObjectMapper mapper = new ObjectMapper();
            String messageBodyStr = mapper.writeValueAsString(messageBody);
            Client client = ClientBuilder.newClient();

            WebTarget webResource = client.target(url);

            Response response = webResource
                    .request(MediaType.APPLICATION_JSON)
                    .header("Content-Type", MediaType.APPLICATION_JSON)
                    .post(Entity.entity(messageBodyStr, MediaType.APPLICATION_JSON));

        } catch (Exception e) {
            e.printStackTrace();
            Response response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(e.getClass().getName()).build();
            throw new WebApplicationException(response);
        }
    }

    public List<Organization> getSubOrganization(String code) {
        try {
            Map<String, Object> map = getSubOrganizationsMap(code);
            if (map != null) {
                Object obj = map.get("list");
                if (obj != null) {
                    return (List<Organization>) obj;
                }
            }
            return new ArrayList<>();
        } catch (Exception e) {
            //            logger.error();
            return null;
        }

    }

    public Map<String, Object> getSubOrganizationsMap(String code) {
        try {
            String url;
            url = getResource("oim.service.url.org.sub.orgs");
            url = url + "/" + code + "/sub-organizations";
            List<NameValuePair> nameValuePairs = new ArrayList<>();
            ObjectMapper mapper = new ObjectMapper();
            String paramsString = URLEncodedUtils.format(nameValuePairs, "UTF-8");
            url = url + "?" + paramsString;
            String output = getResponse(url, null);
            JSONObject jsonObject = new JSONObject(output);
            String data = (((JSONObject) jsonObject.get("data")).get("list")).toString();
            String total = (((JSONObject) jsonObject.get("data")).get("total")).toString();
            List<Organization> organizations = mapper.readValue(data, mapper.getTypeFactory().constructCollectionType(List.class, Organization.class));
            Map<String, Object> dataPage = new HashMap<>();
            dataPage.put("list", organizations);
            dataPage.put("total", total);
            return dataPage;
        } catch (IOException e) {
//            logger.error();
            return null;
        }
    }

    public Map<String, Object> getOrganizationChildrenMap(FilterWrapper filter, Integer start, Integer limit, String organizationCode) {
        try {
            String url;
            ObjectMapper mapper = new ObjectMapper();
            url = getResource("oim.service.url.organization.children").replace("{code}", organizationCode);
            List<NameValuePair> nameValuePairs = new ArrayList<>();
            if (start != null) {
                nameValuePairs.add(new BasicNameValuePair("start", start.toString()));
            }
            if (limit != null) {
                nameValuePairs.add(new BasicNameValuePair("limit", limit.toString()));
            }
            if (filter != null && filter.getFilters() != null) {
                nameValuePairs.add(new BasicNameValuePair("filter", mapper.writeValueAsString(filter.getFilters())));
            }
            String paramsString = URLEncodedUtils.format(nameValuePairs, "UTF-8");
            url = url + "?" + paramsString;
            String output = getResponse(url, null);
            //ObjectMapper mapper = new ObjectMapper();
            JSONObject jsonObject = new JSONObject(output);
            String data = (((JSONObject) jsonObject.get("data")).get("list")).toString();
            String total = (((JSONObject) jsonObject.get("data")).get("total")).toString();
            List<Organization> organizations = mapper.readValue(data, mapper.getTypeFactory().constructCollectionType(List.class, Organization.class));
            Map<String, Object> dataPage = new HashMap<>();
            dataPage.put("list", organizations);
            dataPage.put("total", total);
            return dataPage;
        } catch (IOException e) {
            return null;
        }
    }

    public String rightelSignRequest(String id, RightelSignModel rightelSignModel) {

//        try {
        String url;
        url = serviceBundle.getProperty("rightel.sign.service");
        Client client = ClientBuilder.newClient();
        WebTarget webResource = client.target(url);

        MultivaluedMap<String, Object> params = new MultivaluedHashMap<>();
        params.add("phoneNumber", rightelSignModel.getPhoneNumber());
        params.add("hash", rightelSignModel.getHash());
        params.add("text", rightelSignModel.getText());
        params.add("userName", rightelSignModel.getUserName());
        params.add("passwd", rightelSignModel.getPasswd());

        Response response = webResource
                .request(MediaType.APPLICATION_FORM_URLENCODED)
                .header("Content-Type", MediaType.APPLICATION_FORM_URLENCODED)
                .post(Entity.entity(params, MediaType.APPLICATION_FORM_URLENCODED));
        String responseJson = response.readEntity(String.class);
        JSONObject jsonObject = new JSONObject(responseJson);
        String returnCode = jsonObject.get("returnCode").toString();
        return returnCode;

//        } catch (Exception e) {
//            e.printStackTrace();
//            String message = "خطا در ارتباط با سرویس امضا رایتل";
//            ReturnResultModel returnResultModel = new ReturnResultModel(id, message);
//            Response response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(returnResultModel).build();
//            throw new WebApplicationException(response);
//        }
    }

    public Map<String, String> getRightelSignedData(String rightelId) {
        try {
            String url;
            Map<String, String> signData = new HashMap<>();
            ObjectMapper mapper = new ObjectMapper();
            url = serviceBundle.getProperty("rightel.sign.service") + "/" + rightelId;
            String output = getResponse(url, null);
            JSONObject jsonObject = new JSONObject(output);
            signData.put("signedHash", jsonObject.get("signedHash").toString());
            signData.put("x509Certificate", jsonObject.get("x509Certificate").toString());

            return signData;
        } catch (Exception e) {
            logger.error("Error in getRightelSignedData with rightelId :  " + rightelId, e);
            return null;
        }
    }

    public Map<String, Boolean> verifyRightelSign(String id, RightelSignModel rightelSignModel) {
        try {
            String url;
            url = serviceBundle.getProperty("rightel.verify.service");
            Client client = ClientBuilder.newClient();
            WebTarget webResource = client.target(url);

            MultivaluedMap<String, Object> params = new MultivaluedHashMap<>();
            params.add("phoneNumber", rightelSignModel.getPhoneNumber());
            params.add("signedHash", rightelSignModel.getSignedHash());
            params.add("hash", rightelSignModel.getHash());
            params.add("x509Certificate", rightelSignModel.getX509Certificate());

            Response response = webResource
                    .request(MediaType.APPLICATION_FORM_URLENCODED)
                    .header("Content-Type", MediaType.APPLICATION_FORM_URLENCODED)
                    .post(Entity.entity(params, MediaType.APPLICATION_FORM_URLENCODED));

            String responseJson = response.readEntity(String.class);
            JSONObject jsonObject = new JSONObject(responseJson);
            //Object returnCode = jsonObject.get("returnCode");
            Map<String, Boolean> returnResult = new HashMap<>();
            boolean signatureEvaluationResult = (boolean) jsonObject.get("signatureEvaluationResult");
            boolean certificateChainValidationResult = (boolean) jsonObject.get("certificateChainValidationResult");
            boolean certificateOCSPValidationResult = (boolean) jsonObject.get("certificateOCSPValidationResult");
            boolean certificateCRLValidationResult = (boolean) jsonObject.get("certificateCRLValidationResult");
            returnResult.put("signatureEvaluationResult", signatureEvaluationResult);
            returnResult.put("certificateChainValidationResult", certificateChainValidationResult);
            returnResult.put("certificateOCSPValidationResult", certificateOCSPValidationResult);
            returnResult.put("certificateCRLValidationResult", certificateCRLValidationResult);
            boolean finalResult = (signatureEvaluationResult && certificateCRLValidationResult && certificateChainValidationResult && certificateOCSPValidationResult);
            returnResult.put("finalResult", finalResult);

            return returnResult;

        } catch (Exception e) {
            String message = "خطا در ارتباط با سرویس صحت سنجی امضا رایتل";
            logger.error("Error in verifyRightelSign with id :  " + id, e);
            ReturnResultModel returnResultModel = new ReturnResultModel(id, message);
            Response response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(returnResultModel).build();
            throw new WebApplicationException(response);
        }

    }

    public void returnToShortterm(String payDocNo, String reqSerial, String returnCode, String comment, String returnUserName) {
        try {
            String url;
            url = serviceBundle.getProperty("shortterm.return.paydoc");
//            Logger.getLogger(RestServices.class.getName()).log(Level.SEVERE, "****************** first url : {0}", url);
//            Logger.getLogger(RestServices.class.getName()).log(Level.SEVERE, "****************** params : {0} - {1} - {2} - {3} - {4}", new Object[]{payDocNo, reqSerial, returnCode, comment, returnUserName});
            url = url.replace("{payDocNo}", payDocNo).replace("{reqSerial}", reqSerial).replace("{returnCode}", returnCode).replace("{comment}", comment).replace("{nationId}", returnUserName);
//            Logger.getLogger(RestServices.class.getName()).log(Level.SEVERE, "****************** final url : {0}", url);
            Client client = ClientBuilder.newClient();
            client.property(ClientProperties.CONNECT_TIMEOUT, 10000); //"jersey.config.client.connectTimeout"
            client.property(ClientProperties.READ_TIMEOUT, 5000);
            WebTarget webResource = client.target(url);
            Response response = webResource.request(MediaType.APPLICATION_JSON)
                    .get(Response.class);

            String output = response.readEntity(String.class);
            JSONObject jsonObject = new JSONObject(output);
            String result = jsonObject.get("data").toString();

            if (!result.equals("1")) {
                String message;
                if (result.equals("")) {
                    message = "  این رکورد در کوتاه مدت برگشت داده نشد.!!";
                } else {
                    message = result.replace("ORA-:", "");
                }
                logger.error("********************** SHORTTERM RETURN MESSAGE : " + message + " payDocNo = " + payDocNo);
                response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(message).build();
                throw new WebApplicationException(response);
            }

        } catch (WebApplicationException wex) {
            throw wex;
        } catch (Exception ex) {
            String message = "خطا در ارتباط با سرویس برگشت کوتاه مدت.";
            logger.error(message, ex);
            Response response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(message).build();
            throw new WebApplicationException(response);
        }

    }

    public void returnToPension(String paymentId, String returnCode, String comment, String returnUserName) {
        try {
            String url;
            url = serviceBundle.getProperty("pension.return.service");
            url = url.replace("{paymentId}", paymentId);
            Client client = ClientBuilder.newClient();
            client.property(ClientProperties.CONNECT_TIMEOUT, 10000); //"jersey.config.client.connectTimeout"
            client.property(ClientProperties.READ_TIMEOUT, 5000);
            client.property(ClientProperties.FEATURE_AUTO_DISCOVERY_DISABLE, true);
            WebTarget webResource = client.target(url);

            AccessTokenManager accessTokenManager = new AccessTokenManager();
            accessTokenManager.setWebProperties(serviceBundle);

            JsonNode jsonNode = accessTokenManager.requestTokenWithClientCredentials(serviceBundle.getProperty("oauth.client_id"), serviceBundle.getProperty("oauth.client_secret"));

            if (jsonNode == null) {
                throw new Exception("get token exception");
            }
            JsonNode accessToken = jsonNode.get("access_token");
            if (accessToken == null) {
                throw new Exception("token content is wrong");
            }
            String accessTokenStr = accessToken.asText();
            if (TextUtils.isEmpty(accessTokenStr)) {
                throw new Exception("create token exception");
            }

            PensionReturnObject pensionReturnObject = new PensionReturnObject();
            pensionReturnObject.setOperation("return");
            pensionReturnObject.setId(new Long(paymentId));
            //pensionReturnObject.setLastModifiedBy(returnUserName);
            Response response = webResource
                    .request(MediaType.APPLICATION_JSON)
                    .header("Authorization", String.format("Bearer %s", accessTokenStr))
                    .header("Content-Type", MediaType.APPLICATION_JSON)
                    .put(Entity.entity(pensionReturnObject, MediaType.APPLICATION_JSON));

            if (response.getStatus() != 200) {
                Response resp = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("رکورد مورد نظر در سیستم مستمری برگشت داده نشد!").build();
                throw new WebApplicationException(resp);
            }

        } catch (WebApplicationException wex) {
            String message = "خطا در ارتباط با سرویس برگشت مستمری . paymentId = " + paymentId;
            logger.error(message, wex);
            throw wex;
        } catch (Exception ex) {
            String message = "خطا در ارتباط با سرویس برگشت مستمری .";
            logger.error(message, ex);
            Response response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(message).build();
            throw new WebApplicationException(response);
        }

    }

    public String returnToShorttermExcel(String payDocNo, String reqSerial, String returnCode, String comment, String returnUserName) {
        try {
            String url;
            String message = "";
            url = serviceBundle.getProperty("shortterm.return.paydoc");
            url = url.replace("{payDocNo}", payDocNo).replace("{reqSerial}", reqSerial).replace("{returnCode}", returnCode).replace("{comment}", comment).replace("{nationId}", returnUserName);
            Client client = ClientBuilder.newClient();
            WebTarget webResource = client.target(url);
            Response response = webResource.request(MediaType.APPLICATION_JSON)
                    .get(Response.class);

            String output = response.readEntity(String.class);
            JSONObject jsonObject = new JSONObject(output);
            String result = jsonObject.get("data").toString();

            if (!result.equals("1")) {
                if (result.equals("")) {
                    message = "  این رکورد در کوتاه مدت برگشت داده نشد.!!";
                } else {
                    message = result.replace("ORA-:", "");
                }

            }
            if (!message.equals("")) {
                return message;
            } else {
                return result;
            }

        } catch (WebApplicationException wex) {
            throw wex;
        } catch (Exception ex) {
            String message = "خطا در ارتباط با سرویس برگشت کوتاه مدت.";
            logger.error(message, ex);
            Response response = Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(message).build();
            throw new WebApplicationException(response);
        }

    }

    public RegistrationReturnModel getNameFamilyWithnationalCode(String nationalCode) {

        try {
            String url;
            url = getResource("registration.nationalId").replace("{nationalId}", nationalCode);
            String output = getResponse(url, null);
            ObjectMapper mapper = new ObjectMapper();
            JSONObject jsonObject = new JSONObject(output);
            String data = (((JSONObject) jsonObject.get("data"))).toString();
            RegistrationReturnModel returnModel = mapper.readValue(data, RegistrationReturnModel.class);

            return returnModel;
        } catch (Exception ex) {
            String message = "خطا در دریافت اطلاعات از نام نویسی با کد ملی";
            logger.error(message, ex);
            return null;
        }

    }

    public RegistrationReturnModel getNameFamilyWithInsuranceId(String insuranceId) {

        try {
            String url;
            url = getResource("registration.insuranceId").replace("{insuranceid}", insuranceId);
            String output = getResponse(url, null);
            ObjectMapper mapper = new ObjectMapper();
            JSONObject jsonObject = new JSONObject(output);
            String data = (((JSONObject) jsonObject.get("data"))).toString();
            RegistrationReturnModel returnModel = mapper.readValue(data, RegistrationReturnModel.class);
            return returnModel;
        } catch (Exception ex) {
            String message = "خطا در دریافت اطلاعات از نام نویسی با شماره بیمه";
            logger.error(message, ex);
            return null;
        }

    }

}

class PensionReturnObject implements Serializable {

    String operation;
    Long id;
//    String lastModifiedBy;

    public String getOperation() {
        return operation;
    }

    public void setOperation(String operation) {
        this.operation = operation;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

//    public String getLastModifiedBy() {
//        return lastModifiedBy;
//    }
//
//    public void setLastModifiedBy(String lastModifiedBy) {
//        this.lastModifiedBy = lastModifiedBy;
//    }
}
