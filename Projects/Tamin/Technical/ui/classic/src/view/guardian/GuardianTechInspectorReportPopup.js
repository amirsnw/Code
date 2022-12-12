Ext.define('InsuranceTechnical.view.guardian.GuardianTechInspectorReportPopup',
    {
        extend: 'InsuranceTechnical.tamin.window.Window',
        title: 'گزارش بازرس فنی',
        xtype: 'guardian-tech-report',
        id: 'guardianTechReportPopup',
        width: '65%',
        modal: true,
        bodyPadding: 5,
        closeAction: 'destroy',
        reference: 'guardianTechReportPopup',
        autoScroll: true,
        defaultFocus: 'deffocus',
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
                            margin: 5
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
                                xtype: 'cellspacer'
                            },
                            {
                                xtype: 'tdisplayfield',
                                fieldLabel: 'نام و نام خانوادگی',
                               // colspan: 2,
                                bind: {
                                    value:'{guardianInfo.insuranceRegisteration.firstName} {guardianInfo.insuranceRegisteration.lastName}'
                                }
                            },
                            {
                                xtype: 'tdisplayfield',
                                fieldLabel: 'شماره مستمری',
                                bind: {
                                    value:'{guardianInfo.pensionNo}'

                                }
                            },
                            {
                                xtype: 'tdisplayfield',
                                fieldLabel: 'شماره شناسنامه',
                                // colspan: 2,
                                bind: {
                                    value:'{guardianInfo.insuranceRegisteration.nationalId}'
                                }
                            },
                            {
                                xtype: 'timestampdatefield',
                                fieldLabel: 'تاریخ تولد',
                                editable: false,
                                focusable: false,
                                bind: {
                                    value: '{guardianInfo.insuranceRegisteration.doB}'
                                },
                                valuePublishEvent: ['select', 'change']
                            },
                            {
                                xtype: 'tdisplayfield',
                                fieldLabel: 'شماره درخواست',
                                bind: {
                                    value:'{guardianInfo.reqNo}'
                                }
                            },
                            {
                                xtype: 'timestampdatefield',
                                fieldLabel: 'تاریخ درخواست',
                                editable: false,
                                focusable: false,
                                bind: {
                                    value: '{guardianInfo.reqDate}'
                                },
                                valuePublishEvent: ['select', 'change']
                            }
                        ]
                    },
                    {
                        xtype: 'tfieldset',
                        title: 'بازرس فنی',
                        defaults: {
                            labelWidth: 110,
                            width: '96%',
                            margin: 5
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
                                xtype: 'tdisplayfield',
                                fieldLabel: 'مورد تکفل',
                                name: 'guardianType',
                                bind:{
                                    value:'{guardianInfo.guardianType}'
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
                            },
                            {
                                xtype: 'timestampdatefield',
                                id:'inspectedDateId',                               
                                fieldLabel: 'تاریخ انجام بازرسی',
                                bind: {
                                    //value: '{guardianInfo.inspectedDate}'
                                    value: '{guardianInfo.inspDate}'
                                },
                                allowBlank: false,
                                valuePublishEvent: ['select', 'change']
                            },
                            {xtype: 'cellspacer'},                            
                            {
                                xtype: 'ttextarea',
                                fieldLabel: 'مشروح گزارش بازرسي پيرامون وضعيت شغلي,مالي و نحوه تامين هزينه زندگي مورد تکفل توسط بيمه شده/مستمري بگير',
                                colspan: 3,
                                id:'inspectorNoteId',
                                height: 140,
                                maxLen:4000,
                                width: '100%',
                                itemId: 'deffocus',
                                allowBlank: false,
                                bind: {
                                    value:'{guardianInfo.inspectorNote}'
                                }
                            },
                            {
                                xtype: 'radiogroup',
                                allowBlank: false,
                                //colspan: 3,
                                width: '100%',
                                // Arrange radio buttons into two columns, distributed vertically
                                columns: 2,
                                vertical: true,
                                id: 'reportRadios',
                                items: [
                                    {   
                                        boxLabel: 'تایید کفالت مورد تکفل',
                                        name: 'rb', 
                                        id:'radioGuardianConfirm',
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
                                        boxLabel: 'نقص مدرک',
                                        name: 'rb',
                                        id: 'radioDocument',
                                        inputValue: '5',
                                        bind: {
                                            disabled: '{!guardianInfo.eRequestId}'
                                        }
                                    },
                                    { 
                                        boxLabel: 'تایید معاش-بررسی میزان از کار افتادگی', 
                                        name: 'rb',
                                        id: 'radioConfirm',
                                        inputValue: '6' ,                                        
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
                            }
                        ]
                    },
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
                                fieldLabel: 'نام و نام خانوادگی بازرس فنی',
                                allowBlank: false,
                                editable : false,
                                maxLen:150,
                                bind: {
                                    value:'{guardianInfo.inspectorName}'

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
                                id:'saveTechReportButton',
                                handler: 'saveTechReport'
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
