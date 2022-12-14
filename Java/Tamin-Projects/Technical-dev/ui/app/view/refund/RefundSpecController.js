Ext.define('InsuranceTechnical.view.refund.RefundSpecController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.refund-spec-controller',
    init: function () {
        /*var me = this;
        var user = InsuranceTechnical.getApplication().getCache('user');
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
            Ext.getCmp('addButton').setDisabled(true);
            return;
        }*/
    },
//    },
    onSearchButton: function () {
        var me = this;
        var form = Ext.getCmp('refund-form-id');
        var formValues = form.getValues();
        var result = [];
        var orgCode = InsuranceTechnical.getApplication().getCache('organizationCode');
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
                            if (Ext.getCmp('requestDateFrom').getValue().getTime() ===
                                Ext.getCmp('requestDateTo').getValue().getTime()) {
                                var i = result.length;
                                result.push({
                                    id: i,
                                    property: 'requestDate',
                                    value: new Date(value).getTime(),
                                    operator: 'gte'
                                });
                                result.push({
                                    id: ++i,
                                    property: 'requestDate',
                                    value: new Date(new Date(value).getTime() + 60 * 60 * 24 * 1000).getTime(),
                                    operator: 'lte'
                                });
                            } else {
                                result.push({
                                    id: i,
                                    property: 'requestDate',
                                    value: new Date(value).getTime(),
                                    operator: 'gte'
                                });
                            }
                        } else if (Ext.getCmp('requestDateFrom').getValue() !== null &&
                            Ext.getCmp('requestDateTo').getValue() === null) {
                            var i = result.length;
                            result.push({
                                id: i,
                                property: 'requestDate',
                                value: new Date(value).getTime(),
                                operator: 'gte'
                            });
                            result.push({
                                id: ++i,
                                property: 'requestDate',
                                value: new Date(new Date(value).getTime() + 60 * 60 * 24 * 1000).getTime(),
                                operator: 'lte'
                            });
                        }
                        break;
                    case 'requestDateTo':
                        if (Ext.getCmp('requestDateFrom').getValue() !== null &&
                            Ext.getCmp('requestDateTo').getValue() !== null &&
                            (Ext.getCmp('requestDateFrom').getValue().getTime() !== Ext.getCmp('requestDateTo').getValue().getTime())) {
                            var i = result.length;
                            result.push({
                                id: i,
                                property: 'requestDate',
                                value: new Date(value).getTime(),
                                operator: 'lte'
                            });
                        }
                        break;
                    case 'branchCode':
                        if (value.split('-')[0] !== "0000" && value.split('-')[0] === orgCode) {
                            result.push({
                                property: 'branchCode',
                                value: orgCode,
                                operator: 'EQUAL'
                            });
                        } else if (orgCode !== "0000" && value.split('-')[0] !== orgCode) {
                            result.push({
                                property: 'regBranchCode',
                                value: orgCode,
                                operator: 'EQUAL'
                            });
                        } else if (orgCode === "0000" && value.split('-')[0] !== orgCode) {
                            result.push({
                                property: 'branchCode',
                                value: value.split('-')[0],
                                operator: 'EQUAL'
                            });
                        } else if (orgCode === "0000" && value.split('-')[0] === orgCode) {
                            result.push({
                                property: 'branchCode',
                                operator: 'inn'
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
            }
        });
        var store = me.getViewModel().getStore('refundStore');
        store.on('load', function () {
            if (store.getCount() === 0) {
                Ext.Msg.alert('پیام سیستم', 'دیتایی برای مشاهده وجود ندارد ');
            }
        });
        store.clearFilter(true);
        store.addFilter(result);
        store.load();
    },
    onShowAllButton: function (btn) {
        var me = this;
        var form = Ext.getCmp('refund-form-id');
        var store = this.getViewModel().getStore('refundStore');
        store.clearFilter(true);
        store.load();
        var branchCode = form.getValues().branchCode;
        btn.up('form').getForm().reset();
        InsuranceTechnical.getApplication().addCache('organizationCode', branchCode.split('-')[0]);
    },
    initiateRefundInfo: function () {
        this.getViewModel().set('refundInfo', {
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
        this.redirectTo('refund-create-req');
    },
    onCancelAction: function (button) {
        var me = this;
        var record = button.up('button').getWidgetRecord().data;
        Ext.getBody().mask('لطفا منتظر بمانید.');
        record.actionType = arguments[0].name;;
        record.status = '5';
        if (record.requestSerial === null) {
            InsuranceTechnical.tamin.window.MessageBox.showInfo('پیام سیستم', 'اقدام جهت درخواست غیر حضوری ممکن نیست.');
        }
        var store = me.getViewModel().getStore('refundStore');
        var url = InsuranceTechnical.helper.Urls.getUrl('refund') + "/" + record.requestSerial;

        Ext.Ajax.request({
            url: url,
            method: "PUT",
            jsonData: record,
            success: function () {
                Ext.getBody().unmask();
                Ext.Msg.alert('پیغام سیستم', 'درخواست با موفقیت لغو گردید.');
                store.reload();
            },
            failure: function (response) {
                Ext.getBody().unmask();
                var data = '';
                if (response.responseText !== null && response.responseText !== ''
                    && Ext.JSON.decode(response.responseText).data.message !== null
                    && Ext.JSON.decode(response.responseText).data.message !== undefined) {
                    if (Ext.JSON.decode(response.responseText).status === 403) {
                        InsuranceTechnical.tamin.window.MessageBox.showError('پیام سیستم',
                            'محدودیت دسترسی :' + '<br>' + 'شما دسترسی لازم جهت لغو درخواست را ندارید.');
                    } else {
                        me.getViewModel().getStore('refundStore').reload();
                        data = Ext.JSON.decode(response.responseText).data.message;
                        InsuranceTechnical.tamin.window.MessageBox.showError('پیام سیستم', 'خطا :' + '<br>' + data);
                    }
                } else {
                    Ext.Msg.alert('پیام سیستم', 'خطا در برقراری ارتباط با سرور' + '<br/>');
                }
            }
        });
    },
    onAction: function (button) {
        var me = this;
        var container = button.up('refund-spec');
        var name = arguments[0].name; //button.name ??
        //   var win = container.lookupReference('guardianTechnicianOpinionPopup');
        var record = button.up('button').getWidgetRecord().data;
        Ext.getBody().mask('لطفا منتظر بمانید.');
        record.actionType = name;
        if (record.requestSerial === null) {
            InsuranceTechnical.tamin.window.MessageBox.showInfo('پیام سیستم', 'اقدام جهت درخواست غیر حضوری ممکن نیست.');
        }
        var store = me.getViewModel().getStore('refundStore');
        var url = InsuranceTechnical.helper.Urls.getUrl('refund') + "/" + record.requestSerial;

        var dilogConf = {
            title: 'پیام سیستم',
            message: 'آیا مطمئن هستید؟',
            fn: function (button) {
                if (button === 'yes' || button === 'ok') {
                    var message = '';
                    switch (name) {
                        case 'TechOpinion':
                            record.status = '1';
                            message = 'درخواست با موفقیت تایید مسئول فنی شد';
                            break;
                        case 'BranchOpinion':
                            record.status = '3';
                            message = 'درخواست با موفقیت تایید مسئول شعبه شد';
                            break;
                    }
                    Ext.Ajax.request({
                        url: url,
                        method: "PUT",
                        jsonData: record,
                        success: function () {
                            //window.unmask();
                            Ext.getBody().unmask();
                            Ext.Msg.alert('پیغام سیستم', message);
                            store.reload();
                            //window.close();
                        },
                        failure: function (response) {
                            Ext.getBody().unmask();
                            var data = '';
                            var message = '';
                            if (response.responseText !== null && response.responseText !== ''
                                && Ext.JSON.decode(response.responseText).data.message !== null
                                && Ext.JSON.decode(response.responseText).data.message !== undefined) {
                                if (Ext.JSON.decode(response.responseText).status === 403) {
                                    switch (name) {
                                        case 'TechOpinion':
                                            message = 'شما دسترسی مسئول فنی را ندارید';
                                            break;
                                        case 'BranchOpinion':
                                            message = 'شما دسترسی مسئول شعبه را ندارید';
                                            break;
                                        default :
                                            message = 'خطا در انجام عملیات';
                                            break;
                                    }
                                    InsuranceTechnical.tamin.window.MessageBox.showError('پیام سیستم', 'محدودیت دسترسی :' + '<br>' + message);
                                } else {
                                    me.getViewModel().getStore('refundStore').reload();
                                    data = Ext.JSON.decode(response.responseText).data.message;
                                    InsuranceTechnical.tamin.window.MessageBox.showError('پیام سیستم', 'خطا :' + '<br>' + data);
                                }
                            } else {
                                Ext.Msg.alert('پیام سیستم', 'خطا در برقراری ارتباط با سرور' + '<br/>');
                            }
                        }
                    });
                } else if (button === 'no') {
                    record.status = '2';
                    var message = 'درخواست با موفقیت عدم تایید مسئول فنی شد';
                    Ext.Ajax.request({
                        url: url,
                        method: 'PUT',
                        jsonData: record,
                        success: function () {
                            //window.unmask();
                            Ext.getBody().unmask();
                            Ext.Msg.alert('پیغام سیستم', message);
                            store.reload();
                            //window.close();
                        },
                        failure: function (response) {
                            Ext.getBody().unmask();
                            var data = '';
                            var message = '';
                            if (response.responseText !== null && response.responseText !== ''
                                && Ext.JSON.decode(response.responseText).data.message !== null
                                && Ext.JSON.decode(response.responseText).data.message !== undefined) {
                                if (Ext.JSON.decode(response.responseText).status === 403) {
                                    switch (name) {
                                        case 'TechOpinion':
                                            message = 'شما دسترسی مسئول فنی را ندارید';
                                            break;
                                        case 'BranchOpinion':
                                            message = 'شما دسترسی مسئول شعبه را ندارید';
                                            break;
                                        default :
                                            message = 'خطا در انجام عملیات';
                                            break;
                                    }
                                    InsuranceTechnical.tamin.window.MessageBox.showError('پیام سیستم', 'محدودیت دسترسی :' + '<br>' + message);
                                } else {
                                    me.getViewModel().getStore('refundStore').reload();
                                    data = Ext.JSON.decode(response.responseText).data.message;
                                    InsuranceTechnical.tamin.window.MessageBox.showError('پیام سیستم', 'خطا :' + '<br>' + data);
                                }
                            } else {
                                Ext.Msg.alert('پیام سیستم', 'خطا در برقراری ارتباط با سرور' + '<br/>');
                            }
                        }
//                        callback: function (options, success, response) {
//                            Ext.getBody().unmask();
//                            if (success) {
//                                Tamin.window.MessageBox.showInfo('پیام سیستم', 'اطلاعات با موفقیت لغو تایید نهایی شد');
//                                store.reload();
//                            } else {
//
//                            }
//                        }
                    });
                } else if (button === 'cancel') {
                    Ext.getBody().unmask();
                }
            }
        };

        if (name === 'TechOpinion') {
            dilogConf.buttons = Ext.Msg.YESNOCANCEL;
            dilogConf.buttonText = {
                yes: 'تایید',
                no: 'عدم تایید',
                cancel: 'انصراف'
            }
        } else {
            dilogConf.buttons = Ext.Msg.OKCANCEL;
            dilogConf.buttonText = {
                ok: 'تایید',
                cancel: 'انصراف'
            }
        }
        Ext.Msg.show(dilogConf);
    },
    saveData: function (refundData) {
        window.mask('لطفا منتظر بمانید...');
        var me = this;
        var actionType = refundData.actionType;

        Ext.Ajax.request({
            url: InsuranceTechnical.helper.Urls.getUrl('refund') + "/" + refundData.requestSerial,
            method: "PUT",
            jsonData: refundData,
            success: function () {
                window.unmask();
                Ext.Msg.alert('پیغام سیستم', 'درخواست با موفقیت ذخیره شد');
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
                        me.getViewModel().getStore('refundStore').reload();
                        data = Ext.JSON.decode(response.responseText).data.message;
                        InsuranceTechnical.tamin.window.MessageBox.showError('پیام سیستم', 'خطا :' + '<br>' + data);
                    }
                } else {
                    Ext.Msg.alert('پیام سیستم', 'خطا در برقراری ارتباط با سرور' + '<br/>');
                }
            }
        });
    },
