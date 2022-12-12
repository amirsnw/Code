Ext.define('InsuranceTechnical.store.baseInfo.Organization', {
    extend:'Ext.data.Store',
    model: 'InsuranceTechnical.model.baseInfo.OrganizationNew',
    pageSize: 10,
    remoteFilter: true,
    remoteSort: true,
    autoLoad:true
});

