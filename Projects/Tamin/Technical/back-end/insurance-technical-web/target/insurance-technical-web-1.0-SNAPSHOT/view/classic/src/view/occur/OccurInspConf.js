/**
 * Created by sh-kalantari on 8/5/2019.
 */
Ext.define('InsuranceTechnical.view.occur.OccurInspConf', {

    extend: 'InsuranceTechnical.tamin.window.Window',
    xtype: 'occur-insp-conf',
    closeAction: 'destroy',
    modal: true,
    reference: 'occur-insp-conf-ref',
    width: '60%',
    items: [
        {
            xtype: 'tform',
            id: 'occur-insp-conf-form',
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
                                    xtype: 'tcombobox',
                                    fieldLabel: 'نتیجه بررسی بازرس',
                                    displayField: 'name',
                                    valueField: 'value',
                                    allowBlank: false,
                                    editable: false,
                                    matchFieldWidth: true,
                                    readOnly: true,
                                    colspan: 2,
                                    bind: {
                                        value: '{occurinspconf.techinspinwork}'
                                    },
                                    store: {
                                        fields: ['name', 'value'],
                                        data: [
                                            {name: 'تایید حادثه ناشی از کار', value: '1'},
                                            {name: 'تایید حادثه غیر ناشی از کار', value: '2'},
                                            {name: 'نقص مدارک', value: '3'}
                                        ]
                                    }
                                },
                                {
                                    xtype: 'tcombobox',
                                    fieldLabel: 'گزارش مسئول فنی',
                                    displayField: 'name',
                                    valueField: 'value',
                                    editable: false,
                                    allowBlank: false,
                                    colspan: 2,
                                    id: 'bossStatus',
                                    bind: {
                                        value: '{occurinspconf.bossStatus}'
                                    },
                                    store: {
                                        fields: ['name', 'value'],
                                        data: [
                                            {name: 'تایید حادثه ناشی از کار', value: '1'},
                                            {name: 'تایید حادثه غیر ناشی از کار', value: '2'}
                                        ]
                                    }
                                },
                                {
                                    xtype: 'ttextarea',
                                    fieldLabel: 'توضیحات و دلایل ',
                                    labelAlign: 'top',
                                    colspan: 2,
                                    height: 130,
                                    width: '100%',
                                    allowBlank: false,
                                    bind: {
                                        value: '{occurinspconf.bossRemark}'
                                    }
                                },
                                {
                                    xtype: 'ttextfield',
                                    width: '100%',
                                    labelWidth: 180,
                                    fieldLabel: 'نام و نام خانوادگی مسئول فنی ',
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
                            // id: 'saveOccurNew',
                            iconCls: 'icon database_save',
                            handler: 'saveOccurInspConfButton',
                            bind: {
                                disabled: '{lockInspSave}'
                            }
                        },
                        {
                            xtype: 'tbutton',
                            text: 'انصراف',
                            name: 'cancel',
                            handler: function () {
                                Ext.getCmp('occur-insp-conf-form').reset();
                                var me = arguments[0].up('window');
                                me.close();
                            },
                            iconCls: ''
                        }
                    ]
                }
            ]
        }
    ]
})
;

