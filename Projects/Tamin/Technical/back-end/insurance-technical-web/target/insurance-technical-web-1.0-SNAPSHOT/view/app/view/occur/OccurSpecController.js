/**
 * Created by a-khalighi.
 */
Ext.define('InsuranceTechnical.view.occur.OccurSpecLController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.occur-spec-controller',
    init: function () {
        var me = this;
        me.getViewModel().set('occurSpec', {});
        me.getViewModel().set('occurotherbrhletter', {});
        me.getViewModel().set('inspworksended', null);
        me.getViewModel().set('ssupOccurReview', {});
        me.getViewModel().set('occurIdea', {});
        me.getViewModel().set('newOccIdea', {});
        me.getViewModel().set('occurinspconf', {});
        me.getViewModel().set('displayOccurIdea', {});
        me.getViewModel().set('occurWorkInspInfo', {});
        me.getViewModel().set('occurDocument', {});
        me.getViewModel().set('noWorkshopFound', false);

        Ext.getCmp('branchCode').setReadOnly(InsuranceTechnical.getApplication().getCache('organizationCode') !== "0000");
    },
    onChangFn: function () {
        var me = this;
        var reqowner = Ext.getCmp('reqowner').getValue();
        // Ext.getCmp('occur-spec-new-form').reset();
        var user = InsuranceTechnical.getApplication().getCache('user');
        Ext.getCmp('occur-spec-new-form').getForm().findField('branch').setValue(user.organization.code + ' - ' + user.organization.organizationName);
        me.getViewModel().set('reqowner', reqowner);
        if (reqowner !== '1' || reqowner !== '2') {

            // Ext.getCmp('firstNameDp').setValue(null);
            //  Ext.getCmp('lastNameDp').getValue(null);
            me.getViewModel().set('personalData.firstName', null);
            me.getViewModel().set('personalData.lastName', null);
            Ext.getCmp('insuranceRegisterationId').getValue();
        }
    },
    onChangEditFn: function () {

        var me = this;
        var reqowner = Ext.getCmp('reqowner').getValue();
        // Ext.getCmp('occur-spec-new-form').reset();
        var user = InsuranceTechnical.getApplication().getCache('user');
        Ext.getCmp('occur-spec-edit-form').getForm().findField('branch').setValue(user.organization.code + ' - ' + user.organization.organizationName);
        me.getViewModel().set('reqowner', reqowner);

    },

    onEserviceDownload: function () {
        var me = this;
        var url = InsuranceTechnical.helper.Urls.getUrl('EserviceOccurReport') +
            "/" +  me.getViewModel().get('occurSpec').eRepId;
        Ext.create('InsuranceTechnical.tamin.window.PdfViewer', {url: url}).show();
    },

    /*    onSelectRecord: function (btn) {
     var me = this;
     var grid = Ext.getCmp('insured');
     var selection = grid.getSelectionModel().getSelection()[0];
     var data = selection.data;
     if (data.length !== null || data.length !== 0 || data.length !== 'undefind') {
     data.fullName = data.firstName + ' ' + data.lastName;
     me.getViewModel().set('personalData', data);
     InsuranceTechnical.getApplication().addCache('personalData', data);
     btn.up('window').close();
     }
     },*/
    onAddButton: function (button) {
        var win = this.lookupReference('occur-spec-new-ref');
        if (!win) {
            win = Ext.create("InsuranceTechnical.view.occur.OccurSpecNew");
            this.getView().add(win);
        }
        this.getViewModel().set('workshopData','{}');
        this.getViewModel().set('personalData', '{}');
        this.getViewModel().set('iFlag', true);
        this.getViewModel().set('disableTextBoxes', true);
        win.show();
        win.center();
    },
    openOccurReportPopup: function (button) {

        var container = button.up('occur-spec');
        var win = container.lookupReference('occurReportPopup');
        if (!win) {
            win = Ext.create('InsuranceTechnical.view.occur.OccurReportPopup');
            container.add(win);
        }
        this.getViewModel().set('report.sDate', null);
        this.getViewModel().set('report.eDate', null);
        win.show();
        win.center();
    },
    onAddOccurOtherBrhLetterButton: function (button) {
        var recordData = button.up('button').getWidgetRecord().data;
        var reqId = recordData.reqId;
        var win = this.lookupReference('occur-other-brh-letter-form');
        if (!win) {
            win = Ext.create("InsuranceTechnical.view.occur.OccurOtherBrhLetter");
            this.getView().add(win);
        }
        this.getViewModel().set('reqId', reqId);
        this.getViewModel().set('occurSpec', recordData);
        win.method = 'POST';
        win.setTitle("ارجاع به شعبه بررسی کننده");

        this.getViewModel().set('iFlag', false);
        win.show();
        win.center();
    },
    OnSpecCancelButton: function (button) {

        var win = button.up('window');
        this.getViewModel().set('workshopData','{}');
        this.getViewModel().set('personalData', '{}');
        this.getViewModel().set('occurSpec', '{}');
        win.close();
    },
    OnNewButton: function (btn) {

        var me = this;
        //   this.getViewModel().set('ali',null);

        refrence = 'occur-spec-new-ref';
        winPath = 'InsuranceTechnical.view.occur.OccurSpecNew';
        var win = me.lookupReference('occur-spec-new-ref');

        if (!win) {
            win = Ext.create("InsuranceTechnical.view.occur.OccurSpecNew");
            this.getView().add(win);
        }

        win.method = 'POST';
        win.setTitle(" ثبت گزارش بازرسی ");

        win.show();
        win.center();
    },
    saveOccurNewButton: function (btn) {

        var form = Ext.getCmp('occur-spec-new-form');
        if (!form.isFormValid() || !this.getViewModel().get('workshopData.workshopName')
            /*||  Ext.getCmp('activitydesc').getValue() === undefined*/) {
            InsuranceTechnical.tamin.window.MessageBox.showError('خطا', 'اطلاعات وارد شده کامل نمی باشد.', this);
            return;
        }

        var user = InsuranceTechnical.getApplication().getCache('user');
        var activeRecord = this.getViewModel().get('occurSpec');
        var personalData = this.getViewModel().get('personalData');
        var workshopData = this.getViewModel().get('workshopData');
        var url = InsuranceTechnical.helper.Urls.getUrl('OccurRep');
        this.getViewModel().set('user', user);
        this.getViewModel().set('branchCode', user.organization.code);

        var rwworkstart = InsuranceTechnical.tamin.helpers.Persian.formatTime(workshopData.rwworkstart);
        var rwworkfinish = InsuranceTechnical.tamin.helpers.Persian.formatTime(workshopData.rwworkfinish);
        var occurTime = InsuranceTechnical.tamin.helpers.Persian.formatTime(activeRecord.occurTime);

        var data = {
            reportertype: activeRecord.reportertype,
            isutel: activeRecord.isutel !== null ? activeRecord.isutel : '',
            isuaddr: activeRecord.isuaddr !== null ? activeRecord.isuaddr : '',
            workshopId: workshopData.workshopId,
            workshopName: workshopData.workshopName,
            isuJobLocation: workshopData.isuJobLocation,
            rwworkstart: rwworkstart,
            rwworkfinish: rwworkfinish,
            employeedate: workshopData.employeedate instanceof Date ? workshopData.employeedate.getTime() : new Date(workshopData.employeedate).getTime(),
            vehicle: workshopData.vehicle,
            occurDate: activeRecord.occurDate instanceof Date ? activeRecord.occurDate.getTime() : new Date(activeRecord.occurDate).getTime(),
            occurTime: occurTime,
            occurAddr: activeRecord.occurAddr,
            occurJobdesc: activeRecord.occurJobdesc,
            occurDesc: activeRecord.occurDesc,
            risuid: personalData.id,
            pnatcode: activeRecord.pnatcode,
            repNo: activeRecord.repNo,
            repdate: activeRecord.repdate instanceof Date ? activeRecord.repdate.getTime() : new Date(activeRecord.repdate).getTime(),
            insuranceSpec: {
                id: personalData.id,
                brchCode: activeRecord.insBrchCode
            },
            brchCode: {
                branchCode: activeRecord.insBrchCode
            },
            rwshBranch: {
                branchCode: activeRecord.insBrchCode
            }
        };

        var me = this;
        this.lookupReference('occur-spec-new-ref').mask('در حال ذخیره اطلاعات ...');
        Ext.Ajax.request({
            url: url,
            method: 'POST',
            jsonData: data,
            success: function (response, opts) {
                me.getViewModel().getStore('occurSpecListStore').reload();
                me.resetOccurForm(true);
                me.lookupReference('occur-spec-new-ref').unmask();
                var message = 'درخواست شما با موفقیت ذخیره شد . ';
                InsuranceTechnical.tamin.window.MessageBox.showInfo('پیام سیستم', message);
                btn.up('window').close()
            },
            failure: function (response, opts) {
                me.lookupReference('occur-spec-new-ref').unmask();
                var resp = Ext.decode(response.responseText);
                InsuranceTechnical.tamin.window.MessageBox.showError('خطا', resp.data.message);
            }
        });
    },
    onChackOccurDate: function () {

        var dateOne = Ext.getCmp('occurDate').getValue();
        var convertDate = dateOne instanceof Date ? dateOne.getTime() : new Date(dateOne).getTime();
        var dateTwo = new Date;

        if (convertDate > dateTwo) {
            Ext.getCmp('occurDate').setValue(null);
            setTimeout(function () {
                InsuranceTechnical.tamin.window.MessageBox.showError('خطا', 'توجه: تاریخ وقوع حادثه نباید بزرگتر از تاریخ روز باشد!')
            }, 10);

        }
    },
    onChackRepDate: function () {
        var dateOne = Ext.getCmp('repDate').getValue();
        var convertDate = dateOne instanceof Date ? dateOne.getTime() : new Date(dateOne).getTime();
        var dateTwo = new Date;

        if (convertDate > dateTwo) {

            setTimeout(function () {
                Ext.getCmp('repDate').setValue(null);
                InsuranceTechnical.tamin.window.MessageBox.showError('خطا', 'توجه: تاریخ ثبت گزارش حادثه نباید بزرگتر از تاریخ روز باشد! ')
            }, 5);
        }
        var occurDate = Ext.getCmp('occurDate').getValue();
        var convertOccurDate = occurDate instanceof Date ? occurDate.getTime() : new Date(occurDate).getTime();
        if (convertOccurDate !== null && convertDate !== null) {

            if (convertDate < convertOccurDate) {
                Ext.getCmp('repDate').setValue(null);
                setTimeout(function () {
                    InsuranceTechnical.tamin.window.MessageBox.showError('خطا', ' تاريخ ثبت گزارش نميتواند پيش از تاريخ وقوع حادثه باشد. ')
                }, 10);
            }
        }
    },
    changeInsuranceType: function (field, newValue) {
        var me = this;
        me.resetIdentityForm();
        if (newValue === null) {
            return;
        }
        if (newValue == '1') {
            me.getViewModel().set('disableTextBoxes', true);
            this.getViewModel().set('iFlag', true);
        } else {
            me.getViewModel().set('disableTextBoxes', false);
            this.getViewModel().set('iFlag', false);
        }
    },
    onEnterOnInsId: function (field, e) {
        if (e.getKey() === e.ENTER) {
            this.findID(field, field.getValue());
        }
    },
    findID: function (field, newValue) {
        var me = this;
        me.resetIdentityForm();
        if (newValue === null) {
            return;
        }
        var insBrchCode = me.getViewModel().get('occurSpec.insBrchCode');

        var value = newValue.toString();
        if (value.length === 10) {
            var store = this.getViewModel().getStore('insuranceRegisterations');
            var filters = {
                property: 'id',
                value: newValue,
                operator: 'EQUAL'
            };
            store.clearFilter(true);
            store.addFilter(filters, true);
            store.load({
                callback: function (record, operation, success) {
                    Ext.getBody().unmask();
                    if (success) {
                        if (record.length !== 0) {
                            if (insBrchCode && insBrchCode !== '') {
                                record = record.find(function(item) {
                                    return item.getData().brchCode === insBrchCode;
                                });
                            } else {
                                record = record[0];
                            }

                            me.getViewModel().set('personalData.brchCode', record.getData().brchCode);
                            me.getViewModel().set('occurSpec.firstName', record.getData().firstName);
                            me.getViewModel().set('occurSpec.lastName', record.getData().lastName);
                            me.getViewModel().set('occurSpec.pnatcode', record.getData().nationalId);
                            me.getViewModel().set('occurSpec.pnationdesc', record.getData().nation === '01'
                                ? 'ایرانی' : record.getData().nation);
                            me.getViewModel().set('occurSpec.pfathername', record.getData().fatherName);
                            me.getViewModel().set('occurSpec.pidno', record.getData().idCardNumber);
                            var birthDate = record.getData().dateOfBirth;
                            me.getViewModel().set('occurSpec.mainPbirthdate', birthDate);
                            me.getViewModel().set('occurSpec.pbirthdate',
                                birthDate.substring(0, 4) + '/' + birthDate.substring(4, 6) + '/' + birthDate.substring(6, 8));
                            me.getViewModel().set('occurSpec.pexpcityname', record.getData().cityOfBirthDesc);
                            me.getViewModel().set('occurSpec.sexcode', record.getData().gender);
                            me.getViewModel().set('occurSpec.insBrchCode', record.getData().brchCode);

                            /*if (!me.getViewModel().get('workshopData.workshopName')) {
                                me.resetOccurForm(false);
                            }*/
                        } else {
                            me.getViewModel().set('occurSpec', {});
                            Ext.Msg.alert('پیام سیستم', 'اطلاعات مورد نظر یافت نشد.');
                        }
                    } else {
                        Ext.Msg.alert('پیام سیستم', 'خطا در برقراری ارتباط با سرور' + '<br/>' + record ? record.responseText : '');
                    }
                }
            });
            Ext.getBody().mask('لطفا منتظر بمانید...');
        }
    },
    onCancelButton: function (btn) {
        this.getViewModel().set('newOccIdea', {});
        this.getViewModel().set('occurotherbrhletter', null);
        this.getViewModel().set('occurWorkInspInfo', null);
        var win = btn.up('window');
        win.close();
    },
    onSelectRecordWorkshop: function (btn) {
        var me = this;
        var grid = Ext.getCmp('workshop');
        var selection = grid.getSelectionModel().getSelection()[0];
        var data = selection.data;
        if (data.length !== null || data.length !== 0 || data.length !== 'undefind') {
            data.fullName = data.firstName + ' ' + data.lastName;
            me.getViewModel().set('workshopData.workshopId', data.workshopId);
            me.getViewModel().set('workshopData.workshopName', data.workshopName);
            me.getViewModel().set('workshopData.branchCode', data.branchCode);
            btn.up('window').close();
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
            branchCode = me.getViewModel().get('workshopData').branchCode
                ? me.getViewModel().get('workshopData').branchCode : me.getViewModel().get('personalData').brchCode;
            /*if (me.getViewModel().get('workshopData')) {
                branchCode = me.getViewModel().get('workshopData').branchCode;
            } else {
                Ext.getCmp('workshopID').reset();
                Ext.Msg.alert('پیام سیستم', 'لطفا روی علامت جستجو کلیک کرده و شرکت مورد نظر را جستجو و انتخاب نمایید');
                return;
            }*/

            if (!branchCode) {
                Ext.Msg.alert('پیام سیستم', 'ابتدا اطلاعات هویتی را تکمیل نمایید.');
                me.resetOccurForm(true);
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
                    if (success) {
                        if (record.length !== 0) {
                            var urlCheckInsuranceId = InsuranceTechnical.helper.Urls.getUrl('Occur')
                                + '/get-workshop-detail?prwshid=' + workshopId + '&branchCode=' + branchCode;
                            me.getViewModel().set('workshopData.workshopId', record[0].getData().workshopId);
                            me.getViewModel().set('workshopData.workshopName', record[0].getData().workshopName);
                            me.getViewModel().set('workshopData.branchCode', record[0].getData().branchCode);
                            me.getViewModel().set('noWorkshopFound', false);
                            Ext.Ajax.request({
                                url: urlCheckInsuranceId,
                                method: 'GET',
                                callback: function (options, success, response) {
                                    Ext.getBody().unmask();
                                    if (success) {
                                        if (response.responseText !== "") {
                                            var address = Ext.decode(response.responseText).data;
                                            // Ext.getCmp('employerName').setValue(dataGetLoadInfo.employerName);
                                            Ext.getCmp('address').setValue(address);
                                        }
                                    }
                                }
                            });
                        } else {
                            // me.resetOccurForm();
                            // Ext.Msg.alert('پیام سیستم', 'اطلاعات مورد نظر یافت نشد.');
                            me.getViewModel().set('noWorkshopFound', true);
                        }
                    } else {
                        me.resetOccurForm();
                        Ext.Msg.alert('پیام سیستم', 'خطا در برقراری ارتباط با سرور' + '<br/>' + record ? record.responseText : '');
                    }
                }
            });
        }
    },
    onSearchButton: function (button) {
        var me = this;
        var form = Ext.getCmp('occur-spec-form-id');
        var formValues = form.getValues();
        var currentOrg = InsuranceTechnical.getApplication().getCache('organizationCode');
        var filters = [];
        Ext.Object.each(formValues, function (property, value) {
                if (value !== '') {
                    switch (property) {
                        case 'repdateFrom':
                            filters.push({
                                id: 1,
                                property: 'repdate',
                                value: new Date(value).getTime(),
                                operator: 'AFTER'
                            });
                            break;
                        case 'repdateTo':
                            filters.push({
                                id: 2,
                                property: 'repdate',
                                value: new Date(value).getTime(),
                                operator: 'BEFORE'
                            });
                            break;
                        case 'branchCode':
                            if(value.split('-')[0] !== "0000" && value.split('-')[0] === currentOrg) {
                                filters.push({
                                    property: 'brchCode.branchCode',
                                    value: currentOrg,
                                    operator: 'EQUAL'
                                });
                            } else if(currentOrg !== "0000" && value.split('-')[0] !== currentOrg ){
                                filters.push({
                                    property: 'brchCode.branchCode',
                                    value: value.split('-')[0], // was: ''
                                    operator: 'EQUAL'
                                });
                            }
                            else if(currentOrg === "0000"  && value.split('-')[0] !== currentOrg) {
                                filters.push({
                                    property: 'brchCode.branchCode',
                                    value: value.split('-')[0],
                                    operator: 'EQUAL'
                                });
                            }
                            else if(currentOrg ==="0000" && value.split('-')[0] === currentOrg){
                                filters.push({
                                    property: 'brchCode.branchCode',
                                    operator: 'inn'
                                });
                            }
                            break;
                        case 'flagBranch':
                            if (value === '0' || value === null) {
                                filters.push({
                                    property: 'flagBranch',
                                    value: 0,
                                    operator: 'EQUAL'
                                });
                            } else if (value === '1') {
                                filters.push({
                                    property: 'flagBranch',
                                    value: 1,
                                    operator: 'EQUAL'
                                });
                            }
                            break;
                        case 'eRequest':
                            if (value === '0') {
                                filters.push({
                                    property: 'eRepId',
                                    operator: 'isn'
                                });
                            } else if (value === '1') {
                                filters.push({
                                    property: 'eRepId',
                                    operator: 'inn'
                                });
                            }
                            break;
                        default:
                            filters.push({
                                property: property,
                                value: value,
                                operator: 'eq'
                            });
                    }
                }
            }
        );
        var store = me.getViewModel().getStore('occurSpecListStore');
        store.clearFilter(true);
        store.addFilter(filters, true);
        store.load();
    },
    onShowAllButton: function (btn) {
        var me = this;
        var user = InsuranceTechnical.getApplication().getCache('user');
        var store = this.getViewModel().getStore('occurSpecListStore');
        store.clearFilter(true);
        store.load();
        btn.up('form').getForm().reset();
        Ext.getCmp('branchCode').setValue(user.organization.code + '- '+ user.organization.organizationName);
        me.getViewModel().set('organizationCode', user.organization.code + '- '+ user.organization.organizationName);
    },
    editOccurButton: function (view, rowIndex, colIndex, item, e, rec, row, action) {
        var me = this;
        me.getViewModel().set('workshopData','{}');
        me.getViewModel().set('personalData', '{}');
        me.getViewModel().set('occurSpec', '{}');
        var recordData = rec.data;
        var repNoCount = recordData.repNoCount;
        var orgCode = InsuranceTechnical.getApplication().getCache('organizationCode');

        // Lock/Unlock save button (Comment For Test)
        if (repNoCount > 0 || orgCode !== recordData.brchCode.branchCode || recordData.ssupOccurReview !== null) {
            me.getViewModel().set('iFlag', true);
        } else {
            me.getViewModel().set('iFlag', false);
        }

        var rwworkstart = InsuranceTechnical.tamin.helpers.Persian.formatTime(recordData.rwworkstart);
        var rwworkfinish = InsuranceTechnical.tamin.helpers.Persian.formatTime(recordData.rwworkfinish);
        var occurTime = InsuranceTechnical.tamin.helpers.Persian.formatTime(recordData.occurTime);

        me.getViewModel().set('personalData', recordData.insuranceSpec);
        me.getViewModel().set('occurSpec', recordData);
        me.getViewModel().set('occurSpec.insBrchCode', recordData.brchCode.branchCode);
        me.getViewModel().set('workshopData.workshopId', recordData.workshopId);
        me.getViewModel().set('workshopData.workshopName', recordData.workshopName);
        me.getViewModel().set('workshopData.isuJobLocation', recordData.isuJobLocation);
        me.getViewModel().set('workshopData.branchCode', recordData.rwshBranch.branchCode);
        me.getViewModel().set('workshopData.rwworkstart', rwworkstart);
        me.getViewModel().set('workshopData.rwworkfinish', rwworkfinish);
        me.getViewModel().set('occurSpec.occurTime', occurTime);
        me.getViewModel().set('workshopData.employeedate', new Date(recordData.employeedate));
        me.getViewModel().set('workshopData.vehicle', recordData.vehicle);
        me.getViewModel().set('occurSpec.occurDate', new Date(recordData.occurDate));
        me.getViewModel().set('occurSpec.repdate', new Date(recordData.repdate));

        var user = InsuranceTechnical.getApplication().getCache('user');
        me.getViewModel().set('user', user);
        me.getViewModel().set('branchCode', user.organization.code);
        var win = me.lookupReference('occur-spec-edit-ref');
        if (!win) {
            win = Ext.create("InsuranceTechnical.view.occur.OccurSpecEdit");
            me.getView().add(win);
        }
        if (recordData.eRepId && recordData.eRepId !== '') {
            var url = InsuranceTechnical.helper.Urls.getUrl('OccurWorkshop') + '?eRepId=' + recordData.eRepId;
            Ext.getBody().mask('لطفا منتظر بمانيد...');
            Ext.Ajax.request({
                url: url,
                method: 'GET',
                success: function (response) {
                    Ext.getBody().unmask();
                    var data = Ext.decode(response.responseText).data;
                    me.getViewModel().set('occurSpec.esWorkshop', data);
                    win.show();
                    win.center();
                },
                failure: function (record, operation) {
                    Ext.getBody().unmask();
                    win.show();
                    win.center();
                    InsuranceTechnical.tamin.window.MessageBox.showError('خطا',
                        'اطلاعات کارگاه برای این درخواست در سامانه غیر حضوری ثبت نشده .');
                }
            });
        } else {
            win.show();
            win.center();
        }
    },
    onEditOccureButton: function (btn) {

        var me = this;
        var form = Ext.getCmp('occur-spec-edit-form');
        if (!form.isFormValid()) {
            InsuranceTechnical.tamin.window.MessageBox.showError('خطا', 'اطلاعات وارد شده کامل نمی باشد.', me);
            return;
        }

        var user = InsuranceTechnical.getApplication().getCache('user');
        var workshopData = me.getViewModel().get('workshopData');
        me.getViewModel().set('user', user);
        me.getViewModel().set('branchCode', user.organization.code);
        var activeRecord = me.getViewModel().get('occurSpec');
        var url = InsuranceTechnical.helper.Urls.getUrl('OccurRep') + '/' + activeRecord.reqId;
        var data;

        var rwworkstart = InsuranceTechnical.tamin.helpers.Persian.formatTime(workshopData.rwworkstart);
        var rwworkfinish = InsuranceTechnical.tamin.helpers.Persian.formatTime(workshopData.rwworkfinish);
        var occurTime = InsuranceTechnical.tamin.helpers.Persian.formatTime(activeRecord.occurTime);

        data = {
            actionType: '0',
            reqId: activeRecord.reqId,
            isutel: activeRecord.isutel !== null ? activeRecord.isutel : '',
            isuaddr: activeRecord.isuaddr !== null ? activeRecord.isuaddr : '',
            workshopId: workshopData.workshopId,
            workshopName: workshopData.workshopName ,
            isuJobLocation: workshopData.isuJobLocation ,
            rwworkstart: rwworkstart,
            rwworkfinish: rwworkfinish,
            employeedate: workshopData.employeedate instanceof Date ? workshopData.employeedate.getTime() : new Date(workshopData.employeedate).getTime(),
            vehicle: workshopData.vehicle,
            occurDate: activeRecord.occurDate instanceof Date ? activeRecord.occurDate.getTime() : new Date(activeRecord.occurDate).getTime(),
            occurTime: occurTime,
            occurAddr: activeRecord.occurAddr,
            occurJobdesc: activeRecord.occurJobdesc,
            occurDesc: activeRecord.occurDesc,
            repNo: activeRecord.repNo,
            repdate: activeRecord.repdate instanceof Date ? activeRecord.repdate.getTime() : new Date(activeRecord.repdate).getTime(),
            rwshBranch: {
                branchCode: activeRecord.insBrchCode
            }
        };

        me.lookupReference('occur-spec-edit-ref').mask('در حال ویرایش اطلاعات ...');
        Ext.Ajax.request({
            url: url,
            method: 'PUT',
            jsonData: data,
            success: function (response, opts) {
                me.getViewModel().getStore('occurSpecListStore').reload();
                me.resetOccurForm(true);
                me.lookupReference('occur-spec-edit-ref').unmask();
                var message = 'درخواست شما با موفقیت ,ویرایش گردید . ';
                InsuranceTechnical.tamin.window.MessageBox.showInfo('پیام سیستم', message);
                btn.up('window').close()
            },
            failure: function (response, opts) {
                me.lookupReference('occur-spec-edit-ref').unmask();
                var resp = Ext.decode(response.responseText);
                InsuranceTechnical.tamin.window.MessageBox.showError('خطا', resp.data.message);
            }
        });
    },
    onDeleteButton: function (view, rowIndex, colIndex, item, e, rec, row, action) {
        
        var me = this;
        
        var recordData = rec.data;
        Ext.Msg.confirm('پيام سيستم', 'آيا اطمينان داريد؟', function (id, value) {
            if (id === 'yes') {
                Ext.Ajax.request({
                    url: InsuranceTechnical.helper.Urls.getUrl('OccurRep') +
                    '/' + recordData.reqId,
                    method: 'DELETE',
                    callback: function (options, success, response) {
                        if (success) {
                            me.getViewModel().getStore('occurSpecListStore').reload();
                            InsuranceTechnical.tamin.window.MessageBox.showInfo('پيغام', 'رکورد با موفقيت حذف شد. ');
                        } else {
                            InsuranceTechnical.tamin.window.MessageBox.showError('خطا', Ext.decode(response.responseText).data.message);
                        }
                    }
                });
            }
        });

    },
    OnOccurOtherBrhLetterButton: function (btn) {
        var me = this;
        var reqId = this.getViewModel().get('reqId');
        var form = Ext.getCmp('occur-other-brh-letter-form');
        var user = InsuranceTechnical.getApplication().getCache('user');
        var occurSpec = me.getViewModel().get('occurSpec');
        me.getViewModel().set('user', user);
        me.getViewModel().set('branchCode', user.organization.code);
        var activeRecord = me.getViewModel().get('occurotherbrhletter');
        if (!form.isFormValid()) {
            InsuranceTechnical.tamin.window.MessageBox.showError('خطا', 'اطلاعات وارد شده کامل نمی باشد.', me);
            return;
        } else {
            if (activeRecord.brchReviewer.branchCode === occurSpec.brchCode.branchCode) {
                InsuranceTechnical.tamin.window.MessageBox.showError('خطا', 'شعبه ثبت کننده با شعبه بررسی کننده یکسان میباشد .', me);
                return;
            }
            if (activeRecord.brchReviewer.branchCode === user.organization.code) {
                InsuranceTechnical.tamin.window.MessageBox.showError('خطا', 'شعبه ارجاع دهنده با شعبه بررسی کننده یکسان میباشد .', me);
                return;
            }
            var data = {
                reqId: reqId,
                brchReviewer: {
                    branchCode: activeRecord.brchReviewer.branchCode
                },
                actionType: '1'
            };
            var url = InsuranceTechnical.helper.Urls.getUrl('OccurRep') + '/' + reqId;
            me.lookupReference('occur-other-brh-letter-ref').mask('در حال ویرایش اطلاعات ...');
            Ext.Ajax.request({
                url: url,
                method: 'PUT',
                jsonData: data,
                success: function (response, opts) {
                    me.getViewModel().getStore('occurSpecListStore').reload();
                    me.lookupReference('occur-other-brh-letter-ref').unmask();
                    me.getViewModel().set('occurotherbrhletter', null);
                    var message = 'درخواست شما با موفقیت ارجاع گردید . ';
                    InsuranceTechnical.tamin.window.MessageBox.showInfo('پیام سیستم', message);
                    btn.up('window').close();
                },
                failure: function (response, opts) {
                    me.lookupReference('occur-other-brh-letter-ref').unmask();
                    var resp = Ext.decode(response.responseText);
                    InsuranceTechnical.tamin.window.MessageBox.showError('خطا', resp.data.message);
                }

            });
        }
    },
    onAddOccurReviewButton: function (button) {
        var record = button.up('button').getWidgetRecord().data;
        if (!record.workshopId) {
            InsuranceTechnical.tamin.window.MessageBox.showError('خطا', 'لطفا پیش از اقدام نسبت به اصلاح درخواست توسط شعبه مبدا اقدام گردد .');
            return;
        }
        this.redirectTo('occur-review/' + record.reqId + '_');
    },
    OnOccurIdeaLstButton: function (btn) {
        var me = this;
        var recordData = btn.up('button').getWidgetRecord().data;
        var orgCode = InsuranceTechnical.getApplication().getCache('organizationCode');
        if (orgCode !== recordData.brchReviewer.branchCode) {
            this.getViewModel().set('iFlag', true);
        } else {
            this.getViewModel().set('iFlag', false);
        }
        var win = me.lookupReference('occur-idea-ref');
        if (!win) {
            win = Ext.create("InsuranceTechnical.view.occur.OccurIdea");
            this.getView().add(win);
        }

        if (recordData.insuranceSpec !== null) {
            Ext.getCmp('firstName').setValue(recordData.insuranceSpec.firstName);
            Ext.getCmp('lastName').setValue(recordData.insuranceSpec.lastName);
        }
        me.getViewModel().set('occurIdea', recordData);

        var store = this.getViewModel().getStore('occurIdeaStore');
        var filters = [];
        filters.push({
            property: 'reqId', value: recordData.reqId, operator: 'eq'
        });

        store.clearFilter(true);
        store.addFilter(filters, true);
        store.load();
        win.setTitle("گزارش بازرس و نظریه مسئول فنی");
        win.show();
        win.center();
    },
    occurInspConfButton: function (btn) {
        var me = this;
        refrence = 'new-occur-idea-ref';
        winPath = 'InsuranceTechnical.view.occur.OccurInspConf';
        var user = InsuranceTechnical.getApplication().getCache('user');
        var recordDataGrid = btn.up('button').getWidgetRecord().data;
        InsuranceTechnical.getApplication().addCache('recordDataGrid', recordDataGrid);
        var win = me.lookupReference('new-occur-idea-ref');
        if (!win) {
            win = Ext.create("InsuranceTechnical.view.occur.OccurInspConf");
            this.getView().add(win);
        }

        me.getViewModel().set('personalData.firstName', user.firstName);
        me.getViewModel().set('personalData.lastName', user.lastName);
        if (me.getViewModel().get('iFlag')) {
            me.getViewModel().set('lockInspSave', true);
        } else {
            me.getViewModel().set('lockInspSave', false);
        }
        this.getViewModel().set('occurinspconf', recordDataGrid);
        win.setTitle("نظریه مسئول فنی");
        win.show();
        win.center();
    },
    saveNewOccurIdea: function (btn) {
        var me = this;
        var form = Ext.getCmp('new-occur-idea-form');
        var recordData = me.getViewModel().get('occurIdea');
        var activeRecord = me.getViewModel().get('newOccIdea');
        var user = InsuranceTechnical.getApplication().getCache('user');
        me.getViewModel().set('user', user);
        me.getViewModel().set('branchCode', user.organization.code);

        if (!form.isFormValid()) {
            InsuranceTechnical.tamin.window.MessageBox.showError('خطا', 'اطلاعات وارد شده کامل نمی باشد.', me);
            return;
        }

        var urlgetOccurideaSeq = InsuranceTechnical.helper.Urls.getUrl('Occur') + '/getOccurideaSeq' +
            '?reqId=' + recordData.reqId;
        var ideaSeq;
        var occurSerial = recordData.ssupOccurReview.occurSerial;
        this.lookupReference('new-occur-idea-ref').mask('در حال ذخیره اطلاعات ...');
        Ext.Ajax.request({
            url: urlgetOccurideaSeq,
            method: 'GET',
            callback: function (options, success, response) {
                if (success) {
                    if (response.responseText !== "") {
                        ideaSeq = Ext.decode(response.responseText).data;
                        var data = {
                            reqId: recordData.reqId,
                            ideaSeq: ideaSeq,
                            occurSerial: occurSerial,
                            techinspdate: activeRecord.techinspdate instanceof Date ? activeRecord.techinspdate.getTime() : new Date(activeRecord.techinspdate).getTime(),
                            fulltechinspreport: activeRecord.fulltechinspreport,
                            techinspinwork: activeRecord.techinspinwork,
                            brchCode: user.organization.code
                        };

                        var url = InsuranceTechnical.helper.Urls.getUrl('SsupOccurIdea');
                        Ext.Ajax.request({
                            url: url,
                            method: 'POST',
                            jsonData: data,
                            success: function (response, opts) {
                                me.getViewModel().getStore('occurIdeaStore').reload();
                                if (activeRecord.techinspinwork === '3') me.getViewModel().getStore('occurSpecListStore').reload();
                                me.lookupReference('new-occur-idea-ref').unmask();
                                var message = ' گزارش بازرس با موفقیت ثبت گردید . ';
                                InsuranceTechnical.tamin.window.MessageBox.showInfo('پیام سیستم', message);
                                me.getViewModel().set('newOccIdea', {});
                                btn.up('window').close();
                            },
                            failure: function (response, opts) {
                                me.lookupReference('new-occur-idea-ref').unmask();
                                var resp = Ext.decode(response.responseText);
                                InsuranceTechnical.tamin.window.MessageBox.showError('خطا', resp.data.message);
                            }
                        });
                    }
                }
                else {
                    InsuranceTechnical.tamin.window.MessageBox.showError('خطا', Ext.decode(response.responseText).data.message);
                }
            }
        });
    },
    saveOccurInspConfButton: function (btn) {
        var me = this;
        var form = Ext.getCmp('occur-insp-conf-form');
        var recordDataGrid = InsuranceTechnical.getApplication().getCache('recordDataGrid');

        var activeRecord = me.getViewModel().get('occurinspconf');

        if (!form.isFormValid()) {
            InsuranceTechnical.tamin.window.MessageBox.showError('خطا', 'اطلاعات وارد شده کامل نمی باشد.', me);
            return;
        }
        var user = InsuranceTechnical.getApplication().getCache('user');
        me.getViewModel().set('user', user);
        me.getViewModel().set('branchCode', user.organization.code);
        var data = {
            /*reqId: recordDataGrid.reqId,
            ideaSeq: recordDataGrid.ideaSeq,
            occurSerial: recordDataGrid.occurSerial,*/
            // bossInwork: activeRecord.bossInwork,
            bossStatus: activeRecord.bossStatus,
            bossRemark: activeRecord.bossRemark,
            // techinspinwork: recordDataGrid.techinspinwork,
            // techinspdate: recordDataGrid.techinspdate instanceof Date ? recordDataGrid.techinspdate.getTime() : new Date(recordDataGrid.techinspdate).getTime(),
            brchCode: user.organization.code,
            reqType: 2
        };
        this.lookupReference('occur-insp-conf-ref').mask('در حال ذخیره اطلاعات ...');
        var urlSave = InsuranceTechnical.helper.Urls.getUrl('SsupOccurIdea') + "/" + recordDataGrid.reqId + "/" + recordDataGrid.ideaSeq;
        Ext.Ajax.request({
            url: urlSave,
            method: 'PUT',
            jsonData: data,
            success: function (response, opts) {
                me.getViewModel().getStore('occurIdeaStore').reload();
                me.getViewModel().getStore('occurSpecListStore').reload();
                Ext.getBody().unmask();
                form.reset();
                var message = ' گزارش مسئول فنی با موفقیت ثبت گردید . ';
                InsuranceTechnical.tamin.window.MessageBox.showInfo('پیام سیستم', message);
                btn.up('window').close();
            },
            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
                Ext.getBody().unmask();
            }

        });
    },
    onOccurInspConfDeleteButton: function (btn) {
        var me = this;
        var recordData = btn.up('button').getWidgetRecord().data;
        Ext.Msg.confirm('پيام سيستم', 'آيا اطمينان داريد؟', function (id, value) {
            if (id === 'yes') {
                Ext.Ajax.request({
                    url: InsuranceTechnical.helper.Urls.getUrl('SsupOccurIdea') + "/" + recordData.reqId + "/" + recordData.ideaSeq,
                    method: 'DELETE',
                    callback: function (options, success, response) {
                        if (success) {
                            me.getViewModel().getStore('occurIdeaStore').reload();
                            InsuranceTechnical.tamin.window.MessageBox.showInfo('پيغام', 'گزارش با موفقيت حذف شد. ');
                        } else {
                            InsuranceTechnical.tamin.window.MessageBox.showError('خطا', Ext.decode(response.responseText).data.message);
                        }
                    }
                });
            }
        });

    },
    printOccurRewiveReports: function (button) {
        var me = this;
        var user = InsuranceTechnical.getApplication().getCache('user');
        var win = me.lookupReference('occur-signature-upload');
        this.checkSignature(user.nationalCode).then( function() {
            var url = InsuranceTechnical.helper.Urls.getUrl('OccurReviewReport') +
                "?reqId=" +  me.getViewModel().get('occurIdea').reqId;
            Ext.create('InsuranceTechnical.tamin.window.PdfViewer', {url: url}).show();
        }).catch(function () {
            if (!win) {
                win = Ext.create('InsuranceTechnical.view.occur.OccurSignatureUploadPopup');
                win.setViewModel({
                    data: me.getViewModel().data
                });
            }
            me.getView().add(win);
            win.getViewModel().set('action', 'sendOccurIdeaReports');
            win.show();
            win.center();
        });
    },
    printOccurIdeaReports: function (button) {
        var me = this;
        var user = InsuranceTechnical.getApplication().getCache('user');
        var win = me.lookupReference('occur-signature-upload');
        var grid = Ext.getCmp('OccurIdea');
        var selection = grid.getSelectionModel().getSelection()[0];
        if (grid.getSelection().length === 0) {
            InsuranceTechnical.tamin.window.MessageBox.showError('خطا', 'یک مورد از لیست بالا می بایست انتخاب گردد.         ');
            return;
        }
        this.checkSignature(user.nationalCode).then( function() {
            var url = InsuranceTechnical.helper.Urls.getUrl('OccurIdeaReport') +
                "?reqId=" + selection.data.reqId + "&ideaSeq=" + selection.data.ideaSeq;
            Ext.create('InsuranceTechnical.tamin.window.PdfViewer', {url: url}).show();
        }).catch(function () {
            if (!win) {
                win = Ext.create('InsuranceTechnical.view.occur.OccurSignatureUploadPopup');
                win.setViewModel({
                    data: me.getViewModel().data
                });
            }
            me.getView().add(win);
            win.getViewModel().set('action', 'sendOccurIdeaReports');
            win.show();
            win.center();
        });
    },
    sendOccurReviewReports: function (button) {
        var me = this;
        var user = InsuranceTechnical.getApplication().getCache('user');
        var win = me.lookupReference('occur-signature-upload');
        var rootWin = me.lookupReference('occur-idea-ref');
        this.checkSignature(user.nationalCode).then( function() {
            var url = InsuranceTechnical.helper.Urls.getUrl('OccurReviewReport')
                + "?reqId=" + me.getViewModel().get('occurIdea').reqId
                + "&nationalCode=" + me.getViewModel().get('occurIdea.insuranceSpec.nationalId')
                + "&branchCode=" + me.getViewModel().get('occurIdea.insuranceSpec.brchCode');
            rootWin.mask('لطفا منتظر بمانيد...');
            Ext.Ajax.request({
                url: url,
                method: 'POST',
                success: function (response) {
                    rootWin.unmask();
                    InsuranceTechnical.tamin.window.MessageBox.showInfo('پیام سیستم', 'ارسال با موفقیت انجام شد.');
                },
                failure: function (record, operation) {
                    rootWin.unmask();
                    InsuranceTechnical.tamin.window.MessageBox.showError('خطا', 'ارسال مدرک با خطا مواجه شد!');
                }
            });
        }).catch(function () {
            if (!win) {
                win = Ext.create('InsuranceTechnical.view.occur.OccurSignatureUploadPopup');
                win.setViewModel({
                    data: me.getViewModel().data
                });
            }
            me.getView().add(win);
            win.getViewModel().set('action', 'sendOccurReviewReports');
            win.show();
            win.center();
        });
    },
    sendOccurIdeaReports: function (button) {
        var me = this;
        var grid = Ext.getCmp('OccurIdea');
        var selection = grid.getSelectionModel().getSelection()[0];
        if (grid.getSelection().length === 0) {
            InsuranceTechnical.tamin.window.MessageBox.showError('خطا', 'یک مورد از لیست بالا می بایست انتخاب گردد.         ');
            return;
        }
        var user = InsuranceTechnical.getApplication().getCache('user');
        var win = me.lookupReference('occur-signature-upload');
        var rootWin = me.lookupReference('occur-idea-ref')
        this.checkSignature(user.nationalCode).then( function() {
            var url = InsuranceTechnical.helper.Urls.getUrl('OccurIdeaReport')
                + "?reqId=" + selection.data.reqId + "&ideaSeq=" + selection.data.ideaSeq
                + "&nationalCode=" + me.getViewModel().get('occurIdea.insuranceSpec.nationalId')
                + "&branchCode=" + me.getViewModel().get('occurIdea.insuranceSpec.brchCode');
            rootWin.mask('لطفا منتظر بمانيد...');
            Ext.Ajax.request({
                url: url,
                method: 'POST',
                success: function (response) {
                    rootWin.unmask();
                    InsuranceTechnical.tamin.window.MessageBox.showInfo('پیام سیستم', 'ارسال با موفقیت انجام شد.');
                },
                failure: function (record, operation) {
                    rootWin.unmask();
                    Ext.Msg.alert('پيام سيستم', 'مدرکی برای این درخواست یافت نشد.');
                }
            });
        }).catch(function () {
            if (!win) {
                win = Ext.create('InsuranceTechnical.view.occur.OccurSignatureUploadPopup');
                win.setViewModel({
                    data: me.getViewModel().data
                });
            }
            me.getView().add(win);
            win.getViewModel().set('action', 'sendOccurIdeaReports');
            win.show();
            win.center();
        });
    },
    NewOccurIdeaButton: function (btn) {
        var me = this;
        var user = InsuranceTechnical.getApplication().getCache('user');
        var win = me.lookupReference('new-occur-idea-ref');
        if (!win) {
            win = Ext.create("InsuranceTechnical.view.occur.NewOccurIdea");
            this.getView().add(win);
        }
        me.getViewModel().set('personalData.firstName', user.firstName);
        me.getViewModel().set('personalData.lastName', user.lastName);
        win.method = 'POST';
        win.setTitle("گزارش بازرس فنی");
        win.show();
        win.center();
    },
    DisplayOccurIdeaButton: function (btn) {
        var me = this;
        var user = InsuranceTechnical.getApplication().getCache('user');
        var win = me.lookupReference('display-occur-idea-ref');
        if (!win) {
            win = Ext.create("InsuranceTechnical.view.occur.DisplayOccurIdea");
            this.getView().add(win);
        }
        win.method = 'POST';
        win.setTitle("گزارش بازرس فنی");
        var recordData = btn.up('button').getWidgetRecord().data;
        me.getViewModel().set('displayOccurIdea', recordData);
        me.getViewModel().set('personalData.firstName', user.firstName);
        me.getViewModel().set('personalData.lastName', user.lastName);
        if (this.getViewModel().get('iFlag') || Number(recordData.bossStatus)) {
            this.getViewModel().set('lockInspSave', true);
        } else {
            this.getViewModel().set('lockInspSave', false);
        }
        if (recordData.bossInwork !== null) {
            Ext.getCmp('saveDisOccurIdea').setDisabled(true);
        }
        InsuranceTechnical.getApplication().addCache('displayOccurIdea', recordData);

        win.show();
        win.center();
    },
    saveDisplayOccurIdeaButton: function (btn) {
        var me = this;
        var form = Ext.getCmp('display-occur-idea-form');

        var recordDataGrid = InsuranceTechnical.getApplication().getCache('displayOccurIdea');
        var activeRecord = me.getViewModel().get('displayOccurIdea');

        if (!form.isFormValid()) {
            InsuranceTechnical.tamin.window.MessageBox.showError('خطا', 'اطلاعات وارد شده کامل نمی باشد.', me);
            return;
        }

        var user = InsuranceTechnical.getApplication().getCache('user');
        me.getViewModel().set('user', user);
        me.getViewModel().set('branchCode', user.organization.code);
        if (!form.isFormValid()) {
            InsuranceTechnical.tamin.window.MessageBox.showError('خطا', 'اطلاعات وارد شده کامل نمی باشد.', me);
            return;
        }

        var data = {
            reqId: recordDataGrid.reqId,
            ideaSeq: recordDataGrid.ideaSeq,
            occurSerial: recordDataGrid.occurSerial,
            fulltechinspreport: activeRecord.fulltechinspreport,
            techinspinwork: activeRecord.techinspinwork,
            techinspdate: activeRecord.techinspdate instanceof Date ? activeRecord.techinspdate.getTime() : new Date(activeRecord.techinspdate).getTime(),
            brchCode: user.organization.code,
            reqType: 1
        };
        this.lookupReference('display-occur-idea-ref').mask('در حال ذخیره اطلاعات ...');
        var urlSave = InsuranceTechnical.helper.Urls.getUrl('SsupOccurIdea') + "/" + recordDataGrid.reqId + "/" + recordDataGrid.ideaSeq;
        Ext.Ajax.request({
            url: urlSave,
            method: 'PUT',
            jsonData: data,
            success: function (response, opts) {
                me.getViewModel().getStore('occurIdeaStore').reload();
                if (activeRecord.techinspinwork === '3') me.getViewModel().getStore('occurSpecListStore').reload();
                me.lookupReference('display-occur-idea-ref').unmask();
                var message = ' گزارش بازرس با موفقیت ویرایش گردید . ';
                InsuranceTechnical.tamin.window.MessageBox.showInfo('پیام سیستم', message);
                btn.up('window').close();
            },
            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
                me.lookupReference('display-occur-idea-ref').unmask();
            }
        });
    },
    OccurWorkInspButton: function (btn) {

        var me = this;
        var occurRep = btn.up('button').getWidgetRecord().data;
        var ssupReview = occurRep.ssupOccurReview;
        var orgCode = InsuranceTechnical.getApplication().getCache('organizationCode');
        if (orgCode !== occurRep.brchReviewer.branchCode) {
            this.getViewModel().set('iFlag', true);
        } else {
            this.getViewModel().set('iFlag', false);
        }
        InsuranceTechnical.getApplication().addCache('recordGridData', occurRep);
        var win = me.lookupReference('occur-work-insp-ref');
        if (!win) {
            win = Ext.create("InsuranceTechnical.view.occur.OccurWorkInsp");
            this.getView().add(win);
        }

        win.setTitle("گزارش مراجع قانونی");
        Ext.getCmp('occur-work-insp-form').reset();
        me.getViewModel().set('occurWorkInspInfo', ssupReview);
        me.getViewModel().set('occurSpec', occurRep);
        win.show();
        win.center();
    },
    openDocumentPopup: function (button) {
        var me = this;
        var occurRep = button.up('button').getWidgetRecord().data;
        var insuranceDetail = occurRep.insuranceSpec;
        me.getViewModel().set('occurDocument', occurRep);

        try {
            insuranceDetail.dateOfBirth = insuranceDetail.dateOfBirth.substring(0, 4)+ '/' + insuranceDetail.dateOfBirth
                .substring(4, 6) + '/' + insuranceDetail.dateOfBirth.substring(6, 8);
        } catch (e) {
            insuranceDetail.dateOfBirth = '-';
        }
        me.getViewModel().set('insuranceDetail', insuranceDetail);

        var win = me.lookupReference('occurDocumentPopup');
        if (!win) {
            win = Ext.create('InsuranceTechnical.view.occur.OccurDocument');
        }
        var url = InsuranceTechnical.helper.Urls.getUrl('OccurDocument') + '?eRepId=' + occurRep.eRepId;
        Ext.getBody().mask('لطفا منتظر بمانيد...');
        Ext.Ajax.request({
            url: url,
            method: 'GET',
            success: function (response) {
                Ext.getBody().unmask();
                var data = Ext.decode(response.responseText).data;
                Ext.each(data, function (item) {
                    if (item !== "") {
                        var files = item.documentFile.image;
                        if (files !== null && files !== "" && files !== undefined) {
                            switch (item.ocurrenceDocumentType.docTypeId) {
                                case "1":
                                    Ext.getCmp('father-death-image').setSrc('data:image/jpeg;base64,' + files);
                                    break;
                                case "2":
                                    Ext.getCmp('divorce-image').setSrc('data:image/jpeg;base64,' + files);
                                    break;
                                case "3":
                                    Ext.getCmp('doctor-image').setSrc('data:image/jpeg;base64,' + files);
                                    break;
                                case "4":
                                    Ext.getCmp('first-main-identity-image').setSrc('data:image/jpeg;base64,' + files);
                                    break;
                                case "5":
                                    Ext.getCmp('second-main-identity-image').setSrc('data:image/jpeg;base64,' + files);
                                    break;
                                case "6":
                                    Ext.getCmp('last-main-identity-image').setSrc('data:image/jpeg;base64,' + files);
                                    break;
                            }
                        }
                    }
                });
                me.getView().add(win);
                win.show();
                win.center();
            },
            failure: function (record, operation) {
                Ext.getBody().unmask();
                Ext.Msg.alert('پيام سيستم', 'مدرکی برای این درخواست یافت نشد .');
            }
        });
    },
    onChangDisbleTextBox: function () {

        var me = this;
        var reqowner = Ext.getCmp('inspworksended').getValue();
        // Ext.getCmp('occur-spec-new-form').reset();
        me.getViewModel().set('inspworksended', reqowner);
    },
    saveOccurWorkInspButton: function (btn) {
        var me = this;
        var form = Ext.getCmp('occur-work-insp-form');

        var recordDataGrid = InsuranceTechnical.getApplication().getCache('recordGridData');
        var activeRecord = me.getViewModel().get('occurWorkInspInfo');
        if (!form.isFormValid()) {
            InsuranceTechnical.tamin.window.MessageBox.showError('خطا', 'اطلاعات وارد شده کامل نمی باشد.', me);
            return;
        }
        if (!this.percentValidator1() && !this.getViewModel().get('disableTextBoxOccurWorkInsp')) {
            InsuranceTechnical.tamin.window.MessageBox.showError('خطا', 'مجموع درصد مقصر حادثه بر اساس گزارش بازرس کار باید 100 درصد باشد.', me);
            return;
        }
        if (!this.percentValidator2()) {
            InsuranceTechnical.tamin.window.MessageBox.showError('خطا', 'مجموع درصد مقصر حادثه بر اساس آراء مراجع قضایی باید 100 درصد باشد.', me);
            return;
        }

        var user = InsuranceTechnical.getApplication().getCache('user');
        me.getViewModel().set('user', user);
        me.getViewModel().set('branchCode', user.organization.code);


        var data = {
            occurSerial: recordDataGrid.ssupOccurReview.occurSerial,
            inspworksended: activeRecord.inspworksended,
            workinspletno: activeRecord.workinspletno,
            workinspletdate: activeRecord.workinspletdate instanceof Date ? activeRecord.workinspletdate.getTime() : new Date(activeRecord.workinspletdate).getTime(),
            wshblameperc: activeRecord.wshblameperc,
            isublameperc: activeRecord.isublameperc,
            otherblameperc: activeRecord.otherblameperc,
            otherblamepercdesc: activeRecord.otherblamepercdesc,

            wshblameperclaw: activeRecord.wshblameperclaw,
            isublameperclaw: activeRecord.isublameperclaw,
            otherblameperclaw: activeRecord.otherblameperclaw,
            otherblamepercdesclaw: activeRecord.otherblamepercdesclaw,
            actionType: '1'
        };
        Ext.getBody().mask('در حال ذخيره اطلاعات ...');
        var url = InsuranceTechnical.helper.Urls.getUrl('SsupOccurReview') + '/' + recordDataGrid.ssupOccurReview.occurSerial;
        Ext.Ajax.request({
            url: url,
            method: 'PUT',
            jsonData: data,
            success: function (response, opts) {
                me.getViewModel().getStore('occurSpecListStore').reload();
                Ext.getBody().unmask();
                me.getViewModel().set('occurWorkInspInfo', null);
                var message = 'گزارش مرجع قانونی با موفقیت ثبت گردید . ';
                InsuranceTechnical.tamin.window.MessageBox.showInfo('پیام سیستم', message);
                btn.up('window').close();
            },
            failure: function (response, opts) {
                var message = 'خطا در ثبت گزارش روی داده!';
                InsuranceTechnical.tamin.window.MessageBox.showError('خطا', message);
                Ext.getBody().unmask();
            }
        });
    },
    printOccurReports: function (button) {
        var form = Ext.getCmp('occur-report').getForm();
        if (!form.isValid()) {
            Ext.Msg.alert('خطا', 'اطلاعات وارد شده کامل نمی باشد.');
            return;
        }
        var url = InsuranceTechnical.helper.Urls.getUrl('OccurReport') +
            "?sDate=" + this.getViewModel().get('report.sDate').getTime()
            + "&eDate=" + this.getViewModel().get('report.eDate').getTime()
            + "&type=" + this.getViewModel().get('report.type');
        Ext.create('InsuranceTechnical.tamin.window.PdfViewer', {url: url}).show();
    },
    openDocumentUploadPopup: function (button) {
        var me = this;
        var occurSpec = button.up('button').getWidgetRecord().data;
        var win = me.lookupReference('occur-doc-upload-ref');
        if (!win) {
            win = Ext.create('InsuranceTechnical.view.occur.OccurDocumentUploadPopup');
            win.setViewModel({
                data: this.getViewModel().data
            });
        }
        this.loadUploadImageStore(occurSpec.reqId, function() {
            me.getView().add(win);
            me.getViewModel().set('occurSpec', occurSpec);
            win.show();
            win.center();
        });
    },
    loadUploadImageStore: function (reqId, callBack) {
        var docStore = this.getViewModel().getStore('occurImageStore');
        docStore.clearFilter();
        docStore.addFilter({
            property: 'reqId',
            value: reqId,
            operator: 'EQUAL'
        });
        Ext.getBody().mask('در حال دریافت اطلاعات ...');
        docStore.load({
            callback: function (records, operation, success) {
                Ext.getBody().unmask();
                if (success) {
                    records.map(function(item) {
                        item = item.data;
                        item['data'] = 'data:image/png;base64,' + item.image;
                        item['uploadDate'] = InsuranceTechnical.tamin.helpers.Persian.gregorianToPersian(new Date(item.uploadDate));
                        item['userName'] = item.userName;
                        delete item.image;
                        delete item.imageString;
                    });
                    if (callBack) {
                        callBack();
                    }
                } else {
                    InsuranceTechnical.tamin.window.MessageBox.showError('پیام سیستم', 'خطا در برقراری ارتباط با سرور');
                }
            }
        });
    },
    documentClick: function (view, record, item, index, e, eOpts) {
        var me = this;
        var win = me.lookupReference('occur-doc-upload-ref');
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
                                var url = InsuranceTechnical.helper.Urls.getUrl('OccurBranchDoc') + '/' + record.data.guid;
                                Ext.Ajax.request({
                                    url: url,
                                    method: 'DELETE',
                                    success: function (res) {
                                        win.unmask();
                                        me.getViewModel().getStore('occurImageStore').remove(record);
                                        setTimeout(function() {
                                            InsuranceTechnical.tamin.window.MessageBox.showInfo('پیام سیستم', 'سند با موفقیت حذف شد');
                                        }, 500);
                                    },
                                    failure: function (response) {
                                        win.unmask();
                                        setTimeout(function() {
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
                    win.getViewModel().set('document.documentName', 'مکاتبات و نظریه ها');
                    win.getViewModel().set('document.documentType', '-');
                    win.getViewModel().set('document.userName', record.data.userName);
                    win.getViewModel().set('document.documentUploadDate', record.data.uploadDate);
                }
                me.getView().add(win);
                setTimeout(function() {
                    Ext.getCmp('previewImage').setSrc(record.data.data);
                    win.show();
                    win.center();
                }.bind(null, win), 500);
                break;
        }
    },
    uploadDocument: function (fileUploadComponent, value, eOpts) {
        var me = this;
        var docStore = me.getViewModel().getStore('occurImageStore');
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
                var images = me.getViewModel().getStore('occurImageStore').data.items;
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
                param.imageString = srcData.split(',')[1];/*.slice(srcData.indexOf('base64,') + 7)*/;
                param.reqId = me.getViewModel().get('occurSpec.reqId');
                param.uploadDate = new Date();
                param.userName = user.nationalCode;
                var url = InsuranceTechnical.helper.Urls.getUrl('OccurBranchDoc');
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
    uploadSignature: function (fileUploadComponent, value, eOpts) {
        var me = this;
        var win = me.lookupReference('occur-signature-upload-ref');
        var docStore = me.getViewModel().getStore('signatureImageStore');
        var file = fileUploadComponent.getEl().down('input[type=file]').dom.files[0];
        var user = InsuranceTechnical.getApplication().getCache('user');
        var action = win.getViewModel().get('action');
        var param = {};
        var rolesArray = [];

        if (file != null && Number(file.size) < 800000) {
            win.mask('در حال بارگذاری سند...');
            var fileReader = new FileReader();
            var srcData = null;
            fileReader.readAsDataURL(file);
            fileReader.onload = function (fileLoadedEvent) {
                srcData = fileLoadedEvent.target.result;
                var data = {};
                data['data'] = srcData;
                data['nationalId'] = user.nationalCode;
                data['branchCode'] = user.organization.code;
                data['uploadDate'] = InsuranceTechnical.tamin.helpers.Persian.gregorianToPersian(new Date());
                data['userName'] = user.firstName + ' ' + user.lastName;
                var images = me.getViewModel().getStore('occurImageStore').data.items;
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
                param.imageString = srcData.split(',')[1];/*.slice(srcData.indexOf('base64,') + 7)*/
                param.reqId = me.getViewModel().get('occurSpec.reqId');
                param.nationalId = data.nationalId;
                param.branchCode = data.branchCode;
                param.uploadDate = new Date();
                param.userName = user.nationalCode;
                Ext.Object.each(user.roles, function (property, item) {
                    if (item !== '') {
                        rolesArray.push(item.roleName);
                    }
                });
                if (!rolesArray.includes('HEAD USER TECHNICAL')
                && !rolesArray.includes('INSPECTOR USER TECHNICAL')) {
                    InsuranceTechnical.tamin.window.MessageBox.showError('پیام سیستم', 'شما فاقد دسترسی لازم می باشید.');
                    win.unmask();
                    win.hide();
                } else {
                    var url = InsuranceTechnical.helper.Urls.getUrl('OccurSignature');
                    Ext.Ajax.request({
                        url: url,
                        method: 'POST',
                        jsonData: param,
                        contentType: false,
                        processData: false,
                        success: function (res) {
                            data['guid'] = Ext.JSON.decode(res.responseText).data;
                            docStore.add(data);
                            win.unmask();
                            win.hide();
                            switch (action) {
                                case 'sendOccurReviewReports':
                                    me.sendOccurReviewReports();
                                    break;
                                case 'sendOccurIdeaReports':
                                    me.sendOccurIdeaReports();
                                    break;
                            }
                            InsuranceTechnical.tamin.window.MessageBox.showInfo('پیام سیستم', 'سند با موفقیت ذخیره شد');
                        },
                        failure: function (response) {
                            win.unmask();
                            InsuranceTechnical.tamin.window.MessageBox.showError('پیام سیستم', 'خطا در بارگذاری سند !');
                        }
                    });
                }
            }
        }
    },
    checkSignature: function (nationalCode, callBack, failCallback) {
        var docStore = this.getViewModel().getStore('signatureImageStore');
        docStore.clearFilter();
        docStore.addFilter({
            property: 'nationalId',
            value: nationalCode,
            operator: 'EQUAL'
        });
        Ext.getBody().mask('در حال بررسی ...');
        return new Promise((resolve, reject) => {
            docStore.load({
                callback: function (records, operation, success) {
                    Ext.getBody().unmask();
                    if (success) {
                        if (records.length > 0) {
                            resolve();
                        } else {
                            reject();
                        }
                    } else {
                        reject();
                        InsuranceTechnical.tamin.window.MessageBox.showError('پیام سیستم', 'خطا در برقراری ارتباط با سرور');
                    }
                }
            });
        });
    },
    percentValidator1: function () {
        return (this.getViewModel().get('occurWorkInspInfo.wshblameperc')
        + this.getViewModel().get('occurWorkInspInfo.isublameperc')
        + this.getViewModel().get('occurWorkInspInfo.otherblameperc') === 100);
    },
    percentValidator2: function () {
        return (this.getViewModel().get('occurWorkInspInfo.wshblameperclaw')
        + this.getViewModel().get('occurWorkInspInfo.isublameperclaw')
        + this.getViewModel().get('occurWorkInspInfo.otherblameperclaw') === 100);
    },
    resetIdentityForm: function (forAll) {
        var id = this.getViewModel().get('personalData.id');
        if (forAll) {
            this.getViewModel().set('personalData', {});
        } else {
            this.getViewModel().set('personalData', {id: id});
        }
    },
    resetOccurForm: function (forAll) {
        // Ext.getCmp('employerName').reset();
        // Ext.getCmp('activitydesc').reset();
        Ext.getCmp('workshopName').reset();
        Ext.getCmp('address').reset();
        this.getViewModel().set('noWorkshopFound', false);
        if (forAll) {
            Ext.getCmp('workshopID').reset();
            this.getViewModel().set('workshopData','{}');
            this.getViewModel().set('personalData', '{}');
            this.getViewModel().set('occurSpec', '{}');
        }
    }
});
