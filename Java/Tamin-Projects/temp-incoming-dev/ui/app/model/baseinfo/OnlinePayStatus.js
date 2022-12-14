Ext.define('IncomeBank.model.baseinfo.OnlinePayStatus', {
    extend: 'Ext.data.Model',
    idProperty: 'code',
    proxy: {
        type: 'ajax',
        url: IncomeBank.helper.Urls.getUrl('onlinePayStatus'),
        reader:
                {type: 'json', rootProperty: 'data.list', totalProperty: 'data.total'}
        }

});


