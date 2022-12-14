package ir.tamin.insurance.technical.util;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import javax.annotation.Resource;
import javax.enterprise.context.RequestScoped;
import javax.sql.DataSource;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

/**
 *
 * @author p_pourjahani
 */
@RequestScoped
public class StoredProcedure {

    @Resource(lookup = "datasources/TechnicalInsuranceDS")
    private DataSource dataSource;
    private Map<Integer, Object> inParams;
    private Map<Integer, Integer> outParams;
    private String query;
    private CallableStatement statement;
    private Connection connection;
    private boolean executed = false;

    public StoredProcedure() {
        inParams = new HashMap<>();
        outParams = new HashMap<>();
    }

    @PostConstruct
    public void init() {
    }

    public void clear() {
        inParams.clear();
        outParams.clear();
    }

    public StoredProcedure query(String queryString) {
        this.query = queryString;
        clear();
        executed = false;
        return this;
    }

    public StoredProcedure setInParameter(int index, Object o) {
        inParams.put(index, o);
        return this;
    }

    public StoredProcedure setOutParameter(int index, int sqlType) {
        outParams.put(index, sqlType);
        return this;
    }

    public Object getOutParameter(int index) throws SQLException {
        if (!executed) {
            execute();
        }
        return statement.getObject(index);
    }

    public void execute() throws SQLException {
        if (connection == null || !connection.isValid(10)) {
            connection = dataSource.getConnection();
        }
        statement = connection.prepareCall(query);
        for (Integer index : inParams.keySet()) {
            statement.setObject(index, inParams.get(index));
        }

        for (Integer index : outParams.keySet()) {
            statement.registerOutParameter(index, outParams.get(index));
        }

        statement.execute();
        executed = true;
    }

    @PreDestroy
    public void destroy() throws SQLException {
        if (statement != null) {
            statement.close();
        }

        if (connection != null) {
            connection.close();
        }
    }
}
