/**
 * Created by a_khalighi on 9/4/2020.
 */

Ext.define('InsuranceTechnical.view.occur.NewOccurIdea', {

    extend: 'InsuranceTechnical.tamin.window.Window',
    xtype: 'new-occur-idea',
    closeAction: 'destroy',
    modal: true,
    reference: 'new-occur-idea-ref',
    width: '60%',

    items: [
        {
            xtype: 'tform',
            id: 'new-occur-idea-form',
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
                        width: '99%',
                        labelWidth: 180
                    },
                    items: [
                        {
                            xtype: 'tfieldset',
                            //     colspan: '3',
                            layout: {
                                type: 'table',
                                columns: 1
                                /*  tableAttrs: {
                                 style: {width: '99%'}
                                 }*/
                            },
                            defaults: {
                                //  width: '99%',
                                labelWidth: 140
                            },

                            items: [
                                {
                                    xtype: 'tdatefield',
                                    fieldLabel: 'تاریخ انجام بازرسی',
                                    name: 'techinspdate',
                                    id: 'techinspdate',
                                    allowBlank: false,
                                    bind: {
                                        value: '{newOccIdea.techinspdate}'
                                    }
                                },
                                {
                                    xtype: 'tcombobox',
                                    fieldLabel: 'نتیجه بررسی',
                                    displayField: 'name',
                                    valueField: 'value',
                                    allowBlank: false,
                                    editable: false,
                                    id: 'techinspinwork',
                                    matchFieldWidth: true,
                                    bind: {
                                        value: '{newOccIdea.techinspinwork}'
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
                                    xtype: 'ttextarea',
                                    fieldLabel: 'مشروح گزارش بازرس فنی شعبه در خصوص چگونگی وقوع حادثه و نوع آن',
                                    labelAlign: 'top',
                                    // colspan: 2,
                                    height: 130,
                                    width: '100%',
                                    allowBlank: false,
                                    bind: {
                                        value: '{newOccIdea.fulltechinspreport}'
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
                    },
                    items: [
                        {
                            xtype: 'button',
                            text: 'ذخیره',
                            // id: 'saveNewOccurIdea',
                            iconCls: 'icon accept',
                            handler: 'saveNewOccurIdea'
                        },
                        {
                            xtype: 'tbutton',
                            text: 'بازگشت',
                            name: 'cancel',
                            handler: 'onCancelButton',
                            /*handler: function () {
                                var me = arguments[0].up('window');
                                me.getViewModel().set('newOccIdea', {});
                                me.close();
                            },*/
                            iconCls: 'icon arrow_right'
                        }
                    ]
                }
            ]
        }
    ]
});
