/**
 * Created by a_khalighi on 03/06/2019.
 */
Ext.define('InsuranceTechnical.store.insAgreement.IntroductoryReferenceStore', {
    extend: 'Ext.data.Store',
    requires: ['InsuranceTechnical.model.insAgreement.IntroductoryReference'],
    model: 'InsuranceTechnical.model.insAgreement.IntroductoryReference',
    pageSize: 10,
    remoteFilter: true,
    remoteSort: true,
    autoLoad: false,
    getRawRecords: function(){
        return Ext.Array.map(this.getData().getRange(), function(record){
            return record.data;
        });
    },
    sorters: [{
        property: 'refrenceId',
        direction: 'DESC'
    }]
});
