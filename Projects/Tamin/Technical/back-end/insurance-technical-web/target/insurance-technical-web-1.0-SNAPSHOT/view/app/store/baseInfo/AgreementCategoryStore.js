Ext.define('InsuranceTechnical.store.baseInfo.AgreementCategoryStore', {
//    extend: 'InsuranceTechnical.tamin.data.Store',
    extend: 'Ext.data.Store',
    model: 'InsuranceTechnical.model.baseInfo.AgreementCategory',
    pageSize: 10,
    autoLoad: true,
    remoteFilter: false,
    remoteSort: true,
    sorters: [{
        property: 'agreementCategoryId',
        direction: 'ASC'
    }],
    proxy: {
        type: 'ajax',
        url: InsuranceTechnical.helper.Urls.getUrl('AgreementCategory'),
        reader: {type: 'json', rootProperty: 'data.list', totalProperty: 'data.total'}
    }
});
