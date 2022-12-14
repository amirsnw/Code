Ext.define('IncomeBank.view.main.MainStatusbar', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'main-statusbar',
    requires: [
        'IncomeBank.view.main.MainController',
        'IncomeBank.view.main.MainModel'
    ],
    autoClear: 3000,
    statusAlign: 'right',
    initComponent: function () {
        var me = this;
        me.callParent(arguments);
        Ext.getCmp('clientVersion').setHtml('نسخه:   ' +  "1400/04/14");
        me.expiresIn = Number(window.localStorage.getItem('expires_in'));
        me.tokenTime = new Date(window.localStorage.getItem('tokenTime'));
        me.tokenTime.setSeconds(me.tokenTime.getSeconds() + me.expiresIn);
    },
    items: [
        {
            xtype: 'tbtext',
            // text: 'شرکت خدمات ماشینی تامین',
            html: '<a href="http://taminn.org" target="_blank">شرکت مشاور مدیریت و خدمات ماشینی تامین</a>'
        },
        '-',
        {
            xtype: 'tbtext',
            id: 'token-timeout'
        },
        '->',
        {
            xtype: 'tbtext',
            id: 'clientVersion'
        }
    ],
    border: false
});

