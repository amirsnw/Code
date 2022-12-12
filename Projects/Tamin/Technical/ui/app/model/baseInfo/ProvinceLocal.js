Ext.define('InsuranceTechnical.model.baseInfo.ProvinceLocal', {
    extend: 'Ext.data.Model',
    idProperty: 'id',
    proxy: {
        type: 'rest',
        url: InsuranceTechnical.helper.Urls.getUrl('ProvinceLocal'),
        reader: {
            type: 'json',
            rootProperty: 'data.list',
            totalProperty: 'data.total'
        }
    }
});
