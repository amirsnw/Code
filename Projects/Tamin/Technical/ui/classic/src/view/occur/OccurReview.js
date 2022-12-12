/**
 * Created by a-khalighi.
 */
Ext.define('InsuranceTechnical.view.occur.OccurReview', {
    extend: 'InsuranceTechnical.tamin.panel.Panel',
    xtype: 'occur-review',
    title: 'گزارش بررسی حادثه ',
    modal: true,
    reference: 'occur-review-ref',
    controller: 'occur-review-controller',
    viewModel: 'occur-review-model',
    width: '95%',
    items: [
        {
            xtype: 'tform',
            id: 'occur-review-form',
            items: [
                {
                    xtype: 'tfieldset',
                    layout: {
                        type: 'table',
                        columns: 1,
                        tableAttrs: {
                            style: {width: '100%'}
                        }
                    },
                    defaults: {
                        width: '99%',
                        labelWidth: 140
                    },
                    items: [
                        {
                            xtype: 'tfieldset',
                            layout: {
                                type: 'table',
                                columns: 4,
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
                                    fieldLabel: 'شعبه تامین اجتماعی (ثبت کننده)',
                                    name: 'branch',
                                    bind: {
                                        value: '{occurReview.regBrchCode.branchCode} - {occurReview.regBrchCode.branchName}'
                                    }
                                },
                                {
                                    xtype: 'tdisplayfield',
                                    fieldLabel: 'شعبه تامین اجتماعی (بررسی کننده)',
                                    name: 'branch',
                                    bind: {
                                        value: '{occurReview.brchReviewer.branchCode} - {occurReview.brchReviewer.branchName}'
                                    }
                                },
                                {
                                    xtype: 'cellspacer',
                                    colspan: '3'
                                },
                                {
                                    xtype: 'tdisplayfield',
                                    fieldLabel: 'شماره سریال حادثه ',
                                    id: 'occurSerialID',
                                    name: 'occurSerial'
                                },
                                {
                                    xtype: 'tdisplayfield',
                                    fieldLabel: 'شماره ثبت',

                                    name: 'repNo',
                                    bind: {
                                        value: '{occurReview.repNo}'
                                    }
                                },
                                {
                                    xtype: 'timestampdatefield',
                                    fieldLabel: 'تاریخ ثبت',
                                    name: 'repdate',
                                    id: 'repdate',
                                    editable: false,
                                    bind: {
                                        value: '{occurReview.repdate}'
                                    }
                                },
                                {
                                    xtype: 'cellspacer'
                                },
                                {
                                    xtype: 'tdisplayfield',
                                    fieldLabel: 'کدکارگاه',


                                    bind: {
                                        value: '{workshopData.workshopId}'
                                    }
                                },
                                {
                                    xtype: 'tdisplayfield',
                                    fieldLabel: 'نام کارگاه',
                                    bind: {
                                        value: '{workshopData.workshopName}'

                                    }
                                },
                                {
                                    xtype: 'tdisplayfield',
                                    fieldLabel: 'فعالیت',
                                    id: 'activitydesc',
                                    bind: {
                                        value: '{workshopData.activity.activityDesc}'
                                    }
                                },
                                {
                                    xtype: 'tdisplayfield',
                                    fieldLabel: 'نشانی کارگاه',
                                    name: 'wkAddress',
                                    colspan: 2,
                                    bind: {
                                        value: '{workshopData.isuJobLocation}'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'tfieldset',
                            title: 'مشخصات بیمه شده',
                            columns: '1',
                            layout: {
                                type: 'table',
                                columns: 1,
                                tableAttrs: {
                                    style: {width: '100%'}
                                }
                            },
                            items: [
                                {
                                    xtype: 'tfieldset',
                                    layout: {
                                        type: 'table',
                                        columns: 4,
                                        tableAttrs: {
                                            style: {width: '99%'}
                                        }
                                    },
                                    defaults: {
                                        width: '99%'
                                    },
                                    items: [
                                        {
                                            xtype: 'tdisplayfield',
                                            fieldLabel: 'شماره بیمه',
                                            name: 'occurSerial',
                                            bind: {
                                                value: '{insuranceSpec.id}'
                                            }
                                        },
                                        {
                                            xtype: 'tdisplayfield',
                                            // cls: '',
                                            id: 'firstNameEditDp',
                                            /*  style: {
                                             'margin-left': '1px'
                                             }*/

                                            bind: {
                                                value: '{insuranceSpec.firstName} - {insuranceSpec.lastName}'

                                            }
                                        },
                                        {
                                            xtype: 'tdisplayfield',
                                            fieldLabel: 'کد ملی',
                                            name: 'occurSerial',
                                            bind: {
                                                value: '{insuranceSpec.nationalId}'
                                            }
                                        },
                                        {
                                            xtype: 'tdisplayfield',
                                            fieldLabel: 'شماره شناسنامه ',
                                            name: 'pidno',
                                            bind: {
                                                value: '{insuranceSpec.idCardNumber}'
                                            }
                                        },
                                        {
                                            xtype: 'tdisplayfield',
                                            fieldLabel: 'ملیت',
                                            name: 'pnationdesc',
                                            id: 'pnationdesc',
                                            bind: {
                                                value: '{occurReview.pnationdesc}'
                                            },
                                            renderer: function (value, field) {
                                                if (value !== null) {
                                                    if (value === '01') {
                                                        return 'ایرانی';
                                                    } else {
                                                        return 'غیر ایرانی';
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'tdisplayfield',
                                            fieldLabel: 'جنسیت',
                                            displayField: 'name',

                                            valueField: 'value',

                                            bind: {
                                                value: '{occurReview.sexcode}',
                                                disabled: '{disableTextBoxes}'
                                            },
                                            renderer: function (value, field) {
                                                if (value !== null) {
                                                    if (value === '01')
                                                        return 'مرد';
                                                    else
                                                        return 'زن';
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'tdisplayfield',
                                            fieldLabel: 'تاریخ تولد',
                                            bind: {
                                                value: '{occurReview.pbirthdate}',
                                                disabled: '{disableTextBoxes}'
                                            },
                                            name: 'pbirthdate',
                                            id: 'pbirthdate'
                                        },
                                        {
                                            xtype: 'tcombobox',
                                            fieldLabel: 'وضعیت تاهل ',
                                            displayField: 'name',
                                            valueField: 'value',
                                            editable: false,
                                            matchFieldWidth: true,
                                            id: 'reportertype',
                                            bind: {
                                                value: '{ssupOccurReview.ismarried}'
                                            },
                                            store: {
                                                fields: ['name', 'value'],
                                                data: [
                                                    {name: 'متاهل', value: '1'},
                                                    {name: 'مجرد', value: '0'}
                                                ]
                                            }
                                        },
                                        {
                                            xtype: 'tdisplayfield',
                                            labelWidth: 180,
                                            /* width :600,*/
                                            fieldLabel: 'نشانی محل سکونت بیمه شده',
                                            bind: {
                                                value: '{occurReview.isuaddr}',
                                                disabled: '{disableTextBoxes}'
                                            },
                                            colspan: 3
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'tfieldset',
                            title: 'اطلاعات شغل',
                            layout: {
                                type: 'table',
                                columns: 3,
                                tableAttrs: {
                                    style: {width: '99%'}
                                }
                            },
                            defaults: {
                                width: '99%'
                            },
                            items: [
                                {
                                    xtype: 'timestampdatefield',
                                    fieldLabel: 'تاریخ استخدام',
                                    bind: {
                                        value: '{ssupOccurReview.employeedate}',
                                        disabled: '{disableTextBoxes}'
                                    },
                                    allowBlank: false,
                                    name: 'employeedate',
                                    id: 'employeedate',
                                    validator: function (fieldValue) {
                                        fieldValue = new Date(InsuranceTechnical.tamin.helpers.Persian.taminDateToGregorian(fieldValue));
                                        var bound = new Date();
                                        return fieldValue <= bound;
                                    }
                                },
                                {
                                    xtype: 'tcombobox',
                                    fieldLabel: 'وضعیت استخدام',
                                    displayField: 'name',
                                    valueField: 'value',
                                    editable: false,
                                    matchFieldWidth: true,
                                    id: 'employeestat',
                                    bind: {
                                        value: '{ssupOccurReview.employeestat}'
                                    },
                                    store: {
                                        fields: ['name', 'value'],
                                        data: [
                                            {name: 'ساعتی', value: '0'},
                                            {name: 'روزمزد', value: '1'},
                                            {name: 'پیمانی', value: '2'},
                                            {name: 'قرارداد موقت', value: '3'},
                                            {name: 'قرارداد دائم', value: '4'},
                                            {name: 'سایر', value: '5'}
                                        ]
                                    }
                                },
                                {
                                    xtype: 'timestampdatefield',
                                    fieldLabel: 'تاریخ شروع پرداخت حق بیمه در کارگاه',
                                    bind: {
                                        value: '{ssupOccurReview.firstworkdate}'
                                    },
                                    labelWidth: 240,
                                    name: 'firstworkdate',
                                    id: 'firstworkdate',
                                    validator: function (fieldValue) {
                                        fieldValue = new Date(InsuranceTechnical.tamin.helpers.Persian.taminDateToGregorian(fieldValue));
                                        var bound = new Date();
                                        return fieldValue <= bound;
                                    }
                                },
                                {
                                    xtype: 'ttextfield',
                                    fieldLabel: 'شغل موظف',
                                    allowBlank: false,
                                    name: 'jobdesc',
                                    id: 'jobdesc',
                                    maxLength: 25,
                                    enforceMaxLength: true,
                                    bind: {
                                        value: '{ssupOccurReview.jobdesc}'
                                    }
                                },
                                {
                                    xtype: 'tcombobox',
                                    fieldLabel: 'وسیله ایاب و ذهاب ',
                                    labelWidth: 120,
                                    matchFieldWidth: true,
                                    displayField: 'name',
                                    editable: false,
                                    valueField: 'value',
                                    id: 'vehicle',
                                    bind: {
                                        value: '{ssupOccurReview.vehicle}'
                                    },
                                    store: {
                                        fields: ['name', 'value'],
                                        data: [
                                            {name: 'سرویس ایاب ذهاب', value: '0'},
                                            {name: 'وسایل عمومی', value: '1'},
                                            {name: 'وسیله شخصی', value: '2'},
                                            {name: 'سایرِ', value: '3'}
                                        ]
                                    }
                                },
                                {
                                    xtype: 'ttextfield',
                                    fieldLabel: ' محل کار در کارگاه ',
                                    name: 'isujoblocation',
                                    id: 'isujoblocation',
                                    bind: {
                                        value: '{ssupOccurReview.isujoblocation}'
                                    }
                                },
                                {
                                    xtype: 'ttextfield',
                                    fieldLabel: 'دستمزد روزانه',
                                    name: 'dailyWage',
                                    id: 'dailyWage',
                                    maskRe: /[0-9]/,
                                    regex: /[0-9]/,
                                    enforceMaxLength: true,
                                    maxLength: 9,
                                    bind: {
                                        value: '{ssupOccurReview.dailyWage}'
                                    }
                                },
                                {
                                    xtype: 'cellspacer',
                                    colspan: 2
                                },
                                {
                                    xtype: 'timestampdatefield',
                                    fieldLabel: 'مدت اشتغال در فعالیت منجر به حادثه از تاریخ',
                                    bind: {
                                        value: '{ssupOccurReview.jobFromDate}'
                                    },
                                    name: 'jobFromDate',
                                    id: 'jobFromDate',
                                    labelWidth: 240
                                },
                                {
                                    xtype: 'timestampdatefield',
                                    fieldLabel: 'تا',
                                    bind: {
                                        value: '{ssupOccurReview.jobUntilDate}'
                                    },
                                    name: 'jobUntilDate',
                                    id: 'jobUntilDate'
                                },
                                {
                                    xtype: 'cellspacer',
                                    colspan: 2
                                },
                                {
                                    xtype: 'tfieldset',
                                    colspan: 2,
                                    title: 'اوقات کار بیمه شده',
                                    layout: {
                                        type: 'table',
                                        columns: 2,
                                        tableAttrs: {
                                            style: {width: '99%'}
                                        }
                                    },
                                    defaults: {
                                        width: '99%'
                                    },
                                    items: [
                                        {
                                            xtype: 'ttimefield',
                                            name: 'mornStarttime',
                                            fieldLabel: 'صبح از',
                                            /*   minValue: '00:00 AM',
                                             maxValue: '12:00 PM',*/
                                            /* allowBlank: false,*/
                                            editable: false,
                                            format: 'H:i',
                                            valuePublishEvent: ['select', 'change'],
                                            bind: {
                                                value: '{ssupOccurReview.mornStarttime}',
                                                allowBlank: '{timeAllow}'
                                            },
                                            listeners: {
                                                change: 'onTimeChange'
                                            }
                                        },
                                        {
                                            xtype: 'ttimefield',
                                            name: 'mornFinishtime',
                                            fieldLabel: 'لغایت',
                                            /*   minValue: '12:00 PM',
                                             maxValue: '17:00 PM',*/
                                            /* allowBlank: false,*/
                                            editable: false,
                                            format: 'H:i',
                                            valuePublishEvent: ['select', 'change'],
                                            bind: {
                                                value: '{ssupOccurReview.mornFinishtime}',
                                                allowBlank: '{timeAllow}'
                                            },
                                            listeners: {
                                                change: 'onmornFinishChange'
                                            }
                                        },
                                        {
                                            xtype: 'cellspacer',
                                            colspan: 2
                                        },
                                        {
                                            xtype: 'ttimefield',
                                            name: 'evenStarttime',
                                            fieldLabel: 'عصر از',
                                            /* maxValue: '17:00PM',
                                             maxValue: '11:59 PM',*/
                                            //         allowBlank: false,
                                            editable: false,
                                            format: 'H:i',
                                            valuePublishEvent: ['select', 'change'],
                                            bind: {
                                                value: '{ssupOccurReview.evenStarttime}',
                                                allowBlank: '{timeAllow}'
                                            },
                                            listeners: {
                                                change: 'onevenStarttimeChange'
                                            }
                                        },
                                        {

                                            xtype: 'ttimefield',
                                            name: 'evenFinishtime',
                                            fieldLabel: 'لغایت',
                                            /*minValue: '06:00 PM',
                                             maxValue: '11:59 PM',*/
                                            editable: false,
                                            format: 'H:i',
                                            valuePublishEvent: ['select', 'change'],
                                            bind: {
                                                value: '{ssupOccurReview.evenFinishtime}',
                                                allowBlank: '{timeAllow}'
                                            },
                                            listeners: {
                                                change: 'onevenFinishtimeChange'
                                            }
                                        },
                                        {
                                            xtype: 'cellspacer',
                                            colspan: 2

                                        },
                                        {

                                            xtype: 'ttimefield',
                                            name: 'nighStarttime',
                                            fieldLabel: 'شب از',
                                            /*    maxValue: '06:00PM',
                                             maxValue: '11:59 PM',*/
                                            //  allowBlank: false,
                                            editable: false,
                                            format: 'H:i',
                                            valuePublishEvent: ['select', 'change'],
                                            bind: {
                                                value: '{ssupOccurReview.nighStarttime}',
                                                allowBlank: '{timeAllow}'
                                            },
                                            listeners: {
                                                change: 'onnighStarttimeChange'
                                            }
                                        },
                                        {

                                            xtype: 'ttimefield',
                                            name: 'nighFinishtime',
                                            fieldLabel: 'لغایت',
                                            /*   maxValue: '06:00PM',
                                             maxValue: '11:59 PM',*/
                                            //  allowBlank: false,
                                            editable: false,
                                            format: 'H:i',
                                            valuePublishEvent: ['select', 'change'],
                                            bind: {
                                                value: '{ssupOccurReview.nighFinishtime}',
                                                allowBlank: '{timeAllow}'
                                            },
                                            listeners: {
                                                change: 'onnighFinishtimeChange'
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'tfieldset',
                            title: 'چگونگی وقوع حادثه',
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
                                    xtype: 'timestampdatefield',
                                    fieldLabel: 'تاریخ وقوع حادثه',
                                    name: 'occurDate',
                                    id: 'occurDate',
                                    allowBlank: false,
                                    bind: {
                                        value: '{ssupOccurReview.occurDate}'
                                    },
                                    listeners: {
                                        change: function () {
                                            var day = InsuranceTechnical.tamin.PDate.getDay(new Date(this.value));
                                            Ext.getCmp('occurDay').setValue(day);
                                        }
                                    },
                                    validator: function (fieldValue) {
                                        fieldValue = new Date(InsuranceTechnical.tamin.helpers.Persian.taminDateToGregorian(fieldValue));
                                        var bound = new Date();
                                        return fieldValue <= bound;
                                    }
                                },
                                {
                                    xtype: 'tdisplayfield',
                                    fieldLabel: 'روز وقوع حادثه',
                                    name: 'occurDay',
                                    id: 'occurDay',
                                    renderer: function (value, field) {
                                        switch (value) {
                                            case 0:
                                                return 'شنبه';
                                                break;
                                            case 1:
                                                return 'یکشنبه';
                                                break;
                                            case 2:
                                                return 'دوشنبه';
                                                break;
                                            case 3:
                                                return 'سه شنبه';
                                                break;
                                            case 4:
                                                return 'چهارشنبه';
                                                break;
                                            case 5:
                                                return 'پنج شنبه';
                                                break;
                                            case 6:
                                                return 'جمعه';
                                                break;
                                        }
                                    }
                                },
                                {
                                    xtype: 'ttimefield',
                                    name: 'mornFinishtime',
                                    fieldLabel: 'ساعت وقوع حادثه',
                                    /*   minValue: '1:30 AM',
                                     maxValue: '9:15 PM',*/
                                    editable: false,
                                    allowBlank: false,
                                    format: 'H:i',
                                    bind: {
                                        value: '{ssupOccurReview.occurTime}'
                                    },
                                    listeners: {
                                        change: 'occurTimeFlagChang'
                                    }
                                },
                                {
                                    xtype: 'ttextfield',
                                    fieldLabel: 'محل وقوع حادثه',
                                    allowBlank: false,
                                    maxLength: 25,
                                    enforceMaxLength: true,
                                    name: 'occurAddr',
                                    bind: {
                                        value: '{ssupOccurReview.occurAddr}'
                                    }
                                },
                                {
                                    xtype: 'ttextfield',
                                    fieldLabel: 'کار بیمه شده هنگام حادثه',
                                    allowBlank: false,
                                    maxLength: 25,
                                    enforceMaxLength: true,
                                    name: 'occurJobdesc',
                                    bind: {
                                        value: '{ssupOccurReview.occurJobdesc}'
                                    }
                                },
                                {
                                    xtype: 'ttextfield',
                                    maxLength: 25,
                                    enforceMaxLength: true,
                                    fieldLabel: 'ابزار کار بیمه شده هنگام حادثه',
                                    name: 'occurTools',
                                    bind: {
                                        value: '{ssupOccurReview.occurTools}'

                                    }
                                },
                                {
                                    xtype: 'ttextfield',
                                    fieldLabel: 'وسایل حفاظتی',
                                    maxLength: 25,
                                    enforceMaxLength: true,
                                    name: 'occurEquip',
                                    bind: {
                                        value: '{ssupOccurReview.occurEquip}'
                                    }
                                },
                                {
                                    xtype: 'tcombobox',
                                    fieldLabel: ' کد علت وقوع حادثه',
                                    matchFieldWidth: true,
                                    displayField: 'name',
                                    valueField: 'value',
                                    editable: false,
                                    allowBlank: false,
                                    id: 'occurReason',
                                    bind: {
                                        value: '{ssupOccurReview.occurReason}'
                                    },
                                    store: {
                                        fields: ['name', 'value'],
                                        data: [
                                            {name: 'بی احتیاطی بیمه شده', value: '1'},
                                            {name: 'عدم رعایت مقررات ایمنی', value: '2'},
                                            {name: 'قصور شخص ثالث', value: '3'}
                                        ]
                                    }
                                },
                                {
                                    xtype: 'tcombobox',
                                    fieldLabel: 'مسئول حادثه',
                                    displayField: 'name',
                                    valueField: 'value',
                                    editable: false,
                                    matchFieldWidth: true,
                                    id: 'occurRel',

                                    bind: {
                                        value: '{ssupOccurReview.occurRel}'
                                    },
                                    store: {
                                        fields: ['name', 'value'],
                                        data: [
                                            {name: 'بیمه شده', value: '1'},
                                            {name: 'کارفرما', value: '2'},
                                            {name: 'شخص ثالث', value: '3'}
                                        ]
                                    }
                                },
                                {
                                    xtype: 'tcombobox',
                                    fieldLabel: 'علت وقوع حادثه',
                                    pageSize: 10,
                                    displayField: 'causeDesc',
                                    id: 'causeDesc',
                                    valueField: 'causeCode',
                                    editable: false,
                                    matchFieldWidth: true,
                                    allowBlank: false,
                                    bind: {
                                        store: '{occurCauseStore}',
                                        value: '{ssupOccurReview.occurCause.causeCode}'
                                    }
                                },
                                {
                                    xtype: 'tcombobox',
                                    fieldLabel: 'کد نوع حادثه',
                                    pageSize: 10,
                                    displayField: 'typeDesc',
                                    valueField: 'typeCode',
                                    editable: false,
                                    matchFieldWidth: true,
                                    id: 'typeCode',
                                    allowBlank: false,
                                    bind: {
                                        store: '{occurTypeStore}',
                                        value: '{ssupOccurReview.occurType.typeCode}'
                                    }
                                },
                                {
                                    xtype: 'tcombobox',
                                    fieldLabel: 'نتیجه و آثار حادثه ',
                                    displayField: 'name',
                                    valueField: 'value',
                                    editable: false,
                                    matchFieldWidth: true,
                                    id: 'occurResult',
                                    bind: {
                                        value: '{ssupOccurReview.occurResult}'
                                    },
                                    store: {
                                        fields: ['name', 'value'],
                                        data: [
                                            {name: 'فوت', value: '0'},
                                            {name: 'از کارافتادگی کلی', value: '1'},
                                            {name: 'از کارافتادگی جزیی(درصد کاهش توانایی بین 33% تا 66%)', value: '2'},
                                            {name: 'نقص عضو(درصد کاهش توانایی کمتر از 33%)', value: '3'},
                                            /*{name: 'بهبودی کامل', value: '4'},*/
                                            {name: 'در حال استراحت پزشکی', value: '4'},
                                            {name: 'دریافت غرامت دستمزد و بهبودی', value: '5'},
                                            /*{name: 'غرامت نقص عضو', value: '7'},*/
                                        ]
                                    }
                                },
                                {
                                    xtype: 'ttagfield',
                                    fieldLabel: 'عضو حادثه دیده',
                                    name: 'partCode',
                                    id: 'occurPart',
                                    // pageSize: 50,
                                    valueField: 'partCode',
                                    displayField: 'partDesc',
                                    // reference: 'minorPensionerRef',
                                    publishes: 'value',
                                    allowBlank: false,
                                    multiSelect: true,
                                    bind: {
                                        store: '{occurPartStore}'
                                    }
                                },
                                {
                                    xtype: 'cellspacer',
                                    colspan: 2
                                },
                                {
                                    xtype: 'tcombobox',
                                    fieldLabel: 'آیا کارفرما دراجرای ماده 90 قانون،معاینات پزشکی قبل از استخدام، بمنظور احراز قابلیت و استعداد جسمانی متناسب با کارمرجوع را انجام داده است؟ ',
                                    id: 'isrwDo90',
                                    labelWidth: 900,
                                    displayField: 'name',
                                    valueField: 'value',
                                    editable: false,
                                    matchFieldWidth: true,
                                    colspan: '3',
                                    allowBlank: true,
                                    bind: {
                                        value: '{ssupOccurReview.isrwDo90}'
                                    },
                                    store: {
                                        fields: ['name', 'value'],
                                        data: [
                                            {name: 'خیر', value: '2'},
                                            {name: 'بلی', value: '1'}
                                        ]
                                    }
                                },
                                {
                                    xtype: 'tcombobox',
                                    fieldLabel: 'آیا بیمه شده در ارتباط با فعالیتی که دچار حادثه گردیده ، آموزش لازم را دیده است؟ ',
                                    id: 'istrain',
                                    labelWidth: 900,
                                    displayField: 'name',
                                    valueField: 'value',
                                    editable: false,
                                    matchFieldWidth: true,
                                    colspan: '3',
                                    allowBlank: true,
                                    bind: {
                                        value: '{ssupOccurReview.istrain}'
                                    },
                                    store: {
                                        fields: ['name', 'value'],
                                        data: [
                                            {name: 'خیر', value: '2'},
                                            {name: 'بلی', value: '1'}
                                        ]
                                    }
                                },
                                {
                                    xtype: 'tcombobox',
                                    fieldLabel: 'آیا کارفرما در اجرای ماده 95 قانون کار، وقوع حادثه را به اداره کار و امور اجتماعی محل اعلام نموده است؟ ',
                                    id: 'isrwDo95',
                                    labelWidth: 900,
                                    displayField: 'name',
                                    valueField: 'value',
                                    editable: false,
                                    colspan: '3',
                                    matchFieldWidth: true,
                                    allowBlank: true,
                                    bind: {
                                        value: '{ssupOccurReview.isrwDo95}'
                                    },
                                    store: {
                                        fields: ['name', 'value'],
                                        data: [
                                            {name: 'خیر', value: '2'},
                                            {name: 'بلی', value: '1'}
                                        ]
                                    }
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
                            text: 'ذخیره',
                            id: 'saveOccurReview',
                            iconCls: 'icon database_save',
                            handler: 'onOccurReviewEditButton',
                            bind: {
                                disabled: '{flagSave}'
                            }
                        },
                        {
                            xtype: 'tbutton',
                            text: 'بازگشت',
                            name: 'cancel',
                            handler: 'onRetunButton',
                            iconCls: 'icon arrow_right'
                        }
                    ]
                }
            ]
        }
    ]
});



