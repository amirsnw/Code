/**
 * Created by sh-kalantari on 8/5/2019.
 */
Ext.define('InsuranceTechnical.view.occur.DisplayOccurIdea', {

    extend: 'InsuranceTechnical.tamin.window.Window',
    xtype: 'display-occur-idea',
    closeAction: 'destroy',
    modal: true,
    reference: 'display-occur-idea-ref',
    width: '40%',

    items: [
        {
            xtype: 'tform',
            id: 'display-occur-idea-form',
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
                                    xtype: 'timestampdatefield',
                                    fieldLabel: 'تاریخ انجام بازرسی',
                                    name: 'techinspdate',
                                    id: 'techinspdate',
                                    allowBlank: false,
                                    bind: {
                                        value: '{displayOccurIdea.techinspdate}'
                                    }
                                },
                                {
                                    xtype: 'cellspacer'
                                    //  colspan: 2
                                },
                                {
                                    xtype: 'tcombobox',
                                    fieldLabel: 'نتیجه بررسی',
                                    displayField: 'name',
                                    valueField: 'value',
                                    editable: false,
                                    allowBlank: false,
                                    id: 'techinspinwork',
                                    matchFieldWidth: true,
                                    bind: {
                                        value: '{displayOccurIdea.techinspinwork}'
                                    },
                                    store: {
                                        fields: ['name', 'value'],
                                        data: [
                                            {name: 'تایید حادثه ناشی از کار', value: '1'},
                                            {name: 'تایید حادثه غیر ناشی از کار', value: '2'},
                                            /*{name: 'نقص مدارک', value: '3'}*/
                                        ]
                                    }
                                },
                                {
                                    xtype: 'cellspacer'
                                    //  colspan: 2
                                },
                                {
                                    xtype: 'ttextarea',
                                    fieldLabel: 'مشروح گزارش بازرس فنی شعبه در خصوص چگونگی وقوع حادثه و نوع آن',
                                    labelAlign: 'top',
                                    colspan: 2,
                                    height: 130,
                                    width: '100%',
                                    allowBlank: false,
                                    bind: {
                                        value: '{displayOccurIdea.fulltechinspreport}'
                                    }
                                },
                                {
                                    xtype: 'ttextfield',
                                    width: '100%',
                                    labelWidth: 180,
                                    fieldLabel: 'نام و نام خانوادگی بازرس فنی ',
                                    allowBlank: false,
                                    maxLen: 150,
                                    bind: {
                                        value: '{personalData.firstName + " " + personalData.lastName}'

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
                            handler: 'saveDisplayOccurIdeaButton',
                            bind: {
                                disabled: '{lockInspSave}'
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
})
;

