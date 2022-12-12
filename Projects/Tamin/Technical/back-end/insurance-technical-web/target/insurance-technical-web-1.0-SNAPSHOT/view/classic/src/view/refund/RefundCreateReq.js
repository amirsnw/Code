Ext.define('InsuranceTechnical.view.refund.RefundCreateReq',
    {
        extend: 'InsuranceTechnical.tamin.panel.Panel',
        xtype: 'refund-create-req',
        title: 'ثبت درخواست',
        controller: 'refund-create-req-controller',
        viewModel: 'refund-create-req-model',
        id: 'tpan',
        items: [
            {
                xtype: 'tform',
                id: 'refund-form-id',
                items: [
                    {
                        xtype: 'tfieldset',
                        title: 'اطلاعات بیمه شده',
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
                                xtype: 'ttextfield',
                                fieldLabel: 'کد ملی',
                                id: 'nationalId',
                                name: 'nationalId',
                                maskRe: /[0-9]/,
                                minLength: 10,
                                maxLength: 10,
                                allowBlank: false,
                                enforceMaxLength: true,
                                vtype: 'inic',
                                bind: {
                                    value: '{refundInfo.nationalCode}',
                                    disabled: '{guardianEdite}'
                                },
                                listeners: {
                                    change: 'onFindWithNationalCode'
                                }
                            },
                            {
                                xtype: 'tdisplayfield',
                                fieldLabel: 'شماره بیمه',
                                id: 'accountNo',
                                name: 'accountNo',
                                maskRe: /[0-9]/,
                                regex: /[0-9]/,
                                bind: {
                                    value: '{refundInfo.insuranceId}'
                                }
                            },
                            {
                                xtype: 'ttextfield',
                                fieldLabel: 'شماره مستمری',
                                id: 'caNo',
                                name: 'caNo',
                                maskRe: /[0-9]/,
                                regex: /[0-9]/,
                                maxLength: 10,
                                minLength: 10,
                                bind: {
                                    value: '{refundInfo.pensionNo}'
                                }
                            },
                            {
                                xtype: 'cellspacer'
                            },
                            {
                                xtype: 'tdisplayfield',
                                fieldLabel: 'نام',
                                id: 'fName',
                                name: 'fName',
                                maskRe: /[^a-zA-Z0-9]/,
                                bind: {
                                    value: '{refundInfo.firstName}'
                                }
                            },
                            {
                                xtype: 'tdisplayfield',
                                fieldLabel: 'نام خانوادگی',
                                name: 'lName',
                                maskRe: /[^a-zA-Z0-9]/,
                                id: 'lName',
                                bind: {
                                    value: '{refundInfo.lastName}'
                                }
                            },
                            {
                                xtype: 'tdisplayfield',
                                fieldLabel: 'کد شعبه',
                                hidden: true,
                                bind: {
                                    value: '{refundInfo.branchCode}'
                                }
                            },
                            {
                                xtype: 'cellspacer'
                            },
                            {
                                xtype: 'tdisplayfield',
                                fieldLabel: 'شماره شناسنامه',
                                id: 'idNo',
                                name: 'idNo',
                                maskRe: /[0-9]/,
                                maxLength: 15,
                                bind: {
                                    value: '{refundInfo.idNo}'
                                }
                            },
                            {
                                xtype: 'tdisplayfield',
                                fieldLabel: 'تاریخ تولد',
                                bind: {
                                    value: '{refundInfo.birthDate}'
                                }
                            },
                            {
                                xtype: 'cellspacer'
                            },
                            {
                                xtype: 'tdisplayfield',
                                fieldLabel: 'کد شعبه',
                                bind: {
                                    value: '{refundInfo.branchCode}'
                                }
                            }
                        ]
                    },
                    {
                        xtype: 'tfieldset',
                        id: 'fieldset-payment',
                        title: 'اطلاعات پرداخت',
                        defaults: {
                            labelWidth: 130,
                            margin: 2,
                            width: '73%'
                        },
                        layout: {
                            type: 'table',
                            columns: 2,
                            tableAttrs: {
                                style: {width: '100%'}
                            }
                        },
                        items: [
                            {
                                xtype: 'gridcontainer',
                                width: '100%',
                                colspan: 2,
                                scrollable: false,
                                items: [
                                    {
                                        xtype: 'tgrid',
                                        allowDeselect: true,
                                        width: '86.5%',
                                        id: 'refundPayment-grid',
                                        reference: 'refundPayment-grid',
                                        readOnly: '{refundEdit}',
                                        disabled: '{refundEdit}',
                                        colspan: 2,
                                        selModel: {
                                            selType: 'checkboxmodel',
                                            mode: 'SINGLE',
                                            checkOnly: 'true',
                                            toggleOnClick: true,
                                            allowDeselect: true
                                        },
                                        bind: {
                                            store: '{refundPaymentStore}',
                                        },
                                        listeners: {
                                            select: 'selectRefundPayment',
                                            deselect: 'deSelectRefundPayment'
                                        },
                                        columns: [
                                            {
                                                text: '#',
                                                xtype: 'rownumberer',
                                                autoSizeColumn: true
                                            },
                                            {
                                                xtype: 'templatecolumn',
                                                width: '320px',
                                                tpl: '{resnum}',
                                                text: 'شناسه پرداخت',
                                                autoSizeColumn: true
                                            },
                                            {
                                                xtype: 'templatecolumn',
                                                tpl: '{cnt_CNTRCTNO}',
                                                text: 'شماره قرارداد',
                                                name: 'contractNumber',
                                                id: 'contractNumber',
                                                autoSizeColumn: true
                                            },
                                            {
                                                xtype: 'templatecolumn',
                                                tpl: '{brch_CODE}',
                                                text: 'شعبه معین',
                                                name: 'paymentBranch',
                                                id: 'paymentBranch',
                                                autoSizeColumn: true
                                            },
                                            {
                                                xtype: 'templatecolumn',
                                                tpl: '{CWS_DBTSDATE}',
                                                text: 'تاریخ شروع پرداخت',
                                                name: 'debitStartDate',
                                                id: 'debitStartDate',
                                                autoSizeColumn: true,
                                                align: 'center',
                                                renderer: function (val1, data, record) {
                                                    try {
                                                        var value = record.data.cws_DBTSDATE;
                                                        return value.substring(0, 4) + "/" + value.substring(4, 6) + "/" + value.substring(6, 8);
                                                    } catch (exp) {
                                                        return '-';
                                                    }
                                                }
                                            },
                                            {
                                                xtype: 'templatecolumn',
                                                tpl: '{CWS_DBTEDATE}',
                                                text: 'تاریخ پایان پرداخت',
                                                name: 'debitEndDate',
                                                id: 'debitEndDate',
                                                autoSizeColumn: true,
                                                align: 'center',
                                                renderer: function (val1, data, record) {
                                                    try {
                                                        var value = record.data.cws_DBTEDATE;
                                                        return value.substring(0, 4) + "/" + value.substring(4, 6) + "/" + value.substring(6, 8);
                                                    } catch (exp) {
                                                        return '-';
                                                    }
                                                }
                                            },
                                            {
                                                xtype: 'templatecolumn',
                                                tpl: '{amount}',
                                                name: 'amount',
                                                id: 'amount',
                                                text: 'مبلغ پرداخت شده',
                                                autoSizeColumn: true
                                            },
                                            {
                                                xtype: 'templatecolumn',
                                                tpl: '{spcratedesc}',
                                                text: 'شرح نرخ حق بیمه',
                                                name: 'spcratedesc',
                                                id: 'spcratedesc',
                                                autoSizeColumn: true

                                            },
                                            {
                                                xtype: 'templatecolumn',
                                                tpl: '{selfisutypedesc}',
                                                text: 'شرح نوع بیمه',
                                                name: 'selfisutypedesc',
                                                id: 'selfisutypedesc',
                                                autoSizeColumn: true

                                            },
                                            {
                                                xtype: 'templatecolumn',
                                                tpl: '{workday}',
                                                name: 'workday',
                                                id: 'workday',
                                                text: 'تعداد روز کارکرد',
                                                autoSizeColumn: true
                                            },
                                            {
                                                xtype: 'templatecolumn',
                                                tpl: '{paydate}',
                                                name: 'paydate',
                                                id: 'paydate',
                                                text: 'تاریخ پرداخت',
                                                autoSizeColumn: true,
                                                renderer: function (val1, data, record) {
                                                    try {
                                                        var value = record.data.paydate;
                                                        return value.substring(0, 4) + "/" + value.substring(4, 6) + "/" + value.substring(6, 8);
                                                    } catch (exp) {
                                                        return '-';
                                                    }
                                                }
                                            }
                                        ],
                                        dockedItems: [
                                            {
                                                xtype: 'pagingtoolbar',
                                                bind: {
                                                    store: '{refundPaymentStore}'
                                                },
                                                dock: 'bottom',
                                                beforePageText: 'صفحه',
                                                displayMsg: 'رکوردهای {0} تا {1} از مجموع {2}',
                                                displayInfo: true
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                xtype: 'tfieldset',
                                id: 'fieldset-debit-detail',
                                title: 'ریز اطلاعات بدهی',
                                items: [
                                    {
                                        xtype: 'gridcontainer',
                                        //width: '90%',
                                        scrollable: false,
                                        items: [
                                            {
                                                xtype: 'gridcontainer',
                                                //width: '100%',
                                                scrollable: false,
                                                items: [
                                                    {
                                                        xtype: 'tgrid',
                                                        //width: '100%',
                                                        id: 'refundDebit-grid',
                                                        reference: 'refundDebit-grid',
                                                        bind: {
                                                            store: '{refundDebitStore}'
                                                        },
                                                        columns: [
                                                            {
                                                                text: '#',
                                                                xtype: 'rownumberer',
                                                                autoSizeColumn: true
                                                            },
                                                            {
                                                                xtype: 'templatecolumn',
                                                                tpl: '{year}',
                                                                text: 'سال',
                                                                name: 'year',
                                                                id: 'debit_year',
                                                                autoSizeColumn: true
                                                            },
                                                            {
                                                                xtype: 'templatecolumn',
                                                                tpl: '{month}',
                                                                text: 'ماه',
                                                                name: 'month',
                                                                id: 'debit_month',
                                                                autoSizeColumn: true
                                                            },
                                                            {
                                                                xtype: 'templatecolumn',
                                                                tpl: '{day}',
                                                                text: 'روز',
                                                                name: 'day',
                                                                id: 'debit_day',
                                                                autoSizeColumn: true
                                                            },
                                                            {
                                                                xtype: 'templatecolumn',
                                                                tpl: '{debitTypeCode}',
                                                                text: 'کد نوع بدهی',
                                                                name: 'debitTypeCode',
                                                                id: 'debit_debitTypeCode',
                                                                autoSizeColumn: true
                                                            },
                                                            {
                                                                xtype: 'templatecolumn',
                                                                tpl: '{spcratrpmDesc}',
                                                                text: 'شرح بدهی',
                                                                name: 'spcratrpmDesc',
                                                                id: 'debit_spcratrpmDesc',
                                                                autoSizeColumn: true
                                                            },
                                                            {
                                                                xtype: 'templatecolumn',
                                                                tpl: '{dastmozd}',
                                                                text: 'دستمزد',
                                                                name: 'dastmozd',
                                                                id: 'debit_dastmozd',
                                                                autoSizeColumn: true
                                                            },
                                                            {
                                                                xtype: 'templatecolumn',
                                                                tpl: '{amount}',
                                                                text: 'مبلغ بدهی',
                                                                name: 'amount',
                                                                id: 'debit_amount',
                                                                autoSizeColumn: true
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ],
                                        dockedItems: [
                                            {
                                                xtype: 'pagingtoolbar',
                                                bind: {
                                                    store: '{refundDebitStore}'
                                                },
                                                dock: 'bottom',
                                                beforePageText: 'صفحه',
                                                displayMsg: 'رکوردهای {0} تا {1} از مجموع {2}',
                                                displayInfo: true
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                xtype: 'tfieldset',
                                id: 'fieldset-refund-detail',
                                title: 'استرداد های ثبت شده برای پرداخت فوق',
                                items: [
                                    {
                                        xtype: 'gridcontainer',
                                        // width: '90%',
                                        scrollable: false,
                                        items: [
                                            {
                                                xtype: 'tgrid',
                                                // width: '100%',
                                                id: 'refundDetail-grid',
                                                reference: 'refundDetail-grid',
                                                bind: {
                                                    store: '{refundDetailStore}'
                                                },
                                                columns: [
                                                    {
                                                        text: '#',
                                                        xtype: 'rownumberer',
                                                        autoSizeColumn: true
                                                    },
                                                    {
                                                        xtype: 'templatecolumn',
                                                        tpl: '{year}',
                                                        text: 'سال',
                                                        name: 'year',
                                                        id: 'detail_year',
                                                        autoSizeColumn: true
                                                    },
                                                    {
                                                        xtype: 'templatecolumn',
                                                        tpl: '{month}',
                                                        text: 'ماه',
                                                        name: 'month',
                                                        id: 'detail_month',
                                                        autoSizeColumn: true
                                                    },
                                                    {
                                                        xtype: 'templatecolumn',
                                                        tpl: '{day}',
                                                        text: 'تعداد روز کارکرد',
                                                        name: 'day',
                                                        id: 'detail_day',
                                                        autoSizeColumn: true
                                                    },
                                                    {
                                                        xtype: 'templatecolumn',
                                                        tpl: '{debitTypeCode}',
                                                        text: 'کد نوع بدهی',
                                                        name: 'debitTypeCode',
                                                        id: 'detail_debitTypeCode',
                                                        autoSizeColumn: true
                                                    },
                                                    {
                                                        xtype: 'templatecolumn',
                                                        tpl: '{spcratprmDesc}',
                                                        text: 'شرح بدهی',
                                                        name: 'spcratprmDesc',
                                                        id: 'detail_spcratprmDesc',
                                                        autoSizeColumn: true
                                                    },
                                                    {
                                                        xtype: 'templatecolumn',
                                                        tpl: '{amount}',
                                                        text: 'مبلغ',
                                                        name: 'amount',
                                                        id: 'detail_amount',
                                                        autoSizeColumn: true
                                                    },
                                                    {
                                                        xtype: 'templatecolumn',
                                                        tpl: '{statusDesc}',
                                                        text: 'وضعیت',
                                                        name: 'statusDesc',
                                                        id: 'detail_statusDesc',
                                                        autoSizeColumn: true
                                                    }
                                                ]
                                            }
                                        ],
                                        dockedItems: [
                                            {
                                                xtype: 'pagingtoolbar',
                                                bind: {
                                                    store: '{refundDetailStore}'
                                                },
                                                dock: 'bottom',
                                                beforePageText: 'صفحه',
                                                displayMsg: 'رکوردهای {0} تا {1} از مجموع {2}',
                                                displayInfo: true
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        xtype: 'tfieldset',
                        id: 'fieldset-refund',
                        title: 'اطلاعات استرداد',
                        disabled: 'true',
                        defaults: {
                            labelWidth: 130,
                            margin: 5,
                            width: '90%'
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
                                fieldLabel: 'علت استرداد',
                                name: 'refundReason',
                                id: 'refundReason',
                                allowBlank: false,
                                matchFieldWidth: true,
                                editable: false,
                                pageSize: 10,
                                displayField: 'refundReason.reasonCode' + '-' + 'refundReason.reasonDesc',
                                valueField: 'refundReason.reasonCode',
                                colspan: 1,
                                bind: {
                                    store: '{refundRelationStore}'
                                },
                                displayTpl: Ext.create('Ext.XTemplate',
                                    '<tpl for=".">',
                                    '{refundReason.reasonCode}  {refundReason.reasonDesc}',
                                    '</tpl>'
                                ),
                                tpl: Ext.create('Ext.XTemplate',
                                    '<tpl for=".">',
                                    '<div class="x-boundlist-item">',
                                    '{refundReason.reasonCode} - {refundReason.reasonDesc}',
                                    '</div>',
                                    '</tpl>'
                                ),
                                listeners: {
                                    select: 'selectRefundReason'
                                }
                            },
                            {
                                xtype: 'tfieldset',
                                id: 'fieldset-isu',
                                name: 'fieldset-isu',
                                title: 'حق بیمه',
                                colspan: 2,
                                disabled: 'true',
                                defaults: {
                                    labelWidth: 130,
                                    margin: 5,
                                    width: '90%'
                                },
                                layout: {
                                    type: 'table',
                                    columns: 2,
                                    tableAttrs: {
                                        style: {width: '100%'}
                                    }
                                },
                                items: [
                                    {
                                        xtype: 'tdatefield',
                                        fieldLabel: 'تاریخ شروع پرداخت',
                                        id: 'isuPaySDate',
                                        name: 'isuPaySDate',
                                        allowBlank: false,
                                        bind: {
                                            value: '{refundInfo.isuStartDate}'
                                        },
                                        listeners: {
                                            /*select: function(val) {
                                                if (val.value !== undefined
                                                    && Ext.getCmp('tpan').getViewModel().data.refundInfo.darmanRefund === 1) {
                                                    Ext.getCmp('darmanPaySDate').setValue(val.value);
                                                }
                                            },*/
                                            change: function (val) {
                                                this.up('refund-create-req').getController().resetCalc();
                                            }
                                        }
                                    },
                                    {
                                        xtype: 'tdatefield',
                                        fieldLabel: 'تاریخ پایان پرداخت',
                                        id: 'isuPayEDate',
                                        name: 'isuPayEDate',
                                        allowBlank: false,
                                        bind: {
                                            value: '{refundInfo.isuEndDate}'
                                        },
                                        listeners: {
                                            /*select: function(val) {
                                                if (val.value !== undefined
                                                    && Ext.getCmp('tpan').getViewModel().data.refundInfo.darmanRefund === 1) {
                                                    Ext.getCmp('darmanPayEDate').setValue(val.value);
                                                }
                                            },*/
                                            change: function (val) {
                                                this.up('refund-create-req').getController().resetCalc();
                                            }
                                        }
                                    }
                                ]
                            },
                            {
                                xtype: 'cellspacer'
                            },
                            {
                                xtype: 'tfieldset',
                                id: 'fieldset-darman',
                                name: 'fieldset-darman',
                                title: 'سرانه درمان / سهم درمان',
                                disabled: 'true',
                                colspan: 2,
                                defaults: {
                                    labelWidth: 130,
                                    margin: 5,
                                    width: '90%'
                                },
                                layout: {
                                    type: 'table',
                                    columns: 2,
                                    tableAttrs: {
                                        style: {width: '100%'}
                                    }
                                },
                                items: [
                                    {
                                        xtype: 'tdatefield',
                                        fieldLabel: 'تاریخ شروع پرداخت',
                                        id: 'darmanPaySDate',
                                        name: 'darmanPaySDate',
                                        bind: {
                                            value: '{refundInfo.darmanStartDate}'
                                        },
                                        listeners: {
                                            change: function (val) {
                                                this.up('refund-create-req').getController().resetCalc();
                                            }
                                        }
                                    },
                                    {
                                        xtype: 'tdatefield',
                                        fieldLabel: 'تاریخ پایان پرداخت',
                                        id: 'darmanPayEDate',
                                        name: 'darmanPayEDate',
                                        bind: {
                                            value: '{refundInfo.darmanEndDate}'
                                        },
                                        listeners: {
                                            change: function (val) {
                                                this.up('refund-create-req').getController().resetCalc();
                                            }
                                        }
                                    },
                                    {
                                        name: 'noDarmanTip',
                                        html: '<div style="float: right"><span style="color: red">استرداد سرانه درمان از تاریخ ثبت این درخواست به بعد میسر است</span></div>',
                                        style: {
                                            width: '90%'
                                        },
                                        listeners: {
                                            afterrender: function () {
                                                this.setBorder(false);
                                                this.setHidden(true);
                                            }
                                        },
                                        bind: {
                                            hidden: '{hideDarmanTip}',
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        xtype: 'buttoncontainer',
                        items: [
                            {
                                xtype: 'button',
                                text: 'محاسبه',
                                iconCls: 'icon save',
                                handler: 'onCalculateButton',
                                id: 'fieldset-calc',
                                bind: {
                                    disabled: '{saveDisable}'
                                }
                            }
                        ]
                    },
                    {
                        xtype: 'tfieldset',
                        title: 'اطلاعات محاسبه',
                        defaults: {
                            labelWidth: 130,
                            margin: 5,
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
                                xtype: 'tdisplayfield',
                                fieldLabel: 'مجموع مبلغ استرداد',
                                name: 'paymentTotal',
                                id: 'paymentTotal',
                                colspan: 1,
                                maxLength: 100,
                                maskRe: /[^a-zA-Z0-9]/,
                                bind: {
                                    value: '{refundInfo.paymentTotal}'
                                }
                            }
                            ,
                            {
                                xtype: 'tfieldset',
                                title: 'حق بیمه',
                                colspan: 2,
                                defaults: {
                                    labelWidth: 130,
                                    margin: 5,
                                    width: '90%'
                                },
                                layout: {
                                    type: 'table',
                                    columns: 2,
                                    tableAttrs: {
                                        style: {width: '100%'}
                                    }
                                },
                                items: [
                                    {
                                        xtype: 'tdisplayfield',
                                        fieldLabel: 'تعداد روز قابل استرداد',
                                        name: 'workDaysIsu',
                                        id: 'workDaysIsu',
                                        maxLength: 100,
                                        maskRe: /[^a-zA-Z0-9]/,
                                        bind: {
                                            value: '{refundInfo.workDaysIsu}'
                                        }
                                    },
                                    {
                                        xtype: 'tdisplayfield',
                                        fieldLabel: 'مبلغ قابل استرداد',
                                        name: 'paymentIsu',
                                        id: 'paymentIsu',
                                        maxLength: 100,
                                        maskRe: /[^a-zA-Z0-9]/,
                                        bind: {
                                            value: '{refundInfo.paymentIsu}'
                                        }
                                    }
                                ]
                            },
                            {
                                xtype: 'cellspacer'
                            },
                            {
                                xtype: 'tfieldset',
                                title: 'سرانه درمان / سهم درمان',
                                colspan: 2,
                                defaults: {
                                    labelWidth: 130,
                                    margin: 5,
                                    width: '90%'
                                },
                                layout: {
                                    type: 'table',
                                    columns: 2,
                                    tableAttrs: {
                                        style: {width: '100%'}
                                    }
                                },
                                items: [
                                    {
                                        xtype: 'tdisplayfield',
                                        fieldLabel: 'تعداد روز قابل استرداد',
                                        name: 'workDaysDarman',
                                        id: 'workDaysDarman',
                                        maxLength: 100,
                                        maskRe: /[^a-zA-Z0-9]/,
                                        bind: {
                                            value: '{refundInfo.workDaysDarman}'
                                        }
                                    },
                                    {
                                        xtype: 'tdisplayfield',
                                        fieldLabel: 'مبلغ قابل استرداد',
                                        name: 'paymentDarman',
                                        id: 'paymentDarman',
                                        maxLength: 100,
                                        maskRe: /[^a-zA-Z0-9]/,
                                        bind: {
                                            value: '{refundInfo.paymentDarman}'
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                    ,
                    {
                        xtype: 'buttoncontainer',
                        items: [
                            {
                                xtype: 'button',
                                text: 'ذخیره',
                                id: 'saveButton',
                                iconCls: 'icon save',
                                handler: 'onSaveButton',
                                bind: {
                                    disabled: '{saveDisable}'
                                }
                            },
                            {
                                xtype: 'button',
                                text: 'بازگشت',
                                iconCls: 'icon arrow_right',
                                handler: 'onCancelButton'
                            }
                        ]
                    }
                ]
            }
        ]
    }
);
