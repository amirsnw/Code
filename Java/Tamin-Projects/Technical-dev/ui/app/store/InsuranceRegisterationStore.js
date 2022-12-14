Ext.define('InsuranceTechnical.store.InsuranceRegisterationStore', {
    extend: 'Ext.data.Store',
    requires: ['InsuranceTechnical.model.InsuranceRegisteration'],
    model: 'InsuranceTechnical.model.InsuranceRegisteration',
    pageSize: 10,
    remoteFilter: true,
    remoteSort: true,
    autoLoad: false,
    getRawRecords: function() {
        return Ext.Array.map(this.getData().getRange(), function(record){
            return record.data;
        });
    },
});
