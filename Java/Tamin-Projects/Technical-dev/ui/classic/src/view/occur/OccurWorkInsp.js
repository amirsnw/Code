/**
 * Created by a-khalighi.
 */

Ext.define('InsuranceTechnical.view.occur.OccurWorkInsp', {

    extend: 'InsuranceTechnical.tamin.window.Window',
    xtype: 'occur-work-insp',
    closeAction: 'destroy',
    modal: true,
    reference: 'occur-work-insp-ref',
    width: '80%',

    items: [
        {
            xtype: 'tform',
            id: 'occur-work-insp-form',
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
                            xtype: 'tfieldset',
                            colspan: '3',
                            layout: {
                                type: 'table',
                                columns: 2,
                                tableAttrs: {
                                    style: {width: '99%'}
                                }
                            },
                            defaults: {
                                width: '99%',
                                labelWidth: 140
                            },

                            items: [
                                {
                                    xtype: 'tdisplayfield',
                                    fieldLabel: 'شماره بیمه',
                                    name: 'occurSerial',
                                    id: 'insuranceId',
                                    bind: {
                                        value: '{occurSpec.insuranceSpec.id}'
                                    }
                                },
                                {
                                    xtype: 'tdisplayfield',
                                    fieldLabel: 'نام بیمه شده',
                                    bind: {
                                        value: '{occurSpec.insuranceSpec.firstName} - {occurSpec.insuranceSpec.lastName}'
                                    }
                                },
                                {
                                    xtype: 'cellspacer',
                                    colspan: 2
                                },
                                {
                                    xtype: 'tdisplayfield',
                                    fieldLabel: 'کارگاه',
                                    name: 'workshopID',
                                    id: 'workshopID',
                                    bind: {
                                        value: '{occurSpec.workshopId}'
                                    }
                                },
                                {
                                    xtype: 'tdisplayfield',
                                    fieldLabel: 'نام کارگاه',
                                    bind: {
                                        value: '{occurSpec.workshopName} '
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'tcombobox',
                            fieldLabel: 'آیا گزارش بازرس کار به شعبه ارسال شده است؟',
                            displayField: 'name',
                            valueField: 'value',
                            editable: false,
                            allowBlank: false,
                            labelWidth: 270,
                            id: 'inspworksended',
                            matchFieldWidth: true,
                            bind: {
                                value: '{occurWorkInspInfo.inspworksended}'
                            },
                            listeners: {
                                change: 'onChangDisbleTextBox'
                            },
                            store: {
                                fields: ['name', 'value'],
                                data: [
                                    {name: 'بلی ', value: '1'},
                                    {name: 'خیر', value: '2'}
                                ]
                            }
                        },
                        {
                            xtype: 'ttextfield',
                            fieldLabel: 'شماره',
                            allowBlank: false,
                            maxLength: 13,
                            enforceMaxLength: true,
                            bind: {
                                value: '{occurWorkInspInfo.workinspletno}',
                                disabled: '{occurWorkInspInfo.inspworksended === "2"}'
                            },
                            name: 'workinspletno',
                            id: 'workinspletno'
                        },
                        {
                            xtype: 'timestampdatefield',
                            fieldLabel: 'تاریخ',
                            name: 'workinspletdate',
                            id: 'workinspletdate',
                            allowBlank: false,
                            bind: {
                                value: '{occurWorkInspInfo.workinspletdate}',
                                disabled: '{occurWorkInspInfo.inspworksended === "2"}'
                            }
                        },
                        {
                            xtype: 'tfieldset',
                            colspan: '3',
                            title: 'مقصر حادثه بر اساس گزارش بازرس کار',
                            layout: {
                                type: 'table',
                                columns: 2,
                                tableAttrs: {
                                    style: {width: '99%'}
                                }
                            },
                            defaults: {
                                width: '99%',
                                labelWidth: 140
                            },
                            items: [
                                {
                                    xtype: 'tnumberfield',
                                    fieldLabel: 'درصد تقصیر  کارفرما',
                                    width: '10',
                                    allowBlank: false,
                                    bind: {
                                        value: '{occurWorkInspInfo.wshblameperc}',
                                        disabled: '{disableTextBoxOccurWorkInsp}'
                                    },
                                    enforceMaxLength: true,
                                    minValue: 0,
                                    maxValue: 100,
                                    maxLength: 3,
                                    maxWidth: '200',
                                    hideTrigger: true

                                    //  name: 'workinspletno',
                                    //   id: 'workinspletno',
                                },
                                {
                                    xtype: 'cellspacer',
                                    colspan: '2'
                                },
                                {
                                    xtype: 'tnumberfield',
                                    allowBlank: false,
                                    fieldLabel: 'درصد تقصیر بیمه شده',
                                    width: '10',
                                    bind: {
                                        value: '{occurWorkInspInfo.isublameperc}',
                                        disabled: '{disableTextBoxOccurWorkInsp}'
                                    },
                                    enforceMaxLength: true,
                                    minValue: 0,
                                    maxValue: 100,
                                    maxLength: 3,
                                    maxWidth: '200',
                                    hideTrigger: true
                                },
                                {
                                    xtype: 'cellspacer',
                                    colspan: '2'
                                },
                                {
                                    xtype: 'tnumberfield',
                                    fieldLabel: 'درصد تقصیر سایر',
                                    width: '20',
                                    allowBlank: false,
                                    bind: {
                                        value: '{occurWorkInspInfo.otherblameperc}',
                                        disabled: '{disableTextBoxOccurWorkInsp}'
                                    },
                                    enforceMaxLength: true,
                                    minValue: 0,
                                    maxValue: 100,
                                    maxLength: 3,
                                    maxWidth: '200',
                                    hideTrigger: true
                                },
                                {
                                    xtype: 'cellspacer',
                                    colspan: '2'
                                },
                                {
                                    xtype: 'ttextfield',
                                    fieldLabel: 'توضیحات',
                                    // labelAlign: 'top',
                                    colspan: 3,
                                    /* height: 10,
                                     width: '100%',*/
                                    bind: {
                                        value: '{occurWorkInspInfo.otherblamepercdesc}',
                                        disabled: '{disableTextBoxOccurWorkInsp}'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'tfieldset',
                            colspan: '3',
                            title: 'مقصر حادثه بر اساس آراء مراجع قضایی:',
                            layout: {
                                type: 'table',
                                columns: 3,
                                tableAttrs: {
                                    style: {width: '99%'}
                                }
                            },
                            defaults: {
                                width: '99%',
                                labelWidth: 140
                            },

                            items: [
                                {
                                    xtype: 'tnumberfield',
                                    fieldLabel: 'درصد تقصیر  کارفرما',
                                    width: '10',
                                    allowBlank: false,
                                    bind: {
                                        value: '{occurWorkInspInfo.wshblameperclaw}'
                                        //   disabled: '{disableTextBoxOccurWorkInsp}',
                                    },
                                    enforceMaxLength: true,
                                    minValue: 0,
                                    maxValue: 100,
                                    maxLength: 3,
                                    maxWidth: '200',
                                    hideTrigger: true


                                },
                                {
                                    xtype: 'cellspacer',
                                    colspan: '2'
                                },
                                {
                                    xtype: 'tnumberfield',
                                    fieldLabel: 'درصد تقصیر بیمه شده',
                                    width: '10',
                                    allowBlank: false,
                                    bind: {
                                        value: '{occurWorkInspInfo.isublameperclaw}'
                                        //   disabled: '{disableTextBoxOccurWorkInsp}',
                                    },
                                    enforceMaxLength: true,
                                    minValue: 0,
                                    maxValue: 100,
                                    maxLength: 3,
                                    maxWidth: '200',
                                    hideTrigger: true
                                },
                                {
                                    xtype: 'cellspacer',
                                    colspan: '2'
                                },
                                {
                                    xtype: 'tnumberfield',
                                    fieldLabel: 'درصد تقصیر سایر',
                                    allowBlank: false,
                                    width: '20',
                                    bind: {
                                        value: '{occurWorkInspInfo.otherblameperclaw}'
                                        //  disabled: '{disableTextBoxOccurWorkInsp}',
                                    },
                                    enforceMaxLength: true,
                                    minValue: 0,
                                    maxValue: 100,
                                    maxLength: 3,
                                    maxWidth: '200',
                                    hideTrigger: true
                                },
                                {
                                    xtype: 'cellspacer',
                                    colspan: '2'
                                },
                                {
                                    xtype: 'ttextfield',
                                    fieldLabel: 'توضیحات',
                                    // labelAlign: 'top',
                                    colspan: '3',
                                    /* height: 10,
                                     width: '100%',*/
                                    bind: {
                                        value: '{occurWorkInspInfo.otherblamepercdesclaw}'
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
                    }
                    ,
                    items: [
                        {
                            xtype: 'button',
                            text: 'ذخیره',
                            id: 'saveDisOccurIdea',
                            iconCls: 'icon database_save',
                            handler: 'saveOccurWorkInspButton',
                            bind: {
                                disabled: '{iFlag}'
                            }
                        },
                        {
                            xtype: 'tbutton',
                            text: 'انصراف',
                            name: 'cancel',
                            handler: 'onCancelButton',
                            iconCls: ''
                        }
                    ]
                }
            ]
        }
    ]
})
;
