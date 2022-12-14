Ext.define('IncomeBank.view.common.CheckIssu', {
    extend: 'Ext.window.Window',
    alias: 'widget.checkIssu',
    id: 'checkIssuWidget',
    title: 'صدور چک',
    modal: true,
    width: 400,
    height: 170,
    scrollable: false,
    controller: 'checkIssu',
    viewModel: {type: 'checkIssu'},
    items: [
        {
            xtype: 'tfieldset',
            title: '',
            style: {
                backgroundColor: '#f8f8f8'
            },
            items: [
                {
                    xtype: 'form',
                    border: false,
                    bodyStyle: 'background:transparent',
                    id: 'checkIssuForm',
                    layout: {
                        type: 'table',
                        columns: 2
                    },
                    defaults: {
                        labelWidth: 100,
                    },
                    items: [
                        {
                            xtype: 'tdisplayfield',
                            fieldLabel: 'مبلغ چک ',
                            bind: {value: '{formData.checkAmmount}'},
                            width: 300,
                            colspan: '2'

                        },
                        {
                            xtype: 'timestampdatefield',
                            id: 'checkIssu-checkDate',
                            fieldLabel: 'تاریخ چک',
                            allowBlank: false,
                            labelSeparator: '',
                            bind: {value: '{formData.checkDateTimeStamp}'},
                            width: 300,
                            colspan: '2'
                        },
                        {
                            xtype: 'ttextfield',
                            fieldLabel: 'شماره چک',
                            id: 'checkIssu-checkNo',
                            maxLength: 10,
                            maskRe: /[0-9]/,
                            allowBlank: false,
                            bind: {value: '{formData.checkNo}'},
                            width: 300,
                            colspan: '2'
                        }
                    ]
                }

            ]
        },
        {
            xtype: 'buttoncontainer',
            items: [
                {
                    xtype: 'tbutton',
                    text: 'ثبت چک',
                    handler: 'onCheckIssu',
//                    iconCls: 'icon save'
                },
                {
                    xtype: 'tbutton',
                    text: 'انصراف',
                    handler: 'onCancelCheckIssu',
                    iconCls: 'icon cancel'
                }
            ]
        }

    ]

});

