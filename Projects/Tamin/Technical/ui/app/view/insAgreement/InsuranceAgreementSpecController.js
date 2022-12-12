Ext.define('InsuranceTechnical.view.insAgreement.InsuranceAgreementSpecController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.insAgreement-spec-controller',
    init: function () {
        var me = this;
        var orgCode = InsuranceTechnical.getApplication().getCache('organizationCode');
        me.getViewModel().set('setadi', orgCode === '0000');
        me.getViewModel().set('brchCode', orgCode);
        if (orgCode !== undefined && orgCode !== '0000') {
            Ext.getCmp('branchCode').disable();
        }
        var insuranceAgreementSpecStore = me.getStore('insuranceAgreementSpecStore');
        var insuranceAgreementCatStore = me.getStore('insuranceAgreementCatStore');
        var insuranceAgreementTypeStore = me.getStore('insuranceAgreementTypeStore');
        Ext.getBody().mask('لطفا منتظر بمانید...');
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
                                    Ext.getBody().unmask();
                                }
                            });
                        }
                    });
                } else {
                    InsuranceTechnical.tamin.window.Window.retry(3);
                }
            }
        });       
    },
    showInsurancePopup: function (combo) {
        var me = this;
        var container = me.getView();
        var win = container.lookupReference('InsuredPersonPopup');
        if (!win) {
            win = Ext.create('InsuranceTechnical.view.main.InsuredPersonPopup');
            container.add(win);
        }
        win.setCallback(function () {
            if (win.selectedItem !== null) {
                combo.setValue(win.selectedItem.data.id);
            }
        });
        win.show();
    },
    onSearchButton: function () {
        var me = this;
        var form = Ext.getCmp('insAgreement-spec-search-form');
        var formValues = form.getValues();
        var result = [];
        var orgCode = InsuranceTechnical.getApplication().getCache('organizationCode');
        if (!form.isValid()) {
            InsuranceTechnical.tamin.window.MessageBox.showError('خطا', 'خطاهای مشخص شده را اصلاح نمائید.');
            return;
        }
        Ext.Object.each(formValues, function (property, value) {
            if (value !== '') {
                if (property === 'createDate' && Ext.getCmp('createDate').getValue()) {
                    var i = result.length;
                    result.push({
                        id: i,
                        property: 'createDate',
                        value: new Date(value).getTime(),
                        operator: 'EQUAL'
                    });
                } else if (property === 'requestDate'  && Ext.getCmp('requestDate').getValue()) {
                    result.push({
                        property: 'requestDate',
                        value: new Date(value).getTime(),
                        operator: 'EQUAL'
                    });
                } else if (property === 'categoryType') {
                    result.push({
                        property: 'categoryType.categoryTypeCode',
                        value: value,
                        operator: 'EQUAL'
                    });
                } else if (property === 'specialGroupType') {
                    switch (formValues.categoryType) {
                        case '2':
                            result.push({
                                property: 'agreementCategoryType.agreementCategoryId',
                                value: value,
                                operator: 'EQUAL'
                            });
                            break;
                        case '3':
                            result.push({
                                property: 'specialGroupType.specialGroupCode',
                                value: value,
                                operator: 'EQUAL'
                            });
                            break;
                    }
                } else if (property === 'insuranceType') {
                    result.push({
                        property: 'insuranceType.insuranceTypeCode',
                        value: value,
                        operator: 'EQUAL'
                    });
                } else if (property === 'branchCode') {
                    if (value.split('-')[0] !== "0000" && value.split('-')[0] === orgCode) {
                        result.push({
                            property: 'branch.branchCode',
                            value: orgCode,
                            operator: 'EQUAL'
                        });
                    } else if (orgCode !== "0000" && value.split('-')[0] !== orgCode) {
                        result.push({
                            property: 'branch.branchCode',
                            value: orgCode,
                            operator: 'EQUAL'
                        });
                    }
                    else if (orgCode === "0000" && value.split('-')[0] !== orgCode) {
                        result.push({
                            property: 'branch.branchCode',
                            value: value.split('-')[0],
                            operator: 'EQUAL'
                        });
                    }
                    else if (orgCode === "0000" && value.split('-')[0] === orgCode) {
                        result.push({
                            property: 'branch.branchCode',
                            operator: 'inn'
                        });
                    }
                } else {
                    var i = result.length;
                    result.push({
                        id: i,
                        property: property,
                        value: value,
                        operator: 'EQUAL'
                    });
                }
            }
        });
        var store = me.getViewModel().getStore('insuranceAgreementSpecStore');
        store.on('load', function () {
            if (store.getCount() === 0) {
                Ext.Msg.alert('پیام سیستم', 'دیتایی برای مشاهده وجود ندارد ');
            }
        });
        store.clearFilter(true);
        store.addFilter(result);
        store.load();
    },
    onCatChange: function (combo, newValue) {
        var me = this;
        var agreementCategoryTypeStore = this.getViewModel().getStore('agreementCategoryTypeStore');
        var specialGroupTypeStore = this.getViewModel().getStore('specialGroupTypeStore');
        var groupTypeCombo = Ext.getCmp('insuranceGroupCombo');
        agreementCategoryTypeStore.removeAll();
        specialGroupTypeStore.removeAll();
        groupTypeCombo.reset();
        switch (newValue) {
            case '2':
                groupTypeCombo.setDisabled(false);
                groupTypeCombo.bindStore(agreementCategoryTypeStore);
                if (me.getViewModel().get('editMode')) {
                    agreementCategoryTypeStore.clearFilter(true);
                    agreementCategoryTypeStore.addFilter([{
                        property: 'categoryTypeCode',
                        value: me.getViewModel().get('agreeSearch.agreementCategoryType.categoryTypeCode'),
                        operator: 'EQUAL'
                    }], true);
                }
                agreementCategoryTypeStore.load({
                    callback: function caller(record, operation, success) {
                        if (success) {
                            try {
                                var item = record.find(function (item) {
                                    return item.data.categoryTypeCode === me.getViewModel().get('agreeSearch.agreementCategoryType.categoryTypeCode');
                                });
                                if (item !== null && item !== undefined) {
                                    Ext.getCmp('insuranceGroupCombo').setSelection(item);
                                }
                            } catch (e) {
                                Ext.getBody().unmask();
                                Ext.Msg.alert('پیام سیستم', 'دریافت اطلاعات درخواست مورد نظر با خطا مواجه شد.');
                            }
                        }
                    }
                });
                break;
            case '3':
                groupTypeCombo.setDisabled(false);
                groupTypeCombo.bindStore(specialGroupTypeStore);
                if (me.getViewModel().get('editMode')) {
                    specialGroupTypeStore.clearFilter(true);
                    specialGroupTypeStore.addFilter([{
                        property: 'specialGroupCode',
                        value: me.getViewModel().get('agreeSearch.specialGroupType.specialGroupCode'),
                        operator: 'EQUAL'
                    }], true);
                }
                specialGroupTypeStore.load({
                    callback: function caller(record, operation, success) {
                        if (success) {
                            try {
                                var item = record.find(function (item) {
                                    return item.data.specialGroupCode === me.getViewModel().get('agreeSearch.specialGroupType.specialGroupCode');
                                });
                                if (item !== null && item !== undefined) {
                                    Ext.getCmp('insuranceGroupCombo').setSelection(item);
                                }
                            } catch (e) {
                                Ext.getBody().unmask();
                                Ext.Msg.alert('پیام سیستم', 'دریافت اطلاعات درخواست مورد نظر با خطا مواجه شد.');
                            }
                        }
                    }
                });
                break;
            default:
                groupTypeCombo.setDisabled(true);
        }
    },
    onShowAllButton: function (btn) {
        var me = this;
        Ext.getCmp('insuranceId').setValue('');
        Ext.getCmp('nationalCode').setValue('');
        Ext.getCmp('categoryType').setValue('');
        Ext.getCmp('insuranceGroupCombo').setValue('');
        Ext.getCmp('insuranceTypeCode').setValue('');
        Ext.getCmp('status').setValue('');
        Ext.getCmp('createDate').setValue('');
        Ext.getCmp('requestDate').setValue('');

        var store = me.getViewModel().getStore('insuranceAgreementSpecStore');
        store.clearFilter(true);
        store.load();
    },
    onAddButton: function () {
        this.redirectTo('insurance-agreement-new-main');
    },
    techConfirm: function (button) {
        var me = this;
        var json = button.up('button').getWidgetRecord().data;
        var name = arguments[0].name;
        Ext.getBody().mask('لطفا منتظر بمانید.');
        if (json.requestId === null) {
            InsuranceTechnical.tamin.window.MessageBox.showInfo('پیام سیستم', 'اقدام جهت درخواست غیر حضوری ممکن نیست.');
        }
        var insAgreeSpecStore = me.getViewModel().getStore('insuranceAgreementSpecStore');
        var url = InsuranceTechnical.helper.Urls.getUrl('insuranceAgreementRequest') + "/" + json.requestId;
        Ext.Msg.show({
            title: 'پیام سیستم',
            message: 'آیا مطمئن هستید؟',
            buttons: Ext.Msg.YESNOCANCEL,
            buttonText: {
                yes: 'تایید',
                no: 'عدم تایید',
                cancel: 'انصراف'
            },
            fn: function (button) {
                if (button === 'yes') {
                    json.status = '1';
                    json.operation = 'techConfirm';
                    Ext.Ajax.request({
                        url: url,
                        method: "PUT",
                        jsonData: json,
                        success: function () {
                            Ext.getBody().unmask();
                            Ext.Msg.alert('پیغام سیستم', 'تایید مسئول با موفقیت ثبت شد.');
                            insAgreeSpecStore.reload();
                        },
                        failure: function (response) {
                            Ext.getBody().unmask();
                            var data = '';
                            if (response.responseText !== null && response.responseText !== ''
                                && Ext.JSON.decode(response.responseText).data.message !== null
                                && Ext.JSON.decode(response.responseText).data.message !== undefined) {
                                if (Ext.JSON.decode(response.responseText).status === 403) {
                                    InsuranceTechnical.tamin.window.MessageBox.showError('پیام سیستم', 'محدودیت دسترسی :' + '<br>'
                                        + 'شما دسترسی مسئول فنی را ندارید');
                                } else {
                                    insAgreeSpecStore.reload();
                                    data = Ext.JSON.decode(response.responseText).data.message;
                                    InsuranceTechnical.tamin.window.MessageBox.showError('پیام سیستم', 'خطا :' + '<br>' + data);
                                }
                            } else {
                                Ext.Msg.alert('پیام سیستم', 'خطا در برقراری ارتباط با سرور' + '<br/>');
                            }
                        }
                    });
                } else if (button === 'no') {
                    json.status = '2';
                    json.operation = 'techConfirm';
                    Ext.Ajax.request({
                        url: url,
                        method: 'PUT',
                        jsonData: json,
                        success: function () {
                            Ext.getBody().unmask();
                            Ext.Msg.alert('پیغام سیستم', 'عدم تایید مسئول با موفقیت ثبت شد.');
                            insAgreeSpecStore.reload();
                        },
                        failure: function (response) {
                            Ext.getBody().unmask();
                            var data = '';
                            if (response.responseText !== null && response.responseText !== ''
                                && Ext.JSON.decode(response.responseText).data.message !== null
                                && Ext.JSON.decode(response.responseText).data.message !== undefined) {
                                if (Ext.JSON.decode(response.responseText).status === 403) {
                                    InsuranceTechnical.tamin.window.MessageBox.showError('پیام سیستم', 'محدودیت دسترسی :' + '<br>'
                                        + 'شما دسترسی مسئول فنی را ندارید');
                                } else {
                                    insAgreeSpecStore.reload();
                                    data = Ext.JSON.decode(response.responseText).data.message;
                                    InsuranceTechnical.tamin.window.MessageBox.showError('پیام سیستم', 'خطا :' + '<br>' + data);
                                }
                            } else {
                                Ext.Msg.alert('پیام سیستم', 'خطا در برقراری ارتباط با سرور' + '<br/>');
                            }
                        }
                    });
                } else if (button === 'cancel') {
                    Ext.getBody().unmask();
                }
            }
        });
    },
    finalConfirm: function (button) {
        var me = this;
        var json = button.up('button').getWidgetRecord().data;
        Ext.getBody().mask('لطفا منتظر بمانید.');
        if (json.requestId === null) {
            InsuranceTechnical.tamin.window.MessageBox.showInfo('پیام سیستم', 'اقدام جهت درخواست غیر حضوری ممکن نیست.');
        }
        var insAgreeSpecStore = me.getViewModel().getStore('insuranceAgreementSpecStore');
        var url = InsuranceTechnical.helper.Urls.getUrl('insuranceAgreementRequest') + "/" + json.requestId;
        Ext.Msg.show({
            title: 'پیام سیستم',
            message: 'آیا مطمئن هستید؟',
            buttons: Ext.Msg.YESNOCANCEL,
            buttonText: {
                yes: 'تایید',
                no: 'عدم تایید',
                cancel: 'انصراف'
            },
            fn: function (button) {
                if (button === 'yes') {
                    json.status = '5';
                    json.operation = 'finalConfirm';
                    Ext.Ajax.request({
                        url: url,
                        method: "PUT",
                        jsonData: json,
                        success: function () {
                            Ext.getBody().unmask();
                            Ext.Msg.alert('پیغام سیستم', 'تایید با موفقیت ثبت شد.');
                            insAgreeSpecStore.reload();
                        },
                        failure: function (response) {
                            Ext.getBody().unmask();
                            var data = '';
                            if (response.responseText !== null && response.responseText !== ''
                                && Ext.JSON.decode(response.responseText).data.message !== null
                                && Ext.JSON.decode(response.responseText).data.message !== undefined) {
                                if (Ext.JSON.decode(response.responseText).status === 403) {
                                    InsuranceTechnical.tamin.window.MessageBox.showError('پیام سیستم', 'محدودیت دسترسی :' + '<br>'
                                        + 'شما دسترسی مسئول فنی را ندارید');
                                } else {
                                    insAgreeSpecStore.reload();
                                    data = Ext.JSON.decode(response.responseText).data.message;
                                    InsuranceTechnical.tamin.window.MessageBox.showError('پیام سیستم', 'خطا :' + '<br>' + data);
                                }
                            } else {
                                Ext.Msg.alert('پیام سیستم', 'خطا در برقراری ارتباط با سرور' + '<br/>');
                            }
                        }
                    });
                } else if (button === 'no') {
                    json.status = '6';
                    json.operation = 'finalConfirm';
                    Ext.Ajax.request({
                        url: url,
                        method: 'PUT',
                        jsonData: json,
                        success: function () {
                            Ext.getBody().unmask();
                            Ext.Msg.alert('پیغام سیستم', 'عدم تایید با موفقیت ثبت شد.');
                            insAgreeSpecStore.reload();
                        },
                        failure: function (response) {
                            Ext.getBody().unmask();
                            var data = '';
                            if (response.responseText !== null && response.responseText !== ''
                                && Ext.JSON.decode(response.responseText).data.message !== null
                                && Ext.JSON.decode(response.responseText).data.message !== undefined) {
                                if (Ext.JSON.decode(response.responseText).status === 403) {
                                    InsuranceTechnical.tamin.window.MessageBox.showError('پیام سیستم', 'محدودیت دسترسی :' + '<br>'
                                        + 'شما دسترسی مسئول فنی را ندارید');
                                } else {
                                    insAgreeSpecStore.reload();
                                    data = Ext.JSON.decode(response.responseText).data.message;
                                    InsuranceTechnical.tamin.window.MessageBox.showError('پیام سیستم', 'خطا :' + '<br>' + data);
                                }
                            } else {
                                Ext.Msg.alert('پیام سیستم', 'خطا در برقراری ارتباط با سرور' + '<br/>');
                            }
                        }
                    });
                } else if (button === 'cancel') {
                    Ext.getBody().unmask();
                }
            }
        });
    },
    onIntroductionReportButton: function(button) {
        var record = button.up('button').getWidgetRecord().data;
        var url = InsuranceTechnical.helper.Urls.getUrl('introductionReport') +
            '?reqId=' + record.requestId + '&branchCode=' + record.branch.branchCode;
        Ext.create('InsuranceTechnical.tamin.window.PdfViewer', {url: url}).show();
    },
    onAnswerReportButton: function(button) {
        var record = button.up('button').getWidgetRecord().data;
        var url = InsuranceTechnical.helper.Urls.getUrl('answerReport') +
            "?reqId=" + record.requestId;
        Ext.create('InsuranceTechnical.tamin.window.PdfViewer', {url: url}).show();
    },
    onDeleteButton: function (view, rowIndex, colIndex, item, e, rec, row, action) {

        var me = this;
        var recordData = rec.data;
        Ext.Msg.confirm('پيام سيستم', 'آيا اطمينان داريد؟', function (id, value) {
            if (id === 'yes') {
                Ext.Ajax.request({
                    url: InsuranceTechnical.helper.Urls.getUrl('insuranceAgreementRequest') +
                        '/' + recordData.requestId,
                    method: 'DELETE',
                    callback: function (options, success, response) {
                        if (success) {
                            var store = me.getViewModel().getStore('insuranceAgreementSpecStore');
                            store.clearFilter(true);
                            store.reload();
                            InsuranceTechnical.tamin.window.MessageBox.showInfo('پيغام', 'رکورد با موفقيت حذف شد. ');
                        } else {
                            InsuranceTechnical.tamin.window.MessageBox.showError('خطا', Ext.decode(response.responseText).data.message);
                        }
                    }
                });
            }
        });
    },
    onEditButton: function (view, rowIndex, colIndex, item, e, rec, row, action) {
        var record = rec.data;
        var requestId = record.requestId;
        this.redirectTo('insurance-agreement-new-main/' + requestId, false);
    },
    onMedicalResultButton: function (btn) {
        var me = this;
        me.resetPopUps();
        var container = me.getView();
        var refrence = 'senfi-medical-result-ref';
        var winPath = 'InsuranceTechnical.view.insAgreement.MedicalResult';
        var recordDataGrid = btn.up('button').getWidgetRecord().data;
        me.getViewModel().set('agreeSpec', recordDataGrid);
        me.getViewModel().set('personInfo', recordDataGrid.person);
        me.getViewModel().set('workshopData', recordDataGrid.workshop);
        if (recordDataGrid.insuranceAgreementRequestMedical) {
            var medical = recordDataGrid.insuranceAgreementRequestMedical;
            me.getViewModel().set('medicalSpec', medical);
            me.getViewModel().set('medicalSpec.medicalLetterDate', medical.medicalLetterDate ?
                InsuranceTechnical.tamin.helpers.Persian.gregorianToPersian(new Date(medical.medicalLetterDate)) : '');
            me.getViewModel().set('lockEdit', true);
            me.getViewModel().set('editMode', true);
        }
        var win = me.lookupReference(refrence);
        if (!win) {
            win = Ext.create(winPath);
            container.add(win);
        }
        win.show();
        win.center();
    },
    saveMedical: function (btn) {
        var me = this;
        var url;
        var refrence = 'senfi-medical-result-ref';
        var form = Ext.getCmp('senfi-medical-result-form');
        var agreeSpec = me.getViewModel().get('agreeSpec');
        var medical = me.getViewModel().get('medicalSpec');
        var person = me.getViewModel().get('personInfo');

        if (!form.isFormValid()) {
            InsuranceTechnical.tamin.window.MessageBox.showError('خطا', 'اطلاعات وارد شده کامل نمی باشد.', me);
            return;
        }

        medical.medicalLetterDate = medical.medicalLetterDate
            ? InsuranceTechnical.tamin.helpers.Persian.gregorianToPersian(medical.medicalLetterDate).split("/").join("") : null;
        medical.nationalCode = person.nationalId;
        medical.insuranceId = person.id;
        medical.insuranceAgreementRequest = {
            requestId: agreeSpec.requestId
        };
        url = InsuranceTechnical.helper.Urls.getUrl('insuranceAgreementRequestMedical');
        this.lookupReference(refrence).mask('در حال ذخیره اطلاعات ...');
        Ext.Ajax.request({
            url: url,
            method: 'POST',
            jsonData: medical,
            callback: function (options, success, response) {
                if (success) {
                    me.lookupReference(refrence).unmask();
                    me.getViewModel().getStore('insuranceAgreementSpecStore').reload();
                    var message = 'نتیجه معاینات پزشکی با موفقیت ثبت گردید.';
                    InsuranceTechnical.tamin.window.MessageBox.showInfo('پیام سیستم', message);
                    me.onCancelButton();
                    btn.up('window').close();
                } else {
                    me.lookupReference(refrence).unmask();
                    InsuranceTechnical.tamin.window.MessageBox.showError('خطا', 'خطا در ذخیره نتیجه معاینات پزشکی!');
                }
            }
        });
    },
    onCancelButton: function (btn) {
        this.resetPopUps();
        var win = btn.up('window');
        win.close();
    },
    resetFilters: function() {
        Ext.getCmp('insuranceId').reset();
        Ext.getCmp('nationalCode').reset();
        Ext.getCmp('categoryType').reset();
        Ext.getCmp('insuranceTypeCode').reset();
        Ext.getCmp('status').reset();
        Ext.getCmp('reqDateFrom').reset();
        Ext.getCmp('reqDateTo').reset();
    },
    resetPopUps: function() {
        this.getViewModel().set('agreeSpec', {});
        this.getViewModel().set('personInfo', {});
        this.getViewModel().set('workshopData', {});
        this.getViewModel().set('medicalSpec', {});
        this.getViewModel().set('lockEdit', false);
        this.getViewModel().set('editMode', false);
    }
});
