Ext.define('InsuranceTechnical.store.baseInfo.RefundReasonStore', {
    extend: 'Ext.data.Store',
    requires: ['InsuranceTechnical.model.baseInfo.RefundReason'],
    model: 'InsuranceTechnical.model.baseInfo.RefundReason',
    pageSize: 10,
    autoLoad: true,
    remoteFilter: true,
    remoteSort: true,
//    proxy: {
//        type: 'ajax',
//        url: InsuranceTechnical.helper.Urls.getUrl('Branch'),
//        reader: {type: 'json', rootProperty: 'data.list', totalProperty: 'data.total'}
//    }


});
