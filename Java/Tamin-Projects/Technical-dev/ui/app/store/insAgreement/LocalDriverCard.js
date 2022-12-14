/**
 * Created by a_khalighi on 03/06/2019.
 */
Ext.define('InsuranceTechnical.store.insAgreement.LocalDriverCardStore', {
    extend: 'Ext.data.Store',
    requires: ['InsuranceTechnical.model.insAgreement.LocalDriverCard'],
    model: 'InsuranceTechnical.model.insAgreement.LocalDriverCard',
    pageSize: 10,
    autoLoad: false,
    getRawRecords: function() {
        return Ext.Array.map(this.getData().getRange(), function(record){
            return record.data;
        });
    },
    sorters: [{
        property: 'rowSeq',
        direction: 'ASC'
    }]
});
