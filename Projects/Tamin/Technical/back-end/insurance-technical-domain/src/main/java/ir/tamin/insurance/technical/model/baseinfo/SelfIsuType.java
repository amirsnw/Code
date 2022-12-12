package ir.tamin.insurance.technical.model.baseinfo;

import ir.tamin.framework.domain.AbstractEntity;

import javax.persistence.Table;

@Table(name = "TB_SELFISUTYPECODE" ,schema="baseinfo")
public class SelfIsuType extends AbstractEntity<String> {

    @Override
    public String getIdentifierInstance() {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

}
