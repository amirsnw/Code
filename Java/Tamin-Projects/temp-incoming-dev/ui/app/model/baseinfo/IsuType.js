Ext.define('IncomeBank.model.baseinfo.IsuType', {
    extend: 'Ext.data.Model',
    idProperty: 'isutypecode',
    proxy: {
        type: 'ajax',
        url: IncomeBank.helper.Urls.getUrl('isuType'),
        reader:
                {type: 'json', rootProperty: 'data.list', totalProperty: 'data.total'}
        }

});


