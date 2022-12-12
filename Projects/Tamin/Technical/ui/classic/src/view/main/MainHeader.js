Ext.define('InsuranceTechnical.view.main.MainHeader', {
    extend: 'Ext.container.Container',
    requires: [
        'InsuranceTechnical.view.main.MainController',
        'InsuranceTechnical.view.main.MainModel'
    ],
    xtype: 'main-header',
    // controller: 'main',
    // viewModel: {type: 'main'},
    height: 70,
    items:[
        {
            xtype:'container',
            cls:'site-header'
        }
    ]
});

