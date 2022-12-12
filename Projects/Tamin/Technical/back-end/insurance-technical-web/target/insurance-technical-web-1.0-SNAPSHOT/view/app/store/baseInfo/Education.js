Ext.define('InsuranceTechnical.store.baseInfo.Education', {
    extend: 'Ext.data.Store',
    requires: ['InsuranceTechnical.model.baseInfo.Education'],
    model: 'InsuranceTechnical.model.baseInfo.Education',
    pageSize: 10,
    remoteFilter: true,
    remoteSort: true,
    autoLoad: false
});