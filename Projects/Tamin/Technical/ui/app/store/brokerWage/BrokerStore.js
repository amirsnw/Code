Ext.define('InsuranceTechnical.store.brokerWage.BrokerStore', {
  // extend: 'InsuranceTechnical.tamin.data.Store',
    extend:'Ext.data.Store',
    requires: ['InsuranceTechnical.model.brokerWage.Broker'],
    model: 'InsuranceTechnical.model.brokerWage.Broker',
    pageSize: 10,
    autoLoad: false,
    remoteFilter: true,
    remoteSort: true,
    sorters: [{
        property: 'branchCode',
        direction: 'ASC'
    }],
    getRawRecords: function() {
        return Ext.Array.map(this.getData().getRange(), function(record){
            return record.data;
        });
    },
});

