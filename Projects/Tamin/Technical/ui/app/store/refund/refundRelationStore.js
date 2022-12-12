Ext.define('InsuranceTechnical.store.refund.refundRelationStore', {
    extend: 'Ext.data.Store',
    pageSize: 10,
    autoLoad: true,
    remoteFilter: true,
    remoteSort: true,
    proxy: {
        type: 'ajax',
        url: InsuranceTechnical.helper.Urls.getUrl('refundRelation'),
        reader: {type: 'json', rootProperty: 'data.list', totalProperty: 'data.total'}
    }
});
