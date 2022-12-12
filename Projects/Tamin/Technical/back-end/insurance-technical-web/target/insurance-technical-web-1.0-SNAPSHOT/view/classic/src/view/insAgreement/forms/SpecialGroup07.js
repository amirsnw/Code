Ext.define('InsuranceTechnical.view.insAgreement.forms.SpecialGroup07',
    {
        // شاعران و مداحان
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
                        validator: function(fieldValue) {
                            fieldValue = new Date(InsuranceTechnical.tamin.helpers.Persian.taminDateToGregorian(fieldValue));
                            var introductionLetterDate = this.up('insurance-agreement-new-main').getViewModel().get('headerSpec.introductionLetterDate');
                            if (!introductionLetterDate) {
                                InsuranceTechnical.tamin.window.MessageBox.showError('خطا', 'ابتدا تاریخ معرفی نامه را انتخاب نمایید.');
                                this.reset();
                                return false;
                            }
                            var start = new Date(introductionLetterDate);
                            var end = new Date();
                            return fieldValue >= start && fieldValue <= end;
                        },
                        delete: {
                            cls: 'x-form-clear-trigger',
                            weight: -2,
                            handler: function () {
                                arguments[0].setValue(null);
                            }
                        }
                    }
                ]
            }
        ]
    });
