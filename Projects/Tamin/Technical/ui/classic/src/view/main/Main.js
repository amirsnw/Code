Ext.define('InsuranceTechnical.view.main.Main', {
    extend: 'Ext.panel.Panel',
    xtype: 'app-main',
    requires: [
        'Ext.*',
        'Ext.rtl.*',
        'Ext.plugin.Viewport'
    ],
    bodyStyle: {
        background: '#d3e1f1'
    },
    rtl: true,
    controller: 'main',
    viewModel: 'main',
    layout: {type: 'border'},
    items: [
        {
            xtype: 'main-header',
            region: 'north'
        },

        {
            xtype: 'main-toolbar',
            region: 'north'
        },

        {
            xtype: 'main-statusbar',
            region: 'south'
        },
        {
            xtype: 'main-sidebar',
            region: 'west',
        },
        {
            xtype: 'panel',
            region: 'center',
            border: false,
            id: 'mainContainer'
        }
    ],
    listeners: {
         beforerender: function (sender, eOpts) {
             var me = this;
             me.getController().getUserName();
         },
        afterrender: function () {
            var spinner = Ext.get('loader');
            spinner.fadeOut({
                callback: function () {
                    spinner.destroy();
                }
            });
        }
    }
});
