Ext.define('InsuranceTechnical.view.insAgreement.forms.SpecialGroup14',
    {
        // بیمه شدگان دارای کارت مهارت از وزارت بازرگانی
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
                        fieldLabel: ' مهلت اعتبار (سال)',
                        name: 'type1',
                        allowBlank: false,
                        maxLength: 2,
                        maskRe: /[0-9]/,
                        regex: /[0-9]/,
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
                            value: '{agreeDetailSpec.type1}'
                        }
                    }
                    ,
                    {
                        xtype: 'ttextfield',
                        fieldLabel: 'شماره صدور کارت',
                        name: 'documentNumber1',
                        allowBlank: false,
                        maxLength: 15,
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
                        },
                        bind: {
                            value: '{agreeDetailSpec.documentNumber1}'
                        }
                    },
                    {
                        xtype: 'tdatefield',
                        fieldLabel: 'تاریخ صدور کارت',
                        name: 'documentDate1',
                        allowBlank: false,
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
                        xtype: 'tdatefield',
                        fieldLabel: 'تاریخ شروع اعتبار',
                        name: 'documentStartDate',
                        allowBlank: false,
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
                            value: '{agreeDetailSpec.documentStartDate}'
                        },
                        validator: function(fieldValue) {
                            if (!fieldValue) return false;
                            fieldValue = new Date(InsuranceTechnical.tamin.helpers.Persian.taminDateToGregorian(fieldValue));
                            var regDateInput = this.up('insurance-agreement-new-main').getViewModel().get('agreeDetailSpec.documentDate1');
                            if (!regDateInput) {
                                InsuranceTechnical.tamin.window.MessageBox.showError('خطا', 'تاریخ صدور کارت را انتخاب کنید.');
                                this.reset();
                                return false;
                            }
                            var bound = new Date(regDateInput);
                            return fieldValue.getTime() === bound.getTime();
                        }
                    },
                    {
                        xtype: 'tdatefield',
                        fieldLabel: 'تاریخ پایان اعتبار',
                        name: 'documentEndDate',
                        allowBlank: false,
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
                        validator: function(fieldValue) {
                            if (!fieldValue) return false;
                            fieldValue = new Date(InsuranceTechnical.tamin.helpers.Persian.taminDateToGregorian(fieldValue));
                            var regDate = this.up('insurance-agreement-new-main').getViewModel().get('agreeDetailSpec.documentDate1');
                            var expireYearCount = Number(this.up('insurance-agreement-new-main').getViewModel().get('agreeDetailSpec.type1'));
                            if (expireYearCount && expireYearCount > 0 && regDate) {
                                var start = new Date(regDate);
                                var expireDate = moment(start).add(expireYearCount, 'jYear').toDate();
                                return fieldValue.getTime() === expireDate.getTime();
                            } else {
                                InsuranceTechnical.tamin.window.MessageBox.showError('خطا', 'مدت اعتبار یا تاریخ صدور کارت نادرست میباشد.');
                                this.reset();
                                return false;
                            }
                        }
                    }
                ]
            }
        ]
    });
