Ext.define('InsuranceTechnical.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',
    routes: {
        ':view': 'processRoute',
        ':view/:id': 'processRoute',
        ':view/:id/:p1/:p2': 'processRoute'
    },
    init: function () {
        var me = this;
    },
    initMenu: function () {
        var me = this;
        var store = me.getViewModel().getStore('navigation');
        store.load({
            callback: function (records, operation, success) {
                if (success) {
                    me.generateMenu(records);
                }
            }
        });
    },
    onAppUpdate: function () {
        Ext.Msg.confirm('بروز رسانی نرم افزار', 'این نرم افزار دارای بروز رسانی است ، بارگذاری مجدد؟',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    },
    processRoute: function (view) {
        var me = this;
        if (this.getView() === null) {
            return;
        }

        if (this.getView().items.items.length < 5) {
            return;
        }

        if (Ext.ClassManager.getByAlias('widget.' + view) === null) {
            view = 'notfound';
        }

        Ext.require(Ext.ClassManager.getByAlias('widget.' + view));


        var currentView = this.getView().items.items[5];
        // var currentView = this.getView().items.items[this.getView().items.items.length-1];

        if (currentView !== undefined && currentView.xtype === view) {
            return;
        }

        if (currentView !== undefined && currentView.xtype !== view) {
            currentView.el.fadeOut({
                opacity: .25,
                callback: function () {
                    me.getView().remove(currentView, true);
                    me.getView().add({xtype: view, region: 'center'});
                }
            });
        }
    },
    handleMenuAction: function () {
        var me = this;
        me.redirectTo(arguments[0].action);
    },
    getUserName: function () {
        var me = this;
        Ext.Ajax.request(
            {
                headers: {'Authorization': 'Bearer ' + InsuranceTechnical.helper.TokenStorage.retrieve()},
                url: InsuranceTechnical.helper.Urls.getUrl('CurrentUser') + '/current-user',
                success: function (response) {
                    if (response.getResponseHeader('content-type') === 'text/html') {
                        var rndInt = Math.floor(Math.random() * (9001)) + 100;
                    } else {
                        var rolesArray = [];
                        var text = response.responseText;
                        var map = Ext.JSON.decode(text);
                        me.getViewModel().set('userName', map.data.firstName + ' ' + map.data.lastName);
                        InsuranceTechnical.getApplication().addCache('user', map.data);
                        me.getViewModel().set('user', map.data);
                        InsuranceTechnical.getApplication().addCache('organizationCode', map.data.organization.code);
                        me.getViewModel().set('organizationCode', map.data.organization.code + '- ' + map.data.organization.organizationName);

                        if (map.data !== undefined && map.data !== null) {
                            Ext.Object.each(map.data.roles, function (property, value) {
                                if (value !== '') {
                                    rolesArray.push(value.roleName);
                                }
                            });
                            InsuranceTechnical.getApplication().addCache('rolesArray', rolesArray);

                            /*if (rolesArray.includes('PILOT_USER_TECH')) {
                             var sidebarNode = document.createRange().createContextualFragment('<li><a href="#refund-spec" class="hvr-underline-from-center"><img src="resources/images/esterdad.png"></a></li>');
                             me.getView().body.dom.getElementsByClassName('sidebar-items')[0].appendChild(sidebarNode);
                             }*/
                        }
                    }
                    me.generateSideBar(rolesArray);
                    me.initMenu();
                },
                failure: function (responseا/*record, operation*/) {
                    var rndInt = Math.floor(Math.random() * (9001)) + 100;
                }
            });
    },
    generateSideBar: function (rolesArray) {
        var result = '<ul class="sidebar-items">';
        var userRoleArray = InsuranceTechnical.getApplication().getCache('rolesArray');
        deactiveStyle = 'style="-webkit-filter: grayscale(100%);filter: grayscale(100%);"';
        if (!userRoleArray.includes('PROV HEAD USER TECHNICAL')
            && !userRoleArray.includes('GENERAL USER TECHNICAL')
            && !userRoleArray.includes('PROV HEAD USER TECHNICAL')
            && !userRoleArray.includes('MANAGER_USER_TECH')
            && !userRoleArray.includes('HEAD USER TECHNICAL')
            && !userRoleArray.includes('INSPECTOR USER TECHNICAL')) {
            result += '<li><img src="resources/images/07.png" ' + deactiveStyle + '></li>';
            result += '<li><img src="resources/images/esterdad.png" ' + deactiveStyle + '></li>';
            if (rolesArray.includes('PILOT_USER_TECH')) {
                result += '<li><img src="resources/images/hadese.png" ' + deactiveStyle + '></li>';
                /*result += '<li><img src="resources/images/Agreement.png" ' + deactiveStyle + '></li>';*/
                result += '<li><img src="resources/images/broker-wage.png" ' + deactiveStyle + '></li>';
            }

        } else {
            result += '<li><a href="#guardian-spec" class="hvr-underline-from-center"><img src="resources/images/07.png"></a></li>';
            result += '<li><a href="#refund-spec" class="hvr-underline-from-center"><img src="resources/images/esterdad.png"></a></li>';
            if (rolesArray.includes('PILOT_USER_TECH')) {
                result += '<li><a href="#occur-spec" class="hvr-underline-from-center"><img src="resources/images/hadese.png"></a></li>';
                /*result += '<li><a href="#insurance-agreement-spec" class="hvr-underline-from-center"><img src="resources/images/Agreement.png"></a></li>';*/
                result += '<li><a href="#broker-wage-spec" class="hvr-underline-from-center"><img src="resources/images/broker-wage.png"></a></li>';
            }
        }
        result += '</ul>';
        this.getViewModel().set('sideBar', result);
    },
    generateMenu: function (records) {
        var me = this;
        var menu = Ext.getCmp('main-menu');
        menu.removeAll();
        var userRole = InsuranceTechnical.getApplication().getCache('rolesArray');
        menu.add({
            text: 'صفحه نخست',
            action: 'home',
            handler: 'handleMenuAction'
        });
        Ext.each(records, function (item) {
            menu.add({
                text: item.data.caption,
                disabled: !me.hasRole(item.data.items[0].roles, userRole),
                menu: me.generateSubMenus(item.data.items[0].items)

            });
        });
        me.generateUserMenu();
    },
    generateSubMenus: function (data) {
        if (data === undefined) {
            return null;
        }
        var me = this;
        var result = Ext.create('Ext.menu.Menu');
        //var innerMenu = null;
        Ext.each(data, function (item) {
            var innerMenu = null;
            if (item.items !== undefined) {
                innerMenu = me.generateSubMenus(item.items);
            }
            result.add({
                text: item.caption,
                menu: innerMenu,
                iconCls: item.icon,
                action: item.name,
                handler: 'handleMenuAction'
            });
        });
        return result;
    },
    generateUserMenu: function () {
        var menu = Ext.getCmp('main-menu');
        menu.add('->');
        menu.add(
            {
                xtype: 'button',
                iconCls: 'icon user',
                bind: {text: '{userName}'},
                menu: Ext.create('Ext.menu.Menu', {
                    showSeparator: false,
                    items: [{
                        text: 'خروج',
                        iconCls: 'icon door_out',
                        showSeparator: false,
                        handler: function () {
                            //window.location.replace('/centralized-registration/logout');
                            Tamin.logout();
                        }
                    }]
                }),
                text: 'کاربر'
            }
        );
    },
    hasRole: function (arr1, arr2) {
        var result = arr1.filter(function (n) {
            return arr2.indexOf(n) > -1;
        });
        return result.length !== 0;
    }
});
