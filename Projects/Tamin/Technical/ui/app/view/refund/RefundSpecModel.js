Ext.define('InsuranceTechnical.view.refund.RefundSpecModel',
        {
            extend: 'Ext.app.ViewModel',
            alias: 'viewmodel.refund-spec-model',
            stores: {
                insuranceRegisterations: {
                    xclass: 'InsuranceTechnical.store.InsuranceRegisterationStore'
                },
                refundStore: {
                    xclass: 'InsuranceTechnical.store.refund.refundStore',
                    sorters: [{
                            property: 'branchCode',
                            direction: 'ASC'
                        }]
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
                refundReasonStore: {
                    xclass: 'InsuranceTechnical.store.baseInfo.RefundReasonStore',
                    sorters: [{
                            property: 'reasonCode',
                            direction: 'ASC'
                        }]
                }
            }
        });