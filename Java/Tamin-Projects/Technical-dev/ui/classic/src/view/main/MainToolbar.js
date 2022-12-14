Ext.define('InsuranceTechnical.view.main.MainToolbar', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'main-toolbar',
    requires: [
        'InsuranceTechnical.view.main.MainController',
        'InsuranceTechnical.view.main.MainModel',
        'Ext.toolbar.Toolbar'
    ],
    border: false,
    //controller: 'main',
    id: 'main-menu',
    viewModel: {type: 'main'}
});

