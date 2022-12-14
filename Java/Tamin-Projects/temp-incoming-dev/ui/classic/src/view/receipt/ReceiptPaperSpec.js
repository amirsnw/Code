Ext.define('IncomeBank.view.receipt.ReceiptPaperSpec', {
    extend: 'IncomeBank.tamin.panel.Panel',
    alias: 'widget.receipt-paper-spec',
    xtype: 'receiptPaperSpec',
    controller: 'receiptPaperController',
    viewModel: 'receiptPaperModel',
    title: 'مشاهده برگه های وصولی',
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
                            name: 'brchCode',
                            id: 'brchCode',
                            listeners: {
                                beforequery: function (queryEvent) {
                                    var brhCode = this.getValue();
                                    if (!queryEvent.cancel) {
                                        var filters = [];
                                        if (brhCode) {
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
                            fieldLabel: 'مشمول کمک دولت',
                            readOnly: false,
                            valueField: 'value',
                            displayField: 'name',
                            editable: false,
                            store: {
                                fields: ['name', 'value'],
                                data: [
                                    {name: 'غیر مشمول', value: '0'},
                                    {name: 'مشمول', value: '1'}
                                ]
                            },
                            name: 'governmentFlag',
                            matchFieldWidth: true,
                            pageSize: 0,
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
                            xtype: 'cellspacer',
                            colspan: 1,
                        },
                        {
                            xtype: 'tdatefield',
                            fieldLabel: 'تاریخ وصول از',
                            name: 'orderDateFrom',
                            id: 'orderDateFrom',
                            allowBlank: false,
                            validator: function (value) {
                                var inspectDateFrom = this.up('form').getForm().getValues().inspectDateFrom;
                                var inspectDateTo = this.up('form').getForm().getValues().inspectDateTo;
                                if (inspectDateFrom > inspectDateTo && inspectDateTo != '') {
                                    return 'تاریخ بزرگتر از تاریخ بعدی می باشد';
                                }
                                return true;
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
                            fieldLabel: 'لغایت',
                            name: 'orderDateTo',
                            validator: function (value) {
                                var inspectDateFrom = this.up('form').getForm().getValues().inspectDateFrom;
                                var inspectDateTo = this.up('form').getForm().getValues().inspectDateTo;
                                if (inspectDateTo < inspectDateFrom && inspectDateFrom != '') {
                                    return 'تاریخ کوچکتر از تاریخ قبلی می باشد';
                                }
                                return true;
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
                            xtype: 'cellspacer',
                            colspan: 1,
                        },
                        {
                            xtype: 'ttextfield',
                            fieldLabel: 'شماره برگه',
                            name: 'orderNo',
                            maxLength: 13,
                            minLength: 13,
                            maskRe: /[0-9]/,
                            regex: /[0-9]/,
                            enforceMaxLength: true,
                            enforceMaxLength: true,
                            labelSeparator: '',
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
                            xtype: 'ttextfield',
                            fieldLabel: 'شماره کارگاه',
                            maxLength: 10,
                            name: 'customerId',
                            maxLength: 10,
                            minLength: 10,
                            maskRe: /[0-9]/,
                            regex: /[0-9]/,
                            enforceMaxLength: true,
                            triggers: {
                                /*lookup: {
                                    cls: 'x-form-search-trigger',
                                    weight: -1,
                                    handler: function () {
                                        var me = arguments[0];
                                        var container = arguments[0].up('receiptPaper');
                                        var win = container.lookupReference('WorkshopPopup');
                                        if (!win) {
                                            win = Ext.create('IncomeBank.view.popups.WorkshopPopup');
                                            container.add(win);
                                        }
                                        win.setCallback(function () {
                                            if (win.selectedItem !== null) {
                                                me.setValue(win.selectedItem.data.id);
                                            }
                                        });
                                        win.show();
                                    }
                                },*/
                                delete: {
                                    cls: 'x-form-clear-trigger',
                                    weight: -2,
                                    handler: function () {
                                        arguments[0].setValue(null);
                                    }
                                }
                            },
                        },
                        {
                            xtype: 'cellspacer',
                            colspan: 1,
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
                    allowDeselect: true,
                    colspan: 2,
                    selModel: {
                        //selType: 'checkboxmodel',
                        mode: 'SINGLE',
                        checkOnly: 'true',
                        toggleOnClick: true,
                        allowDeselect: true
                    },
                    bind: {
                        store: '{receiptPaper}'
                    },
                    listeners: {
                        select: 'selectReceipt',
                        deselect: 'deSelectReceipt'
                    },
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
                            text: 'تاریخ وصول',
                            dataIndex: 'orderDate',
                            autoSizeColumn: true,
                            align: 'center',
                            emptyCellText: '--',
                            renderer: function (val, data, record) {
                                return val !== undefined && val !== null && val.toString().trim() != ''
                                    ? val.toString().substr(0, 4) + '/'
                                    + val.toString().substr(4, 2) + '/'
                                    + val.toString().substr(6, 2) : null;
                            }
                        },
                        {
                            text: 'شماره شعبه',
                            dataIndex: 'branchCode',
                            autoSizeColumn: true,
                            align: 'center',
                            emptyCellText: '--'
                        },
                        {
                            text: 'نام شعبه',
                            dataIndex: 'branchName',
                            autoSizeColumn: true,
                            align: 'center',
                            emptyCellText: '--'
                        },
                        {
                            text: 'شماره کارگاه',
                            dataIndex: 'customerId',
                            autoSizeColumn: true,
                            align: 'center',
                            emptyCellText: '--'
                        },
                        {
                            text: 'نام کارگاه',
                            dataIndex: 'customerName',
                            autoSizeColumn: true,
                            align: 'center',
                            emptyCellText: '--'
                        },
                        {
                            text: 'مبلغ وصول',
                            dataIndex: 'orderAmount',
                            autoSizeColumn: true,
                            align: 'center',
                            emptyCellText: '--',
                            renderer: function (val, data, record) {
                                return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            },
                        },
                        {
                            text: 'کد بانک',
                            dataIndex: 'bankCode',
                            autoSizeColumn: true,
                            align: 'center',
                            emptyCellText: '--'
                        },
                        {
                            text: 'نام بانک',
                            dataIndex: 'bankName',
                            autoSizeColumn: true,
                            align: 'center',
                            emptyCellText: '--'
                        },
                        {
                            text: 'مبلغ کمک دولت',
                            dataIndex: 'governmentAmount',
                            autoSizeColumn: true,
                            align: 'center',
                            emptyCellText: '--',
                            renderer: function (val, data, record) {
                                return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            },
                        },
                        {
                            text: 'تعداد بیمه پرداز',
                            dataIndex: 'countIsu',
                            autoSizeColumn: true,
                            align: 'center',
                            emptyCellText: '--',
                        },
                        {
                            text: 'تاریخ ایجاد رکورد',
                            dataIndex: 'addDate',
                            autoSizeColumn: true,
                            align: 'center',
                            emptyCellText: '--',
                            renderer: function (val, data, record) {
                                return val !== undefined && val !== null && val.toString().trim() != ''
                                    ? val.toString().substr(0, 4) + '/'
                                    + val.toString().substr(4, 2) + '/'
                                    + val.toString().substr(6, 2) : null;
                            }
                        },
                    ],
                    dockedItems: [
                        {
                            xtype: 'pagingtoolbar',
                            bind: {store: '{receiptPaper}'},
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
            id: 'fieldset-refund-detail',
            title: 'ریز اقلام برگه پرداخت',
            items: [
                {
                    xtype: 'gridcontainer',
                    scrollable: false,
                    items: [
                        {
                            xtype: 'tgrid',
                            id: 'detail-receipt-grid',
                            reference: 'detail-receipt-grid',
                            bind: {
                                store: '{detailReceiptPaper}'
                            },
                            columns: [
                                {
                                    text: '#',
                                    xtype: 'rownumberer',
                                    autoSizeColumn: true
                                },
                                {
                                    dataIndex: 'orderType',
                                    text: 'نوع اقلام برگه پرداخت',
                                    align: 'center',
                                    autoSizeColumn: true,
                                    emptyCellText: '--'
                                },
                                {
                                    dataIndex: 'orderAmount',
                                    text: 'مبلغ اقلام برگه پرداخت',
                                    align: 'center',
                                    autoSizeColumn: true,
                                    renderer: function (val, data, record) {
                                        if (val && val !== '0') {
                                            return val;
                                        } else {
                                            return '--';
                                        }
                                    }
                                }
                            ]
                        }
                    ],
                    dockedItems: [
                        {
                            xtype: 'pagingtoolbar',
                            bind: {
                                store: '{refundDetailStore}'
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
                        columns: 3,
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
                            fieldLabel: 'مجموع تعداد بیمه پرداز',
                            width: '90%',
                            bind: {
                                value: '{receiptPaperSummery.countIsu}'
                            }
                        },
                        {
                            xtype: 'tdisplayfield',
                            fieldLabel: 'مجموع مبالغ وصولی',
                            width: '90%',
                            bind: {
                                value: '{receiptPaperSummery.orderAmount}'
                            }
                        },
                        {
                            xtype: 'tdisplayfield',
                            fieldLabel: 'مجموع مبالغ کمک دولت',
                            width: '90%',
                            bind: {
                                value: '{receiptPaperSummery.governmentAmount}'
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
                    text: 'دانلود برگه های وصولی',
                    iconCls: 'icon report',
                    handler: 'onDownloadExcel'
                }
            ]
        }
    ]
});
