Ext.define('InsuranceTechnical.store.baseInfo.BranchByFilterStore', {
  // extend: 'InsuranceTechnical.tamin.data.Store',
    extend:'Ext.data.Store',
    requires: ['InsuranceTechnical.model.baseInfo.BranchByFilter'],
    model: 'InsuranceTechnical.model.baseInfo.BranchByFilter',
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

