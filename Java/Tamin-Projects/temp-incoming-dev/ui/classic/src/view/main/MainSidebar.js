Ext.define('IncomeBank.view.main.MainSidebar', {
    extend: 'IncomeBank.tamin.panel.Panel',
    requires: [
        'IncomeBank.view.main.MainController',
        'IncomeBank.view.main.MainModel'
    ],
    xtype: 'main-sidebar',
    controller: 'main',
    title: 'امکانات سیستم',
    viewModel: {type: 'main'},
    width: 130,
    split: true,
    collapsible: true,
    scrollable: true,
    border: true,
    // html: '<ul class="sidebar-items">' +
    // '<li><a href="#dftRoznameh" class="hvr-underline-from-center"><img src="resources/images/journal.png"></a></li>' +
    // '<li><a href="#bankBill" class="hvr-underline-from-center"><img src="resources/images/buill2.png"></a></li>' +
    // '<li><a href="#cardBank" class="hvr-underline-from-center"><img src="resources/images/bankCardNew.png"></a></li>' +
    // '<li><a href="#compdet" class="hvr-underline-from-center"><img src="resources/images/moghyerat.png"></a></li>' +
    // '<li><a href="#comperr" class="hvr-underline-from-center"><img src="resources/images/changeReports.png"></a></li>' +
    // '</ul>'

});


