/**
 * Created by a-khalighi.
 */
Ext.define('InsuranceTechnical.view.occur.OccurReviewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.occur-review-controller',
    init: function () {
        var me = this;
        var reqId = window.location.hash.split('/').slice(-1)[0].split('_')[0];
        var orgCode = InsuranceTechnical.getApplication().getCache('organizationCode');
        me.getViewModel().set('ssupOccurReview', {
            mornStarttime: '',
            mornFinishtime: '',
            evenStarttime: '',
            evenFinishtime: '',
            nighStarttime: '',
            nighFinishtime: ''
        });
        me.getViewModel().set('occurSpecNew', {});
        me.getViewModel().set('occurotherbrhletter', {});
        me.getViewModel().set('reqowner', null);
        me.getViewModel().set('ssupOccurPartlist', {});

        var url = InsuranceTechnical.helper.Urls.getUrl('OccurRep')
            + '/' + reqId;
        Ext.getBody().mask('لطفا منتظر بمانید...');
        Ext.Ajax.request({
            url: url,
            method: 'GET',
            success: function (response) {
                var object = JSON.parse(response.responseText);
                var data = object.data;

                if (data.workshop === null) {
                    /*Ext.getBody().unmask();
                    InsuranceTechnical.tamin.window.MessageBox.showError('خطا', 'شماره کارگاه ثبت شده متعلق به شعبه بیمه پردازی بیمه شده نمیباشد. لطفا پیش از اقدام، درخواست را اصلاح نمایید.');
                    me.getViewModel().set('flagSave', true);
                    return;*/
                    data.workshop = {
                        workshopId: data.workshopId,
                        workshopName: data.workshopName,
                        branchCode: data.brchCode.branchCode,
                        isuJobLocation: data.isuJobLocation
                    }
                }
                me.getViewModel().set('workshopData', data.workshop);
                me.getViewModel().set('insuranceSpec', data.insuranceSpec);

                // Lock/Unlock save button (Comment For Test)
                if (orgCode !== data.brchReviewer.branchCode) {
                    me.getViewModel().set('flagSave', true);
                } else {
                    me.getViewModel().set('flagSave', false);
                }
                if (data.status !== '0' && data.ssupOccurReview.occurSerial !== "") {
                    me.getViewModel().set('flagSave', true);
                }

                // Check if has(not) review
                if (data.ssupOccurReview !== null) {
                    Ext.getCmp('occurSerialID').setValue(data.ssupOccurReview.occurSerial);
                    Ext.getCmp('occurDay').setValue(InsuranceTechnical.tamin.PDate.getDay(new Date(data.ssupOccurReview.occurDate)));
                    me.adjustWorkTimeString(data);
                    me.fillOccurPartlist(data.ssupOccurReview.ssupOccurPartlist);
                    me.getViewModel().set('ssupOccurReview', data.ssupOccurReview);
                    me.getViewModel().set('ssupOccurReview.hasReview', true);
                } else {
                    me.getViewModel().set('ssupOccurReview.hasReview', false);
                }

                try {
                    data.pbirthdate = data.insuranceSpec.dateOfBirth.substring(0, 4) + '/' + data.insuranceSpec.dateOfBirth
                        .substring(4, 6) + '/' + data.insuranceSpec.dateOfBirth.substring(6, 8);
                } catch (e) {
                    data.pbirthdate = '-';
                }
                me.getViewModel().set('occurReview', data);
                me.getViewModel().set('occurTimeFlag', false);
                me.getViewModel().set('mornFinishFlag', false);
                me.getViewModel().set('evenStarttimeFlag', false);
                me.getViewModel().set('evenFinishtimeFlag', false);
                me.getViewModel().set('nighStarttimeFlag', false);
                me.getViewModel().set('nighFinishtimeFlag', false);

                me.loadComboStores().then(function () {
                    Ext.getBody().unmask();
                }).catch(function () {
                    location.reload();
                })
            },
            failure: function () {
                Ext.getBody().unmask();
                Ext.Msg.alert('پیام سیستم', 'دریافت اطلاعات درخواست مورد نظر با خطا مواجه شد .');
                me.getViewModel().set('flagSave', true);
            }
        });
    },
    adjustWorkTimeString: function (data) {
        var start;
        var end;
        // Adjusting morning time string
        if (data.ssupOccurReview.mornStarttime
            && data.ssupOccurReview.mornStarttime !== ''
            && data.ssupOccurReview.mornFinishtime
            && data.ssupOccurReview.mornFinishtime !== '') {
            start = data.ssupOccurReview.mornStarttime.split(':');
            end = data.ssupOccurReview.mornFinishtime.split(':');
            start[0] = (start[0].length === 1 ? '0' + start[0] : start[0]);
            start[1] = (start[1].length === 1 ? '0' + start[1] : start[1]);
            end[0] = (end[0].length === 1 ? '0' + end[0] : end[0]);
            end[1] = (end[1].length === 1 ? '0' + end[1] : end[1]);
            data.ssupOccurReview.mornStarttime = start.join(':');
            data.ssupOccurReview.mornFinishtime = end.join(':');
        }
        // Adjusting evening time string
        if (data.ssupOccurReview.evenStarttime
            && data.ssupOccurReview.evenStarttime !== ''
            && data.ssupOccurReview.evenFinishtime
            && data.ssupOccurReview.evenFinishtime !== '') {
            start = data.ssupOccurReview.evenStarttime.split(':');
            end = data.ssupOccurReview.evenFinishtime.split(':');
            start[0] = (start[0].length === 1 ? '0' + start[0] : start[0]);
            start[1] = (start[1].length === 1 ? '0' + start[1] : start[1]);
            end[0] = (end[0].length === 1 ? '0' + end[0] : end[0]);
            end[1] = (end[1].length === 1 ? '0' + end[1] : end[1]);
            data.ssupOccurReview.evenStarttime = start.join(':');
            data.ssupOccurReview.evenFinishtime = end.join(':');
        }
        // Adjusting night time string
        if (data.ssupOccurReview.nighStarttime
            && data.ssupOccurReview.nighStarttime !== ''
            && data.ssupOccurReview.nighFinishtime
            && data.ssupOccurReview.nighFinishtime !== '') {
            start = data.ssupOccurReview.nighStarttime.split(':');
            end = data.ssupOccurReview.nighFinishtime.split(':');
            start[0] = (start[0].length === 1 ? '0' + start[0] : start[0]);
            start[1] = (start[1].length === 1 ? '0' + start[1] : start[1]);
            end[0] = (end[0].length === 1 ? '0' + end[0] : end[0]);
            end[1] = (end[1].length === 1 ? '0' + end[1] : end[1]);
            data.ssupOccurReview.nighStarttime = start.join(':');
            data.ssupOccurReview.nighFinishtime = end.join(':');
        }
    },
    fillOccurPartlist: function (partlist) {
        var temp = [];
        for (var i = 0; i < partlist.length; i++) {
            temp.push(partlist[i].partCode.toString());
        }
        Ext.getCmp('occurPart').setValue(temp);
    },
    loadComboStores: function () {
        var me = this;
        var occurTypePromise = new Promise((resolve, reject) => {
            me.getViewModel().getStore('occurTypeStore').load({
                callback: function caller(record, operation, success) {
                    if (success) {
                        try {
                            var item = record.find(function (item) {
                                return item.data.typeCode === me.getViewModel().get('ssupOccurReview.occurType.typeCode');
                            });
                            if (item !== null && item !== undefined) {
                                Ext.getCmp('typeCode').setSelection(item);
                            }
                            resolve();
                        } catch (e) {
                            reject();
                        }
                    }
                    Ext.getBody().unmask();
                }
            });
        });
        var occurCausePromise = new Promise((resolve, reject) => {
            me.getViewModel().getStore('occurCauseStore').load({
                callback: function caller(record, operation, success) {
                    if (success) {
                        try {
                            var item = record.find(function (item) {
                                return item.data.causeCode === me.getViewModel().get('ssupOccurReview.occurCause.causeCode');
                            });
                            if (item !== null && item !== undefined) {
                                Ext.getCmp('causeDesc').setSelection(item);
                            }
                            resolve();
                        } catch (e) {
                            reject();
                        }
                    }
                    Ext.getBody().unmask();
                }
            });
        });
        return new Promise((resolve, reject) => {
            var stageOneDone = false;
            var stageTwoDone = false;
            occurTypePromise.then(function () {
                stageOneDone = true;
                if (stageTwoDone) {
                    resolve();
                }
            }).catch(function () {
                reject();
            });
            occurCausePromise.then(function () {
                stageTwoDone = true;
                if (stageOneDone) {
                    resolve();
                }
            }).catch(function () {
                reject();
            });
        });
    },
    onOccurReviewEditButton: function () {
        var me = this;
        var form = Ext.getCmp('occur-review-form');
        var user = InsuranceTechnical.getApplication().getCache('user');
        me.getViewModel().set('user', user);
        me.getViewModel().set('branchCode', user.organization.code);
        var activeRecord = Object.assign(me.getViewModel().get('ssupOccurReview'), {});
        var url;

        if (!form.isFormValid()) {
            InsuranceTechnical.tamin.window.MessageBox.showError('خطا', 'اطلاعات وارد شده کامل نمی باشد.', me);
            return;
        }

        var occurSerialID = Ext.getCmp('occurSerialID').getValue();
        var time = me.getViewModel().get('timeFlag') && activeRecord.mornStarttime instanceof Date
            ? activeRecord.mornStarttime.getHours() + ':' + activeRecord.mornStarttime.getMinutes() : activeRecord.mornStarttime;
        var occurTime = me.getViewModel().get('occurTimeFlag') && activeRecord.occurTime instanceof Date
            ? activeRecord.occurTime.getHours() + ':' + activeRecord.occurTime.getMinutes() : activeRecord.occurTime;
        var mornFinish = me.getViewModel().get('mornFinishFlag') && activeRecord.mornFinishtime instanceof Date
            ? activeRecord.mornFinishtime.getHours() + ':' + activeRecord.mornFinishtime.getMinutes() : activeRecord.mornFinishtime;
        var evenStarttime = me.getViewModel().get('evenStarttimeFlag') && activeRecord.evenStarttime instanceof Date
            ? activeRecord.evenStarttime.getHours() + ':' + activeRecord.evenStarttime.getMinutes() : activeRecord.evenStarttime;
        var evenFinishtime = me.getViewModel().get('evenFinishtimeFlag') && activeRecord.evenFinishtime instanceof Date
            ? activeRecord.evenFinishtime.getHours() + ':' + activeRecord.evenFinishtime.getMinutes() : activeRecord.evenFinishtime;
        var nighStarttime = me.getViewModel().get('nighStarttimeFlag') && activeRecord.nighStarttime instanceof Date
            ? activeRecord.nighStarttime.getHours() + ':' + activeRecord.nighStarttime.getMinutes() : activeRecord.nighStarttime;

        var nighFinishtime = me.getViewModel().get('nighFinishtimeFlag') ? activeRecord.nighFinishtime.getHours() + ':' + activeRecord.nighFinishtime.getMinutes() : activeRecord.nighFinishtime;
        var tempParts = [];

        var partValues = Ext.getCmp('occurPart').getValue();
        for (var i = 0; i < partValues.length; i++) {
            tempParts.push({
                'partCode': partValues[i],
                'reqId': !activeRecord.hasReview ? me.getViewModel().get('occurReview').reqId : null
            });
        }

        var data = {
            occurSerial: occurSerialID,
            repNo: activeRecord.repNo,
            reqId: me.getViewModel().get('occurReview').reqId,
            ismarried: activeRecord.ismarried,
            employeedate: activeRecord.employeedate instanceof Date ? activeRecord.employeedate.getTime() : new Date(activeRecord.employeedate).getTime(),
            employeestat: activeRecord.employeestat,
            vehicle: activeRecord.vehicle,
            jobdesc: activeRecord.jobdesc,
            isujoblocation: activeRecord.isujoblocation,
            dailyWage: activeRecord.dailyWage,
            jobFromDate: activeRecord.jobFromDate instanceof Date ? activeRecord.jobFromDate.getTime() : new Date(activeRecord.jobFromDate).getTime(),
            jobUntilDate: activeRecord.jobUntilDate instanceof Date ? activeRecord.jobUntilDate.getTime() : new Date(activeRecord.jobUntilDate).getTime(),
            firstworkdate: activeRecord.firstworkdate instanceof Date ? activeRecord.firstworkdate.getTime() : new Date(activeRecord.firstworkdate).getTime(),
            mornStarttime: time,
            mornFinishtime: mornFinish,
            evenStarttime: evenStarttime,
            evenFinishtime: evenFinishtime,
            nighStarttime: nighStarttime,
            nighFinishtime: nighFinishtime,
            occurDate: activeRecord.occurDate instanceof Date ? activeRecord.occurDate.getTime() : new Date(activeRecord.occurDate).getTime(),
            occurDay: activeRecord.occurDay,
            occurTime: occurTime,
            occurAddr: activeRecord.occurAddr,
            occurJobdesc: activeRecord.occurJobdesc,
            occurTools: activeRecord.occurTools,
            occurEquip: activeRecord.occurEquip,
            occurReason: activeRecord.occurReason,
            occurRel: activeRecord.occurRel,
            occurResult: activeRecord.occurResult,
            occurCause: {
                causeCode: activeRecord.occurCause.causeCode
            },
            occurType: {
                typeCode: activeRecord.occurType.typeCode
            },
            ssupOccurPartlist: tempParts,
            isrwDo90: activeRecord.isrwDo90,
            istrain: activeRecord.istrain,
            isrwDo95: activeRecord.isrwDo95,
            brchCode: user.organization.code
        };

        if (activeRecord.hasReview) {
            url = InsuranceTechnical.helper.Urls.getUrl('SsupOccurReview') + '/' + occurSerialID;
            Ext.getBody().mask('لطفا منتظر بمانید...');
            Ext.Ajax.request({
                url: url,
                method: 'PUT',
                jsonData: data,
                success: function (response, opts) {
                    Ext.getBody().unmask();
                    var message = 'تغییرات گزارش بازرسی ثبت گردید .';
                    InsuranceTechnical.tamin.window.MessageBox.showInfo('پیام سیستم', message);
                    me.onRetunButton();
                },
                failure: function (response, opts) {
                    Ext.getBody().unmask();
                    var resp = Ext.decode(response.responseText);
                    InsuranceTechnical.tamin.window.MessageBox.showError('خطا', resp.data.message);
                }
            });
        } else {
            data.occurRep = me.getViewModel().get('occurReview');
            url = InsuranceTechnical.helper.Urls.getUrl('SsupOccurReview');
            Ext.getBody().mask('لطفا منتظر بمانید...');
            Ext.Ajax.request({
                url: url,
                method: 'POST',
                jsonData: data,
                success: function (response, opts) {
                    Ext.getBody().unmask();
                    var message = 'گزارش بازرسی ثبت گردید .';
                    InsuranceTechnical.tamin.window.MessageBox.showInfo('پیام سیستم', message);
                    me.onRetunButton();
                },
                failure: function (response, opts) {
                    Ext.getBody().unmask();
                    var resp = Ext.decode(response.responseText);
                    InsuranceTechnical.tamin.window.MessageBox.showError('خطا', resp.data.message);
                }
            });
        }
    },
    onTimeChange: function (v, n, o) {
        var me = this;
        if (n !== null)
            me.getViewModel().set('timeFlag', true);
        else
            me.getViewModel().set('timeFlag', false);
    },
    occurTimeFlagChang: function (v, n, o) {
        var me = this;
        if (n !== null)
            me.getViewModel().set('occurTimeFlag', true);
        else
            me.getViewModel().set('occurTimeFlag', false);
        /* /!* setTimeout(function() {*!/Ext.getCmp('occur-review-form').getForm().isValid()/!*}, 0)*!/;*/
        // Ext.getCmp('occur-review-form').getForm().isValid();
    },
    onmornFinishChange: function (v, n, o) {
        var me = this;
        if (n !== null)
            me.getViewModel().set('mornFinishFlag', true);
        else
            me.getViewModel().set('mornFinishFlag', false);
        /*/!* setTimeout(function() {*!/Ext.getCmp('occur-review-form').getForm().isValid()}/!*, 0)*!/;*/
// Ext.getCmp('occur-review-form').getForm().isValid() ;
    },
    onevenStarttimeChange: function (v, n, o) {
        var me = this;
        if (n !== null)
            me.getViewModel().set('evenStarttimeFlag', true);
        else
            me.getViewModel().set('evenStarttimeFlag', false);
        /*  /!* setTimeout(function() {*!/Ext.getCmp('occur-review-form').getForm().isValid()/!*}, 0)*!/;*/
        // Ext.getCmp('occur-review-form').getForm().isValid()
    },
    onevenFinishtimeChange: function (v, n, o) {
        var me = this;
        if (n !== null)
            me.getViewModel().set('evenFinishtimeFlag', true);
        else
            me.getViewModel().set('evenFinishtimeFlag', false);
        /*   /!* setTimeout(function() {*!/Ext.getCmp('occur-review-form').getForm().isValid()/!*}, 0)*!/;*/
        // Ext.getCmp('occur-review-form').getForm().isValid();
    },
    onnighStarttimeChange: function (v, n, o) {
        var me = this;
        if (n !== null)
            me.getViewModel().set('nighStarttimeFlag', true);
        else
            me.getViewModel().set('nighStarttimeFlag', false);
        /*    /!* setTimeout(function() {*!/Ext.getCmp('occur-review-form').getForm().isValid()/!*}, 0)*!/;*/
        // Ext.getCmp('occur-review-form').getForm().isValid();
    },

    onnighFinishtimeChange: function (v, n, o) {
        var me = this;
        if (n !== null)
            me.getViewModel().set('nighFinishtimeFlag', true);
        else
            me.getViewModel().set('nighFinishtimeFlag', false);
        /* setTimeout(function() {Ext.getCmp('occur-review-form').getForm().isValid()}, 0);*/
        // Ext.getCmp('occur-review-form').getForm().isValid();
    },
    onRetunButton: function () {
        this.redirectTo('occur-spec', false);
    }
});

