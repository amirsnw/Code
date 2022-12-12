
Ext.define('InsuranceTechnical.model.baseInfo.InsuranceStatus', {
    extend: 'Ext.data.Model',
    idProperty: 'id',
    proxy: {
        type: 'ajax',
       url: InsuranceTechnical.helper.Urls.getUrl('InsuranceStatus'),
        reader: {type: 'json', rootProperty: 'data.list', totalProperty: 'data.total'}
    }

});


