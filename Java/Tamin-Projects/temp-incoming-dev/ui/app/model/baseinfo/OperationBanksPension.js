Ext.define('IncomeBank.model.baseinfo.OperationBanksPension', {
    extend: 'Ext.data.Model',
    idProperty: 'code',
    proxy: {
        type: 'ajax',
        url: IncomeBank.helper.Urls.getUrl('getAllPensionOPBanks'),
        reader:
                {type: 'json', rootProperty: 'data.list', totalProperty: 'data.total'}
        }

});


