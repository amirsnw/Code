Ext.define('IncomeBank.view.common.HealthOrganizationSelectionModel',
        {
            extend: 'Ext.app.ViewModel',
            alias: 'viewmodel.healthOrganizationSelectionModel',
            stores:
                    {
                        healthTree: {type: 'tree'},
                        selectedHealthTree: {
                            type: 'store',
                            fields: ['organization', 'id']
                        }
                    }
        });
