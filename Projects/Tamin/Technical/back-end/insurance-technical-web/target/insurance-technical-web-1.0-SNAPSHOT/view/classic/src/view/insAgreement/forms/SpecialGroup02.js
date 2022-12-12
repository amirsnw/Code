Ext.define('InsuranceTechnical.view.insAgreement.forms.SpecialGroup02',
    {
        // اعضا سازمان نظام پزشکی
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
                        fieldLabel: 'شماره صدور کارت نظام',
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
                        xtype: 'tdatefield',
                        fieldLabel: 'تاریخ صدور کارت نظام',
                        name: 'documentDate1',
                        allowBlank: false,
                        bind: {
                            value: '{agreeDetailSpec.documentDate1}'
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
                    },
                    {
                        xtype: 'ttextfield',
                        fieldLabel: 'شرح تخصص',
                        name: 'description1',
                        maxLength: 15,
                        maskRe: /[\u0600-\u06FF\s]/,
                        regex: /[\u0600-\u06FF\s]/,
                        enforceMaxLength: true,
                        allowBlank: false,
                        bind: {
                            value: '{agreeDetailSpec.description1}'
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
                        xtype: 'tcombobox',
                        fieldLabel: 'شغل',
                        name: 'type3',
                        valueField: 'jobCode',
                        displayField: 'jobDesc',
                        forceSelection : true,
                        allowBlank: false,
                        editable: false,
                        pageSize: 10,
                        bind: {
                            store: '{doctorJobStore}',
                            value: '{agreeDetailSpec.type3}'
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
