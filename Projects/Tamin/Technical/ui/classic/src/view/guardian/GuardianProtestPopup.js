Ext.define('InsuranceTechnical.view.guardian.GuardianProtestPopup',
        {
            extend: 'InsuranceTechnical.tamin.window.Window',
            title: 'بررسی اعتراض بیمه شده',
            xtype: 'guardian-protest',
            id: 'guardianProtestPopup',
            width: '65%',
            modal: true,
            bodyPadding: 5,
            closeAction: 'destroy',
            reference: 'guardianProtestPopup',
            autoScroll: true,
            defaultFocus: 'deffocus',
            items: [
                {
                    xtype: 'tform',
                    id: 'guardian-protest-form',
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
                                    width: '100%',
                                    labelWidth: 125,
                                    fieldLabel: 'متن اعتراض بیمه شده',
                                    name: 'protestDesc',
                                    bind: {
                                        value: '{guardianInfo.protestDesc}'
                                    }
                                }

                            ]
                        }
                        ,
                        {
                            xtype: 'tfieldset',
                            id: 'tfieldsetProtestInsp',
                            name: 'tfieldsetProtestInsp',
                            title: 'بازرس فنی',
                            defaults: {
                                labelWidth: 110,
                                width: '100%',
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
                                    xtype: 'timestampdatefield',
                                    id: 'protestInspectedDateId',
                                    width: '98%',
                                    fieldLabel: 'تاریخ انجام بازرسی',
                                    bind: {
                                        //value: '{guardianInfo.inspectedDate}'
                                        value: '{guardianInfo.protestInspDate}'
                                    },
                                    allowBlank: false,
                                    valuePublishEvent: ['select', 'change']
                                },
                                {
                                    xtype: 'ttextfield',
                                    width: '100%',
                                    labelWidth: 165,
                                    fieldLabel: 'نام و نام خانوادگی بازرس فنی',
                                    allowBlank: false,
                                    maxLen: 150,
                                    bind: {
                                        value: '{guardianInfo.protestInspName}'

                                    }
                                },
                                {
                                    xtype: 'ttextarea',
                                    fieldLabel: 'مشروح گزارش بازرسي پيرامون وضعيت شغلي,مالي و نحوه تامين هزينه زندگي مورد تکفل توسط بيمه شده/مستمري بگير',
                                    colspan: 2,
                                    id: 'protestInspectorNoteId',
                                    height: 100,
                                    maxLen: 4000,
                                    width: '100%',
                                    itemId: 'deffocus',
                                    allowBlank: false,
                                    bind: {
                                        value: '{guardianInfo.protestInspNote}'
                                    }
                                },
                                {
                                    xtype: 'radiogroup',
                                    allowBlank: false,
                                    colspan: 2,
                                    width: '100%',
                                    // Arrange radio buttons into two columns, distributed vertically
                                    columns: 5,
                                    vertical: true,
                                    id: 'protestReportRadios',
                                    items: [
                                        {
                                            boxLabel: 'تایید کفالت مورد تکفل',
                                            name: 'rb',
                                            inputValue: '1',
                                            width: '100%',
                                            bind: {
                                                disabled: '{radioGuardianConfirm}'
                                            }
                                        },
                                        {
                                            boxLabel: 'عدم تایید کفالت مورد تکفل',
                                            name: 'rb',
                                            inputValue: '2',
                                            width: '100%',
                                            bind: {
                                                disabled: '{radioGuardianNotConfirm}'
                                            }
                                        },
                                        {
                                            boxLabel: 'نقص مدرک',
                                            name: 'rb',
                                            width: '60%',
                                            inputValue: '5'
                                        },
                                        {
                                            boxLabel: 'تایید معاش-بررسی میزان از کار افتادگی',
                                            name: 'rb',
                                            width: '100%',
                                            inputValue: '6',
                                            bind: {
                                                disabled: '{radioConfirm}'
                                            }
                                        },
                                        {
                                            boxLabel: 'عدم تایید معاش',
                                            name: 'rb',
                                            width: '100%',
                                            inputValue: '7',
                                            bind: {
                                                disabled: '{radioNotConfirm}'
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                        ,
                        {
                            xtype: 'tfieldset',
                            id: 'tfieldsetProtestTech',
                            name: 'tfieldsetProtestTech',
                            title: 'مسئول امور فنی بیمه شدگان',
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
                                    xtype: 'radiogroup',
                                    id: 'protestReportConf',
                                    colspan: 2,
                                    width: '100%',
                                    // Arrange radio buttons into two columns, distributed vertically
                                    columns: 4,
                                    allowBlank: false,
                                    vertical: true,
                                    items: [
                                        {
                                            boxLabel: 'تایید کفالت مورد تکفل',
                                            name: 'rb',
                                            inputValue: '1',
                                            width: '100%',
                                            bind: {
                                                disabled: '{radioGuardianConfirm}'
                                            }
                                        },
                                        {
                                            boxLabel: 'عدم تایید کفالت مورد تکفل',
                                            name: 'rb',
                                            inputValue: '2',
                                            width: '100%',
                                            bind: {
                                                disabled: '{radioGuardianNotConfirm}'
                                            }
                                        },
                                        {
                                            boxLabel: 'تایید معاش-بررسی میزان از کار افتادگی',
                                            name: 'rb',
                                            width: '100%',
                                            inputValue: '6',
                                            bind: {
                                                disabled: '{radioConfirm}'
                                            }
                                        },
                                        {
                                            boxLabel: 'عدم تایید معاش',
                                            name: 'rb',
                                            width: '100%',
                                            inputValue: '7',
                                            bind: {
                                                disabled: '{radioNotConfirm}'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'ttextarea',
                                    name: 'protestTechNote',
                                    id: 'protestTechNote',
                                    fieldLabel: 'توضیحات',
                                    allowBlank: false,
                                    colspan: 2,
                                    height: 100,
                                    itemId: 'deffocus',
                                    width: '100%',
                                    maxLen: 400,
                                    bind: {
                                        value: '{guardianInfo.protestTechNote}'
                                    }
                                }
                                ,
                                {
                                    xtype: 'tfieldset',
                                    id: 'tfieldsetMedicalConf',
                                    title: 'نتیجه کمیسیون پزشکی',
                                    colspan: 2,
                                    //width: '100%',
                                    items: [
                                        {
                                            xtype: 'radiogroup',
                                            id: 'protestMedicalConf',
                                            // Arrange radio buttons into two columns, distributed vertically
                                            columns: 2,
                                            allowBlank: false,
                                            vertical: true,
                                            items: [
                                                {
                                                    boxLabel: 'از کارافتاده کلی می باشد',
                                                    inputValue: '1'
                                                },
                                                {
                                                    boxLabel: 'از کارافتاده کلی نمی باشد',
                                                    inputValue: '2'                                             
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                        ,
                        {
                            xtype: 'buttoncontainer',
                            items: [
                                {
                                    xtype: 'button',
                                    text: 'ذخیره',
                                    id: 'saveProtestOpinionButton',
                                    name: 'saveProtestOpinionButton',
                                    iconCls: 'icon add',
                                    handler: 'saveProtestOpinion'
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