Ext.define('InsuranceTechnical.view.guardian.GuardianSpecModel',
    {
        extend: 'Ext.app.ViewModel',
        alias: 'viewmodel.guardian-spec-model',
        stores: {
            insuranceRegisterations: {
                xclass: 'InsuranceTechnical.store.InsuranceRegisterationStore'
            },
            guardianStore: {
                xclass: 'InsuranceTechnical.store.guardian.guardianStore',
                sorters: [{
                    property: 'branchResponder',
                    direction: 'ASC'
                }],
            },
            branchStore: {
                xclass: 'InsuranceTechnical.store.baseInfo.BranchStore',
                sorters: [{
                    property: 'branchCode',
                    direction: 'ASC'
                }],
                filters: [
                    {
                        property: 'branchKind',
                        value: '1',
                        operator: 'EQUAL'
                    },
                    {
                        property: 'status',
                        value: '1',
                        operator: 'EQUAL'
                    }
                ]

            },
            branchStore2: {
                xclass: 'InsuranceTechnical.store.baseInfo.BranchStore',
                sorters: [{
                    property: 'branchCode',
                    direction: 'ASC'
                }],
                filters: [
                    {
                        property: 'branchKind',
                        value: '1',
                        operator: 'EQUAL'
                    },
                    {
                        property: 'status',
                        value: '1',
                        operator: 'EQUAL'
                    }
                ]
            },
            branch: {
                xclass: 'InsuranceTechnical.store.baseInfo.BranchStore'
            },
            imageStore: {
                xclass: 'InsuranceTechnical.store.guardian.ImageStore'
            }
        }
    });