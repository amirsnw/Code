Ext.define('IncomeBank.store.baseinfo.Workshop',{
    extend: 'Ext.data.Store',
    pageSize: 10,
    autoLoad: false,
    remoteFilter: true,
    remoteSort: true,
    proxy: {
        type: 'rest',
        url: IncomeBank.helper.Urls.getUrl('workshop'),
        reader:
            { type:  'json',  rootProperty:  'data.list',  totalProperty:  'data.total' }
    }
});