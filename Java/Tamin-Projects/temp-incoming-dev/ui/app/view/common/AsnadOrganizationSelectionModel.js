Ext.define('IncomeBank.view.common.AsnadOrganizationSelectionModel', {
    extend: 'Ext.app.ViewModel',
    requires: [
    ],
    alias: 'viewmodel.asnadOrganizationSelection',
    stores: {
        OrganizationTree: {type: 'tree'},
        SelectedOrganization: {
            type: 'store',
            fields: ['organization', 'id']
        },
    },
    formulas: {

    }
});


