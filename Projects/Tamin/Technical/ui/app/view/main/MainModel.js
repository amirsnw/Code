/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('InsuranceTechnical.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.main',

    data: {
        name: 'InsuranceTechnical'
    },

    stores: {
        navigation: {model: 'InsuranceTechnical.model.Navigation'}
    }
});
