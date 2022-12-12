/**
 * Created by a-khalighi on 2/9/2000.
 */
Ext.define('InsuranceTechnical.view.insAgreement.InsuranceAgreementSpec',
        {
            extend: 'InsuranceTechnical.tamin.panel.Panel',
            xtype: 'insurance-agreement-spec',
            title: 'درخواست بیمه شدگان گروه های خاص بیمه ای / توافقی',
            controller: 'insAgreement-spec-controller',
            viewModel: 'insAgreement-spec-model',
            items: [
                {
                    xtype: 'tform',
                    id: 'insAgreement-spec-search-form',
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
                                    name: 'branchCode',
                                    id: 'branchCode',
                                    matchFieldWidth: true,
                                    bind: {
                                        store: '{branch}',
                                        value: '{organizationCode}',
                                        readOnly: '{isBranchUser}'
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
                                    xtype: 'ttextfield',
                                    fieldLabel: 'شماره بیمه',
                                    name: 'insuranceId',
                                    id: 'insuranceId',
                                    maxLength: 10,
                                    minLength: 10,
                                    maskRe: /[0-9]/,
                                    regex: /[0-9]/,
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
                                            handler: 'showInsurancePopup'
                                        },
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
                                    fieldLabel: 'کد ملی ',
                                    name: 'nationalCode',
                                    id: 'nationalCode',
                                    maxLength: 10,
                                    minLength: 10,
                                    maskRe: /[0-9]/,
                                    regex: /[0-9]/,
                                    enforceMaxLength: true,
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
                                    fieldLabel: 'دسته بندی بیمه شده',
                                    name: 'categoryType',
                                    id: 'categoryType',
                                    pageSize: 10,
                                    valueField: 'categoryTypeCode',
                                    displayField: 'categoryTypeDesc',
                                    queryMode: 'local',
                                    editable: false,
                                    bind: {
                                        store: '{insuranceAgreementCatStore}',
                                    },
                                    displayTpl: Ext.create('Ext.XTemplate',
                                            '<tpl for=".">',
                                            '{categoryTypeDesc}',
                                            '</tpl>'
                                            ),
                                    tpl: Ext.create('Ext.XTemplate',
                                            '<tpl for=".">',
                                            '<div class="x-boundlist-item">',
                                            '{categoryTypeDesc}',
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
                                },*/
                                {
                                    xtype: 'tcombobox',
                                    fieldLabel: 'دسته بندی نوع بیمه ',
                                    name: 'categoryType',
                                    id: 'categoryType',
                                    valueField: 'categoryTypeCode',
                                    displayField: 'categoryTypeDesc',
                                    forceSelection: true,
                                    editable: false,
                                    pageSize: 10,
                                    bind: {
                                        store: '{insuranceAgreementCatStore}',
                                        value: '{agreeSearch.categoryType.categoryTypeCode}',
                                    },
                                    displayTpl: Ext.create('Ext.XTemplate',
                                        '<tpl for=".">',
                                        '{categoryTypeDesc}',
                                        '</tpl>'
                                    ),
                                    tpl: Ext.create('Ext.XTemplate',
                                        '<tpl for=".">',
                                        '<div class="x-boundlist-item">',
                                        '{categoryTypeDesc}',
                                        '</div>',
                                        '</tpl>'
                                    ),
                                    listeners: {
                                        change: 'onCatChange'
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
                                    fieldLabel: 'گروه بیمه',
                                    name: 'specialGroupType',
                                    valueField: 'code',
                                    displayField: 'desc',
                                    queryMode: 'local',
                                    forceSelection: true,
                                    editable: false,
                                    pageSize: 10,
                                    id: 'insuranceGroupCombo',
                                    disabled: true,
                                    bind: {
                                        value: '{agreeSearch.specialGroupType}',
                                    },
                                    displayTpl: Ext.create('Ext.XTemplate',
                                        '<tpl for=".">',
                                        '{desc}',
                                        '</tpl>'
                                    ),
                                    tpl: Ext.create('Ext.XTemplate',
                                        '<tpl for=".">',
                                        '<div class="x-boundlist-item">',
                                        '{desc}',
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
                                    fieldLabel: 'نوع بیمه',
                                    valueField: 'value',
                                    displayField: 'name',
                                    name: 'insuranceTypeDesc',
                                    id: 'insuranceTypeCode',
                                    pageSize: 10,
                                    queryMode: 'local',
                                    editable: false,
                                    bind: {
                                        store: '{insuranceAgreementTypeStore}',
                                    },
                                    displayTpl: Ext.create('Ext.XTemplate',
                                            '<tpl for=".">',
                                            '{insuranceTypeDesc}',
                                            '</tpl>'
                                            ),
                                    tpl: Ext.create('Ext.XTemplate',
                                            '<tpl for=".">',
                                            '<div class="x-boundlist-item">',
                                            '{insuranceTypeDesc}',
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
                                    fieldLabel: 'وضعیت درخواست',
                                    name: 'status',
                                    id: 'status',
                                    valueField: 'value',
                                    displayField: 'name',
                                    editable: false,
                                    store: {
                                        fields: ['name', 'value'],
                                        data: [
                                            {name: 'عدم بررسي', value: '0'},
                                            {name: 'تاييد مسئول فني / مسئول مطالبات', value: '1'},
                                            {name: 'عدم تاييد مسئول فني / مسئول مطالبات', value: '2'},
                                            {name: 'عدم ثبت در ليست', value: '3'},
                                            {name: 'مختومه - عدم احراز شرايط', value: '4'},
                                            {name: 'تایید نهایی / تایید مسئول وصول حق بیمه', value: '5'},
                                            {name: 'لغو تایید نهایی / عدم تایید مسئول وصول حق بیمه', value: '6'}
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
                                    xtype: 'tdatefield',
                                    fieldLabel: 'تاریخ ثبت',
                                    name: 'createDate',
                                    id: 'createDate',
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
                                    fieldLabel: 'تاریخ درخواست',
                                    name: 'requestDate',
                                    id: 'requestDate',
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
                                    xtype: 'hr',
                                    colspan: 3
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
                                    id: 'insAgreement-spec-grid',
                                    bind: {store: '{insuranceAgreementSpecStore}'},
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
                                                widget.menu.items.items[0].setHidden(true);
                                                widget.menu.items.items[1].setHidden(true);
                                                widget.menu.items.items[2].setHidden(true);
                                                widget.menu.items.items[3].setHidden(true);
                                                widget.menu.items.items[4].setHidden(true);
                                                widget.menu.items.items[5].setHidden(true);
                                                switch (data.status) {
                                                    case '0':
                                                        widget.menu.items.items[0].setDisabled(false);
                                                        break;
                                                    case '1':
                                                        widget.menu.items.items[0].setDisabled(false);
                                                        widget.menu.items.items[1].setDisabled(false);
                                                        break;
                                                    case '2':
                                                        widget.menu.items.items[0].setDisabled(false);
                                                        break;
                                                    case '5':
                                                        widget.menu.items.items[1].setDisabled(false);
                                                        break;
                                                    case '6':
                                                        widget.menu.items.items[1].setDisabled(false);
                                                        break;
                                                }
                                                if (data.categoryType.categoryTypeCode =='3') {
                                                    switch (data.specialGroupType.specialGroupCode) {
                                                        case '08':
                                                        case '15':
                                                        case '16':
                                                        case '17':
                                                        case '19':
                                                            widget.menu.items.items[2].setHidden(false);
                                                            widget.menu.items.items[3].setHidden(false);
                                                            break;
                                                        case '18':
                                                            widget.menu.items.items[0].setHidden(false);
                                                            widget.menu.items.items[5].setHidden(false);
                                                            widget.menu.items.items[6].setHidden(false);
                                                            if (data.insuranceAgreementRequestDetailList.length > 0) {
                                                                widget.menu.items.items[4].setHidden(false);
                                                            }
                                                        default:
                                                            widget.menu.items.items[0].setHidden(false);
                                                    }
                                                } else {
                                                    widget.menu.items.items[0].setHidden(false);
                                                }
                                            },
                                            widget: {
                                                xtype: 'button',
                                                text: "عملیات",
                                                defaultBindProperty: null,
                                                menu: [
                                                    {
                                                        text: 'تایید مسئول فنی',
                                                        handler: 'techConfirm',
                                                        iconCls: 'icon zoom_in'
                                                    },
                                                    {
                                                        text: 'تایید نهایی',
                                                        handler: 'finalConfirm',
                                                        iconCls: 'icon zoom_in'
                                                    },
                                                    {
                                                        text: 'تایید مسئول مطالبات',
                                                        handler: 'techConfirm',
                                                        iconCls: 'icon zoom_in'
                                                    },
                                                    {
                                                        text: 'تایید مسئول وصول حق بیمه',
                                                        handler: 'finalConfirm',
                                                        iconCls: 'icon zoom_in'
                                                    },
                                                    {
                                                        text: 'چاپ فرم معاینات',
                                                        handler: 'onIntroductionReportButton',
                                                        iconCls: ''
                                                    },
                                                    {
                                                        text: 'چاپ قرارداد',
                                                        handler: 'onAnswerReportButton',
                                                        iconCls: ''
                                                    },
                                                    {
                                                        text: 'نتیجه معاینات پزشکی',
                                                        handler: 'onMedicalResultButton',
                                                        iconCls: ''
                                                    },
                                                ]
                                            }
                                        },
                                        {
                                            text: 'شعبه',
                                            xtype: 'templatecolumn',
                                            autoSizeColumn: true,
                                            tpl: '{branch.branchCode} - {branch.branchName}',
                                            emptyCellText: '-'
                                        },
                                        {
                                            text: 'شماره درخواست',
                                            xtype: 'templatecolumn',
                                            autoSizeColumn: true,
                                            tpl: '{requestNumber}',
                                            emptyCellText: '-'
                                        },
                                        {
                                            text: 'تاریخ درخواست',
                                            dataIndex: 'requestDate',
                                            autoSizeColumn: true,
                                            emptyCellText: '-',
                                            renderer: function (value, data, record) {
                                                return value === null ? null : InsuranceTechnical.tamin.helpers
                                                    .Persian.gregorianToPersian(new Date(value));
                                            }
                                        },
                                        /*{
                                            text: 'تاریخ تولد',
                                            dataIndex: 'birthDate',
                                            autoSizeColumn: true,
                                            emptyCellText: '-',
                                            renderer: function (value, data, record) {
                                                if (record.data.person) {
                                                    return value === null ? null : InsuranceTechnical.tamin.helpers
                                                        .Persian.gregorianToPersian(new Date(record.data.person.dateOfBirth * 1000));
                                                } else {
                                                    return '-';
                                                }
                                            }
                                        },*/
                                        {
                                            text: 'شماره بیمه',
                                            xtype: 'templatecolumn',
                                            autoSizeColumn: true,
                                            tpl: '{person.id}',
                                            emptyCellText: '-'
                                        },
                                        {
                                            text: 'کدملی',
                                            name: 'natcode',
                                            xtype: 'templatecolumn',
                                            autoSizeColumn: true,
                                            tpl: '{person.nationalId}',
                                            emptyCellText: '-'
                                        },
                                        {
                                            text: 'نام خانوادگی',
                                            xtype: 'templatecolumn',
                                            autoSizeColumn: true,
                                            tpl: '',
                                            emptyCellText: '-',
                                            renderer: function (a, b, rec) {
                                                var data = rec.data.person;
                                                if (data !== null) {
                                                    return rec.data.person.lastName;
                                                } else {
                                                    return rec.data.plname;
                                                }
                                            }
                                        },
                                        {
                                            text: 'نام ',
                                            xtype: 'templatecolumn',
                                            autoSizeColumn: true,
                                            tpl: '',
                                            emptyCellText: '-',
                                            renderer: function (a, b, rec) {
                                                var data = rec.data.person;
                                                if (data !== null) {
                                                    return rec.data.person.firstName;
                                                } else {
                                                    return rec.data.pfname;
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'templatecolumn',
                                            tpl: '{categoryType.categoryTypeDesc}',
                                            text: 'دسته بندی بیمه شده',
                                            autoSizeColumn: true
                                        },
                                        {
                                            xtype: 'templatecolumn',
                                            tpl: '',
                                            text: 'گروه بیمه',
                                            autoSizeColumn: true,
                                            renderer: function (a, b, rec) {
                                                var data = rec.data;
                                                switch (data.categoryType.categoryTypeCode) {
                                                    case '2':
                                                        return data.agreementCategoryType.agreementCategoryDesc;
                                                    case '3':
                                                        return data.specialGroupType.specialGroupDesc;
                                                }
                                            }
                                        },
                                        /*{
                                            xtype: 'templatecolumn',
                                            text: 'نوع راننده',
                                            tpl: 'driverType',
                                            autoSizeColumn: true,
                                            bind: {
                                                hidden: '{specialGroupType.specialGroupCode !== "4"}'
                                            },
                                            renderer: function (val1, data, record) {
                                                if (record.data.insuranceAgreementRequestDetailList.length !== 0) {
                                                    switch (record.data.insuranceAgreementRequestDetailList[0].type3) {
                                                        case '01':
                                                            return 'راننده برون شهری';
                                                        case '02':
                                                            return 'راننده درون شهری';
                                                        default:
                                                            return '-';
                                                    }
                                                }
                                            }
                                        },*/
                                        {
                                            text: 'وضعیت بیمه',
                                            tpl: '{insuranceStatus.insuranceStatDesc}',
                                            xtype: 'templatecolumn',
                                            autoSizeColumn: true
                                        },
                                        {
                                            text: 'نوع بیمه',
                                            tpl: '{insuranceType.insuranceTypeDesc}',
                                            xtype: 'templatecolumn',
                                            autoSizeColumn: true
                                        },
                                        {
                                            text: 'کد کارگاه',
                                            xtype: 'templatecolumn',
                                            autoSizeColumn: true,
                                            tpl: '{workshop.workshopId}',
                                            emptyCellText: '-'
                                        },
                                        {
                                            text: 'جنسیت',
                                            tpl: 'gender',
                                            xtype: 'templatecolumn',
                                            autoSizeColumn: true,
                                            renderer: function (val1, data, record) {
                                                if (record.data.gender !== null) {
                                                    switch (record.data.gender) {
                                                        case '01':
                                                            return 'مرد';
                                                        case '02':
                                                            return 'زن';
                                                        default:
                                                            return '-';
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            text: 'وضعیت',
                                            tpl: 'status',
                                            xtype: 'templatecolumn',
                                            autoSizeColumn: true,
                                            renderer: function (val1, data, record) {
                                                data = record.data
                                                if (data.status !== null) {
                                                    switch (data.status) {
                                                        case '0':
                                                            return 'عدم بررسي';
                                                        case '1':
                                                            if (data.categoryType.categoryTypeCode =='3') {
                                                                switch (data.specialGroupType.specialGroupCode) {
                                                                    case '08':
                                                                    case '15':
                                                                    case '16':
                                                                    case '17':
                                                                    case '19':
                                                                        return 'تایید مسئول مطالبات';
                                                                }
                                                            }
                                                            return 'تاييد مسئول فني';
                                                        case '2':
                                                            if (data.categoryType.categoryTypeCode =='3') {
                                                                switch (data.specialGroupType.specialGroupCode) {
                                                                    case '08':
                                                                    case '15':
                                                                    case '16':
                                                                    case '17':
                                                                    case '19':
                                                                        return 'عدم تایید مسئول مطالبات';
                                                                }
                                                            }
                                                            return 'عدم تاييد مسئول فني';
                                                        case '3':
                                                            return 'عدم ثبت در ليست';
                                                        case '4':
                                                            return 'مختومه - عدم احراز شرايط';
                                                        case '5':
                                                            if (data.categoryType.categoryTypeCode =='3') {
                                                                switch (data.specialGroupType.specialGroupCode) {
                                                                    case '08':
                                                                    case '15':
                                                                    case '16':
                                                                    case '17':
                                                                    case '19':
                                                                        return 'تایید مسئول وصول حق بیمه';
                                                                }
                                                            }
                                                            return 'تایید نهایی';
                                                        case '6':
                                                            if (data.categoryType.categoryTypeCode =='3') {
                                                                switch (data.specialGroupType.specialGroupCode) {
                                                                    case '08':
                                                                    case '15':
                                                                    case '16':
                                                                    case '17':
                                                                    case '19':
                                                                        return 'عدم تایید مسئول وصول حق بیمه';
                                                                }
                                                            }
                                                            return 'لغو تایید نهایی';
                                                        default:
                                                            return '-';
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            text: 'تاریخ ثبت',
                                            dataIndex: 'createDateString',
                                            autoSizeColumn: true,
                                            emptyCellText: '-',
                                            renderer: function (value, data, record) {
                                                return value === null ? null : InsuranceTechnical.tamin.helpers
                                                    .Persian.gregorianToPersian(new Date(value));
                                            }
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
                                                        if ((record.data.branch.branchCode === orgCode
                                                                || record.data.branch.branchCode === '0000')
                                                                && record.data.status === '0') {
                                                            return false;
                                                        } else {
                                                            return true;
                                                        }
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'actioncolumn',
                                            align: 'center',
                                            width: 60,
                                            text: 'ویرایش',
                                            items: [
                                                {
                                                    iconCls: 'icon pencil',
                                                    tooltip: 'ویرایش',
                                                    handler: 'onEditButton',
                                                    /*isDisabled: function (view, rowIndex, colIndex, item, record) {
                                                        return !(record.data.status === '0' || record.data.specialGroupType.specialGroupCode === '04');
                                                    }*/
                                                }
                                            ]
                                        }
                                    ],
                                    dockedItems: [
                                        {
                                            xtype: 'pagingtoolbar',
                                            bind: {store: '{insuranceAgreementSpecStore}'},
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
                                }
                            ]
                        }
                    ]
                }
            ]
        });

