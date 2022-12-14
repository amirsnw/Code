Ext.define('InsuranceTechnical.view.guardian.GuardianSpecController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.guardian-spec-controller',
    init: function () {
        var guardianSpecStore = this.getStore('guardianStore');
		Ext.getBody().mask('لطفا منتظر بمانید...');
        guardianSpecStore.load({
            callback: function (record, operation, success) {
                if (!success) {
                    InsuranceTechnical.tamin.window.Window.retry(3);
                }
                Ext.getBody().unmask();
            }
        });
    },
    onSelectRecord: function (btn) {
        var win = btn.up('insured-person-popup');
        if (win) {
            win.close();
        }
    },
    onChangeNationality: function (field, newValue) {
        if (newValue === '2') {
            Ext.getCmp('nationalCode').reset();
            Ext.getCmp('nationalCode').setHidden(true);
            Ext.getCmp('foreignCode').setHidden(false);
        } else {
            Ext.getCmp('foreignCode').reset();
            Ext.getCmp('nationalCode').setHidden(false);
            Ext.getCmp('foreignCode').setHidden(true);
        }
    },
    onSearchButton: function () {
        var me = this;
        var form = Ext.getCmp('guardian-form-id');
        var formValues = form.getValues();
        var result = [];
        var val1 = InsuranceTechnical.getApplication().getCache('organizationCode');
        if (!form.isValid()) {
            InsuranceTechnical.tamin.window.MessageBox.showError('خطا', 'خطاهای مشخص شده را اصلاح نمائید.');
            return;
        }
        Ext.Object.each(formValues, function (property, value) {
            if (value !== '') {
                switch (property) {
                    case 'requestDateFrom':
                        if (Ext.getCmp('requestDateFrom').getValue() !== null &&
                            Ext.getCmp('requestDateTo').getValue() !== null) {
                            var i = result.length;
                            result.push({
                                id: i,
                                property: 'reqDate',
                                value: new Date(value).getTime(),
                                operator: 'gte'
                            });
                        } else if (Ext.getCmp('requestDateFrom').getValue() !== null &&
                            Ext.getCmp('requestDateTo').getValue() === null) {
                            var i = result.length;
                            result.push({
                                id: i,
                                property: 'reqDate',
                                value: new Date(value).getTime(),
                                operator: 'eq'
                            });
                        }
                        break;
                    case 'requestDateTo':
                        if (Ext.getCmp('requestDateFrom').getValue() !== null &&
                            Ext.getCmp('requestDateTo').getValue() !== null) {
                            var i = result.length;
                            result.push({
                                id: i,
                                property: 'reqDate',
                                value: new Date(value).getTime(),
                                operator: 'lte'
                            });
                        }
                        break;
                    case 'firstName':
                        result.push({
                            property: 'insuranceRegisteration.firstName',
                            value: value,
                            operator: 'EQUAL'
                        });
                        result.push({
                            property: property,
                            value: value,
                            operator: 'EQUAL'
                        });
                        break;
                    case 'lastName':
                        result.push({
                            property: 'insuranceRegisteration.lastName',
                            value: value,
                            operator: 'EQUAL'
                        });
                        result.push({
                            property: property,
                            value: value,
                            operator: 'EQUAL'
                        });
                        break;
                    case 'lastName':
                        result.push({
                            property: 'insuranceRegisteration.lastName',
                            value: value,
                            operator: 'EQUAL'
                        });
                        result.push({
                            property: property,
                            value: value,
                            operator: 'EQUAL'
                        });
                        break;
                    case 'eRequestId':
                        if (value === '0') {
                            result.push({
                                property: property,
                                value: value,
                                operator: 'isn'
                            });
                        } else if (value === '1') {
                            result.push({
                                property: property,
                                value: value,
                                operator: 'inn'
                            });
                        }
                        break;
                    case 'flagBranch':
                        if (value === '0') {
                            result.push({
                                property: 'flagBranch',
                                value: 0,
                                operator: 'EQUAL'
                            });
                        } else if (value === '1') {
                            result.push({
                                property: 'flagBranch',
                                value: 1,
                                operator: 'EQUAL'
                            });
                        }
                        break;
                    case 'branchCode':
                        if (value.split('-')[0] !== "0000" && value.split('-')[0] === val1) {
                            result.push({
                                property: 'branchResponder',
                                value: val1,
                                operator: 'EQUAL'
                            });
                        } else if (val1 !== "0000" && value.split('-')[0] !== val1) {
                            result.push({
                                property: 'branchResponder',
                                value: '',
                                operator: 'EQUAL'
                            });
                        } else if (val1 === "0000" && value.split('-')[0] !== val1) {
                            result.push({
                                property: 'branchResponder',
                                value: value.split('-')[0],
                                operator: 'EQUAL'
                            });
                        } else if (val1 === "0000" && value.split('-')[0] === val1) {
                            result.push({
                                property: 'branchCode',
                                operator: 'inn'
                            });
                        }
                        break;
                    case 'nationality':
                        if (value === '2' && form.getForm().getFields().getByKey('foreignCode').getValue() == '') {
                            result.push({
                                property: 'foreignCode',
                                operator: 'inn'
                            });
                        } else if (value === '1') {
                            result.push({
                                property: 'foreignCode',
                                operator: 'isn'
                            });
                        }
                        break;
                    default:
                        var i = result.length;
                        result.push({
                            id: i,
                            property: property,
                            value: value,
                            operator: 'EQUAL'
                        });
                }
            } else if (property === 'flagBranch') {
                if (value === '0' || value === "") {
                    result.push({
                        property: 'flagBranch',
                        value: 0,
                        operator: 'EQUAL'
                    });
                } else if (value === '1') {
                    result.push({
                        property: 'flagBranch',
                        value: 1,
                        operator: 'EQUAL'
                    });
                }
            }
        });
        var store = me.getViewModel().getStore('guardianStore');
        store.on('load', function () {
            if (store.getCount() === 0) {
                Ext.Msg.alert('پیام سیستم', 'دیتایی برای مشاهده وجود ندارد ');
            }
        });
        store.clearFilter();
        store.addFilter(result);
        store.reload();
    },
    onShowAllButton: function (btn) {
        var me = this;
        var form = Ext.getCmp('guardian-form-id');
        var store = this.getViewModel().getStore('guardianStore');
        store.clearFilter(true);
        store.load();
        var branchCode = form.getValues().branchCode;
        btn.up('form').getForm().reset();
        InsuranceTechnical.getApplication().addCache('organizationCode', branchCode.split('-')[0]);
        // me.getViewModel().set('organizationCode', branchCode.split('-')[0] + '- ' + branchCode.split('-')[1]);
    },
    initiateGuardianInfo: function () {
        this.getViewModel().set('guardianInfo', {
            reqNo: '',
            insuranceId: '',
            reqDate: null,
            branchRequester: '',
            branchInspLetterNo: '',
            branchInspLetterDate: null,
            branchResponder: '',
            branchInspRespLetterNo: '',
            branchInspRespLetterDate: null,
            branchInspResponse: '',
            branchInspLet: '',
            actionType: '',
            lastName: '',
            firstName: '',
            pensionNo: '',
            idNo: '',
            nationalCode: '',
            birthDate: null,
            guardianType: '',
            inspectedDate: null,
            inspDate: null,
            inspectorName: '',
            inspectorConfirm: '',
            inspectorNote: '',
            committeeConfirm: '',
            brhIntRoleDate: '',
            brhIntRoleLetterNo: '',
            techConfStatus: '',
            techConfDesc: '',
            techConfDate: null,
            techConfUserId: '',
            editDate: null,
            editUserId: '',
            createDate: null,
            createUserId: '',
            haveMedicalDoc: '0',
            status: '',
            provResponse: '',
            provResponseRegLetterNo: '',
            provResponseRegLetterDate: null,
            provResponseLetterNo: '',
            provResponseLetterDate: null

        });
        this.getViewModel().set('requesterBranchDisable', false);
        this.getViewModel().set('responseBranchDisable', false);
        this.getViewModel().set('guardianName', '');
        // this.getViewModel().set('disableMedicalForm', false);
        // this.getViewModel().set('disableMedicalConf', false);


    },
    onAddButton: function () {
        this.redirectTo('guardian-create-req');
    },
    onEditButton: function (view, rowIndex, colIndex, item, e, rec, row, action) {


        var record = rec.data;
        var nationalId = record.nationalCode;
        var requestSerial = record.reqSerial;
        this.redirectTo('guardian-create-req/' + requestSerial + '_' + nationalId, false);
    },
    fetchGuardianData: function (reqSerial, callBack) {
        var me = this;
        Ext.getBody().mask('لطفا منتظر بمانید...');

        Ext.Ajax.request({
            url: InsuranceTechnical.helper.Urls.getUrl('GuardianOtherBranch')
                + '?reqSerial=' + reqSerial,
            method: 'GET',
            success: function (response) {

                Ext.getBody().unmask();
                var info = Ext.JSON.decode(response.responseText).data;
                me.getViewModel().set('guardianInfo', info);
                // me.getViewModel().set('guardianInfo.insuranceRegisteration.doB',info!=null ? InsuranceTechnical.tamin.helpers.Persian.gregorianToPersian(new Date(info.birthDate)):'');

                callBack();


            },
            failure: function () {

                Ext.getBody().unmask();

            }
        });
    },
    openOtherBranchPopup: function (button) {

        var me = this;
        var container = button.up('guardian-spec');
        var win = container.lookupReference('guardianOtherBranchPopup');
        this.initiateGuardianInfo();
        var record = button.up('button').getWidgetRecord().data;


        this.fetchGuardianData(record.reqSerial, function () {


            me.getViewModel().set('guardianInfo.branchResponder', record.branchResponder);
            if (me.getViewModel().get('guardianInfo.brhReqType') === '2') {
                // me.getViewModel().set('guardianInfo.branchRequester', '');
                me.getViewModel().set('requesterBranchDisable', true);
            } else {
                // me.getViewModel().set('guardianInfo.branchResponder', '');
                me.getViewModel().set('responseBranchDisable', true);
            }

            if (me.getViewModel().get('guardianInfo.insuranceRegisteration') === null) {
                me.getViewModel().set('guardianName', 'بیمه پرداز سایر شعب');
            } else {
                me.getViewModel().set('guardianName', me.getViewModel().get('guardianInfo.insuranceRegisteration.firstName') + ' '
                    + me.getViewModel().get('guardianInfo.insuranceRegisteration.lastName'));
            }
            if (!win) {
                win = Ext.create('InsuranceTechnical.view.guardian.GuardianOtherBranchPopup');
                container.add(win);
                //win.setController(me.getController());
                win.setViewModel(me.getViewModel());
            } else {
                // Ext.getCmp('guardian-form-other').reset();
            }
            // if (me.getViewModel().get('guardianInfo.branchInspResponse') === '1') {
            //     Ext.getCmp('reportRadiosOther').items.items[0].setValue(true);
            //     Ext.getCmp('reportRadiosOther').items.items[1].setValue(false);
            // } else {
            //     Ext.getCmp('reportRadiosOther').items.items[1].setValue(true);
            //     Ext.getCmp('reportRadiosOther').items.items[0].setValue(false);
            // }

            // me.fetchBranchData(me.getViewModel().get('guardianInfo.branchRequester'), function (data) {
            //     
            //     // var combo = ;
            //     // Ext.getCmp('requesterCombo').setDisplayField(data.brhCode + " - " + data.brhName);
            //     me.getViewModel().getStore('branchStore').insert(0, data);
            // });
            win.show();

        });
    },
    //ثبت نظریه بازرس فنی
    openTechReportPopup: function (button) {

        var me = this;
        var container = button.up('guardian-spec');
        var win = container.lookupReference('guardianTechReportPopup');
        var user = InsuranceTechnical.getApplication().getCache('user');

        this.initiateGuardianInfo();
        var record = button.up('button').getWidgetRecord().data;

        if (record.pensionFundsCode === null
            && record.status === '0'
            && record.inspectorConfirm === null
            && record.requestType === '1') {
            InsuranceTechnical.tamin.window.MessageBox.showError('خطا', 'ابتدا وضعیت بیمه شده را از سایر صندوقهای بازنشستگی استعلام نمایید');
            return;
        }

        if (record.status !== '1' && record.status !== '2' && record.requestType !== '2') {
            if (record.guardianType === '4') {
                if (record.guarBirthCityCode === null
                    || record.guarExpCityCode === null
                    || record.guarBirthCityCode2 === null
                    || record.guarExpCityCode2 === null
                    || record.guarBirthCityCode === ''
                    || record.guarExpCityCode === ''
                    || record.guarBirthCityCode2 === ''
                    || record.guarExpCityCode2 === '') {
                    InsuranceTechnical.tamin.window.MessageBox.showError('خطا', 'ابتدا شهر محل صدور و شهر محل تولد والدین را پر کنید');
                    return;
                }
            } else {
                if (record.guarBirthCityCode === null
                    || record.guarExpCityCode === null
                    || record.guarBirthCityCode === ''
                    || record.guarExpCityCode === '') {
                    InsuranceTechnical.tamin.window.MessageBox.showError('خطا', 'ابتدا شهر محل صدور و شهر محل تولد را پر کنید');
                    return;
                }
            }
        }
        me.getViewModel().set('radioConfirm', true);
        me.getViewModel().set('radioNotConfirm', true);
        me.getViewModel().set('radioGuardianConfirm', false);
        me.getViewModel().set('radioGuardianNotConfirm', false);

//        //var reqDate = InsuranceTechnical.tamin.helpers.Persian.gregorianToPersian(new Date(record.reqDate));
//        //var birthDate= InsuranceTechnical.tamin.helpers.Persian.gregorianToPersian(new Date(record.guardianBirthDate));
//        //var age = this.getViewModel().get('guardianInfo.reqDate') - this.getViewModel().get('guardianInfo.guardianBirthDate');
//        //var age = reqDate - birthDate;   
//                
        var date1 = new Date(record.guardianBirthDate);
        var date2 = new Date(record.guardianBirthDate2);
        var date3 = new Date(record.reqDate);
        var diffTime1 = Math.abs(date3 - date1);
        var diffTime2 = Math.abs(date3 - date2);
        var diffDays1 = Math.ceil(diffTime1 / (1000 * 60 * 60 * 24));
        var diffDays2 = Math.ceil(diffTime2 / (1000 * 60 * 60 * 24));
        var age1 = diffDays1;
        var age2 = diffDays2;

//        var reqDate = record.reqDate;
//        var birthDate = record.guardianBirthDate;
//        var detailStore = me.getViewModel().getStore('DiffDate');
//        var filter = [
//            {
//                property: 'beginDate',
//                operator: 'EQUAL',
//                value: birthDate
//            },
//            {
//                property: 'endDate',
//                operator: 'EQUAL',
//                value: reqDate
//            }
//        ];
//        detailStore.clearFilter();
//        detailStore.addFilter(filter);
//        detailStore.load({
//            scope: this,
//            callback: function (records, operation, success) {
//
//                var response = operation._response.responseText;
//                var day = response.substring(6, 4);
//                var month = response.substring(4, 2);
//                var year = response.substring(2, 0);
//                age =(year *365) + (month * 30)+(day);                
//            }
//        });

        if (record !== null && record.guardianType !== null && record.requestType === '1') {

            switch (record.guardianType) {
                //پدر و همسر
                case '1':
                case '3':
                    if (age1 < 60 * 365) {
                        me.getViewModel().set('radioConfirm', false);
                        me.getViewModel().set('radioNotConfirm', false);
                        me.getViewModel().set('radioGuardianConfirm', true);
                        me.getViewModel().set('radioGuardianNotConfirm', true);
                    }
                    break;
                //مادر
                case '2':
                    if (age1 < 55 * 365) {
                        me.getViewModel().set('radioConfirm', false);
                        me.getViewModel().set('radioNotConfirm', false);
                        me.getViewModel().set('radioGuardianConfirm', true);
                        me.getViewModel().set('radioGuardianNotConfirm', true);
                    }
                    break;
                //والدین
                case '4':
                    //پدر
                    if (age1 < 60 * 365) {
                        me.getViewModel().set('radioConfirm', false);
                        me.getViewModel().set('radioNotConfirm', false);
                        me.getViewModel().set('radioGuardianConfirm', true);
                        me.getViewModel().set('radioGuardianNotConfirm', true);
                        break;
                    }
                    //مادر
                    if (age2 < 55 * 365) {
                        me.getViewModel().set('radioConfirm', false);
                        me.getViewModel().set('radioNotConfirm', false);
                        me.getViewModel().set('radioGuardianConfirm', true);
                        me.getViewModel().set('radioGuardianNotConfirm', true);
                    }
                    break;
                //فرزند ذکور
                case '5':
                    me.getViewModel().set('radioConfirm', false);
                    me.getViewModel().set('radioNotConfirm', false);
                    me.getViewModel().set('radioGuardianConfirm', true);
                    me.getViewModel().set('radioGuardianNotConfirm', true);
                    break;
                default:
                    me.getViewModel().set('radioConfirm', true);
                    me.getViewModel().set('radioNotConfirm', true);
                    break;
            }
        }

        this.fetchGuardianData(record.reqSerial, function () {

            if (!win) {
                win = Ext.create('InsuranceTechnical.view.guardian.GuardianTechInspectorReportPopup');
                container.add(win);
            }
            if (me.getViewModel().get('guardianInfo.requestType') === '2') {
                Ext.getCmp('radioConfirm').hide();
                Ext.getCmp('radioNotConfirm').hide();
                Ext.getCmp('radioDocument').hide();
                Ext.getCmp('radioGuardianConfirm').setBoxLabel('تایید ابطال کفالت');
                Ext.getCmp('radioGuardianNotConfirm').setBoxLabel('عدم تایید ابطال کفالت');
            }

//            if (me.getViewModel().get('guardianInfo.inspectedDate') === null)
//                me.getViewModel().set('guardianInfo.inspectedDate', new Date());
            if (me.getViewModel().get('guardianInfo.inspDate') === null)
                me.getViewModel().set('guardianInfo.inspDate', new Date());

            if (me.getViewModel().get('guardianInfo.inspectorConfirm') === '1') {
                Ext.getCmp('reportRadios').items.items[0].setValue(true);
                Ext.getCmp('reportRadios').items.items[1].setValue(false);
                Ext.getCmp('reportRadios').items.items[2].setValue(false);
                Ext.getCmp('reportRadios').items.items[3].setValue(false);
                Ext.getCmp('reportRadios').items.items[4].setValue(false);
            } else if (me.getViewModel().get('guardianInfo.inspectorConfirm') === '2') {
                Ext.getCmp('reportRadios').items.items[1].setValue(true);
                Ext.getCmp('reportRadios').items.items[0].setValue(false);
                Ext.getCmp('reportRadios').items.items[2].setValue(false);
                Ext.getCmp('reportRadios').items.items[3].setValue(false);
                Ext.getCmp('reportRadios').items.items[4].setValue(false);
            } else if (me.getViewModel().get('guardianInfo.inspectorConfirm') === '5') {
                Ext.getCmp('reportRadios').items.items[2].setValue(true);
                Ext.getCmp('reportRadios').items.items[0].setValue(false);
                Ext.getCmp('reportRadios').items.items[1].setValue(false);
                Ext.getCmp('reportRadios').items.items[3].setValue(false);
                Ext.getCmp('reportRadios').items.items[4].setValue(false);
            } else if (me.getViewModel().get('guardianInfo.inspectorConfirm') === '6') {
                Ext.getCmp('reportRadios').items.items[3].setValue(true);
                Ext.getCmp('reportRadios').items.items[0].setValue(false);
                Ext.getCmp('reportRadios').items.items[1].setValue(false);
                Ext.getCmp('reportRadios').items.items[2].setValue(false);
                Ext.getCmp('reportRadios').items.items[4].setValue(false);
            } else if (me.getViewModel().get('guardianInfo.inspectorConfirm') === '7') {
                Ext.getCmp('reportRadios').items.items[4].setValue(true);
                Ext.getCmp('reportRadios').items.items[0].setValue(false);
                Ext.getCmp('reportRadios').items.items[1].setValue(false);
                Ext.getCmp('reportRadios').items.items[2].setValue(false);
                Ext.getCmp('reportRadios').items.items[3].setValue(false);
            }
            if (me.getViewModel().get('guardianInfo.inspectorName') === null && user !== null) {
                me.getViewModel().set('guardianInfo.inspectorName', user.firstName + ' ' + user.lastName);
            }
            win.show();
            me.fixWindowPosition(win, container);
        });
    },
    openTechOpinionPopup: function (button) {

        var me = this;
        var container = button.up('guardian-spec');
        var win = container.lookupReference('guardianTechnicianOpinionPopup');
        var record = button.up('button').getWidgetRecord().data;
        var user = InsuranceTechnical.getApplication().getCache('user');
        var rolesArray = InsuranceTechnical.getApplication().getCache('rolesArray');

        if (record.inspectorConfirm === null
            || record.inspectorName === null
            || record.inspectorNote === null
            || record.inspectedDate === null
            || record.inspectorConfirm === ''
            || record.inspectorName === ''
            || record.inspectedDate === ''
            || record.inspectorNote === '') {
            InsuranceTechnical.tamin.window.MessageBox.showError('خطا', 'ابتدا گزارش بازرس فنی را ثبت کنید');
            return;
        }
        if (record.status !== '1' && record.status !== '2' && record.requestType !== '2') {
            if (record.guardianType === '4') {
                if (record.guarBirthCityCode === null
                    || record.guarExpCityCode === null
                    || record.guarBirthCityCode2 === null
                    || record.guarExpCityCode2 === null
                    || record.guarBirthCityCode === ''
                    || record.guarExpCityCode === ''
                    || record.guarBirthCityCode2 === ''
                    || record.guarExpCityCode2 === '') {
                    InsuranceTechnical.tamin.window.MessageBox.showError('خطا', 'ابتدا شهر محل صدور و شهر محل تولد والدین را پر کنید');
                    return;
                }
            } else {
                if (record.guarBirthCityCode === null
                    || record.guarExpCityCode === null
                    || record.guarBirthCityCode === ''
                    || record.guarExpCityCode === '') {
                    InsuranceTechnical.tamin.window.MessageBox.showError('خطا', 'ابتدا شهر محل صدور و شهر محل تولد را پر کنید');
                    return;
                }
            }
        }

        me.getViewModel().set('radioConfirm', true);
        me.getViewModel().set('radioNotConfirm', true);
        me.getViewModel().set('radioGuardianConfirm', false);
        me.getViewModel().set('radioGuardianNotConfirm', false);

        var date1 = new Date(record.guardianBirthDate);
        var date2 = new Date(record.guardianBirthDate2);
        var date3 = new Date(record.reqDate);
        var diffTime1 = Math.abs(date3 - date1);
        var diffTime2 = Math.abs(date3 - date2);
        var diffDays1 = Math.ceil(diffTime1 / (1000 * 60 * 60 * 24));
        var diffDays2 = Math.ceil(diffTime2 / (1000 * 60 * 60 * 24));
        var age1 = diffDays1;
        var age2 = diffDays2;


        if (record !== null && record.guardianType !== null && record.requestType === '1') {

            switch (record.guardianType) {
                //پدر و همسر
                case '1':
                case '3':
                    if (age1 < 60 * 365) {
                        me.getViewModel().set('radioConfirm', false);
                        me.getViewModel().set('radioNotConfirm', false);
                        me.getViewModel().set('radioGuardianConfirm', true);
                        me.getViewModel().set('radioGuardianNotConfirm', true);
                    }
                    break;
                //مادر
                case '2':
                    if (age1 < 55 * 365) {
                        me.getViewModel().set('radioConfirm', false);
                        me.getViewModel().set('radioNotConfirm', false);
                        me.getViewModel().set('radioGuardianConfirm', true);
                        me.getViewModel().set('radioGuardianNotConfirm', true);
                    }
                    break;
                //والدین
                case '4':
                    //پدر
                    if (age1 < 60 * 365) {
                        me.getViewModel().set('radioConfirm', false);
                        me.getViewModel().set('radioNotConfirm', false);
                        me.getViewModel().set('radioGuardianConfirm', true);
                        me.getViewModel().set('radioGuardianNotConfirm', true);
                        break;
                    }
                    //مادر
                    if (age2 < 55 * 365) {
                        me.getViewModel().set('radioConfirm', false);
                        me.getViewModel().set('radioNotConfirm', false);
                        me.getViewModel().set('radioGuardianConfirm', true);
                        me.getViewModel().set('radioGuardianNotConfirm', true);
                    }
                    break;
                //فرزند ذکور
                case '5':
                    me.getViewModel().set('radioConfirm', false);
                    me.getViewModel().set('radioNotConfirm', false);
                    me.getViewModel().set('radioGuardianConfirm', true);
                    me.getViewModel().set('radioGuardianNotConfirm', true);
                    break;
                default:
                    me.getViewModel().set('radioConfirm', true);
                    me.getViewModel().set('radioNotConfirm', true);
                    break;
            }
        }

        this.fetchGuardianData(record.reqSerial, function () {

            if (!win) {
                win = Ext.create('InsuranceTechnical.view.guardian.GuardianTechnicianOpinionPopup');
                container.add(win);
            }

            if (me.getViewModel().get('guardianInfo.requestType') === '2') {
                Ext.getCmp('radioConfirm').hide();
                Ext.getCmp('radioNotConfirm').hide();
                Ext.getCmp('radioGuardianConfirm').setBoxLabel('تایید ابطال کفالت');
                Ext.getCmp('radioGuardianNotConfirm').setBoxLabel('عدم تایید ابطال کفالت');
            }

//            if (me.getViewModel().get('guardianInfo.inspectorConfirm') !== '6'
//                    && me.getViewModel().get('guardianInfo.inspectorConfirm') !== '7') {
//                Ext.getCmp('tfieldsetMedicalConf').setDisabled(true);
//            }

            if (me.getViewModel().get('guardianInfo.insuranceRegisteration') === null) {
                me.getViewModel().set('guardianName', 'بیمه پرداز سایر شعب');
            } else {
                me.getViewModel().set('guardianName', me.getViewModel().get('guardianInfo.insuranceRegisteration.firstName') + ' '
                    + me.getViewModel().get('guardianInfo.insuranceRegisteration.lastName'));
            }
            if (me.getViewModel().get('guardianInfo.haveMedicalDoc') === '1') {
                me.getViewModel().set('disableMedicalForm', false);
            } else {
                me.getViewModel().set('disableMedicalForm', true);
            }

//            if (me.getViewModel().get('guardianInfo.haveMedicalDoc') === '1')
//                me.getViewModel().set('disableMedicalConf', false);
//            else
//                me.getViewModel().set('disableMedicalConf', true);

            if (me.getViewModel().get('guardianInfo.techConfStatus') === '1') {
                if (me.getViewModel().get('guardianInfo.inspectorConfirm') === '1') {
                    me.getViewModel().set('guardianInfo.status', '2');

                } else if (me.getViewModel().get('guardianInfo.inspectorConfirm') === '2') {
                    me.getViewModel().set('guardianInfo.status', '1');
                }
            } else {
                me.getViewModel().set('guardianInfo.status', '1');
            }

            if (me.getViewModel().get('guardianInfo.techConfStatus') === '1') {
                Ext.getCmp('reportConf').items.items[0].setValue(true);
                Ext.getCmp('reportConf').items.items[1].setValue(false);
                Ext.getCmp('reportConf').items.items[2].setValue(false);
                Ext.getCmp('reportConf').items.items[3].setValue(false);
            } else if (me.getViewModel().get('guardianInfo.techConfStatus') === '2') {
                Ext.getCmp('reportConf').items.items[1].setValue(true);
                Ext.getCmp('reportConf').items.items[0].setValue(false);
                Ext.getCmp('reportConf').items.items[2].setValue(false);
                Ext.getCmp('reportConf').items.items[3].setValue(false);
            } else if (me.getViewModel().get('guardianInfo.techConfStatus') === '6') {
                Ext.getCmp('reportConf').items.items[2].setValue(true);
                Ext.getCmp('reportConf').items.items[0].setValue(false);
                Ext.getCmp('reportConf').items.items[1].setValue(false);
                Ext.getCmp('reportConf').items.items[3].setValue(false);
            } else if (me.getViewModel().get('guardianInfo.techConfStatus') === '7') {
                Ext.getCmp('reportConf').items.items[3].setValue(true);
                Ext.getCmp('reportConf').items.items[0].setValue(false);
                Ext.getCmp('reportConf').items.items[1].setValue(false);
                Ext.getCmp('reportConf').items.items[2].setValue(false);
            } else {
                Ext.getCmp('reportConf').items.items[0].setValue(false);
                Ext.getCmp('reportConf').items.items[1].setValue(false);
                Ext.getCmp('reportConf').items.items[2].setValue(false);
                Ext.getCmp('reportConf').items.items[3].setValue(false);
            }

            if (me.getViewModel().get('guardianInfo.technicalFullName') === null
                && user !== null
                && rolesArray !== null
                && rolesArray.includes('HEAD USER TECHNICAL')) {
                me.getViewModel().set('guardianInfo.technicalFullName', user.firstName + ' ' + user.lastName);
            }
            win.show();
            me.fixWindowPosition(win, container);
        });
    },
    openCommissionOpinionPopup: function (button) {

        var me = this;
        var container = button.up('guardian-spec');
        var win = container.lookupReference('guardianCommissionOpinionPopup');
        var record = button.up('button').getWidgetRecord().data;
        if (record.techConfStatus === null
            || record.techConfDesc === null
            || record.techConfDate === null
            || record.techConfStatus === ''
            || record.techConfDesc === ''
            || record.techConfDate === '') {
            InsuranceTechnical.tamin.window.MessageBox.showError('خطا', 'ابتدا گزارش مسئول فنی را ثبت کنید');
            return;
        }
        this.fetchGuardianData(record.reqSerial, function () {

            if (!win) {
                win = Ext.create('InsuranceTechnical.view.guardian.GuardianCommissionOpinionPopup');
                container.add(win);
            }

            if (me.getViewModel().get('guardianInfo.committeeConfirm') === '1') {
                Ext.getCmp('medicalConf').items.items[0].setValue(true);
                Ext.getCmp('medicalConf').items.items[1].setValue(false);
            } else if (me.getViewModel().get('guardianInfo.committeeConfirm') === '2') {
                Ext.getCmp('medicalConf').items.items[1].setValue(true);
                Ext.getCmp('medicalConf').items.items[0].setValue(false);
            }

            win.show();
            me.fixWindowPosition(win, container);
        });
    },
    openProtestPopup: function (button) {

        var me = this;
        var container = button.up('guardian-spec');
        var win = container.lookupReference('guardianProtestPopup');
        this.initiateGuardianInfo();
        var record = button.up('button').getWidgetRecord().data;

        me.getViewModel().set('radioConfirm', true);
        me.getViewModel().set('radioNotConfirm', true);
        me.getViewModel().set('radioGuardianConfirm', false);
        me.getViewModel().set('radioGuardianNotConfirm', false);

        var date1 = new Date(record.guardianBirthDate);
        var date2 = new Date(record.guardianBirthDate2);
        var date3 = new Date(record.reqDate);
        var diffTime1 = Math.abs(date3 - date1);
        var diffTime2 = Math.abs(date3 - date2);
        var diffDays1 = Math.ceil(diffTime1 / (1000 * 60 * 60 * 24));
        var diffDays2 = Math.ceil(diffTime2 / (1000 * 60 * 60 * 24));
        var age1 = diffDays1;
        var age2 = diffDays2;

        if (record !== null && record.guardianType !== null) {

            switch (record.guardianType) {
                //پدر و همسر
                case '1':
                case '3':
                    if (age1 < 60 * 365) {
                        me.getViewModel().set('radioConfirm', false);
                        me.getViewModel().set('radioNotConfirm', false);
                        me.getViewModel().set('radioGuardianConfirm', true);
                        me.getViewModel().set('radioGuardianNotConfirm', true);
                    }
                    break;
                //مادر
                case '2':
                    if (age1 < 55 * 365) {
                        me.getViewModel().set('radioConfirm', false);
                        me.getViewModel().set('radioNotConfirm', false);
                        me.getViewModel().set('radioGuardianConfirm', true);
                        me.getViewModel().set('radioGuardianNotConfirm', true);
                    }
                    break;
                //والدین
                case '4':
                    //پدر
                    if (age1 < 60 * 365) {
                        me.getViewModel().set('radioConfirm', false);
                        me.getViewModel().set('radioNotConfirm', false);
                        me.getViewModel().set('radioGuardianConfirm', true);
                        me.getViewModel().set('radioGuardianNotConfirm', true);
                        break;
                    }
                    //مادر
                    if (age2 < 55 * 365) {
                        me.getViewModel().set('radioConfirm', false);
                        me.getViewModel().set('radioNotConfirm', false);
                        me.getViewModel().set('radioGuardianConfirm', true);
                        me.getViewModel().set('radioGuardianNotConfirm', true);
                    }
                    break;
                //فرزند ذکور
                case '5':
                    me.getViewModel().set('radioConfirm', false);
                    me.getViewModel().set('radioNotConfirm', false);
                    me.getViewModel().set('radioGuardianConfirm', true);
                    me.getViewModel().set('radioGuardianNotConfirm', true);
                    break;
                default:
                    me.getViewModel().set('radioConfirm', true);
                    me.getViewModel().set('radioNotConfirm', true);
                    break;
            }
        }

        this.fetchGuardianData(record.reqSerial, function () {

            if (!win) {
                win = Ext.create('InsuranceTechnical.view.guardian.GuardianProtestPopup');
                container.add(win);

                if (record.status === '8' && (record.protestStatus === '' || record.protestStatus === null)) {
                    Ext.getCmp('tfieldsetProtestInsp').setDisabled(false);
                    Ext.getCmp('tfieldsetProtestTech').setDisabled(true);
                    Ext.getCmp('saveProtestOpinionButton').setDisabled(false);
                } else if (record.status === '8' && record.protestStatus === '1') {
                    Ext.getCmp('tfieldsetProtestInsp').setDisabled(true);
                    Ext.getCmp('tfieldsetProtestTech').setDisabled(false);
                    Ext.getCmp('saveProtestOpinionButton').setDisabled(false);
                } else {
                    Ext.getCmp('tfieldsetProtestInsp').setDisabled(true);
                    Ext.getCmp('tfieldsetProtestTech').setDisabled(true);
                    Ext.getCmp('saveProtestOpinionButton').setDisabled(true);
                }

                InsuranceTechnical.getApplication().addCache('recordStatus', record.status);
                InsuranceTechnical.getApplication().addCache('protestStatus', record.protestStatus);
            }

            if (me.getViewModel().get('guardianInfo.inspectorConfirm') === '1') {
                Ext.getCmp('protestReportRadios').items.items[0].setValue(true);
                Ext.getCmp('protestReportRadios').items.items[1].setValue(false);
                Ext.getCmp('protestReportRadios').items.items[2].setValue(false);
                Ext.getCmp('protestReportRadios').items.items[3].setValue(false);
                Ext.getCmp('protestReportRadios').items.items[4].setValue(false);
            } else if (me.getViewModel().get('guardianInfo.inspectorConfirm') === '2') {
                Ext.getCmp('protestReportRadios').items.items[1].setValue(true);
                Ext.getCmp('protestReportRadios').items.items[0].setValue(false);
                Ext.getCmp('protestReportRadios').items.items[2].setValue(false);
                Ext.getCmp('protestReportRadios').items.items[3].setValue(false);
                Ext.getCmp('protestReportRadios').items.items[4].setValue(false);
            } else if (me.getViewModel().get('guardianInfo.inspectorConfirm') === '5') {
                Ext.getCmp('protestReportRadios').items.items[2].setValue(true);
                Ext.getCmp('protestReportRadios').items.items[0].setValue(false);
                Ext.getCmp('protestReportRadios').items.items[1].setValue(false);
                Ext.getCmp('protestReportRadios').items.items[3].setValue(false);
                Ext.getCmp('protestReportRadios').items.items[4].setValue(false);
            } else if (me.getViewModel().get('guardianInfo.inspectorConfirm') === '6') {
                Ext.getCmp('protestReportRadios').items.items[3].setValue(true);
                Ext.getCmp('protestReportRadios').items.items[0].setValue(false);
                Ext.getCmp('protestReportRadios').items.items[1].setValue(false);
                Ext.getCmp('protestReportRadios').items.items[2].setValue(false);
                Ext.getCmp('protestReportRadios').items.items[4].setValue(false);
            } else if (me.getViewModel().get('guardianInfo.inspectorConfirm') === '7') {
                Ext.getCmp('protestReportRadios').items.items[4].setValue(true);
                Ext.getCmp('protestReportRadios').items.items[0].setValue(false);
                Ext.getCmp('protestReportRadios').items.items[1].setValue(false);
                Ext.getCmp('protestReportRadios').items.items[2].setValue(false);
                Ext.getCmp('protestReportRadios').items.items[3].setValue(false);
            } else {
                Ext.getCmp('protestReportRadios').items.items[0].setValue(false);
                Ext.getCmp('protestReportRadios').items.items[1].setValue(false);
                Ext.getCmp('protestReportRadios').items.items[2].setValue(false);
                Ext.getCmp('protestReportRadios').items.items[3].setValue(false);
                Ext.getCmp('protestReportRadios').items.items[4].setValue(false);
            }

            if (me.getViewModel().get('guardianInfo.techConfStatus') === '1') {
                Ext.getCmp('protestReportConf').items.items[0].setValue(true);
                Ext.getCmp('protestReportConf').items.items[1].setValue(false);
                Ext.getCmp('protestReportConf').items.items[2].setValue(false);
                Ext.getCmp('protestReportConf').items.items[3].setValue(false);
            } else if (me.getViewModel().get('guardianInfo.techConfStatus') === '2') {
                Ext.getCmp('protestReportConf').items.items[1].setValue(true);
                Ext.getCmp('protestReportConf').items.items[0].setValue(false);
                Ext.getCmp('protestReportConf').items.items[2].setValue(false);
                Ext.getCmp('protestReportConf').items.items[3].setValue(false);
            } else if (me.getViewModel().get('guardianInfo.techConfStatus') === '6') {
                Ext.getCmp('protestReportConf').items.items[2].setValue(true);
                Ext.getCmp('protestReportConf').items.items[0].setValue(false);
                Ext.getCmp('protestReportConf').items.items[1].setValue(false);
                Ext.getCmp('protestReportConf').items.items[3].setValue(false);
            } else if (me.getViewModel().get('guardianInfo.techConfStatus') === '7') {
                Ext.getCmp('protestReportConf').items.items[3].setValue(true);
                Ext.getCmp('protestReportConf').items.items[0].setValue(false);
                Ext.getCmp('protestReportConf').items.items[1].setValue(false);
                Ext.getCmp('protestReportConf').items.items[2].setValue(false);
            } else {
                Ext.getCmp('protestReportConf').items.items[0].setValue(false);
                Ext.getCmp('protestReportConf').items.items[1].setValue(false);
                Ext.getCmp('protestReportConf').items.items[2].setValue(false);
                Ext.getCmp('protestReportConf').items.items[3].setValue(false);
            }

            if (me.getViewModel().get('guardianInfo.committeeConfirm') === '1') {
                Ext.getCmp('protestMedicalConf').items.items[0].setValue(true);
                Ext.getCmp('protestMedicalConf').items.items[1].setValue(false);
            } else if (me.getViewModel().get('guardianInfo.committeeConfirm') === '2') {
                Ext.getCmp('protestMedicalConf').items.items[1].setValue(true);
                Ext.getCmp('protestMedicalConf').items.items[0].setValue(false);
            }
            Ext.getCmp('tfieldsetMedicalConf').setDisabled(true);
            win.show();
            me.fixWindowPosition(win, container);
        });
    },
    openProvOpinionPopupOld: function (button) {

        var me = this;
        var container = button.up('guardian-spec');
        var win = container.lookupReference('guardianProvOpinionPopup');
        this.initiateGuardianInfo();
        var record = button.up('button').getWidgetRecord().data;

        this.fetchGuardianData(record.reqSerial, function () {

            if (!win) {
                win = Ext.create('InsuranceTechnical.view.guardian.GuardianProvOpinionPopup');
                container.add(win);
            }
            if (me.getViewModel().get('guardianInfo.insuranceRegisteration') === null) {
                me.getViewModel().set('guardianName', 'بیمه پرداز سایر شعب');
            } else {
                me.getViewModel().set('guardianName', me.getViewModel().get('guardianInfo.insuranceRegisteration.firstName') + ' '
                    + me.getViewModel().get('guardianInfo.insuranceRegisteration.lastName'));
            }

            if (me.getViewModel().get('guardianInfo.provResponse') === '1') {
                Ext.getCmp('provResponse').items.items[0].setValue(true);
                Ext.getCmp('provResponse').items.items[1].setValue(false);
            } else {
                Ext.getCmp('provResponse').items.items[1].setValue(true);
                Ext.getCmp('provResponse').items.items[0].setValue(false);
            }

            win.show();
        });
    },
    openProvOpinionPopup: function (button) {

        var me = this;
        var container = button.up('guardian-spec');
        var win = container.lookupReference('guardianProvOpinionPopup');
        this.initiateGuardianInfo();
        var record = button.up('button').getWidgetRecord().data;
        var user = InsuranceTechnical.getApplication().getCache('user');
        var rolesArray = InsuranceTechnical.getApplication().getCache('rolesArray');

        if (record.status !== '9' || record.requesterType !== '1') {
            InsuranceTechnical.tamin.window.MessageBox.showInfo('پیام سیستم', 'با توجه به نوع و وضعیت درخواست، ثبت نظریه کمیته موضوعیت ندارد');
            return;
        }

        this.fetchGuardianData(record.reqSerial, function () {

            if (!win) {
                win = Ext.create('InsuranceTechnical.view.guardian.GuardianProvOpinionPopup');
                container.add(win);
            }
            if (me.getViewModel().get('guardianInfo.insuranceRegisteration') === null) {
                me.getViewModel().set('guardianName', 'بیمه پرداز سایر شعب');
            } else {
                me.getViewModel().set('guardianName', me.getViewModel().get('guardianInfo.insuranceRegisteration.firstName') + ' '
                    + me.getViewModel().get('guardianInfo.insuranceRegisteration.lastName'));
            }

            if (me.getViewModel().get('guardianInfo.provResponse') === '1') {
                Ext.getCmp('provResponse').items.items[0].setValue(true);
                Ext.getCmp('provResponse').items.items[1].setValue(false);
            } else if (me.getViewModel().get('guardianInfo.provResponse') === '2') {
                Ext.getCmp('provResponse').items.items[1].setValue(true);
                Ext.getCmp('provResponse').items.items[0].setValue(false);
            } else {
                Ext.getCmp('provResponse').items.items[1].setValue(false);
                Ext.getCmp('provResponse').items.items[0].setValue(false);
            }

            if (me.getViewModel().get('guardianInfo.provinceFullName') === null
                && user !== null
                && rolesArray !== null
                && rolesArray.includes('PROV HEAD USER TECHNICAL')) {
                me.getViewModel().set('guardianInfo.provinceFullName', user.firstName + ' ' + user.lastName);
            }
            win.show();
            me.fixWindowPosition(win, container);
        });
    },
    openDocumentPopup: function (button) {

        var me = this;
        this.initiateGuardianInfo();
        var container = button.up('guardian-spec');
        var win = container.lookupReference('guardianDocumentPopup');
        var record = button.up('button').getWidgetRecord().data;
        var url = InsuranceTechnical.helper.Urls.getUrl('DocumentData') + '?reqId=' + record.eRequestId;
        Ext.getBody().mask('لطفا منتظر بمانيد...');

        this.fetchGuardianData(record.reqSerial, function () {

            if (!win) {
                win = Ext.create('InsuranceTechnical.view.guardian.GuardianDocumentPopup');
                container.add(win);
            }
            win.show();
            me.fixWindowPosition(win, container);
        });
        Ext.Ajax.request({
            url: url,
            method: 'GET',
            success: function (response) {

                var data = Ext.decode(response.responseText).data;
                Ext.getBody().unmask();
                if (!win) {
                    win = Ext.create('InsuranceTechnical.view.guardian.GuardianDocumentPopup');
                    container.add(win);
                    win.show();
                }
                Ext.each(data, function (item) {
                    if (item !== "") {
                        var files = item.documentFile.image;
                        if (files !== null && files !== "" && files !== undefined) {
                            switch (item.docTypeCode) {
                                case "01":
                                    Ext.getCmp('father-death-image').setSrc('data:image/jpeg;base64,' + files);
                                    break;
                                case "02":
                                    Ext.getCmp('divorce-image').setSrc('data:image/jpeg;base64,' + files);
                                    break;
                                case "03":
                                    Ext.getCmp('doctor-image').setSrc('data:image/jpeg;base64,' + files);
                                    break;
                                case "04":
                                    Ext.getCmp('first-main-identity-image').setSrc('data:image/jpeg;base64,' + files);
                                    break;
                                case "05":
                                    Ext.getCmp('second-main-identity-image').setSrc('data:image/jpeg;base64,' + files);

                                    break;
                                case "06":
                                    Ext.getCmp('last-main-identity-image').setSrc('data:image/jpeg;base64,' + files);
                                    break;
                                case "07":
                                    Ext.getCmp('father-child-identity-image').setSrc('data:image/jpeg;base64,' + files);
                                    break;
                                case "08":
                                    Ext.getCmp('mother-child-identity-image').setSrc('data:image/jpeg;base64,' + files);
                                    break;
                                case "09":
                                    Ext.getCmp('son-main-identity-image').setSrc('data:image/jpeg;base64,' + files);
                                    break;
                                case "10":
                                    Ext.getCmp('children-main-identity-image').setSrc('data:image/jpeg;base64,' + files);
                                    break;
                                case "11":
                                    Ext.getCmp('first-spouse-identity-image').setSrc('data:image/jpeg;base64,' + files);
                                    break;
                                case "12":
                                    Ext.getCmp('partner-main-identity-image').setSrc('data:image/jpeg;base64,' + files);
                                    break;
                            }
                        }
                    }
                });
                var message = Ext.decode(response.responseText).data.message;
            },
            failure: function (record, operation) {
                Ext.getBody().unmask();
                Ext.Msg.alert('پيام سيستم', 'خطا در برقراري ارتباط با سرور');
            }
        });
    },
    openPerformanceReportPopup: function (button) {
        var me = this;
        var container = button.up('guardian-spec');
        var win = container.lookupReference('guardianPerformanceReportPopup');
        this.getViewModel().set('report.sDate', null);
        this.getViewModel().set('report.eDate', null);
        var reportValue = Ext.getCmp('performanceReportButton').getValue();
        InsuranceTechnical.getApplication().addCache('reportValue', reportValue);
        if (!win) {
            win = Ext.create('InsuranceTechnical.view.guardian.GuardianPerformanceReportPopup');
            container.add(win);
        }
        win.show();
    },
    openInspectorReportPopup: function (button) {
        var me = this;
        var container = button.up('guardian-spec');
        var win = container.lookupReference('guardianPerformanceReportPopup');
        this.getViewModel().set('report.sDate', null);
        this.getViewModel().set('report.eDate', null);
        var reportValue = Ext.getCmp('inspectorReportButton').getValue();
        InsuranceTechnical.getApplication().addCache('reportValue', reportValue);
        if (!win) {
            win = Ext.create('InsuranceTechnical.view.guardian.GuardianPerformanceReportPopup');
            container.add(win);
        }
        win.show();
    },
    saveOtherBranch: function () {

        var form = Ext.getCmp('guardian-form-other').getForm();
        if (!form.isValid()) {
            Ext.Msg.alert('خطا', 'اطلاعات وارد شده کامل نمی باشد.');
            return;
        }
        if (this.getViewModel().get('guardianInfo.branchRequester') === this.getViewModel().get('guardianInfo.branchResponder')) {
            Ext.Msg.alert('پیام سیستم', 'کد شعبه درخواست کننده و کد شعبه بررسی کننده نمی تواند یکسان باشد');
            return;
        }
        // if (Ext.getCmp('reportRadiosOther').items.items[0].getValue())
        //     this.getViewModel().set('guardianInfo.branchInspResponse', '1');
        // else
        //     this.getViewModel().set('guardianInfo.branchInspResponse', '2');

        this.getViewModel().set('guardianInfo.actionType', 'otherBranch');
        this.saveData(this.getViewModel().get('guardianInfo'), Ext.getCmp('guardianOtherBranchPopup'));
    },
    saveTechReport: function () {

        var form = Ext.getCmp('guardian-form-report').getForm();
        if (!form.isValid()) {
            Ext.Msg.alert('خطا', 'اطلاعات وارد شده کامل نمی باشد.');
            return;
        }

        if (this.getViewModel().get('guardianInfo.inspectorConfirm') !== null
            && this.getViewModel().get('guardianInfo.inspectorConfirm') !== ''
            && this.getViewModel().get('guardianInfo.techConfStatus') !== null
            && this.getViewModel().get('guardianInfo.techConfStatus') !== '') {
            Ext.Msg.alert('خطا', 'امکان ویرایش گزارش بازرس فنی نیست.');
            return;
        }
        if (Ext.getCmp('reportRadios').items.items[0].getValue()) {
            this.getViewModel().set('guardianInfo.inspectorConfirm', '1');
        } else if (Ext.getCmp('reportRadios').items.items[1].getValue()) {
            this.getViewModel().set('guardianInfo.inspectorConfirm', '2');
        } else if (Ext.getCmp('reportRadios').items.items[2].getValue()) {
            this.getViewModel().set('guardianInfo.inspectorConfirm', '5');
        } else if (Ext.getCmp('reportRadios').items.items[3].getValue()) {
            this.getViewModel().set('guardianInfo.inspectorConfirm', '6');
        } else if (Ext.getCmp('reportRadios').items.items[4].getValue()) {
            this.getViewModel().set('guardianInfo.inspectorConfirm', '7');
        }

        this.getViewModel().set('guardianInfo.actionType', 'techReport');
        this.saveData(this.getViewModel().get('guardianInfo'), Ext.getCmp('guardianTechReportPopup'));
    },
    saveTechOpinion: function () {


        var form = Ext.getCmp('guardian-form-report').getForm();
        if (!form.isValid()) {
            Ext.Msg.alert('خطا', 'اطلاعات وارد شده کامل نمی باشد.');
            return;
        }

        if (this.getViewModel().get('guardianInfo.techConfStatus') !== null
            && this.getViewModel().get('guardianInfo.techConfStatus') !== '') {
            Ext.Msg.alert('خطا', 'نتیجه نظریه مسئول فنی قبلا ثبت شده است.');
            return;
        }

        if (Ext.getCmp('reportConf').items.items[0].getValue())
            this.getViewModel().set('guardianInfo.techConfStatus', '1');
        else if (Ext.getCmp('reportConf').items.items[1].getValue())
            this.getViewModel().set('guardianInfo.techConfStatus', '2');
        else if (Ext.getCmp('reportConf').items.items[2].getValue())
            this.getViewModel().set('guardianInfo.techConfStatus', '6');
        else if (Ext.getCmp('reportConf').items.items[3].getValue())
            this.getViewModel().set('guardianInfo.techConfStatus', '7');

//        if (this.getViewModel().get('guardianInfo.inspectorConfirm') !== null
//                && (this.getViewModel().get('guardianInfo.inspectorConfirm') === '6'
//                        || this.getViewModel().get('guardianInfo.inspectorConfirm') === '7')) {
//            if (Ext.getCmp('medicalConf').items.items[0].getValue()) {
//                this.getViewModel().set('guardianInfo.committeeConfirm', '1');
//            } else if (Ext.getCmp('medicalConf').items.items[1].getValue()) {
//                this.getViewModel().set('guardianInfo.committeeConfirm', '2');
//            }
//        }

        if (this.getViewModel().get('guardianInfo.techConfStatus') === '1') {
            if (this.getViewModel().get('guardianInfo.requesterType') === '1') {
                this.getViewModel().set('guardianInfo.status', '9');
            } else {
                this.getViewModel().set('guardianInfo.status', '2');
            }
        } else if (this.getViewModel().get('guardianInfo.techConfStatus') === '2') {
            this.getViewModel().set('guardianInfo.status', '1');
        } else if (this.getViewModel().get('guardianInfo.techConfStatus') === '6') {
            if (this.getViewModel().get('guardianInfo.committeeConfirm') === '1') {
                //TODO
                if (this.getViewModel().get('guardianInfo.requesterType') === '1') {
                    this.getViewModel().set('guardianInfo.status', '9');
                } else {
                    this.getViewModel().set('guardianInfo.status', '2');
                }
            } else {
                this.getViewModel().set('guardianInfo.status', '1');
            }
        } else if (this.getViewModel().get('guardianInfo.techConfStatus') === '7') {
            this.getViewModel().set('guardianInfo.status', '1');
        }

        this.getViewModel().set('guardianInfo.actionType', 'techOpinion');
        this.getViewModel().set('guardianInfo.techConfDesc', Ext.getCmp('techConfDesc').getValue());
        this.getViewModel().set('guardianInfo.techConfDate', new Date());

        this.saveData(this.getViewModel().get('guardianInfo'), Ext.getCmp('guardianTechnicianOpinionPopup'));
    },
    saveCommissionOpinion: function () {


        var form = Ext.getCmp('guardian-commission-form').getForm();
        if (!form.isValid()) {
            Ext.Msg.alert('خطا', 'اطلاعات وارد شده کامل نمی باشد.');
            return;
        }

        if (this.getViewModel().get('guardianInfo.committeeConfirm') !== null
            && this.getViewModel().get('guardianInfo.committeeConfirm') !== '') {
            Ext.Msg.alert('خطا', 'نتیجه نظریه کمیسیون پزشکی قبلا ثبت شده است.');
            return;
        }

        if (this.getViewModel().get('guardianInfo.inspectorConfirm') !== null
            && (this.getViewModel().get('guardianInfo.inspectorConfirm') === '6'
                || this.getViewModel().get('guardianInfo.inspectorConfirm') === '7')
            && this.getViewModel().get('guardianInfo.techConfStatus') !== null
            && (this.getViewModel().get('guardianInfo.techConfStatus') === '6'
                || this.getViewModel().get('guardianInfo.techConfStatus') === '7')) {
            if (Ext.getCmp('medicalConf').items.items[0].getValue()) {
                this.getViewModel().set('guardianInfo.committeeConfirm', '1');
            } else if (Ext.getCmp('medicalConf').items.items[1].getValue()) {
                this.getViewModel().set('guardianInfo.committeeConfirm', '2');
            }
        }

        this.getViewModel().set('guardianInfo.actionType', 'comOpinion');
        this.saveData(this.getViewModel().get('guardianInfo'), Ext.getCmp('guardianCommissionOpinionPopup'));

    },
    saveProvOpinion: function () {
        var form = Ext.getCmp('guardian-prov-form').getForm();
        if (!form.isValid()) {
            Ext.Msg.alert('خطا', 'اطلاعات وارد شده کامل نمی باشد.');
            return;
        }
        if (Ext.getCmp('provResponse').items.items[0].getValue())
            this.getViewModel().set('guardianInfo.provResponse', '1');
        else
            this.getViewModel().set('guardianInfo.provResponse', '2');


        this.getViewModel().set('guardianInfo.actionType', 'provOpinion');
        this.getViewModel().set('guardianInfo.provApprovalDesc', Ext.getCmp('provNoteId').getValue());
        this.getViewModel().set('guardianInfo.provResponseLetterDate', new Date());
        this.getViewModel().set('guardianInfo.ProvResponseRegLetterDate', new Date());
        this.saveData(this.getViewModel().get('guardianInfo'), Ext.getCmp('guardianProvOpinionPopup'));
    },
    saveProtestOpinion: function () {

        var form = Ext.getCmp('guardian-protest-form').getForm();
        if (!form.isValid()) {
            Ext.Msg.alert('خطا', 'اطلاعات وارد شده کامل نمی باشد.');
            return;
        }
        var recordStatus = InsuranceTechnical.getApplication().getCache('recordStatus');
        var protestStatus = InsuranceTechnical.getApplication().getCache('protestStatus');

        if (recordStatus === '8' && (protestStatus === '' || protestStatus === null)) {
            //ذخیره بازرس فنی

            if (Ext.getCmp('protestReportRadios').items.items[0].getValue()) {
                this.getViewModel().set('guardianInfo.inspectorConfirm', '1');
            } else if (Ext.getCmp('protestReportRadios').items.items[1].getValue()) {
                this.getViewModel().set('guardianInfo.inspectorConfirm', '2');
            } else if (Ext.getCmp('protestReportRadios').items.items[2].getValue()) {
                this.getViewModel().set('guardianInfo.inspectorConfirm', '5');
            } else if (Ext.getCmp('protestReportRadios').items.items[3].getValue()) {
                this.getViewModel().set('guardianInfo.inspectorConfirm', '6');
            } else if (Ext.getCmp('protestReportRadios').items.items[4].getValue()) {
                this.getViewModel().set('guardianInfo.inspectorConfirm', '7');
            }

            this.getViewModel().set('guardianInfo.protestStatus', '1');
            this.getViewModel().set('guardianInfo.actionType', 'techReport');
            this.saveData(this.getViewModel().get('guardianInfo'), Ext.getCmp('guardianProtestPopup'));

        } else if (recordStatus === '8' && protestStatus === '1') {
            //ذخیره مسول فنی

            if (Ext.getCmp('protestReportConf').items.items[0].getValue()) {
                this.getViewModel().set('guardianInfo.techConfStatus', '1');
            } else if (Ext.getCmp('protestReportConf').items.items[1].getValue()) {
                this.getViewModel().set('guardianInfo.techConfStatus', '2');
            } else if (Ext.getCmp('protestReportConf').items.items[2].getValue()) {
                this.getViewModel().set('guardianInfo.techConfStatus', '6');
            } else if (Ext.getCmp('protestReportConf').items.items[3].getValue()) {
                this.getViewModel().set('guardianInfo.techConfStatus', '7');
            }

            if (this.getViewModel().get('guardianInfo.techConfStatus') === '1') {
                this.getViewModel().set('guardianInfo.status', '2');
            } else if (this.getViewModel().get('guardianInfo.techConfStatus') === '2') {
                this.getViewModel().set('guardianInfo.status', '1');
            } else if (this.getViewModel().get('guardianInfo.techConfStatus') === '6') {
                if (this.getViewModel().get('guardianInfo.committeeConfirm') === '1') {
                    this.getViewModel().set('guardianInfo.status', '2');
                } else {
                    this.getViewModel().set('guardianInfo.status', '1');
                }
            } else if (this.getViewModel().get('guardianInfo.techConfStatus') === '7') {
                this.getViewModel().set('guardianInfo.status', '1');
            }

            this.getViewModel().set('guardianInfo.protestStatus', '2');
            this.getViewModel().set('guardianInfo.actionType', 'techOpinion');
            this.getViewModel().set('guardianInfo.protestTechNote', Ext.getCmp('protestTechNote').getValue());
            this.getViewModel().set('guardianInfo.protestTechDate', new Date());

            this.saveData(this.getViewModel().get('guardianInfo'), Ext.getCmp('guardianProtestPopup'));
        }
    },
    saveData: function (guardianData, window) {

        window.mask('لطفا منتظر بمانید...');
        var me = this;
        var actionType = guardianData.actionType;

        Ext.Ajax.request({
            url: InsuranceTechnical.helper.Urls.getUrl('guardian') + "/" + guardianData.reqSerial,
            method: "PUT",
            jsonData: guardianData,
            success: function () {

                window.unmask();
                Ext.Msg.alert('پیغام سیستم', 'رکورد با موفقیت ذخیره شد');
                me.getViewModel().getStore('guardianStore').reload();
                window.close();
            },
            failure: function (response) {

                window.unmask();
                var data = '';
                var message = '';
                if (response.responseText !== null && response.responseText !== ''
                    && Ext.JSON.decode(response.responseText).data.message !== null
                    && Ext.JSON.decode(response.responseText).data.message !== undefined) {
                    if (Ext.JSON.decode(response.responseText).status === 403) {
                        switch (actionType) {
                            case 'otherBranch':
                                message = 'شما دسترسی کارشناس فنی را ندارید';
                                break;
                            case 'techReport':
                                message = 'شما دسترسی بازرس فنی را ندارید';
                                break;
                            case 'techOpinion':
                                message = 'شما دسترسی مسول فنی را ندارید';
                                break;
                            case 'provOpinion':
                                message = 'شما دسترسی اداره کل فنی را ندارید';
                                break;
                            default :
                                message = 'خطا در انجام عملیات';
                                break;
                        }
                        InsuranceTechnical.tamin.window.MessageBox.showError('پیام سیستم', 'محدودیت دسترسی :' + '<br>' + message);
                    } else {
                        me.getViewModel().getStore('guardianStore').reload();
                        data = Ext.JSON.decode(response.responseText).data.message;
                        InsuranceTechnical.tamin.window.MessageBox.showError('پیام سیستم', 'خطا :' + '<br>' + data);
                    }
                } else {
                    Ext.Msg.alert('پیام سیستم', 'خطا در برقراری ارتباط با سرور' + '<br/>');
                }
            }
        });
    },
    printInsReport: function (button) {
        var record = button.up('button').getWidgetRecord().data;
        if (record.techConfStatus === null
            || record.inspectedDate === undefined
            || record.techConfDesc === null) {
            Ext.Msg.alert('خطا', 'نظریه مسئول فنی ثبت نشده است!');
            return;
        }
        var url = InsuranceTechnical.helper.Urls.getUrl('GuardianReport') +
            "/calc-ins?reqNo=" + record.reqSerial;
        Ext.create('InsuranceTechnical.tamin.window.PdfViewer', {url: url}).show();
    },
    printGuardianReports: function (button) {
        var form = Ext.getCmp('guardian-performance-report').getForm();
        if (!form.isValid()) {
            Ext.Msg.alert('خطا', 'اطلاعات وارد شده کامل نمی باشد.');
            return;
        }
        var url;
        var reportValue = InsuranceTechnical.getApplication().getCache('reportValue');

        if (reportValue === '1') {
            url = InsuranceTechnical.helper.Urls.getUrl('GuardianReport') +
                "/reports?sDate=" + this.getViewModel().get('report.sDate').getTime()
                + "&eDate=" + this.getViewModel().get('report.eDate').getTime();
        } else if (reportValue === '2') {
            url = InsuranceTechnical.helper.Urls.getUrl('GuardianReport') +
                "/inspectorQueueReports?sDate=" + this.getViewModel().get('report.sDate').getTime()
                + "&eDate=" + this.getViewModel().get('report.eDate').getTime();
        }
        Ext.create('InsuranceTechnical.tamin.window.PdfViewer', {url: url}).show();
    },
    onDeleteButton: function (view, rowIndex, colIndex, item, e, record, row, action) {

        // var record = arguments[0].up('tgrid').getStore().getAt(rowIndex);
        if (record.data.eRequestId !== null) {
            InsuranceTechnical.tamin.window.MessageBox.showInfo('پیام سیستم', ' حذف درخواست های غیر حضوری ممکن نیست.');
        }
        var storeListItemInfo = this.getViewModel().getStore('guardianStore');
        var url = InsuranceTechnical.helper.Urls.getUrl('guardian') + "/" + record.data.reqSerial;
        InsuranceTechnical.tamin.window.MessageBox.showYesNo('پیام سیستم', 'آبا مطمئن هستید ؟', null, function (button) {
            if (button === 'yes') {
                // Ext.getBody().mask('در حال انجام عملیات تایید...');
                Ext.Ajax.request({
                    url: url,
                    method: 'DELETE',
                    success: function (response, opts) {
                        Ext.getBody().unmask();

                        InsuranceTechnical.tamin.window.MessageBox.showInfo('پیام سیستم', 'اطلاعات با موفقیت حذف شد.');
                        storeListItemInfo.reload();
                    },
                    failure: function (response, opts) {
                        InsuranceTechnical.tamin.window.MessageBox.showError('خطا', JSON.parse(response.responseText).data.message);
                    }

                });
            }
        });
    },
    onCancelButton: function (btn) {
        var win = btn.up('window');
        win.close();

    },
    fixWindowPosition: function (win, container) {
        win.setPosition(((container.getWidth() - win.getWidth()) / 2));
        win.setY((Ext.getWin().dom.innerHeight - win.getHeight()) / 2);
    },
    inquiryOtherCashdeskPension: function (button) {

        var me = this;
        var record = button.up('button').getWidgetRecord().data;
        if (record.guardianType === '4') {
            var guardianNatCode = record.guardianNationalCode;
            var guardianNatCode2 = record.guardianNationalCode2;
            var url = InsuranceTechnical.helper.Urls.getUrl('GuardianSpec')
                + '?guardianNationalCode=' + guardianNatCode + '&guardianNationalCode2=' + guardianNatCode2 + '&guardianType=' + record.guardianType + '&reqSerial=' + record.reqSerial + '&eRequestId=' + record.eRequestId;
        } else {
            var guardianNatCode = record.guardianNationalCode;
            var url = InsuranceTechnical.helper.Urls.getUrl('GuardianSpec')
                + '?guardianNationalCode=' + guardianNatCode + '&guardianType=' + record.guardianType + '&reqSerial=' + record.reqSerial + '&eRequestId=' + record.eRequestId;
        }

        Ext.getBody().mask('لطفا منتظر بمانید...');

        Ext.Ajax.request({
            url: url,
            method: 'GET',
            //    jsonData: toBeSaved,
            success: function (response) {


                var resp = JSON.parse(response.responseText);
                var message = '';
                if (resp !== null && resp !== '' && resp !== undefined && resp.data !== null && resp.data !== "NO") {
                    switch (resp.data) {
                        case '01':
                            message = 'صندوق بازنشستگی کشوری';
                            break;
                        case 'OK':
                            message = 'صندوق بيمه هاي اجتماعي روستائيان و عشایر';
                            break;
                        case 'OE':
                            message = 'صندوق  بازنشستگي  پس  انداز بانكها';
                            break;
                        case '07':
                            message = 'صندوق  بازنشستگي  كاركنان  بانك  مركزي';
                            break;
                        case '08':
                            message = 'صندوق  بازنشستگي  شركت  ملي  فولاد';
                            break;
                        case '09':
                            message = 'سايرصندوقها';
                            break;
                        default :
                            //   message = 'خطا در انجام عملیات';
                            break;
                    }
                    InsuranceTechnical.tamin.window.MessageBox.showError('پیام سیستم', 'شخص مورد نظر جهت برقراری کفالت، مستمری بگیر ' + '<br>' + message + ' می باشد ');
                } else {
                    Ext.Msg.alert('پیغام سیستم', 'استعلام با موفقیت انجام شد');
                }
                me.getViewModel().getStore('guardianStore').load();
                Ext.getBody().unmask();

            },
            failure: function (response, opts) {
                Ext.getBody().unmask();
                InsuranceTechnical.tamin.window.MessageBox.showInfo('پیام سیستم', Ext.JSON.decode(response.responseText).data.message);
            }
        });
    },
    // ****
    // ******************************************* TEMP DOCUMENT UPLOAD *******************************************
    // ****
    openProvOpinionDocumentPopup: function (button) {
        var me = this;
        var win = this.lookupReference('guardian-Prov-Doc-ref');
        var guardianInfo = me.getViewModel().get('guardianInfo');
        if (!win) {
            win = Ext.create('InsuranceTechnical.view.guardian.GuardianProvDocumentPopup');
            this.getView().add(win);
            win.setViewModel({
                data: this.getViewModel().data
            });
        }

        this.loadProvImageStore(guardianInfo.reqSerial, function () {
            me.getView().add(win);
            me.getViewModel().set('guardianInfo', guardianInfo);
            win.show();
            win.center();
        });
    },
    loadProvImageStore: function (reqSerial, callBack) {
        var docStore = this.getViewModel().getStore('imageStore');
        docStore.clearFilter();
        docStore.addFilter({
            property: 'reqSerial',
            value: reqSerial,
            operator: 'EQUAL'
        });
        Ext.getBody().mask('در حال دریافت اطلاعات ...');
        docStore.load({
            callback: function (records, operation, success) {
                Ext.getBody().unmask();
                if (success) {
                    records.map(function (item) {
                        item = item.data;
                        item['data'] = 'data:image/png;base64,' + item.blob;
                        item['uploadDate'] = InsuranceTechnical.tamin.helpers.Persian.gregorianToPersian(new Date(item.uploadDate));
                        item['userName'] = item.userName;
                        delete item.blob;
                        delete item.blobString;
                    })
                    if (callBack) {
                        callBack();
                    }
                } else {
                    Ext.Msg.alert('پیام سیستم', 'خطا در برقراری ارتباط با سرور');
                }
            }
        });
    },
    documentClick: function (view, record, item, index, e, eOpts) {
        var me = this;
        var win = me.lookupReference('guardian-Prov-Doc-ref');
        switch (e.getTarget().className) {
            case "delete" :
                win.mask();
                setTimeout(function (win) {
                    win.unmask();
                    InsuranceTechnical.tamin.window.MessageBox.showYesNo('پیام سیستم', 'آیا مطمئن هستید ؟',
                        me.getView(),
                        function (button) {
                            if (button === 'yes') {
                                win.mask('در حال انجام عملیات ...');
                                var url = InsuranceTechnical.helper.Urls.getUrl('DeleteGuardianProvDocument') + '/' + record.data.guid;
                                Ext.Ajax.request({
                                    url: url,
                                    method: 'DELETE',
                                    success: function (res) {
                                        win.unmask();
                                        me.getViewModel().getStore('imageStore').remove(record);
                                        setTimeout(function () {
                                            InsuranceTechnical.tamin.window.MessageBox.showInfo('پیام سیستم', 'سند با موفقیت حذف شد');
                                        }, 500);
                                    },
                                    failure: function (response) {
                                        win.unmask();
                                        setTimeout(function () {
                                            InsuranceTechnical.tamin.window.MessageBox.showError('پیام سیستم', 'خطا در حذف سند !');
                                        }, 500);
                                    }
                                });
                            }
                        });
                }.bind(null, win), 500);
                break;
            case "preview":
                var win = me.lookupReference('winPreviewImage');
                if (!win) {
                    win = Ext.create('InsuranceTechnical.tamin.window.WinPreviewImage');
                    me.getView().add(win);
                    win.setViewModel({
                        data: this.getViewModel().data
                    });
                    win.getViewModel().set('document.documentName', 'مستندات مربوطه کمیته استان');
                    win.getViewModel().set('document.documentType', '-');
                    win.getViewModel().set('document.userName', record.data.userName);
                    win.getViewModel().set('document.documentUploadDate', record.data.uploadDate);
                }
                me.getView().add(win);
                setTimeout(function () {
                    Ext.getCmp('previewImage').setSrc(record.data.data);
                    win.show();
                    win.center();
                }.bind(null, win), 500);
                break;
        }
    },
    uploadDocument: function (fileUploadComponent, value, eOpts) {
        var me = this;
        var docStore = me.getViewModel().getStore('imageStore');
        var file = fileUploadComponent.getEl().down('input[type=file]').dom.files[0];
        var user = InsuranceTechnical.getApplication().getCache('user');
        var param = {};


        if (file != null && Number(file.size) < 800000) {
            Ext.getBody().mask('در حال بارگذاری سند...');
            var fileReader = new FileReader();
            var srcData = null;
            fileReader.readAsDataURL(file);
            fileReader.onload = function (fileLoadedEvent) {
                srcData = fileLoadedEvent.target.result;
                var data = {};
                data['data'] = srcData;
                data['uploadDate'] = InsuranceTechnical.tamin.helpers.Persian.gregorianToPersian(new Date());
                data['userName'] = user.firstName + ' ' + user.lastName;
                var images = me.getViewModel().getStore('imageStore').data.items;
                for (const [key, doc] of Object.entries(images)) {
                    if (doc.data.data === data.data) {
                        Ext.Msg.show({
                            title: 'خطا',
                            message: 'سند تکراری، سند مورد نظر به لیست مستندات اضافه شده است.',
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.ERROR,
                            cls: 'ExtMessageBox'
                        });
                        return;
                    }
                }
                param.blobString = srcData.split(',')[1];/*.slice(srcData.indexOf('base64,') + 7)*/
                ;
                param.reqSerial = me.getViewModel().get('guardianInfo.reqSerial');
                param.uploadDate = new Date();
                param.userName = user.nationalCode;
                var url = InsuranceTechnical.helper.Urls.getUrl('GuardianProvDocument');
                Ext.Ajax.request({
                    url: url,
                    method: 'POST',
                    jsonData: param,
                    contentType: false,
                    processData: false,
                    success: function (res) {
                        data['guid'] = Ext.JSON.decode(res.responseText).data.guid;
                        docStore.add(data);
                        Ext.getBody().unmask();
                        InsuranceTechnical.tamin.window.MessageBox.showInfo('پیام سیستم', 'سند با موفقیت ذخیره شد');
                    },
                    failure: function (response) {
                        Ext.getBody().unmask();
                        InsuranceTechnical.tamin.window.MessageBox.showError('پیام سیستم', 'خطا در بارگذاری سند !');
                    }
                });
            }
        }
    },
});
