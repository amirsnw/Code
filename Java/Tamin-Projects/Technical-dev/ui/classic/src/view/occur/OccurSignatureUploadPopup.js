Ext.define('InsuranceTechnical.view.occur.OccurSignatureUploadPopup',
    {
        extend: 'InsuranceTechnical.tamin.window.Window',
        title: 'بارگزاری مدارک مربوطه',
        xtype: 'occur-document-upload',
        id: 'occurSignatureUploadPopup',
        width: '44%',
        modal: true,
        bodyPadding: 5,
        closeAction: 'destroy',
        reference: 'occur-signature-upload-ref',
        items: [
            {
                xtype: 'tform',
                id: 'occurn-doc-upload-form',
                items: [
                    {
                        xtype: 'tform',
                        title: 'امضای دیجیتال کاربر جاری',
                        width: '90%',
                        height: 80,
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
                                    change: 'uploadSignature'
                                }
                            }
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
