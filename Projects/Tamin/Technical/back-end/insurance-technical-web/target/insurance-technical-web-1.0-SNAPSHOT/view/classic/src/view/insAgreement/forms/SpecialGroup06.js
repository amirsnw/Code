Ext.define('InsuranceTechnical.view.insAgreement.forms.SpecialGroup06',
    {
        // سرویسکاران مجاز بوتان
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
                        fieldLabel: 'درجه بندی شغلی',
                        name: 'type1',
                        valueField: 'value',
                        displayField: 'name',
                        forceSelection : true,
                        allowBlank: false,
                        editable: false,
                        width: '30%',
                        store: {
                            fields: ['name', 'value'],
                            data: [
                                {name: 'استادکار درجه یک', value: '01'},
                                {name: 'استادکار درجه دو', value: '02'},
                                {name: 'استادکار درجه سه', value: '03'}
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
                        },
                        bind: {
                            value: '{agreeDetailSpec.type1}'
                        }
                    }
                ]
            }
        ]
    });
