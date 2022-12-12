/**
 * Created by a-khalighi on 9/6/2022.
 */
Ext.define('InsuranceTechnical.view.brokerWage.BrokerWageDetailSpecPopUp', {
    extend: 'Ext.window.Window',
    xtype: 'broker-wage-detail-spec',
    title: 'ریز محاسبه حق الزحمه کارگزاریها',
    closeAction: 'destroy',
    modal: true,
    reference: 'broker-wage-detail-ref',
    width: '80%',
    layout: 'fit',
    maximizable: true,
    /*listeners: {
        afterrender: function(grid){
            var grid = grid.down('tgrid');
        },
    },*/
    maximize: function(animate, initial) {
        var me = this;
        var height = me.getHeight();
        me.callParent();
        me.setHeight(height);
        me.center();
        // debugger
    },
    items: [
        {
            xtype: 'tform',
            id: 'broker-wage-detail-spec-search-form',
            items: [
                {
                    xtype: 'tfieldset',
                    title: 'جستجو',
                    defaults: {
                        labelWidth: 130,
                        width: '80%',
                    },
                    layout: {
                        type: 'table',
                        columns: 4,
                        tableAttrs: {
                            style: {width: '100%'}
                        }
                    },
                    items: [
                        {
                            xtype: 'tcombobox',
                            fieldLabel: 'استان',
                            name: 'province',
                            id: 'provinceDetail',
                            displayField: 'provinceName',
                            valueField: 'provinceCode',
                            editable: true,
                            pageSize: 10,
                            minChars: 2,
                            maskRe: /[^a-zA-Z]/,
                            matchFieldWidth: true,
                            bind: {
                                store: '{provinceStore}',
                                value: '{brokerWageDetail.province}',
                                disabled: '{brokerWageDetail.lockProvince}'
                            },
                            displayTpl: Ext.create('Ext.XTemplate',
                                '<tpl for=".">',
                                '{provinceCode} - {provinceName}',
                                '</tpl>'
                            ),
                            tpl: Ext.create('Ext.XTemplate',
                                '<tpl for=".">',
                                '<div class="x-boundlist-item">',
                                '{provinceCode} - {provinceName}',
                                '</div>',
                                '</tpl>'
                            ),
                            listeners: {
                                beforequery: 'queryProvince',
                                change: function () {
                                    if (!this.up('broker-wage-spec').getViewModel().get('onLoading')) {
                                        Ext.getCmp('branchDetail').reset();
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
                            fieldLabel: 'کد شعبه',
                            displayField: 'branchCode' + '-' + 'branchName',
                            valueField: 'branchCode',
                            pageSize: 10,
                            name: 'branchDetail',
                            id: 'branchDetail',
                            matchFieldWidth: true,
                            bind: {
                                store: '{branchStore}',
                                value: '{brokerWageDetail.branchCode}',
                                disabled: '{brokerWageDetail.lockBranch}'
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
                                beforequery: 'queryBranchSpec',
                                change: function () {
                                    if (!this.up('broker-wage-spec').getViewModel().get('onLoading')) {
                                        Ext.getCmp('brokerDetail').reset();
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
                            name: 'brokerDetail',
                            id: 'brokerDetail',
                            matchFieldWidth: true,
                            bind: {
                                store: '{brokerStore}',
                                value: '{brokerWageDetail.brokerCode}',
                                disabled: '{brokerWageDetail.lockBroker}'
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
                        /*{
                            xtype: 'ttextfield',
                            fieldLabel: 'نام کارگزاری',
                            name: 'brokerName',
                            bind: {
                                value: '{brokerWageDetail.brokerName}',
                            },
                            maxLen: 150,
                            triggers: {
                                delete: {
                                    cls: 'x-form-clear-trigger',
                                    weight: -2,
                                    handler: function () {
                                        arguments[0].setValue(null);
                                    }
                                }
                            }
                        },*/
                        {
                            xtype: 'cellspacer',
                            colspan: 1
                        },
                        {
                            xtype: 'ttextfield',
                            fieldLabel: 'کد ملی',
                            name: 'nationalCode',
                            bind: {
                                value: '{brokerWageDetail.nationalCode}',
                            },
                            maxLength: 10,
                            maskRe: /[0-9]/,
                            regex: /[0-9]/,
                            enforceMaxLength: true,
                            minLengthText: 'کد ملی ده رقمی میباشد.'
                        },
                        {
                            xtype: 'cellspacer',
                            colspan: 3
                        },
                        {
                            xtype: 'buttoncontainer',
                            items: [
                                {
                                    xtype: 'button',
                                    text: 'جستجو',
                                    iconCls: 'icon magnifier',
                                    handler: 'onDetailSearchButton'
                                },
                                {
                                    xtype: 'button',
                                    text: 'همه موارد',
                                    iconCls: 'icon table_multiple',
                                    handler: 'onDetailShowAllButton'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'gridcontainer',
                    items: [
                        {
                            xtype: 'tgrid',
                            id: 'broker-wage-detail-spec-grid',
                            bind: {
                                store: '{brokerWageDetailSpecStore}'
                            },
                            height: '100%',
                            columns: [
                                {
                                    text: '#',
                                    xtype: 'rownumberer',
                                    autoSizeColumn: true
                                },
                                {
                                    text: 'کد شعبه',
                                    xtype: 'templatecolumn',
                                    autoSizeColumn: true,
                                    tpl: '{branch.branchCode}',
                                    emptyCellText: '-',
                                },
                                {
                                    text: 'نام شعبه',
                                    xtype: 'templatecolumn',
                                    autoSizeColumn: true,
                                    tpl: '{branch.branchName}',
                                    emptyCellText: '-',
                                },
                                {
                                    text: 'کد کارگزاری',
                                    xtype: 'templatecolumn',
                                    autoSizeColumn: true,
                                    tpl: '{broker.branchCode}',
                                    emptyCellText: '-',
                                },
                                {
                                    text: 'نام کارگزاری',
                                    xtype: 'templatecolumn',
                                    autoSizeColumn: true,
                                    tpl: '{broker.branchName}',
                                    emptyCellText: '-',
                                },
                                {
                                    text: 'کدملی',
                                    dataIndex: 'nationalCode',
                                    autoSizeColumn: true,
                                    emptyCellText: '-',
                                },
                                {
                                    text: 'مبلغ پرداختی',
                                    dataIndex: 'amount',
                                    autoSizeColumn: true,
                                    emptyCellText: '-',
                                    renderer: function (value, data, record) {
                                        return value === null ? null : InsuranceTechnical.tamin.helpers
                                            .Persian.getWithCommaSeperator(value);
                                    }
                                },
                                {
                                    text: 'حق الزحمه متعلقه',
                                    dataIndex: 'brokerWage',
                                    autoSizeColumn: true,
                                    emptyCellText: '-',
                                    renderer: function (value, data, record) {
                                        return value === null ? null : InsuranceTechnical.tamin.helpers
                                            .Persian.getWithCommaSeperator(value);
                                    }
                                },
                                {
                                    text: 'تعداد ماه های پرداخت شده',
                                    dataIndex: 'paymentMonthCount',
                                    autoSizeColumn: true,
                                    emptyCellText: '-',
                                },
                                {
                                    text: 'نرخ حق بیمه',
                                    dataIndex: 'percent',
                                    autoSizeColumn: true,
                                    emptyCellText: '-',
                                    renderer: function (value, data, record) {
                                        return value === null ? null : value + '%';
                                    }
                                },
                                {
                                    text: 'دستمزد قرارداد',
                                    dataIndex: 'monthWage',
                                    autoSizeColumn: true,
                                    emptyCellText: '-',
                                    renderer: function (value, data, record) {
                                        return value === null ? null : InsuranceTechnical.tamin.helpers
                                            .Persian.getWithCommaSeperator(value);
                                    }
                                },
                                {
                                    text: 'شماره قرارداد',
                                    dataIndex: 'contractNumber',
                                    autoSizeColumn: true,
                                    emptyCellText: '-',
                                },
                                {
                                    text: 'تاریخ قرارداد',
                                    dataIndex: 'contractDate',
                                    autoSizeColumn: true,
                                    emptyCellText: '-',
                                    renderer: function (value, data, record) {
                                        return value === null ? null : InsuranceTechnical.tamin.helpers
                                            .Persian.taminDateNoSlashToSlash(value);
                                    }
                                },
                            ],
                            dockedItems: [
                                {
                                    xtype: 'pagingtoolbar',
                                    bind: {
                                        store: '{brokerWageDetailSpecStore}'
                                    },
                                    dock: 'bottom',
                                    beforePageText: 'صفحه',
                                    displayMsg: 'رکوردهای {0} تا {1} از مجموع {2}',
                                    displayInfo: true
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'container',
                    height: 5
                },
                {
                    xtype: 'buttoncontainer',
                    items: [
                        {
                            xtype: 'tbutton',
                            text: 'بازگشت',
                            name: 'cancel',
                            handler: 'onCancelButton',
                            iconCls: 'icon arrow_right'
                        },
                        {
                            xtype: 'tbutton',
                            text: 'چاپ گزارش',
                            name: 'print',
                            handler: 'onPrintReport',
                            iconCls: 'icon printer'
                        },
                        {
                            xtype: 'tbutton',
                            text: 'چاپ اکسل',
                            name: 'print',
                            handler: 'onPrintExcel',
                            iconCls: 'icon page_excel'
                        }
                    ]
                }
            ]
        }
    ]
});

