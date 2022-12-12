Ext.define('InsuranceTechnical.view.brokerWage.BrokerWageSpecController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.broker-wage-spec-controller',
    init: function () {
        var me = this;
        var orgCode = InsuranceTechnical.getApplication().getCache('organizationCode');
        me.getViewModel().set('lockNew', orgCode === '0000');
        me.getViewModel().set('brokerWageSpec', {});
        me.getViewModel().set('disableProvince', false);
        me.getViewModel().set('disableBranch', false);
        me.getViewModel().set('disableBroker', false);
        me.getViewModel().set('onLoading', true);
        if (orgCode !== '0000') {
            var url = InsuranceTechnical.helper.Urls.getUrl('getBranchDetailInfo');
            Ext.getBody().mask('لطفا منتظر بمانید...');
            Ext.Ajax.request({
                url: url,
                method: 'GET',
                success: function (response, opts) {
                    var object = JSON.parse(response.responseText);
                    var info = object.data;
                    me.getViewModel().set('disableProvince', info.province !== null);
                    me.getViewModel().set('disableBranch', info.branch !== null);
                    me.getViewModel().set('disableBroker', info.broker !== null);
                    switch (info.branchKind) {
                        // شعبه
                        case '1':
                            me.setStoreAndCombos(info.province.provinceCode, info.branch.branchCode, null).then(function (done) {
                                me.getViewModel().set('onLoading', false);
                                me.getViewModel().set('brokerWageSpec.province', info.province.provinceCode);
                                me.getViewModel().set('brokerWageSpec.branchCode', info.branch.branchCode);
                                Ext.getBody().unmask();
                            }).catch(function (e) {
                                InsuranceTechnical.tamin.window.Window.retry(3);
                            });
                            break;
                        // اداره کل
                        case '2':
                            me.setStoreAndCombos(info.province.provinceCode, null, null).then(function (done) {
                                me.getViewModel().set('onLoading', false);
                                me.getViewModel().set('brokerWageSpec.province', info.province.provinceCode);
                                Ext.getBody().unmask();
                            }).catch(function (e) {
                                InsuranceTechnical.tamin.window.Window.retry(3);
                            });
                            break;
                        // کارگزاری
                        case '5':
                            me.setStoreAndCombos(info.province.provinceCode, info.branch.branchCode, info.broker.branchCode).then(function (done) {
                                me.getViewModel().set('onLoading', false);
                                me.getViewModel().set('brokerWageSpec.province', info.province.provinceCode);
                                me.getViewModel().set('brokerWageSpec.branchCode', info.branch.branchCode);
                                me.getViewModel().set('brokerWageSpec.brokerCode', info.branch.branchCode);
                                Ext.getBody().unmask();
                            }).catch(function (e) {
                                InsuranceTechnical.tamin.window.Window.retry(3);
                            });
                            break;
                        // ستاد
                        case '7':
                            break;
                    }
                },
                failure: function (response, opts) {
                    Ext.getBody().unmask();
                    InsuranceTechnical.tamin.window.Window.retry(3);
                }
            });
        }
    },
    setStoreAndCombos: function (provinceCode, branchCode, brokerCode) {
        var me = this;
        var provinceStore = me.getStore('provinceStore');
        var branchStore = me.getStore('branchStore');
        var brokerStore = me.getStore('brokerStore');
        var isOnDetailPage = false;
        if (me.lookupReference('broker-wage-detail-ref')) {
            isOnDetailPage = true;
        }
        branchStore.addFilter([{
            property: 'branchKind',
            value: '1',
            operator: 'EQUAL'
        }, {
            property: 'branchCode',
            value: branchCode,
            operator: 'EQUAL'
        }]);
        brokerStore.addFilter([{
            property: 'branchKind',
            value: '5',
            operator: 'EQUAL'
        }, {
            property: 'branchCode',
            value: brokerCode,
            operator: 'EQUAL'
        }]);
        provinceStore.addFilter([{
            property: 'provinceCode',
            value: provinceCode,
            operator: 'EQUAL'
        }]);
        return new Promise((resolve, reject) => {
            provinceStore.load({
                callback: function (provinceRecord, operation, success) {
                    if (success) {
                        if (provinceRecord.length > 0) {
                            if (isOnDetailPage) {
                                Ext.getCmp('provinceDetail').setValue(provinceRecord[0]);
                            } else {
                                Ext.getCmp('province').setValue(provinceRecord[0]);
                            }
                            if (branchCode) {
                                branchStore.load({
                                    callback: function (branchRecord, operation, success) {
                                        if (success) {
                                            if (branchRecord.length > 0) {
                                                if (isOnDetailPage) {
                                                    Ext.getCmp('branchDetail').setValue(branchRecord[0]);
                                                } else {
                                                    Ext.getCmp('branchSpec').setValue(branchRecord[0]);
                                                }
                                                if (brokerCode) {
                                                    brokerStore.load({
                                                        callback: function (brokerRecord, operation, success) {
                                                            if (success) {
                                                                if (brokerRecord.length > 0) {
                                                                    if (isOnDetailPage) {
                                                                        Ext.getCmp('brokerDetail').setValue(brokerRecord[0]);
                                                                    } else {
                                                                        Ext.getCmp('brokerSpec').setValue(brokerRecord[0]);
                                                                    }
                                                                    resolve(true);
                                                                } else {
                                                                    reject();
                                                                }
                                                            } else {
                                                                reject();
                                                            }
                                                        }
                                                    });
                                                } else {
                                                    resolve(true);
                                                }
                                            } else {
                                                reject();
                                            }
                                        } else {
                                            reject();
                                        }
                                    }
                                });
                            } else {
                                resolve(true);
                            }
                        } else {
                            reject();
                        }
                    } else {
                        reject();
                    }
                }
            });
        });
    },
    onAddButton: function (button) {
        var me = this;
        var win = this.lookupReference('broker-wage-new-rep-ref');
        if (!win) {
            win = Ext.create("InsuranceTechnical.view.brokerWage.BrokerWageNewRepPopUp");
            this.getView().add(win);
        }
        Ext.getCmp('startDate').setMaxValue(new Date());
        Ext.getCmp('endDate').setMaxValue(new Date());
        win.show();
        win.center();
        me.getViewModel().set('onLoading', true);
        setTimeout(function() {
            Ext.getCmp('branchNew').setValue(Ext.getCmp('branchSpec').getSelection());
            Ext.getCmp('brokerNew').setValue(Ext.getCmp('brokerSpec').getSelection());
            me.getViewModel().set('onLoading', false);
        }, 100);
    },
    onCancelButton: function (btn) {
        var win = btn.up('window');
        win.close();
    },
    saveNewReport: function (btn) {
        var me = this;
        var reference = 'broker-wage-new-rep-ref';
        var form = Ext.getCmp('broker-wage-new-rep-form');
        if (!form.isFormValid()) {
            InsuranceTechnical.tamin.window.MessageBox.showError('خطا', 'اطلاعات وارد شده کامل نمی باشد.', this);
            return;
        }

        var brokerWageSpec = this.getViewModel().get('brokerWageSpec');
        var json = {
            startDate: InsuranceTechnical.tamin.helpers.Persian.gregorianToPersian(new Date(brokerWageSpec.startDate)).split("/").join(""),
            endDate: InsuranceTechnical.tamin.helpers.Persian.gregorianToPersian(new Date(brokerWageSpec.endDate)).split("/").join(""),
            branchCode: brokerWageSpec.branchCode ? brokerWageSpec.branchCode : null,
            brokerCode: brokerWageSpec.brokerCode ? brokerWageSpec.brokerCode : null
        };
        var url = InsuranceTechnical.helper.Urls.getUrl('brokerWageReportSave');
        this.lookupReference(reference).mask('در حال ذخیره اطلاعات ...');
        Ext.Ajax.request({
            url: url,
            method: 'POST',
            jsonData: json,
            success: function (response, opts) {
                me.lookupReference(reference).unmask();
                me.getStore('brokerWageSpecStore').reload();
                InsuranceTechnical.tamin.window.MessageBox.showInfo('پیام سیستم', 'گزارش شما با موفقیت استخراج گردید.');
                btn.up('window').close();
            },
            failure: function (response, opts) {
                me.lookupReference(reference).unmask();
                InsuranceTechnical.tamin.window.MessageBox.showError('خطا', 'خطا در استخراج گزارش!');
            }
        });
    },
    reportConfirm: function (button) {
        var me = this;
        var json = button.up('button').getWidgetRecord().data;
        var name = arguments[0].name;
        Ext.getBody().mask('لطفا منتظر بمانید.');
        if (json.reportId === null) {
            InsuranceTechnical.tamin.window.MessageBox.showInfo('پیام سیستم', 'اقدام جهت درخواست غیر حضوری ممکن نیست.');
        }
        var url = InsuranceTechnical.helper.Urls.getUrl('brokerWageReportConfirm') + "/" + json.reportId;
        Ext.Msg.show({
            title: 'پیام سیستم',
            message: 'آیا مطمئن هستید؟',
            buttons: Ext.Msg.YESNO,
            buttonText: {
                yes: 'تایید',
                no: 'انصراف'
            },
            fn: function (button) {
                if (button === 'yes') {
                    Ext.Ajax.request({
                        url: url,
                        method: "PUT",
                        jsonData: {},
                        success: function () {
                            Ext.getBody().unmask();
                            Ext.Msg.alert('پیغام سیستم', 'تایید گزارش با موفقیت انجام شد.');
                            me.getStore('brokerWageSpecStore').reload();
                        },
                        failure: function (response) {
                            Ext.getBody().unmask();
                            var data = '';
                            if (response.responseText !== null && response.responseText !== ''
                                && Ext.JSON.decode(response.responseText).data.message !== null
                                && Ext.JSON.decode(response.responseText).data.message !== undefined) {
                                if (Ext.JSON.decode(response.responseText).status === 403) {
                                    InsuranceTechnical.tamin.window.MessageBox.showError('پیام سیستم', 'محدودیت دسترسی :' + '<br>'
                                        + 'شما دسترسی لازم ندارید ندارید');
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
                    Ext.getBody().unmask();
                }
            }
        });
    },
    queryProvince: function (queryEvent) {
        this.getStore('provinceStore').clearFilter(true);
        this.getStore('branchStore').clearData(true);
    },
    queryBranchSpec: function (queryEvent) {
        var me = this;
        var filters = [];
        var branchCode = '';
        me.getStore('branchStore').clearFilter(true);
        me.getStore('brokerStore').clearData(true);
        var provinceCode = me.getViewModel().get('brokerWageSpec.province');
        if (me.lookupReference('broker-wage-detail-ref')) {
            branchCode = Ext.getCmp('branchDetail').getValue();
        } else if (me.lookupReference('broker-wage-new-rep-ref')) {
            branchCode = Ext.getCmp('branchNew').getValue();
        } else {
            branchCode = Ext.getCmp('branchSpec').getValue();
        }
        if (branchCode) {
            branchCode = branchCode.split('-')[0];
            filters.push({
                property: 'branchCode',
                value: branchCode,
                operator: 'LIKE'
            });
        }
        if (provinceCode) {
            filters.push({
                property: 'provinceCode',
                value: provinceCode,
                operator: 'EQUAL'
            });
        }
        filters.push({
            property: 'branchKind',
            value: '1',
            operator: 'EQUAL'
        });
        queryEvent.query = JSON.stringify(filters);
        return queryEvent;
    },
    /*queryBranch: function (queryEvent) {
        this.getStore('branch').clearFilter(true);
        var filters = [];
        var branchCode = this.getViewModel().get('brokerWageSpec.branchCode');
        if (branchCode) {
            var val = branchCode.split('-')[0];
            if (val) {
                filters.push({
                    property: 'branchCode',
                    value: val + '*',
                    operator: 'LIKE'
                });
            }
        }
        filters.push({
            property: 'branchKind',
            value: '1',
            operator: 'EQUAL'
        });
        queryEvent.filter = JSON.stringify(filters);
        return queryEvent;
    },*/
    queryBroker: function (queryEvent) {
        var me = this;
        var filters = [];
        var brokerCode = '';
        me.getStore('brokerStore').clearFilter(true);
        var pBranchCode = me.getViewModel().get('brokerWageSpec.branchCode');
        if (me.lookupReference('broker-wage-detail-ref')) {
            brokerCode = me.getViewModel().get('brokerWageDetail.brokerCode')
        } else if (me.lookupReference('broker-wage-new-rep-ref')) {
            brokerCode = Ext.getCmp('brokerNew').getValue();
        } else {
            brokerCode = Ext.getCmp('brokerSpec').getValue();
        }
        if (brokerCode) {
            brokerCode = brokerCode.split('-')[0];
            filters.push({
                property: 'branchCode',
                value: brokerCode,
                operator: 'LIKE'
            });
        }
        if (pBranchCode) {
            filters.push({
                property: 'pBranchCode',
                value: pBranchCode,
                operator: 'EQUAL'
            });
        }
        filters.push({
            property: 'branchKind',
            value: '5',
            operator: 'EQUAL'
        });
        queryEvent.query = JSON.stringify(filters);
        return queryEvent;
    },
    onSearchButton: function () {
        var me = this;
        var form = Ext.getCmp('broker-wage-spec-search-form');
        var formValues = form.getValues();
        var result = [];
        var orgCode = InsuranceTechnical.getApplication().getCache('organizationCode');
        if (!form.isValid()) {
            InsuranceTechnical.tamin.window.MessageBox.showError('خطا', 'خطاهای مشخص شده را اصلاح نمائید.');
            return;
        }
        Ext.Object.each(formValues, function (property, value) {
            if (value !== '') {
                var i = result.length;
                if (property === 'reportDateFrom' && Ext.getCmp('reportDateFrom').getValue()) {
                    if (Ext.getCmp('reportDateTo').getValue()) {
                        result.push({
                            property: 'reportDate',
                            value: InsuranceTechnical.tamin.helpers.Persian.gregorianToPersian(new Date(value)).split("/").join(""),
                            operator: 'AFTER'
                        });
                    } else {
                        result.push({
                            property: 'reportDate',
                            value: InsuranceTechnical.tamin.helpers.Persian.gregorianToPersian(new Date(value)).split("/").join(""),
                            operator: 'EQUAL'
                        });
                    }
                } else if (property === 'reportDateTo'  && Ext.getCmp('reportDateTo').getValue()) {
                    result.push({
                        id: i,
                        property: 'reportDate',
                        value: InsuranceTechnical.tamin.helpers.Persian.gregorianToPersian(new Date(value)).split("/").join(""),
                        operator: 'BEFORE'
                    });
                } else if (property === 'startDateSpec' && Ext.getCmp('startDateSpec').getValue()) {
                    if (Ext.getCmp('endDateSpec').getValue()) {
                        result.push({
                            id: i,
                            property: 'startDate',
                            value: InsuranceTechnical.tamin.helpers.Persian.gregorianToPersian(new Date(value)).split("/").join(""),
                            operator: 'AFTER'
                        });
                    } else {
                        result.push({
                            property: 'startDate',
                            value: InsuranceTechnical.tamin.helpers.Persian.gregorianToPersian(new Date(value)).split("/").join(""),
                            operator: 'EQUAL'
                        });
                    }

                } else if (property === 'endDateSpec'  && Ext.getCmp('endDateSpec').getValue()) {
                    result.push({
                        id: i,
                        property: 'endDate',
                        value: InsuranceTechnical.tamin.helpers.Persian.gregorianToPersian(new Date(value)).split("/").join(""),
                        operator: 'BEFORE'
                    });
                } else if (property === 'branchSpec') {
                    var branch = value.split('-')[0];
                    if (branch !== "0000" && branch === orgCode) {
                        result.push({
                            property: 'branch.branchCode',
                            value: orgCode,
                            operator: 'EQUAL'
                        });
                    } else if (orgCode !== "0000" && branch !== orgCode) {
                        result.push({
                            property: 'branch.branchCode',
                            value: orgCode,
                            operator: 'EQUAL'
                        });
                    }
                    else if (orgCode === "0000" && branch !== orgCode) {
                        result.push({
                            property: 'branch.branchCode',
                            value: value.split('-')[0],
                            operator: 'EQUAL'
                        });
                    }
                    else if (orgCode === "0000" && branch === orgCode) {
                        result.push({
                            property: 'branch.branchCode',
                            operator: 'inn'
                        });
                    }
                } else if (property === 'brokerSpec') {
                    result.push({
                        id: i,
                        property: 'broker.branchCode',
                        value: value.split('-')[0],
                        operator: 'EQUAL'
                    });
                } else if (property === 'brokerName') {
                    result.push({
                        id: i,
                        property: 'broker.branchName',
                        value: value,
                        operator: 'LIKE'
                    });
                } else if (property === 'province') {
                    result.push({
                        id: i,
                        property: 'province.provinceCode',
                        value: value.split('-')[0],
                        operator: 'EQUAL'
                    });
                } else {
                    result.push({
                        id: i,
                        property: property,
                        value: value,
                        operator: 'EQUAL'
                    });
                }
            }
        });
        var store = me.getStore('brokerWageSpecStore');
        store.on('load', function () {
            if (store.getCount() === 0) {
                Ext.Msg.alert('پیام سیستم', 'اطلاعاتی برای مشاهده وجود ندارد ');
            }
        });
        store.clearFilter(true);
        store.addFilter(result);
        store.load();
    },
    onDetailSearchButton: function () {
        var me = this;
        var form = Ext.getCmp('broker-wage-detail-spec-search-form');
        var formValues = form.getValues();
        var result = [];
        var orgCode = InsuranceTechnical.getApplication().getCache('organizationCode');
        if (!form.isValid()) {
            InsuranceTechnical.tamin.window.MessageBox.showError('خطا', 'خطاهای مشخص شده را اصلاح نمائید.');
            return;
        }
        Ext.Object.each(formValues, function (property, value) {
            if (value !== '') {
                var i = result.length;
                if (property === 'branchDetail') {
                    var branch = value.split('-')[0];
                    if (branch !== "0000" && branch === orgCode) {
                        result.push({
                            property: 'branch.branchCode',
                            value: orgCode,
                            operator: 'EQUAL'
                        });
                    } else if (orgCode !== "0000" && branch !== orgCode) {
                        result.push({
                            property: 'branch.branchCode',
                            value: orgCode,
                            operator: 'EQUAL'
                        });
                    }
                    else if (orgCode === "0000" && branch !== orgCode) {
                        result.push({
                            property: 'branch.branchCode',
                            value: value.split('-')[0],
                            operator: 'EQUAL'
                        });
                    }
                    else if (orgCode === "0000" && branch === orgCode) {
                        result.push({
                            property: 'branch.branchCode',
                            operator: 'inn'
                        });
                    }
                } else if (property === 'brokerDetail') {
                    result.push({
                        id: i,
                        property: 'broker.branchCode',
                        value: value.split('-')[0],
                        operator: 'EQUAL'
                    });
                } else if (property === 'province') {
                    result.push({
                        id: i,
                        property: 'province.provinceCode',
                        value: value.split('-')[0],
                        operator: 'EQUAL'
                    });
                } else if (property === 'brokerName') {
                    result.push({
                        id: i,
                        property: 'broker.branchName',
                        value: value,
                        operator: 'LIKE'
                    });
                } else {
                    result.push({
                        id: i,
                        property: property,
                        value: value,
                        operator: 'EQUAL'
                    });
                }
            }
        });
        var store = me.getStore('brokerWageDetailSpecStore');
        store.on('load', function () {
            if (store.getCount() === 0) {
                Ext.Msg.alert('پیام سیستم', 'دیتایی برای مشاهده وجود ندارد.');
            }
        });
        result.push({
            property: 'reportId',
            value: me.getViewModel().get('reportId'),
            operator: 'EQUAL'
        });
        store.clearFilter(true);
        store.addFilter(result);
        store.load();
    },
    onShowDetailButton: function (view, rowIndex, colIndex, item, e, rec, row, action) {
        var me = this;
        var record = null;
        if (view.up('button')) {
            record = view.up('button').getWidgetRecord().data;
        } else {
            record = rec.data;
        }
        var reference = 'broker-wage-detail-ref';
        var detailStore = this.getStore('brokerWageDetailSpecStore');
        var win = this.lookupReference(reference);
        if (!win) {
            win = Ext.create("InsuranceTechnical.view.brokerWage.BrokerWageDetailSpecPopUp");
            this.getView().add(win);
        }
        Ext.getCmp('brokerSpec')
        me.getViewModel().set('onLoading', true);
        me.getViewModel().set('brokerWageDetail', {
            branchCode: record.branch ? record.branch.branchCode : null,
            brokerCode: record.broker ? record.broker.branchCode : null,
            province: record.province ? record.province.provinceCode : null,
            lockBranch: Boolean(record.branch),
            lockBroker: Boolean(record.broker),
            lockProvince: Boolean(record.province),
        });
        detailStore.clearFilter(true);
        detailStore.addFilter([{
            property: 'reportId',
            value: record.reportId,
            operator: 'EQUAL'
        }]);
        Ext.getBody().mask('لطفا منتظر بمانید...');
        detailStore.load({
            callback: function (recordDetail, operation, success) {
                if (success) {
                    if (recordDetail.length > 0) {
                        win.show();
                        win.center();
                        me.getViewModel().set('reportId', record.reportId);
                        setTimeout(function () {
                            me.setStoreAndCombos(record.province ? record.province.provinceCode : null,
                                record.branch ? record.branch.branchCode : null,
                                record.broker ? record.broker.branchCode : null).then(function (done) {
                                me.getViewModel().set('onLoading', false);
                                Ext.getBody().unmask();
                            }).catch(function (e) {
                                InsuranceTechnical.tamin.window.Window.retry(3);
                            });
                        }, 100);
                    } else {
                        Ext.getBody().unmask();
                        InsuranceTechnical.tamin.window.MessageBox.showInfo('پیام سیستم', 'اطلاعات ریز بدهی برای این گزارش یافت نشد.');
                    }
                } else {
                    Ext.getBody().unmask();
                    InsuranceTechnical.tamin.window.MessageBox.showError('خطا', 'خطا در دریافت اطلاعات ریز بدهی!');
                }
            }
        });
    },
    onShowAllButton: function (btn) {
        var me = this;
        me.resetSpec();
        var store = me.getStore('brokerWageSpecStore');
        store.clearFilter(true);
        store.load();
    },
    resetSpec: function () {
        var me = this;
        me.getViewModel().set('brokerWageSpec.reportDateFrom', '');
        me.getViewModel().set('brokerWageSpec.reportDateTo', '');
        me.getViewModel().set('brokerWageSpec.startDateSpec', '');
        me.getViewModel().set('brokerWageSpec.endDateSpec', '');
        me.getViewModel().set('brokerWageSpec.statusSpec', '');
        if (!me.getViewModel().get('disableProvince')) {
            me.getViewModel().set('brokerWageSpec.province', '');
        }
        if (!me.getViewModel().get('disableBranch')) {
            me.getViewModel().set('brokerWageSpec.branchCode', '');
        }
        if (!me.getViewModel().get('disableBroker')) {
            me.getViewModel().set('brokerWageSpec.brokerCode', '');
        }
    },
    onDetailShowAllButton: function (btn) {
        var me = this;
        me.getViewModel().set('brokerWageDetail.nationalCode', '');
        if (!me.getViewModel().get('disableProvince')) {
            me.getViewModel().set('brokerWageDetail.province', '');
        }
        if (!me.getViewModel().get('disableBranch')) {
            me.getViewModel().set('brokerWageDetail.branchCode', '');
        }
        if (!me.getViewModel().get('disableBroker')) {
            me.getViewModel().set('brokerWageDetail.brokerCode', '');
        }

        var store = me.getStore('brokerWageDetailSpecStore');
        store.clearFilter(true);
        store.addFilter([{
            property: 'reportId',
            value: me.getViewModel().get('reportId'),
            operator: 'EQUAL'
        }]);
        store.load();
    },
    onPrintReport: function (button) {
        sorters = [];
        for (var sort of this.getStore('brokerWageDetailSpecStore').sorters.items) {
            sorters.push({
                property: sort._property,
                direction: sort._direction,
            })
        }
        var url = InsuranceTechnical.helper.Urls.getUrl('getBrokerPdf') +
            "?reportId=" + this.getViewModel().get('reportId') + "&sort=" + JSON.stringify(sorters);
        Ext.create('InsuranceTechnical.tamin.window.PdfViewer', {url: url}).show();
    },
    onPrintExcel: function (button) {
        var reference = 'broker-wage-detail-ref';
        sorters = [];
        for (var sort of this.getStore('brokerWageDetailSpecStore').sorters.items) {
            sorters.push({
                property: sort._property,
                direction: sort._direction,
            })
        }
        var url = InsuranceTechnical.helper.Urls.getUrl('getBrokerExcel') +
            "?reportId=" + this.getViewModel().get('reportId') + "&sort=" + JSON.stringify(sorters);
        Ext.create('InsuranceTechnical.tamin.window.PdfViewer', {url: url}).download(reference);
    },
});
