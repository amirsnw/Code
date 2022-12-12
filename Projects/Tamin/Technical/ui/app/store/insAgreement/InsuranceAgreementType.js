/**
 * Created by a_khalighi on 03/06/2019.
 */
Ext.define('InsuranceTechnical.store.insAgreement.InsuranceAgreementTypeStore', {
    extend: 'Ext.data.Store',
    requires: ['InsuranceTechnical.model.insAgreement.InsuranceAgreementType'],
    model: 'InsuranceTechnical.model.insAgreement.InsuranceAgreementType',
    pageSize: 10,
    autoLoad: false,
    remoteFilter: true,
    remoteSort: true,
    getRawRecords: function(){
        return Ext.Array.map(this.getData().getRange(), function(record){
            return record.data;
        });
    },
    sorters: [{
        property: 'insuranceTypeCode',
        direction: 'DESC'
    }]
});
