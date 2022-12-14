Ext.define('IncomeBank.model.baseinfo.EdareKol', {
    extend: 'Ext.data.Model',
    idProperty: 'edareCode',
    proxy: {
        type: 'rest',
        url: IncomeBank.helper.Urls.getUrl('edareKol'),
        reader: {
            type: 'json',
            rootProperty: 'data.list',
            totalProperty: 'data.total'}
    }
});
