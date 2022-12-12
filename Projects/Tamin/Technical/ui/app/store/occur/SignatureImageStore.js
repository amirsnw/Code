Ext.define('InsuranceTechnical.store.occur.SignatureImageStore', {
    extend: 'Ext.data.Store',
    requires: ['InsuranceTechnical.model.occur.SignatureImage'],
    model: 'InsuranceTechnical.model.occur.SignatureImage',
    pageSize: 30,
    autoLoad: false,
    remoteFilter: true,
    remoteSort: true,
});