Ext.define('IncomeBank.model.baseinfo.IsuStatus', {
    extend: 'Ext.data.Model',
    idProperty: 'isustatcode',
    proxy: {
        type: 'ajax',
        url: IncomeBank.helper.Urls.getUrl('isuStatus'),
        reader:
                {type: 'json', rootProperty: 'data.list', totalProperty: 'data.total'}
        }

});


