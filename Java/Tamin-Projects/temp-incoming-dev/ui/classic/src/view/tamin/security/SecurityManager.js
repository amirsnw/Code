Ext.define('IncomeBank.tamin.security.SecurityManager', {
    singleton: true,
    requires:['IncomeBank.model.TokenStorage'],
    initialize: function () {
        Ext.Ajax.on('beforerequest', function (conn, options) {
            options.headers = options.headers || {};
            options.headers['Authorization'] = 'Bearer ' + Tamin.security.TokenStorage.retrieve();
        });
        Ext.Ajax.on('requestexception', function (conn, response, options, eOpts) {
            if (response.status === 401) {
                Tamin.redirectToLogin();
            }
        });
    }
});
