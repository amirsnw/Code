/**
 * Created by sh-kalantari on 8/3/2019.
 */
Ext.define('InsuranceTechnical.view.occur.OccurIdea', {

    extend: 'InsuranceTechnical.tamin.window.Window',
    xtype: 'occur-idea',
    closeAction: 'destroy',
    modal: true,
    reference: 'occur-idea-ref',
    width: '60%',
    items: [
        {
            xtype: 'tform',
            id: 'occur-idea-form',
            items: [
                {
                    xtype: 'tfieldset',
                    layout: {
                        type: 'table',
                        columns: 3,
                        tableAttrs: {
                            style: {width: '100%'}
                        }
                    },
                    defaults: {
                        width: '99%',
                        labelWidth: 180
                    },
                    items: [
                        {
                            xtype: 'tfieldset',
                            colspan: '3',
                            layout: {
                                type: 'table',
                                columns: 2,
                                tableAttrs: {
                                    style: {width: '99%'}
                                }
                            },
                            defaults: {
                                width: '99%',
                                labelWidth: 140
                            },

                            items: [
                                {
                                    xtype: 'tdisplayfield',
                                    fieldLabel: 'شماره بیمه',
                                   id: 'pnatcode',
                                    style: {
                                        'margin-left': '2px'
                                    },

                                    bind: {
                                        value: '{occurIdea.insuranceSpec.id}'

                                    }
                                },
                                {
                                    xtype: 'tdisplayfield',
                                    fieldLabel: 'شماره ثبت',
                                    // id: 'firstNameDp',
                                    style: {
                                        'margin-left': '2px'
                                    } ,
                                    id :'repNo',

                                    bind: {
                                        value: '{occurIdea.repNo}'

                                    }
                                },
                                {
                                    xtype: 'tdisplayfield',
                                    fieldLabel: 'نام ',
                                    /* bind: {
                                     value: '{occurIdea.insuranceSpec.firstName}',

                                     },*/
                                    name: 'firstName',
                                    id: 'firstName'

                                },
                                {
                                    xtype: 'tdisplayfield',
                                    fieldLabel: 'نام خانوادگی',
                                    bind: {
                                        // value: '{occurIdea.insuranceSpec.lastName}',

                                    },
                                    name: 'lastName',
                                    id: 'lastName'


                                },
                                {
                                    xtype: 'tdisplayfield',
                                    fieldLabel: 'کد کارگاه ',
                                    id: 'workShopId',
                                    bind: {
                                        value: '{occurIdea.workshop.workshopId}'

                                    }
                                },
                                {
                                    xtype: 'tdisplayfield',
                                    fieldLabel: 'نام کارگاه ',
                                    id: 'workshopNameId',

                                    bind: {
                                        value: '{occurIdea.workshop.workshopName}'
                                    }
                                }
                            ]
                        },

                        {
                            xtype: 'gridcontainer',
                            items: [
                                {
                                    xtype: 'tgrid',
                                    id: 'OccurIdea',
                                    maxHeight: 300,
                                    autoScroll: true,
                                    bind: {store: '{occurIdeaStore}'},
                                    columns: [
                                        {
                                            text: '#', xtype: 'rownumberer', autoSizeColumn: true
                                        },
                                        {
                                            text: 'عملیات',
                                            align: 'center',
                                            stopSelection: true,
                                            id: 'enable-calc-splitbutton1',
                                            xtype: 'widgetcolumn',
                                            onWidgetAttach: function (col, widget, rec) {
                                                var me = this;
                                                var mainRecordData = me.up('occur-spec').getViewModel().get('occurIdea');
                                                var orgCode = InsuranceTechnical.getApplication().getCache('organizationCode');
                                                if (rec.data.bossInwork === '1' || (rec.data.bossInwork === '2' || rec.data.bossInwork === '3')) {
                                                    widget.menu.items.items[0].setDisabled(true);
                                                    widget.menu.items.items[1].setDisabled(true);
                                                } else if (orgCode !== mainRecordData.brchReviewer.branchCode) {
                                                    widget.menu.items.items[1].setDisabled(true);
                                                }
                                            },
                                            widget: {
                                                xtype: 'button',
                                                text: "عملیات",
                                                defaultBindProperty: null,
                                                menu: [
                                                    {
                                                        text: 'ویرایش / مشاهده',
                                                        handler: 'DisplayOccurIdeaButton',
                                                        iconCls: 'icon pencil'
                                                    },
                                                    {
                                                        text: 'حذف',
                                                        handler: 'onOccurInspConfDeleteButton',
                                                        iconCls: 'icon cross'
                                                    },
                                                    {
                                                        text: 'تایید مسئول فنی',
                                                        handler: 'occurInspConfButton',
                                                        iconCls: 'icon accept',
                                                        bind: {
                                                            // disabled: '{iFlag}'
                                                        }
                                                    }
                                                ]
                                            }
                                        },
                                        {
                                            text: 'ردیف',
                                            xtype: 'templatecolumn',
                                            autoSizeColumn: true,
                                            tpl: '{ideaSeq}',
                                            emptyCellText: '-'
                                        },
                                        {
                                            text: 'نتیجه گزارش فنی',
                                            xtype: 'templatecolumn',
                                            autoSizeColumn: true,
                                            tpl: '{techinspinwork}',
                                            emptyCellText: '-',
                                            renderer: function (a, b, rec) {
                                                var value = rec.data.techinspinwork;
                                                switch (value) {
                                                    case '1':
                                                        return 'تایید حادثه ناشی از کار';
                                                        break;
                                                    case '2':
                                                        return 'عدم تایید حادثه ناشی از کار';
                                                        break;
                                                    case '3':
                                                        return 'نقص مدرک';
                                                        break;
                                                    default:
                                                        return '-';
                                                }
                                            }
                                        },
                                        {
                                            text: 'تاریخ بازرسی',
                                            dataIndex: 'techinspdate',
                                            autoSizeColumn: true,
                                            emptyCellText: '-',
                                            renderer: function (val1, data, record) {

                                                var value = arguments[2].data.techinspdate;
                                                return value === null ? null : InsuranceTechnical.tamin.helpers.Persian.gregorianToPersian(new Date(value))
                                            }
                                        },
                                        {
                                            text: 'نظریه مسئول فنی',
                                            xtype: 'templatecolumn',
                                            autoSizeColumn: true,
                                            tpl: '{bossInwork}',
                                            emptyCellText: '-',
                                            renderer: function (a, b, rec) {
                                                var value = rec.data.bossInwork;
                                                switch (value) {
                                                    case '1':
                                                        return 'تایید گزارش بازرس فنی-ناشی از کار';
                                                        break;
                                                    case '2':
                                                        return 'تایید گزارش بازرس فنی-غیر ناشی از کار';
                                                        break;
                                                    case '3':
                                                        return 'عدم تایید گزارش بازرس فنی';
                                                        break;
                                                    default:
                                                        return '-';
                                                }
                                            }
                                        }
                                    ],
                                    dockedItems: [
                                        {
                                            xtype: 'pagingtoolbar',
                                            bind: {store: '{occurIdeaStore}'},
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
                    xtype: 'buttoncontainer',
                    style: {
                        'margin-top': '10px'
                    },
                    items: [
                        {
                            xtype: 'button',
                            text: 'جدید',
                            id: 'saveOccurNew',
                            iconCls: 'icon add',
                            handler: 'NewOccurIdeaButton',
                            bind: {
                                disabled: '{iFlag}'
                            }
                        },
                        {
                            xtype: 'splitbutton',
                            text: 'چاپ و نمایش',
                            handler: function () {
                                this.showMenu()
                            },
                            padding: '5,15,5,15',
                            minWidth: 100,
                            disabledCls: true,
                            layout: {
                                type: 'hbox'
                            },
                            menu: [
                                {
                                    text: 'گزارش بررسی حادثه',
                                    handler: 'printOccurReviewReports'
                                },
                                {
                                    text: 'فرم مشروح گزارش بازرس فنی ',
                                    id: 'refundDebitButton',
                                    handler: 'printOccurIdeaReports'
                                }
                            ]
                        },
                        {
                            xtype: 'splitbutton',
                            text: 'ارسال به پرونده الکترونیک',
                            handler: function () {
                                this.showMenu()
                            },
                            padding: '5,15,5,15',
                            minWidth: 100,
                            disabledCls: true,
                            layout: {
                                type: 'hbox'
                            },
                            menu: [
                                {
                                    text: 'گزارش بررسی حادثه',
                                    handler: 'sendOccurReviewReports'
                                },
                                {
                                    text: 'فرم مشروح گزارش بازرس فنی ',
                                    handler: 'sendOccurIdeaReports'
                                }
                            ]
                        },
                        {
                            xtype: 'tbutton',
                            text: 'بازگشت',
                            name: 'cancel',
                            handler: 'onCancelButton',
                            iconCls: 'icon arrow_right'
                        }
                    ]
                }
            ]


        }

    ]
})
;
