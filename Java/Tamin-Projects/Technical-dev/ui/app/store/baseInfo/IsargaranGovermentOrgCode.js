Ext.define('InsuranceTechnical.store.baseInfo.IsargaranGovermentOrgCode', {
    extend:'Ext.data.Store',
    model: 'InsuranceTechnical.model.baseInfo.IsargaranGovermentOrgCode',
    pageSize: 10,
    autoLoad: true,
    remoteFilter: false,
    remoteSort: true,
    proxy: {
        type: 'ajax',
        url: InsuranceTechnical.helper.Urls.getUrl('IsargaranGovermentOrgCode'),
        reader: {type: 'json', rootProperty: 'data.list', totalProperty: 'data.total'}
    }
});
