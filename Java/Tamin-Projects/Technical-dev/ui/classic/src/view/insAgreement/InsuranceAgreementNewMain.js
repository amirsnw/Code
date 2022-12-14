Ext.define('InsuranceTechnical.view.insAgreement.InsuranceAgreementNewMain',
    {
        extend: 'InsuranceTechnical.tamin.panel.Panel',
        xtype: 'insurance-agreement-new-main',
        title: 'ثبت / اصلاح اعضا گروه های خاص بیمه ای',
        controller: 'insAgreement-new-controller',
        viewModel: 'insAgreement-spec-model',
        items: [
            {
                xtype: 'tform',
                id: 'insAgreement-new-main-form',
                items: [
                    {
                        xtype: 'tfieldset',
                        title: '',
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
                                fieldLabel: 'دسته بندی نوع بیمه ',
                                valueField: 'categoryTypeCode',
                                displayField: 'categoryTypeDesc',
                                forceSelection: true,
                                allowBlank: false,
                                editable: false,
                                pageSize: 10,
                                id: 'categoryTypeCombo',
                                width: '50%',
                                bind: {
                                    store: '{insuranceAgreementCatStore}',
                                    value: '{agreeSpec.categoryType.categoryTypeCode}',
                                    readOnly: '{editMode}'
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
                            },
                            {
                                xtype: 'cellspacer',
                                colspan: 2
                            },
                            {
                                xtype: 'tcombobox',
                                fieldLabel: 'گروه بیمه',
                                valueField: 'code',
                                displayField: 'desc',
                                queryMode: 'local',
                                forceSelection: true,
                                allowBlank: false,
                                editable: false,
                                pageSize: 10,
                                id: 'insuranceGroupCombo',
                                width: '50%',
                                bind: {
                                    value: '{agreeSpec.specialGroupType}',
                                    readOnly: '{editMode}'
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
                                /*listeners: {
                                    change: 'onGroupTypeChange'
                                },*/
                            },
                            {
                                xtype: 'cellspacer',
                                colspan: 2
                            }
                        ]
                    },
                    {
                        xtype: 'tfieldset',
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
                        bind: {
                            hidden: '{!hasLetter && !hasIntroduction}'
                        },
                        items: [
                            {
                                xtype: 'ttextfield',
                                fieldLabel: 'شماره درخواست',
                                allowBlank: false,
                                maskRe: /[0-9]/,
                                regex: /[0-9]/,
                                maxLength: 15,
                                enforceMaxLength: true,
                                name: 'requestId',
                                id: 'requestId',
                                width: '75%',
                                bind: {
                                    value: '{headerSpec.requestNumber}',
                                    readOnly: '{editMode}',
                                    disabled: '{!hasLetter || isSenfi}',
                                    hidden: '{!hasLetter}'
                                }
                            },
                            {
                                xtype: 'tdatefield',
                                fieldLabel: 'تاریخ درخواست',
                                name: 'requestDate',
                                id: 'requestDate',
                                allowBlank: false,
                                width: '75%',
                                submitFormat: 'Y-m-d H:i:s',
                                bind: {
                                    value: '{headerSpec.requestDate}',
                                    readOnly: '{editMode}',
                                    disabled: '{!hasLetter}',
                                    hidden: '{!hasLetter}'
                                },
                                listeners: {
                                    change: function (combo, newValue) {
                                        var date = new Date(JSON.parse(JSON.stringify(newValue)));
                                        var viewModel = this.up('insurance-agreement-new-main').getViewModel();
                                        if (viewModel.get('isSenfi')) {
                                            viewModel.set('agreeDetailSpec.documentDate2', new Date(date.setDate(date.getDate() + 90)));
                                        }
                                    },
                                },
                            },
                            {
                                xtype: 'cellspacer',
                                width: '75%',
                                bind: {
                                    hidden: '{!hasLetter}'
                                }
                            },
                            {
                                xtype: 'ttextfield',
                                fieldLabel: 'شماره ثبت معرفی نامه',
                                name: 'introLetterNumber',
                                allowBlank: false,
                                maxLength: 15,
                                enforceMaxLength: true,
                                maskRe: /[0-9]/,
                                regex: /[0-9]/,
                                width: '75%',
                                bind: {
                                    value: '{headerSpec.introductionLetterNumber}',
                                    readOnly: '{editMode}',
                                    disabled: '{!hasIntroduction}',
                                    hidden: '{!hasIntroduction}'
                                }
                            },
                            {
                                xtype: 'tdatefield',
                                fieldLabel: 'تاریخ ثبت معرفی نامه',
                                name: 'introLetterDate',
                                allowBlank: false,
                                width: '75%',
                                submitFormat: 'Y-m-d H:i:s',
                                bind: {
                                    value: '{headerSpec.introductionLetterDate}',
                                    readOnly: '{editMode}',
                                    disabled: '{!hasIntroduction}',
                                    hidden: '{!hasIntroduction}'
                                },
                                validator: function (fieldValue) {
                                    var fieldValue = new Date(InsuranceTechnical.tamin.helpers.Persian.taminDateToGregorian(fieldValue));
                                    var today = new Date();
                                    if (this.up('insurance-agreement-new-main').getViewModel().get('agreeSpec.categoryType.categoryTypeCode') === '3') {
                                        switch (this.up('insurance-agreement-new-main').getViewModel().get('agreeSpec.specialGroupType')) {
                                            case '01':
                                                var start = new Date(InsuranceTechnical.tamin.helpers.Persian.taminDateToGregorian('1386/03/01'));
                                                return fieldValue >= start && fieldValue <= today;
                                            case '02':
                                                var start = new Date(InsuranceTechnical.tamin.helpers.Persian.taminDateToGregorian('1385/01/01'));
                                                return fieldValue >= start && fieldValue <= today;
                                            case '03':
                                                var start = new Date(InsuranceTechnical.tamin.helpers.Persian.taminDateToGregorian('1384/04/29'));
                                                return fieldValue >= start && fieldValue <= today;
                                            case '04':
                                                var start = new Date(InsuranceTechnical.tamin.helpers.Persian.taminDateToGregorian('1386/01/01'));
                                                return fieldValue >= start && fieldValue <= today;
                                            case '05':
                                                var start = new Date(InsuranceTechnical.tamin.helpers.Persian.taminDateToGregorian('1385/07/01'));
                                                return fieldValue >= start && fieldValue <= today;
                                            case '06':
                                                return fieldValue <= today;
                                            case '07':
                                                var start = new Date(InsuranceTechnical.tamin.helpers.Persian.taminDateToGregorian('1384/12/01'));
                                                return fieldValue >= start && fieldValue <= today;
                                            case '08':
                                                var workshopType = this.up('insurance-agreement-new-main').getViewModel().get('agreeDetailSpec.type1');
                                                if (workshopType === '1') {
                                                    return fieldValue <= today;
                                                } else {
                                                    return true;
                                                }
                                            case '10':
                                                var start = new Date(InsuranceTechnical.tamin.helpers.Persian.taminDateToGregorian('1386/03/01'));
                                                return fieldValue >= start && fieldValue <= today;
                                            case '12':
                                                var start = new Date(InsuranceTechnical.tamin.helpers.Persian.taminDateToGregorian('1387/03/01'));
                                                return fieldValue >= start && fieldValue <= today;
                                            case '13':
                                                var start = new Date(InsuranceTechnical.tamin.helpers.Persian.taminDateToGregorian('1389/01/01'));
                                                return fieldValue >= start;
                                            case '13':
                                                return fieldValue <= today;
                                            case '17':
                                                return fieldValue <= today;
                                            default:
                                                return true;
                                        }
                                    } else {
                                        return fieldValue <= today;
                                    }
                                },
                                listeners: {
                                    change: 'onIntoDateChange'
                                },
                            },
                            {
                                xtype: 'cellspacer'
                            }
                        ]
                    },
                    {
                        xtype: 'tfieldset',
                        title: '',
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
                        bind: {
                            disabled: '{disableForm}'
                        },
                        items: [
                            {
                                xtype: 'ttextfield',
                                fieldLabel: 'شماره بیمه',
                                name: 'insuranceId',
                                id: 'insuranceId',
                                maxLength: 10,
                                minLength: 10,
                                maskRe: /[0-9]/,
                                regex: /[0-9]/,
                                allowBlank: false,
                                enforceMaxLength: true,
                                msgTarget: 'side',
                                minLengthText: 'شماره بیمه ده رقمی میباشد.',
                                bind: {
                                    value: '{personInfo.id}',
                                    readOnly: '{editMode}'
                                },
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
                                            var me = this.up('insurance-agreement-new-main');
                                            me.getController().resetPersonInfo();
                                            arguments[0].setValue(null);
                                        }
                                    }
                                },
                                listeners: {
                                    change: 'findInsuranceId'
                                },
                                /*validator: function (fieldValue) {
                                    if (!fieldValue) return true;
                                    if (fieldValue.substr(0, 2) === '00') {
                                        return true;
                                    } else {
                                        InsuranceTechnical.tamin.window.MessageBox.showError('خطا', 'شماره بیمه انتخابی شماره دائم نمیباشد.');
                                        this.reset();
                                        return false;
                                    }
                                }*/
                            },
                            {
                                xtype: 'cellspacer',
                                colspan: 2
                            },
                            {
                                xtype: 'tdisplayfield',
                                fieldLabel: 'نام',
                                bind: {
                                    value: '{personInfo.firstName}'
                                }
                            },
                            {
                                xtype: 'tdisplayfield',
                                fieldLabel: 'نام خانوادگی',
                                bind: {
                                    value: '{personInfo.lastName}'
                                }
                            },
                            {
                                xtype: 'tdisplayfield',
                                fieldLabel: 'کد ملی',
                                maxLength: 10,
                                minLength: 10,
                                maskRe: /[0-9]/,
                                regex: /[0-9]/,
                                enforceMaxLength: true,
                                msgTarget: 'side',
                                minLengthText: 'شماره بیمه ده رقمی میباشد.',
                                bind: {
                                    value: '{personInfo.nationalId}'
                                }
                            },
                            {
                                xtype: 'tdisplayfield',
                                fieldLabel: 'جنسیت ',
                                bind: {
                                    value: '{personInfo.gender}'
                                }
                            },
                            {
                                xtype: 'tdisplayfield',
                                fieldLabel: 'نوع بیمه',
                                bind: {
                                    value: '{personInfo.isuType.insuranceTypeDesc}'
                                }
                            },
                            {
                                xtype: 'tdisplayfield',
                                fieldLabel: 'وضعیت بیمه',
                                bind: {
                                    value: '{personInfo.isuStat.insuranceStatDesc}'
                                }
                            },
                            {
                                xtype: 'tfieldset',
                                title: 'سن',
                                width: '40%',
                                id: 'ageFildset',
                                defaults: {
                                    labelWidth: 50
                                },
                                layout: {
                                    type: 'table',
                                    columns: 3,
                                    tableAttrs: {
                                        style: {
                                            width: '70%'
                                        }
                                    }
                                },
                                items: [
                                    {
                                        xtype: 'tdisplayfield',
                                        fieldLabel: 'سال',
                                        width: '80px',
                                        readOnly: true,
                                        bind: {
                                            value: '{personInfo.ageYear}'
                                        },
                                        validator: function (fieldValue) {
                                            if (!fieldValue) return true;
                                            var viewModel = this.up('insurance-agreement-new-main').getViewModel()
                                            if (viewModel.get('agreeSpec.categoryType.categoryTypeCode') === '3')
                                                switch (viewModel.get('agreeSpec.specialGroupType')) {
                                                    case '02':
                                                        // case '18':
                                                        var introYear = viewModel.get('headerSpec.introductionLetterDate');
                                                        if (introYear instanceof Date) {
                                                            introYear = introYear.getFullYear();
                                                        } else {
                                                            introYear = introYear.substr(0, 4);
                                                        }
                                                        var birthYear = new Date(InsuranceTechnical.tamin.helpers.Persian.taminDateToGregorian(viewModel.get('personInfo.dateOfBirth'))).getFullYear()
                                                        if (introYear - birthYear > 50) {
                                                            InsuranceTechnical.tamin.window.MessageBox
                                                                .showError('خطا',
                                                                    'بيمه شده مورد نظر بيش از 50 سال سن دارد.',
                                                                    null,
                                                                    function () {
                                                                        Ext.getCmp('insuranceId').reset();
                                                                    });
                                                        }
                                                    default:
                                                        return true;
                                                }
                                            return true;
                                        }
                                    },
                                    {
                                        xtype: 'tdisplayfield',
                                        fieldLabel: 'ماه',
                                        width: '80px',
                                        bind: {
                                            value: '{personInfo.ageMonth}'
                                        }
                                    },
                                    {
                                        xtype: 'tdisplayfield',
                                        fieldLabel: 'روز',
                                        width: '80px',
                                        bind: {
                                            value: '{personInfo.ageDay}'
                                        }
                                    }
                                ]
                            },
                            {
                                xtype: 'cellspacer',
                                colspan: 3
                            },
                            {
                                xtype: 'ttextfield',
                                fieldLabel: 'کارگاه',
                                name: 'workshopID',
                                id: 'workshopID',
                                maxLength: 10,
                                minLength: 10,
                                maskRe: /[0-9]/,
                                regex: /[0-9]/,
                                allowBlank: false,
                                enforceMaxLength: true,
                                msgTarget: 'side',
                                minLengthText: 'شماره کارگاه ده رقمی میباشد.',
                                bind: {
                                    value: '{workshopData.workshopId}'
                                },
                                triggers: {
                                    lookup: {
                                        cls: 'x-form-search-trigger',
                                        weight: -1,
                                        handler: 'showWorkshopPopup'
                                    },
                                    delete: {
                                        cls: 'x-form-clear-trigger',
                                        weight: -2,
                                        handler: function () {
                                            arguments[0].setValue(null);
                                        }
                                    }
                                },
                                listeners: {
                                    change: 'findWorkshopID',
                                    specialkey: 'onEnterOnWorkshopId'
                                },
                                validator: function (fieldValue) {
                                    if (!fieldValue) return true;
                                    if (this.up('insurance-agreement-new-main').getViewModel().get('agreeSpec.categoryType.categoryTypeCode') === '3') {
                                        switch (this.up('insurance-agreement-new-main').getViewModel().get('agreeSpec.specialGroupType')) {
                                            case '10':
                                                if (fieldValue.substr(3, 3) === '826') {
                                                    return true;
                                                } else {
                                                    InsuranceTechnical.tamin.window.MessageBox.showError('خطا', 'کارگاه مربوط به کارگاه هاي نماينده بيمه ايران نمي باشد.');
                                                    this.reset();
                                                    return false;
                                                }
                                            case '12':
                                                if (fieldValue.substr(3, 3) === '824') {
                                                    return true;
                                                } else {
                                                    InsuranceTechnical.tamin.window.MessageBox.showError('خطا', 'کارگاه مربوط به کارگاه انجمن صنفي نمايندگان بيمه معلم نمي باشد!');
                                                    this.reset();
                                                    return false;
                                                }
                                            case '13':
                                                if (fieldValue.substr(3, 3) === '825') {
                                                    return true;
                                                } else {
                                                    InsuranceTechnical.tamin.window.MessageBox.showError('خطا',
                                                        'کارگاه مربوط به کارگاه مرکزامورمشاوران حقوقي، وکلا و کارشناسان قوه قضاييه نمي باشد.');
                                                    this.reset();
                                                    return false;
                                                }
                                            default:
                                                return true;
                                        }
                                    } else {
                                        return true;
                                    }
                                }
                            },
                            {
                                xtype: 'cellspacer',
                                colspan: 2
                            },
                            {
                                xtype: 'tdisplayfield',
                                fieldLabel: 'نام کارگاه',
                                bind: {
                                    value: '{workshopData.workshopName}'
                                }
                            },
                            {
                                xtype: 'tdisplayfield',
                                fieldLabel: 'شعبه بیمه پردازی',
                                bind: {
                                    value: '{personInfo.brchCode}'
                                }
                            },
                            {
                                xtype: 'tdisplayfield',
                                fieldLabel: 'مجموع روز سابقه',
                                readOnly: true,
                                bind: {
                                    value: '{personInfo.historyDays}',
                                },
                                validator: function (hist) {
                                    var viewModel = this.up('insurance-agreement-new-main').getViewModel();
                                    if (!hist) return true;
                                    hist = Number(hist);

                                    if (['05', '10'].includes(viewModel.get('agreeSpec.specialGroupType')) && hist === 0) {
                                        InsuranceTechnical.tamin.window.MessageBox.showError('خطا', 'بیمه شده مورد نظر فاقد سابقه است.');
                                        return false;
                                    }

                                    if (viewModel.get('agreeSpec.categoryType.categoryTypeCode') === '3') {
                                        switch (viewModel.get('agreeSpec.specialGroupType')) {
                                            case '04':
                                            case '06':
                                            case '07':
                                            case '10':
                                            case '12':
                                            case '13':
                                                if (viewModel.get('personInfo.ageYear') < 50) {
                                                    return true;
                                                }
                                                var ageDays = viewModel.get('personInfo.ageYear') * 365
                                                    + viewModel.get('personInfo.ageMonth') * 30 + Number(viewModel.get('personInfo.ageDay')) - (50 * 365);
                                                if (ageDays > Number(hist)) {
                                                    InsuranceTechnical.tamin.window.MessageBox.showError('خطا', 'بيمه شده مورد نظر بيش از 50 سال سن دارد.', null, function () {
                                                        Ext.getCmp('insuranceId').reset();
                                                    });
                                                    return false;
                                                } else {
                                                    return true;
                                                }
                                            case '18':
                                                if (viewModel.get('personInfo.ageYear') < 50) {
                                                    return true;
                                                }
                                                var ageDays = viewModel.get('personInfo.ageYear') * 365
                                                    + viewModel.get('personInfo.ageMonth') * 30 + Number(viewModel.get('personInfo.ageDay')) - (50 * 365);
                                                if (ageDays > Number(hist)) {
                                                    InsuranceTechnical.tamin.window.MessageBox.showError('خطا',
                                                        'بيمه شده  ، داراي' + viewModel.get('personInfo.ageYear') + ' سن و ' + hist + ' روز سابقه است که حداقل نياز به ' + ageDays + ' روز سابقه براي قرارداد دارد', null, function () {
                                                            viewModel.get('agreeSpec.status')
                                                        });
                                                    return false;
                                                } else {
                                                    return true;
                                                }
                                                break;
                                            default:
                                                return true;
                                        }
                                    } else {
                                        return true;
                                    }
                                }
                            },
                            {
                                xtype: 'ttextfield',
                                fieldLabel: 'دستمزد (ریال)',
                                allowBlank: false,
                                maskRe: /[0-9]/,
                                regex: /[0-9]/,
                                id: 'wage',
                                maxLength: 12,
                                enforceMaxLength: true,
                                currencySymbol: 'ریال',
                                useThousandSeparator: false,
                                alwaysDisplayDecimals: false,
                                bind: {
                                    value: '{agreeSpec.wage}',
                                    disabled: '{!hasWage}',
                                    readOnly: '{lockWage}',
                                }
                            },
                            {
                                xtype: 'cellspacer',
                                colspan: 2
                            },
                            /*{
                                html: '',
                                border: false,
                                defaults: {
                                    width: '80%',
                                    height: '90px'
                                },
                            },*/
                            {
                                xtype: 'hr',
                                colspan: 3,
                                bind: {
                                    hidden: '{!isSenfi}',
                                },
                            },
                            {
                                xtype: 'cellspacer',
                                colspan: 3,

                            },
                            {
                                xtype: 'tcombobox',
                                fieldLabel: 'نوع درخواست',
                                name: 'selfIsuTypeCode',
                                id: 'selfIsuType',
                                valueField: 'value',
                                displayField: 'name',
                                forceSelection: true,
                                allowBlank: false,
                                editable: false,
                                bind: {
                                    value: '{agreeSpec.selfIsuTypeCode}',
                                    disabled: '{!isSenfi}',
                                    hidden: '{!isSenfi}',
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
                                xtype: 'tcombobox',
                                fieldLabel: 'نرخ حق بیمه',
                                name: 'insuranceRate',
                                valueField: 'value',
                                displayField: 'name',
                                forceSelection: true,
                                allowBlank: false,
                                editable: false,
                                value: 27,
                                bind: {
                                    value: '{agreeSpec.insuranceRate}',
                                    disabled: '{!isSenfi}',
                                    hidden: '{!isSenfi}',
                                },
                                store: {
                                    fields: ['name', 'value'],
                                    data: [
                                        {name: '27%', value: 27},
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
                            }
                        ]
                    },
                    {
                        xtype: 'hr',
                        colspan: 3
                    },
                    {
                        xtype: 'tfieldset',
                        title: 'سایر اطلاعات',
                        id: 'agreeSpecFieldset',
                        bind: {
                            hidden: '{noMoreFields}'
                        }
                    },
                    {
                        xtype: 'buttoncontainer',
                        items: [
                            {
                                xtype: 'button',
                                text: 'ذخیره',
                                iconCls: 'icon save',
                                handler: 'onSaveButton',
                                bind: {
                                    disabled: '{lockEdit}'
                                }
                            },
                            {
                                xtype: 'button',
                                text: 'بازگشت',
                                iconCls: 'icon arrow_right',
                                handler: 'onCancelButton'
                            }
                        ]
                    }
                ]
            }
        ]
    });
Ext.define('MomentjsAdapter', {
    mixins: ['Ext.mixin.Mashup'],
    requiredScripts: [
        'resources/js/moment.min.js'
    ]
});
