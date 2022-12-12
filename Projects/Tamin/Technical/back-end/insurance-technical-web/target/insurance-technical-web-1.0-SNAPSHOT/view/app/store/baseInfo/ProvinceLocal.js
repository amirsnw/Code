Ext.define('InsuranceTechnical.store.baseInfo.ProvinceLocal', {
    extend: 'Ext.data.Store',
    requires: ['InsuranceTechnical.model.baseInfo.ProvinceLocal'],
    model: 'InsuranceTechnical.model.baseInfo.ProvinceLocal',
    pageSize: 10,
    remoteFilter: true,
    remoteSort: true,
    autoLoad: false
});
