Ext.define('IncomeBank.model.baseinfo.Provinces', {
    extend: 'Ext.data.Model',
    idProperty: 'provinceCode',
    proxy: {
        type: 'ajax',
        url: IncomeBank.helper.Urls.getUrl('provinces'),
        reader:
                {type: 'json', rootProperty: 'data.list', totalProperty: 'data.total'}
        }

});


