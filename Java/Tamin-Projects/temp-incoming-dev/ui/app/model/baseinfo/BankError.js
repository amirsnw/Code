Ext.define('IncomeBank.model.baseinfo.BankError', {
    extend: 'Ext.data.Model',
    idProperty: 'errorId',
    proxy: {
        type: 'ajax',
        url: IncomeBank.helper.Urls.getUrl('bankError'),
        reader:
                {type: 'json', rootProperty: 'data.list', totalProperty: 'data.total'}
        }

});


