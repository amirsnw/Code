Ext.define('IncomeBank.model.baseinfo.CustomersType', {
    extend: 'Ext.data.Model',
    idProperty: 'mastcusttype',
    proxy: {
        type: 'ajax',
        url: IncomeBank.helper.Urls.getUrl('customersType'),
        reader:
                {type: 'json', rootProperty: 'data.list', totalProperty: 'data.total'}
        }

});


