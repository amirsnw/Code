Ext.define('InsuranceTechnical.model.baseInfo.CityLocal', {
    extend: 'Ext.data.Model',
    idProperty: 'id',
    proxy: {
        type: 'rest',
        url: InsuranceTechnical.helper.Urls.getUrl('CityLocal'),
        reader: {
            type: 'json',
            rootProperty: 'data.list',
            totalProperty: 'data.total'
        }
    }
});
