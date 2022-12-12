Ext.define('InsuranceTechnical.view.guardian.GuardianProvDocumentPopup',
    {
        extend: 'InsuranceTechnical.tamin.window.Window',
        title: 'مستندات مربوطه',
        xtype: 'guardian-prov-document',
        id: 'guardianProvDocumentPopup',
        width: '65%',
        modal: true,
        bodyPadding: 5,
        closeAction: 'destroy',
        reference: 'guardian-Prov-Doc-ref',
        items: [
            {
                xtype: 'tform',
                id: 'guardian-prov-document-form',
                items: [
                    {
                        xtype: 'tfieldset',
                        title: 'اطلاعات هویتی بیمه شده',
                        defaults: {
                            width: '90%',
                            margin: '4%',
                            labelWidth: 140,
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
                                xtype: 'tdisplayfield',
                                fieldLabel: 'کد ملی',
                                bind: {
                                    value: '{guardianInfo.nationalCode}'
                                }
                            },
                            {
                                xtype: 'tdisplayfield',
                                fieldLabel: 'نام و نام خانوادگی',
                                bind: {
                                    value: '{guardianName}'
                                }
                            },
                            {
                                xtype: 'tdisplayfield',
                                fieldLabel: 'شماره بیمه',
                                bind: {
                                    value: '{guardianInfo.insuranceId}'
                                }
                            },
                            {
                                xtype: 'tdisplayfield',
                                fieldLabel: 'شعبه',
                                bind: {
                                    value: '{guardianInfo.branchCode}'
                                }
                            }
                        ]
                    },
                    {
                        xtype: 'tform',
                        // title: 'اسناد مربوطه',
                        width: '90%',
                        height: 360,
                        defaults: {
                            margin: '5%',
                            width: '99%',
                        },
                        layout: {
                            type: 'table',
                            columns: 1,
                            tableAttrs: {
                                style: {width: '99%'}
                            }
                        },
                        items: [
                            {
                                xtype: 'filefield',
                                id: 'insCaseUploadDoc',
                                emptyText: 'سند را انتخاب کنید ...',
                                width: '70%',
                                labelWidth: 140,
                                fieldLabel: 'مسیر سند انتخاب شده',
                                name: 'photo-path',
                                accept: 'image',
                                anchor: '100%',
                                buttonText: 'انتخاب سند ...',
                                buttonAlign: 'center',
                                buttonConfig: {
                                    iconCls: 'icon hourglass_go',
                                },
                                listeners: {change: 'uploadDocument'}
                            },
                            {
                                xtype: 'fieldset',
                                title: 'نمایش اسناد',
                                // collapsed: true,
                                // collapsible: true,
                                overflowY: 'scroll',
                                layout: 'anchor',
                                defaults: {
                                    anchor: '100%'
                                },
                                padding: 5,
                                width: '80%',
                                height: 300,
                                border: 2,
                                style: {
                                    borderColor: 'slategray',
                                    borderStyle: 'solid'
                                },
                                items: [
                                    {
                                        xtype: 'previewimageview',
                                        trackOver: true,
                                        id: 'document-preview-image-view',
                                        bind: {
                                            store: '{imageStore}'
                                        },
                                        listeners: {
                                            itemclick: 'documentClick'
                                        }
                                    }
                                ]
                            },
                        ]
                    }
                ]
            },
            {
                xtype: 'buttoncontainer',
                items:
                    [
                        {
                            xtype: 'button',
                            text: 'بازگشت',
                            iconCls: 'icon cancel',
                            handler: 'onCancelButton'
                        }
                    ]
            }
        ]
    });