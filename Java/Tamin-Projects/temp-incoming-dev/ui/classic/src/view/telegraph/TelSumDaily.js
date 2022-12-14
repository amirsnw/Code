Ext.define('IncomeBank.view.telegraph.TelSumDaily', {
    extend: 'IncomeBank.tamin.panel.Panel',
    alias: 'widget.telSumDaily',
    xtype: 'telSumDaily',
    controller: 'telSumDailyController',
    viewModel: 'telSumDailyModel',
    title: 'گزارش سرجمع وصولی روزانه',
    items: [
        {
            xtype: 'tfieldset',
            title: 'جستجو',
            scrollable: false,
            style: {
                backgroundColor: '#f8f8f8'
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
                                width: '100%',
                                labelStyle: 'text-align:center'
                            }
                        }
                    },
                    defaults: {
                        labelWidth: 125,
                        width: '98%'
                    },
                    items: [
                        {
                            xtype: 'tcombobox',
                            fieldLabel: 'اداره کل',
                            valueField: 'edareCode',
                            displayTpl: Ext.create('Ext.XTemplate',
                                '<tpl for=".">',
                                '<tpl>{edareCode} - {edareName}</tpl>',
                                '</tpl>'),
                            tpl: Ext.create('Ext.XTemplate',
                                '<tpl for=".">',
                                '<div class="x-boundlist-item">',
                                '{edareCode} - {edareName}',
                                '</div>',
                                '</tpl>'),
                            editable: true,
                            listeners: {
                                change: function (a,record) {
                                    Ext.getCmp('brhCode').setValue('');
                                },
                            },
                            name: 'edareCode',
                            pageSize: 10,
                            bind: {store: '{edareKol}'},
                        },
                        {
                            xtype: 'tcombobox',
                            fieldLabel: 'شعبه',
                            valueField: 'brhCode',
                            displayTpl: Ext.create('Ext.XTemplate',
                                '<tpl for=".">',
                                '<tpl>{brhCode} - {brhName}</tpl>',
                                '</tpl>'),
                            tpl: Ext.create('Ext.XTemplate',
                                '<tpl for=".">',
                                '<div class="x-boundlist-item">',
                                '{brhCode} - {brhName}',
                                '</div>',
                                '</tpl>'),
                            editable: true,
                            name: 'brhCode',
                            id: 'brhCode',
                            listeners: {
                                beforequery: function (queryEvent) {
                                    var edareCode = this.up('form').getForm().getValues().edareCode;
                                    var brhCode = this.up('form').getForm().getValues().brhCode;
                                    if (!queryEvent.cancel) {
                                        var filters = [];
                                        filters.push({
                                            "property": 'edareCode',
                                            "value": edareCode,
                                            "operator": "EQUAL"
                                        });
                                        if(brhCode){
                                            filters.push({
                                                "property": 'brhCode',
                                                "value": '%' + brhCode + '%',
                                                "operator": "LIKE"
                                            });
                                        }
                                        queryEvent.query = JSON.stringify(filters);
                                    }
                                    return queryEvent;
                                }
                            },
                            pageSize: 10,
                            bind: {store: '{branchView}'},
                        },
                        {
                            xtype: 'tdatefield',
                            fieldLabel: 'تاریخ شروع',
                            name: 'orderDateFrom',
                            id: 'orderDateFrom',
                            // value: new Date(),
                            allowBlank: false,
                            validator: function (value) {
                                var inspectDateFrom = this.up('form').getForm().getValues().inspectDateFrom;
                                var inspectDateTo = this.up('form').getForm().getValues().inspectDateTo;
                                if (inspectDateFrom > inspectDateTo && inspectDateTo != '') {
                                    return 'تاریخ بزرگتر از تاریخ بعدی می باشد';
                                }
                                return true;
                            }
                        },
                        {
                            xtype: 'tdatefield',
                            fieldLabel: 'تاریخ خاتمه',
                            name: 'orderDateTo',
                            validator: function (value) {
                                var inspectDateFrom = this.up('form').getForm().getValues().inspectDateFrom;
                                var inspectDateTo = this.up('form').getForm().getValues().inspectDateTo;
                                if (inspectDateTo < inspectDateFrom && inspectDateFrom != '') {
                                    return 'تاریخ کوچکتر از تاریخ قبلی می باشد';
                                }
                                return true;
                            }
                        },
                        {
                            xtype: 'cellspacer',
                            colspan: 2,
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
                                {
                                    xtype: 'button',
                                    text: 'نمایش همه',
                                    padding: 5,
                                    iconCls: 'icon page_white_stack',
                                    handler: 'onShowAll'
                                }

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
                    bind: {store: '{telSumDaily}'},
                    columns: [
                        {
                            text: '#',
                            xtype: 'rownumberer',
                            autoSizeColumn: true,
                            align: 'center'
                        },
                        {
                            text: 'کد شعبه',
                            dataIndex: 'brhCode',
                            autoSizeColumn: true,
                            align: 'center'
                        },
                        {
                            text: 'نام شعبه',
                            dataIndex: 'brhName',
                            autoSizeColumn: true,
                            align: 'center'
                        },
                        {
                            text: 'کد اداره کل',
                            dataIndex: 'edareCode',
                            autoSizeColumn: true
                        },
                        {
                            text: 'نام اداره کل',
                            dataIndex: 'edareName',
                            autoSizeColumn: true,
                            align: 'center'
                        },
                        {
                            text: 'تاریخ وصول',
                            dataIndex: 'orderDate',
                            autoSizeColumn: true,
                            align: 'center',
                            renderer: function (val, data, record) {
                                return val !== undefined && val !== null && val.toString().trim() != '' ? val.toString().substr(0, 4) + '/' + val.toString().substr(4, 2) + '/' + val.toString().substr(6, 2) : null;
                            }
                        },
                        {
                            text: 'مبلغ وصول',
                            dataIndex: 'sumAmount',
                            autoSizeColumn: true,
                            align: 'center',
                            renderer: function (val, data, record) {
                                return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            }
                        }
                    ],
                    dockedItems: [
                        {
                            xtype: 'pagingtoolbar',
                            bind: {
                                store: '{telSumDaily}'
                            },
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
            xtype: 'buttoncontainer',
            items: [
                {
                    xtype: 'button',
                    text: 'مشاهده گزارش',
                    iconCls: 'icon report',
                    handler: 'onExcel'
                }
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
                            fieldLabel: 'مجموع مبالغ وصول',
                            width: '50%',
                            bind: {
                                value: '{sumAmount}'
                            }
                        }
                    ]
                }
            ]
        }
    ]
});
