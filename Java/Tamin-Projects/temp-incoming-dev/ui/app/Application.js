Ext.define('IncomeBank.Application', {
    extend: 'Ext.app.Application',
    requires: [
        'IncomeBank.helper.TokenStorage',
        'IncomeBank.tamin.*',
        'IncomeBank.view.*'
    ],
    name: 'IncomeBank',
    defaultToken: 'home',
    stores: [],
    launch: function () {
        var me = this;
        var globalAjaxOpsTimeout = 10000000;

        Ext.Ajax.setTimeout(globalAjaxOpsTimeout);

        Ext.override(Ext.form.Basic, {
            timeout: Ext.Ajax.getTimeout() / 1000
        });
        Ext.override(Ext.data.proxy.Server, {
            constructor: function (config) {
                var me = this;
                config.timeout = Ext.Ajax.getTimeout();
                me.callParent(arguments);
            }
        });
        Ext.override(Ext.data.Connection, {
            constructor: function (config) {
                var me = this;
                config.timeout = Ext.Ajax.getTimeout();
                me.callParent(arguments);
            }
        });
        me.initializeSecurity();
        me.initializeVTypes();
    },
    initializeSecurity: function () {
        Ext.Ajax.on('beforerequest', function (conn, options) {
            options.headers = options.headers || {};
            options.headers['Authorization'] = 'Bearer ' + IncomeBank.helper.TokenStorage.retrieve();
        });
        Ext.Ajax.on('requestexception', function (conn, response, options, eOpts) {
            if (response.status === 401) {
                Tamin.redirectToLogin();
            }
        });
    },
    initializeVTypes: function () {
        Ext.apply(Ext.form.field.VTypes, {
            inic: function (value, field) {
                if (value.length !== 10 && value.length !== 13)
                    return false;

                if (value.length === 10) {
                    if (value === '0000000000')
                        return false;
                    if (value === '1111111111')
                        return false;
                    if (value === '2222222222')
                        return false;
                    if (value === '3333333333')
                        return false;
                    if (value === '4444444444')
                        return false;
                    if (value === '5555555555')
                        return false;
                    if (value === '6666666666')
                        return false;
                    if (value === '7777777777')
                        return false;
                    if (value === '8888888888')
                        return false;
                    if (value === '9999999999')
                        return false;

                    var sum = 0;

                    for (var i = 0; i < 9; i++) {
                        sum += value.charAt(i) * (10 - i);
                    }

                    var s = Math.floor(sum / 11);

                    var a = sum - s * 11;

                    var astr = a.toString();

                    var c = value.charAt(9);

                    var difa = 11 - a;
                    difa = difa.toString();

                    return (a === 0 && astr === c) || (a === 1 && c === '1') || (a > 1 && c === difa);
                } else {
                    return true;
                }

            },
            inicText: 'کدملي/کد اتباع خارجي معتبر نميباشد'
        });
        Ext.apply(Ext.form.field.VTypes, {
            greaterThenToday: function (value, field) {
                var tmp = IncomeBank.tamin.utils.PersianHelper.getGregorianDate(value);
                var date = new Date(tmp[0], tmp[1] - 1, tmp[2]);
                var today = new Date();
                today.setHours(0, 0, 0, 0)
                return date <= today;
            },
            greaterThenTodayText: 'تاریخ وارد شده می بایست ار تاریخ امروز کوچکتر باشد.'
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
    cache: {},
    addCache: function (name, value) {
        this.cache[name] = value;
    },
    getCache: function (name) {
        return this.cache[name];
    }
});
