Ext.define('InsuranceTechnical.store.baseInfo.BranchStore', {
  // extend: 'InsuranceTechnical.tamin.data.Store',
    extend:'Ext.data.Store',
    pageSize: 10,
    autoLoad: true,
    remoteFilter: true,
    remoteSort: true,
    sorters: [{
        property: 'branchCode',
        direction: 'ASC'
    }],
    proxy: {
        type: 'ajax',
        url: InsuranceTechnical.helper.Urls.getUrl('Branch'),
        reader: {type: 'json', rootProperty: 'data.list', totalProperty: 'data.total'}
    },
    getRawRecords: function() {
        return Ext.Array.map(this.getData().getRange(), function(record){
            return record.data;
        });
    },
});

