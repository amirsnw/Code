/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('IncomeBank.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.main',

    data: {
        name: 'IncomeBank'
    },

    stores: {
        navigation: {model: 'IncomeBank.model.Navigation'}
    }
});
