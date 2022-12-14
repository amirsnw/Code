/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.ws.rest;

import ir.tamin.incomeBank.util.DateUtils;
import ir.tamin.framework.ws.rest.ResponseHelper;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.annotation.Resource;
import javax.inject.Inject;
import javax.sql.DataSource;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import oracle.sql.TIMESTAMP;

@Path("/sql")
@Produces(MediaType.APPLICATION_JSON)
public class SQLExecutionRESTService {

/*    @Inject
    DataSource dataSource;*/
    @Resource(lookup = "datasources/coreaccountDS")
    private DataSource dataSource;

    @Path("execute")
    @POST
    public Response execute(String sqlString) {
        boolean isDml = false;
        if (!sqlString.toUpperCase().startsWith("SELECT")) {
            isDml = true;
        }

        ResultSet resultSet = null;
        try (Connection connection = dataSource.getConnection();
                PreparedStatement statement = connection.prepareStatement(sqlString)) {
            if (isDml) {
                return ResponseHelper.ok(statement.executeUpdate());
            } else {
                List<Map<String, Object>> jsonResultSet = new ArrayList<>();
                resultSet = statement.executeQuery();
                ResultSetMetaData metaData = resultSet.getMetaData();
                int columnCount = metaData.getColumnCount();
                Map<String, Object> row;
                while (resultSet.next()) {
                    row = new HashMap<>(columnCount);
                    for (int i = 1; i <= columnCount; i++) {
                        Object object = resultSet.getObject(i);
                        if (object instanceof TIMESTAMP) {
                            object = DateUtils.format(((TIMESTAMP) object).dateValue(), "yyyyMMdd");
                        }
                        row.put(metaData.getColumnName(i), object);
                    }
                    jsonResultSet.add(row);
                }

                return ResponseHelper.ok(jsonResultSet);
            }
        } catch (SQLException e) {
            throw new WebApplicationException(e);
        } finally {
            if (resultSet != null) {
                try {
                    resultSet.close();
                } catch (SQLException ignored) {

                }
            }
        }
    }

}
