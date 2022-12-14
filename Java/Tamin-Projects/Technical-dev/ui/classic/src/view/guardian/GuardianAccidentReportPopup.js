Ext.define('InsuranceTechnical.view.guardian.GuardianAccidentReportPopup',
    {
        extend: 'InsuranceTechnical.tamin.window.Window',
        title: 'گزارش بازرس فنی',
        xtype: 'guardian-accident-report-opinion',
        id: 'guardianAccidentReportPopup',
        width: '55%',
        height: '30%',
        modal: true,
        bodyPadding: 5,
        closeAction: 'destroy',
        reference: 'guardianAccidentReportPopup',
        autoScroll: true,
        items: [
            {
                xtype: 'tform',
                id: 'guardian-form-report',
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
                                style: {width: '98%'}
                            }
                        },
                        items: [
                            // {
                            //     xtype: 'cellspacer',
                            //     colspan: 2,
                            // },
                            {
                                xtype: 'timestampdatefield',
                                fieldLabel: 'از تاریخ',
                                bind: {
                                    // value: '{refundDebit.darmanEndDate}',
                                    // disabled: '{endDateEditDisable}'

                                },
                                valuePublishEvent: ['select', 'change'],

                            },
                            {
                                xtype: 'timestampdatefield',
                                fieldLabel: 'تا تاریخ',
                                bind: {
                                    // value: '{refundDebit.darmanEndDate}',
                                    // disabled: '{endDateEditDisable}'

                                },
                                valuePublishEvent: ['select', 'change'],

                            },
                        ]
                    },

                    {
                        xtype: 'buttoncontainer',
                        items: [
                            {
                                xtype: 'button',
                                text: 'ذخیره',
                                iconCls: 'icon add',
                                handler: ''
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
    })