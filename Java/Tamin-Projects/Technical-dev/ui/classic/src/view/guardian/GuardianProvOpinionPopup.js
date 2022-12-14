Ext.define('InsuranceTechnical.view.guardian.GuardianProvOpinionPopup',
        {
            extend: 'InsuranceTechnical.tamin.window.Window',
            title: 'نظریه کمیته استان',
            xtype: 'guardian-prov-opinion',
            id: 'guardianProvOpinionPopup',
            width: '65%',
            modal: true,
            bodyPadding: 5,
            closeAction: 'destroy',
            reference: 'guardianProvOpinionPopup',
            autoScroll: true,
            defaultFocus: 'deffocus',
            items: [
                {
                    xtype: 'tform',
                    id: 'guardian-prov-form',
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
                                    fieldLabel: 'مورد تکفل',
                                    name: 'guardianType',
                                    bind: {
                                        value: '{guardianInfo.guardianType}',
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
                                    xtype: 'tdisplayfield',
                                    fieldLabel: 'نام و نام خانوادگی',
                                    //   colspan: 2,
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
                                }
                                ,
                                {
                                    xtype: 'tdisplayfield',
                                    fieldLabel: 'شماره شناسنامه',
                                    bind: {
                                        value: '{guardianInfo.idNo}'
                                    }
                                },
                                {
                                    xtype: 'tdisplayfield',
                                    fieldLabel: 'تاریخ تولد',
                                    bind: {
                                        value: '{guardianInfo.birthDate}'
                                    },
                                    editable: false,
                                    renderer: function (value, data, record) {
                                        //var value = record.data.reqDate;
                                        if (value !== undefined && value !== "" && value !== null) {
                                            return  InsuranceTechnical.tamin.helpers.Persian.gregorianToPersian(new Date(value));
                                        } else {
                                            return '-';
                                        }
                                    }
                                },
                                {
                                    xtype: 'tdisplayfield',
                                    fieldLabel: 'شماره درخواست',
                                    bind: {
                                        value: '{guardianInfo.reqNo}'
                                    }
                                }
                                ,
                                {
                                    xtype: 'tdisplayfield',
                                    fieldLabel: 'تاریخ درخواست',
                                    bind: {
                                        value: '{guardianInfo.reqDate}'
                                    },
                                    renderer: function (value, data, record) {
                                        if (value !== undefined && value !== "" && value !== null) {
                                            //var value = record.data.reqDate;
                                            return  InsuranceTechnical.tamin.helpers.Persian.gregorianToPersian(new Date(value));
                                        } else {
                                            return '-';
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'tfieldset',
                            title: 'کمیته استان',
                            defaults: {
                                labelWidth: 190,
                                width: '96%',
                                margin: 5
                            },
                            layout: {
                                type: 'table',
                                columns: 2,
                                tableAttrs: {
                                    style: {width: '100%'}
                                }
                            },
                            items: [
                                {
                                    xtype: 'tdisplayfield',
                                    fieldLabel: 'تاریخ ارجاع',
                                    bind: {
                                        value: '{guardianInfo.provResponseRegLetterDate}'
                                    },
                                    renderer: function (value, data, record) {
                                        //var value = record.data.reqDate;
                                        if (value !== undefined && value !== "" && value !== null) {
                                            return  InsuranceTechnical.tamin.helpers.Persian.gregorianToPersian(new Date(value));
                                        } else {
                                            return '-';
                                        }
                                    }
                                }
                                ,
                                {
                                    xtype: 'tdisplayfield',
                                    fieldLabel: 'شعبه ارجاع دهنده',
                                    bind: {
                                        value: '{guardianInfo.branchResponder}'
                                    }
                                }
                                ,
                                {
                                    xtype: 'ttextarea',
                                    fieldLabel: 'متن مصوبات جلسه کمیته',
                                    colspan: 2,
                                    id: 'provNoteId',
                                    height: 140,
                                    maxLen: 4000,
                                    width: '98%',
                                    itemId: 'deffocus',
                                    allowBlank: false,
                                    bind: {
                                        value: '{guardianInfo.provApprovalDesc}'
                                    }
                                }
                                ,
                                {
                                    xtype: 'radiogroup',
                                    // Arrange radio buttons into two columns, distributed vertically
                                    columns: 2,
                                    colspan: 2,
                                    id: 'provResponse',
                                    vertical: true,
                                    items: [
                                        {boxLabel: 'تایید کفالت مورد تکفل', inputValue: '1'},
                                        {boxLabel: 'عدم تایید کفالت مورد تکفل', inputValue: '2', checked: true},
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'tfieldset',
                            //title: 'مسئول فنی',
                            defaults: {
                                labelWidth: 200,
                                width: '96%',
                                margin: 5,
                            },
                            layout: {
                                type: 'table',
                                columns: 1,
                                tableAttrs: {
                                    style: {width: '98%'}
                                }
                            },
                            items: [
                                {
                                    xtype: 'ttextfield',
                                    fieldLabel: 'نام و نام خانوادگی کاربر ثبت کننده',
                                    // maxLength: 8,
                                    // maskRe: /[0-9]/,
                                    allowBlank: false,
                                    itemId: 'deffocus',
                                    bind: {
                                        value: '{guardianInfo.provinceFullName}'

                                    }
                                }
                            ]
                        },
                    {
                        xtype: 'buttoncontainer',
                        items: [
                            {
                                xtype: 'button',
                                text: 'بارگذاری مدارک',
                                iconCls: 'icon upload2',
                                handler: 'openProvOpinionDocumentPopup'
                            },
                            {
                                xtype: 'button',
                                text: 'ذخیره',
                                iconCls: 'icon add',
                                handler: 'saveProvOpinion'
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