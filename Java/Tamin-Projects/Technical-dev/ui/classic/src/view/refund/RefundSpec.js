Ext.define('InsuranceTechnical.view.refund.RefundSpec',
    {
        extend: 'InsuranceTechnical.tamin.panel.Panel',
        xtype: 'refund-spec',
        title: 'سیستم استرداد',
        controller: 'refund-spec-controller',
        viewModel: 'refund-spec-model',
        items: [
            {
                xtype: 'tform',
                id: 'refund-form-id',
                items: [
                    {
                        xtype: 'tfieldset',
                        title: 'جستجو',
                        defaults: {
                            labelWidth: 110,
                            width: 320,
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
                                xtype: 'tcombobox',
                                fieldLabel: 'کد شعبه',
                                displayField: 'branchCode' + '-' + 'branchName',
                                valueField: 'branchCode',
                                pageSize: 10,
                                id: 'branchCode',
                                name: 'branchCode',
                                matchFieldWidth: true,
                                bind: {
                                    store: '{branch}',
                                    value: '{organizationCode}'
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

                                        var me = this;
                                        var val = Ext.getCmp('branchCode').getValue().split('-')[0];
                                        var val1 = InsuranceTechnical.getApplication().getCache('organizationCode');
                                        if (!queryEvent.cancel) {
                                            var filters = [];
                                            if (val) {
                                                if (val.split('-')[0] !== "0000" && val === val1) {
                                                    filters.push({
                                                        property: 'branchCode',
                                                        value: val.split('-')[0],
                                                        operator: 'EQUAL'
                                                    });
                                                } else if (val1 === "0000") { // && val!=val1
                                                    filters.push({
                                                        property: 'branchCode',
                                                        value: val.split('-')[0] + '*',
                                                        operator: 'LIKE'
                                                    });
                                                }
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
                                xtype: 'ttextfield',
                                fieldLabel: 'شماره بیمه',
                                name: 'insuranceId',
                                id: 'insId',
                                // maxLength: 10,
                                // minLength: 10,
                                maskRe: /[0-9]/,
                                regex: /[0-9]/,
                                //enforceMaxLength: 20
                                enforceMaxLength: true,
                                msgTarget: 'side',
                                minLengthText: 'شماره بیمه ده رقمی میباشد.',
                                bind: {
                                    value: '{personalData.id}'
                                },
                                triggers: {
                                    lookup: {
                                        cls: 'x-form-search-trigger',
                                        weight: -1,
                                        handler: function () {

                                            var me = this;
                                            var container = me.up('refund-spec');
                                            var win = container.lookupReference('InsuredPersonPopup');
                                            if (!win) {
                                                win = Ext.create('InsuranceTechnical.view.soldier.InsuredPersonPopup');
                                                container.add(win);
                                            }
                                            win.setCallback(function () {
                                                if (win.selectedItem !== null) {

                                                    me.setValue(win.selectedItem.data.id);
                                                }
                                            });
                                            win.show();
                                        }
                                    }
                                }
                            },
                            {
                                xtype: 'tcombobox',
                                fieldLabel: 'وضعیت درخواست',
                                readOnly: false,
                                valueField: 'value',
                                displayField: 'name',
                                editable: false,
                                store: {
                                    fields: ['name', 'value'],
                                    data: [
                                        {name: 'ثبت درخواست', value: '0'},
                                        {name: 'تایید مسئول فنی', value: '1'},
                                        {name: 'عدم تایید مسئول فنی', value: '2'},
                                        {name: 'تایید مسئول شعبه', value: '3'},
                                        {name: 'ارسال به مالی', value: '8'},
                                        {name: 'پرداخت شده', value: '6'},
                                        {name: 'برگشت از مالی', value: '7'},
                                        {name: 'لغو درخواست', value: '5'}
                                    ]
                                },
                                id: 'statusStoreId',
                                name: 'status',
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
                                xtype: 'tdatefield',
                                name: 'requestDateFrom',
                                id: 'requestDateFrom',
                                // submitFormat: 'Y-m-d',
                                fieldLabel: 'تاریخ درخواست',
                                labelSeparator: false,
                                allowBlank: true
                            },
                            {
                                xtype: 'tdatefield',
                                name: 'requestDateTo',
                                id: 'requestDateTo',
                                // submitFormat: 'Y-m-d',
                                fieldLabel: 'لغایت',
                                labelSeparator: false,
                                allowBlank: true
                            },
                            {
                                xtype: 'ttextfield',
                                fieldLabel: 'کد ملی ',
                                name: 'nationalId'
                            },
//                                {
//                                    xtype: 'cellspacer',
//                                    colspan: 1
//                                } ,                        

                            {
                                xtype: 'tcombobox',
                                colspan: 3,
                                pageSize: 10,
                                fieldLabel: 'علت استرداد',
                                readOnly: false,
                                displayField: 'reasonDesc',
                                valueField: 'reasonCode',
                                bind: {
                                    store: '{refundReasonStore}',
                                    value: '{refundReason}'
                                },
                                displayTpl: Ext.create('Ext.XTemplate',
                                    '<tpl for=".">',
                                    '{reasonCode}  {reasonDesc}',
                                    '</tpl>'
                                ),
                                tpl: Ext.create('Ext.XTemplate',
                                    '<tpl for=".">',
                                    '<div class="x-boundlist-item">',
                                    '{reasonCode} - {reasonDesc}',
                                    '</div>',
                                    '</tpl>'
                                ),
                                id: 'reasonCode',
                                name: 'reasonCode',
                                matchFieldWidth: true,
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
                                colspan: 3,
                                width: '100%'
                            },
                            {
                                xtype: 'buttoncontainer',
                                items: [
                                    {
                                        xtype: 'button',
                                        text: 'جستجو',
                                        iconCls: 'icon magnifier',
                                        handler: 'onSearchButton'
                                    },
                                    {
                                        xtype: 'button',
                                        text: 'همه موارد',
                                        iconCls: 'icon table_multiple',
                                        handler: 'onShowAllButton'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        xtype: 'tfieldset',
                        title: 'لیست',
                        items: [
                            {
                                xtype: 'gridcontainer',
                                scrollable: false,
                                items: [
                                    {
                                        xtype: 'tgrid',
                                        id: 'transferInsuredtoOtherFunds-grid',
                                        bind: {store: '{refundStore}'},
                                        columns: [
                                            {
                                                text: '#',
                                                xtype: 'rownumberer',
                                                autoSizeColumn: true
                                            },
                                            {
                                                text: 'عملیات',
                                                align: 'center',
                                                stopSelection: true,
                                                id: 'enable-calc-splitbutton',
                                                xtype: 'widgetcolumn',
                                                onWidgetAttach: function (col, widget, rec) {
                                                    var orgCode = InsuranceTechnical.getApplication().getCache('organizationCode');
                                                    if (rec.data.branchCode !== orgCode) {
                                                        widget.menu.items.items[0].setDisabled(true);
                                                        widget.menu.items.items[1].setDisabled(true);
                                                        widget.menu.items.items[2].setDisabled(true);
                                                    } else {
                                                        switch (rec.data.status) {
                                                            case '0':
                                                                widget.menu.items.items[0].setDisabled(false);
                                                                widget.menu.items.items[1].setDisabled(true);
                                                                widget.menu.items.items[2].setDisabled(false);
                                                                break;
                                                            case '1':
                                                                widget.menu.items.items[0].setDisabled(false);
                                                                widget.menu.items.items[1].setDisabled(false);
                                                                widget.menu.items.items[2].setDisabled(false);
                                                                break;
                                                            case '2':
                                                                widget.menu.items.items[0].setDisabled(false);
                                                                widget.menu.items.items[1].setDisabled(true);
                                                                widget.menu.items.items[2].setDisabled(false);
                                                                break;
                                                            case '3':
                                                                widget.menu.items.items[0].setDisabled(true);
                                                                widget.menu.items.items[1].setDisabled(true);
                                                                widget.menu.items.items[2].setDisabled(true);
                                                                break;
                                                            case '5':
                                                                widget.menu.items.items[0].setDisabled(true);
                                                                widget.menu.items.items[1].setDisabled(true);
                                                                widget.menu.items.items[2].setDisabled(true);
                                                                break;
                                                            case '6':
                                                                widget.menu.items.items[0].setDisabled(true);
                                                                widget.menu.items.items[1].setDisabled(true);
                                                                widget.menu.items.items[2].setDisabled(true);
                                                                break;
                                                            case '7':
                                                                widget.menu.items.items[0].setDisabled(true);
                                                                widget.menu.items.items[1].setDisabled(true);
                                                                widget.menu.items.items[2].setDisabled(false);
                                                                break;
                                                            default:
                                                                widget.menu.items.items[0].setDisabled(true);
                                                                widget.menu.items.items[1].setDisabled(true);
                                                                widget.menu.items.items[2].setDisabled(true);
                                                        }
                                                    }
                                                },
                                                widget: {
                                                    xtype: 'button',
                                                    text: "عملیات",
                                                    defaultBindProperty: null,
                                                    menu: [
                                                        {
                                                            text: 'تایید مسئول فنی',
                                                            handler: 'onAction',
                                                            name: 'TechOpinion',
                                                            iconCls: ''
                                                        },
                                                        {
                                                            text: 'تایید مسئول شعبه',
                                                            handler: 'onAction',
                                                            name: 'BranchOpinion',
                                                            iconCls: ''
                                                        },
                                                        {
                                                            text: 'لغو درخواست ',
                                                            handler: 'onCancelAction',
                                                            name: 'CancelRequest',
                                                            iconCls: ''
                                                        }
                                                    ]
                                                }
                                            },
                                            {
                                                xtype: 'templatecolumn',
                                                tpl: '{branchCode}',
                                                text: 'شعبه',
                                                autoSizeColumn: true,
                                            },
                                            {
                                                xtype: 'templatecolumn',
                                                tpl: '{requestSerial}',
                                                text: 'شماره درخواست',
                                                autoSizeColumn: true
                                            },
                                            {
                                                xtype: 'templatecolumn',
                                                tpl: '{requestDate}',
                                                text: 'تاریخ درخواست',
                                                autoSizeColumn: true,
                                                align: 'center',
                                                renderer: function (val1, data, record) {
                                                    var value = record.data.requestDate;
                                                    return value !== null ? InsuranceTechnical.tamin.helpers.Persian.gregorianToPersian(new Date(value)) : null;
                                                }
                                            },
                                            {
                                                xtype: 'templatecolumn',
                                                tpl: '{insuranceId}',
                                                text: 'شماره بیمه',
                                                autoSizeColumn: true
                                            },
                                            {
                                                xtype: 'templatecolumn',
                                                tpl: '{nationalId}',
                                                text: 'کد ملی',
                                                autoSizeColumn: true
                                            },
                                            {
                                                xtype: 'templatecolumn',
                                                tpl: '{insuranceRegisteration.lastName}',
                                                text: 'نام خانوادگی',
                                                autoSizeColumn: true,
                                                renderer: function (val1, data, record) {
                                                    if (record.data.insuranceRegisteration !== null) {
                                                        return record.data.insuranceRegisteration.lastName;
                                                    } else {
                                                        return record.data.lastName;
                                                    }
                                                }
                                            },
                                            {
                                                xtype: 'templatecolumn',
                                                tpl: '{insuranceRegisteration.firstName}',
                                                text: 'نام',
                                                autoSizeColumn: true,
                                                renderer: function (val1, data, record) {
                                                    if (record.data.insuranceRegisteration !== null) {
                                                        return record.data.insuranceRegisteration.firstName;
                                                    } else {
                                                        return record.data.firstName;
                                                    }
                                                }
                                            },
                                            {
                                                xtype: 'templatecolumn',
                                                tpl: '{isuStartDate}',
                                                text: 'شروع استرداد حق بیمه',
                                                autoSizeColumn: true,
                                                renderer: function (val1, data, record) {
                                                    var value = record.data.isuStartDate;
                                                    return value !== null ? InsuranceTechnical.tamin.helpers.Persian.gregorianToPersian(new Date(value)) : null;
                                                }
                                            },
                                            {
                                                xtype: 'templatecolumn',
                                                tpl: '{isuEndDate}',
                                                text: 'پایان استرداد حق بیمه',
                                                autoSizeColumn: true,
                                                renderer: function (val1, data, record) {
                                                    var value = record.data.isuEndDate;
                                                    return value !== null ? InsuranceTechnical.tamin.helpers.Persian.gregorianToPersian(new Date(value)) : null;
                                                }
                                            },
                                            {
                                                xtype: 'templatecolumn',
                                                tpl: '{darmanStartDate}',
                                                //labelwidth:'20px',
                                                text: 'شروع استرداد سرانه درمان',
                                                autoSizeColumn: true,
                                                renderer: function (val1, data, record) {
                                                    var value = record.data.darmanStartDate;
                                                    return value !== null ? InsuranceTechnical.tamin.helpers.Persian.gregorianToPersian(new Date(value)) : '-';
                                                }
                                            },
                                            {
                                                xtype: 'templatecolumn',
                                                tpl: '{darmanEndDate}',
                                                text: 'پایان استرداد سرانه درمان',
                                                autoSizeColumn: true,
                                                renderer: function (val1, data, record) {
                                                    var value = record.data.darmanEndDate;
                                                    return value !== null ? InsuranceTechnical.tamin.helpers.Persian.gregorianToPersian(new Date(value)) : '-';
                                                }
                                            },
                                            {
                                                xtype: 'templatecolumn',
                                                tpl: '{paymentRefrenceId}',
                                                text: 'شناسه پرداخت',
                                                autoSizeColumn: true
                                            },
                                            {
                                                xtype: 'templatecolumn',
                                                tpl: '{isuAmount}',
                                                text: 'مبلغ استرداد (ریال)',
                                                autoSizeColumn: true,
                                                renderer: function (val1, data, record) {
                                                    var isuAmount = record.data.isuAmount;
                                                    var darmanAmount = record.data.darmanAmount;
                                                    return InsuranceTechnical.tamin.helpers.Persian.getWithCommaSeperator(isuAmount + darmanAmount);
                                                }
                                            },
                                            {
                                                xtype: 'templatecolumn',
                                                tpl: '{insuranceType.insuranceDescription}',
                                                text: 'نوع بیمه',
                                                autoSizeColumn: true
                                            },
                                            {
                                                xtype: 'templatecolumn',
                                                tpl: '{status}',
                                                text: 'وضعیت درخواست',
                                                autoSizeColumn: true,
                                                renderer: function (val1, data, record) {
                                                    if (record.data.status !== null) {
                                                        switch (record.data.status) {
                                                            case '0':
                                                                return 'ثبت درخواست';
                                                            case '1':
                                                                return 'تایید مسئول فنی';
                                                            case '2':
                                                                return 'عدم تایید مسئول فنی';
                                                            case '3':
                                                                return 'تایید مسئول شعبه';
                                                            case '5':
                                                                return 'لغو درخواست';
                                                            case '6':
                                                                return 'پرداخت شده';
                                                            case '7':
                                                                return 'برگشت از مالی';
                                                            default:
                                                                return '-';
                                                        }
                                                    }
                                                }
                                            },
                                            {
                                                xtype: 'templatecolumn',
                                                tpl: '{refundReason.reasonDesc}',
                                                text: 'علت استرداد',
                                                autoSizeColumn: true,
                                            },
                                            {
                                                xtype: 'actioncolumn',
                                                align: 'center',
                                                id: 'editButtonId',
                                                autoSizeColumn: true,
                                                text: 'ویرایش',
                                                items: [
                                                    {
                                                        iconCls: 'icon pencil',
                                                        tooltip: 'ویرایش',
                                                        handler: 'onEditButton'
                                                    }
                                                ]
                                            },
                                            {
                                                xtype: 'actioncolumn',
                                                align: 'center',
                                                id: 'deleteButtonId',
                                                autoSizeColumn: true,
                                                text: 'حذف',
                                                items: [
                                                    {
                                                        iconCls: 'icon cross',
                                                        tooltip: 'حذف',
                                                        handler: 'onDeleteButton',
                                                        isDisabled: function (view, rowIndex, colIndex, item, record) {
                                                            var orgCode = InsuranceTechnical.getApplication().getCache('organizationCode');
                                                            if ((record.data.branchCode === orgCode
                                                                || record.data.regBranchCode === orgCode)
                                                                && record.data.status !== '0') {
                                                                return true;
                                                            } else {
                                                                return false;
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
                                                    store: '{refundStore}'
                                                },
                                                dock: 'bottom',
                                                beforePageText: 'صفحه',
                                                displayMsg: 'رکوردهای {0} تا {1} از مجموع {2}',
                                                displayInfo: true
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'component',
                                        height: 8
                                    },
                                    {
                                        xtype: 'buttoncontainer',
                                        items: [
                                            {
                                                xtype: 'button',
                                                id: 'addButton',
                                                text: 'جدید',
                                                //  disabled: true,
                                                iconCls: 'icon add',
                                                handler: 'onAddButton'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
);
