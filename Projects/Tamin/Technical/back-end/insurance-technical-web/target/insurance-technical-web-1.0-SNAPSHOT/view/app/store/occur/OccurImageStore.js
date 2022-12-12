Ext.define('InsuranceTechnical.store.occur.OccurImageStore', {
    extend: 'Ext.data.Store',
    requires: ['InsuranceTechnical.model.occur.OccurImage'],
    model: 'InsuranceTechnical.model.occur.OccurImage',
    pageSize: 30,
    autoLoad: false,
    remoteFilter: true,
    remoteSort: true,
});