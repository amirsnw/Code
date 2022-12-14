Ext.define('InsuranceTechnical.store.baseInfo.CityLocal', {
    extend: 'Ext.data.Store',
    requires: ['InsuranceTechnical.model.baseInfo.CityLocal'],
    model: 'InsuranceTechnical.model.baseInfo.CityLocal',
    pageSize: 10,
    remoteFilter: true,
    remoteSort: true,
    autoLoad: false
});
