Ext.define('InsuranceTechnical.view.insAgreement.forms.SpecialGroup17',
    {
        // بسته رونق اشتغال / ماده 71 / کارورزان
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
                    {
                        xtype: 'tfieldset',
                        title: 'اطلاعات معرفی نامه اداره کل تعاون کار و رفاه اجتماعی',
                        width: '90%',
                        colspan: 3,
                        defaults: {
                            labelWidth: 170
                        },
                        layout: {
                            type: 'table',
                            columns: 3,
                            tableAttrs: {
                                style: {
                                    width: '90%'
                                }
                            }
                        },
                        items: [
                            {
                                xtype: 'ttextfield',
                                fieldLabel: 'شماره کارت کارورزی',
                                name: 'documentNumber1',
                                allowBlank: false,
                                maskRe: /[0-9]/,
                                regex: /[0-9]/,
                                width: '95%',
                                bind: {
                                    value: '{agreeDetailSpec.documentNumber1}'
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
                                fieldLabel: 'تاریخ کارت کارورزی',
                                name: 'documentDate1',
                                allowBlank: false,
                                width: '95%',
                                triggers: {
                                    delete: {
                                        cls: 'x-form-clear-trigger',
                                        weight: -2,
                                        handler: function () {
                                            arguments[0].setValue(null);
                                        }
                                    }
                                },
                                bind: {
                                    value: '{agreeDetailSpec.documentDate1}'
                                }
                            },
                            {
                                xtype: 'tdisplayfield',
                                fieldLabel: 'شناسه مجوز واحد پذیرنده',
                                width: '95%',
                                bind: {
                                    value: '{agreeDetailSpec.description1}'
                                }
                            }
                        ]
                    },
                    {
                        xtype: 'tfieldset',
                        title: 'اطلاعات کارورز',
                        width: '90%',
                        colspan: 3,
                        defaults: {
                            labelWidth: 150,
                            width: '80%'
                        },
                        layout: {
                            type: 'table',
                            columns: 3,
                            tableAttrs: {
                                style: {
                                    width: '90%'
                                }
                            }
                        },
                        items: [
                            {
                                xtype: 'tdisplayfield',
                                fieldLabel: 'شناسه قرارداد',
                                width: '95%',
                                bind: {
                                    value: '{agreeDetailSpec.description2}'
                                }
                            },
                            {
                                xtype: 'tdisplayfield',
                                fieldLabel: 'شناسه مجوز آموزشی',
                                width: '95%',
                                bind: {
                                    value: '{agreeDetailSpec.description3}'
                                }
                            },
                            {
                                xtype: 'cellspacer',
                                colspan: 1
                            },
                            {
                                xtype: 'tcombobox',
                                fieldLabel: 'استان',
                                allowBlank: false,
                                name: 'type5',
                                id: 'province',
                                displayField: 'description',
                                valueField: 'code',
                                editable: true,
                                pageSize: 10,
                                minChars: 2,
                                maskRe: /[^a-zA-Z]/,
                                width: '95%',
                                matchFieldWidth: true,
                                bind: {
                                    store: '{provinceStore}',
                                    value: '{agreeDetailSpec.type5}'
                                },
                                displayTpl: Ext.create('Ext.XTemplate',
                                    '<tpl for=".">',
                                    '{code} - {description}',
                                    '</tpl>'
                                ),
                                tpl: Ext.create('Ext.XTemplate',
                                    '<tpl for=".">',
                                    '<div class="x-boundlist-item">',
                                    '{code} - {description}',
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
                                },
                                listeners: {
                                    beforequery: 'beforeProvinceQuery'
                                }
                            },
                            {
                                xtype: 'tcombobox',
                                fieldLabel: 'شهرستان',
                                allowBlank: false,
                                name: 'documentNumber5',
                                id: 'city',
                                displayField: 'description',
                                valueField: 'code',
                                editable: true,
                                pageSize: 10,
                                minChars: 2,
                                maskRe: /[^a-zA-Z]/,
                                width: '95%',
                                matchFieldWidth: true,
                                bind: {
                                    store: '{cityStore}',
                                    value: '{agreeDetailSpec.documentNumber5}'
                                },
                                displayTpl: Ext.create('Ext.XTemplate',
                                    '<tpl for=".">',
                                    '{code} - {description}',
                                    '</tpl>'
                                ),
                                tpl: Ext.create('Ext.XTemplate',
                                    '<tpl for=".">',
                                    '<div class="x-boundlist-item">',
                                    '{code} - {description}',
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
                                },
                                listeners: {
                                    beforequery: 'beforeCityQuery'
                                }
                            },
                            {
                                xtype: 'tcombobox',
                                fieldLabel: 'شغل کارورز ',
                                valueField: 'jobCode',
                                displayField: 'jobDesc',
                                forceSelection: true,
                                allowBlank: false,
                                pageSize: 10,
                                width: '95%',
                                bind: {
                                    store: '{jobStore}',
                                    value: '{agreeDetailSpec.documentNumber4}'
                                },
                                displayTpl: Ext.create('Ext.XTemplate',
                                    '<tpl for=".">',
                                    '{jobDesc}',
                                    '</tpl>'
                                ),
                                tpl: Ext.create('Ext.XTemplate',
                                    '<tpl for=".">',
                                    '<div class="x-boundlist-item">',
                                    '{jobDesc}',
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
                                xtype: 'tdatefield',
                                fieldLabel: 'تاریخ شروع کارورزی',
                                name: 'documentStartDate',
                                allowBlank: false,
                                width: '95%',
                                triggers: {
                                    delete: {
                                        cls: 'x-form-clear-trigger',
                                        weight: -2,
                                        handler: function () {
                                            arguments[0].setValue(null);
                                        }
                                    }
                                },
                                bind: {
                                    value: '{agreeDetailSpec.documentStartDate}',
                                },
                                validator: function(startDate) {
                                    if (!startDate) return true;
                                    var bound;
                                    var checkStartDate = false;
                                    var endDate = this.up('insurance-agreement-new-main').getViewModel().get('agreeDetailSpec.documentEndDate');
                                    var introductionLetterDate = this.up('insurance-agreement-new-main').getViewModel().get('headerSpec.introductionLetterDate');
                                    if (endDate) {
                                        checkStartDate = true;
                                    }
                                    if (!introductionLetterDate) {
                                        InsuranceTechnical.tamin.window.MessageBox.showError('خطا', 'ابتدا تاریخ معرفی نامه را انتخاب نمایید.');
                                        this.reset();
                                        return false;
                                    }
                                    endDate = new Date(endDate);
                                    startDate = new Date(InsuranceTechnical.tamin.helpers.Persian.taminDateToGregorian(startDate));
                                    if (introductionLetterDate instanceof Date) {
                                        bound = new Date(introductionLetterDate);
                                    } else {
                                        bound = new Date(InsuranceTechnical.tamin.helpers.Persian.taminDateToGregorian(introductionLetterDate));
                                    }
                                    return startDate < bound && (checkStartDate && endDate > startDate || !checkStartDate);
                                },
                                listeners: {
                                    change: 'changeJobDate'
                                }
                            },
                            {
                                xtype: 'tdatefield',
                                fieldLabel: 'تاریخ پایان کارورزی',
                                name: 'documentEndDate',
                                allowBlank: false,
                                width: '95%',
                                triggers: {
                                    delete: {
                                        cls: 'x-form-clear-trigger',
                                        weight: -2,
                                        handler: function () {
                                            arguments[0].setValue(null);
                                        }
                                    }
                                },
                                bind: {
                                    value: '{agreeDetailSpec.documentEndDate}'
                                },
                                validator: function(endDate) {
                                    if (!endDate) return true;
                                    var bound;
                                    var checkStartDate = false;
                                    var startDate = this.up('insurance-agreement-new-main').getViewModel().get('agreeDetailSpec.documentStartDate');
                                    var introductionLetterDate = this.up('insurance-agreement-new-main').getViewModel().get('headerSpec.introductionLetterDate');
                                    if (startDate) {
                                        checkStartDate = true;
                                    }
                                    if (!introductionLetterDate) {
                                        InsuranceTechnical.tamin.window.MessageBox.showError('خطا', 'ابتدا تاریخ معرفی نامه را انتخاب نمایید.');
                                        this.reset();
                                        return false;
                                    }
                                    startDate = new Date(startDate);
                                    endDate = new Date(InsuranceTechnical.tamin.helpers.Persian.taminDateToGregorian(endDate));

                                    if (introductionLetterDate instanceof Date) {
                                        bound = new Date(introductionLetterDate);
                                    } else {
                                        bound = new Date(InsuranceTechnical.tamin.helpers.Persian.taminDateToGregorian(introductionLetterDate));
                                    }
                                    return endDate <= bound && (checkStartDate && endDate > startDate || !checkStartDate);
                                },
                                listeners: {
                                    change: 'changeJobDate'
                                }
                            },
                            {
                                xtype: 'tdisplayfield',
                                fieldLabel: 'مدت دوره',
                                width: '95%',
                                bind: {
                                    value: '{agreeDetailSpec.type4}'
                                }
                            }
                        ]
                    },
                    {
                        xtype: 'tfieldset',
                        title: 'اطلاعات مدرک تحصیلی',
                        width: '90%',
                        colspan: 3,
                        defaults: {
                            labelWidth: 150,
                            width: '80%'
                        },
                        layout: {
                            type: 'table',
                            columns: 3,
                            tableAttrs: {
                                style: {
                                    width: '90%'
                                }
                            }
                        },
                        items: [
                            {
                                xtype: 'tcombobox',
                                fieldLabel: 'مقطع تحصیلی ',
                                valueField: 'educationCode',
                                displayField: 'educationDesc',
                                forceSelection: true,
                                allowBlank: false,
                                pageSize: 10,
                                width: '95%',
                                bind: {
                                    store: '{educationStore}',
                                    value: '{agreeDetailSpec.type3}'
                                },
                                displayTpl: Ext.create('Ext.XTemplate',
                                    '<tpl for=".">',
                                    '{educationDesc}',
                                    '</tpl>'
                                ),
                                tpl: Ext.create('Ext.XTemplate',
                                    '<tpl for=".">',
                                    '<div class="x-boundlist-item">',
                                    '{educationDesc}',
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
                                },
                                validator: function(fieldValue) {
                                    if (!fieldValue) return true;
                                    var fieldCode = this.getValue();
                                    if (Number(fieldCode) < 20) {
                                        InsuranceTechnical.tamin.window.MessageBox.showError('خطا', 'ميزان تحصيلات فقط مي تواند ليسانس , فوق ليسانس و دکترا انتخاب گردد.');
                                        this.reset();
                                        return false;
                                    }
                                    return true;
                                }
                            },
                            {
                                xtype: 'ttextfield',
                                fieldLabel: 'رشته تحصیلی',
                                name: 'description4',
                                allowBlank: false,
                                width: '95%',
                                bind: {
                                    value: '{agreeDetailSpec.description4}'
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
                                fieldLabel: 'تاریخ فارق التحصیلی',
                                name: 'documentDate4',
                                allowBlank: false,
                                width: '95%',
                                triggers: {
                                    delete: {
                                        cls: 'x-form-clear-trigger',
                                        weight: -2,
                                        handler: function () {
                                            arguments[0].setValue(null);
                                        }
                                    }
                                },
                                bind: {
                                    value: '{agreeDetailSpec.documentDate4}'
                                }
                            },
                            {
                                xtype: 'ttextfield',
                                fieldLabel: 'شماره مدرک تحصیلی',
                                name: 'documentNumber2',
                                allowBlank: false,
                                maskRe: /[0-9]/,
                                regex: /[0-9]/,
                                width: '95%',
                                bind: {
                                    value: '{agreeDetailSpec.documentNumber2}'
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
                                fieldLabel: 'تاریخ مدرک تحصیلی',
                                name: 'documentDate2',
                                allowBlank: false,
                                width: '95%',
                                triggers: {
                                    delete: {
                                        cls: 'x-form-clear-trigger',
                                        weight: -2,
                                        handler: function () {
                                            arguments[0].setValue(null);
                                        }
                                    }
                                },
                                bind: {
                                    value: '{agreeDetailSpec.documentDate2}'
                                }
                            }
                        ]
                    },
                    {
                        xtype: 'tfieldset',
                        title: 'اطلاعات خدمت نظام وظیفه',
                        width: '90%',
                        colspan: 3,
                        defaults: {
                            labelWidth: 150,
                            width: '80%'
                        },
                        layout: {
                            type: 'table',
                            columns: 3,
                            tableAttrs: {
                                style: {
                                    width: '90%'
                                }
                            }
                        },
                        bind: {
                            disabled: '{personInfo.noMilitary}',
                        },
                        items: [
                            {
                                xtype: 'tcombobox',
                                fieldLabel: 'دوره نظام وظیفه',
                                name: 'type1',
                                valueField: 'value',
                                displayField: 'name',
                                forceSelection: true,
                                allowBlank: false,
                                editable: false,
                                width: '95%',
                                bind: {
                                    value: '{agreeDetailSpec.type1}'
                                },
                                store: {
                                    fields: ['name', 'value'],
                                    data: [
                                        {name: 'گذرانده است', value: '1'},
                                        {name: 'نگذرانده است', value: '0'}
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
                                xtype: 'tcombobox',
                                fieldLabel: 'وضعیت کارت نظام وظیفه',
                                name: 'type2',
                                valueField: 'value',
                                displayField: 'name',
                                forceSelection: true,
                                allowBlank: false,
                                editable: false,
                                width: '95%',
                                bind: {
                                    value: '{agreeDetailSpec.type2}'
                                },
                                store: {
                                    fields: ['name', 'value'],
                                    data: [
                                        {name: 'دارای کارت پایان خدمت', value: '1'},
                                        {name: 'دارای کارت معافیت', value: '2'}
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
                                xtype: 'ttextfield',
                                fieldLabel: 'شماره کارت',
                                name: 'documentNumber3',
                                allowBlank: false,
                                maskRe: /[0-9]/,
                                regex: /[0-9]/,
                                width: '95%',
                                bind: {
                                    value: '{agreeDetailSpec.documentNumber3}'
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
                                fieldLabel: 'تاریخ صدور کارت',
                                name: 'documentDate3',
                                allowBlank: false,
                                width: '95%',
                                triggers: {
                                    delete: {
                                        cls: 'x-form-clear-trigger',
                                        weight: -2,
                                        handler: function () {
                                            arguments[0].setValue(null);
                                        }
                                    }
                                },
                                bind: {
                                    value: '{agreeDetailSpec.documentDate3}'
                                }
                            },
                            {
                                xtype: 'tdatefield',
                                fieldLabel: 'دوره خدمت از تاریخ',
                                name: 'documentStartDate1',
                                allowBlank: false,
                                width: '95%',
                                triggers: {
                                    delete: {
                                        cls: 'x-form-clear-trigger',
                                        weight: -2,
                                        handler: function () {
                                            arguments[0].setValue(null);
                                        }
                                    }
                                },
                                bind: {
                                    value: '{agreeDetailSpec.documentStartDate1}',
                                    disabled: '{agreeDetailSpec.type1 === "0"}'
                                }
                            },
                            {
                                xtype: 'tdatefield',
                                fieldLabel: 'دوره خدمت تا تاریخ',
                                name: 'documentEndDate1',
                                allowBlank: false,
                                width: '95%',
                                triggers: {
                                    delete: {
                                        cls: 'x-form-clear-trigger',
                                        weight: -2,
                                        handler: function () {
                                            arguments[0].setValue(null);
                                        }
                                    }
                                },
                                bind: {
                                    value: '{agreeDetailSpec.documentEndDate1}',
                                    disabled: '{agreeDetailSpec.type1 === "0"}'
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    });
