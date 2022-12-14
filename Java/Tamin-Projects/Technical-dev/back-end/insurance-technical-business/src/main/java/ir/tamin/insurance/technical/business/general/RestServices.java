
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.insurance.technical.business.general;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.jaxrs.json.JacksonJsonProvider;
import ir.tamin.framework.cdi.util.WebProperties;
import ir.tamin.framework.core.util.Bundle;
import ir.tamin.framework.domain.proxy.ProxyProcessingException;
import ir.tamin.framework.weblogic.oauth.oltu.client.AccessTokenManager;
import ir.tamin.framework.ws.rest.json.Filter;
import ir.tamin.framework.ws.rest.json.FilterWrapper;
import ir.tamin.framework.ws.rest.json.SortWrapper;
import ir.tamin.insurance.technical.model.baseinfo.ItemPageOim;
import ir.tamin.insurance.technical.model.guardian.GetModel;
import ir.tamin.insurance.technical.model.guardian.Personal;
import ir.tamin.insurance.technical.model.guardian.SendModel;
import ir.tamin.insurance.technical.model.insurance.InsuranceRegisteration;
import ir.tamin.insurance.technical.model.user.GeoUnit;
import ir.tamin.insurance.technical.model.user.OrgUser;
import ir.tamin.insurance.technical.model.user.Organization;
import org.apache.http.NameValuePair;
import org.apache.http.client.utils.URLEncodedUtils;
import org.apache.http.message.BasicNameValuePair;
import org.glassfish.jersey.client.ClientConfig;
import org.glassfish.jersey.client.ClientProperties;
import org.glassfish.jersey.message.GZipEncoder;
import org.json.JSONObject;

import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.Entity;
import javax.ws.rs.client.WebTarget;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.IOException;
import java.io.Serializable;
import java.sql.Timestamp;
import java.util.*;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * @author h_poursafar
 */
public class RestServices implements Serializable {

    @Inject
    @WebProperties
    Bundle webProperties;

    @Inject
    private EntityManager em;
    String sessionId;

    private Client client;

    public void initClient() {
        ClientConfig cc = new ClientConfig();
        cc.property(ClientProperties.CONNECT_TIMEOUT, 20000);
        cc.property(ClientProperties.READ_TIMEOUT, 20000);
        cc.property(ClientProperties.FEATURE_AUTO_DISCOVERY_DISABLE, true);
        cc.property(ClientProperties.METAINF_SERVICES_LOOKUP_DISABLE, true);

        client = ClientBuilder.newClient(cc);
        client.register(JacksonJsonProvider.class);
    }

    public void closeClient() {
        client.close();
    }

    // private static final Logger LOGGER = Logger.getLogger(RestServices.class.getName());
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

    public String getResponseByToken(String url, String token) {
        String output = null;
        Client client = ClientBuilder.newClient();
        WebTarget webResource = client.target(url);
        Response response = webResource
                .request(MediaType.APPLICATION_JSON)
                .header("Content-Type", MediaType.APPLICATION_JSON)
                .header("Authorization", String.format("Bearer %s", token))
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
        resource = webProperties.getProperty(property);
        return resource;
    }

