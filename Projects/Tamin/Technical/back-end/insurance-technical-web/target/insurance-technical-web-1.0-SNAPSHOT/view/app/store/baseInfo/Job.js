Ext.define('InsuranceTechnical.store.baseInfo.Job', {
    extend: 'Ext.data.Store',
    requires: ['InsuranceTechnical.model.baseInfo.Job'],
    model: 'InsuranceTechnical.model.baseInfo.Job',
    pageSize: 10,
    remoteFilter: true,
    remoteSort: true,
    autoLoad: false
});