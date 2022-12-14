Ext.define('InsuranceTechnical.view.guardian.GuardianSpec',
    {
        extend: 'InsuranceTechnical.tamin.panel.Panel',
        xtype: 'guardian-spec',
        title: 'سیستم کفالت',
        controller: 'guardian-spec-controller',
        viewModel: 'guardian-spec-model',
        items: [
            {
                xtype: 'tform',
                id: 'guardian-form-id',
                items: [
                    {
                        xtype: 'tfieldset',
                        title: 'جستجو',
                        defaults: {
                            labelWidth: 150,
                            width: 400,
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
                                fieldLabel: 'شماره بیمه اصلی',
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
                                            var container = me.up('guardian-spec');
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
                                // bind: {store: '{statusStore}'},
                                store: {
                                    fields: ['name', 'value'],
                                    data: [
                                        {name: 'در مرحله اقدام', value: '0'},
                                        {name: 'مختومه-رد کفالت', value: '1'},
                                        {name: 'مختومه-تایید کفالت', value: '2'},
                                        {name: 'ابطال کفالت', value: '3'},
                                        {name: 'مختومه-فاقد شرایط', value: '4'},
                                        {name: 'نقص مدرک', value: '5'},
                                        {name: 'تایید معاش-بررسی میزان از کار افتادگی', value: '6'},
                                        {name: 'عدم تایید معاش', value: '7'},
                                        {name: 'اعتراض بیمه شده', value: '8'},
                                        {name: 'ارجاع به کمیته استان', value: '9'},
                                        {name: 'عدم تایید ابطال', value: 'A'}
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
                                allowBlank: true,
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
                                name: 'requestDateTo',
                                id: 'requestDateTo',
                                // submitFormat: 'Y-m-d',
                                fieldLabel: 'لغایت',
                                labelSeparator: false,
                                allowBlank: true,
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
                                fieldLabel: 'نوع ثبت',
                                readOnly: false,
                                valueField: 'value',
                                displayField: 'name',
                                store: {
                                    fields: ['name', 'value'],
                                    data: [
                                        {name: 'حضوری', value: '0'},
                                        {name: 'غیرحضوری', value: '1'}
                                    ]
                                },
                                id: 'eRequestId',
                                name: 'eRequestId',
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
                                xtype: 'tcombobox',
                                fieldLabel: 'شعبه بررسی کننده',
                                readOnly: false,
                                valueField: 'value',
                                displayField: 'name',
                                defualtValue: '0',
                                store: {
                                    fields: ['name', 'value'],
                                    data: [
                                        {name: 'شعبه جاری', value: '0'},
                                        {name: 'سایر شعب', value: '1'}
                                    ]
                                },
                                id: 'flagBranch',
                                name: 'flagBranch',
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
                                xtype: 'tcombobox',
                                fieldLabel: 'ملیت بیمه شده اصلی',
                                name: 'nationality',
                                matchFieldWidth: true,
                                editable: false,
                                displayField: 'name',
                                valueField: 'value',
                                colspan: 1,
                                bind: {
                                    value: '{nationality}'
                                },
                                listeners: {
                                    change: 'onChangeNationality'
                                },
                                store: {
                                    fields: ['name', 'value'],
                                    data: [
                                        {
                                            name: 'ایرانی',
                                            value: '1',
                                        },
                                        {
                                            name: 'غیر ایرانی',
                                            value: '2'
                                        }
                                    ]
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
                                fieldLabel: 'کد ملی اصلی ',
                                id: 'nationalCode',
                                name: 'nationalCode',
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
                                fieldLabel: 'شناسه خارجی اصلی ',
                                id: 'foreignCode',
                                name: 'foreignCode',
                                hidden: true,
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
                                fieldLabel: 'کد ملی مورد تکفل ',
                                name: 'guardianNationalCode',
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
                                fieldLabel: 'نوع کفالت',
                                readOnly: false,
                                valueField: 'value',
                                displayField: 'name',
                                store: {
                                    fields: ['name', 'value'],
                                    data: [
                                        {name: 'پدر', value: '1'},
                                        {name: 'مادر', value: '2'},
                                        {name: 'شوهر', value: '3'},
                                        {name: 'پدر و مادر', value: '4'},
                                        {name: 'فرزند ذکور', value: '5'},
                                        {name: 'فرزند اناث', value: '6'}
                                    ]
                                },
                                id: 'guardianType',
                                name: 'guardianType',
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
                                colspan: 2
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
                                        bind: {store: '{guardianStore}'},
                                        viewConfig: {
                                            enableTextSelection: true,
                                            preserveScrollOnReload: true,
                                            getRowClass: function (record) {
                                                if (record.get('eRequestId') === null) {
                                                    return 'recordConfirm0-row';
                                                } else {
                                                    return 'recordConfirm1-row';
                                                }
                                            }
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
                                                    if (rec.data.pensionFundsCode === null
                                                        && rec.data.status === '0'
                                                        && rec.data.inspectedDate === null
                                                        && rec.data.requestType !== '2'
                                                        && rec.data.guardianForeignCode === null
                                                        && rec.data.guardianForeignCode2 === null) {
                                                        widget.menu.items.items[0].setDisabled(false);
                                                        widget.menu.items.items[1].setDisabled(true);
                                                        widget.menu.items.items[2].setDisabled(true);
                                                        widget.menu.items.items[3].setDisabled(true);
                                                        widget.menu.items.items[4].setDisabled(true);
                                                        widget.menu.items.items[5].setDisabled(true);
                                                        widget.menu.items.items[6].setDisabled(true);
                                                        widget.menu.items.items[7].setDisabled(true);
                                                        widget.menu.items.items[8].setDisabled(true);
                                                    } else {
                                                        widget.menu.items.items[0].setDisabled(true);
                                                        if (rec.data.eRequestId !== null) {
                                                            widget.menu.items.items[7].setDisabled(false);
                                                            widget.menu.items.items[8].setDisabled(false);
                                                        } else {
                                                            widget.menu.items.items[7].setDisabled(true);
                                                            widget.menu.items.items[8].setDisabled(true);
                                                        }
                                                        if (rec.data.status === '4') {

                                                        }
                                                        if (rec.data.status === '5') {
                                                            widget.menu.items.items[5].setDisabled(true);
                                                        } else {
                                                            widget.menu.items.items[5].setDisabled(false);
                                                        }
                                                        if (rec.data.status === '1' && rec.data.techConfStatus === '1')
                                                            widget.menu.items.items[6].setDisabled(true);
                                                        else
                                                            widget.menu.items.items[6].setDisabled(false);
                                                        if (['2', '3'].includes(rec.data.status))
                                                            widget.menu.items.items[1].setDisabled(true);
                                                        else
                                                            widget.menu.items.items[1].setDisabled(false);
                                                        if (rec.data.branchResponder === InsuranceTechnical.getApplication().getCache('organizationCode') && (rec.data.status === '0' || rec.data.status === '8')) {
                                                            widget.menu.items.items[1].setDisabled(false);
                                                            widget.menu.items.items[2].setDisabled(false);
                                                            widget.menu.items.items[3].setDisabled(false);
                                                        } else if (rec.data.status !== '0' &&
                                                            (rec.data.status === '1' || rec.data.status === '2' || rec.data.status === '6' || rec.data.status === '7')) {
                                                            widget.menu.items.items[1].setDisabled(true);
                                                            widget.menu.items.items[2].setDisabled(false);
                                                            widget.menu.items.items[3].setDisabled(false);
                                                        } else {
                                                            widget.menu.items.items[1].setDisabled(true);
                                                            widget.menu.items.items[2].setDisabled(true);
                                                            widget.menu.items.items[3].setDisabled(true);
                                                        }
                                                    }
                                                },
                                                widget: {
                                                    xtype: 'button',
                                                    text: "عملیات",
                                                    defaultBindProperty: null,
                                                    menu: [
                                                        {
                                                            text: 'استعلام از سایر صندوقهای بازنشستگی',
                                                            handler: 'inquiryOtherCashdeskPension',
                                                            iconCls: ''
                                                        },
                                                        {
                                                            text: 'ارجاع به شعبه بررسی کننده',
                                                            handler: 'openOtherBranchPopup',
                                                            iconCls: ''
                                                        },
                                                        {
                                                            text: 'گزارش بازرس فنی',
                                                            handler: 'openTechReportPopup',
                                                            iconCls: ''
                                                        },
                                                        {
                                                            text: 'نظریه مسئول فنی',
                                                            handler: 'openTechOpinionPopup',
                                                            iconCls: ''
                                                        },
                                                        {
                                                            text: 'نظریه کمیسیون پزشکی',
                                                            handler: 'openCommissionOpinionPopup',
                                                            iconCls: ''
                                                        },
                                                        {
                                                            text: 'چاپ گزارش بازرسی',
                                                            handler: 'printInsReport',
                                                            iconCls: ''
                                                        },
                                                        {
                                                            text: 'نظریه کمیه استان',
                                                            handler: 'openProvOpinionPopup',
                                                            iconCls: ''
                                                        },
                                                        {
                                                            text: 'مدارک بارگذاری شده در سامانه غیر حضوری',
                                                            handler: 'openDocumentPopup',
                                                            iconCls: ''
                                                        },
                                                        {
                                                            text: 'رسیدگی به اعتراض',
                                                            handler: 'openProtestPopup',
                                                            iconCls: ''
                                                        }
                                                    ]
                                                }
                                            },
                                            {
                                                xtype: 'templatecolumn',
                                                tpl: '{branchCode}',
                                                text: 'شعبه مبدا',
                                                autoSizeColumn: true

                                            },
                                            {
                                                xtype: 'templatecolumn',
                                                tpl: '{referDate}',
                                                text: 'تاریخ ارجاع',
                                                autoSizeColumn: true,
                                                align: 'center',
                                                renderer: function (val1, data, record) {
                                                    var value = record.data.referDate;
                                                    return value !== null ? (value.substr(0, 4) + '/' + value.substr(4, 2) + '/' + value.substr(6, 2)) : '-';
                                                }
                                            },
                                            {
                                                xtype: 'templatecolumn',
                                                tpl: '{branchResponder}',
                                                text: 'شعبه بررسی کننده',
                                                autoSizeColumn: true

                                            },
                                            {
                                                xtype: 'templatecolumn',
                                                tpl: '{reqNo}',
                                                text: 'شماره درخواست',
                                                autoSizeColumn: true

                                            },
                                            {
                                                xtype: 'templatecolumn',
                                                tpl: '{requestType}',
                                                text: 'نوع درخواست',
                                                autoSizeColumn: true,
                                                align: 'center',
                                                renderer: function (val1, data, record) {
                                                    if (record.data.requestType !== null) {
                                                        switch (record.data.requestType) {
                                                            case '1':
                                                                return 'برقراری کفالت';
                                                            case '2':
                                                                return 'ابطال کفالت';
                                                            default:
                                                                return '-';
                                                        }
                                                    }
                                                }
                                            },
                                            {
                                                xtype: 'templatecolumn',
                                                tpl: '{reqDate}',
                                                text: 'تاریخ درخواست',
                                                autoSizeColumn: true,
                                                align: 'center',
                                                renderer: function (val1, data, record) {
                                                    var value = record.data.reqDate;
                                                    return value !== null ? InsuranceTechnical.tamin.helpers.Persian.gregorianToPersian(new Date(value)) : null;
                                                }
                                            },
                                            {
                                                xtype: 'templatecolumn',
                                                //tpl: '{inspDate}',
                                                tpl: '{inspectedDate}',
                                                text: 'تاریخ بازرسی',
                                                autoSizeColumn: true,
                                                align: 'center',
                                                renderer: function (val1, data, record) {
                                                    //var value = record.data.inspDate;
                                                    var value = record.data.inspectedDate;
                                                    return value !== null ? InsuranceTechnical.tamin.helpers.Persian.gregorianToPersian(new Date(value)) : null;
                                                }
                                            },
//                                                {
//                                                    xtype: 'templatecolumn',
//                                                    tpl: '{inspectorName}',
//                                                    text: 'نام بازرس',
//                                                    autoSizeColumn: true
//                                                },
                                            {
                                                xtype: 'templatecolumn',
                                                tpl: '{insuranceId}',
                                                text: 'شماره بیمه اصلی',
                                                autoSizeColumn: true

                                            },
                                            {
                                                xtype: 'templatecolumn',
                                                tpl: '{nationalCode}',
                                                text: 'کد ملی اصلی/شناسه خارجی',
                                                autoSizeColumn: true,
                                                width: 155,
                                                renderer: function (val1, data, record) {
                                                    var value = record.data.nationalCode;
                                                    return value !== null ? value : record.data.foreignCode;
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
                                                tpl: '',
                                                text: 'کد ملی مورد تکفل',
                                                autoSizeColumn: true,
                                                renderer: function (val1, data, record) {
                                                    if (record.data.guardianNationalCode === null) {
                                                        return record.data.guardianForeignCode;
                                                    } else {
                                                        return record.data.guardianNationalCode;
                                                    }
                                                }
                                            },
                                            {
                                                xtype: 'templatecolumn',
                                                tpl: '{guardianType}',
                                                text: 'نوع کفالت',
                                                autoSizeColumn: true,
                                                align: 'center',
                                                renderer: function (val1, data, record) {
                                                    if (record.data.guardianType !== null) {
                                                        switch (record.data.guardianType) {
                                                            case '1':
                                                                return 'پدر';
                                                            case '2':
                                                                return 'مادر';
                                                            case '3':
                                                                return 'شوهر';
                                                            case '4':
                                                                return 'پدر و مادر';
                                                            case '5':
                                                                return 'فرزند ذکور';
                                                            case '6':
                                                                return 'فرزند اناث';
                                                            case '7':
                                                                return 'کفالت فرزند توسط مادر مستمری بگیر (عائله مندی)';
                                                            default:
                                                                return '-';
                                                        }
                                                    }
                                                }

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
                                                                return 'در مرحله اقدام';
                                                            case '1':
                                                                return 'مختومه-رد کفالت';
                                                            case '2':
                                                                return 'مختومه-تاييد کفالت';
                                                            case '3':
                                                                return 'ابطال کفالت';
                                                            case '4':
                                                                return 'مختومه-فاقد شرايط';
                                                            case '5':
                                                                return 'نقص مدرک';
                                                            case '6':
                                                                return 'تایید معاش-بررسی میزان از کار افتادگی';
                                                            case '7':
                                                                return 'عدم تایید معاش';
                                                            case '8':
                                                                return 'اعتراض بیمه شده';
                                                            case '9':
                                                                return 'ارجاع به کمیته استان';
                                                            case 'A':
                                                                return 'عدم تایید ابطال ';
                                                            default:
                                                                return '-';
                                                        }

                                                    }
                                                }
                                            },
                                            {
                                                xtype: 'templatecolumn',
                                                tpl: '{eRequestId}',
                                                text: 'نظریه کمیته',
                                                emptyCellText: '-',
                                                autoSizeColumn: true,
                                                align: 'center',
                                                renderer: function (val1, data, record) {
                                                    if (record.data.provResponse !== null) {
                                                        switch (record.data.provResponse) {
                                                            case '1':
                                                                return 'تایید کفالت';
                                                            case '2':
                                                                return 'عدم تایید کفالت';
                                                            default:
                                                                return '-';
                                                        }
                                                    }
                                                }
                                            },
                                            {
                                                xtype: 'templatecolumn',
                                                tpl: '{pensionFundsCode}',
                                                text: 'سابقه عضویت در سایر صندوقها',
                                                emptyCellText: '-',
                                                autoSizeColumn: true,
                                                align: 'center',
                                                renderer: function (val, data, record) {
                                                    if (record.data.pensionFundsCode !== null && record.data.pensionFundsCode !== "NO") {
                                                        switch (record.data.pensionFundsCode) {
                                                            case '01':
                                                                return 'صندوق بازنشستگی کشوری';
                                                                break;
                                                            case '0K':
                                                                return 'صندوق بيمه هاي اجتماعي روستائيان و عشایر';
                                                                break;
                                                            case '0E':
                                                                return 'صندوق  بازنشستگي  پس  انداز بانكها';
                                                                break;
                                                            case '07':
                                                                return 'صندوق  بازنشستگي  كاركنان  بانك  مركزي';
                                                                break;
                                                            case '08':
                                                                return 'صندوق  بازنشستگي  شركت  ملي  فولاد';
                                                                break;
                                                            case '09':
                                                                return 'سايرصندوقها';
                                                                break;
                                                            default :
                                                                //   message = 'خطا در انجام عملیات';
                                                                break;
                                                        }
                                                    } else {
                                                        return;
                                                    }
                                                }

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
                                                        handler: 'onEditButton',
                                                    }
                                                ]
                                            },
                                        ],
                                        dockedItems: [
                                            {
                                                xtype: 'pagingtoolbar',
                                                bind: {
                                                    store: '{guardianStore}'
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
                                            },
                                            {
                                                xtype: 'button',
                                                id: 'performanceReportButton',
                                                text: 'گزارش عملکرد',
                                                value: '1',
                                                handler: 'openPerformanceReportPopup',
                                                iconCls: ''
                                            },
                                            {
                                                xtype: 'button',
                                                id: 'inspectorReportButton',
                                                text: 'گزارش صف بازرسی',
                                                value: '2',
                                                handler: 'openInspectorReportPopup',
                                                iconCls: ''
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
