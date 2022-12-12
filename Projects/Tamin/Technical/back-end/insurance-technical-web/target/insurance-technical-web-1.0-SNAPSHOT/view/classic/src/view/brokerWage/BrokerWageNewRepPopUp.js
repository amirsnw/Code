/**
 * Created by a-khalighi on 9/6/2020.
 */
Ext.define('InsuranceTechnical.view.brokerWage.BrokerWageNewRepPopUp', {
    extend: 'InsuranceTechnical.tamin.window.Window',
    xtype: 'broker-wage-new',
    title: 'محاسبه حق الزحمه کارگزاریها',
    closeAction: 'destroy',
    modal: true,
    reference: 'broker-wage-new-rep-ref',
    width: '50%',
    items: [
        {
            xtype: 'tform',
            id: 'broker-wage-new-rep-form',
            items: [
                {
                    xtype: 'tfieldset',
                    layout: {
                        type: 'table',
                        columns: 2,
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
                            xtype: 'tcombobox',
                            fieldLabel: 'کد شعبه',
                            displayField: 'branchCode' + '-' + 'branchName',
                            valueField: 'branchCode',
                            pageSize: 10,
                            name: 'branchCode',
                            id: 'branchNew',
                            matchFieldWidth: true,
                            bind: {
                                store: '{branchStore}',
                                value: '{brokerWageSpec.branchCode}',
                                disabled: '{disableBranch}'
                            },
                            displayTpl: Ext.create('Ext.XTemplate',
                                '<tpl for=".">',
                                '{branchCode}  {branchName}',
                                '</tpl>'
                            ),
                            tpl: Ext.create('Ext.XTemplate',
                                '<tpl for=".">',
                                '<div class="x-boundlist-item">',
                                '{branchCode} - {branchName}',
                                '</div>',
                                '</tpl>'
                            ),
                            listeners: {
                                beforequery: 'queryBranch',
                                change: function() {
                                    if (!this.up('broker-wage-spec').getViewModel().get('onLoading')) {
                                        Ext.getCmp('brokerNew').reset();
                                    }
                                }
                            },
                            triggers: {
                                delete: {
                                    cls: 'x-form-clear-trigger',
                                    weight: -2,
                                    handler: function () {
                                        arguments[0].setValue(null);
                                    }
                                }
                            }
                        },
                        {
                            xtype: 'tcombobox',
                            fieldLabel: 'کد کارگزاری',
                            displayField: 'branchCode' + '-' + 'branchName',
                            valueField: 'branchCode',
                            pageSize: 10,
                            name: 'brokerNew',
                            id: 'brokerNew',
                            matchFieldWidth: true,
                            bind: {
                                store: '{brokerStore}',
                                value: '{brokerWageSpec.brokerCode}',
                                disabled: '{disableBroker}'
                            },
                            displayTpl: Ext.create('Ext.XTemplate',
                                '<tpl for=".">',
                                '{branchCode} - {branchName}',
                                '</tpl>'
                            ),
                            tpl: Ext.create('Ext.XTemplate',
                                '<tpl for=".">',
                                '<div class="x-boundlist-item">',
                                '{branchCode} - {branchName}',
                                '</div>',
                                '</tpl>'
                            ),
                            listeners: {
                                beforequery: 'queryBroker'
                            },
                            triggers: {
                                delete: {
                                    cls: 'x-form-clear-trigger',
                                    weight: -2,
                                    handler: function () {
                                        arguments[0].setValue(null);
                                    }
                                }
                            }
                        },
                        {
                            xtype: 'tdatefield',
                            fieldLabel: 'از تاریخ',
                            name: 'startDate',
                            id: 'startDate',
                            allowBlank: false,
                            bind: {
                                value: '{brokerWageSpec.startDate}',
                            }
                        },
                        {
                            xtype: 'tdatefield',
                            fieldLabel: 'تا تاریخ',
                            name: 'endDate',
                            id: 'endDate',
                            allowBlank: false,
                            bind: {
                                value: '{brokerWageSpec.endDate}',
                            }
                        },
                    ]
                },
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
                    text: 'استخراج گزارش',
                    id: 'saveNewReport',
                    iconCls: 'icon accept',
                    handler: 'saveNewReport',
                    bind: {
                        disabled: '{lockNew}'
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
});

