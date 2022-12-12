/**
 * Created by a-khalighi.
 */
Ext.define('InsuranceTechnical.view.occur.OccurSpecModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.occur-spec-model',
    stores: {
        workshop: {
            xclass: 'InsuranceTechnical.store.baseInfo.WorkshopStore'
        },
        insuranceRegisterations: {
            xclass: 'InsuranceTechnical.store.InsuranceRegisterationStore'
        },
        occurIdeaStore: {
            xclass: 'InsuranceTechnical.store.occur.OccurIdeaStore'
        },
        occurSpecListStore: {
            xclass: 'InsuranceTechnical.store.occur.OccurSpecStore'
        },
        Organizations: {
            xclass: 'InsuranceTechnical.store.baseInfo.OrganizationStore'
        },
        branchStore: {
            xclass: 'InsuranceTechnical.store.baseInfo.BranchStore',
            filters: [
                {
                    property: 'branchKind',
                    value: '1',
                    operator: 'EQUAL'
                },
                {
                    property: 'status',
                    value: '1',
                    operator: 'EQUAL'
                }
            ]
        },
        branchStore2: {
            xclass: 'InsuranceTechnical.store.baseInfo.BranchStore',
            filters: [
                {
                    property: 'branchKind',
                    value: '1',
                    operator: 'EQUAL'
                },
                {
                    property: 'status',
                    value: '1',
                    operator: 'EQUAL'
                }
            ]
        },
        occurTypeStore: {
            xclass: 'InsuranceTechnical.store.baseInfo.TBOccurTypeStore'
        },
        occurCauseStore: {
            xclass: 'InsuranceTechnical.store.baseInfo.TbOccurCauseStore'
        },
        occurPartStore: {
            xclass: 'InsuranceTechnical.store.baseInfo.TbOccurPartStore'
        },
        branch: {
            xclass: 'InsuranceTechnical.store.baseInfo.BranchStore'
        },
        occurImageStore: {
            xclass: 'InsuranceTechnical.store.occur.OccurImageStore'
        },
        signatureImageStore: {
            xclass: 'InsuranceTechnical.store.occur.SignatureImageStore'
        }
    },
    formulas: {
        disableTextBoxOccurWorkInsp: {
            bind: {
                inspworksended: '{inspworksended}'
            },
            get: function (data) {
                if (data.inspworksended === null) {
                    return false;
                }
                if (data.inspworksended === '0') {
                    return true;
                }
            }
        },
        isERequest: {
            bind: {
                eRepId: '{occurSpec.eRepId}'
            },
            get: function (data) {
                return !(data.eRepId === null || data.eRepId === undefined);
            }
        },
        disableTextBox: {
            bind: {
                reqowner: '{reqowner}'
            },
            get: function (data) {
                if (data.reqowner === null  /*||data.reqowner === '1' ||data.reqowner === '2'*/) {
                    return false;
                }
                if (data.reqowner === '3'
                    || (data.reqowner === '4')) {
                    this.set('personalData.id', '');
                    this.set('personalData.firstName', '');
                    this.set('personalData.lastName', '');
                    this.set('occurSpec.firstName', '');
                    this.set('occurSpec.lastName', '');
                    this.set('occurSpec.pnatcode', '');
                    this.set('occurSpec.pnationdesc', '');
                    this.set('occurSpec.pfathername', '');
                    this.set('occurSpec.pidno', '');
                    this.set('occurSpec.pbirthdate', '');
                    this.set('occurSpec.pexpcityname', '');
                    this.set('occurSpec.sexcode', '');
                    this.set('occurSpec.isutel', '');
                    this.set('occurSpec.isuaddr', '');
                    return true;
                }
            }
        },
        disableTextBoxes: {
            bind: {
                reqowner: '{reqowner}'
            },
            get: function (data) {
                if (data.reqowner === null  /*||data.reqowner === '1' ||data.reqowner === '2'*/) {
                    return false;
                }
                if (data.reqowner === '1'
                    || (data.reqowner === '2')) {
                    this.set('personalData.id', '');
                    this.set('personalData.firstName', '');
                    this.set('personalData.lastName', '');
                    this.set('occurSpec.firstName', '');
                    this.set('occurSpec.lastName', '');
                    this.set('occurSpec.pnatcode', '');
                    this.set('occurSpec.pnationdesc', '');
                    this.set('occurSpec.pfathername', '');
                    this.set('occurSpec.pidno', '');
                    this.set('occurSpec.pbirthdate', '');
                    this.set('occurSpec.pexpcityname', '');
                    this.set('occurSpec.sexcode', '');
                    this.set('occurSpec.isutel', '');
                    this.set('occurSpec.isuaddr', '');
                    return true;
                }
            }
        }
    }
});
