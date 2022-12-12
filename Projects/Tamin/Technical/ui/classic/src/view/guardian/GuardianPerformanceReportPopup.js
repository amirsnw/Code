Ext.define('InsuranceTechnical.view.guardian.GuardianPerformanceReportPopup',
    {
        extend: 'InsuranceTechnical.tamin.window.Window',
        title: 'گزارش عملکرد',
        xtype: 'guardian-performance-report-opinion',
        id: 'guardianPerformanceReportPopup',
        width: '55%',
        modal: true,
        bodyPadding: 5,
        closeAction: 'destroy',
        reference: 'guardianPerformanceReportPopup',
        autoScroll: true,
        items: [
            {
                xtype: 'tform',
                id: 'guardian-performance-report',
                items: [
                    {
                        xtype: 'tfieldset',
                        defaults: {
                            labelWidth: 110,
                            width: '96%',
                            margin: 5
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
                                allowBlank: false,
                                bind: {
                                    value: '{report.sDate}',
                                    // disabled: '{endDateEditDisable}'

                                },
                                valuePublishEvent: ['select', 'change']
                            },
                            {
                                xtype: 'timestampdatefield',
                                fieldLabel: 'تا تاریخ',
                                allowBlank: false,
                                bind: {
                                    value: '{report.eDate}',
                                    // disabled: '{endDateEditDisable}'
                                },
                                valuePublishEvent: ['select', 'change']

                            }
                        ]
                    },
                    {
                        xtype: 'buttoncontainer',
                        items: [
                            {
                                xtype: 'button',
                                text: 'نمایش',
                                iconCls: 'icon add',
                                handler: 'printGuardianReports'
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