Ext.define('InsuranceTechnical.store.baseInfo.WorkshopStore', {
    extend:'Ext.data.Store',
    requires: ['InsuranceTechnical.model.baseInfo.Workshop'],
    model: 'InsuranceTechnical.model.baseInfo.Workshop',
    pageSize: 10,
    autoLoad: false,
    remoteFilter: true,
    remoteSort: true,
    getRawRecords: function(){
        return Ext.Array.map(this.getData().getRange(), function(record){
            return record.data;
        });
    },
});

