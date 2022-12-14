Ext.define('InsuranceTechnical.model.baseInfo.Workshop', {
    extend: 'Ext.data.Model',
    idProperty: 'id',
    proxy: {
        type: 'ajax',
       url: InsuranceTechnical.helper.Urls.getUrl('Workshop'),
        reader: {type: 'json', rootProperty: 'data.list', totalProperty: 'data.total'}
    }
});

