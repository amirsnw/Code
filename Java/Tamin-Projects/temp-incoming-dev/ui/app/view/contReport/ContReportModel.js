Ext.define('IncomeBank.view.contReport.ContReportModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.contReportModel',
    stores: {
        contReportStore: {xclass: 'IncomeBank.store.contReport.ContReportStore'},
    }
});
