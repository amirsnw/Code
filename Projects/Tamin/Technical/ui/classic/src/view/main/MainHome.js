Ext.define('InsuranceTechnical.view.main.MainHome', {
    extend: 'InsuranceTechnical.tamin.panel.Panel',
    requires: [
        'InsuranceTechnical.view.main.MainController',
        'InsuranceTechnical.view.main.MainModel'
    ],
    close: 'destroy',
    alias: 'widget.home',
    controller: 'main',
    viewModel: {type: 'main'},
    title: 'صفحه نخست',
    config: {
        itemId:'WelcomePanel',
        fullscreen:true,
        layout: 'card',
        html:'<div align="center" style="margin-top: 100px;" ><img src="resources/images/welcome.png" ></div>'
    }
});


