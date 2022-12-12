Ext.define('InsuranceTechnical.view.main.MainSidebar', {
    extend: 'InsuranceTechnical.tamin.panel.Panel',
    requires: [
        'InsuranceTechnical.view.main.MainController',
        'InsuranceTechnical.view.main.MainModel'
    ],
    xtype: 'main-sidebar',
    // controller: 'main',
    title: 'امکانات سیستم',
    // viewModel: {type: 'main'},
    width: 130,
    split: true,
    collapsible: true,
    scrollable: true,
    border: true,
    bind : {
        html:'{sideBar}'
    }
//    html: '<ul class="sidebar-items">' +
//        '<li><a href="#guardian-spec" class="hvr-underline-from-center"><img src="resources/images/07.png"></a></li>' +
//        '<li><a href="#refund-spec" class="hvr-underline-from-center"><img src="resources/images/esterdad.png"></a></li>' +
//        '<li><a href="#insurance-agreement-spec" class="hvr-underline-from-center"><img src="resources/images/Agreement.png"></a></li>' +
//        '<li><a href="#occur-spec" class="hvr-underline-from-center"><img src="resources/images/hadese.png"></a></li>'
});


