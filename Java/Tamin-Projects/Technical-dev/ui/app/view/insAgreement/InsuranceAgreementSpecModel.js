Ext.define('InsuranceTechnical.view.refund.InsuranceAgreementSpecModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.insAgreement-spec-model',
    stores: {
        branch: {
            xclass: 'InsuranceTechnical.store.baseInfo.BranchStore'
        },
        insuranceRegisterations: {
            xclass: 'InsuranceTechnical.store.InsuranceRegisterationStore'
        },
        workshop: {
            xclass: 'InsuranceTechnical.store.baseInfo.WorkshopStore'
        },
        insuranceAgreementSpecStore: {
            xclass: 'InsuranceTechnical.store.insAgreement.InsuranceAgreementSpecStore'
        },
        insuranceAgreementTypeStore: {
            xclass: 'InsuranceTechnical.store.insAgreement.InsuranceAgreementTypeStore'
        },
        insuranceAgreementCatStore: {
            xclass: 'InsuranceTechnical.store.insAgreement.InsuranceAgreementCatStore'
        },
        agreementCategoryTypeStore: {
            xclass: 'InsuranceTechnical.store.insAgreement.AgreementCategoryTypeStore'
        },
        specialGroupTypeStore: {
            xclass: 'InsuranceTechnical.store.insAgreement.SpecialGroupTypeStore'
        },
        doctorJobStore: {
            xclass: 'InsuranceTechnical.store.baseInfo.DoctorJobStore'
        },
        introductoryReferenceStore: {
            xclass: 'InsuranceTechnical.store.insAgreement.IntroductoryReferenceStore'
        },
        localDriverCardStore: {
            xclass: 'InsuranceTechnical.store.insAgreement.LocalDriverCardStore'
        },
        provinceStore: {
            xclass: 'InsuranceTechnical.store.baseInfo.Province'
        },
        cityStore: {
            xclass: 'InsuranceTechnical.store.baseInfo.City'
        },
        jobStore: {
            xclass: 'InsuranceTechnical.store.baseInfo.Job'
        },
        educationStore: {
            xclass: 'InsuranceTechnical.store.baseInfo.Education'
        }
    },
    formulas: {
        /*disableMoreFields: {
            bind: {
                insuranceId: '{personInfo.id}',
                workshopId: '{workshopData.workshopId}',
                specialGroupType: '{agreeSpec.specialGroupType}'
            },
            get: function (data) {
                return (!this.get('insuranceId') || !this.get('workshopId'));
            }
        }*/
    }
});
