Ext.define('InsuranceTechnical.view.refund.RefundCreateReqController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.refund-create-req-controller',
    init: function () {
        var me = this;
        var orgCode = InsuranceTechnical.getApplication().getCache('organizationCode');
        /*var user = InsuranceTechnical.getApplication().getCache('user');
        var rolesArray = [];
        if (user !== undefined) {
            Ext.Object.each(user.roles, function (property, value) {
                if (value !== '') {
                    rolesArray.push(value.roleName);
                }
            });
        }
        if (!rolesArray.includes('PILOT_USER_TECH')) {
            this.redirectTo('home', false);
            return
        }*/

        this.getViewModel().set('refundInfo', {
            insuranceId: '',
            reqDate: null,
            birthDate: null,
            nationalCode: '',
            idNo: '',
            lastName: '',
            firstName: '',
            createDate: null,
            createUserId: '',
            isuTypeCode: '',
            reasonCode: '',
            darmanStartDate: null,
            darmanEndDate: null,
            darmanDebitTypeCode: '',
            paymentDarman: '',
            paymentIsu: '',
            paymentTotal: '',
            workDaysDarman: '',
            workDaysIsu: '',
            isuStartDate: null,
            isuEndDate: null,
            isuDebitTypeCode: '',
            categoryTypeCode: '',
            isuRefund: 0,
            darmanRefund: 0,
            paymentSelectItem: 0
        });
        var reqSerial = null;
        var nationalId = null;
        if (window.location.toString().includes('_')) {
            reqSerial = window.location.hash.split('/').slice(-1)[0].split('_')[0];
            if (reqSerial !== null) {
                /*setTimeout(function () {
                    if (Ext.getCmp('tpan').getViewModel().getStore('refundRelationStore').data.items.length === 0) {
                        location.reload();
                    }
                }, 2000);*/
                InsuranceTechnical.getApplication().addCache('reqSerial', reqSerial);
                Ext.getBody().mask('لطفا منتظر بمانید...');
                Ext.Ajax.request({
                    url: InsuranceTechnical.helper.Urls.getUrl('refund')
                        + '/' + reqSerial,
                    method: 'GET',
                    success: function (response) {
                        var data = Ext.JSON.decode(response.responseText).data;
                        me.getViewModel().set('refundInfo', data);
                        me.getViewModel().set('refundInfo.nationalCode', data.insuranceRegisteration.nationalId);
                        me.getViewModel().set('refundInfo.firstName', data.insuranceRegisteration.firstName);
                        me.getViewModel().set('refundInfo.lastName', data.insuranceRegisteration.lastName);
                        me.getViewModel().set('refundInfo.insuranceId', data.insuranceRegisteration.id);
                        me.getViewModel().set('refundInfo.idNo', data.insuranceRegisteration.idCardNumber);
                        me.getViewModel().set('refundInfo.branchCode', data.insuranceRegisteration.brchCode);
                        me.getViewModel().set('refundInfo.birthDate', InsuranceTechnical.tamin.helpers.Persian.gregorianToPersian(new Date(data.insuranceRegisteration.doB)));

                        me.getViewModel().set('refundInfo.reasonCode', data.refundReason.reasonCode);
                        me.getViewModel().set('refundInfo.isuStartDate', new Date(data.isuStartDate));
                        me.getViewModel().set('refundInfo.isuEndDate', new Date(data.isuEndDate));
                        me.getViewModel().set('refundInfo.darmanStartDate', data.darmanStartDate !== null ? new Date(data.darmanStartDate) : '');
                        me.getViewModel().set('refundInfo.darmanEndDate', data.darmanEndDate !== null ? new Date(data.darmanEndDate) : '');

                        me.getViewModel().set('refundInfo.paymentTotal', data.paymentTotal);
                        me.getViewModel().set('refundInfo.workDaysIsu', data.workDaysIsu);
                        me.getViewModel().set('refundInfo.paymentIsu', data.paymentIsu);
                        me.getViewModel().set('refundInfo.workDaysDarman', data.workDaysDarman);
                        me.getViewModel().set('refundInfo.paymentDarman', data.paymentDarman);

                        me.getViewModel().set('saveDisable', data.status !== '0' || data.branchCode !== orgCode);

                        me.getViewModel().set('is-new-request-page', false);
                        me.getViewModel().set('refundEdit', true);
                        me.getViewModel().set('filling', true);
                        Ext.getCmp('nationalId').disable();
                        Ext.getCmp('saveButton').setDisabled(true);
                        Ext.getCmp('fieldset-isu').setDisabled(false);
                        Ext.getCmp('fieldset-darman').setDisabled(false);

                        /*if (nationalId !== "null") {
                            me.onFindWithNationalCode(nationalId);
                        }*/
                        me.fillPaymentStoreOnEdit(data.paymentRefrenceId, data.insuranceRegisteration.nationalId);
                    },
                    failure: function () {
                        Ext.getBody().unmask();
                        Ext.Msg.alert('پیام سیستم', 'خطا در برقراری ارتباط با سرور' + '<br/>');
                    }
                });
            }
        } else {
            this.getViewModel().set('refundEdit', false);
            me.getViewModel().set('filling', false);
            me.getViewModel().set('saveDisable', false);
        }
    },
    fillPaymentStoreOnEdit: function (paymentRefrenceId, nationalCode) {
        var paymentStore = this.getViewModel().getStore('refundPaymentStore');
        var filters = [];
        filters.push({
            property: 'resNum',
            value: paymentRefrenceId,
            operator: 'EQUAL'
        });
        filters.push({
            property: 'NATIONCODE',
            value: nationalCode,
            operator: 'EQUAL'
        });
        paymentStore.clearFilter(true);
        paymentStore.addFilter(filters, true);
        paymentStore.load({
            callback: function caller(record, operation, success) {
                if (record.length === 1) {
                    Ext.getCmp('refundPayment-grid').setSelection(record[0]);
                }
            }
        });
    },
    onCancelButton: function () {
        this.redirectTo('refund-spec', false);
    },
    onEnterOnInsId: function (field, e) {

        if (e.getKey() === e.ENTER) {
            this.findID(field, field.getValue());
        }
    },
    findID: function (field, newValue) {

        var me = this;
        if (newValue === null || !me.getViewModel().get('is-new-request-page'))
            return;
        var value = newValue.toString();
        if (value.length === 10) {
            var store = this.getViewModel().getStore('insuranceRegisterations');
            var filter = {
                property: 'id',
                value: newValue,
                operator: 'EQUAL'
            };
            store.clearFilter(true);
            store.addFilter(filter, true);
            store.load({
                callback: function (record, operation, success) {
                    Ext.getBody().unmask();
                    if (success) {
                        if (record.length !== 0) {
                            var data = record[0].getData();
                            me.getViewModel().set('guardianInfo.firstName', data.firstName);
                            me.getViewModel().set('guardianInfo.lastName', data.lastName);
                            me.getViewModel().set('guardianInfo.nationalCode', data.nationalId);
                            me.getViewModel().set('guardianInfo.IdNo', data.idCardNumber);
                            // me.getViewModel().set('guardianInfo.birthDate', InsuranceTechnical.tamin.helpers.Persian.gregorianToPersian(new Date(data.doB)));
                        } else {
                            Ext.Msg.alert('پیام سیستم', 'شماره بیمه مورد نظر یافت نشد.');
                        }
                    } else {
                        Ext.Msg.alert('پیام سیستم', 'خطا در برقراری ارتباط با سرور' + '<br/>');
                    }
                }
            });
            Ext.getBody().mask('لطفا منتظر بمانید...');
        }
    },
    onFindWithNationalCode: function (val) {

        var me = this;
        if (me.getViewModel().get('refundEdit')) {
            return;
        }
        var nationalCode = val.value !== undefined ? val.value : val;

        if (!me.getViewModel().get('refundEdit')) {
            me.resetPerson();
            me.resetReason();
            me.resetCalc();
            me.resetStores();
        }

        if (nationalCode.length === 10) {
            var url = InsuranceTechnical.helper.Urls.getUrl('InsuranceData') + "?nationalCode=" + nationalCode;
            Ext.Ajax.request({
                url: url,
                method: 'GET',
                callback: function (options, success, response) {
                    if (success) {
                        var data = JSON.parse(response.responseText).data;
                        me.getViewModel().set('refundInfo.branchCode', data.branchCode);
                        me.getViewModel().set('refundInfo.nationalCode', nationalCode);
                        me.getViewModel().set('refundInfo.firstName', data.firstName);
                        me.getViewModel().set('refundInfo.lastName', data.lastName);
                        me.getViewModel().set('refundInfo.insuranceId', data.id);
                        me.getViewModel().set('refundInfo.idNo', data.idNo);
                        me.getViewModel().set('refundInfo.birthDate', InsuranceTechnical.tamin.helpers.Persian.gregorianToPersian(new Date(data.birthDate)));
                        if (data.id) {
                            me.filterRefundPaymentByInsuranceId(nationalCode);
                            Ext.getCmp('refundPayment-grid').setDisabled(false);
                        }
                        /*if (data.branchCode !== 'undefined' && data.branchCode !== userOrganization) {
                            InsuranceTechnical.tamin.window.MessageBox.showInfo('پیام سیستم', 'بیمه شده ، بیمه پرداز شعبه'
                                + data.branchCode + 'میباشد و رسیدگی به درخواست از طریق شعبه مذکور قابل انجام است');
                        }*/
                    } else {
                        InsuranceTechnical.tamin.window.MessageBox.showError('خطا', JSON.parse(response.responseText).data.message);
                    }
                }
            });
        } else {
            me.resetPerson();
        }
    },
    filterRefundPaymentByInsuranceId: function (val) {

        var me = this;
        var viewModel = me.getViewModel();
        var nationalCode = val.value !== undefined ? val.value : val;
        var store = viewModel.getStore('refundPaymentStore');
        var filters = {
            property: 'NATIONCODE',
            value: nationalCode,
            operator: 'EQUAL'
        };
        store.addFilter(filters, true);
        store.load({
            callback: function caller(record, operation, success) {
                if (success) {
                    if (record.length === 0) {
                        Ext.Msg.alert('پیام سیستم', 'بدلیل عدم وجود ریز اقلام بدهی پرداخت انتخابی، ثبت استرداد امکانپذیر نیست');
                    }
                } else {
                    InsuranceTechnical.tamin.window.MessageBox.showError('خطا', JSON.parse(response.responseText).data.message);
                }
            }
        });
    },
    selectRefundPayment: function (grid, selection) {

        var me = this;
        if (!me.getViewModel().get('refundEdit')) {
            me.resetReason();
        }
        me.getViewModel().set('refundPayment', selection.data);
        var startDate = InsuranceTechnical.tamin.helpers.Persian.taminDateToGregorian(selection.data.cws_DBTSDATE);
        var endDate = InsuranceTechnical.tamin.helpers.Persian.taminDateToGregorian(selection.data.cws_DBTEDATE);
        Ext.getCmp('isuPaySDate').setMinValue(startDate);
        Ext.getCmp('isuPaySDate').setMaxValue(endDate);
        Ext.getCmp('isuPayEDate').setMinValue(startDate);
        Ext.getCmp('isuPayEDate').setMaxValue(endDate);
        Ext.getCmp('darmanPaySDate').setMinValue(startDate);
        Ext.getCmp('darmanPaySDate').setMaxValue(endDate);
        Ext.getCmp('darmanPayEDate').setMinValue(startDate);
        Ext.getCmp('darmanPayEDate').setMaxValue(endDate);
        Ext.getCmp('fieldset-refund').setDisabled(false);
        var reasonStore = me.getViewModel().getStore('refundRelationStore');

        var refundDetailStore = me.getViewModel().getStore('refundDetailStore');
        refundDetailStore.clearFilter(true);
        refundDetailStore.addFilter({
            property: 'resnum',
            value: selection.data.resnum,
            operator: 'EQUAL'
        }, true);
        refundDetailStore.load();

        var refundDebitStore = me.getViewModel().getStore('refundDebitStore');
        filter = [];
        filter.push({
            property: 'pcws_dbtno',
            value: selection.data.cws_DBTNO,
            operator: 'EQUAL'
        });
        filter.push({
            property: 'pnatcode',
            value: me.getViewModel().get('refundInfo.nationalCode'),
            operator: 'EQUAL'
        });
        filter.push({
            property: 'psdate',
            value: selection.data.cws_DBTSDATE,
            operator: 'EQUAL'
        });
        filter.push({
            property: 'pedate',
            value: selection.data.cws_DBTEDATE,
            operator: 'EQUAL'
        });
        refundDebitStore.clearFilter(true);
        refundDebitStore.addFilter(filter, true);
        refundDebitStore.load({
            callback: function caller(records, operation, success) {
                if (records.length === 0) {
                    Ext.Msg.alert('پیام سیستم', 'کد نوع بدهی برخی اقلام بدهی مشخص نیست. امکان ثبت استرداد وجود ندارد');
                } else {
                    reasonStore.clearFilter(true);
                    // if (!records.some(function (item) {
                    //     return item.data.debitTypeCode === '021';
                    // })) {
                    //     reasonStore.addFilter({
                    //         property: 'refundDarman',
                    //         value: '0',
                    //         operator: 'EQUAL'
                    //     }, true);
                    // }
                    var filter = {
                        property: 'relationTypeCode',
                        value: selection.data.typecode,
                        operator: 'EQUAL'
                    };
                    reasonStore.addFilter(filter, true);
                    Ext.getCmp('refundReason').setDisabled(false);
                    reasonStore.load({
                        callback: function caller(record, operation, success) {
                            if (me.getViewModel().get('refundEdit')) {
                                var item = record.find(function (item) {
                                    return item.data.refundReason.reasonCode === me.getViewModel().get('refundInfo.reasonCode');
                                });
                                if (item !== null && item !== undefined) {
                                    Ext.getCmp('refundReason').setSelection(item);
                                }
                            }
                        }
                    });
                }
            }
        });
    },
    deSelectRefundPayment: function (grid, selection) {
        
        Ext.getCmp('refundReason').reset();
        Ext.getCmp('isuPaySDate').reset();
        Ext.getCmp('isuPayEDate').reset();
        Ext.getCmp('darmanPaySDate').reset();
        Ext.getCmp('darmanPayEDate').reset();
        Ext.getCmp('fieldset-refund').setDisabled(true);
    },
    selectRefundReason: function (combo, record, eOpts) {

        var me = this;
        // var today = new Date();
        const darmanSDateCmp = Ext.getCmp('darmanPaySDate');
        const darmanEDateCmp = Ext.getCmp('darmanPayEDate');
        var refundPayment = me.getViewModel().get('refundPayment');
        /*var endDate = InsuranceTechnical.tamin.helpers.Persian.taminDateToGregorian(refundPayment.cws_DBTEDATE);
        endDate = (endDate === null ? refundPayment.cws_DBTEDATE : endDate);*/
        if (record.data.refundReason.reasonCode === '14') {
            Ext.getCmp('fieldset-isu').setDisabled(true);
            Ext.getCmp('fieldset-darman').setDisabled(true);
            me.getViewModel().set('saveDisable', true);
            return;
        } else if (!me.getViewModel().get('saveDisable')){
            me.getViewModel().set('saveDisable', false);
        }
        me.resetCalc();
        me.getViewModel().set('hideDarmanTip', true);
        if (!me.getViewModel().get('refundEdit')) {
            me.getViewModel().set('refundInfo.isuStartDate', null);
            me.getViewModel().set('refundInfo.isuEndDate', null);
            me.getViewModel().set('refundInfo.darmanStartDate', null);
            me.getViewModel().set('refundInfo.darmanEndDate', null);
            if (record.data.refundIsu === 1) {
                me.getViewModel().set('refundInfo.isuStartDate',
                    InsuranceTechnical.tamin.helpers.Persian.taminDateToGregorian(refundPayment.cws_DBTSDATE));
                me.getViewModel().set('refundInfo.isuEndDate',
                    InsuranceTechnical.tamin.helpers.Persian.taminDateToGregorian(refundPayment.cws_DBTEDATE));
            }
            if (record.data.refundDarman === 1) {
                // if (endDate.getTime() > today.getTime()) {
                    me.getViewModel().set('refundInfo.darmanStartDate',
                        InsuranceTechnical.tamin.helpers.Persian.taminDateToGregorian(refundPayment.cws_DBTSDATE));
                    me.getViewModel().set('refundInfo.darmanEndDate',
                        InsuranceTechnical.tamin.helpers.Persian.taminDateToGregorian(refundPayment.cws_DBTEDATE));
                // }
            }
        }
        me.getViewModel().set('refundInfo.reasonCode', record.data.refundReason.reasonCode);
        me.getViewModel().set('refundReason', record.data);
        switch (record.data.refundIsu) {
            case 0:
                Ext.getCmp('fieldset-isu').setDisabled(true);
                break;
            case 1:
                Ext.getCmp('fieldset-isu').setDisabled(false);
                break;
            default:
                Ext.getCmp('fieldset-isu').setDisabled(true);
        }
        if (record.data.refundDarman === 1 /*&& endDate.getTime() > today.getTime()*/) {
            darmanSDateCmp.setDisabled(false);
            darmanEDateCmp.setDisabled(false);
            Ext.getCmp('fieldset-darman').setDisabled(false);
        } else {
            darmanSDateCmp.setDisabled(true);
            darmanEDateCmp.setDisabled(true);
            Ext.getCmp('fieldset-darman').setDisabled(true);
            /*if (record.data.refundDarman === 1 && endDate.getTime() <= today.getTime()) {
                me.getViewModel().set('hideDarmanTip', false);
            }*/
        }

        me.getViewModel().set('refundInfo.isuRefund', record.data.refundIsu);
        me.getViewModel().set('refundInfo.darmanRefund', record.data.refundDarman);
        if (me.getViewModel().get('filling')) {
            me.onCalculateButton();
        }
    },
    onCalculateButton: function (val) {
        var me = this;
        var isuRefundStartDate = new Date().getTime();
        var isuRefundEndDate = new Date().getTime();
        var darmanRefundStartDate = new Date().getTime();
        var darmanRefundEndDate = new Date().getTime();
        var refundPayment = me.getViewModel().get('refundPayment');
        var refundReason = me.getViewModel().get('refundReason');
        var refundDetailStore = me.getViewModel().getStore('refundDetailStore');
        /*var today = new Date();
        var endDate = InsuranceTechnical.tamin.helpers.Persian.taminDateToGregorian(refundPayment.cws_DBTEDATE);
        endDate = (endDate === null ? refundPayment.cws_DBTEDATE : endDate);*/

        if (refundPayment !== null && refundPayment !== undefined) {
            me.getViewModel().set('refundInfo.paymentRefrenceId', refundPayment.resnum);
            me.getViewModel().set('refundInfo.contractNo', refundPayment.cnt_CNTRCTNO);
            me.getViewModel().set('refundInfo.debitNo', refundPayment.cws_DBTNO);
            me.getViewModel().set('refundInfo.isuTypeCode', refundPayment.selfisutypecode);
            me.getViewModel().set('refundInfo.isuDebitTypeCode', refundPayment.isu_DEBITTYPECODE);
            me.getViewModel().set('refundInfo.darmanDebitTypeCode', refundPayment.darman_DEBITTYPECODE);
            me.getViewModel().set('refundInfo.paymentBranch', refundPayment.brch_CODE);
        } else {
            Ext.Msg.alert('خطا', 'اطلاعات برگه پرداخت انتخاب نشده');
            return false;
        }
        if (refundReason.refundIsu === 1) {
            if (!Ext.getCmp('refundReason').isValid()
                || !Ext.getCmp('isuPaySDate').isValid()
                || !Ext.getCmp('isuPayEDate').isValid()) {
                Ext.Msg.alert('خطا', 'اطلاعات را تکمیل نمایید.');
                return false;
            }
            isuRefundStartDate = me.getViewModel().get('refundInfo.isuStartDate').getTime();
            isuRefundEndDate = me.getViewModel().get('refundInfo.isuEndDate').getTime();
            if (isuRefundEndDate < isuRefundStartDate) {
                Ext.Msg.alert('خطا', 'تاریخ شروع دوره استرداد حق بیمه نمیتواند پس از تاریخ پایان دوره باشد');
                return false;
            }

            /*try {
                refundDetailStore.data.items.forEach(function (item) {
                    var userIsuDuration;
                    if (item.data.status === '5') {
                        return;
                    }
                    var refundSDate = InsuranceTechnical.tamin.helpers.Persian.gregorianToPersian(me.getViewModel().get('refundInfo.isuStartDate'));
                    if (item.get("debitTypeCode") === '020' && refundSDate.substring(0, 4) === item.get("year").trim()
                        && refundSDate.substring(5, 7) === item.get("month").trim()) {
                        userIsuDuration = Math.floor((isuRefundEndDate - isuRefundStartDate) / (24 * 3600 * 1000));
                        if (parseInt(userIsuDuration) > parseInt(item.get("day").trim())) {
                            throw Error();
                        }
                    }
                });
            } catch (error) {
                if (!me.getViewModel().get('filling')) {
                    Ext.Msg.alert('خطا', 'دوره وارد شده جهت استرداد، با استردادهای قبلی برگه پرداخت انتخابی، تداخل دارد');
                    return false;
                }
            }*/
        }
        if (refundReason.refundDarman === 1 /*&& endDate.getTime() > today.getTime()*/) {
            if (!Ext.getCmp('darmanPaySDate').isValid()
                || !Ext.getCmp('darmanPayEDate').isValid()) {
                Ext.Msg.alert('خطا', 'اطلاعات را تکمیل نمایید.');
                return false;
            }
            darmanRefundStartDate = me.getViewModel().get('refundInfo.darmanStartDate').getTime();
            darmanRefundEndDate = me.getViewModel().get('refundInfo.darmanEndDate').getTime();
            /*if (darmanRefundStartDate < today || darmanRefundEndDate < today) {
                Ext.Msg.alert('خطا', 'تاریخ شروع و پایان دوره استرداد سرانه درمان باید پس از تاریخ روز جاری باشد');
                return false;
            }*/
            if (darmanRefundEndDate < darmanRefundStartDate) {
                Ext.Msg.alert('خطا', 'تاریخ شروع دوره استرداد سرانه درمان نمیتواند پس از تاریخ پایان باشد');
                return false;
            }

            /*try {
                refundDetailStore.data.items.forEach(function (item) {
                    var userDarmanDuration;
                    if (item.data.status === '5') {
                        return;
                    }
                    var darmanSDate = InsuranceTechnical.tamin.helpers.Persian.gregorianToPersian(me.getViewModel().get('refundInfo.darmanStartDate'));
                    if (item.get("debitTypeCode") !== '020' && darmanSDate.substring(0, 4) === item.get("year").trim()
                        && darmanSDate.substring(5, 7) === item.get("month").trim()) {
                        userDarmanDuration = Math.floor((darmanRefundEndDate - darmanRefundStartDate) / (24 * 3600 * 1000));
                        if (parseInt(userDarmanDuration) > parseInt(item.get("day").trim())) {
                            Ext.Msg.alert('خطا', 'دوره وارد شده جهت استرداد، با استردادهای قبلی برگه پرداخت انتخابی، تداخل دارد');
                            throw Error();
                        }
                    }
                });
            } catch (error) {
                if (!me.getViewModel().get('filling')) {
                    Ext.Msg.alert('خطا', 'برای این تاریخ سرانه درمان، استرداد پیشین ثبت گردیده است.');
                    return false;
                }
            }*/
        }

        var url = InsuranceTechnical.helper.Urls.getUrl('refundCalculate')
            // + "?debitNumber=" + refundPayment.cws_DBTNO
            + "?resNumber=" + refundPayment.resnum
            + "&isuRefundStartDate=" + isuRefundStartDate
            + "&isuRefundEndDate=" + isuRefundEndDate
            + "&darmanRefundStartDate=" + darmanRefundStartDate
            + "&darmanRefundEndDate=" + darmanRefundEndDate
            + "&selfIsuType=" + refundPayment.selfisutypecode
            + "&spcRate=" + refundPayment.spcratecode
            + "&reasonCode=" + refundReason.refundReason.reasonCode
            + "&isuRefund=" + refundReason.refundIsu
            + "&darmanRefund=" + refundReason.refundDarman
            + "&editMode=" + me.getViewModel().get('refundEdit');

        Ext.Ajax.request({
            url: url,
            method: 'GET',
            callback: function (options, success, response) {
                if (success) {
                    var data = JSON.parse(response.responseText).data;
                    me.getViewModel().set('refundInfo.paymentTotal', data.list[0].paymentTotal);
                    me.getViewModel().set('refundInfo.workDaysIsu', data.list[0].workDaysIsu);
                    me.getViewModel().set('refundInfo.paymentIsu', data.list[0].paymentIsu);
                    me.getViewModel().set('refundInfo.workDaysDarman', data.list[0].workDaysDarman);
                    me.getViewModel().set('refundInfo.paymentDarman', data.list[0].paymentDarman);
                    if (data.list[0].paymentTotal !== 0 && !me.getViewModel().get('saveDisable')) {
                        Ext.getCmp('saveButton').setDisabled(false);
                    }
                    me.getViewModel().set('filling', false);
                    Ext.getBody().unmask();
                } else {
                    InsuranceTechnical.tamin.window.MessageBox.showError('خطا', JSON.parse(response.responseText).data.message);
                }
            }
        });
    },
    checkDataValidation: function () {
        
        var flagCauseAge = false;
        var form = Ext.getCmp('refund-form-id').getForm();
        if (!form.isValid()) {
            Ext.Msg.alert('خطا', 'اطلاعات وارد شده کامل نمی باشد.');
            return false;
        }
        if (this.getViewModel().get('refundInfo.reqDate') > new Date()) {
            Ext.Msg.alert('خطا', 'تاریخ درخواست اشتباه است.');
            return false;
        }

        if (this.getViewModel().get('refundInfo.birthDate') > new Date()
            || this.getViewModel().get('refundInfo.guardianBirthDate') > new Date()) {
            Ext.Msg.alert('خطا', 'تاریخ تولد اشتباه است.');
            return false;
        }

        if (this.getViewModel().get('refundInfo.guardianType') === '4'
            && this.getViewModel().get('refundInfo.guardianBirthDate2') > new Date()) {
            Ext.Msg.alert('خطا', 'تاریخ تولد اشتباه است.');
            return false;
        }
        this.getViewModel().set('refundInfo.status', '0');
        this.getViewModel().set('refundInfo.causeAge', '1');
        if (this.getViewModel().get('refundInfo.haveMedicalDoc') === '0') {
            //var age = this.getViewModel().get('guardianInfo.reqDate') - this.getViewModel().get('guardianInfo.guardianBirthDate');
            var date1 = new Date(this.getViewModel().get('refundInfo.guardianBirthDate'));
            var date2 = new Date(this.getViewModel().get('refundInfo.guardianBirthDate2'));
            var date3 = new Date(this.getViewModel().get('refundInfo.reqDate'));
            var diffTime1 = Math.abs(date3 - date1);
            var diffTime2 = Math.abs(date3 - date2);
            var diffDays1 = Math.ceil(diffTime1 / (1000 * 60 * 60 * 24));
            var diffDays2 = Math.ceil(diffTime2 / (1000 * 60 * 60 * 24));
            var age = diffDays1;
            var age2 = diffDays2;
            switch (this.getViewModel().get('refundInfo.guardianType')) {
                case '1':
                case '3':
                    if (age < 60 * 365) {
                        this.getViewModel().set('refundInfo.causeAge', '0');
                        flagCauseAge = true;
                    }
                    break;
                case '2':
                    if (age < 55 * 365) {
                        this.getViewModel().set('refundInfo.causeAge', '0');
                        flagCauseAge = true;
                    }
                    break;
                case '4':
                    if (age < 60 * 365) {
                        this.getViewModel().set('refundInfo.causeAge', '0');
                        flagCauseAge = true;
                        break;
                    }
                    if (age2 < 55 * 365) {
                        this.getViewModel().set('refundInfo.causeAge', '0');
                        flagCauseAge = true;
                    }
                    break;
            }
        }
        if (flagCauseAge) {
            Ext.Msg.alert('خطا', 'با توجه به شرایط سنی ، ثبت گواهی پزشک معالج الزامی است.');
            return false;
        }
        return true;
    },
    saveData: function () {
        Ext.getBody().mask('لطفا منتظر بمانید...');
        var me = this;
        var record = me.getViewModel().get('refundInfo');
        var refundPayment = me.getViewModel().get('refundPayment');
        var jsonData = {
            requestDate: new Date(),
            insuranceId: refundPayment.risuid,
            nationalId: record.nationalCode,
            paymentRefrenceId: record.paymentRefrenceId,
            contractNo: record.contractNo,
            debitNo: record.debitNo,
            refundReason: {
                reasonCode: record.reasonCode
            },
            isuTypeCode: record.isuTypeCode,
            isuStartDate: record.isuStartDate,
            isuEndDate: record.isuEndDate,
            isuDays: record.workDaysIsu,
            isuAmount: record.paymentIsu,
            isuDebitTypeCode: record.isuDebitTypeCode,
            darmanDebitTypeCode: record.darmanDebitTypeCode,
            darmanStartDate: record.darmanStartDate,
            darmanEndDate: record.darmanEndDate,
            darmanDays: record.workDaysDarman,
            darmanAmount: record.paymentDarman,
            categoryTypeCode: "1",
            branchCode: record.paymentBranch
        };

        var method = me.getViewModel().get('refundEdit') ? "PUT" : "POST";
        var url = InsuranceTechnical.helper.Urls.getUrl('refund');
        if (me.getViewModel().get('refundEdit')) {
            var reqSerial = InsuranceTechnical.getApplication().getCache('reqSerial');
            jsonData.requestSerial = reqSerial;
            url = url + "/" + reqSerial;
        }
        Ext.Ajax.request({
            url: url,
            method: method,
            jsonData: jsonData,
            success: function () {
                Ext.getBody().unmask();
                Ext.Msg.alert('پیغام سیستم', 'رکورد با موفقیت ذخیره شد');
                me.redirectTo('refund-spec', false);
            },
            failure: function (response) {
                Ext.getBody().unmask();
                var data = '';
                if (response.responseText !== null && response.responseText !== ''
                    && Ext.JSON.decode(response.responseText).data.message !== null
                    && Ext.JSON.decode(response.responseText).data.message !== undefined) {
                    if (Ext.JSON.decode(response.responseText).status === 403) {
                        InsuranceTechnical.tamin.window.MessageBox.showError('پیام سیستم', 'خطا :' + '<br>' + 'محدودیت دسترسی');
                    } else {
                        data = Ext.JSON.decode(response.responseText).data.message;
                        InsuranceTechnical.tamin.window.MessageBox.showError('پیام سیستم', 'خطا :' + '<br>' + data);
                    }
                } else {
                    Ext.Msg.alert('پیام سیستم', 'خطا در برقراری ارتباط با سرور' + '<br/>');
                }
            }
        });
    },
    onSaveButton: function () {
        if (this.checkDataValidation())
            this.saveData();
    },
    resetCalc: function () {
        var me = this;
        me.getViewModel().set('refundInfo.paymentTotal', '');
        me.getViewModel().set('refundInfo.workDaysIsu', '');
        me.getViewModel().set('refundInfo.paymentIsu', '');
        me.getViewModel().set('refundInfo.workDaysDarman', '');
        me.getViewModel().set('refundInfo.paymentDarman', '');
        Ext.getCmp('saveButton').setDisabled(true);
    },
    resetPerson: function () {
        var me = this;
        me.getViewModel().set('refundInfo.branchCode', '');
        me.getViewModel().set('refundInfo.nationalCode', '');
        me.getViewModel().set('refundInfo.firstName', '');
        me.getViewModel().set('refundInfo.lastName', '');
        me.getViewModel().set('refundInfo.insuranceId', '');
        me.getViewModel().set('refundInfo.idNo', '');
        me.getViewModel().set('refundInfo.birthDate', '');
        // Ext.getCmp('fieldset-payment').setDisabled(true);
        Ext.getCmp('fieldset-refund').setDisabled(true);
    },
    resetReason: function () {
        var me = this;
        me.getViewModel().set('refundInfo.reasonCode', null);
        me.getViewModel().set('refundInfo.isuStartDate', null);
        me.getViewModel().set('refundInfo.isuEndDate', null);
        me.getViewModel().set('refundInfo.darmanStartDate', null);
        me.getViewModel().set('refundInfo.darmanEndDate', null);
    },
    resetStores: function () {
        var refundPaymentStore = this.getStore("refundPaymentStore");
        var refundDebitStore = this.getStore("refundDebitStore");
        var refundRelationStore = this.getStore("refundRelationStore");
        var refundDetailStore = this.getStore("refundDetailStore");
        refundDebitStore.removeAll();
        refundRelationStore.removeAll();
        refundDetailStore.removeAll();
        refundPaymentStore.removeAll();
    }
});
