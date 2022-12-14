Ext.define('IncomeBank.model.baseinfo.HelpType', {
    extend: 'Ext.data.Model',
    idProperty: 'subSystemId',
    proxy: {
        type: 'ajax',
        url: IncomeBank.helper.Urls.getUrl('helpTypes'),
        reader:
                {type: 'json', rootProperty: 'data.list', totalProperty: 'data.total'}
        }

});


