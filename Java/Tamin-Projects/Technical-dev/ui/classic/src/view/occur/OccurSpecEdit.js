/**
 * Created by sh-kalantari on 6/3/2019.
 */
Ext.define('InsuranceTechnical.view.occur.OccurSpecEdit', {

    extend: 'InsuranceTechnical.tamin.window.Window',
    xtype: 'occur-spec-new',
    title: 'ویرایش گزارش حادثه',
    closeAction: 'destroy',
    modal: true,
    reference: 'occur-spec-edit-ref',
    width: '80%',
    items: [
        {
            xtype: 'tform',
            id: 'occur-spec-edit-form',
            items: [
                {
                    xtype: 'tfieldset',
                    layout: {
                        type: 'table',
                        columns: 3,
                        tableAttrs: {
                            style: {width: '100%'}
                        }
                    },
                    defaults: {
                        width: '99%',
                        labelWidth: 180
                    },
                    items: [
                        {
                            xtype: 'tdisplayfield',
                            fieldLabel: 'شعبه تامین اجتماعی (بیمه پردازی)',
                            name: 'branch',
                            bind: {
                                value: '{occurSpec.brchCode.branchCode} - {occurSpec.brchCode.branchName}'
                            }
                        },
                        {
                            xtype: 'cellspacer',
                            colspan: '2'
                        },
                        {
                            xtype: 'tcombobox',
                            fieldLabel: 'ارائه فرم گزارش توسط',
                            displayField: 'name',
                            valueField: 'value',
                            allowBlank: false,
                            id: 'reportertype',
                            editable: false,
                            matchFieldWidth: true,
                            readOnly: true,
                            bind: {
                                value: '{occurSpec.reportertype}'
                            },
                            store: {
                                fields: ['name', 'value'],
                                data: [
                                    {name: 'کارفرما', value: '0'},
                                    {name: 'فرد حادثه دیده', value: '1'},
                                    {name: 'بازماندگان', value: '2'},
                                    {name: 'وکیل قانونی', value: '3'}

                                ]
                            }
                        },
                        {
                            xtype: 'cellspacer',
                            colspan: 2
                        },
                        {
                            xtype: 'tfieldset',
                            title: 'اطلاعات ثبت شده کاربر در سامانه غیر حضوری',
                            colspan: '3',
                            cls: 'info-panel',
                            layout: {
                                type: 'table',
                                columns: 3,
                                tableAttrs: {
                                    style: {width: '99%'}
                                }
                            },
                            defaults: {
                                width: '88%',
                                labelWidth: 160
                            },
                            bind: {
                                hidden: '{!isERequest}'
                            },
                            items: [
                                {
                                    xtype: 'ttextfield',
                                    name: 'eWorkshopCode',
                                    id: 'eWorkshopCode',
                                    fieldLabel: 'شماره کارگاه',
                                    readOnly: true,
                                    colspan: 2,
                                    bind: {
                                        value: '{occurSpec.esWorkshop.workshopCode}'
                                    }
                                },
                                {
                                    xtype: 'ttextfield',
                                    name: 'eWorkshopName',
                                    id: 'eWorkshopName',
                                    fieldLabel: 'نام کارگاه',
                                    readOnly: true,
                                    colspan: 2,
                                    bind: {
                                        value: '{occurSpec.esWorkshop.workshopName}'
                                    }
                                },
                                {
                                    xtype: 'ttextfield',
                                    name: 'eBossFullName',
                                    id: 'eBossFullName',
                                    fieldLabel: 'نام و نام خانوادگی کارفرما',
                                    readOnly: true,
                                    colspan: 2,
                                    bind: {
                                        value: '{occurSpec.esWorkshop.bossFullName}'
                                    }
                                },
                                {
                                    xtype: 'ttextfield',
                                    name: 'eBossMobileNumber',
                                    id: 'eBossMobileNumber',
                                    fieldLabel: 'شماره همراه کارفرما',
                                    readOnly: true,
                                    colspan: 2,
                                    bind: {
                                        value: '{occurSpec.esWorkshop.bossMobileNumber}'
                                    }
                                },
                                {
                                    xtype: 'cellspacer',
                                    colspan: 1
                                },
                                {
                                    xtype: 'ttextfield',
                                    name: 'eWorkshopAddress',
                                    id: 'eWorkshopAddress',
                                    fieldLabel: 'نشانی کارگاه',
                                    readOnly: true,
                                    colspan: 2,
                                    bind: {
                                        value: '{occurSpec.esWorkshop.workshopAddress}'
                                    }
                                },
                                {
                                    xtype: 'ttextfield',
                                    name: 'eWorkshopTelephone',
                                    id: 'eWorkshopTelephone',
                                    fieldLabel: 'شماره تلفن کارگاه',
                                    readOnly: true,
                                    colspan: 2,
                                    bind: {
                                        value: '{occurSpec.esWorkshop.workshopTelephone}'
                                    }
                                },
                                {
                                    xtype: 'ttextfield',
                                    name: 'eWorkshopPostalCode',
                                    id: 'eWorkshopPostalCode',
                                    fieldLabel: 'کدپستی',
                                    readOnly: true,
                                    colspan: 2,
                                    bind: {
                                        value: '{occurSpec.esWorkshop.workshopPostalCode}'
                                    }
                                },
                                {
                                    xtype: 'ttextfield',
                                    name: 'eWorkshopBranchCode',
                                    id: 'eWorkshopBranchCode',
                                    fieldLabel: 'کد شعبه بیمه پردازی کارگاه',
                                    readOnly: true,
                                    colspan: 2,
                                    bind: {
                                        value: '{occurSpec.esWorkshop.workshopBranchCode}'
                                    }
                                },
                                {
                                    xtype: 'tbutton',
                                    text: 'دانلود اطلاعات غیر حضوری',
                                    name: 'download',
                                    handler: 'onEserviceDownload',
                                    /*handler: function () {
                                        var me = arguments[0].up('window');
                                        me.getViewModel().set('newOccIdea', {});
                                        me.close();
                                    },*/
                                    iconCls: 'icon arrow_right'
                                }
                            ]
                        },
                        {
                            xtype: 'tfieldset',
                            colspan: '3',
                            title: 'اطلاعات هویتی',
                            layout: {
                                type: 'table',
                                columns: 3,
                                tableAttrs: {
                                    style: {width: '99%'}
                                },
                                tdAttrs: {style: 'padding: 2px;'}
                            },
                            defaults: {
                                width: '100%',
                                labelWidth: 140
                            },
                            items: [
                                {
                                    xtype: 'ttextfield',
                                    fieldLabel: 'شماره بیمه',
                                    name: 'insuranceRegisteration.id',
                                    id: 'insuranceRegisterationId',
                                    maxLength: 10,
                                    minLength: 10,
                                    maskRe: /[0-9]/,
                                    regex: /[0-9]/,
                                    enforceMaxLength: true,
                                    msgTarget: 'side',
                                    minLengthText: 'شماره بیمه ده رقمی میباشد.',
                                    readOnly: true,
                                    bind: {
                                        value: '{personalData.id}'
                                        /*disabled: '{disableTextBox}',*/
                                    },
                                    listeners: {
                                        change: 'findID'
                                    }
                                },
                                {
                                    xtype: 'tdisplayfield',
                                    fieldLabel: 'نام ',
                                    bind: {
                                        value: '{personalData.firstName}',
                                        disabled: '{disableTextBoxes}'
                                    },
                                    name: 'firstName',
                                    id: 'firstName',
                                    allowBlank: false
                                },
                                {
                                    xtype: 'tdisplayfield',
                                    fieldLabel: 'نام خانوادگی',
                                    bind: {
                                        value: '{personalData.lastName}',
                                        disabled: '{disableTextBoxes}'
                                    },
                                    name: 'lastName',
                                    id: 'lastName',
                                    allowBlank: false
                                },
                                {
                                    xtype: 'ttextfield',
                                    name: 'pnatcode',
                                    id: 'pnatcode',
                                    fieldLabel: 'کد ملی',
                                    readOnly: true,
                                    bind: {
                                        value: '{personalData.pnatcode}',
                                        disabled: '{disableTextBoxes}'
                                    }
                                },
                                {
                                    xtype: 'tdisplayfield',
                                    fieldLabel: 'ملیت',
                                    name: 'pnationdesc',
                                    id: 'pnationdesc',
                                    bind: {
                                        value: '{personalData.pnationdesc}',
                                        disabled: '{disableTextBoxes}'
                                    }

                                },
                                {
                                    xtype: 'tdisplayfield',
                                    fieldLabel: 'نام پدر',
                                    name: 'pfathername',
                                    id: 'pfathername',
                                    bind: {
                                        value: '{personalData.pfathername}',
                                        disabled: '{disableTextBoxes}'
                                    }

                                },
                                {
                                    xtype: 'tdisplayfield',
                                    fieldLabel: 'شماره شناسنامه',
                                    id: 'nationalCode',
                                    bind: {
                                        value: '{personalData.pidno}',
                                        disabled: '{disableTextBoxes}'
                                    }
                                },
                                {
                                    xtype: 'ttextfield',
                                    name: 'pbirthdate',
                                    id: 'pbirthdate',
                                    fieldLabel: 'تاریخ تولد',
                                    readOnly: true,
                                    bind: {
                                        value: '{personalData.pbirthdate}',
                                        disabled: '{disableTextBoxes}'
                                    }

                                },
                                {
                                    xtype: 'tdisplayfield',
                                    fieldLabel: 'محل صدور',
                                    name: 'pexpcityname',
                                    id: 'pexpcityname',
                                    bind: {
                                        value: '{personalData.pexpcityname}',
                                        disabled: '{disableTextBoxes}'
                                    }

                                }
                                ,
                                {
                                    xtype: 'tcombobox',
                                    fieldLabel: 'جنسیت',
                                    displayField: 'name',
                                    id: 'sexcode',
                                    valueField: 'value',
                                    editable: false,
                                    readOnly: true,
                                    emptyText: '--',
                                    bind: {
                                        value: '{personalData.sexcode}',
                                        disabled: '{disableTextBoxes}'
                                    },
                                    store: {
                                        fields: ['name', 'value'],
                                        data: [
                                            {name: 'مرد', value: '01'},
                                            {name: 'زن', value: '02'}
                                        ]
                                    }
                                },
                                {
                                    xtype: 'tdisplayfield',
                                    fieldLabel: 'کد شعبه',
                                    bind: {
                                        value: '{personalData.insBrchCode}',
                                        disabled: '{disableTextBoxes}'
                                    },
                                },
                                {
                                    xtype: 'ttextfield',
                                    fieldLabel: 'تلفن',
                                    id: 'phone',
                                    maxLength: 11,
                                    maskRe: /[0-9]/,
                                    regex: /[0-9]/,
                                    enforceMaxLength: true,
                                    allowBlank: false,
                                    bind: {
                                        value: '{occurSpec.isutel}',
                                        disabled: '{disableTextBoxes}'
                                    }
                                },
                                {
                                    xtype: 'ttextfield',
                                    fieldLabel: 'نشانی محل سکونت',
                                    id: 'pAddress',
                                    allowBlank: false,
                                    bind: {
                                        value: '{occurSpec.isuaddr}',
                                        disabled: '{disableTextBoxes}'
                                    },
                                    colspan: 2
                                }
                            ]
                        },
                        {
                            xtype: 'tfieldset',
                            colspan: '3',
                            title: 'اطلاعات کارگاه',
                            layout: {
                                type: 'table',
                                columns: 3,
                                tableAttrs: {
                                    style: {width: '99%'}
                                }
                            },
                            defaults: {
                                width: '99%',
                                labelWidth: 165
                            },
                            items: [
                                {
                                    xtype: 'ttextfield',
                                    fieldLabel: 'شماره کارگاه',
                                    name: 'workshopID',
                                    id: 'workshopID',
                                    maxLength: 10,
                                    minLength: 10,
                                    maskRe: /[0-9]/,
                                    regex: /[0-9]/,
                                    allowBlank: false,
                                    enforceMaxLength: true,
                                    msgTarget: 'side',
                                    minLengthText: 'شماره کارگاه ده رقمی میباشد.',
                                    bind: {
                                        value: '{workshopData.workshopId}'
                                    },
                                    triggers: {
                                        lookup: {
                                            cls: 'x-form-search-trigger',
                                            weight: -1,
                                            handler: 'workshopPopUpHandler'
                                        }
                                    },
                                    listeners: {
                                        change: 'findWorkshopID',
                                        specialkey: 'onEnterOnWorkshopId'
                                    }
                                },
                                /*{
                                    xtype: 'tdisplayfield',
                                    fieldLabel: 'کارفرما',
                                    name: 'employerName',
                                    id: 'employerName',
                                    allowBlank: false,

                                },*/
                                /*{
                                    xtype: 'tdisplayfield',
                                    fieldLabel: 'فعالیت ',
                                    name: 'activitydesc',
                                    id: 'activitydesc',
                                    allowBlank: false,
                                    bind: {
                                        value: '{workshopData.activity.activityDesc}'
                                    },
                                },*/
                                {
                                    xtype: 'ttextfield',
                                    id: 'workshopName',
                                    fieldLabel: 'نام کارگاه',
                                    colspan: 1,
                                    allowBlank: false,
                                    name: 'workshopName',
                                    bind: {
                                        value: '{workshopData.workshopName}',
                                        readOnly: '{!noWorkshopFound}'
                                    }
                                },
                                {
                                    xtype: 'ttextfield',
                                    fieldLabel: 'نشانی',
                                    name: 'address',
                                    id: 'address',
                                    colspan: 1,
                                    bind: {
                                        value: '{workshopData.isuJobLocation}',
                                        readOnly: '{!noWorkshopFound}'
                                    }
                                },
                                {
                                    xtype: 'tfieldset',
                                    title: 'ساعت کار بیمه شده',
                                    width: '98%',
                                    defaults: {
                                        labelWidth: 50
                                    },
                                    layout: {
                                        type: 'table',
                                        columns: 2,
                                        tableAttrs: {
                                            style: {
                                                width: '70%'
                                            }
                                        }
                                    },
                                    items: [
                                        {
                                            xtype: 'ttimefield',
                                            name: 'rwworkstart',
                                            fieldLabel: 'از',
                                            format: 'H:i',
                                            allowBlank: false,
                                            editable: false,
                                            bind: {
                                                value: '{workshopData.rwworkstart}'
                                            }
                                        },
                                        {
                                            xtype: 'ttimefield',
                                            name: 'rwworkfinish',
                                            fieldLabel: 'تا',
                                            format: 'H:i',
                                            allowBlank: false,
                                            editable: false,
                                            bind: {
                                                value: '{workshopData.rwworkfinish}'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'tdatefield',
                                    fieldLabel: 'تاریخ استخدام بیمه شده',
                                    name: 'employeedate',
                                    id: 'employeedate',
                                    allowBlank: false,
                                    bind: {
                                        value: '{workshopData.employeedate}'
                                    }
                                },
                                {
                                    xtype: 'ttextfield',
                                    fieldLabel: 'وسیله ایاب و ذهاب به کارگاه',
                                    allowBlank: false,
                                    name: 'vehicle',
                                    bind: {
                                        value: '{workshopData.vehicle}'

                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'tfieldset',
                            colspan: '3',
                            layout: {
                                type: 'table',
                                columns: 3,
                                tableAttrs: {
                                    style: {width: '99%'}

                                },
                                tdAttrs: {style: 'padding: 2px;'}
                            },
                            defaults: {
                                width: '100%',
                                labelWidth: 190
                            },
                            items: [
                                {
                                    xtype: 'tdatefield',
                                    fieldLabel: 'تاریخ وقوع حادثه',
                                    name: 'occurDate',
                                    id: 'occurDate',
                                    allowBlank: false,
                                    bind: {
                                        value: '{occurSpec.occurDate}',
                                        /*readOnly: '{isERequest}'*/
                                    },
                                    listeners: {
                                        //     change: 'onChackOccurDate',
                                    }
                                },
                                {
                                    xtype: 'ttimefield',
                                    name: 'occurTime',
                                    fieldLabel: 'ساعت وقوع حادثه',
                                    format: 'H:i',
                                    allowBlank: false,
                                    editable: false,
                                    bind: {
                                        value: '{occurSpec.occurTime}',
                                        /*readOnly: '{isERequest}'*/
                                    }
                                },
                                {
                                    xtype: 'ttextfield',
                                    fieldLabel: 'محل دقیق وقوع حادثه',
                                    allowBlank: false,
                                    name: 'occurAddr',
                                    bind: {
                                        value: '{occurSpec.occurAddr}',
                                        /*readOnly: '{isERequest}'*/

                                    }
                                },
                                {
                                    xtype: 'ttextfield',
                                    fieldLabel: 'کاری که بیمه شده موظف به انجام آن بوده',
                                    allowBlank: false,
                                    name: 'occurJobdesc',
                                    bind: {
                                        value: '{occurSpec.occurJobdesc}',
                                        /*readOnly: '{isERequest}'*/
                                    }
                                },
                                {
                                    xtype: 'ttextfield',
                                    maxLength: 16,
                                    maskRe: /[0-9]/,
                                    regex: /[0-9]/,
                                    enforceMaxLength: true,
                                    fieldLabel: 'شماره ثبت گزارش حادثه در شعبه',
                                    allowBlank: false,
                                    name: 'repNo',
                                    id: 'repNo',
                                    bind: {
                                        value: '{occurSpec.repNo}',
                                        readOnly: '{isERequest}'
                                    }
                                },
                                {
                                    xtype: 'tdatefield',
                                    fieldLabel: 'تاریخ ثبت گزارش حادثه در شعبه',
                                    name: 'repDate',
                                    id: 'repDate',
                                    allowBlank: false,
                                    bind: {
                                        value: '{occurSpec.repdate}',
                                        readOnly: '{isERequest}'
                                    },
                                    listeners: {
                                        // change: 'onChackRepDate',
                                    }
                                },
                                {
                                    xtype: 'ttextarea',
                                    fieldLabel: 'شرح نحوه وقوع حادثه',
                                    labelAlign: 'top',
                                    colspan: '2',
                                    height: 100,
                                    allowBlank: false,
                                    name: 'occurDesc',
                                    bind: {
                                        value: '{occurSpec.occurDesc}',
                                        /*readOnly: '{isERequest}'*/
                                    }
                                },
                            ]
                        }
                    ]
                },
                {
                    xtype: 'buttoncontainer',
                    style: {
                        'margin-top': '10px'
                    },
                    items: [
                        {
                            xtype: 'button',
                            text: 'ذخیره',
                            id: 'saveOccurNew',
                            iconCls: 'icon database_save',
                            handler: 'onEditOccurButton',
                            /*bind: {
                                disabled: '{iFlag}'
                            }*/
                        },
                        {
                            xtype: 'tbutton',
                            text: 'بازگشت',
                            name: 'cancel',
                            handler: 'OnSpecCancelButton',
                            iconCls: 'icon arrow_right'
                        }
                    ]
                }
            ]
        }
    ]
})
;

