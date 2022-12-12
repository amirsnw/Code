Ext.define('InsuranceTechnical.view.refund.RefundCreateReqModel',
        {
            extend: 'Ext.app.ViewModel',
            alias: 'viewmodel.refund-create-req-model',
            formulas: {
                refundReqDisabler: {
                    bind: {
                        reqType: '{refundInfo.requestType}'
                    },
                    get: function (data) {

                        if (data.reqType === '1') {
                            return false;
                        } else {
                            this.set('refundInfo.requesterType', null);
                            this.set('refundInfo.reasonFanni', null);
                            this.set('refundInfo.isuDeadDate', null);
                            return true;
                        }
                    }
                },
                guardianDDDisabler: {
                    bind: {
                        reqType: '{refundInfo.requesterType}',
                        guardianReqDisabler: '{guardianReqDisabler}'
                    },
                    get: function (data) {
                        if (data.reqType !== '1' || data.guardianReqDisabler) {
                            this.set('refundInfo.isuDeadDate', null);
                            return true;
                        } else {
                            return false;
                        }
                    }
                },
                guardianReqReasonDisabler: {
                    bind: {
                        reqType: '{refundInfo.requesterType}',
                        guardianReqDisabler: '{guardianReqDisabler}'
                    },
                    get: function (data) {
                        if (data.reqType !== '2' || data.guardianReqDisabler) {
                            this.set('refundInfo.reasonFanni', null);
                            return true;
                        } else {
                            return false;
                        }
                    }
                },
                hasDoctor: {
                    bind: {
                        haveMedicalDoc: '{refundInfo.haveMedicalDoc}'
                    },
                    get: function (data) {
                        
                        return data.haveMedicalDoc === '1';
                    },
                    set: function (value) {
                        
                        if (value === true) {
                            this.set('refundInfo.haveMedicalDoc', '1');
                        } else {
                            this.set('refundInfo.haveMedicalDoc', '0');
                            this.set('refundInfo.doctorCode', '');
                            this.set('refundInfo.doctorName', '');
                        }
                    }
                },
                doctorDisabled: {
                    bind: {
                        hasDoctor: '{hasDoctor}'
                    },
                    get: function (data) {
                        return !data.hasDoctor;
                    }
                },
                secondGDisabled: {
                    bind: {
                        guardianType: '{refundInfo.guardianType}'
                    },
                    get: function (data) {
                        return data.guardianType !== '4';
                    }
                },
                firstNameLabel: {
                    bind: {
                        guardianType: '{refundInfo.guardianType}'
                    },
                    get: function (data) {
                        var label = 'نام و نام خانوادگی';
                        switch (data.guardianType) {
                            case '1':
                            case '4':
                                return label + ' پدر';
                            case '2':
                                return label + ' مادر';
                            case '3':
                                return label + ' شوهر';
                            case '5':
                                return label + ' پسر';
                            case '6':
                                return label + ' دختر';
                            default:
                                return label;
                        }
                    }
                },
                SecondNameLabel: {
                    bind: {
                        guardianType: '{refundInfo.guardianType}'
                    },
                    get: function (data) {
                        var label = 'نام و نام خانوادگی';
                        if (data.guardianType === '4')
                            return label + ' مادر';
                        else
                            return label;
                    }
                }
            },
            stores: {
                insuranceRegisterations: {
                    xclass: 'InsuranceTechnical.store.InsuranceRegisterationStore'
                },
                refundStore: {
                    xclass: 'InsuranceTechnical.store.refund.refundStore'
                },
                cityStore: {
                    xclass: 'InsuranceTechnical.store.baseInfo.City'
                },
                refundRelationStore :{
                    xclass: 'InsuranceTechnical.store.refund.refundRelationStore'
                },               
                refundPaymentStore :{
                    xclass: 'InsuranceTechnical.store.refund.refundPaymentStore'                    
                },               
                subDominantStore :{
                    xclass: 'InsuranceTechnical.store.refund.subDominantStore'                    
                },
                refundDetailStore :{
                    xclass: 'InsuranceTechnical.store.refund.refundDetailStore'
                },
                refundDebitStore :{
                    xclass: 'InsuranceTechnical.store.refund.refundDebitStore'
                }
            }
        });
