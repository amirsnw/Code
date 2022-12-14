Ext.define('InsuranceTechnical.model.InsuranceRegisteration', {
    extend: 'Ext.data.Model',
    idProperty: 'rowId',
    proxy: {
        type: 'ajax',
       url: InsuranceTechnical.helper.Urls.getUrl('InsuranceRegisteration'),
        reader: {
            type: 'json', 
            rootProperty: 'data.list', 
            totalProperty: 'data.total'
        }
    }
});

