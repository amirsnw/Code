
Ext.define('InsuranceTechnical.model.baseInfo.InsuranceType', {
    extend: 'Ext.data.Model',
    idProperty: 'id',
    proxy: {
        type: 'ajax',
       url: InsuranceTechnical.helper.Urls.getUrl('InsuranceType'),
        reader: {type: 'json', rootProperty: 'data.list', totalProperty: 'data.total'}
    }

});

