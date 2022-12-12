Ext.define('InsuranceTechnical.view.main.MainStatusbar', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'main-statusbar',
    requires: [
        'InsuranceTechnical.view.main.MainController',
        'InsuranceTechnical.view.main.MainModel'
    ],
    initComponent: function () {
        var me = this;
        me.callParent(arguments);
        Ext.getCmp('clientVersion').setHtml('نسخه:   '+'1.0.1' );//+ Version.CLIENT_VERSION);
        Ext.getCmp('clientVersion').setStyle('background-color', 'floralwhite');
        Ext.getCmp('clientVersion').setStyle('padding', '5px');
    },
    autoClear: 3000,
    statusAlign: 'right',
    items: [
        {
            xtype:'tbtext',
            text: 'شرکت خدمات ماشینی تامین'
        },
        '->',
        {
            xtype: 'tbtext',
            id: 'clientVersion'
        }
    ],
    border: false
});

