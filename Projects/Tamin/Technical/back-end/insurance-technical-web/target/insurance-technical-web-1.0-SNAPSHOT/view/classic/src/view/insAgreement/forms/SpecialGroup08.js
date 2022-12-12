Ext.define('InsuranceTechnical.view.insAgreement.forms.SpecialGroup08',
    {
        // جانباز
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
                        xtype: 'ttextfield',
                        fieldLabel: 'شماره کارت جانبازی',
                        name: 'documentNumber1',
                        allowBlank: false,
                        maxLength: 15,
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
                        xtype: 'ttextfield',
                        fieldLabel: 'کد جانبازی',
                        name: 'documentNumber2',
                        allowBlank: false,
                        maxLength: 10,
                        maskRe: /[0-9]/,
                        regex: /[0-9]/,
                        enforceMaxLength: true,
                        bind: {
                            value: '{agreeDetailSpec.documentNumber2}'
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
                        xtype: 'ttextfield',
                        fieldLabel: 'درصد جانبازی (%)',
                        name: 'type3',
                        allowBlank: false,
                        maxLength: 2,
                        minLength: 1,
                        maskRe: /[0-9]/,
                        regex: /[0-9]/,
                        enforceMaxLength: true,
                        bind: {
                            value: '{agreeDetailSpec.type3}'
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
                        fieldLabel: 'تاریخ  صدور',
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
                        },
                        validator: function(fieldValue) {
                            fieldValue = new Date(InsuranceTechnical.tamin.helpers.Persian.taminDateToGregorian(fieldValue));
                            var bound = new Date();
                            return fieldValue <= bound;
                        }
                    },
                    {
                        xtype: 'tcombobox',
                        fieldLabel: 'نوع کارگاه',
                        name: 'type1',
                        valueField: 'value',
                        displayField: 'name',
                        forceSelection : true,
                        allowBlank: false,
                        editable: false,
                        bind: {
                            value: '{agreeDetailSpec.type1}'
                        },
                        store: {
                            fields: ['name', 'value'],
                            data: [
                                {name: 'دولتی', value: '0'},
                                {name: 'غیردولتی', value: '1'}
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
                        fieldLabel: 'کسری از ساعت کار',
                        name: 'type2',
                        valueField: 'value',
                        displayField: 'name',
                        forceSelection : true,
                        allowBlank: false,
                        editable: false,
                        bind: {
                            value: '{agreeDetailSpec.type2}'
                        },
                        validator: function(fieldValue) {
                            if (!fieldValue || fieldValue === 'ندارد') return true;
                            var disabilityPercent = Number(this.up('insurance-agreement-new-main').getViewModel().get('agreeDetailSpec.type3'));
                            if (disabilityPercent && disabilityPercent >= 25) {
                                return true;
                            } else {
                                InsuranceTechnical.tamin.window.MessageBox.showError('خطا', 'جانبازان با درصد جانبازي 25 و بيشتر مي توانند از كسري ساعت كار استفاده نمايند.');
                                this.reset();
                                return false;
                            }
                        },
                        store: {
                            fields: ['name', 'value'],
                            data: [
                                {name: 'دارد', value: '1'},
                                {name: 'ندارد', value: '0'}
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
            }
        ]
    });
