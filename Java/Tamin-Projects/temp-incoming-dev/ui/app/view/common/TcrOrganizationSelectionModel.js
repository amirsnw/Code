Ext.define('IncomeBank.view.common.TcrOrganizationSelectionModel', {
    extend: 'Ext.app.ViewModel',
    requires: [
    ],
    alias: 'viewmodel.tcrOrganizationSelection',
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


