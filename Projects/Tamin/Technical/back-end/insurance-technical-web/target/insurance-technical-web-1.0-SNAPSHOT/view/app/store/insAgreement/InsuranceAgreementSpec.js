/**
 * Created by a_khalighi on 03/06/2019.
 */
Ext.define('InsuranceTechnical.store.insAgreement.InsuranceAgreementSpecStore', {
    extend: 'Ext.data.Store',
    requires: ['InsuranceTechnical.model.insAgreement.InsuranceAgreementSpec'],
    model: 'InsuranceTechnical.model.insAgreement.InsuranceAgreementSpec',
    pageSize: 10,
    autoLoad: false,
    remoteFilter: true,
    remoteSort: true,
    /*sorters: [{
        property: 'createDate',
        direction: 'DESC'
    }],*/
    getRawRecords: function() {
        return Ext.Array.map(this.getData().getRange(), function(record){
            return record.data;
        });
    },
});
