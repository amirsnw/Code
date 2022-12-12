Ext.define('InsuranceTechnical.view.insAgreement.WorkshopPopup', {
    extend: 'InsuranceTechnical.tamin.window.Window',
    modal: true,
    width: '60%',
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
                        columns: 3,
                        tableAttrs: {
                            style: {
                                width: '100%'
                            }
                        }
                    },
                    defaults: {
                        width: '95%'
                    },
                    items: [
                        {
                            xtype: 'tdisplayfield',
                            fieldLabel: 'کد شعبه کارگاه',
                            bind: {
                                value: '{personInfo.brchCode}'
                            }
                        },
                        {
                            xtype: 'ttextfield',
                            fieldLabel: 'کدکارگاه',
                            name: 'workshopId',
                            id: 'popWorkshopId',
                            maskRe: /[0-9]/,
                            regex: /[0-9]/,
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
                            fieldLabel: 'نام کارگاه',
                            name: 'workshopName',
                            id: 'popWorkshopName',
                            maskRe: /[\u0600-\u06FF\s]/,
                            regex: /[\u0600-\u06FF\s]/,
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
                                        if (me.up('insurance-agreement-new-main')) {
                                            var branchCode = me.up('insurance-agreement-new-main').getViewModel()
                                                             .data.personInfo.brchCode;
                                            var activityCode = me.up('insurance-agreement-new-main').getViewModel()
                                                .data.agreeSpec.activityCode;
                                            var subCode = me.up('insurance-agreement-new-main').getViewModel()
                                                .data.agreeSpec.subCode;
                                            if (branchCode) {
                                                filters.push({
                                                    property: 'branchCode',
                                                    value: branchCode,
                                                    operator: 'EQUAL'
                                                });
                                            }

                                            if (activityCode) {
                                                filters.push({
                                                    property: 'activity.activityCode',
                                                    value: activityCode,
                                                    operator: 'EQUAL'
                                                });
                                            }

                                            /*if (subCode) {
                                                filters.push({
                                                    property: 'operation',
                                                    value: '3',
                                                    operator: 'EQUAL'
                                                });
                                                filters.push({
                                                    property: 'subCode',
                                                    value: subCode,
                                                    operator: 'EQUAL'
                                                });
                                            }*/
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
                                        store.load({
                                            callback: function (record, operation, success) {
                                                if (success) {
                                                    if (record.length === 0) {
                                                        InsuranceTechnical.tamin.window.MessageBox
                                                            .showError('خطا',
                                                                'برای این گروه بیمه ای در شعبه مورد نظر کارگاه یافت نشد.',
                                                                null, null);
                                                    }
                                                }
                                            }
                                        });
                                    },
                                    iconCls: 'icon page_white_magnify'
                                },
                                {
                                    xtype: 'button',
                                    text: 'جستجوی جدید',
                                    name: 'btnShowAllWorkShop',
                                    handler: function () {
                                        var me = arguments[0].up('window');
                                        var form = arguments[0].up('tform');
                                        Ext.getCmp('popWorkshopId').reset();
                                        Ext.getCmp('popWorkshopName').reset();
                                        var grid = me.items.items[1].items.items[0];
                                        var store = grid.getStore();
                                        var filters = [];
                                        if (me.up('insurance-agreement-new-main')) {
                                            var branchCode = me.up('insurance-agreement-new-main').getViewModel()
                                                .data.personInfo.brchCode;
                                            var activityCode = me.up('insurance-agreement-new-main').getViewModel()
                                                .data.agreeSpec.activityCode;
                                            var subCode = me.up('insurance-agreement-new-main').getViewModel()
                                                .data.agreeSpec.subCode;
                                            if (branchCode) {
                                                filters.push({
                                                    property: 'branchCode',
                                                    value: branchCode,
                                                    operator: 'EQUAL'
                                                });
                                            }

                                            if (activityCode) {
                                                filters.push({
                                                    property: 'activity.activityCode',
                                                    value: activityCode,
                                                    operator: 'EQUAL'
                                                });
                                            }

                                            if (subCode) {
                                                filters.push({
                                                    property: 'operation',
                                                    value: '3',
                                                    operator: 'EQUAL'
                                                });
                                                filters.push({
                                                    property: 'subCode',
                                                    value: subCode,
                                                    operator: 'EQUAL'
                                                });
                                            }
                                        }
                                        store.clearFilter(true);
                                        store.addFilter(filters, true);
                                        store.load();
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
                    autoScroll: true,
                    id: 'workshop',
                    bind: {store: '{workshop}'},
                    pageSize: 10,
                    columns: [
                        {text: '#', xtype: 'rownumberer', autoSizeColumn: true},
                        {text: 'کد شعبه', dataIndex: 'branchCode', autoSizeColumn: true},
                        {text: 'شماره کارگاه', dataIndex: 'workshopId', autoSizeColumn: true},
                        {text: 'نام کارگاه', dataIndex: 'workshopName', autoSizeColumn: true},
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


