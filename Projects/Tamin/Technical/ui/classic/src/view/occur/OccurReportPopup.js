/**
 * Created by sh-kalantari on 8/7/2019.
 */
Ext.define('InsuranceTechnical.view.occur.OccurReportPopup',
    {
        extend: 'InsuranceTechnical.tamin.window.Window',
        title: 'گزارش عملکرد',
        xtype: 'occur-report-opinion',
        id: 'occurReportPopup',
        width: '55%',
        height: '30%',
        modal: true,
        bodyPadding: 5,
        closeAction: 'destroy',
        reference: 'occurReportPopup',
        autoScroll: true,
        items: [
            {
                xtype: 'tform',
                id: 'occur-report',
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
                            {
                                xtype: 'tcombobox',
                                fieldLabel: 'قلم اطلاعاتی',
                                displayField: 'name',
                                valueField: 'value',
                                editable: false,
                                allowBlank: false,
                                id: 'type',
                                bind: {
                                    value: '{report.type}'
                                },
                                store: {
                                    fields: ['name', 'value'],
                                    data: [
                                        {name: 'فرم پیوست شماره سه', value: '0'},
                                        {name: 'اقدامات شعبه در خصوص گزارشهای حادثه ارائه شده', value: '1'},
                                        {name: 'علت حادثه', value: '2'},
                                        {name: 'عضو حادثه دیده', value: '3'},
                                        {name: 'نوع حادثه', value: '4'}
                                    ]
                                }
                            },
                            {
                                xtype: 'timestampdatefield',
                                fieldLabel: 'از تاریخ',
                                allowBlank: false,
                                bind: {
                                    value: '{report.sDate}'


                                },
                                valuePublishEvent: ['select', 'change']
                            },
                            {
                                xtype: 'timestampdatefield',
                                fieldLabel: 'تا تاریخ',
                                allowBlank: false,
                                bind: {
                                    value: '{report.eDate}'
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
                                handler: 'printOccurReports'
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
