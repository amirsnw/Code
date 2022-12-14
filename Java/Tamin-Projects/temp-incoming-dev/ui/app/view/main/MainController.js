Ext.define('IncomeBank.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',
    routes: {
        ':view': 'processRoute',
        ':view/:id': 'processRoute',
        ':view/:id/:p1': 'processRoute',
        ':view/:id/:p1/:p2': 'processRoute'
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

//        var currentView = this.getView().items.items[5];
        var lastView = this.getView().items.items.length - 1;
        if (lastView >= 5)
            var currentView = this.getView().items.items[lastView];

//        if (currentView !== undefined && currentView.xtype === view) {
//            return;
//        }
//        if (currentView !== undefined && currentView.xtype !== view) {
        if (currentView !== undefined) {
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
        if (arguments[0].action === 'telInfo3070') {
            this.redirectTo('telInfo/1');
        } else if (arguments[0].action === 'telInfoWindow') {
            this.redirectTo('telInfo/2');
        } else {
            this.redirectTo(arguments[0].action);
        }
    },
    getUserName: function () {
        var me = this;
        var userRoleDesc = null;
        Ext.Ajax.request(
            {
                url: IncomeBank.helper.Urls.getUrl('ApplicationURI'),
                headers: {'Authorization': 'Bearer ' + Tamin.security.TokenStorage.retrieve()},
                success: function (response) {
                    if (response.getResponseHeader('content-type') === 'text/html') {
                        var rndInt = Math.floor(Math.random() * (9001)) + 100;
                        window.location = IncomeBank.helper.Urls.getUrl('ServerAddress') + '/index.html?tn=' + rndInt;
                    } else {
                        var obj = Ext.JSON.decode(response.responseText);
                        if (obj.data.roles !== null) {
                            IncomeBank.getApplication().addCache('userRole', []);
                            for (var i = 0; i < obj.data.roles.length; i++) {
                                if (obj.data.roles[i].roleName === "INCOME BANK SETAD USER") {
                                    var userRoleArray = IncomeBank.getApplication().getCache('userRole');
                                    userRoleArray.push('SETAD_USER');
                                    IncomeBank.getApplication().addCache('userRole', userRoleArray);
                                    IncomeBank.getApplication().addCache('userOrganizationCode', obj.data.organization.code);
                                    userRoleDesc = 'ستاد مرکزی';
                                } else if (obj.data.roles[i].roleName === "INCOME BANK BRANCH USER") {
                                    var userRoleArray = IncomeBank.getApplication().getCache('userRole');
                                    userRoleArray.push('BRANCH_USER');
                                    IncomeBank.getApplication().addCache('userRole', userRoleArray);
                                    IncomeBank.getApplication().addCache('userOrganizationCode', obj.data.organization.code);
                                    userRoleDesc = 'کاربر شعبه بانک درآمد';
                                } else if (obj.data.roles[i].roleName === "INCOME BANK BRANCH ACCOUNTANT") {
                                    var userRoleArray = IncomeBank.getApplication().getCache('userRole');
                                    userRoleArray.push('BRANCH_ACCOUNTANT');
                                    IncomeBank.getApplication().addCache('userRole', userRoleArray);
                                    IncomeBank.getApplication().addCache('userOrganizationCode', obj.data.organization.code);
                                    userRoleDesc = 'مسئول حسابداری شعبه';
                                } else if (obj.data.roles[i].roleName === "INCOME BANK BRANCH BOSS") {
                                    var userRoleArray = IncomeBank.getApplication().getCache('userRole');
                                    userRoleArray.push('BRANCH_BOSS');
                                    IncomeBank.getApplication().addCache('userRole', userRoleArray);
                                    IncomeBank.getApplication().addCache('userOrganizationCode', obj.data.organization.code);
                                    userRoleDesc = 'رئیس شعبه';
                                } else if (obj.data.roles[i].roleName === "INCOME BANK KARGZARI USER") {
                                    var userRoleArray = IncomeBank.getApplication().getCache('userRole');
                                    userRoleArray.push('KARGZARI_USER');
                                    IncomeBank.getApplication().addCache('userRole', userRoleArray);
                                    IncomeBank.getApplication().addCache('userOrganizationCode', obj.data.organization.code);
                                    userRoleDesc = 'کاربر کارگزاری بانک درآمد';
                                }
                            }
                            IncomeBank.getApplication().addCache('userRoleDesc', userRoleDesc);
                            me.getViewModel().set('userName', obj.data.firstName + ' ' + obj.data.lastName + ' - ' + userRoleDesc + obj.data.organization.code);
                            // me.generateSideBar();
                            // me.initMenu();
                        }
                    }
                },
                failure: function (response, opts) {
                    Tamin.window.MessageBox.showError('پیام سیستم', Ext.JSON.decode(response.responseText).data);
//                    Tamin.redirectToLogin();
                }

            });

    },
});
