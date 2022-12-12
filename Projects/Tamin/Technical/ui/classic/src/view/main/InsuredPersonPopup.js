Ext.define('InsuranceTechnical.view.main.InsuredPersonPopup', {
    extend: 'InsuranceTechnical.tamin.window.Window',
    modal: true,
    width: '70%',
    bodyPadding: 5,
    title: 'بیمه شده',
    closeAction: 'destroy',
    reference: 'InsuredPersonPopup',
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
                    },
                    items: [
                        {
                            xtype: 'tcombobox',
                            fieldLabel: 'کد شعبه',
                            displayField: 'branchCode' + '-' + 'branchName',
                            valueField: 'branchCode',
                            pageSize: 10,
                            name: 'branchCode',
                            matchFieldWidth: true,
                            bind: {
                                store: '{branch}',
                                hidden: '{!setadi}'
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
                                beforequery: function (queryEvent) {

                                    if (Ext.getCmp('branchCode').getValue() === null
                                        || Ext.getCmp('branchCode').getValue() === undefined
                                        || Ext.getCmp('branchCode').getValue() === '') {
                                        return;
                                    }
                                    var val = Ext.getCmp('branchCode').getValue().split('-')[0];
                                    if (!queryEvent.cancel) {
                                        var filters = [];
                                        if (val) {
                                            filters.push({
                                                property: 'branchCode',
                                                value: val.split('-')[0] + '*',
                                                operator: 'LIKE'
                                            });
                                        }
                                        queryEvent.query = JSON.stringify(filters);
                                    }
                                    return queryEvent;
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
                            xtype: 'tdisplayfield',
                            fieldLabel: 'کد شعبه',
                            bind: {
                                value: '{brchCode}',
                                hidden: '{setadi}'
                            },
                        },
                        {
                            xtype: 'ttextfield',
                            fieldLabel: 'شماره بیمه شده',
                            name: 'id',
                            maxLength: 10,
                            minLength: 10,
                            maskRe: /[0-9]/,
                            regex: /[0-9]/,
                            bind: {
                                value: '{personInfo.id}'
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
                            xtype: 'ttextfield',
                            fieldLabel: 'نام',
                            name: 'firstName',
                            maxLength: 15,
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
                            xtype: 'ttextfield',
                            fieldLabel: 'نام خانوادگی',
                            name: 'lastName',
                            maxLength: 15,
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
                            xtype: 'ttextfield',
                            fieldLabel: 'شماره شناسنامه',
                            name: 'idCardNumber',
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
                            fieldLabel: 'نام پدر',
                            name: 'fatherName',
                            maxLength: 15,
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
                            xtype: 'ttextfield',
                            fieldLabel: 'کد ملی',
                            name: 'nationalId',
                            maxLength: 10,
                            minLength: 10,
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
                            xtype: 'cellspacer',
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
                                        var orgCode = InsuranceTechnical.getApplication().getCache('organizationCode');
                                        var store = grid.getStore();
                                        var values = form.getValues();
                                        var filters = [];
                                        var flag = false;
                                        /*if (orgCode !== '0000') {
                                            filters.push({
                                                property: 'brchCode',
                                                value: orgCode,
                                                operator: 'EQUAL',
                                            });
                                        }*/
                                        Ext.Object.each(values, function (key, value) {
                                            if (value !== '') {
                                                switch (key) {
                                                    case 'nationalId':
                                                        flag = true;
                                                        filters.push({
                                                            property: key,
                                                            value: value,
                                                            operator: 'EQUAL',
                                                        });
                                                        break;
                                                    case 'id':
                                                        flag = true;
                                                        filters.push({
                                                            property: key,
                                                            value: value,
                                                            operator: 'EQUAL',
                                                        });
                                                        break;
                                                    case 'firstName':
                                                        flag = true;
                                                        filters.push({
                                                            property: key,
                                                            value: '*' + value + '*',
                                                            operator: 'LIKE',
                                                        });
                                                        break;
                                                    case 'lastName':
                                                        flag = true;
                                                        filters.push({
                                                            property: key,
                                                            value: '*' + value + '*',
                                                            operator: 'LIKE',
                                                        });
                                                        break;
                                                    case 'fatherName':
                                                        flag = true;
                                                        filters.push({
                                                            property: key,
                                                            value: '*' + value + '*',
                                                            operator: 'LIKE',
                                                        });
                                                        break;
                                                    case 'branchCode':
                                                        flag = true;
                                                        if (orgCode === '0000') {
                                                            filters.push({
                                                                property: 'brchCode',
                                                                value: value.split('-')[0],
                                                                operator: 'EQUAL',
                                                            });
                                                        }
                                                        break;
                                                    default:
                                                        filters.push({
                                                            property: key,
                                                            value: value,
                                                            operator: 'EQUAL',
                                                        });
                                                }
                                            }
                                        });
                                        if (!flag) {
                                            InsuranceTechnical.tamin.window.MessageBox.showInfo('پیام سیستم', 'لطفا حداقل یکی از فیلترها را پر کنید.');
                                        } else {
                                            Ext.Object.each(values, function (key, value) {
                                                store.removeFilter(key);
                                            });
                                            store.addFilter(filters, true);
                                            store.load();
                                        }
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
                                        var grid = me.items.items[1].items.items[0];
                                        var store = grid.getStore();
                                        Ext.Object.each(form.getValues(), function (key, value) {
                                            store.removeFilter(key, true);
                                        });
                                        form.getForm().reset();
                                        store.loadData([], false);
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
                    bind: {store: '{insuranceRegisterations}'},
                    columns: [
                        {text: '#', xtype: 'rownumberer', autoSizeColumn: true},
                        {text: 'کد شعبه', dataIndex: 'brchCode', autoSizeColumn: true},
                        {text: 'شماره بیمه', dataIndex: 'id', autoSizeColumn: true},
                        {text: 'نام', dataIndex: 'firstName', autoSizeColumn: true},
                        {text: 'نام خانوادگی', dataIndex: 'lastName', autoSizeColumn: true},
                        {text: 'شماره شناسنامه', dataIndex: 'idCardNumber', autoSizeColumn: true},
                        {text: 'نام پدر', dataIndex: 'fatherName', autoSizeColumn: true},
                        {text: 'کد ملی', dataIndex: 'nationalId', autoSizeColumn: true}
                    ],
                    dockedItems: [
                        {
                            xtype: 'pagingtoolbar',
                            bind: {store: '{insuranceRegisterations}'},
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
                    handler: function (btn) {
                        var me = btn.up('window');
                        var grid = me.items.items[1].items.items[0];
                        var selectedItem = grid.getSelection();
                        if (selectedItem.length > 0) {//if (selectedItem !== null && selectedItem.length !== 0) {
                            me.selectedItem = selectedItem[0];
                            me.close();
                        }
                        else {
                            InsuranceTechnical.tamin.window.MessageBox.showError('خطا', 'موردی انتخاب نشده است.');
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
        afterrender: function (window, eOpts) {
            var grid = this.items.items[1].items.items[0];
            var store = grid.getStore();
            var form = this.items.items[0].items.items[0].getForm();
            Ext.Object.each(form.getValues(), function (key, value) {
                store.removeFilter(key);
            });
            /*if (store.getRawRecords().length > 0) {
                store.loadData([], false);
            }*/
        }

    },
    setCallback: function (cb) {
        this.callback = cb;
    }
});
