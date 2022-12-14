Ext.define('IncomeBank.model.baseinfo.OperationBank', {
    extend: 'Ext.data.Model',
    idProperty: 'code',
    proxy: {
        type: 'ajax',
        url: IncomeBank.helper.Urls.getUrl('getAllOPBanks'),
        reader:
                {type: 'json', rootProperty: 'data.list', totalProperty: 'data.total'}
        }

});


