Ext.define('IncomeBank.model.telegraph.TelSumDaily', {
    extend: 'Ext.data.Model',
    proxy: {
        type: 'ajax',
        url: IncomeBank.helper.Urls.getUrl('telSumDaily'),
        reader:
            {type: 'json', rootProperty: 'data.list', totalProperty: 'data.total'}
    }

});
