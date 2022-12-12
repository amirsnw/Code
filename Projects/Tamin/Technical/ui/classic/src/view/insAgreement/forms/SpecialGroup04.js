Ext.define('InsuranceTechnical.view.insAgreement.forms.SpecialGroup04',
    {
        // رانندگان حمل و نقل عمومی
        extend: 'InsuranceTechnical.tamin.panel.Panel',
        viewModel: 'insAgreement-spec-model',
        items: [
            {
                xtype: 'tfieldset',
                title: '',
                border: false,
                defaults: {
                    labelWidth: 150,
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
                        xtype: 'tcombobox',
                        fieldLabel: ' نوع راننده',
                        valueField: 'value',
                        displayField: 'name',
                        forceSelection: true,
                        allowBlank: false,
                        editable: false,
                        id: 'driverTypeCombo',
                        bind: {
                            value: '{agreeDetailSpec.type3}'
                        },
                        store: {
                            fields: ['name', 'value'],
                            data: [
                                {name: 'راننده درون شهری', value: '02'},
                                {name: 'راننده برون شهری', value: '01'}
                            ]
                        },
                        matchFieldWidth: true,
                        pageSize: 0,
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
                            change: 'onDriverTypeChange'
                        },
                        validator: function(fieldValue) {
                            var personInfo = this.up('insurance-agreement-new-main').getViewModel().get('personInfo');
                            if (!fieldValue) return false;
                            if (!personInfo.isuStat) {
                                InsuranceTechnical.tamin.window.MessageBox.showError('خطا', 'لطفا ابتدا اطلاعات هویتی بیمه شده را تکمیل نمایید.');
                                this.reset();
                                return false;
                            }
                            if (fieldValue === 'راننده درون شهری' && personInfo.isuStat.insuranceStatCode !== '01') {
                                InsuranceTechnical.tamin.window.MessageBox.showError('خطا', 'وضعيت بيمه شده راننده درون شهري بايد غيرآزمايشي باشد!');
                                this.reset();
                                return false;
                            }
                            return true;
                        }
                    },
                    {
                        xtype: 'cellspacer',
                        colspan: 2
                    },
                    {
                        xtype: 'tcombobox',
                        fieldLabel: 'وضعیت بیمه شده',
                        valueField: 'value',
                        displayField: 'name',
                        forceSelection: true,
                        allowBlank: false,
                        editable: false,
                        bind: {
                            value: '{agreeDetailSpec.documentNumber3}'
                        },
                        store: {
                            fields: ['name', 'value'],
                            data: [
                                {name: 'غیرآزمایشی', value: '01'},
                                {name: 'آزمایشی', value: '02'}
                            ]
                        },
                        matchFieldWidth: true,
                        pageSize: 0,
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
                        fieldLabel: 'نوع وسیله نقلیه',
                        valueField: 'value',
                        displayField: 'name',
                        forceSelection: true,
                        allowBlank: false,
                        editable: false,
                        bind: {
                            value: '{agreeDetailSpec.type5}',
                            disabled: '{agreeDetailSpec.type3 === "02"}'
                        },
                        store: {
                            fields: ['name', 'value'],
                            data: [
                                {name: 'راننده سواری و مینی بوس', value: '01'},
                                {name: 'راننده اتوبوس و کامیون باری', value: '02'}
                            ]
                        },
                        matchFieldWidth: true,
                        pageSize: 0,
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
                        fieldLabel: 'ضریب دستمزد',
                        allowBlank: false,
                        matchFieldWidth: true,
                        bind: {
                            value: '{agreeDetailSpec.type1}'
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
                        fieldLabel: 'شماره مجوز پایان قرارداد',
                        allowBlank: false,
                        maxLength: 15,
                        maskRe: /[0-9]/,
                        regex: /[0-9]/,
                        enforceMaxLength: true,
                        bind: {
                            value: '{agreeDetailSpec.documentNumber1}',
                            hidden: '{agreeDetailSpec.type3 !== "02"}',
                            disabled: '{agreeDetailSpec.type3 !== "02"}'
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
                        xtype: 'tdatefield',
                        fieldLabel: 'اعتبار مجوز پایان قرارداد',
                        allowBlank: false,
                        bind: {
                            value: '{agreeDetailSpec.documentDate1}',
                            hidden: '{agreeDetailSpec.type3 !== "02"}',
                            disabled: '{agreeDetailSpec.type3 !== "02"}'
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
                    /*{
                        xtype: 'ttextfield',
                        fieldLabel: 'فایل تجمیعی',
                        allowBlank: false,
                        maxLength: 15,
                        maskRe: /[0-9]/,
                        regex: /[0-9]/,
                        enforceMaxLength: true,
                        bind: {
                            value: '{agreeDetailSpec.type2}'
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
                        fieldLabel: 'مشمول کمک دولت',
                        allowBlank: false,
                        maxLength: 15,
                        maskRe: /[0-9]/,
                        regex: /[0-9]/,
                        enforceMaxLength: true,
                        bind: {
                            value: '{agreeDetailSpec.type2}'
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
                    },*/
                    {
                        xtype: 'cellspacer',
                        colspan: 1,
                        bind: {
                            hidden: '{agreeDetailSpec.type3 !== "02"}'
                        }
                    },
                    {
                        xtype: 'tform',
                        id: 'driver-card-form',
                        colspan: 3,
                        items: [
                            {
                                xtype: 'tfieldset',
                                title: 'ثبت دفترچه/کارت هوشمند رانندگان حمل و نقل عمومی',
                                border: false,
                                defaults: {
                                    labelWidth: 150,
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
                                        fieldLabel: 'شماره دفترچه',
                                        allowBlank: false,
                                        maskRe: /[0-9]/,
                                        regex: /[0-9]/,
                                        enforceMaxLength: true,
                                        bind: {
                                            value: '{driverCardSpec.documentNumber2}'
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
                                        xtype: 'tdatefield',
                                        fieldLabel: 'تاریخ شروع اعتبار',
                                        allowBlank: false,
                                        bind: {
                                            value: '{driverCardSpec.documentStartDate}'
                                        },
                                        triggers: {
                                            delete: {
                                                cls: 'x-form-clear-trigger',
                                                weight: -2,
                                                handler: function () {
                                                    arguments[0].setValue(null);
                                                }
                                            }
                                        },
                                        validator: function(startDate) {
                                            if (!startDate) return true;
                                            var endDate = this.up('insurance-agreement-new-main').getViewModel().get('driverCardSpec.documentEndDate');
                                            if (!endDate) {
                                                return true;
                                            }
                                            endDate = new Date(endDate);
                                            startDate = new Date(InsuranceTechnical.tamin.helpers.Persian.taminDateToGregorian(startDate));
                                            if (startDate < endDate) {
                                                return true;
                                            } else {
                                                InsuranceTechnical.tamin.window.MessageBox.showError('خطا', 'تاریخ شروع نمیتواند بعد از تاریخ پایان باشد.');
                                                this.reset();
                                                return false;
                                            }
                                        }
                                    },
                                    {
                                        xtype: 'tdatefield',
                                        fieldLabel: 'تاریخ پایان اعتبار',
                                        allowBlank: false,
                                        bind: {
                                            value: '{driverCardSpec.documentEndDate}'
                                        },
                                        triggers: {
                                            delete: {
                                                cls: 'x-form-clear-trigger',
                                                weight: -2,
                                                handler: function () {
                                                    arguments[0].setValue(null);
                                                }
                                            }
                                        },
                                        validator: function(endDate) {
                                            if (!endDate) return true;
                                            var startDate = this.up('insurance-agreement-new-main').getViewModel().get('driverCardSpec.documentStartDate');
                                            if (!startDate) {
                                                return true;
                                            }
                                            startDate = new Date(startDate);
                                            endDate = new Date(InsuranceTechnical.tamin.helpers.Persian.taminDateToGregorian(endDate));
                                            if (startDate < endDate) {
                                                return true;
                                            } else {
                                                InsuranceTechnical.tamin.window.MessageBox.showError('خطا', 'تاریخ پایان نمیتواند پیش از تاریخ شروع باشد.');
                                                this.reset();
                                                return false;
                                            }
                                        }
                                    },
                                    {
                                        xtype: 'buttoncontainer',
                                        items: [
                                            {
                                                xtype: 'button',
                                                text: 'ثبت دفترچه',
                                                iconCls: 'icon save',
                                                handler: 'onAddDriverCardButton',
                                                bind: {
                                                    disabled: '{editMode}'
                                                }
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        xtype: 'gridcontainer',
                        scrollable: false,
                        colspan: 3,
                        items: [
                            {
                                xtype: 'tgrid',
                                id: 'driverCard-grid',
                                reference: 'driverCard-grid',
                                /*listeners: {
                                    rowclick: 'onEditCellClick'
                                },*/
                                columns: [
                                    {
                                        xtype: 'templatecolumn',
                                        tpl: '{rowSeq}',
                                        text: '#',
                                        align: 'center',
                                        width: '25px',
                                    },
                                    {
                                        xtype: 'templatecolumn',
                                        tpl: '{documentNumber2}',
                                        text: 'شماره دفترچه',
                                        autoSizeColumn: true,
                                        align: 'center'
                                    },
                                    {
                                        xtype: 'templatecolumn',
                                        tpl: '{documentStartDate}',
                                        text: 'شروع اعتبار',
                                        autoSizeColumn: true,
                                        align: 'center',
                                        renderer: function (val1, data, record) {
                                            var date = record.data.documentStartDate;
                                            return date !== null ? InsuranceTechnical.tamin.helpers.Persian.gregorianToPersian(new Date(date)) : null;
                                        }
                                    },
                                    {
                                        xtype: 'templatecolumn',
                                        tpl: '{documentEndDate}',
                                        text: 'پایان اعتبار',
                                        autoSizeColumn: true,
                                        align: 'center',
                                        renderer: function (val1, data, record) {
                                            var date = record.data.documentEndDate;
                                            return date !== null ? InsuranceTechnical.tamin.helpers.Persian.gregorianToPersian(new Date(date)) : null;
                                        }
                                    },
                                    {
                                        text: 'فایل تجمیعی',
                                        xtype: 'templatecolumn',
                                        autoSizeColumn: true,
                                        tpl: '',
                                        renderer: function (val1, data, record) {
                                            if (record.data.durationType !== null) {
                                                switch (record.data.type2) {
                                                    case '2':
                                                        return 'دارد';
                                                    case '1':
                                                        return 'ندارد';
                                                    default:
                                                        return '-';
                                                }
                                            }
                                        }
                                    },
                                    {
                                        text: 'مشمول کمک دولت',
                                        xtype: 'templatecolumn',
                                        autoSizeColumn: true,
                                        tpl: '',
                                        renderer: function (val1, data, record) {
                                            if (record.data.durationType !== null) {
                                                switch (record.data.type2) {
                                                    case '2':
                                                        return 'می باشد';
                                                    case '1':
                                                        return 'نمی باشد';
                                                    default:
                                                        return '-';
                                                }
                                            }
                                        }
                                    }
                                    /*{
                                        xtype: 'actioncolumn',
                                        align: 'center',
                                        autoSizeColumn: true,
                                        text: 'حذف',
                                        items: [
                                            {
                                                iconCls: 'icon cross',
                                                tooltip: 'حذف',
                                                // handler: 'onDeleteDurationButton'
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'actioncolumn',
                                        align: 'center',
                                        autoSizeColumn: true,
                                        text: 'ویرایش',
                                        items: [
                                            {
                                                iconCls: 'icon pencil',
                                                tooltip: 'ویرایش',
                                                // handler: 'onEditDurationButton'
                                            }
                                        ]
                                    }*/
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    });