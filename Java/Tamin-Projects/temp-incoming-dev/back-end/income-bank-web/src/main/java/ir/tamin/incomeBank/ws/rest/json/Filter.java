/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ir.tamin.incomeBank.ws.rest.json;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import lombok.Data;

/**
 *
 * @author e_shoghi
 */
@Data
public class Filter {
public enum Operator {
        _EQUAL("equal"), EQUAL("eq"), NOT_EQUAL("neq"), LIKE("like"), BETWEEN("between"), AFTER("after"),
        BEFORE("before"), IN("in"), NOT_IN("nin"), GREATER_THAN_OR_EQUAL("gte"), LESS_THAN_OR_EQUAL("lte"),
        GREATER_THAN("gt"), LESS_THAN("lt"), IS_NULL("isn"), IS_NOT_NULL("inn"), MAX("max");

        private String name;

        Operator(String name) {
            this.name = name;
        }

        @JsonCreator
        public static Operator fromString(String value) {
            return getValue(value);
        }

        @JsonValue
        public String fromObject(Operator operator) {
            return operator.name;
        }

        public static Operator getValue(String value) {
            for (Operator operator : Operator.values()) {
                if (operator.name.equalsIgnoreCase(value))
                    return operator;
            }
            return null;
        }
    }

    private String property;
    private String value;
    private Operator operator;

    public String getProperty() {
        return property;
    }

    public void setProperty(String property) {
        this.property = property;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public Operator getOperator() {
        return operator;
    }

    public void setOperator(Operator operator) {
        this.operator = operator;
    }
}
