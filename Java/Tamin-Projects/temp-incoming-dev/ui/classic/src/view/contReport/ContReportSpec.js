Ext.define('IncomeBank.view.contReport.ContReportSpec', {
    extend: 'IncomeBank.tamin.panel.Panel',
    alias: 'widget.cont-report-spec',
    xtype: 'ContReportSpec',
    controller: 'contController',
    viewModel: 'contReportModel',
    title: 'گزارش مغایرت بانک و دفتر',
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
                                width: '70%',
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
                            width: '90%',
                        },
                        {
                            xtype: 'tcombobox',
                            fieldLabel: 'نوع مغایرت',
                            displayField: 'name',
                            valueField: 'value',
                            id: 'type',
                            name: 'type',
                            editable: false,
                            width: '90%',
                            emptyText: '--',
                            store: {
                                fields: ['name', 'value'],
                                data: [
                                    {name: 'دفتر وجود ندارد', value: '1'},
                                    {name: 'صورتحساب وجود ندارد', value: '2'},
                                    {name: 'سایر مغایرت ها', value: '3'},
                                    {name: 'همه', value: '4'}
                                ]
                            }
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
                    bind: {store: '{contReportStore}'},
                    columns: [
                        {
                            text: '#',
                            xtype: 'rownumberer',
                            autoSizeColumn: true,
                            align: 'center',
                        },
                        {
                            text: 'شماره برگه',
                            dataIndex: 'orderNo',
                            autoSizeColumn: true,
                            align: 'center',
                            emptyCellText: '--',
                        },
                        {
                            text: 'تاریخ رکورد',
                            dataIndex: 'orderNo',
                            autoSizeColumn: true,
                            align: 'center',
                            renderer: function (value, data, record) {
                                if (record.data.year && record.data.month) {
                                    return record.data.year + '/' + record.data.month + '/1';
                                } else {
                                    return '--';
                                }
                            }
                        },
                        {
                            text: 'تاریخ دفتر',
                            dataIndex: 'daftarDate',
                            autoSizeColumn: true,
                            align: 'center',
                            renderer: function (value, data, record) {
                                if (value) {
                                    return value !== null ? (value.substr(0, 4) + '/' + value.substr(4, 2) + '/' + value.substr(6, 2)) : '-';
                                } else {
                                    return '--';
                                }
                            }
                        },
                        {
                            text: 'بانک صورت حساب',
                            dataIndex: 'billBank',
                            autoSizeColumn: true,
                            align: 'center',
                            emptyCellText: '--',
                        },
                        {
                            text: 'مبلغ صورتحساب',
                            dataIndex: 'billAmount',
                            autoSizeColumn: true,
                            align: 'center',
                            renderer: function (val, data, record) {
                                if (val) {
                                    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                } else {
                                    return '--';
                                }
                            },
                        },
                        {
                            text: 'تاریخ صورتحساب',
                            dataIndex: 'billDate',
                            autoSizeColumn: true,
                            align: 'center',
                            emptyCellText: '--',
                            renderer: function (value, data, record) {
                                if (value) {
                                    return value !== null ? (value.substr(0, 4) + '/' + value.substr(4, 2) + '/' + value.substr(6, 2)) : '-';
                                } else {
                                    return '--';
                                }
                            }
                        },
                        {
                            text: 'بانک دفتر',
                            dataIndex: 'daftarBank',
                            autoSizeColumn: true,
                            align: 'center',
                            emptyCellText: '--'
                        },
                        {
                            text: 'مبلغ دفتر',
                            dataIndex: 'daftarAmount',
                            autoSizeColumn: true,
                            align: 'center',
                            renderer: function (val, data, record) {
                                if (val) {
                                    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                } else {
                                    return '--';
                                }
                            },
                        },
                        {
                            text: 'تفاوت مبلغ',
                            dataIndex: 'diffAmount',
                            autoSizeColumn: true,
                            align: 'center',
                            emptyCellText: '--',
                            renderer: function (val, data, record) {
                                return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            },
                        },
                        {
                            text: 'نوع',
                            dataIndex: 'type',
                            autoSizeColumn: true,
                            align: 'center',
                            emptyCellText: '--',
                            renderer: function (a, b, rec) {
                                var data = rec.data.type;
                                switch (data) {
                                    case '1':
                                        return 'دفتر وجود ندارد';
                                        break;
                                    case '2':
                                        return 'صورتحساب وجود ندارد';
                                        break;
                                    case '3':
                                        return 'سایر مغایرت ها';
                                        break;
                                    case '4':
                                        return 'همه';
                                        break;
                                }
                            }
                        },
                    ],
                    dockedItems: [
                        {
                            xtype: 'pagingtoolbar',
                            bind: {store: '{contReportStore}'},
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
                                width: '70%',
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
                            fieldLabel: 'مجموع مبالغ مغایرت',
                            width: '50%',
                            bind: {
                                value: '{contReportSummery.diffAmount}'
                            }
                        }
                    ]
                }
            ]
        }
    ]
});
