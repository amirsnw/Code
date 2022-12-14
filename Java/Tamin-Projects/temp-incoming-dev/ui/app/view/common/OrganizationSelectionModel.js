Ext.define('IncomeBank.view.common.OrganizationSelectionModel', {
    extend: 'Ext.app.ViewModel',
    requires: [
    ],
    alias: 'viewmodel.organizationSelection',
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


