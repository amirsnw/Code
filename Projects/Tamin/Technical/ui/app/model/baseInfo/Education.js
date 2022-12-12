Ext.define('InsuranceTechnical.model.baseInfo.Education', {
    extend: 'Ext.data.Model',
    idProperty: 'id',
    proxy: {
        type: 'rest',
        url: InsuranceTechnical.helper.Urls.getUrl('Education'),
        reader: {
            type: 'json',
            rootProperty: 'data.list',
            totalProperty: 'data.total'
        }
    }
});