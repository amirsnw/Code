Ext.define('InsuranceTechnical.store.refund.refundPaymentStore', {
    extend: 'Ext.data.Store',
    pageSize: 10,
    autoLoad: false,
    remoteFilter: true,
    remoteSort: true,
    proxy: {
        type: 'ajax',
        url: InsuranceTechnical.helper.Urls.getUrl('refundPayment'),
        reader: {type: 'json', rootProperty: 'data.list', totalProperty: 'data.total'}
    }
});