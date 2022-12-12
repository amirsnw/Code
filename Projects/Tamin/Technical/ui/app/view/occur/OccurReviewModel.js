/**
 * Created by a-khalighi.
 */
Ext.define('InsuranceTechnical.view.occur.OccurReviewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.occur-review-model',
    formulas: {
        timeAllow: {
            bind: {
                morningF: '{ssupOccurReview.mornStarttime}',
                morningT: '{ssupOccurReview.mornFinishtime}',
                eveningF: '{ssupOccurReview.evenStarttime}',
                eveningT: '{ssupOccurReview.evenFinishtime}',
                nightF: '{ssupOccurReview.nighStarttime}',
                nightT: '{ssupOccurReview.nighFinishtime}'
            },
            get: function (data) {
                return (data.eveningF !== null && data.eveningF !== '' && data.eveningT !== null && data.eveningT !== '')
                    || (data.nightF !== null && data.nightF !== '' && data.nightT !== null && data.nightT !== '')
                    || (data.morningF !== null && data.morningF !== '' && data.morningT !== null && data.morningT !== '')
            }
        }
    },
    stores: {
        workshop: {
            xclass: 'InsuranceTechnical.store.baseInfo.WorkshopStore'
        },
        insuranceRegisterations: {
            xclass: 'InsuranceTechnical.store.InsuranceRegisterationStore'
        },
        occurSpec: {
            xclass: 'InsuranceTechnical.store.occur.OccurSpecStore'
        },
        branchStore: {
            xclass: 'InsuranceTechnical.store.baseInfo.BranchStore'
        },
        branchStore2: {
            xclass: 'InsuranceTechnical.store.baseInfo.BranchStore'
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
        Organizations: {xclass: 'InsuranceTechnical.store.baseInfo.OrganizationStore'}
    }
});
