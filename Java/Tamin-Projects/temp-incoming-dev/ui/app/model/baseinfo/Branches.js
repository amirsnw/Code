Ext.define('IncomeBank.model.baseinfo.Branches', {
    extend: 'Ext.data.Model',
    idProperty: 'brhCode',
    proxy: {
        type: 'rest',
        url: IncomeBank.helper.Urls.getUrl('branches'),
        reader: {
            type: 'json',
            rootProperty: 'data.list',
            totalProperty: 'data.total'}


    }
    // proxy: {
    //     type: 'ajax',
    //     url: IncomeBank.helper.Urls.getUrl('branches'),
    //     reader:
    //             {type: 'json', rootProperty: 'data.list', totalProperty: 'data.total'}
    //     }

});


