Ext.define('InsuranceTechnical.view.insAgreement.forms.SpecialGroup10',
    {
        // انجمن صنفی نمایندگان بیمه ایران
        extend: 'InsuranceTechnical.tamin.panel.Panel',
        viewModel: 'insAgreement-spec-model',
        items: [
            {
                xtype: 'tfieldset',
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
                        fieldLabel: 'نوع نمایندگی',
                        name: 'type1',
                        valueField: 'value',
                        displayField: 'name',
                        forceSelection : true,
                        allowBlank: false,
                        editable: false,
                        width: '30%',
                        bind: {
                            value: '{agreeDetailSpec.type1}'
                        },
                        store: {
                            fields: ['name', 'value'],
                            data: [
                                {name: 'درجه یک', value: '1'},
                                {name: 'درجه دو', value: '2'},
                                {name: 'درجه سه', value: '3'}
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
