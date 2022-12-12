/**
 * Created by sh-kalantari on 7/1/2019.
 */

/**
 * Created by sh-kalantari on 6/3/2019.
 */
Ext.define('InsuranceTechnical.view.occur.OccurSpecNew', {

    extend: 'InsuranceTechnical.tamin.window.Window',
    xtype: 'occur-spec-new',
    title: 'ثبت گزارش حادثه',
    closeAction: 'destroy',
    modal: true,
    reference: 'occur-spec-new-ref',
    width: '80%',

    items: [
        {
            xtype: 'tform',
            id: 'occur-spec-new-form',
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
                        labelWidth: 190
                    },
                    items: [
                        {
                            xtype: 'tdisplayfield',
                            fieldLabel: 'شعبه تامین اجتماعی',
                            name: 'branch',
                            bind: {
                                value: '{user.organization.code} - {user.organization.organizationName}'
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
                                    xtype: 'tcombobox',
                                    fieldLabel: 'نوع بیمه شده',
                                    displayField: 'name',
                                    valueField: 'value',
                                    emptyText: '--',
                                    editable: false,
                                    store: {
                                        fields: ['name', 'value'],
                                        data: [
                                            {name: 'کارگران ساختمانی مشمول قانون سال 52', value: '1'},
                                            {name: 'بیمه شده دارای ارتباط با سازمان تأمین اجتماعی', value: '2'}
                                        ]
                                    },
                                    listeners: {
                                        change: 'changeInsuranceType',
                                    },
                                },
                                {
                                    xtype: 'cellspacer',
                                    colspan: '2'
                                },
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
                                    bind: {
                                        value: '{personalData.id}',
                                        disabled: '{disableTextBox}'
                                    },
                                    triggers: {
                                        lookup: {
                                            cls: 'x-form-search-trigger',
                                            weight: -1,
                                            handler: function () {
                                                var me = this;
                                                var container = me.up('occur-spec');
                                                var win = container.lookupReference('InsuredPersonPopup');
                                                if (!win) {
                                                    win = Ext.create('InsuranceTechnical.view.main.InsuredPersonPopup');
                                                    me.up('occur-spec').getController().resetIdentityForm(true);
                                                    container.add(win);
                                                }
                                                win.setCallback(function () {
                                                    if (win.selectedItem !== null) {
                                                        container.getViewModel().set('occurSpec.insBrchCode',
                                                            win.selectedItem.data.brchCode);
                                                        me.setValue(win.selectedItem.data.id);
                                                    }
                                                });
                                                win.show();
                                            }
                                        }

                                    },
                                    listeners: {
                                        change: 'findID',
                                        specialkey: 'onEnterOnInsId'
                                    }
                                },
                                {
                                    xtype: 'tdisplayfield',
                                    fieldLabel: 'نام ',
                                    bind: {
                                        value: '{occurSpec.firstName}',
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
                                        value: '{occurSpec.lastName}',
                                        disabled: '{disableTextBoxes}'
                                    },
                                    name: 'lastName',
                                    id: 'lastName',
                                    allowBlank: false
                                },
                                {
                                    xtype: 'tdisplayfield',
                                    fieldLabel: 'کد ملی',
                                    name: 'pnatcode',
                                    id: 'pnatcode',
                                    bind: {
                                        value: '{occurSpec.pnatcode}',
                                        disabled: '{disableTextBoxes}'
                                    }
                                },
                                {
                                    xtype: 'tdisplayfield',
                                    fieldLabel: 'ملیت',
                                    name: 'pnationdesc',
                                    id: 'pnationdesc',
                                    bind: {
                                        value: '{occurSpec.pnationdesc}',
                                        disabled: '{disableTextBoxes}'
                                    }
                                },
                                {
                                    xtype: 'tdisplayfield',
                                    fieldLabel: 'نام پدر',
                                    name: 'pfathername',
                                    id: 'pfathername',
                                    bind: {
                                        value: '{occurSpec.pfathername}',
                                        disabled: '{disableTextBoxes}'
                                    }

                                },
                                {
                                    xtype: 'tdisplayfield',
                                    fieldLabel: 'شماره شناسنامه',
                                    id: 'nationalCode',
                                    bind: {
                                        value: '{occurSpec.pidno}',
                                        disabled: '{disableTextBoxes}'
                                    }
                                },
                                {
                                    xtype: 'tdisplayfield',
                                    fieldLabel: 'تاریخ تولد',
                                    bind: {
                                        value: '{occurSpec.pbirthdate}',
                                        disabled: '{disableTextBoxes}'
                                    },
                                    name: 'pbirthdate',
                                    id: 'pbirthdate'
                                },
                                {
                                    xtype: 'tdisplayfield',
                                    fieldLabel: 'محل صدور',
                                    name: 'pexpcityname',
                                    id: 'pexpcityname',
                                    bind: {
                                        value: '{occurSpec.pexpcityname}',
                                        disabled: '{disableTextBoxes}'
                                    }

                                },
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
                                        value: '{occurSpec.sexcode}',
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
                                        value: '{occurSpec.insBrchCode}',
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
                            bind: {
                                disabled: '{disableTextBoxes}'
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
                                            handler: function () {
                                                var me = this;
                                                var container = me.up('occur-spec');
                                                var insuredBrchCode = container.getViewModel().get('occurSpec.insBrchCode');
                                                if (!insuredBrchCode || insuredBrchCode === '') {
                                                    Ext.Msg.alert('پیام سیستم', 'ابتدا اطلاعات بیمه شده را وارد نمایید.');
                                                    return;
                                                }
                                                var win = container.lookupReference('WorkshopOccurPopup');
                                                if (!win) {
                                                    win = Ext.create('InsuranceTechnical.view.occur.WorkshopOccurPopup');
                                                    me.up('occur-spec').getController().resetOccurForm();
                                                    container.add(win);
                                                }
                                                win.setCallback(function () {
                                                    if (win.selectedItem !== null) {
                                                        me.setValue(win.selectedItem.data.workshopId);
                                                    }
                                                });
                                                win.show();
                                            }
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
                                    allowBlank: false
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
                                    name: 'workshopName',
                                    id: 'workshopName',
                                    fieldLabel: 'نام کارگاه',
                                    colspan: 1,
                                    allowBlank: false,
                                    bind: {
                                        value: '{workshopData.workshopName}',
                                        readOnly: '{!noWorkshopFound}'
                                    }
                                },
                                {
                                    xtype: 'ttextfield',
                                    fieldLabel: 'نشانی کارگاه',
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
                                        value: '{workshopData.vehicle}',
                                        readOnly: '{isERequest}'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'cellspacer',
                            colspan: 3
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
                            bind: {
                                disabled: '{disableTextBoxes}'
                            },
                            items: [
                                {
                                    xtype: 'tdatefield',
                                    fieldLabel: 'تاریخ وقوع حادثه',
                                    name: 'occurDate',
                                    id: 'occurDate',
                                    allowBlank: false,
                                    bind: {
                                        value: '{occurSpec.occurDate}'
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
                                        readOnly: '{isERequest}'
                                    }
                                },
                                {
                                    xtype: 'ttextfield',
                                    fieldLabel: 'محل دقیق وقوع حادثه',
                                    allowBlank: false,
                                    name: 'occurAddr',
                                    bind: {
                                        value: '{occurSpec.occurAddr}',
                                        readOnly: '{isERequest}'

                                    }
                                },
                                {
                                    xtype: 'ttextfield',
                                    fieldLabel: 'کاری که بیمه شده موظف به انجام آن بوده',
                                    allowBlank: false,
                                    name: 'occurJobdesc',
                                    bind: {
                                        value: '{occurSpec.occurJobdesc}',
                                        readOnly: '{isERequest}'

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
                                        value: '{occurSpec.repNo}'
                                    }
                                },
                                {
                                    xtype: 'tdatefield',
                                    fieldLabel: 'تاریخ ثبت گزارش حادثه در شعبه',
                                    name: 'repDate',
                                    id: 'repDate',
                                    allowBlank: false,
                                    bind: {
                                        value: '{occurSpec.repdate}'
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
                                        readOnly: '{isERequest}'
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
                            iconCls: 'icon accept',
                            handler: 'saveOccurNewButton',
                            bind: {
                                disabled: '{iFlag}'
                            }
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
});

