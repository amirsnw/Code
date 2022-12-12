Ext.define('InsuranceTechnical.store.guardian.ImageStore', {
    extend: 'Ext.data.Store',
    requires: ['InsuranceTechnical.model.guardian.Image'],
    model: 'InsuranceTechnical.model.guardian.Image',
    pageSize: 30,
    autoLoad: false,
    remoteFilter: true,
    remoteSort: true,
});
