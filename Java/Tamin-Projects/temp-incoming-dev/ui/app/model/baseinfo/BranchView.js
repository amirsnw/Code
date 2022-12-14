Ext.define('IncomeBank.model.baseinfo.BranchView', {
    extend: 'Ext.data.Model',
    idProperty: 'brhCode',
    proxy: {
        type: 'rest',
        url: IncomeBank.helper.Urls.getUrl('branchView'),
        reader: {
            type: 'json',
            rootProperty: 'data.list',
            totalProperty: 'data.total'
        }
    }
});
