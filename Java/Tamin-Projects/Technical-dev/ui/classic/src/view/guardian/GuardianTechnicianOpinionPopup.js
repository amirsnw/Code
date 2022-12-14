Ext.define('InsuranceTechnical.view.guardian.GuardianTechnicianOpinionPopup',
        {
            extend: 'InsuranceTechnical.tamin.window.Window',
            title: 'نظریه مسئول فنی',
            xtype: 'guardian-tech-opinion',
            id: 'guardianTechnicianOpinionPopup',
            width: '65%',
            modal: true,
            bodyPadding: 5,
            closeAction: 'destroy',
            defaultFocus: 'deffocus',
            reference: 'guardianTechnicianOpinionPopup',
            autoScroll: true,
            items: [
                {
                    xtype: 'tform',
                    id: 'guardian-form-report',
                    items: [
                        {
                            xtype: 'tfieldset',
                            defaults: {
                                labelWidth: 110,
                                width: '96%',
                                margin: 5,
                            },
                            layout: {
                                type: 'table',
                                columns: 2,
                                tableAttrs: {
                                    style: {width: '98%'}
                                }
                            },
                            items: [
                                {
                                    xtype: 'tdisplayfield',
                                    fieldLabel: 'شماره بیمه',
                                    name: 'insurancId.id',
                                    minLengthText: 'شماره بیمه ده رقمی میباشد.',
                                    bind: {
                                        value: '{guardianInfo.insuranceId}'
                                    }
                                },
                                {
                                    xtype: 'tdisplayfield',
                                    fieldLabel: 'نام و نام خانوادگی',
                                    // colspan: 2,
                                    bind: {
                                        value: '{guardianName}'
                                    }
                                },
                                {
                                    xtype: 'tdisplayfield',
                                    fieldLabel: 'شماره مستمری',
                                    bind: {
                                        value: '{guardianInfo.pensionNo}'

                                    }
                                },
                                {
                                    xtype: 'tdisplayfield',
                                    fieldLabel: 'کد ملی',
                                    bind: {
                                        value: '{guardianInfo.insuranceRegisteration.nation}'
                                    }
                                },
                                {
                                    xtype: 'tdisplayfield',
                                    fieldLabel: 'شماره شناسنامه',
                                    bind: {
                                        value: '{guardianInfo.insuranceRegisteration.nationalId}'
                                    }
                                },
                                {
                                    xtype: 'tdisplayfield',
                                    fieldLabel: 'مورد تکفل',
                                    name: 'guardianType',
                                    bind: {
                                        value: '{guardianInfo.guardianType}'
                                    },
                                    renderer: function (value, data, record) {
                                        if (value !== undefined)
                                            switch (value) {
                                                case '1':
                                                    return 'پدر';
                                                case '2':
                                                    return 'مادر';
                                                case '3':
                                                    return 'شوهر';
                                                case '4':
                                                    return 'پدر و مادر';
                                                case '5':
                                                    return 'فرزند ذکور';
                                                case '6':
                                                    return 'فرزند اناث';
                                                default:
                                                    return '';

                                            }
                                    }
                                }
                                ,                               
                                {
                                    xtype: 'tdisplayfield',
                                    colspan: 2,
                                    width: '98%',
                                    fieldLabel: 'نظر بازرس فنی',
                                    bind: {
                                        //value: '{guardianInfo.inspectorConfirm}'
                                        value: '{guardianInfo}'
                                    },
                                    style: {
                                        'border': 'solid',
                                        'borderColor': 'red',
                                        'borderWidth': '1px'
                                    },
                                    renderer: function (value, data, record) {
                                        if (value !== undefined)
                                            switch (value.inspectorConfirm) {
                                                case '1':
                                                    if (value.requestType === '2') {
                                                        return ' تایید ابطال کفالت';
                                                    }
                                                    return ' تایید کفالت مورد تکفل';
                                                case '2':
                                                    if (value.requestType === '2') {
                                                        return 'عدم تایید ابطال کفالت';
                                                    }
                                                    return 'عدم تایید کفالت مورد تکفل';
                                                case '5':
                                                    return 'نقص مدرک';
                                                case '6':
                                                    return ' تایید معاش - بررسی میزان از کار افتادگی';
                                                case '7':
                                                    return ' عدم تایید معاش';
                                                default:
                                                    return '';
                                            }
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'tfieldset',
                            title: 'مسئول فنی',
                            defaults: {
                                labelWidth: 110,
                                width: '96%',
                                margin: 5,
                            },
                            layout: {
                                type: 'table',
                                columns: 3,
                                tableAttrs: {
                                    style: {width: '98%'}
                                }
                            },
                            items: [
                                {
                                    xtype: 'ttextarea',
                                    name: 'techConfDesc',
                                    id: 'techConfDesc',
                                    fieldLabel: 'توضیحات',
                                    allowBlank: false,
                                    colspan: 3,
                                    height: 140,
                                    itemId: 'deffocus',
                                    width: '100%',
                                    maxLen: 400,
                                    bind: {
                                        value: '{guardianInfo.techConfDesc}'

                                    }
                                },
                                {
                                    xtype: 'radiogroup',
                                    allowBlank: false,
                                    colspan: 3,
                                    width: '100%',
                                    // Arrange radio buttons into two columns, distributed vertically
                                    columns: 2,
                                    vertical: true,
                                    id: 'reportConf',
                                    items: [
                                        {
                                            boxLabel: 'تایید کفالت مورد تکفل',
                                            name: 'rb',
                                            id: 'radioGuardianConfirm',
                                            inputValue: '1',
                                            bind: {
                                                disabled: '{radioGuardianConfirm}'
                                            }
                                        },
                                        {
                                            boxLabel: 'عدم تایید کفالت مورد تکفل',
                                            name: 'rb',
                                            id: 'radioGuardianNotConfirm',
                                            inputValue: '2',
                                            bind: {
                                                disabled: '{radioGuardianNotConfirm}'
                                            }
                                        },
                                        {
                                            boxLabel: 'تایید معاش-بررسی میزان از کار افتادگی',
                                            name: 'rb',
                                            id: 'radioConfirm',
                                            inputValue: '6',
                                            bind: {
                                                disabled: '{radioConfirm}'
                                            }
                                        },
                                        {
                                            boxLabel: 'عدم تایید معاش',
                                            name: 'rb',
                                            id: 'radioNotConfirm',
                                            inputValue: '7',
                                            bind: {
                                                disabled: '{radioNotConfirm}'
                                            }
                                        }
                                    ]
                                },
//                                {
//                                    xtype: 'radiogroup',
//                                    id: 'reportConf',
//                                    colspan: 2,
//                                    width: '100%',
//                                    // Arrange radio buttons into two columns, distributed vertically
//                                    columns: 1,
//                                    allowBlank: false,
//                                    vertical: true,
//                                    items: [
//                                        {boxLabel: 'گزارش بازرس فنی مورد تایید می باشد', inputValue: '1'},
//                                        {boxLabel: 'گزارش بازرس فنی مورد تایید نمی باشد', inputValue: '2'},
//                                    ]
//                                },

                            ]
                        },
//                        {
//                            xtype: 'tfieldset',
//                            title: 'نظریه کمیسیون پزشکی در موارد عدم احراز شرایط سنی مورد تکفل',
//                            defaults: {
//                                labelWidth: 190,
//                                width: '96%',
//                                margin: 5
//                            },
//                            layout: {
//                                type: 'table',
//                                columns: 2,
//                                tableAttrs: {
//                                    style: {width: '100%'}
//                                }
//                            },
//                            items: [
//                                {
//                                    xtype: 'ttextfield',
//                                    fieldLabel: 'شماره نامه کمیسیون',
//                                    bind: {
//                                        value: '{guardianInfo.brhIntRoleLetterNo}',
//                                        disabled: '{disableMedicalForm}'
//
//                                    }
//                                },
//                                {
//                                    xtype: 'timestampdatefield',
//                                    fieldLabel: 'تاریخ نامه کمیسیون',
//                                    bind: {
//                                        value: '{guardianInfo.brhIntRoleDate}',
//                                        disabled: '{disableMedicalForm}'
//
//                                    },
//                                    valuePublishEvent: ['select', 'change'],
//                                },
//                                {
//                                    xtype: 'tfieldset',
//                                    id: 'tfieldsetMedicalConf',
//                                    title: 'نتیجه کمیسیون پزشکی',
//                                    colspan: 2,
//                                    width: '98%',
//                                    items: [
//                                        {
//                                            xtype: 'radiogroup',
//                                            id: 'medicalConf',
//                                            // Arrange radio buttons into two columns, distributed vertically
//                                            columns: 2,
//                                            vertical: true,
//                                            items: [
//                                                {boxLabel: 'از کارافتاده کلی می باشد',
//                                                    inputValue: '1',
////                                                bind: {
////                                                    disabled: '{radioGuardianConfirm}'
////                                                }
//                                                },
//                                                {boxLabel: 'از کارافتاده کلی نمی باشد',
//                                                    inputValue: '2',
//                                                    checked: true,
////                                                bind: {
////                                                    disabled: '{radioGuardianNotConfirm}'
////                                                }
//                                                }
//                                            ]
//                                        }
//                                    ]
//                                }
//                            ]
//                        },
                        {
                            xtype: 'tfieldset',
                            defaults: {
                                labelWidth: 190,
                                width: '96%',
                                margin: 5
                            },
                            layout: {
                                type: 'table',
                                columns: 1,
                                tableAttrs: {
                                    style: {width: '100%'}
                                }
                            },
                            items: [
                                {
                                    xtype: 'ttextfield',
                                    fieldLabel: 'نام و نام خانوادگی مسئول فنی',
                                    allowBlank: false,
                                    editable: false,
                                    maxLen: 150,
                                    bind: {
                                        value: '{guardianInfo.technicalFullName}'

                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'buttoncontainer',
                            items: [
                                {
                                    xtype: 'button',
                                    text: 'ذخیره',
                                    iconCls: 'icon add',
                                    handler: 'saveTechOpinion'
                                },
                                {
                                    xtype: 'button',
                                    text: 'بازگشت',
                                    iconCls: 'icon cancel',
                                    handler: 'onCancelButton'
                                }
                            ]
                        }
                    ]
                }
            ]
        });