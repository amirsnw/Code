//Ext.define('InsuranceTechnical.view.guardian.GuardianProvOpinionPopupOld',
//    {
//        extend: 'InsuranceTechnical.tamin.window.Window',
//        title: 'نظریه کمیته استان',
//        xtype: 'guardian-prov-opinion',
//        id: 'guardianProvOpinionPopup',
//        width: '65%',
//        modal: true,
//        bodyPadding: 5,
//        closeAction: 'destroy',
//        reference: 'guardianProvOpinionPopup',
//        autoScroll: true,
//        defaultFocus: 'deffocus',
//        items: [
//            {
//                xtype: 'tform',
//                id: 'guardian-prov-form',
//                items: [
//                    {
//                        xtype: 'tfieldset',
//                        defaults: {
//                            labelWidth: 110,
//                            width: '96%',
//                            margin: 5,
//                        },
//                        layout: {
//                            type: 'table',
//                            columns:2,
//                            tableAttrs: {
//                                style: {width: '98%'}
//                            }
//                        },
//                        items: [
//                            {
//                                xtype: 'tdisplayfield',
//                                fieldLabel: 'شماره بیمه',
//                                name: 'insurancId.id',
//                                minLengthText: 'شماره بیمه ده رقمی میباشد.',
//                                bind: {
//                                    value: '{guardianInfo.insuranceId}'
//                                },
//                            },
//                            {
//                                xtype: 'tdisplayfield',
//                                fieldLabel: 'نام و نام خانوادگی',
//                             //   colspan: 2,
//                                bind: {
//                                    value:'{guardianName}'
//                                }
//                            },
//                            {
//                                xtype: 'tdisplayfield',
//                                fieldLabel: 'شماره مستمری',
//                                bind: {
//                                    value:'{guardianInfo.pensionNo}'
//
//                                }
//                            },
//                            {
//                                xtype: 'tdisplayfield',
//                                fieldLabel: 'کد ملی',
//                                bind: {
//                                    value:'{guardianInfo.nationalCode}'
//                                }
//                            }, {
//                                xtype: 'tdisplayfield',
//                                fieldLabel: 'شماره شناسنامه',
//                                bind: {
//                                    value:'{guardianInfo.idNo}'
//                                }
//                            },
//                            {
//                                xtype: 'timestampdatefield',
//                                fieldLabel: 'تاریخ تولد',
//                                bind: {
//                                    value:'{guardianInfo.birthDate}'
//                                },
//                                editable: false,
//                            },
//                            {
//                                xtype: 'tdisplayfield',
//                                fieldLabel: 'مورد تکفل',
//                                name: 'guardianType',
//                                bind:{
//                                    value:'{guardianInfo.guardianType}',
//                                },
//                                renderer: function (value, data, record) {
//                                    if (value !== undefined)
//                                        switch (value) {
//                                            case '1':
//                                                return 'پدر';
//                                            case '2':
//                                                return 'مادر';
//                                            case '3':
//                                                return 'شوهر';
//                                            case '4':
//                                                return 'پدر و مادر';
//                                            case '5':
//                                                return 'فرزند ذکور';
//                                            case '6':
//                                                return 'فرزند اناث';
//                                            default:
//                                                return '';
//
//
//
//                                        }
//                                }
//                            },
//
//                        ]
//                    },
//                    {
//                        xtype: 'tfieldset',
//                        title: 'مسئول فنی',
//                        defaults: {
//                            labelWidth: 160,
//                            width: '96%',
//                            margin: 5,
//                        },
//                        layout: {
//                            type: 'table',
//                            columns: 2,
//                            tableAttrs: {
//                                style: {width: '98%'}
//                            }
//                        },
//                        items: [
//                            {
//                                xtype: 'ttextfield',
//                                fieldLabel: 'شماره نامه ارسال به استان',
//                                maxLength: 8,
//                                maskRe: /[0-9]/,
//                                allowBlank: false,
//                                itemId: 'deffocus',
//                                bind: {
//                                    value:'{guardianInfo.provResponseRegLetterNo}'
//
//                                }
//                            },
//                            {
//                                xtype: 'timestampdatefield',
//                                fieldLabel: 'تاریخ نامه ارسال به استان',
//                                allowBlank: false,
//                                bind: {
//                                    value:'{guardianInfo.provResponseRegLetterDate}'
//                                    // disabled: '{endDateEditDisable}'
//
//                                },
//                                valuePublishEvent: ['select', 'change'],
//
//                            },
//                            {
//                                xtype: 'ttextfield',
//                                fieldLabel: 'شماره نامه پاسخ',
//                                maxLength: 8,
//                                maskRe: /[0-9]/,
//                                allowBlank: false,
//                                bind: {
//                                    value:'{guardianInfo.provResponseLetterNo}'
//
//                                }
//                            },
//                            {
//                                xtype: 'timestampdatefield',
//                                fieldLabel: 'تاریخ نامه پاسخ',
//                                allowBlank: false,
//                                bind: {
//                                    value:'{guardianInfo.provResponseLetterDate}'
//                                    // disabled: '{endDateEditDisable}'
//
//                                },
//                                valuePublishEvent: ['select', 'change'],
//
//                            },
//
//                        ]
//                    },
//                    {
//                        xtype: 'tfieldset',
//                        title: 'نظریه کمیته استان',
//                        defaults: {
//                            labelWidth: 190,
//                            width: '96%',
//                            margin: 5,
//                        },
//                        layout: {
//                            type: 'table',
//                            columns: 2,
//                            tableAttrs: {
//                                style: {width: '100%'}
//                            }
//                        },
//                        items: [
//
//                            {
//                                xtype: 'radiogroup',
//                                // Arrange radio buttons into two columns, distributed vertically
//                                columns: 2,
//                                id: 'provResponse',
//                                vertical: true,
//                                items: [
//                                    {boxLabel: 'تایید کفالت مورد تکفل', inputValue: '1'},
//                                    {boxLabel: 'عدم تایید کفالت مورد تکفل', inputValue: '2', checked: true},
//                                ]
//
//                            },
//                        ]
//                    },
//
//                    {
//                        xtype: 'buttoncontainer',
//                        items: [
//                            {
//                                xtype: 'button',
//                                text: 'ذخیره',
//                                iconCls: 'icon add',
//                                handler: 'saveProvOpinion'
//                            },
//                            {
//                                xtype: 'button',
//                                text: 'بازگشت',
//                                iconCls: 'icon cancel',
//                                handler: 'onCancelButton'
//                            }
//                        ]
//                    }
//                ]
//            }
//        ]
//    });