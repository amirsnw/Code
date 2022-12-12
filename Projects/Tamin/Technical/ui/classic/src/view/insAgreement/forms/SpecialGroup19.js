Ext.define('InsuranceTechnical.view.insAgreement.forms.SpecialGroup19',
    {
        // همسر و فرزند شهید
        extend: 'InsuranceTechnical.tamin.panel.Panel',
        viewModel: 'insAgreement-spec-model',
        items: [
            {
                xtype: 'tfieldset',
                title: '',
                border: false,
                defaults: {
                    labelWidth: 150,
                    width: '95%'
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
                        fieldLabel: 'کارگاه دستگاه اجرایی',
                        name: 'type1',
                        valueField: 'value',
                        displayField: 'name',
                        forceSelection: true,
                        allowBlank: false,
                        editable: false,
                        width: '35%',
                        bind: {
                            value: '{agreeDetailSpec.type1}'
                        },
                        store: {
                            fields: ['name', 'value'],
                            data: [
                                {name: 'نمی باشد', value: '0'},
                                {name: 'می باشد', value: '1'}
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
                        xtype: 'cellspacer',
                        colspan: 2
                    },
                    {
                        xtype: 'tcombobox',
                        fieldLabel: "نسبت با شهید",
                        name: 'type2',
                        valueField: 'value',
                        displayField: 'name',
                        forceSelection: true,
                        allowBlank: false,
                        editable: false,
                        width: '35%',
                        bind: {
                            value: '{agreeDetailSpec.type2}'
                        },
                        store: {
                            fields: ['name', 'value'],
                            data: [
                                {name: 'فرزند شهید می باشد', value: '0'},
                                {name: 'همسر شهید می باشد', value: '1'}
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
                        xtype: 'cellspacer',
                        colspan: 2
                    },
                    {
                        xtype: 'tfieldset',
                        title: 'دادنامه دیوان عدالت اداری',
                        width: '70%',
                        colspan: 3,
                        defaults: {
                            labelWidth: 190
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
                                xtype: 'ttextfield',
                                fieldLabel: ' شماره',
                                name: 'documentNumber1',
                                allowBlank: false,
                                maskRe: /[0-9]/,
                                regex: /[0-9]/,
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
                                    value: '{agreeDetailSpec.documentNumber1}'
                                }
                            },
                            {
                                xtype: 'tdatefield',
                                fieldLabel: 'تاریخ',
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
                                },
                                validator: function(fieldValue) {
                                    fieldValue = new Date(InsuranceTechnical.tamin.helpers.Persian.taminDateToGregorian(fieldValue));
                                    var bound = new Date();
                                    return fieldValue <= bound;
                                }
                            }]
                    },
                    /*{
                        xtype: 'cellspacer',
                        colspan: 1
                    },*/
                    {
                        xtype: 'tfieldset',
                        title: 'رای کمیسیون ماده 16 بنیاد شهید',
                        width: '70%',
                        colspan: 3,
                        defaults: {
                            labelWidth: 190
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
                                xtype: 'ttextfield',
                                fieldLabel: 'شماره',
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
                                fieldLabel: 'تاریخ',
                                name: 'documentDate2',
                                allowBlank: false,
                                width: '95%',
                                bind: {
                                    value: '{agreeDetailSpec.documentDate2}'
                                },
                                validator: function(fieldValue) {
                                    fieldValue = new Date(InsuranceTechnical.tamin.helpers.Persian.taminDateToGregorian(fieldValue));
                                    var bound = new Date();
                                    return fieldValue <= bound;
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
                            }
                        ]
                    },
                    /*{
                        xtype: 'cellspacer',
                        colspan: 1
                    },*/
                    {
                        xtype: 'tfieldset',
                        title: 'ثبت دفتر شعبه (رای کمیسیون ماده 16 بنیاد شهید/دادنامه دیوان عدالت اداری)',
                        width: '70%',
                        colspan: 3,
                        defaults: {
                            labelWidth: 190
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
                                xtype: 'ttextfield',
                                fieldLabel: 'شماره',
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
                                fieldLabel: 'تاریخ',
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
                            }
                        ]
                    }
                ]
            }
        ]
    });
