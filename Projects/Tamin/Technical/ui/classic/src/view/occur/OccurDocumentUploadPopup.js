Ext.define('InsuranceTechnical.view.occur.OccurDocumentUploadPopup',
    {
        extend: 'InsuranceTechnical.tamin.window.Window',
        title: 'بارگزاری مدارک مربوطه',
        xtype: 'occur-document-upload',
        id: 'occurDocumentUploadPopup',
        width: '65%',
        modal: true,
        bodyPadding: 5,
        closeAction: 'destroy',
        reference: 'occur-doc-upload-ref',
        items: [
            {
                xtype: 'tform',
                id: 'occurn-doc-upload-form',
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
                                    value: '{occurSpec.insuranceSpec.nationalId}'
                                }
                            },
                            {
                                xtype: 'tdisplayfield',
                                fieldLabel: 'نام و نام خانوادگی',
                                bind: {
                                    value: '{occurSpec.insuranceSpec.firstName} {occurSpec.insuranceSpec.lastName}'
                                }
                            },
                            {
                                xtype: 'tdisplayfield',
                                fieldLabel: 'شماره بیمه',
                                bind: {
                                    value: '{occurSpec.insuranceSpec.id}'
                                }
                            },
                            {
                                xtype: 'tdisplayfield',
                                fieldLabel: 'شعبه',
                                bind: {
                                    value: '{occurSpec.brchCode.branchCode} - {occurSpec.brchCode.branchName}'
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
                                listeners: {
                                    change: 'uploadDocument'
                                }
                            },
                            {
                                xtype: 'fieldset',
                                title: 'نمایش اسناد',
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
                                            store: '{occurImageStore}'
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