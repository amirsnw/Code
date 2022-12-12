Ext.define('InsuranceTechnical.view.guardian.GuardianCreateReq',
        {
            extend: 'InsuranceTechnical.tamin.panel.Panel',
            xtype: 'guardian-create-req',
            title: 'ثبت درخواست',
            controller: 'guardian-create-req-controller',
            viewModel: 'guardian-create-req-model',
            id: 'tpan',
            items: [
                {
                    xtype: 'tform',
                    id: 'guardian-form-id',
                    items: [
                        {
                            xtype: 'tfieldset',
                            title: 'نوع درخواست',
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
                                    fieldLabel: 'نوع درخواست',
                                    name: 'requestType',
                                    id: 'requestType',
                                    // msgTarget: 'side',
                                    forceSelection: true,
                                    allowBlank: false,
                                    matchFieldWidth: true,
                                    editable: false,
                                    // valueField: 'debitTypeCode',
                                    displayField: 'name',
                                    // readOnly: true,
                                    // defaultValue: '90%',
                                    valueField: 'value',
                                    colspan: 1,
                                    bind: {
                                        // store: '{refundDebitType}',
                                        value: '{guardianInfo.requestType}',
                                        // disabled: '{editFieldsDisable}'
                                    },
                                    listeners: {
                                        afterrender: function (defaultFocus) {
                                            defaultFocus.focus(false, 200);

                                        }
                                    },
                                    store: {
                                        fields: ['name', 'value'],
                                        data: [
                                            {
                                                name: 'درخواست برقراری کفالت', 
                                                value: '1',
                                                hidden: '{guardianCancelDisabler}'
                                            },
                                            {
                                                name: 'درخواست ابطال کفالت توسط بیمه شده/ مستمری بگیر/ وکیل قانونی', 
                                                value: '2'
                                            },
                                            {
                                                name: 'بررسی کفالت به درخواست شعبه',
                                                value: '3'
                                            }
                                        ]
                                    }
                                    ,
                                    triggers: {
                                        delete: {
                                            cls: 'x-form-clear-trigger',
                                            weight: -2,
                                            handler: function () {
                                                arguments[0].setValue(null);
                                            }
                                        }
                                    }
                                },
                                {
                                    xtype: 'tcombobox',
                                    fieldLabel: 'درخواست برقراری کفالت',
                                    name: 'guardianRequestType',
                                    id: 'guardianRequestType',
                                    labelWidth: 150,
                                    msgTarget: 'side',
                                    forceSelection: true,
                                    allowBlank: false,
                                    matchFieldWidth: true,
                                    editable: false,
                                    // valueField: 'debitTypeCode',
                                    displayField: 'name',
                                    // readOnly: true,
                                    // defaultValue: '90%',
                                    valueField: 'value',
                                    colspan: 1,
                                    bind: {
                                        // store: '{refundDebitType}',
                                        value: '{guardianInfo.requesterType}',
                                        disabled: '{guardianReqDisabler}'
                                    },
                                    store: {
                                        fields: ['name', 'value'],
                                        data: [
                                            {name: 'بیمه شده/ مستمری بگیر/ وکیل قانونی', value: '0'},
                                            {name: 'پدر/ مادر/ شوهر بیمه شده/ زن/ وکیل قانونی/ (در صورت فوت بیمه شده)', value: '1'},
                                            /*{name: 'واحد امور فنی مستمری ها', value: '2'}*/
                                        ]
                                    },
                                    triggers: {
                                        delete: {
                                            cls: 'x-form-clear-trigger',
                                            weight: -2,
                                            handler: function () {
                                                arguments[0].setValue(null);
                                            }
                                        }
                                    }
                                },
                                {
                                    xtype: 'tcombobox',
                                    fieldLabel: 'علت درخواست',
                                    name: 'requestReason',
                                    id: 'requestReason',
                                    msgTarget: 'side',
                                    forceSelection: true,
                                    allowBlank: false,
                                    matchFieldWidth: true,
                                    editable: false,
                                    displayField: 'name',
                                    valueField: 'value',
                                    colspan: 1,
                                    bind: {
                                        // store: '{refundDebitType}',
                                        value: '{guardianInfo.reasonFanni}',
                                        disabled: '{guardianReqReasonDisabler}'
                                    },
                                    store: {
                                        fields: ['name', 'value'],
                                        data: [
                                            {name: 'بررسي مجدد کفالت والدين در زمان برقراري مستمري بازماندگان', value: '0'},
                                            {name: 'بررسي مجدد کفالت شوهر بيمه شده زن با توجه به فوت بيمه شده اصل', value: '1'},
                                            {name: 'بررسي کفالت فرزندان ذکور', value: '2'},
                                            {name: 'بررسي کفالت فرزندان اناث', value: '3'}
                                        ]
                                    },
                                    triggers: {
                                        delete: {
                                            cls: 'x-form-clear-trigger',
                                            weight: -2,
                                            handler: function () {
                                                arguments[0].setValue(null);
                                            }
                                        }
                                    }
                                },
                                {
                                    xtype: 'ttextarea',
                                    name: 'cancelationfDesc',
                                    id: 'cancelationfDesc',
                                    fieldLabel: 'علت ابطال کفالت',
                                    //allowBlank: false,
                                    //colspan: 3,
                                    //height: 140,
                                    itemId: 'deffocus',
                                    disabled: true,
                                    //width: '100%',
                                    //maxLen: 400,
                                    bind: {
                                        value: '{guardianInfo.cancelationDesc}',
                                        disabled: '{guardianCancelDisabler}'
                                    }
                                }
                                ,
                                {
                                    xtype: 'timestampdatefield',
                                    fieldLabel: 'تاریخ فوت بیمه شده',
                                    //width: '50%',
                                    //  allowBlank: false,
                                    bind: {
                                        value: '{guardianInfo.isuDeadDate}',
                                        disabled: '{guardianDDDisabler}'
                                    },
                                    triggers: {
                                        delete: {
                                            cls: 'x-form-clear-trigger',
                                            weight: -2,
                                            handler: function () {
                                                arguments[0].setValue(null);
                                            }
                                        }
                                    }
                                },
                               
                                {xtype: 'cellspacer'}
                            ]
                        },
                        {
                            xtype: 'tfieldset',
                            title: 'اطلاعات بیمه شده',
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
                                    fieldLabel: 'ملیت بیمه شده اصلی',
                                    name: 'insuredType',
                                    id: 'insuredType',
                                    forceSelection: true,
                                    allowBlank: false,
                                    matchFieldWidth: true,
                                    editable: false,
                                    displayField: 'name',
                                    valueField: 'value',
                                    colspan: 1,
                                    bind: {
                                        value: '{guardianInfo.nationality}',
                                        disabled: '{guardianEdite}'
                                    },
                                    listeners: {
                                        afterrender: function (defaultFocus) {
                                            defaultFocus.focus(false, 200);
                                        },
                                        change: 'onChangeNationality'
                                    },
                                    store: {
                                        fields: ['name', 'value'],
                                        data: [
                                            {
                                                name: 'ایرانی',
                                                value: '1',                                               
                                            },
                                            {
                                                name: 'غیر ایرانی',
                                                value: '2'
                                            }
                                        ]
                                    },
                                    triggers: {
                                        delete: {
                                            cls: 'x-form-clear-trigger',
                                            weight: -2,
                                            handler: function () {
                                                arguments[0].setValue(null);
                                            }
                                        }
                                    }
                                },
                                {
                                    xtype: 'cellspacer',
                                    colspan :'2'                                    
                                },
                                {
                                    xtype: 'ttextfield',
                                    fieldLabel: 'کد ملی',
                                    maxLength: 10,
                                    minLength: 10,
                                    allowBlank: false,
                                    name: 'nationalId',
                                    vtype: 'inic',
                                    id: 'nationalId',
                                    maskRe: /[0-9]/,
                                    enforceMaxLength: true,
                                    bind: {
                                        value: '{guardianInfo.nationalCode}',
                                        hidden: '{isForeign}',
                                    },
                                    listeners: {
                                        change: 'onFindWithNationalCode',
                                    },
                                    triggers: {
                                        delete: {
                                            cls: 'x-form-clear-trigger',
                                            weight: -2,
                                            handler: function () {
                                                arguments[0].setValue(null);
                                            }
                                        }
                                    }
                                },
                                {
                                    xtype: 'ttextfield',
                                    fieldLabel: 'شناسه خارجی',
                                    maxLength: 16,
                                    minLength: 1,
                                    allowBlank: false,
                                    name: 'foreignId',
                                    id: 'foreignId',
                                    maskRe: /[0-9]/,
                                    enforceMaxLength: true,
                                    bind: {
                                        value: '{guardianInfo.foreignCode}',
                                        hidden: '{!isForeign}',
                                    },
                                    listeners: {
                                        change: 'onFindWithNationalCode',
                                    },
                                    triggers: {
                                        delete: {
                                            cls: 'x-form-clear-trigger',
                                            weight: -2,
                                            handler: function () {
                                                arguments[0].setValue(null);
                                            }
                                        }
                                    }
                                },
                                {
                                    xtype: 'tdisplayfield',
                                    fieldLabel: 'شماره بیمه',
                                    name: 'accountNo',
                                    id: 'accountNo',
                                    maskRe: /[0-9]/,
                                    regex: /[0-9]/,
                                    allowBlank: false,
                                    bind: {
                                        value: '{guardianInfo.insuranceId}'
                                    }
                                },
                                {
                                    xtype: 'ttextfield',
                                    fieldLabel: 'شماره مستمری',
                                    name: 'caNo',
                                    id: 'caNo',
                                    maxLength: 10,
                                    minLength: 10,
                                    maskRe: /[0-9]/,
                                    regex: /[0-9]/,
                                    bind: {
                                        value: '{guardianInfo.pensionNo}'

                                    }
                                },
                                {
                                    xtype: 'cellspacer'
                                },
                                {
                                    xtype: 'tdisplayfield',
                                    fieldLabel: 'نام',
                                    name: 'fName',
                                    maskRe: /[^a-zA-Z0-9]/,
                                    allowBlank: false,
                                    id: 'fName',
                                    bind: {
                                        value: '{guardianInfo.firstName}'
                                    }
                                },
                                {
                                    xtype: 'tdisplayfield',
                                    fieldLabel: 'نام خانوادگی',
                                    name: 'lName',
                                    maskRe: /[^a-zA-Z0-9]/,
                                    allowBlank: false,
                                    id: 'lName',
                                    bind: {
                                        value: '{guardianInfo.lastName}'
                                    }
                                },
                                {
                                    xtype: 'tdisplayfield',
                                    fieldLabel: 'کد شعبه',
                                    hidden: true,
                                    bind: {
                                        value: '{guardianInfo.branchCode}'
                                    }
                                },
                                {
                                    xtype: 'cellspacer'
                                },
                                {
                                    xtype: 'tdisplayfield',
                                    fieldLabel: 'شماره شناسنامه',
                                    maxLength: 15,
                                    name: 'idNo',
                                    id: 'idNo',
                                    allowBlank: false,
                                    maskRe: /[0-9]/,
                                    bind: {
                                        value: '{guardianInfo.idNo}'
                                    }
                                },
                                {
                                    xtype: 'tdisplayfield',
                                    // xtype: 'timestampdatefield',
                                    fieldLabel: 'تاریخ تولد',
                                    allowBlank: false,
                                    bind: {
                                        value: '{guardianInfo.birthDate}'
                                    }
                                },
                                {
                                    xtype: 'cellspacer'
                                },
                                {
                                    xtype: 'tdisplayfield',
                                    fieldLabel: 'کد شعبه بیمه شده اصلی',
                                    allowBlank: false,
                                    bind: {
                                        value: '{guardianInfo.branchCode}'
                                    }
                                },
                            ]
                        },
                        {
                            xtype: 'tfieldset',
                            title: 'اطلاعات درخواست',
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
                                    xtype: 'ttextfield',
                                    fieldLabel: 'شماره درخواست',
                                    name: 'requestNo',
                                    maxLength: 20,
                                    id: 'requestNo',
                                    maskRe: /[0-9]/,
                                    regex: /[0-9]/,
                                    allowBlank: false,
                                   // width: 500,
                                    bind: {
                                        value: '{guardianInfo.reqNo}',
                                        disabled: '{guardianEdite}'
                                    }
                                },
                                {
                                    xtype: 'timestampdatefield',
                                    fieldLabel: 'تاریخ درخواست',
                                    allowBlank: false,
                                    //width: 500,
                                    bind: {
                                        value: '{guardianInfo.reqDate}',
                                        disabled: '{guardianEdite}'
                                    }


                                },
                                {xtype: 'cellspacer'}
                            ]
                        },
                        {
                            xtype: 'tfieldset',
                            title: 'اطلاعات مورد تکفل',
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
                                    fieldLabel: 'نوع کفالت',
                                    name: 'guardianType',
                                    forceSelection: true,
                                    allowBlank: false,
                                    matchFieldWidth: true,
                                    editable: false,
                                    width: 375,
                                    displayField: 'name',
                                    valueField: 'value',
                                    colspan: 1,
                                    bind: {
                                        value: '{guardianInfo.guardianType}'
                                    },
                                    store: {
                                        fields: ['name', 'value'],
                                        data: [
                                            {name: 'پدر', value: '1'},
                                            {name: 'مادر', value: '2'},
                                            {name: 'شوهر', value: '3'},
                                            {name: 'پدر و مادر', value: '4'},
                                            {name: 'فرزند ذکور', value: '5'},
                                            {name: 'فرزند اناث', value: '6'}
                                        ]
                                    }
                                    ,
                                    triggers: {
                                        delete: {
                                            cls: 'x-form-clear-trigger',
                                            weight: -2,
                                            handler: function () {
                                                arguments[0].setValue(null);
                                            }
                                        }
                                    }
                                },
                                {
                                    xtype: 'cellspacer'
                                },
                                {
                                    xtype: 'cellspacer'
                                },
                                {
                                    xtype: 'tcombobox',
                                    fieldLabel: 'ملیت مورد تکفل',
                                    name: 'insuredTypeGuarType',
                                    id: 'insuredTypeGuarType',
                                    // msgTarget: 'side',
                                    forceSelection: true,
                                    allowBlank: false,
                                    matchFieldWidth: true,
                                    editable: false,
                                    displayField: 'name',
                                    // readOnly: true,
                                    // defaultValue: '90%',
                                    valueField: 'value',
                                    colspan: 1,
                                    bind: {
                                        value: '{guardianInfo.guar1Nationality}',
                                    },
                                    listeners: {
                                        afterrender: function (defaultFocus) {
                                            defaultFocus.focus(false, 200);
                                        },
                                        change: 'onChangeGuar1Nationality'
                                    },
                                    store: {
                                        fields: ['name', 'value'],
                                        data: [
                                            {
                                                name: 'ایرانی',
                                                value: '1',
                                            },
                                            {
                                                name: 'غیر ایرانی',
                                                value: '2'
                                            }
                                        ]
                                    }
                                    ,
                                    triggers: {
                                        delete: {
                                            cls: 'x-form-clear-trigger',
                                            weight: -2,
                                            handler: function () {
                                                arguments[0].setValue(null);
                                            }
                                        }
                                    }
                                },
                                {
                                    xtype: 'cellspacer'
                                },
                                {
                                    xtype: 'cellspacer'
                                },
                                {
                                    xtype: 'ttextfield',
                                    fieldLabel: 'کد ملی',
                                    maxLength: 10,
                                    minLength: 10,
                                    maskRe: /[0-9]/,
                                    regex: /[0-9]/,
                                    allowBlank: false,
                                    enforceMaxLength: true,
                                    name: 'guar1',
                                    bind: {
                                        value: '{guardianInfo.guardianNationalCode}',
                                        disabled: '{isGuar1Foreign}',
                                        hidden: '{isGuar1Foreign}'
                                    },
                                    triggers: {
                                        delete: {
                                            cls: 'x-form-clear-trigger',
                                            weight: -2,
                                            handler: function () {
                                                arguments[0].setValue(null);
                                            }
                                        }
                                    }
                                },
                                {
                                    xtype: 'ttextfield',
                                    fieldLabel: 'شناسه خارجی',
                                    maxLength: 16,
                                    minLength: 1,
                                    maskRe: /[0-9]/,
                                    regex: /[0-9]/,
                                    enforceMaxLength: true,
                                    allowBlank: false,
                                    name: 'guar1',
                                    bind: {
                                        value: '{guardianInfo.guardianForeignCode}',
                                        disabled: '{!isGuar1Foreign}',
                                        hidden: '{!isGuar1Foreign}'
                                    },
                                    triggers: {
                                        delete: {
                                            cls: 'x-form-clear-trigger',
                                            weight: -2,
                                            handler: function () {
                                                arguments[0].setValue(null);
                                            }
                                        }
                                    }
                                },
                                {
                                    xtype: 'ttextfield',
                                    fieldLabel: 'نام و نام خانوادگی',
                                    name: 'requestName',
                                    maskRe: /[^a-zA-Z0-9]/,
                                    id: 'requestName',
                                    maxLength: 20,
                                    enforceMaxLength: true,
                                    allowBlank: false,
                                    bind: {
                                        value: '{guardianInfo.guardianFullName}',
                                        fieldLabel: '{firstNameLabel}'
                                    }
                                },                               
                                {
                                    xtype: 'cellspacer'
                                },
                                {
                                    xtype: 'tdatefield',
                                    fieldLabel: 'تاریخ تولد',
                                    allowBlank: false,
                                    bind: {
                                        value: '{guardianInfo.guardianBirthDate}'
                                    }
                                },
                                {
                                    xtype: 'tcombobox',
                                    fieldLabel: 'شهر محل صدور',
                                    name: 'description',
                                    id: 'guarExpCityCode',
                                    displayField: 'description',
                                    valueField: 'code',
                                    editable: true,
                                    pageSize: 10,
                                    minChars: 2,
                                    //getPageUrl: InsuranceTechnical.helper.Urls.getUrl('CityItemPage'),
                                    maskRe: /[^a-zA-Z]/,
                                    width: '375px',
                                    matchFieldWidth: true,
                                    allowBlank: false,
                                    bind: {
                                        store: '{cityStore}',
                                        value: '{guardianInfo.guarExpCityCode}'
                                    },
                                    displayTpl: Ext.create('Ext.XTemplate',
                                            '<tpl for=".">',
                                            '{code} - {description}',
                                            '</tpl>'
                                            ),
                                    tpl: Ext.create('Ext.XTemplate',
                                            '<tpl for=".">',
                                            '<div class="x-boundlist-item">',
                                            '{code} - {description}',
                                            '</div>',
                                            '</tpl>'
                                            ),
                                    triggers: {
                                        delete: {
                                            cls: 'x-form-clear-trigger',
                                            weight: -2,
                                            handler: function () {
                                                arguments[0].setValue(null);
                                            }
                                        }
                                    },
                                    listeners: {
                                        beforequery: function (queryEvent) {
                                            
                                            var val = Ext.getCmp('guarExpCityCode').getValue();
                                            var numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
                                            if (val === null && filters !== null) {
                                                queryEvent.combo.getStore().removeFilter("1");
                                            }
                                            if (!queryEvent.cancel) {
                                                var filters = [];
                                                var sorters = [];
//                                                if (val) {
//                                                    filters.push({
//                                                        "property": 'description',
//                                                        "value": "%" + val + "%",
//                                                        "operator": "LIKE",
//                                                        "id": '1'
//                                                    });
//                                                }
                                                var searchItem = val.substring(0, 1);
                                                if (numbers.indexOf(searchItem) !== -1) {
                                                    filters.push({
                                                        "property": 'code',
                                                        "value": "%" + val + "%",
                                                        "operator": "LIKE",
                                                        "id": '1'
                                                    });
                                                } else {
                                                    filters.push({
                                                        "property": 'description',
                                                        "value": "%" + val + "%",
                                                        "operator": "LIKE",
                                                        "id": '1'
                                                    });
                                                }
                                                queryEvent.query = JSON.stringify(filters);
                                                queryEvent.combo.getStore().addFilter(filters);
                                            }
                                            return queryEvent;
                                        }
                                    }
                                },
                                {
                                    xtype: 'tcombobox',
                                    fieldLabel: 'شهر محل تولد',
                                    name: 'description',
                                    id: 'guarBirthCityCode',
                                    displayField: 'description',
                                    valueField: 'code',
                                    maskRe: /[^a-zA-Z]/,
                                    width: '375px',
                                    editable: true,
                                    pageSize: 10,
                                    minChars: 2,
                                    matchFieldWidth: true,
                                    allowBlank: false,
                                    displayTpl: Ext.create('Ext.XTemplate',
                                            '<tpl for=".">',
                                            '{code} - {description}',
                                            '</tpl>'
                                            ),
                                    tpl: Ext.create('Ext.XTemplate',
                                            '<tpl for=".">',
                                            '<div class="x-boundlist-item">',
                                            '{code} - {description}',
                                            '</div>',
                                            '</tpl>'
                                            ),
                                    bind: {
                                        store: '{cityStore}',
                                        value: '{guardianInfo.guarBirthCityCode}'
                                    },
                                    triggers: {
                                        delete: {
                                            cls: 'x-form-clear-trigger',
                                            weight: -2,
                                            handler: function () {
                                                arguments[0].setValue(null);
                                            }
                                        }
                                    }
                                    ,
                                    listeners: {
                                        beforequery: function (queryEvent) {
                                            
                                            var val = Ext.getCmp('guarBirthCityCode').getValue();
                                            var numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
                                            if (val === null && filters !== null) {
                                                queryEvent.combo.getStore().removeFilter("1");
                                            }
                                            if (!queryEvent.cancel) {
                                                var filters = [];
                                                var sorters = [];
                                                var searchItem = val.substring(0, 1);
                                                if (numbers.indexOf(searchItem) !== -1) {
                                                    filters.push({
                                                        "property": 'code',
                                                        "value": "%" + val + "%",
                                                        "operator": "LIKE",
                                                        "id": '1'
                                                    });
                                                } else {
                                                    filters.push({
                                                        "property": 'description',
                                                        "value": "%" + val + "%",
                                                        "operator": "LIKE",
                                                        "id": '1'
                                                    });
                                                }
                                                queryEvent.query = JSON.stringify(filters);
                                                queryEvent.combo.getStore().addFilter(filters);
                                            }
                                            return queryEvent;
                                        }
                                    }
                                },
                                {
                                    xtype: 'tcombobox',
                                    fieldLabel: 'ملیت مورد تکفل',
                                    name: 'insuredTypeGuarType2',
                                    id: 'insuredTypeGuarType2',
                                    // msgTarget: 'side',
                                    forceSelection: true,
                                    allowBlank: false,
                                    matchFieldWidth: true,
                                    editable: false,
                                    displayField: 'name',
                                    // readOnly: true,
                                    // defaultValue: '90%',
                                    valueField: 'value',
                                    colspan: 1,
                                    bind: {
                                        value: '{guardianInfo.guar2Nationality}',
                                        disabled: '{secondGDisabled}'
                                    },                                    
                                    listeners: {
                                        afterrender: function (defaultFocus) {
                                            defaultFocus.focus(false, 200);
                                        },
                                        change: 'onChangeGuar2Nationality'
                                    },
                                    store: {
                                        fields: ['name', 'value'],
                                        data: [
                                            {
                                                name: 'ایرانی',
                                                value: '1',
                                            },
                                            {
                                                name: 'غیر ایرانی',
                                                value: '2'
                                            }
                                        ]
                                    }
                                    ,
                                    triggers: {
                                        delete: {
                                            cls: 'x-form-clear-trigger',
                                            weight: -2,
                                            handler: function () {
                                                arguments[0].setValue(null);
                                            }
                                        }
                                    }
                                },
                                {
                                    xtype: 'cellspacer'
                                },
                                {
                                    xtype: 'cellspacer'
                                },
                                {
                                    xtype: 'ttextfield',
                                    fieldLabel: 'کد ملی',
                                    maxLength: 10,
                                    minLength: 10,
                                    maskRe: /[0-9]/,
                                    regex: /[0-9]/,
                                    allowBlank: false,
                                    enforceMaxLength: true,
                                    name: 'guar2',
                                    bind: {
                                        value: '{guardianInfo.guardianNationalCode2}',
                                        disabled: '{secondGDisabled || isGuar2Foreign}',
                                        hidden: '{isGuar2Foreign}'
                                    },
                                    triggers: {
                                        delete: {
                                            cls: 'x-form-clear-trigger',
                                            weight: -2,
                                            handler: function () {
                                                arguments[0].setValue(null);
                                            }
                                        }
                                    }
                                },
                                {
                                    xtype: 'ttextfield',
                                    fieldLabel: 'شناسه خارجی',
                                    maxLength: 16,
                                    minLength: 1,
                                    maskRe: /[0-9]/,
                                    regex: /[0-9]/,
                                    enforceMaxLength: true,
                                    allowBlank: false,
                                    name: 'guar2',
                                    bind: {
                                        value: '{guardianInfo.guardianForeignCode2}',
                                        disabled: '{secondGDisabled || !isGuar2Foreign}',
                                        hidden: '{!isGuar2Foreign}'
                                    },
                                    triggers: {
                                        delete: {
                                            cls: 'x-form-clear-trigger',
                                            weight: -2,
                                            handler: function () {
                                                arguments[0].setValue(null);
                                            }
                                        }
                                    }
                                },
                                {
                                    xtype: 'ttextfield',
                                    name: 'guardianName',
                                    id: 'guardianName',
                                    allowBlank: false,
                                    maxLength: 20,
                                    enforceMaxLength: true,
                                    bind: {
                                        value: '{guardianInfo.guardianFullName2}',
                                        disabled: '{secondGDisabled}',
                                        fieldLabel: '{SecondNameLabel}'
                                    }
                                },                              
                                {
                                    xtype: 'cellspacer'
                                },
                                {
                                    xtype: 'tdatefield',
                                    fieldLabel: 'تاریخ تولد',
                                    allowBlank: false,
                                    bind: {
                                        value: '{guardianInfo.guardianBirthDate2}',
                                        disabled: '{secondGDisabled}'
                                    }
                                },
                                {
                                    xtype: 'tcombobox',
                                    fieldLabel: 'شهر محل صدور',
                                    name: 'description',
                                    id: 'guarExpCityCode2',
                                    displayField: 'description',
                                    valueField: 'code',
                                    maskRe: /[^a-zA-Z]/,
                                    width: '375px',
                                    matchFieldWidth: true,
                                    editable: true,
                                    allowBlank: false,
                                    pageSize: 10,
                                    minChars: 2,
                                    displayTpl: Ext.create('Ext.XTemplate',
                                            '<tpl for=".">',
                                            '{code} - {description}',
                                            '</tpl>'
                                            ),
                                    tpl: Ext.create('Ext.XTemplate',
                                            '<tpl for=".">',
                                            '<div class="x-boundlist-item">',
                                            '{code} - {description}',
                                            '</div>',
                                            '</tpl>'
                                            ),
                                    bind: {
                                        store: '{cityStore}',
                                        value: '{guardianInfo.guarExpCityCode2}',
                                        disabled: '{secondGDisabled}'
                                    },
                                    triggers: {
                                        delete: {
                                            cls: 'x-form-clear-trigger',
                                            weight: -2,
                                            handler: function () {
                                                arguments[0].setValue(null);
                                            }
                                        }
                                    }
                                    ,
                                    listeners: {
                                        beforequery: function (queryEvent) {
                                            
                                            var val = Ext.getCmp('guarExpCityCode2').getValue();
                                            var numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
                                            if (val === null && filters !== null) {
                                                queryEvent.combo.getStore().removeFilter("1");
                                            }
                                            if (!queryEvent.cancel) {
                                                var filters = [];
                                                var sorters = [];
                                                var searchItem = val.substring(0, 1);
                                                if (numbers.indexOf(searchItem) !== -1) {
                                                    filters.push({
                                                        "property": 'code',
                                                        "value": "%" + val + "%",
                                                        "operator": "LIKE",
                                                        "id": '1'
                                                    });
                                                } else {
                                                    filters.push({
                                                        "property": 'description',
                                                        "value": "%" + val + "%",
                                                        "operator": "LIKE",
                                                        "id": '1'
                                                    });
                                                }
                                                queryEvent.query = JSON.stringify(filters);
                                                queryEvent.combo.getStore().addFilter(filters);
                                            }
                                            return queryEvent;
                                        }
                                    }
                                },
                                {
                                    xtype: 'tcombobox',
                                    fieldLabel: 'شهر محل تولد',
                                    name: 'description',
                                    id: 'guarBirthCityCode2',
                                    displayField: 'description',
                                    valueField: 'code',
                                    maskRe: /[^a-zA-Z]/,
                                    width: '375px',
                                    matchFieldWidth: true,
                                    editable: true,
                                    pageSize: 10,
                                    minChars: 2,
                                    allowBlank: false,
                                    displayTpl: Ext.create('Ext.XTemplate',
                                            '<tpl for=".">',
                                            '{code} - {description}',
                                            '</tpl>'
                                            ),
                                    tpl: Ext.create('Ext.XTemplate',
                                            '<tpl for=".">',
                                            '<div class="x-boundlist-item">',
                                            '{code} - {description}',
                                            '</div>',
                                            '</tpl>'
                                            ),
                                    bind: {
                                        store: '{cityStore}',
                                        value: '{guardianInfo.guarBirthCityCode2}',
                                        disabled: '{secondGDisabled}'
                                    },
                                    triggers: {
                                        delete: {
                                            cls: 'x-form-clear-trigger',
                                            weight: -2,
                                            handler: function () {
                                                arguments[0].setValue(null);
                                            }
                                        }
                                    }
                                    ,
                                    listeners: {
                                        beforequery: function (queryEvent) {
                                            
                                            var val = Ext.getCmp('guarBirthCityCode2').getValue();
                                            var numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
                                            if (val === null && filters !== null) {
                                                queryEvent.combo.getStore().removeFilter("1");
                                            }
                                            if (!queryEvent.cancel) {
                                                var filters = [];
                                                var sorters = [];
                                                var searchItem = val.substring(0, 1);
                                                if (numbers.indexOf(searchItem) !== -1) {
                                                    filters.push({
                                                        "property": 'code',
                                                        "value": "%" + val + "%",
                                                        "operator": "LIKE",
                                                        "id": '1'
                                                    });
                                                } else {
                                                    filters.push({
                                                        "property": 'description',
                                                        "value": "%" + val + "%",
                                                        "operator": "LIKE",
                                                        "id": '1'
                                                    });
                                                }
                                                queryEvent.query = JSON.stringify(filters);
                                                queryEvent.combo.getStore().addFilter(filters);
                                            }
                                            return queryEvent;
                                        }
                                    }
                                },
                                {
                                    xtype: 'ttextfield',
                                    fieldLabel: 'نشانی محل سکونت مورد تکفل',
                                    labelWidth: 180,
                                    width: '95%',
                                    maskRe: /[^a-zA-Z]/,
                                    name: 'guardianAddress',
                                    id: 'guardianAddress',
                                    colspan: 2,
                                    bind: {
                                        value: '{guardianInfo.subIsuAddress}'
                                    }
                                }
                                ,
                                {
                                    xtype: 'ttextfield',
                                    fieldLabel: 'شماره همراه کفیل',
                                    name: 'guardianMobileNumber',
                                    id: 'guardianMobileNumber',
                                    regex: /[0-9]/,
                                    maskRe: /[0-9]/,
                                    minLength: 11,
                                    maxLength: 11,
                                    enforceMaxLength: true,
                                    allowBlank: false,
                                    bind: {
                                        value: '{guardianInfo.insuredMobile}'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'tfieldset',
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
                                    xtype: 'checkboxfield',
                                    boxLabel: 'گواهی پزشک معالج و سایر مدارک مرتبط دال بر از کارافتادگی مورد تکفل ارائه گردیده است.',
                                    bind: {
                                        value: '{hasDoctor}'
                                    },
                                    // listeners:{
                                    //   change: function (t, newv, old, top) {
                                    //       
                                    //   }
                                    // },
                                    colspan: 3
                                },
                                {
                                    xtype: 'ttextfield',
                                    fieldLabel: 'نام و نام خانوادگی پزشک معالج',
                                    name: 'doctorsName',
                                    labelWidth: 180,
                                    maskRe: /[^a-zA-Z0-9]/,
                                    id: 'doctorsName',
                                    maxLength: 20,
                                    enforceMaxLength: true,
                                    allowBlank: false,
                                    bind: {
                                        value: '{guardianInfo.doctorName}',
                                        disabled: '{doctorDisabled}'
                                    }
                                },
                                {
                                    xtype: 'ttextfield',
                                    fieldLabel: 'شماره نظام پزشکی',
                                    name: 'hId',
                                    id: 'hId',
                                    maxLength: 13,
                                    maskRe: /[0-9]/,
                                    regex: /[0-9]/,
                                    allowBlank: false,
                                    bind: {
                                        value: '{guardianInfo.doctorCode}',
                                        disabled: '{doctorDisabled}'
                                    }
                                },
                                {xtype: 'cellspacer'}
                            ]
                        },
                        {
                            xtype: 'buttoncontainer',
                            items: [
                                {
                                    xtype: 'button',
                                    text: 'ذخیره',
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
