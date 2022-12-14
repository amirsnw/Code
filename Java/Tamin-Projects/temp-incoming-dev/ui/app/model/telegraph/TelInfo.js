Ext.define('IncomeBank.model.telegraph.TelInfo', {
    extend: 'Ext.data.Model',
    proxy: {
        type: 'ajax',
        url: IncomeBank.helper.Urls.getUrl('telInfo'),
        reader:
                {type: 'json', rootProperty: 'data.list', totalProperty: 'data.total'}
        }

});
