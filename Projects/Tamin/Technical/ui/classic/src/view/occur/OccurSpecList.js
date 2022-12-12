/**
 * Created by sh-kalantari on 6/26/2019.
 */

Ext.define('InsuranceTechnical.view.occur.OccurSpecList', {
    extend: 'InsuranceTechnical.tamin.panel.Panel',
    xtype: 'occur-spec',
    title: 'لیست سیستم حادثه',
    controller: 'occur-spec-controller',
    viewModel: 'occur-spec-model',
    items: [
        {
            xtype: 'tform',
            id: 'occur-spec-form-id',
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
                        columns: 3,
                        tableAttrs: {
                            style: {width: '100%'}
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
                            }
                        },
                        {
                            xtype: 'ttextfield',
                            fieldLabel: 'شماره بیمه',
                            name: 'insuranceSpec.id',
                            id: 'id',
                            maxLength: 10,
                            minLength: 10,
                            maskRe: /[0-9]/,
                            regex: /[0-9]/,
                            //enforceMaxLength: 20
                            enforceMaxLength: true,
                            msgTarget: 'side',
                            minLengthText: 'شماره بیمه ده رقمی میباشد.',
                            /*bind: {
                                value: '{personalData.id}'
                            },*/
                            triggers: {
                                lookup: {
                                    cls: 'x-form-search-trigger',
                                    weight: -1,
                                    handler: function () {

                                        var me = this;
                                        var container = me.up('occur-spec');
                                        var win = container.lookupReference('InsuredPersonPopup');
                                        if (!win) {
                                            win = Ext.create('InsuranceTechnical.view.main.InsuredPersonPopup');
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
                            xtype: 'ttextfield',
                            fieldLabel: 'نتیجه حادثه ',
                            name: 'occurResult'
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
                        /*{
                            xtype: 'tcombobox',
                            fieldLabel: 'کارگاه',
                            name: 'workshop.workshopId',
                            id: 'workshopId',
                            valueField: 'workshopId',
                            pageSize: 10,
                            matchFieldWidth: true,
                            bind: {
                                store: '{workshop}',
                                disabled: '{disabled-new-workshop}'
                            },
                            displayTpl: Ext.create('Ext.XTemplate',
                                '<tpl for=".">',
                                '{workshopId} - {workshopName}',
                                '</tpl>'
                            ),
                            tpl: Ext.create('Ext.XTemplate',
                                '<tpl for=".">',
                                '<div class="x-boundlist-item">',
                                '{workshopId} - {workshopName}',
                                '</div>',
                                '</tpl>'
                            ),
                            triggers: {
                                lookup: {
                                    cls: 'x-form-clear-trigger',
                                    weight: -1,
                                    handler: function () {
                                        Ext.getCmp('workshopId').setValue('');
                                    }
                                }
                            },
                        },*/
                        {
                            xtype: 'ttextfield',
                            fieldLabel: 'کد ملی',
                            name: 'pnatcode',
                            maxLength: 10,
                            maskRe: /[0-9]/,
                            regex: /[0-9]/,
                            minLengthText: 'کد ملی ده رقمی میباشد.'
                        },
                        {
                            xtype: 'tcombobox',
                            fieldLabel: 'نوع درخواست',
                            readOnly: false,
                            valueField: 'value',
                            displayField: 'name',
                            editable: false,
                            store: {
                                fields: ['name', 'value'],
                                data: [
                                    {name: 'حضوری', value: '0'},
                                    {name: 'غیرحضوری', value: '1'}
                                ]
                            },
                            id: 'eRequest',
                            name: 'eRequest',
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
                            fieldLabel: 'تاریخ اعلام حادثه از',
                            name: 'repdateFrom',
                            id: 'repdateFrom'
                        },
                        {
                            xtype: 'tdatefield',
                            fieldLabel: 'لغایت',
                            name: 'repdateTo',
                            id: 'repdateTo'
                        },
                        {
                            xtype: 'tcombobox',
                            fieldLabel: 'وضعیت درخواست',
                            name: 'status',
                            id: 'status',
                            valueField: 'value',
                            displayField: 'name',
                            editable: false,
                            store: {
                                fields: ['name', 'value'],
                                data: [
                                    {name: 'در مرحله اقدام', value: '0'},
                                    {name: 'مختومه-ناشی از کار', value: '1'},
                                    {name: 'مختومه-غیر ناشی از کار', value: '2'},
                                    {name: 'نقص مدرک-ارجاع به متقاضی', value: '3'},
                                    {name: 'مختومه - عدم احراز شرايط', value: '4'}
                                ]
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
                            xtype: 'buttoncontainer',
                            items: [
                                {
                                    xtype: 'button',
                                    text: 'جستجو',
                                    iconCls: 'icon magnifier',
                                    handler: 'onSearchButton'
                                }
                                ,
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
                            id: 'OcurSpecId',
                            bind: {store: '{occurSpecListStore}'},
                            columns: [
                                {text: '#', xtype: 'rownumberer', autoSizeColumn: true},
                                {
                                    text: 'عملیات',
                                    align: 'center',
                                    stopSelection: true,
                                    id: 'enable-calc-splitbutton',
                                    xtype: 'widgetcolumn',
                                    onWidgetAttach: function (col, widget, rec) {
                                        var orgCode = InsuranceTechnical.getApplication().getCache('organizationCode');
                                        if (rec.data.brchReviewer.branchCode === orgCode) {
                                            if ((rec.data.ssupOccurReview === null)) {
                                                widget.menu.items.items[0].setDisabled(false);
                                            } else {
                                                widget.menu.items.items[0].setDisabled(true);
                                            }
                                        } else {
                                            widget.menu.items.items[0].setDisabled(true);
                                        }

                                        if (rec.data.ssupOccurReview === null) {
                                            widget.menu.items.items[2].setDisabled(true);
                                        } else {
                                            widget.menu.items.items[2].setDisabled(false);
                                        }

                                        if (rec.data.ssupOccurReview === null) {
                                            widget.menu.items.items[3].setDisabled(true);
                                        } else {
                                            widget.menu.items.items[3].setDisabled(false);
                                        }
                                        if (rec.data.eRepId === null) {
                                            widget.menu.items.items[4].setDisabled(true);
                                        } else {
                                            widget.menu.items.items[4].setDisabled(false);
                                        }
                                    },
                                    widget: {
                                        xtype: 'button',
                                        text: "عملیات",
                                        defaultBindProperty: null,
                                        menu: [
                                            {
                                                text: 'ارجاع به شعبه بررسی کننده',
                                                handler: 'onAddOccurOtherBrhLetterButton',
                                                iconCls: 'icon zoom_in'
                                            },
                                            {
                                                text: 'گزارش بررسی حادثه',
                                                handler: 'onAddOccurReviewButton',
                                                iconCls: 'icon zoom_in'
                                            },
                                            {
                                                text: 'گزارش بازرس فنی و نظریه مسئول فنی',
                                                handler: 'OnOccurIdeaLstButton',
                                                iconCls: 'icon zoom_in'
                                            },
                                            {
                                                text: 'گزارش مراجع قانونی',
                                                handler: 'OccurWorkInspButton',
                                                iconCls: 'icon accept'

                                            },
                                            {
                                                text: 'مدارک بارگذاری شده در سامانه غیر حضوری',
                                                handler: 'openDocumentPopup',
                                                iconCls: ''
                                            },
                                            {
                                                text: 'بارگذاری مکاتبات و نظریه های بازرسین کار و مراجع قضایی',
                                                handler: 'openDocumentUploadPopup',
                                                iconCls: ''
                                            }
                                        ]
                                    }
                                },
                                {
                                    xtype: 'templatecolumn',
                                    tpl: '{brchCode.branchCode}',
                                    text: 'شعبه مبدا',
                                    autoSizeColumn: true
                                },
                                {
                                    xtype: 'templatecolumn',
                                    tpl: '{brchReviewer.branchCode}',
                                    text: 'شعبه بررسی کننده',
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
                                    text: 'تاریخ اعلام حادثه',
                                    dataIndex: 'repdate',
                                    autoSizeColumn: true,
                                    emptyCellText: '-',
                                    renderer: function (val1, data, record) {
                                        var value = arguments[2].data.repdate;
                                        return value === null ? null : InsuranceTechnical.tamin.helpers.Persian.gregorianToPersian(new Date(value))
                                    }
                                },
                                {
                                    text: 'شماره درخواست',
                                    xtype: 'templatecolumn',
                                    autoSizeColumn: true,
                                    tpl: '{repNo}',
                                    emptyCellText: '-'
                                },
                                {
                                    text: 'نام خانوادگی',
                                    xtype: 'templatecolumn',
                                    autoSizeColumn: true,
                                    tpl: '{}',
                                    emptyCellText: '-',
                                    renderer: function (a, b, rec) {
                                        //
                                        var data = rec.data.insuranceSpec;
                                        if (data !== null)
                                            return rec.data.insuranceSpec.lastName;
                                        else
                                            return rec.data.plname;
                                    }
                                },
                                {
                                    text: 'نام ',
                                    xtype: 'templatecolumn',
                                    autoSizeColumn: true,
                                    tpl: '',
                                    renderer: function (a, b, rec) {
                                        //
                                        var data = rec.data.insuranceSpec;
                                        if (data !== null)
                                            return rec.data.insuranceSpec.firstName;
                                        else
                                            return rec.data.pfname;
                                    }
                                },
                                {
                                    text: 'شماره بیمه',
                                    xtype: 'templatecolumn',
                                    autoSizeColumn: true,
                                    tpl: '{insuranceSpec.id}',
                                    emptyCellText: '-'
                                },
                                {
                                    text: 'شماره ملی',
                                    xtype: 'templatecolumn',
                                    autoSizeColumn: true,
                                    tpl: '{insuranceSpec.nationalId}',
                                    emptyCellText: '-'
                                },
                                {
                                    text: 'تاریخ بازرسی',
                                    autoSizeColumn: true,
                                    emptyCellText: '-',
                                    renderer: function (val1, data, record) {
                                        if (!record.data.ssupOccurReview) {
                                            return '-'
                                        } else {
                                            var value = arguments[2].data.ssupOccurReview.techinspdate;
                                            return value === null ? null : InsuranceTechnical.tamin.helpers.Persian.gregorianToPersian(new Date(value))
                                        }
                                    }
                                },
                                {
                                    text: 'وضعیت درخواست',
                                    xtype: 'templatecolumn',
                                    autoSizeColumn: true,
                                    tpl: '',
                                    emptyCellText: '-',
                                    renderer: function (a, b, rec) {
                                        var data = rec.data.status;
                                        switch(data) {
                                            case '0':
                                                return 'در مرحله اقدام';
                                                break;
                                            case '1':
                                                return 'مختومه-ناشی از کار';
                                                break;
                                            case '2':
                                                return 'مختومه-غیر ناشی از کار';
                                                break;
                                            case '3':
                                                return 'نقص مدرک-ارجاع به متقاضی';
                                                break;
                                            case '4':
                                                return 'مختومه - عدم احراز شرايط';
                                                break;
                                        }
                                    }
                                },
                                {
                                    text: 'نتیجه حادثه',
                                    xtype: 'templatecolumn',
                                    autoSizeColumn: true,
                                    tpl: '{ssupOccurReview.occurSerial}',
                                    emptyCellText: '-',

                                    renderer: function (a, b, rec) {
                                        var data = rec.data.ssupOccurReview;
                                        if (data === null || data === undefined)
                                            return "خیر";
                                        else
                                            return 'بلی';
                                    }
                                },
                                {
                                    xtype: 'templatecolumn',
                                    tpl: '{eRepId}',
                                    text: 'نوع درخواست',
                                    emptyCellText: '-',
                                    autoSizeColumn: true,
                                    align: 'center',
                                    renderer: function (val, data, record) {
                                        if (record.data.eRepId !== null) {
                                            return '<span style="color:green"><i class="fa fa-check"></i></span>';
                                        } else {
                                            return;
                                        }
                                    }
                                },
                                /*{
                                    xtype: 'actioncolumn',
                                    align: 'center',
                                    //autoSizeColumn: true,
                                    width: 60,
                                    text: 'حذف',
                                    items: [
                                        {
                                            iconCls: 'icon cross',
                                            tooltip: 'حذف',
                                            handler: 'onDeleteButton',
                                            isDisabled: function (view, rowIndex, colIndex, item, record) {
                                                var orgCode = InsuranceTechnical.getApplication().getCache('organizationCode');
                                                if (orgCode === record.data.brchCode.branchCode && orgCode === record.data.brchReviewer.branchCode
                                                    && record.data.ssupOccurReview === null) {
                                                    return record.data.repNoCount > 0;
                                                } else {
                                                    return true;
                                                }
                                            }
                                        }
                                    ]
                                },*/
                                {
                                    xtype: 'actioncolumn',
                                    align: 'center',
                                    width: 60,
                                    text: 'ویرایش',
                                    items: [
                                        {
                                            iconCls: 'icon pencil',
                                            tooltip: 'ویرایش',
                                            handler: 'editOccurButton'
                                           /* isDisabled: function (view, rowIndex, colIndex, item, record) {
                                                if (record.data.repNoCount === 1) {
                                                    return true;
                                                }
                                            }*/
                                        }
                                    ]
                                }
                            ],
                            dockedItems: [
                                {
                                    xtype: 'pagingtoolbar',
                                    bind: {store: '{occurSpecListStore}'},
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
                            handler: 'onAddButton'
                        },
                        /*{
                            xtype: 'tbutton',
                            text: 'گزارشها',
                            name: 'openOccurReportPopup',
                            iconCls: 'icon application form magnify',
                            handler: 'openOccurReportPopup'
                        }*/
                    ]
                }
            ]
        }
    ]
});

