Ext.define('IncomeBank.view.finaicialDoc.FinancialDocSpec', {
    extend: 'IncomeBank.tamin.panel.Panel',
    alias: 'widget.financial-doc-spec',
    xtype: 'financialDocSpec',
    controller: 'financialDocController',
    viewModel: 'financialDocModel',
    title: 'مشاهده و صدور سند مالی',
    items: [
        {
            xtype: 'tfieldset',
            title: 'جستجو',
            scrollable: false,
            style: {
                backgroundColor: '#f8f8f8'
            },
            defaults: {
                labelWidth: 150,
                margin: 5
            },
            layout: {
                type: 'table',
                columns: 3,
                tableAttrs: {
                    style: {width: '80%'}
                }
            },
            items: [
                {
                    xtype: 'tform',
                    border: false,
                    bodyStyle: 'background:transparent',
                    layout: {
                        type: 'table',
                        columns: 3,
                        tableAttrs: {
                            style: {
                                width: '80%',
                                labelStyle: 'text-align:center'
                            }
                        }
                    },
                    defaults: {
                        labelWidth: 125,
                    },
                    items: [
                        {
                            xtype: 'monthfield',
                            fieldLabel: 'سال و ماه',
                            id: 'yearMonth',
                            name: 'yearMonth',
                            allowBlank: false,
                            width: '60%',
                        },
                        {
                            xtype: 'hr',
                            colspan: 3
                        },
                        {
                            xtype: 'buttoncontainer',
                            items: [
                                {
                                    xtype: 'button',
                                    text: 'جستجو',
                                    padding: 5,
                                    iconCls: 'icon zoom',
                                    handler: 'onSearch'
                                },
                            ]
                        }
                    ]

                }
            ]
        },
        {
            xtype: 'tfieldset',
            items: [
                {
                    xtype: 'tgrid',
                    bind: {store: '{financialDoc}'},
                    /*features: [{
                        ftype: 'summary'
                    }],*/
                    columns: [
                        {
                            text: '#',
                            xtype: 'rownumberer',
                            autoSizeColumn: true,
                            align: 'center',
                            /*summaryRenderer: function(value, summaryData, dataIndex) {
                                return 'مجموع مبالغ';
                            }*/
                        },
                        {
                            text: 'کد مالی',
                            dataIndex: 'accountCode',
                            autoSizeColumn: true,
                            align: 'center',
                            emptyCellText: '--',
                        },
                        {
                            text: 'شرح ردیف',
                            dataIndex: 'accountDesc',
                            autoSizeColumn: true,
                            align: 'center',
                            emptyCellText: '--'
                        },
                        {
                            text: 'مبلغ بدهکار',
                            dataIndex: 'debtAmount',
                            autoSizeColumn: true,
                            align: 'center',
                            emptyCellText: '--',
                            renderer: function (val, data, record) {
                                return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            },
                            /*summaryType: function(records, values) {
                                var i = 0,
                                    length = records.length;
                                if (length > 0) {
                                    return records[length - 1].get('debtAmount');
                                } else {
                                    return 0;
                                }
                            },
                            summaryRenderer: function(val, summaryData, dataIndex) {
                                return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            }*/
                        },
                        {
                            text: 'مبلغ بستانکار',
                            dataIndex: 'creditAmount',
                            autoSizeColumn: true,
                            align: 'center',
                            emptyCellText: '--',
                            renderer: function (val, data, record) {
                                return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            },
                            /*summaryType: function (records, values) {
                                var i = 0,
                                    length = records.length;
                                if (length > 0) {
                                    return records[length - 1].get('creditAmount');
                                } else {
                                    return 0;
                                }
                            },
                            summaryRenderer: function(val, summaryData, dataIndex) {
                                return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            }*/
                        },
                    ],
                    dockedItems: [
                        {
                            xtype: 'pagingtoolbar',
                            bind: {store: '{financialDoc}'},
                            dock: 'bottom',
                            beforePageText: 'صفحه',
                            displayMsg: 'رکوردهای {0} تا {1} از مجموع {2}',
                            displayInfo: true
                        }
                    ]
                },
            ]
        },
        {
            xtype: 'tfieldset',
            title: 'مجموع اقلام',
            style: {
                backgroundColor: '#f8f8f8'
            },
            scrollable: false,
            items: [
                {
                    xtype: 'tform',
                    border: false,
                    bodyStyle: 'background:transparent',
                    layout: {
                        type: 'table',
                        columns: 2,
                        tableAttrs: {
                            style: {
                                width: '80%',
                                labelStyle: 'text-align:center'
                            }
                        }
                    },
                    defaults: {
                        labelWidth: 150
                    },
                    items: [
                        {
                            xtype: 'tdisplayfield',
                            fieldLabel: 'مجموع مبالغ بدهکار',
                            width: '90%',
                            bind: {
                                value: '{financialDocSummery.debtAmount}'
                            }
                        },
                        {
                            xtype: 'tdisplayfield',
                            fieldLabel: 'مجموع مبالغ بستانکار',
                            width: '90%',
                            bind: {
                                value: '{financialDocSummery.creditAmount}'
                            }
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'buttoncontainer',
            items: [
                {
                    xtype: 'button',
                    text: 'صدور سند',
                    name: 'new',
                    iconCls: 'icon add',
                    handler: 'onIssuanceButton',
                    bind: {
                        disabled: '{lockNew}'
                    }
                },
                {
                    xtype: 'button',
                    text: 'ارسال به مالی',
                    name: 'new',
                    iconCls: 'icon add',
                    handler: 'onFinancialSubmitButton',
                    bind: {
                        disabled: '{lockNew}'
                    }
                }
            ]
        }
    ]
});