    public String postRequest(String url, Object object, String token) {
        initClient();
        boolean result = false;
        String str = null;
        WebTarget webResource = client.target(url);
        Response response = null;
        try {
            response = webResource
                    .request(MediaType.APPLICATION_JSON)
                    .header("Content-Type", MediaType.APPLICATION_JSON)
                    .header("Authorization", String.format("Bearer %s", token))
                    .post(Entity.entity(object, MediaType.APPLICATION_JSON));
            str = response.readEntity(String.class);
            Logger.getLogger(RestServices.class.getName()).log(Level.INFO, "post response is:" + str);
            if (response.getStatus() == Response.Status.CREATED.getStatusCode()
                    || response.getStatus() == Response.Status.OK.getStatusCode()) {
                return null;
            } else {
                return str;
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        } finally {
            if (response != null) {
                response.close();
            }
            closeClient();
        }
        return str;
    }

    public Map<String, Object> getOrganizationsMap(FilterWrapper filter, Integer start, Integer limit) {
        try {
            String url;
            ObjectMapper mapper = new ObjectMapper();
            url = getResource("oim.service.url.organization");
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
            JSONObject jsonObject = new JSONObject(output);
            String data = (((JSONObject) jsonObject.get("data")).get("list")).toString();
            String total = (((JSONObject) jsonObject.get("data")).get("total")).toString();
            List<Organization> organizations = mapper.readValue(data, mapper.getTypeFactory().constructCollectionType(List.class, Organization.class));
            Map<String, Object> dataPage = new HashMap<>();
            dataPage.put("list", organizations);
            dataPage.put("total", total);
            return dataPage;
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    public Map<String, Object> getCountriesMap(FilterWrapper filter, Integer start, Integer limit) {
        try {
            String url = getResource("oim.service.url.country");
            List<NameValuePair> nameValuePairs = new ArrayList<>();
            if (start != null) {
                nameValuePairs.add(new BasicNameValuePair("start", start.toString()));
            }
            if (limit != null) {
                nameValuePairs.add(new BasicNameValuePair("limit", limit.toString()));
            }
            if (filter != null) {
                nameValuePairs.add(new BasicNameValuePair("filter", filter.toString()));
            }
            String paramsString = URLEncodedUtils.format(nameValuePairs, "UTF-8");
            url = url + "?" + paramsString;
            String output = getResponse(url, null);
            ObjectMapper mapper = new ObjectMapper();
            JSONObject jsonObject = new JSONObject(output);
            String data = (((JSONObject) jsonObject.get("data")).get("list")).toString();
            String total = (((JSONObject) jsonObject.get("data")).get("total")).toString();
            List<GeoUnit> list = mapper.readValue(data, mapper.getTypeFactory().constructCollectionType(List.class, GeoUnit.class));
            Map<String, Object> dataPage = new HashMap<>();
            dataPage.put("list", list);
            dataPage.put("total", total);
            return dataPage;
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    public Map<String, Object> getCitiesMap(FilterWrapper filter, SortWrapper sorter, Integer start, Integer limit) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            String url = getResource("oim.service.url.city");
            List<NameValuePair> nameValuePairs = new ArrayList<>();
            if (start != null) {
                nameValuePairs.add(new BasicNameValuePair("start", start.toString()));
            }
            if (limit != null) {
                nameValuePairs.add(new BasicNameValuePair("limit", limit.toString()));
            }
            if (filter != null) {
                nameValuePairs.add(new BasicNameValuePair("filter", mapper.writeValueAsString(filter.getFilters())));
            }
            if (sorter != null) {
                nameValuePairs.add(new BasicNameValuePair("sorter", mapper.writeValueAsString(sorter.getSortSet())));
            }
            String paramsString = URLEncodedUtils.format(nameValuePairs, "UTF-8");
            url = url + "?" + paramsString;
            String output = getResponse(url, null);
            mapper = new ObjectMapper();
            JSONObject jsonObject = new JSONObject(output);
            String data = (((JSONObject) jsonObject.get("data")).get("list")).toString();
            String total = (((JSONObject) jsonObject.get("data")).get("total")).toString();
            List<GeoUnit> list = mapper.readValue(data, mapper.getTypeFactory().constructCollectionType(List.class, GeoUnit.class));
            Map<String, Object> dataPage = new HashMap<>();
            dataPage.put("list", list);
            dataPage.put("total", total);
            return dataPage;
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    public ItemPageOim getCitiesMapItemPage(String code, String limit) {
        try {
            String url;
            url = getResource("oim.service.url.city");
            String paramsString = "/item-page?code=" + code + "&limit=" + limit;
            url = url + paramsString;
            String output = getResponse(url, null);
            ObjectMapper mapper = new ObjectMapper();
            JSONObject jsonObject = new JSONObject(output);
            String data = (((JSONObject) jsonObject.get("data"))).toString();
            ItemPageOim o = mapper.readValue(data, ItemPageOim.class);
            return o;
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    public Map<String, Object> getProvinceMap(FilterWrapper filter, SortWrapper sorter, Integer start, Integer limit) {
        try {
            String url;
            url = getResource("oim.service.url.province");
            List<NameValuePair> nameValuePairs = new ArrayList<>();
            if (start != null) {
                nameValuePairs.add(new BasicNameValuePair("start", start.toString()));
            }
            if (limit != null) {
                nameValuePairs.add(new BasicNameValuePair("limit", limit.toString()));
            }
            if (filter != null) {
                nameValuePairs.add(new BasicNameValuePair("filter", filter.toString()));
            }
            if (sorter != null) {
                nameValuePairs.add(new BasicNameValuePair("sorter", sorter.getSortSet().toString()));
            }
            String paramsString = URLEncodedUtils.format(nameValuePairs, "UTF-8");
            url = url + "?" + paramsString;
            String output = getResponse(url, null);
            ObjectMapper mapper = new ObjectMapper();
            JSONObject jsonObject = new JSONObject(output);
            String data = (((JSONObject) jsonObject.get("data")).get("list")).toString();
            String total = (((JSONObject) jsonObject.get("data")).get("total")).toString();
            List<GeoUnit> list = mapper.readValue(data, mapper.getTypeFactory().constructCollectionType(List.class, GeoUnit.class));
            Map<String, Object> dataPage = new HashMap<>();
            dataPage.put("list", list);
            dataPage.put("total", total);
            return dataPage;
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    public Map<String, Object> getOrganizations(FilterWrapper filter, Integer start, Integer limit) {
        try {
            Map<String, Object> map = getOrganizationsMap(filter, start, limit);
            if (map != null) {
                Map<String, Object> pagedMap = new HashMap<>();
                Object obj = map.get("list");
                Object total = map.get("total");
                if (obj != null) {
                    List<Organization> orgs = (List<Organization>) obj;
                    String tot = (String) total;
                    pagedMap.put("list", orgs);
                    pagedMap.put("total", tot);
                    return pagedMap;
                }
            }
            return new HashMap<>();
        } catch (Exception e) {
            return null;
        }
    }

    public OrgUser getUserByName(String userName) {
        try {
            String url = getResource("oim.service.url.user.fullinfo");
            url = url + userName + "/fullinfo";
            String output = getResponse(url, null);
            ObjectMapper mapper = new ObjectMapper();
            OrgUser user = mapper.readValue(output, OrgUser.class);
            return user;
        } catch (IOException e) {
            return null;
        } catch (Exception ex) {
            return null;
        }

    }

    public OrgUser getUsersById(String id) {
        try {
            String url = getResource("oim.service.url.user");
            url = url + "byId/" + id;
            String output = getResponse(url, null);
            ObjectMapper mapper = new ObjectMapper();
            OrgUser user = mapper.readValue(output, OrgUser.class);

            return user;
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }

    }

    public Organization getOrganizationByUser(String userId) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            if (userId != null) {
                String url = getResource("oim.service.url.user");
                url = url + "user/" + userId + "/organizations";
                String output = getResponse(url, null);
                Organization organization = new Organization();
//                JSONObject jsonObject = new JSONObject(output);
//                String data = ((JSONObject)jsonObject.get("data")).toString();
                organization = mapper.readValue(output, Organization.class);
                return organization;
            }

            return null;
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    public Map<String, Object> getUsersMap(FilterWrapper filter, Integer start, Integer limit) {
        try {
            String url = getResource("oim.service.url.ueser");
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
            url = url + "paged?" + paramsString;
            String output = getResponse(url, null);
            JSONObject jsonObject = new JSONObject(output);
            String data = (((JSONObject) jsonObject.get("data")).get("list")).toString();
            String total = (((JSONObject) jsonObject.get("data")).get("total")).toString();
            List<OrgUser> useres = mapper.readValue(data, mapper.getTypeFactory().constructCollectionType(List.class, OrgUser.class));
            Map<String, Object> dataPage = new HashMap<>();
            dataPage.put("list", useres);
            dataPage.put("total", total);
            return dataPage;
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    public List<OrgUser> getUsers(FilterWrapper filter, Integer start, Integer limit) {
        try {
            Map<String, Object> map = getUsersMap(filter, start, limit);
            if (map != null) {
                Object obj = map.get("list");
                if (obj != null) {
                    return (List<OrgUser>) obj;
                }
            }
            return new ArrayList<>();
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
                        result.put(item.getCode(), item);
                    }
                }
            }
            return result;
        } catch (Exception e) {
            return null;
        }
    }

    public Map<String, GeoUnit> getCities(FilterWrapper filter, Integer start, Integer limit) {
        Map<String, GeoUnit> result = new HashMap<>();
        try {
            Map<String, Object> map = getCitiesMap(filter, null, start, limit);
            if (map != null) {
                List<GeoUnit> list = (List<GeoUnit>) map.get("list");
                if (list != null) {
                    for (GeoUnit item : list) {
                        result.put(item.getCode(), item);
                    }
                }
            }
            return result;
        } catch (Exception e) {
            return null;
        }
    }

    public Map<String, GeoUnit> getProvinces(FilterWrapper filter, SortWrapper sorter, Integer start, Integer limit) {
        Map<String, GeoUnit> result = new HashMap<>();
        try {

            Map<String, Object> map = getProvinceMap(filter, sorter, start, limit);
            if (map != null) {
                List<GeoUnit> list = (List<GeoUnit>) map.get("list");
                if (list != null) {
                    for (GeoUnit item : list) {
                        result.put(item.getCode(), item);
                    }
                }
            }
            return result;
        } catch (Exception e) {
            return null;
        }
    }

    public Map<String, Object> getOrganizationChildren(FilterWrapper filter, Integer start, Integer limit, String organizationCode) {
        try {
            Map<String, Object> map = getOrganizationChildrenMap(filter, start, limit, organizationCode);
            if (map != null) {
                Map<String, Object> pagedMap = new HashMap<>();
                Object obj = map.get("list");
                Object total = map.get("total");
                if (obj != null) {
                    List<Organization> orgs = (List<Organization>) obj;
                    String tot = (String) total;
                    pagedMap.put("list", orgs);
                    pagedMap.put("total", tot);
                    return pagedMap;
                }
            }
            return new HashMap<>();
        } catch (Exception e) {
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

    public InsuranceRegisteration getLastInsuranceRelation(FilterWrapper filter, Integer start, Integer limit, String nationalId) {
        try {
            String url;
            InsuranceRegisteration bs = new InsuranceRegisteration();
            ObjectMapper mapper = new ObjectMapper();
            url = getResource("centralized.registration.get.relation.with.nationalId");
            url = url.replace("{nationalId}", nationalId);
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
            JSONObject jsonObject = new JSONObject(output);
            String data = (((JSONObject) jsonObject.get("data"))).toString();
            LinkedHashMap relation = (LinkedHashMap) mapper.readValue(data, Object.class);
            String organizationId = (String) relation.get("organizationId");
            String insuranceId = (String) relation.get("insuranceId");

            LinkedHashMap<String, Object> personal = (LinkedHashMap<String, Object>) relation.get("personal");

            String first = (String) personal.get("firstName");
            String last = (String) personal.get("lastName");
            Long dateOfBirth = Long.parseLong(personal.get("dateOfBirth").toString());
            String idCardNumber = (String) personal.get("idCardNumber");

            bs.setBrchCode(organizationId);
            bs.setFirstName(first);
            bs.setLastName(last);
            bs.setDoB(new Date(dateOfBirth.longValue()));
            bs.setIdCardNumber(idCardNumber);
            bs.setId(insuranceId);
            return bs;
        } catch (Exception e) {
            Logger.getLogger(RestServices.class
                    .getName()).log(Level.SEVERE, null, e);

            return null;
        }
    }

    public String updateEguardianRequest(String requestId, String brchNote, String reqstatus, String cartableStatus) throws Exception {
        String output = null;
        String url;
        Client client = ClientBuilder.newClient();

        try {
            String body = getResource("techins.service.save.body");
            AccessTokenManager accessTokenManager = new AccessTokenManager();
            accessTokenManager.setWebProperties(webProperties);
            JsonNode jsonNode = null;
            jsonNode = accessTokenManager.requestTokenWithClientCredentials(webProperties.getProperty("oauth.client_id"), webProperties.getProperty("oauth.client_secret"));
            if (jsonNode == null) {
                throw new Exception("get token exception");
            }
            JsonNode accessToken = jsonNode.get("access_token");
            if (accessToken == null) {
                throw new Exception("token content is wrong");
            }
            String accessTokenStr = accessToken.asText();
            body = body.replace("$requestId", requestId)
                    .replace("$inspectorNote", brchNote.replaceAll("\n", "").replaceAll("\r", ""))
                    .replace("$status", reqstatus).replace("$insuredMobile", cartableStatus);
            url = webProperties.getProperty("erequest.portal.save.url")/* + "/" + requestId*/;
            WebTarget webResource = client.target(url);
            Response response = webResource
                    .request(MediaType.APPLICATION_JSON)
                    .header("Authorization", String.format("Bearer %s", accessTokenStr))
                    .header("Content-Type", MediaType.APPLICATION_JSON)
                    .put(Entity.json(body), Response.class);

            switch (response.getStatus()) {
                case 200:
                    output = response.readEntity(String.class);
                    return String.valueOf(response.getStatus());
                default:
                    throw new Exception(String.valueOf(response.getStatus()));
            }
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        } finally {
            // closeClient();
        }
    }

    public String getEguardianRequestDocument(String requestId) throws Exception {

        String output = null;
        String url;

        Client client = ClientBuilder.newClient();
        initClient();
        boolean result = false;
        try {
            AccessTokenManager accessTokenManager = new AccessTokenManager();
            accessTokenManager.setWebProperties(webProperties);
            JsonNode jsonNode = null;
            jsonNode = accessTokenManager.requestTokenWithClientCredentials(webProperties.getProperty("oauth.client_id"), webProperties.getProperty("oauth.client_secret"));
            if (jsonNode == null) {
                throw new Exception("get token exception");
            }
            JsonNode accessToken = jsonNode.get("access_token");
            if (accessToken == null) {
                throw new Exception("token content is wrong");
            }
            String accessTokenStr = accessToken.asText();
            url = webProperties.getProperty("erequest.portal.doc.url") + "/" + requestId;
            output = getResponseByToken(url, accessTokenStr);
            return String.valueOf(output);
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        } finally {
            closeClient();
        }
    }


    public String getEOccurRequestDocument(String eRepId) throws Exception {

        String output = null;
        String url;

        Client client = ClientBuilder.newClient();
        initClient();
        boolean result = false;
        try {
            AccessTokenManager accessTokenManager = new AccessTokenManager();
            accessTokenManager.setWebProperties(webProperties);
            JsonNode jsonNode = null;
            jsonNode = accessTokenManager.requestTokenWithClientCredentials(webProperties.getProperty("oauth.client_id"), webProperties.getProperty("oauth.client_secret"));
            if (jsonNode == null) {
                throw new Exception("get token exception");
            }
            JsonNode accessToken = jsonNode.get("access_token");
            if (accessToken == null) {
                throw new Exception("token content is wrong");
            }
            String accessTokenStr = accessToken.asText();
            url = webProperties.getProperty("erequest.occur.doc.url") + "/" + eRepId;
            output = getResponseByToken(url, accessTokenStr);
            return String.valueOf(output);
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        } finally {
            closeClient();
        }
    }

    public String getEOccurWorkshopDetail(String eRepId) throws Exception {

        String output = null;
        String url;
        JsonNode jsonNode = null;
        String data;
        Client client = ClientBuilder.newClient();
        ObjectMapper mapper = new ObjectMapper();
        boolean result = false;
        String accessTokenStr;
        JSONObject jsonObject;
        initClient();
        try {
            AccessTokenManager accessTokenManager = new AccessTokenManager();
            accessTokenManager.setWebProperties(webProperties);
            jsonNode = accessTokenManager.requestTokenWithClientCredentials(webProperties.getProperty("oauth.client_id"),
                    webProperties.getProperty("oauth.client_secret"));
            if (jsonNode == null) {
                throw new Exception("get token exception");
            }
            JsonNode accessToken = jsonNode.get("access_token");
            if (accessToken == null) {
                throw new Exception("token content is wrong");
            }
            accessTokenStr = accessToken.asText();
            url = webProperties.getProperty("erequest.occur.record.url") + "?reportId=" + eRepId;
            output = getResponseByToken(url, accessTokenStr);
            return output;
        } catch (Exception e) {
            throw new ProxyProcessingException(e);
        } finally {
            closeClient();
        }
    }

    public Map<String, Object> getBySubFilter(String nationalCode, String subdominantNationalId) throws Exception {
        // nationalCode = "3051663581";
        AccessTokenManager accessTokenManager = new AccessTokenManager();
        accessTokenManager.setWebProperties(webProperties);
        JsonNode js = accessTokenManager.requestTokenWithClientCredentials(webProperties.getProperty("oauth.client_id"), webProperties.getProperty("oauth.client_secret"));
        String token = js.get("access_token").textValue();
        ObjectMapper mapper = new ObjectMapper();
        String url = webProperties.getProperty("registration.subdominant.check");
        List<NameValuePair> nameValuePairs = new ArrayList<>();
        FilterWrapper filter = new FilterWrapper();
        filter.setFilters(new HashSet<Filter>());
        filter.addFilter("nationalId", Filter.Operator.EQUAL, nationalCode);
        filter.addFilter("subNationalId", Filter.Operator.EQUAL, subdominantNationalId);
        if (filter != null && filter.getFilters() != null) {
            nameValuePairs.add(new BasicNameValuePair("filter", mapper.writeValueAsString(filter.getFilters())));
        }
        String paramsString = URLEncodedUtils.format(nameValuePairs, "UTF-8");
        url = url + "?" + paramsString;

        String output = getResponseByToken(url, token);
        mapper = new ObjectMapper();
        JSONObject jsonObject = new JSONObject(output);
        String data = (((JSONObject) jsonObject.get("data")).get("list")).toString();
        String total = (((JSONObject) jsonObject.get("data")).get("total")).toString();
        List<Object> histories = mapper.readValue(data, mapper.getTypeFactory().constructCollectionType(List.class, Object.class));
        Map<String, Object> dataPage = new HashMap<>();
        if (histories == null) {
            histories = new ArrayList<>();
        }
        dataPage.put("list", histories);
        dataPage.put("total", total);
        return dataPage;

    }

    public Personal getPersonalParent(String nationalId) {
        String url = webProperties.getProperty("registration.personal");
        AccessTokenManager accessTokenManager = new AccessTokenManager();
        accessTokenManager.setWebProperties(webProperties);
        JsonNode js = null;
        Personal p = null;
        String output = null;
        try {
            js = accessTokenManager.requestTokenWithClientCredentials(webProperties.getProperty("oauth.client_id"), webProperties.getProperty("oauth.client_secret"));
        } catch (Exception ex) {
        }
        try {
            String token = js.get("access_token").textValue();
            output = getResponseByToken(url + nationalId, token);

            JSONObject jsonObject = new JSONObject(output);
            JSONObject data = ((JSONObject) jsonObject.get("data"));
            if (data != null) {
                p = new Personal();
                p.setNationalId(nationalId);
                p.setFirstName(data.getString("firstName"));
                p.setLastName(data.getString("lastName"));
                p.setFatherName(data.getString("fatherName"));
                p.setGender(((JSONObject) data.get("gender")).getString("genderCode"));
                p.setCountryId(((JSONObject) data.get("country")).getString("code"));
                p.setDateOfBirth(new Timestamp(Long.parseLong(data.get("dateOfBirth").toString())));
                p.setCityOfBirthId(((JSONObject) data.get("cityOfBirth")).getString("code"));
                p.setCityOfIssueId(((JSONObject) data.get("cityOfIssue")).getString("code"));
                p.setIdCardNumber(data.getString("idCardNumber"));
                p.setIdCardSerial1(data.getString("idCardSerial1"));
                p.setIdCardSerial2(data.getString("idCardSerial2"));
                p.setSsn(data.getString("ssn"));
            }
        } catch (Exception ex) {
            Logger.getLogger(RestServices.class.getName()).log(Level.SEVERE, output, ex);
        }
        return p;
    }

    public Personal getPersonalSubdominant(String nationalId, String birthDate, String userName) throws Exception {
        String url = webProperties.getProperty("registration.office.get");
        AccessTokenManager accessTokenManager = new AccessTokenManager();
        accessTokenManager.setWebProperties(webProperties);
        JsonNode js = accessTokenManager.requestTokenWithClientCredentials(webProperties.getProperty("oauth.client_id"), webProperties.getProperty("oauth.client_secret"));
        String token = js.get("access_token").textValue();
        String output = getResponseByToken(url + "/" + nationalId + "/" + birthDate + "/" + userName, token);
        Personal p = null;
        try {
            JSONObject jsonObject = new JSONObject(output);
            JSONObject data = ((JSONObject) jsonObject.get("data"));
            if (data != null) {
                p = new Personal();
                p.setNationalId(nationalId);
                p.setFirstName(data.getString("firstName"));
                p.setLastName(data.getString("lastName"));
                p.setFatherName(data.getString("fatherName"));
                p.setGender((String) data.get("gender"));
                p.setDateOfBirth(new Timestamp(Long.parseLong(data.get("dateOfBirth").toString())));
                p.setIdCardNumber(data.getString("idCardNumber"));
                p.setIdCardSerial1(data.getString("idCardSerial1"));
                p.setIdCardSerial2(data.getString("idCardSerial2"));

            }
        } catch (Exception ex) {
            Logger.getLogger(RestServices.class.getName()).log(Level.SEVERE, output, ex);
        }
        return p;
    }

    public void SendToCentral(SendModel model) throws Exception {
        String url = webProperties.getProperty("registration.request");
        AccessTokenManager accessTokenManager = new AccessTokenManager();
        accessTokenManager.setWebProperties(webProperties);
        JsonNode js = accessTokenManager.requestTokenWithClientCredentials(webProperties.getProperty("oauth.client_id"), webProperties.getProperty("oauth.client_secret"));
        String token = js.get("access_token").textValue();
        String result = postRequest(url, model, token);
        ObjectMapper mapper = new ObjectMapper();
        if (result != null) {
            mapper = new ObjectMapper();
            JSONObject jsonObject = new JSONObject(result);
            String data = result;
            data = (((JSONObject) jsonObject.get("data")).get("message")).toString();
            throw new Exception(data);
        }
    }

    public String SendToCentralCancelation(FilterWrapper filter, String username) throws Exception {
        String output = null;
        String url;
        Client client = ClientBuilder.newClient();
        List<NameValuePair> nameValuePairs = new ArrayList<>();
        ObjectMapper mapper = new ObjectMapper();

        try {
            String body = getResource("regiseration.service.cancel.body");
            body = body.replace("$username", username);
            if (filter != null && filter.getFilters() != null) {
                nameValuePairs.add(new BasicNameValuePair("filter", mapper.writeValueAsString(filter.getFilters())));
            }
            String paramsString = URLEncodedUtils.format(nameValuePairs, "UTF-8");
            url = webProperties.getProperty("registration.cancel");
            url = url + "?" + paramsString;

            AccessTokenManager accessTokenManager = new AccessTokenManager();
            accessTokenManager.setWebProperties(webProperties);
            JsonNode js = accessTokenManager.requestTokenWithClientCredentials(webProperties.getProperty("oauth.client_id"), webProperties.getProperty("oauth.client_secret"));
            String token = js.get("access_token").textValue();
            WebTarget webResource = client.target(url);
            Response response = webResource
                    .request(MediaType.APPLICATION_JSON)
                    .header("Authorization", String.format("Bearer %s", token))
                    .header("Content-Type", MediaType.APPLICATION_JSON)
                    .put(Entity.json(body), Response.class);
            switch (response.getStatus()) {
                case 200:
                    output = response.readEntity(String.class);
                    return String.valueOf(response.getStatus());
                default:
                    throw new Exception(String.valueOf(response.getStatus()));
            }
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        } finally {
        }
    }

    public String GetInsuranceInquiry(String gnationalCode, String guardianType) throws Exception {
        GetModel model = new GetModel();
        String output = null;
        String PensionFundCode = "NO";

        String url = webProperties.getProperty("techins.baran.service.url");
        model.setNationalCode(gnationalCode);
        model.setUserName(webProperties.getProperty("techins.baran.service.username"));
        model.setPassword(webProperties.getProperty("techins.baran.service.password"));

        Logger.getLogger(RestServices.class.getName()).log(Level.INFO, url + "urlllllllllllllllll");
        Client client = ClientBuilder.newClient();
        client.property(ClientProperties.FEATURE_AUTO_DISCOVERY_DISABLE, true);
        client.property(ClientProperties.CONNECT_TIMEOUT, 60000);
        client.property(ClientProperties.READ_TIMEOUT, 60000);
        WebTarget webResource = client.target(url);

        webResource.register(GZipEncoder.class);
        Response response = webResource
                .request(MediaType.APPLICATION_JSON)
                .header("Content-Type", MediaType.APPLICATION_JSON)
                .post(Entity.entity(model, MediaType.APPLICATION_JSON));
        ObjectMapper mapper = new ObjectMapper();

        output = response.readEntity(String.class);
        JSONObject jsonObject = new JSONObject(output);
        String data = (((JSONObject) jsonObject.get("data"))).toString();
        LinkedHashMap relation = (LinkedHashMap) mapper.readValue(data, Object.class);
        Set<String> keys = relation.keySet();
        for (String key : keys) {
            LinkedHashMap<String, Object> rwt2 = (LinkedHashMap<String, Object>) relation.get(key);
            List<LinkedHashMap<String, Object>> results = (List<LinkedHashMap<String, Object>>) rwt2.get("data");
            if (results != null) {
                if (!results.isEmpty()) {
                    LinkedHashMap<String, Object> rows = (LinkedHashMap<String, Object>) results.get(0);
                    Integer row = (Integer) rows.get("row");
                    if (row > 0 && !"taaminResponse".equals(key)) {
                        switch (key) {
                            case "retirementResponse":
                                if (!rows.get("type").equals("")) {
                                    PensionFundCode = "01";
                                }
                                break;
                            case "roostayanResponse":
                                PensionFundCode = "0K";
                                break;
                            case "sandogheBazBankRetieredResponse":
                                PensionFundCode = "0E";
                                break;
                            case "sandogheBazBankVazifeResponse":
                                PensionFundCode = "0E";
                                break;
                            case "sandogheBazBankShaghelResponse":
                                PensionFundCode = "0E";
                                break;
                            case "bankMarkaziResponse":
                                PensionFundCode = "07";
                                break;
                            case "sandogheFooladResponse":
                                PensionFundCode = "08";
                                break;
                            default:
                                // PensionFundCode = "NO";
                                break;
                        }
                    }
                }
            }
        }

        return PensionFundCode;
    }

    public String getBankAccount(String nationalId) {
        String url = webProperties.getProperty("registration.bankaccount");
        url = url.replace("{nationalid}", nationalId);
        AccessTokenManager accessTokenManager = new AccessTokenManager();
        accessTokenManager.setWebProperties(webProperties);
        JsonNode js = null;
        String output = null;
        String accountNumber = null;
        try {
            js = accessTokenManager.requestTokenWithClientCredentials(webProperties.getProperty("oauth.client_id"), webProperties.getProperty("oauth.client_secret"));
        } catch (Exception ex) {
        }
        try {
            String token = js.get("access_token").textValue();
            output = getResponseByToken(url, token);
            JSONObject jsonObject = new JSONObject(output);
            accountNumber = "123654";

        } catch (Exception ex) {
            Logger.getLogger(RestServices.class.getName()).log(Level.SEVERE, output, ex);
        }
        return accountNumber;
    }

    public List<String> getSubDominantActive(String nationalId) {
        String url = webProperties.getProperty("registration.subdominant.active");
        AccessTokenManager accessTokenManager = new AccessTokenManager();
        accessTokenManager.setWebProperties(webProperties);
        Map<String, Object> dataPage = new HashMap<>();
        JsonNode js = null;
        String output = null;
        List<String> persons = new ArrayList<String>();

        try {
            js = accessTokenManager.requestTokenWithClientCredentials(webProperties.getProperty("oauth.client_id"), webProperties.getProperty("oauth.client_secret"));
            String token = js.get("access_token").textValue();
            ObjectMapper mapper = new ObjectMapper();

            List<NameValuePair> nameValuePairs = new ArrayList<>();
            FilterWrapper filter = new FilterWrapper();
            filter.setFilters(new HashSet<Filter>());
            filter.addFilter("nationalId", Filter.Operator.EQUAL, nationalId);

            if (filter != null && filter.getFilters() != null) {
                nameValuePairs.add(new BasicNameValuePair("filter", mapper.writeValueAsString(filter.getFilters())));
            }
            String paramsString = URLEncodedUtils.format(nameValuePairs, "UTF-8");
            url = url + "?" + paramsString;

            output = getResponseByToken(url, token);
            mapper = new ObjectMapper();
            JSONObject jsonObject = new JSONObject(output);
            String data = (((JSONObject) jsonObject.get("data")).get("list")).toString();
            String total = (((JSONObject) jsonObject.get("data")).get("total")).toString();
            persons = mapper.readValue(data, mapper.getTypeFactory().constructCollectionType(List.class, Object.class));

        } catch (Exception ex) {
            Logger.getLogger(RestServices.class.getName()).log(Level.SEVERE, output, ex);
        }
        return persons;
    }

    public InsuranceRegisteration getLastForeignRelation(FilterWrapper filter, Integer start, Integer limit, String foreignId) {
        try {
            String url;
            InsuranceRegisteration bs = new InsuranceRegisteration();
            ObjectMapper mapper = new ObjectMapper();
            url = getResource("centralized.registration.get.relation.with.foreignId");
            url = url.replace("{foreignId}", foreignId);
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
            JSONObject jsonObject = new JSONObject(output);
            if (jsonObject.get("data").toString().equals("null")) {
                return null;
            }
            String data = (((JSONObject) jsonObject.get("data"))).toString();
            LinkedHashMap relation = (LinkedHashMap) mapper.readValue(data, Object.class
            );
            String organizationId = (String) relation.get("organizationId");
            String insuranceId = (String) relation.get("insuranceId");

            LinkedHashMap<String, Object> personal = (LinkedHashMap<String, Object>) relation.get("personal");

            String first = (String) personal.get("firstName");
            String last = (String) personal.get("lastName");
            Long dateOfBirth = Long.parseLong(personal.get("dateOfBirth").toString());
            String idCardNumber = (String) personal.get("idCardNumber");

            bs.setBrchCode(organizationId);
            bs.setFirstName(first);
            bs.setLastName(last);
            bs.setDoB(new Date(dateOfBirth.longValue()));
            bs.setIdCardNumber(idCardNumber);
            bs.setId(insuranceId);

            return bs;

        } catch (Exception e) {
            Logger.getLogger(RestServices.class
                    .getName()).log(Level.SEVERE, null, e);

            return null;
        }
    }

    public Map<String, Object> getWorkshopSpec(String workshopCode, String branchCode) throws Exception {
        String output = null;
        ObjectMapper mapper = new ObjectMapper();
        String url = webProperties.getProperty("workshop.insurance.id.workshop.spec").replace("{workshopCode}", workshopCode).replace("{branchCode}", branchCode);
        AccessTokenManager accessTokenManager = new AccessTokenManager();
        accessTokenManager.setWebProperties(webProperties);
        JsonNode js = accessTokenManager.requestTokenWithClientCredentials(webProperties.getProperty("oauth.client_id"), webProperties.getProperty("oauth.client_secret"));
        String token = js.get("access_token").textValue();
        try {
            output = getResponseByToken(url, token);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        JSONObject jsonObject = new JSONObject(output);
        String data = ((JSONObject) jsonObject.get("data")).toString();
        LinkedHashMap workshopData = (LinkedHashMap) mapper.readValue(data, Object.class);

        return workshopData;
    }

    public boolean sendReportToUCM(byte[] reportImage, String userName, String branchCode, String identityCode, String type) {
        initClient();
        String url;
        List<LinkedHashMap> imageList = new ArrayList<>();
        LinkedHashMap<String, Object> mapEntry = new LinkedHashMap<>();
        mapEntry.put("identityCode", identityCode);
        mapEntry.put("classification", "056");
        mapEntry.put("branchCode", branchCode);
        mapEntry.put("userName", userName);
        mapEntry.put("imageType", type);
        String strBase64 = Base64.getEncoder().encodeToString(reportImage);
        imageList.add(mapEntry);
        mapEntry.put("image", strBase64);
        //url = webProperties.getProperty("electronic.reecords.send.self.serivce.image");
        //erecord.service.url.send.file=
        url = webProperties.getProperty("occur.selfservice-ucm");
        WebTarget webResource = client.target(url);
        Response response = null;

        try {
            response = webResource.request(MediaType.APPLICATION_JSON)
                    .post(Entity.json(imageList), Response.class
                    );
            String str = response.readEntity(String.class);
            //LOGGER.log(Level.INFO, "HEMATI : CALLING_UCM_RESPONSE" + str);
            if (response.getStatus()
                    == Response.Status.CREATED.getStatusCode()) {
                return true;
            } else {
                return false;
            }
        } catch(Exception e) {
            e.printStackTrace();
            return false;
        } finally {
            if (response != null) {
                response.close();
            }
            closeClient();
        }
    }
}


