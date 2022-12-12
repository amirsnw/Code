/**
 * Created by a-khalighi on 9/6/2022.
 */
Ext.define('InsuranceTechnical.view.brokerWage.BrokerWageSpec',
        {
            extend: 'InsuranceTechnical.tamin.panel.Panel',
            xtype: 'broker-wage-spec',
            title: 'سامانه محاسبه حق الزحمه کارگزاریها',
            controller: 'broker-wage-spec-controller',
            viewModel: 'broker-wage-spec-model',
            items: [
                {
                    xtype: 'tform',
                    id: 'broker-wage-spec-search-form',
                    items: [
                        {
                            xtype: 'tfieldset',
                            title: 'جستجو',
                            defaults: {
                                labelWidth: 130,
                                width: '80%'
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
                                    id: 'province',
                                    displayField: 'provinceName',
                                    valueField: 'provinceCode',
                                    editable: true,
                                    pageSize: 10,
                                    minChars: 2,
                                    maskRe: /[^a-zA-Z]/,
                                    matchFieldWidth: true,
                                    bind: {
                                        store: '{provinceStore}',
                                        value: '{brokerWageSpec.province}',
                                        disabled: '{disableProvince}'
                                    },
                                    listeners: {
                                        beforequery: 'queryProvince',
                                        change: function() {
                                            if (!this.up('broker-wage-spec').getViewModel().get('onLoading')) {
                                                Ext.getCmp('branchSpec').reset();
                                            }
                                        }
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
                                    name: 'branchSpec',
                                    id: 'branchSpec',
                                    matchFieldWidth: true,
                                    bind: {
                                        store: '{branchStore}',
                                        value: '{brokerWageSpec.branchCode}',
                                        disabled: '{disableBranch}'
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
                                        change: function() {
                                            if (!this.up('broker-wage-spec').getViewModel().get('onLoading')) {
                                                Ext.getCmp('brokerSpec').reset();
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
                                    name: 'brokerSpec',
                                    id: 'brokerSpec',
                                    matchFieldWidth: true,
                                    bind: {
                                        store: '{brokerStore}',
                                        value: '{brokerWageSpec.brokerCode}',
                                        disabled: '{disableBroker}'
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
                                    id: 'brokerName',
                                    bind: {
                                        value: '{brokerWageSpec.brokerName}',
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
                                    xtype: 'tdatefield',
                                    fieldLabel: 'تاریخ استخراج',
                                    name: 'reportDateFrom',
                                    id: 'reportDateFrom',
                                    bind: {
                                        value: '{brokerWageSpec.reportDateFrom}',
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
                                    name: 'reportDateTo',
                                    id: 'reportDateTo',
                                    bind: {
                                        value: '{brokerWageSpec.reportDateTo}',
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
                                    fieldLabel: 'وضعیت گزارش',
                                    id: 'statusSpec',
                                    name: 'status',
                                    valueField: 'value',
                                    displayField: 'name',
                                    store: {
                                        fields: ['name', 'value'],
                                        data: [
                                            {name: 'در مرحله اقدام', value: '0'},
                                            {name: 'تایید شده', value: '1'},
                                        ]
                                    },
                                    bind: {
                                        value: '{brokerWageSpec.statusSpec}',
                                    },
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
                                    colspan: 1
                                },
                                {
                                    xtype: 'tdatefield',
                                    fieldLabel: 'دوره گزارش از تاریخ',
                                    name: 'startDateSpec',
                                    id: 'startDateSpec',
                                    bind: {
                                        value: '{brokerWageSpec.startDateSpec}',
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
                                    name: 'endDateSpec',
                                    id: 'endDateSpec',
                                    bind: {
                                        value: '{brokerWageSpec.endDateSpec}',
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
                                    colspan: 2
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
                            xtype: 'gridcontainer',
                            items: [
                                {
                                    xtype: 'tgrid',
                                    id: 'broker-wage-spec-grid',
                                    bind: {
                                        store: '{brokerWageSpecStore}'
                                    },
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
                                                var data = rec.data;
                                                if (data.status === '1') {
                                                    widget.menu.items.items[0].setHidden(true);
                                                    widget.menu.items.items[1].setHidden(false);
                                                } else {
                                                    widget.menu.items.items[0].setHidden(false);
                                                    widget.menu.items.items[1].setHidden(true);
                                                }
                                            },
                                            widget: {
                                                xtype: 'button',
                                                text: "عملیات",
                                                defaultBindProperty: null,
                                                menu: [
                                                    {
                                                        text: 'تایید دوره',
                                                        handler: 'reportConfirm',
                                                        iconCls: 'icon zoom_in'
                                                    },
                                                    {
                                                        text: 'مشاهده گزارش',
                                                        handler: 'onShowDetailButton',
                                                        iconCls: 'icon zoom_in'
                                                    }
                                                ]
                                            }
                                        },
                                        {
                                            text: 'کد استان',
                                            xtype: 'templatecolumn',
                                            autoSizeColumn: true,
                                            tpl: '{province.provinceCode}',
                                            emptyCellText: '-'
                                        },
                                        {
                                            text: 'نام استان',
                                            xtype: 'templatecolumn',
                                            autoSizeColumn: true,
                                            tpl: '{province.provinceName}',
                                            emptyCellText: '-'
                                        },
                                        {
                                            text: 'کد شعبه',
                                            xtype: 'templatecolumn',
                                            autoSizeColumn: true,
                                            tpl: '{branch.branchCode}',
                                            emptyCellText: '-'
                                        },
                                        {
                                            text: 'نام شعبه',
                                            xtype: 'templatecolumn',
                                            autoSizeColumn: true,
                                            tpl: '{branch.branchName}',
                                            emptyCellText: '-'
                                        },
                                        {
                                            text: 'کد کارگزاری',
                                            xtype: 'templatecolumn',
                                            autoSizeColumn: true,
                                            tpl: '{broker.branchCode}',
                                            emptyCellText: '-'
                                        },
                                        {
                                            text: 'نام کارگزاری',
                                            xtype: 'templatecolumn',
                                            autoSizeColumn: true,
                                            tpl: '{broker.branchName}',
                                            emptyCellText: '-',
                                        },
                                        {
                                            text: 'تاریخ استخراج',
                                            dataIndex: 'reportDate',
                                            autoSizeColumn: true,
                                            emptyCellText: '-',
                                            renderer: function (value, data, record) {
                                                return value === null ? null : InsuranceTechnical.tamin.helpers
                                                    .Persian.taminDateNoSlashToSlash(value);
                                            }
                                        },
                                        {
                                            text: 'شروع دوره گزارش',
                                            dataIndex: 'startDate',
                                            autoSizeColumn: true,
                                            emptyCellText: '-',
                                            renderer: function (value, data, record) {
                                                return value === null ? null : InsuranceTechnical.tamin.helpers
                                                    .Persian.taminDateNoSlashToSlash(value);
                                            }
                                        },
                                        {
                                            text: 'پایان دوره گزارش',
                                            dataIndex: 'endDate',
                                            autoSizeColumn: true,
                                            emptyCellText: '-',
                                            renderer: function (value, data, record) {
                                                return value === null ? null : InsuranceTechnical.tamin.helpers
                                                    .Persian.taminDateNoSlashToSlash(value);
                                            }
                                        },
                                        {
                                            text: 'تایید گزارش',
                                            dataIndex: 'status',
                                            autoSizeColumn: true,
                                            emptyCellText: '-',
                                            align: 'center',
                                            renderer: function (val) {
                                                if (val !== null && val !== "") {
                                                    if (val == '1') {
                                                        return '<span style="color:green"><i class="fa fa-check"></i></span>';
                                                    } else {
                                                        return;
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'actioncolumn',
                                            align: 'center',
                                            width: 60,
                                            text: 'نمایش',
                                            items: [
                                                {
                                                    iconCls: 'icon table',
                                                    tooltip: 'نمایش',
                                                    handler: 'onShowDetailButton',
                                                }
                                            ]
                                        }
                                    ],
                                    dockedItems: [
                                        {
                                            xtype: 'pagingtoolbar',
                                            bind: {
                                                store: '{brokerWageSpecStore}'
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
                                    text: 'جدید',
                                    name: 'new',
                                    iconCls: 'icon add',
                                    handler: 'onAddButton',
                                    bind: {
                                        disabled: '{lockNew}'
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        });

