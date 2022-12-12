Ext.define('InsuranceTechnical.store.baseInfo.City', {
    extend: 'Ext.data.Store',
    requires: ['InsuranceTechnical.model.baseInfo.City'],
    model: 'InsuranceTechnical.model.baseInfo.City',
    pageSize: 10,
    remoteFilter: true,
    remoteSort: true,
    autoLoad: false
});