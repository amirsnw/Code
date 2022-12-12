Ext.define('InsuranceTechnical.view.insAgreement.forms.SpecialGroup13',
    {
        // گروه های توافقی
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
                        fieldLabel: 'شماره معرفینامه',
                        maskRe: /[0-9]/,
                        regex: /[0-9]/,
                        enforceMaxLength: true,
                        allowBlank: false,
                        msgTarget: 'side',
                        bind: {
                            value: '{agreeDetailSpec.documentNumber1}'
                        }
                    },
                    {
                        xtype: 'tdatefield',
                        fieldLabel: 'تاریخ معرفینامه',
                        allowBlank: false,
                        bind: {
                            value: '{agreeDetailSpec.documentDate1}'
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
                ]
            }
        ]
    });
