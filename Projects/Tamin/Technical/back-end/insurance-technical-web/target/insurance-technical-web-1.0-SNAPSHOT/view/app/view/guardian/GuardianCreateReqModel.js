Ext.define('InsuranceTechnical.view.guardian.GuardianCreateReqModel',
        {
            extend: 'Ext.app.ViewModel',
            alias: 'viewmodel.guardian-create-req-model',
            formulas: {
                guardianReqDisabler: {
                    bind: {
                        reqType: '{guardianInfo.requestType}'
                    },
                    get: function (data) {
                        if (data.reqType === '1') {
                            return false;
                        } else {
                            this.set('guardianInfo.requesterType', null);
                            this.set('guardianInfo.reasonFanni', null);
                            this.set('guardianInfo.isuDeadDate', null);
                            return true;
                        }
                    }
                },
                guardianCancelDisabler: {
                    bind: {
                        reqType: '{guardianInfo.requestType}'
                    },
                        get: function (data) {
                        if (data.reqType === '2') {
                            return false;  
                        }
                    }
                },
                guardianDDDisabler: {
                    bind: {
                        reqType: '{guardianInfo.requesterType}',
                        guardianReqDisabler: '{guardianReqDisabler}'
                    },
                    get: function (data) {
                        if (data.reqType !== '1' || data.guardianReqDisabler) {
                            this.set('guardianInfo.isuDeadDate', null);
                            return true;
                        } else {
                            return false;
                        }
                    }
                },
                guardianReqReasonDisabler: {
                    bind: {
                        reqType: '{guardianInfo.requesterType}',
                        guardianReqDisabler: '{guardianReqDisabler}'
                    },
                    get: function (data) {

                        if (data.reqType !== '2' || data.guardianReqDisabler) {
                            this.set('guardianInfo.reasonFanni', null);
                            return true;
                        } else {
                            return false;
                        }
                    }
                },
                hasDoctor: {
                    bind: {
                        haveMedicalDoc: '{guardianInfo.haveMedicalDoc}'
                    },
                    get: function (data) {
                        return data.haveMedicalDoc === '1';
                    },
                    set: function (value) {
                        if (value === true) {
                            this.set('guardianInfo.haveMedicalDoc', '1');
                        } else {
                            this.set('guardianInfo.haveMedicalDoc', '0');
                            this.set('guardianInfo.doctorCode', '');
                            this.set('guardianInfo.doctorName', '');
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
                        guardianType: '{guardianInfo.guardianType}'
                    },
                    get: function (data) {
                        return data.guardianType !== '4';
                    }
                },
                firstNameLabel: {
                    bind: {
                        guardianType: '{guardianInfo.guardianType}'
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
                        guardianType: '{guardianInfo.guardianType}'
                    },
                    get: function (data) {
                        var label = 'نام و نام خانوادگی';
                        if (data.guardianType === '4')
                            return label + ' مادر';
                        else
                            return label;
                    }
                },
                saveDisable: {
                    bind: {
                        status: '{guardianInfo.status}'
                    },
                    get: function (data) {
                        //return ['1', '2', '4'].includes(data.status);
                        return ['1', '2','8'].includes(data.status);
                    }

                },
                isForeign: {
                    bind: {
                        nationality: '{guardianInfo.nationality}'
                    },
                    get: function (data) {
                        switch (data.nationality) {
                            case '1':
                                return false;
                                break;
                            case '2':
                                return true;
                                break;
                            default:
                                return false;
                        }
                    }
                },
                isGuar1Foreign: {
                    bind: {
                        nationality: '{guardianInfo.guar1Nationality}'
                    },
                    get: function (data) {
                        switch (data.nationality) {
                            case '1':
                                return false;
                                break;
                            case '2':
                                return true;
                                break;
                            default:
                                return false;
                        }
                    }
                },
                isGuar2Foreign: {
                    bind: {
                        nationality: '{guardianInfo.guar2Nationality}'
                    },
                    get: function (data) {
                        switch (data.nationality) {
                            case '1':
                                return false;
                                break;
                            case '2':
                                return true;
                                break;
                            default:
                                return false;
                        }
                    }
                }
            },
            stores: {
                insuranceRegisterations: {
                    xclass: 'InsuranceTechnical.store.InsuranceRegisterationStore'
                },
                cityStore: {
                    xclass: 'InsuranceTechnical.store.baseInfo.City'
                }
            }
        });
