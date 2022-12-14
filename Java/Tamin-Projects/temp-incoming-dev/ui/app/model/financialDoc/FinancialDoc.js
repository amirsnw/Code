Ext.define('IncomeBank.model.financialDoc.FinancialDoc', {
    extend: 'Ext.data.Model',
    proxy: {
        type: 'rest',
        url: IncomeBank.helper.Urls.getUrl('FinancialDoc'),
        reader: {
            type: 'json',
            rootProperty: 'data.list',
            totalProperty: 'data.total'
        }
    }
});
