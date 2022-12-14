Ext.define('InsuranceTechnical.view.guardian.GuardianCreateReqController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.guardian-create-req-controller',
    init: function () {

        var me = this;
        this.getViewModel().set('guardianInfo', {
            reqNo: '',
            insuranceId: '',
            reqDate: null,
            inspDate: null,
            isuDeadDate: null,
            birthDate: null,
            guardianBirthDate: null,
            guardianBirthDate2: null,
            reasonFanni: '',
            status: '',
            brhReqType: '',
            requesterType: '',
            guardianType: '',
            requestType: '',
            techConfStatus: '',
            haveMedicalDoc: '0',
            pensionNo: '',
            nationalCode: '',
            guardianNationalCode: '',
            guardianNationalCode2: '',
            guarBirthcitycode: '',
            guarBirthcitycode2: '',
            guarExpcitycode: '',
            guarExpcitycode2: '',
            idNo: '',
            lastName: '',
            doctorName: '',
            firstName: '',
            guardianFullName: '',
            guardianFullName2: '',
            subIsuAddress: '',
            doctorCode: '',
            causeAge: '',
            techConfDate: null,
            techConfUserId: '',
            editDate: null,
            editUserId: '',
            createDate: null,
            createUserId: '',
            nationality: '1',
            guar1Nationality: '1',
            guar2Nationality: '1'
        });
        var reqSerial = null;
        var nationalId = null;
        if (window.location.toString().includes('_')) {
            reqSerial = window.location.hash.split('/').slice(-1)[0].split('_')[0];

            InsuranceTechnical.getApplication().addCache('reqSerial', reqSerial);
            nationalId = window.location.hash.split('/').slice(-1)[0].split('_')[1];

            /*if (nationalId !== "null") {
                me.onFindWithNationalCode(nationalId);
            }*/
            this.getViewModel().set('is-new-request-page', false);
            this.getViewModel().set('guardianEdite', true);
        }

        if (reqSerial !== null) {
            Ext.getBody().mask('لطفا منتظر بمانید...');

            Ext.Ajax.request({
                url: InsuranceTechnical.helper.Urls.getUrl('guardian')
                    + '/' + reqSerial,
                method: 'GET',
                success: function (response) {
                    Ext.getBody().unmask();
                    var data = Ext.JSON.decode(response.responseText).data;
                    me.getViewModel().set('guardianInfo', data);
                    me.getViewModel().set('guardianInfo.guarBirthcitycode', data.guarBirthcitycode);
                    me.getViewModel().set('guardianInfo.guarExpcitycode', data.guarExpcitycode);
                    if (data.insuranceRegisteration) {
                        me.getViewModel().set('guardianInfo.firstName', data.insuranceRegisteration.firstName);
                        me.getViewModel().set('guardianInfo.lastName', data.insuranceRegisteration.lastName);
                        me.getViewModel().set('guardianInfo.insuranceId', data.insuranceRegisteration.id);
                        me.getViewModel().set('guardianInfo.idNo', data.insuranceRegisteration.idCardNumber);
                        me.getViewModel().set('guardianInfo.birthDate', InsuranceTechnical.tamin.helpers.Persian.gregorianToPersian(new Date(data.insuranceRegisteration.doB)));
                    }
                    me.getViewModel().set('guardianInfo.branchCode', data.branchCode);
                    if (me.getViewModel().get('guardianInfo.haveMedicalDoc') === null)
                        me.getViewModel().set('guardianInfo.haveMedicalDoc', '0');

                    setTimeout(function (data) {
                        if (data.foreignCode) {
                            Ext.getCmp('insuredType').setValue('2');
                            me.getViewModel().set('guardianInfo.foreignCode', data.foreignCode);
                        } else {
                            Ext.getCmp('insuredType').setValue('1');
                            me.getViewModel().set('guardianInfo.nationalCode', data.nationalCode);
                        }
                        if (data.guardianForeignCode) {
                            Ext.getCmp('insuredTypeGuarType').setValue('2');
                        } else {
                            Ext.getCmp('insuredTypeGuarType').setValue('1');
                        }
                        if (data.guardianForeignCode2) {
                            Ext.getCmp('insuredTypeGuarType2').setValue('2');
                        } else {
                            Ext.getCmp('insuredTypeGuarType2').setValue('1');
                        }
                    }.bind(null, data), 800);

                    me.getViewModel().set('guardianInfo.guardianNationalCode', data.guardianNationalCode);
                    me.getViewModel().set('guardianInfo.guardianForeignCode', data.guardianForeignCode);
                    me.getViewModel().set('guardianInfo.guardianFullName', data.guardianFullName);
                    me.getViewModel().set('guardianInfo.guardianBirthDate', new Date(data.guardianBirthDate));
                    me.getViewModel().set('guardianInfo.guarExpCityCode', data.guarExpCityCode);
                    me.getViewModel().set('guardianInfo.guarBirthCityCode', data.guarBirthCityCode);

                    if (data.guardianNationalCode2) {
                        me.getViewModel().set('guardianInfo.guardianNationalCode2', data.guardianNationalCode2);
                        me.getViewModel().set('guardianInfo.guardianForeignCode2', data.guardianForeignCode2);
                        me.getViewModel().set('guardianInfo.guardianFullName2', data.guardianFullName2);
                        me.getViewModel().set('guardianInfo.guardianBirthDate2', new Date(data.guardianBirthDate2));
                        me.getViewModel().set('guardianInfo.guarExpCityCode2', data.guarExpCityCode2);
                        me.getViewModel().set('guardianInfo.guarBirthCityCode2', data.guarBirthCityCode2);
                    }
                },
                failure: function () {
                    Ext.getBody().unmask();
                    Ext.Msg.alert('پیام سیستم', 'خطا در برقراری ارتباط با سرور' + '<br/>');
                }
            });


        } else {
            this.getViewModel().set('is-new-request-page', true);
            // me.getViewModel().set('requesterStatusField', true);
            //  me.getViewModel().set('requesterStatus3Field', true);
        }
        this.getViewModel().get('guardianInfo');
    },
    onSaveButton: function () {
        if (this.checkDataValidation()) {
            this.saveData();
        }
    },
    // onSelectRecord: function (btn) {
    //     var me = this;
    //     var grid = Ext.getCmp('insured');
    //     var selection = grid.getSelectionModel().getSelection()[0];
    //     var data = selection.data;
    //     if (data.length !== null || data.length !== 0 || data.length !== 'undefind') {
    //         data.fullName = data.firstName + ' ' + data.lastName;
    //         me.getViewModel().set('personalData', data);
    //         InsuranceTechnical.getApplication().addCache('personalData', data);
    //         btn.up('window').close();
    //     }
    // },

    checkDataValidation: function () {
        var flagCauseAge = false;
        var form = Ext.getCmp('guardian-form-id').getForm();
        if (!form.isValid()) {
            Ext.Msg.alert('خطا', 'اطلاعات وارد شده کامل نمی باشد.');
            return false;
        }
        if (!this.getViewModel().get('isForeign')
            && (this.getViewModel().get('guardianInfo.nationalCode') === this.getViewModel().get('guardianInfo.guardianNationalCode')
                || this.getViewModel().get('guardianInfo.nationalCode') === this.getViewModel().get('guardianInfo.guardianForeignCode')
                || this.getViewModel().get('guardianInfo.nationalCode') === this.getViewModel().get('guardianInfo.guardianNationalCode2')
                || this.getViewModel().get('guardianInfo.nationalCode') === this.getViewModel().get('guardianInfo.guardianForeignCode2')
            )) {
            Ext.Msg.alert('خطا', 'کد ملی فرد مورد تکفل نمیتواند با کدملی درخواست دهنده یکی باشد');
            return false;
        } else if (this.getViewModel().get('isForeign')
            && (this.getViewModel().get('guardianInfo.foreignCode') === this.getViewModel().get('guardianInfo.guardianNationalCode')
            || this.getViewModel().get('guardianInfo.foreignCode') === this.getViewModel().get('guardianInfo.guardianForeignCode')
            || this.getViewModel().get('guardianInfo.foreignCode') === this.getViewModel().get('guardianInfo.guardianNationalCode2')
            || this.getViewModel().get('guardianInfo.foreignCode') === this.getViewModel().get('guardianInfo.guardianForeignCode2'))) {
            Ext.Msg.alert('خطا', 'شناسه خارجی فرد مورد تکفل نمیتواند با کدملی یا شناسه خارجی درخواست دهنده یکی باشد');
            return false;
        }
        if (this.getViewModel().get('guardianInfo.reqDate') > new Date()) {
            Ext.Msg.alert('خطا', 'تاریخ درخواست اشتباه است.');
            return false;
        }
        if (this.getViewModel().get('guardianInfo.birthDate') > new Date()
            || this.getViewModel().get('guardianInfo.guardianBirthDate') > new Date()) {
            Ext.Msg.alert('خطا', 'تاریخ تولد اشتباه است.');
            return false;
        }
        if (this.getViewModel().get('guardianInfo.guardianType') === '4'
            && this.getViewModel().get('guardianInfo.guardianBirthDate2') > new Date()) {
            Ext.Msg.alert('خطا', 'تاریخ تولد اشتباه است.');
            return false;
        }
        //
        // if (this.getViewModel().get('guardianInfo.insuranceId').substr(0, 2) !== '00') {
        //     Ext.Msg.alert('خطا', 'شماره بیمه موقت قابل قبول نیست.');
        //     return false;
        // }

        // if(!this.getViewModel().get('guardianInfo.brhReqType'))
        // {
        //     Ext.Msg.alert('خطا', 'وضعیت متقاضی انتخاب گردد.');
        //     return false;
        // }
        this.getViewModel().set('guardianInfo.status', '0');
        this.getViewModel().set('guardianInfo.causeAge', '1');

        if (this.getViewModel().get('guardianInfo.haveMedicalDoc') === '0') {
            //var age = this.getViewModel().get('guardianInfo.reqDate') - this.getViewModel().get('guardianInfo.guardianBirthDate');

            var date1 = new Date(this.getViewModel().get('guardianInfo.guardianBirthDate'));
            var date2 = new Date(this.getViewModel().get('guardianInfo.guardianBirthDate2'));
            var date3 = new Date(this.getViewModel().get('guardianInfo.reqDate'));
            var diffTime1 = Math.abs(date3 - date1);
            var diffTime2 = Math.abs(date3 - date2);
            var diffDays1 = Math.ceil(diffTime1 / (1000 * 60 * 60 * 24));
            var diffDays2 = Math.ceil(diffTime2 / (1000 * 60 * 60 * 24));
            var age = diffDays1;
            var age2 = diffDays2;

            switch (this.getViewModel().get('guardianInfo.guardianType')) {
                case '1':
                case '3':
                    if (age < 60 * 365) {
                        this.getViewModel().set('guardianInfo.causeAge', '0');
                        flagCauseAge = true;
                    }
                    break;
                case '2':
                    if (age < 55 * 365) {
                        this.getViewModel().set('guardianInfo.causeAge', '0');
                        flagCauseAge = true;
                    }
                    break;
                case '4':
                    if (age < 60 * 365) {
                        this.getViewModel().set('guardianInfo.causeAge', '0');
                        flagCauseAge = true;
                        break;
                    }
                    if (age2 < 55 * 365) {
                        this.getViewModel().set('guardianInfo.causeAge', '0');
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
        var record = me.getViewModel().get('guardianInfo');
        var reqSerial = InsuranceTechnical.getApplication().getCache('reqSerial');
        var jsonData = null;

        if (record.brhReqType === "1" || record.brhReqType === "2") {
            var jsonData = {
                reqNo: record.reqNo,
                //     insuranceRegisteration: {
                //         id: record.insuranceId,
                //         brchCode: record.branchCode,
                // },
                reqSerial: reqSerial,
                eRequestId: record.eRequestId,
                nationalCode: record.nationalCode,
                foreignCode: record.foreignCode,
                //status:record.status,
                reqDate: record.reqDate,
                isuDeadDate: record.isuDeadDate,
                reasonFanni: record.reasonFanni,
                brhReqType: record.brhReqType,
                requesterType: record.requesterType ? record.requesterType : '0',
                guardianType: record.guardianType,
                requestType: record.requestType,
                insuranceId: record.insuranceId,
                guardianFullName: record.guardianFullName,
                guardianForeignCode: record.guardianForeignCode,
                guardianFullName2: record.guardianFullName2,
                guardianForeignCode2: record.guardianForeignCode2,
                guardianNationalCode: record.guardianNationalCode,
                guardianNationalCode2: record.guardianNationalCode2,
                guardianBirthDate: record.guardianBirthDate,
                guardianBirthDate2: record.guardianBirthDate2,
                guarBirthCityCode: record.guarBirthCityCode,
                guarBirthCityCode2: record.guarBirthCityCode2,
                guarExpCityCode: record.guarExpCityCode,
                guarExpCityCode2: record.guarExpCityCode2,
                subIsuAddress: record.subIsuAddress,
                haveMedicalDoc: record.haveMedicalDoc,
                doctorName: record.doctorName,
                doctorCode: record.doctorCode,
                branchCode: record.branchCode,
                branchResponder: record.branchResponder,
                insuredMobile: record.insuredMobile,
                createDate: record.createDate,
                createUserId: record.createUserId,
                editDate: record.editDate,
                editUserId: record.editUserId,
                techConfDate: record.techConfDate,
                techConfUserId: record.techConfUserId,
                actionType: 'update'
            };
        } else {
            var jsonData = {
                reqNo: record.reqNo,
                //     insuranceRegisteration: {
                //         id: record.insuranceId,
                //         brchCode: record.branchCode,
                // },
                reqSerial: reqSerial,
                reqDate: new Date(record.reqDate),
                isuDeadDate: new Date(record.isuDeadDate),
                reasonFanni: record.reasonFanni,
                brhReqType: record.brhReqType,
                requesterType: record.requesterType,
                guardianType: record.guardianType,
                requestType: record.requestType,
                insuranceId: record.insuranceId,
                // lastName: record.lastName,
                // firstName: record.firstName,
                nationalCode: record.nationalCode,
                foreignCode: record.foreignCode,
                eRequestId: record.eRequestId,
                // idNo: record.idNo,
                // birthDate:new Date( record.birthDate),
                guardianFullName: record.guardianFullName,
                guardianForeignCode: record.guardianForeignCode,
                guardianFullName2: record.guardianFullName2,
                guardianForeignCode2: record.guardianForeignCode2,
                guardianNationalCode: record.guardianNationalCode,
                guardianNationalCode2: record.guardianNationalCode2,
                guardianBirthDate: record.guardianBirthDate,
                guardianBirthDate2: record.guardianBirthDate2,
                subIsuAddress: record.subIsuAddress,
                guarBirthCityCode: Ext.getCmp('guarBirthCityCode').getValue(),
                guarBirthCityCode2: Ext.getCmp('guarBirthCityCode2').getValue(),
                guarExpCityCode: Ext.getCmp('guarExpCityCode').getValue(),
                guarExpCityCode2: Ext.getCmp('guarExpCityCode2').getValue(),
                haveMedicalDoc: record.haveMedicalDoc,
                doctorName: record.doctorName,
                doctorCode: record.doctorCode,
                branchCode: record.branchCode,
                branchResponder: record.branchResponder,
                insuredMobile: record.insuredMobile,
                createDate: record.createDate,
                createUserId: record.createUserId,
                editDate: record.editDate,
                editUserId: record.editUserId,
                techConfDate: record.techConfDate,
                techConfUserId: record.techConfUserId,
                actionType: 'update'
            };
        }

        var method = me.getViewModel().get('is-new-request-page') ? "POST" : "PUT";
        var reqSerial = InsuranceTechnical.getApplication().getCache('reqSerial');
        var url = InsuranceTechnical.helper.Urls.getUrl('guardian');
        if (!me.getViewModel().get('is-new-request-page')) {
            url = url + "/" + reqSerial;
            // record.actionType = 'update';
        }
        Ext.Ajax.request({
            url: url,
            method: method,
            jsonData: jsonData,
            success: function () {
                Ext.getBody().unmask();
                Ext.Msg.alert('پیغام سیستم', 'رکورد با موفقیت ذخیره شد');
                me.redirectTo('guardian-spec', false);
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
    onCancelButton: function () {
        this.redirectTo('guardian-spec', false);
    },
    onChangeNationality: function (field, newValue) {
        var guardianEdite = this.getViewModel().get('guardianEdite');
        var isForeign = newValue === '2';
        if (guardianEdite) {
            Ext.getCmp('nationalId').setDisabled(true);
            Ext.getCmp('foreignId').setDisabled(true);
        } else if (isForeign) {
            this.resetIdentity(true);
            Ext.getCmp('nationalId').setDisabled(true);
            Ext.getCmp('foreignId').setDisabled(false);
        } else if (!isForeign) {
            this.resetIdentity(true);
            Ext.getCmp('nationalId').setDisabled(false);
            Ext.getCmp('foreignId').setDisabled(true);
        }
    },
    onChangeGuar1Nationality: function (field, newValue) {
        // this.resetGuar1Identity();
    },
    onChangeGuar2Nationality: function (field, newValue) {
        // this.resetGuar2Identity();
    },
    resetIdentity: function (resetAll) {
        if (resetAll) {
            this.getViewModel().set('guardianInfo.nationalCode', '');
        }
        this.getViewModel().set('guardianInfo.insuranceId', '');
        this.getViewModel().set('guardianInfo.pensionNo', '');
        this.getViewModel().set('guardianInfo.firstName', '');
        this.getViewModel().set('guardianInfo.lastName', '');
        this.getViewModel().set('guardianInfo.branchCode', '');
        this.getViewModel().set('guardianInfo.idNo', '');
        this.getViewModel().set('guardianInfo.birthDate', '');
        this.getViewModel().set('guardianInfo.branchCode', '');
    },
    resetGuar1Identity: function () {
        this.getViewModel().set('guardianInfo.guardianNationalCode', '');
        this.getViewModel().set('guardianInfo.guardianForeignCode', '');
        this.getViewModel().set('guardianInfo.guardianFullName', '');
        this.getViewModel().set('guardianInfo.guardianBirthDate', '');
        this.getViewModel().set('guardianInfo.guarExpCityCode', '');
        this.getViewModel().set('guardianInfo.guarBirthCityCode', '');
    },
    resetGuar2Identity: function () {
        this.getViewModel().set('guardianInfo.guardianNationalCode2', '');
        this.getViewModel().set('guardianInfo.guardianForeignCode', '');
        this.getViewModel().set('guardianInfo.guardianFullName2', '');
        this.getViewModel().set('guardianInfo.guardianBirthDate2', '');
        this.getViewModel().set('guardianInfo.guarExpCityCode2', '');
        this.getViewModel().set('guardianInfo.guarBirthCityCode2', '');
    },
    onFindWithNationalCode: function (val) {
        var me = this;
        if (this.getViewModel().get('guardianEdite')) {
            return;
        }
        var nationalCode = null;
        if (val.value !== undefined) {
            nationalCode = val.value;
        } else {
            nationalCode = val;
        }

        if (nationalCode === '') {
            return;
        }

        var isForeign = me.getViewModel().get('isForeign');
        me.resetIdentity();

        if (!isForeign) {
            if (Ext.getCmp('nationalId').isValid()) {
                var userOrganization = InsuranceTechnical.getApplication().getCache('organizationCode');
                var url = InsuranceTechnical.helper.Urls.getUrl('InsuranceData') + "?nationalCode=" + nationalCode;
                Ext.getBody().mask('لطفا منتظر بمانید...');
                Ext.Ajax.request({
                    url: url,
                    method: 'GET',
                    callback: function (options, success, response) {
                        Ext.getBody().unmask();
                        if (success) {
                            var data = JSON.parse(response.responseText).data;
                            me.getViewModel().set('guardianInfo.branchCode', data.branchCode);
                            me.getViewModel().set('guardianInfo.nationalCode', nationalCode);
                            me.getViewModel().set('guardianInfo.firstName', data.firstName);
                            me.getViewModel().set('guardianInfo.lastName', data.lastName);
                            me.getViewModel().set('guardianInfo.insuranceId', data.id);
                            me.getViewModel().set('guardianInfo.idNo', data.idNo);
                            me.getViewModel().set('guardianInfo.birthDate', InsuranceTechnical.tamin.helpers.Persian.gregorianToPersian(new Date(data.birthDate)));
                            if (data.branchCode !== 'undefined' && data.branchCode !== userOrganization) {
                                InsuranceTechnical.tamin.window.MessageBox.showInfo('پیام سیستم', 'بیمه شده ، بیمه پرداز شعبه' + data.branchCode + 'میباشد و رسیدگی به درخواست از طریق شعبه مذکور قابل انجام است');
                            }
                        } else {
                            InsuranceTechnical.tamin.window.MessageBox.showError('خطا', JSON.parse(response.responseText).data.message);
                        }
                    }
                });
            }
        } else {
            if (this.getViewModel().get('foreignTimeout')) {
                clearTimeout(this.getViewModel().get('foreignTimeout'));
            }
            this.getViewModel().set('foreignTimeout', setTimeout(function (foreignCode) {
                var url = InsuranceTechnical.helper.Urls.getUrl('ForeignInsuranceRegisteration') + "?foreignCode=" + foreignCode;
                Ext.getBody().mask('لطفا منتظر بمانید...');
                Ext.Ajax.request({
                    url: url,
                    method: 'GET',
                    callback: function (options, success, response) {
                        Ext.getBody().unmask();
                        if (success) {
                            var data = JSON.parse(response.responseText).data;
                            me.getViewModel().set('guardianInfo.branchCode', data.branchCode);
                            me.getViewModel().set('guardianInfo.foreignCode', foreignCode);
                            me.getViewModel().set('guardianInfo.firstName', data.firstName);
                            me.getViewModel().set('guardianInfo.lastName', data.lastName);
                            me.getViewModel().set('guardianInfo.insuranceId', data.id);
                            me.getViewModel().set('guardianInfo.idNo', data.idNo);
                            me.getViewModel().set('guardianInfo.birthDate', InsuranceTechnical.tamin.helpers.Persian.gregorianToPersian(new Date(data.birthDate)));
                            if (data.branchCode !== 'undefined' && data.branchCode !== userOrganization) {
                                InsuranceTechnical.tamin.window.MessageBox.showInfo('پیام سیستم', 'بیمه شده ، بیمه پرداز شعبه' + data.branchCode + 'میباشد و رسیدگی به درخواست از طریق شعبه مذکور قابل انجام است');
                            }
                        } else {
                            InsuranceTechnical.tamin.window.MessageBox.showError('خطا', JSON.parse(response.responseText).data.message);
                        }
                    }
                });
            }.bind(null, nationalCode), 1000));
        }
    }
});
