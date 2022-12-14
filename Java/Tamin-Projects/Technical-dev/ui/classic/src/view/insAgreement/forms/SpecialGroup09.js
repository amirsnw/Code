Ext.define('InsuranceTechnical.view.insAgreement.forms.SpecialGroup09',
    {
        // باربران
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
                        xtype: 'tcombobox',
                        fieldLabel: 'مرجع معرفی کننده',
                        name: 'type1',
                        valueField: 'refrenceId',
                        displayField: 'refrenceDesc',
                        forceSelection : true,
                        allowBlank: false,
                        editable: false,
                        pageSize: 10,
                        width: '75%',
                        bind: {
                            store: '{introductoryReferenceStore}',
                            value: '{agreeDetailSpec.type1}'
                        },
                        displayTpl: Ext.create('Ext.XTemplate',
                            '<tpl for=".">',
                            '{refrenceDesc}',
                            '</tpl>'
                        ),
                        tpl: Ext.create('Ext.XTemplate',
                            '<tpl for=".">',
                            '<div class="x-boundlist-item">',
                            '{refrenceDesc}',
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
                    },
                    {
                        xtype: 'ttextfield',
                        fieldLabel: 'محل اشتغال',
                        name: 'description1',
                        allowBlank: false,
                        maxLength: 15,
                        maskRe: /[\u0600-\u06FF\s]/,
                        regex: /[\u0600-\u06FF\s]/,
                        enforceMaxLength: true,
                        width: '75%',
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
                    }
                ]
            }
        ]
    });