//    onEditButton: function (view, rowIndex, colIndex, item, e, rec, row, action) {
//
//        var record = rec.data;
//        var nationalId = record.nationalCode;
//        var requestSerial = record.reqSerial;
//        this.redirectTo('guardian-create-req/' + requestSerial + '_' + nationalId, false);
//    },
//    fetchRefundData: function (reqSerial, callBack) {
//        var me = this;
//        Ext.getBody().mask('لطفا منتظر بمانید...');
//
//        Ext.Ajax.request({
//            url: InsuranceTechnical.helper.Urls.getUrl('GuardianOtherBranch')
//                    + '?reqSerial=' + reqSerial,
//            method: 'GET',
//            success: function (response) {
//                Ext.getBody().unmask();
//                var info = Ext.JSON.decode(response.responseText).data;
//                me.getViewModel().set('guardianInfo', info);
//                // me.getViewModel().set('guardianInfo.insuranceRegisteration.doB',info!=null ? InsuranceTechnical.tamin.helpers.Persian.gregorianToPersian(new Date(info.birthDate)):'');
//
//                callBack();
//
//
//            },
//            failure: function () {
//                Ext.getBody().unmask();
//
//            }
//        });
//    },  

    onDeleteButton: function (view, rowIndex, colIndex, item, e, record, row, action) {
        // var record = arguments[0].up('tgrid').getStore().getAt(rowIndex);
        if (record.data.eRequestId !== null) {
            InsuranceTechnical.tamin.window.MessageBox.showInfo('پیام سیستم', ' حذف درخواست های غیر حضوری ممکن نیست.');
        }
        var storeListItemInfo = this.getViewModel().getStore('refundStore');
        var url = InsuranceTechnical.helper.Urls.getUrl('refund') + "/" + record.data.requestSerial;
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
    onEditButton: function (view, rowIndex, colIndex, item, e, rec, row, action) {
        var record = rec.data;
        this.redirectTo('refund-create-req/' + record.requestSerial + '_' + record.nationalId);
    },
});
