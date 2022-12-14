Ext.define('InsuranceTechnical.store.refund.refundReasonStore', {
    extend: 'Ext.data.Store',
    pageSize: 10,
    autoLoad: true,
    remoteFilter: true,
    remoteSort: true,
    proxy: {
        type: 'ajax',
        url: InsuranceTechnical.helper.Urls.getUrl('refundReason'),
        reader: {type: 'json', rootProperty: 'data.list', totalProperty: 'data.total'}
    }
});