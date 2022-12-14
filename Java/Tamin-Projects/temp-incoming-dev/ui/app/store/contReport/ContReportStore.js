Ext.define('IncomeBank.store.contReport.ContReportStore', {
    extend: 'Ext.data.Store',
    model: 'IncomeBank.model.contReport.ContReport',
    remoteFilter: true,
    pageSize: 50,
    remoteSort: false,
    autoLoad: false,
});
