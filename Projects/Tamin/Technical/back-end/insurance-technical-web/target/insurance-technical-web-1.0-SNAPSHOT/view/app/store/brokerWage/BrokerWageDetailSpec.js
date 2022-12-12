/**
 * Created by a_khalighi on 03/06/2019.
 */
Ext.define('InsuranceTechnical.store.brokerWage.BrokerWageDetailSpecStore', {
    extend: 'Ext.data.Store',
    requires: ['InsuranceTechnical.model.brokerWage.BrokerWageDetailSpec'],
    model: 'InsuranceTechnical.model.brokerWage.BrokerWageDetailSpec',
    pageSize: 10,
    autoLoad: false,
    remoteFilter: true,
    remoteSort: true,
    sorters: [{
        property: 'reportRow',
        direction: 'DESC'
    }],
    getRawRecords: function(){
        return Ext.Array.map(this.getData().getRange(), function(record){
            return record.data;
        });
    },
});
