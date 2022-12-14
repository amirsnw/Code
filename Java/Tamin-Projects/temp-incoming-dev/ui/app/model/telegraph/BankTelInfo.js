Ext.define('IncomeBank.model.telegraph.BankTelInfo', {
    extend: 'Ext.data.Model',
    proxy: {
        type: 'ajax',
        url: IncomeBank.helper.Urls.getUrl('bankTelInfo'),
        reader:
                {type: 'json', rootProperty: 'data.list', totalProperty: 'data.total'}
        }

});
