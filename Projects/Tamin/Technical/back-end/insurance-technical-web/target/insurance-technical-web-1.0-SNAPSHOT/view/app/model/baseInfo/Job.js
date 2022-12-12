Ext.define('InsuranceTechnical.model.baseInfo.Job', {
    extend: 'Ext.data.Model',
    idProperty: 'id',
    proxy: {
        type: 'rest',
        url: InsuranceTechnical.helper.Urls.getUrl('Job'),
        reader: {
            type: 'json',
            rootProperty: 'data.list',
            totalProperty: 'data.total'
        }
    }
});