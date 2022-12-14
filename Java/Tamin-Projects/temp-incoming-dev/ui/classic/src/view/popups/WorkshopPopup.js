Ext.define('IncomeBank.view.popups.WorkshopPopup', {
    extend: 'IncomeBank.tamin.window.Window',
    modal: true,
    width: '40%',
    title: 'کارگاه',
    bodyPadding: 5,
    closeAction: 'destroy',
    reference: 'WorkshopPopup',
    selectedItem: null,
    callback: null,
    items: [
        {
            xtype: 'tfieldset',
            items: [
                {
                    xtype: 'tform',
                    layout: {
                        type: 'table',
                        columns: 2,
                        tableAttrs: {
                            style: {
                                width: '100%'
                            }
                        }
                    },
                    defaults: {
                        width: '98%'
                    },
                    items: [
                        {
                            xtype: 'ttextfield',
                            fieldLabel: 'شماره کارگاه',
                            name: 'id'
                        },
                        {
                            xtype: 'ttextfield',
                            fieldLabel: 'نام کارگاه',
                            name: 'workshopName'
                        },
                        {
                            xtype: 'buttoncontainer',
                            items: [
                                {
                                    xtype: 'button',
                                    text: 'جستجو',
                                    name: 'btnSearch',
                                    handler: function () {
                                        var me = arguments[0].up('window');
                                        var grid = me.items.items[1].items.items[0];
                                        var form = me.items.items[0].items.items[0].getForm();
                                        var store = grid.getStore();
                                        var values = form.getValues();

                                        var filters = [];
                                        Ext.Object.each(values, function (key, value) {
                                            if (value !== '') {
                                                if (key === 'workshopName') {
                                                    filters.push({
                                                        property: key,
                                                        value: value,
                                                        operator: 'LIKE'
                                                    });
                                                } else {
                                                    filters.push({
                                                        property: key,
                                                        value: value,
                                                        operator: 'EQUAL'
                                                    });
                                                }

                                            }
                                        });
                                        store.clearFilter(true);
                                        store.addFilter(filters, true);
                                        store.load();
                                    },
                                    iconCls: 'icon page_white_magnify'
                                },
                                {
                                    xtype: 'button',
                                    text: 'جستجوی جدید',
                                    name: 'btnShowAll',
                                    handler: function () {
                                        var me = arguments[0].up('window');
                                        var form = arguments[0].up('tform');
                                        form.getForm().reset();
                                        var grid = me.items.items[1].items.items[0];
                                        var store = grid.getStore();
                                        store.clearFilter(true);
                                        grid.getStore().load();
                                    },
                                    iconCls: 'icon page_white_stack'
                                }
                            ]
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
                    // itemId: 'theGrid',
                    bind: { store: '{Workshop}' },
                    columns: [
                        { text: '#', xtype: 'rownumberer', autoSizeColumn: true },
                        { text: 'شماره کارگاه', dataIndex: 'id', autoSizeColumn: true },
                        { text: 'نام کارگاه', dataIndex: 'workshopName', autoSizeColumn: true },
                    ],
                    dockedItems: [
                        {
                            xtype: 'pagingtoolbar',
                            bind: { store: '{Workshop}' },
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
            xtype: 'component',
            height: 5
        },
        {
            xtype: 'buttoncontainer',
            items: [
                {
                    xtype: 'button',
                    text: 'انتخاب',
                    iconCls: 'icon accept',
                    handler: function (btn) {
                        var me = btn.up('window');
                        var grid = me.items.items[1].items.items[0];
                        var selectedItem = grid.getSelection();
                        if (selectedItem !== null || selectedItem.length !== 0) {
                            me.selectedItem = selectedItem[0];
                            me.close();
                        }
                    }
                }
            ]
        }
    ],
    listeners: {
        close: function (panel, eOpts) {
            this.callback(this.selectedItem);
        },
        // afterrender: function (window, eOpts) {
        //     // var grid = window.items.items[1].items.items[0];
        //     var store =  this.lookupViewModel().getStore('Workshop');
        //     store.clearFilter(true);
        //     store.loadData([], false);
        //
        // }

    },
    setCallback: function (cb) {
        this.callback = cb;
    }
});
