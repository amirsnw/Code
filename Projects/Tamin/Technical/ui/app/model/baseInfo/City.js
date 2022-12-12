Ext.define('InsuranceTechnical.model.baseInfo.City', {
    extend: 'Ext.data.Model',
    idProperty: 'id',
    proxy: {
        type: 'rest',
        url: InsuranceTechnical.helper.Urls.getUrl('City'),
        reader: {
            type: 'json',
            rootProperty: 'data.list',
            totalProperty: 'data.total'
        }
    }
});