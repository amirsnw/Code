Ext.define('InsuranceTechnical.store.baseInfo.Province', {
    extend: 'Ext.data.Store',
    requires: ['InsuranceTechnical.model.baseInfo.Province'],
    model: 'InsuranceTechnical.model.baseInfo.Province',
    pageSize: 10,
    remoteFilter: true,
    remoteSort: true,
    autoLoad: false
});