Ext.define('IncomeBank.view.main.MainHome', {
    extend: 'IncomeBank.tamin.panel.Panel',
    requires: [
        'IncomeBank.view.main.MainController',
        'IncomeBank.view.main.MainModel'
    ],
    close: 'destroy',
    alias: 'widget.home',
    controller: 'main',
    viewModel: {type: 'main'},
    title: 'صفحه نخست',
    html: '<div align="center" style="margin-top: 100px;" ></div>',
    config: {
        itemId:'WelcomePanel',
        fullscreen:true,
        layout: 'card',
        html:'<div align="center" style="margin-top: 100px;" ><img src="resources/images/welcome.png" ></div>'
    }
});


