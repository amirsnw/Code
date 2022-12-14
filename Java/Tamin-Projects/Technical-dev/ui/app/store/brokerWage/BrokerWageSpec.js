/**
 * Created by a_khalighi on 03/06/2019.
 */
Ext.define('InsuranceTechnical.store.brokerWage.BrokerWageSpecStore', {
    extend: 'Ext.data.Store',
    requires: ['InsuranceTechnical.model.brokerWage.BrokerWageSpec'],
    model: 'InsuranceTechnical.model.brokerWage.BrokerWageSpec',
    pageSize: 10,
    autoLoad: true,
    remoteFilter: true,
    remoteSort: true,
    sorters: [{
        property: 'createDate',
        direction: 'DESC'
    }],
    getRawRecords: function(){
        return Ext.Array.map(this.getData().getRange(), function(record){
            return record.data;
        });
    },
});
