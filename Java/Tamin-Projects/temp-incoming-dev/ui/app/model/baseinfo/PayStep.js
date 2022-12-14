Ext.define('IncomeBank.model.baseinfo.PayStep', {
    extend: 'Ext.data.Model',
    idProperty: 'code',
    proxy: {
        type: 'ajax',
        url: IncomeBank.helper.Urls.getUrl('paySteps'),
        reader:
                {type: 'json', rootProperty: 'data.list', totalProperty: 'data.total'}
        }

});
