
Ext.define('InsuranceTechnical.model.baseInfo.RefundReason', {
    extend: 'Ext.data.Model',
    idProperty: 'id',
    proxy: {
        type: 'ajax',
        url: InsuranceTechnical.helper.Urls.getUrl('refundReason'),
        reader: {type: 'json', rootProperty: 'data.list', totalProperty: 'data.total'}
    }

});

