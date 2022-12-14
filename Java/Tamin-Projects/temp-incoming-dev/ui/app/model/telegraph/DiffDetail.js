Ext.define('IncomeBank.model.telegraph.DiffDetail', {
    extend: 'Ext.data.Model',
    idProperty: 'rowId',
    proxy: {
        type: 'ajax',
        url: IncomeBank.helper.Urls.getUrl('diffDetail'),
        reader:
                {type: 'json', rootProperty: 'data.list', totalProperty: 'data.total'}
        }

});
