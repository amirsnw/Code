/**
 * Created by a_khalighi on 03/06/2019.
 */
Ext.define('InsuranceTechnical.store.insAgreement.AgreementCategoryTypeStore', {
    extend: 'Ext.data.Store',
    requires: ['InsuranceTechnical.model.insAgreement.AgreementCategoryType'],
    model: 'InsuranceTechnical.model.insAgreement.AgreementCategoryType',
    pageSize: 10,
    autoLoad: false,
    remoteFilter: true,
    remoteSort: true,
    getRawRecords: function(){
        return Ext.Array.map(this.getData().getRange(), function(record){
            return record.data;
        });
    },
    /*sorters: [{
        property: 'code',
        direction: 'DESC'
    }]*/
});
