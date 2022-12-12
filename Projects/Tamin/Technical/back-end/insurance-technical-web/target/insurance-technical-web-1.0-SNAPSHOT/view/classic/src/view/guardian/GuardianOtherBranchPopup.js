Ext.define('InsuranceTechnical.view.guardian.GuardianOtherBranchPopup',
    {
        extend: 'InsuranceTechnical.tamin.window.Window',
        title: 'ارجاع به شعبه بررسی کننده',
        xtype: 'guardian-other-branch',
        id: 'guardianOtherBranchPopup',
        width: '55%',
        modal: true,
        bodyPadding: 5,
        closeAction: 'hide',
        reference: 'guardianOtherBranchPopup',
        autoScroll: true,
        defaultFocus: 'deffocus',
        items: [
            {
                xtype: 'tform',
                id: 'guardian-form-other',
                items: [
                    {
                        xtype: 'tfieldset',
                        defaults: {
                            labelWidth: 110,
                            width: '96%',
                            margin: 5,
                        },
                        layout: {
                            type: 'table',
                            columns: 2,
                            tableAttrs: {
                                style: {width: '98'}
                            }
                        },
                        items: [
                            {
                                xtype: 'tdisplayfield',
                                fieldLabel: 'شماره بیمه',
                                name: 'insurancId.id',
                                // maxLength: 10,
                                // minLength: 10,
                                maskRe: /[0-9]/,
                                regex: /[0-9]/,
                                //enforceMaxLength: 20
                                enforceMaxLength: true,
                                msgTarget: 'side',
                                minLengthText: 'شماره بیمه ده رقمی میباشد.',
                                bind: {
                                    value: '{guardianInfo.insuranceId}'
                                },
                                triggers: {
                                    lookup: {
                                        cls: 'x-form-search-trigger',
                                        weight: -1,
                                        handler: function () {
                                            var me = this;
                                            var container = me.up('guardian-spec');
                                            var win = container.lookupReference('InsuredPersonPopup');
                                            if (!win) {
                                                win = Ext.create('InsuranceTechnical.view.soldier.InsuredPersonPopup');
                                                container.add(win);
                                            }
                                            win.setCallback(function () {
                                                if (win.selectedItem !== null) {
                                                    me.setValue(win.selectedItem.data.id);
                                                }
                                            });
                                            win.show();
                                        }
                                    }
                                }
                            },
                            {
                                xtype: 'tdisplayfield',
                                bind: {
                                    value: '{guardianName}'
                                }
                            },
                            {
                                xtype: 'tdisplayfield',
                                fieldLabel: 'شماره درخواست',
                                bind: {
                                    value: '{guardianInfo.reqNo}'
                                }
                            },
                            {
                                xtype: 'timestampdatefield',
                                fieldLabel: 'تاریخ درخواست',
                                editable: false,
                                focusable: false,
                                bind: {
                                    value: '{guardianInfo.reqDate}',
                                },
                                valuePublishEvent: ['select', 'change'],
                            },
                        ]
                    },
                    {
                        xtype: 'tfieldset',
                        defaults: {
                            labelWidth: 110,
                            width: '48%',
                            margin: 5,
                        },
                        layout: {
                            type: 'table',
                            columns: 2,
                            tableAttrs: {
                                style: {width: '98'}
                            }
                        },
                        items: [
                            {
                                xtype: 'tcombobox',
                                fieldLabel: 'شعبه بررسی کننده',
                                displayField: 'branchName',
                                valueField: 'branchCode',
                                id: 'testx',
                                editable: true,
                                labelWidth: 140,
                                // disabled: true,
                                allowBlank: false,
                                emptyText: 'قسمتی از نام یا کد شعبه...',
                                pageSize: 5,
                                minChars: 2,
                                bind: {
                                    store: '{branchStore2}',
                                    value: '{guardianInfo.branchResponder}'
                                },
                                tpl: Ext.create('Ext.XTemplate',
                                    '<tpl for=".">',
                                    '<div class="x-boundlist-item">',
                                    '{branchCode} : {branchName}',
                                    '</div>',
                                    '</tpl>'
                                ),
                            },
                        ]
                    },
                    {
                        xtype: 'buttoncontainer',
                        items: [
                            {
                                xtype: 'button',
                                text: 'ذخیره',
                                iconCls: 'icon save',
                                handler: 'saveOtherBranch'
                            },
                            {
                                xtype: 'button',
                                text: 'بازگشت',
                                iconCls: 'icon cancel',
                                handler: 'onCancelButton'
                            }
                        ]
                    }
                ]
            }
        ]
    });
