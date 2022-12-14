Ext.define('IncomeBank.model.contReport.ContReport', {
    extend: 'Ext.data.Model',
    proxy: {
        type: 'rest',
        url: IncomeBank.helper.Urls.getUrl('ContradictionReport'),
        reader: {
            type: 'json',
            rootProperty: 'data.list',
            totalProperty: 'data.total'
        }
    }
});
