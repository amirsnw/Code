Ext.define('IncomeBank.model.baseinfo.AllCalcOpBanks', {
    extend: 'Ext.data.Model',
    idProperty: 'code',
    proxy: {
        type: 'ajax',
        url: IncomeBank.helper.Urls.getUrl('allCalcOpBanks'),
        reader:
                {type: 'json', rootProperty: 'data.list', totalProperty: 'data.total'}
        }

});


