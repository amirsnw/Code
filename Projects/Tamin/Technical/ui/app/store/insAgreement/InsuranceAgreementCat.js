/**
 * Created by a_khalighi on 03/06/2019.
 */
Ext.define('InsuranceTechnical.store.insAgreement.InsuranceAgreementCatStore', {
    extend: 'Ext.data.Store',
    requires: ['InsuranceTechnical.model.insAgreement.InsuranceAgreementCat'],
    model: 'InsuranceTechnical.model.insAgreement.InsuranceAgreementCat',
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
        property: 'categoryTypeCode',
        direction: 'DESC'
    }]
});
