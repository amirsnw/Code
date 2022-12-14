Ext.define('IncomeBank.view.main.MainToolbar', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'main-toolbar',
    requires: [
        'IncomeBank.view.main.MainController',
        'IncomeBank.view.main.MainModel',
        'Ext.toolbar.Toolbar'
    ],
    border: false,
    controller: 'main',
    viewModel: {type: 'main'},
    initComponent: function () {
        this.callParent();
        var me = this;
        var store = this.getViewModel().getStore('navigation');
        store.load({
            callback: function (records, operation, success) {
                if (success) {
                    me.generateMenu(records);
                }
            }
        });
    },
    generateMenu: function (records) {
        var me = this;
        me.getUserName()
                .then(function (data) {
                    me.add({
                        text: 'صفحه نخست',
                        action: 'home',
                        handler: 'handleMenuAction'
                    });
                    Ext.each(records, function (item) {
                        var serverRoles = [];
                        var clientRoles = item.data.roles;
                        data.forEach(function (item1) {
                            serverRoles.push(item1.roleName);
                        });

                       if (serverRoles !== undefined && clientRoles !== undefined && (Ext.Array.intersect(serverRoles, clientRoles).length != 0)) {

                            me.add({
                                text: item.data.caption,
                                menu: me.generateSubMenus(item.data.items, serverRoles)

                            });
                       }


                    });
                    me.generateUserMenu();
                })
                .catch(function () {
                    me.generateUserMenu();
                    console.log('An error has been occured.')
                });
    },
    getUserName: function () {
        var me = this;
        return new Promise(function (resolve, reject) {
            Ext.Ajax.request(
                    {
                        headers: {'Authorization': 'Bearer ' + IncomeBank.helper.TokenStorage.retrieve()},
                        url: IncomeBank.helper.Urls.getUrl('Users') + '/current-user',
                        success: function (response) {
                            var obj = Ext.decode(response.responseText);
                            resolve(obj.data.roles);
                            me.lookupViewModel().set('userName', obj.data.firstName + ' ' + obj.data.lastName);

                            if (response.getResponseHeader('content-type') === 'text/html') {
                                var rndInt = Math.floor(Math.random() * (9001)) + 100;
                            } else {
                                var text = response.responseText;
                                var map = Ext.JSON.decode(text);
                                IncomeBank.getApplication().addCache('user',map.data);
                                IncomeBank.getApplication().addCache('organizationCode', map.data.organization.code);
                                me.getViewModel().set('user',map.data);
                            }
                        },
                        failure: function (/*record, operation*/) {
                            reject();

                            var rndInt = Math.floor(Math.random() * (9001)) + 100;
                        }
                    });
        });
    },
    generateSubMenus: function (data, roles) {
        if (data === undefined) {
            return null
        }
        var me = this;
        var result = Ext.create('Ext.menu.Menu');
        //var innerMenu = null;
        Ext.each(data, function (item) {
            var innerMenu = null;
            if (item.items !== undefined) {
                innerMenu = me.generateSubMenus(item.items, roles);
            }
            var serverRoles = roles;
            var clientRoles = item.roles;
           if (serverRoles !== undefined && clientRoles !== undefined && (Ext.Array.intersect(serverRoles, clientRoles).length != 0)) {


                result.add({
                    text: item.caption,
                    menu: innerMenu,
                    iconCls: item.icon,
                    action: item.name,
                    handler: 'handleMenuAction'
                });
           }
        });
        return result;
    },
    generateUserMenu: function () {
        this.add('->');
        this.add(
                {
                    xtype: 'button',
                    iconCls: 'icon user',
                    bind: {text: '{user.firstName} {user.lastName} - {user.organization.organizationName}'},
                    menu: Ext.create('Ext.menu.Menu', {
                        showSeparator: false,
                        items: [{
                                text: 'خروج',
                                iconCls: 'icon door_out',
                                showSeparator: false,
                                handler: function () {
                                    Tamin.logout();
                                }
                            }]
                    }),
                    text: 'کاربر'
                }
        );

    }
});




