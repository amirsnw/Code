Ext.define('IncomeBank.view.main.MainHeader', {
    extend: 'Ext.container.Container',
    requires: [
        'IncomeBank.view.main.MainController',
        'IncomeBank.view.main.MainModel'
    ],
    xtype: 'main-header',
    controller: 'main',
    viewModel: {type: 'main'},
    height: 70,
    items:[
        {
            xtype:'container',
            cls:'site-header'
        }
    ]
});

