Ext.define('IncomeBank.view.telegraph.TelInfo', {
    extend: 'IncomeBank.tamin.panel.Panel',
    alias: 'widget.telInfo',
    xtype: 'telInfo',
    controller: 'telInfoController',
    viewModel: {type: 'telInfoModel'},
    title: 'گزارش وصولی',
    items: [
        {
            xtype: 'tfieldset',
            title: 'جستجو',
            scrollable: false,
            style: {
                backgroundColor: '#f8f8f8'

            },
            items: [
                {
                    xtype: 'tform',
                    border: false,
                    bodyStyle: 'background:transparent',
                    id: 'telInfo_formId',
                    layout: {
                        type: 'table',
                        columns: 3,
                        tableAttrs: {
                            style: {
                                width: '100%',
                                labelStyle: 'text-align:center'
                            }
                        }
                    },
                    defaults: {
                        labelWidth: 125,
                        width: '98%'
                    },
                    items: [
                        {
                            xtype: 'ttextfield',
                            id: 'telInfo-brchCode',
                            fieldLabel: 'شعبه تامین اجتماعی',
                            name: 'brhCode',
                        },
                        // {
                        //     xtype: 'tcombobox',
                        //     id: 'telInfo-brchCode',
                        //     fieldLabel: 'شعبه تامین اجتماعی',
                        //     emptyText: 'همه موارد',
                        //     name: 'brhCode',
                        //     valueField: 'brhCode',
                        //     displayField: 'brhName',
                        //     pageSize: 10,
                        //     allowBlank: false,
                        //     forceSelection: true,
                        //     bind: {store: '{branch}', value: '{brhCode}'},
                        //     displayTpl: Ext.create('Ext.XTemplate',
                        //         '<tpl for=".">',
                        //         '{brhCode} - {brhName}',
                        //         '</tpl>'
                        //     ),
                        //     tpl: Ext.create('Ext.XTemplate',
                        //         '<tpl for=".">',
                        //         '<div class="x-boundlist-item">',
                        //         '{brhCode} - {brhName}',
                        //         '</div>',
                        //         '</tpl>'
                        //     ),
                        //     // listeners: {
                        //     //     beforeselect: function (queryEvent) {
                        //     //         var userOrganizationCode = IncomeBank.getApplication().getCache('userOrganizationCode');
                        //     //         var filters = [];
                        //     //         var sorters = [];
                        //     //             filters.push(
                        //     //                 {
                        //     //                     "property": 'brhCode',
                        //     //                     "value": userOrganizationCode,
                        //     //                     "operator": "eq",
                        //     //                 }
                        //     //             );
                        //     //         queryEvent.query = JSON.stringify(filters);
                        //     //         queryEvent.combo.getStore().clearFilter();
                        //     //         queryEvent.combo.getStore().addFilter(filters);
                        //     //         return queryEvent;
                        //     //     }
                        //     // },
                        // },
                        {
                            xtype: 'monthfield',
                            fieldLabel: 'سال و ماه',
                            id: 'telInfo-compMdate',
                            name: 'compMdate',
                            allowBlank: false
                        },
                        {
                            xtype: 'ttextfield',
                            id: 'telInfo-day',
                            fieldLabel: 'روز',
                            name: 'day',
                            labelSeparator: '',
                            maxLength: 2,
                            minLength: 1,
                            maskRe: /[0-9]/
                        },
                        {
                            xtype: 'tcombobox',
                            colspan: 3,
                            width: '32.6%',
                            fieldLabel: 'نمایش',
                            name: 'flagAmount',
                            id: 'flagAmount',
                            displayField: 'name',
                            valueField: 'value',
                            defualtValue: '0',
                            matchFieldWidth: true,
                            store: {
                                fields: ['name', 'value'],
                                data: [
                                    {name: 'همه موارد', value: '0'},
                                    {name: 'مبلغ دار', value: '1'}
                                ]
                            },
                            bind: {
                                value: '{agreementMedicalInfo.clinicalHis}'
                            },
                            listeners: {
                                afterrender: function () {
                                    this.setValue(this.defualtValue);
                                },
                            }
                        },
                        {
                            xtype: 'buttoncontainer',
                            items: [
                                {
                                    xtype: 'button',
                                    text: 'جستجو',
                                    padding: 5,
                                    iconCls: 'icon zoom',
                                    handler: 'onSearchButton'
                                }

                            ]
                        }
                    ]

                }
            ]
        },
        {
            xtype: 'tfieldset',
            items: [
                {
                    xtype: 'gridcontainer',
                    items: [
                        {
                            xtype: 'tgrid',
                            id: 'telInfoGrid',
                            columnLines: true,
                            height: 250,
                            bind: {store: '{telInfo}'},
                            columns: [
                                {text: '#', xtype: 'rownumberer', autoSizeColumn: true},
                                {text: 'ردیف', dataIndex: 'rowDesc', autoSizeColumn: true},
                                {text: 'شرح', dataIndex: 'describe', autoSizeColumn: true},
                                {
                                    text: 'مبلغ', dataIndex: 'amount', autoSizeColumn: true,
                                    renderer: function (value, p, r) {
                                        return r.data.amount !== null && r.data.amount !== '' ? r.data.amount.toString().replace(/.(?=(?:.{3})+$)/g, '$&,') : '';
                                    }
                                },
                                {text: 'ردیف', dataIndex: 'rowType', autoSizeColumn: true},
                                {text: 'شرح(نوع وصولی)', dataIndex: 'telType', autoSizeColumn: true},
                                {
                                    text: 'جاری', dataIndex: 'currentAmt', autoSizeColumn: true,
                                    renderer: function (value, p, r) {
                                        return r.data.currentAmt !== null && r.data.currentAmt !== '' ? r.data.currentAmt.toString().replace(/.(?=(?:.{3})+$)/g, '$&,') : '';
                                    }
                                },
                                {
                                    text: 'گذشته', dataIndex: 'oldAmt', autoSizeColumn: true,
                                    renderer: function (value, p, r) {
                                        return r.data.oldAmt !== null && r.data.oldAmt !== '' ? r.data.oldAmt.toString().replace(/.(?=(?:.{3})+$)/g, '$&,') : '';
                                    }
                                },
                                {text: 'شعبه', dataIndex: 'branchCode', autoSizeColumn: true},
                            ]
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'tfieldset',
            style: {
                backgroundColor: '#f8f8f8'
            },
            scrollable: false,
            items: [
                {
                    xtype: 'tform',
                    border: false,
                    bodyStyle: 'background:transparent',
                    id: 'telInfoDet_FormId',
                    layout: {
                        type: 'table',
                        columns: 2,
                        tableAttrs: {
                            style: {
                                width: '70%',
                                labelStyle: 'text-align:center'
                            }
                        }
                    },
                    defaults: {
                        width: '90%',
                        labelWidth: 90
                    },
                    items: [
                        {
                            xtype: 'tdisplayfield',
                            id: 'telInfo-sumAmt',
                            fieldLabel: 'موازنه',
                            readOnly: true,
                            padding: '0 130 0 0',
                            width: '50%',
                            bind: {value: '{telInfoData.sumAmt}'}
                        },
                        {
                            xtype: 'tdisplayfield',
                            id: 'telInfo-sum',
                            fieldLabel: '',
                            readOnly: true,
                            padding: '0 20 0 0',
                            width: '40%',
                            bind: {value: '{telInfoData.sum}'}
                        },
                        {
                            xtype: 'tgrid',
                            id: 'telInfoDetGrid',
                            columnLines: true,
                            height: 155,
                            bind: {store: '{bankTelInfo}'},
                            columns: [
                                {
                                    text: 'ردیف', dataIndex: 'rowNumber',
                                   width: '12%',
                                 //  autoSizeColumn: true,
                                    sortable: false
                                },
                                {
                                    text: 'شرح', dataIndex: 'description',
                                    width: '57.7%',
                                 //   autoSizeColumn: true,
                                    sortable: false
                                },
                                {
                                    text: 'مبلغ', dataIndex: 'amount',
                                    width: '30%',
                                   // autoSizeColumn: true,
                                    sortable: false,
                                    renderer: function (value, p, r) {
                                        return r.data.amount !== null && r.data.amount !== '' ? r.data.amount.toString().replace(/.(?=(?:.{3})+$)/g, '$&,') : '';
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'tdisplayfield',
                            id: 'telInfo-ghaty',
                            fieldLabel: 'نوع گزارش وصولی',
                            readOnly: true,
                            labelWidth: 120,
                            padding: '0 20 0 0',
                            width: 250,
                            bind: {value: '{telInfoData.ghaty}'}
                        },
                    ]
                }
            ]
        },
        {
            xtype: 'buttoncontainer',
            colspan: 1,
            items: [
                {
                    xtype: 'tbutton',
                    text: 'محاسبه',
                    tooltip: 'محاسبه',
                    renderTo: Ext.getBody(),
                    menu: [
                        {
                            text: 'برآورد',
                            id: "baravord",
                            handler: 'onExtTelInfo'
                        },
                        {
                            text: 'قطعی',
                            id: "ghaty",
                            handler: 'onExtTelInfo'
                        }
                    ]
                },
                {
                    xtype: 'button',
                    text: 'گزارش',
                    padding: 5,
                    // iconCls: '',
                    handler: 'onReportButton'
                },
                // {
                //     xtype: 'button',
                //     text: 'ریز مغایرت',
                //     padding: 5,
                //     // iconCls: '',
                //     handler: 'onDetailButton'
                // },
                {
                    xtype: 'button',
                    text: 'تهیه xml',
                    padding: 5,
                    // iconCls: '',
                    handler: 'onXMLButton'
                },
                // {
                //     xtype: 'button',
                //     text: 'لیستهای ریاضی نشده',
                //     padding: 5,
                //     // iconCls: '',
                //     handler: 'onRiaziButton'
                // }
            ]
        }
    ]


});
