/**
 * Created by a_khalighi on 9/4/2020.
 */
Ext.define('InsuranceTechnical.view.insAgreement.MedicalResult', {
    extend: 'InsuranceTechnical.tamin.window.Window',
    xtype: 'senfi-medical-result',
    closeAction: 'destroy',
    modal: true,
    reference: 'senfi-medical-result-ref',
    title: 'نتیجه معاینات پزشکی',
    width: '60%',
    items: [
        {
            xtype: 'tform',
            id: 'senfi-medical-result-form',
            items: [
                {
                    xtype: 'tfieldset',
                    layout: {
                        type: 'table',
                        tableAttrs: {
                            style: {width: '100%'}
                        }
                    },
                    defaults: {
                        width: '90%',
                        labelWidth: 180
                    },
                    items: [
                        {
                            xtype: 'tfieldset',
                            //     colspan: '3',
                            layout: {
                                type: 'table',
                                columns: 2
                            },
                            defaults: {
                                labelWidth: 140
                            },

                            items: [
                                {
                                    xtype: 'tdisplayfield',
                                    fieldLabel: 'شماره بیمه',
                                    width: '75%',
                                    bind: {
                                        value: '{personInfo.id}'
                                    }
                                },
                                {
                                    xtype: 'tdisplayfield',
                                    fieldLabel: 'شماره شناسنامه',
                                    width: '75%',
                                    bind: {
                                        value: '{personInfo.idCardNumber}'
                                    }
                                },
                                {
                                    xtype: 'tdisplayfield',
                                    fieldLabel: 'نام خانوادگی',
                                    width: '75%',
                                    bind: {
                                        value: '{personInfo.lastName}'
                                    }
                                },
                                {
                                    xtype: 'tdatefield',
                                    fieldLabel: 'تاریخ تولد',
                                    width: '75%',
                                    readOnly: true,
                                    submitFormat: 'Y-m-d H:i:s',
                                    bind: {
                                        value: '{personInfo.dateOfBirth}'
                                    },
                                },
                                {
                                    xtype: 'tdisplayfield',
                                    fieldLabel: 'نام',
                                    width: '75%',
                                    bind: {
                                        value: '{personInfo.firstName}'
                                    }
                                },
                                {
                                    xtype: 'tdisplayfield',
                                    fieldLabel: 'محل تولد',
                                    width: '75%',
                                    bind: {
                                        value: '{personInfo.cityOfBirth}'
                                    }
                                },
                                {
                                    xtype: 'tdisplayfield',
                                    fieldLabel: 'نام پدر',
                                    width: '75%',
                                    bind: {
                                        value: '{personInfo.fatherName}'
                                    }
                                },
                                {
                                    xtype: 'cellspacer',
                                    colspan: 1
                                },
                                /*{
                                    xtype: 'tdisplayfield',
                                    fieldLabel: 'نشانی',
                                    width: '75%',
                                    colspan: 2,
                                    bind: {
                                        value: '{personInfo.address}'
                                    }
                                },*/
                                {
                                    xtype: 'tfieldset',
                                    border: false,
                                    layout: {
                                        type: 'table',
                                        columns: 1
                                    },
                                    defaults: {
                                        labelWidth: 140,
                                    },
                                    style: {
                                        border: '0px !important',
                                    },
                                    items: [
                                        {
                                            xtype: 'ttextfield',
                                            fieldLabel: 'شماره',
                                            width: '75%',
                                            allowBlank: false,
                                            maskRe: /[0-9]/,
                                            regex: /[0-9]/,
                                            maxLength: 15,
                                            enforceMaxLength: true,
                                            name: 'medicalLetterNumber',
                                            bind: {
                                                value: '{medicalSpec.medicalLetterNumber}',
                                                readOnly: '{lockEdit}',
                                            }
                                        },
                                        {
                                            xtype: 'tdatefield',
                                            fieldLabel: 'تاریخ',
                                            width: '75%',
                                            allowBlank: false,
                                            submitFormat: 'Y-m-d H:i:s',
                                            name: 'medicalLetterDate',
                                            bind: {
                                                value: '{medicalSpec.medicalLetterDate}',
                                                readOnly: '{lockEdit}',
                                            }
                                        },
                                        {
                                            xtype: 'tcombobox',
                                            fieldLabel: 'وضعیت از کار افتادگی',
                                            width: '75%',
                                            allowBlank: false,
                                            displayField: 'name',
                                            valueField: 'value',
                                            editable: false,
                                            matchFieldWidth: true,
                                            name: 'medicalResultStatusCode',
                                            bind: {
                                                value: '{medicalSpec.medicalResultStatusCode}',
                                                readOnly: '{lockEdit}',
                                            },
                                            store: {
                                                fields: ['name', 'value'],
                                                data: [
                                                    {name: 'معاف از معاینات', value: '1'},
                                                    {name: 'از کار افتاده کلی میباشد', value: '2'},
                                                    {name: 'از کار افتاده کلی نمیباشد', value: '3'},
                                                    {name: 'نياز به طول درمان', value: '4'},
                                                ]
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'ttextarea',
                                    fieldLabel: 'نتیجه معاینات',
                                    width: '100%',
                                    allowBlank: false,
                                    height: 130,
                                    border: true,
                                    name: 'medicalResultDesc',
                                    /*style: {
                                        border: '1px solid #c0c0c0'
                                    },*/
                                    bind: {
                                        value: '{medicalSpec.medicalResultDesc}',
                                        readOnly: '{lockEdit}',
                                    }
                                }
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
                            iconCls: 'icon accept',
                            handler: 'saveMedical',
                            bind: {
                                disabled: '{lockEdit}',
                            }
                        },
                        {
                            xtype: 'tbutton',
                            text: 'بازگشت',
                            name: 'cancel',
                            handler: 'onCancelButton',
                            iconCls: 'icon arrow_right'
                        }
                    ]
                }
            ]
        }
    ]
});
