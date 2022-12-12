Ext.define('InsuranceTechnical.view.insAgreement.InsuranceAgreementNewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.insAgreement-new-controller',
    init: function () {
        var me = this;
        var requestId = window.location.hash.split('/').slice(-1)[0];
        var orgCode = InsuranceTechnical.getApplication().getCache('organizationCode');
        me.getViewModel().set('headerSpec', {});
        me.getViewModel().set('personInfo', {});
        me.getViewModel().set('workshopData', {});
        me.getViewModel().set('agreeSpec', {});
        me.getViewModel().set('agreeDetailSpec', {});
        me.getViewModel().set('noMoreFields', true);
        me.getViewModel().set('needMedical', false);
        me.getViewModel().set('lockEdit', false);
        me.getViewModel().set('editMode', false);
        me.getViewModel().set('hasIntroduction', false);
        me.getViewModel().set('hasLetter', false);
        me.getViewModel().set('hasWage', false);
        me.getViewModel().set('disableForm', true);
        me.getViewModel().set('isSenfi', false);
        me.getViewModel().set('brchCode', orgCode);
        me.getViewModel().set('setadi', orgCode === '0000');

        var insuranceAgreementSpecStore = me.getStore('insuranceAgreementSpecStore');
        var insuranceAgreementCatStore = me.getStore('insuranceAgreementCatStore');
        var insuranceAgreementTypeStore = me.getStore('insuranceAgreementTypeStore');
        insuranceAgreementCatStore.load({
            callback: function (record, operation, success) {
                if (success) {
                    insuranceAgreementTypeStore.load({
                        callback: function (record, operation, success) {
                            if (!success) {
                                InsuranceTechnical.tamin.window.Window.retry(3);
                            }
                            insuranceAgreementSpecStore.load({
                                callback: function (record, operation, success) {
                                    if (!success) {
                                        InsuranceTechnical.tamin.window.Window.retry(3);
                                    }
                                }
                            });
                        }
                    });
                } else {
                    InsuranceTechnical.tamin.window.Window.retry(3);
                }
            }
        });

        if (!isNaN(requestId)) {
            var url = InsuranceTechnical.helper.Urls.getUrl('insuranceAgreementRequest')
                + '/' + requestId;
            Ext.getBody().mask('لطفا منتظر بمانید...');
            Ext.Ajax.request({
                url: url,
                method: 'GET',
                success: function (response) {
                    var object = JSON.parse(response.responseText);
                    var data = object.data;
                    var detailDataList = data.insuranceAgreementRequestDetailList;
                    me.getViewModel().set('editMode', true);
                    if (orgCode !== data.branch.branchCode && data.status === 'N') {
                        me.getViewModel().set('lockEdit', true);
                    } else {
                        me.getViewModel().set('lockEdit', false);
                    }

                    if (data.status !== '0') {
                        me.getViewModel().set('lockEdit', true);
                    }

                    data.person.isuType = data.insuranceType;
                    data.person.isuStat = data.insuranceStatus;
                    data.ageDay = data.ageDay < 10 ? '0' + data.ageDay : data.ageDay.toString();
                    data.ageMonth = data.ageMonth < 10 ? '0' + data.ageMonth : data.ageMonth;
                    if (data.ageDay && data.ageMonth && data.ageYear) {
                        data.person.ageDays = data.ageDay + data.ageMonth + data.ageYear;
                    }

                    me.getViewModel().set('agreeSpec', data);
                    me.getViewModel().set('personInfo', data.person);
                    me.getViewModel().set('workshopData', data.workshop);
                    if (data.agreementCategoryType) {
                        me.getViewModel().set('agreeSpec.specialGroupType', data.agreementCategoryType.agreementCategoryId);
                    } else if (data.specialGroupType) {
                        me.getViewModel().set('agreeSpec.specialGroupType', data.specialGroupType.specialGroupCode);
                    }
                    me.getViewModel().set('headerSpec', {
                        requestNumber: data.requestNumber,
                        requestDate: data.requestDate ?
                            InsuranceTechnical.tamin.helpers.Persian.gregorianToPersian(new Date(data.requestDate)) : '',
                        introductionLetterNumber: data.introductionLetterNumber,
                        introductionLetterDate: data.introductionLetterDate ?
                            InsuranceTechnical.tamin.helpers.Persian.gregorianToPersian(new Date(data.introductionLetterDate)) : ''
                    });

                    detailDataList.forEach(function (detailData, index, arr) {
                        me.getViewModel().set('agreeDetailSpec', detailData);
                        me.getViewModel().set('agreeDetailSpec.documentDate1', detailData.documentDate1 ?
                            /*InsuranceTechnical.tamin.helpers.Persian.gregorianToPersian(*/new Date(detailData.documentDate1) : '');
                        me.getViewModel().set('agreeDetailSpec.documentDate2', detailData.documentDate2 ?
                            /*InsuranceTechnical.tamin.helpers.Persian.gregorianToPersian(*/new Date(detailData.documentDate2) : '');
                        me.getViewModel().set('agreeDetailSpec.documentDate3', detailData.documentDate3 ?
                            /*InsuranceTechnical.tamin.helpers.Persian.gregorianToPersian(*/new Date(detailData.documentDate3) : '');
                        me.getViewModel().set('agreeDetailSpec.documentDate4', detailData.documentDate4 ?
                            /*InsuranceTechnical.tamin.helpers.Persian.gregorianToPersian(*/new Date(detailData.documentDate4) : '');
                        me.getViewModel().set('agreeDetailSpec.documentDate5', detailData.documentDate5 ?
                            /*InsuranceTechnical.tamin.helpers.Persian.gregorianToPersian(*/new Date(detailData.documentDate5) : '');
                        me.getViewModel().set('agreeDetailSpec.documentStartDate', detailData.documentStartDate ?
                            /*InsuranceTechnical.tamin.helpers.Persian.gregorianToPersian(*/new Date(detailData.documentStartDate) : '');
                        me.getViewModel().set('agreeDetailSpec.documentEndDate', detailData.documentEndDate ?
                            /*InsuranceTechnical.tamin.helpers.Persian.gregorianToPersian(*/new Date(detailData.documentEndDate) : '');
                        me.getViewModel().set('agreeDetailSpec.documentStartDate1', detailData.documentStartDate1 ?
                            /*InsuranceTechnical.tamin.helpers.Persian.gregorianToPersian(*/new Date(detailData.documentStartDate1) : '');
                        me.getViewModel().set('agreeDetailSpec.documentEndDate1', detailData.documentEndDate1 ?
                            /*InsuranceTechnical.tamin.helpers.Persian.gregorianToPersian(*/new Date(detailData.documentEndDate1) : '');

                        if (data.categoryType.categoryTypeCode === '3' && data.specialGroupType === '04') {
                            me.populateDriverCardGrid(detailData);
                        }
                    });
                    if (data.categoryType.categoryTypeCode === '3' && data.specialGroupType === '18') {
                        me.getViewModel().set('isSenfi', true);
                    }
                },
                failure: function () {
                    Ext.getBody().unmask();
                    Ext.Msg.alert('پیام سیستم', 'دریافت اطلاعات درخواست مورد نظر با خطا مواجه شد .');
                    me.getViewModel().set('lockEdit', true);
                }
            });
        }
    },
    showInsurancePopup: function (combo) {
        var me = this;
        var introductionLetterDate;
        var orgCode = InsuranceTechnical.getApplication().getCache('organizationCode');
        var container = me.getView();
        if (me.getViewModel().get('hasIntroduction') && !me.getViewModel().get('headerSpec.introductionLetterDate')) {
            InsuranceTechnical.tamin.window.MessageBox.showError('خطا', 'لطفا ابتدا تاریخ معرفی نامه را انتخاب نمایید.');
            return false;
        }
        if (me.getViewModel().get('isSenfi') && !me.getViewModel().get('headerSpec.requestDate')) {
            InsuranceTechnical.tamin.window.MessageBox.showError('خطا', 'لطفا ابتدا تاریخ درخواست را انتخاب نمایید.');
            return false;
        }
        var win = container.lookupReference('InsuredPersonPopup');
        if (!win) {
            win = Ext.create('InsuranceTechnical.view.main.InsuredPersonPopup');
            container.add(win);
            introductionLetterDate = me.getViewModel().get('headerSpec.introductionLetterDate');
            if (introductionLetterDate) {
                me.getStore('insuranceRegisterations').addFilter({
                    property: 'introductionLetterDate',
                    value: InsuranceTechnical.tamin.helpers.Persian.gregorianToPersian(new Date(introductionLetterDate)).split('/').join(''),
                    operator: 'EQUAL'
                });
            }
        }
        win.setCallback(function () {
            if (win.selectedItem !== null) {
                var person = win.selectedItem.data;
                me.getViewModel().set('tempPersonInfo', person);
                me.resetPersonInfo()
                combo.setValue(person.id);
            }
        });
        me.getViewModel().set('brchCode', orgCode);
        win.show();
    },
    showWorkshopPopup: function (combo) {
        var me = this;
        var container = me.getView();
        var insuredBrchCode = container.getViewModel().get('personInfo.brchCode');
        if (!insuredBrchCode || insuredBrchCode === '') {
            Ext.Msg.alert('پیام سیستم', 'ابتدا اطلاعات بیمه شده را وارد نمایید.');
            return;
        }
        var win = container.lookupReference('WorkshopPopup');
        if (!win) {
            win = Ext.create('InsuranceTechnical.view.insAgreement.WorkshopPopup');
            me.resetWorkshopData();
            container.add(win);
        }
        win.setCallback(function () {
            if (win.selectedItem !== null) {
                combo.setValue(win.selectedItem.data.workshopId);
            }
        });
        win.show();
    },
    populatePersonInfo: function (person) {
        var me = this;
        var ageFieldset = Ext.getCmp('ageFildset');
        if (person.gender == '01') {
            person.gender = 'مرد';
            person.noMilitary = false;
        } else {
            person.gender = 'زن';
            person.noMilitary = true;
        }

        if (me.getViewModel().get('headerSpec.introductionLetterDate')) {
            ageFieldset.setTitle('سن در تاریخ ثبت معرفی نامه');
        } else {
            ageFieldset.setTitle('سن در تاریخ روز');
        }
        if (!me.getViewModel().get('editMode')) {
            if (person.ageDays) {
                person.ageYear = person.ageDays.substr(0, 2);
                person.ageMonth = person.ageDays.substr(2, 2);
                person.ageDay = person.ageDays.substr(4, 2);
                person.moreThan18 = person.ageYear > 18;
            } else {
                person.ageYear = '-';
                person.ageMonth = '-';
                person.ageDay = '-';
            }
        } else {
            person.ageYear = me.getViewModel().get('agreeSpec.ageYear');
            person.ageMonth = me.getViewModel().get('agreeSpec.ageMonth');
            person.ageDay = me.getViewModel().get('agreeSpec.ageDay');
            person.moreThan18 = person.ageYear > 18;

            me.getViewModel().set('personInfo.historyDays', me.getViewModel().get('agreeSpec.historyDay') ? me.getViewModel().get('agreeSpec.historyDay') : 0);
        }

        me.getViewModel().set('personInfo', person);
        me.getViewModel().set('tempPersonInfo', null);

        Ext.getBody().mask('لطفا منتظر بمانید...');
        if (me.getViewModel().get('isSenfi')) {
            me.checkProvince(person.brchCode).then(code => {
                if (!me.getViewModel().get('editMode')) {
                    me.needMedicalTest(person.id, person.nationalId, me.getViewModel().get('headerSpec.requestDate')).then(code => {
                        Ext.getBody().unmask();
                    });
                } else {
                    if (me.getViewModel().get('agreeSpec.insuranceAgreementRequestDetailList').length > 0) {
                        me.getViewModel().set('noMoreFields', false);
                        me.getViewModel().set('needMedical', true);
                    }
                }
            }).catch(error => {
                InsuranceTechnical.tamin.window.MessageBox.showError('خطا', 'خطا در دریافت اطلاعات!');
                Ext.getBody().unmask();
            });
        } else {
            Ext.getBody().unmask();
        }
    },
    populateHistory: function (insuranceId, nationalCode) {
        var me = this;
        var headerSpec = me.getViewModel().get('headerSpec');
        var personInfo = me.getViewModel().get('personInfo');
        var workshopData = me.getViewModel().get('workshopData');
        var url;
        var urlParams = InsuranceTechnical.tamin.helpers.Persian.createUrlParams({
            insuranceId: personInfo.id,
            nationalCode: personInfo.nationalId
        });
        if (me.getViewModel().get('isSenfi')) {
            url = InsuranceTechnical.helper.Urls.getUrl('historyDaysSenfi') + urlParams;
        } else {
            url = InsuranceTechnical.helper.Urls.getUrl('historyDays') + urlParams;
        }
        return new Promise((resolve, reject) => {
            Ext.Ajax.request({
                url: url,
                method: 'GET',
                callback: function (options, success, response) {
                    if (success) {
                        var data = JSON.parse(response.responseText).data;
                        me.getViewModel().set('personInfo.historyDays', data ? data : 0);
                        if (me.getViewModel().get('isSenfi') && Number(data) >= (365 * 10)) {
                            me.getViewModel().set('lockWage', true);
                            if (!me.getViewModel().get('editMode')) {
                                urlParams = InsuranceTechnical.tamin.helpers.Persian.createUrlParams({
                                    introductionLetterDate: headerSpec.introductionLetterDate
                                        ? InsuranceTechnical.tamin.helpers.Persian.gregorianToPersian(headerSpec.introductionLetterDate).split("/").join("") : null,
                                    insuranceId: personInfo.id,
                                    nationalCode: personInfo.nationalId,
                                    branchCode: personInfo.brchCode,
                                    workshopId: workshopData.workshopId,
                                    requestDate: headerSpec.requestDate
                                        ? InsuranceTechnical.tamin.helpers.Persian.gregorianToPersian(headerSpec.requestDate).split("/").join("") : null
                                });
                                url = InsuranceTechnical.helper.Urls.getUrl('senfiWage') + urlParams;
                                Ext.Ajax.request({
                                    url: url,
                                    method: 'GET',
                                    callback: function (options, success, response) {
                                        if (success) {
                                            var wage = JSON.parse(response.responseText).data;
                                            me.getViewModel().set('agreeSpec.wage', wage);
                                            resolve(true);
                                        } else {
                                            reject();
                                        }
                                    }
                                });
                            } else {
                                resolve(true);
                            }
                        } else {
                            me.getViewModel().set('lockWage', false);
                        }
                        resolve(true);
                    } else {
                        reject();
                    }
                }
            });
        });
    },
    findInsuranceId: function (field, newValue) {
        var me = this;
        var value = newValue.toString();
        if (value.length < 10 && value.length !== 0) {
            me.resetPersonInfo();
            me.getViewModel().set('personInfo.id', value);
        } else {
            var tempPersonInfo = me.getViewModel().get('tempPersonInfo');
            if (tempPersonInfo || me.getViewModel().get('editMode')) {
                if (me.getViewModel().get('editMode')) {
                    return me.populatePersonInfo(me.getViewModel().get('personInfo'));
                }
                me.populatePersonInfo(tempPersonInfo);
            }
        }
    },
    onEnterOnWorkshopId: function (field, e) {
        if (e.getKey() === e.ENTER) {
            this.findWorkshopID(field, field.getValue());
        }
    },
    findWorkshopID: function (field, newValue) {
        var me = this;
        var branchCode;
        if (newValue === null) {
            return;
        }
        var workshopId = newValue.toString();
        if (workshopId.length === 10) {
            if (me.getViewModel().get('workshopData')) {
                branchCode = me.getViewModel().get('workshopData').branchCode;
            } else {
                Ext.getCmp('workshopID').reset();
                Ext.Msg.alert('پیام سیستم', 'لطفا روی علامت جستجو کلیک کرده و شرکت مورد نظر را جستجو و انتخاب نمایید');
                return;
            }

            var store = this.getViewModel().getStore('workshop');
            var filters = [{
                property: 'workshopId',
                value: workshopId,
                operator: 'EQUAL'
            },
            {
                property: 'branchCode',
                value: branchCode,
                operator: 'EQUAL'
            }];
            store.clearFilter(true);
            store.addFilter(filters, true);
            Ext.getBody().mask('لطفا منتظر بمانید...');
            store.load({
                callback: function (record, operation, success) {
                    Ext.getBody().unmask();
                    if (success) {
                        if (record.length !== 0) {
                            me.getViewModel().set('workshopData', record[0].getData());
                        } else {
                            me.resetWorkshopData();
                            Ext.Msg.alert('پیام سیستم', 'اطلاعات مورد نظر یافت نشد.');
                        }
                        me.populateHistory().catch(error => {
                            InsuranceTechnical.tamin.window.MessageBox.showError('خطا', 'خطا در دریافت دستمزد!');
                        });
                    } else {
                        me.resetWorkshopData();
                        Ext.Msg.alert('پیام سیستم', 'خطا در برقراری ارتباط با سرور' + '<br/>' + record ? record.responseText : '');
                    }
                }
            });
        }
    },
    onSelectRecordWorkshop: function (btn) {
        var me = this;
        var grid = Ext.getCmp('workshop');
        var selection = grid.getSelectionModel().getSelection()[0];
        var data = selection.data;
        if (data.length !== null || data.length !== 0 || data.length !== 'undefind') {
            data.fullName = data.firstName + ' ' + data.lastName;
            me.getViewModel().set('workshopData', data);
            btn.up('window').close();
        }
    },
    onCatChange: function (combo, newValue) {
        var me = this;
        if (!me.getViewModel().get('editMode')) {
            me.resetAgreement();
        }
        var agreementCategoryTypeStore = this.getViewModel().getStore('agreementCategoryTypeStore');
        var specialGroupTypeStore = this.getViewModel().getStore('specialGroupTypeStore');
        var groupTypeCombo = Ext.getCmp('insuranceGroupCombo');
        var fieldSet = Ext.getCmp('agreeSpecFieldset');
        groupTypeCombo.setDisabled(false);
        me.getViewModel().set('hasIntroduction', false);
        me.getViewModel().set('hasLetter', false);
        agreementCategoryTypeStore.removeAll();
        specialGroupTypeStore.removeAll();
        groupTypeCombo.reset();
        switch (newValue) {
            case '2':
                // groupTypeCombo.setDisabled(me.getViewModel().get('editMode'));
                groupTypeCombo.bindStore(agreementCategoryTypeStore);
                groupTypeCombo.un("change", this.onGroupTypeChange, this);
                groupTypeCombo.on("change", this.onAgreementGroupChange, this);
                fieldSet.removeAll();
                if (me.getViewModel().get('editMode')) {
                    agreementCategoryTypeStore.clearFilter(true);
                    agreementCategoryTypeStore.addFilter([{
                        property: 'agreementCategoryId',
                        value: me.getViewModel().get('agreeSpec.specialGroupType'),
                        operator: 'EQUAL'
                    }], true);
                }
                Ext.getBody().mask('لطفا منتظر بمانید...');
                agreementCategoryTypeStore.load({
                    callback: function caller(record, operation, success) {
                        if (success) {
                            try {
                                var item = record.find(function (item) {
                                    return item.data.agreementCategoryId === me.getViewModel().get('agreeSpec.specialGroupType');
                                });
                                if (item !== null && item !== undefined) {
                                    Ext.getCmp('insuranceGroupCombo').setSelection(item);
                                }
                            } catch (e) {
                                Ext.Msg.alert('پیام سیستم', 'دریافت اطلاعات درخواست مورد نظر با خطا مواجه شد.');
                            }
                        }
                        Ext.getBody().unmask();
                    }
                });
                break;
            case '3':
                // groupTypeCombo.setDisabled(me.getViewModel().get('editMode'));
                groupTypeCombo.bindStore(specialGroupTypeStore);
                groupTypeCombo.un("change", this.onAgreementGroupChange, this);
                groupTypeCombo.on("change", this.onGroupTypeChange, this);
                fieldSet.removeAll();
                if (me.getViewModel().get('editMode')) {
                    specialGroupTypeStore.clearFilter(true);
                    specialGroupTypeStore.addFilter([{
                        property: 'specialGroupCode',
                        value: me.getViewModel().get('agreeSpec.specialGroupType'),
                        operator: 'EQUAL'
                    }], true);
                }

                Ext.getBody().mask('لطفا منتظر بمانید...');
                specialGroupTypeStore.load({
                    callback: function caller(record, operation, success) {
                        if (success) {
                            try {
                                var item = record.find(function (item) {
                                    return item.data.specialGroupCode === me.getViewModel().get('agreeSpec.specialGroupType');
                                });
                                if (item !== null && item !== undefined) {
                                    Ext.getCmp('insuranceGroupCombo').setSelection(item);
                                }
                            } catch (e) {
                                Ext.Msg.alert('پیام سیستم', 'دریافت اطلاعات درخواست مورد نظر با خطا مواجه شد.');
                            }
                        }
                        Ext.getBody().unmask();
                    }
                });
                break;
            default:
                groupTypeCombo.setDisabled(true);
        }
    },
    onGroupTypeChange: function (combo, newValue) {
        var me = this;
        if (!newValue) {
            return;
        }
        if (!me.getViewModel().get('editMode')) {
            me.resetAgreement();
        }
        var fields;
        var selectedVal = combo.getSelectedRecord().data;
        var specialGroupTypeStore = this.getViewModel().getStore('specialGroupTypeStore');
        var fieldlSet = Ext.getCmp('agreeSpecFieldset');
        me.getViewModel().set('hasIntroduction', selectedVal.introductionInfo === '1');
        me.getViewModel().set('hasLetter', selectedVal.requestInfo === '1');
        me.getViewModel().set('hasWage', selectedVal.wageInfo === '1');
        me.getViewModel().set('agreeSpec.activityCode', selectedVal.activityCode);
        me.getViewModel().set('agreeSpec.subCode', selectedVal.subCode);
        me.getViewModel().set('disableForm', false);
        specialGroupTypeStore.clearFilter(true);
        fieldlSet.removeAll();
        switch (newValue) {
            case '02':
                fields = Ext.create('InsuranceTechnical.view.insAgreement.forms.SpecialGroup02');
                break;
            case '03':
                fields = Ext.create('InsuranceTechnical.view.insAgreement.forms.SpecialGroup03');
                break;
            case '04':
                fields = Ext.create('InsuranceTechnical.view.insAgreement.forms.SpecialGroup04');
                Ext.getCmp('driverCard-grid').bindStore(me.getStore("localDriverCardStore"));
                break;
            case '06':
                fields = Ext.create('InsuranceTechnical.view.insAgreement.forms.SpecialGroup06');
                break;
            case '07':
                fields = Ext.create('InsuranceTechnical.view.insAgreement.forms.SpecialGroup07');
                break;
            case '08':
                fields = Ext.create('InsuranceTechnical.view.insAgreement.forms.SpecialGroup08');
                break;
            case '09':
                fields = Ext.create('InsuranceTechnical.view.insAgreement.forms.SpecialGroup09');
                break;
            case '10':
                fields = Ext.create('InsuranceTechnical.view.insAgreement.forms.SpecialGroup10');
                break;
            case '12':
                fields = Ext.create('InsuranceTechnical.view.insAgreement.forms.SpecialGroup12');
                break;
            case '13':
                fields = Ext.create('InsuranceTechnical.view.insAgreement.forms.SpecialGroup13');
                break;
            case '14':
                fields = Ext.create('InsuranceTechnical.view.insAgreement.forms.SpecialGroup14');
                break;
            case '15':
                fields = Ext.create('InsuranceTechnical.view.insAgreement.forms.SpecialGroup15');
                break;
            case '17':
                fields = Ext.create('InsuranceTechnical.view.insAgreement.forms.SpecialGroup17');
                break;
            case '18':
                me.getViewModel().set('isSenfi', true);
                fields = Ext.create('InsuranceTechnical.view.insAgreement.forms.SpecialGroup18');
                break;
            case '19':
                fields = Ext.create('InsuranceTechnical.view.insAgreement.forms.SpecialGroup19');
                break;
            default:
                me.getViewModel().set('noMoreFields', true);
                return
        }
        if (!me.getViewModel().get('isSenfi')) {
            me.getViewModel().set('noMoreFields', false);
            Ext.getCmp('requestId').labelEl.update('<span class="x-form-item-label-inner x-form-item-label-inner-default" style="margin-right: 12px; width:130px">شماره درخواست</span>');
            Ext.getCmp('requestDate').labelEl.update('<span class="x-form-item-label-inner x-form-item-label-inner-default" style="margin-right: 12px; width:130px">تاریخ درخواست</span>');
        } else {
            Ext.getCmp('requestId').labelEl.update('<span class="x-form-item-label-inner x-form-item-label-inner-default" style="margin-right: 12px; width:130px">شماره قرارداد</span>');
            Ext.getCmp('requestDate').labelEl.update('<span class="x-form-item-label-inner x-form-item-label-inner-default" style="margin-right: 12px; width:130px">تاریخ قرارداد</span>');
        }
        fieldlSet.add(fields);
    },
    onAgreementGroupChange: function (combo, newValue) {
        var me = this;
        if (!newValue) {
            return;
        }
        if (!me.getViewModel().get('editMode')) {
            me.resetAgreement();
        }
        var agreementCategoryTypeStore = this.getViewModel().getStore('agreementCategoryTypeStore');
        var fieldSet = Ext.getCmp('agreeSpecFieldset');
        me.getViewModel().set('hasIntroduction', true);
        me.getViewModel().set('hasLetter', false);
        me.getViewModel().set('hasWage', true);
        me.getViewModel().set('agreeSpec.activityCode', combo.getSelectedRecord().data.activityCode);
        me.getViewModel().set('disableForm', false);
        agreementCategoryTypeStore.clearFilter(true);
        /*if (combo.getSelectedRecord().data.activityCode && !me.getViewModel().get('editMode')) {
            agreementCategoryTypeStore.addFilter({
                property: 'activityCode',
                value: combo.getSelectedRecord().data.activityCode,
                operator: 'EQUAL'
            });
        }*/
        fieldSet.removeAll();
        var fields = Ext.create('InsuranceTechnical.view.insAgreement.forms.AgreementGroupForm');
        me.getViewModel().set('noMoreFields', false);
        fieldSet.add(fields);
    },
    checkProvince: function(branchCode, callBack) {
        var urlParams = InsuranceTechnical.tamin.helpers.Persian.createUrlParams({
            branchCode: branchCode
        });
        var url = InsuranceTechnical.helper.Urls.getUrl('getProvince') + urlParams;
        return new Promise((resolve, reject) => {
            Ext.Ajax.request({
                url: url,
                method: 'GET',
                callback: function (options, success, response) {
                    if (success) {
                        var code = JSON.parse(response.responseText).data;
                        if (code && code === '8600') {
                            Ext.getCmp('selfIsuType').setStore({
                                fields: ['name', 'value'],
                                data: [
                                    {name: 'کارفرمایان صنفی', value: '30'},
                                    /*{name: 'کارفرمایان صنفی کم درآمد', value: '31'},*/
                                    {name: 'کارفرمایان صنفی کارگاههای کشاورزی', value: '32'}
                                ]
                            });
                        } else {
                            Ext.getCmp('selfIsuType').setStore({
                                fields: ['name', 'value'],
                                data: [
                                    {name: 'کارفرمایان صنفی', value: '30'},
                                    /*{name: 'کارفرمایان صنفی کم درآمد', value: '31'},*/
                                ]
                            });
                        }
                        resolve(code);
                    } else {
                        reject(response);
                    }
                }
            });
        });
    },
    needMedicalTest: function (insuranceId, nationalCode, requestDate) {
        var me = this;
        var urlParams = InsuranceTechnical.tamin.helpers.Persian.createUrlParams({
            insuranceId: insuranceId,
            nationalCode: nationalCode,
            requestDate: InsuranceTechnical.tamin.helpers.Persian.gregorianToPersian(requestDate).split("/").join("")
        });
        var url = InsuranceTechnical.helper.Urls.getUrl('checkMedicalTest') + urlParams;
        return new Promise((resolve, reject) => {
            Ext.Ajax.request({
                url: url,
                method: 'GET',
                callback: function (options, success, response) {
                    if (success) {
                        var status = JSON.parse(response.responseText).data;
                        if (status === "0") {
                            me.getViewModel().set('needMedical', true);
                            me.getViewModel().set('noMoreFields', false);
                        } else {
                            me.getViewModel().set('needMedical', false);
                            me.getViewModel().set('noMoreFields', true);
                            Ext.getCmp('agreeSpecFieldset').removeAll();
                        }
                        resolve(status)
                    } else {
                        reject(response);
                    }
                }
            });
        });
    },
    onDriverTypeChange: function (combo, newValue) {
        // this.getViewModel().set('agreeDetailSpec', {});
    },
    onAddDriverCardButton: function () {
        var me = this;
        var form = Ext.getCmp('driver-card-form').getForm();
        if (!form.isValid()) {
            Ext.Msg.alert('خطا', 'اطلاعات وارد شده کامل نمی باشد.');
            return false;
        }
        var driverCardSpec = me.getViewModel().get('driverCardSpec');
        var driverCardStore = me.getStore("localDriverCardStore");

        var isSameNumber = false;
        var isInSameBoundary = false;
        if (driverCardStore.getRawRecords().some(function (item) {
            isSameNumber = (driverCardSpec.documentNumber2 === item.documentNumber2);
            isInSameBoundary = ((item.documentStartDate <= driverCardSpec.documentStartDate && item.documentEndDate >= driverCardSpec.documentStartDate)
                || (item.documentStartDate <= driverCardSpec.documentEndDate && item.documentEndDate >= driverCardSpec.documentEndDate)
                || (item.documentStartDate > driverCardSpec.documentStartDate && item.documentEndDate < driverCardSpec.documentEndDate));
            return (isSameNumber || isInSameBoundary);
        })) {
            if (isSameNumber) {
                Ext.Msg.alert('خطا', 'دفترچه ای با این شماره ثبت شده است!');
                return false;
            } else if (isInSameBoundary) {
                Ext.Msg.alert('خطا', 'در بازه تاریخی انتخابی دفترچه ای ثبت گردیده است!');
                return false;
            }
        }

        me.populateDriverCardGrid(driverCardSpec);
    },
    populateDriverCardGrid: function (item) {
        var me = this;
        var driverCardStore = me.getStore("localDriverCardStore");

        if (item.rowSeq === undefined) {
            item.rowSeq = driverCardStore.getCount() + 1;
            driverCardStore.add(item);
        } else {
            driverCardStore.removeAt(driverCardStore.find('rowSeq', item.rowSeq));
            driverCardStore.add(item);
        }
        if (Ext.getCmp('driver-card-form')) {
            Ext.getCmp('driver-card-form').reset();
        }
        me.getViewModel().set('driverCardSpec', {});
    },
    changeJobDate: function (field, newValue) {
        var me = this;
        var startDate = field.name === 'documentStartDate' ? newValue : me.getViewModel().get('agreeDetailSpec.documentStartDate');
        var endDate = field.name === 'documentEndDate' ? newValue : me.getViewModel().get('agreeDetailSpec.documentEndDate');
        if (!startDate || !endDate) {
            me.getViewModel().set('agreeDetailSpec.type4', 0);
            return;
        }
        startDate = InsuranceTechnical.tamin.helpers.Persian.gregorianToPersian(startDate).split("/").join("");
        endDate = InsuranceTechnical.tamin.helpers.Persian.gregorianToPersian(endDate).split("/").join("");
        var urlParams = InsuranceTechnical.tamin.helpers.Persian.createUrlParams({
            firstDate: startDate,
            secondDate: endDate
        });
        var url = InsuranceTechnical.helper.Urls.getUrl('calculateDaysBetween') + urlParams;
        Ext.getBody().mask('لطفا منتظر بمانید...');
        Ext.Ajax.request({
            url: url,
            method: 'GET',
            callback: function (options, success, response) {
                if (success) {
                    var data = JSON.parse(response.responseText).data;
                    me.getViewModel().set('agreeDetailSpec.type4', data.days ? data.days : 0);
                    Ext.getBody().unmask();
                } else {
                    field.reset();
                    InsuranceTechnical.tamin.window.MessageBox.showError('خطا', 'خطا در دریافت اطلاعات!');
                    Ext.getBody().unmask();
                }
            }
        });
    },
    onCancelButton: function () {
        this.redirectTo('insurance-agreement-spec');
    },
    onSaveButton: function () {
        var me = this;
        var form = Ext.getCmp('insAgreement-new-main-form').getForm();
        var driverCardForm = Ext.getCmp('driver-card-form');
        var categoryTypeValue = Ext.getCmp('categoryTypeCombo').getValue();
        var insuranceGroupValue = Ext.getCmp('insuranceGroupCombo').getValue();

        if (driverCardForm) {
            Ext.getCmp('driver-card-form').setDisabled(true);
        }
        if (!form.isValid()) {
            Ext.Msg.alert('خطا', 'اطلاعات وارد شده کامل نمی باشد.');
            if (driverCardForm) {
                Ext.getCmp('driver-card-form').setDisabled(true);
            }
            return;
        }
        if (Ext.getCmp('categoryTypeCombo').getValue() === '2'
            && Ext.getCmp('insuranceGroupCombo').getValue() === '04') {
            Ext.getCmp('driver-card-form').setDisabled(false);
        }
        if (driverCardForm) {
            Ext.getCmp('driver-card-form').setDisabled(false);
        }


        var driverCardStore = me.getStore("localDriverCardStore");
        var headerSpec = this.getViewModel().get('headerSpec');
        var personInfo = this.getViewModel().get('personInfo');
        var workshopData = this.getViewModel().get('workshopData');
        var agreeSpec = this.getViewModel().get('agreeSpec');
        var agreeDetailSpec = this.getViewModel().get('agreeDetailSpec');

        var jsonData = {
            requestNumber: headerSpec.requestNumber,
            introductionLetterNumber: headerSpec.introductionLetterNumber,
            nationalCode: personInfo.nationalId,
            insuranceId: personInfo.id,
            wage: agreeSpec.wage,
            categoryType: {
                categoryTypeCode: agreeSpec.categoryType.categoryTypeCode
            },
            branch: {
                branchCode: personInfo.brchCode
            },
            workshop: {
                workshopId: workshopData.workshopId,
                branchCode: workshopData.branchCode,
                activity: {
                    activityCode: agreeSpec.activityCode
                }
            },
            person: {
                id: personInfo.id,
                brchCode: personInfo.brchCode
            },
            insuranceType: {
                insuranceTypeCode: personInfo.isuType.insuranceTypeCode
            },
            insuranceStatus: {
                insuranceStatCode: personInfo.isuStat.insuranceStatCode
            },
            ageDay: personInfo.ageDay,
            ageMonth: personInfo.ageMonth,
            ageYear: personInfo.ageYear,
            historyDay: personInfo.historyDays,
            status: agreeSpec.status,
            selfIsuTypeCode: agreeSpec.selfIsuTypeCode,
            insuranceRate: agreeSpec.insuranceRate
        };
        if (categoryTypeValue === '3' && insuranceGroupValue === '04') {
            if (driverCardStore.getCount() === 0) {
                jsonData.insuranceAgreementRequestDetailList = [{
                    type3: agreeDetailSpec.type3,
                    documentNumber3: agreeDetailSpec.documentNumber3,
                    type5: agreeDetailSpec.type5,
                    type1: agreeDetailSpec.type1,
                    documentNumber1: agreeDetailSpec.documentNumber1
                }];
            } else {
                driverCardStore.getRawRecords().forEach(function (item) {
                    Ext.Object.each(agreeDetailSpec, function (property, value) {
                        item[property] = value;
                    });
                });
                jsonData.insuranceAgreementRequestDetailList = driverCardStore.getRawRecords();
            }
        } else {
            if (me.getViewModel().get('isSenfi') && !me.getViewModel().get('needMedical')) {
                if (!me.getViewModel().get('editMode')) {
                    jsonData.insuranceAgreementRequestMedical = {
                        nationalCode: personInfo.nationalId,
                        insuranceId: personInfo.id,
                        medicalResultDesc: 'سالم',
                        medicalResultStatusCode: '1'
                    }
                }
            } else {
                jsonData.insuranceAgreementRequestDetailList = [{
                    documentDate1: agreeDetailSpec.documentDate1 ? new Date(agreeDetailSpec.documentDate1) : null,
                    documentDate2: agreeDetailSpec.documentDate2 ? new Date(agreeDetailSpec.documentDate2) : null,
                    documentDate3: agreeDetailSpec.documentDate3 ? new Date(agreeDetailSpec.documentDate3) : null,
                    documentDate4: agreeDetailSpec.documentDate4 ? new Date(agreeDetailSpec.documentDate4) : null,
                    documentDate5: agreeDetailSpec.documentDate5 ? new Date(agreeDetailSpec.documentDate5) : null,
                    documentNumber1: agreeDetailSpec.documentNumber1,
                    documentNumber2: agreeDetailSpec.documentNumber2,
                    documentNumber3: agreeDetailSpec.documentNumber3,
                    documentNumber4: agreeDetailSpec.documentNumber4,
                    documentNumber5: agreeDetailSpec.documentNumber5,
                    documentNumber6: agreeDetailSpec.documentNumber6,
                    documentNumber7: agreeDetailSpec.documentNumber7,
                    documentNumber8: agreeDetailSpec.documentNumber8,
                    documentStartDate: agreeDetailSpec.documentStartDate ? new Date(agreeDetailSpec.documentStartDate) : null,
                    documentStartDate1: agreeDetailSpec.documentStartDate1 ? new Date(agreeDetailSpec.documentStartDate1) : null,
                    documentEndDate: agreeDetailSpec.documentEndDate ? new Date(agreeDetailSpec.documentEndDate) : null,
                    documentEndDate1: agreeDetailSpec.documentEndDate1 ? new Date(agreeDetailSpec.documentEndDate1) : null,
                    type1: agreeDetailSpec.type1,
                    type2: agreeDetailSpec.type2,
                    type3: agreeDetailSpec.type3,
                    type4: agreeDetailSpec.type4,
                    type5: agreeDetailSpec.type5,
                    type6: agreeDetailSpec.type6,
                    type7: agreeDetailSpec.type7,
                    description1: agreeDetailSpec.description1,
                    description2: agreeDetailSpec.description2,
                    description3: agreeDetailSpec.description3,
                    description4: agreeDetailSpec.description4,
                    description5: agreeDetailSpec.description5
                }];
            }
        }

        if (!me.getViewModel().get('editMode')) {
            jsonData.requestDate = headerSpec.requestDate;
            jsonData.introductionLetterDate = headerSpec.introductionLetterDate;
        }

        switch (agreeSpec.categoryType.categoryTypeCode) {
            case '2':
                jsonData.agreementCategoryType = {
                    agreementCategoryId: agreeSpec.specialGroupType
                };
                break;
            case '3':
                jsonData.specialGroupType = {
                    specialGroupCode: agreeSpec.specialGroupType
                };
                break;
        }

        var editMode = me.getViewModel().get('editMode');
        var url = InsuranceTechnical.helper.Urls.getUrl('insuranceAgreementRequest');
        if (editMode) {
            url = url + "/" + me.getViewModel().get('agreeSpec.requestId');
        }

        Ext.getBody().mask('لطفا منتظر بمانید...');
        Ext.Ajax.request({
            url: url,
            method: editMode ? "PUT" : "POST",
            jsonData: jsonData,
            success: function () {
                me.redirectTo('insurance-agreement-spec');
                Ext.getBody().unmask();
                Ext.Msg.alert('پیغام سیستم', 'رکورد با موفقیت ذخیره شد');
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
    beforeProvinceQuery: function (queryEvent) {
        var provinceCode = Ext.getCmp('province').getValue();
        var val = Ext.getCmp('city').getValue();
        var numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
        queryEvent.combo.getStore().clearFilter(true);
        var filters = [];
        if (provinceCode) {
            filters.push({
                "property": "parent.code",
                "value": provinceCode,
                "operator": "EQ"
            });
        } /*else {
            Ext.Msg.alert('پیام سیستم', 'ابتدا استان را انتخاب نمایید!');
            return;
        }*/

        if (!queryEvent.cancel && val) {
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
        }
        queryEvent.query = JSON.stringify(filters);
        queryEvent.combo.getStore().addFilter(filters);
        return queryEvent;
    },
    beforeCityQuery: function (queryEvent) {
        var provinceCode = Ext.getCmp('province').getValue();
        var val = Ext.getCmp('city').getValue();
        var numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
        queryEvent.combo.getStore().clearFilter(true);
        var filters = [];
        if (provinceCode) {
            filters.push({
                "property": "parent.code",
                "value": provinceCode,
                "operator": "EQ"
            });
        } else {
            Ext.Msg.alert('پیام سیستم', 'ابتدا استان را انتخاب نمایید!');
            return;
        }

        if (!queryEvent.cancel && val) {
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
        }
        queryEvent.query = JSON.stringify(filters);
        queryEvent.combo.getStore().addFilter(filters);
        return queryEvent;
    },
    onIntoDateChange: function (combo, newValue) {
        if (!this.getViewModel().get('editMode')) {
            this.resetPersonInfo();
        }
    },
    resetPersonInfo: function () {
        var me = this;
        me.getViewModel().set('personInfo', {});
        me.getViewModel().set('workshopData', {});
        me.getViewModel().set('agreeDetailSpec', {});
        if (me.getViewModel().get('isSenfi')) {
            me.getViewModel().set('noMoreFields', true);
        }
    },
    resetAgreement: function () {
        var me = this;
        /*this.getViewModel().set('agreeSpec', {
            categoryTypeCode: this.getViewModel().get('agreeSpec.categoryTypeCode'),
            insuranceGroupCode: this.getViewModel().get('agreeSpec.insuranceGroupCode')
        });*/
        Ext.Object.each(this.getViewModel().data.agreeSpec, function (property, value) {
            if (property !== 'categoryTypeCode' && property !== 'insuranceGroupCode') {
                delete me.getViewModel().data[property];
            }
        });
        Ext.getCmp('insuranceId').reset();
        Ext.getCmp('workshopID').reset();
        Ext.getCmp('wage').reset();
        me.getViewModel().set('personInfo', {});
        me.getViewModel().set('workshopData', {});
        me.getViewModel().set('agreeDetailSpec', {});
        me.getViewModel().set('noMoreFields', true);
        me.getViewModel().set('needMedical', false);
        me.getViewModel().set('isSenfi', false);
        me.getViewModel().set('disableForm', true);
        me.getViewModel().set('headerSpec', true);
    },
    resetWorkshopData: function () {
        this.getViewModel().set('workshopData', {});
    },
    resetStores: function () {
        var agreementCategoryTypeStore = this.getStore("agreementCategoryTypeStore");
        var specialGroupTypeStore = this.getStore("specialGroupTypeStore");
        agreementCategoryTypeStore.removeAll();
        specialGroupTypeStore.removeAll();
    }
});
Ext.define('MomentjsAdapter', {
    mixins: ['Ext.mixin.Mashup'],
    requiredScripts: [
        'resources/js/moment.min.js'
    ]
});

