Ext.define('IncomeBank.view.common.DoctorsOrganizationSelectionModel',
        {
            extend: 'Ext.app.ViewModel',
            alias: 'viewmodel.doctorsOrganizationSelectionModel',
            stores:
                    {
                        doctorsTree: {type: 'tree'},
                        selectedDoctorsTree: {
                            type: 'store'
                        }
                    }
        });
