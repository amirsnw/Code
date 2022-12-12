Ext.define('InsuranceTechnical.store.refund.refundDebitStore', {
    extend: 'Ext.data.Store',
    pageSize: 10,
    autoLoad: false,
    remoteFilter: true,
    remoteSort: true,
    proxy: {
        type: 'ajax',
        url: InsuranceTechnical.helper.Urls.getUrl('refundDebitGrid'),
        reader: {type: 'json', rootProperty: 'data.list', totalProperty: 'data.total'}
    },
    getRawRecords: function(){
        return Ext.Array.map(this.getData().getRange(), function(record){
            return record.data;
        });
    }
});
