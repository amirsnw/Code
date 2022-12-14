Ext.define('InsuranceTechnical.view.occur.WorkshopOccurPopup', {
    extend: 'InsuranceTechnical.tamin.window.Window',
    modal: true,
    width: '60%',
    bodyPadding: 5,
    closeAction: 'destroy',
    reference: 'WorkshopOccurPopup',
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
                        columns: 3,
                        tableAttrs: {
                            style: {
                                width: '100%'
                            }
                        }
                    },
                    defaults: {
                        width: '95%',
                        labelWidth: 130,
                    },
                    items: [
                        {
                            xtype: 'tdisplayfield',
                            fieldLabel: 'کد شعبه کارگاه',
                            bind: {
                                value: '{personalData.insBrchCode}'
                            }
                        },
                        {
                            xtype: 'ttextfield',
                            fieldLabel: 'کد کارگاه',
                            name: 'workshopId',
                            id: 'popWorkshopId'
                        },
                        {
                            xtype: 'ttextfield',
                            fieldLabel: 'نام کارگاه',
                            name: 'workshopName',
                            id: 'popWorkshopName'
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
                                    name: 'btnSearch',
                                    handler: function () {
                                        
                                        var me = arguments[0].up('window');
                                        var grid = me.items.items[1].items.items[0];
                                        var form = me.items.items[0].items.items[0].getForm();
                                        var store = grid.getStore();
                                        var values = form.getValues();
                                        var filters = [];
                                        if (me.up('occur-spec')) {
                                            var insBranchCode = me.up('occur-spec').getViewModel().data.personalData.insBrchCode;
                                            if (insBranchCode !== null && insBranchCode !== undefined
                                                && insBranchCode !== '') {
                                                filters.push({
                                                    property: 'branchCode',
                                                    value: insBranchCode,
                                                    operator: 'EQUAL'
                                                });
                                            }
                                        }
                                        Ext.Object.each(values, function (key, value) {
                                            if (value !== '') {
                                                switch (key) {
                                                    case 'workshopName':
                                                        filters.push({
                                                            property: key,
                                                            value: value,
                                                            operator: 'LIKE'
                                                        });
                                                    /*case 'branchCode':
                                                        if(currentOrg ==="0000" && value.split('-')[0] === currentOrg){
                                                            filters.push({
                                                                property: 'branchCode',
                                                                operator: 'inn'
                                                            });
                                                        } else {
                                                            filters.push({
                                                                property: 'branchCode',
                                                                value: value.split('-')[0],
                                                                operator: 'EQUAL'
                                                            });
                                                        }
                                                        break;*/
                                                    default:
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
                                    name: 'btnShowAllWorkShop',
                                    handler: function () {
                                        var me = arguments[0].up('window');
                                        Ext.getCmp('popWorkshopId').reset();
                                        Ext.getCmp('popWorkshopName').reset();
                                        var grid = me.items.items[1].items.items[0];
                                        var store = grid.getStore();
                                        store.clearFilter(true);
                                        store.loadData([],false);
                                        grid.query('pagingtoolbar')[0].onLoad();
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
                    itemId: 'theGrid',
                    id: 'workshop',
                    bind: {store: '{workshop}'},
                    columns: [
                        {text: '#', xtype: 'rownumberer', autoSizeColumn: true},
                        {text: 'کد شعبه', dataIndex: 'branchCode', autoSizeColumn: true},
                        {text: 'شماره کارگاه', dataIndex: 'workshopId', autoSizeColumn: true},
                        {text: 'نام کارگاه', dataIndex: 'workshopName', autoSizeColumn: true},
                        {text: 'کد شعبه', dataIndex: 'branchCode', autoSizeColumn: true}
                    ],
                    dockedItems: [
                        {
                            xtype: 'pagingtoolbar',
                            bind: {store: '{workshop}'},
                            dock: 'bottom',
                            displayMsg: 'رکوردهای {0} تا {1} از مجموع {2}',
                            beforePageText: 'صفحه',
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
                    handler: 'onSelectRecordWorkshop'
                }
            ]
        }
    ],
    listeners: {
        close: function (panel, eOpts) {
            this.callback(this.selectedItem);
        },
        afterrender: function (window, eOpts) {
            
            var store =  this.lookupViewModel().getStore('workshop');
            store.clearFilter(true);
            store.loadData([], false);

        }

    },
    setCallback: function (cb) {
        this.callback = cb;
    }
});


