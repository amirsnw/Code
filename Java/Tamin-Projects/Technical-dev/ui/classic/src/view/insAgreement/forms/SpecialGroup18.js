Ext.define('InsuranceTechnical.view.insAgreement.forms.SpecialGroup18',
    {
        // کارفرمایان صنفی
        extend: 'InsuranceTechnical.tamin.panel.Panel',
        viewModel: 'insAgreement-spec-model',
        items: [
            {
                xtype: 'tfieldset',
                title: '',
                border: false,
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
                    /*{
                        xtype: 'ttextfield',
                        fieldLabel: 'شماره ثبت دبیرخانه',
                        name: 'documentNumber1',
                        allowBlank: false,
                        maxLength: 20,
                        maskRe: /[0-9]/,
                        regex: /[0-9]/,
                        enforceMaxLength: true,
                        bind: {
                            value: '{agreeDetailSpec.documentNumber1}'
                        },
                        delete: {
                            cls: 'x-form-clear-trigger',
                            weight: -2,
                            handler: function () {
                                arguments[0].setValue(null);
                            }
                        }
                    },
                    {
                        xtype: 'tdatefield',
                        fieldLabel: 'تاریخ ثبت دبیرخانه',
                        name: 'documentDate1',
                        allowBlank: false,
                        bind: {
                            value: '{agreeDetailSpec.documentDate1}'
                        },
                        delete: {
                            cls: 'x-form-clear-trigger',
                            weight: -2,
                            handler: function () {
                                arguments[0].setValue(null);
                            }
                        }
                    },*/
                    {
                        xtype: 'cellspacer',
                        colspan: 1
                    },
                    {
                        xtype: 'tfieldset',
                        width: '90%',
                        defaults: {
                            labelWidth: 130
                        },
                        colspan: 2,
                        layout: {
                            type: 'table',
                            columns: 2,
                            tableAttrs: {
                                style: {
                                    width: '100%',
                                    padding: '10px'
                                }
                            }
                        },
                        items: [
                            {
                                xtype: 'ttextfield',
                                fieldLabel: 'نام مرکز',
                                allowBlank: false,
                                name: 'documentNumber2',
                                width: '70%',
                                bind: {
                                    value: '{agreeDetailSpec.documentNumber2}'
                                }
                            },
                            {
                                xtype: 'tdatefield',
                                fieldLabel: 'آخرین روز مهلت معاینه',
                                width: '70%',
                                name: 'documentDate2',
                                id: 'lastMedicalDate',
                                allowBlank: false,
                                readOnly: true,
                                bind: {
                                    value: '{agreeDetailSpec.documentDate2}'
                                },
                                delete: {
                                    cls: 'x-form-clear-trigger',
                                    weight: -2,
                                    handler: function () {
                                        arguments[0].setValue(null);
                                    }
                                }
                            },
                            {
                                xtype: 'tfieldset',
                                title: 'گزارش چاپی از سوابق پرداخت حق بیمه',
                                width: '90%',
                                defaults: {
                                    labelWidth: 120
                                },
                                layout: {
                                    type: 'table',
                                    columns: 2,
                                    tableAttrs: {
                                        style: {
                                            width: '60%',
                                            padding: '10px'
                                        }
                                    }
                                },
                                items: [
                                    {
                                        xtype: 'radiogroup',
                                        allowBlank: false,
                                        colspan: 2,
                                        width: '100%',
                                        columns: 2,
                                        vertical: true,
                                        simpleValue: true,
                                        value: '',
                                        bind: {
                                            value: '{agreeDetailSpec.type1}'
                                        },
                                        listeners: {
                                            change: function (combo, newValue) {
                                                if (newValue === '2') {
                                                    Ext.getCmp('description4').setDisabled(true);
                                                } else {
                                                    Ext.getCmp('description4').setDisabled(false);
                                                }
                                            },
                                            afterRender: function (combo, newValue) {
                                                if (!this.up('insurance-agreement-new-main').getViewModel().get('agreeDetailSpec.type1')) {
                                                    this.up('insurance-agreement-new-main').getViewModel().set('agreeDetailSpec.type1', this.value)
                                                }
                                            }
                                        },
                                        items: [
                                            {
                                                boxLabel: 'ندارد',
                                                name: 'type1',
                                                inputValue: '2',
                                                width: '100%',
                                            },
                                            {
                                                boxLabel: 'دارد',
                                                name: 'type1',
                                                inputValue: '1',
                                                width: '100%',
                                            },
                                        ]
                                    },
                                    {
                                        xtype: 'ttextfield',
                                        fieldLabel: 'تعداد برگ پیوست',
                                        id: 'description4',
                                        name: 'description4',
                                        allowBlank: false,
                                        maxLength: 2,
                                        maskRe: /[0-9]/,
                                        regex: /[0-9]/,
                                        enforceMaxLength: true,
                                        disabled: true,
                                        bind: {
                                            value: '{agreeDetailSpec.description4}'
                                        },
                                        delete: {
                                            cls: 'x-form-clear-trigger',
                                            weight: -2,
                                            handler: function () {
                                                arguments[0].setValue(0);
                                            }
                                        }
                                    },
                                ]
                            },
                            {
                                xtype: 'tfieldset',
                                title: 'اوراق پرونده های بستری و سرپایی و سایر مدارک مربوط به سوابق بیماری / بیماریهای قلبی',
                                width: '90%',
                                defaults: {
                                    labelWidth: 120
                                },
                                layout: {
                                    type: 'table',
                                    columns: 2,
                                    tableAttrs: {
                                        style: {
                                            width: '60%',
                                            padding: '10px'
                                        }
                                    }
                                },
                                items: [
                                    {
                                        xtype: 'radiogroup',
                                        allowBlank: false,
                                        colspan: 2,
                                        width: '100%',
                                        columns: 2,
                                        vertical: true,
                                        simpleValue: true,
                                        value: '',
                                        bind: {
                                            value: '{agreeDetailSpec.type2}'
                                        },
                                        listeners: {
                                            change: function (combo, newValue) {
                                                if (newValue === '2') {
                                                    Ext.getCmp('documentNumber4').setDisabled(true);
                                                } else {
                                                    Ext.getCmp('documentNumber4').setDisabled(false);
                                                }
                                            },
                                            afterRender: function (combo, newValue) {
                                                if (!this.up('insurance-agreement-new-main').getViewModel().get('agreeDetailSpec.type2')) {
                                                    this.up('insurance-agreement-new-main').getViewModel().set('agreeDetailSpec.type2', this.value)
                                                }
                                            }
                                        },
                                        items: [
                                            {
                                                boxLabel: 'ندارد',
                                                name: 'type2',
                                                inputValue: '2',
                                                width: '100%',
                                            },
                                            {
                                                boxLabel: 'دارد',
                                                name: 'type2',
                                                inputValue: '1',
                                                width: '100%',
                                            },
                                        ]
                                    },
                                    {
                                        xtype: 'ttextfield',
                                        fieldLabel: 'تعداد برگ پیوست',
                                        id: 'documentNumber4',
                                        name: 'documentNumber4',
                                        allowBlank: false,
                                        maxLength: 2,
                                        maskRe: /[0-9]/,
                                        regex: /[0-9]/,
                                        enforceMaxLength: true,
                                        disabled: true,
                                        bind: {
                                            value: '{agreeDetailSpec.documentNumber4}'
                                        },
                                        delete: {
                                            cls: 'x-form-clear-trigger',
                                            weight: -2,
                                            handler: function () {
                                                arguments[0].setValue(0);
                                            }
                                        }
                                    },
                                ]
                            },
                            {
                                xtype: 'tfieldset',
                                title: 'تصویر معاینه اولیه (موضوع ماده 90 - بیمه های خاص)',
                                width: '90%',
                                defaults: {
                                    labelWidth: 120
                                },
                                layout: {
                                    type: 'table',
                                    columns: 2,
                                    tableAttrs: {
                                        style: {
                                            width: '60%',
                                            padding: '10px'
                                        }
                                    }
                                },
                                items: [
                                    {
                                        xtype: 'radiogroup',
                                        allowBlank: false,
                                        colspan: 2,
                                        width: '100%',
                                        columns: 2,
                                        vertical: true,
                                        simpleValue: true,
                                        value: '',
                                        bind: {
                                            value: '{agreeDetailSpec.type3}'
                                        },
                                        listeners: {
                                            change: function (combo, newValue) {
                                                if (newValue === '2') {
                                                    Ext.getCmp('documentNumber5').setDisabled(true);
                                                } else {
                                                    Ext.getCmp('documentNumber5').setDisabled(false);
                                                }
                                            },
                                            afterRender: function (combo, newValue) {
                                                if (!this.up('insurance-agreement-new-main').getViewModel().get('agreeDetailSpec.type3')) {
                                                    this.up('insurance-agreement-new-main').getViewModel().set('agreeDetailSpec.type3', this.value)
                                                }
                                            }
                                        },
                                        items: [
                                            {
                                                boxLabel: 'ندارد',
                                                name: 'type3',
                                                inputValue: '2',
                                                width: '100%',
                                            },
                                            {
                                                boxLabel: 'دارد',
                                                name: 'type3',
                                                inputValue: '1',
                                                width: '100%',
                                            },
                                        ]
                                    },
                                    {
                                        xtype: 'ttextfield',
                                        fieldLabel: 'تعداد برگ پیوست',
                                        id: 'documentNumber5',
                                        name: 'documentNumber5',
                                        allowBlank: false,
                                        maxLength: 2,
                                        maskRe: /[0-9]/,
                                        regex: /[0-9]/,
                                        enforceMaxLength: true,
                                        disabled: true,
                                        bind: {
                                            value: '{agreeDetailSpec.documentNumber5}'
                                        },
                                        delete: {
                                            cls: 'x-form-clear-trigger',
                                            weight: -2,
                                            handler: function () {
                                                arguments[0].setValue(0);
                                            }
                                        }
                                    },
                                ]
                            },
                            {
                                xtype: 'tfieldset',
                                title: 'تصویر کارت پایان خدمت یا معافیت از سربازی',
                                width: '90%',
                                defaults: {
                                    labelWidth: 120
                                },
                                layout: {
                                    type: 'table',
                                    columns: 2,
                                    tableAttrs: {
                                        style: {
                                            width: '60%',
                                            padding: '10px'
                                        }
                                    }
                                },
                                items: [
                                    {
                                        xtype: 'radiogroup',
                                        allowBlank: false,
                                        colspan: 2,
                                        width: '100%',
                                        columns: 2,
                                        vertical: true,
                                        simpleValue: true,
                                        value: '',
                                        bind: {
                                            value: '{agreeDetailSpec.type4}'
                                        },
                                        listeners: {
                                            change: function (combo, newValue) {
                                                if (newValue === '2') {
                                                    Ext.getCmp('documentNumber6').setDisabled(true);
                                                } else {
                                                    Ext.getCmp('documentNumber6').setDisabled(false);
                                                }
                                            },
                                            afterRender: function (combo, newValue) {
                                                if (!this.up('insurance-agreement-new-main').getViewModel().get('agreeDetailSpec.type4')) {
                                                    this.up('insurance-agreement-new-main').getViewModel().set('agreeDetailSpec.type4', this.value)
                                                }
                                            }
                                        },
                                        items: [
                                            {
                                                boxLabel: 'ندارد',
                                                name: 'type4',
                                                inputValue: '2',
                                                width: '100%',
                                            },
                                            {
                                                boxLabel: 'دارد',
                                                name: 'type4',
                                                inputValue: '1',
                                                width: '100%',
                                            },
                                        ]
                                    },
                                    {
                                        xtype: 'ttextfield',
                                        fieldLabel: 'تعداد برگ پیوست',
                                        id: 'documentNumber6',
                                        name: 'documentNumber6',
                                        allowBlank: false,
                                        maxLength: 2,
                                        maskRe: /[0-9]/,
                                        regex: /[0-9]/,
                                        enforceMaxLength: true,
                                        disabled: true,
                                        bind: {
                                            value: '{agreeDetailSpec.documentNumber6}'
                                        },
                                        delete: {
                                            cls: 'x-form-clear-trigger',
                                            weight: -2,
                                            handler: function () {
                                                arguments[0].setValue(0);
                                            }
                                        }
                                    },
                                ]
                            },
                            {
                                xtype: 'tfieldset',
                                title: 'نظریه های قبلی کمیسیون پزشکی : بدوی و تجدید نظر',
                                width: '90%',
                                defaults: {
                                    labelWidth: 120
                                },
                                layout: {
                                    type: 'table',
                                    columns: 2,
                                    tableAttrs: {
                                        style: {
                                            width: '60%',
                                            padding: '10px'
                                        }
                                    }
                                },
                                items: [
                                    {
                                        xtype: 'radiogroup',
                                        allowBlank: false,
                                        colspan: 2,
                                        width: '100%',
                                        columns: 2,
                                        vertical: true,
                                        simpleValue: true,
                                        value: '',
                                        bind: {
                                            value: '{agreeDetailSpec.type5}'
                                        },
                                        listeners: {
                                            change: function (combo, newValue) {
                                                if (newValue === '2') {
                                                    Ext.getCmp('documentNumber7').setDisabled(true);
                                                } else {
                                                    Ext.getCmp('documentNumber7').setDisabled(false);
                                                }
                                            },
                                            afterRender: function (combo, newValue) {
                                                if (!this.up('insurance-agreement-new-main').getViewModel().get('agreeDetailSpec.type5')) {
                                                    this.up('insurance-agreement-new-main').getViewModel().set('agreeDetailSpec.type5', this.value)
                                                }
                                            }
                                        },
                                        items: [
                                            {
                                                boxLabel: 'ندارد',
                                                name: 'type5',
                                                inputValue: '2',
                                                width: '100%',
                                            },
                                            {
                                                boxLabel: 'دارد',
                                                name: 'type5',
                                                inputValue: '1',
                                                width: '100%',
                                            },
                                        ]
                                    },
                                    {
                                        xtype: 'ttextfield',
                                        fieldLabel: 'تعداد برگ پیوست',
                                        id: 'documentNumber7',
                                        name: 'documentNumber7',
                                        allowBlank: false,
                                        maxLength: 2,
                                        maskRe: /[0-9]/,
                                        regex: /[0-9]/,
                                        enforceMaxLength: true,
                                        disabled: true,
                                        bind: {
                                            value: '{agreeDetailSpec.documentNumber7}'
                                        },
                                        delete: {
                                            cls: 'x-form-clear-trigger',
                                            weight: -2,
                                            handler: function () {
                                                arguments[0].setValue(0);
                                            }
                                        }
                                    },
                                ]
                            },
                            {
                                xtype: 'tfieldset',
                                title: 'تصویر فرم ثبت سوابق استفاده از غرامت ایام بیماری (فرم شماره 5 ساماندهی بایگانی فنی)',
                                width: '90%',
                                defaults: {
                                    labelWidth: 120
                                },
                                layout: {
                                    type: 'table',
                                    columns: 2,
                                    tableAttrs: {
                                        style: {
                                            width: '60%',
                                            padding: '10px'
                                        }
                                    }
                                },
                                items: [
                                    {
                                        xtype: 'radiogroup',
                                        allowBlank: false,
                                        colspan: 2,
                                        width: '100%',
                                        columns: 2,
                                        vertical: true,
                                        simpleValue: true,
                                        value: '',
                                        bind: {
                                            value: '{agreeDetailSpec.type6}'
                                        },
                                        listeners: {
                                            change: function (combo, newValue) {
                                                if (newValue === '2') {
                                                    Ext.getCmp('documentNumber8').setDisabled(true);
                                                } else {
                                                    Ext.getCmp('documentNumber8').setDisabled(false);
                                                }
                                            },
                                            afterRender: function (combo, newValue) {
                                                if (!this.up('insurance-agreement-new-main').getViewModel().get('agreeDetailSpec.type6')) {
                                                    this.up('insurance-agreement-new-main').getViewModel().set('agreeDetailSpec.type6', this.value)
                                                }
                                            }
                                        },
                                        items: [
                                            {
                                                boxLabel: 'ندارد',
                                                name: 'type6',
                                                inputValue: '2',
                                                width: '100%',
                                            },
                                            {
                                                boxLabel: 'دارد',
                                                name: 'type6',
                                                inputValue: '1',
                                                width: '100%',
                                            },
                                        ]
                                    },
                                    {
                                        xtype: 'ttextfield',
                                        fieldLabel: 'تعداد برگ پیوست',
                                        id: 'documentNumber8',
                                        name: 'documentNumber8',
                                        allowBlank: false,
                                        maxLength: 2,
                                        maskRe: /[0-9]/,
                                        regex: /[0-9]/,
                                        enforceMaxLength: true,
                                        disabled: true,
                                        bind: {
                                            value: '{agreeDetailSpec.documentNumber8}'
                                        },
                                        delete: {
                                            cls: 'x-form-clear-trigger',
                                            weight: -2,
                                            handler: function () {
                                                arguments[0].setValue(0);
                                            }
                                        }
                                    },
                                ]
                            },
                            {
                                xtype: 'tfieldset',
                                title: 'تصویر فرم استفاده از پروتز اروتز (فرم شماره 6 ساماندهی بایگانی فنی)',
                                width: '90%',
                                defaults: {
                                    labelWidth: 120
                                },
                                layout: {
                                    type: 'table',
                                    columns: 2,
                                    tableAttrs: {
                                        style: {
                                            width: '60%',
                                            padding: '10px'
                                        }
                                    }
                                },
                                items: [
                                    {
                                        xtype: 'radiogroup',
                                        allowBlank: false,
                                        colspan: 2,
                                        width: '100%',
                                        columns: 2,
                                        vertical: true,
                                        simpleValue: true,
                                        value: '',
                                        bind: {
                                            value: '{agreeDetailSpec.type7}'
                                        },
                                        items: [
                                            {
                                                boxLabel: 'ندارد',
                                                name: 'type7',
                                                inputValue: '2',
                                                width: '100%',
                                            },
                                            {
                                                boxLabel: 'دارد',
                                                name: 'type7',
                                                inputValue: '1',
                                                width: '100%',
                                            },
                                        ]
                                    }
                                ]
                            },
                            {
                                xtype: 'cellspacer',
                                colspan: 1
                            },
                            {
                                xtype: 'ttextarea',
                                fieldLabel: 'علت معافیت پزشکی',
                                labelAlign: 'top',
                                name: 'description1',
                                colspan: 1,
                                height: 100,
                                width: '90%',
                                allowBlank: false,
                                bind: {
                                    value: '{agreeDetailSpec.description1}'
                                },
                                style: {
                                    border: '1px solid #c0c0c0',
                                    'border-right': 'solid 5px red !important'
                                }
                            },
                            {
                                xtype: 'ttextarea',
                                fieldLabel: 'سایر مدارک',
                                labelAlign: 'top',
                                name: 'description2',
                                colspan: 1,
                                height: 100,
                                width: '90%',
                                allowBlank: false,
                                bind: {
                                    value: '{agreeDetailSpec.description2}'
                                },
                                style: {
                                    border: '1px solid #c0c0c0',
                                    'border-right': 'solid 5px red !important'
                                }
                            },
                            {
                                xtype: 'ttextfield',
                                fieldLabel: 'شماره تماس',
                                name: 'documentNumber3',
                                allowBlank: false,
                                maxLength: 11,
                                width: '70%',
                                maskRe: /[0-9]/,
                                regex: /[0-9]/,
                                enforceMaxLength: true,
                                bind: {
                                    value: '{agreeDetailSpec.documentNumber3}'
                                },
                                delete: {
                                    cls: 'x-form-clear-trigger',
                                    weight: -2,
                                    handler: function () {
                                        arguments[0].setValue(null);
                                    }
                                }
                            },
                            /*{
                                xtype: 'buttoncontainer',
                                items: [
                                    {
                                        xtype: 'tbutton',
                                        text: 'چاپ 1',
                                        iconCls: 'icon application form magnify',
                                        handler: 'onIntroductionReportButton'
                                    },
                                    {
                                        xtype: 'tbutton',
                                        text: 'چاپ 2',
                                        iconCls: 'icon application form magnify',
                                        handler: 'onAnswerReportButton'
                                    }
                                ]
                            }*/
                        ]
                    },
                ]
            }
        ]
    });
